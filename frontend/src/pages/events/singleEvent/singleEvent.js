import React, { useContext } from "react";
import AuthContext from "../../../context/authContext";
import "./singleEvent.css";
const SingleEvent = ({ event }) => {
  const context = useContext(AuthContext);
  console.log("context");
  console.log(context.userId);
  const convertTimestampsToDate = (timestamps) => {
    let date = new Date(parseInt(timestamps));
    console.log(date);
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  };
  return (
    <React.Fragment>
      <li className="single-event">
        <div className="event-info">
          <div className="title">{event.title}</div>
          <div className="infos">
            ${event.price}-{convertTimestampsToDate(event.date)}
          </div>
        </div>
        <div className="event-creator">
          {context.userId === event.creator._id ? (
            <p>you're the owner of this event</p>
          ) : (
            <button>view detail</button>
          )}
        </div>
      </li>
    </React.Fragment>
  );
};
export default SingleEvent;
