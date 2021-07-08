
const TweetButton = ({ enable, onClick }) => {
  return (
    <>
      <button disabled={!enable} onClick={onClick}>
        Tweet
      </button>
      <style jsx>{`
        button {
          height: 40px;
          outline: none;
          border: none;
          background-color: var(--primary);
          border-radius: 50px;
          color: var(--secondary);
          padding: 0px 15px;
          font-weight: bold;
          font-size: 16px;
          margin: 10px;
        }
        button:disabled {
          background: var(--primary-disabled);
        }
      `}</style>
    </>
  );
};

export default TweetButton;
