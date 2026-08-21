// import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min";
// import NavBar from "../../../../NavBar/NavBar.js";
// import SideNav from "../../../../SideNav/SideNav.js";
// import { useNavigate } from 'react-router-dom';
// import "./DabitNoteList.css";


// const DabitNoteList = () => {
//   const [sideNavOpen, setSideNavOpen] = useState(false);
//    const navigate = useNavigate();  
  
//     const handleButtonClick = () => {
//       navigate('/'); 
//     };

//   const toggleSideNav = () => {
//     setSideNavOpen((prevState) => !prevState);
//   };

//   useEffect(() => {
//     if (sideNavOpen) {
//       document.body.classList.add("side-nav-open");
//     } else {
//       document.body.classList.remove("side-nav-open");
//     }
//   }, [sideNavOpen]);

//   return (
//     <div className="DabitNoteListMaster">
//       <div className="container-fluid">
//         <div className="row">
//           <div className="col-md-12">
//             <div className="Main-NavBar">
//               <NavBar toggleSideNav={toggleSideNav} />
//               <SideNav
//                 sideNavOpen={sideNavOpen}
//                 toggleSideNav={toggleSideNav}
//               />
//               <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
//                 <div className="DabitNoteList mt-5">
//                   <div className="DabitNoteList-header mb-4 text-start">
//                     <div className="row align-items-center">
//                       <div className="col-md-4">
//                         <h5 className="header-title"> Dabit Note List</h5>
//                       </div>
                                  
//                         <div className="col-md-8 text-end">
//                         <button type="button" className="btn" onClick={handleButtonClick}>
//                           Dabit Note - Query
//                         </button>
//                         </div>
//                     </div>
//                   </div>


//                     <div className="DabitNoteList-main">
                    
//                       <div className="row text-start">
//                           <div className="col-md-2">
//                              <label htmlFor="">From Date</label>
//                              <input type="date" className="form-control" placeholder="" />
//                           </div>
//                           <div className="col-md-2">
//                              <label htmlFor="">To Date:</label>
//                              <input type="date" className="form-control" placeholder="" />
//                           </div>
//                           <div className="col-md-2">
//                              <label htmlFor="">Plant:</label>
//                                 <select name="" id="" className="form-control">
//                                     <option value="">Produlink</option>
//                                 </select>         
//                          </div>
//                           <div className="col-md-2">
//                              <label htmlFor="">Type:</label>
//                              <select name="" id="" className="form-control">
//                                     <option value="">All - Dabit Note </option>
//                                     <option value="">Purchase - Dabit Note</option>
//                                     <option value="">Sales Rate Diff - Dabit Note</option>
//                                     <option value="">Jobwork Rate Diff - Dabit Note</option>
//                              </select> 
//                           </div>
//                           <div className="col-md-2 ">
//                           <label htmlFor="serviceDN" className="d-flex align-items-center text-start"> <input type="checkbox" id="serviceDN" className="me-2" />
//                             PartyName:</label>
//                             <input type="text" className="form-control" placeholder="Party Name" />
//                          </div>

//                       </div>
//                       <div className="row text-start">
                          
//                           <div className="col-md-2 ">
//                           <label htmlFor="serviceDN" className="d-flex align-items-center text-start"> <input type="checkbox" id="serviceDN" className="me-2" />
//                             Item:</label>
//                             <input type="text" className="form-control" placeholder=" " />
//                          </div>
//                          <div className="col-md-2 ">
//                           <label htmlFor="serviceDN" className="d-flex align-items-center text-start"> <input type="checkbox" id="serviceDN" className="me-2" />
//                              DCNo:</label>
//                             <input type="text" className="form-control" placeholder=" " />
//                          </div>
//                          <div className="col-md-2 mt-4">
//                             <button className="btn">Search</button>
//                             <button className="btn">Blue Print</button>
//                          </div>

//                       </div>
                      
//                     </div>
          
//                      <div className="table-responsive">
//                                   <table className="table table-bordered">
//                                         <thead>
//                                             <tr>
//                                             <th>Sr.</th>
//                                             <th>Year </th>
//                                             <th>Plant</th>
//                                             <th>Note No</th>
//                                             <th>Note Date </th>
//                                             <th>Type</th>
//                                             <th>Code No</th>
//                                             <th>Cust. Name</th>
//                                             <th>Total Amt</th>
//                                             <th>User</th>
//                                             <th>IRN</th>
//                                             <th>Cancel</th>
//                                             <th>View</th>
//                                             <th>Email</th>
//                                             <th>Edit</th>
//                                             <th>Del</th>
//                                             <th>All</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             <tr>
//                                                 <td>1</td>
//                                                 <td></td>
//                                                 <td></td>
//                                                 <td></td>
//                                                 <td></td>
//                                                 <td></td>
//                                                 <td></td>
//                                                 <td></td>
//                                                 <td></td>
//                                                 <td></td>
//                                                 <td></td>
//                                                 <td></td>
//                                                 <td></td>
//                                                 <td></td>
//                                                 <td></td>
//                                                 <td></td>
//                                                 <td></td>
//                                             </tr>
//                                         </tbody>
//                                  </table>
//                      </div>
//                 </div>
//               </main>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };


// export default DabitNoteList



import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../../NavBar/NavBar.js";
import SideNav from "../../../../SideNav/SideNav.js";
import { useNavigate } from 'react-router-dom';
import "./DabitNoteList.css";


const DabitNoteList = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [debitNoteData, setDebitNoteData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [plant, setPlant] = useState("");
  const [type, setType] = useState("");
  const [partyName, setPartyName] = useState("");
  const [partyNameChecked, setPartyNameChecked] = useState(false);
  const [item, setItem] = useState("");
  const [itemChecked, setItemChecked] = useState(false);
  const [dcNo, setDcNo] = useState("");
  const [dcNoChecked, setDcNoChecked] = useState(false);

  const navigate = useNavigate();  
  
  const handleButtonClick = () => {
    navigate('/'); 
  };

  // Fetch debit note data from API
  useEffect(() => {
    const fetchDebitNoteData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch from both endpoints in parallel
        const [res1, res2] = await Promise.all([
          fetch("https://sellerp-backend.onrender.com/Sales/debitnote/"),
          fetch("https://sellerp-backend.onrender.com/Sales/gst-jobwork-rate-diff/")
        ]);

        if (!res1.ok || !res2.ok) {
          throw new Error(`API error: ${res1.status} / ${res2.status}`);
        }

        const data1 = await res1.json();
        const data2 = await res2.json();

        const list1 = Array.isArray(data1) ? data1 : data1.data || [];
        const list2 = Array.isArray(data2) ? data2 : data2.data || [];

        // Combine the results
        const combined = [...list1, ...list2];
        
        console.log("Combined Debit Note Data:", combined);
        setDebitNoteData(combined);
        setFilteredData(combined);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching debit note data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDebitNoteData();
  }, []);

  // Handle search/filter
  const handleSearch = () => {
    let results = debitNoteData;

    // Filter by date range
    if (fromDate) {
      results = results.filter(item => {
        const itemDate = new Date(item.debit_note_date || "");
        return itemDate >= new Date(fromDate);
      });
    }
    if (toDate) {
      results = results.filter(item => {
        const itemDate = new Date(item.debit_note_date || "");
        return itemDate <= new Date(toDate);
      });
    }

    // Filter by type
    if (type) {
      results = results.filter(item => 
        (item.notetype || item.type || "").toLowerCase().includes(type.toLowerCase())
      );
    }

    // Filter by party name
    if (partyNameChecked && partyName) {
      results = results.filter(item => {
                const name = (item.party_name || item.customer || item.bill_to_cust || item.bill_to || item.vendor_name || item.supplier_name || item.cust_name || item.Customer || item.Name || item.party || item.vendor || item.supplier || item.customer_name || (item.items && item.items[0] ? (item.items[0].customer || item.items[0].bill_to_cust || item.items[0].party_name || item.items[0].party || "") : "") || "").toLowerCase();
        return name.includes(partyName.toLowerCase());
      });
    }

    // Filter by item (from items array)
    if (itemChecked && item) {
      results = results.filter(row => {
        if (row.items && Array.isArray(row.items)) {
          return row.items.some(lineItem => 
            (lineItem.item_code || lineItem.item_description || "").toLowerCase().includes(item.toLowerCase())
          );
        }
        return false;
      });
    }

    // Filter by DC No (Debit Note Number)
    if (dcNoChecked && dcNo) {
      results = results.filter(item => 
        (item.debit_note_no || "").toLowerCase().includes(dcNo.toLowerCase())
      );
    }

    setFilteredData(results);
  };

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

  const handleView = async (row) => {
    try {
      setLoading(true);
      setError(null);
      const id = row.id ?? row.pk ?? row.debit_note_id ?? row.debitnote_id ?? row.debit_note_no;
      if (!id) {
        throw new Error("No ID found for this debit note");
      }
      const response = await fetch(`https://sellerp-backend.onrender.com/Sales/debit-note/${id}/`);
      if (!response.ok) {
        throw new Error(`PDF API error: ${response.status}`);
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const filename = `${row.debit_note_no || 'debit_note'}_${id}.pdf`;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error fetching PDF:", err);
      setError(err.message || "Failed to fetch PDF");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="DabitNoteListMaster">
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
                <div className="DabitNoteList mt-5">
                  <div className="DabitNoteList-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title"> Debit Note List</h5>
                      </div>
                                  
                        <div className="col-md-8 text-end">
                        <button type="button" className="btn" onClick={handleButtonClick}>
                          Debit Note - Query
                        </button>
                        </div> 
                    </div>
                  </div>


                    <div className="DabitNoteList-main">
                    
                      <div className="row text-start">
                          <div className="col-md-2">
                             <label htmlFor="">From Date</label>
                             <input 
                               type="date" 
                               className="form-control" 
                               value={fromDate}
                               onChange={(e) => setFromDate(e.target.value)}
                             />
                          </div>
                          <div className="col-md-2">
                             <label htmlFor="">To Date:</label>
                             <input 
                               type="date" 
                               className="form-control" 
                               value={toDate}
                               onChange={(e) => setToDate(e.target.value)}
                             />
                          </div>
                          <div className="col-md-2">
                             <label htmlFor="">Plant:</label>
                                <select 
                                  name="plant" 
                                  id="plant" 
                                  className="form-control"
                                  value={plant}
                                  onChange={(e) => setPlant(e.target.value)}
                                >
                                    <option value="">Produlink</option>
                                </select>         
                         </div>
                          <div className="col-md-2">
                             <label htmlFor="">Type:</label>
                             <select 
                               name="type" 
                               id="type" 
                               className="form-control"
                               value={type}
                               onChange={(e) => setType(e.target.value)}
                             >
                                    <option value="">All - Dabit Note </option>
                                    <option value="">Purchase - Dabit Note</option>
                                    <option value="">Sales Rate Diff - Dabit Note</option>
                                    <option value="">Jobwork Rate Diff - Dabit Note</option>
                             </select> 
                          </div>
                          <div className="col-md-2 ">
                          <label htmlFor="partyNameCheckbox" className="d-flex align-items-center text-start">
                            <input 
                              type="checkbox" 
                              id="partyNameCheckbox" 
                              className="me-2"
                              checked={partyNameChecked}
                              onChange={(e) => setPartyNameChecked(e.target.checked)}
                            />
                            PartyName:
                          </label>
                            <input 
                              type="text" 
                              className="form-control" 
                              placeholder="Party Name" 
                              value={partyName}
                              onChange={(e) => setPartyName(e.target.value)}
                            />
                         </div>

                      </div>
                      <div className="row text-start">
                          
                          <div className="col-md-2 ">
                          <label htmlFor="itemCheckbox" className="d-flex align-items-center text-start">
                            <input 
                              type="checkbox" 
                              id="itemCheckbox" 
                              className="me-2"
                              checked={itemChecked}
                              onChange={(e) => setItemChecked(e.target.checked)}
                            />
                            Item:
                          </label>
                            <input 
                              type="text" 
                              className="form-control" 
                              placeholder=" " 
                              value={item}
                              onChange={(e) => setItem(e.target.value)}
                            />
                         </div>
                         <div className="col-md-2 ">
                          <label htmlFor="dcNoCheckbox" className="d-flex align-items-center text-start">
                            <input 
                              type="checkbox" 
                              id="dcNoCheckbox" 
                              className="me-2"
                              checked={dcNoChecked}
                              onChange={(e) => setDcNoChecked(e.target.checked)}
                            />
                             DCNo:
                          </label>
                            <input 
                              type="text" 
                              className="form-control" 
                              placeholder=" " 
                              value={dcNo}
                              onChange={(e) => setDcNo(e.target.value)}
                            />
                         </div>
                         <div className="col-md-2 mt-4">
                            <button 
                              type="button"
                              className="btn btn-primary"
                              onClick={handleSearch}
                            >
                              Search
                            </button>
                            <button className="btn">Blue Print</button>
                         </div>

                      </div>
                      
                    </div>
          
                     <div className="table-responsive">
                      {error && <div className="alert alert-danger">{error}</div>}
                      {loading && <div className="alert alert-info">Loading data...</div>}
                                  <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                            <th>Sr.</th>
                                            <th>Year </th>
                                            <th>Plant</th>
                                            <th>Note No</th>
                                            <th>Note Date </th>
                                            <th>Type</th>
                                            <th>Code No</th>
                                            <th>Cust. Name</th>
                                            <th>Total Amt</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                          {filteredData && filteredData.length > 0 ? (
                                            filteredData.map((item, index) => {
                                              // Calculate total amount from items
                                              const totalAmount = parseFloat(item.grand_total || item.total_amt || 0) || (item.items && item.items.length > 0 
                                                ? item.items.reduce((sum, lineItem) => sum + parseFloat(lineItem.grand_total || lineItem.diff_amt || 0), 0)
                                                : 0);
                                              
                                              // Extract year from created_at or debit_note_date
                                              const createdYear = (item.created_at || item.debit_note_date) ? new Date(item.created_at || item.debit_note_date).getFullYear() : "-";
                                              
                                              return (
                                                <tr key={index}>
                                                  <td>{index + 1}</td>
                                                  <td>{createdYear}</td>
                                                  <td>{item.plant || "ProduLink"}</td>
                                                  <td>{item.debit_note_no || "-"}</td>
                                                  <td>{item.debit_note_date || "-"}</td>
                                                  <td>{item.notetype || item.type || (item.customer ? "Rate Diff." : "-")}</td>
                                                  <td>{item.po_no || item.invoice_no || "-"}</td>
                                                                                                     <td>{item.party_name || item.customer || item.bill_to_cust || item.bill_to || item.vendor_name || item.supplier_name || item.cust_name || item.Customer || item.Name || item.party || item.vendor || item.supplier || item.customer_name || (item.items && item.items[0] ? (item.items[0].customer || item.items[0].bill_to_cust || item.items[0].party_name || item.items[0].party || "") : "") || "-"}</td>
                                                  <td>{totalAmount.toFixed(2)}</td>
                                                </tr>
                                              );
                                            })
                                          ) : (
                                            <tr>
                                              <td colSpan="9" className="text-center">No data found</td>
                                            </tr>
                                          )}
                                        </tbody>
                                 </table>
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


export default DabitNoteList