import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "./Header";
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Layout = ({ children, title, backendHost }) => {
  const mode = 'light-pallete'
  const userId = localStorage.getItem("userId");
  const [user, setUser] = useState({});
  
  useEffect(async () => {
    const response = await fetch(`${backendHost}/users/${userId}`);
    const data = await response.json();
    setUser(data.body);
  }, [userId])

  return (
    <>
      <div className={mode}>
        <Header title={title} />
        <div className="main">
          <div className="navbar">
            <div className="navbar-item">
              <FontAwesomeIcon icon={faUser} size="2x"/>
              <Link href={`/${user.username}`}>
                <a>
                  Profile
                </a>
              </Link>
            </div>
          </div>
          {children}
        </div>
      </div>
      <style jsx>
        {`
          .main {
            display: grid;
            grid-template-columns: 1fr 2fr 1fr;
          }
          .navbar {
            display: flex;
            align-items: start;
            justify-content: center;
          }
          .navbar-item {
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            color: var(--text-primary);
            margin: 10px 0;
            padding: 7px 20px;
          }
          .navbar-item a {
            margin-left: 15px;
            text-decoration: none;
            color: var(--text-primary);
          }
          .navbar-item:hover {
            color: var(--primary)!important;
            background-color: var(--primary-light);
            border-radius: 50px;
          }
          .navbar-item a:hover {
            color: var(--primary);
          }
          @media screen and (max-width: 767px) {
            .main {
              grid-template-columns: 1fr 2fr;
              margin: 0px 20px;
            }
          }
          @media screen and (max-width: 475px) {
            .main {
              grid-template-columns: 1fr;
              margin: 0;
            }
            .navbar {
              display: none;
            }
          }
        `}
      </style>
    </>
  );
};

export default Layout;
