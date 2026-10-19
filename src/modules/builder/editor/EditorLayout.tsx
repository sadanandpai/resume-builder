import { useEditorStore } from '@/stores/useEditorStore';
import { useEffect, useRef, useState } from 'react';

import DataHeaders from './components/EditHeaders';
import EditSection from './components/EditSection';
import ErrorBoundary from '@/helpers/common/components/ErrorBoundary';
import { OutlinedButton } from '@/helpers/common/atoms/Buttons';
import { headers } from '@/helpers/constants/editor-data';
import { useCloudResumeStore } from '@/stores/useCloudResumeStore';
import { resetDraftChanges, resetResumeDefaults } from '@/stores/useResumeStore';
import { Button } from '@mui/material';

const ConfirmationBox = ({
  action,
  handleModalCloseAction,
  handleModalConfirmation,
}: {
  action: 'defaults' | 'changes';
  handleModalConfirmation: () => void;
  handleModalCloseAction: () => void;
}) => {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-purple-50 w-80 p-6 rounded shadow-lg relative animate-[fadeIn_.3s]">
        <h2 className="text-xl font-semibold mb-3">
          {action === 'defaults' ? 'Reset defaults' : 'Reset changes'}
        </h2>
        <p className="text-gray-600 mb-4 text-center">
          {action === 'defaults'
            ? 'This will replace all resume content and appearance settings with the complete default resume and clear the current resume ID and URL parameters. Your saved cloud resume will remain unchanged. Continue?'
            : 'Discard your edits and restore the last cloud-saved version?'}
        </p>

        <div className="flex justify-between">
          <button
            onClick={handleModalConfirmation}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Confirm
          </button>
          <button
            onClick={handleModalCloseAction}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const EditorLayout = ({ onViewResume }: { onViewResume: () => void }) => {
  const cloudId = useCloudResumeStore((state) => state.id);
  const { target, revision, openEditor } = useEditorStore();
  const link = target.section;
  const editorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (editorRef.current) editorRef.current.scrollTop = 0;
  }, [revision]);
  const [resetAction, setResetAction] = useState<'defaults' | 'changes' | null>(null);
  useEffect(() => {
    if (!resetAction) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setResetAction(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [resetAction]);
  const section = headers[link];

  const linkClickHandler = (link: string) => {
    openEditor({ section: link });
  };

  const closeConfirmation = () => setResetAction(null);

  const handleConfirmationAction = () => {
    if (resetAction === 'defaults') {
      resetResumeDefaults();
      window.history.replaceState(null, '', '/builder');
    } else if (resetAction === 'changes') void resetDraftChanges();
    closeConfirmation();
  };

  const displayElement = link ? (
    <EditSection key={revision} section={section} onLinkClick={linkClickHandler} />
  ) : (
    <DataHeaders onLinkClick={linkClickHandler} />
  );

  return (
    <ErrorBoundary>
      <div
        ref={editorRef}
        className="bg-resume-50 h-full text-resume-800 p-6 overflow-auto relative no-scrollbar shadow-level-4dp"
      >
        {displayElement}

        <div className="mt-8 flex flex-col items-start gap-3">
          <OutlinedButton onClick={onViewResume}>View Resume</OutlinedButton>
          <div className="flex flex-wrap gap-3">
            <Button variant="outlined" color="error" onClick={() => setResetAction('defaults')}>
              Reset defaults
            </Button>
            {cloudId && (
              <Button variant="outlined" color="error" onClick={() => setResetAction('changes')}>
                Reset changes
              </Button>
            )}
          </div>
        </div>
      </div>
      {resetAction && (
        <ConfirmationBox
          action={resetAction}
          handleModalCloseAction={closeConfirmation}
          handleModalConfirmation={handleConfirmationAction}
        />
      )}
    </ErrorBoundary>
  );
};

export default EditorLayout;
