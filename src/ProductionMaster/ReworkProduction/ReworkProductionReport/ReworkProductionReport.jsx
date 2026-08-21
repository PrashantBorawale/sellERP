import React, { useCallback ,useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./ReworkProductionReport.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import { getProductDetails ,deleteProductDetail} from "../../../Service/Production.jsx";

const ReworkProductionReport = () => {
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

  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({ from: '', to: '', item: '' });

  const fetchData = useCallback(async () => {
    const result = await getProductDetails(filters);
    setData(result.sort((a, b) => b.id - a.id));
  }, [filters]);

  // Fetch data on component mount and whenever filters change
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  const handleSearch = () => {
    fetchData();
  };

  const handleDelete = async (id) => {
    const success = await deleteProductDetail(id);
    if (success) {
      setData(data.filter(item => item.id !== id));
    }
  };


  return (
    <div className="ReworkProductionReportMaster">
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
                <div className="ReworkProductionReport mt-5">
                  <div className="ReworkProductionReport-header mb-4 text-start">
                    <div className="row align-items-start">
                      <div className="col-md-10">
                        <h5 className="header-title">
                          Rework Production Report
                        </h5>
                      </div>
                      <div className="col-md-1">
                        <select>
                          <option>PDF</option>
                        </select>
                      </div>
                      <div className="col-md-1">
                        <button type="button" className="btn btn-primary">
                          Print Report
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="ReworkProductionReport-main mb-4  mt-5">
                  <div className="row text-start">
        <div className="col-md-2">
          <label>From</label>
          <input 
            type="date" 
            className="form-control" 
            value={filters.from} 
            onChange={(e) => setFilters({ ...filters, from: e.target.value })} 
          />
        </div>
        <div className="col-md-2">
          <label>To</label>
          <input 
            type="date" 
            className="form-control" 
            value={filters.to} 
            onChange={(e) => setFilters({ ...filters, to: e.target.value })} 
          />
        </div>
        <div className="col-md-2">
          <label>Item</label>
          <input 
            type="text" 
            className="form-control" 
            value={filters.item} 
            onChange={(e) => setFilters({ ...filters, item: e.target.value })} 
          />
        </div>
        <div className="col-md-2">
          <button type="button" className="btn btn-primary mt-4" onClick={handleSearch}>Search</button>
        </div>
      </div>
                  </div>

                  <div className="ReworkProductionReport-main mb-4 text-start mt-5">
                  <div className="table-responsive mt-4">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Sr.</th>
                          <th>Year</th>
                          <th>Plant</th>
                          <th>Prod No</th>
                          <th>Prod Date</th>
                          <th>Item No</th>
                          <th>Item Code</th>
                          <th>Item Desc</th>
                          <th>Part Code</th>
                          <th>Change FG</th>
                          <th>Rew to Ok</th>
                          <th>Rej to Ok</th>
                          <th>Rew to Rej</th>
                          <th>Remark</th>
                          <th>User</th>
                          <th>Edit</th>
                          <th>Del</th>
                        </tr>
                      </thead>
                      {/* <tbody>
                   
                        <tr>
                          <td>1</td>
                          <td>24-25</td>
                          <td>Produlink</td>
                          <td>REWPROD242509014</td>
                          <td>20/09/2024</td>
                          <td>520DU00102</td>
                          <td>FIX NUT</td>
                          <td>PPFG1051</td>
                          <td>545</td>
                          <td>11</td>
                          <td>0</td>
                          <td>11</td>
                          <td>0</td>
                          <td>Akash</td>
                          <td>...</td>
                          <td><FaEdit/></td>
                          <td><FaTrash/></td>
                        </tr>
                       
                      </tbody> */}
                       <tbody>
            {data.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>24-25</td>
                <td>Produlink</td>
                <td>{item.rework_no}</td>
                <td>{item.rework_date}</td>
                <td>{item.item_code}</td>
                <td>{item.item_desc}</td>
                <td>{item.part_code}</td>
                <td>{item.change_fg}</td>
                <td>{item.rework_to_ok_qty}</td>
                <td>{item.reject_to_ok_qty}</td>
                <td>{item.rework_to_reject_qty}</td>
                <td>{item.quality_remark}</td>
                <td>{item.operator}</td>
                <td>{item.user}</td>
                <td><FaEdit /></td>
                <td><FaTrash onClick={() => handleDelete(item.id)}  /></td>
              </tr>
            ))}
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

export default ReworkProductionReport;
