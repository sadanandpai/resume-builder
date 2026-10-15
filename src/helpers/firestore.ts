import { readFile } from 'node:fs/promises';
import { Firestore } from '@google-cloud/firestore';

let firestore: Firestore | undefined;

export async function getResumeFirestore(): Promise<Firestore> {
  if (firestore) return firestore;
  const inlineCredentials = process.env.GOOGLE_SERVICE_ACCOUNT_JSON?.trim();
  const credentialSource = inlineCredentials || process.env.GOOGLE_APPLICATION_CREDENTIALS?.trim();
  if (!process.env.GOOGLE_CLOUD_PROJECT || !credentialSource) {
    throw new Error('Firestore credentials are not configured.');
  }
  let credentials;
  try {
    credentials = JSON.parse(
      inlineCredentials || credentialSource.startsWith('{')
        ? credentialSource
        : await readFile(credentialSource, 'utf8')
    );
  } catch {
    // Do not expose credential contents or paths in API logs.
    throw new Error('Could not read service account credentials.');
  }
  if (
    !credentials ||
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
