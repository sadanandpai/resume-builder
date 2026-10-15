import { nanoid } from 'nanoid';
import { getResumeFirestore } from '@/helpers/firestore';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const suppliedId = new URL(request.url).searchParams.get('id');
  const isLegacyId =
    suppliedId !== null &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(suppliedId);
  if (suppliedId !== null && !isLegacyId && !/^[A-Za-z0-9_-]{21}$/.test(suppliedId)) {
    return Response.json({ error: 'Invalid resume ID.' }, { status: 400 });
  }

  const body = await request.text();
  if (Buffer.byteLength(body, 'utf8') > 900_000) {
    return Response.json({ error: 'Resume is too large to save.' }, { status: 413 });
  }

  let resume;
  try {
    resume = JSON.parse(body);
  } catch {
    return Response.json({ error: 'Invalid resume JSON.' }, { status: 400 });
  }
  if (
    !resume ||
    typeof resume !== 'object' ||
    Array.isArray(resume) ||
    !resume.basics ||
    typeof resume.basics !== 'object' ||
    Array.isArray(resume.basics)
  ) {
    return Response.json(
      { error: 'Expected a resume object with basic details.' },
      { status: 400 }
    );
  }

  if (!process.env.GOOGLE_CLOUD_PROJECT) {
    return Response.json(
      { error: 'Could not save your resume. Please try again later.' },
      { status: 503 }
    );
  }

  if (!process.env.GOOGLE_APPLICATION_CREDENTIALS && !process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
    return Response.json(
      {
        error: 'Could not save your resume. Please try again later.',
      },
      { status: 503 }
    );
  }

  try {
    const firestore = await getResumeFirestore();
    const id = suppliedId ? (isLegacyId ? suppliedId.toLowerCase() : suppliedId) : nanoid();
    const document = firestore.collection('resume').doc(id);
    if (suppliedId) {
      await document.update({ json: resume });
    } else {
      await document.create({ json: resume });
    }
    return Response.json({ id }, { status: suppliedId ? 200 : 201 });
  } catch (error) {
    if (suppliedId && (error as { code?: number })?.code === 5) {
      return Response.json(
        { error: 'Resume not found. Reset ID to save a new copy.' },
        { status: 404 }
      );
    }
    console.error('Could not save resume:', error);
    return Response.json(
      { error: 'Could not save your resume. Please try again later.' },
      { status: 503 }
    );
  }
}
