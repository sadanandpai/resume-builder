import { FieldValue } from '@google-cloud/firestore';
import { createHash, randomInt, timingSafeEqual } from 'node:crypto';
import { getResumeFirestore } from './firestore';

const ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 10;

export function generateResumeCode(): string {
  return Array.from({ length: 4 }, () => ALPHABET[randomInt(ALPHABET.length)]).join('');
}

export function hashResumeCode(id: string, code: string): string {
  return createHash('sha256').update(`${id}:${code}`).digest('hex');
}

// Firestore transactions keep the attempt limit consistent across server instances.
// The limit is per resume, shared by page verification and update requests.
export async function authorizeResumeEdit(
  id: string,
  code: string | null,
  resume?: Record<string, unknown>
): Promise<200 | 403 | 404 | 429> {
  if (!code) return 403;
  const firestore = await getResumeFirestore();
  const document = firestore.collection('resume').doc(id);
  const attemptsDocument = firestore.collection('resumeEditAttempts').doc(id);
  return firestore.runTransaction(async (transaction) => {
    const documentSnapshot = await transaction.get(document);
    if (!documentSnapshot.exists) return 404;
    const attemptsSnapshot = await transaction.get(attemptsDocument);
    const now = Date.now();
    const previous = attemptsSnapshot.data();
    const withinWindow = typeof previous?.resetAt === 'number' && previous.resetAt > now;
    const attempts = withinWindow ? Number(previous?.attempts) || 0 : 0;
    if (attempts >= MAX_ATTEMPTS) return 429;
    const storedHash = documentSnapshot.data()?.codeHash;
    const valid =
      /^[A-Za-z0-9]{4}$/.test(code) &&
      typeof storedHash === 'string' &&
      /^[a-f0-9]{64}$/.test(storedHash) &&
      timingSafeEqual(Buffer.from(storedHash, 'hex'), Buffer.from(hashResumeCode(id, code), 'hex'));
    if (!valid) {
      transaction.set(attemptsDocument, {
        attempts: attempts + 1,
        resetAt: withinWindow ? previous!.resetAt : now + WINDOW_MS,
      });
      return 403;
    }
    if (resume !== undefined)
      transaction.update(document, { json: resume, editCount: FieldValue.increment(1) });
    return 200;
  });
}
