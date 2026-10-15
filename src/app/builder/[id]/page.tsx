import BuilderLayout from '@/modules/builder/BuilderLayout';
import { loadSavedResume } from '@/helpers/loadSavedResume';

export { metadata } from '../page';
export const dynamic = 'force-dynamic';

export default async function SavedBuilderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const response = await loadSavedResume(id);
  const data = await response.json();
  return <BuilderLayout savedResume={response.ok ? { id, data } : { id, error: data.error }} />;
}
