# Restaurant Reservation App

## Deployed App
- [Restataurant Reservation App](https://restaur-reserve-frontend.herokuapp.com/dashboard)

## Description

A full-stack web application submitted as my final capstone at Thinkful. 

It allows users to: 
- Create, edit, and cancel a reservation
- Create a table, seat a reservation, then clear a table when the reservation party has finished.
- Search for reservations by phone number

## Technologies & Tools Used
- PERN Technology Stack:
    - PostgreSQL
    - Express
    - React
        - APIs with hooks
        - Router
        - Management
    - Node
- JavaScript
- HTML
- CSS
- Bootstrap 5.1
- RESTful APIs


| Route                                | Method | Status Code |                                                         Description |
|:------------------------------------ |:------:|:-----------:| -------------------------------------------------------------------:|
| /reservations                        |  GET   |     200     |                 Returns a list of reservations for the current date |
| /reservations?date=####-##-##        |  GET   |     200     |                   Returns a list of reservations for the given date |
| /reservations                        |  POST  |     201     |                                           Creates a new reservation |
| /reservations/:reservation_id        |  GET   |     200     |                            Returns the reservation for the given ID |
| /reservations/:reservation_id        |  PUT   |     200     |                            Updates the reservation for the given ID |
| /reservations/:reservation_id/status |  PUT   |     200     |              Updates the status of the reservation for the given ID |
| /tables                              |  GET   |     200     |                                            Returns a list of tables |
| /tables                              |  POST  |     201     |                                                 Creates a new table |
| /tables/:table_id/seat               |  PUT   |     200     |                           Seats a reservation at the given table_id |
| /tables/:table_id/seat               | DELETE |     200     | Changes the occupied status to be unoccupied for the given table_id |