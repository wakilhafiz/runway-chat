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

const Friends = () => {
  const db = getDatabase();
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  const [friendList, setFriendList] = useState([]);

  // get friend from firebase
  useEffect(() => {
    const friendRef = ref(db, "friends/");
    onValue(friendRef, (snapshot) => {
      let list = [];
      snapshot.forEach((item) => {
        if (
          data.uid == item.val().receiverId ||
          data.uid == item.val().senderId
        ) {
          list.push({ ...item.val(), key: item.key });
        }
      });
      setFriendList(list);
    });
  }, []);

  // Block list start
  const handleBlock = (item) => {
    if (data.uid == item.senderId) {
      set(push(ref(db, "block")), {
        block: item.receiverName,
        blockId: item.receiverId,
        blockBy: item.senderName,
        blockById: item.senderId,
      }).then(() => {
        remove(ref(db, "friends/" + item.key));
      });
    } else {
      set(push(ref(db, "block")), {
        block: item.senderName,
        blockId: item.senderId,
        blockBy: item.receiverName,
        blockById: item.receiverId,
      }).then(() => {
        remove(ref(db, "friends/" + item.key));
      });
    }
  };
  // Block list end

  return (
    <div className="list">
      <div className="list_header">
        <h2>Friend List</h2>
        <BsThreeDotsVertical />
      </div>

      {friendList.length == 0 ? (
        <h1>Empty</h1>
      ) : (
        <>
          {friendList.map((item, i) => {
            return (
              <div key={i} className="listItem">
                <div className="imageAndName">
                  <div className="img">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIueJGeSyuVLn5oDRVPy1WJT25h0cJEHoQRg&usqp=CAU"
                      alt=""
                    />
                  </div>

                  <div>
                    {data.uid == item.senderId ? (
                      <h2>{item.receiverName}</h2>
                    ) : (
                      <h2>{item.senderName}</h2>
                    )}
                    <p>Hello...</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleBlock(item)}
                    className="button_v_4"
                  >
                    Block
                  </button>
                  <button className="button_v_3">Unfriend</button>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default Friends;
