import React, { useState, useRef, useContext, useEffect } from "react";
import { Modal } from "../../components";
import "./events.css";
import AuthContext from "../../context/authContext";
import  SingleEvent  from "./singleEvent/singleEvent";
const Events = () => {
  const [modal, setModal] = useState(false);
  const [events, setEvents] = useState([]);
  const titleEl = useRef("");
  const dateEl = useRef("");
  const priceEl = useRef("");
  const descriptionEl = useRef("");
  const context = useContext(AuthContext);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    const fetchEventsBody = {
      query: `query {
        events{
          _id
          title
          description
          date
          price
          creator{
            _id
            email
          }
        }
      }`,
    };
    fetch("http://localhost:5000/graphql", {
      method: "POST",
      body: JSON.stringify(fetchEventsBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          throw new Error("something went wrong");
        }
        return response.json();
      })
      .then(({ data: { events } }) => {
        setEvents(events);
      })
      .catch((error) => console.log(error));
  };
  const createEventHandler = (event) => {
    setModal(true);
  };
  const onCancel = () => {
    setModal(false);
  };
  const onConfirm = (event) => {
    event.preventDefault();
    setModal(false);
    const requestBody = {
      query: `
    mutation{
      createEvent(eventInput:{
        title:"${titleEl.current.value}",
        date:"${dateEl.current.value}",
        price:${+priceEl.current.value},
        description:"${descriptionEl.current.value}"
      }){
        _id
        title
        date
        description
        creator{
          _id
          email
        }
      }
    }`,
    };
    fetch("http://localhost:5000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + context.token,
      },
    })
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          throw new Error("something went wrong");
        }
        return response.json();
      })
      .then(() => fetchEvents())
      .catch((error) => console.log(error));
  };
  const modalContent = (
    <form className="modal-form">
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" ref={titleEl} />
      </div>
      <div className="form-group">
        <label htmlFor="date">Date:</label>
        <input type="date" id="date" ref={dateEl} />
      </div>
      <div className="form-group">
        <label htmlFor="price">Price:</label>
        <input type="number" id="price" ref={priceEl} />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea id="description" rows="4" ref={descriptionEl} />
      </div>
    </form>
  );
  return (
    <React.Fragment>
      {modal && (
        <Modal
          title="create event"
          canCancel
          canConfirm
          onCancel={onCancel}
          onConfirm={onConfirm}
        >
          {modalContent}
        </Modal>
      )}
      {context.token && (
        <div className="event-wrap">
          <p className="secondary-title">Share your own events</p>
          <button className="event-btn" onClick={createEventHandler}>
            Create Event
          </button>
        </div>
      )}
      <div className="event-items-wrap">
        <ul>
          {events.map((event) => <SingleEvent key={event._id} event={event}/>)}
        </ul>
      </div>
    </React.Fragment>
  );
};
export default Events;
