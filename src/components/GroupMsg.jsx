import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const GroupMsg = () => {
  const db = getDatabase();
  const data = useSelector((state) => state.userLoginInfo.userInfo);

  const [groupList, setGroupList] = useState([]);

  useEffect(() => {
    const groupRef = ref(db, "groups");
    onValue(groupRef, (snapshot) => {
      let list = [];
      snapshot.forEach((item) => {
        list.push({ ...item.val(), id: item.key });
      });
      setGroupList(list);
    });
  });

  return (
    <div>
      {groupList.map((item, i) => {
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
              <button onClick={() => handleBlock(item)} className="button_v_4">
                Block
              </button>
              <button className="button_v_3">Unfriend</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GroupMsg;
