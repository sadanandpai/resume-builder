import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { HTMLRenderer } from 'src/helpers/common/components/HTMLRenderer';
import { IAwards } from 'src/stores/index.interface';
import { dateParser } from 'src/helpers/utils';

export default function AwardComp({ awards }: { awards: IAwards[] }) {
  return (
    <div>
      {awards.map((award, index) => (
        <Timeline key={`${award.title}-${index}`} className="p-0 flex-initial text-[1em]">
          <TimelineItem className="before:hidden text-[1em]">
            <TimelineSeparator>
              <TimelineDot variant="outlined" color="primary" />
              {index !== awards.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              <AwardHeader award={award} />
              <HTMLRenderer htmlString={award.summary} />
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      ))}
    </div>
  );
}

function AwardHeader({ award }: { award: IAwards }) {
  return (
    <>
      <div className="flex justify-between items-end">
        <div className="font-medium">{award.title}</div>
        <div className="italic text-xs">{dateParser(award.date)}</div>
      </div>
      <div className="flex justify-between items-end">
        <div className="font-medium text-xs">{award.awarder}</div>
      </div>
    </>
  );
}
