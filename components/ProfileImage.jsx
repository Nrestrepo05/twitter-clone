
const ProfileImage = ({ source, big = false }) => {
  return (
    <>
      <img 
        src={source ? source : "/assets/images/default-twitter.png"} alt="Profile Image" 
        className={big ? "big" : ""}
      />
      <style jsx>{`
          img {
            margin: 5px 0px 0px 10px;
            width: 48px;
            height: 48px;
            border-radius: 50%;
          }
          img.big {
            width: 120px;
            height: 120px;
            margin: 0;
          }
        `}
      </style>
    </>
  );
};

export default ProfileImage;
