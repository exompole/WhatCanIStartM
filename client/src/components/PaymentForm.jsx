import React, { useState } from 'react';
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

const PaymentForm = () => {
  const [countryid, setCountryid] = useState(101);
  const [stateid, setStateid] = useState(0);



  return (
    <div >
      <h1>Your Business Growth Starts Here</h1>
      <p>Thank you for choosing us</p>

      <label htmlFor="name">Full Name</label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Enter Your Full Name"
        
      />

      <label htmlFor="Phoneno">Phone Number</label>
      <input
        type="number"
        id="Phoneno"
        name="Phoneno"
        placeholder="Enter Your Phone number"
        
      />

      <label htmlFor="Email">E-mail</label>
      <input
        type="text"
        id="Email"
        name="Email"
        placeholder="abc@gmail.com"
      />

      <label>State</label>
      <StateSelect
        countryid={countryid}
        onChange={(e) => setStateid(e.id)}
        placeHolder="Select State"
        
      />

      <label>City</label>
      <CitySelect
        countryid={countryid}
        stateid={stateid}
        onChange={(e) => console.log("City Selected: ", e.name)}
        placeHolder="Select City"
      />
      <button >Submit</button>
    </div>
  );
};

export default PaymentForm;
