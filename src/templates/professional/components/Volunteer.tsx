import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { HTMLRenderer } from 'src/helpers/common/components/HTMLRenderer';
import { IVolunteer } from 'src/stores/index.interface';
import { dateParser } from 'src/helpers/utils';

export default function Volunteering({ volunteer }: { volunteer: IVolunteer[] }) {
  return (
    <div>
      {volunteer.map((vol, index) => (
        <Timeline key={`${vol.organization}`} className="p-0 flex-initial text-[1em]">
          <TimelineItem className="before:hidden text-[1em]">
            <TimelineSeparator>
              <TimelineDot variant="outlined" color="primary" />
              {index !== volunteer.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              <VolunteerHeader volObj={vol} />
              <HTMLRenderer htmlString={vol.summary} />
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      ))}
    </div>
  );
}

function VolunteerHeader({ volObj }: { volObj: IVolunteer }) {
  return (
    <>
      <div className="flex justify-between items-end">
        <div className="font-medium">{volObj.organization}</div>
        <div className="italic text-xs">
          {dateParser(volObj.startDate)} -
          {volObj.isVolunteeringNow ? 'present' : dateParser(volObj.endDate)}
        </div>
      </div>
      <div className="flex justify-between items-end">
        <div className="font-medium text-xs">{volObj.position}</div>
      </div>
    </>
  );
}
