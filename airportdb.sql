CREATE TABLE Flights (
    id SERIAL PRIMARY KEY,
    destination VARCHAR(100) NOT NULL,
    flight_number VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL
);

CREATE TABLE Passengers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    passport_number VARCHAR(50) NOT NULL,
    flight_id INTEGER,
    FOREIGN KEY (flight_id) REFERENCES Flights (id)
);

CREATE TABLE Staff (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    position VARCHAR(50) NOT NULL,
    flight_id INTEGER,
    FOREIGN KEY (flight_id) REFERENCES Flights (id)
);

CREATE TABLE Baggage (
    id SERIAL PRIMARY KEY,
    weight INT NOT NULL,
    status VARCHAR(50) NOT NULL,
    passenger_id INTEGER,
    FOREIGN KEY (passenger_id) REFERENCES Passengers (id)
);