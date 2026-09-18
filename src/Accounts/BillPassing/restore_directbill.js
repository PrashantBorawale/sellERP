const fs = require('fs');
const file = 'c:/Users/admin/Desktop/FinalFiles/5-6_ERP/src/Accounts/BillPassing/DirectBill.jsx';
let content = fs.readFileSync(file, 'utf8');

// I need to replace the damaged block with the correct code
const searchBlock = `                          <button 
                            className="btn btn-sm btn-light border d-flex align-items-center gap-2 shadow-sm px-4 py-2" 
                          </div>
                          <div className="custom-modal-body p-3">`;

const replaceBlock = `                          <button 
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
                        <div className="custom-modal-body p-3">`;

content = content.replace(searchBlock, replaceBlock);
fs.writeFileSync(file, content);
console.log("Fixed missing div and restored code.");
