import { useState } from "react";
import "./App.css";

function App() {
  let [postTitle, setPostTitle] = useState([
    "남자 코트 추천",
    "강남 우동 맛집",
    "파이썬 독학",
  ]);
  let [postDay, setPostDay] = useState([
    "1월 24일 발행",
    "1월 13일 발행",
    "1월 7일 발행",
  ]);
  let [likeCount, setLikeCount] = useState([0, 0, 0]);
  let [modal, setModal] = useState(false);
  let [clickedIndex, setClickedIndex] = useState(0);

  let [inputValue, setInputValue] = useState("");

  return (
    <div className="App">
      <div className="black-nav">
        <h4>ReactBlog</h4>
      </div>
      {postTitle.map(function (data, i) {
        return (
          <div className="list" key={i}>
            <h4
              onClick={() => {
                setModal(!modal);
                setClickedIndex(i);
              }}
            >
              {postTitle[i]}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  let copy = [...likeCount];
                  copy[i] = copy[i] + 1;
                  setLikeCount(copy);
                }}
              >
                👍
                {likeCount[i]}
              </span>
            </h4>
            <p>{postDay[i]}</p>
            <button
              onClick={() => {
                let deletedTitle = [...postTitle];
                let deletedDay = [...postDay];
                let deletedLike = [...likeCount];
                deletedTitle.splice(i, 1);
                deletedDay.splice(i, 1);
                deletedLike.splice(i, 1);
                setPostTitle(deletedTitle);
                setPostDay(deletedDay);
                setLikeCount(deletedLike);
              }}
            >
              삭제
            </button>
          </div>
        );
      })}
      <input
        type={"text"}
        placeholder="내용입력"
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      ></input>
      <button
        onClick={() => {
          if (inputValue !== "") {
            let today = new Date();
            let month = today.getMonth() + 1;
            let date = today.getDate();
            let newTitle = [...postTitle];
            newTitle.unshift(inputValue);
            let newDay = [...postDay];
            newDay.unshift(`${month}월 ${date}일 발행`);
            let newLike = [...likeCount];
            newLike.unshift(0);
            setPostTitle(newTitle);
            setPostDay(newDay);
            setLikeCount(newLike);
          } else {
            alert("입력하고 눌러라잉");
          }
        }}
      >
        글발행
      </button>
      {modal === true ? (
        <Modal
          postTitle={postTitle}
          clickedIndex={clickedIndex}
          postDay={postDay}
        />
      ) : null}
    </div>
  );
}

const Modal = (props) => {
  return (
    <div className="modal">
      <h4>{props.postTitle[props.clickedIndex]}</h4>
      <p>날짜 : {props.postDay[props.clickedIndex]}</p>
      <p>상세내용</p>
    </div>
  );
};

export default App;
