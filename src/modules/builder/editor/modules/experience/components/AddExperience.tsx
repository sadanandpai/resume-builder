import { OutlinedButton } from 'src/helpers/common/atoms/Buttons';
import { useExperiences } from 'src/stores/experience';

const NEW_EXPERIENCE = {
  companyName: '',
  position: '',
  startDate: '',
  isWorkingHere: false,
  endDate: '',
  summary: '',
  id: '',
};

const AddExperience = ({
  handleChange,
}: {
  handleChange: (name: string, isExpanded: boolean) => void;
}) => {
  const addNewExperience = useExperiences((state) => state.add);

  const onCreateNewExperience = () => {
    const uniqueExpandedId = `${Math.random()}`;
    NEW_EXPERIENCE.id = uniqueExpandedId;
    addNewExperience(NEW_EXPERIENCE);
    handleChange(uniqueExpandedId, true);
  };

  return (
    <div className="flex gap-2 mt-3">
      <OutlinedButton onClick={onCreateNewExperience} disabled={false}>
        + Add more
      </OutlinedButton>
    </div>
  );
};

export default AddExperience;
