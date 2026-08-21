const fs = require('fs');

const file = 'c:/Users/admin/Desktop/FinalFiles/5-6_ERP/src/Accounts/BillPassing/DirectBill.jsx';
let content = fs.readFileSync(file, 'utf8');

const newFooterSection = `                  {/* Footer Section */}
                  <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: '16px', border: '1px solid #e2e8f0', bgcolor: '#f8fafc' }}>
                    <div className="row g-4">
                      {/* TOC Column */}
                      <div className="col-md-3 border-end pe-3">
                        {[
                          { label: 'Pack. & Fwrd Charges :', key: 'packCharges' },
                          { label: 'Transport Charges :', key: 'transCharges' },
                          { label: 'Insurance :', key: 'insCharges' },
                          { label: 'Installation Charges :', key: 'instCharges' },
                          { label: 'Other Charges :', key: 'otherCharges' }
                        ].map((item, idx) => (
                          <div className="d-flex align-items-center mb-2" key={idx}>
                            <input type="checkbox" className="form-check-input me-2 mt-0" style={{ cursor: 'pointer' }} />
                            <label className="mb-0 flex-grow-1 text-secondary" style={{ fontSize: '0.75rem', fontWeight: 600 }}>{item.label}</label>
                            <input 
                              type="text" 
                              className="form-control form-control-sm text-end" 
                              style={{ width: '90px', height: '28px', borderRadius: '6px' }} 
                              value={footerData[item.key] || ''}
                              onChange={(e) => setFooterData({ ...footerData, [item.key]: e.target.value })}
                            />
                          </div>
                        ))}
                      </div>

                      {/* Dates & Terms Column */}
                      <div className="col-md-3 border-end px-3">
                        <div className="d-flex align-items-center mb-2">
                          <label className="mb-0 text-secondary" style={{ width: '120px', fontSize: '0.75rem', fontWeight: 600 }}>Inv./Challan Date :</label>
                          <input type="date" className="form-control form-control-sm flex-grow-1" value={footerData.invChallanDate} onChange={(e) => setFooterData({ ...footerData, invChallanDate: e.target.value })} style={{ height: '28px', borderRadius: '6px' }} />
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <label className="mb-0 text-secondary" style={{ width: '120px', fontSize: '0.75rem', fontWeight: 600 }}>Payment Term Days :</label>
                          <input type="text" className="form-control form-control-sm flex-grow-1 text-end" value={footerData.paymentTermDays} onChange={(e) => setFooterData({ ...footerData, paymentTermDays: e.target.value })} style={{ height: '28px', borderRadius: '6px' }} />
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <div className="d-flex align-items-center gap-2" style={{ width: '120px' }}>
                            <input type="checkbox" className="form-check-input mt-0" style={{ cursor: 'pointer' }} />
                            <label className="mb-0 text-secondary" style={{ fontSize: '0.75rem', fontWeight: 600 }}>TDS % :</label>
                          </div>
                          <div className="d-flex gap-1 flex-grow-1">
                            <input 
                              type="text" 
                              className="form-control form-control-sm text-end" 
                              style={{ width: '40px', height: '28px', borderRadius: '6px' }} 
                              value={footerData.tdsPer || ''}
                              onChange={(e) => setFooterData({ ...footerData, tdsPer: e.target.value })}
                            />
                            <select className="form-select form-select-sm flex-grow-1" style={{ height: '28px', borderRadius: '6px', fontSize: '0.75rem' }}>
                              <option>Select</option>
                            </select>
                          </div>
                        </div>
                        <div className="d-flex align-items-center mb-2 mt-3">
                          <label className="mb-0 text-dark" style={{ width: '120px', fontSize: '0.8rem', fontWeight: 700 }}>Sub Total :</label>
                          <input type="text" className="form-control form-control-sm flex-grow-1 text-end fw-bold" style={{ height: '28px', borderRadius: '6px', backgroundColor: '#e2e8f0', border: 'none' }} value={totals.basicTotal} readOnly />
                        </div>
                      </div>

                      {/* Invoice & Other Column */}
                      <div className="col-md-3 border-end px-3">
                          <div className="d-flex align-items-center mb-2">
                          <label className="mb-0 text-secondary" style={{ width: '110px', fontSize: '0.75rem', fontWeight: 600 }}>Inv./Challan No :</label>
                          <input type="text" className="form-control form-control-sm flex-grow-1" value={footerData.invChallanNo || ''} onChange={(e) => setFooterData({ ...footerData, invChallanNo: e.target.value })} style={{ height: '28px', borderRadius: '6px' }} />
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <label className="mb-0 text-secondary" style={{ width: '110px', fontSize: '0.75rem', fontWeight: 600 }}>Payment Date :</label>
                          <input type="date" className="form-control form-control-sm flex-grow-1" value={footerData.paymentDate || ''} onChange={(e) => setFooterData({ ...footerData, paymentDate: e.target.value })} style={{ height: '28px', borderRadius: '6px' }} />
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <label className="mb-0 text-secondary" style={{ width: '110px', fontSize: '0.75rem', fontWeight: 600 }}>Other Amount :</label>
                          <input type="text" className="form-control form-control-sm flex-grow-1 text-end" defaultValue="0" style={{ height: '28px', borderRadius: '6px' }} />
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <label className="mb-0 text-secondary" style={{ width: '110px', fontSize: '0.75rem', fontWeight: 600 }}>Assessable Val :</label>
                          <input type="text" className="form-control form-control-sm flex-grow-1 text-end" style={{ height: '28px', borderRadius: '6px' }} />
                        </div>
                      </div>

                      {/* Posting & Total Column */}
                      <div className="col-md-3 ps-3">
                        <div className="d-flex align-items-center mb-2">
                          <label className="mb-0 text-secondary" style={{ width: '110px', fontSize: '0.75rem', fontWeight: 600 }}>Posting Date :</label>
                          <input type="date" className="form-control form-control-sm flex-grow-1" defaultValue="2026-05-09" style={{ height: '28px', borderRadius: '6px' }} />
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <div className="d-flex align-items-center gap-2" style={{ width: '110px' }}>
                            <input type="checkbox" className="form-check-input mt-0" style={{ cursor: 'pointer' }} />
                            <label className="mb-0 text-secondary" style={{ fontSize: '0.75rem', fontWeight: 600 }}>Round Off :</label>
                          </div>
                          <div className="d-flex gap-2 flex-grow-1 align-items-center">
                            <span className="fw-bold text-secondary" style={{ fontSize: '0.75rem' }}>+/-</span>
                            <input type="text" className="form-control form-control-sm flex-grow-1 text-end" style={{ height: '28px', borderRadius: '6px' }} defaultValue="0" />
                          </div>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <div style={{ width: '110px' }}></div>
                          <select className="form-select form-select-sm flex-grow-1" style={{ height: '28px', borderRadius: '6px', fontSize: '0.75rem' }}>
                            <option>Select</option>
                          </select>
                        </div>
                        <div className="d-flex align-items-center mb-3 mt-3 p-2 rounded" style={{ backgroundColor: '#e2e8f0' }}>
                          <label className="mb-0 text-dark" style={{ width: '100px', fontSize: '0.85rem', fontWeight: 800 }}>Net TOTAL :</label>
                          <input type="text" className="form-control form-control-sm flex-grow-1 text-end fw-bold text-primary bg-transparent border-0 fs-6" value={totals.finalAmount} readOnly />
                        </div>
                         <div className="d-flex justify-content-end mt-2">
                          <Button variant="contained" onClick={() => setShowConfirmModal(true)} size="small" sx={{ textTransform: 'none', fontSize: '0.75rem', fontWeight: 600, background: 'linear-gradient(to right, #10b981, #059669)', color: 'white', px: 2, py: 0.5, borderRadius: '6px', boxShadow: '0 4px 10px 0 rgba(16, 185, 129, 0.3)', transition: 'all 0.2s ease', '&:hover': { background: 'linear-gradient(to right, #059669, #047857)', transform: 'translateY(-1px)', boxShadow: '0 6px 15px rgba(16, 185, 129, 0.4)' } }} startIcon={<span style={{ fontWeight: 'bold' }}>✔</span>}>Confirm To Save</Button>
                        </div>
                      </div>
                    </div>
                  </div>`;

// Replace from "                  {/* Footer Section */}" to "                    {/* Confirmation Modal */}"
const startIndex = content.indexOf('                  {/* Footer Section */}');
const endIndex = content.indexOf('                    {/* Confirmation Modal */}');

if (startIndex !== -1 && endIndex !== -1) {
  content = content.substring(0, startIndex) + newFooterSection + '\n' + content.substring(endIndex);
  fs.writeFileSync(file, content);
  console.log("Footer section updated successfully!");
} else {
  console.log("Could not find start or end index.");
}
