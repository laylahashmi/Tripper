import { useGetTripsQuery } from "./store/tripsApi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDeleteTripMutation } from "./store/tripsApi";

function TripsList() {

    const [ deleteTrip, result ] = useDeleteTripMutation()

    const {data, error, isLoading} = useGetTripsQuery();

    if (isLoading) {
        return (
            <progress className="progress is-primary" max='100'></progress>
        );
    }

    return (
        <>
        <div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.trips.map(trip => (
                            <tr key={trip.id}>
                                <td><Link to={`/trips/${trip.id}`}>{trip.name}</Link></td>
                                <td>{trip.start_date}</td>
                                <td>{trip.end_date}</td>
                                <td>{trip.description}</td>
                                <td><button onClick={() => deleteTrip(trip.id)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </>
  );
}

export default TripsList;