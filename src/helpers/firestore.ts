import { readFile } from 'node:fs/promises';
import { Firestore } from '@google-cloud/firestore';

let firestore: Firestore | undefined;

export async function getResumeFirestore(): Promise<Firestore> {
  if (firestore) return firestore;
  if (!process.env.GOOGLE_CLOUD_PROJECT || !process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    throw new Error('Firestore credentials are not configured.');
  }
  const credentials = JSON.parse(
    await readFile(process.env.GOOGLE_APPLICATION_CREDENTIALS, 'utf8')
  );
  if (
    credentials.type !== 'service_account' ||
    typeof credentials.client_email !== 'string' ||
    typeof credentials.private_key !== 'string'
  ) {
    throw new Error('The credential file must be a service account JSON key.');
  }
  firestore ??= new Firestore({
    credentials: { client_email: credentials.client_email, private_key: credentials.private_key },
    projectId: process.env.GOOGLE_CLOUD_PROJECT,
    databaseId: process.env.FIRESTORE_DATABASE_ID || '(default)',
  });
  return firestore;
}
