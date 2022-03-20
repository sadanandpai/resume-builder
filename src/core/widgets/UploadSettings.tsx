import React from 'react';
import styled from '@emotion/styled';
import {
  useActivities,
  useAwards,
  useEducation,
  useIntro,
  useSkills,
  useVolunteer,
  useWork,
} from 'src/stores/data.store';
import { getIcon } from 'src/styles/icons';

const IconWrapper = styled.div`
  outline-color: transparent;
  margin-bottom: 1rem;
`;

const IconButton = styled.button`
  position: relative;
  display: flex;
  flex-direction: row;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  height: 36px;
  width: 40px;
  background: transparent;
  border: 0;
  border-radius: 2px;
  padding: 0;
  color: rgb(230, 230, 230);
  font-size: 1.4rem;
  pointer-events: none;
`;

export function UploadSettings() {
  const resetBasics = useIntro((state: any) => state.reset);
  const resetSkills = useSkills((state: any) => state.reset);
  const resetWork = useWork((state: any) => state.reset);
  const resetEducation = useEducation((state: any) => state.reset);
  const resetActivities = useActivities((state: any) => state.reset);
  // const volunteer = useVolunteer((state: any) => state.reset);
  // const awards = useAwards((state: any) => state.reset);

  function beforeUpload(e) {
    var reader = new FileReader();
    reader.onload = function (e: any) {
      const userJSoN = JSON.parse(e.target.result);
      resetBasics(userJSoN.basics);
      resetSkills(userJSoN.skills);
      resetWork(userJSoN.work);
      resetEducation(userJSoN.education);
      resetActivities(userJSoN.activities);
    };
    reader.readAsText(e.target.files[0]);
  }

  const props = {
    name: 'file',
    multiple: false,
    showUploadList: false,
    accept: '.json',
    beforeUpload,
  };

  return (
    <IconWrapper>
      <label htmlFor="contained-button-file" style={{ cursor: 'pointer' }}>
        <input
          accept=".json"
          id="contained-button-file"
          type="file"
          onChange={beforeUpload}
          style={{ display: 'none' }}
        />
        <IconButton>{getIcon('upload')}</IconButton>
      </label>
    </IconWrapper>
  );
}
