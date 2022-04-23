import { Slider } from '@mui/material';

const SliderValue = ({ score, setScore }: { score: number; setScore: (v: number) => void }) => {
  const sliderhangeHandler = (_: Event, value: number | number[]) => {
    setScore(value as number);
  };

  return (
    <div className="flex mt-4">
      <Slider
        aria-label="Skill Score"
        value={score}
        onChange={sliderhangeHandler}
        className="basis-2/3"
      />
      <div className="bg-custom-grey rounded-md px-2 py-1 ml-auto">{score}</div>
    </div>
  );
};

export default SliderValue;
