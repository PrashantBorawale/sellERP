import React, { useState, useEffect, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./PurchseOrderStatus.css";

const PurchseOrderStatus = () => {
  // Side‑nav
  const [sideNavOpen, setSideNavOpen] = useState(false);

  // Raw orders
  const [orders, setOrders] = useState([]);

  // Filter states
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [seriesFilter, setSeriesFilter] = useState("");
  const [poTypeFilter, setPoTypeFilter] = useState("");
  const [itemStatusFilter, setItemStatusFilter] = useState("");
  const [poStatusFilter, setPoStatusFilter] = useState("");
  const [poApproveFilter, setPoApproveFilter] = useState("");
  const [supplierFilter, setSupplierFilter] = useState("");
  const [itemFilter, setItemFilter] = useState("");
  const [poNoFilter, setPoNoFilter] = useState("");
  const [itemGroupFilter, setItemGroupFilter] = useState("");
  const [supportEtaOnly] = useState(false);

  // Dummy to re-run filter on Search click
  // removed searchToggle as it is unused

  // Fetch all POs on mount
  const fetchOrders = async () => {
    try {
      const res = await fetch(
        "https://sellerp-backend.onrender.com/Purchase/purchase-orders/all/"
      );
      const { data } = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  };

  // Side‑nav class toggle
  useEffect(() => {
    document.body.classList.toggle("side-nav-open", sideNavOpen);
  }, [sideNavOpen]);

  // Initial load
  useEffect(() => {
    fetchOrders();
  }, []);

  // Apply filters via useMemo
  const filtered = useMemo(() => {
    return orders.filter((o) => {
      if (fromDate && o.PoDate < fromDate) return false;
      if (toDate && o.PoDate > toDate) return false;
      if (seriesFilter && o.Series !== seriesFilter) return false;
      if (poTypeFilter && o.Type !== poTypeFilter) return false;
      if (itemStatusFilter && o.item_details.every(d => d.Qty === "0")) return false; // example
      if (poStatusFilter && o.Approved_status !== poStatusFilter) return false;
      if (poApproveFilter && o.Approved_status !== poApproveFilter) return false;
      if (supplierFilter && !o.Supplier?.toLowerCase().includes(supplierFilter.toLowerCase())) return false;
      if (itemFilter && !o.item_details.some(d => d.Item.toLowerCase().includes(itemFilter.toLowerCase()))) return false;
      if (poNoFilter && !o.PoNo.toString().includes(poNoFilter)) return false;
      if (itemGroupFilter && o.Series !== itemGroupFilter) return false;
      if (supportEtaOnly) {
        // only those with ETA within X days; here example delivery < today+7
        const now = new Date();
        return o.item_details.some(d => {
          const eta = new Date(d.DeliveryDt);
          return (eta - now) / (1000 * 60 * 60 * 24) <= 0;
        });
      }
      return true;
    });
  }, [
    orders,
    fromDate,
    toDate,
    seriesFilter,
    poTypeFilter,
    itemStatusFilter,
    poStatusFilter,
    poApproveFilter,
    supplierFilter,
    itemFilter,
    poNoFilter,
    itemGroupFilter,
    supportEtaOnly,
  ]);

  return (
    <div className="NewOrderStatusMaster">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={() => setSideNavOpen(v => !v)} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={() => setSideNavOpen(v => !v)} />

              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                {/* Header */}
                <div className="Purchaseorderstatus text-start mt-5">
                  <div className="row align-items-center">
                    <div className="col-md-4">
                      <h5 className="header-title">Pending MRN Release List</h5>
                    </div>
                    <div className="col-md-8 text-end">
                      <div className="row justify-content-end">
                        <div className="col-md-2 mt-2 d-flex align-items-center">
                          <input
                            type="checkbox"
                            id="sendEmail"
                          />
                          <label htmlFor="sendEmail" className="ms-2">
                            Send Email
                          </label>
                        </div>
                        <div className="col-md-2 d-flex align-items-center">
                          <button className="pobtn">Export To Excel</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Filter Table */}
                <div className="Purchaseorderstatus mt-5">
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>From Date</th>
                          <th>To Date</th>
                          <th>Series</th>
                          <th>PO Type</th>
                          <th>Item Status</th>
                          <th>PO Status</th>
                          <th>PO Approve</th>
                          <th>
                            <input type="checkbox" id="supplier" />
                            <label htmlFor="supplier" className="ms-2">
                              Supplier
                            </label>
                          </th>
                          <th>
                            <input type="checkbox" id="item" />
                            <label htmlFor="item" className="ms-2">
                              Item
                            </label>
                          </th>
                          <th>
                            <input type="checkbox" id="poNo" />
                            <label htmlFor="poNo" className="ms-2">
                              PO No
                            </label>
                          </th>
                          <th>
                            <input type="checkbox" id="itemGroup" />
                            <label htmlFor="itemGroup" className="ms-2">
                              Item Group POWise
                            </label>
                          </th>
                          {/* <th>
                            <input
                              type="checkbox"
                              id="supportETA"
                              checked={supportEtaOnly}
                              onChange={e => setSupportEtaOnly(e.target.checked)}
                            />
                            <label htmlFor="supportETA" className="ms-2">
                              Snow Bal Qty Only
                            </label>
                          </th> */}
                          <th>
                            <button
                              className="pobtn"
                            >
                              Search
                            </button>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <input
                              type="date"
                              className="form-control"
                              value={fromDate}
                              onChange={e => setFromDate(e.target.value)}
                            />
                          </td>
                          <td>
                            <input
                              type="date"
                              className="form-control"
                              value={toDate}
                              onChange={e => setToDate(e.target.value)}
                            />
                          </td>
                          <td>
                            <select
                              className="form-control"
                              value={seriesFilter}
                              onChange={e => setSeriesFilter(e.target.value)}
                            >
                              <option value="">All Series</option>
                              <option>Plant 1</option>
                              <option>Plant 2</option>
                              <option>Plant 3</option>
                            </select>
                          </td>
                          <td>
                            <select
                              className="form-control"
                              value={poTypeFilter}
                              onChange={e => setPoTypeFilter(e.target.value)}
                            >
                              <option value="">All Types</option>
                              <option>Type 1</option>
                              <option>Type 2</option>
                            </select>
                          </td>
                          <td>
                            <select
                              className="form-control"
                              value={itemStatusFilter}
                              onChange={e => setItemStatusFilter(e.target.value)}
                            >
                              <option value="">Any</option>
                              <option>Status 1</option>
                              <option>Status 2</option>
                            </select>
                          </td>
                          <td>
                            <select
                              className="form-control"
                              value={poStatusFilter}
                              onChange={e => setPoStatusFilter(e.target.value)}
                            >
                              <option value="">Any</option>
                              <option>Approved</option>
                              <option>Rejected</option>
                              <option>Pending</option>
                            </select>
                          </td>
                          <td>
                            <select
                              className="form-control"
                              value={poApproveFilter}
                              onChange={e => setPoApproveFilter(e.target.value)}
                            >
                              <option value="">Any</option>
                              <option>Approve 1</option>
                              <option>Approve 2</option>
                            </select>
                          </td>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Supplier"
                              value={supplierFilter}
                              onChange={e => setSupplierFilter(e.target.value)}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Item"
                              value={itemFilter}
                              onChange={e => setItemFilter(e.target.value)}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="PO No"
                              value={poNoFilter}
                              onChange={e => setPoNoFilter(e.target.value)}
                            />
                          </td>
                          <td>
                            <select
                              className="form-control"
                              value={itemGroupFilter}
                              onChange={e => setItemGroupFilter(e.target.value)}
                            >
                              <option value="">Any</option>
                              <option>Group 1</option>
                              <option>Group 2</option>
                            </select>
                          </td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Data Table */}
                  <div className="Purchaseordertable mt-4">
                    <div className="table-responsive">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Sr</th>
                            <th>Year</th>
                            <th>PO No</th>
                            <th>PO Date</th>
                            <th>PO Type</th>
                            <th>Supplier Name</th>
                            <th>Item No</th>
                            <th>Item Desc</th>
                            <th>ETA Date</th>
                            <th>ETA Days</th>
                            <th>Rate</th>
                            <th>GRN</th>
                            <th>Disc (%)</th>
                            <th>PO Qty</th>
                            <th>Challan Qty</th>
                            <th>GRN Qty</th>
                            <th>Bal Qty</th>
                            <th>Follow up</th>
                            <th>Status (%)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filtered.length === 0 ? (
                            <tr>
                              <td colSpan="19" className="text-center">
                                No records found.
                              </td>
                            </tr>
                          ) : (
                            filtered.map((order, i) =>
                              order.item_details.map((item, j) => {
                                const etaDays = Math.ceil(
                                  (new Date(item.DeliveryDt) -
                                    new Date(order.PoDate)) /
                                  (1000 * 60 * 60 * 24)
                                );
                                const balQty = Number(item.Qty);
                                return (
                                  <tr key={`${order.id}-${item.id}`}>
                                    <td>{i + 1}</td>
                                    <td>
                                      {new Date(order.PoDate).getFullYear()}
                                    </td>
                                    <td>{order.PoNo}</td>
                                    <td>{order.PoDate}</td>
                                    <td>{order.Type}</td>
                                    <td>{order.Supplier}</td>
                                    <td>{item.Item}</td>
                                    <td>{item.ItemDescription}</td>
                                    <td>{item.DeliveryDt}</td>
                                    <td>{etaDays}</td>
                                    <td>{item.Rate}</td>
                                    <td></td>
                                    <td>{item.Disc}</td>
                                    <td>{item.Qty}</td>
                                    <td></td>
                                    <td></td>
                                    <td>{balQty}</td>
                                    <td></td>
                                    <td>{order.Approved_status}</td>
                                  </tr>
                                );
                              })
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
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

export default PurchseOrderStatus;
