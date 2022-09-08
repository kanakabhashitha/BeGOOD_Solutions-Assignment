import React from "react";

const VehicleDetails = () => {
  return (
    <div className="vehicle-container">
      <h2>vehicle details</h2>
      <h4>total vehicle</h4>

      <table className="table">
        <tr>
          <th>Number Plate</th>
          <th>Action</th>
        </tr>
        <tr>
          <td>Maria Anders</td>
          <td>Germany</td>
        </tr>
      </table>
    </div>
  );
};

export default VehicleDetails;
