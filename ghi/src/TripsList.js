import { useGetTripsQuery } from "./store/tripsApi";
import { useEffect, useState } from "react";

function TripsList() {
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
                                <td>{trip.name}</td>
                                <td>{trip.start_date}</td>
                                <td>{trip.end_date}</td>
                                <td>{trip.description}</td>
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