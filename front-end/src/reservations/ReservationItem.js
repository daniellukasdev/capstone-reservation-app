import React from "react";

export default function ReservationItem({ reservation }) {
    const { 
        reservation_id, 
        first_name, 
        last_name, 
        mobile_number, 
        reservation_date, 
        reservation_time, 
        people, 
    } = reservation;
    return (
        <tr key={reservation_id}>
            <td>{reservation_id}</td>
            <td>{last_name}, {first_name}</td>
            <td>{mobile_number}</td>
            <td>{reservation_date}</td>
            <td>{reservation_time}</td>
            <td>{people}</td>
        </tr>
    );
}