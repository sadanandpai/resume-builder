import { useMemo } from 'react';
import { OutlinedButton } from 'src/helpers/common/atoms/Buttons';
import { useExperiences } from 'src/stores/experience';
import { IExperienceItem } from 'src/stores/experience.interface';

const NEW_EXPERIENCE: IExperienceItem = {
  name: '',
  position: '',
  startDate: null,
  isWorkingHere: false,
  endDate: null,
  summary: '',
  years: '',
  id: '',
  url: '',
  highlights: [],
};

const AddExperience = ({
  handleChange,
  isEmpty,
}: {
  handleChange: (name: string, isExpanded: boolean) => void;
  isEmpty: boolean;
}) => {
  const addNewExperience = useExperiences((state) => state.add);

  const onCreateNewExperience = () => {
    const uniqueExpandedId = `${Math.random()}`;
    NEW_EXPERIENCE.id = uniqueExpandedId;
    addNewExperience(NEW_EXPERIENCE);
    handleChange(uniqueExpandedId, true);
  };

  const buttonCaption = useMemo(() => {
    if (isEmpty) {
      return '+ Add an experience';
    } else {
      return '+ Add more';
    }
  }, [isEmpty]);

  return (
    <div className="flex gap-2 mt-3">
      <OutlinedButton onClick={onCreateNewExperience} disabled={false}>
        {buttonCaption}
      </OutlinedButton>
    </div>
  );
};

export default AddExperience;
