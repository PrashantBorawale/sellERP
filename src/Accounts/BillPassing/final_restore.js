const fs = require('fs');

const file = 'c:/Users/admin/Desktop/FinalFiles/5-6_ERP/src/Accounts/BillPassing/DirectBill.jsx';
let content = fs.readFileSync(file, 'utf8');

// The original content string from line 754 onwards
const replacement = `                      {/* Posting & Total Column */}
                      <div className="col-md-3 ps-2">
                        <div className="d-flex align-items-center mb-1">
                          <label className="mb-0" style={{ width: '100px' }}>Posting Date :</label>
                          <input type="date" className="form-control form-control-sm py-0" defaultValue="2026-05-09" style={{ width: '110px', height: '20px', fontSize: '10px' }} />
                        </div>
                        <div className="d-flex align-items-center mb-1">
                          <div className="d-flex align-items-center" style={{ width: '100px' }}>
                            <label className="mb-0">Round Off Amt:</label>
                            <input type="checkbox" className="form-check-input mt-0 ms-1" style={{ width: '12px', height: '12px' }} />
                          </div>
                          <div className="d-flex align-items-center">
                            <span className="fw-bold me-1" style={{ fontSize: '10px' }}>+ / -</span>
                            <input type="text" className="form-control form-control-sm py-0" style={{ width: '90px', height: '20px', fontSize: '10px' }} defaultValue="0" />
                          </div>
                        </div>
                        <div className="d-flex align-items-center mb-1">
                          <div style={{ width: '100px' }}></div>
                          <select className="form-select form-select-sm py-0" style={{ width: '110px', height: '20px', fontSize: '10px' }}>
                            <option>Select</option>
                          </select>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <label className="mb-0" style={{ width: '100px' }}>Net TOTAL :</label>
                          <input type="text" className="form-control form-control-sm py-0 fw-bold" style={{ width: '110px', height: '20px', fontSize: '10px' }} value={totals.finalAmount} readOnly />
                        </div>
                         <div className="d-flex justify-content-end mt-2">
                          <button 
                            className="btn btn-sm btn-light border d-flex align-items-center gap-2 shadow-sm px-4 py-2" 
                            style={{ fontSize: '12px', fontWeight: 'bold' }}
                            onClick={() => setShowConfirmModal(true)}
                          >
                            <span className="text-success fw-bold">✔</span> Confirm To Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </Paper>

                    {/* Confirmation Modal */}
                    {showConfirmModal && (
                      <div className="custom-modal-overlay">
                        <div className="custom-modal-content">
                          <div className="custom-modal-header d-flex justify-content-between align-items-center">
                            <span>Message</span>
                            <button className="btn-close" onClick={() => setShowConfirmModal(false)}></button>
                          </div>
                          <div className="custom-modal-body p-3">
                            <div className="row mb-3 border-bottom pb-2">
                              <div className="col-md-5">
                                <div className="d-flex mb-1">
                                  <span className="fw-bold me-2" style={{ width: '100px' }}>Supp Name :</span>
                                  <span>{newRow.supplierName}</span>
                                </div>
                                <div className="d-flex">
                                  <span className="fw-bold me-2" style={{ width: '100px' }}>Bill No :</span>
                                  <span>{footerData.invChallanNo || "262700105"}</span>
                                </div>
                              </div>
                              <div className="col-md-7 text-end">
                                <div className="d-flex justify-content-end">
                                  <span className="fw-bold me-2">Bill Date :</span>
                                  <span>{new Date().toLocaleDateString('en-GB')}</span>
                                </div>
                              </div>
                            </div>

                            <Paper elevation={0} sx={{ borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', mb: 4 }}>
  <TableContainer sx={{ maxHeight: 500, '&::-webkit-scrollbar': { height: 8, width: 8 }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#cbd5e1', borderRadius: 4 } }}>
    <Table stickyHeader size="small">
                                <TableHead>
                                  <TableRow>
                                    <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.65rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 16px', textAlign: 'center' }}>No.</TableCell>
                                    <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.65rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 16px', textAlign: 'center' }}>ItemCode</TableCell>
                                    <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.65rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 16px', textAlign: 'center' }}>ItemDesc</TableCell>
                                    <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.65rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 16px', textAlign: 'center' }}>HSN Code</TableCell>
                                    <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.65rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 16px', textAlign: 'center' }}>Total</TableCell>
                                    <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.65rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 16px', textAlign: 'center' }}>CGSTAmt</TableCell>
                                    <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.65rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 16px', textAlign: 'center' }}>SGSTAmt</TableCell>
                                    <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.65rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 16px', textAlign: 'center' }}>IGSTAmt</TableCell>
                                    <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.65rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 16px', textAlign: 'center' }}>GLName</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {rows.map((row, idx) => (
                                    <TableRow key={idx}>
                                      <TableCell sx={{ color: '#475569', fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center', borderRight: '1px solid #f1f5f9' }}>{idx + 1}</TableCell>
                                      <TableCell sx={{ color: '#475569', fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center', borderRight: '1px solid #f1f5f9' }}>{row.itemCode}</TableCell>
                                      <TableCell sx={{ color: '#475569', fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center', borderRight: '1px solid #f1f5f9' }}>{row.itemCode}</TableCell>
                                      <TableCell sx={{ color: '#475569', fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center', borderRight: '1px solid #f1f5f9' }}>{row.hsnCode}</TableCell>
                                      <TableCell sx={{ color: '#475569', fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center', borderRight: '1px solid #f1f5f9' }}>{row.total.toFixed(2)}</TableCell>
                                      <TableCell sx={{ color: '#475569', fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center', borderRight: '1px solid #f1f5f9' }}>{(row.total * (row.cgst / 100)).toFixed(2)}</TableCell>
                                      <TableCell sx={{ color: '#475569', fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center', borderRight: '1px solid #f1f5f9' }}>{(row.total * (row.sgst / 100)).toFixed(2)}</TableCell>
                                      <TableCell sx={{ color: '#475569', fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center', borderRight: '1px solid #f1f5f9' }}>{(row.total * (row.igst / 100)).toFixed(2)}</TableCell>
                                      <TableCell sx={{ color: '#475569', fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center', borderRight: '1px solid #f1f5f9' }}>{row.glId || "Purchase Rm"}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
  </TableContainer>
</Paper>

                            <div className="modal-summary-footer p-2 border rounded">
                              <div className="row g-2 text-center" style={{ fontSize: '11px' }}>
                                <div className="col"><div className="fw-bold border-bottom mb-1">Basic Tot :</div>{totals.basicTotal}</div>
                                <div className="col"><div className="fw-bold border-bottom mb-1">CGST Amt :</div>{totals.cgstTotal}</div>
                                <div className="col"><div className="fw-bold border-bottom mb-1">SGST Amt :</div>{totals.sgstTotal}</div>
                                <div className="col"><div className="fw-bold border-bottom mb-1">IGST Amt :</div>{totals.igstTotal}</div>
                                <div className="col"><div className="fw-bold border-bottom mb-1">Bill Amt :</div>{totals.finalAmount}</div>
                                <div className="col"><div className="fw-bold border-bottom mb-1">TDS :</div>0</div>
                                <div className="col"><div className="fw-bold border-bottom mb-1">Other :</div>0</div>
                                <div className="col bg-primary text-white py-1 rounded">
                                  <div className="fw-bold mb-1">Final Total :</div>
                                  <div className="h6 mb-0">{totals.finalAmount}</div>
                                </div>
                                <div className="col-auto d-flex align-items-center gap-2">
                                  <button className="btn btn-sm btn-light border fw-bold" onClick={handleSaveBill}>Save BILL</button>
                                  <button className="btn btn-sm btn-light border fw-bold" onClick={() => setShowConfirmModal(false)}>Cancel</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Remark Row */}
                    <div className="row g-0 align-items-center mt-1 pt-2 border-top">
                      <div className="col-auto me-2">
                        <label className="fw-bold" style={{ fontSize: '11px' }}>Remark :</label>
                      </div>
                       <div className="col-md-6">
                        <textarea className="form-control form-control-sm" rows="2" style={{ resize: 'none', height: '40px', fontSize: '11px' }} placeholder="Enter any additional remarks..." value={footerData.remark} onChange={(e) => setFooterData({ ...footerData, remark: e.target.value })}></textarea>
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
  );
};

export default DirectBill;
`;

const startIndex = content.indexOf('{/* Posting & Total Column */}');
if (startIndex !== -1) {
    content = content.substring(0, startIndex) + replacement;
    fs.writeFileSync(file, content);
    console.log("Restored the file successfully!");
} else {
    console.log("Could not find the start string");
}
