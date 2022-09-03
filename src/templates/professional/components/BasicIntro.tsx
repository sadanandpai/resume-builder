import { IBasics } from 'src/stores/index.interface';

export default function BasicIntro({ basics }: { basics: IBasics }) {
  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-1">
        <div className="text-2xl">{basics.name}</div>
        <div>{basics.label}</div>
        <div>
          Relevant experience:&nbsp;
          <strong>{basics.relExp}</strong>
        </div>
        <div>Total experience:&nbsp;{basics.totalExp}</div>
      </div>

      <div className="flex flex-col justify-end gap-1">
        <div>{basics.phone}</div>
        <div>{basics.email}</div>
        <div>{basics.location.city}</div>
      </div>
    </div>
  );
}
