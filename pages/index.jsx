import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import NewTweetCard from '../components/NewTweetCard';
import TweetCard from '../components/TweetCard';
import withAuth from '../hocs/withAuth';

const Home = ({ tweets, backendHost }) => {
  const [user, setUser] = useState({name: "", username: "", _id: ""});

  useEffect(async () => {
    const userId = localStorage.getItem("userId");
    const userResponse = await fetch(`${backendHost}/users/${userId}`);
    const userData = await userResponse.json();
    setUser(userData.body);
  }, [])

  return (
    <Layout title="Home" user={user} backendHost={backendHost}>
      <div className="">
        <NewTweetCard backendHost={backendHost} user={user} />
        { tweets ?
            tweets.map((tweet) => (
              <TweetCard tweet={tweet} key={tweet._id} backendHost={backendHost} />
            ))
          : ""
        }
      </div>
    </Layout>
  );
};

export async function getServerSideProps() {
  const backendHost = process.env.BACKEND_HOST;
  const response = await fetch(`${backendHost}/tweets`);
  const data = await response.json();
  const tweets = data.body;

  return {
    props: { tweets, backendHost },
  }
}

export default withAuth(Home);
