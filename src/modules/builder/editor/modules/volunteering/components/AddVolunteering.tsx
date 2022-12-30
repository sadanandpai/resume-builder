import { useMemo } from 'react';
import { OutlinedButton } from 'src/helpers/common/atoms/Buttons';
import { useVoluteeringStore } from 'src/stores/volunteering';
import { IVolunteeringItem } from 'src/stores/volunteering.interface';

const NEW_VOLUNTEER_EXP: IVolunteeringItem = {
  organization: '',
  position: '',
  startDate: null,
  isVolunteeringNow: false,
  endDate: null,
  summary: '',
  id: '',
  url: '',
  highlights: [],
};

const AddVolunteeringExp = ({
  handleChange,
  isEmpty,
}: {
  handleChange: (name: string, isExpanded: boolean) => void;
  isEmpty: boolean;
}) => {
  const addNewVolunteeringExperience = useVoluteeringStore((state) => state.add);

  const onCreateVolunteeringExperience = () => {
    const uniqueExpandedId = `${Math.random()}`;
    NEW_VOLUNTEER_EXP.id = uniqueExpandedId;
    addNewVolunteeringExperience(NEW_VOLUNTEER_EXP);
    handleChange(uniqueExpandedId, true);
  };

  const buttonCaption = useMemo(() => {
    if (isEmpty) {
      return '+ Add a volunteering experience';
    } else {
      return '+ Add more';
    }
  }, [isEmpty]);

  return (
    <div className="flex gap-2 mt-3">
      <OutlinedButton onClick={onCreateVolunteeringExperience} disabled={false}>
        {buttonCaption}
      </OutlinedButton>
    </div>
  );
};

export default AddVolunteeringExp;
