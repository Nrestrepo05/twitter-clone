import UserInfo from "./UserInfo";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import ProfileImage from "./ProfileImage";

const TweetCard = ({ tweet, backendHost }) => {
  const userId = localStorage.getItem("userId")

  const handleLike = async () => {
    await fetch(`${backendHost}/tweets/like`, {
      method: 'post',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({ userId, tweetId: tweet._id })
    })
    window.location.reload()
  }

  return (
    <>
      <div className="tweet-container">
        {!tweet.user.img ?
          <ProfileImage />
          : ""
        }
        <div className="tweet-content">
          <UserInfo user={tweet.user} />
          <p>{tweet.message}</p>
          <div className="tweet-footer">
            {/* <div className="tweet-comment-button">
              <FontAwesomeIcon icon={faComment} />
            </div> */}
            {tweet.likes.includes(userId) 
              ?
              <div className="tweet-like-button liked" role="button" onClick={handleLike}>
                <FontAwesomeIcon icon={faHeartSolid} />
              </div>
              :
              <div className="tweet-like-button" role="button" onClick={handleLike}>
                <FontAwesomeIcon icon={faHeart} />
              </div>
            }
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .tweet-container {
            border: 1px solid var(--secondary-accent);
            display: flex;
          }
          .tweet-container:hover {
            background: var(--accent-two);
          }
          .tweet-content {
            width: 100%;
          }
          .tweet-footer {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .tweet-like-button {
            margin: 5px;
            margin-top: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 30px;
            height: 30px;
            font-size: 16px;
            border-radius: 50%;
            color: var(--text-secondary);
          }
          .tweet-like-button.liked {
            color: var(--primary-error);
          }
          .tweet-like-button:hover {
            color: var(--primary-error);
            background: #f5e2e8;
          }
          .tweet-comment-button {
            margin: 5px;
            margin-top: 0;
            color: var(--text-secondary);
            font-size: 16px;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .tweet-comment-button:hover {
            color: var(--primary);
            background: #e1eff6;
            border-radius: 50%;
          }
          p {
            padding: 0px 15px 10px 15px;
          }
        `}
      </style>
    </>
  );
};

export default TweetCard;
