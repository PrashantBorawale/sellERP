import React, { useState, useEffect } from "react";
import { saveWorkCenterTypeGroupData,
  updateWorkCenterTypeGroupData,
  deleteWorkCenterTypeGroup,
  fetchWorkCenterTypeGroupList, } from "../../Service/Api";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WorkCenterType = ({ handleClose }) => {
  const [typeGroup, setTypeGroup] = useState("");
  const [prodWt, setProdWt] = useState("");
  const [errors, setErrors] = useState({});
  const [editId, setEditId] = useState(null);
  const [workCenterList, setWorkCenterList] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    loadWorkCenterTypes();
  }, []);

  const loadWorkCenterTypes = async () => {
    try {
      const res = await fetchWorkCenterTypeGroupList();
      setWorkCenterList(res.data);
    } catch (err) {
      console.error("Failed to load data", err);
    }
  };

  const resetForm = () => {
    setTypeGroup("");
    setProdWt("");
    setEditId(null);
    setErrors({});
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!typeGroup) validationErrors.typeGroup = "Type Group is required";
    if (!prodWt) validationErrors.prodWt = "Prod WT is required";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
        toast.error("Please fill all required fields");
      return;
    }

    const payload = {
      TypeGroup: typeGroup,
      Prod_Wt: prodWt,
    };

    try {
      if (editId) {
        await updateWorkCenterTypeGroupData(editId, payload);
        toast.success("Updated successfully!");
      } else {
        await saveWorkCenterTypeGroupData(payload);
        toast.success("Saved successfully!");
      }
      resetForm();
      loadWorkCenterTypes();
    } catch (err) {
      toast.error("Operation failed");
    }
  };

  const handleEdit = (item) => {
    setTypeGroup(item.TypeGroup);
    setProdWt(item.Prod_Wt);
    setEditId(item.id);
  };

 const handleDelete = async (id) => {
    try {
      await deleteWorkCenterTypeGroup(id);
      toast.success("Deleted successfully!");
      loadWorkCenterTypes();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedList = workCenterList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(workCenterList.length / itemsPerPage);



  return (
  <div className="overlay-workcenter">
     <ToastContainer position="top-right" autoClose={3000} />
      <div className="card-work">
        <div className="card-header-work">
          <h5 className="title">Machine Group Type</h5>
          <button className="btn-close" onClick={handleClose}>×</button>
        </div>
        <form onSubmit={handleSubmit2}>
          <div className="card-body-work">
            <h5 className="section-title">Work Center Type</h5>
            <hr />
            <div className="row mb-3">
              <div className="col-md-4">
                <label className="form-label">Enter Type Group:</label>
                <input
                  type="text"
                  className="form-control"
                  name="typeGroup"
                  value={typeGroup}
                  onChange={(e) => setTypeGroup(e.target.value)}
                  placeholder="Work Center Type"
                />
                {errors.typeGroup && (
                  <div className="text-danger">{errors.typeGroup}</div>
                )}
              </div>
              <div className="col-md-4">
                <label className="form-label">Prod WT:</label>
                <select
                  className="form-select"
                  name="prodWt"
                  value={prodWt}
                  onChange={(e) => setProdWt(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Master">Master</option>
                  <option value="Master_Cut_WT">Master_Cut_WT</option>
                  <option value="Master_Cut">Master_Cut</option>
                </select>
                {errors.prodWt && (
                  <small className="text-danger">{errors.prodWt}</small>
                )}
              </div>
              <div className="col-md-4 mt-5 d-flex align-items-center">
                <button className="btn btn-primary me-2" type="submit">
                  {editId ? "Update" : "Save"}
                </button>
                {editId && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={resetForm}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>

            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Sr.</th>
                  <th>Type</th>
                  <th>Prod WT</th>
                  <th>User Group</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {paginatedList.map((item, index) => (
                  <tr key={item.id}>
                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td>{item.TypeGroup}</td>
                    <td>{item.Prod_Wt}</td>
                    <td>{item.UserGroup || "-"}</td>
                    <td>
                      <button
                        type="button"
                        className="btn"
                        onClick={() => handleEdit(item)}
                      >
                        <FaEdit/>
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn"
                        onClick={() => handleDelete(item.id)}
                      >
                      <FaTrash/>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="d-flex justify-content-center mt-2">
              <nav>
                <ul className="pagination">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <li
                      key={i}
                      className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(i + 1)}
                      >
                        {i + 1}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkCenterType;