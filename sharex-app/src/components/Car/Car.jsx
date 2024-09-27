import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/plenty_cars.avif"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const adviceList = [
  {
    id: 0,
    question: " 1. What advantages does ShareX New Cars offer me?",
    answer:
      "The journey to your ideal vehicle has never been more straightforward: compare new cars from over 30 brands easily online and select the option that best fits your requirements and financial plan. Whether you're looking for a lease with your preferred duration or flexible financing with a guaranteed purchase price, ShareX New Cars is the perfect destination for you.With more than four decades of expertise as an independent leasing company, unaffiliated with any manufacturer or bank, we provide new cars at discounted rates. Our substantial purchasing power allows us to secure significant discounts, which we then pass on to our customers through low monthly payments. As a purely online car retailer, we're at the forefront of digitalizing the new car purchasing experience.For you, this translates to unbeatable online deals, complete cost transparency, and personalized telephone guidance.Enjoy all the benefits of a new car: comfort, safety, and full manufacturer's warranty, all at exceptionally attractive terms. Over 40,000 drivers have already placed their trust in a new car leased or flexibly financed from ShareX. You too can save up to 56% on your new vehicle.",
  },
  {
    id: 1,
    question: "2. How do I find the right offer?",
    answer:
      " Are you unsure which car is the best fit for you? Utilize our needs search feature. Here, you can easily filter options based on important criteria such as design, seating capacity, transmission type, fuel consumption, and budget to receive suitable offers in real time. In addition to our customizable order vehicles, we also provide attractive daily registrations and stock cars that are already produced and ready for collection. This way, you can quickly and conveniently obtain your preferred new car. This version maintains the original meaning while presenting the information in a slightly different way. If you need further adjustments or have additional requests, feel free to ask!",
  },
  {
    id: 2,
    question: "3. How do I configure my dream car?",
    answer:
      "Our customization tool allows you to tailor your ideal vehicle to your exact specifications. You have the freedom to select your preferred color and incorporate additional features. Whether you're focusing on aesthetics, comfort, or safety, you can make any modifications you desire, and the updated price will be instantly displayed.We also offer a range of service and logistics options. You might consider adding packages such as maintenance and wear and tear coverage or our insurance plans. You have the flexibility to set your preferred lease duration, expected mileage, and initial payment amount.Take the opportunity to explore and compare our exceptionally competitive new car offers. Our platform is designed to help you find the perfect vehicle that aligns with your preferences and budget, all while providing real-time pricing updates as you customize your dream car. ",
  },
  {
    id: 3,
    question: "4. Is leasing or Vario-leasing right for me?",
    answer:
      "At the conclusion of your contract term, you have the flexibility to either return the vehicle or purchase it outright. This decision can be made flexibly before the return date. Our Vario leasing option allows you to secure a guaranteed purchase price in advance, giving you the opportunity to own the car at the end of the term. However, if you change your mind, there's no need to worry. You can simply return the vehicle, and we'll handle its resale in the used car market.This innovative financing method provides you with planning security, a flexible purchase option, and a guaranteed purchase price. If you prefer to use a new car without the commitment of ownership, our mileage leasing option might be the perfect solution for you. While this option doesn't include a guaranteed purchase price like Vario leasing does, it offers more flexibility in terms of contract duration and mileage. You can choose terms starting from as short as 12 months and select annual mileage options of up to 45,000 km.",
  },
  
];

   
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
    <div className="question-div">
      <h1 className="middle-text">Do you have any questions?, we would be happy to advise you professionally</h1>
      <h1 className="middle-text">Monday to Friday: 8am to 4pm</h1>
    </div>

    <div >
      <h1 className="second-text"> Our Vehicle Types</h1>
      <img src={logo} alt="logo" className="logo"/>
    </div>

    <section>
        <div className="advice">
          <h2 className="text">
          Secure the best deals on ShareX new cars in a relaxed manner
          </h2>
        </div>

        <div className="advice">
          {adviceList.length > 1 &&
            adviceList.map(({ id, question, answer }) => (
              <div key={id} className="relative mb-2">
                <h5>
                  <label htmlFor={`collapse-${id}`} className="">
                    <h2 className="question">{question}</h2>
                  </label>
                </h5>
                <input
                  className="faq-toggler hidden"
                  type="checkbox"
                  name=""
                  id={`collapse-${id}`}
                />
                <div className="collapse-item">
                  <div>
                    <p className="answer">{answer}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>
   

    </div>
  );
};