import React, { useState, useEffect } from "react";
import {
  fetchCurrencies,
  addCurrency,
  updateCurrency,
  deleteCurrency,
} from "../../Service/Api.jsx";
import { toast } from "react-toastify";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/css/all.min.css";

const ToggleCardCurrency = () => {
  const [currencies, setCurrencies] = useState([]);
  const [code, setCode] = useState("");
  const [symbol, setSymbol] = useState("");
  const [description, setDescription] = useState("");
  const [editingCurrency, setEditingCurrency] = useState(null);
  const [editCode, setEditCode] = useState("");
  const [editSymbol, setEditSymbol] = useState("");
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    const getCurrencies = async () => {
      try {
        const data = await fetchCurrencies();
        setCurrencies(data);
      } catch (error) {
        toast.error("Failed to fetch currencies");
      }
    };

    getCurrencies();
  }, []);

  const handleAddCurrency = async () => {
    if (!code.trim() || !symbol.trim() || !description.trim()) {
      toast.error("All fields are required");
      return;
    }

    try {
      await addCurrency(code, symbol, description);
      setCurrencies([
        ...currencies,
        { Code: code, Symbol: symbol, Description: description },
      ]);
      setCode("");
      setSymbol("");
      setDescription("");
      toast.success("Currency added successfully");
    } catch (error) {
      toast.error("Failed to add currency");
    }
  };

  const handleEditCurrency = (id, code, symbol, description) => {
    setEditingCurrency(id);
    setEditCode(code);
    setEditSymbol(symbol);
    setEditDescription(description);
  };

  const handleSaveEdit = async () => {
    if (!editCode.trim() || !editSymbol.trim() || !editDescription.trim()) {
      toast.error("All fields are required");
      return;
    }

    try {
      await updateCurrency(
        editingCurrency,
        editCode,
        editSymbol,
        editDescription
      );
      setCurrencies(
        currencies.map((c) =>
          c.id === editingCurrency
            ? {
                ...c,
                Code: editCode,
                Symbol: editSymbol,
                Description: editDescription,
              }
            : c
        )
      );
      setEditingCurrency(null);
      setEditCode("");
      setEditSymbol("");
      setEditDescription("");
      toast.success("Currency updated successfully");
    } catch (error) {
      toast.error("Failed to update currency");
    }
  };

  const handleDeleteCurrency = async (id) => {
    try {
      await deleteCurrency(id);
      setCurrencies(currencies.filter((c) => c.id !== id));
      toast.success("Currency deleted successfully");
    } catch (error) {
      toast.error("Failed to delete currency");
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
              <label htmlFor="symbol" className="form-label">
                Symbol:
              </label>
              <input
                type="text"
                className="form-control"
                id="symbol"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description:
              </label>
              <input
                type="text"
                className="form-control"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-3">
            <button type="button" className="btn  mt-4" onClick={handleAddCurrency}>
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
                  <th>Symbol</th>
                  <th>Description</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {currencies.map((c, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      {editingCurrency === c.id ? (
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
                      {editingCurrency === c.id ? (
                        <input
                          type="text"
                          className="form-control"
                          value={editSymbol}
                          onChange={(e) => setEditSymbol(e.target.value)}
                        />
                      ) : (
                        c.Symbol
                      )}
                    </td>
                    <td>
                      {editingCurrency === c.id ? (
                        <input
                          type="text"
                          className="form-control"
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                        />
                      ) : (
                        c.Description
                      )}
                    </td>
                    <td>
                      {editingCurrency === c.id ? (
                        <button
                          type="button"
                          className="card11  me-2"
                          onClick={handleSaveEdit}
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="card11  me-2"
                          onClick={() =>
                            handleEditCurrency(
                              c.id,
                              c.Code,
                              c.Symbol,
                              c.Description
                            )
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
                        onClick={() => handleDeleteCurrency(c.id)}
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

export default ToggleCardCurrency;
