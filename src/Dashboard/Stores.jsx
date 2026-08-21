import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, MenuItem, Select, FormControl } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import RefreshIcon from '@mui/icons-material/Refresh';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import TableIcon from '@mui/icons-material/TableChart';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const Stores = () => {
  const [deptView, setDeptView] = useState('dept');
  const [valueView, setValueView] = useState('qty');

  const [openFav, setOpenFav] = useState(false);
  const [openMinMax, setOpenMinMax] = useState(false);
  const [openInward, setOpenInward] = useState(false);
  const [openOutward, setOpenOutward] = useState(false);
  const [openMatIssue, setOpenMatIssue] = useState(false);
  const [openItemStock, setOpenItemStock] = useState(false);

  const [selectedMonthYear, setSelectedMonthYear] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const m = params.get('month');
    const y = params.get('year');
    if (m && y) {
      const monthNames = [
        'january', 'february', 'march', 'april', 'may', 'june',
        'july', 'august', 'september', 'october', 'november', 'december'
      ];
      const monthNum = parseInt(m);
      if (monthNum >= 1 && monthNum <= 12) {
        return `${monthNames[monthNum - 1]}${y}`;
      }
    }
    return 'april2026';
  });

  const [inwardData, setInwardData] = useState([
    { id: 1, name: 'Purchase GRN', value: 1204, color: '#6366f1' },
    { id: 2, name: 'Return Inward', value: 450, color: '#f59e0b' },
    { id: 3, name: 'Production', value: 890, color: '#10b981' },
    { id: 4, name: 'Transfer In', value: 210, color: '#ef4444' },
    { id: 5, name: 'Opening stock', value: 600, color: '#06b6d4' },
  ]);

  const [monthSelectOpen, setMonthSelectOpen] = useState(false);

  const [outwardSelectedMonthYear, setOutwardSelectedMonthYear] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const m = params.get('month');
    const y = params.get('year');
    if (m && y) {
      const monthNames = [
        'january', 'february', 'march', 'april', 'may', 'june',
        'july', 'august', 'september', 'october', 'november', 'december'
      ];
      const monthNum = parseInt(m);
      if (monthNum >= 1 && monthNum <= 12) {
        return `${monthNames[monthNum - 1]}${y}`;
      }
    }
    return 'april2026';
  });

  const [outwardData, setOutwardData] = useState([
    { id: 1, name: 'Sales', value: 1100, color: '#6366f1' },
    { id: 2, name: 'Issue', value: 750, color: '#f59e0b' },
    { id: 3, name: 'Transfer Out', value: 320, color: '#10b981' },
    { id: 4, name: 'Damage', value: 45, color: '#ef4444' },
    { id: 5, name: 'Return', value: 88, color: '#06b6d4' },
  ]);

  const [outwardMonthSelectOpen, setOutwardMonthSelectOpen] = useState(false);
  const [minMaxLevelsData, setMinMaxLevelsData] = useState([]);

  useEffect(() => {
    const fetchMinMaxLevelsData = async () => {
      try {
        const response = await fetch("https://sellerp-backend.onrender.com/Dashboard/store/min-max/level");
        if (!response.ok) throw new Error("Failed to fetch Min/Max levels data");
        const result = await response.json();
        const data = result?.data || result || [];
        setMinMaxLevelsData(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching Min/Max levels data:", error);
      }
    };
    fetchMinMaxLevelsData();
  }, []);

  useEffect(() => {
    if (monthSelectOpen) {
      const handleScroll = () => {
        setMonthSelectOpen(false);
      };
      window.addEventListener('scroll', handleScroll, true);
      return () => {
        window.removeEventListener('scroll', handleScroll, true);
      };
    }
  }, [monthSelectOpen]);

  useEffect(() => {
    if (outwardMonthSelectOpen) {
      const handleScroll = () => {
        setOutwardMonthSelectOpen(false);
      };
      window.addEventListener('scroll', handleScroll, true);
      return () => {
        window.removeEventListener('scroll', handleScroll, true);
      };
    }
  }, [outwardMonthSelectOpen]);

  // Ensure the page scrolls to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleUrlChange = () => {
      const params = new URLSearchParams(window.location.search);
      const m = params.get('month');
      const y = params.get('year');
      if (m && y) {
        const monthNames = [
          'january', 'february', 'march', 'april', 'may', 'june',
          'july', 'august', 'september', 'october', 'november', 'december'
        ];
        const monthNum = parseInt(m);
        if (monthNum >= 1 && monthNum <= 12) {
          const val = `${monthNames[monthNum - 1]}${y}`;
          setSelectedMonthYear(val);
          setOutwardSelectedMonthYear(val);
        }
      }
    };
    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, []);

  useEffect(() => {
    const fetchInwardData = async () => {
      const monthMapping = {
        january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
        july: 7, august: 8, september: 9, october: 10, november: 11, december: 12
      };
      const match = selectedMonthYear.match(/^([a-z]+)(\d{4})$/i);
      let month = 4;
      let year = 2026;
      if (match) {
        month = monthMapping[match[1].toLowerCase()] || 4;
        year = parseInt(match[2]) || 2026;
      }

      try {
        const response = await fetch(`https://sellerp-backend.onrender.com/Dashboard/store/inward/?month=${month}&year=${year}`);
        if (!response.ok) throw new Error("Failed to fetch inward stock distribution data");
        const result = await response.json();
        
        setInwardData([
          { id: 1, name: 'Purchase GRN', value: result.grn_entries || 0, color: '#6366f1' },
          { id: 2, name: 'Return Inward', value: result.sales_return_entries || 0, color: '#f59e0b' },
          { id: 3, name: 'Production', value: result.inward_challan_entries || 0, color: '#10b981' },
          { id: 4, name: 'Transfer In', value: 0, color: '#ef4444' },
          { id: 5, name: 'Opening stock', value: 0, color: '#06b6d4' },
        ]);
      } catch (error) {
        console.error("Error fetching inward stock distribution data:", error);
      }
    };

    fetchInwardData();
  }, [selectedMonthYear]);

  useEffect(() => {
    const fetchOutwardData = async () => {
      const monthMapping = {
        january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
        july: 7, august: 8, september: 9, october: 10, november: 11, december: 12
      };
      const match = outwardSelectedMonthYear.match(/^([a-z]+)(\d{4})$/i);
      let month = 4;
      let year = 2026;
      if (match) {
        month = monthMapping[match[1].toLowerCase()] || 4;
        year = parseInt(match[2]) || 2026;
      }

      try {
        const response = await fetch(`https://sellerp-backend.onrender.com/Dashboard/store/outward/?month=${month}&year=${year}`);
        if (!response.ok) throw new Error("Failed to fetch outward stock distribution data");
        const result = await response.json();
        
        setOutwardData([
          { id: 1, name: 'Sales', value: result.invoice_entries || 0, color: '#6366f1' },
          { id: 2, name: 'Issue', value: result.material_issue_entries || 0, color: '#f59e0b' },
          { id: 3, name: 'Transfer Out', value: result.onward_challan_entries || 0, color: '#10b981' },
          { id: 4, name: 'Damage', value: 0, color: '#ef4444' },
          { id: 5, name: 'Return', value: 0, color: '#06b6d4' },
        ]);
      } catch (error) {
        console.error("Error fetching outward stock distribution data:", error);
      }
    };

    fetchOutwardData();
  }, [outwardSelectedMonthYear]);

  const handleMonthChange = (e) => {
    const val = e.target.value;
    setSelectedMonthYear(val);
    
    const match = val.match(/^([a-z]+)(\d{4})$/i);
    if (match) {
      const monthNames = [
        'january', 'february', 'march', 'april', 'may', 'june',
        'july', 'august', 'september', 'october', 'november', 'december'
      ];
      const monthIndex = monthNames.indexOf(match[1].toLowerCase());
      if (monthIndex !== -1) {
        const newMonth = monthIndex + 1;
        const newYear = match[2];
        const newUrl = `${window.location.pathname}?month=${newMonth}&year=${newYear}`;
        window.history.pushState({ path: newUrl }, '', newUrl);
      }
    }
  };

  const handleOutwardMonthChange = (e) => {
    const val = e.target.value;
    setOutwardSelectedMonthYear(val);
    
    const match = val.match(/^([a-z]+)(\d{4})$/i);
    if (match) {
      const monthNames = [
        'january', 'february', 'march', 'april', 'may', 'june',
        'july', 'august', 'september', 'october', 'november', 'december'
      ];
      const monthIndex = monthNames.indexOf(match[1].toLowerCase());
      if (monthIndex !== -1) {
        const newMonth = monthIndex + 1;
        const newYear = match[2];
        const newUrl = `${window.location.pathname}?month=${newMonth}&year=${newYear}`;
        window.history.pushState({ path: newUrl }, '', newUrl);
      }
    }
  };

  const favoriteStockData = [
    { id: 1, itemNo: 'IT001', desc: 'MS Pipe', group: 'RM', size: '10MM', unit: 'PCS', stock: 120, shopfloor: 40, f4qty: 10, total: 170 },
    { id: 2, itemNo: 'IT002', desc: 'Nut Bolt', group: 'Hardware', size: 'M12', unit: 'PCS', stock: 450, shopfloor: 100, f4qty: 50, total: 600 },
    { id: 3, itemNo: 'IT003', desc: 'Cutting Oil', group: 'Consumable', size: '5LTR', unit: 'CAN', stock: 32, shopfloor: 8, f4qty: 4, total: 44 },
  ];

  return (
    <Box className="p-8 max-w-[1600px] mx-auto bg-[#f8fafc] min-h-screen">
      {/* Top Info Card */}
      <Box className="bg-white rounded-[20px] border border-[#eef2f6] p-8 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-between mb-8">
        <Box>
          <Typography className="text-[28px] font-black text-[#1e293b] leading-tight mb-1" sx={{ fontWeight: 900 }}>
            Inventory & Stores Management
          </Typography>
          <Typography className="text-[14px] text-[#94a3b8] font-semibold">
            Enterprise module for tracking stock levels, warehouse movements, and inventory valuation.
          </Typography>
        </Box>

        <Box className="flex items-center gap-4">
          <FormControl size="small" className="min-w-[180px]">
            <Select
              value="2026-2027"
              className="bg-[#f8fafc] rounded-[12px]"
              sx={{ 
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e2e8f0' },
                fontSize: '14px',
                height: '44px',
                fontWeight: 800,
                color: '#475569'
              }}
            >
              <MenuItem value="2026-2027">FY 2026-2027</MenuItem>
              <MenuItem value="2025-2026">FY 2025-2026</MenuItem>
            </Select>
          </FormControl>

          <Button 
            variant="contained" 
            startIcon={<FileDownloadIcon sx={{ fontSize: 20 }} />}
            className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-6 h-[44px] rounded-[12px] font-black shadow-lg shadow-blue-500/20 normal-case text-[14px] transition-all"
            disableElevation
          >
            Export Sheet
          </Button>
        </Box>
      </Box>

      {/* Favorite Item Stock Section */}
      <Box className="bg-white rounded-[20px] border border-[#eef2f6] py-4 px-5 shadow-md mb-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
        <Box className={`flex items-center justify-between flex-wrap gap-2 ${openFav ? 'mb-4' : ''}`}>
          <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => setOpenFav(!openFav)}>
            <div className="w-[4px] h-6 bg-[#2563eb] rounded-full" />
            <Typography className="text-[#1e293b] text-[16px] tracking-tight uppercase" sx={{ fontWeight: 900 }}>
              FAVORITE ITEM STOCK
            </Typography>
          </div>
          <Box className="flex items-center gap-3">
            {openFav && (
              <>
                <Button 
                  variant="contained" 
                  size="small"
                  startIcon={<AddIcon sx={{ fontSize: 16 }} />}
                  className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-4 h-[30px] rounded-[6px] font-black normal-case text-[12px] shadow-sm transition-all"
                >
                  Add Favorite
                </Button>
                <Button 
                  variant="outlined" 
                  size="small"
                  startIcon={<RefreshIcon sx={{ fontSize: 16 }} />}
                  className="border-[#e2e8f0] text-[#64748b] hover:bg-gray-50 px-4 h-[30px] rounded-[6px] font-black normal-case text-[12px] transition-all"
                >
                  Refresh
                </Button>
              </>
            )}
            <Button
              size="small"
              variant="outlined"
              onClick={() => setOpenFav(!openFav)}
              sx={{ fontWeight: 900, textTransform: 'none', borderRadius: '6px', minWidth: '60px', height: '30px', fontSize: '12px', borderColor: '#2563eb', color: '#2563eb' }}
            >
              {openFav ? 'Hide' : 'Show'}
            </Button>
          </Box>
        </Box>

        {openFav && (
          <div className="pt-3 border-t border-[#f1f5f9]">
            <div className="border border-[#eef2f6] rounded-[14px] overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#f8fafc] border-b border-[#eef2f6]">
                    {['SR.', 'ITEM NO.', 'ITEM DESC', 'ITEM GROUP', 'SIZE', 'UNIT', 'STOCK', 'SHOPFLOOR', 'F4QTY', 'TOTAL', 'VIEW'].map(h => (
                      <th key={h} className="px-5 py-3 text-[10px] font-black text-[#64748b] uppercase tracking-wider text-center first:text-left last:text-center">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f1f5f9]">
                  {favoriteStockData.map((row) => (
                    <tr key={row.id} className="hover:bg-[#f8fafc] transition-colors group cursor-pointer">
                      <td className="px-5 py-4 text-[12px] font-black text-[#475569]">{row.id}</td>
                      <td className="px-5 py-4 text-[12px] font-black text-[#1e293b] text-center">{row.itemNo}</td>
                      <td className="px-5 py-4 text-[12px] font-black text-[#2563eb] text-center">{row.desc}</td>
                      <td className="px-5 py-4 text-[12px] font-black text-[#1e293b] text-center uppercase">{row.group}</td>
                      <td className="px-5 py-4 text-[12px] font-black text-[#1e293b] text-center">{row.size}</td>
                      <td className="px-5 py-4 text-[12px] font-black text-[#64748b] text-center">{row.unit}</td>
                      <td className="px-5 py-4 text-[12px] font-black text-[#1e293b] text-center">{row.stock}</td>
                      <td className="px-5 py-4 text-[12px] font-black text-[#1e293b] text-center">{row.shopfloor}</td>
                      <td className="px-5 py-4 text-[12px] font-black text-[#1e293b] text-center">{row.f4qty}</td>
                      <td className="px-5 py-4 text-[12px] font-black text-[#1e293b] text-center">{row.total}</td>
                      <td className="px-5 py-4 text-center">
                        <VisibilityIcon sx={{ fontSize: 16, color: '#3b82f6', cursor: 'pointer', '&:hover': { color: '#1d4ed8' } }} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer Note */}
            <div className="mt-4 bg-[#f8fafc] px-4 py-3 border border-[#eef2f6] rounded-xl flex items-center justify-between">
              <Typography className="text-[#1e293b] text-[12px] font-black uppercase tracking-tight">
                Total Records: {favoriteStockData.length}
              </Typography>
            </div>
          </div>
        )}
      </Box>

      {/* MIN/MAX Levels Section */}
      <Box className="bg-white rounded-[20px] border border-[#eef2f6] py-4 px-5 shadow-md mb-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
        <Box className={`flex items-center justify-between flex-wrap gap-2 ${openMinMax ? 'mb-4' : ''}`}>
          <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => setOpenMinMax(!openMinMax)}>
            <div className="w-[4px] h-6 bg-[#2563eb] rounded-full" />
            <Typography className="text-[#1e293b] text-[16px] tracking-tight uppercase" sx={{ fontWeight: 900 }}>
              MIN/MAX LEVELS
            </Typography>
          </div>
          <Box className="flex items-center gap-3">
            {openMinMax && (
              <Typography className="text-[#2563eb] text-[13px] font-black cursor-pointer hover:underline">
                View More
              </Typography>
            )}
            <Button
              size="small"
              variant="outlined"
              onClick={() => setOpenMinMax(!openMinMax)}
              sx={{ fontWeight: 900, textTransform: 'none', borderRadius: '6px', minWidth: '60px', height: '30px', fontSize: '12px', borderColor: '#2563eb', color: '#2563eb' }}
            >
              {openMinMax ? 'Hide' : 'Show'}
            </Button>
          </Box>
        </Box>

        {openMinMax && (
          <div className="pt-3 border-t border-[#f1f5f9]">
            <div className="bg-[#f8fafc] border border-[#eef2f6] rounded-[12px] p-3 mb-6 flex items-center flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <Typography className="text-[12px] font-black text-[#64748b]">Plant:</Typography>
                <Select value="sharp" size="small" sx={{ height: '30px', fontSize: '12px', fontWeight: 900, borderRadius: '6px', minWidth: '90px', bgcolor: 'white' }}>
                  <MenuItem value="sharp">Sharp</MenuItem>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Typography className="text-[12px] font-black text-[#64748b]">Item Class:</Typography>
                <Select value="select" size="small" sx={{ height: '30px', fontSize: '12px', fontWeight: 900, borderRadius: '6px', minWidth: '90px', bgcolor: 'white' }}>
                  <MenuItem value="select">Select</MenuItem>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Typography className="text-[12px] font-black text-[#64748b]">Master Store:</Typography>
                <Select value="all" size="small" sx={{ height: '30px', fontSize: '12px', fontWeight: 900, borderRadius: '6px', minWidth: '80px', bgcolor: 'white' }}>
                  <MenuItem value="all">All</MenuItem>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Typography className="text-[12px] font-black text-[#64748b]">Main Group:</Typography>
                <Select value="all" size="small" sx={{ height: '30px', fontSize: '12px', fontWeight: 900, borderRadius: '6px', minWidth: '80px', bgcolor: 'white' }}>
                  <MenuItem value="all">All</MenuItem>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Typography className="text-[12px] font-black text-[#64748b]">Item Group:</Typography>
                <Select value="all" size="small" sx={{ height: '30px', fontSize: '12px', fontWeight: 900, borderRadius: '6px', minWidth: '80px', bgcolor: 'white' }}>
                  <MenuItem value="all">All</MenuItem>
                </Select>
              </div>
              <Button 
                variant="contained" 
                size="small"
                className="bg-[#1e293b] hover:bg-[#0f172a] text-white h-[30px] px-5 rounded-[6px] font-black normal-case text-[12px] ml-auto shadow-none"
                startIcon={<SearchIcon sx={{ fontSize: 16 }} />}
              >
                Search
              </Button>
            </div>

            <div className="border border-[#eef2f6] rounded-[14px] overflow-hidden">
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse min-w-[1400px]">
                  <thead>
                    <tr className="bg-[#f8fafc] border-b border-[#eef2f6]">
                      {['SR.', 'MAIN GROUP', 'ITEM NO/CODE', 'ITEM DESC.', 'MIN LEVEL', 'RE-ORDER LEVEL', 'MAX LEVEL', 'STOCK', 'WO QTY', 'DIFF.', 'UNIT', 'RATE', 'AMOUNT'].map(h => (
                        <th key={h} className="px-5 py-3 text-[10px] font-black text-[#64748b] uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f1f5f9]">
                    {minMaxLevelsData.map((row, index) => {
                      const itemNoCode = row.item_no ? (row.item_code ? `${row.item_no} / ${row.item_code}` : row.item_no) : (row.item_code || '-');
                      const minVal = row.min_level !== null && row.min_level !== undefined ? row.min_level : 0;
                      const reorderVal = row.re_order_level !== null && row.re_order_level !== undefined ? row.re_order_level : 0;
                      const maxVal = row.max_level !== null && row.max_level !== undefined ? row.max_level : 0;
                      const stockVal = row.stock !== null && row.stock !== undefined ? row.stock : 0;
                      const woVal = row.wo_qty || row.wo || 0;
                      const diffVal = stockVal - minVal;
                      const rateVal = row.rate || 0;
                      const amtVal = row.amount || row.amt || (stockVal * rateVal);
                      
                      return (
                        <tr key={row.id || index} className="hover:bg-[#f8fafc] transition-colors group cursor-pointer">
                          <td className="px-5 py-4 text-[12px] font-black text-[#475569]">{index + 1}</td>
                          <td className="px-5 py-4 text-[12px] font-black text-[#1e293b]">{row.main_groups || row.item_groups || '-'}</td>
                          <td className="px-5 py-4 text-[12px] font-black text-[#1e293b]">{itemNoCode}</td>
                          <td className="px-5 py-4 text-[12px] font-black text-[#1e293b]">{row.description || '-'}</td>
                          <td className="px-5 py-4 text-[12px] font-black text-[#1e293b] text-center">{minVal}</td>
                          <td className="px-5 py-4 text-[12px] font-black text-[#1e293b] text-center">{reorderVal}</td>
                          <td className="px-5 py-4 text-[12px] font-black text-[#1e293b] text-center">{maxVal}</td>
                          <td className="px-5 py-4 text-[12px] font-black text-[#1e293b] text-center">{stockVal}</td>
                          <td className="px-5 py-4 text-[12px] font-black text-[#1e293b] text-center">{woVal}</td>
                          <td className={`px-5 py-4 text-[12px] font-black text-center ${diffVal < 0 ? 'text-[#ef4444]' : 'text-[#1e293b]'}`}>{diffVal}</td>
                          <td className="px-5 py-4 text-[12px] font-black text-[#64748b] text-center">{row.unit || '-'}</td>
                          <td className="px-5 py-4 text-[12px] font-black text-[#1e293b] text-center">₹{rateVal}</td>
                          <td className="px-5 py-4 text-[12px] font-black text-[#1e293b] text-right">₹{amtVal.toLocaleString()}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Footer Legend */}
            <div className="mt-4 flex items-center justify-between bg-[#f8fafc] px-4 py-3 border border-[#eef2f6] rounded-xl flex-wrap gap-2">
              <div className="flex items-center gap-4 flex-wrap">
                <Typography className="text-[12px] font-black text-[#1e293b] uppercase tracking-tight">
                  TOTAL RECORDS: {minMaxLevelsData.length}
                </Typography>
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="px-2.5 py-0.5 bg-[#fee2e2] text-[#991b1b] text-[11px] font-black rounded border border-[#fecaca]">Min Level</div>
                  <div className="px-2.5 py-0.5 bg-[#ffedd5] text-[#9a3412] text-[11px] font-black rounded border border-[#fed7aa]">Min to Re-Order</div>
                  <div className="px-2.5 py-0.5 bg-[#dcfce7] text-[#166534] text-[11px] font-black rounded border border-[#bbf7d0]">Re-Order to Max</div>
                  <div className="px-2.5 py-0.5 bg-[#dbeafe] text-[#1e40af] text-[11px] font-black rounded border border-[#bfdbfe]">Above Max</div>
                </div>
              </div>
              <div className="w-8 h-8 bg-[#00a36c] flex items-center justify-center rounded cursor-pointer hover:bg-[#008f5d] transition-all shadow-sm">
                <TableIcon sx={{ fontSize: 16, color: 'white' }} />
              </div>
            </div>
          </div>
        )}
      </Box>

      {/* Inward Stock Dist Section */}
      <Box className="bg-white rounded-[20px] border border-[#eef2f6] py-4 px-5 shadow-md mb-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
        <Box className={`flex items-center justify-between flex-wrap gap-2 ${openInward ? 'mb-4' : ''}`}>
          <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => setOpenInward(!openInward)}>
            <div className="w-[4px] h-6 bg-[#00a36c] rounded-full" />
            <Typography className="text-[#1e293b] text-[16px] tracking-tight uppercase" sx={{ fontWeight: 900 }}>
              INWARD STOCK DIST.
            </Typography>
          </div>
          <Box className="flex items-center gap-3 flex-wrap">
            {openInward && (
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <Typography className="text-[12px] font-black text-[#64748b] uppercase">Plant:</Typography>
                  <Select value="sharp" size="small" sx={{ height: '30px', fontSize: '12px', fontWeight: 900, borderRadius: '6px', minWidth: '90px', bgcolor: 'white' }}>
                    <MenuItem value="sharp">Sharp</MenuItem>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Typography className="text-[12px] font-black text-[#64748b] uppercase">Month:</Typography>
                  <Select 
                    open={monthSelectOpen}
                    onOpen={() => setMonthSelectOpen(true)}
                    onClose={() => setMonthSelectOpen(false)}
                    value={selectedMonthYear} 
                    onChange={handleMonthChange} 
                    size="small" 
                    sx={{ height: '30px', fontSize: '12px', fontWeight: 900, borderRadius: '6px', minWidth: '120px', bgcolor: 'white' }}
                    MenuProps={{ disableScrollLock: true }}
                  >
                    <MenuItem value="april2026">April 2026</MenuItem>
                    <MenuItem value="may2026">May 2026</MenuItem>
                    <MenuItem value="june2026">June 2026</MenuItem>
                    <MenuItem value="july2026">July 2026</MenuItem>
                    <MenuItem value="august2026">August 2026</MenuItem>
                    <MenuItem value="september2026">September 2026</MenuItem>
                    <MenuItem value="october2026">October 2026</MenuItem>
                    <MenuItem value="november2026">November 2026</MenuItem>
                    <MenuItem value="december2026">December 2026</MenuItem>
                    <MenuItem value="january2027">January 2027</MenuItem>
                    <MenuItem value="february2027">February 2027</MenuItem>
                    <MenuItem value="march2027">March 2027</MenuItem>
                  </Select>
                </div>
              </div>
            )}
            <Button
              size="small"
              variant="outlined"
              onClick={() => setOpenInward(!openInward)}
              sx={{ fontWeight: 900, textTransform: 'none', borderRadius: '6px', minWidth: '60px', height: '30px', fontSize: '12px', borderColor: '#00a36c', color: '#00a36c' }}
            >
              {openInward ? 'Hide' : 'Show'}
            </Button>
          </Box>
        </Box>

        {openInward && (
          <div className="pt-3 border-t border-[#f1f5f9]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-[#eef2f6] rounded-[20px] overflow-hidden">
              {/* Left Side: Donut Chart */}
              <Box className="p-8 flex flex-col items-center justify-center bg-white relative overflow-hidden border-r border-[#eef2f6]">
                <div className="w-full h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={inwardData.filter(item => item.value > 0)}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                        stroke="none"
                        label={({ cx, cy, midAngle, innerRadius, outerRadius, value, color }) => {
                          if (!value) return null;
                          const RADIAN = Math.PI / 180;
                          const radius = outerRadius + 30;
                          const x = cx + radius * Math.cos(-midAngle * RADIAN);
                          const y = cy + radius * Math.sin(-midAngle * RADIAN);
                          return (
                            <text x={x} y={y} fill={color} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className="text-[14px] font-black">
                              {value}
                            </text>
                          );
                        }}
                      >
                        {inwardData.filter(item => item.value > 0).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Box>

              {/* Right Side: Table */}
              <Box className="bg-[#fcfcfc] p-0">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#f8fafc] border-b border-[#eef2f6]">
                      <th className="px-6 py-4 text-[11px] font-black text-[#64748b] uppercase tracking-wider w-[80px]">SR.</th>
                      <th className="px-6 py-4 text-[11px] font-black text-[#64748b] uppercase tracking-wider">INWARD TYPE</th>
                      <th className="px-6 py-4 text-[11px] font-black text-[#64748b] uppercase tracking-wider text-right">TOTAL</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f1f5f9]">
                    {inwardData.map((row) => (
                      <tr key={row.id} className="hover:bg-white transition-colors group cursor-pointer">
                        <td className="px-6 py-4 text-[13px] font-black text-[#475569]">{row.id}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: row.color }} />
                            <Typography className="text-[14px] font-black text-[#1e293b] group-hover:text-[#2563eb] transition-colors">{row.name}</Typography>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-[14px] font-black text-[#1e293b] text-right">{row.value.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>
            </div>
          </div>
        )}
      </Box>

      {/* Outward Stock Dist Section */}
      <Box className="bg-white rounded-[20px] border border-[#eef2f6] py-4 px-5 shadow-md mb-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
        <Box className={`flex items-center justify-between flex-wrap gap-2 ${openOutward ? 'mb-4' : ''}`}>
          <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => setOpenOutward(!openOutward)}>
            <div className="w-[4px] h-6 bg-[#ef4444] rounded-full" />
            <Typography className="text-[#1e293b] text-[16px] tracking-tight uppercase" sx={{ fontWeight: 900 }}>
              OUTWARD STOCK DIST.
            </Typography>
          </div>
          <Box className="flex items-center gap-3 flex-wrap">
            {openOutward && (
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <Typography className="text-[12px] font-black text-[#64748b] uppercase">Plant:</Typography>
                  <Select value="sharp" size="small" sx={{ height: '30px', fontSize: '12px', fontWeight: 900, borderRadius: '6px', minWidth: '90px', bgcolor: 'white' }}>
                    <MenuItem value="sharp">Sharp</MenuItem>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Typography className="text-[12px] font-black text-[#64748b] uppercase">Month:</Typography>
                  <Select 
                    open={outwardMonthSelectOpen}
                    onOpen={() => setOutwardMonthSelectOpen(true)}
                    onClose={() => setOutwardMonthSelectOpen(false)}
                    value={outwardSelectedMonthYear} 
                    onChange={handleOutwardMonthChange} 
                    size="small" 
                    sx={{ height: '30px', fontSize: '12px', fontWeight: 900, borderRadius: '6px', minWidth: '120px', bgcolor: 'white' }}
                    MenuProps={{ disableScrollLock: true }}
                  >
                    <MenuItem value="april2026">April 2026</MenuItem>
                    <MenuItem value="may2026">May 2026</MenuItem>
                    <MenuItem value="june2026">June 2026</MenuItem>
                    <MenuItem value="july2026">July 2026</MenuItem>
                    <MenuItem value="august2026">August 2026</MenuItem>
                    <MenuItem value="september2026">September 2026</MenuItem>
                    <MenuItem value="october2026">October 2026</MenuItem>
                    <MenuItem value="november2026">November 2026</MenuItem>
                    <MenuItem value="december2026">December 2026</MenuItem>
                    <MenuItem value="january2027">January 2027</MenuItem>
                    <MenuItem value="february2027">February 2027</MenuItem>
                    <MenuItem value="march2027">March 2027</MenuItem>
                  </Select>
                </div>
              </div>
            )}
            <Button
              size="small"
              variant="outlined"
              onClick={() => setOpenOutward(!openOutward)}
              sx={{ fontWeight: 900, textTransform: 'none', borderRadius: '6px', minWidth: '60px', height: '30px', fontSize: '12px', borderColor: '#ef4444', color: '#ef4444' }}
            >
              {openOutward ? 'Hide' : 'Show'}
            </Button>
          </Box>
        </Box>

        {openOutward && (
          <div className="pt-3 border-t border-[#f1f5f9]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-[#eef2f6] rounded-[20px] overflow-hidden">
              {/* Left Side: Donut Chart */}
              <Box className="p-8 flex flex-col items-center justify-center bg-white relative overflow-hidden border-r border-[#eef2f6]">
                <div className="w-full h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={outwardData.filter(item => item.value > 0)}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                        stroke="none"
                        label={({ cx, cy, midAngle, innerRadius, outerRadius, value, color }) => {
                          if (!value) return null;
                          const RADIAN = Math.PI / 180;
                          const radius = outerRadius + 30;
                          const x = cx + radius * Math.cos(-midAngle * RADIAN);
                          const y = cy + radius * Math.sin(-midAngle * RADIAN);
                          return (
                            <text x={x} y={y} fill={color} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className="text-[14px] font-black">
                              {value}
                            </text>
                          );
                        }}
                      >
                        {outwardData.filter(item => item.value > 0).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Box>

              {/* Right Side: Table */}
              <Box className="bg-[#fcfcfc] p-0">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#f8fafc] border-b border-[#eef2f6]">
                      <th className="px-6 py-4 text-[11px] font-black text-[#64748b] uppercase tracking-wider w-[80px]">SR.</th>
                      <th className="px-6 py-4 text-[11px] font-black text-[#64748b] uppercase tracking-wider">OUTWARD TYPE</th>
                      <th className="px-6 py-4 text-[11px] font-black text-[#64748b] uppercase tracking-wider text-right">TOTAL</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f1f5f9]">
                    {outwardData.map((row) => (
                      <tr key={row.id} className="hover:bg-white transition-colors group cursor-pointer">
                        <td className="px-6 py-4 text-[13px] font-black text-[#475569]">{row.id}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: row.color }} />
                            <Typography className="text-[14px] font-black text-[#1e293b] group-hover:text-[#2563eb] transition-colors">{row.name}</Typography>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-[14px] font-black text-[#1e293b] text-right">{row.value.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>
            </div>
          </div>
        )}
      </Box>

      {/* Material Issue Challan Section */}
      <Box className="bg-white rounded-[20px] border border-[#eef2f6] py-4 px-5 shadow-md mb-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
        <Box className={`flex items-center justify-between flex-wrap gap-2 ${openMatIssue ? 'mb-4' : ''}`}>
          <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => setOpenMatIssue(!openMatIssue)}>
            <div className="w-[4px] h-6 bg-[#2563eb] rounded-full" />
            <Typography className="text-[#1e293b] text-[16px] tracking-tight uppercase" sx={{ fontWeight: 900 }}>
              MATERIAL ISSUE CHALLAN
            </Typography>
          </div>
          <Button
            size="small"
            variant="outlined"
            onClick={() => setOpenMatIssue(!openMatIssue)}
            sx={{ fontWeight: 900, textTransform: 'none', borderRadius: '6px', minWidth: '60px', height: '30px', fontSize: '12px', borderColor: '#2563eb', color: '#2563eb' }}
          >
            {openMatIssue ? 'Hide' : 'Show'}
          </Button>
        </Box>

        {openMatIssue && (
          <div className="pt-3 border-t border-[#f1f5f9]">
            {/* Filter Bar */}
            <div className="bg-[#f8fafc] border border-[#eef2f6] rounded-[12px] p-3 mb-5 flex items-center flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Typography className="text-[12px] font-black text-[#64748b]">Plant:</Typography>
                <Select value="sharp" size="small" sx={{ height: '30px', fontSize: '12px', fontWeight: 900, borderRadius: '6px', minWidth: '90px', bgcolor: 'white' }}>
                  <MenuItem value="sharp">Sharp</MenuItem>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Typography className="text-[12px] font-black text-[#64748b]">Item SubGroup:</Typography>
                <Select value="all" size="small" sx={{ height: '30px', fontSize: '12px', fontWeight: 900, borderRadius: '6px', minWidth: '90px', bgcolor: 'white' }}>
                  <MenuItem value="all">All</MenuItem>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Typography className="text-[12px] font-black text-[#64748b]">From</Typography>
                <input type="date" defaultValue="2026-04-01" className="h-[30px] border border-[#e2e8f0] rounded-[6px] px-2 text-[12px] font-black text-[#1e293b] focus:outline-none focus:border-[#2563eb]" />
                <Typography className="text-[12px] font-black text-[#64748b]">To</Typography>
                <input type="date" defaultValue="2026-04-30" className="h-[30px] border border-[#e2e8f0] rounded-[6px] px-2 text-[12px] font-black text-[#1e293b] focus:outline-none focus:border-[#2563eb]" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" className="w-3.5 h-3.5 rounded border-[#e2e8f0]" />
                <Typography className="text-[12px] font-black text-[#64748b]">Items:</Typography>
                <input type="text" placeholder="Search Item..." className="w-[150px] h-[30px] border border-[#e2e8f0] rounded-[6px] px-2 text-[12px] font-medium text-[#1e293b] focus:outline-none focus:border-[#2563eb]" />
              </div>
              <Button 
                variant="contained" 
                className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-4 h-[30px] rounded-[6px] font-black normal-case text-[12px] shadow-sm"
                startIcon={<SearchIcon sx={{ fontSize: 16 }} />}
              >
                Search
              </Button>
              <div className="w-8 h-8 bg-[#00a36c] flex items-center justify-center rounded cursor-pointer hover:bg-[#008f5d] transition-all shadow-sm ml-auto">
                <TableIcon sx={{ fontSize: 16, color: 'white' }} />
              </div>
            </div>

            {/* Table */}
            <div className="border border-[#eef2f6] rounded-[12px] overflow-hidden mb-5">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#f8fafc] border-b border-[#eef2f6]">
                    {['SR.NO.', 'ITEM NO.', 'DESC.', 'MAIN GROUP', 'ITEM GROUP', 'QTY', 'UNIT', 'RATE', 'VALUE'].map(h => (
                      <th key={h} className="px-4 py-3 text-[11px] font-black text-[#64748b] uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f1f5f9]">
                  {[
                    { id: 1, no: 'IT001', desc: 'Issue log - Line 1', main: 'RM', group: 'Metals', qty: 471, unit: 'PCS', rate: 120, value: 5000 },
                    { id: 2, no: 'IT002', desc: 'Issue log - Line 2', main: 'RM', group: 'Metals', qty: 379, unit: 'PCS', rate: 120, value: 5000 },
                    { id: 3, no: 'IT003', desc: 'Issue log - Line 3', main: 'RM', group: 'Metals', qty: 315, unit: 'PCS', rate: 120, value: 5000 },
                    { id: 4, no: 'IT004', desc: 'Issue log - Line 1', main: 'RM', group: 'Metals', qty: 497, unit: 'PCS', rate: 120, value: 5000 },
                    { id: 5, no: 'IT005', desc: 'Issue log - Line 2', main: 'RM', group: 'Metals', qty: 342, unit: 'PCS', rate: 120, value: 5000 },
                  ].map((row) => (
                    <tr key={row.id} className="hover:bg-[#f8fafc] transition-colors group cursor-pointer">
                      <td className="px-4 py-3 text-[13px] font-black text-[#475569]">{row.id}</td>
                      <td className="px-4 py-3 text-[13px] font-black text-[#1e293b]">{row.no}</td>
                      <td className="px-4 py-3 text-[13px] font-black text-[#6366f1]">{row.desc}</td>
                      <td className="px-4 py-3 text-[13px] font-black text-[#1e293b] uppercase">{row.main}</td>
                      <td className="px-4 py-3 text-[13px] font-black text-[#1e293b]">{row.group}</td>
                      <td className="px-4 py-3 text-[13px] font-black text-[#1e293b] text-right">{row.qty}</td>
                      <td className="px-4 py-3 text-[13px] font-black text-[#1e293b] text-center">{row.unit}</td>
                      <td className="px-4 py-3 text-[13px] font-black text-[#1e293b] text-right">₹{row.rate}</td>
                      <td className="px-4 py-3 text-[13px] font-black text-[#1e293b] text-right">₹{row.value.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer Controls */}
            <div className="bg-[#f8fafc] border border-[#eef2f6] rounded-[12px] p-4 space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setDeptView('dept')}>
                    <input type="radio" name="deptView" checked={deptView === 'dept'} onChange={() => {}} className="w-3.5 h-3.5 text-[#2563eb]" />
                    <Typography className={`text-[12px] font-black ${deptView === 'dept' ? 'text-[#1e293b]' : 'text-[#64748b]'}`}>Dept. Wise</Typography>
                  </div>
                  <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setDeptView('category')}>
                    <input type="radio" name="deptView" checked={deptView === 'category'} onChange={() => {}} className="w-3.5 h-3.5 text-[#2563eb]" />
                    <Typography className={`text-[12px] font-black ${deptView === 'category' ? 'text-[#1e293b]' : 'text-[#64748b]'}`}>Dept. Category Wise</Typography>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="bg-white px-4 py-1.5 border border-[#eef2f6] rounded-[8px] shadow-sm">
                    <Typography className="text-[12px] font-black text-[#1e293b]">
                      <span className="text-[#64748b] mr-1.5">Total Records:</span> 10
                    </Typography>
                  </div>
                  <div className="bg-white px-4 py-1.5 border border-[#eef2f6] rounded-[8px] shadow-sm">
                    <Typography className="text-[12px] font-black text-[#1e293b]">
                      <span className="text-[#64748b] mr-1.5">Total Qty:</span> 3,402
                    </Typography>
                  </div>
                  <div className="bg-white px-4 py-1.5 border border-[#eef2f6] rounded-[8px] shadow-sm">
                    <Typography className="text-[12px] font-black text-[#1e293b]">
                      <span className="text-[#64748b] mr-1.5">Total Value:</span> ₹120,500
                    </Typography>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#e2e8f0] flex-wrap gap-3">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setValueView('qty')}>
                    <input type="radio" name="valueView" checked={valueView === 'qty'} onChange={() => {}} className="w-3.5 h-3.5 text-[#2563eb]" />
                    <Typography className={`text-[12px] font-black ${valueView === 'qty' ? 'text-[#1e293b]' : 'text-[#64748b]'}`}>Quantity</Typography>
                  </div>
                  <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setValueView('value')}>
                    <input type="radio" name="valueView" checked={valueView === 'value'} onChange={() => {}} className="w-3.5 h-3.5 text-[#2563eb]" />
                    <Typography className={`text-[12px] font-black ${valueView === 'value' ? 'text-[#1e293b]' : 'text-[#64748b]'}`}>Value</Typography>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Typography className="text-[11px] font-black text-[#64748b] italic">
                    *Item rate from last GRM/Item master
                  </Typography>
                  <div className="w-8 h-8 bg-[#00a36c] flex items-center justify-center rounded cursor-pointer hover:bg-[#008f5d] transition-all shadow-sm">
                    <TableIcon sx={{ fontSize: 16, color: 'white' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Box>

      {/* Item Wise Stock Report Section */}
      <Box className="bg-white rounded-[20px] border border-[#eef2f6] py-4 px-5 shadow-md mb-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
        <Box className={`flex items-center justify-between flex-wrap gap-2 ${openItemStock ? 'mb-4' : ''}`}>
          <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => setOpenItemStock(!openItemStock)}>
            <div className="w-[4px] h-6 bg-[#2563eb] rounded-full" />
            <Typography className="text-[#1e293b] text-[16px] tracking-tight uppercase" sx={{ fontWeight: 900 }}>
              ITEM WISE STOCK REPORT
            </Typography>
          </div>
          <Button
            size="small"
            variant="outlined"
            onClick={() => setOpenItemStock(!openItemStock)}
            sx={{ fontWeight: 900, textTransform: 'none', borderRadius: '6px', minWidth: '60px', height: '30px', fontSize: '12px', borderColor: '#2563eb', color: '#2563eb' }}
          >
            {openItemStock ? 'Hide' : 'Show'}
          </Button>
        </Box>

        {openItemStock && (
          <div className="pt-3 border-t border-[#f1f5f9]">
            {/* Filter Controls Row 1 */}
            <div className="flex items-center flex-wrap gap-4 mb-4 bg-[#f8fafc] p-3 rounded-[12px] border border-[#eef2f6]">
              <div className="flex items-center gap-2">
                <Typography className="text-[12px] font-black text-[#64748b]">Plant:</Typography>
                <Select value="sharp" size="small" sx={{ height: '30px', fontSize: '12px', fontWeight: 900, borderRadius: '6px', minWidth: '100px', bgcolor: 'white' }}>
                  <MenuItem value="sharp">Sharp</MenuItem>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Typography className="text-[12px] font-black text-[#64748b]">Store:</Typography>
                <Select value="minstore" size="small" sx={{ height: '30px', fontSize: '12px', fontWeight: 900, borderRadius: '6px', minWidth: '100px', bgcolor: 'white' }}>
                  <MenuItem value="minstore">MinStore</MenuItem>
                </Select>
              </div>
              <div className="flex items-center bg-white border border-[#e2e8f0] rounded-[6px] h-[30px] px-2.5 w-[240px]">
                <input type="text" placeholder="Search Item..." className="flex-1 bg-transparent border-none outline-none text-[12px] font-medium text-[#1e293b]" />
                <SearchIcon sx={{ fontSize: 16, color: '#2563eb', cursor: 'pointer' }} />
              </div>
              <Button 
                variant="outlined" 
                size="small"
                sx={{ height: '30px', borderRadius: '6px', fontWeight: 900, textTransform: 'none', fontSize: '12px', borderColor: '#e2e8f0', color: '#64748b' }}
              >
                Clear
              </Button>
              <Typography className="text-[#2563eb] text-[12px] font-black cursor-pointer hover:underline ml-1">-View Schedules</Typography>
            </div>

            {/* Filter Controls Row 2: Category Tabs */}
            <div className="flex items-center gap-2 mb-5 flex-wrap">
              <Button 
                variant="contained"
                size="small"
                sx={{ 
                  bgcolor: '#1e293b', 
                  color: 'white', 
                  px: 3, 
                  height: '32px', 
                  borderRadius: '6px', 
                  fontWeight: 900, 
                  fontSize: '12px', 
                  textTransform: 'none', 
                  boxShadow: 'none',
                  '&:hover': { bgcolor: '#0f172a', boxShadow: 'none' }
                }}
              >
                FG/FSG/WIP Stock
              </Button>
              <Button 
                variant="outlined"
                size="small"
                sx={{ 
                  bgcolor: '#f8fafc', 
                  color: '#1e293b', 
                  borderColor: '#e2e8f0', 
                  px: 3, 
                  height: '32px', 
                  borderRadius: '6px', 
                  fontWeight: 900, 
                  fontSize: '12px', 
                  textTransform: 'none', 
                  boxShadow: 'none',
                  '&:hover': { bgcolor: '#f1f5f9', borderColor: '#cbd5e1' }
                }}
              >
                RM Stock
              </Button>
              <Button 
                variant="outlined"
                size="small"
                sx={{ 
                  bgcolor: '#f8fafc', 
                  color: '#1e293b', 
                  borderColor: '#e2e8f0', 
                  px: 3, 
                  height: '32px', 
                  borderRadius: '6px', 
                  fontWeight: 900, 
                  fontSize: '12px', 
                  textTransform: 'none', 
                  boxShadow: 'none',
                  '&:hover': { bgcolor: '#f1f5f9', borderColor: '#cbd5e1' }
                }}
              >
                Consumable Stock
              </Button>
            </div>

            {/* Stock Report Table */}
            <div className="border border-[#eef2f6] rounded-[12px] overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#f8fafc] border-b border-[#eef2f6]">
                    {['SR.', 'ITEM NO', 'ITEM DESCRIPTION', 'ITEM SIZE', 'GROUP NAME', 'UNITS', 'REJECT QTY', 'SHOP FLOOR', 'STOCKS'].map(h => (
                      <th key={h} className="px-4 py-3 text-[11px] font-black text-[#64748b] uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f1f5f9]">
                  {[
                    { id: 1, no: 'FG001', desc: 'Finished Product A', size: 'Large', group: 'FG', unit: 'PCS', rej: 4, floor: 22, stock: 180 },
                    { id: 2, no: 'RM010', desc: 'Steel Rod', size: '10MM', group: 'RM', unit: 'KG', rej: 1, floor: 10, stock: 520 },
                  ].map((row) => (
                    <tr key={row.id} className="hover:bg-[#f8fafc] transition-colors group cursor-pointer">
                      <td className="px-4 py-3 text-[13px] font-black text-[#1e293b]">{row.id}</td>
                      <td className="px-4 py-3 text-[13px] font-black text-[#1e293b]">{row.no}</td>
                      <td className="px-4 py-3 text-[13px] font-black text-[#1e293b]">{row.desc}</td>
                      <td className="px-4 py-3 text-[13px] font-black text-[#1e293b]">{row.size}</td>
                      <td className="px-4 py-3 text-[13px] font-black text-[#1e293b]">{row.group}</td>
                      <td className="px-4 py-3 text-[13px] font-black text-[#1e293b]">{row.unit}</td>
                      <td className="px-4 py-3 text-[13px] font-black text-[#1e293b] text-center">{row.rej}</td>
                      <td className="px-4 py-3 text-[13px] font-black text-[#1e293b] text-center">{row.floor}</td>
                      <td className="px-4 py-3 text-[13px] font-black text-[#1e293b] text-right font-black">{row.stock}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </Box>
    </Box>
  );
};

export default Stores;
