import React, { useState } from 'react';

import DataHeaders from './components/EditHeaders';
import EditSection from './components/EditSection';
import ErrorBoundary from '@/helpers/common/components/ErrorBoundary';
import { OutlinedButton } from '@/helpers/common/atoms/Buttons';
import { headers } from '@/helpers/constants/editor-data';
import { resetResumeStore } from '@/stores/useResumeStore';

const ConfirmationBox = ({
  handleModalCloseAction,
  handleModalConfirmation,
}: {
  handleModalConfirmation: () => void;
  handleModalCloseAction: () => void;
}) => {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-purple-50 w-80 p-6 rounded shadow-lg relative animate-[fadeIn_.3s]">
        <h2 className="text-xl font-semibold mb-3">Reset All Changes</h2>
        <p className="text-gray-600 mb-4 text-center">
          Are you sure to reset all the changes you have done?
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

const EditorLayout = () => {
  const [link, setLink] = useState('');
  const [shouldOpenModal, setShouldOpenModal] = useState(false);
  const section = headers[link];

  const linkClickHandler = (link: string) => {
    setLink(link);
  };

  const confirmationModalHandler = () => {
    setShouldOpenModal((prev) => !prev);
  };

  const handleConfirmationAction = () => {
    resetResumeStore();
    confirmationModalHandler();
  };

  const displayElement = link ? (
    <EditSection section={section} onLinkClick={linkClickHandler} />
  ) : (
    <DataHeaders onLinkClick={linkClickHandler} />
  );

  return (
    <ErrorBoundary>
      <div className="bg-resume-50 h-full text-resume-800 p-6 overflow-auto relative no-scrollbar shadow-level-4dp">
        {displayElement}

        <div className="mt-8">
          <OutlinedButton onClick={confirmationModalHandler}>Reset all edits</OutlinedButton>
        </div>
      </div>
      {shouldOpenModal && (
        <ConfirmationBox
          handleModalCloseAction={confirmationModalHandler}
          handleModalConfirmation={handleConfirmationAction}
        />
      )}
    </ErrorBoundary>
  );
};

export default EditorLayout;
