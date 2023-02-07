import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import makeAlert from "../Alert";

const DashboardPage = (props) => {
  const [chatrooms, setChatrooms] = React.useState([]);
  const getChatrooms = () => {
    axios
      .get("http://localhost:5000/chatroom", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("UI_Token"),
        },
      })
      .then((response) => {
        setChatrooms(response.data);
      })
      .catch((err) => {
        setTimeout(getChatrooms, 3000);
      });
  };

  React.useEffect(() => {
    getChatrooms();
    // eslint-disable-next-line
  }, []);
  
  const createChatroom = () => {
    const chatroomName = chatroomNameRef.current.value;

    axios
      .post("http://localhost:5000/chatroom", {
        name: chatroomName,
      }, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("UI_Token"),
        },
      })
      .then((response) => {
        makeAlert("success", response.data.message);
        getChatrooms();
        chatroomNameRef.current.value = "";
      })
      .catch((err) => {
        if (
          err &&
          err.response &&
          err.response.data &&
          err.response.data.message
        )
          makeAlert("error", err.response.data.message);
      });
  };
  
  const chatroomNameRef = React.createRef();

  return (
    <div className="card">
      <div className="cardHeader">Chatrooms</div>
      <div className="cardBody">
        <div className="inputGroup">
          <label htmlFor="chatroomName">Enter Chatroom Name</label>
          <input
            type="text"
            name="chatroomName"
            id="chatroomName"
            ref={chatroomNameRef}
            placeholder="Chatroom name"
          />
        </div>
      </div>
      <button onClick={createChatroom}>Create Chatroom</button>
      <div className="chatrooms">
        {chatrooms.map((chatroom) => (
          <div key={chatroom._id} className="chatroom">
            <Link to={"/chatroom/" + chatroom._id}>
              <div className="join">Join to room</div>
            </Link>
            <div>{chatroom.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
