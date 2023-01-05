const SearchBar = ({ setSearchText }) => (
  <form className="p-3 w-1/2 mx-auto  flex justify-center items-center ">
    <input
      type="text"
      id="header-search"
      placeholder="Search blog posts"
      name="s"
      className="bg-transparent rounded-l-md p-3 w-3/4 border border-slate-300 transition-all duration-200 ease-linear focus:border-slate-600 outline-none"
      onChange={(e) => setSearchText(e.target.value)}
    />

    <button
      type="submit"
      className=" bg-slate-600 p-[13px] rounded-r-md text-white"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
    </button>
  </form>
);

export default SearchBar;
