import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import ProfileImage from '../components/ProfileImage';
import TweetCard from '../components/TweetCard';
import withAuth from '../hocs/withAuth';

const username = ({ backendHost }) => {
  const router = useRouter();
  const { username } = router.query;
  const [isOwner, setIsOwner] = useState(false);
  const [user, setUser] = useState({});
  const [tweets, setTweets] = useState([]);

  useEffect(async () => {
    const userId = localStorage.getItem("userId")
    const response = await fetch(`${backendHost}/users/${username}`)
    const data = await response.json()
    setUser(data.body);
    if (data.body._id === userId) setIsOwner(true);

    if (data.body._id) {
      const tweetsResponse = await fetch(`${backendHost}/tweets/user/${data.body._id}`);
      const tweetsData = await tweetsResponse.json();
      setTweets(tweetsData.body)
    }
  }, [username])

  return (
    <>
      <Layout title={user.username} backendHost={backendHost}>
        <div className="profile-container">
            <div className="hero">
              <div className="image-button">
                <ProfileImage big={true} />
                {isOwner ?
                  <Link href="/edit-profile">
                    <a>Edit profile</a>
                  </Link>
                : ""
                }
              </div>
              <div className="info">
                <h3>
                  {user.name}
                </h3>
                <span>@{user.username}</span>
              </div>
              <div className="bio">
                <p>{user.biography}</p>
              </div>
            </div>
          <div className="">
            {
              tweets.map((tweet) => (
                <TweetCard tweet={tweet} backendHost={backendHost}/>
                ))
              }
          </div>
        </div>
      </Layout>
      <style jsx>
          {`
            .profile-container {
              border: 1px solid var(--secondary-accent);
            }
            .info span {
              color: var(--text-secondary);
            }
            .hero {
              border-bottom: 1px solid var(--secondary-accent);
              padding: 10px;
            }
            a {
              border: 1px solid var(--primary);
              height: 38px;
              padding: 0 15px;
              border-radius: 50px;
              display: flex;
              align-items: center;
              text-decoration: none;
              color: var(--primary);
              font-weight: bold;
            }
            .image-button {
              display: flex;
              justify-content: space-between;
            }
          `}
      </style>
    </>
  );
};

export async function getServerSideProps() {
  const backendHost = process.env.BACKEND_HOST;
  return { props: {backendHost}}
};

export default withAuth(username);
