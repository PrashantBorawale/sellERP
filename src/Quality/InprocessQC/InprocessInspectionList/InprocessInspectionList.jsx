import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./InprocessInspectionList.css";
import { FaEye, FaEdit } from "react-icons/fa";
import { MdMarkEmailRead, MdDeleteForever } from "react-icons/md";
import * as XLSX from "xlsx";
import axios from "axios";

const initialRows = [
  { id: 1, srNo: 1, year: "24-25", qcNo: "PRCOQC142523914", qcDate: "02/12/24", entryNo: "242536340", entryDate: "02/12/24", itemCode: "FG1018", chNo: "520HFD0202", itemDesc: "SECONDARY PISTON FOR TMC", itemNo: "20", opNo: "CNC-1", opName: "PARTING & DRILLING", partCode: "CNC1FG1018", ok: 1297, rej: 0, rew: 3, total: 1300, hk: "F26497", user: "Anupam" },
  { id: 2, srNo: 2, year: "24-25", qcNo: "PRCOQC142523913", qcDate: "02/12/24", entryNo: "242536534", entryDate: "02/12/24", itemCode: "FG1263", chNo: "F2BZ057128", itemDesc: "CAP OIL LOCK J1D FF", itemNo: "10", opNo: "PARTING & DRILLING", opName: "PARTING & DRILLING", partCode: "PDFG1263", ok: 694, rej: 0, rew: 6, total: 700, hk: "A58430", user: "Anupam" },
  { id: 3, srNo: 3, year: "24-25", qcNo: "PRCOQC142523912", qcDate: "02/12/24", entryNo: "242536567", entryDate: "02/12/24", itemCode: "FG1106", chNo: "550BZ05802", itemDesc: "CAP OIL LOCK -PRFH006", itemNo: "10", opNo: "PARTING & DRILLING", opName: "PARTING & DRILLING", partCode: "PDFG1106", ok: 854, rej: 0, rew: 6, total: 860, hk: "E244209", user: "Anupam" },
  { id: 4, srNo: 4, year: "24-25", qcNo: "PRCOQC142523911", qcDate: "02/12/24", entryNo: "242536566", entryDate: "02/12/24", itemCode: "FG1106", chNo: "550BZ05802", itemDesc: "CAP OIL LOCK -PRFH006", itemNo: "10", opNo: "PARTING & DRILLING", opName: "PARTING & DRILLING", partCode: "PDFG1106", ok: 550, rej: 4, rew: 6, total: 560, hk: "E244209", user: "Anupam" },
  { id: 5, srNo: 5, year: "24-25", qcNo: "PRCOQC142523910", qcDate: "02/12/24", entryNo: "242536565", entryDate: "02/12/24", itemCode: "FG1106", chNo: "550BZ05802", itemDesc: "CAP OIL LOCK -PRFH006", itemNo: "10", opNo: "PARTING & DRILLING", opName: "PARTING & DRILLING", partCode: "PDFG1106", ok: 702, rej: 0, rew: 5, total: 707, hk: "E244209", user: "Anupam" },
  { id: 6, srNo: 6, year: "24-25", qcNo: "PRCOQC142523909", qcDate: "02/12/24", entryNo: "242536564", entryDate: "02/12/24", itemCode: "FG1106", chNo: "550BZ05802", itemDesc: "CAP OIL LOCK -PRFH006", itemNo: "10", opNo: "PARTING & DRILLING", opName: "PARTING & DRILLING", partCode: "PDFG1106", ok: 809, rej: 4, rew: 5, total: 818, hk: "E244209", user: "Anupam" },
  { id: 7, srNo: 7, year: "24-25", qcNo: "PRCOQC142523908", qcDate: "02/12/24", entryNo: "242536563", entryDate: "02/12/24", itemCode: "FG1106", chNo: "550BZ05802", itemDesc: "CAP OIL LOCK -PRFH006", itemNo: "10", opNo: "PARTING & DRILLING", opName: "PARTING & DRILLING", partCode: "PDFG1106", ok: 769, rej: 0, rew: 4, total: 773, hk: "E244209", user: "Anupam" },
  { id: 8, srNo: 8, year: "24-25", qcNo: "PRCOQC142523907", qcDate: "02/12/24", entryNo: "242536562", entryDate: "02/12/24", itemCode: "FG1106", chNo: "550BZ05802", itemDesc: "CAP OIL LOCK -PRFH006", itemNo: "10", opNo: "PARTING & DRILLING", opName: "PARTING & DRILLING", partCode: "PDFG1106", ok: 599, rej: 3, rew: 11, total: 613, hk: "E244209", user: "Anupam" },
  { id: 9, srNo: 9, year: "24-25", qcNo: "PRCOQC142523906", qcDate: "02/12/24", entryNo: "242536561", entryDate: "02/12/24", itemCode: "FG1106", chNo: "550BZ05802", itemDesc: "CAP OIL LOCK -PRFH006", itemNo: "10", opNo: "PARTING & DRILLING", opName: "PARTING & DRILLING", partCode: "PDFG1106", ok: 707, rej: 5, rew: 3, total: 715, hk: "E244209", user: "Anupam" }
];


const InprocessInspectionList = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setSideNavOpen((prevState) => !prevState);
  };

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }
  }, [sideNavOpen]);

  const [data, setData] = useState(initialRows);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://sellerp-backend.onrender.com/Quality/inprocess-inspection-list/");
        if (res.data && res.data.value && res.data.value.length > 0) {
          setData([...res.data.value].reverse());
        } else if (Array.isArray(res.data) && res.data.length > 0) {
          setData([...res.data].reverse());
        }
      } catch (err) {
        try {
          const fallbackRes = await axios.get("https://sellerp-backend.onrender.com/Production/api/production-entries/");
          if (fallbackRes.data && fallbackRes.data.value && fallbackRes.data.value.length > 0) {
            setData([...fallbackRes.data.value].reverse());
          } else if (Array.isArray(fallbackRes.data) && fallbackRes.data.length > 0) {
            setData([...fallbackRes.data].reverse());
          }
        } catch (e) {
          console.error("Error fetching list:", e);
        }
      }
    };
    fetchData();
  }, []);

  const handleViewPdf = (item) => {
    const viewPath =
      item?.PDF_Link ||
      item?.View ||
      item?.pdf ||
      item?.file ||
      item?.document ||
      item?.Upload_Doc ||
      item?.upload_doc ||
      item?.Document ||
      item?.doc ||
      item?.Doc ||
      item?.File ||
      item?.TC_File ||
      item?.Tc_File ||
      item?.tc_file ||
      item?.Certificate ||
      item?.certificate ||
      item?.Attachment ||
      item?.attachment ||
      item?.url ||
      item?.link;

    if (viewPath && viewPath !== "null" && viewPath !== "undefined" && viewPath !== "") {
      let url = viewPath;
      if (viewPath.startsWith("http://") || viewPath.startsWith("https://")) {
        url = viewPath;
      } else if (viewPath.startsWith("/")) {
        url = `https://sellerp-backend.onrender.com${viewPath}`;
      } else {
        url = `https://sellerp-backend.onrender.com/${viewPath}`;
      }
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      const targetId = item?.id || item?.qcNo || item?.Prod_no || item?.srNo || "1";
      window.open(`https://sellerp-backend.onrender.com/Production/ProductionEntry/pdf/${targetId}/`, "_blank", "noopener,noreferrer");
    }
  };

  const handleExportExcel = () => {
    // Currently no dynamic data array exists in this component.
    // When API fetching is implemented, map that data here instead.
    alert("No data to export");
  };

  return (
    <div className="erp-page InprocessInspectionListMaster">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav
                sideNavOpen={sideNavOpen}
                toggleSideNav={toggleSideNav}
              />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="InprocessInspectionList">
                  <div className="erp-header mb-4 mt-2">
                    <div className="d-flex justify-content-between align-items-center flex-wrap">
                      <h5 className="header-title mb-0">Inprocess Inspection List</h5>
                      <div className="d-flex gap-2 flex-wrap mt-2 mt-md-0">
                        <button type="button" className="vndrbtn border-0" onClick={handleExportExcel} style={{ height: '34px', display: 'flex', alignItems: 'center' }}>Export Excel</button>
                        <button type="button" className="vndrbtn border-0" style={{ height: '34px', display: 'flex', alignItems: 'center' }}>Inprocess QC - Query</button>
                      </div>
                    </div>
                  </div>

                  {/* Filter Card */}
                  <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: "12px" }}>
                    <div className="card-body">
                      <div className="d-flex flex-nowrap align-items-end gap-2 text-start overflow-x-auto pb-1" style={{ width: "100%" }}>

                        <div style={{ flex: "0 0 auto", width: "110px" }}>
                          <label className="form-label mb-1 text-nowrap d-block" style={{ fontSize: "0.85rem" }}>Plant :</label>
                          <select className="form-select form-select-sm" style={{ height: "34px" }}>
                            <option>SHARP</option>
                          </select>
                        </div>

                        <div style={{ flex: "0 0 auto", width: "135px" }}>
                          <label className="form-label mb-1 text-nowrap d-block" style={{ fontSize: "0.85rem" }}>From:</label>
                          <input type="date" className="form-control form-control-sm" style={{ height: "34px" }} />
                        </div>

                        <div style={{ flex: "0 0 auto", width: "135px" }}>
                          <label className="form-label mb-1 text-nowrap d-block" style={{ fontSize: "0.85rem" }}>To Date:</label>
                          <input type="date" className="form-control form-control-sm" style={{ height: "34px" }} />
                        </div>

                        <div style={{ flex: "1 1 auto", minWidth: "140px" }}>
                          <div className="form-check mb-1 d-flex align-items-center gap-1 p-0">
                            <input type="checkbox" className="form-check-input m-0 position-static" id="chkItemCode" />
                            <label htmlFor="chkItemCode" className="form-check-label text-nowrap mb-0" style={{ fontSize: "0.85rem" }}>Item Code:</label>
                          </div>
                          <input type="text" placeholder="Item Code" className="form-control form-control-sm" style={{ height: "34px" }} />
                        </div>

                        <div style={{ flex: "1 1 auto", minWidth: "140px" }}>
                          <div className="form-check mb-1 d-flex align-items-center gap-1 p-0">
                            <input type="checkbox" className="form-check-input m-0 position-static" id="chkProdNo" />
                            <label htmlFor="chkProdNo" className="form-check-label text-nowrap mb-0" style={{ fontSize: "0.85rem" }}>Prod No:</label>
                          </div>
                          <input type="text" placeholder="Production" className="form-control form-control-sm" style={{ height: "34px" }} />
                        </div>

                        <div style={{ flex: "1 1 auto", minWidth: "140px" }}>
                          <div className="form-check mb-1 d-flex align-items-center gap-1 p-0">
                            <input type="checkbox" className="form-check-input m-0 position-static" id="chkLotHeat" />
                            <label htmlFor="chkLotHeat" className="form-check-label text-nowrap mb-0" style={{ fontSize: "0.85rem" }}>Lot/Heat-No:</label>
                          </div>
                          <input type="text" placeholder="" className="form-control form-control-sm" style={{ height: "34px" }} />
                        </div>

                        <div style={{ flex: "0 0 auto", width: "120px" }}>
                          <div className="form-check mb-1 d-flex align-items-center gap-1 p-0">
                            <input type="checkbox" className="form-check-input m-0 position-static" id="chkLastOption" />
                            <label htmlFor="chkLastOption" className="form-check-label text-nowrap mb-0" style={{ fontSize: "0.85rem" }}>LastOption:</label>
                          </div>
                          <button type="button" className="vndrbtn w-100 border-0" style={{ height: "34px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            Search
                          </button>
                        </div>

                      </div>
                    </div>
                  </div>

                  {/* Table Card */}
                  <div className="card shadow-sm border-0" style={{ borderRadius: "12px" }}>
                    <div className="card-body p-0">
                      <div className="table-responsive">
                        <table className="table table-hover mb-0" style={{ tableLayout: "fixed", width: "100%" }}>
                          <colgroup>
                            <col style={{ width: "3%" }} />
                            <col style={{ width: "4%" }} />
                            <col style={{ width: "10%" }} />
                            <col style={{ width: "6%" }} />
                            <col style={{ width: "8%" }} />
                            <col style={{ width: "7%" }} />
                            <col style={{ width: "12%" }} />
                            <col style={{ width: "4%" }} />
                            <col style={{ width: "10%" }} />
                            <col style={{ width: "7%" }} />
                            <col style={{ width: "4%" }} />
                            <col style={{ width: "3%" }} />
                            <col style={{ width: "3%" }} />
                            <col style={{ width: "4%" }} />
                            <col style={{ width: "5%" }} />
                            <col style={{ width: "5%" }} />
                            <col style={{ width: "3%" }} />
                            <col style={{ width: "3%" }} />
                            <col style={{ width: "3%" }} />
                            <col style={{ width: "3%" }} />
                          </colgroup>
                          <thead className="table-light">
                        <tr>
                          <th scope="col">Sr.</th>
                          <th scope="col">Year</th>
                          <th scope="col">QC No</th>
                          <th scope="col">QC Date</th>
                          <th scope="col">Prod No</th>
                          <th scope="col">ItemNo</th>
                          <th scope="col">Item Desc</th>
                          <th scope="col">Op No</th>
                          <th scope="col">Op.Name</th>
                          <th scope="col">Part Code</th>
                          <th scope="col">Ok</th>
                          <th scope="col">Rej.</th>
                          <th scope="col">Rew.</th>
                          <th scope="col">Total</th>
                          <th scope="col">Hk</th>
                          <th scope="col">User</th>
                          <th scope="col">Edit </th>
                          <th scope="col">Del</th>
                          <th scope="col">View </th>
                          <th scope="col">Doc </th>

                        </tr>
                      </thead>

                      <tbody>
                        {data.map((item, index) => (
                          <tr key={item.id || index}>
                            <td>{index + 1}</td>
                            <td>{item.year || item.Series || "24-25"}</td>
                            <td>{item.qcNo || item.Prod_no || "-"}</td>
                            <td>{item.qcDate || item.date || "-"}</td>
                            <td>
                              {item.entryNo ? (
                                <>
                                  {item.entryNo} <br /> {item.entryDate || ""}
                                </>
                              ) : (
                                item.Prod_no || "-"
                              )}
                            </td>
                            <td>
                              {item.itemCode ? (
                                <>
                                  {item.itemCode} <br /> {item.chNo || ""}
                                </>
                              ) : (
                                item.ItemCode || "-"
                              )}
                            </td>
                            <td>{item.itemDesc || item.ItemDescription || "-"}</td>
                            <td>{item.itemNo || "10"}</td>
                            <td>{item.opNo || item.operation || "-"}</td>
                            <td>{item.opName || item.operation || "-"}</td>
                            <td>{item.partCode || item.ItemCode || "-"}</td>
                            <td>{item.ok ?? item.prod_qty ?? 0}</td>
                            <td>{item.rej ?? item.reject_qty ?? 0}</td>
                            <td>{item.rew ?? item.rework_qty ?? 0}</td>
                            <td>{item.total ?? item.prod_qty ?? 0}</td>
                            <td>{item.hk || "-"}</td>
                            <td>{item.user || "Anupam"}</td>
                            <td><FaEdit /></td>
                            <td> <MdDeleteForever /> </td>
                            <td className="text-center">
                              <FaEye
                                size={18}
                                style={{ cursor: "pointer", color: "#0d6efd" }}
                                onClick={() => handleViewPdf(item)}
                                title="View PDF"
                              />
                            </td>
                            <td><MdMarkEmailRead /></td>
                          </tr>
                        ))}
                      </tbody>

                    </table>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default InprocessInspectionList