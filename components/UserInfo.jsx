import Link from "next/link";

const UserInfo = ({ user }) => {
  return (
    <>
      <Link href={`/${user.username}`}>
        <a className="user-info">
          <h3>{user.name}</h3>
          <span>@{user.username}</span>
        </a>
      </Link>
      <style jsx>
        {`
          .user-info {
            display: flex;
            align-items: center;
            padding: 5px 15px;
            text-decoration: none;
            color: var(--primary-text);
          }
          .user-info span {
            color: var(--text-secondary);
          }
          @media screen and (max-width: 600px) {
            .user-info {
              flex-direction: column;
              align-items: start;
            }
          }
        `}
      </style>
    </>
  );
};

export default UserInfo;
