const fs = require('fs');

const targetFile = 'c:/Users/admin/Desktop/FinalFiles/5-6_ERP/src/Accounts/BillPassing/DirectBill.jsx';
let content = fs.readFileSync(targetFile, 'utf8');

// 1. Replace the header section
content = content.replace(
    /<div className="WorkOrderEntry-header mb-4">[\s\S]*?<div className="d-flex align-items-center gap-4 py-1">[\s\S]*?<h5 className="header-title mb-0 text-nowrap">\s*Bill Register\s*<\/h5>[\s\S]*?<div className="d-flex align-items-center gap-3 flex-grow-1">[\s\S]*?<div className="d-flex align-items-center gap-2">[\s\S]*?<label className="form-label mb-0 text-nowrap small fw-bold">Plant :<\/label>[\s\S]*?<select className="form-select form-select-sm" style=\{\{ width: '110px', height: '28px' \}\}>[\s\S]*?<option>SHARP<\/option>[\s\S]*?<\/select>[\s\S]*?<\/div>[\s\S]*?<div className="d-flex align-items-center gap-2">[\s\S]*?<label className="form-label mb-0 text-nowrap small fw-bold">Bill Type :<\/label>[\s\S]*?<select className="form-select form-select-sm" style=\{\{ width: '110px', height: '28px' \}\}>[\s\S]*?<option>Select<\/option>[\s\S]*?<\/select>[\s\S]*?<\/div>[\s\S]*?<div className="d-flex align-items-center gap-2">[\s\S]*?<label className="form-label mb-0 text-nowrap small fw-bold">Series No :<\/label>[\s\S]*?<select className="form-select form-select-sm" style=\{\{ width: '110px', height: '28px' \}\}>[\s\S]*?<option><\/option>[\s\S]*?<\/select>[\s\S]*?<\/div>[\s\S]*?<div className="d-flex align-items-center gap-2">[\s\S]*?<label className="form-label mb-0 text-nowrap small fw-bold">No :<\/label>[\s\S]*?<input type="text" className="form-control form-control-sm" value=\{footerData\.billNo\} readOnly style=\{\{ width: '90px', height: '28px' \}\} \/>[\s\S]*?<\/div>[\s\S]*?<\/div>[\s\S]*?<\/div>[\s\S]*?<\/div>/,
    `<div className="WorkOrderEntry-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-3 d-flex justify-content-start align-items-center">
                        <Typography variant="h4" sx={{ fontWeight: 800, background: 'linear-gradient(to right, #2563eb, #4f46e5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.025em', m: 0 }}>
                          Bill Register
                        </Typography>
                      </div>
                      <div className="col-md-9 text-end d-flex justify-content-end gap-3 align-items-center flex-wrap">
                        <div className="d-flex align-items-center gap-2">
                          <label className="form-label mb-0 text-nowrap small fw-bold">Plant :</label>
                          <select className="form-select form-select-sm" style={{ width: '110px', height: '38px', borderRadius: '8px' }}>
                            <option>SHARP</option>
                          </select>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <label className="form-label mb-0 text-nowrap small fw-bold">Bill Type :</label>
                          <select className="form-select form-select-sm" style={{ width: '110px', height: '38px', borderRadius: '8px' }}>
                            <option>Select</option>
                          </select>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <label className="form-label mb-0 text-nowrap small fw-bold">Series No :</label>
                          <select className="form-select form-select-sm" style={{ width: '110px', height: '38px', borderRadius: '8px' }}>
                            <option></option>
                          </select>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <label className="form-label mb-0 text-nowrap small fw-bold">No :</label>
                          <input type="text" className="form-control form-control-sm" value={footerData.billNo} readOnly style={{ width: '90px', height: '38px', borderRadius: '8px' }} />
                        </div>
                      </div>
                    </div>
                  </div>`
);

// 2. Replace the search section (Input Search Section)
content = content.replace(
    /<div className="search-section mb-3 p-2 border rounded bg-white shadow-sm">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/,
    `<Paper elevation={0} sx={{ mb: 4, p: 3, borderRadius: '16px', border: '1px solid #e2e8f0', bgcolor: 'white' }}>
                    <div className="row g-3 align-items-end justify-content-start">
                      <div className="col-md-3">
                        <label className="form-label small fw-bold mb-1">Supplier Name :</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          placeholder="ENTER SUPPLIER NAME.."
                          value={newRow.supplierName}
                          onChange={(e) => setNewRow({ ...newRow, supplierName: e.target.value })}
                          style={{ height: '38px', borderRadius: '8px' }}
                        />
                      </div>
                      <div className="col-auto d-flex align-items-end">
                        <Button 
                          variant="contained" 
                          startIcon={<SearchIcon />} 
                          sx={{ 
                            height: '38px', borderRadius: '8px', textTransform: 'none', fontSize: '0.875rem', fontWeight: 600, 
                            background: 'linear-gradient(to right, #6366f1, #4f46e5)', color: 'white',
                            boxShadow: '0 4px 14px 0 rgba(99, 102, 241, 0.39)', transition: 'all 0.2s ease',
                            '&:hover': { background: 'linear-gradient(to right, #4f46e5, #4338ca)', transform: 'translateY(-1px)', boxShadow: '0 6px 20px rgba(99, 102, 241, 0.4)' } 
                          }}
                        >
                          Search
                        </Button>
                      </div>
                      <div className="col-md-3 ms-md-4">
                        <label className="form-label small fw-bold mb-1">Item Name :</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          placeholder="Enter Item Code.."
                          value={newRow.itemName}
                          onChange={(e) => setNewRow({ ...newRow, itemName: e.target.value })}
                          style={{ height: '38px', borderRadius: '8px' }}
                        />
                      </div>
                      <div className="col-md-2">
                        <label className="form-label small fw-bold mb-1">Rate :</label>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          value={newRow.rate}
                          onChange={(e) => setNewRow({ ...newRow, rate: e.target.value })}
                          style={{ height: '38px', borderRadius: '8px' }}
                        />
                      </div>
                      <div className="col-md-1">
                        <label className="form-label small fw-bold mb-1">Qty :</label>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          value={newRow.qty}
                          onChange={(e) => setNewRow({ ...newRow, qty: e.target.value })}
                          style={{ height: '38px', borderRadius: '8px' }}
                        />
                      </div>
                      <div className="col-auto d-flex align-items-end ms-auto">
                        <Button 
                          variant="contained" 
                          onClick={handleAddRow}
                          startIcon={<FaPlus />} 
                          sx={{ 
                            height: '38px', borderRadius: '8px', textTransform: 'none', fontSize: '0.875rem', fontWeight: 600, 
                            background: 'linear-gradient(to right, #10b981, #059669)', color: 'white',
                            boxShadow: 'none', transition: 'all 0.2s ease',
                            '&:hover': { background: 'linear-gradient(to right, #059669, #047857)', transform: 'translateY(-1px)' } 
                          }}
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                  </Paper>`
);

// 3. Update footer section (if any)
content = content.replace(
    /<div className="footer-section p-2 border rounded bg-white shadow-sm" style=\{\{ fontSize: '11px' \}\}>/g,
    `<Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: '16px', border: '1px solid #e2e8f0', bgcolor: 'white' }}>`
);

// Since we replaced the footer section wrapper, we should replace its closing div.
// The footer-section ends before the confirmation modal or Remark Row.
content = content.replace(
    /<\/div>\s*\{\/\* Confirmation Modal \*\/\}/,
    `</Paper>\n                    {/* Confirmation Modal */}`
);

fs.writeFileSync(targetFile, content);
console.log("Updated DirectBill.jsx successfully.");
