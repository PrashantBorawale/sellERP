import React, { useState, useEffect } from "react";
import {
  fetchCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../../Service/Api";
import { toast } from "react-toastify";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const ToggleCard1 = ({ onCategoryChange }) => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [editName, setEditName] = useState("");

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        toast.error("Failed to fetch categories");
      }
    };

    getCategories();
  }, []);

  useEffect(() => {
    onCategoryChange(categories);
  }, [categories, onCategoryChange]);

  const handleAddCategory = async () => {
    if (!newCategory.trim()) {
      toast.error("Category Name is required");
      return;
    }

    try {
      await addCategory(newCategory);
      const updatedCategories = [...categories, { Category_Name: newCategory }];
      setCategories(updatedCategories);
      setNewCategory("");
      toast.success("Category added successfully");
    } catch (error) {
      toast.error("Failed to add category");
    }
  };

  const handleEditCategory = (id, name) => {
    setEditingCategory(id);
    setEditName(name);
  };

  const handleSaveEdit = async () => {
    if (!editName.trim()) {
      toast.error("Category Name is required");
      return;
    }

    try {
      await updateCategory(editingCategory, editName);
      const updatedCategories = categories.map((cat) =>
        cat.id === editingCategory ? { ...cat, Category_Name: editName } : cat
      );
      setCategories(updatedCategories);
      setEditingCategory(null);
      setEditName("");
      toast.success("Category updated successfully");
    } catch (error) {
      toast.error("Failed to update category");
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategory(id);
      const updatedCategories = categories.filter((cat) => cat.id !== id);
      setCategories(updatedCategories);
      toast.success("Category deleted successfully");
    } catch (error) {
      toast.error("Failed to delete category");
    }
  };

  return (
    <div className="card-body">
      <div className="row mb-3">
        <div className="col-12 text-start text-primary">Party Type</div>
      </div>
      <div className="row mb-3">
        <div className="col-md-4">
          <label className="form-label">Category Name</label>
        </div>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <button type="button" className="btn" onClick={handleAddCategory}>
            Save
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <table className="table table-responsive">
            <thead>
              <tr>
                <th>Sr No</th>
                <th>Category Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    {editingCategory === category.id ? (
                      <input
                        type="text"
                        className="form-control"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                      />
                    ) : (
                      category.Category_Name
                    )}
                  </td>
                  <td>
                    {editingCategory === category.id ? (
                      <>
                        <button
                          type="button"
                          className="btn btn-sm"
                          onClick={handleSaveEdit}
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm ms-2"
                          onClick={() => setEditingCategory(null)}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          className="btn btn-sm"
                          onClick={() =>
                            handleEditCategory(
                              category.id,
                              category.Category_Name
                            )
                          }
                        >
                          <FaEdit />
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm ms-2"
                          onClick={() => handleDeleteCategory(category.id)}
                        >
                          <FaTrashAlt />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ToggleCard1;
