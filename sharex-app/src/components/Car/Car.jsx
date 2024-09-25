// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import NavBar from "../NavBar/NavBar";
// // import { ErrorBoundary } from "react-error-boundary";

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// // function ErrorFallback({ error }) {
// //   return (
// //     <div role="alert">
// //       <p>Something went wrong:</p>
// //       <pre style={{ color: "red" }}>{error.message}</pre>
// //     </div>
// //   );
// // }

// export const Car = () => {
//     const [cars, setCars] = useState([]);
//     const [nameFilter, setNameFilter] = useState("");
//     const [typeFilter, setTypeFilter] = useState("");
//     const [doorFilter, setDoorFilter] = useState("");
//     const [seatFilter, setSeatFilter] = useState("");
//     const [searchQuery, setSearchQuery] = useState("");
//     const [filteredCars, setFilteredCars] = useState([]);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//       const getCars = async () => {
//         try {
//           const response = await axios.get("http://localhost:3000/car/allcars");
//           setCars(response.data);
//           setFilteredCars(response.data);
//         } catch (err) {
//           console.error(err);
//         }
//       };
//       getCars();  
//     }, []);
    
//     const filterCars = (cars) => {
//       let filtered = cars;

//       if (nameFilter) {
//         filtered = filtered.filter((car) => car.name.toLowerCase().includes(nameFilter.toLowerCase()));
//       }

//       if (typeFilter) {
//         filtered = filtered.filter((car) => car.type.toLowerCase() === typeFilter.toLowerCase());
//       }

//       if (doorFilter) {
//         filtered = filtered.filter((car) => car.door.toLowerCase() === doorFilter.toLowerCase());
//       }

//       if (seatFilter) {
//         filtered = filtered.filter((car) => car.seat.toLowerCase() === seatFilter.toLowerCase());
//       }

//       if (searchQuery) {
//         filtered = filtered.filter((car) => 
//           car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           car.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           car.door.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           car.seat.toLowerCase().includes(searchQuery.toLowerCase())
//         );
//       }
//       setFilteredCars(filtered);
//     };

//     useEffect(() => {
//       filterCars();
//     }, [cars, nameFilter, typeFilter, searchQuery]);

//   return (
//     <div>
//       <h1 className="title-page">Welcome to the ShareX car rentals</h1>
  
//       <div className="lower-nav">
//         <select value={nameFilter} onChange={(e) => setNameFilter(e.target.value)}>
//           <option value="">All Brands</option>
//           <option value="Mercedes">Mercedes</option>
//           <option value="Audi">Audi</option>
//           <option value="Range Rover">Range Rover</option>
//           <option value="Fiat">Fiat</option>
//           <option value="Renault">Renault</option>
//           <option value="Maruti">Maruti</option>
//           <option value="Suzuki">Suzuki</option>
//         </select>

//         <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
//           <option value="">All Types</option>
//           <option value="Automatic">Automatic</option> 
//             <option value="Manuel">Manuel</option>
//           <option value="Hybrid">Hybrid</option>
//           <option value="Electric">Electric</option>
//         </select> 

//         <input 
//           type="text" 
//           placeholder="Search by name or type" 
//           value={searchQuery} 
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//       </div>

   
//       {filteredCars.length > 0 ? (
//                 filteredCars.map((car) => (
//                     <Link key={car.id} to={`/Car/${car.id}`}>
//                         <div className="car-page">
//                             <img src={car.imageUrl} alt={car.name} width={400} height={400} />
//                             <p >Doors: {car.doors}</p>
//                             <p >Type: {car.type}</p>
//                             <p >Seat: {car.seat}</p>
//                             <p >Available Units: {car.availableUnits}</p>
//                             <p >Price: {car.price}</p>
//                             <p >Rating: {car.rating}</p>
//                         </div>
//                     </Link>
//                 ))
//             ) : (
//                 <p className="no-car">No cars found.</p>
//             )}
   
//     </div>
//   );
// };

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";


export const Car = () => {
    const [cars, setCars] = useState([]);
    const [nameFilter, setNameFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredCars, setFilteredCars] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
      const getCars = async () => {
        try {
          const response = await axios.get(`${API_URL}/car/allcars`);
          console.log("Fetched cars:", response.data);
          setCars(response.data);
          setFilteredCars(response.data);
        } catch (err) {
          console.error("Error fetching cars:", err);
          setError("Failed to fetch cars. Please try again later.");
        }
      };
      getCars();  
    }, []);
    
    useEffect(() => {
      filterCars(cars);
    }, [cars, nameFilter, typeFilter, searchQuery]);

    const filterCars = (cars) => {
      let filtered = cars;

      if (nameFilter) {
        filtered = filtered.filter((car) => car.name.toLowerCase().includes(nameFilter.toLowerCase()));
      }

      if (typeFilter) {
        filtered = filtered.filter((car) => car.type.toLowerCase() === typeFilter.toLowerCase());
      }

      if (searchQuery) {
        filtered = filtered.filter((car) => 
          car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          car.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
          car.doors.toLowerCase().includes(searchQuery.toLowerCase()) ||
          car.seat.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      setFilteredCars(filtered);
    };

  return (
    <div>
       <div >
       <h1 className="main-title">Welcome to the ShareX car rentals</h1>
    </div>
      

      <div className="lower-nav">
         <select value={nameFilter} onChange={(e) => setNameFilter(e.target.value)}>
          <option value="">All Brands</option>
           <option value="Mercedes">Mercedes</option>
           <option value="Audi">Audi</option>
          <option value="Range Rover">Range Rover</option>
          <option value="Fiat">Skoda SUV</option>
           <option value="Renault">Corolla</option>
           <option value="Maruti">Maruti</option>
          <option value="Suzuki">Skoda</option>
        </select>

        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="">All Types</option>
          <option value="Automatic">Automatic</option> 
          <option value="Hybrid">Hybrid</option>
          <option value="Electric">Electric</option>
        </select> 

        <input 
         type="text" 
          placeholder="Search by name or type" 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)}
       />
     </div>

      {error && <p className="error-message">{error}</p>}
  
    <div className="dashboard">

      {filteredCars.length > 0 ? (
        filteredCars.map((car) => (
          <Link key={car._id} to={`/Car/${car._id}`}>
            <div>
              <img 
                // src={car.imageUrl.startsWith('http') ? car.imageUrl : `${API_URL}/${car.imageUrl}`} 
                src={car.imageUrl}
                alt={car.name} 
                width={400} 
                height={400} 
              />
              <p className="car-info">Name: {car.name}</p>
              <p className="car-info">Doors: {car.doors}</p>
              <p className="car-info">Type: {car.type}</p>
              <p className="car-info">Seat: {car.seat}</p>
              <p className="car-info">Available Units: {car.availableUnits}</p>
              <p className="car-info">Price: {car.price}</p>
              <p className="car-info">Rating: {car.rating}</p>
            </div>
          </Link>
        ))
      ) : (
        <p className="no-car">No cars found.</p>
      )}
    </div>
    <div>
      <h1 className="middle-text">Do you have any questions?, we would be happy to advise you professionally</h1>
      <h1 className="middle-text">Monday to Friday: 8am to 4pm</h1>
    </div>

    <div >
      <h1 className="second-text"> Our Vehicle Types</h1>
      <image src="" alt=""/>
    </div>
   

    </div>
  );
};