const Navbar = () => {
  return (
    <header className="navbar text-white p-4 flex justify-between items-center font-[family-name:var(--font-jost-medium)]">
      <h1 className="text-xl font-semibold">CleanCheck</h1>
      <button className="p-2 bg-white text-gray-700 rounded-full">
        <span role="img" aria-label="User Icon">
          👤
        </span>
      </button>
    </header>
  );
};

export default Navbar;
