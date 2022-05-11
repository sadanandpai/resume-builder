import { EducationIntrf } from 'src/stores/index.interface';

export const Education = ({ education }: { education: EducationIntrf[] }) => {
  console.log(education[0].startDate, '--------');

  return (
    <>
      {education.map((item: EducationIntrf, index: number) => (
        <div key={index} className="mt-3">
          <div>
            <p className="font-normal">
              {item.studyType} - {item.area}
            </p>
            <div className="flex justify-between items-center">
              <p className="font-normal text-[#1AB0B3]">{item.institution}</p>
              <p className="gap-3 text-xs">{`${item.startDate} - ${item.endDate}`}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
