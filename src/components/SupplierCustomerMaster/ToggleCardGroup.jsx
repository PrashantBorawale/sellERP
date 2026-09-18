import React, { useState, useEffect } from "react";
import {
  fetchGroups,
  addGroup,
  updateGroup,
  deleteGroup,
} from "../../Service/Api.jsx";
import { toast } from "react-toastify";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const ToggleCardGroup = () => {
  const [groups, setGroups] = useState([]);
  const [prefix, setPrefix] = useState("");
  const [group, setGroup] = useState("");
  const [editingGroup, setEditingGroup] = useState(null);
  const [editPrefix, setEditPrefix] = useState("");
  const [editGroup, setEditGroup] = useState("");

  useEffect(() => {
    const getGroups = async () => {
      try {
        const data = await fetchGroups();
        setGroups(data);
      } catch (error) {
        toast.error("Failed to fetch groups");
      }
    };

    getGroups();
  }, []);

  const handleAddGroup = async () => {
    if (!prefix.trim() || !group.trim()) {
      toast.error("All fields are required");
      return;
    }

    try {
      await addGroup(prefix, group);
      setGroups([...groups, { Prefix: prefix, Group: group }]);
      setPrefix("");
      setGroup("");
      toast.success("Group added successfully");
    } catch (error) {
      toast.error("Failed to add group");
    }
  };

  const handleEditGroup = (id, prefix, group) => {
    setEditingGroup(id);
    setEditPrefix(prefix);
    setEditGroup(group);
  };

  const handleSaveEdit = async () => {
    if (!editPrefix.trim() || !editGroup.trim()) {
      toast.error("All fields are required");
      return;
    }

    try {
      await updateGroup(editingGroup, editPrefix, editGroup);
      setGroups(
        groups.map((g) =>
          g.id === editingGroup
            ? { ...g, Prefix: editPrefix, Group: editGroup }
            : g
        )
      );
      setEditingGroup(null);
      setEditPrefix("");
      setEditGroup("");
      toast.success("Group updated successfully");
    } catch (error) {
      toast.error("Failed to update group");
    }
  };

  const handleDeleteGroup = async (id) => {
    try {
      await deleteGroup(id);
      setGroups(groups.filter((g) => g.id !== id));
      toast.success("Group deleted successfully");
    } catch (error) {
      toast.error("Failed to delete group");
    }
  };

  return (
    <div className="container">
      <div className="card-body">
        <div className="row text-start mb-3">
          <div className="col-md-3">
            <div className="mb-3">
              <label htmlFor="prefix" className="form-label">
                Prefix:
              </label>
              <input
                type="text"
                className="form-control"
                id="prefix"
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="group" className="form-label">
                Group:
              </label>
              <input
                type="text"
                className="form-control"
                id="group"
                value={group}
                onChange={(e) => setGroup(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-3">
            <button type="button" className="btn  mt-4" onClick={handleAddGroup}>
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
                  <th>Prefix</th>
                  <th>Group</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {groups.map((g, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      {editingGroup === g.id ? (
                        <input
                          type="text"
                          className="form-control"
                          value={editPrefix}
                          onChange={(e) => setEditPrefix(e.target.value)}
                        />
                      ) : (
                        g.Prefix
                      )}
                    </td>
                    <td>
                      {editingGroup === g.id ? (
                        <input
                          type="text"
                          className="form-control"
                          value={editGroup}
                          onChange={(e) => setEditGroup(e.target.value)}
                        />
                      ) : (
                        g.Group
                      )}
                    </td>
                    <td>
                      {editingGroup === g.id ? (
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
                          className="card11  me-2"
                          onClick={() =>
                            handleEditGroup(g.id, g.Prefix, g.Group)
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
                        onClick={() => handleDeleteGroup(g.id)}
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

export default ToggleCardGroup;
