import React from 'react';
import { Box, Typography, Button, MenuItem, Select, FormControl } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import RefreshIcon from '@mui/icons-material/Refresh';
import TableIcon from '@mui/icons-material/TableChart';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Subcon = () => {
  return (
    <Box className="p-8 max-w-[1600px] mx-auto bg-[#f8fafc]">
      {/* Header Section */}
      <Box className="bg-white rounded-[20px] border border-[#eef2f6] p-7 shadow-md flex items-center justify-between mb-8">
        <Box>
          <Typography className="text-[26px] font-black text-[#1e293b] leading-tight mb-1">
            Subcontracting & Vendor Operations
          </Typography>
          <Typography className="text-[14px] text-[#64748b] font-medium opacity-80">
            Enterprise module for tracking outsourced processes, job work, and subcon vendor status.
          </Typography>
        </Box>

        <Box className="flex items-center gap-3">
          <Select
            value="2026-2027"
            size="small"
            sx={{ 
              height: '42px', 
              bgcolor: '#f8fafc',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: 900,
              minWidth: '160px',
              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e2e8f0' }
            }}
          >
            <MenuItem value="2026-2027" sx={{ fontSize: '13px', fontWeight: 900 }}>FY 2026-2027</MenuItem>
          </Select>

          <Button 
            variant="contained" 
            startIcon={<FileDownloadIcon />}
            className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-6 h-[42px] rounded-[10px] font-black shadow-none normal-case text-[14px] tracking-wide"
            disableElevation
          >
            Export Sheet
          </Button>
        </Box>
      </Box>
      
      {/* 57F4 CHALLAN AGEING SECTION */}
      <Box className="bg-white rounded-[20px] border border-[#eef2f6] shadow-md overflow-hidden mb-8">
        {/* Section Header */}
        <Box className="p-7 border-b border-[#f1f5f9] flex items-center justify-between bg-white">
          <Box className="flex items-center gap-3">
            <div className="w-[4px] h-6 bg-[#f59e0b] rounded-full" />
            <Typography className="text-[#1e293b] text-[18px] tracking-tight uppercase" sx={{ fontWeight: 900 }}>
              57F4 CHALLAN AGEING
            </Typography>
          </Box>
          <Typography className="text-[#2563eb] text-[13px] font-black cursor-pointer hover:underline">
            View Summary Report
          </Typography>
        </Box>

        {/* Filter Bar */}
        <Box className="px-7 py-5 bg-[#f8fafc] border-b border-[#f1f5f9] flex items-center justify-between gap-6">
          <Box className="flex items-center gap-8 flex-1">
            <Box className="flex items-center gap-3">
              <Typography className="text-[12px] font-black text-[#64748b]">Plant:</Typography>
              <Select 
                value="Sharp" 
                size="small" 
                sx={{ 
                  height: '36px', 
                  fontSize: '12px', 
                  fontWeight: 900, 
                  borderRadius: '8px', 
                  minWidth: '140px', 
                  bgcolor: 'white',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e2e8f0' } 
                }}
              >
                <MenuItem value="Sharp" sx={{ fontSize: '12px', fontWeight: 900 }}>Sharp</MenuItem>
              </Select>
            </Box>

            <Box className="flex items-center gap-4 flex-1 max-w-[400px]">
              <Box className="flex items-center gap-2">
                <input type="checkbox" checked className="w-4 h-4 rounded border-[#e2e8f0] text-[#2563eb]" />
                <Typography className="text-[12px] font-black text-[#64748b]">Supplier:</Typography>
              </Box>
              <input 
                type="text" 
                placeholder="Vendor/supplier Name" 
                className="flex-1 h-[36px] px-4 rounded-lg border border-[#e2e8f0] text-[12px] font-medium outline-none focus:border-[#2563eb] transition-colors"
              />
            </Box>
          </Box>

          <Button 
            variant="contained" 
            startIcon={<SearchIcon sx={{ fontSize: 18 }} />}
            className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-8 h-[38px] rounded-lg font-black shadow-none normal-case text-[13px] tracking-wide"
            disableElevation
          >
            SEARCH
          </Button>
        </Box>

        {/* Ageing Summary Cards */}
        <Box className="px-7 py-6 grid grid-cols-8 gap-3">
          {[
            { label: 'UNDER 0-30', val: 224, isViewAll: false },
            { label: '31-60', val: 0, isViewAll: false },
            { label: '61-90', val: 0, isViewAll: false },
            { label: '91-120', val: 0, isViewAll: false },
            { label: '121-150', val: 0, isViewAll: false },
            { label: '151-180', val: 0, isViewAll: false },
            { label: 'ABOVE > 180', val: 0, isViewAll: false },
            { label: 'VIEW ALL', val: 224, isViewAll: true },
          ].map((card, i) => (
            <Box 
              key={i} 
              className={`dn-ageing-card cursor-pointer ${card.isViewAll ? 'dn-view-all' : ''}`}
            >
              <Typography className="dn-ageing-label">
                {card.label}
              </Typography>
              <Typography className="dn-ageing-val">
                {card.val}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Data Table Area */}
        <Box className="px-7 pb-4">
          <Box className="overflow-x-auto rounded-xl border border-[#f1f5f9] scrollbar-thin scrollbar-thumb-gray-200">
            <table className="w-full text-left border-collapse min-w-[1400px]">
              <thead>
                <tr className="bg-[#f8fafc] border-b border-[#f1f5f9]">
                  <th className="px-4 py-4 text-[10px] font-black text-[#64748b] uppercase tracking-wider">SR.</th>
                  <th className="px-4 py-4 text-[10px] font-black text-[#64748b] uppercase tracking-wider">OUT NO</th>
                  <th className="px-4 py-4 text-[10px] font-black text-[#64748b] uppercase tracking-wider">OUT DATE</th>
                  <th className="px-4 py-4 text-[10px] font-black text-[#64748b] uppercase tracking-wider">SERIES</th>
                  <th className="px-4 py-4 text-[10px] font-black text-[#64748b] uppercase tracking-wider">SUPP CODE</th>
                  <th className="px-4 py-4 text-[10px] font-black text-[#64748b] uppercase tracking-wider">SUPPLIER NAME</th>
                  <th className="px-4 py-4 text-[10px] font-black text-[#64748b] uppercase tracking-wider text-center">STATUS</th>
                  <th className="px-4 py-4 text-[10px] font-black text-[#64748b] uppercase tracking-wider text-center">OUT</th>
                  <th className="px-4 py-4 text-[10px] font-black text-[#64748b] uppercase tracking-wider text-center">IN</th>
                  <th className="px-4 py-4 text-[10px] font-black text-[#64748b] uppercase tracking-wider text-center">BAL.</th>
                  <th className="px-4 py-4 text-[10px] font-black text-[#64748b] uppercase tracking-wider text-center">UNIT</th>
                  <th className="px-4 py-4 text-[10px] font-black text-[#64748b] uppercase tracking-wider text-center">AGE DAYS</th>
                  <th className="px-4 py-4 text-[10px] font-black text-[#64748b] uppercase tracking-wider text-center">VIEW</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { sr: 1, outNo: 'OC-1001', date: '2026-03-15', series: 'SC-RM', code: 'V-9901', name: 'Alpha Tech Solutions', status: 'OPEN', out: 500, in: 276, bal: 224, unit: 'PCS', age: 32 },
                  { sr: 2, outNo: 'OC-1005', date: '2026-04-10', series: 'SC-RM', code: 'V-9902', name: 'Gamma Forgings', status: 'PARTIAL', out: 1200, in: 1200, bal: 0, unit: 'KG', age: 7 },
                  { sr: 3, outNo: 'OC-1010', date: '2026-02-28', series: 'SC-CON', code: 'V-9905', name: 'Precision Tooling', status: 'OPEN', out: 50, in: 0, bal: 50, unit: 'PCS', age: 48 },
                  { sr: 4, outNo: 'OC-1022', date: '2026-04-12', series: 'SC-RM', code: 'V-9901', name: 'Alpha Tech Solutions', status: 'OPEN', out: 300, in: 100, bal: 200, unit: 'PCS', age: 5 },
                  { sr: 5, outNo: 'OC-1025', date: '2026-01-20', series: 'SC-MET', code: 'V-9910', name: 'Sigma Metalworks', status: 'OPEN', out: 850, in: 850, bal: 0, unit: 'PCS', age: 87 },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-[#f1f5f9] hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4 text-[12px] font-bold text-[#475569]">{row.sr}</td>
                    <td className="px-4 py-4 text-[13px] font-black text-[#1e293b]">{row.outNo}</td>
                    <td className="px-4 py-4 text-[13px] font-black text-[#1e293b]">{row.date}</td>
                    <td className="px-4 py-4 text-[12px] font-bold text-[#475569]">{row.series}</td>
                    <td className="px-4 py-4 text-[12px] font-bold text-[#475569]">{row.code}</td>
                    <td className="px-4 py-4 text-[13px] font-black text-[#1e293b]">{row.name}</td>
                    <td className="px-4 py-4 text-center">
                      <Box className={`px-3 py-1 rounded-full text-[10px] font-black inline-block ${row.status === 'OPEN' ? 'bg-[#fffbeb] text-[#f59e0b]' : 'bg-[#f0fdf4] text-[#22c55e]'}`}>
                        {row.status}
                      </Box>
                    </td>
                    <td className="px-4 py-4 text-[13px] font-bold text-[#475569] text-center">{row.out}</td>
                    <td className="px-4 py-4 text-[13px] font-bold text-[#475569] text-center">{row.in}</td>
                    <td className="px-4 py-4 text-[13px] font-black text-[#1e293b] text-center">{row.bal}</td>
                    <td className="px-4 py-4 text-[12px] font-black text-[#1e293b] text-center">{row.unit}</td>
                    <td className="px-4 py-4 text-[13px] font-black text-[#1e293b] text-center">{row.age}</td>
                    <td className="px-4 py-4 text-center">
                      <VisibilityIcon className="text-[#2563eb] text-[18px] cursor-pointer" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </Box>

        {/* Section Footer */}
        <Box className="px-7 py-5 bg-[#f8fafc] border-t border-[#f1f5f9] flex items-center justify-between">
          <Typography className="text-[13px] font-black text-[#1e293b]">
            Total Records: <span className="text-[#2563eb]">5</span>
          </Typography>
          <Box className="flex items-center gap-3">
            <Button 
              variant="contained" 
              startIcon={<TableIcon />}
              className="bg-[#059669] hover:bg-[#047857] text-white px-5 h-[38px] rounded-lg font-black shadow-none normal-case text-[12px]"
            >
              EXPORT ITEM WISE
            </Button>
            <Button 
              variant="contained" 
              startIcon={<FileDownloadIcon />}
              className="bg-[#059669] hover:bg-[#047857] text-white px-5 h-[38px] rounded-lg font-black shadow-none normal-case text-[12px]"
            >
              EXPORT
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Subcon;
