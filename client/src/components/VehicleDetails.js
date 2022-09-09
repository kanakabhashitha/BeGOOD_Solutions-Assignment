import react from "react";

const VehicleDetails = ({ vehicles, onEditClick, onDeleteClick }) => {
  return (
    <>
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
                  <button onClick={() => onEditClick(vehicle._id)}>
                    Update
                  </button>
                  <button onClick={() => onDeleteClick(vehicle._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default VehicleDetails;
