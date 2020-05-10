import React, { useState } from "react";
import { Modal } from "../../components";   
import "./events.css";
const Events = () => {
  const [modal, setModal] = useState(false);
  const createEventHandler = (event) => {
    setModal(true);
  };
  return (
    <React.Fragment>
      {modal && <Modal></Modal>}
      <div className="event-wrap">
        <p className="secondary-title">Share your own events</p>
        <button className="event-btn" onClick={createEventHandler}>
          Create Event
        </button>
      </div>
      <div className="event-items-wrap">
        <ul></ul>
      </div>
    </React.Fragment>
  );
};
export default Events;
