import React from "react";
import "./singleBooking.css";
const SingleBooking = (props) => {
  const { booking } = props;
  return (
    <li className="singleBooking">
      <div className="booking-infos">
        <h3 className="title">{booking.event.title}</h3>
        <p className="infos">
          {new Date(booking.updatedAt).toLocaleDateString()}
        </p>
      </div>
      <div className="booking-cancel">
        <button onClick={() => props.cancelBookingHandler(booking._id)}>
          Cancel
        </button>
      </div>
    </li>
  );
};
export default SingleBooking;
