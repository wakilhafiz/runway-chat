import Chatting from "../../../components/Chatting";
import Friends from "../../../components/Friends";
import GroupMsg from "../../../components/GroupMsg";
import Header from "../../../components/Header";

const Chat = () => {
  return (
    <>
      <Header></Header>
      <div className="container mx-auto px-20 flex mt-5">
        <div className="w-[30%]">
          <div className="shadow-lg rounded-lg">
            <GroupMsg></GroupMsg>
          </div>
          <div>
            <Friends></Friends>
          </div>
        </div>
        <div className="w-[70%] pl-48">
          <Chatting></Chatting>
        </div>
      </div>
    </>
  );
};

export default Chat;
