import { useMemo } from 'react';
import { OutlinedButton } from 'src/helpers/common/atoms/Buttons';
import { useAwards } from 'src/stores/awards';
import { IAwardItem } from 'src/stores/awards.interface';

const NEW_AWARD: IAwardItem = {
  title: '',
  awarder: '',
  date: null,
  summary: '',
  id: '',
};

const AddAward = ({
  handleChange,
  isEmpty,
}: {
  handleChange: (name: string, isExpanded: boolean) => void;
  isEmpty: boolean;
}) => {
  const addAwardToStore = useAwards((state) => state.add);

  const onCreateEducation = () => {
    const uniqueExpandedId = `${Math.random()}`;
    NEW_AWARD.id = uniqueExpandedId;
    addAwardToStore(NEW_AWARD);
    handleChange(uniqueExpandedId, true);
  };

  const buttonCaption = useMemo(() => {
    if (isEmpty) {
      return '+ Add an award';
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

export default AddAward;
