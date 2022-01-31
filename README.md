# Restaurant Reservation App

## Deployed App
- [Restataurant Reservation App](https://restaur-reserve-frontend.herokuapp.com/dashboard)

## Description

A full-stack web application submitted as my final capstone at Thinkful. 

It allows users to: 
- Create, edit, and cancel a reservation
- Create a table, seat a reservation, then clear a table when the reservation party has finished.
- Search for reservations by phone number

The development process showcases the following practices:
- Outside-in Development
- As new features were added, separate branches were created per user story and merged once they were completed.
- Kanban board for keeping track of development progress

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
- Heroku for mono-repo deployment

## Screenshots
### Dashboard
![reservation-app-dashboard](https://user-images.githubusercontent.com/65349554/151879931-4a0ddc2e-39cc-435f-8e71-3646b6aa5763.png)

### Create Reservation
![reservation-app-create-reservation](https://user-images.githubusercontent.com/65349554/151880140-f67b0fee-62e8-4bd5-8e25-97a9da86dd67.png)

### Edit Reservation
![reservation-app-edit-reservation](https://user-images.githubusercontent.com/65349554/151880206-0e172d34-bcf9-4cad-b84f-1f9c09db9fd0.png)

### Create Table
![reservation-app-create-table](https://user-images.githubusercontent.com/65349554/151880268-be892e81-5711-480f-a60e-2e48bf518eef.png)

### Seat Reservation
![reservation-app-seat-reservatio](https://user-images.githubusercontent.com/65349554/151880330-01d3f3ff-a842-4878-9203-b5f7dd6c7a6e.png)

## API Documentation

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

 ### Reservation JSON Example
 ```json
"data": {
        "reservation_id": 08,
        "first_name": "Dennis",
        "last_name": "Reynolds",
        "mobile_number": "123-456-7890",
        "reservation_date": "2021-09-13T04:00:00.000Z",
        "reservation_time": "13:30:00",
        "people": 1,
        "status": "booked",
        "created_at": "2021-09-13T09:34:07.185Z",
        "updated_at": "2021-09-13T09:34:07.185Z"
    }
```

### Table JSON Example

```json
{
    "table_id": 2,
    "table_name": "Paddy's Table",
    "capacity": 5,
    "reservation_id": 08
}
```

## Installation
To install and run locally: 
- clone the repository 
- cd into cloned directory
- run the following command to install dependencies:
    ```shell
    npm install
    ```
- To start the application, run the following command:
    ```shell
    npm run start
    ```
