import BuilderLayout from '@/modules/builder/BuilderLayout';
import { loadSavedResume } from '@/helpers/loadSavedResume';

import { authorizeResumeEdit } from '@/helpers/resumeEditAccess';

export const metadata = { title: 'E-Resume: Builder', referrer: 'no-referrer' as const };
export const dynamic = 'force-dynamic';

export default async function SavedBuilderPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id: suppliedId } = await params;
  const id = suppliedId.length === 36 ? suppliedId.toLowerCase() : suppliedId;
  const response = await loadSavedResume(id);
  const data = await response.json();
  const suppliedCode = (await searchParams).code;
  let code: string | null = null;
  if (response.ok && typeof suppliedCode === 'string') {
    try {
      if ((await authorizeResumeEdit(id, suppliedCode)) === 200) code = suppliedCode;
    } catch {
      // Fail closed: public viewing remains available if verification fails.
    }
  }
  return (
    <BuilderLayout savedResume={response.ok ? { id, data, code } : { id, error: data.error }} />
  );
}
