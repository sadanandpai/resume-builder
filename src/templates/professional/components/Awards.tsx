import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { AwardsIntrf } from 'src/stores/index.interface';

export default function AwardComp({ awards }: { awards: AwardsIntrf[] }) {
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
              <p className="text-xs">{award.summary}</p>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      ))}
    </div>
  );
}

function AwardHeader({ award }: { award: AwardsIntrf }) {
  let awardDate;
  if (award.date !== null) {
    awardDate = typeof award.date === 'object' ? award.date.format('DD-MM-YYYY') : award.date;
  }
  return (
    <>
      <div className="flex justify-between items-end">
        <div className="font-medium">{award.title}</div>
        <div className="italic text-xs">{awardDate}</div>
      </div>
      <div className="flex justify-between items-end">
        <div className="font-medium text-xs">{award.awarder}</div>
      </div>
    </>
  );
}
