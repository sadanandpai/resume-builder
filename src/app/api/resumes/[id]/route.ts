import { loadSavedResume } from '@/helpers/loadSavedResume';

export const runtime = 'nodejs';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return loadSavedResume(id);
}
