import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { NavBar } from "../NavBar/NavBar";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"


export const DashboardPage = () => {
    const [cars, setCars] = useState([]);
    const [nameFilter, setNameFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [seatFilter, setSeatFilter] = useState("");
    const [filteredCars, setFilteredCars] = useState([]);
    // const [currentPage, setCurrentPage] = useState(1);
    // const [itemsPerPage] = useState(6);

    useEffect(() => {
        const getCars = async () => {
            try {
                const response = await axios.get("http://localhost:3000/car/allcars");
                setCars(response.data);
                filterCars(response.data);
            } catch (err) {
                console.error("Error fetching cars:", err);
            }
        };
        getCars();
    }, []);

    const filterRooms = (cars) => {
        let filtered = cars;

        if (cityFilter) {
            filtered = filtered.filter((cars) => cars.name.toLowerCase() === nameFilter.toLowerCase());
        }

        if (countryFilter) {
            filtered = filtered.filter((cars) => cars.type.toLowerCase() === typeFilter.toLowerCase());
        }

        if (homeFilter) {
            filtered = filtered.filter((cars) => cars.seat.toLowerCase().includes(seatFilter.toLowerCase()));
        }

        if (searchQuery) {
            filtered = filtered.filter(
                (car) =>
                    car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    car.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    car.seatFilter.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredCars(filtered);
    };

    useEffect(() => {
        filterCars(cars);
    }, [nameFilter, typeFilter, seatFilter, searchQuery]);

   

    return (
        <>
           <div className="filter-section">
                <h1 id="filter">ShareX Car Rentals</h1>
                
                <select value={nameFilter} onChange={(e) => setCarFilter(e.target.value)}>
                    <option value="">Select</option>
                    <option value="Warm Beds Housing Support">Warm Beds Housing Support</option>
                    <option value="Homesteady Housing">Homesteady Housing</option>
                   
                </select>

                <select value={typeFilter} onChange={(e) => settypeFilter(e.target.value)}>
                    <option value="">All Cars</option>
                    <option value="Automatic">Automatic</option>
                    <option value="Manuel">Manuel</option>
      
                </select>

                <select value={countryFilter} onChange={(e) => setCountryFilter(e.target.value)}>
                    <option value="">All Countries</option>
                    <option value="Germany">Germany</option>
                    <option value="USA">USA</option>
                </select>

                <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {filteredRooms.length > 0 ? (
                filteredRooms.map((car) => (
                    <Link key={car._id} to={`/dashboard/${car._id}`}>
                        <div className="dashboard-page">
                            <img src={car.imageUrl} alt={car.name} width={400} height={400} />
                            <p className="guest"> <strong>Doors: {car.doors}</strong></p>
                            <p className="guest">Car Name: {car.name}</p>
                            <p className="guest">Type: {car.type}</p>
                            <p className="guest">Seat: {car.seat}</p>
                            <p className="guest">Price: {car.price}</p>
                            <p className="guest">Available Units: {car.availableUnits}</p>
                            <p className="guest">Rating: {car.rating}</p>
                        </div>
                    </Link>
                ))
            ) : (
                <p className="no-room">No rooms found.</p>
            )}

              
        </>
    );
};