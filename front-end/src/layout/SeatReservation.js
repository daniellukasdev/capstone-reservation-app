import React from "react";
import { useParams } from "react-router";

export default function SeatReservation() {
    const { reservationId } = useParams();
    return(
        <div>
            <h1>Seat Reservation</h1>
        </div>
    );
}