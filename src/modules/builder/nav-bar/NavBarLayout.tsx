import Image from 'next/image';

const NavBarLayout = () => {
  return (
    <nav className="h-14 w-full bg-resume-800 relative flex py-2.5 px-4 items-center">
      <Image src={'/icons/right-arrow.svg'} alt="logo" height={'39px'} width={'32px'} />

      <div className="flex-auto flex justify-between items-center ml-5">
        <div>
          <h1>Templates</h1>
          <h1>Themes</h1>
        </div>
        <div>
          <button>Export</button>
          <button>Import</button>
          <button>Export as PDF</button>
        </div>
      </div>
    </nav>
  );
};

export default NavBarLayout;
