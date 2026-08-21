import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Button, MenuItem, Select, FormControl, Grid, Radio, FormControlLabel } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import TableChartIcon from '@mui/icons-material/TableChart';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, RadialBarChart, RadialBar, LineChart
} from 'recharts';
import SearchIcon from '@mui/icons-material/Search';
import GridOnIcon from '@mui/icons-material/GridOn';

const rejectionTrendData = [
  { date: 1, percentage: 0.57, ppm: 4200 },
  { date: 2, percentage: 0.44, ppm: 6500 },
  { date: 3, percentage: 0.65, ppm: 4400 },
  { date: 4, percentage: 0.42, ppm: 3900 },
  { date: 5, percentage: 0.17, ppm: 2900 },
  { date: 6, percentage: 0.16, ppm: 5500 },
  { date: 7, percentage: 0.36, ppm: 3700 },
  { date: 8, percentage: 0.21, ppm: 6200 },
  { date: 9, percentage: 0.15, ppm: 6300 },
  { date: 10, percentage: 0.45, ppm: 5100 },
  { date: 11, percentage: 0.41, ppm: 4600 },
  { date: 12, percentage: 0.08, ppm: 1200 },
  { date: 13, percentage: 0.20, ppm: 4800 },
  { date: 14, percentage: 0.11, ppm: 5100 },
  { date: 15, percentage: 0.60, ppm: 3000 },
  { date: 16, percentage: 0.54, ppm: 4100 },
  { date: 17, percentage: 0.17, ppm: 2400 },
  { date: 18, percentage: 0.59, ppm: 4500 },
  { date: 19, percentage: 0.47, ppm: 6000 },
  { date: 20, percentage: 0.19, ppm: 1500 },
  { date: 21, percentage: 0.45, ppm: 1800 },
  { date: 22, percentage: 0.69, ppm: 3500 },
  { date: 23, percentage: 0.62, ppm: 1400 },
  { date: 24, percentage: 0.47, ppm: 5500 },
  { date: 25, percentage: 0.23, ppm: 2300 },
  { date: 26, percentage: 0.31, ppm: 5600 },
  { date: 27, percentage: 0.57, ppm: 2400 },
  { date: 28, percentage: 0.06, ppm: 4000 },
  { date: 29, percentage: 0.51, ppm: 1600 },
  { date: 30, percentage: 0.56, ppm: 3700 },
  { date: 31, percentage: 0.70, ppm: 3600 },
];

const CustomPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name, qty, data, payload }) => {
  const RADIAN = Math.PI / 180;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  const strokeColor = (data && data[index] && data[index].color) || (payload && (payload.color || payload.fill)) || "#8884d8";
  const displayQty = qty !== undefined ? qty : (payload && payload.qty !== undefined ? payload.qty : payload?.value || 0);

  return (
    <g>
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={strokeColor} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={strokeColor} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333" style={{ fontSize: '10px', fontWeight: 700 }}>
        {`${(percent * 100).toFixed(2)}% (Qty : ${displayQty}) - ${name}`}
      </text>
    </g>
  );
};

const Quality = () => {
  const [fy, setFy] = useState('2026-2027');
  const [plant, setPlant] = useState('Sharp');
  const [month, setMonth] = useState('04-2026');
  const [monthSelectOpen, setMonthSelectOpen] = useState(false);
  const [openTrendRej, setOpenTrendRej] = useState(false);
  const [openItemReject, setOpenItemReject] = useState(false);
  const [openItemRework, setOpenItemRework] = useState(false);
  const [openScrapReport, setOpenScrapReport] = useState(false);
  const [openSalesReturn, setOpenSalesReturn] = useState(false);
  const [openCapa, setOpenCapa] = useState(false);
  const [rejectionTrend, setRejectionTrend] = useState(rejectionTrendData);
  const [scrapMonth, setScrapMonth] = useState('06-2026');
  const [scrapMonthSelectOpen, setScrapMonthSelectOpen] = useState(false);
  const [scrapData, setScrapData] = useState(null);
  const [salesReturnYear, setSalesReturnYear] = useState('2025-2026');
  const [salesReturnYearSelectOpen, setSalesReturnYearSelectOpen] = useState(false);
  const [salesReturnMetric, setSalesReturnMetric] = useState('Item Qty');
  const [salesReturnData, setSalesReturnData] = useState([
    { month: 'April-2026', cust: 15, items: 42, qty: 520, value: '₹4,12,300', raw_value: 412300 },
    { month: 'May-2026', cust: 12, items: 38, qty: 440, value: '₹3,45,200', raw_value: 345200 },
    { month: 'June-2026', cust: 18, items: 55, qty: 525, value: '₹5,10,000', raw_value: 510000 },
    { month: 'July-2026', cust: 14, items: 47, qty: 275, value: '₹2,62,993', raw_value: 262993 },
    { month: 'August-2026', cust: 18, items: 31, qty: 495, value: '₹4,10,330', raw_value: 410330 },
    { month: 'September-2026', cust: 20, items: 55, qty: 811, value: '₹8,34,401', raw_value: 834401 },
    { month: 'October-2026', cust: 20, items: 57, qty: 707, value: '₹7,74,266', raw_value: 774266 },
    { month: 'November-2026', cust: 11, items: 36, qty: 286, value: '₹2,47,223', raw_value: 247223 },
    { month: 'December-2026', cust: 22, items: 25, qty: 380, value: '₹3,75,667', raw_value: 375667 },
    { month: 'January-2027', cust: 20, items: 32, qty: 446, value: '₹4,16,949', raw_value: 416949 },
    { month: 'February-2027', cust: 15, items: 17, qty: 657, value: '₹6,43,723', raw_value: 643723 },
    { month: 'March-2027', cust: 9, items: 42, qty: 703, value: '₹7,17,806', raw_value: 717806 },
  ]);
  const [reworkData, setReworkData] = useState([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const [rejectData, setRejectData] = useState([]);
  const [rejectFromDate, setRejectFromDate] = useState('');
  const [rejectToDate, setRejectToDate] = useState('');

  const fromRef = useRef(null);
  const toRef = useRef(null);
  const rejectFromRef = useRef(null);
  const rejectToRef = useRef(null);

  const handleOpenFromPicker = () => {
    if (fromRef.current) {
      fromRef.current.showPicker();
    }
  };

  const handleOpenToPicker = () => {
    if (toRef.current) {
      toRef.current.showPicker();
    }
  };

  const handleOpenRejectFromPicker = () => {
    if (rejectFromRef.current) {
      rejectFromRef.current.showPicker();
    }
  };

  const handleOpenRejectToPicker = () => {
    if (rejectToRef.current) {
      rejectToRef.current.showPicker();
    }
  };

  const formatDateDisplay = (dateStr) => {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return dateStr;
  };

  const fetchReworkData = async (from, to) => {
    try {
      const response = await fetch(`https://sellerp-backend.onrender.com/Dashboard/Quality/rework_qty/?from_date=${from}&to_date=${to}`);
      if (!response.ok) throw new Error("Failed to fetch rework data");
      const result = await response.json();
      setReworkData(Array.isArray(result) ? result : (result?.data || []));
    } catch (error) {
      console.error("Error fetching rework data:", error);
    }
  };

  const fetchRejectData = async (from, to) => {
    try {
      const response = await fetch(`https://sellerp-backend.onrender.com/Dashboard/Quality/reject_qty/?from_date=${from}&to_date=${to}`);
      if (!response.ok) throw new Error("Failed to fetch reject data");
      const result = await response.json();
      setRejectData(Array.isArray(result) ? result : (result?.data || []));
    } catch (error) {
      console.error("Error fetching reject data:", error);
    }
  };

  useEffect(() => {
    // Dates are not pre-selected. Data will be fetched when the user manually enters dates and clicks Search.
  }, []);

  useEffect(() => {
    const fetchRejectionTrend = async () => {
      try {
        const [mVal, yVal] = month.split('-');
        const response = await fetch(`https://sellerp-backend.onrender.com/Dashboard/Quality/trend_rejection/?month=${mVal}&year=${yVal}`);
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            const mapped = data.map(item => {
              const day = parseInt(item.date.split('-')[2], 10);
              return {
                date: day,
                percentage: item.reject_qty,
                ppm: item.reject_qty
              };
            });
            setRejectionTrend(mapped);
          }
        }
      } catch (error) {
        console.error("Error fetching rejection trend data:", error);
      }
    };

    fetchRejectionTrend();
  }, [month]);

  useEffect(() => {
    const handleScroll = () => {
      setMonthSelectOpen(false);
    };
    if (monthSelectOpen) {
      window.addEventListener('scroll', handleScroll, { capture: true, passive: true });
    }
    return () => {
      window.removeEventListener('scroll', handleScroll, { capture: true });
    };
  }, [monthSelectOpen]);

  useEffect(() => {
    const fetchScrapData = async () => {
      try {
        const [mVal, yVal] = scrapMonth.split('-');
        const response = await fetch(`https://sellerp-backend.onrender.com/Dashboard/Quality/scrap/qty/?month=${mVal}&year=${yVal}`);
        if (response.ok) {
          const data = await response.json();
          setScrapData(data);
        }
      } catch (error) {
        console.error("Error fetching scrap quantity data:", error);
      }
    };
    fetchScrapData();
  }, [scrapMonth]);

  useEffect(() => {
    const handleScroll = () => {
      setScrapMonthSelectOpen(false);
    };
    if (scrapMonthSelectOpen) {
      window.addEventListener('scroll', handleScroll, { capture: true, passive: true });
    }
    return () => {
      window.removeEventListener('scroll', handleScroll, { capture: true });
    };
  }, [scrapMonthSelectOpen]);

  useEffect(() => {
    const fetchSalesReturnData = async () => {
      try {
        const response = await fetch(`https://sellerp-backend.onrender.com/Dashboard/Quality/sales-return/?financial_year=${salesReturnYear}`);
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            const [startYear, endYear] = salesReturnYear.split('-');
            const mapped = data.map(item => {
              const isQ4 = ['January', 'February', 'March'].includes(item.month);
              const yearStr = isQ4 ? endYear : startYear;
              return {
                month: `${item.month}-${yearStr}`,
                cust: item.customer_count,
                items: item.item_count,
                qty: item.return_qty,
                raw_value: item.grand_total,
                value: `₹${item.grand_total.toLocaleString()}`
              };
            });
            setSalesReturnData(mapped);
          }
        }
      } catch (error) {
        console.error("Error fetching sales return customer data:", error);
      }
    };
    fetchSalesReturnData();
  }, [salesReturnYear]);

  useEffect(() => {
    const handleScroll = () => {
      setSalesReturnYearSelectOpen(false);
    };
    if (salesReturnYearSelectOpen) {
      window.addEventListener('scroll', handleScroll, { capture: true, passive: true });
    }
    return () => {
      window.removeEventListener('scroll', handleScroll, { capture: true });
    };
  }, [salesReturnYearSelectOpen]);

  const handleSearch = () => {
    if (!fromDate || !toDate) {
      alert("Please select both From and To dates");
      return;
    }
    fetchReworkData(fromDate, toDate);
  };

  const handleRejectSearch = () => {
    if (!rejectFromDate || !rejectToDate) {
      alert("Please select both From and To dates");
      return;
    }
    fetchRejectData(rejectFromDate, rejectToDate);
  };

  return (
    <Box className="p-8 max-w-[1600px] mx-auto bg-[#f8fafc] min-h-screen">
      {/* Top Header Section (OEE Style) */}
      <Box className="bg-white rounded-[20px] border border-[#eef2f6] p-8 shadow-md flex items-center justify-between mb-8 transition-all hover:shadow-lg hover:-translate-y-0.5 duration-300">
        <Box>
          <Typography className="text-[28px] font-black text-[#1e293b] leading-tight mb-1" sx={{ fontWeight: 900 }}>
            Quality Control & Assurance
          </Typography>
          <Typography className="text-[14px] text-[#94a3b8] font-semibold">
            Enterprise module for tracking inspections, rejection rates, and supplier quality ratings.
          </Typography>
        </Box>

        <Box className="flex items-center gap-4">
          <FormControl size="small" className="min-w-[150px]">
            <Select
              value={fy}
              onChange={(e) => setFy(e.target.value)}
              className="bg-[#f8fafc] rounded-[10px]"
              sx={{
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e2e8f0' },
                fontSize: '13px',
                height: '44px',
                fontWeight: 900,
                color: '#475569'
              }}
            >
              <MenuItem value="2026-2027">FY 2026-2027</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            startIcon={<FileDownloadIcon sx={{ fontSize: 20 }} />}
            className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-6 h-[44px] rounded-[10px] font-black shadow-lg shadow-blue-500/20 normal-case text-[14px] transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            Export Sheet
          </Button>
        </Box>
      </Box>

      {/* TREND OF REJECTION SECTION */}
      <Box className="bg-white rounded-[20px] border border-[#eef2f6] py-4 px-5 shadow-md mb-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
        <Box className={`flex items-center justify-between flex-wrap gap-2 ${openTrendRej ? 'mb-4' : ''}`}>
          <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => setOpenTrendRej(!openTrendRej)}>
            <div className="w-[4px] h-6 bg-[#2563eb] rounded-full" />
            <Typography className="text-[#1e293b] text-[16px] tracking-tight uppercase" sx={{ fontWeight: 900 }}>
              TREND OF REJECTION % AT OPERATION LEVEL
            </Typography>
          </div>

          <Box className="flex items-center gap-2">
            <Button
              size="small"
              variant="outlined"
              onClick={() => setOpenTrendRej(!openTrendRej)}
              sx={{ fontWeight: 900, textTransform: 'none', borderRadius: '6px', minWidth: '60px', height: '30px', fontSize: '12px', borderColor: '#2563eb', color: '#2563eb' }}
            >
              {openTrendRej ? 'Hide' : 'Show'}
            </Button>
          </Box>
        </Box>

        {openTrendRej && (<div className="pt-3 border-t border-[#f1f5f9]">
          {/* Filters & Links */}
          <Box className="flex items-center justify-between bg-[#f8fafc] p-3 rounded-xl border border-[#eef2f6] mb-6 flex-wrap gap-4">
            <Box className="flex items-center gap-6 flex-wrap">
              <Box className="flex items-center gap-2">
                <Typography className="text-[12px] font-black text-[#64748b]">Plant:</Typography>
                <Select value={plant} onChange={(e) => setPlant(e.target.value)} size="small" sx={{ height: '32px', fontSize: '12px', fontWeight: 900, borderRadius: '8px', minWidth: '90px', bgcolor: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e2e8f0' } }}>
                  <MenuItem value="Sharp">Sharp</MenuItem>
                </Select>
              </Box>

              <Box className="flex items-center gap-2">
                <Typography className="text-[12px] font-black text-[#64748b]">Month:</Typography>
                <Select 
                  value={month} 
                  onChange={(e) => setMonth(e.target.value)} 
                  open={monthSelectOpen}
                  onOpen={() => setMonthSelectOpen(true)}
                  onClose={() => setMonthSelectOpen(false)}
                  size="small" 
                  sx={{ height: '32px', fontSize: '12px', fontWeight: 900, borderRadius: '8px', minWidth: '130px', bgcolor: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e2e8f0' } }}
                  MenuProps={{ disableScrollLock: true }}
                >
                  <MenuItem value="04-2026">April 2026</MenuItem>
                  <MenuItem value="05-2026">May 2026</MenuItem>
                  <MenuItem value="06-2026">June 2026</MenuItem>
                  <MenuItem value="07-2026">July 2026</MenuItem>
                  <MenuItem value="08-2026">August 2026</MenuItem>
                  <MenuItem value="09-2026">September 2026</MenuItem>
                  <MenuItem value="10-2026">October 2026</MenuItem>
                  <MenuItem value="11-2026">November 2026</MenuItem>
                  <MenuItem value="12-2026">December 2026</MenuItem>
                  <MenuItem value="01-2027">January 2027</MenuItem>
                  <MenuItem value="02-2027">February 2027</MenuItem>
                  <MenuItem value="03-2027">March 2027</MenuItem>
                </Select>
              </Box>

              <Box className="w-[32px] h-[32px] bg-[#00a36c] flex items-center justify-center rounded-[8px] cursor-pointer hover:bg-[#008f5d] transition-all shadow-sm">
                <TableChartIcon sx={{ fontSize: 16, color: 'white' }} />
              </Box>

              <FormControlLabel
                control={<Radio checked={true} size="small" sx={{ color: '#2563eb', '&.Mui-checked': { color: '#2563eb' } }} />}
                label={<Typography className="text-[12px] font-black text-[#1e293b]">Production</Typography>}
              />
            </Box>

            <Box className="flex items-center gap-2">
              <Typography className="text-[#2563eb] text-[12px] font-bold cursor-pointer hover:underline">Itemwise Rejection View</Typography>
              <Typography className="text-[#cbd5e1] text-[12px]">|</Typography>
              <Typography className="text-[#2563eb] text-[12px] font-bold cursor-pointer hover:underline">Operatorwise Rejection View</Typography>
              <Typography className="text-[#cbd5e1] text-[12px]">|</Typography>
              <Typography className="text-[#64748b] text-[12px] font-bold cursor-pointer hover:underline">More..</Typography>
            </Box>
          </Box>

          <Box className="h-[340px] w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={rejectionTrend} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 11, fontWeight: 900 }}
                  label={{ value: 'Date', position: 'bottom', offset: 0, style: { fontSize: '11px', fontWeight: 900, fill: '#64748b' } }}
                />
                <YAxis
                  yAxisId="left"
                  axisLine={false}
                  tickLine={false}
                  domain={[0, (dataMax) => Math.max(Math.ceil(dataMax * 1.25), 5)]}
                  tick={{ fill: '#1e293b', fontSize: 11, fontWeight: 900 }}
                  label={{ value: 'Percentage', angle: -90, position: 'insideLeft', offset: 0, style: { fontSize: '11px', fontWeight: 900, fill: '#64748b' } }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  axisLine={false}
                  tickLine={false}
                  domain={[0, (dataMax) => Math.max(Math.ceil(dataMax * 1.25), 5)]}
                  tick={{ fill: '#1e293b', fontSize: 11, fontWeight: 900 }}
                  label={{ value: 'PPM', angle: 90, position: 'insideRight', offset: 0, style: { fontSize: '11px', fontWeight: 900, fill: '#64748b' } }}
                />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar
                  yAxisId="left"
                  dataKey="percentage"
                  fill="#6366f1"
                  barSize={20}
                  radius={[4, 4, 0, 0]}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="ppm"
                  stroke="#f59e0b"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#fff', stroke: '#f59e0b', strokeWidth: 2 }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </Box>
        </div>)}
      </Box>

      {/* ITEMWISE REJECT SECTION */}
      <Box className="bg-white rounded-[20px] border border-[#eef2f6] py-4 px-5 shadow-md mb-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
        <Box className={`flex items-center justify-between flex-wrap gap-2 ${openItemReject ? 'mb-4' : ''}`}>
          <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => setOpenItemReject(!openItemReject)}>
            <div className="w-[4px] h-6 bg-[#ef4444] rounded-full" />
            <Typography className="text-[#1e293b] text-[16px] tracking-tight uppercase" sx={{ fontWeight: 900 }}>
              ITEMWISE REJECT
            </Typography>
          </div>

          <Box className="flex items-center gap-4 flex-wrap">
            <Typography className="text-[#2563eb] text-[11px] font-black italic hidden sm:block">
              *Rejection QTY as per Prod. entry and inprocess QC
            </Typography>
            <Box className="flex items-center gap-3 border-l border-[#e2e8f0] pl-3">
              <Typography className="text-[#2563eb] text-[11px] font-black cursor-pointer hover:underline">View More...</Typography>
              <Typography className="text-[#e2e8f0] text-[14px]">|</Typography>
              <Typography className="text-[#2563eb] text-[11px] font-black cursor-pointer hover:underline">Pareto Chart</Typography>
            </Box>
            <Button
              size="small"
              variant="outlined"
              onClick={() => setOpenItemReject(!openItemReject)}
              sx={{ fontWeight: 900, textTransform: 'none', borderRadius: '6px', minWidth: '60px', height: '30px', fontSize: '12px', borderColor: '#2563eb', color: '#2563eb' }}
            >
              {openItemReject ? 'Hide' : 'Show'}
            </Button>
          </Box>
        </Box>

        {openItemReject && (<div className="pt-3 border-t border-[#f1f5f9]">
          {/* Filter Bar */}
          <Box 
            className="items-center gap-2 mb-6 bg-[#f8fafc] p-3 rounded-xl border border-[#eef2f6] flex flex-wrap"
            style={{ display: 'flex' }}
          >
            <FormControlLabel
              control={<Radio checked={true} size="small" sx={{ color: '#2563eb', '&.Mui-checked': { color: '#2563eb' } }} />}
              label={<Typography className="text-[12px] font-black text-[#1e293b]">Production</Typography>}
              sx={{ mr: 0.5 }}
            />
            
            <Box className="flex items-center gap-1">
              <Typography className="text-[12px] font-black text-[#64748b]">Plant:</Typography>
              <Select value={plant} onChange={(e) => setPlant(e.target.value)} size="small" sx={{ height: '32px', fontSize: '12px', fontWeight: 900, borderRadius: '8px', minWidth: '80px', bgcolor: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e2e8f0' } }}>
                <MenuItem value="Sharp">SHARP</MenuItem>
              </Select>
            </Box>

            <Box 
              className="items-center bg-white border border-[#e2e8f0] rounded-[6px] px-1.5 h-[28px] gap-1 flex flex-wrap"
            >
              <Typography className="text-[10px] font-black text-[#64748b]">From</Typography>
              <Box onClick={handleOpenRejectFromPicker} className="flex items-center cursor-pointer gap-1">
                <Typography className="text-[10px] font-black text-[#1e293b]">
                  {rejectFromDate ? formatDateDisplay(rejectFromDate) : 'DD-MM-YYYY'}
                </Typography>
                <CalendarTodayIcon sx={{ fontSize: 11, color: '#64748b', cursor: 'pointer' }} />
                <input 
                  ref={rejectFromRef}
                  type="date" 
                  value={rejectFromDate} 
                  onChange={(e) => setRejectFromDate(e.target.value)} 
                  style={{ opacity: 0, width: 0, height: 0, position: 'absolute', pointerEvents: 'none' }} 
                />
              </Box>
              <Typography className="text-[10px] font-black text-[#64748b] ml-1">To</Typography>
              <Box onClick={handleOpenRejectToPicker} className="flex items-center cursor-pointer gap-1">
                <Typography className="text-[10px] font-black text-[#1e293b]">
                  {rejectToDate ? formatDateDisplay(rejectToDate) : 'DD-MM-YYYY'}
                </Typography>
                <CalendarTodayIcon sx={{ fontSize: 11, color: '#64748b', cursor: 'pointer' }} />
                <input 
                  ref={rejectToRef}
                  type="date" 
                  value={rejectToDate} 
                  onChange={(e) => setRejectToDate(e.target.value)} 
                  style={{ opacity: 0, width: 0, height: 0, position: 'absolute', pointerEvents: 'none' }} 
                />
              </Box>
            </Box>

            <Box className="flex items-center gap-1">
              <Typography className="text-[12px] font-black text-[#64748b]">Reason:</Typography>
              <Select value="All" size="small" sx={{ height: '32px', fontSize: '12px', fontWeight: 900, borderRadius: '8px', minWidth: '80px', bgcolor: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e2e8f0' } }}>
                <MenuItem value="All">All</MenuItem>
              </Select>
            </Box>

            <Button onClick={handleRejectSearch} variant="contained" size="small" sx={{ height: '32px', bgcolor: '#2563eb', borderRadius: '8px', fontWeight: 900, textTransform: 'none', px: 2.5 }}>
              Search
            </Button>

            <Button variant="contained" startIcon={<TableChartIcon sx={{ fontSize: 16 }} />} sx={{ height: '32px', bgcolor: '#00a36c', borderRadius: '8px', fontWeight: 900, fontSize: '11px', textTransform: 'none', '&:hover': { bgcolor: '#008f5d' } }}>
              Item-wise
            </Button>
            <Button variant="contained" startIcon={<TableChartIcon sx={{ fontSize: 16 }} />} sx={{ height: '32px', bgcolor: '#00a36c', borderRadius: '8px', fontWeight: 900, fontSize: '11px', textTransform: 'none', '&:hover': { bgcolor: '#008f5d' } }}>
              Reason-wise
            </Button>
          </Box>

          {/* Side by Side Chart and Tables Container */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Radial Chart Analysis */}
            <Box className="lg:col-span-5 bg-white border border-[#eef2f6] rounded-[20px] p-5 flex flex-col shadow-sm w-full">
              <Box className="flex-1 flex items-center justify-center relative min-h-[300px]">
                <ResponsiveContainer width="100%" height={300}>
                  <RadialBarChart 
                    innerRadius="30%" 
                    outerRadius="100%" 
                    barSize={12}
                    data={[
                      { name: 'INCORRECT COATING', value: 85, fill: '#10b981' },
                      { name: 'MATERIAL WARPAGE', value: 75, fill: '#3b82f6' },
                      { name: 'SURFACE SCRATCH', value: 45, fill: '#f59e0b' },
                      { name: 'DIMENSIONAL ERROR', value: 35, fill: '#ef4444' },
                      { name: 'CRACKING', value: 25, fill: '#ec4899' },
                      { name: 'CASTING VOID', value: 15, fill: '#8b5cf6' },
                    ]} 
                    startAngle={90} 
                    endAngle={450}
                  >
                    <RadialBar 
                      background={{ fill: '#f1f5f9' }} 
                      dataKey="value" 
                      cornerRadius={10}
                    />
                    <Legend 
                      iconSize={0} 
                      layout="vertical" 
                      verticalAlign="middle" 
                      align="right"
                      content={({ payload }) => (
                        <ul style={{ listStyle: 'none', margin: 0, padding: 0, paddingLeft: '20px' }}>
                          {payload.map((entry, index) => (
                            <li key={`item-${index}`} style={{ 
                              fontSize: '9px', 
                              fontWeight: 900, 
                              color: entry.color, 
                              textTransform: 'uppercase',
                              marginBottom: '4px',
                              textAlign: 'left'
                            }}>
                              {entry.value}
                            </li>
                          ))}
                        </ul>
                      )}
                    />
                  </RadialBarChart>
                </ResponsiveContainer>
              </Box>

              <Box className="mt-4 pt-4 border-t border-[#f1f5f9]">
                <Box className="flex items-center justify-between mb-4">
                  <Box className="flex items-center gap-2">
                    <Typography className="text-[11px] font-black text-[#64748b] uppercase">View Top:</Typography>
                    <Box className="px-3 py-1 bg-[#f8fafc] border border-[#e2e8f0] rounded-md text-[11px] font-black text-[#1e293b]">5</Box>
                  </Box>
                  <Box className="flex items-center gap-3">
                    <FormControlLabel
                      control={<Radio checked={true} size="small" sx={{ p: 0.5 }} />}
                      label={<Typography className="text-[11px] font-black text-[#1e293b]">QTY</Typography>}
                      sx={{ m: 0 }}
                    />
                    <FormControlLabel
                      control={<Radio checked={false} size="small" sx={{ p: 0.5 }} />}
                      label={<Typography className="text-[11px] font-black text-[#64748b]">%</Typography>}
                      sx={{ m: 0 }}
                    />
                  </Box>
                </Box>
                <Box className="w-full bg-red-50 border border-red-100 py-2.5 rounded-lg flex items-center justify-center">
                  <Typography className="text-red-600 text-[11px] font-black uppercase tracking-wider">
                    High Rejection Categories Analysis
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Right: Itemwise Data Table & Reason Table */}
            <div className="lg:col-span-7 flex flex-col gap-6 w-full">
              {/* Itemwise Data Table */}
              <Box className="overflow-hidden rounded-xl border border-[#f1f5f9] bg-white shadow-sm">
                <Box className="max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200">
                  <table className="w-full text-left border-collapse">
                    <thead className="sticky top-0 z-10 bg-[#f8fafc]">
                      <tr className="border-b border-[#f1f5f9]">
                        <th className="px-3 py-3 text-[10px] font-black text-[#64748b] uppercase tracking-wider">SR.</th>
                        <th className="px-3 py-3 text-[10px] font-black text-[#64748b] uppercase tracking-wider">ITEM NO</th>
                        <th className="px-3 py-3 text-[10px] font-black text-[#64748b] uppercase tracking-wider">CODE</th>
                        <th className="px-3 py-3 text-[10px] font-black text-[#64748b] uppercase tracking-wider">PART NO</th>
                        <th className="px-3 py-3 text-[10px] font-black text-[#64748b] uppercase tracking-wider">DESC.</th>
                        <th className="px-3 py-3 text-[10px] font-black text-[#64748b] uppercase tracking-wider">OP.</th>
                        <th className="px-3 py-3 text-[10px] font-black text-[#64748b] uppercase tracking-wider text-right">PROD</th>
                        <th className="px-3 py-3 text-[10px] font-black text-[#64748b] uppercase tracking-wider text-right">%</th>
                        <th className="px-3 py-3 text-[10px] font-black text-[#64748b] uppercase tracking-wider text-right">PPM</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rejectData.map((row, index) => {
                        const prodQty = row.prod_qty !== null && row.prod_qty !== undefined ? row.prod_qty : 0;
                        const percentage = row.percentage !== null && row.percentage !== undefined ? row.percentage : 0;
                        const ppmVal = (percentage * 1000).toLocaleString(undefined, { maximumFractionDigits: 0 });
                        
                        return (
                          <tr key={row.id || index} className="border-b border-[#f1f5f9] hover:bg-gray-50 transition-colors">
                            <td className="px-3 py-2.5 text-[12px] font-bold text-[#475569]">{index + 1}</td>
                            <td className="px-3 py-2.5 text-[12px] font-black text-[#1e293b]">{row.item_no || '-'}</td>
                            <td className="px-3 py-2.5 text-[12px] font-black text-[#1e293b]">{row.item_code || '-'}</td>
                            <td className="px-3 py-2.5 text-[12px] font-black text-[#1e293b]">{row.part_no || '-'}</td>
                            <td className="px-3 py-2.5 text-[12px] font-bold text-[#475569]">{row.item_description || '-'}</td>
                            <td className="px-3 py-2.5 text-[12px] font-black text-[#1e293b]">{row.operation || '-'}</td>
                            <td className="px-3 py-2.5 text-[12px] font-black text-[#1e293b] text-right">{prodQty}</td>
                            <td className="px-3 py-2.5 text-[12px] font-black text-[#2563eb] text-right">{percentage}%</td>
                            <td className="px-3 py-2.5 text-[12px] font-black text-[#1e293b] text-right">{ppmVal}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </Box>
              </Box>

              {/* Detailed Reason Table */}
              <Box className="bg-white border border-[#eef2f6] rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#f8fafc] border-b border-[#f1f5f9]">
                      <th className="px-4 py-3 text-[10px] font-black text-[#64748b] uppercase tracking-wider">SR.</th>
                      <th className="px-4 py-3 text-[10px] font-black text-[#64748b] uppercase tracking-wider">REJECT REASON</th>
                      <th className="px-4 py-3 text-[10px] font-black text-[#64748b] uppercase tracking-wider text-right">PROD</th>
                      <th className="px-4 py-3 text-[10px] font-black text-[#64748b] uppercase tracking-wider text-right">REJ</th>
                      <th className="px-4 py-3 text-[10px] font-black text-[#64748b] uppercase tracking-wider text-right">%</th>
                      <th className="px-4 py-3 text-[10px] font-black text-[#64748b] uppercase tracking-wider text-right">PPM</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { sr: 1, reason: 'Dimensional Error', color: '#ef4444', prod: '4500', rej: '54', pct: '1.2%', ppm: '12,000' },
                      { sr: 2, reason: 'Surface Scratch', color: '#f59e0b', prod: '3200', rej: '25', pct: '0.8%', ppm: '8,000' },
                      { sr: 3, reason: 'Material Warpage', color: '#3b82f6', prod: '15000', rej: '315', pct: '2.1%', ppm: '21,000' },
                      { sr: 4, reason: 'Casting Void', color: '#8b5cf6', prod: '850', rej: '4', pct: '0.5%', ppm: '5,000' },
                      { sr: 5, reason: 'Cracking', color: '#ec4899', prod: '120', rej: '5', pct: '4.2%', ppm: '42,000' },
                      { sr: 6, reason: 'Incorrect Coating', color: '#10b981', prod: '12000', rej: '108', pct: '0.9%', ppm: '9,000' },
                    ].map((row, index) => (
                      <tr key={index} className="border-b border-[#f1f5f9] hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-2.5 text-[12px] font-bold text-[#475569]">{row.sr}</td>
                        <td className="px-4 py-2.5 flex items-center gap-2.5">
                          <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: row.color }} />
                          <Typography className="text-[12px] font-black text-[#1e293b]">{row.reason}</Typography>
                        </td>
                        <td className="px-4 py-2.5 text-[12px] font-bold text-[#475569] text-right">{row.prod}</td>
                        <td className="px-4 py-2.5 text-[12px] font-bold text-[#475569] text-right">{row.rej}</td>
                        <td className="px-4 py-2.5 text-[12px] font-black text-[#2563eb] text-right">{row.pct}</td>
                        <td className="px-4 py-2.5 text-[12px] font-black text-[#1e293b] text-right">{row.ppm}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>
            </div>
          </div>
        </div>)}
      </Box>

      {/* ITEMWISE REWORK SECTION */}
      <Box className="bg-white rounded-[20px] border border-[#eef2f6] py-4 px-5 shadow-md mb-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
        <Box className={`flex items-center justify-between flex-wrap gap-2 ${openItemRework ? 'mb-4' : ''}`}>
          <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => setOpenItemRework(!openItemRework)}>
            <div className="w-[4px] h-6 bg-[#f59e0b] rounded-full" />
            <Typography className="text-[#1e293b] text-[16px] tracking-tight uppercase" sx={{ fontWeight: 900 }}>
              ITEMWISE REWORK
            </Typography>
          </div>

          <Box className="flex items-center gap-4 flex-wrap">
            <Typography className="text-[#2563eb] text-[11px] font-black italic hidden sm:block">
              *Rework QTY as per Prod. entry and inprocess QC
            </Typography>
            <Box className="flex items-center gap-3 border-l border-[#e2e8f0] pl-3">
              <Typography className="text-[#2563eb] text-[11px] font-black cursor-pointer hover:underline">View More...</Typography>
              <Typography className="text-[#e2e8f0] text-[14px]">|</Typography>
              <Typography className="text-[#2563eb] text-[11px] font-black cursor-pointer hover:underline">Pareto Chart</Typography>
            </Box>
            <Button
              size="small"
              variant="outlined"
              onClick={() => setOpenItemRework(!openItemRework)}
              sx={{ fontWeight: 900, textTransform: 'none', borderRadius: '6px', minWidth: '60px', height: '30px', fontSize: '12px', borderColor: '#2563eb', color: '#2563eb' }}
            >
              {openItemRework ? 'Hide' : 'Show'}
            </Button>
          </Box>
        </Box>

        {openItemRework && (<div className="pt-3 border-t border-[#f1f5f9]">
          {/* Filter Bar */}
          <Box 
            className="items-center gap-2 mb-6 bg-[#f8fafc] p-3 rounded-xl border border-[#eef2f6] flex flex-wrap"
            style={{ display: 'flex' }}
          >
            <FormControlLabel
              control={<Radio checked={true} size="small" sx={{ color: '#2563eb', '&.Mui-checked': { color: '#2563eb' } }} />}
              label={<Typography className="text-[12px] font-black text-[#1e293b]">Production</Typography>}
              sx={{ mr: 0.5 }}
            />
            
            <Box className="flex items-center gap-1">
              <Typography className="text-[12px] font-black text-[#64748b]">Plant:</Typography>
              <Select value={plant} onChange={(e) => setPlant(e.target.value)} size="small" sx={{ height: '32px', fontSize: '12px', fontWeight: 900, borderRadius: '8px', minWidth: '80px', bgcolor: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e2e8f0' } }}>
                <MenuItem value="Sharp">SHARP</MenuItem>
              </Select>
            </Box>

            <Box 
              className="items-center bg-white border border-[#e2e8f0] rounded-[6px] px-1.5 h-[28px] gap-1 flex flex-wrap"
            >
              <Typography className="text-[10px] font-black text-[#64748b]">From</Typography>
              <Box onClick={handleOpenFromPicker} className="flex items-center cursor-pointer gap-1">
                <Typography className="text-[10px] font-black text-[#1e293b]">
                  {fromDate ? formatDateDisplay(fromDate) : 'DD-MM-YYYY'}
                </Typography>
                <CalendarTodayIcon sx={{ fontSize: 11, color: '#64748b', cursor: 'pointer' }} />
                <input 
                  ref={fromRef}
                  type="date" 
                  value={fromDate} 
                  onChange={(e) => setFromDate(e.target.value)} 
                  style={{ opacity: 0, width: 0, height: 0, position: 'absolute', pointerEvents: 'none' }} 
                />
              </Box>
              <Typography className="text-[10px] font-black text-[#64748b] ml-1">To</Typography>
              <Box onClick={handleOpenToPicker} className="flex items-center cursor-pointer gap-1">
                <Typography className="text-[10px] font-black text-[#1e293b]">
                  {toDate ? formatDateDisplay(toDate) : 'DD-MM-YYYY'}
                </Typography>
                <CalendarTodayIcon sx={{ fontSize: 11, color: '#64748b', cursor: 'pointer' }} />
                <input 
                  ref={toRef}
                  type="date" 
                  value={toDate} 
                  onChange={(e) => setToDate(e.target.value)} 
                  style={{ opacity: 0, width: 0, height: 0, position: 'absolute', pointerEvents: 'none' }} 
                />
              </Box>
            </Box>

            <Button onClick={handleSearch} variant="contained" size="small" sx={{ height: '32px', bgcolor: '#2563eb', borderRadius: '8px', fontWeight: 900, textTransform: 'none', px: 2.5 }}>
              Search
            </Button>

            <Button variant="contained" startIcon={<TableChartIcon sx={{ fontSize: 16 }} />} sx={{ height: '32px', bgcolor: '#00a36c', borderRadius: '8px', fontWeight: 900, fontSize: '11px', textTransform: 'none', '&:hover': { bgcolor: '#008f5d' } }}>
              Item-wise
            </Button>
            <Button variant="contained" startIcon={<TableChartIcon sx={{ fontSize: 16 }} />} sx={{ height: '32px', bgcolor: '#00a36c', borderRadius: '8px', fontWeight: 900, fontSize: '11px', textTransform: 'none', '&:hover': { bgcolor: '#008f5d' } }}>
              Reason-wise
            </Button>
          </Box>

          {/* Side by Side Chart and Tables Container */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Radial Chart Analysis */}
            <Box className="lg:col-span-5 bg-white border border-[#eef2f6] rounded-[20px] p-5 flex flex-col shadow-sm w-full">
              <Box className="flex-1 flex items-center justify-center relative min-h-[300px]">
                <ResponsiveContainer width="100%" height={300}>
                  <RadialBarChart 
                    innerRadius="30%" 
                    outerRadius="100%" 
                    barSize={12}
                    data={[
                      { name: 'FLASH REMOVAL', value: 90, fill: '#6366f1' },
                      { name: 'PAINT TOUCHUP', value: 75, fill: '#8b5cf6' },
                      { name: 'THREAD TAPPING', value: 60, fill: '#a855f7' },
                    ].reverse()} 
                    startAngle={90} 
                    endAngle={450}
                  >
                    <RadialBar 
                      background={{ fill: '#f1f5f9' }} 
                      dataKey="value" 
                      cornerRadius={10}
                    />
                    <Legend 
                      iconSize={10} 
                      layout="vertical" 
                      verticalAlign="middle" 
                      align="right"
                      wrapperStyle={{ fontSize: '9px', fontWeight: 900, textTransform: 'uppercase' }}
                    />
                  </RadialBarChart>
                </ResponsiveContainer>
              </Box>

              <Box className="mt-4 pt-4 border-t border-[#f1f5f9]">
                <Box className="flex items-center justify-between mb-4">
                  <Box className="flex items-center gap-2">
                    <Typography className="text-[11px] font-black text-[#64748b] uppercase">View Top:</Typography>
                    <Box className="px-3 py-1 bg-[#f8fafc] border border-[#e2e8f0] rounded-md text-[11px] font-black text-[#1e293b]">5</Box>
                  </Box>
                  <Box className="flex items-center gap-3">
                    <FormControlLabel
                      control={<Radio checked={true} size="small" sx={{ p: 0.5 }} />}
                      label={<Typography className="text-[11px] font-black text-[#1e293b]">QTY</Typography>}
                      sx={{ m: 0 }}
                    />
                    <FormControlLabel
                      control={<Radio checked={false} size="small" sx={{ p: 0.5 }} />}
                      label={<Typography className="text-[11px] font-black text-[#64748b]">%</Typography>}
                      sx={{ m: 0 }}
                    />
                  </Box>
                </Box>
                <Box className="w-full bg-orange-50 border border-orange-100 py-2.5 rounded-lg flex items-center justify-center">
                  <Typography className="text-orange-600 text-[11px] font-black uppercase tracking-wider">
                    Critical Rework Categories Monitor
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Right: Itemwise Data Table & Reason Table */}
            <div className="lg:col-span-7 flex flex-col gap-6 w-full">
              {/* Itemwise Data Table */}
              <Box className="overflow-hidden rounded-xl border border-[#f1f5f9] bg-white shadow-sm">
                <Box className="max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200">
                  <table className="w-full text-left border-collapse">
                    <thead className="sticky top-0 z-10 bg-[#f8fafc]">
                      <tr className="border-b border-[#f1f5f9]">
                        <th className="px-3 py-3 text-[10px] font-black text-[#64748b] uppercase tracking-wider">SR.</th>
                        <th className="px-3 py-3 text-[10px] font-black text-[#64748b] uppercase tracking-wider">ITEM NO</th>
                        <th className="px-3 py-3 text-[10px] font-black text-[#64748b] uppercase tracking-wider">PART NO</th>
                        <th className="px-3 py-3 text-[10px] font-black text-[#64748b] uppercase tracking-wider">DESC.</th>
                        <th className="px-3 py-3 text-[10px] font-black text-[#64748b] uppercase tracking-wider">OP.</th>
                        <th className="px-3 py-3 text-[10px] font-black text-[#64748b] uppercase tracking-wider text-right">PROD</th>
                        <th className="px-3 py-3 text-[10px] font-black text-[#64748b] uppercase tracking-wider text-right">REW</th>
                        <th className="px-3 py-3 text-[10px] font-black text-[#64748b] uppercase tracking-wider text-right">%</th>
                        <th className="px-3 py-3 text-[10px] font-black text-[#64748b] uppercase tracking-wider text-right">PPM</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reworkData.map((row, index) => {
                        const prodQty = row.prod_qty !== null && row.prod_qty !== undefined ? row.prod_qty : 0;
                        const rewQty = row.rework_qty !== null && row.rework_qty !== undefined ? row.rework_qty : 0;
                        const percentage = row.percentage !== null && row.percentage !== undefined ? row.percentage : 0;
                        const ppmVal = (percentage * 1000).toLocaleString(undefined, { maximumFractionDigits: 0 });
                        
                        return (
                          <tr key={row.id || index} className="border-b border-[#f1f5f9] hover:bg-gray-50 transition-colors">
                            <td className="px-3 py-2.5 text-[12px] font-bold text-[#475569]">{index + 1}</td>
                            <td className="px-3 py-2.5 text-[12px] font-black text-[#1e293b]">{row.item_no || '-'}</td>
                            <td className="px-3 py-2.5 text-[12px] font-black text-[#1e293b]">{row.part_no || '-'}</td>
                            <td className="px-3 py-2.5 text-[12px] font-bold text-[#475569]">{row.item_description || '-'}</td>
                            <td className="px-3 py-2.5 text-[12px] font-black text-[#1e293b]">{row.operation || '-'}</td>
                            <td className="px-3 py-2.5 text-[12px] font-black text-[#1e293b] text-right">{prodQty}</td>
                            <td className="px-3 py-2.5 text-[12px] font-black text-[#1e293b] text-right">{rewQty}</td>
                            <td className="px-3 py-2.5 text-[12px] font-black text-[#2563eb] text-right">{percentage}%</td>
                            <td className="px-3 py-2.5 text-[12px] font-black text-[#1e293b] text-right">{ppmVal}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </Box>
              </Box>

              {/* Detailed Reason Table */}
              <Box className="bg-white border border-[#eef2f6] rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#f8fafc] border-b border-[#f1f5f9]">
                      <th className="px-4 py-3 text-[10px] font-black text-[#64748b] uppercase tracking-wider">SR.</th>
                      <th className="px-4 py-3 text-[10px] font-black text-[#64748b] uppercase tracking-wider">REWORK REASON</th>
                      <th className="px-4 py-3 text-[10px] font-black text-[#64748b] uppercase tracking-wider text-right">PROD</th>
                      <th className="px-4 py-3 text-[10px] font-black text-[#64748b] uppercase tracking-wider text-right">REW</th>
                      <th className="px-4 py-3 text-[10px] font-black text-[#64748b] uppercase tracking-wider text-right">%</th>
                      <th className="px-4 py-3 text-[10px] font-black text-[#64748b] uppercase tracking-wider text-right">PPM</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { sr: 1, reason: 'Flash Removal', color: '#6366f1', prod: '5000', rew: '45', pct: '0.9%', ppm: '9,000' },
                      { sr: 2, reason: 'Paint Touchup', color: '#8b5cf6', prod: '1200', rew: '18', pct: '1.5%', ppm: '15,000' },
                      { sr: 3, reason: 'Thread Tapping', color: '#a855f7', prod: '850', rew: '12', pct: '1.4%', ppm: '14,000' },
                    ].map((row, index) => (
                      <tr key={index} className="border-b border-[#f1f5f9] hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-2.5 text-[12px] font-bold text-[#475569]">{row.sr}</td>
                        <td className="px-4 py-2.5 flex items-center gap-2.5">
                          <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: row.color }} />
                          <Typography className="text-[12px] font-black text-[#1e293b]">{row.reason}</Typography>
                        </td>
                        <td className="px-4 py-2.5 text-[12px] font-bold text-[#475569] text-right">{row.prod}</td>
                        <td className="px-4 py-2.5 text-[12px] font-bold text-[#475569] text-right">{row.rew}</td>
                        <td className="px-4 py-2.5 text-[12px] font-black text-[#2563eb] text-right">{row.pct}</td>
                        <td className="px-4 py-2.5 text-[12px] font-black text-[#1e293b] text-right">{row.ppm}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>
            </div>
          </div>
        </div>)}
      </Box>

      {/* SCRAP VALUE REPORT SECTION */}
      <Box className="bg-white rounded-[20px] border border-[#eef2f6] py-4 px-5 shadow-md mb-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
        <Box className={`flex items-center justify-between flex-wrap gap-2 ${openScrapReport ? 'mb-4' : ''}`}>
          <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => setOpenScrapReport(!openScrapReport)}>
            <div className="w-[4px] h-6 bg-[#2563eb] rounded-full" />
            <Typography className="text-[#1e293b] text-[16px] tracking-tight uppercase" sx={{ fontWeight: 900 }}>
              SCRAP VALUE REPORT
            </Typography>
          </div>

          <Box className="flex items-center gap-4 flex-wrap">
            <Box className="flex items-center gap-2">
              <Typography className="text-[12px] font-black text-[#64748b]">Plant:</Typography>
              <Select 
                value="Sharp" 
                size="small" 
                sx={{ 
                  height: '30px', 
                  fontSize: '11px', 
                  fontWeight: 900, 
                  borderRadius: '6px', 
                  minWidth: '80px', 
                  bgcolor: '#f8fafc',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e2e8f0' } 
                }}
              >
                <MenuItem value="Sharp" sx={{ fontSize: '11px', fontWeight: 900 }}>SHARP</MenuItem>
              </Select>
            </Box>

            <Box className="flex items-center gap-2">
              <Typography className="text-[12px] font-black text-[#64748b]">Month:</Typography>
              <Select 
                value={scrapMonth} 
                onChange={(e) => setScrapMonth(e.target.value)} 
                open={scrapMonthSelectOpen}
                onOpen={() => setScrapMonthSelectOpen(true)}
                onClose={() => setScrapMonthSelectOpen(false)}
                size="small" 
                sx={{ 
                  height: '30px', 
                  fontSize: '11px', 
                  fontWeight: 900, 
                  borderRadius: '6px', 
                  minWidth: '110px', 
                  bgcolor: '#f8fafc',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e2e8f0' } 
                }}
                MenuProps={{ disableScrollLock: true }}
              >
                <MenuItem value="04-2026" sx={{ fontSize: '11px', fontWeight: 900 }}>April 2026</MenuItem>
                <MenuItem value="05-2026" sx={{ fontSize: '11px', fontWeight: 900 }}>May 2026</MenuItem>
                <MenuItem value="06-2026" sx={{ fontSize: '11px', fontWeight: 900 }}>June 2026</MenuItem>
                <MenuItem value="07-2026" sx={{ fontSize: '11px', fontWeight: 900 }}>July 2026</MenuItem>
                <MenuItem value="08-2026" sx={{ fontSize: '11px', fontWeight: 900 }}>August 2026</MenuItem>
                <MenuItem value="09-2026" sx={{ fontSize: '11px', fontWeight: 900 }}>September 2026</MenuItem>
                <MenuItem value="10-2026" sx={{ fontSize: '11px', fontWeight: 900 }}>October 2026</MenuItem>
                <MenuItem value="11-2026" sx={{ fontSize: '11px', fontWeight: 900 }}>November 2026</MenuItem>
                <MenuItem value="12-2026" sx={{ fontSize: '11px', fontWeight: 900 }}>December 2026</MenuItem>
                <MenuItem value="01-2027" sx={{ fontSize: '11px', fontWeight: 900 }}>January 2027</MenuItem>
                <MenuItem value="02-2027" sx={{ fontSize: '11px', fontWeight: 900 }}>February 2027</MenuItem>
                <MenuItem value="03-2027" sx={{ fontSize: '11px', fontWeight: 900 }}>March 2027</MenuItem>
              </Select>
            </Box>

            <Typography className="text-[#2563eb] text-[11px] font-black cursor-pointer hover:underline uppercase tracking-tighter hidden sm:block">
              View More...
            </Typography>

            <Button
              size="small"
              variant="outlined"
              onClick={() => setOpenScrapReport(!openScrapReport)}
              sx={{ fontWeight: 900, textTransform: 'none', borderRadius: '6px', minWidth: '60px', height: '30px', fontSize: '12px', borderColor: '#2563eb', color: '#2563eb' }}
            >
              {openScrapReport ? 'Hide' : 'Show'}
            </Button>
          </Box>
        </Box>

        {openScrapReport && (<div className="pt-3 border-t border-[#f1f5f9]">
          {/* Scrap Data Cards View */}
          {scrapData ? (
            <Box className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 pb-4">
              <Box className="bg-[#f8fafc] border border-[#eef2f6] rounded-[16px] p-5 flex flex-col justify-between shadow-sm transition-all hover:shadow-md">
                <Typography className="text-[11px] font-black text-[#64748b] uppercase tracking-wider mb-2">Month</Typography>
                <Typography className="text-[18px] font-black text-[#1e293b]">{scrapData.month || '-'}</Typography>
              </Box>
              <Box className="bg-white border border-[#2563eb]/20 rounded-[16px] p-5 flex flex-col justify-between shadow-sm transition-all hover:shadow-md border-l-[4px] border-l-[#2563eb]">
                <Typography className="text-[11px] font-black text-[#2563eb] uppercase tracking-wider mb-2">Total Scrap / Rejection Qty</Typography>
                <Typography className="text-[24px] font-black text-[#1e293b]">{scrapData.total_scrap_rej_qty !== undefined && scrapData.total_scrap_rej_qty !== null ? scrapData.total_scrap_rej_qty.toLocaleString() : '0'} Qty</Typography>
              </Box>
              <Box className="bg-[#f8fafc] border border-[#eef2f6] rounded-[16px] p-5 flex flex-col justify-between shadow-sm transition-all hover:shadow-md">
                <Typography className="text-[11px] font-black text-[#64748b] uppercase tracking-wider mb-2">Remark</Typography>
                <Typography className="text-[14px] font-bold text-[#475569] italic">{scrapData.remark || 'No remarks recorded'}</Typography>
              </Box>
            </Box>
          ) : (
            <Box className="min-h-[200px] flex items-center justify-center border-2 border-dashed border-[#e2e8f0] rounded-[20px] bg-[#f8fafc]">
              <Typography className="text-[#94a3b8] text-[13px] font-black uppercase tracking-[3px] italic">
                Loading Scrap Data...
              </Typography>
            </Box>
          )}

          {/* Footer Note */}
          <Box className="mt-4 pt-3 border-t border-[#f1f5f9]">
            <Typography className="text-[#1e293b] text-[11px] font-black italic opacity-80">
              **Value = Production {"->"} Scrap/Rejection {"->"} Fg Scrap Rejection Entry: Note Type='Scrap' Rate=Sales Order
            </Typography>
          </Box>
        </div>)}
      </Box>

      {/* SALES RETURN CUSTOMER SECTION */}
      <Box className="bg-white rounded-[20px] border border-[#eef2f6] py-4 px-5 shadow-md mb-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
        <Box className={`flex items-center justify-between flex-wrap gap-2 ${openSalesReturn ? 'mb-4' : ''}`}>
          <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => setOpenSalesReturn(!openSalesReturn)}>
            <div className="w-[4px] h-6 bg-[#2563eb] rounded-full" />
            <Typography className="text-[#1e293b] text-[16px] tracking-tight uppercase" sx={{ fontWeight: 900 }}>
              SALES RETURN CUSTOMER
            </Typography>
          </div>

          <Box className="flex items-center gap-3 flex-wrap">
            <Box className="flex items-center gap-1.5">
              <Typography className="text-[12px] font-black text-[#64748b]">Year:</Typography>
              <Select 
                value={salesReturnYear} 
                onChange={(e) => setSalesReturnYear(e.target.value)}
                open={salesReturnYearSelectOpen}
                onOpen={() => setSalesReturnYearSelectOpen(true)}
                onClose={() => setSalesReturnYearSelectOpen(false)}
                size="small" 
                sx={{ height: '30px', fontSize: '11px', fontWeight: 900, borderRadius: '6px', minWidth: '90px', bgcolor: 'white' }}
                MenuProps={{ disableScrollLock: true }}
              >
                <MenuItem value="2025-2026">2025-2026</MenuItem>
                <MenuItem value="2026-2027">2026-2027</MenuItem>
                <MenuItem value="2027-2028">2027-2028</MenuItem>
              </Select>
            </Box>

            <Box className="flex items-center gap-1.5 border-l border-[#e2e8f0] pl-3">
              <Typography className="text-[12px] font-black text-[#64748b]">Plant:</Typography>
              <Select value="Sharp" size="small" sx={{ height: '30px', fontSize: '11px', fontWeight: 900, borderRadius: '6px', minWidth: '80px', bgcolor: 'white' }}>
                <MenuItem value="Sharp">SHARP</MenuItem>
              </Select>
            </Box>

            <Box className="flex items-center gap-3 border-l border-[#e2e8f0] pl-3 flex-wrap hidden md:flex">
              {['Customer Count', 'Item Count', 'Item Qty', 'Item Value'].map((label) => (
                <FormControlLabel
                  key={label}
                  control={
                    <Radio 
                      checked={salesReturnMetric === label} 
                      onChange={() => setSalesReturnMetric(label)}
                      size="small" 
                      sx={{ p: 0.25 }} 
                    />
                  }
                  label={<Typography className="text-[11px] font-black text-[#1e293b] whitespace-nowrap">{label}</Typography>}
                  sx={{ m: 0 }}
                />
              ))}
            </Box>

            <Button
              size="small"
              variant="outlined"
              onClick={() => setOpenSalesReturn(!openSalesReturn)}
              sx={{ fontWeight: 900, textTransform: 'none', borderRadius: '6px', minWidth: '60px', height: '30px', fontSize: '12px', borderColor: '#2563eb', color: '#2563eb' }}
            >
              {openSalesReturn ? 'Hide' : 'Show'}
            </Button>
          </Box>
        </Box>

        {openSalesReturn && (<div className="pt-3 border-t border-[#f1f5f9]">
          <Box className="flex items-center gap-3 mb-4 md:hidden flex-wrap bg-[#f8fafc] p-2 rounded-lg border border-[#eef2f6]">
            {['Customer Count', 'Item Count', 'Item Qty', 'Item Value'].map((label) => (
              <FormControlLabel
                key={label}
                control={
                  <Radio 
                    checked={salesReturnMetric === label} 
                    onChange={() => setSalesReturnMetric(label)}
                    size="small" 
                    sx={{ p: 0.25 }} 
                  />
                }
                label={<Typography className="text-[11px] font-black text-[#1e293b] whitespace-nowrap">{label}</Typography>}
                sx={{ m: 0 }}
              />
            ))}
          </Box>

          {/* Line Chart Area */}
          <Box className="h-[320px] w-full mb-8 px-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={salesReturnData}
                margin={{ top: 20, right: 30, left: 10, bottom: 25 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 900, fill: '#64748b' }}
                  dy={10}
                  padding={{ left: 20, right: 20 }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  domain={[0, (dataMax) => Math.max(Math.ceil(dataMax * 1.25), 10)]}
                  tick={{ fontSize: 10, fontWeight: 900, fill: '#64748b' }}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Line 
                  type="monotone" 
                  dataKey={
                    salesReturnMetric === 'Customer Count' ? 'cust' :
                    salesReturnMetric === 'Item Count' ? 'items' :
                    salesReturnMetric === 'Item Value' ? 'raw_value' : 'qty'
                  } 
                  stroke="#5c67f2" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#5c67f2', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                  name={salesReturnMetric}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>

          {/* Data Table */}
          <Box className="overflow-y-auto max-h-[300px] rounded-xl border border-[#f1f5f9] mb-4 scrollbar-thin scrollbar-thumb-gray-200">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 z-10 bg-[#f8fafc]">
                <tr className="border-b border-[#f1f5f9]">
                  <th className="px-4 py-3 text-[10px] font-black text-[#64748b] uppercase tracking-wider">SR.</th>
                  <th className="px-4 py-3 text-[10px] font-black text-[#64748b] uppercase tracking-wider">MONTHS</th>
                  <th className="px-4 py-3 text-[10px] font-black text-[#64748b] uppercase tracking-wider text-center">CUST COUNT</th>
                  <th className="px-4 py-3 text-[10px] font-black text-[#64748b] uppercase tracking-wider text-center">ITEM COUNT</th>
                  <th className="px-4 py-3 text-[10px] font-black text-[#64748b] uppercase tracking-wider text-center">ITEM QTY</th>
                  <th className="px-4 py-3 text-[10px] font-black text-[#64748b] uppercase tracking-wider text-right">ITEM VALUE</th>
                </tr>
              </thead>
              <tbody>
                {salesReturnData.map((row, index) => (
                  <tr key={index} className="border-b border-[#f1f5f9] hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-2.5 text-[12px] font-bold text-[#475569]">{index + 1}</td>
                    <td className="px-4 py-2.5 text-[12px] font-black text-[#1e293b]">{row.month}</td>
                    <td className="px-4 py-2.5 text-[12px] font-bold text-[#475569] text-center">{row.cust}</td>
                    <td className="px-4 py-2.5 text-[12px] font-bold text-[#475569] text-center">{row.items}</td>
                    <td className="px-4 py-2.5 text-[12px] font-black text-[#1e293b] text-center">{row.qty}</td>
                    <td className="px-4 py-2.5 text-[12px] font-black text-[#2563eb] text-right">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>

          {/* Footer Note */}
          <Box className="mt-4 pt-3 border-t border-[#f1f5f9]">
            <Typography className="text-[#1e293b] text-[11px] font-black italic opacity-80">
              **Values Gst Sales Return
            </Typography>
          </Box>
        </div>)}
      </Box>

      {/* CUSTOMER COMPLAINTS (CAPA) SECTION */}
      <Box className="bg-white rounded-[20px] border border-[#eef2f6] py-4 px-5 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
        <Box className={`flex items-center justify-between flex-wrap gap-2 ${openCapa ? 'mb-4' : ''}`}>
          <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => setOpenCapa(!openCapa)}>
            <div className="w-[4px] h-6 bg-[#2563eb] rounded-full" />
            <Typography className="text-[#1e293b] text-[16px] tracking-tight uppercase" sx={{ fontWeight: 900 }}>
              CUSTOMER COMPLAINTS (CAPA)
            </Typography>
          </div>

          <Box className="flex items-center gap-3">
            <Typography className="text-[12px] font-black text-[#64748b]">Year:</Typography>
            <Select 
              value="2026-2027" 
              size="small" 
              sx={{ 
                height: '30px', 
                fontSize: '11px', 
                fontWeight: 900, 
                borderRadius: '6px', 
                minWidth: '90px', 
                bgcolor: '#f8fafc',
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e2e8f0' } 
              }}
            >
              <MenuItem value="2026-2027" sx={{ fontSize: '11px', fontWeight: 900 }}>2026-2027</MenuItem>
            </Select>

            <Button
              size="small"
              variant="outlined"
              onClick={() => setOpenCapa(!openCapa)}
              sx={{ fontWeight: 900, textTransform: 'none', borderRadius: '6px', minWidth: '60px', height: '30px', fontSize: '12px', borderColor: '#2563eb', color: '#2563eb' }}
            >
              {openCapa ? 'Hide' : 'Show'}
            </Button>
          </Box>
        </Box>

        {openCapa && (<div className="pt-3 border-t border-[#f1f5f9]">
          {/* Line Chart Area */}
          <Box className="h-[300px] w-full mb-6 px-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={[
                  { month: 'APRIL-2026', total: 9, completed: 10 },
                  { month: 'MAY-2026', total: 4, completed: 3 },
                  { month: 'JUNE-2026', total: 6, completed: 7 },
                  { month: 'JULY-2026', total: 16, completed: 4 },
                  { month: 'AUGUST-2026', total: 5, completed: 7 },
                  { month: 'SEPTEMBER-2026', total: 4, completed: 1 },
                  { month: 'OCTOBER-2026', total: 9, completed: 5 },
                  { month: 'NOVEMBER-2026', total: 8, completed: 1 },
                  { month: 'DECEMBER-2026', total: 5, completed: 4 },
                  { month: 'JANUARY-2027', total: 12, completed: 9 },
                  { month: 'FEBRUARY-2027', total: 5, completed: 4 },
                  { month: 'MARCH-2027', total: 7, completed: 6 },
                ]}
                margin={{ top: 10, right: 30, left: 10, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 9, fontWeight: 900, fill: '#64748b' }}
                  dy={10}
                  padding={{ left: 20, right: 20 }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  domain={[0, (dataMax) => Math.max(Math.ceil(dataMax * 1.25), 10)]}
                  tick={{ fontSize: 10, fontWeight: 900, fill: '#64748b' }}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Line type="monotone" dataKey="total" stroke="#2563eb" strokeWidth={3} dot={{ r: 4, fill: '#2563eb' }} activeDot={{ r: 6 }} name="Total Complaints" />
                <Line type="monotone" dataKey="completed" stroke="#f97316" strokeWidth={3} dot={{ r: 4, fill: '#f97316' }} activeDot={{ r: 6 }} name="Completed Complaints" />
              </LineChart>
            </ResponsiveContainer>
          </Box>

          {/* Indicators Bar */}
          <Box className="flex justify-center gap-4 mb-6 flex-wrap">
            <Box className="px-5 py-1.5 bg-[#2563eb] rounded-full flex items-center gap-2 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-white opacity-80" />
              <Typography className="text-white text-[11px] font-black uppercase tracking-wider">Total Complaints</Typography>
            </Box>
            <Box className="px-5 py-1.5 bg-[#f97316] rounded-full flex items-center gap-2 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-white opacity-80" />
              <Typography className="text-white text-[11px] font-black uppercase tracking-wider">Completed Complaints</Typography>
            </Box>
          </Box>

          {/* Scrollable Table */}
          <Box className="overflow-x-auto rounded-xl border border-[#f1f5f9] scrollbar-thin scrollbar-thumb-gray-200 mb-2">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-[#f8fafc] border-b border-[#f1f5f9]">
                  <th className="px-4 py-3 text-[10px] font-black text-[#64748b] uppercase tracking-wider">SR.</th>
                  <th className="px-4 py-3 text-[10px] font-black text-[#64748b] uppercase tracking-wider">TYPE</th>
                  {['APR-26', 'MAY-26', 'JUN-26', 'JUL-26', 'AUG-26', 'SEP-26', 'OCT-26', 'NOV-26', 'DEC-26', 'JAN-27', 'FEB-27', 'MAR-27'].map(month => (
                    <th key={month} className="px-3 py-3 text-[10px] font-black text-[#64748b] uppercase tracking-wider text-center">{month}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#f1f5f9] hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-[12px] font-bold text-[#475569]">1</td>
                  <td className="px-4 py-3 text-[12px] font-black text-[#1e293b]">Total complaints</td>
                  {[9, 4, 6, 16, 5, 4, 9, 8, 5, 12, 5, 7].map((val, idx) => (
                    <td key={idx} className="px-3 py-3 text-[13px] font-black text-[#1e293b] text-center">{val}</td>
                  ))}
                </tr>
                <tr className="border-b border-[#f1f5f9] hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-[12px] font-bold text-[#475569]">2</td>
                  <td className="px-4 py-3 text-[12px] font-black text-[#1e293b]">Completed complaints</td>
                  {[10, 3, 7, 4, 7, 1, 5, 1, 4, 9, 4, 6].map((val, idx) => (
                    <td key={idx} className="px-3 py-3 text-[13px] font-black text-[#f97316] text-center">{val}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </Box>
        </div>)}
      </Box>
    </Box>
  );
};

export default Quality;
