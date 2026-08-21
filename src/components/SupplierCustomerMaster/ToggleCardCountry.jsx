import React, { useState, useEffect } from "react";
import {
  fetchCountries,
  addCountry,
  updateCountry,
  deleteCountry,
} from "../../Service/Api";
import { toast } from "react-toastify";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/css/all.min.css";

const ToggleCardCountry = () => {
  const [countries, setCountries] = useState([]);
  const [code, setCode] = useState("");
  const [country, setCountry] = useState("");
  const [editingCountry, setEditingCountry] = useState(null);
  const [editCode, setEditCode] = useState("");
  const [editCountry, setEditCountry] = useState("");

  useEffect(() => {
    const getCountries = async () => {
      try {
        const data = await fetchCountries();
        setCountries(data);
      } catch (error) {
        toast.error("Failed to fetch countries");
      }
    };

    getCountries();
  }, []);

  const handleAddCountry = async () => {
    if (!code.trim() || !country.trim()) {
      toast.error("Code and Country are required");
      return;
    }

    try {
      await addCountry(code, country);
      setCountries([...countries, { Code: code, Country: country }]);
      setCode("");
      setCountry("");
      toast.success("Country added successfully");
    } catch (error) {
      toast.error("Failed to add country");
    }
  };

  const handleEditCountry = (id, code, country) => {
    setEditingCountry(id);
    setEditCode(code);
    setEditCountry(country);
  };

  const handleSaveEdit = async () => {
    if (!editCode.trim() || !editCountry.trim()) {
      toast.error("Code and Country are required");
      return;
    }

    try {
      await updateCountry(editingCountry, editCode, editCountry);
      setCountries(
        countries.map((c) =>
          c.id === editingCountry
            ? { ...c, Code: editCode, Country: editCountry }
            : c
        )
      );
      setEditingCountry(null);
      setEditCode("");
      setEditCountry("");
      toast.success("Country updated successfully");
    } catch (error) {
      toast.error("Failed to update country");
    }
  };

  const handleDeleteCountry = async (id) => {
    try {
      await deleteCountry(id);
      setCountries(countries.filter((c) => c.id !== id));
      toast.success("Country deleted successfully");
    } catch (error) {
      toast.error("Failed to delete country");
    }
  };

  return (
    <div className="container">
      <div className="card-body">
        <div className="row text-start mb-3">
          <div className="col-md-3">
            <div className="mb-3">
              <label htmlFor="code" className="form-label">
                Code:
              </label>
              <input
                type="text"
                className="form-control"
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="mb-3">
              <label htmlFor="country" className="form-label">
                Country:
              </label>
              <input
                className="form-control"
                id="country"
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-3">
            <button type="button" className="btn mt-4" onClick={handleAddCountry}>
              Save
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <table className="table table-responsive">
              <thead>
                <tr>
                  <th>Sr. No</th>
                  <th>Code</th>
                  <th>Country</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {countries.map((c, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      {editingCountry === c.id ? (
                        <input
                          type="text"
                          className="form-control"
                          value={editCode}
                          onChange={(e) => setEditCode(e.target.value)}
                        />
                      ) : (
                        c.Code
                      )}
                    </td>
                    <td>
                      {editingCountry === c.id ? (
                        <input
                          className="form-control"
                          type="text"
                          value={editCountry}
                          onChange={(e) => setEditCountry(e.target.value)}
                        />
                      ) : (
                        c.Country
                      )}
                    </td>
                    <td>
                      {editingCountry === c.id ? (
                        <button
                          type="button"
                          className="card11 me-2"
                          onClick={handleSaveEdit}
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="card11 me-2"
                          onClick={() =>
                            handleEditCountry(c.id, c.Code, c.Country)
                          }
                        >
                          <FaEdit />
                        </button>
                      )}
                    </td>
                    <td>
                      <button
                        type="button"
                        className="card11"
                        onClick={() => handleDeleteCountry(c.id)}
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToggleCardCountry;
