import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from "react-redux";
import ProfilePicture from "./ProfilePicture";

const UserList = () => {
  const db = getDatabase();
  const [userList, setUserList] = useState([]);
  const [friendRequestList, setFriendRequestList] = useState([]);
  const [friendList, setFriendList] = useState([]);
  console.log(friendRequestList);
  console.log(userList);
  const data = useSelector((state) => state.userLoginInfo.userInfo);

  //  Get all users from database start
  useEffect(() => {
    const userRef = ref(db, "users");
    let list = [];
    onValue(userRef, (snapshot) => {
      snapshot.forEach((item) => {
        if (data.uid !== item.key) {
          list.push({ ...item.val(), id: item.key });
        }
      });
      setUserList(list);
    });
  }, []);
  //  Get all users from database end

  // Send friend request start
  const handleFriendRequest = (item) => {
    set(push(ref(db, "friendRequest")), {
      senderId: data.uid,
      senderName: data.displayName,
      receiverId: item.id,
      receiverName: item.username,
    });
  };

  // Send friend request end
  useEffect(() => {
    const friendRequestRef = ref(db, "friendRequest");
    onValue(friendRequestRef, (snapshot) => {
      let friendRequest = [];
      snapshot.forEach((item) => {
        friendRequest.push(item.val().receiverId + item.val().senderId);
      });
      setFriendRequestList(friendRequest);
    });
  }, []);

  useEffect(() => {
    const friendListRef = ref(db, "friends");
    onValue(friendListRef, (snapshot) => {
      let friendList = [];
      snapshot.forEach((item) => {
        friendList.push(item.val().receiverId + item.val().senderId);
      });
      setFriendList(friendList);
    });
  }, []);

  return (
    <div className="list">
      <div className="list_header">
        <h2>User List</h2>
        <BsThreeDotsVertical />
      </div>

      {userList.map((item) => {
        return (
          <div key={item.id} className="listItem">
            <div className="imageAndName">
              <ProfilePicture item={item}></ProfilePicture>
              <div>
                <h2>{item.username}</h2>
                <p>{item.email}</p>
              </div>
            </div>
            <div>
              {friendList.includes(item.id + data.uid) ||
              friendList.includes(data.uid + item.id) ? (
                <button className="button_v_4 ">friend</button>
              ) : (
                <div>
                  {friendRequestList.includes(item.id + data.uid) ||
                  friendRequestList.includes(data.uid + item.id) ? (
                    <button className="button_v_3">Pending</button>
                  ) : (
                    <button
                      onClick={() => handleFriendRequest(item)}
                      className="button_v_2 "
                    >
                      Add Friend
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserList;
