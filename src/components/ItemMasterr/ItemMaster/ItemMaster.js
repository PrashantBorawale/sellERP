import React, { useEffect, useState } from "react";
import "./ItemMaster.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar";
import SideNav from "../../../SideNav/SideNav";
import { Link } from "react-router-dom";
import { fetchItems, fetchMainGroupData, deleteItemMaster } from "../../../Service/Api.jsx";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

// Constants
const itemGroups = [
  "BEARING", "BELTS", "CAMS", "COLLETS", "COMPUTER", "CUTTING",
  "ELECTRICS", "END PIECE", "FIXCTURE"
];

const itemGrades = ["Option 1", "Option 2", "Option 3"];

const ItemMaster = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const toggleSideNav = () => setSideNavOpen(!sideNavOpen);

  const [mainGroups, setMainGroups] = useState([]);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [mainGroup, setMainGroup] = useState('');
  const [itemGroup, setItemGroup] = useState('');
  const [itemGrade, setItemGrade] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  useEffect(() => {
    document.body.classList.toggle("side-nav-open", sideNavOpen);
  }, [sideNavOpen]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const groupData = await fetchMainGroupData();
        setMainGroups(groupData || []);
        const itemData = await fetchItems();
        setItems(itemData || []);
        setFilteredItems(itemData.sort((a, b) => b.id - a.id) || []);
      } catch (error) {
        console.error("Data fetch error:", error);
      }
    };
    fetchAll();
  }, []);

  const handleSearch = () => {
    if (!searchQuery && !mainGroup && !itemGroup && !itemGrade) {
      setFilteredItems(items);
      return;
    }
    const filtered = items.filter(item => {
      const matchesMainGroup = mainGroup ? item.main_group === mainGroup : true;
      const matchesItemGroup = itemGroup ? item.item_group === itemGroup : true;
      const matchesItemGrade = itemGrade ? item.Unit_Code === itemGrade : true;
      const matchesSearchQuery =
        item.part_no?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.Name_Description?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesMainGroup && matchesItemGroup && matchesItemGrade && matchesSearchQuery;
    })
    setFilteredItems(filtered);
    setCurrentPage(1);
  };

  const handleViewAll = () => {
    setFilteredItems(items);
    setSearchQuery('');
    setMainGroup('');
    setItemGroup('');
    setItemGrade('');
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredItems.length / recordsPerPage);


  const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this item?")) return;

  try {
    await deleteItemMaster(id);

    // Remove deleted item from UI immediately
    const updatedList = items.filter(item => item.id !== id);
    setItems(updatedList);
    setFilteredItems(updatedList);

    alert("Item deleted successfully!");
  } catch (error) {
    console.error("Error deleting item:", error);
    alert("Failed to delete item.");
  }
};

  const handleViewPdf = (viewPath, item) => {
    if (!viewPath || viewPath === "null" || viewPath === "undefined") {
      alert(`No PDF document attached to item: ${item?.Name_Description || item?.part_no || "this item"}`);
      return;
    }
    let url = viewPath;
    if (viewPath.startsWith("http://") || viewPath.startsWith("https://")) {
      url = viewPath;
    } else if (viewPath.startsWith("/")) {
      url = `https://sellerp-backend.onrender.com${viewPath}`;
    } else {
      url = `https://sellerp-backend.onrender.com/${viewPath}`;
    }
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="erp-page itemaa">
      <div className="container-fluid p-0">
        <div className="row m-0">
          <div className="col-md-12 p-0">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />

              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="ItemMasterMain overflow-hidden p-4">
                  {/* Header */}
                  <div className="erp-header mb-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="header-title mb-0">Item Master</h5>
                      <div className="d-flex gap-2">
                        <Link to="/item-master-gernal" className="vndrbtn">Add New Item</Link>
                        <Link to="/item-master-query" className="vndrbtn">Item Query</Link>
                      </div>
                    </div>
                  </div>

                  {/* Filter Card */}
                  <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '12px' }}>
                    <div className="card-body">
                      <div className="row g-3 align-items-end">
                        <div className="col-md-3 text-start">
                          <label className="form-label text-start w-100 fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>Item Search</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Item No / Description"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>
                        <div className="col-md-2 text-start">
                          <label className="form-label text-start w-100 fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>Main Group</label>
                          <select
                            className="form-select"
                            value={mainGroup}
                            onChange={(e) => setMainGroup(e.target.value)}
                          >
                            <option value="">ALL</option>
                            {mainGroups?.map((group) => (
                              <option key={group.subgroup_code} value={group.subgroup_name}>
                                {group.subgroup_name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-md-2 text-start">
                          <label className="form-label text-start w-100 fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>Item Group</label>
                          <select className="form-select" value={itemGroup} onChange={(e) => setItemGroup(e.target.value)}>
                            <option value="">ALL</option>
                            {itemGroups.map(group => (
                              <option key={group} value={group}>{group}</option>
                            ))}
                          </select>
                        </div>
                        <div className="col-md-2 text-start">
                          <label className="form-label text-start w-100 fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>Item Grade</label>
                          <select className="form-select" value={itemGrade} onChange={(e) => setItemGrade(e.target.value)}>
                            <option value="">All</option>
                            {itemGrades.map(grade => (
                              <option key={grade} value={grade}>{grade}</option>
                            ))}
                          </select>
                        </div>
                        <div className="col-md-3 d-flex gap-2 mt-auto">
                          <button className="vndrbtn flex-fill" onClick={handleSearch}>Search</button>
                          <button className="vndrbtn vndrbtn-secondary flex-fill" onClick={handleViewAll}>All Items</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Table Section */}
                  <div className="table-responsive mt-4">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Sr</th>
                          <th>Item No</th>
                          <th>Name / Description</th>
                          <th>Item Code</th>
                          <th>Item Size</th>
                          <th>Main Group</th>
                          <th>Item Group</th>
                          <th>Store Location</th>
                          <th>Unit Code</th>
                          <th>HSN/SAC Code</th>
                          <th>Auth</th>
                          <th>User</th>
                          <th>View</th>
                          <th>Edit</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentItems.length === 0 ? (
                          <tr>
                            <td colSpan="15" className="text-center text-muted py-4">
                              No items found.
                            </td>
                          </tr>
                        ) : (
                          currentItems.map((item, index) => (
                            <tr key={`${item.id}-${index}`}>
                              <td>{indexOfFirstRecord + index + 1}</td>
                              <td>{item.part_no}</td>
                              <td className="text-start">{item.Name_Description}</td>
                              <td>{item.Part_Code}</td>
                              <td>{item.Item_Size}</td>
                              <td>{item.main_group}</td>
                              <td>{item.item_group}</td>
                              <td>{item.Store_Location}</td>
                              <td>{item.Unit_Code}</td>
                              <td>{item.HSN_SAC_Code}</td>
                              <td>
                                {item.Auth
                                  ? <span className="badge bg-success">✓</span>
                                  : <span className="badge bg-danger">✗</span>}
                              </td>
                              <td>{item.User}</td>
                              <td>
                                <button
                                  type="button"
                                  onClick={() => handleViewPdf(item.View, item)}
                                  className="btn-view border-0"
                                  title="View"
                                >
                                  View
                                </button>
                              </td>
                              <td>
                                <Link
                                  to={`/item-master-gernal/${item.id}`}
                                  className="btn-edit"
                                  title="Edit"
                                >
                                  <FaEdit />
                                </Link>
                              </td>
                              <td>
                                <button
                                  className="btn-del"
                                  onClick={() => handleDelete(item.id)}
                                  title="Delete"
                                >
                                  <MdDeleteForever />
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination & Summary */}
                  <div className="row mt-3 align-items-center">
                    <div className="col-md-6 text-start">
                      <span className="record-count">Total Records: <strong>{filteredItems.length}</strong></span>
                    </div>
                    <div className="col-md-6 text-end">
                      <span className="record-count">Total Pending BOM FG=8 SFG=2</span>
                    </div>
                  </div>

                  <div className="mt-3">
                    <ul className="pagination justify-content-center mb-0">
                      <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        >
                          ← Prev
                        </button>
                      </li>
                      {Array.from({ length: totalPages }, (_, i) => (
                        <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                          <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                            {i + 1}
                          </button>
                        </li>
                      ))}
                      <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        >
                          Next →
                        </button>
                      </li>
                    </ul>
                  </div>

                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemMaster;
