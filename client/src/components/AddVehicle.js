import React, { useState } from "react";
import axios from "axios";
import { Alert } from "../components/index";

const AddVehicle = () => {
  const [numberPlate, setNumberPlate] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [alertType, setAlertType] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = { numberPlate };
    addVehicle(formData);
  };

  //add vehicle to db from using axios
  const addVehicle = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/vehicle",
        formData
      );

      //set alert
      setIsShow(true);
      setAlertText("vehicle registration successfully...");
      setAlertType("success");

      setTimeout(() => {
        setIsShow(false);
      }, 3000);

      setNumberPlate("");

      console.log(response);
    } catch (error) {
      //set alert
      setIsShow(true);
      setAlertText(error.response.data.msg);
      setAlertType("danger");

      setTimeout(() => {
        setIsShow(false);
      }, 3000);
    }
  };

  return (
    <div className="form-container">
      <h1>vehicle registration app</h1>

      <form className="form" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Enter vehicle number plate"
          value={numberPlate}
          onChange={(e) => setNumberPlate(e.target.value)}
          className="form-input"
        />
        <button type="Submit" className="btn">
          Submit
        </button>
        <br />
      </form>

      {isShow && <Alert alertText={alertText} alertType={alertType} />}
    </div>
  );
};

export default AddVehicle;
