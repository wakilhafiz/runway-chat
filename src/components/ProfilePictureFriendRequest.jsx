import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { useEffect, useState } from "react";

const ProfilePictureFriendRequest = ({ user }) => {
  const storage = getStorage();
  const [image, setImage] = useState("");

  const profilePictureRef = ref(storage, user.senderId);

  useEffect(() => {
    getDownloadURL(profilePictureRef)
      .then((url) => {
        setImage(url);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user.senderId]);

  return (
    <>
      <div className="img relative">
        {image ? (
          <img src={image} alt="" />
        ) : (
          <h2 className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            {user.senderName[0]}
          </h2>
        )}
      </div>
    </>
  );
};

export default ProfilePictureFriendRequest;
