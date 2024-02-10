import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector } from "react-redux";
import ProfilePictureFriendRequest from "./ProfilePictureFriendRequest";

const FriendRequest = () => {
  const db = getDatabase();
  const [friendRequestList, setFriendRequestList] = useState([]);
  const [show, setShow] = useState(false);

  const data = useSelector((state) => state.userLoginInfo.userInfo);
  console.log(data);

  useEffect(() => {
    const friendRequestRef = ref(db, "friendRequest");
    onValue(friendRequestRef, (snapshot) => {
      let friendRequest = [];
      snapshot.forEach((item) => {
        if (item.val().receiverId === data.uid) {
          friendRequest.push({ ...item.val(), id: item.key });
        }
      });
      setFriendRequestList(friendRequest);
    });
  }, []);

  // friend request cancel start
  const handleFriendRequestCancel = (item) => {
    remove(ref(db, "friendRequest/" + item.id));
    setShow(false);
  };
  // friend request cancel end

  // friend request accept start
  const handleFriendRequestAccept = (item) => {
    set(push(ref(db, "friends")), { ...item }).then(() => {
      remove(ref(db, "friendRequest/" + item.id));
    });
  };
  // friend request accept end

  return (
    <div className="list relative">
      <div className="list_header">
        <h2>
          Friend Request{" "}
          <span className="text-seventh">{friendRequestList.length}</span>
        </h2>
        <BsThreeDotsVertical />
      </div>

      {friendRequestList.length > 0 ? (
        <>
          {friendRequestList.map((item, i) => {
            return (
              <div key={i} className="listItem">
                {show && (
                  <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-seventh w-[300px] p-10 z-[999]">
                    <div className="mb-5">
                      <h2>{item.senderName}</h2>
                    </div>
                    <div className="flex gap-4">
                      <button
                        className="button_v_3"
                        onClick={() => handleFriendRequestCancel(item)}
                      >
                        Okay
                      </button>
                      <button
                        onClick={() => setShow(false)}
                        className="button_v_4"
                      >
                        Don't
                      </button>
                    </div>
                  </div>
                )}

                <div className="imageAndName">
                  <ProfilePictureFriendRequest
                    user={item}
                  ></ProfilePictureFriendRequest>
                  <div>
                    <h2>{item.senderName}</h2>
                    <p>Hello...</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleFriendRequestAccept(item)}
                    className="button_v_2 "
                  >
                    Accept
                  </button>
                  <button onClick={() => setShow(true)} className="button_v_3 ">
                    Cancel
                  </button>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <h2>Empty</h2>
      )}
    </div>
  );
};

export default FriendRequest;
