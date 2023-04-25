import React from "react";
import { useGetTripsQuery, useDeleteTripMutation } from "./store/tripsApi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import bgImage from "./Tripslist.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function TripsList() {
  const bgStyle = {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  const [deleteTrip, result] = useDeleteTripMutation();

  const { data, error, isLoading } = useGetTripsQuery();

  if (isLoading) {
    return <progress className="progress is-primary" max="100"></progress>;
  }

  return (
    <div style={bgStyle}>
      {/* ... */}
      <div id="tripCarousel" className="carousel slide mt-5" data-bs-ride="carousel">
        <div className="carousel-inner">
          {data &&
            data.trips.map((trip, index) => (
              <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={trip.id}>
                <Link to={`/trips/${trip.id}`}>
                  <img src={trip.imageUrl} className="d-block w-100" alt="..." />
                </Link>
              </div>
            ))}
        </div>
        {<div id="tripCarousel" className="carousel slide mt-5" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="https://delivery.gfobcontent.com/api/public/content/d6cbba5c648c445292bd3adcb758828d?v=5ae72efe&t=h300" className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://delivery.gfobcontent.com/api/public/content/2cf96cca8cdc418b8762903b47b8d301?v=59d455db&t=h300" className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://delivery.gfobcontent.com/api/public/content/8ed2ad33eb3d41d5bafedf7edde12f31?v=79e4c289&t=h300" className="d-block w-100" alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#tripCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#tripCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>}
      </div>
    </div>
  );
}

export default TripsList;
