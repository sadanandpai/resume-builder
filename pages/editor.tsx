import type { NextPage } from 'next';
import { Resume } from 'core/containers/Resume';
import { Sidebar } from 'core/containers/Sidebar';
import { LeftNav } from 'core/containers/LeftNav';
import { FlexHC } from 'styles/styles';

const Editor: NextPage = () => {
  return (
    <FlexHC>
      <LeftNav />
      <Resume />
      <Sidebar />
    </FlexHC>
  );
};

export default Editor;
