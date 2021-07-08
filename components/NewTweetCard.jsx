import { useState } from 'react';
import ProfileImage from './ProfileImage';
import TweetButton from "./TweetButton";
import UserInfo from "./UserInfo";

const NewTweetCard = ({ backendHost, user }) => {
  const [charactersQuantity, setCharactersQuantity] = useState(0);
  const [buttonEnable, setButtonEnable] = useState(false);
  const [exceedCharacters, setExceedCharacters] = useState(false);

  const countCharacters = () => {
    const textarea = document.querySelector("#new-tweet-text");
    setCharactersQuantity(textarea.value.trim().length);
    if (textarea.value.trim().length === 0) {
      setButtonEnable(false);
    } else if (textarea.value.trim().length > 250) {
      setButtonEnable(false);
      setExceedCharacters(true);
    } else {
      setExceedCharacters(false);
      setButtonEnable(true);
    }
  }

  const createTweet = async (e) => {
    e.preventDefault();
    const textarea = document.querySelector("#new-tweet-text");
    const values = {
      message: textarea.value,
      user: localStorage.getItem("userId")
    }
    const response = await fetch(`${backendHost}/tweets`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(values)
    });
    const data = await response.json();
    if (!data.error) {
      window.location.reload();
    }
  }
  
  return (
    <>
      <div className="new-tweet-container">
      {!user.img ?
          <ProfileImage />
          : ""
        }
        <div className="tweet-content">
          <UserInfo user={user} />
          <textarea name="" id="new-tweet-text" placeholder="What's happening?" onChange={countCharacters} />
          <div className="new-tweet-footer">
            <p className={exceedCharacters ? "error" : ""}>{charactersQuantity}/250</p>
            <TweetButton enable={buttonEnable} onClick={createTweet} />
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .new-tweet-container {
            border: 1px solid var(--secondary-accent);
            border-bottom: 10px solid var(--accent-two);
            display: flex;
            width: calc(100% - 2px);
          }
          .tweet-content {
            width: calc(100% - 10px);
          }
          textarea {
            width: calc(100% - 30px);
            max-width: calc(100% - 30px);
            height: 100px;
            border: none;
            outline: none;
            font-size: 16px;
            margin: 0px 15px;
            color: var(--text-primary);
            resize: none;
            border-bottom: 1px solid var(--secondary-accent);
          }
          textarea::placeholder {
            color: var(--text-secondary);
          }
          .new-tweet-footer {
            display: flex;
            justify-content: flex-end;
            align-items: center;
          }
          .error {
            color: var(--primary-error);
          }
        `}
      </style>
    </>
  );
};
export default NewTweetCard;
