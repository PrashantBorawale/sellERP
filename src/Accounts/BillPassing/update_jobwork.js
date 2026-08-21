const fs = require('fs');

// 1. Update PurchaseBill.jsx
const purchaseFile = 'c:/Users/admin/Desktop/FinalFiles/5-6_ERP/src/Accounts/BillPassing/PurchaseBill.jsx';
let purchaseContent = fs.readFileSync(purchaseFile, 'utf8');

purchaseContent = purchaseContent.replace(
    /<Button\s*variant="outlined"\s*startIcon=\{<FaCogs \/>\}[\s\S]*?>\s*Search Option\s*<\/Button>/,
    `<Button 
                          variant="contained" 
                          startIcon={<FaCogs />} 
                          sx={{ 
                            height: '38px', borderRadius: '8px', textTransform: 'none', fontSize: '0.875rem', fontWeight: 600, 
                            background: 'linear-gradient(to right, #6366f1, #4f46e5)', color: 'white',
                            boxShadow: '0 4px 14px 0 rgba(99, 102, 241, 0.39)', transition: 'all 0.2s ease',
                            '&:hover': { background: 'linear-gradient(to right, #4f46e5, #4338ca)', transform: 'translateY(-1px)', boxShadow: '0 6px 20px rgba(99, 102, 241, 0.4)' } 
                          }}
                        >
                          Search Option
                        </Button>`
);

fs.writeFileSync(purchaseFile, purchaseContent);

// 2. Update JobworkBill.jsx
const jobworkFile = 'c:/Users/admin/Desktop/FinalFiles/5-6_ERP/src/Accounts/BillPassing/JobworkBill.jsx';
let jobworkContent = fs.readFileSync(jobworkFile, 'utf8');

jobworkContent = jobworkContent.replace(
    /<div className="WorkOrderEntry-header mb-3">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/,
    `<div className="WorkOrderEntry-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4 d-flex justify-content-start align-items-center">
                        <Typography variant="h4" sx={{ fontWeight: 800, background: 'linear-gradient(to right, #2563eb, #4f46e5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.025em', m: 0 }}>
                          Pending Bill Inward Challan List
                        </Typography>
                      </div>
                      <div className="col-md-8 text-end d-flex justify-content-end gap-2 align-items-center">
                        <div className="stats-box d-inline-flex border rounded px-2 py-1 align-items-center" style={{ backgroundColor: '#f8fafc', borderColor: '#e2e8f0' }}>
                          <span className="me-2 small fw-bold text-secondary">57F4 GRN Auth-Pending Bill :</span>
                          <span className="badge" style={{ backgroundColor: '#3b82f6' }}>1193</span>
                        </div>
                        <div className="stats-box d-inline-flex border rounded px-2 py-1 align-items-center" style={{ backgroundColor: '#f8fafc', borderColor: '#e2e8f0' }}>
                          <span className="me-2 small fw-bold text-secondary">Bill Passing (JobWork) :</span>
                          <span className="badge" style={{ backgroundColor: '#3b82f6' }}>1193</span>
                        </div>
                        <Button 
                          variant="contained" 
                          startIcon={<DownloadIcon />}
                          sx={{ 
                            borderRadius: '8px', textTransform: 'none', fontWeight: 600, 
                            background: 'linear-gradient(to right, #3b82f6, #4f46e5)', color: 'white',
                            boxShadow: '0 4px 14px 0 rgba(79, 70, 229, 0.39)', transition: 'all 0.2s ease',
                            '&:hover': { background: 'linear-gradient(to right, #2563eb, #4338ca)', transform: 'translateY(-1px)', boxShadow: '0 6px 20px rgba(79, 70, 229, 0.4)' } 
                          }}
                        >
                          Export To Excel
                        </Button>
                      </div>
                    </div>
                  </div>`
);

jobworkContent = jobworkContent.replace(
    /<div className="header-section mb-3">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/,
    `<Paper elevation={0} sx={{ mb: 4, p: 3, borderRadius: '16px', border: '1px solid #e2e8f0', bgcolor: 'white' }}>
                    <div className="row align-items-end g-3 mb-2">
                      <div className="col-md-1">
                        <label className="form-label mb-1 small fw-bold">Plant :</label>
                        <select className="form-select form-select-sm" style={{ height: '38px', borderRadius: '8px' }}>
                          <option value="SHARP">SHARP</option>
                        </select>
                      </div>
                      <div className="col-md-2">
                        <label className="form-label mb-1 small fw-bold">From Date :</label>
                        <input type="date" className="form-control form-control-sm" value={fromDate} onChange={(e) => setFromDate(e.target.value)} style={{ height: '38px', borderRadius: '8px' }} />
                      </div>
                      <div className="col-md-2">
                        <div className="d-flex align-items-end gap-1">
                          <div className="flex-grow-1">
                            <label className="form-label mb-1 small fw-bold">To Date :</label>
                            <input type="date" className="form-control form-control-sm" value={toDate} onChange={(e) => setToDate(e.target.value)} style={{ height: '38px', borderRadius: '8px' }} />
                          </div>
                        </div>
                      </div>
                      <div className="col-auto d-flex align-items-end gap-2">
                        <Button 
                          variant="contained" 
                          onClick={() => handleSearch('date')} 
                          disabled={loading}
                          startIcon={<SearchIcon />} 
                          sx={{ height: '38px', borderRadius: '8px', backgroundColor: '#10b981', boxShadow: 'none', textTransform: 'none', fontSize: '0.875rem', fontWeight: 600, '&:hover': { backgroundColor: '#059669', boxShadow: 'none' } }}
                        >
                          {loading ? "..." : "Search"}
                        </Button>
                      </div>
                      <div className="col-md-2">
                        <div className="d-flex align-items-end gap-1">
                          <div className="flex-grow-1">
                            <label className="form-label mb-1 small fw-bold">Vendor Name :</label>
                            <input 
                              type="text" 
                              className="form-control form-control-sm" 
                              placeholder="Enter Name ..." 
                              value={vendorName} 
                              onChange={handleVendorChange} 
                              list="vendor-suggestions"
                              style={{ height: '38px', borderRadius: '8px' }}
                            />
                            <datalist id="vendor-suggestions">
                              {supplierList.map((sup, idx) => (
                                <option 
                                  key={idx} 
                                  value={typeof sup === 'string' ? sup : (sup.Name || sup.supplier_name || sup.Supplier || sup.supplier || "")} 
                                />
                              ))}
                            </datalist>
                          </div>
                        </div>
                      </div>
                      <div className="col-auto d-flex align-items-end gap-2">
                        <Button 
                          variant="contained" 
                          onClick={() => handleSearch('supplier')} 
                          disabled={loading}
                          startIcon={<SearchIcon />} 
                          sx={{ height: '38px', borderRadius: '8px', backgroundColor: '#10b981', boxShadow: 'none', textTransform: 'none', fontSize: '0.875rem', fontWeight: 600, '&:hover': { backgroundColor: '#059669', boxShadow: 'none' } }}
                        >
                          {loading ? "..." : "Search"}
                        </Button>
                      </div>
                      <div className="col-md-2 ms-auto text-end">
                        <div className="d-flex align-items-end justify-content-end gap-1">
                          <div className="flex-grow-1" style={{ maxWidth: '150px' }}>
                            <select className="form-select form-select-sm fw-bold border-bottom-0 rounded-bottom-0 mb-0" style={{ fontSize: '0.75rem', padding: '2px 8px' }}>
                              <option>57F4 GRN No</option>
                            </select>
                            <input type="text" className="form-control form-control-sm rounded-top-0" placeholder="No..." style={{ height: '24px', fontSize: '0.75rem' }} />
                          </div>
                          <Button 
                            variant="contained" 
                            startIcon={<SearchIcon />} 
                            sx={{ height: '38px', borderRadius: '8px', backgroundColor: '#10b981', boxShadow: 'none', textTransform: 'none', fontSize: '0.875rem', fontWeight: 600, '&:hover': { backgroundColor: '#059669', boxShadow: 'none' } }}
                          >
                            Search
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Paper>`
);

jobworkContent = jobworkContent.replace(
    /<div className="footer-actions mt-3 text-end">[\s\S]*?<\/div>/,
    `<div className="footer-actions mt-3 text-end">
                    <Button 
                      variant="contained" 
                      onClick={() => {
                        if (selectedGrns.length === 0) {
                          alert("Please select at least one GRN.");
                          return;
                        }
                        navigate("/accounts/bill-passing/confirm-gst-bill", { state: { selectedInvoices: selectedGrns } });
                      }}
                      startIcon={<CheckCircleIcon />}
                      sx={{ 
                        borderRadius: '8px', textTransform: 'none', fontWeight: 600, 
                        background: 'linear-gradient(to right, #10b981, #059669)', color: 'white',
                        boxShadow: '0 4px 14px 0 rgba(16, 185, 129, 0.39)', transition: 'all 0.2s ease',
                        '&:hover': { background: 'linear-gradient(to right, #059669, #047857)', transform: 'translateY(-1px)', boxShadow: '0 6px 20px rgba(16, 185, 129, 0.4)' } 
                      }}
                    >
                      Confirm To GST Bill
                    </Button>
                  </div>`
);

fs.writeFileSync(jobworkFile, jobworkContent);
console.log("Updated PurchaseBill.jsx and JobworkBill.jsx UI.");
