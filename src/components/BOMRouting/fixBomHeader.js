const fs = require('fs');

const path = 'C:/Users/admin/Desktop/FinalFiles/5-6_ERP/src/components/BOMRouting/BomRouting.js';
let content = fs.readFileSync(path, 'utf8');

// 1. Fix Layout containers
content = content.replace('<div className="container-fluid">', '<div className="container-fluid p-0">');
content = content.replace('<div className="row">', '<div className="row m-0">');
content = content.replace('<div className="col-md-12">', '<div className="col-md-12 p-0">');

// 2. Fix inner container
content = content.replace('<div className="CommodityMaster1">', '<div className="CommodityMaster1 container-fluid p-0 py-4">');

// 3. Fix the Header
const headerRegex = /<div className="BomRouting">[\s\S]*?<div className="BomRouting-Main">/;

const newHeader = `
                  {/* Header Section */}
                  <div className="d-flex justify-content-between align-items-center mb-4 mt-2 px-3 flex-wrap">
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        fontWeight: 800, 
                        background: 'linear-gradient(to right, #6366f1, #4f46e5)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        letterSpacing: '-0.5px',
                        mb: { xs: 2, md: 0 }
                      }}
                    >
                      BOM And Routing List
                    </Typography>
                    
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end' }}>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mr: 2 }}>
                        <span className="badge" style={{ backgroundColor: '#f1f5f9', color: '#475569', border: '1px solid #cbd5e1', padding: '6px 12px', fontSize: '13px' }}>Total BOM:</span>
                        <span className="badge" style={{ backgroundColor: '#f1f5f9', color: '#475569', border: '1px solid #cbd5e1', padding: '6px 12px', fontSize: '13px' }}>FG:548</span>
                        <span className="badge" style={{ backgroundColor: '#f1f5f9', color: '#475569', border: '1px solid #cbd5e1', padding: '6px 12px', fontSize: '13px' }}>SFG:1</span>
                        <span className="badge" style={{ backgroundColor: '#f1f5f9', color: '#475569', border: '1px solid #cbd5e1', padding: '6px 12px', fontSize: '13px' }}>RM:44</span>
                        <span className="badge" style={{ backgroundColor: '#f1f5f9', color: '#475569', border: '1px solid #cbd5e1', padding: '6px 12px', fontSize: '13px' }}>NPD:0</span>
                        <span className="badge" style={{ backgroundColor: '#f1f5f9', color: '#475569', border: '1px solid #cbd5e1', padding: '6px 12px', fontSize: '13px' }}>Total:593</span>
                        <span className="badge" style={{ backgroundColor: '#fef2f2', color: '#ef4444', border: '1px solid #fca5a5', padding: '6px 12px', fontSize: '13px' }}>Un-Auth:2</span>
                        <span className="badge" style={{ backgroundColor: '#f0fdf4', color: '#16a34a', border: '1px solid #86efac', padding: '6px 12px', fontSize: '13px' }}>Auth:591</span>
                      </Box>

                      <div style={{ position: 'relative', display: 'inline-block' }}>
                        <Button onClick={toggleDropdown} variant="contained" sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 600, background: 'linear-gradient(to right, #6366f1, #4f46e5)', color: 'white', boxShadow: '0 4px 14px 0 rgba(99, 102, 241, 0.39)', '&:hover': { background: 'linear-gradient(to right, #4f46e5, #4338ca)', transform: 'translateY(-1px)', boxShadow: '0 6px 20px rgba(99, 102, 241, 0.4)' } }}>BOM:Report ▼</Button>

                        {dropdownOpen && (
                          <ul
                            className="dropdown-menu show"
                            style={{
                              position: 'absolute',
                              top: '100%',
                              left: 0,
                              zIndex: 1000,
                              display: 'block',
                              minWidth: '14rem',
                              padding: '0.5rem 0',
                              margin: '0.125rem 0 0',
                              fontSize: '13px',
                              color: '#212529',
                              textAlign: 'left',
                              listStyle: 'none',
                              backgroundColor: '#fff',
                              backgroundClip: 'padding-box',
                              borderRadius: '8px',
                              boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                            }}
                          >
                            <li><Link className="dropdown-item py-2 px-3" to={"/UploadWIPvalue"} style={{ fontWeight: 500 }}>Upload WIP Value</Link></li>
                            <li><Link className="dropdown-item py-2 px-3" to={"/UploadOperationSpeci"} style={{ fontWeight: 500 }}>Upload Operation Specification</Link></li>
                            <li><Link className="dropdown-item py-2 px-3" to={"/ManualBOMWorking"} style={{ fontWeight: 500 }}>Manual BOM Working Sheet</Link></li>
                            <li><Link className="dropdown-item py-2 px-3" to={"/BOMItemTrace"} style={{ fontWeight: 500 }}>BOM Item Traceability</Link></li>
                            <li><Link className="dropdown-item py-2 px-3" to={"/"} style={{ fontWeight: 500 }}>BOM Value Report</Link></li>
                            <li><Link className="dropdown-item py-2 px-3" to={"/"} style={{ fontWeight: 500 }}>BOM Tree View</Link></li>
                          </ul>
                        )}
                      </div>

                      <Button component={Link} to="/bill-material" variant="contained" sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 600, background: 'linear-gradient(to right, #6366f1, #4f46e5)', color: 'white', boxShadow: '0 4px 14px 0 rgba(99, 102, 241, 0.39)', '&:hover': { background: 'linear-gradient(to right, #4f46e5, #4338ca)', transform: 'translateY(-1px)', boxShadow: '0 6px 20px rgba(99, 102, 241, 0.4)' } }}>New / Modify BOM</Button>
                      <Button component={Link} to="/BOMQuery" variant="contained" sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 600, background: 'linear-gradient(to right, #6366f1, #4f46e5)', color: 'white', boxShadow: '0 4px 14px 0 rgba(99, 102, 241, 0.39)', '&:hover': { background: 'linear-gradient(to right, #4f46e5, #4338ca)', transform: 'translateY(-1px)', boxShadow: '0 6px 20px rgba(99, 102, 241, 0.4)' } }}>BOM:Query</Button>
                    </Box>
                  </div>

                  <div className="BomRouting-Main px-3">
`;

content = content.replace(headerRegex, newHeader);

// 4. Update the Table container slightly to use px-3 to match
content = content.replace('<div className="BomRoutingTable mt-4">', '<div className="BomRoutingTable mt-4 px-3">');

fs.writeFileSync(path, content, 'utf8');
console.log('Fixed BOM Routing Header layout');
