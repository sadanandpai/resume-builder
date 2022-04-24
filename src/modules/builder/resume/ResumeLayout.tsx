import { MordernTemplate } from 'src/templates/modern/MordernTemplate';
import ResumeHeader from './components/ResumeHeader';

export const ResumeLayout = () => {
  return (
    <div className="my-5 overflow-y-auto">
      <ResumeHeader />
      <div className="w-[210mm] h-[296mm] bg-white mt-3">
        <div className="h-full overflow-hidden">
          <MordernTemplate />
        </div>
      </div>
    </div>
  );
};
