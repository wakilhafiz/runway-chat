import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PacmanLoader from "react-spinners/PacmanLoader";
import { toast } from "react-toastify";

const GroupList = () => {
  const [show, setShow] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [tagName, setTagName] = useState("");
  const [loading, setLoading] = useState(false);
  const [groupList, setGroupList] = useState([]);
  console.log(groupList);

  const db = getDatabase();
  const data = useSelector((state) => state.userLoginInfo.userInfo);

  const handleGroupName = (e) => {
    setGroupName(e.target.value);
  };

  const handleTagName = (e) => {
    setTagName(e.target.value);
  };

  const handleCreateGroup = () => {
    if (groupName && tagName) {
      setLoading(true);
      set(push(ref(db, "groups")), {
        groupName: groupName,
        tagName: tagName,
        adminName: data.displayName,
        adminId: data.uid,
      }).then(() => {
        setLoading(false);
        setShow(false);
        setGroupName("");
        setTagName("");
      });
    } else {
      alert("Please enter group & tagline");
    }
  };

  // get group list from db
  useEffect(() => {
    const groupRef = ref(db, "groups");
    onValue(groupRef, (snapShot) => {
      let list = [];
      snapShot.forEach((item) => {
        if (data.uid != item.val().adminId) {
          list.push({ ...item.val(), id: item.key });
        }
      });
      setGroupList(list);
    });
  }, []);

  // send group join request
  const handleJoinRequest = (item) => {
    set(push(ref(db, "groupJoinRequest")), {
      groupId: item.id,
      groupName: item.groupName,
      adminId: item.adminId,
      adminName: item.adminName,
      userId: data.uid,
      userName: data.displayName,
      tagName: item.tagName,
    }).then(() => {
      toast.success(`${item.groupName} Join Request Send Success`);
    });
  };

  return (
    <div className="list">
      <div className="list_header">
        <h2>Groups</h2>
        <div>
          {show ? (
            <button
              onClick={() => {
                setShow(!show), setLoading(false);
              }}
              className="button_v_3"
            >
              Cancel
            </button>
          ) : (
            <button onClick={() => setShow(!show)} className="button_v_4">
              Create Group
            </button>
          )}
        </div>
      </div>

      {show ? (
        <div className="bg-secondary px-5 py-6 rounded-lg">
          <input
            name="groupName"
            onChange={handleGroupName}
            className=""
            type="text"
            placeholder="Group Name"
          />
          <input
            name="tagName"
            onChange={handleTagName}
            className="my-2"
            type="text"
            placeholder="Tag Line"
          />
          {loading ? (
            <div className="flex justify-center items-center">
              <PacmanLoader color="#fff" />
            </div>
          ) : (
            <button onClick={handleCreateGroup} className="button_v_1">
              Create
            </button>
          )}
        </div>
      ) : (
        groupList.map((item) => {
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
                  <p className="!text-fourth">Admin: {item.adminName}</p>
                  <h2>{item.groupName}</h2>
                  <p>{item.tagName}</p>
                </div>
              </div>
              <div>
                <button
                  onClick={() => handleJoinRequest(item)}
                  className="button_v_2"
                >
                  Join Group
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default GroupList;
