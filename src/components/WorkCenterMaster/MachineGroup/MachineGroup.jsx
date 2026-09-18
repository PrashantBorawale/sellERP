import React, {  useState } from "react";
import { toast ,ToastContainer} from 'react-toastify'; // Make sure to install react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS

const MachineGroup = () => {

    const [enterType, setEnterType] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [data, setData] = useState([]); // Holds the table data
    const [isCardVisible, setIsCardVisible] = useState(true); // State to control card visibility
  
    // Handle input changes
    const handleChange1 = (e) => {
      setEnterType(e.target.value);
    };
  
    // Validate form input
    const validate1 = () => {
      const errors = {};
      if (!enterType) errors.enterType = "This field is required";
      return errors;
    };
  
    // Save data and handle submission
    const handleSave1 = async () => {
      setIsSubmitting(true);
      const validationErrors = validate1();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        setIsSubmitting(false);
        return;
      }
  
      try {
        // Replace with your API call
        await saveMachineGroupData({ EnterType: enterType });
  
        // Update table data (this is a placeholder; you should replace it with your logic)
        setData([...data, { Type: enterType, TypeGroup: "", Shift: 0, AvailHours: 0, TypeID: data.length + 1 }]);
  
        toast.success("Data saved successfully");
        setEnterType("");
        setErrors({});
      } catch (error) {
        console.error("Error saving data:", error);
        toast.error("Error saving data");
      } finally {
        setIsSubmitting(false);
      }
    };
  
    // Dummy function for saving data, replace with your actual implementation
    const saveMachineGroupData = async (data) => {
      return new Promise((resolve) => setTimeout(resolve, 1000));
    };
  
    // Handle closing the card
    const handleCloseCardMachine = () => {
      setIsCardVisible(false);
    };
  
   
   
  
  
    
  return (
    <div className='container-fluid'>
        <ToastContainer/>
        {isCardVisible && (
        <div className="overlay-machine">
          <div className="card-machine">
            <div className="card-header-machine">
              <h5 style={{ color: "black" }}>Machine Group</h5>
              <button className="btn-close" onClick={handleCloseCardMachine}>
                ×
              </button>
            </div>
            <div className="card-body-machine">
              <h5 style={{ color: "blue", textAlign: "start" }}>Work Center Type</h5>
              <hr />
              <div className="row mb-3">
                <p style={{ textAlign: "start" }}>Work Center Type</p>
                <label htmlFor="enterType" className="col-sm-4 col-form-label text-start">
                  Enter Type
                </label>
                <div className="col-sm-6">
                  <input
                    type="text"
                    className="form-control"
                    id="enterType"
                    name="enterType"
                    value={enterType}
                    onChange={handleChange1}
                  />
                  {errors.enterType && (
                    <div className="text-danger">{errors.enterType}</div>
                  )}
                </div>
                <div className="col-sm-2">
                  <button
                    className="btn"
                    type="button"
                    onClick={handleSave1}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Sr</th>
                      <th scope="col">Type</th>
                      <th scope="col">Type Group</th>
                      <th scope="col">Shift</th>
                      <th scope="col">Avail Hours</th>
                      <th scope="col">Edit</th>
                      <th scope="col">Delete</th>
                      <th scope="col">TypeID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((row, index) => (
                      <tr key={row.TypeID}>
                        <td>{index + 1}</td>
                        <td>{row.Type}</td>
                        <td>
                          <select className="form-select">
                            <option value="1">Machining</option>
                            <option value="2">Machining</option>
                          </select>
                        </td>
                        <td>{row.Shift}</td>
                        <td>{row.AvailHours}</td>
                        <td>
                          <button className="btn">
                            <i className="fas fa-edit"></i>
                          </button>
                        </td>
                        <td>
                          <button className="btn">
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                        <td>{row.TypeID}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
      
      
    </div>
  )
}

export default MachineGroup
