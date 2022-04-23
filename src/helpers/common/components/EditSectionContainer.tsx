const EditSectionContainer = ({
  title,
  expanded,
  children,
  clickHandler,
}: {
  title: string;
  expanded: boolean;
  children: JSX.Element;
  clickHandler: () => void;
}) => {
  return (
    <>
      <div
        className="bg-resume-100 h-12 w-full rounded-t-md shadow-level-4px-0.25 relative flex items-center px-4 text-resume-800 font-bold text-lg select-none"
        onClick={clickHandler}
      >
        {title}
      </div>
      {expanded && (
        <div className="bg-resume-10 rounded-b-md px-4 py-6 shadow-level-4px-0.25">{children}</div>
      )}
    </>
  );
};

export default EditSectionContainer;
