import React, { useState } from "react";
import { Avatar, Input } from "@material-ui/core";
import "./QABox.css";
import axios from "axios";
import CloseIcon from "@material-ui/icons/Close";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";

import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

import { ExpandMore } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { token } from "../../Utils/decodedToken";
import { successModal } from "../../Utils/AlertModal";

export default function QABox() {
  
  useDispatch();

  const [IsmodalOpen, setIsModalOpen] = useState(false);
  const [input, setInput] = useState("");
  const [inputUrl, setInputUrl] = useState("");
  const userLogin = useSelector((state) => state.userLogin);

  const Close = (
    <CloseIcon
      style={{
        color: "red",
        border: " 2px solid lightgray",
        borderRadius: "3px",
      }}
    />
  );
  
  const handleQuestion = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };
    if (input !== "") {
      const body = {
        questionName: input,
        questionUrl: inputUrl,
        userId: userLogin?.userInfo?.userId
      };
      await axios
        .post("/api/questions", body, config)
        .then((res) => {
          console.log(res.data);
          console.log("question added successfully");
          setIsModalOpen(false);
          successModal('Question added successfully')
        })
        .catch((err) => {
          console.log(err);
        });
    }

    setInput("");
    setInputUrl("");
  };
  return (
    <div className="qabox">
      <div className="qabox__info">
        <Avatar
          src={
            "https://cdn-icons-png.flaticon.com/128/1177/1177568.png"
          }
          className="qabox__infoAvatar"
        />
      </div>
      <div className="qabox__socialqa" onClick={() => setIsModalOpen(true)}>
        <p>What is your question or link?</p>
      </div>
      <Modal
                open={IsmodalOpen}
                onClose={() => setIsModalOpen(false)}
                closeOnEsc
                closeIcon={Close}
                closeOnOverlayClick={false}
                center
                style={{
                    overlay: {
                    width: 700,
                    height: 600,
                    backgroundColor: "rgba(0,0,0,0.8)",
                    zIndex: "1000",
                    top: "50%",
                    left: "50%",
                    marginTop: "-300px",
                    marginLeft: "-350px",
                    },
                }}
            >
            <div className="modal__title">
              <h5>Add Question</h5>
              <h5>Share Link</h5>
            </div>
            <div className="modal__info">
              <Avatar
                className="avatar"
                src={
                  "https://cdn-icons-png.flaticon.com/128/1177/1177568.png"
                }
              />
              {/* <img src="http://tinygraphs.com/squares/helloworld" /> */}
              {/* <p>{user?.disPlayName ? user?.disPlayName : user?.email} asked</p> */}
              <div className="modal__scope">
              {/* <select name="dog-names" id="dog-names">
                  <option value="Public">Public</option>
                  <option value="Education">Education</option>
                  <option value="Query">Query</option>
                  <option value="Music">Music</option>
                  <option value="Memes">Memes</option>
                  <option value="Technology">Technology</option>
                  <option value="Movies">Movies</option>
                  <option value="Bussiness">Bussiness</option>
                  <option value="History">History</option>
              </select> */}
                <PeopleAltOutlinedIcon />
                <p>Public</p>
                <ExpandMore />
              </div>
            </div>
            <div className="modal__Field">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
                placeholder="Start your question with 'What', 'How', 'Why', etc. "
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
                className="modal__fieldLink"
              >
                {/* <Link /> */}
                <input
                  style={{
                    width: "100%",
                    margin: "5px 0",
                    border: "1px solid lightgray",
                    padding: "10px",
                    outline: "2px solid #000",
                  }}
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  type="text"
                  placeholder="Optional: inclue a link that gives context"
                ></input>
                {inputUrl !== "" && (
                  <img style={{
                    height: "40vh",
                    objectFit: "contain"
                  }} src={inputUrl} alt=""></img>
                )}
              </div>
            </div>
            <div className="modal__buttons">
              <button className="cancle" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button type="sumbit" onClick={handleQuestion} className="add">
                Add Question
              </button>
            </div>
          </Modal>
    </div>
  );
}
