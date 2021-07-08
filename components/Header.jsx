import Link from "next/link";
import SearchInput from "./SearchInput";

const Header = ({ title }) => {
  return (
    <>
      <header>
        <div className="logo-container">
          <Link href="/">
            <a>
              <img src="/assets/images/twitter.svg" alt="logo" />
            </a>
          </Link>
        </div>
        <div className="title-container">
          <h1>{title}</h1>
        </div>
        <div className="search-input-container">
          <SearchInput />
        </div>
      </header>
      <style jsx>
        {`
          header {
            height: 50px;
            display: grid;
            grid-template-columns: 1fr 2fr 1fr;
            align-items: center;
          }
          img {
            max-height: 40px;
          }
          a {
            height: 100%;
            width: 100%;
          }
          .logo-container {
            min-height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .title-container {
            padding-left: 16px;
            min-height: 100%;
            display: flex;
            align-items: center;
            border: 1px solid var(--secondary-accent);
          }
          .search-input-container {
            min-height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          @media screen and (max-width: 767px) {
            header {
              grid-template-columns: 1fr 2fr;
              margin: 0px 20px;
            }
            .search-input-container {
              display: none;
            }
            .logo-container {
              display: flex;
            }
          }
          @media screen and (max-width: 475px) {
            header {
              grid-template-columns: 1fr;
              margin: 0;
            }
            .logo-container {
              display: none;
            }
            .search-input-container {
              display: none;
            }
          }
        `}
      </style>
    </>
  );
};

export default Header;
