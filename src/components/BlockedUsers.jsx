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

const BlockedUsers = () => {
  const db = getDatabase();
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  const [blockList, setBlockList] = useState([]);

  // Get Block User from Data Start
  useEffect(() => {
    const blockRef = ref(db, "block");
    onValue(blockRef, (snapshot) => {
      snapshot.forEach((item) => {
        const list = [];
        if (data.uid == item.val().blockById) {
          list.push({
            id: item.key,
            block: item.val().block,
            blockId: item.val().blockId,
          });
        } else {
          list.push({
            id: item.key,
            blockBy: item.val().blockBy,
            blockById: item.val().blockById,
          });
        }
        setBlockList(list);
      });
    });
  }, []);
  // Get Block User from Data End
  const handleUnblock = (item) => {
    set(push(ref(db, "friends")), {
      senderId: item.blockId,
      senderName: item.block,
      receiverId: data.uid,
      receiverName: data.displayName,
    }).then(() => {
      remove(ref(db, "block/" + item.id));
    });
  };

  return (
    <div className="list">
      <div className="list_header">
        <h2>Blocked Users</h2>
        <BsThreeDotsVertical />
      </div>

      {blockList.map((item) => {
        return (
          <div key={item.id} className="listItem">
            <div className="imageAndName">
              <div className="img">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIueJGeSyuVLn5oDRVPy1WJT25h0cJEHoQRg&usqp=CAU"
                  alt=""
                />
              </div>
              <div>
                <h2>{item.block ? item.block : item.blockBy}</h2>
                <p>Hello...</p>
              </div>
            </div>
            <div>
              {item.block ? (
                <button
                  onClick={() => handleUnblock(item)}
                  className="button_v_3"
                >
                  Unblock
                </button>
              ) : (
                <button className="button_v_4">Blocked</button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BlockedUsers;
