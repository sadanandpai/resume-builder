const subSections = ['Contact', 'Links', 'About'];

const BasicLayout = () => {
  return (
    <>
      {subSections.map((section) => (
        <span key={section}>{section}</span>
      ))}
    </>
  );
};

export default BasicLayout;
