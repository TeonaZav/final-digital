import { Navigation } from "../components";

const Header = () => {
  return (
    <>
      <header className="h-[36px] bg-gradient-to-r from-[#1734B0] via-[#253DAB] to-[#B41173] px-4 py-2 text-center text-white sm:px-10">
        <div className="w-full flex justify-center items-center h-full">
          საუკეთესო შეთავაზებები
        </div>
      </header>

      <Navigation />
    </>
  );
};

export default Header;
