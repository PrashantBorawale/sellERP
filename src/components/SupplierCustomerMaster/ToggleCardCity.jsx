import React, { useState, useEffect } from "react";
import {
  fetchCities,
  addCity,
  updateCity,
  deleteCity,
} from "../../Service/Api";
import { toast } from "react-toastify";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const ToggleCardCity = () => {
  const [cities, setCities] = useState([]);
  const [cityName, setCityName] = useState("");
  const [editingCity, setEditingCity] = useState(null);
  const [editCityName, setEditCityName] = useState("");

  // Fetch cities on component mount
  useEffect(() => {
    const getCities = async () => {
      try {
        const data = await fetchCities();
        setCities(data);
      } catch (error) {
        toast.error("Failed to fetch cities");
      }
    };

    getCities();
  }, []);

  // Handle adding a new city
  const handleAddCity = async () => {
    try {
      await addCity(cityName);
      const data = await fetchCities(); // Refresh cities after adding
      setCities(data);
      setCityName(""); // Clear input field
      toast.success("City added successfully");
    } catch (error) {
      toast.error("Failed to add city");
    }
  };

  // Handle editing a city
  const handleEditCity = (id, name) => {
    setEditingCity(id);
    setEditCityName(name);
  };

  // Handle saving the edited city
  const handleSaveEdit = async () => {
    try {
      await updateCity(editingCity, { CityName: editCityName });
      const data = await fetchCities(); // Refresh cities after updating
      setCities(data);
      setEditingCity(null);
      setEditCityName("");
      toast.success("City updated successfully");
    } catch (error) {
      toast.error("Failed to update city");
    }
  };

  // Handle deleting a city
  const handleDeleteCity = async (id) => {
    try {
      await deleteCity(id);
      const data = await fetchCities(); // Refresh cities after deleting
      setCities(data);
      toast.success("City deleted successfully");
    } catch (error) {
      toast.error("Failed to delete city");
    }
  };

  return (
    <div className="container">
      <div className="card-body">
        <div className="row text-start mb-3">
          <div className="col-md-3">
            <div className="mb-3 mt-4">
              <label htmlFor="cityName" className="form-label">
                City Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="cityName"
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-3 mt-4">
            <button type="button" className="btn" onClick={handleAddCity}>
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
                  <th>City Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cities.map((city, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      {editingCity === city.id ? (
                        <input
                          type="text"
                          className="form-control"
                          value={editCityName}
                          onChange={(e) => setEditCityName(e.target.value)}
                        />
                      ) : (
                        city.CityName
                      )}
                    </td>
                    <td>
                      {editingCity === city.id ? (
                        <button
                          type="button"
                          className="btn me-2"
                          onClick={handleSaveEdit}
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="card11 me-2"
                          onClick={() => handleEditCity(city.id, city.CityName)}
                        >
                          <FaEdit />
                        </button>
                      )}
                      <button
                        type="button"
                        className="card11"
                        onClick={() => handleDeleteCity(city.id)}
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

export default ToggleCardCity;
