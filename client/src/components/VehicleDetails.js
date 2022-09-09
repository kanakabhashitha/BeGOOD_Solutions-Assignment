import react from "react";
import { RiEdit2Line, RiDeleteBinLine } from "react-icons/ri";
import moment from "moment";

const VehicleDetails = ({ vehicles, onEditClick, onDeleteClick }) => {
  const dateFormat = (date) => {
    let formattedDate = moment(date);
    formattedDate = formattedDate.format("MMM Do, YYYY");

    return formattedDate;
  };

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
            <th>Create Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => {
            return (
              <tr key={vehicle._id}>
                <td>{vehicle.numberPlate}</td>
                <td>{vehicle.numberPlateType}</td>
                <td>{dateFormat(vehicle.createdAt)}</td>
                <td>
                  <button
                    onClick={() => onEditClick(vehicle._id)}
                    className="edit-btn"
                  >
                    <RiEdit2Line size="20px" />
                  </button>
                  <button
                    onClick={() => onDeleteClick(vehicle._id)}
                    className="delete-btn"
                  >
                    <RiDeleteBinLine size="20px" />
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
