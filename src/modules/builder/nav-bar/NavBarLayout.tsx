import { useCloudResumeStore } from '@/stores/useCloudResumeStore';
import { ChangeEvent, type RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { NavBarActions, NavBarMenu, StyledButton } from './atoms';
import {
  useDatabases,
  useFrameworks,
  useLanguages,
  useLibraries,
  usePractices,
  useTechnologies,
  useTools,
} from '@/stores/skills';

import { AVAILABLE_TEMPLATES } from '@/helpers/constants';
import DEFAULT_RESUME_JSON from '@/helpers/constants/resume-data.json';
import Image from '@/helpers/common/components/Image';
import Link from 'next/link';
import { NavMenuItem } from './components/MenuItem';
import { ExportSelect } from './components/ExportSelect';
import { PrintResume } from './components/PrintResume';
import { TemplateSelect } from './components/TemplateSelect';
import { TitlesSelect } from './components/TitlesSelect';
import { LayoutSelect } from './components/LayoutSelect';
import { ThemeSelect } from './components/ThemeSelect';
import { Toast } from '@/helpers/common/atoms/Toast';
import exportFromJSON from 'export-from-json';
import { useActivity } from '@/stores/activity';
import { useAwards } from '@/stores/awards';
import { useBasicDetails } from '@/stores/basic';
import { useEducations } from '@/stores/education';
import { useExperiences } from '@/stores/experience';
import { useVoluteeringStore } from '@/stores/volunteering';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Menu,
  MenuItem,
  TextField,
} from '@mui/material';
import { applyImportedResumeJson } from './applyImportedResume';
import { exportResumeMetadata } from './resumeMetadata';

const TOTAL_TEMPLATES_AVAILABLE = Object.keys(AVAILABLE_TEMPLATES).length;

const NavBarLayout = ({
  importControllerRef,
}: {
  importControllerRef: RefObject<AbortController | null>;
}) => {
  const [openToast, setOpenToast] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [savedId, setSavedId] = useState<string | null>(null);
  const [linkMode, setLinkMode] = useState<'view' | 'edit'>('view');
  const savedUrl = savedId
    ? new URL(`/builder/${savedId}?mode=${linkMode}`, window.location.origin).href
    : '';
  const exportInProgress = useRef(false);
  const [toastContent, setToastContent] = useState('');
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const closeMobileMenu = () => setMenuAnchor(null);
    globalThis.addEventListener('beforeprint', closeMobileMenu);
    return () => globalThis.removeEventListener('beforeprint', closeMobileMenu);
  }, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const exportResumeData = useCallback(async (destination: 'download' | 'cloud') => {
    if (exportInProgress.current) return;
    const cloudRevision = useCloudResumeStore.getState().revision;
    exportInProgress.current = true;
    setIsExporting(true);
    try {
      const updatedResumeJson = {
        ...DEFAULT_RESUME_JSON,
        __metadata: exportResumeMetadata(),
        basics: {
          ...DEFAULT_RESUME_JSON.basics,
          ...useBasicDetails.getState().values,
        },
        work: useExperiences.getState().experiences,
        education: useEducations.getState().academics,
        awards: useAwards.getState().awards,
        volunteer: useVoluteeringStore.getState().volunteeredExps,
        skills: {
          languages: useLanguages.getState().get(),
          frameworks: useFrameworks.getState().get(),
          technologies: useTechnologies.getState().get(),
          libraries: useLibraries.getState().get(),
          databases: useDatabases.getState().get(),
          practices: usePractices.getState().get(),
          tools: useTools.getState().get(),
        },
        activities: useActivity.getState().activities,
      };
      if (destination === 'cloud') {
        const activeId = useCloudResumeStore.getState().id;
        const response = await fetch(
          activeId ? `/api/resumes?id=${encodeURIComponent(activeId)}` : '/api/resumes',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedResumeJson),
          }
        );
        const result = await response.json();
        if (useCloudResumeStore.getState().revision !== cloudRevision) return;
        if (!response.ok) throw new Error(result.error || 'Could not save resume.');
        useCloudResumeStore.getState().setId(result.id);
        setLinkMode('view');
        setSavedId(result.id);
      } else {
        const fileName = updatedResumeJson.basics.name + '_' + new Date().toLocaleString();
        exportFromJSON({
          data: updatedResumeJson,
          fileName,
          exportType: exportFromJSON.types.json,
        });
      }
      handleMenuClose();
    } catch (error) {
      setToastContent(error instanceof Error ? error.message : 'Could not export resume.');
      setOpenToast(true);
    } finally {
      exportInProgress.current = false;
      setIsExporting(false);
    }
  }, []);

  const handleFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const fileObj = event.target.files && event.target.files[0];
      if (!fileObj) {
        return;
      }

      importControllerRef.current?.abort();
      const reader = new FileReader();

      reader.readAsText(fileObj);

      event.target.value = ''; // To read the same file

      reader.onload = (e) => {
        try {
          if (typeof e.target?.result === 'string') {
            applyImportedResumeJson(JSON.parse(e.target.result));
            setToastContent('Resume data was successfully imported.');
            setOpenToast(true);
          }
        } catch {
          setToastContent('Could not read resume JSON from file.');
          setOpenToast(true);
        }
      };
    },
    [importControllerRef]
  );

  return (
    <nav className="h-14 w-full bg-resume-800 relative flex py-2.5 pl-2 md:pl-5 pr-1 nd:pr-4 items-center shadow-level-8dp z-20 print:hidden">
      <Link href="/">
        <Image src={'/icons/resume-icon.png'} alt="logo" height="36" width="36" />
      </Link>
      <div className="flex-auto flex justify-between items-center xs:ml-3 md:ml-5">
        <NavBarMenu>
          <NavMenuItem
            caption={`Templates (${TOTAL_TEMPLATES_AVAILABLE})`}
            popoverChildren={<TemplateSelect />}
          />
          <NavMenuItem caption="Colours" popoverChildren={<ThemeSelect />} />
          <NavMenuItem caption="Layout" popoverChildren={<LayoutSelect />} />
          <NavMenuItem caption="Titles" popoverChildren={<TitlesSelect />} />
        </NavBarMenu>
        <div className="hidden md:flex">
          <NavBarActions>
            <ExportSelect onExport={exportResumeData} isExporting={isExporting} />
            <StyledButton
              variant="text"
              onClick={() => {
                if (fileInputRef.current) {
                  const fileElement = fileInputRef.current as HTMLInputElement;
                  fileElement.click();
                }
              }}
            >
              Import{' '}
              <input
                type="file"
                hidden
                ref={fileInputRef}
                accept="application/json"
                onChange={handleFileChange}
              />
            </StyledButton>
            <PrintResume />
          </NavBarActions>
        </div>
        <button
          className="flex md:hidden text-white"
          onClick={handleMenuOpen}
          aria-label="Open menu"
        >
          <Image src="/icons/more-horizontal.svg" alt="back" width={25} height={25} />
        </button>
      </div>
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <ExportSelect onExport={exportResumeData} isExporting={isExporting} isMenuButton />
        <MenuItem
          onClick={() => {
            if (fileInputRef.current) {
              const fileElement = fileInputRef.current as HTMLInputElement;
              fileElement.click();
            }
            handleMenuClose();
          }}
        >
          Import
          <input
            type="file"
            hidden
            ref={fileInputRef}
            accept="application/json"
            onChange={handleFileChange}
          />
        </MenuItem>
        <PrintResume isMenuButton />
      </Menu>
      <Dialog
        open={Boolean(savedId)}
        onClose={() => setSavedId(null)}
        fullWidth
        maxWidth="sm"
        aria-labelledby="resume-saved-title"
      >
        <DialogTitle id="resume-saved-title">Resume saved successfully</DialogTitle>
        <DialogContent>
          <FormControl sx={{ mt: 1 }}>
            <FormLabel id="resume-link-mode-label">Choose a link to copy</FormLabel>
            <RadioGroup
              aria-labelledby="resume-link-mode-label"
              value={linkMode}
              onChange={(_, value) => setLinkMode(value as 'view' | 'edit')}
            >
              <FormControlLabel value="view" control={<Radio />} label="View only — for sharing" />
              <FormControlLabel
                value="edit"
                control={<Radio />}
                label="With edit option — for returning to edit"
              />
            </RadioGroup>
          </FormControl>
          <p className="mb-3 text-sm text-resume-600">
            {linkMode === 'view'
              ? 'Shows only your resume, without an Edit Resume button.'
              : 'Shows an Edit Resume button on hover on desktop and below the resume on mobile.'}
          </p>
          <TextField
            label="Resume link"
            sx={{ mt: 1 }}
            value={savedUrl}
            fullWidth
            slotProps={{
              input: {
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      aria-label="Copy resume link"
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(savedUrl);
                          setToastContent('Resume link copied.');
                        } catch {
                          setToastContent(
                            'Could not copy the link. Please select and copy it manually.'
                          );
                        }
                        setOpenToast(true);
                      }}
                    >
                      Copy
                    </Button>
                  </InputAdornment>
                ),
              },
            }}
          />
          <p className="mt-4 text-sm">
            Keep the link with the edit option to return and edit your resume in the future.
          </p>
          <p className="mt-2 text-sm">
            These modes control how the resume is displayed, not who can edit it.{' '}
            <strong>Anyone with either link can change the URL to access editing.</strong> Share
            only with people you trust.
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSavedId(null)}>Close</Button>
        </DialogActions>
      </Dialog>
      <Toast
        open={openToast}
        onClose={() => {
          setOpenToast(false);
        }}
        content={toastContent}
      />
    </nav>
  );
};

export default NavBarLayout;
