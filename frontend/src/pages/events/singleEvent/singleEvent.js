import React, { useContext } from "react";
import AuthContext from "../../../context/authContext";
import "./singleEvent.css";
import { convertTimestampsToDate } from "../../../helpers/date";
const SingleEvent = (props) => {
  const { event } = props;
  const context = useContext(AuthContext);

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
            <button onClick={() => props.viewDetailHandler(event._id)}>
              view detail
            </button>
          )}
        </div>
      </li>
    </React.Fragment>
  );
};
export default SingleEvent;
