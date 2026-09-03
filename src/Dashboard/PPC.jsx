import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, MenuItem, Select, FormControl } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import RefreshIcon from '@mui/icons-material/Refresh';
import SearchIcon from '@mui/icons-material/Search';
import TableIcon from '@mui/icons-material/TableChart';
import { RadialBarChart, RadialBar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, AreaChart, Area, ReferenceLine, ComposedChart, Line } from 'recharts';

const PPC = () => {
  const [unitType, setUnitType] = useState('mt');
  const [groupType, setGroupType] = useState('machine');
  const [deliveryType, setDeliveryType] = useState('schedule');
  const [selectedScheduleMonth, setSelectedScheduleMonth] = useState('all');
  const [openSchQty, setOpenSchQty] = useState(false);

  const [scheduleData, setScheduleData] = useState([
    { name: 'April-2026', quantity: 25000 },
    { name: 'May-2026', quantity: 28500 },
    { name: 'June-2026', quantity: 32000 },
    { name: 'July-2026', quantity: 35500 },
    { name: 'August-2026', quantity: 31000 },
    { name: 'September-2026', quantity: 38000 },
    { name: 'October-2026', quantity: 40500 },
    { name: 'November-2026', quantity: 42000 },
    { name: 'December-2026', quantity: 45000 },
    { name: 'January-2027', quantity: 41500 },
    { name: 'February-2027', quantity: 43000 },
    { name: 'March-2027', quantity: 48000 },
  ]);

  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        let yearParam = '2026';
        if (selectedScheduleMonth !== 'all') {
          const parts = selectedScheduleMonth.split('-');
          if (parts.length > 1) {
            const monthName = parts[0];
            const yearNum = parseInt(parts[1], 10);
            const isQ4 = ['January', 'February', 'March'].includes(monthName);
            yearParam = String(isQ4 ? yearNum - 1 : yearNum);
          }
        }
        
        const response = await fetch(`https://sellerp-backend.onrender.com/Dashboard/ppc/schqty/month/wise/?month=all&year=${yearParam}`);
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            setScheduleData(data);
          }
        }
      } catch (error) {
        console.error('Error fetching schedule data:', error);
      }
    };

    fetchScheduleData();
  }, [selectedScheduleMonth]);

  const filteredScheduleData = selectedScheduleMonth === 'all' 
    ? scheduleData 
    : scheduleData.filter(d => d.name === selectedScheduleMonth);

  const totalScheduleQty = filteredScheduleData.reduce((acc, curr) => acc + curr.quantity, 0);

  const renderCustomDot = (props) => {
    const { cx, cy, payload } = props;
    if (payload.name === selectedScheduleMonth) {
      return (
        <circle 
          key={`dot-${payload.name}`}
          cx={cx} 
          cy={cy} 
          r={7} 
          fill="#10b981" 
          stroke="#ffffff" 
          strokeWidth={2.5} 
          style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.25))' }}
        />
      );
    }
    return (
      <circle 
        key={`dot-${payload.name}`}
        cx={cx} 
        cy={cy} 
        r={4} 
        fill="#6366f1" 
        stroke="#ffffff" 
        strokeWidth={1.5} 
      />
    );
  };

  const CustomXAxisTick = (props) => {
    const { x, y, payload } = props;
    if (!payload || !payload.value) return null;
    const parts = payload.value.split('-');
    const month = parts[0];
    const year = parts[1];
    
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} textAnchor="middle" fill="#64748b" fontSize={11} fontWeight={900}>
          <tspan x={0} dy={28}>{month}</tspan>
          <tspan x={0} dy={14}>{year}</tspan>
        </text>
      </g>
    );
  };

  return (
    <Box className="p-8 max-w-[1600px] mx-auto bg-[#f8fafc]">
      {/* Top Info Card */}
      <Box className="bg-white rounded-[20px] border border-[#eef2f6] p-8 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-between mb-8">
        <Box>
          <Typography className="text-[28px] font-black text-[#1e293b] leading-tight mb-1" sx={{ fontWeight: 900 }}>
            Production Planning (PPC)
          </Typography>
          <Typography className="text-[14px] text-[#94a3b8] font-semibold">
            Enterprise manufacturing control, scheduling, and delivery performance registry.
          </Typography>
        </Box>

        <Box className="flex items-center gap-4">
          <Button 
            variant="contained" 
            startIcon={<FileDownloadIcon sx={{ fontSize: 20 }} />}
            className="bg-[#1e293b] hover:bg-[#0f172a] text-white px-6 h-[44px] rounded-[10px] font-black shadow-lg shadow-gray-900/20 normal-case text-[14px] transition-all"
            disableElevation
          >
            Master Export
          </Button>
        </Box>
      </Box>

      {/* Schedule Quantity Month Wise Section */}
      <Box className="bg-white rounded-[20px] border border-[#eef2f6] py-4 px-5 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 mb-6">
        <div className={`flex items-center justify-between flex-wrap gap-2 ${openSchQty ? 'mb-4' : ''}`}>
          <div className="flex items-center gap-2 cursor-pointer select-none" onClick={() => setOpenSchQty(!openSchQty)}>
            <div className="w-[4px] h-6 bg-[#6366f1] rounded-full" />
            <Typography className="text-[#1e293b] text-[16px] tracking-tight uppercase" sx={{ fontWeight: 900 }}>
              SCHEDULE QUANTITY MONTH WISE
            </Typography>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <Typography className="text-[12px] font-black text-[#64748b] uppercase">Select Month:</Typography>
              <Select 
                value={selectedScheduleMonth} 
                onChange={(e) => setSelectedScheduleMonth(e.target.value)}
                size="small" 
                sx={{ height: '30px', fontSize: '12px', fontWeight: 900, borderRadius: '6px', minWidth: '120px', bgcolor: 'white' }}
              >
                <MenuItem value="all">All Months</MenuItem>
                <MenuItem value="April-2026">April-2026</MenuItem>
                <MenuItem value="May-2026">May-2026</MenuItem>
                <MenuItem value="June-2026">June-2026</MenuItem>
                <MenuItem value="July-2026">July-2026</MenuItem>
                <MenuItem value="August-2026">August-2026</MenuItem>
                <MenuItem value="September-2026">September-2026</MenuItem>
                <MenuItem value="October-2026">October-2026</MenuItem>
                <MenuItem value="November-2026">November-2026</MenuItem>
                <MenuItem value="December-2026">December-2026</MenuItem>
                <MenuItem value="January-2027">January-2027</MenuItem>
                <MenuItem value="February-2027">February-2027</MenuItem>
                <MenuItem value="March-2027">March-2027</MenuItem>
              </Select>
            </div>
            <Box 
              sx={{ 
                bgcolor: 'primary.main', 
                color: 'white', 
                px: 2.5, 
                py: 0.6, 
                borderRadius: '50px', 
                fontSize: '11px', 
                fontWeight: 900 
              }}
            >
              TOTAL SCHEDULE QTY: {totalScheduleQty.toLocaleString()} Qty
            </Box>
            <Button
              size="small"
              variant="outlined"
              onClick={() => setOpenSchQty(!openSchQty)}
              sx={{ fontWeight: 900, textTransform: 'none', borderRadius: '6px', minWidth: '60px', height: '30px', fontSize: '12px', borderColor: '#6366f1', color: '#6366f1' }}
            >
              {openSchQty ? 'Hide' : 'Show'}
            </Button>
          </div>
        </div>

        {openSchQty && (<div className="pt-3 border-t border-[#f1f5f9]">
        {/* High-Fidelity Area Chart Container with Highlight */}
        <Box className="bg-white rounded-[16px] p-3 border border-[#f1f5f9] shadow-sm">
          <div className="h-[340px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={scheduleData}
                margin={{ top: 15, right: 30, left: 10, bottom: 60 }}
              >
                <defs>
                  {/* Area fill gradient */}
                  <linearGradient id="colorQty" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.01}/>
                  </linearGradient>
                  {/* Line stroke color transition gradient */}
                  <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="40%" stopColor="#8b5cf6" />
                    <stop offset="70%" stopColor="#ec4899" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                
                {/* Background transparent guide bars */}
                <Bar 
                  dataKey="quantity" 
                  barSize={20} 
                  radius={[10, 10, 0, 0]}
                  tooltipType="none"
                >
                  {scheduleData.map((entry, index) => {
                    const isSelected = selectedScheduleMonth === 'all' || entry.name === selectedScheduleMonth;
                    return (
                      <Cell 
                        key={`bg-cell-${index}`} 
                        fill={entry.name === selectedScheduleMonth ? '#10b981' : '#6366f1'} 
                        opacity={entry.name === selectedScheduleMonth ? 0.2 : 0.04} 
                      />
                    );
                  })}
                </Bar>

                {/* Stepped Area fill */}
                <Area 
                  type="stepAfter" 
                  dataKey="quantity" 
                  fill="url(#colorQty)" 
                  stroke="none" 
                  tooltipType="none"
                />

                {/* Glowing stepped shadow overlay line */}
                <Line 
                  type="stepAfter" 
                  dataKey="quantity" 
                  stroke="url(#lineGrad)" 
                  strokeWidth={10}
                  opacity={0.15}
                  dot={false}
                  activeDot={false}
                  tooltipType="none"
                />

                {/* Main stepped line overlay with color gradient transition */}
                <Line 
                  type="stepAfter" 
                  dataKey="quantity" 
                  stroke="url(#lineGrad)" 
                  strokeWidth={3.5}
                  dot={renderCustomDot}
                  activeDot={{ r: 8 }}
                />

                {selectedScheduleMonth !== 'all' && (
                  <ReferenceLine 
                    x={selectedScheduleMonth} 
                    stroke="#10b981" 
                    strokeWidth={2} 
                    strokeDasharray="4 4" 
                  />
                )}

                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={<CustomXAxisTick />} 
                  padding={{ left: 30, right: 30 }}
                  interval={0}
                  height={60}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tickCount={7}
                  tick={{ fill: '#64748b', fontSize: 12, fontWeight: 900 }}
                  tickFormatter={(val) => val.toLocaleString()}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                  formatter={(value) => [value.toLocaleString(), 'Quantity']}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </Box>
        </div>)}
      </Box>

      {false && (
      <>
      {/* Monthly Production Chart Section */}
      <Box className="bg-white rounded-[20px] border border-[#eef2f6] p-7 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 mb-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-[4px] h-6 bg-[#2563eb] rounded-full" />
            <Typography className="text-[#1e293b] text-[16px] tracking-tight uppercase" sx={{ fontWeight: 900 }}>MONTHLY PRODUCTION CHART</Typography>
          </div>
          <div className="w-9 h-9 bg-[#00a36c] flex items-center justify-center rounded-lg cursor-pointer hover:bg-[#008f5d] transition-all shadow-sm">
            <TableIcon sx={{ fontSize: 18, color: 'white' }} />
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-[#f8fafc] border border-[#eef2f6] rounded-[16px] p-5 mb-8 flex items-center flex-wrap gap-6 shadow-sm">
          <div className="flex items-center gap-2">
            <Typography className="text-[12px] font-black text-[#64748b] uppercase">Plant:</Typography>
            <Select value="VISHWA S.I" size="small" sx={{ height: '36px', fontSize: '12px', fontWeight: 900, borderRadius: '8px', minWidth: '100px', bgcolor: 'white' }}>
              <MenuItem value="VISHWA S.I">VISHWA S.I</MenuItem>
            </Select>
          </div>
          <div className="flex items-center gap-3">
            <input type="checkbox" className="w-4 h-4 rounded border-[#e2e8f0]" />
            <Typography className="text-[12px] font-black text-[#64748b] uppercase">Select month:</Typography>
            <Select value="april2026" size="small" sx={{ height: '36px', fontSize: '12px', fontWeight: 900, borderRadius: '8px', minWidth: '130px', bgcolor: 'white' }}>
              <MenuItem value="april2026">April-2026</MenuItem>
            </Select>
          </div>
          <div className="flex items-center gap-3">
            <input type="checkbox" className="w-4 h-4 rounded border-[#e2e8f0]" />
            <Typography className="text-[12px] font-black text-[#64748b] uppercase">Select date:</Typography>
            <div className="flex items-center gap-2">
              <input type="date" defaultValue="2026-04-01" className="h-[36px] border border-[#e2e8f0] rounded-[8px] px-3 text-[12px] font-black text-[#1e293b] focus:outline-none focus:border-[#2563eb]" />
              <Typography className="text-[12px] font-black text-[#64748b] uppercase">to</Typography>
              <input type="date" defaultValue="2026-04-30" className="h-[36px] border border-[#e2e8f0] rounded-[8px] px-3 text-[12px] font-black text-[#1e293b] focus:outline-none focus:border-[#2563eb]" />
            </div>
          </div>
          <Button 
            variant="contained" 
            className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-8 h-[36px] rounded-[8px] font-black normal-case text-[12px] shadow-lg shadow-blue-500/20"
          >
            SEARCH
          </Button>
          <div className="flex items-center gap-6 ml-auto">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setUnitType('mt')}>
              <input type="radio" name="unitType" checked={unitType === 'mt'} onChange={() => {}} className="w-4 h-4 text-[#2563eb]" />
              <Typography className={`text-[12px] font-black uppercase ${unitType === 'mt' ? 'text-[#2563eb]' : 'text-[#64748b]'}`}>PROD.MT.</Typography>
            </div>
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setUnitType('qty')}>
              <input type="radio" name="unitType" checked={unitType === 'qty'} onChange={() => {}} className="w-4 h-4 text-[#2563eb]" />
              <Typography className={`text-[12px] font-black uppercase ${unitType === 'qty' ? 'text-[#2563eb]' : 'text-[#64748b]'}`}>PROD.QTY</Typography>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: Circular Production Output */}
          <Box className="relative">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-3 h-3 bg-[#2563eb] rounded-full" />
              <Typography className="text-[14px] font-black text-[#2563eb] uppercase">PRODUCTION OUTPUT</Typography>
            </div>
            
            <div className="flex items-center justify-between bg-white rounded-[20px] p-4">
              <div className="w-[380px] h-[380px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart 
                    cx="50%" 
                    cy="50%" 
                    innerRadius="20%" 
                    outerRadius="100%" 
                    barSize={15} 
                    data={[
                      { name: 'ASSEMBLY', value: 85, fill: '#6366f1' },
                      { name: 'CASTING', value: 72, fill: '#f59e0b' },
                      { name: 'FORGING', value: 65, fill: '#ec4899' },
                      { name: 'MACHINING', value: 45, fill: '#6366f1' },
                    ]}
                  >
                    <RadialBar
                      minAngle={15}
                      background
                      clockWise
                      dataKey="value"
                      cornerRadius={10}
                    />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>

              {/* Custom Legend */}
              <div className="space-y-3 mr-4">
                {[
                  { name: 'ASSEMBLY', color: '#6366f1' },
                  { name: 'CASTING', color: '#f59e0b' },
                  { name: 'FORGING', color: '#ec4899' },
                  { name: 'MACHINING', color: '#6366f1' },
                ].map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="w-2 h-4 rounded-sm" style={{ backgroundColor: item.color }} />
                    <Typography className="text-[11px] font-black uppercase" sx={{ color: item.color }}>{item.name}</Typography>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Group Toggles */}
            <div className="mt-8 flex justify-center">
              <div className="bg-[#f8fafc] border border-[#eef2f6] rounded-full px-8 py-3 flex items-center gap-10">
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => setGroupType('machine')}>
                  <input type="radio" name="groupType" checked={groupType === 'machine'} onChange={() => {}} className="w-4 h-4 text-[#2563eb]" />
                  <Typography className={`text-[12px] font-black uppercase ${groupType === 'machine' ? 'text-[#2563eb]' : 'text-[#64748b]'}`}>MACHINE GROUP :</Typography>
                  <Select value="all" size="small" sx={{ height: '30px', fontSize: '12px', fontWeight: 900, borderRadius: '6px', minWidth: '80px', bgcolor: 'white' }}>
                    <MenuItem value="all">All</MenuItem>
                  </Select>
                </div>
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => setGroupType('user')}>
                  <input type="radio" name="groupType" checked={groupType === 'user'} onChange={() => {}} className="w-4 h-4 text-[#2563eb]" />
                  <Typography className={`text-[12px] font-black uppercase ${groupType === 'user' ? 'text-[#2563eb]' : 'text-[#64748b]'}`}>USER GROUP</Typography>
                </div>
              </div>
            </div>
          </Box>

          {/* Right: Detailed Table */}
          <Box>
            <div className="border border-[#eef2f6] rounded-[20px] overflow-hidden bg-white">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#f8fafc] border-b border-[#eef2f6]">
                    <th className="px-6 py-5 text-[11px] font-black text-[#64748b] uppercase tracking-wider">SR</th>
                    <th className="px-6 py-5 text-[11px] font-black text-[#64748b] uppercase tracking-wider">MACHINE GRP</th>
                    <th className="px-6 py-5 text-[11px] font-black text-[#64748b] uppercase tracking-wider text-right">QTY</th>
                    <th className="px-6 py-5 text-[11px] font-black text-[#64748b] uppercase tracking-wider text-right">MT.</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f1f5f9]">
                  {[
                    { id: 1, name: 'MACHINING', qty: '12,500', mt: '450 MT', color: '#6366f1' },
                    { id: 2, name: 'ASSEMBLY', qty: '9,800', mt: '320 MT', color: '#6366f1' },
                    { id: 3, name: 'FORGING', qty: '7,500', mt: '280 MT', color: '#ec4899' },
                    { id: 4, name: 'CASTING', qty: '5,400', mt: '190 MT', color: '#f59e0b' },
                  ].map((row) => (
                    <tr key={row.id} className="hover:bg-[#f8fafc] transition-colors group cursor-pointer">
                      <td className="px-6 py-6 text-[13px] font-black text-[#475569]">{row.id}</td>
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-3">
                          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: row.color }} />
                          <Typography className="text-[13px] font-black text-[#1e293b] uppercase tracking-tight">{row.name}</Typography>
                        </div>
                      </td>
                      <td className="px-6 py-6 text-[13px] font-black text-[#1e293b] text-right">{row.qty}</td>
                      <td className="px-6 py-6 text-[13px] font-black text-[#1e293b] text-right">{row.mt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Box>
        </div>
      </Box>

      {/* Delivery Performance Section */}
      <Box className="bg-white rounded-[20px] border border-[#eef2f6] p-7 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 mb-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-[4px] h-6 bg-[#f59e0b] rounded-full" />
              <Typography className="text-[#1e293b] text-[16px] tracking-tight uppercase" sx={{ fontWeight: 900 }}>DELIVERY PERFORMANCE</Typography>
            </div>
            
            <div className="flex items-center gap-3 ml-6">
              <Box 
                sx={{ bgcolor: '#6366f1', color: 'white', px: 3, py: 0.8, borderRadius: '50px', fontSize: '11px', fontWeight: 900 }}
              >
                SCHEDULE SALES/ORDER
              </Box>
              <Box 
                sx={{ bgcolor: '#f59e0b', color: 'white', px: 3, py: 0.8, borderRadius: '50px', fontSize: '11px', fontWeight: 900 }}
              >
                DISPATCH/SALES
              </Box>
            </div>
          </div>
          <div className="w-9 h-9 bg-[#00a36c] flex items-center justify-center rounded-lg cursor-pointer hover:bg-[#008f5d] transition-all shadow-sm">
            <TableIcon sx={{ fontSize: 18, color: 'white' }} />
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-[#f8fafc] border border-[#eef2f6] rounded-[16px] p-5 mb-8 flex items-center flex-wrap gap-8 shadow-sm">
          <div className="flex items-center gap-2">
            <Typography className="text-[12px] font-black text-[#64748b] uppercase">Year:</Typography>
            <Select value="2026-2027" size="small" sx={{ height: '36px', fontSize: '12px', fontWeight: 900, borderRadius: '8px', minWidth: '110px', bgcolor: 'white' }}>
              <MenuItem value="2026-2027">2026-2027</MenuItem>
            </Select>
          </div>
          
          <div className="flex items-center gap-6">
            <Typography className="text-[12px] font-black text-[#64748b] uppercase">TYPE:</Typography>
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setDeliveryType('schedule')}>
              <input type="radio" name="deliveryType" checked={deliveryType === 'schedule'} onChange={() => {}} className="w-4 h-4 text-[#2563eb]" />
              <Typography className={`text-[12px] font-black uppercase ${deliveryType === 'schedule' ? 'text-[#2563eb]' : 'text-[#64748b]'}`}>SCHEDULE</Typography>
            </div>
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setDeliveryType('order')}>
              <input type="radio" name="deliveryType" checked={deliveryType === 'order'} onChange={() => {}} className="w-4 h-4 text-[#2563eb]" />
              <Typography className={`text-[12px] font-black uppercase ${deliveryType === 'order' ? 'text-[#2563eb]' : 'text-[#64748b]'}`}>SALES ORDER</Typography>
            </div>
          </div>

          <div className="w-[1.5px] h-6 bg-[#e2e8f0]" />

          <div className="flex items-center gap-2">
            <Typography className="text-[12px] font-black text-[#64748b] uppercase">Quantity:</Typography>
            <Select value="none" size="small" sx={{ height: '36px', fontSize: '12px', fontWeight: 900, borderRadius: '8px', minWidth: '120px', bgcolor: 'white' }}>
              <MenuItem value="none">Select</MenuItem>
            </Select>
          </div>

          <Button 
            variant="contained" 
            startIcon={<SearchIcon sx={{ fontSize: 18 }} />}
            className="bg-[#1e293b] hover:bg-[#0f172a] text-white px-8 h-[36px] rounded-[8px] font-black normal-case text-[12px] shadow-lg ml-auto"
          >
            SEARCH
          </Button>
        </div>

        {/* High-Fidelity Bar Chart Container */}
        <Box className="bg-white rounded-[20px] p-8 border border-[#f1f5f9] mb-12 shadow-sm">
          <div className="h-[450px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { name: 'April-2026', schedule: 8200000, dispatch: 7500000 },
                  { name: 'May-2026', schedule: 9500000, dispatch: 8800000 },
                  { name: 'June-2026', schedule: 11200000, dispatch: 10500000 },
                  { name: 'July-2026', schedule: 12800000, dispatch: 11500000 },
                  { name: 'August-2026', schedule: 10500000, dispatch: 9800000 },
                  { name: 'September-2026', schedule: 13200000, dispatch: 12500000 },
                ]}
                margin={{ top: 20, right: 30, left: 40, bottom: 20 }}
                barGap={15}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 13, fontWeight: 900 }} 
                  dy={15}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12, fontWeight: 900 }}
                  domain={[0, 14000000]}
                  ticks={[0, 2000000, 4000000, 6000000, 8000000, 10000000, 12000000, 14000000]}
                  tickFormatter={(val) => val === 0 ? '0' : val.toString()}
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                />
                <Bar 
                  dataKey="schedule" 
                  fill="#6366f1" 
                  radius={[8, 8, 0, 0]} 
                  barSize={42} 
                />
                <Bar 
                  dataKey="dispatch" 
                  fill="#f59e0b" 
                  radius={[8, 8, 0, 0]} 
                  barSize={42} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Box>
 
        {/* Exact Legend Badges with forced Background Colors */}
        <div className="flex justify-center gap-10 mt-4 mb-16">
          <Box 
            sx={{ bgcolor: '#6366f1', color: 'white', px: 6, py: 1.5, borderRadius: '50px', fontSize: '14px', fontWeight: 900, cursor: 'pointer' }}
          >
            SCHEDULE SALES/ORDER
          </Box>
          <Box 
            sx={{ bgcolor: '#f59e0b', color: 'white', px: 6, py: 1.5, borderRadius: '50px', fontSize: '14px', fontWeight: 900, cursor: 'pointer' }}
          >
            DISPATCH/SALES
          </Box>
        </div>

        {/* Comparative Data Table */}
        <div className="border border-[#eef2f6] rounded-[20px] overflow-hidden bg-white shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f8fafc] border-b border-[#eef2f6]">
                <th className="px-5 py-5 text-[11px] font-black text-[#64748b] uppercase tracking-wider text-center border-r border-[#eef2f6] first:text-left">SR.</th>
                <th className="px-5 py-5 text-[11px] font-black text-[#64748b] uppercase tracking-wider text-left border-r border-[#eef2f6]">TYPE</th>
                {['APRIL-2026', 'MAY-2026', 'JUNE-2026', 'JULY-2026', 'AUGUST-2026', 'SEPTEMBER-2026'].map(h => (
                  <th key={h} className="px-5 py-5 text-[11px] font-black text-[#64748b] uppercase tracking-wider text-center border-r border-[#eef2f6] last:border-r-0">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {[
                { id: 1, type: 'Schedule Sales/Order', data: ['₹8.2M', '₹9.5M', '₹11.2M', '₹12.8M', '₹10.5M', '₹13.2M'] },
                { id: 2, type: 'Dispatch/Sales', data: ['₹7.5M', '₹8.8M', '₹10.5M', '₹11.5M', '₹9.8M', '₹12.5M'] },
                { id: 3, type: 'Variance (%)', data: ['8.5%', '7.3%', '6.2%', '10.1%', '6.6%', '5.3%'] },
                { id: 4, type: 'Backlog Status', data: ['₹0.7M', '₹0.7M', '₹0.7M', '₹1.3M', '₹0.7M', '₹0.7M'] },
              ].map((row) => (
                <tr key={row.id} className="hover:bg-[#f8fafc] transition-colors group">
                  <td className="px-6 py-6 text-[13px] font-black text-[#475569] border-r border-[#eef2f6]">{row.id}</td>
                  <td className="px-6 py-6 text-[13px] font-black text-[#1e293b] border-r border-[#eef2f6]">{row.type}</td>
                  {row.data.map((val, idx) => (
                    <td key={idx} className="px-6 py-6 text-[13px] font-black text-[#1e293b] text-center border-r border-[#eef2f6] last:border-r-0">{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Box>

      {/* Monthly Schedules vs Dispatch Section */}
      <Box className="bg-white rounded-[20px] border border-[#eef2f6] p-7 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 mb-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-[4px] h-6 bg-[#10b981] rounded-full" />
            <Typography className="text-[#1e293b] tracking-tight uppercase" sx={{ fontWeight: 900, fontSize: '18px' }}>MONTHLY SCHEDULES VS DISPATCH</Typography>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-6 py-1.5 bg-[#6366f1] text-white text-[12px] font-black rounded-full">SCHEDULE SALES/ORDER: 25,000</div>
            <div className="px-6 py-1.5 bg-[#f59e0b] text-white text-[12px] font-black rounded-full">DISPATCH/SALES: 22,000</div>
            <div className="px-6 py-1.5 bg-[#10b981] text-white text-[12px] font-black rounded-full">BAL: 3,000</div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-[#f8fafc] border border-[#eef2f6] rounded-[16px] p-5 mb-8 flex items-center flex-wrap gap-4 shadow-sm">
          <div className="flex items-center gap-2">
            <Typography className="text-[12px] font-black text-[#64748b] uppercase">Month:</Typography>
            <Select value="april2026" size="small" sx={{ height: '36px', fontSize: '12px', fontWeight: 900, borderRadius: '8px', minWidth: '120px', bgcolor: 'white' }}>
              <MenuItem value="april2026">April-2026</MenuItem>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Typography className="text-[12px] font-black text-[#64748b] uppercase">Customer:</Typography>
            <Select value="all" size="small" sx={{ height: '36px', fontSize: '12px', fontWeight: 900, borderRadius: '8px', minWidth: '140px', bgcolor: 'white' }}>
              <MenuItem value="all">All Customer</MenuItem>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Typography className="text-[12px] font-black text-[#64748b] uppercase">Item Group:</Typography>
            <Select value="all" size="small" sx={{ height: '36px', fontSize: '12px', fontWeight: 900, borderRadius: '8px', minWidth: '100px', bgcolor: 'white' }}>
              <MenuItem value="all">All</MenuItem>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Typography className="text-[12px] font-black text-[#64748b] uppercase">Type:</Typography>
            <Select value="qty" size="small" sx={{ height: '36px', fontSize: '12px', fontWeight: 900, borderRadius: '8px', minWidth: '90px', bgcolor: 'white' }}>
              <MenuItem value="qty">QTY</MenuItem>
            </Select>
          </div>
          
          <div className="flex items-center gap-3 ml-auto">
            <Button 
              variant="contained"
              className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-8 h-[38px] rounded-[10px] font-black normal-case text-[12px] shadow-lg shadow-blue-500/20"
            >
              SEARCH
            </Button>
            <Button 
              variant="contained"
              startIcon={<TableIcon sx={{ fontSize: 16 }} />} 
              className="bg-[#1e293b] hover:bg-[#0f172a] text-white px-8 h-[38px] rounded-[10px] font-black normal-case text-[12px] shadow-lg shadow-gray-900/20"
            >
              REPORT
            </Button>
            <Button 
              variant="contained"
              startIcon={<FileDownloadIcon sx={{ fontSize: 16 }} />} 
              className="bg-[#00a36c] hover:bg-[#008f5d] text-white px-8 h-[38px] rounded-[10px] font-black normal-case text-[12px] shadow-lg shadow-green-500/20"
            >
              EXPORT(QTY/VAL)
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="border border-[#eef2f6] rounded-[20px] overflow-hidden bg-white mb-10">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f8fafc] border-b border-[#eef2f6]">
                {['SR', 'ITEM NO', 'ITEM CODE', 'ITEM DISC.', 'PLAN QTY', 'DISPATCH QTY', 'BAL QTY', '%'].map(h => (
                  <th key={h} className="px-5 py-5 text-[11px] font-black text-[#64748b] uppercase tracking-wider text-center first:text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {[
                { id: 1, no: 'A-501', code: 'IC-900', desc: 'Bracket Assembly', plan: '5,000', disp: '4,200', bal: '800', perc: '84%' },
                { id: 2, no: 'B-202', code: 'IC-800', desc: 'Housing Case', plan: '3,000', disp: '3,000', bal: '0', perc: '100%' },
                { id: 3, no: 'C-101', code: 'IC-700', desc: 'Pivot Plate', plan: '1,200', disp: '900', bal: '300', perc: '75%' },
                { id: 4, no: 'D-909', code: 'IC-600', desc: 'Reinforcement Bar', plan: '8,500', disp: '7,100', bal: '1,400', perc: '83.5%' },
                { id: 5, no: 'E-444', code: 'IC-500', desc: 'Main Shaft', plan: '2,000', disp: '1,800', bal: '200', perc: '90%' },
                { id: 6, no: 'F-111', code: 'IC-400', desc: 'Secondary Link', plan: '1,500', disp: '1,200', bal: '300', perc: '80%' },
              ].map((row) => (
                <tr key={row.id} className="hover:bg-[#f8fafc] transition-colors group">
                  <td className="px-5 py-6 text-[13px] font-black text-[#475569]">{row.id}</td>
                  <td className="px-5 py-6 text-[13px] font-black text-[#2563eb]">{row.no}</td>
                  <td className="px-5 py-6 text-[13px] font-black text-[#1e293b]">{row.code}</td>
                  <td className="px-5 py-6 text-[13px] font-black text-[#1e293b] italic">{row.desc}</td>
                  <td className="px-5 py-6 text-[13px] font-black text-[#1e293b] text-right">{row.plan}</td>
                  <td className="px-5 py-6 text-[13px] font-black text-[#1e293b] text-right">{row.disp}</td>
                  <td className="px-5 py-6 text-[13px] font-black text-[#1e293b] text-right">{row.bal}</td>
                  <td className="px-5 py-6 text-[13px] font-black text-[#1e293b] text-right">{row.perc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Performance Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Overall Performance */}
          <Box className="bg-white rounded-[20px] border border-[#eef2f6] p-6 flex flex-col items-center">
            <Typography className="text-[11px] font-black text-[#64748b] uppercase tracking-wider mb-6">OVERALL PERFORMANCE</Typography>
            <div className="w-full h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'DISPATCH', value: 22000, color: '#6366f1' },
                      { name: 'BAL', value: 3000, color: '#f59e0b' },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={0}
                    outerRadius={80}
                    dataKey="value"
                    stroke="none"
                  >
                    <Cell fill="#6366f1" />
                    <Cell fill="#f59e0b" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-6 mt-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#6366f1]" />
                <Typography className="text-[10px] font-black text-[#64748b]">DISPATCH (22,000)</Typography>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#f59e0b]" />
                <Typography className="text-[10px] font-black text-[#64748b]">BAL (3,000)</Typography>
              </div>
            </div>
            <div className="bg-[#00a36c] px-6 py-1.5 rounded-full text-white text-[11px] font-black shadow-sm">
              COMPLETED: 22%
            </div>
          </Box>

          {/* Cards 2-6: Placeholders */}
          {['ITEM CLASS A', 'ITEM CLASS B', 'ITEM CLASS C', 'ITEM CLASS D', 'ITEM CLASS E'].map((label) => (
            <Box key={label} className="bg-white rounded-[20px] border border-[#eef2f6] p-6 flex flex-col items-center justify-between shadow-sm">
              <Typography className="text-[11px] font-black text-[#64748b] uppercase tracking-wider">{label}</Typography>
              <div className="w-full h-[200px] border border-dashed border-[#eef2f6] rounded-[20px] flex items-center justify-center my-6 bg-[#fcfdfe]">
                <Typography className="text-[11px] font-black text-[#e2e8f0] tracking-[0.3em] uppercase">NO DATA</Typography>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#f1f5f9]" />
                  <Typography className="text-[10px] font-black text-[#e2e8f0]">DISP: 00</Typography>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#f1f5f9]" />
                  <Typography className="text-[10px] font-black text-[#e2e8f0]">BAL: 00</Typography>
                </div>
              </div>
            </Box>
          ))}
        </div>
      </Box>

      {/* Monthly Sales Order vs Dispatch Section */}
      <Box className="bg-white rounded-[20px] border border-[#eef2f6] p-7 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 mb-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-[4px] h-6 bg-[#6366f1] rounded-full" />
            <Typography className="text-[#1e293b] text-[16px] tracking-tight uppercase" sx={{ fontWeight: 900 }}>MONTHLY SALES ORDER VS DISPATCH</Typography>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-6 py-1.5 bg-[#6366f1] text-white text-[12px] font-black rounded-full">SCHEDULE SALES/ORDER: 180,000</div>
            <div className="px-6 py-1.5 bg-[#f59e0b] text-white text-[12px] font-black rounded-full">DISPATCH/SALES: 145,000</div>
            <div className="px-6 py-1.5 bg-[#10b981] text-white text-[12px] font-black rounded-full">BAL: 35,000</div>
            <div className="w-9 h-9 bg-[#10b981] flex items-center justify-center rounded-lg cursor-pointer hover:bg-[#008f5d] transition-all shadow-sm ml-2">
              <TableIcon sx={{ fontSize: 18, color: 'white' }} />
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-[#f8fafc] border border-[#eef2f6] rounded-[16px] p-5 mb-8 flex items-center flex-wrap gap-6 shadow-sm">
          <div className="flex items-center gap-2">
            <Typography className="text-[12px] font-black text-[#64748b] uppercase">From:</Typography>
            <input type="date" defaultValue="2026-04-01" className="h-[36px] border border-[#e2e8f0] rounded-[8px] px-3 text-[12px] font-black text-[#1e293b] focus:outline-none focus:border-[#2563eb]" />
            <Typography className="text-[12px] font-black text-[#64748b] uppercase">To:</Typography>
            <input type="date" defaultValue="2026-04-30" className="h-[36px] border border-[#e2e8f0] rounded-[8px] px-3 text-[12px] font-black text-[#1e293b] focus:outline-none focus:border-[#2563eb]" />
          </div>
          <Button 
            variant="contained" 
            className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-8 h-[36px] rounded-[8px] font-black normal-case text-[12px] shadow-lg shadow-blue-500/20"
          >
            SEARCH
          </Button>
          <div className="flex items-center gap-2 ml-4">
            <Typography className="text-[12px] font-black text-[#64748b] uppercase">Customer:</Typography>
            <Select value="all" size="small" sx={{ height: '36px', fontSize: '12px', fontWeight: 900, borderRadius: '8px', minWidth: '140px', bgcolor: 'white' }}>
              <MenuItem value="all">All Customer</MenuItem>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Typography className="text-[12px] font-black text-[#64748b] uppercase">Item Group:</Typography>
            <Select value="all" size="small" sx={{ height: '36px', fontSize: '12px', fontWeight: 900, borderRadius: '8px', minWidth: '140px', bgcolor: 'white' }}>
              <MenuItem value="all">All Groups</MenuItem>
            </Select>
          </div>
        </div>

        {/* Sales Table */}
        <div className="border border-[#eef2f6] rounded-[20px] overflow-hidden bg-white mb-10">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f8fafc] border-b border-[#eef2f6]">
                {['SR', 'CUST PONO', 'ITEM NO', 'ITEM CODE', 'DESCRIPTION', 'PO QTY', 'DISPATCH', 'BALANCE', '%'].map(h => (
                  <th key={h} className="px-5 py-5 text-[11px] font-black text-[#64748b] uppercase tracking-wider text-center first:text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {[
                { id: 1, po: 'PO/26/001', no: 'S-101', code: 'IC-SAL-1', desc: 'Top Cover Casting', qty: '10,000', disp: '8,500', bal: '1,500', perc: '85%' },
                { id: 2, po: 'PO/26/002', no: 'S-102', code: 'IC-SAL-2', desc: 'Bottom Base Plate', qty: '5,000', disp: '5,000', bal: '0', perc: '100%' },
                { id: 3, po: 'PO/26/005', no: 'S-105', code: 'IC-SAL-5', desc: 'Internal Support Rod', qty: '2,500', disp: '1,800', bal: '720', perc: '72%' },
                { id: 4, po: 'PO/26/008', no: 'S-108', code: 'IC-SAL-8', desc: 'Mounting Bracket L', qty: '12,000', disp: '9,000', bal: '3,000', perc: '75%' },
                { id: 5, po: 'PO/26/012', no: 'S-112', code: 'IC-SAL-12', desc: 'Outer Shell Gasket', qty: '3,000', disp: '2,400', bal: '600', perc: '80%' },
                { id: 6, po: 'PO/26/015', no: 'S-115', code: 'IC-SAL-15', desc: 'Sealant Ring V3', qty: '8,000', disp: '6,500', bal: '1,500', perc: '81.2%' },
              ].map((row) => (
                <tr key={row.id} className="hover:bg-[#f8fafc] transition-colors group">
                  <td className="px-5 py-6 text-[13px] font-black text-[#475569]">{row.id}</td>
                  <td className="px-5 py-6 text-[13px] font-black text-[#1e293b]">{row.po}</td>
                  <td className="px-5 py-6 text-[13px] font-black text-[#2563eb]">{row.no}</td>
                  <td className="px-5 py-6 text-[13px] font-black text-[#1e293b]">{row.code}</td>
                  <td className="px-5 py-6 text-[13px] font-black text-[#1e293b] italic">{row.desc}</td>
                  <td className="px-5 py-6 text-[13px] font-black text-[#1e293b] text-right">{row.qty}</td>
                  <td className="px-5 py-6 text-[13px] font-black text-[#1e293b] text-right">{row.disp}</td>
                  <td className="px-5 py-6 text-[13px] font-black text-[#1e293b] text-right">{row.bal}</td>
                  <td className="px-5 py-6 text-[13px] font-black text-[#1e293b] text-right">{row.perc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Sales Performance Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Sales Performance */}
          <Box className="bg-white rounded-[20px] border border-[#eef2f6] p-6 flex flex-col items-center">
            <Typography className="text-[11px] font-black text-[#64748b] uppercase tracking-wider mb-6">SALES PERFORMANCE</Typography>
            <div className="w-full h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'DISPATCH', value: 22000, color: '#6366f1' },
                      { name: 'BAL', value: 3000, color: '#f59e0b' },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={0}
                    outerRadius={80}
                    dataKey="value"
                    stroke="none"
                  >
                    <Cell fill="#6366f1" />
                    <Cell fill="#f59e0b" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-6 mt-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#6366f1]" />
                <Typography className="text-[10px] font-black text-[#64748b]">DISPATCH (22,000)</Typography>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#f59e0b]" />
                <Typography className="text-[10px] font-black text-[#64748b]">BAL (3,000)</Typography>
              </div>
            </div>
            <div className="bg-[#6366f1] px-10 py-1.5 rounded-full text-white text-[11px] font-black shadow-sm">
              COMPLETED: 80%
            </div>
          </Box>

          {/* Cards 2-6: Placeholders */}
          {['ITEM CLASS A', 'ITEM CLASS B', 'ITEM CLASS C', 'ITEM CLASS D', 'ITEM CLASS E'].map((label) => (
            <Box key={label} className="bg-white rounded-[20px] border border-[#eef2f6] p-6 flex flex-col items-center justify-between shadow-sm">
              <Typography className="text-[11px] font-black text-[#64748b] uppercase tracking-wider">{label}</Typography>
              <div className="w-full h-[200px] border border-dashed border-[#eef2f6] rounded-[20px] flex items-center justify-center my-6 bg-[#fcfdfe]">
                <Typography className="text-[11px] font-black text-[#e2e8f0] tracking-[0.3em] uppercase">NO DATA</Typography>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#f1f5f9]" />
                  <Typography className="text-[10px] font-black text-[#e2e8f0]">DISPATCH: 00</Typography>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#f1f5f9]" />
                  <Typography className="text-[10px] font-black text-[#e2e8f0]">BALANCE: 00</Typography>
                </div>
              </div>
            </Box>
          ))}
        </div>
      </Box>

      {/* Daily Production Section */}
      <Box className="bg-white rounded-[20px] border border-[#eef2f6] p-7 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 mb-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-[4px] h-6 bg-[#2563eb] rounded-full" />
            <Typography className="text-[#1e293b] tracking-tight uppercase" sx={{ fontWeight: 900, fontSize: '18px' }}>DAILY PRODUCTION</Typography>
          </div>
          <div className="w-9 h-9 bg-[#10b981] flex items-center justify-center rounded-lg cursor-pointer hover:bg-[#008f5d] transition-all shadow-sm">
            <TableIcon sx={{ fontSize: 18, color: 'white' }} />
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-[#f8fafc] border border-[#eef2f6] rounded-[16px] p-5 mb-8 flex items-center flex-wrap gap-4 shadow-sm">
          <div className="flex items-center gap-2">
            <Typography className="text-[12px] font-black text-[#64748b] uppercase">Plant:</Typography>
            <Select value="VISHWA S.I" size="small" sx={{ height: '36px', fontSize: '12px', fontWeight: 900, borderRadius: '8px', minWidth: '100px', bgcolor: 'white' }}>
              <MenuItem value="VISHWA S.I">VISHWA S.I</MenuItem>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Typography className="text-[12px] font-black text-[#64748b] uppercase">From:</Typography>
            <input type="date" defaultValue="2026-04-20" className="h-[36px] border border-[#e2e8f0] rounded-[8px] px-3 text-[12px] font-black text-[#1e293b] focus:outline-none" />
            <Typography className="text-[12px] font-black text-[#64748b] uppercase">to</Typography>
            <input type="date" defaultValue="2026-04-20" className="h-[36px] border border-[#e2e8f0] rounded-[8px] px-3 text-[12px] font-black text-[#1e293b] focus:outline-none" />
          </div>
          <div className="flex items-center gap-2">
            <Typography className="text-[12px] font-black text-[#64748b] uppercase">Status:</Typography>
            <Select value="all" size="small" sx={{ height: '36px', fontSize: '12px', fontWeight: 900, borderRadius: '8px', minWidth: '80px', bgcolor: 'white' }}>
              <MenuItem value="all">All</MenuItem>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-[#e2e8f0]" />
            <Typography className="text-[12px] font-black text-[#64748b] uppercase">ITEM CODE/DESC:</Typography>
          </div>
          <input 
            placeholder="Search item code or description..." 
            className="flex-1 min-w-[200px] h-[36px] border border-[#e2e8f0] rounded-[8px] px-4 text-[12px] font-black text-[#1e293b] focus:outline-none focus:border-[#2563eb]" 
          />
          <Button variant="contained" className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-8 h-[36px] rounded-[8px] font-black normal-case text-[12px] shadow-lg shadow-blue-500/20">SEARCH</Button>
        </div>

        {/* Scrollable Table Container */}
        <div className="border border-[#eef2f6] rounded-[20px] overflow-hidden bg-white">
          <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
            <table className="w-full text-left border-collapse sticky-header">
              <thead className="sticky top-0 z-10 bg-[#f8fafc]">
                <tr className="border-b border-[#eef2f6]">
                  {['SR', 'DATE', 'MACHINE', 'SHIFT', 'ITEM', 'PROD QTY', 'REWORK QTY', 'REJECT QTY'].map(h => (
                    <th key={h} className="px-5 py-5 text-[11px] font-black text-[#64748b] uppercase tracking-wider text-center first:text-left">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f1f5f9]">
                {[
                  { id: 1, date: '20-04-2026', mc: 'MC-01', shift: 'A', item: 'Gear Shaft V2', prod: '1,200', rew: '12', rej: '5' },
                  { id: 2, date: '20-04-2026', mc: 'MC-04', shift: 'A', item: 'Housing Unit', prod: '850', rew: '8', rej: '2' },
                  { id: 3, date: '20-04-2026', mc: 'MC-09', shift: 'B', item: 'Pivot Pin 4mm', prod: '4,500', rew: '45', rej: '12' },
                  { id: 4, date: '20-04-2026', mc: 'MC-12', shift: 'B', item: 'Reinforcement Plate', prod: '2,100', rew: '15', rej: '8' },
                  { id: 5, date: '20-04-2026', mc: 'MC-02', shift: 'C', item: 'Bracket Arm L', prod: '3,200', rew: '20', rej: '4' },
                  { id: 6, date: '20-04-2026', mc: 'MC-05', shift: 'C', item: 'Bracket Arm R', prod: '3,200', rew: '21', rej: '6' },
                  { id: 7, date: '19-04-2026', mc: 'MC-01', shift: 'A', item: 'Gear Shaft V2', prod: '1,100', rew: '10', rej: '3' },
                  { id: 8, date: '19-04-2026', mc: 'MC-18', shift: 'A', item: 'Main Drive Gear', prod: '600', rew: '5', rej: '1' },
                  { id: 9, date: '19-04-2026', mc: 'MC-03', shift: 'B', item: 'Oil Seal Bush', prod: '9,000', rew: '85', rej: '25' },
                  { id: 10, date: '19-04-2026', mc: 'MC-22', shift: 'B', item: 'Valve Stem', prod: '2,400', rew: '18', rej: '7' },
                ].map((row) => (
                  <tr key={row.id} className="hover:bg-[#f8fafc] transition-colors group">
                    <td className="px-5 py-6 text-[13px] font-black text-[#475569]">{row.id}</td>
                    <td className="px-5 py-6 text-[13px] font-black text-[#1e293b]">{row.date}</td>
                    <td className="px-5 py-6 text-[13px] font-black text-[#1e293b] uppercase">{row.mc}</td>
                    <td className="px-5 py-6 text-[13px] font-black text-[#2563eb] text-center">{row.shift}</td>
                    <td className="px-5 py-6 text-[13px] font-black text-[#1e293b] italic">{row.item}</td>
                    <td className="px-5 py-6 text-[13px] font-black text-[#1e293b] text-right">{row.prod}</td>
                    <td className="px-5 py-6 text-[13px] font-black text-[#1e293b] text-right">{row.rew}</td>
                    <td className="px-5 py-6 text-[13px] font-black text-[#1e293b] text-right">{row.rej}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Box>

      {/* Today's Dispatch Plan Section */}
      <Box className="bg-white rounded-[20px] border border-[#eef2f6] p-7 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 mb-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-[4px] h-6 bg-[#2563eb] rounded-full" />
            <Typography className="text-[#1e293b] tracking-tight uppercase" sx={{ fontWeight: 900, fontSize: '18px' }}>TODAY'S DISPATCH PLAN</Typography>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-6 py-1.5 bg-[#6366f1] text-white text-[12px] font-black rounded-full">SCH: 0</div>
            <div className="px-6 py-1.5 bg-[#f59e0b] text-white text-[12px] font-black rounded-full">DISP: 0</div>
            <div className="px-6 py-1.5 bg-[#10b981] text-white text-[12px] font-black rounded-full">BAL: 0</div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-[#f8fafc] border border-[#eef2f6] rounded-[16px] p-5 mb-8 flex items-center gap-6 shadow-sm">
          <div className="flex items-center gap-3">
            <Typography className="text-[12px] font-black text-[#64748b] uppercase">SELECT DATE:</Typography>
            <input 
              type="date" 
              defaultValue="2026-04-20" 
              className="h-[38px] border border-[#e2e8f0] rounded-[8px] px-4 text-[12px] font-black text-[#1e293b] focus:outline-none focus:border-[#2563eb] bg-white shadow-sm" 
            />
          </div>
          <Button 
            variant="contained" 
            className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-10 h-[38px] rounded-[10px] font-black normal-case text-[12px] shadow-lg shadow-blue-500/20 transition-all"
          >
            SEARCH
          </Button>
        </div>

        {/* Empty State / Table Area */}
        <div className="min-h-[450px] border border-dashed border-[#e2e8f0] rounded-[30px] bg-[#fcfdfe] flex flex-col items-center justify-center transition-all">
          <div className="w-20 h-20 bg-white rounded-full shadow-md flex items-center justify-center mb-6">
            <TableIcon sx={{ color: '#cbd5e1', fontSize: 36 }} />
          </div>
          <Typography className="text-[15px] font-black text-[#94a3b8] tracking-[0.3em] uppercase">
            NO DATA FOUND
          </Typography>
          <Typography className="text-[11px] font-bold text-[#cbd5e1] mt-2 uppercase">
            Please search for a specific date to view the dispatch plan
          </Typography>
        </div>

        {/* Legend and Total Summary */}
        <div className="mt-10 flex flex-col items-center">
          <div className="flex items-center gap-10 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
              <Typography className="text-[11px] font-black text-[#64748b] uppercase tracking-wider">DISPATCH QTY</Typography>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
              <Typography className="text-[11px] font-black text-[#64748b] uppercase tracking-wider">BAL QTY</Typography>
            </div>
          </div>
          
          <div className="bg-[#00a36c] px-12 py-3 rounded-[14px] shadow-xl shadow-green-500/20 border-b-4 border-[#008f5d]">
            <Typography className="text-[22px] font-black text-white leading-none">00</Typography>
          </div>
        </div>
      </Box>

      {/* Upcoming Dispatch Section */}
      <Box className="bg-white rounded-[20px] border border-[#eef2f6] p-7 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 mb-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-[4px] h-6 bg-[#2563eb] rounded-full" />
            <Typography className="text-[#1e293b] text-[16px] tracking-tight uppercase" sx={{ fontWeight: 900 }}>UPCOMING DISPATCH</Typography>
          </div>
        </div>

        {/* High-Density Single Row Filter Bar */}
        <div className="bg-[#f8fafc] border border-[#eef2f6] rounded-[16px] p-4 mb-8 shadow-sm">
          <div className="flex items-center gap-4 flex-nowrap overflow-x-auto custom-scrollbar pb-1">
            <div className="flex items-center gap-2 shrink-0">
              <input type="radio" name="dispatchDate" defaultChecked className="w-3.5 h-3.5 text-[#2563eb]" />
              <Typography className="text-[10px] font-black text-[#64748b] uppercase whitespace-nowrap">PLAN DATE:</Typography>
              <input type="date" defaultValue="2026-04-21" className="h-[34px] w-[115px] border border-[#e2e8f0] rounded-[6px] px-2 text-[11px] font-black text-[#1e293b] focus:outline-none focus:border-[#2563eb] bg-white" />
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <input type="radio" name="dispatchDate" className="w-3.5 h-3.5 text-[#2563eb]" />
              <Typography className="text-[10px] font-black text-[#64748b] uppercase whitespace-nowrap">DUE DATE:</Typography>
              <input type="date" defaultValue="2026-04-30" className="h-[34px] w-[115px] border border-[#e2e8f0] rounded-[6px] px-2 text-[11px] font-black text-[#1e293b] focus:outline-none focus:border-[#2563eb] bg-white" />
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Typography className="text-[10px] font-black text-[#64748b] uppercase whitespace-nowrap">TYPE:</Typography>
              <Select value="all" size="small" sx={{ height: '34px', fontSize: '11px', fontWeight: 900, borderRadius: '6px', minWidth: '70px', bgcolor: 'white' }}>
                <MenuItem value="all">All</MenuItem>
              </Select>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Typography className="text-[10px] font-black text-[#64748b] uppercase whitespace-nowrap">FILTER BY:</Typography>
              <Select value="all" size="small" sx={{ height: '34px', fontSize: '11px', fontWeight: 900, borderRadius: '6px', minWidth: '75px', bgcolor: 'white' }}>
                <MenuItem value="all">All</MenuItem>
              </Select>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <input type="checkbox" className="w-3.5 h-3.5 rounded border-[#e2e8f0]" />
              <Typography className="text-[10px] font-black text-[#64748b] uppercase whitespace-nowrap">CUSTOMER:</Typography>
              <input placeholder="Customer..." className="h-[34px] w-[100px] border border-[#e2e8f0] rounded-[6px] px-2 text-[11px] font-black text-[#1e293b] focus:outline-none focus:border-[#2563eb] bg-white" />
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <input type="checkbox" className="w-3.5 h-3.5 rounded border-[#e2e8f0]" />
              <Typography className="text-[10px] font-black text-[#64748b] uppercase whitespace-nowrap">ITEM:</Typography>
              <input placeholder="Item..." className="h-[34px] w-[100px] border border-[#e2e8f0] rounded-[6px] px-2 text-[11px] font-black text-[#1e293b] focus:outline-none focus:border-[#2563eb] bg-white" />
            </div>

            <Button 
              variant="contained" 
              className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-6 h-[34px] rounded-[8px] font-black normal-case text-[11px] shadow-lg shadow-blue-500/20 ml-auto shrink-0"
            >
              SEARCH
            </Button>
          </div>
        </div>

        {/* Data Table */}
        <div className="border border-[#eef2f6] rounded-[20px] overflow-hidden bg-white mb-6">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[1400px]">
              <thead>
                <tr className="bg-[#f8fafc] border-b border-[#eef2f6]">
                  {['SR', 'TYPE', 'ITEM NO', 'ITEM DISC', 'CUSTOMER', 'PO NO', 'PLAN QTY', 'DISP QTY', 'BAL QTY', 'PLAN DATE', 'DUE DATE', 'DELAY DAYS'].map(h => (
                    <th key={h} className="px-4 py-5 text-[10px] font-black text-[#64748b] uppercase tracking-wider text-center first:text-left">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { id: 1, type: 'DOMESTIC', itemNo: 'MC-001', desc: 'Bracket Arm V1', customer: 'TATA MOTORS', po: 'PO/2026/001', pQty: '1,200', dQty: '1,000', bQty: '200', pDate: '21-04-2026', dDate: '25-04-2026', delay: '0' },
                  { id: 2, type: 'EXPORT', itemNo: 'MC-045', desc: 'Gear Shaft V2', customer: 'RENAULT', po: 'PO/EXP/982', pQty: '500', dQty: '0', bQty: '500', pDate: '22-04-2026', dDate: '28-04-2026', delay: '0' },
                  { id: 3, type: 'DOMESTIC', itemNo: 'MC-012', desc: 'Valve Stem', customer: 'MARUTI SUZUKI', po: 'PO/2026/054', pQty: '800', dQty: '800', bQty: '0', pDate: '20-04-2026', dDate: '22-04-2026', delay: '2' },
                  { id: 4, type: 'DOMESTIC', itemNo: 'MC-008', desc: 'Main Drive Gear', customer: 'MAHINDRA', po: 'PO/2026/112', pQty: '2,500', dQty: '1,200', bQty: '1,300', pDate: '21-04-2026', dDate: '26-04-2026', delay: '0' },
                  { id: 5, type: 'DOMESTIC', itemNo: 'MC-022', desc: 'Oil Seal Bush', customer: 'ASHOK LEYLAND', po: 'PO/2026/088', pQty: '4,000', dQty: '4,000', bQty: '0', pDate: '21-04-2026', dDate: '24-04-2026', delay: '0' },
                ].map((row) => (
                  <tr key={row.id} className="hover:bg-[#f8fafc] transition-colors group border-b border-[#f1f5f9] last:border-b-0">
                    <td className="px-4 py-5 text-[13px] font-black text-[#475569]">{row.id}</td>
                    <td className="px-4 py-5 text-[12px] font-black text-[#2563eb] text-center uppercase">{row.type}</td>
                    <td className="px-4 py-5 text-[13px] font-black text-[#1e293b] text-center uppercase">{row.itemNo}</td>
                    <td className="px-4 py-5 text-[13px] font-black text-[#1e293b] text-center italic">{row.desc}</td>
                    <td className="px-4 py-5 text-[13px] font-black text-[#1e293b] text-center uppercase">{row.customer}</td>
                    <td className="px-4 py-5 text-[12px] font-black text-[#64748b] text-center">{row.po}</td>
                    <td className="px-4 py-5 text-[13px] font-black text-[#1e293b] text-center">{row.pQty}</td>
                    <td className="px-4 py-5 text-[13px] font-black text-[#10b981] text-center">{row.dQty}</td>
                    <td className="px-4 py-5 text-[13px] font-black text-[#ef4444] text-center">{row.bQty}</td>
                    <td className="px-4 py-5 text-[12px] font-black text-[#1e293b] text-center">{row.pDate}</td>
                    <td className="px-4 py-5 text-[12px] font-black text-[#1e293b] text-center">{row.dDate}</td>
                    <td className="px-4 py-5 text-[13px] font-black text-[#f59e0b] text-center">{row.delay}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Total Records Footer */}
        <div className="bg-[#f8fafc] border border-[#eef2f6] rounded-[16px] p-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-[3px] h-4 bg-[#6366f1] rounded-full" />
            <Typography className="text-[11px] font-black text-[#64748b] uppercase tracking-wider">
              TOTAL RECORDS: <span className="text-[#6366f1] ml-2 text-[13px]">00</span>
            </Typography>
          </div>
          <div className="w-9 h-9 bg-[#00a36c] flex items-center justify-center rounded-lg cursor-pointer hover:bg-[#008f5d] shadow-sm">
            <TableIcon sx={{ fontSize: 18, color: 'white' }} />
          </div>
        </div>
      </Box>
      </>
      )}
    </Box>
  );
};

export default PPC;
