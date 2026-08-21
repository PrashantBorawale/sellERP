const fs = require('fs');
const file = 'c:/Users/admin/Desktop/FinalFiles/5-6_ERP/src/Accounts/BillPassing/PurchaseBill.jsx';
let content = fs.readFileSync(file, 'utf8');

// Replace header section
content = content.replace(
    /<div className="WorkOrderEntry-header mb-4">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/,
    `<div className="WorkOrderEntry-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4 d-flex justify-content-start align-items-center">
                        <Typography variant="h4" sx={{ fontWeight: 800, background: 'linear-gradient(to right, #2563eb, #4f46e5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.025em', m: 0 }}>
                          Pending BILL GRN List
                        </Typography>
                      </div>
                      <div className="col-md-8 text-end d-flex justify-content-end gap-2 align-items-center">
                        <div className="stats-box d-inline-flex border rounded px-2 py-1 align-items-center" style={{ backgroundColor: '#f8fafc', borderColor: '#e2e8f0' }}>
                            <span className="me-2 small fw-bold text-secondary">Purchase GRN Auth-Pending Bill :</span>
                            <span className="badge" style={{ backgroundColor: '#3b82f6' }}>225</span>
                        </div>
                        <div className="stats-box d-inline-flex border rounded px-2 py-1 align-items-center" style={{ backgroundColor: '#f8fafc', borderColor: '#e2e8f0' }}>
                            <span className="me-2 small fw-bold text-secondary">Bill Passing (Purchase) :</span>
                            <span className="badge" style={{ backgroundColor: '#3b82f6' }}>225</span>
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
                          Export Excel
                        </Button>
                      </div>
                    </div>
                  </div>`
);

// Replace search section
content = content.replace(
    /<div className="header-section mb-4">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/,
    `<Paper elevation={0} sx={{ mb: 4, p: 3, borderRadius: '16px', border: '1px solid #e2e8f0', bgcolor: 'white' }}>
                    <div className="row align-items-end g-3">
                      <div className="col-auto d-flex align-items-center gap-3 pe-4">
                        <div className="form-check mb-0">
                          <input className="form-check-input" type="radio" name="grnType" id="poGrn" defaultChecked />
                          <label className="form-check-label fw-bold small" htmlFor="poGrn">PO GRN</label>
                        </div>
                        <div className="form-check mb-0">
                          <input className="form-check-input" type="radio" name="grnType" id="directGrn" />
                          <label className="form-check-label fw-bold small" htmlFor="directGrn">Direct GRN</label>
                        </div>
                      </div>

                      <div className="col-md-2">
                        <label className="form-label mb-1 small fw-bold">Plant :</label>
                        <select className="form-select form-select-sm" style={{ height: '38px', borderRadius: '8px' }}>
                            <option value="SHARP">SHARP</option>
                        </select>
                      </div>

                      <div className="col-md-2">
                         <label className="form-label mb-1 small fw-bold">From :</label>
                         <input type="date" className="form-control form-control-sm" value={fromDate} onChange={(e) => setFromDate(e.target.value)} style={{ height: '38px', borderRadius: '8px' }} />
                      </div>

                      <div className="col-md-2">
                         <label className="form-label mb-1 small fw-bold">To :</label>
                         <input type="date" className="form-control form-control-sm" value={toDate} onChange={(e) => setToDate(e.target.value)} style={{ height: '38px', borderRadius: '8px' }} />
                      </div>

                      <div className="col-md-3 d-flex gap-2">
                        <Button 
                          variant="contained" 
                          onClick={handleSearch} 
                          disabled={loading}
                          startIcon={<SearchIcon />} 
                          sx={{ height: '38px', borderRadius: '8px', backgroundColor: '#10b981', boxShadow: 'none', textTransform: 'none', fontSize: '0.875rem', fontWeight: 600, '&:hover': { backgroundColor: '#059669', boxShadow: 'none' } }}
                        >
                          {loading ? "Searching..." : "Search"}
                        </Button>
                        <Button 
                          variant="outlined" 
                          startIcon={<FaCogs />} 
                          sx={{ height: '38px', borderRadius: '8px', textTransform: 'none', fontSize: '0.875rem', fontWeight: 600, color: '#64748b', borderColor: '#cbd5e1', '&:hover': { borderColor: '#94a3b8', backgroundColor: '#f8fafc' } }}
                        >
                          Search Option
                        </Button>
                      </div>
                    </div>
                  </Paper>`
);

// Replace confirm button at the footer
content = content.replace(
    /<div className="footer-actions mt-3 text-end">[\s\S]*?<\/div>/,
    `<div className="footer-actions mt-3 text-end">
                    <Button 
                      variant="contained" 
                      onClick={handleConfirmToGstBill}
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

fs.writeFileSync(file, content);
console.log("PurchaseBill.jsx UI updated.");
