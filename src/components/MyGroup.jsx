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

const MyGroup = () => {
  const [myGroupList, setMyGroupList] = useState([]);
  const [show, setShow] = useState(false);
  const [showGroupInfo, setShowGroupInfo] = useState(false);
  const [groupJoinRequest, setGroupJoinRequest] = useState([]);
  const [groupMembers, setGroupMembers] = useState([]);
  const db = getDatabase();
  const data = useSelector((state) => state.userLoginInfo.userInfo);

  // filter my group
  useEffect(() => {
    const groupRef = ref(db, "groups");

    onValue(groupRef, (snapshot) => {
      let list = [];
      snapshot.forEach((item) => {
        if (data.uid === item.val().adminId) {
          list.push({ ...item.val(), key: item.key });
        }
      });
      setMyGroupList(list);
    });
  }, []);

  // handle group delete
  const handleGroupDelete = (item) => {
    // remove(ref(db, "groups/" + item.key));
    console.log("Click");
  };

  // handle show individual group join request
  const handleGroupRequest = (group) => {
    setShow(true);

    const gruopRequestRef = ref(db, "groupJoinRequest");
    onValue(gruopRequestRef, (snapshot) => {
      let list = [];
      snapshot.forEach((item) => {
        if (data.uid == item.val().adminId && item.val().groupId == group.key) {
          list.push({ ...item.val(), key: item.key });
        }
      });
      setGroupJoinRequest(list);
    });
  };

  // group join request accept
  const handleGroupRequestAccept = (item) => {
    set(push(ref(db, "groupMembers")), {
      groupId: item.groupId,
      groupName: item.groupName,
      adminId: item.adminId,
      adminName: item.adminName,
      userId: item.userId,
      userName: item.userName,
    }).then(() => {
      remove(ref(db, "groupJoinRequest/" + item.key));
    });
  };

  // show individual group info
  const handleGroupInfo = (group) => {
    setShowGroupInfo(true);

    const groupMembersRef = ref(db, "groupMembers");
    onValue(groupMembersRef, (snapshot) => {
      let list = [];
      snapshot.forEach((item) => {
        if (data.uid == group.adminId && item.val().groupId == group.key) {
          list.push({ ...item.val(), key: item.key });
        }
      });
      setGroupMembers(list);
    });
    console.log(groupMembers);
  };

  return (
    <div className="list">
      <div className="list_header">
        <h2>My Group</h2>
        {show ? (
          <button className="button_v_1 w-auto" onClick={() => setShow(false)}>
            Back
          </button>
        ) : showGroupInfo ? (
          <button
            className="button_v_1 w-auto"
            onClick={() => setShowGroupInfo(false)}
          >
            Back
          </button>
        ) : (
          <BsThreeDotsVertical />
        )}
      </div>

      {show ? (
        groupJoinRequest.length == 0 ? (
          <h1>Empty Join Request</h1>
        ) : (
          groupJoinRequest.map((item) => {
            return (
              <div key={item.key} className="listItem">
                <div className="imageAndName">
                  <div className="img">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIueJGeSyuVLn5oDRVPy1WJT25h0cJEHoQRg&usqp=CAU"
                      alt=""
                    />
                  </div>
                  <div>
                    <h2>{item.userName}</h2>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleGroupRequestAccept(item)}
                    className="button_v_2"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleGroupRequest(item)}
                    className="button_v_4"
                  >
                    Reject
                  </button>
                </div>
              </div>
            );
          })
        )
      ) : showGroupInfo ? (
        groupMembers.length == 0 ? (
          <h1>No Group Request</h1>
        ) : (
          groupMembers.map((item) => {
            return (
              <div key={item.key} className="listItem">
                <div className="imageAndName">
                  <div className="img">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIueJGeSyuVLn5oDRVPy1WJT25h0cJEHoQRg&usqp=CAU"
                      alt=""
                    />
                  </div>
                  <div>
                    <h2>{item.userName}</h2>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="button_v_3">Ban</button>
                </div>
              </div>
            );
          })
        )
      ) : (
        myGroupList.map((group) => {
          return (
            <div key={group.key} className="listItem">
              <div className="imageAndName">
                <div className="img">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIueJGeSyuVLn5oDRVPy1WJT25h0cJEHoQRg&usqp=CAU"
                    alt=""
                  />
                </div>
                <div>
                  <p className="!text-fourth">Admin: {group.adminName}</p>
                  <h2>{group.groupName}</h2>
                  <p>{group.tagName}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleGroupInfo(group)}
                  className="button_v_2"
                >
                  Info
                </button>
                <button
                  onClick={() => handleGroupRequest(group)}
                  className="button_v_4"
                >
                  Request
                </button>
                <button
                  onClick={() => handleGroupDelete(group)}
                  className="button_v_3"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default MyGroup;
