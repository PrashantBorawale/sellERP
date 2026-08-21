import React, { useState } from 'react';
import { Box, Typography, Button, MenuItem, Select, FormControl, Grid } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import TableChartIcon from '@mui/icons-material/TableChart';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, BarChart, Bar 
} from 'recharts';
import SearchIcon from '@mui/icons-material/Search';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const graphData = [
  { name: 'MC-01', availability: 85, quantity: 90, performance: 75, oee: 81 },
  { name: 'MC-02', availability: 92, quantity: 82, performance: 85, oee: 88 },
  { name: 'MC-03', availability: 78, quantity: 98, performance: 92, oee: 83 },
  { name: 'MC-04', availability: 95, quantity: 75, performance: 88, oee: 91 },
  { name: 'MC-05', availability: 88, quantity: 89, performance: 94, oee: 86 },
  { name: 'MC-06', availability: 90, quantity: 80, performance: 82, oee: 93 },
];

const machineData = [
  { name: 'DRILLING', value: 50, color: '#a855f7' },
  { name: 'MANUL', value: 25, color: '#0ea5e9' },
  { name: 'MILLING', value: 75, color: '#f43f5e' },
  { name: 'SECOND OP', value: 15, color: '#14b8a6' },
  { name: 'SPM', value: 65, color: '#a855f7' },
  { name: 'TAPPING', value: 40, color: '#0ea5e9' },
  { name: 'TROUB', value: 85, color: '#f43f5e' },
  { name: 'VMC', value: 30, color: '#14b8a6' },
];

const shiftwiseData = [
  { sr: 1, losses: 'Setup & Adjustment', a1: '45m', a2: '12m', b1: '33m', b2: '41m', c1: '10m', c2: '5m', c3: '20m', c4: '15m', d1: '60m', d2: '10m' },
  { sr: 2, losses: 'Equipment Failure', a1: '120m', a2: '-', b1: '45m', b2: '10m', c1: '60m', c2: '-', c3: '-', c4: '30m', d1: '-', d2: '-' },
  { sr: 3, losses: 'Idling & Minor Stops', a1: '15m', a2: '20m', b1: '10m', b2: '25m', c1: '30m', c2: '40m', c3: '10m', c4: '10m', d1: '15m', d2: '5m' },
  { sr: 4, losses: 'Reduced Speed', a1: '-', a2: '-', b1: '-', b2: '15m', c1: '-', c2: '40m', c3: '-', c4: '-', d1: '10m', d2: '20m' },
  { sr: 5, losses: 'Process Defects', a1: '10m', a2: '5m', b1: '8m', b2: '12m', c1: '20m', c2: '15m', c3: '10m', c4: '5m', d1: '2m', d2: '-' },
  { sr: 6, losses: 'Reduced Yield', a1: '-', a2: '-', b1: '4m', b2: '8m', c1: '-', c2: '-', c3: '-', c4: '-', d1: '-', d2: '-' },
];

const operatorEfficiencyData = [
  { name: 'Amit Kumar', index: 1, value: 130 },
  { name: 'Rahul Singh', index: 2, value: 210 },
  { name: 'Priya Sharma', index: 3, value: 80 },
  { name: 'Suresh Patel', index: 4, value: 200 },
  { name: 'Vikram Yadav', index: 5, value: 190 },
  { name: 'Anil Gupta', index: 6, value: 225 },
  { name: 'Sunita Reddy', index: 7, value: 126 },
  { name: 'Manoj Desai', index: 8, value: 220 },
  { name: 'Rajesh Joshi', index: 9, value: 220 },
  { name: 'Arjun Nair', index: 10, value: 190 },
  { name: 'Kavita Das', index: 11, value: 110 },
  { name: 'Deepak Verma', index: 12, value: 250 },
  { name: 'Pooja', index: 13, value: 90 },
  { name: 'Rohan Mehra', index: 14, value: 170 },
  { name: 'Sonia Gill', index: 15, value: 230 },
  { name: 'Karan Singh', index: 16, value: 140 },
  { name: 'Neha Gupta', index: 17, value: 210 },
  { name: 'Sameer Khan', index: 18, value: 180 },
  { name: 'Ishani Roy', index: 19, value: 195 },
  { name: 'Varun Dhawan', index: 20, value: 240 },
];

const OeeUtilizationChart = ({ percentage, color }) => {
  const radius = 38;
  const centerX = 50;
  const centerY = 50;
  
  const angle = (percentage / 100) * 360;
  const endAngle = angle - 90;
  
  const getPoint = (deg) => {
    const rad = (deg * Math.PI) / 180;
    return {
      x: centerX + radius * Math.cos(rad),
      y: centerY + radius * Math.sin(rad),
    };
  };

  const endPoint = getPoint(endAngle);
  const largeArcFlag = percentage > 50 ? 1 : 0;

  const d = `
    M ${centerX} ${centerY - radius}
    A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endPoint.x} ${endPoint.y}
  `;

  // Exact Arrow Tip Calculation to match image (wider than track)
  const arrowWidth = 10;
  const arrowHeight = 8;
  const tangentAngle = endAngle + 90;
  const arrowRad = (tangentAngle * Math.PI) / 180;
  
  const p1 = {
    x: endPoint.x + arrowHeight * Math.cos(arrowRad),
    y: endPoint.y + arrowHeight * Math.sin(arrowRad),
  };
  const p2 = {
    x: endPoint.x + (arrowWidth / 2) * Math.cos(arrowRad + Math.PI / 2),
    y: endPoint.y + (arrowWidth / 2) * Math.sin(arrowRad + Math.PI / 2),
  };
  const p3 = {
    x: endPoint.x + (arrowWidth / 2) * Math.cos(arrowRad - Math.PI / 2),
    y: endPoint.y + (arrowWidth / 2) * Math.sin(arrowRad - Math.PI / 2),
  };

  return (
    <div className="relative flex items-center justify-center">
      <svg width="180" height="180" viewBox="0 0 100 100">
        {/* Concentric Background Rings (Faint) */}
        <circle cx="50" cy="50" r="46" fill="none" stroke="#f1f5f9" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="42" fill="none" stroke="#f1f5f9" strokeWidth="0.5" />
        
        {/* Main Track Background */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#f1f5f9"
          strokeWidth="9"
        />
        
        {/* Inner Faint Ring */}
        <circle cx="50" cy="50" r="30" fill="none" stroke="#f1f5f9" strokeWidth="0.5" />
        
        {/* Active Progress Arc */}
        <path
          d={d}
          fill="none"
          stroke={color}
          strokeWidth="9"
          className="transition-all duration-1000 ease-out"
        />
        
        {/* Arrow Tip (Equilateral-style triangle) */}
        <path
          d={`M ${p1.x} ${p1.y} L ${p2.x} ${p2.y} L ${p3.x} ${p3.y} Z`}
          fill={color}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      
      <div className="absolute flex flex-col items-center justify-center">
        <Typography className="text-[26px] font-[900] text-[#1e293b]" sx={{ fontWeight: 900 }}>
          {percentage}%
        </Typography>
      </div>
    </div>
  );
};

const OeeUtilizationCard = ({ machine }) => (
  <Box className="bg-white rounded-[20px] border border-[#f1f5f9] p-8 flex flex-col items-center justify-center transition-all hover:shadow-lg hover:-translate-y-1.5 duration-300 h-full">
    <OeeUtilizationChart percentage={machine.value} color={machine.color} />
    <Typography 
      className="mt-8 text-[16px] font-[900] tracking-[0.15em] uppercase text-center"
      style={{ color: machine.color }}
      sx={{ fontWeight: 900 }}
    >
      {machine.name}
    </Typography>
  </Box>
);

const OeeCustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <Box className="bg-white p-3 shadow-xl rounded-lg border border-[#e2e8f0]">
        <Typography className="text-[12px] font-black text-[#1e293b] mb-1">
          {data.name} [{data.index}]
        </Typography>
        <Typography className="text-[12px] font-bold text-[#6366f1]">
          Efficiency : {data.value}%
        </Typography>
      </Box>
    );
  }
  return null;
};

const OEE = () => {
  const [plant, setPlant] = useState('Sharp');
  const [period, setPeriod] = useState('April 2026');

  return (
    <Box className="p-8 max-w-[1600px] mx-auto bg-[#f8fafc] min-h-screen">
      {/* Top Info Card */}
      <Box className="bg-white rounded-[20px] border border-[#eef2f6] p-7 shadow-md flex items-center justify-between mb-8 transition-all hover:shadow-lg hover:-translate-y-0.5 duration-300">
        <Box>
          <Typography className="text-[26px] font-black text-[#1e293b] leading-tight mb-1" sx={{ fontWeight: 900 }}>
            Overall Equipment Effectiveness (OEE)
          </Typography>
          <Typography className="text-[14px] text-[#94a3b8] font-medium">
            Real-time analytics for machine performance and operator productivity.
          </Typography>
        </Box>

        <Box className="flex items-center gap-4">
          <FormControl size="small" className="min-w-[150px]">
            <Select
              value="2026-2027"
              className="bg-[#f8fafc] rounded-[10px]"
              sx={{ 
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e2e8f0' },
                fontSize: '13px',
                height: '38px',
                fontWeight: 900,
                color: '#475569'
              }}
            >
              <MenuItem value="2026-2027">FY 2026-2027</MenuItem>
            </Select>
          </FormControl>

          <Button 
            variant="contained" 
            startIcon={<FileDownloadIcon sx={{ fontSize: 18 }} />}
            className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-6 h-[42px] rounded-[12px] font-black shadow-lg shadow-blue-500/20 normal-case text-[14px] transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            Export Report
          </Button>
        </Box>
      </Box>

      {/* MACHINE UTILIZATION SECTION */}
      <Box className="bg-white rounded-[20px] border border-[#eef2f6] p-7 shadow-md mb-8">
        <Box className="flex items-center justify-between mb-8">
          <Box className="flex items-center gap-3">
            <div className="w-[4px] h-6 bg-[#2563eb] rounded-full" />
            <Typography className="text-[#1e293b] text-[18px] tracking-tight uppercase" sx={{ fontWeight: 900 }}>
              MACHINE UTILIZATION
            </Typography>
          </Box>

          <Box className="flex items-center gap-4">
            <Box className="flex items-center gap-2">
              <Typography className="text-[13px] font-black text-[#64748b]">Plant:</Typography>
              <Select 
                value={plant} 
                onChange={(e) => setPlant(e.target.value)}
                size="small" 
                sx={{ 
                  height: '34px', 
                  fontSize: '13px', 
                  fontWeight: 900, 
                  borderRadius: '8px', 
                  minWidth: '100px', 
                  bgcolor: '#f8fafc',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e2e8f0' }
                }}
              >
                <MenuItem value="Sharp">Sharp</MenuItem>
              </Select>
            </Box>

            <Box className="px-4 py-1.5 bg-[#fef2f2] border border-[#fee2e2] rounded-[8px] flex items-center justify-center">
              <Typography className="text-[#ef4444] text-[13px] font-black uppercase">
                {period}
              </Typography>
            </Box>

            <Box className="w-[38px] h-[38px] bg-[#00a36c] flex items-center justify-center rounded-[8px] cursor-pointer hover:bg-[#008f5d] transition-all shadow-md">
              <TableChartIcon sx={{ fontSize: 18, color: 'white' }} />
            </Box>
          </Box>
        </Box>

        <Box className="bg-[#fcfcfc] border border-[#eef2f6] rounded-[16px] p-8">
          <div className="grid grid-cols-4 gap-8">
            {machineData.map((machine, index) => (
              <OeeUtilizationCard key={index} machine={machine} />
            ))}
          </div>
        </Box>
      </Box>

      {/* OPERATOR EFFICIENCY SECTION */}
      <Box className="bg-white rounded-[20px] border border-[#eef2f6] p-7 shadow-md mb-8">
        <Box className="flex items-center justify-between mb-8">
          <Box className="flex items-center gap-3">
            <div className="w-[4px] h-6 bg-[#2563eb] rounded-full" />
            <Typography className="text-[#1e293b] text-[18px] tracking-tight uppercase" sx={{ fontWeight: 900 }}>
              OPERATOR EFFICIENCY
            </Typography>
          </Box>

          <Box className="flex items-center gap-6">
            <Box className="flex items-center gap-2">
              <Typography className="text-[13px] font-black text-[#64748b]">Plant:</Typography>
              <Select value="Sharp" size="small" sx={{ height: '34px', fontSize: '13px', fontWeight: 900, borderRadius: '8px', minWidth: '100px', bgcolor: '#f8fafc', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e2e8f0' } }}>
                <MenuItem value="Sharp">Sharp</MenuItem>
              </Select>
            </Box>

            <Box className="flex items-center gap-2">
              <Typography className="text-[13px] font-black text-[#64748b]">Select Month:</Typography>
              <Select value="April 2026" size="small" sx={{ height: '34px', fontSize: '13px', fontWeight: 900, borderRadius: '8px', minWidth: '140px', bgcolor: '#f8fafc', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e2e8f0' } }}>
                <MenuItem value="April 2026">April 2026</MenuItem>
              </Select>
            </Box>

            <Typography className="text-[#2563eb] text-[13px] font-black cursor-pointer hover:underline transition-all">
              View More
            </Typography>

            <Box className="w-[38px] h-[38px] bg-[#00a36c] flex items-center justify-center rounded-[8px] cursor-pointer hover:bg-[#008f5d] transition-all shadow-md">
              <TableChartIcon sx={{ fontSize: 18, color: 'white' }} />
            </Box>
          </Box>
        </Box>

        <Box className="bg-[#fcfcfc] border border-[#eef2f6] rounded-[16px] p-6 overflow-x-auto custom-scrollbar">
          <div style={{ minWidth: '1800px', height: '400px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={operatorEfficiencyData} margin={{ top: 20, right: 30, left: 10, bottom: 60 }}>
                <defs>
                  <linearGradient id="colorEff" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  interval={0}
                  tick={(props) => {
                    const { x, y, payload } = props;
                    const data = operatorEfficiencyData.find(d => d.name === payload.value);
                    return (
                      <g transform={`translate(${x},${y})`}>
                        <text x={0} y={0} dy={20} textAnchor="middle" fill="#64748b" style={{ fontSize: '10px', fontWeight: 700 }}>
                          {payload.value}
                        </text>
                        <text x={0} y={0} dy={35} textAnchor="middle" fill="#94a3b8" style={{ fontSize: '10px', fontWeight: 900 }}>
                          [{data?.index}]
                        </text>
                      </g>
                    );
                  }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#1e293b', fontSize: 11, fontWeight: 900 }}
                  domain={[0, 300]}
                  ticks={[0, 50, 100, 150, 200, 250, 300]}
                  label={{ value: 'OP. EFF %', angle: -90, position: 'insideLeft', offset: -5, style: { fontSize: '11px', fontWeight: 900, fill: '#64748b' } }}
                />
                <Tooltip content={<OeeCustomTooltip />} cursor={{ stroke: '#6366f1', strokeWidth: 1 }} />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#6366f1" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorEff)"
                  dot={{ r: 5, fill: '#6366f1', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 7, strokeWidth: 2, stroke: '#fff', fill: '#6366f1' }}
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Box>

        {/* AVERAGE EFFICIENCY FOOTER */}
        <Box className="mt-8 flex justify-center">
          <Box className="bg-[#f1f5f9] border border-[#e2e8f0] px-8 py-3 rounded-[10px] shadow-sm flex items-center gap-2">
            <Typography className="text-[#1e293b] text-[15px] font-[900]">
              Average Efficiency : 
            </Typography>
            <Typography className="text-[#2563eb] text-[15px] font-[900]">
              {(operatorEfficiencyData.reduce((acc, curr) => acc + curr.value, 0) / operatorEfficiencyData.length).toFixed(1)}%
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* SHIFTWISE OEE SECTION */}
      <Box className="bg-white rounded-[20px] border border-[#eef2f6] p-7 shadow-md mb-8">
        <Box className="flex items-center justify-between mb-8">
          <Box className="flex items-center gap-3">
            <div className="w-[4px] h-6 bg-[#2563eb] rounded-full" />
            <Typography className="text-[#1e293b] text-[18px] tracking-tight uppercase" sx={{ fontWeight: 900 }}>
              SHIFTWISE OEE
            </Typography>
          </Box>

          <Box className="flex items-center gap-4">
            <Box className="flex items-center gap-1.5">
              <Typography className="text-[12px] font-black text-[#64748b]">Plant:</Typography>
              <Select value="Sharp" size="small" sx={{ height: '34px', fontSize: '12px', fontWeight: 900, borderRadius: '8px', minWidth: '90px', bgcolor: '#f8fafc', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e2e8f0' } }}>
                <MenuItem value="Sharp">Sharp</MenuItem>
              </Select>
            </Box>

            <Box className="flex items-center gap-1 bg-[#f8fafc] border border-[#e2e8f0] rounded-[8px] px-2 h-[34px]">
              <Typography className="text-[11px] font-black text-[#64748b] mr-1">From</Typography>
              <Typography className="text-[12px] font-black text-[#1e293b]">01-04-2026</Typography>
              <CalendarTodayIcon sx={{ fontSize: 14, color: '#64748b', ml: 1 }} />
              <Typography className="text-[11px] font-black text-[#64748b] mx-2">To</Typography>
              <Typography className="text-[12px] font-black text-[#1e293b]">30-04-2026</Typography>
              <CalendarTodayIcon sx={{ fontSize: 14, color: '#64748b', ml: 1 }} />
            </Box>

            <Box className="flex items-center gap-1.5">
              <Typography className="text-[12px] font-black text-[#64748b]">Group:</Typography>
              <Select value="Select" size="small" sx={{ height: '34px', fontSize: '12px', fontWeight: 900, borderRadius: '8px', minWidth: '100px', bgcolor: '#f8fafc', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e2e8f0' } }}>
                <MenuItem value="Select">Select</MenuItem>
              </Select>
            </Box>

            <Box className="flex items-center gap-1.5">
              <Typography className="text-[12px] font-black text-[#64748b]">Shift:</Typography>
              <Select value="All" size="small" sx={{ height: '34px', fontSize: '12px', fontWeight: 900, borderRadius: '8px', minWidth: '80px', bgcolor: '#f8fafc', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e2e8f0' } }}>
                <MenuItem value="All">All</MenuItem>
              </Select>
            </Box>

            <Button 
              variant="contained" 
              startIcon={<SearchIcon sx={{ fontSize: 16 }} />}
              className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-5 h-[34px] rounded-[8px] font-black normal-case text-[12px] shadow-md shadow-blue-500/20"
            >
              SEARCH
            </Button>

            <Typography className="text-[#2563eb] text-[12px] font-black cursor-pointer hover:underline">
              OEE Report V2
            </Typography>

            <Box className="w-[34px] h-[34px] bg-[#00a36c] flex items-center justify-center rounded-[8px] cursor-pointer hover:bg-[#008f5d] transition-all shadow-md">
              <TableChartIcon sx={{ fontSize: 16, color: 'white' }} />
            </Box>
          </Box>
        </Box>

        <Box className="border border-[#eef2f6] rounded-[12px] overflow-hidden">
          <Box className="overflow-x-auto custom-scrollbar" sx={{ '&::-webkit-scrollbar': { height: '8px' }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#e2e8f0', borderRadius: '10px' } }}>
            <table className="w-full border-collapse min-w-[1800px]">
              <thead>
                <tr className="bg-[#f8fafc]">
                  <th className="px-4 py-3 text-left text-[11px] font-[900] text-[#64748b] border-b border-[#eef2f6] uppercase tracking-wider w-[80px]">SR NO</th>
                  <th className="px-4 py-3 text-left text-[11px] font-[900] text-[#64748b] border-b border-[#eef2f6] uppercase tracking-wider w-[250px]">LOSSES</th>
                  {[...Array(12)].map((_, i) => (
                    <th key={i} className="px-4 py-3 text-center text-[11px] font-[900] text-[#64748b] border-b border-[#eef2f6] uppercase tracking-wider">
                      SHIFT {String.fromCharCode(65 + Math.floor(i/3))} - MC0{ (i % 3) + 1 }
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {shiftwiseData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#fcfcfc] transition-colors">
                    <td className="px-4 py-4 text-[13px] font-[900] text-[#64748b] border-b border-[#eef2f6] text-center">{row.sr}</td>
                    <td className="px-4 py-4 text-[13px] font-[900] text-[#1e293b] border-b border-[#eef2f6]">{row.losses}</td>
                    {[...Array(12)].map((_, i) => (
                      <td key={i} className="px-4 py-4 text-[13px] font-[900] text-[#2563eb] border-b border-[#eef2f6] text-center">
                        {idx % 2 === 0 ? (i * 5 + 10) + 'm' : '-'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </Box>
      </Box>

      {/* OEE GRAPHS SECTION */}
      <Box className="bg-white rounded-[20px] border border-[#eef2f6] p-7 shadow-md mb-8">
        <Box className="flex items-center justify-between mb-8">
          <Box className="flex items-center gap-3">
            <div className="w-[4px] h-6 bg-[#2563eb] rounded-full" />
            <Typography className="text-[#1e293b] text-[18px] tracking-tight uppercase" sx={{ fontWeight: 900 }}>
              OEE GRAPHS
            </Typography>
          </Box>

          <Box className="flex items-center gap-4">
            <Box className="flex items-center gap-1.5">
              <Typography className="text-[12px] font-black text-[#64748b]">Plant:</Typography>
              <Select value="Sharp" size="small" sx={{ height: '34px', fontSize: '12px', fontWeight: 900, borderRadius: '8px', minWidth: '90px', bgcolor: '#f8fafc', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e2e8f0' } }}>
                <MenuItem value="Sharp">Sharp</MenuItem>
              </Select>
            </Box>

            <Box className="flex items-center gap-1 bg-[#f8fafc] border border-[#e2e8f0] rounded-[8px] px-2 h-[34px]">
              <Typography className="text-[11px] font-black text-[#64748b] mr-1">From</Typography>
              <Typography className="text-[12px] font-black text-[#1e293b]">01-04-2026</Typography>
              <CalendarTodayIcon sx={{ fontSize: 14, color: '#64748b', ml: 1 }} />
              <Typography className="text-[11px] font-black text-[#64748b] mx-2">To</Typography>
              <Typography className="text-[12px] font-black text-[#1e293b]">30-04-2026</Typography>
              <CalendarTodayIcon sx={{ fontSize: 14, color: '#64748b', ml: 1 }} />
            </Box>

            <Button 
              variant="contained" 
              startIcon={<SearchIcon sx={{ fontSize: 16 }} />}
              className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-5 h-[34px] rounded-[8px] font-black normal-case text-[12px] shadow-md shadow-blue-500/20"
            >
              SEARCH
            </Button>

            <Box className="w-[34px] h-[34px] bg-[#00a36c] flex items-center justify-center rounded-[8px] cursor-pointer hover:bg-[#008f5d] transition-all shadow-md">
              <TableChartIcon sx={{ fontSize: 16, color: 'white' }} />
            </Box>
          </Box>
        </Box>

        <div className="grid grid-cols-2 gap-8">
          {/* ROW 1 */}
          <Box className="bg-[#fcfcfc] border border-[#eef2f6] rounded-[16px] p-6 h-[500px] flex flex-col">
            <Typography className="text-[14px] font-[900] text-[#1e293b] text-center mb-10">
              Machine Availability Graph
            </Typography>
            <Box className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={graphData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11, fontWeight: 900 }} label={{ value: 'Machine name', position: 'bottom', offset: 0, style: { fontSize: '11px', fontWeight: 900, fill: '#64748b' } }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#1e293b', fontSize: 11, fontWeight: 900 }} domain={[0, 100]} ticks={[0, 20, 40, 60, 80, 100]} label={{ value: 'Available in %', angle: -90, position: 'insideLeft', offset: 15, style: { fontSize: '11px', fontWeight: 900, fill: '#64748b' } }} />
                  <Tooltip cursor={{ fill: '#f1f5f9', opacity: 0.5 }} />
                  <Bar dataKey="availability" fill="#5c67f2" radius={[4, 4, 0, 0]} barSize={45} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Box>

          <Box className="bg-[#fcfcfc] border border-[#eef2f6] rounded-[16px] p-6 h-[500px] flex flex-col">
            <Typography className="text-[14px] font-[900] text-[#1e293b] text-center mb-10">
              Production Quantity Graph
            </Typography>
            <Box className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={graphData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11, fontWeight: 900 }} label={{ value: 'Machine name', position: 'bottom', offset: 0, style: { fontSize: '11px', fontWeight: 900, fill: '#64748b' } }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#1e293b', fontSize: 11, fontWeight: 900 }} domain={[0, 100]} ticks={[0, 20, 40, 60, 80, 100]} label={{ value: 'Quantity in %', angle: -90, position: 'insideLeft', offset: 15, style: { fontSize: '11px', fontWeight: 900, fill: '#64748b' } }} />
                  <Tooltip cursor={{ fill: '#f1f5f9', opacity: 0.5 }} />
                  <Bar dataKey="quantity" fill="#5c67f2" radius={[4, 4, 0, 0]} barSize={45} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Box>

          {/* ROW 2 */}
          <Box className="bg-[#fcfcfc] border border-[#eef2f6] rounded-[16px] p-6 h-[500px] flex flex-col">
            <Typography className="text-[14px] font-[900] text-[#1e293b] text-center mb-10">
              Machine Performance Report
            </Typography>
            <Box className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={graphData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11, fontWeight: 900 }} label={{ value: 'Machine name', position: 'bottom', offset: 0, style: { fontSize: '11px', fontWeight: 900, fill: '#64748b' } }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#1e293b', fontSize: 11, fontWeight: 900 }} domain={[0, 100]} ticks={[0, 20, 40, 60, 80, 100]} label={{ value: 'Performance in %', angle: -90, position: 'insideLeft', offset: 15, style: { fontSize: '11px', fontWeight: 900, fill: '#64748b' } }} />
                  <Tooltip cursor={{ fill: '#f1f5f9', opacity: 0.5 }} />
                  <Bar dataKey="performance" fill="#5c67f2" radius={[4, 4, 0, 0]} barSize={45} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Box>

          <Box className="bg-[#fcfcfc] border border-[#eef2f6] rounded-[16px] p-6 h-[500px] flex flex-col">
            <Typography className="text-[14px] font-[900] text-[#1e293b] text-center mb-10">
              OEE Summary Graph
            </Typography>
            <Box className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={graphData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11, fontWeight: 900 }} label={{ value: 'Machine name', position: 'bottom', offset: 0, style: { fontSize: '11px', fontWeight: 900, fill: '#64748b' } }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#1e293b', fontSize: 11, fontWeight: 900 }} domain={[0, 100]} ticks={[0, 20, 40, 60, 80, 100]} label={{ value: 'OEE in %', angle: -90, position: 'insideLeft', offset: 15, style: { fontSize: '11px', fontWeight: 900, fill: '#64748b' } }} />
                  <Tooltip cursor={{ fill: '#f1f5f9', opacity: 0.5 }} />
                  <Bar dataKey="oee" fill="#5c67f2" radius={[4, 4, 0, 0]} barSize={45} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Box>
        </div>
      </Box>
    </Box>
  );
};

export default OEE;
