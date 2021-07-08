
const SearchInput = () => {
  return (
    <>
      <input type="text" placeholder="Search Twitter"/>
      <style jsx>{`
        input {
          background: var(--secondary-accent);
          border-radius: 50px;
          height: 40px;
          max-height: 40px;
          width: 90%;
          outline: none;
          border: none;
          padding-right: 20px;
          padding-left: 20px;
          box-sizing: border-box;
          font-size: 16px;
        }
        input:focus {
          background-color: var(--secondary);
          border: 1px solid var(--primary);
          color: black;
        }
      `}</style>
    </>
  );
};

export default SearchInput;
