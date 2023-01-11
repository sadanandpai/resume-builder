export const ProfileName = ({ name }: { name: string }) => {
  return (
    <h3
      className="text-3xl font-medium max-w-[60%] overflow-hidden overflow-ellipsis whitespace-nowrap"
      title={name}
    >
      {name}
    </h3>
  );
};
