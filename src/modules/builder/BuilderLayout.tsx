'use client';

import { BuilderStateHydration, type SavedResume } from './BuilderStateHydration';
import EditorLayout from './editor/EditorLayout';
import Image from '@/helpers/common/components/Image';
import { useEditorStore } from '@/stores/useEditorStore';
import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ResumeLoading } from './ResumeLoading';
import { ResumeReadOnlyContext } from './resume/ResumeReadOnlyContext';
import { setResumeView } from './resumeView';
import NavBarLayout from './nav-bar/NavBarLayout';
import ResumeHeader from './resume/components/ResumeHeader';
import { ResumeLayout } from './resume/ResumeLayout';
import Tooltip from '@mui/material/Tooltip';
import { ImportResumeFromQuery } from './nav-bar/ImportResumeFromQuery';
import { Toast } from '@/helpers/common/atoms/Toast';

type MobileTab = 'preview' | 'edit';

const segmentBtn =
  'flex-1 min-h-9 rounded-[4px] px-3 py-1.5 text-sm font-medium tracking-normal transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-resume-500 focus-visible:ring-offset-2 focus-visible:ring-offset-custom-grey100';

const BuilderContent = ({ savedResume }: { savedResume?: SavedResume }) => {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');
  const view = mode === 'view' || mode === 'edit';
  const canEdit = mode === 'edit';
  const [mobileTab, setMobileTab] = useState<MobileTab>('preview');
  const editResume = useCallback(() => {
    setMobileTab('edit');
    setResumeView(false);
  }, []);

  useEffect(() => {
    if (!canEdit) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !event.defaultPrevented) {
        event.preventDefault();
        editResume();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [canEdit, editResume]);
  const importControllerRef = useRef<AbortController | null>(null);
  const [importResult, setImportResult] = useState('');
  const [showImportToast, setShowImportToast] = useState(false);
  const onImportResult = useCallback((message: string) => {
    setImportResult(message);
    setShowImportToast(true);
  }, []);

  useEffect(
    () =>
      useEditorStore.subscribe((state, previous) => {
        if (state.revision !== previous.revision && state.target.section) setMobileTab('edit');
      }),
    []
  );

  return (
    <BuilderStateHydration savedResume={savedResume}>
      <ImportResumeFromQuery controllerRef={importControllerRef} onResult={onImportResult} />
      <Toast
        open={showImportToast}
        onClose={() => setShowImportToast(false)}
        content={importResult}
      />
      {view ? (
        <main className="resume-only-view min-h-screen bg-custom-grey100 py-4 print:bg-white print:py-0">
          <div className="group relative mx-auto max-w-[834px]">
            <ResumeReadOnlyContext.Provider value={true}>
              <ResumeLayout readOnly />
            </ResumeReadOnlyContext.Provider>
            {canEdit && (
              <button
                type="button"
                onClick={editResume}
                className="resume-edit-button mx-auto mt-4 block cursor-pointer rounded border border-resume-200 bg-transparent px-4 py-2 text-sm font-medium text-resume-500 opacity-100 transition-opacity hover:text-resume-800 focus-visible:outline-2 focus-visible:outline-resume-500 lg:absolute lg:right-6 lg:top-3 lg:z-10 lg:m-0 lg:border-resume-300 lg:bg-resume-50 lg:text-resume-800 lg:shadow-sm lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100 print:hidden"
              >
                Edit Resume
              </button>
            )}
          </div>
        </main>
      ) : (
        <div className="flex flex-col h-screen min-h-0 print:h-auto print:block">
          <NavBarLayout importControllerRef={importControllerRef} />
          <main className="flex flex-1 flex-col lg:flex-row min-h-0 max-h-[calc(100vh-3.5rem)] print:max-h-none print:block">
            <div className="builder-mobile-tabs print:hidden lg:hidden shrink-0 border-b border-resume-200 bg-custom-grey100 px-3 py-1.5">
              <div
                className="flex w-full gap-0.5 rounded-[4px] border border-resume-200 bg-resume-50 p-0.5 shadow-level-4dp"
                role="tablist"
                aria-label="Switch between resume preview and editor"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={mobileTab === 'preview'}
                  id="builder-tab-preview"
                  className={`${segmentBtn} ${
                    mobileTab === 'preview'
                      ? 'bg-resume-800 text-resume-50 shadow-sm'
                      : 'text-resume-600 hover:bg-resume-100/80 hover:text-resume-800'
                  }`}
                  onClick={() => setMobileTab('preview')}
                >
                  Preview
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={mobileTab === 'edit'}
                  id="builder-tab-edit"
                  className={`${segmentBtn} ${
                    mobileTab === 'edit'
                      ? 'bg-resume-800 text-resume-50 shadow-sm'
                      : 'text-resume-600 hover:bg-resume-100/80 hover:text-resume-800'
                  }`}
                  onClick={() => setMobileTab('edit')}
                >
                  Edit
                </button>
              </div>
            </div>

            <div
              className={`flex flex-col flex-1 min-h-0 min-w-0 bg-custom-grey100 print:bg-white print:block ${
                mobileTab === 'preview' ? 'flex' : 'hidden'
              } lg:flex`}
            >
              <header className="w-full max-w-[210mm] mt-3 lg:mt-5 mb-2 lg:mb-3 mx-auto px-3 lg:px-0 print:hidden shrink-0">
                <ResumeHeader />
              </header>
              <div className="flex-1 min-h-0 overflow-auto no-scrollbar print:overflow-visible print:block">
                <ResumeLayout pauseFitToWidth={mobileTab === 'edit'} />
              </div>
            </div>

            <aside
              className={`flex flex-col w-full lg:w-[25vw] lg:min-w-[20rem] lg:flex-shrink-0 min-h-0 flex-1 lg:flex-initial print:hidden ${
                mobileTab === 'edit' ? 'flex' : 'hidden'
              } lg:flex`}
            >
              <EditorLayout onViewResume={() => setResumeView(true)} />
            </aside>
          </main>

          <footer className="print:hidden">
            <Tooltip title="Share feedback">
              <a
                href="https://forms.gle/YmpXEZLk6LYdnqet7"
                target="_blank"
                rel="noreferrer"
                className="fixed w-14 h-14 rounded-full left-4 flex justify-center items-center bg-resume-50 shadow-level-4dp bottom-[max(1rem,env(safe-area-inset-bottom))]"
              >
                <Image src="/icons/rate-review.svg" alt="Feedback button" width="24" height="24" />
              </a>
            </Tooltip>
          </footer>
        </div>
      )}
    </BuilderStateHydration>
  );
};

export default function BuilderLayout(props: { savedResume?: SavedResume }) {
  return (
    <Suspense fallback={<ResumeLoading />}>
      <BuilderContent {...props} />
    </Suspense>
  );
}
