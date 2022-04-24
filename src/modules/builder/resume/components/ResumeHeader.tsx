import ResumeController from '../atoms/ResumeController';
import { ResumeTitle } from '../atoms/ResumeTitle';

const ResumeHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <ResumeTitle title="Your name" />
      <ResumeController />
    </div>
  );
};

export default ResumeHeader;
