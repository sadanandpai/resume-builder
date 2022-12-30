import { useMemo } from 'react';
import { OutlinedButton } from 'src/helpers/common/atoms/Buttons';
import { useEducations } from 'src/stores/education';
import { IEducationItem } from 'src/stores/education.interface';

const NEW_EDUCATION: IEducationItem = {
  institution: '',
  url: '',
  studyType: '',
  area: '',
  startDate: null,
  isStudyingHere: false,
  endDate: null,
  score: '',
  courses: [],
  id: '',
};

const AddEducation = ({
  handleChange,
  isEmpty,
}: {
  handleChange: (name: string, isExpanded: boolean) => void;
  isEmpty: boolean;
}) => {
  const addEducation = useEducations((state) => state.add);

  const onCreateEducation = () => {
    const uniqueExpandedId = `${Math.random()}`;
    NEW_EDUCATION.id = uniqueExpandedId;
    addEducation(NEW_EDUCATION);
    handleChange(uniqueExpandedId, true);
  };

  const buttonCaption = useMemo(() => {
    if (isEmpty) {
      return '+ Add an education';
    } else {
      return '+ Add more';
    }
  }, [isEmpty]);

  return (
    <div className="flex gap-2 mt-3">
      <OutlinedButton onClick={onCreateEducation} disabled={false}>
        {buttonCaption}
      </OutlinedButton>
    </div>
  );
};

export default AddEducation;
