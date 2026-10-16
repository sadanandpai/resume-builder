import { FieldValue } from '@google-cloud/firestore';
import { getResumeFirestore } from '@/helpers/firestore';

export async function loadSavedResume(id: string): Promise<Response> {
  const isLegacyId = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    id
  );
  if (!isLegacyId && !/^[A-Za-z0-9_-]{21}$/.test(id)) {
    return Response.json({ error: 'Invalid resume ID.' }, { status: 400 });
  }
  try {
    const firestore = await getResumeFirestore();
    const reference = firestore.collection('resume').doc(isLegacyId ? id.toLowerCase() : id);
    const document = await reference.get();
    if (!document.exists) {
      return Response.json({ error: 'Resume not found.' }, { status: 404 });
    }
    // Analytics must not prevent an otherwise successful resume load.
    try {
      await reference.update({ viewCount: FieldValue.increment(1) });
    } catch (error) {
      console.error('Could not count resume view:', error);
    }
    return Response.json(document.data()?.json, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('Could not load resume:', error);
    return Response.json(
      { error: 'Could not load your resume. Please try again later.' },
      { status: 503 }
    );
  }
}
