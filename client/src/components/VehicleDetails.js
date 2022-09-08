import React, { useState, useEffect } from "react";
import axios from "axios";

const VehicleDetails = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    getAllVehicles();
  }, [vehicles]);

  const getAllVehicles = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/vehicle");
      setVehicles(response.data.vehicles);
    } catch (error) {
      alert(error.response.data);
    }
  };

  return (
    <div className="vehicle-container">
      <h2>vehicle details</h2>

      <h4>
        {vehicles.length} vehicle{vehicles.length > 1 && "s"} found
      </h4>

      <table className="table">
        <thead>
          <tr>
            <th>Number Plate</th>
            <th>Vehicle Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => {
            return (
              <tr key={vehicle._id}>
                <td>{vehicle.numberPlate}</td>
                <td>{vehicle.numberPlateType}</td>
                <td>
                  <button>Update</button>
                  <button>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default VehicleDetails;
