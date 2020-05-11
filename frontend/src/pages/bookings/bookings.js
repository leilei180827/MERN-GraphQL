import React, { useState, useEffect, useContext } from "react";
import "./bookings.css";
import AuthContext from "../../context/authContext";
import SingleBooking from "./singleBooking/singleBooking";
const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const context = useContext(AuthContext);
  const cancelBookingHandler = (bookingId) => {
    const requestBody = {
      query: `mutation{
        cancelBooking(bookingId:"${bookingId}"){
          title
          description
        }
      }`,
    };
    fetch("http://localhost:5000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + context.token,
      },
    })
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          throw new Error("something went wrong");
        }
        return response.json();
      })
      .then(() => {
        let tempBookings = bookings.filter(
          (booking) => booking._id !== bookingId
        );
        setBookings(tempBookings);
      });
  };

  useEffect(() => {
    const fetchBookings = () => {
      const requestBody = {
        query: `query{
          bookings{
            _id
            createdAt
            updatedAt
            event{
              title
            }
          }
        }`,
      };
      fetch("http://localhost:5000/graphql", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + context.token,
        },
      })
        .then((response) => {
          if (response.status !== 200 && response.status !== 201) {
            throw new Error("something went wrong");
          }
          return response.json();
        })
        .then(({ data: { bookings } }) => {
          setBookings(bookings);
        });
    };
    fetchBookings();
  }, [context.token]);

  return (
    <ul className="bookings-wrap">
      {bookings.map((booking) => (
        <SingleBooking
          key={booking._id}
          booking={booking}
          cancelBookingHandler={cancelBookingHandler}
        />
      ))}
    </ul>
  );
};
export default Bookings;
