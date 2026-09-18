import React, { useState, useEffect } from "react";
import {
  fetchQMSCodes,
  addQMSCode,
  updateQMSCode,
  deleteQMSCode,
} from "../../Service/Api.jsx";
import { toast } from "react-toastify";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const ToggleCardQMSCode = () => {
  const [qmsCodes, setQMSCodes] = useState([]);
  const [qmsCode, setQMSCode] = useState("");
  const [qmsCodeDesc, setQMSCodeDesc] = useState("");
  const [editingCode, setEditingCode] = useState(null);
  const [editQMSCode, setEditQMSCode] = useState("");
  const [editQMSCodeDesc, setEditQMSCodeDesc] = useState("");

  useEffect(() => {
    const getQMSCodes = async () => {
      try {
        const data = await fetchQMSCodes();
        setQMSCodes(data);
      } catch (error) {
        toast.error("Failed to fetch QMS Codes");
      }
    };

    getQMSCodes();
  }, []);

  const handleAddQMSCode = async () => {
    if (!qmsCode.trim() || !qmsCodeDesc.trim()) {
      toast.error("All fields are required");
      return;
    }

    try {
      await addQMSCode(qmsCode, qmsCodeDesc);
      setQMSCodes([
        ...qmsCodes,
        { QMSC_Code: qmsCode, QMSC_Code_Desc: qmsCodeDesc },
      ]);
      setQMSCode("");
      setQMSCodeDesc("");
      toast.success("QMS Code added successfully");
    } catch (error) {
      toast.error("Failed to add QMS Code");
    }
  };

  const handleEditQMSCode = (id, code, desc) => {
    setEditingCode(id);
    setEditQMSCode(code);
    setEditQMSCodeDesc(desc);
  };

  const handleSaveEdit = async () => {
    if (!editQMSCode.trim() || !editQMSCodeDesc.trim()) {
      toast.error("All fields are required");
      return;
    }

    try {
      await updateQMSCode(editingCode, editQMSCode, editQMSCodeDesc);
      setQMSCodes(
        qmsCodes.map((q) =>
          q.id === editingCode
            ? { ...q, QMSC_Code: editQMSCode, QMSC_Code_Desc: editQMSCodeDesc }
            : q
        )
      );
      setEditingCode(null);
      setEditQMSCode("");
      setEditQMSCodeDesc("");
      toast.success("QMS Code updated successfully");
    } catch (error) {
      toast.error("Failed to update QMS Code");
    }
  };

  const handleDeleteQMSCode = async (id) => {
    try {
      await deleteQMSCode(id);
      setQMSCodes(qmsCodes.filter((q) => q.id !== id));
      toast.success("QMS Code deleted successfully");
    } catch (error) {
      toast.error("Failed to delete QMS Code");
    }
  };

  return (
    <div className="container">
      <div className="card-body">
        <div className="row text-start mb-3">
          <div className="col-md-3">
            <div className="mb-3">
              <label htmlFor="qmsCode" className="form-label">
                QMSC Code:
              </label>
              <input
                type="text"
                className="form-control"
                id="qmsCode"
                value={qmsCode}
                onChange={(e) => setQMSCode(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="mb-3">
              <label htmlFor="qmsCodeDesc" className="form-label">
                QMSC Code Desc:
              </label>
              <input
                type="text"
                className="form-control"
                id="qmsCodeDesc"
                value={qmsCodeDesc}
                onChange={(e) => setQMSCodeDesc(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="mb-3">
              <button type="button" className="card11" onClick={handleAddQMSCode}>
                Save
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <table className="table table-responsive">
              <thead>
                <tr>
                  <th>Sr No</th>
                  <th>QMSC Code</th>
                  <th>QMSC Desc</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {qmsCodes.map((q, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      {editingCode === q.id ? (
                        <input
                          type="text"
                          className="form-control"
                          value={editQMSCode}
                          onChange={(e) => setEditQMSCode(e.target.value)}
                        />
                      ) : (
                        q.QMSC_Code
                      )}
                    </td>
                    <td>
                      {editingCode === q.id ? (
                        <input
                          type="text"
                          className="form-control"
                          value={editQMSCodeDesc}
                          onChange={(e) => setEditQMSCodeDesc(e.target.value)}
                        />
                      ) : (
                        q.QMSC_Code_Desc
                      )}
                    </td>
                    <td>
                      {editingCode === q.id ? (
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
                            handleEditQMSCode(
                              q.id,
                              q.QMSC_Code,
                              q.QMSC_Code_Desc
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
                        onClick={() => handleDeleteQMSCode(q.id)}
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

export default ToggleCardQMSCode;
