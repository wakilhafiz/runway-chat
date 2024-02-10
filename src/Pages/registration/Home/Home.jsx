import { useSelector } from "react-redux";
import BlockedUsers from "../../../components/BlockedUsers";
import FriendRequest from "../../../components/FriendRequest";
import Friends from "../../../components/Friends";
import GroupList from "../../../components/GroupList";
import MyGroup from "../../../components/MyGroup";
import UserLIst from "../../../components/UserLIst";
import Header from "../../../components/Header";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  console.log(data);

  useEffect(() => {
    if (!data) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Header />
      <div id="home">
        <div className="item">
          <Friends></Friends>
        </div>
        <div className="item">
          <FriendRequest></FriendRequest>
        </div>
        <div className="item">
          <UserLIst></UserLIst>
        </div>
        <div className="item">
          <GroupList></GroupList>
        </div>
        <div className="item">
          <MyGroup></MyGroup>
        </div>
        <div className="item">
          <BlockedUsers></BlockedUsers>
        </div>
      </div>
    </>
  );
};

export default Home;
