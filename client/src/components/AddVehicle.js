import React, { useState, useEffect } from "react";
import axios from "axios";
import { Alert, VehicleDetails } from "../components/index";

const AddVehicle = () => {
  const [numberPlate, setNumberPlate] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [alertType, setAlertType] = useState("");
  const [vehicles, setVehicles] = useState([]);
  const [editId, setEditID] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  //submit form
  const onSubmit = (e) => {
    e.preventDefault();

    if (!isEdit) {
      const formData = { numberPlate };
      addVehicle(formData);
    } else {
      const formData = { numberPlate };
      editVehicle(formData);
    }
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

  //get all vehicle details
  const getAllVehicles = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/vehicle");
      setVehicles(response.data.vehicles);
    } catch (error) {
      alert(error.response.data);
    }
  };

  useEffect(() => {
    getAllVehicles();
  }, [vehicles]);

  //edit vehicle details
  const onEditClick = (id) => {
    const specificVehicle = vehicles.find((vehicle) => vehicle._id === id);
    setIsEdit(true);
    setEditID(id);
    setNumberPlate(specificVehicle.numberPlate);
  };

  //edit vehicle to db from using axios
  const editVehicle = async (formData) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/v1/vehicle/${editId}`,
        formData
      );

      //set alert
      setIsShow(true);
      setAlertText("vehicle update successfully...");
      setAlertType("success");

      setTimeout(() => {
        setIsShow(false);
      }, 3000);

      setNumberPlate("");
      setIsEdit(false);

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

  //delete vehicle details
  const onDeleteClick = (id) => {
    setDeleteId(id);
    deleteVehicle(id);
  };

  //delete vehicle to db from using axios
  const deleteVehicle = async (deleteId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/v1/vehicle/${deleteId}`
      );

      //set alert
      setIsShow(true);
      setAlertText("vehicle remove successfully...");
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
    <>
      {/* vehicle details add and edit form */}

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
            {isEdit ? "Update" : "Submit"}
          </button>
          <br />
        </form>

        {isShow && <Alert alertText={alertText} alertType={alertType} />}
      </div>

      {/* vehicle details display container */}

      <div className="vehicle-container">
        {vehicles.length > 0 && (
          <VehicleDetails
            vehicles={vehicles}
            onEditClick={onEditClick}
            onDeleteClick={onDeleteClick}
          />
        )}
      </div>
    </>
  );
};

export default AddVehicle;
