import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import "./DashboardNew.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  Cell,
  LabelList,
  PieChart,
  Pie,
  Label,
} from "recharts";

import NavBar from "../NavBar/NavBar";
import SideNav from "../SideNav/SideNav";
import { useNavigate } from "react-router-dom";
import { getDefaultRoute } from "../Service/Erpsetting.jsx";
import PurchaseView from "./Purchase";
import PpcView from "./PPC";
import OeeView from "./OEE";
import QualityView from "./Quality";
import StoresView from "./Stores";
import SubconView from "./Subcon";

/*     Mock Data     */
const areaDataDay = [
  { label: "8am", revenue: 20, sales: 30 },
  { label: "10am", revenue: 35, sales: 42 },
  { label: "12pm", revenue: 28, sales: 55 },
  { label: "2pm", revenue: 50, sales: 38 },
  { label: "4pm", revenue: 42, sales: 62 },
  { label: "6pm", revenue: 65, sales: 48 },
  { label: "8pm", revenue: 55, sales: 70 },
  { label: "10pm", revenue: 48, sales: 58 },
];

const areaDataWeek = [
  { label: "Mon", revenue: 25, sales: 40 },
  { label: "Tue", revenue: 55, sales: 30 },
  { label: "Wed", revenue: 38, sales: 60 },
  { label: "Thu", revenue: 70, sales: 50 },
  { label: "Fri", revenue: 45, sales: 75 },
  { label: "Sat", revenue: 60, sales: 55 },
  { label: "Sun", revenue: 30, sales: 45 },
];

const areaDataMonth = [
  { label: "Apr 1", revenue: 20, sales: 32 },
  { label: "Apr 5", revenue: 40, sales: 55 },
  { label: "Apr 10", revenue: 30, sales: 45 },
  { label: "Apr 15", revenue: 60, sales: 30 },
  { label: "Apr 20", revenue: 50, sales: 68 },
  { label: "Apr 25", revenue: 75, sales: 52 },
  { label: "Apr 30", revenue: 65, sales: 80 },
];

// const profitData = [
//   { label: "Mon", sales: 45, revenue: 60 },
//   { label: "Tue", sales: 55, revenue: 75 },
//   { label: "Wed", sales: 40, revenue: 55 },
//   { label: "Thu", sales: 65, revenue: 80 },
//   { label: "Fri", sales: 50, revenue: 65 },
//   { label: "Sat", sales: 70, revenue: 85 },
//   { label: "Sun", sales: 60, revenue: 78 },
// ];

const deptCards = [
  {
    id: "financial",
    label: "Financial",
    color: "#4f8ef7",
    bg: "linear-gradient(135deg, #e8f0fe 0%, #c7d9fd 100%)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4f8ef7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    id: "purchase",
    label: "Purchase",
    color: "#a855f7",
    bg: "linear-gradient(135deg, #f3e8ff 0%, #ddb6fd 100%)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
    ),
  },
  {
    id: "ppc",
    label: "PPC",
    color: "#f59e0b",
    bg: "linear-gradient(135deg, #fef3c7 0%, #fde08a 100%)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  /* {
    id: "oee",
    label: "OEE",
    color: "#10b981",
    bg: "linear-gradient(135deg, #d1fae5 0%, #6ee7b7 100%)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  }, */
  {
    id: "quality",
    label: "Quality",
    color: "#ef4444",
    bg: "linear-gradient(135deg, #fee2e2 0%, #fca5a5 100%)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    id: "stores",
    label: "Stores",
    color: "#06b6d4",
    bg: "linear-gradient(135deg, #cffafe 0%, #67e8f9 100%)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 8h14M5 8a2 2 0 1 0-4 0v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8a2 2 0 1 0-4 0M5 8V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3" />
      </svg>
    ),
  },
  /* {
    id: "subcon",
    label: "Subcon",
    color: "#f97316",
    bg: "linear-gradient(135deg, #ffedd5 0%, #fdba74 100%)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
      </svg>
    ),
  }, */
];

const alertItems = [
  { id: 1, label: "Pending PO Approval", count: 2, color: "#eff6ff" },
  { id: 2, label: "Pending Inprocess QC", count: 12, color: "#dbeafe" },
  { id: 3, label: "Pending Sales Return QC", count: 7, color: "#bfdbfe" },
  { id: 4, label: "Bill Passing (Purchase)", count: 181, color: "#93c5fd" },
  { id: 5, label: "Bill Passing (Jobwork)", count: 442, color: "#60a5fa" },
  { id: 6, label: "Upcoming Dispatch", count: 8, color: "#3b82f6" },
  { id: 7, label: "Unauthorised BOM", count: 4, color: "#2563eb" },
  { id: 8, label: "Pending Gate Inward Entry", count: 15, color: "#1e3a8a" },
];

const recordItems = [
  { id: 1, name: "Purchase Order", total: 0 },
  { id: 2, name: "Tax Invoice", total: 0 },
  { id: 3, name: "Jobwork Invoice", total: 0 },
  { id: 4, name: "GST Sales Return", total: 0 },
  { id: 5, name: "Debit Note : Purchase Return", total: 0 },
  { id: 6, name: "Debit Note : Sale Rate Diff", total: 0 },
  { id: 7, name: "Proforma Invoice", total: 0 },
  { id: 8, name: "57F4 Outward", total: 0 },
  { id: 9, name: "57F4 Inward", total: 0 },
];

const salesPurchaseRows = [
  { id: 1, type: "Domestic Sales", assessable: "2,66,34,732.06", total: "3,14,28,984.09" },
  { id: 2, type: "Jobwork Sales", assessable: "0.00", total: "0.00" },
  { id: 3, type: "Export Sales", assessable: "15,40,200.00", total: "18,20,000.00" },
  { id: 4, type: "Rate Diff", assessable: "0.00", total: "0.00" },
  { id: 5, type: "Scrap Sales", assessable: "5,38,160.00", total: "6,40,410.40" },
  { id: 6, type: "Total Sales", assessable: "2,87,13,092.06", total: "3,38,89,394.49" },
  { id: 7, type: "Sales Return", assessable: "16,664.02", total: "19,663.54" },
  { id: 8, type: "Purchase", assessable: "2,37,61,388.81", total: "2,80,38,415.23" },
];

const spChartData = [
  { name: "Domestic Sales", amount: 26634732 },
  { name: "Jobwork Sales", amount: 0 },
  { name: "Export Sales", amount: 1540200 },
  { name: "Rate Diff", amount: 0 },
  { name: "Scrap Sales", amount: 538160 },
  { name: "Total Sales", amount: 28713092 },
  { name: "Sales Return", amount: 16664 },
  { name: "Purchase", amount: 23761388 },
];

const accordionList = [
  "Sales & Purchase",
  "Daily Sales",
  "Monthly Sales",
  "Top 5 (Sales) Customer / Item",
  "Item wise Dispatch",
  "Business Plan",
  "State Wise Sales",
];

const storeTabs = [
  "Financial",
  "Purchase",
  "PPC",
  "OEE",
  "Quality",
  "Stores",
  "Subcon",
];

const storeMenuItems = [];

const ppcAccordionList = [
  "Monthly Production Chart",
  "Delivery Performance",
  "Monthly Schedule Vs. Dispatch",
  "Monthly Sales Order Vs. Dispatch",
  "Daily Production",
  "Today's Dispatch Plan",
  "Upcoming Dispatch",
];

  // Daily Sales will be handled in state inside the component


const oeeAccordionList = [
  "Machine Utilization (Groupwise)",
  "Operator Efficiency",
  "Shiftwise OEE",
  "OEE Graph",
];

const oeePieData = [
  { name: "PRODUCTION", value: 100, color: "#16a34a" },
];

const oeeMachineGroups = [
  "DRILLING", "MANUAL", "MILLING", "SECOND OPERATION",
  "SPM", "TAPPING", "TROUB", "VMC"
];

const shiftwiseOeeRowLabels = [
  "EFFICIENCY LOSS", "SETTING CHANGE", "NO TOOL", "NO POWER", "JIGS AND FIX",
  "NO OPERATOR", "SPEED LOSS", "STARTUP LOSS", "BREAK DOWN LOSS", "MAINTENANCE LOSS",
  "QC LOSS", "MEASUR AND AJ", "MINOR STOPPAGE", "LINE ORG LOSS", "TOOL CHANGE",
  "LOGISTIC LOSS", "TOTAL SHIFT HRS", "TOTAL LOSS IN HRS", "NO OF SETTING", "LOSS %",
  "M/C UTILIZATION %"
];

const shiftwiseOeeMachines = [
  "02 SPINDLE (Srimathi Machine)", "TROUB 25 1", "TROUB 25 2", "TROUB 25 3", "TROUB 25 4", "TROUB 25 5",
  "TROUB 25 6", "TROUB 25 7", "TROUB 25 8", "TROUB 25 9", "TROUB 25 10", "TROUB 32 1", "TROUB 32 2",
  "TROUB 32 3", "TROUB 32 4", "TROUB 32 5", "TROUB 32 6", "TROUB 32 7", "TROUB 32 8", "TROUB 25 19",
  "TROUB 25 20", "GRINDING 1", "GRINDING 2", "CENTERLESS GRINDING 1", "MILLING 1", "MILLING 2", "MILLING 3",
  "THREAD ROLLING 1", "THREAD ROLLING 2", "CENTERLESS GRINDING 2", "DRILLING 1", "DRILLING 2", "DRILLING 3",
  "DRILLING 4", "DRILLING 5", "DRILLING 6", "DRILLING 7", "DRILLING 8", "SECOND OPRATION 1",
  "SECOND OPRATION 2", "SECOND OPRATION 3", "SECOND OPRATION 4", "SECOND OPRATION 5", "SECOND OPRATION 6",
  "SECOND OPRATION 7", "SECOND OPRATION 8", "SECOND OPRATION 9", "SECOND OPRATION 10",
  "SPM DRILLING 1", "SPM DRILLING 2", "SPM PCD 1", "SPM MILLING 1", "SPM TROUB 1", "SPM TROUB 2",
  "SPM TAPPING 1", "LATHE 1", "LATHE 2", "LATHE 3", "LATHE 4", "LATHE 5", "TAPPING1",
  "SPM FACING AND CHAMPRING", "INDUCTION1", "CENTERLESS GRINDING 3", "CENTERLESS GRINDING 4",
  "MANAUL", "SECOND OPERATION M/C", "PRES MACHINE", "VMC", "COLT", "COLT1", "SPM DEBBRING", "BG1",
  "PCD DEBURRING 1", "PCD DEBURRING-2", "CNC (Srimathi Machine)", "CNC (Srimathi Machine)1",
  "FINAL INSPECTION", "Visual", "1.5 PCD SPM MACHINE", "SPM DRILLING MB", "TROUB 25 14",
  "TROUB 25 21", "TROUB 25 33", "TROUB 25 41", "TROUB 25 51", "TROUB 25 61", "TROUB 25 71",
  "TROUB 25 81", "TROUB 25 91", "TROUB 25 101", "SECOND OPERATION AY 1", "SECOND OPERATION AY 2",
  "SECOND OPERATION AY 3", "CNC (Srimathi Machine)2", "CNC (Srimathi Machine)3", "TROUB 25 11",
  "TROUB 25 12", "TROUB 25 13", "CNC (Srimathi Machine)4", "SPM M7", "SPM M8 BLEEDER DRILING",
  "SPM M8 BLEEDER DRILLING", "TROUB 25 21", "TROUB 25 22", "TROUB 25 23", "TROUB 25 24", "TROUB 25 25",
  "CENTER LESS GRINDING 5", "SURFACE GRINDING", "TROUB 25 26", "TROUB 25 27", "TROUB 25 28",
  "TROUB 32 29", "TROUB 32 30", "TROUB 25 32", "TROUB894", "TROUB 25 31",
  "CNC (Srimathi Machine)5", "CNC (Srimathi Machine)6", "CNC (Srimathi Machine)7",
  "CNC (Srimathi Machine)8", "Total", "Total LOSS"
];

const purchaseAccordionList = [];

const purchaseOrdersData = [
  { sr: 1, series: "RM", total: 8, amount: 21845 },
  { sr: 2, series: "CONSUMABLE", total: 3, amount: 47289 },
  { sr: 3, series: "SERVICE", total: 4, amount: 29840 },
  { sr: 4, series: "ASSET", total: 0, amount: 0 },
  { sr: 5, series: "JOBWORK", total: 41, amount: 5118 },
  { sr: 6, series: "IMPORT", total: 0, amount: 0 },
];

const purchasePieData = [
  { name: "CONSUMABLE", value: 45.43, color: "#f59e0b" },
  { name: "SERVICE", value: 28.67, color: "#dc2626" },
  { name: "RM", value: 20.99, color: "#3b82f6" },
  { name: "JOBWORK", value: 4.92, color: "#6366f1" },
  { name: "ASSET", value: 0, color: "#10b981" },
  { name: "IMPORT", value: 0, color: "#ec4899" },
];

const monthlyPurchaseChartData = [
  { month: "Apr-2026", value: 237.61 },
  { month: "May-2026", value: 0 },
  { month: "Jun-2026", value: 0 },
  { month: "Jul-2026", value: 0 },
  { month: "Aug-2026", value: 0 },
  { month: "Sep-2026", value: 0 },
  { month: "Oct-2026", value: 0 },
  { month: "Nov-2026", value: 0 },
  { month: "Dec-2026", value: 0 },
  { month: "Jan-2027", value: 0 },
  { month: "Feb-2027", value: 0 },
  { month: "Mar-2027", value: 0 },
];

const dailyPurchaseChartData = Array.from({ length: 31 }, (_, i) => {
  const day = i + 1;
  let value = 0;
  if (day === 2) value = 800000;
  if (day === 3) value = 3200000;
  if (day === 4) value = 5000000;
  if (day === 5) value = 250000;
  if (day === 6) value = 3150000;
  if (day === 7) value = 2400000;
  if (day === 8) value = 2500000;
  if (day === 9) value = 3000000;
  if (day === 10) value = 2800000;
  if (day === 11) value = 80000;
  return { day: day.toString(), value };
});

const dailyActiveDispatchesData = [
  { day: "1", count: 12 }, { day: "2", count: 18 }, { day: "3", count: 24 }, { day: "4", count: 22 },
  { day: "5", count: 30 }, { day: "6", count: 22 }, { day: "7", count: 28 }, { day: "8", count: 35 },
  { day: "9", count: 32 }, { day: "10", count: 42 }, { day: "11", count: 38 }, { day: "12", count: 15 },
  { day: "13", count: 20 }, { day: "14", count: 27 }, { day: "15", count: 33 },
];

const purchaseCostDetailedData = [
  { month: "Jan-26", value: 110 }, { month: "Feb-26", value: 135 }, { month: "Mar-26", value: 182 },
  { month: "Apr-26", value: 245 }, { month: "May-26", value: 145 }, { month: "Jun-26", value: 205 },
  { month: "Jul-26", value: 228 }, { month: "Aug-26", value: 202 },
];

const top5DetailedSuppliers = [
  { sr: 1, name: "S0053 | VISHWA SAMRUDHI INDUSTRIES", qty: 120410, amount: 9388097.5, per: "39.75%" },
  { sr: 2, name: "54 | SHAKAMBHARI ENTERPRISES", qty: 390997, amount: 7525697.1, per: "31.87%" },
  { sr: 3, name: "S0052 | TUBE INVESTMENT OF INDIA LTD", qty: 32576.64, amount: 5038059.7955, per: "21.33%" },
  { sr: 4, name: "000161 | Ayush Enterprises (C-242)", qty: 335564, amount: 1540067.17, per: "6.52%" },
  { sr: 5, name: "S0051 | S K FASTENERS", qty: 252700, amount: 124093, per: "0.53%" },
];



const grnValueSummaryData = [
  { name: "FG", value: 9318357.27, color: "#f59e0b" },
  { name: "RM", value: 14426157.3, color: "#ef4444" },
  { name: "Consumable", value: 16854.24, color: "#3b82f6" },
  { name: "Others", value: 450200, color: "#06b6d4" },
  { name: "Spare", value: 120500.5, color: "#6366f1" },
];

const poCategoriesTableData = [
  { id: "CAT-10", name: "Raw Material", count: 27, load: "$22,025" },
  { id: "CAT-11", name: "Job Work", count: 18, load: "$98,396" },
  { id: "CAT-12", name: "Job Work", count: 50, load: "$32,260" },
  { id: "CAT-13", name: "Asset Logistics", count: 40, load: "$82,722" },
  { id: "CAT-14", name: "Job Work", count: 8, load: "$127,266" },
  { id: "CAT-15", name: "Consumable", count: 31, load: "$66,353" },
];

const detailedGrnValuesData = [
  { id: "GRN-88103", itemNo: "ITM-X1237", desc: "GEAR LUBRICANT", group: "CONSUMABLE", qty: 238, rate: 47.11, amount: 11200.00, badge: 'blue' },
  { id: "GRN-88104", itemNo: "ITM-X7491", desc: "STEEL SHAFT A2", group: "RAW MATERIAL", qty: 388, rate: 56.16, amount: 20876.00, badge: 'red' },
  { id: "GRN-88105", itemNo: "ITM-X4727", desc: "WRA HOUSING", group: "CONSUMABLE", qty: 460, rate: 81.70, amount: 38884.00, badge: 'blue' },
  { id: "GRN-88106", itemNo: "ITM-X7822", desc: "GEAR LUBRICANT", group: "SPARE PARTS", qty: 175, rate: 58.27, amount: 11196.00, badge: 'yellow' },
  { id: "GRN-88107", itemNo: "ITM-X5769", desc: "STEEL SHAFT A2", group: "RAW MATERIAL", qty: 464, rate: 24.46, amount: 50399.00, badge: 'red' },
  { id: "GRN-88108", itemNo: "ITM-X1520", desc: "HDPE PLASTIC RESIN", group: "RAW MATERIAL", qty: 331, rate: 76.97, amount: 25858.00, badge: 'red' },
  { id: "GRN-88109", itemNo: "ITM-X1117", desc: "BEARING SET X", group: "CONSUMABLE", qty: 453, rate: 85.26, amount: 6832.00, badge: 'blue' },
  { id: "GRN-88110", itemNo: "ITM-X9129", desc: "STEEL SHAFT A2", group: "HARDWARE", qty: 445, rate: 39.63, amount: 5051.00, badge: 'yellow' },
  { id: "GRN-88117", itemNo: "ITM-X8907", desc: "BEARING SET X", group: "SPARE PARTS", qty: 467, rate: 11.61, amount: 12431.00, badge: 'yellow' },
  { id: "GRN-88118", itemNo: "ITM-X5567", desc: "BUTTON SCREW M-5 X 12", group: "RAW MATERIAL", qty: 469, rate: 37.29, amount: 11604.00, badge: 'red' },
  { id: "GRN-88119", itemNo: "ITM-X5986", desc: "BEARING SET X", group: "CONSUMABLE", qty: 199, rate: 14.44, amount: 29602.00, badge: 'blue' },
  { id: "GRN-88120", itemNo: "ITM-X4698", desc: "WRA HOUSING", group: "CONSUMABLE", qty: 384, rate: 98.77, amount: 1340.00, badge: 'blue' },
  { id: "GRN-88121", itemNo: "ITM-X5920", desc: "HDPE PLASTIC RESIN", group: "SPARE PARTS", qty: 231, rate: 48.24, amount: 50501.00, badge: 'yellow' },
  { id: "GRN-88122", itemNo: "ITM-X2829", desc: "BEARING SET X", group: "RAW MATERIAL", qty: 488, rate: 9.82, amount: 35617.00, badge: 'red' },
  { id: "GRN-88123", itemNo: "ITM-X4083", desc: "WRA HOUSING", group: "SPARE PARTS", qty: 494, rate: 63.79, amount: 33673.00, badge: 'yellow' },
  { id: "GRN-88124", itemNo: "ITM-X5369", desc: "BUTTON SCREW M-5 X 12", group: "HARDWARE", qty: 74, rate: 15.13, amount: 45277.00, badge: 'yellow' },
];

const grnValueDetailsData = [
  { sr: 1, itemNo: "CONGN1261", desc: "PLAIN WASHER M-12(1/2\")", mgroup: "Consumable", group: "GENRAL", qty: 20, amt: 24 },
  { sr: 2, itemNo: "CONGN12497", desc: "BUTTON SCREW M-5 X 12", mgroup: "Consumable", group: "GENRAL", qty: 20, amt: 49.6 },
  { sr: 3, itemNo: "CONGN1312", desc: "M-5 X 20 ALLEN BOLT", mgroup: "Consumable", group: "GENRAL", qty: 30, amt: 57.84 },
  { sr: 4, itemNo: "CONMC1292", desc: "M-5 X 25 ALLEN BOLT", mgroup: "Consumable", group: "MACHINE SPARE", qty: 30, amt: 61.92 },
  { sr: 5, itemNo: "CONGN12735", desc: "W.P. PAPER 400 JAWAN CUMI", mgroup: "Consumable", group: "GENRAL", qty: 5, amt: 71.4 },
  { sr: 6, itemNo: "CONGN12543", desc: "ALLEN KEY M-4 UNBRAKO", mgroup: "Consumable", group: "GENRAL", qty: 10, amt: 82.96 },
  { sr: 7, itemNo: "CONGN1077", desc: "M-5 X 16 ALLEN BOLT", mgroup: "Consumable", group: "GENRAL", qty: 50, amt: 89.8 },
  { sr: 8, itemNo: "CONGN1244", desc: "ALLEN KEY 5.00 MM", mgroup: "Consumable", group: "GENRAL", qty: 10, amt: 101.2 }
];


const operatorEfficiencyData = [
  { name: "JADHAV VINOD [1]", efficiency: 265 },
  { name: "BAPU GAYKE [2]", efficiency: 238 },
  { name: "AMIT MAGRE [3]", efficiency: 235 },
  { name: "TULSHIRAM [4]", efficiency: 228 },
  { name: "SHYAM [5]", efficiency: 210 },
  { name: "SHYAM DEGALWADE [6]", efficiency: 185 },
  { name: "RAVINDRA GAJABE [7]", efficiency: 165 },
  { name: "ASHISH MORE [8]", efficiency: 162 },
  { name: "RAVI [9]", efficiency: 155 },
  { name: "JAY SHAH [10]", efficiency: 152 },
  { name: "RAMESH NIKALJE [11]", efficiency: 148 },
  { name: "GUDIYA PCD SPM [12]", efficiency: 142 },
  { name: "SHARQ CNC [13]", efficiency: 135 },
  { name: "SANTOSH H [14]", efficiency: 130 },
  { name: "JITENDRA [15]", efficiency: 125 },
  { name: "SAMEIR I [16]", efficiency: 120 },
  { name: "SIDDIQUI E [17]", efficiency: 115 },
  { name: "RAEES [18]", efficiency: 110 },
  { name: "ALTAB [19]", efficiency: 105 },
  { name: "MUNNA DEBRING [20]", efficiency: 100 },
  { name: "MORE [21]", efficiency: 95 },
  { name: "AY [22]", efficiency: 140 },
  { name: "MAHIPAL [23]", efficiency: 138 },
  { name: "POONAM TAPPING [24]", efficiency: 135 },
  { name: "SHAHID CNC [25]", efficiency: 132 },
  { name: "SACHIN [26]", efficiency: 130 },
  { name: "OM PRAKASH [27]", efficiency: 128 },
  { name: "MANGESH H MANKAR [28]", efficiency: 125 },
  { name: "NANDU BAHURIYA [29]", efficiency: 122 },
  { name: "RAJU [30]", efficiency: 120 },
  { name: "UMESH SPM [31]", efficiency: 118 },
  { name: "NEW (L) [32]", efficiency: 115 },
  { name: "SHIVA [33]", efficiency: 112 },
  { name: "NEW [34]", efficiency: 110 },
  { name: "MUNAJIR CNC [35]", efficiency: 108 },
  { name: "ANITA BAI [36]", efficiency: 105 },
  { name: "DHARMENDRA YADAV [37]", efficiency: 102 },
  { name: "ASHOK THILLARE [38]", efficiency: 98 },
  { name: "KAILU CNC [39]", efficiency: 95 },
  { name: "SALMAN PATHAN [40]", efficiency: 92 },
  { name: "GAUTAM [41]", efficiency: 88 },
  { name: "IMRAN [42]", efficiency: 85 },
  { name: "ANKET [43]", efficiency: 82 },
  { name: "DONGRE [44]", efficiency: 80 },
];

const inwardStockData = [
  { name: "Adjustment", value: 45, color: "#f59e0b" },
  { name: "Opening", value: 85, color: "#64748b" },
  { name: "Production", value: 120, color: "#f97316" },
  { name: "Purchase GRN", value: 340, color: "#3b82f6" },
  { name: "Return Inward", value: 65, color: "#0ea5e9" },
  { name: "Transfer In", value: 40, color: "#ef4444" },
];

const outwardStockData = [
  { name: "Damage", value: 15, color: "#f59e0b" },
  { name: "Issue", value: 55, color: "#8b5cf6" },
  { name: "Return", value: 25, color: "#3b82f6" },
  { name: "Sales", value: 180, color: "#ef4444" },
  { name: "Sample", value: 10, color: "#64748b" },
  { name: "Transfer Out", value: 35, color: "#0ea5e9" },
];

const minMaxAlertsData = [
  { location: "RM", itemCode: "ITEM-1000", desc: "Industrial Specification Compo...", min: "144 KG", reorder: "164 KG", max: "576 KG", stock: "771 KG", wo: 4, variance: 627, status: "OVERSTOCK" },
  { location: "RM", itemCode: "ITEM-1001", desc: "Industrial Specification Compo...", min: "149 LTR", reorder: "169 LTR", max: "596 LTR", stock: "206 LTR", wo: 7, variance: 57, status: "HEALTHY" },
  { location: "Spares", itemCode: "ITEM-1002", desc: "Industrial Specification Compo...", min: "34 LTR", reorder: "54 LTR", max: "136 LTR", stock: "323 LTR", wo: 24, variance: 289, status: "OVERSTOCK" },
  { location: "Hardware", itemCode: "ITEM-1003", desc: "Industrial Specification Compo...", min: "33 LTR", reorder: "53 LTR", max: "132 LTR", stock: "66 LTR", wo: 71, variance: 33, status: "HEALTHY" },
  { location: "RM", itemCode: "ITEM-1004", desc: "Industrial Specification Compo...", min: "187 LTR", reorder: "207 LTR", max: "748 LTR", stock: "84 LTR", wo: 44, variance: -123, status: "CRITICAL" },
  { location: "Consumable", itemCode: "ITEM-1005", desc: "Industrial Specification Compo...", min: "35 BX", reorder: "55 BX", max: "140 BX", stock: "643 BX", wo: 54, variance: 608, status: "OVERSTOCK" },
];

const materialChallanLogs = [
  { no: "CHL-88200", itemNo: "IT001", target: "Detailed Issue log for engineer...", grp: "CONSUMABLE", qty: "308 PCS", rate: "$236", value: "$72,688" },
  { no: "CHL-88201", itemNo: "IT002", target: "Detailed Issue log for engineer...", grp: "CONSUMABLE", qty: "101 PCS", rate: "$80", value: "$8,080" },
  { no: "CHL-88202", itemNo: "IT003", target: "Detailed Issue log for engineer...", grp: "HARDWARE", qty: "44 PCS", rate: "$231", value: "$10,164" },
  { no: "CHL-88203", itemNo: "IT004", target: "Detailed Issue log for engineer...", grp: "CONSUMABLE", qty: "73 PCS", rate: "$158", value: "$11,534" },
  { no: "CHL-88204", itemNo: "IT005", target: "Detailed Issue log for engineer...", grp: "SPARE", qty: "299 PCS", rate: "$162", value: "$48,438" },
];

const machineOeeData = [
  { name: "PCD DRILL 4.5", avail: 45, quality: 5, perf: 45, oee: 2 },
  { name: "SPM PRO J15", avail: 25, quality: 3, perf: 65, oee: 1 },
  { name: "DRILLING-01", avail: 44, quality: 1, perf: 85, oee: 1 },
  { name: "DRILLING-02", avail: 28, quality: 9, perf: 135, oee: 3 },
  { name: "DRILLING-03", avail: 30, quality: 8, perf: 185, oee: 2 },
  { name: "DRILLING-04", avail: 15, quality: 7, perf: 110, oee: 1 },
  { name: "DRILLING-05", avail: 14, quality: 6, perf: 155, oee: 1 },
  { name: "DRILLING-06", avail: 16, quality: 5, perf: 235, oee: 2 },
  { name: "DRILLING-07", avail: 12, quality: 4, perf: 105, oee: 1 },
  { name: "DRILLING-08", avail: 13, quality: 3, perf: 95, oee: 1 },
  { name: "DRILLING-09", avail: 11, quality: 2, perf: 125, oee: 1 },
  { name: "DRILLING-10", avail: 18, quality: 1, perf: 145, oee: 1 },
  { name: "MILLING-01", avail: 15, quality: 8, perf: 115, oee: 1 },
  { name: "MILLING-02", avail: 14, quality: 7, perf: 95, oee: 1 },
  { name: "MILLING-03", avail: 16, quality: 6, perf: 135, oee: 1 },
  { name: "MILLING-04", avail: 12, quality: 5, perf: 85, oee: 1 },
  { name: "MILLING-05", avail: 13, quality: 4, perf: 105, oee: 1 },
  { name: "SPM-01", avail: 24, quality: 3, perf: 265, oee: 2 },
  { name: "SPM-02", avail: 22, quality: 2, perf: 235, oee: 2 },
  { name: "SPM-03", avail: 20, quality: 1, perf: 215, oee: 2 },
  { name: "SPM-04", avail: 40, quality: 8, perf: 115, oee: 4 },
  { name: "TAPPING-01", avail: 15, quality: 5, perf: 135, oee: 1 },
  { name: "TAPPING-02", avail: 14, quality: 6, perf: 115, oee: 1 },
  { name: "TAPPING-03", avail: 18, quality: 4, perf: 95, oee: 1 },
  { name: "VMC-01", avail: 85, quality: 90, perf: 385, oee: 30 },
  { name: "VMC-02", avail: 15, quality: 5, perf: 215, oee: 1 },
  { name: "TROUB-01", avail: 14, quality: 4, perf: 195, oee: 1 },
  { name: "TROUB-02", avail: 18, quality: 3, perf: 175, oee: 1 },
  { name: "MANUAL-01", avail: 12, quality: 12, perf: 105, oee: 2 },
  { name: "MANUAL-02", avail: 16, quality: 10, perf: 135, oee: 2 },
];

const CustomXAxisTick = (props) => {
  const { x, y, payload } = props;
  const words = payload.value.split(' ');
  return (
    <g transform={`translate(${x},${y})`}>
      {words.map((word, index) => (
        <text
          key={index}
          x={0}
          y={index * 12}
          dy={12}
          textAnchor="middle"
          fill="#1e293b"
          style={{ fontSize: 9, fontWeight: 700 }}
        >
          {word}
        </text>
      ))}
    </g>
  );
};

const subconAccordionList = [
  "57F4 Challan Ageing",
];

const subconAgeingTableData = [
  { sr: 1, outNo: "OC/26-27/001", outDate: "10/04/2026", series: "OC", suppCode: "V001", supplierName: "PRIME INDUSTRIES", status: "Open", out: 100, inn: 0, bal: 100, unit: "NOS", ageDays: 1, view: "View" },
];

const monthlySalesData = [
  { month: "Apr-2026", sales: 271.73 },
  { month: "May-2026", sales: 0 },
  { month: "Jun-2026", sales: 0 },
  { month: "Jul-2026", sales: 0 },
  { month: "Aug-2026", sales: 0 },
  { month: "Sep-2026", sales: 0 },
  { month: "Oct-2026", sales: 0 },
  { month: "Nov-2026", sales: 0 },
  { month: "Dec-2026", sales: 0 },
  { month: "Jan-2027", sales: 0 },
  { month: "Feb-2027", sales: 0 },
  { month: "Mar-2027", sales: 0 },
];

const initialTop5SalesData = [
  { name: "VISHWA S.I LTD", value: 125.5, fill: "#3b82f6" }, { name: "TECHNO CORP", value: 98.2, fill: "#10b981" },
  { name: "GLOBAL MFG", value: 75.8, fill: "#f59e0b" }, { name: "PRECISION INC", value: 45.0, fill: "#8b5cf6" },
  { name: "ALPHA IND", value: 32.1, fill: "#06b6d4" },
];

const initialItemWiseDispatchData = [
  { sr: 1, customer: "AURANGABAD PRES SING GST", itemNo: "FG1001", itemCode: "520MC00712", itemDesc: "PINION (N)", qty: 6000, amount: 22920 },
  { sr: 2, customer: "SRI CHANIKYA TECH COMPONENTS GST", itemNo: "FG1001", itemCode: "520MC00712", itemDesc: "PINION (N)", qty: 5000, amount: 19000 },
  { sr: 3, customer: "ENDURANCE TECHNOLOGIES LTD (DISC BRAKE) GST", itemNo: "FG1003", itemCode: "B2AW002260", itemDesc: "BLEEDER SCREW - REML", qty: 11000, amount: 48290 },
  { sr: 4, customer: "ENDURANCE TECHNOLOGIES LTD (DISC BREAK DIVISION E-7 1) GST", itemNo: "FG1003", itemCode: "B2AW002260", itemDesc: "BLEEDER SCREW - REML", qty: 5000, amount: 21950 },
  { sr: 5, customer: "ENDURANCE TECHNOLOGIES LTD (DISC BREAK DIVISION E-7", itemNo: "FG1005", itemCode: "520AW00212", itemDesc: "BLEEDER SCREW(M7)", qty: 7000, amount: 27020 },
];

const initialBusinessPlanData = [
  { name: "Bus. plan Qty", value: 0 },
  { name: "Schedule Qty", value: 0 },
  { name: "Invoice Qty", value: 0 },
  { name: "Sch Qty Actual", value: 13124665 },
  { name: "Inv Qty Actual", value: 2992500 },
];

const initialStateWiseSalesData = [
  { name: "MAHARASHTRA", value: 19877002.64, total: 23460244.98, percent: 73.15, fill: "#007bff" },
  { name: "GUJRAT", value: 5248981.78, total: 6193798.51, percent: 19.32, fill: "#f59e0b" },
  { name: "KARNATAKA", value: 1029637.16, total: 1214971.82, percent: 3.79, fill: "#0ea5e9" },
  { name: "UTTARAKHAND", value: 1017270.48, total: 1200379.18, percent: 3.74, fill: "#ef4444" },
];

const ppcDeliveryData = [
  { month: "APR-2026", schedule: 13124665, dispatch: 2948140 },
  { month: "MAY-2026", schedule: 0, dispatch: 0 },
  { month: "JUN-2026", schedule: 0, dispatch: 0 },
];

const ppcMonthlySchData = [
  { sr: 1, itemNo: "FG1023", itemCode: "S2DP01702B", desc: "EXTENSION 17 RH", planQty: 1000, dispatchQty: 0, balQty: 1000, per: 0 },
  { sr: 2, itemNo: "FG1029", itemCode: "S2CW00712B", desc: "D-NUT-YAMAHA(2GS)", planQty: 3000, dispatchQty: 0, balQty: 3000, per: 0 },
  { sr: 3, itemNo: "FG1032", itemCode: "530CW00207", desc: "D-NUT P/C MATT BLACK", planQty: 25000, dispatchQty: 0, balQty: 25000, per: 0 },
  { sr: 4, itemNo: "FG1033", itemCode: "52CW00412B", desc: "D-NUT(5.35MM)POWDER COATING", planQty: 1000, dispatchQty: 0, balQty: 1000, per: 0 },
  { sr: 5, itemNo: "FG1035", itemCode: "520DP00502", desc: "EXTENSION (14X18.5)", planQty: 4000, dispatchQty: 0, balQty: 4000, per: 0 },
];

const ppcSalesOrderData = [
  { sr: 1, custPo: "1100042376", itemNo: "FG1696", itemCode: "F2PH04202B", desc: "VALVE RETAINER K301  33 THK 2.5", poQty: 200, dispatch: 200, bal: 0, per: 100 },
  { sr: 2, custPo: "1100042224", itemNo: "FG1711", itemCode: "52H569143B", desc: "OUTER TUBE-2WH REAR", poQty: 20, dispatch: 0, bal: 20, per: 0 },
  { sr: 3, custPo: "1100042106", itemNo: "FG1702", itemCode: "F2HL05902B", desc: "OIL LOCK COLLAR K 406 -  33", poQty: 50, dispatch: 0, bal: 50, per: 0 },
  { sr: 4, custPo: "SEPL 25-26/307", itemNo: "FG1074", itemCode: "S2PA01902B", desc: "TUBE RING J1A OPTION", poQty: 100, dispatch: 0, bal: 100, per: 0 },
  { sr: 5, custPo: "1100042376", itemNo: "FG1697", itemCode: "F2HL05802B", desc: "OIL LOCK COLLAR K301", poQty: 120, dispatch: 0, bal: 120, per: 0 },
];

const ppcDailyProdData = [
  { sr: 1, date: "10/04/2026", machine: "TR1 TROUB 25 1", shift: "SECOND 10HRS", item: "FG1014 PRIMARY PISTON FOR TMC", prodQty: 2796, rework: 0, reject: 0 },
  { sr: 2, date: "10/04/2026", machine: "TR4 TROUB 25 4", shift: "SECOND 10HRS", item: "FG1263 CAP OIL LOCK J1D FF (10 mm taper)", prodQty: 1588, rework: 0, reject: 0 },
  { sr: 3, date: "10/04/2026", machine: "TR7 TROUB 25 7", shift: "SECOND 10HRS", item: "FG1018 SECONDARY PISTON FOR TMC", prodQty: 1315, rework: 0, reject: 0 },
  { sr: 4, date: "10/04/2026", machine: "TR11 TROUB 32 1", shift: "SECOND 10HRS", item: "FG1145 WHEEL CYLINDER PISTON (Dia 25.4), ATUL", prodQty: 1040, rework: 0, reject: 0 },
  { sr: 5, date: "10/04/2026", machine: "TR19 TROUB 25 19", shift: "SECOND 10HRS", item: "FG1083 CAP OIL LOCK-DF01 (F)", prodQty: 850, rework: 0, reject: 0 },
];

const ppcTodayDispatchData = [
  { sr: 1, docNo: "SCH/25-26/001", docDate: "11/04/2026", itemCode: "520MC00712", desc: "PINION (N)", qty: 2000, customer: "AURANGABAD PRES" },
  { sr: 2, docNo: "SCH/25-26/002", docDate: "11/04/2026", itemCode: "B2AW002260", desc: "BLEEDER SCREW", qty: 5000, customer: "ENDURANCE TECH" },
];

const ppcUpcomingDispatchData = [
  { sr: 1, docNo: "SCH/25-26/005", docDate: "15/04/2026", itemCode: "S2PA01902B", desc: "TUBE RING J1A", qty: 1500, customer: "SEPL" },
  { sr: 2, docNo: "SCH/25-26/008", docDate: "18/04/2026", itemCode: "F2HL05802B", desc: "OIL LOCK COLLAR", qty: 3000, customer: "TECHNO CORP" },
];

const ppcMonthlyProdData = [
  { sr: 1, machineGroup: "MACHINING", qty: 1707810, mt: 96.78 },
];

const ppcMonthlyProdChartData = [
  { name: "MACHINING", mt: 96.78 },
];

/*     Quality Mock Data     */
const qcAccordionList = [
  "Trend of Rejection % at Operation Level",
  "Itemwise Reject",
  "Itemwise Rework",
  "Scrap Value Report",
  "Sales Return (Customer)",
  "Customer Complaint CAPA",
];

const qcRejectionTrendData = [
  { date: "1", percentage: 0, ppm: 0 },
  { date: "2", percentage: 0.2, ppm: 2000 },
  { date: "3", percentage: 0.15, ppm: 1500 },
  { date: "4", percentage: 0.2, ppm: 2000 },
  { date: "5", percentage: 0.1, ppm: 1000 },
  { date: "6", percentage: 0.3, ppm: 3000 },
  { date: "7", percentage: 0.35, ppm: 3500 },
  { date: "8", percentage: 0.6, ppm: 6000 },
  { date: "9", percentage: 0.7, ppm: 7000 },
  { date: "10", percentage: 0.5, ppm: 5000 },
  { date: "11", percentage: 0, ppm: 0 },
  { date: "12", percentage: 0, ppm: 0 },
  { date: "13", percentage: 0, ppm: 0 },
  { date: "14", percentage: 0, ppm: 0 },
  { date: "15", percentage: 0, ppm: 0 },
  { date: "16", percentage: 0, ppm: 0 },
  { date: "17", percentage: 0, ppm: 0 },
  { date: "18", percentage: 0, ppm: 0 },
  { date: "19", percentage: 0, ppm: 0 },
  { date: "20", percentage: 0, ppm: 0 },
  { date: "21", percentage: 0, ppm: 0 },
  { date: "22", percentage: 0, ppm: 0 },
  { date: "23", percentage: 0, ppm: 0 },
  { date: "24", percentage: 0, ppm: 0 },
  { date: "25", percentage: 0, ppm: 0 },
  { date: "26", percentage: 0, ppm: 0 },
  { date: "27", percentage: 0, ppm: 0 },
  { date: "28", percentage: 0, ppm: 0 },
  { date: "29", percentage: 0, ppm: 0 },
  { date: "30", percentage: 0, ppm: 0 },
];

const qcSalesReturnData = [
  { month: "Apr-2026", qty: 973 },
  { month: "May-2026", qty: 0 },
  { month: "Jun-2026", qty: 0 },
  { month: "Jul-2026", qty: 0 },
  { month: "Aug-2026", qty: 0 },
  { month: "Sep-2026", qty: 0 },
  { month: "Oct-2026", qty: 0 },
  { month: "Nov-2026", qty: 0 },
  { month: "Dec-2026", qty: 0 },
  { month: "Jan-2027", qty: 0 },
  { month: "Feb-2027", qty: 0 },
  { month: "Mar-2027", qty: 0 },
];

const qcSalesReturnTableData = [
  { sr: 1, month: "Apr-2026", custCount: 7, itemCount: 7, itemQty: 973, itemValue: 16747.76 },
  { sr: 2, month: "May-2026", custCount: 0, itemCount: 0, itemQty: 0, itemValue: 0 },
  { sr: 3, month: "Jun-2026", custCount: 0, itemCount: 0, itemQty: 0, itemValue: 0 },
  { sr: 4, month: "Jul-2026", custCount: 0, itemCount: 0, itemQty: 0, itemValue: 0 },
  { sr: 5, month: "Aug-2026", custCount: 0, itemCount: 0, itemQty: 0, itemValue: 0 },
  { sr: 6, month: "Sep-2026", custCount: 0, itemCount: 0, itemQty: 0, itemValue: 0 },
];

const qcItemWiseRejectData = [
  { sr: 1, itemNo: "FG1106", itemCode: "550BZ05B02", partNo: "GR1FG1106", desc: "CAP OIL LOCK -PRFH006 (H)", opNo: 30, prodQty: 1639, rejQty: 120, per: "7.322%", ppm: 73220 },
  { sr: 2, itemNo: "FG1084", itemCode: "520BZ00102", partNo: "GR1FG1084", desc: "CAP OIL LOCK-LML", opNo: 30, prodQty: 8573, rejQty: 290, per: "3.383%", ppm: 33830 },
  { sr: 3, itemNo: "FG1083", itemCode: "550BZ01402", partNo: "GR1FG1083", desc: "CAP OIL LOCK-DF01 (F)", opNo: 30, prodQty: 7947, rejQty: 200, per: "2.517%", ppm: 25170 },
  { sr: 4, itemNo: "FG1084", itemCode: "520BZ00102", partNo: "PDFG1084", desc: "CAP OIL LOCK-LML", opNo: 10, prodQty: 1524, rejQty: 18, per: "1.181%", ppm: 11810 },
  { sr: 5, itemNo: "FG1083", itemCode: "550BZ01402", partNo: "PDFG1083", desc: "CAP OIL LOCK-DF01 (F)", opNo: 10, prodQty: 4275, rejQty: 28, per: "0.655%", ppm: 6550 },
  { sr: 6, itemNo: "FG1263", itemCode: "F2BZ05712B", partNo: "PDFG1263", desc: "CAP OIL LOCK J1D FF (10 mm taper)", opNo: 10, prodQty: 2801, rejQty: 18, per: "0.643%", ppm: 6430 },
];

const qcReasonWiseRejectData = [
  { sr: 1, reason: "LENGTH U/S", prodQty: 26759, rejQty: 674, per: "2.519%", ppm: 25190 },
  { sr: 2, reason: "END PIECE", prodQty: 10629, rejQty: 41, per: "0.386%", ppm: 3860 },
  { sr: 3, reason: "End Pieces", prodQty: 1810, rejQty: 8, per: "0.442%", ppm: 4420 },
];

const qcRejectPieData = [
  { name: "LENGTH U/S", value: 674, percent: 93.22, qty: 674, color: "#4285f4" },
  { name: "END PIECE", value: 41, percent: 5.67, qty: 41, color: "#fb8c00" },
  { name: "End Pieces", value: 8, percent: 1.11, qty: 8, color: "#10b981" },
];

const qcReworkPieData = [
  { name: "LENGTH", value: 737, percent: 75.13, qty: 737, color: "#1e3a8a" },
  { name: "ANGALOUT", value: 78, percent: 7.95, qty: 78, color: "#60a5fa" },
  { name: "ANGAL STEP", value: 37, percent: 3.77, qty: 37, color: "#f97316" },
  { name: "FLAT CHAMFER", value: 80, percent: 8.15, qty: 80, color: "#fbbf24" },
  { name: "INSERT MARK", value: 46, percent: 4.69, qty: 46, color: "#94a3b8" },
  { name: "face unclean", value: 3, percent: 0.31, qty: 3, color: "#22d3ee" },
];

const qcItemWiseReworkData = [
  { sr: 1, itemNo: "ITM001", itemCode: "C-101", partNo: "P-505", desc: "ROD END BEARING", opNo: "OP-10", prodQty: 3562, rewQty: 37, per: "1.039 %", ppm: 10390 },
  { sr: 2, itemNo: "ITM002", itemCode: "C-102", partNo: "P-506", desc: "FLANGE PLATE", opNo: "OP-20", prodQty: 9060, rewQty: 78, per: "0.861 %", ppm: 8610 },
  { sr: 3, itemNo: "ITM003", itemCode: "C-103", partNo: "P-507", desc: "SPACER RING", opNo: "OP-10", prodQty: 1150, rewQty: 3, per: "0.261 %", ppm: 2610 },
  { sr: 4, itemNo: "ITM004", itemCode: "C-104", partNo: "P-508", desc: "BEARING HOUSING", opNo: "OP-30", prodQty: 17595, rewQty: 80, per: "0.455 %", ppm: 4550 },
  { sr: 5, itemNo: "ITM005", itemCode: "C-105", partNo: "P-509", desc: "SHAFT COLLAR", opNo: "OP-10", prodQty: 14994, rewQty: 46, per: "0.307 %", ppm: 3070 },
];

const qcReasonWiseReworkData = [
  { sr: 1, reason: "ANGAL STEP", prodQty: 3562, rewQty: 37, per: "1.039 %", ppm: 10390 },
  { sr: 2, reason: "ANGALOUT", prodQty: 9060, rewQty: 78, per: "0.861 %", ppm: 8610 },
  { sr: 3, reason: "face unclean", prodQty: 1150, rewQty: 3, per: "0.261 %", ppm: 2610 },
  { sr: 4, reason: "FLAT CHAMFER", prodQty: 17595, rewQty: 80, per: "0.455 %", ppm: 4550 },
  { sr: 5, reason: "INSERT MARK", prodQty: 14994, rewQty: 46, per: "0.307 %", ppm: 3070 },
  { sr: 6, reason: "LENGTH O/S", prodQty: 27805, rewQty: 737, per: "2.651 %", ppm: 26510 },
];

const qcScrapValueData = [
  { sr: 1, itemCode: "ITM201", desc: "END PLATE (MACHINED)", qty: 450, value: 125000 },
  { sr: 2, itemCode: "ITM202", desc: "HOUSING COVER (CASTING)", qty: 320, value: 89600 },
  { sr: 3, itemCode: "ITM203", desc: "GEAR HUB (FORGED)", qty: 180, value: 50400 },
  { sr: 4, itemCode: "ITM204", desc: "ADAPTER RING", qty: 95, value: 26600 },
  { sr: 5, itemCode: "ITM205", desc: "FLANGE COUPLING", qty: 60, value: 16800 },
];

const qcComplaintCapaData = [
  { month: "APR-2026", total: 0, completed: 0 },
  { month: "MAY-2026", total: 0, completed: 0 },
];

const qcComplaintTableData = [
  { sr: 1, type: "Total Complaints", apr: 0, may: 0 },
  { sr: 2, type: "Completed Complaints", apr: 0, may: 0 },
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

  // Defensive checks to prevent "Cannot read properties of undefined (reading '0')"
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

const getBpMonths = (financialYear) => {
  const [startYearStr, endYearStr] = financialYear.split("-");
  const startYear = parseInt(startYearStr);
  let endYear = parseInt(endYearStr);
  if (endYear < 100) {
    endYear = Math.floor(startYear / 100) * 100 + endYear;
  }
  
  return [
    { label: `APR-${startYear}`, month: 4 },
    { label: `MAY-${startYear}`, month: 5 },
    { label: `JUN-${startYear}`, month: 6 },
    { label: `JUL-${startYear}`, month: 7 },
    { label: `AUG-${startYear}`, month: 8 },
    { label: `SEP-${startYear}`, month: 9 },
    { label: `OCT-${startYear}`, month: 10 },
    { label: `NOV-${startYear}`, month: 11 },
    { label: `DEC-${startYear}`, month: 12 },
    { label: `JAN-${endYear}`, month: 1 },
    { label: `FEB-${endYear}`, month: 2 },
    { label: `MAR-${endYear}`, month: 3 },
  ];
};

const salesMonthsList = [
  { label: "APR-26", month: 4, year: 2026 },
  { label: "MAY-26", month: 5, year: 2026 },
  { label: "JUN-26", month: 6, year: 2026 },
  { label: "JUL-26", month: 7, year: 2026 },
  { label: "AUG-26", month: 8, year: 2026 },
  { label: "SEP-26", month: 9, year: 2026 },
  { label: "OCT-26", month: 10, year: 2026 },
  { label: "NOV-26", month: 11, year: 2026 },
  { label: "DEC-26", month: 12, year: 2026 },
  { label: "JAN-27", month: 1, year: 2027 },
  { label: "FEB-27", month: 2, year: 2027 },
  { label: "MAR-27", month: 3, year: 2027 },
];

/*     Component     */
const Dashboard = () => {
  const navigate = useNavigate();

  const rawPermissions = JSON.parse(localStorage.getItem("permissions")) || {};
  const username = (localStorage.getItem("username") || "").trim().toLowerCase();
  const isAdmin = username === "admin" || username === "prashant" || rawPermissions?.role === "admin" || rawPermissions === "all";
  const dashboardPerms = isAdmin ? ["Dashboard", "Dashboard View", "Financial", "Purchase", "PPC", "OEE", "Quality", "Stores", "Subcon", "Planning", "Sales", "Account", "CRM"] : (rawPermissions?.Dashboard || []);

  const visibleDeptCards = React.useMemo(() => {
    if (isAdmin) return deptCards;

    // "All" or "Dashboard View" = full dashboard access
    if (dashboardPerms.includes("All") || dashboardPerms.includes("Dashboard View")) return deptCards;

    // "Dashboard" generic checkbox = full dashboard access (user checked the main Dashboard checkbox)
    if (dashboardPerms.includes("Dashboard")) return deptCards;

    // No generic "Dashboard" checkbox — only show explicitly checked tabs
    // Check each card against Dashboard array AND individual module permissions
    const permittedCards = deptCards.filter(card => {
      // 1. Explicit match inside Dashboard permissions array (e.g. "Financial", "PPC", "Quality")
      if (dashboardPerms.some(p => p.toLowerCase() === card.label.toLowerCase() || p.toLowerCase() === card.id.toLowerCase())) {
        return true;
      }
      // 2. Module-level check (when admin assigns Purchase, Quality, Store, Production permissions across ERP)
      if (card.id === "purchase" && Array.isArray(rawPermissions.Purchase) && rawPermissions.Purchase.length > 0) return true;
      if (card.id === "quality" && Array.isArray(rawPermissions.Quality) && rawPermissions.Quality.length > 0) return true;
      if (card.id === "stores" && Array.isArray(rawPermissions.Store) && rawPermissions.Store.length > 0) return true;
      if (card.id === "ppc" && ((Array.isArray(rawPermissions.Production) && rawPermissions.Production.length > 0) || (Array.isArray(rawPermissions.Planning) && rawPermissions.Planning.length > 0))) return true;
      if (card.id === "financial" && ((Array.isArray(rawPermissions.Accounts) && rawPermissions.Accounts.length > 0) || (Array.isArray(rawPermissions.Sales) && rawPermissions.Sales.length > 0))) return true;
      
      return false;
    });

    return permittedCards;
  }, [isAdmin, dashboardPerms, rawPermissions]);

  useEffect(() => {
    const hasDashboardPerm = isAdmin || (rawPermissions.Dashboard && rawPermissions.Dashboard.length > 0);
    if (!hasDashboardPerm) {
      const target = getDefaultRoute(rawPermissions, username);
      if (target !== "/dashboard") {
        navigate(target);
      }
    }
  }, [navigate]);

  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [activeDept, setActiveDept] = useState(() => {
    if (isAdmin) return "financial";
    if (visibleDeptCards && visibleDeptCards.length > 0) {
      return visibleDeptCards[0].id;
    }
    return "financial";
  });

  useEffect(() => {
    if (visibleDeptCards.length > 0 && !visibleDeptCards.some(card => card.id === activeDept)) {
      setActiveDept(visibleDeptCards[0].id);
    }
  }, [visibleDeptCards, activeDept]);

  const [activeRange, setActiveRange] = useState("Week");
  const [isSPVisible, setIsSPVisible] = useState(false);

  // Track visibility for each accordion section independently
  const [expandedSections, setExpandedSections] = useState({});

  // Business Plan Filters State
  const [bpTimeMode, setBpTimeMode] = useState("Monthly");
  const [bpCustomerWise, setBpCustomerWise] = useState(false);
  const [bpSearchBy, setBpSearchBy] = useState("Quantity");
  const [bpSelectedYear, setBpSelectedYear] = useState("2026-27");
  const [bpSelectedMonth, setBpSelectedMonth] = useState(5);

  // State Wise Sales Filters State
  const [stateWiseType, setStateWiseType] = useState("Top 5 State");

  // Add Favorite Item Modal State
  const [showAddFavoriteModal, setShowAddFavoriteModal] = useState(false);
  const [stockTab, setStockTab] = useState("Consumable Stock");
  const [salesGranularity, setSalesGranularity] = useState("M");
  const [dailySalesData, setDailySalesData] = useState(
    Array.from({ length: 31 }, (_, i) => ({ day: i + 1, sales: 0 }))
  );

  const [top5SalesData, setTop5SalesData] = useState(initialTop5SalesData);
  const [itemWiseDispatchData, setItemWiseDispatchData] = useState(initialItemWiseDispatchData);
  const [businessPlanData, setBusinessPlanData] = useState(initialBusinessPlanData);
  const [spSelectedMonthObj, setSpSelectedMonthObj] = useState({ month: 4, year: 2026 });
  const [dsSelectedMonthObj, setDsSelectedMonthObj] = useState({ month: 4, year: 2026 });
  const [stateWiseSalesData, setStateWiseSalesData] = useState(initialStateWiseSalesData);

  const [poRecords, setPoRecords] = useState([]);
  const [taxInvoiceRecords, setTaxInvoiceRecords] = useState([]);
  const [jobworkInvoiceRecords, setJobworkInvoiceRecords] = useState([]);
  const [salesReturnRecords, setSalesReturnRecords] = useState([]);
  const [debitNotePurchaseRecords, setDebitNotePurchaseRecords] = useState([]);
  const [debitNoteSaleDiffRecords, setDebitNoteSaleDiffRecords] = useState([]);
  const [proformaInvoiceRecords, setProformaInvoiceRecords] = useState([]);
  const [outward57f4Records, setOutward57f4Records] = useState([]);
  const [inward57f4Records, setInward57f4Records] = useState([]);
  const [jobworkInward57f4Records, setJobworkInward57f4Records] = useState([]);
  const [purchaseGRNRecords, setPurchaseGRNRecords] = useState([]);
  const [materialIssueRecords, setMaterialIssueRecords] = useState([]);
  const [deliveryChallanRecords, setDeliveryChallanRecords] = useState([]);
  const [qcPurchaseGRNRecords, setQcPurchaseGRNRecords] = useState([]);
  const [qcJobworkInwardRecords, setQcJobworkInwardRecords] = useState([]);
  const [dcGRNRecords, setDcGRNRecords] = useState([]);
  const [recordsSelectedMonthObj, setRecordsSelectedMonthObj] = useState({ month: 4, year: 2026 });

  const [dynamicAlerts, setDynamicAlerts] = useState([
    { id: 1, label: "Pending PO Approval", count: 0, color: "#eff6ff" },
    { id: 2, label: "Pending Inprocess QC", count: 0, color: "#dbeafe" },
    { id: 3, label: "Pending Sales Return QC", count: 0, color: "#bfdbfe" },
    { id: 4, label: "Bill Passing (Purchase)", count: 0, color: "#93c5fd" },
    { id: 5, label: "Bill Passing (Jobwork)", count: 0, color: "#60a5fa" },
    { id: 6, label: "Upcoming Dispatch", count: 0, color: "#3b82f6" },
    { id: 7, label: "Unauthorised BOM", count: 0, color: "#2563eb" },
    { id: 8, label: "Pending Gate Inward Entry", count: 0, color: "#1e3a8a" },
  ]);

  useEffect(() => {
    const fetchAlertData = async () => {
      const token = localStorage.getItem("accessToken");
      const headers = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;
      
      const safeFetchCount = async (url) => {
        try {
          const res = await fetch(url, { headers });
          if (!res.ok) return 0;
          const data = await res.json();
          const arr = Array.isArray(data) ? data : (data.data || data.results || data.value || []);
          return arr.length;
        } catch {
          return 0;
        }
      };

      try {
        const [
          pendingPo,
          pendingInprocessQc,
          pendingSalesReturnQc,
          billPassingPurchase,
          billPassingJobwork,
          upcomingDispatch,
          unauthorisedBom,
          pendingGateInward
        ] = await Promise.all([
          safeFetchCount("https://sellerp-backend.onrender.com/Purchase/purchase-orders/unverified/simple/"),
          safeFetchCount("https://sellerp-backend.onrender.com/Production/api/production-entries/"),
          safeFetchCount("https://sellerp-backend.onrender.com/Quality/sales-return-qc/"),
          safeFetchCount("https://sellerp-backend.onrender.com/Account/purchasebill/"),
          safeFetchCount("https://sellerp-backend.onrender.com/Account/jobworkbill/"),
          safeFetchCount("https://sellerp-backend.onrender.com/Sales/UpcomingDispatchList/"),
          safeFetchCount("https://sellerp-backend.onrender.com/Production/bom-routing/"),
          safeFetchCount("https://sellerp-backend.onrender.com/Store/GateInward/")
        ]);

        setDynamicAlerts([
          { id: 1, label: "Pending PO Approval", count: pendingPo, color: "#eff6ff" },
          { id: 2, label: "Pending Inprocess QC", count: pendingInprocessQc, color: "#dbeafe" },
          { id: 3, label: "Pending Sales Return QC", count: pendingSalesReturnQc, color: "#bfdbfe" },
          { id: 4, label: "Bill Passing (Purchase)", count: billPassingPurchase, color: "#93c5fd" },
          { id: 5, label: "Bill Passing (Jobwork)", count: billPassingJobwork, color: "#60a5fa" },
          { id: 6, label: "Upcoming Dispatch", count: upcomingDispatch, color: "#3b82f6" },
          { id: 7, label: "Unauthorised BOM", count: unauthorisedBom, color: "#2563eb" },
          { id: 8, label: "Pending Gate Inward Entry", count: pendingGateInward, color: "#1e3a8a" },
        ]);
      } catch (err) {
        console.error("Error fetching alert counts:", err);
      }
    };
    fetchAlertData();
  }, []);

  const fetchTotalRecordsData = async () => {
    const token = localStorage.getItem("accessToken");
    const headers = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    headers["Content-Type"] = "application/json";

    const safeFetch = async (url, options = {}) => {
      try {
        const res = await fetch(url, { headers, ...options });
        if (!res.ok) return [];
        const data = await res.json();
        return Array.isArray(data) ? data : (data.data || data.results || []);
      } catch (err) {
        console.warn(`Error fetching from ${url}:`, err);
        return [];
      }
    };

    try {
      const [
        poData,
        taxData,
        jwInvoiceData,
        srData,
        dnPurchaseData,
        dnSaleDiffData,
        proformaData,
        outwardData,
        inwardData,
        jwInwardData,
        grnData,
        matIssueData,
        delChallanData,
        qcPurchaseData,
        qcJwInwardData,
        dcGrnData
      ] = await Promise.all([
        safeFetch("https://sellerp-backend.onrender.com/Purchase/PurchaseOrderList/"),
        safeFetch("https://sellerp-backend.onrender.com/Sales/invoice/"),
        safeFetch("https://sellerp-backend.onrender.com/Sales/gst-jobwork-invoice/"),
        safeFetch("https://sellerp-backend.onrender.com/Sales/Gstsalesretun/"),
        safeFetch("https://sellerp-backend.onrender.com/Sales/debitnote/"),
        safeFetch("https://sellerp-backend.onrender.com/Sales/gst-jobwork-rate-diff/"),
        safeFetch("https://sellerp-backend.onrender.com/Sales/profoma-invoice/"),
        safeFetch("https://sellerp-backend.onrender.com/Sales/onward-challans/"),
        safeFetch("https://sellerp-backend.onrender.com/Store/InwardChallan/"),
        safeFetch("https://sellerp-backend.onrender.com/Store/JobworkInwardChallan/"),
        safeFetch("https://sellerp-backend.onrender.com/Store/api/grn-details/"),
        safeFetch("https://sellerp-backend.onrender.com/Store/api/New-Material-Issue/"),
        safeFetch("https://sellerp-backend.onrender.com/Store/DeliveryChallan/"),
        safeFetch("https://sellerp-backend.onrender.com/Quality/purchase-pending-qc/"),
        safeFetch("https://sellerp-backend.onrender.com/Quality/inward-qc-list/"),
        safeFetch("https://sellerp-backend.onrender.com/Store/DC_GRN/")
      ]);

      setPoRecords(poData);
      setTaxInvoiceRecords(taxData);
      setJobworkInvoiceRecords(jwInvoiceData);
      setSalesReturnRecords(srData);
      setDebitNotePurchaseRecords(dnPurchaseData);
      setDebitNoteSaleDiffRecords(dnSaleDiffData);
      setProformaInvoiceRecords(proformaData);
      setOutward57f4Records(outwardData);
      setInward57f4Records(inwardData);
      setJobworkInward57f4Records(jwInwardData);
      setPurchaseGRNRecords(grnData);
      setMaterialIssueRecords(matIssueData);
      setDeliveryChallanRecords(delChallanData);
      setQcPurchaseGRNRecords(qcPurchaseData);
      setQcJobworkInwardRecords(qcJwInwardData);
      setDcGRNRecords(dcGrnData);
    } catch (error) {
      console.error("Error fetching total records:", error);
    }
  };

  const countInMonth = (list, dateFieldExtractor, targetMonth, targetYear) => {
    if (!Array.isArray(list)) return 0;
    return list.filter(item => {
      const dateVal = dateFieldExtractor(item);
      if (!dateVal) return false;
      const d = new Date(dateVal);
      if (isNaN(d.getTime())) return false;
      return (d.getMonth() + 1) === targetMonth && d.getFullYear() === targetYear;
    }).length;
  };

  const filteredRecordItems = React.useMemo(() => {
    const m = recordsSelectedMonthObj.month;
    const y = recordsSelectedMonthObj.year;

    return [
      { id: 1, name: "Purchase Order", total: countInMonth(poRecords, item => item.PoDate, m, y) },
      { id: 2, name: "Tax Invoice", total: countInMonth(taxInvoiceRecords, item => item.invoice_Date, m, y) },
      { id: 3, name: "Jobwork Invoice", total: countInMonth(jobworkInvoiceRecords, item => item.invoice_date, m, y) },
      { id: 4, name: "GST Sales Return", total: countInMonth(salesReturnRecords, item => item.sales_return_date, m, y) },
      { id: 5, name: "Debit Note : Purchase Return", total: countInMonth(debitNotePurchaseRecords, item => item.debit_note_date, m, y) },
      { id: 6, name: "Debit Note : Sale Rate Diff", total: countInMonth(debitNoteSaleDiffRecords, item => item.debit_note_date, m, y) },
      { id: 7, name: "Proforma Invoice", total: countInMonth(proformaInvoiceRecords, item => item.order_date, m, y) },
      { id: 8, name: "57F4 Outward", total: countInMonth(outward57f4Records, item => item.challan_date, m, y) },
      { id: 9, name: "57F4 Inward", total: countInMonth(inward57f4Records, item => item.InwardDate, m, y) },
      { id: 10, name: "57F4 Jobwork Inward", total: countInMonth(jobworkInward57f4Records, item => item.InwardDate, m, y) },
      { id: 11, name: "Purchase GRN", total: countInMonth(purchaseGRNRecords, item => item.GrnDate, m, y) },
      { id: 12, name: "Material Issue Ch.", total: countInMonth(materialIssueRecords, item => item.MaterialIssueDate, m, y) },
      { id: 13, name: "Delivery Challan", total: countInMonth(deliveryChallanRecords, item => item.ChallanDate, m, y) },
      { id: 14, name: "QC Purchase GRN", total: countInMonth(qcPurchaseGRNRecords, item => item.GrnDate || item.grn_date || item.ReturnDate || item.return_date || item.date || item.created_at, m, y) },
      { id: 15, name: "QC Jobwork Inward", total: countInMonth(qcJobworkInwardRecords, item => item.InwardDate, m, y) },
      { id: 16, name: "DC GRN", total: countInMonth(dcGRNRecords, item => item.GrnDate, m, y) }
    ];
  }, [
    recordsSelectedMonthObj,
    poRecords,
    taxInvoiceRecords,
    jobworkInvoiceRecords,
    salesReturnRecords,
    debitNotePurchaseRecords,
    debitNoteSaleDiffRecords,
    proformaInvoiceRecords,
    outward57f4Records,
    inward57f4Records,
    jobworkInward57f4Records,
    purchaseGRNRecords,
    materialIssueRecords,
    deliveryChallanRecords,
    qcPurchaseGRNRecords,
    qcJobworkInwardRecords,
    dcGRNRecords
  ]);


  const fetchDailySalesReport = async (month = 4, year = 2026) => {
    try {
      const response = await fetch(`https://sellerp-backend.onrender.com/Dashboard/monthly/daily/report/?month=${month}&year=${year}`);
      if (!response.ok) throw new Error("Failed to fetch daily sales report");
      const data = await response.json();

      const updated = data.map((item) => ({
        day: parseInt(item.date.split("-")[2]),
        sales: parseFloat(item.total_assessable || 0) / 1000 // scale for visible bars (1000lac fallback)
      }));
      if (updated && updated.length > 0) setDailySalesData(updated);
    } catch (err) {
      console.error("Error fetching daily report:", err);
    }
  };

  const fetchTop5SalesData = async () => {
    try {
      const response = await fetch("https://sellerp-backend.onrender.com/Dashboard/Top/5/Customer/");
      if (!response.ok) throw new Error("Failed to fetch top 5 sales data");
      const data = await response.json();

      const colors = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#06b6d4"];
      const updated = data.map((item, index) => ({
        name: item.customer,
        value: parseFloat(item.total_assessable || 0),
        qty: item.total_po_qty,
        fill: colors[index % colors.length]
      }));

      if (updated && updated.length > 0) {
        setTop5SalesData(updated);
      }
    } catch (err) {
      console.error("Error fetching top 5 report:", err);
    }
  };

  const fetchItemWiseDispatchData = async () => {
    try {
      const response = await fetch("https://sellerp-backend.onrender.com/Dashboard/itemwise/data/");
      if (!response.ok) throw new Error("Failed to fetch itemwise dispatch data");
      const data = await response.json();

      const updated = data.map((item, index) => ({
        sr: index + 1,
        customer: item.customer,
        itemNo: "-",
        itemCode: "-",
        itemDesc: item.description || "N/A",
        qty: item.total_po_qty || 0,
        amount: parseFloat(item.total_assessable_value || 0)
      }));

      if (updated && updated.length > 0) {
        setItemWiseDispatchData(updated);
      }
    } catch (err) {
      console.error("Error fetching itemwise report:", err);
    }
  };


  const [salesPurchaseTableData, setSalesPurchaseTableData] = useState([
    { sr: 1, type: "Domestic Sales", assessable: "0.00", total: "0.00" },
    { sr: 2, type: "Jobwork Sales", assessable: "0.00", total: "0.00" },
    { sr: 3, type: "Export Sales", assessable: "0.00", total: "0.00" },
    { sr: 4, type: "Rate Diff", assessable: "0.00", total: "0.00" },
    { sr: 5, type: "Scrap Sales", assessable: "0.00", total: "0.00" },
    { sr: 6, type: "Total Sales", assessable: "0.00", total: "0.00" },
    { sr: 7, type: "Sales Return", assessable: "0.00", total: "0.00" },
    { sr: 8, type: "Purchase", assessable: "0.00", total: "0.00" }
  ]);

  const [salesPurchaseChartData, setSalesPurchaseChartData] = useState([
    { name: "Domestic Sales", value: 0 },
    { name: "Jobwork Sales", value: 0 },
    { name: "Export Sales", value: 0 },
    { name: "Rate Diff", value: 0 },
    { name: "Scrap Sales", value: 0 },
    { name: "Total Sales", value: 0 },
    { name: "Sales Return", value: 0 },
    { name: "Purchase", value: 0 }
  ]);

  const fetchAssessableReport = async (month = 4, year = 2026) => {
    try {
      const response = await fetch(`https://sellerp-backend.onrender.com/Dashboard/assessable-report/?month=${month}&year=${year}`);
      if (!response.ok) throw new Error("Failed to fetch assessable report");
      const data = await response.json();

      const gst = parseFloat(data.GST_total_assessable_value || 0);
      const scrap = parseFloat(data.SCRAP_total_assessable_value || 0);
      const rateDiff = parseFloat(data.RATE_DIFF_total_assessable_value || 0);
      const total = parseFloat(data.GRAND_TOTAL || 0);

      // Map to table data
      const updatedTable = [
        { sr: 1, type: "Domestic Sales", assessable: gst.toLocaleString('en-IN', { minimumFractionDigits: 2 }), total: (gst * 1.18).toLocaleString('en-IN', { minimumFractionDigits: 2 }) },
        { sr: 2, type: "Jobwork Sales", assessable: "0.00", total: "0.00" },
        { sr: 3, type: "Export Sales", assessable: "0.00", total: "0.00" },
        { sr: 4, type: "Rate Diff", assessable: rateDiff.toLocaleString('en-IN', { minimumFractionDigits: 2 }), total: (rateDiff * 1.18).toLocaleString('en-IN', { minimumFractionDigits: 2 }) },
        { sr: 5, type: "Scrap Sales", assessable: scrap.toLocaleString('en-IN', { minimumFractionDigits: 2 }), total: (scrap * 1.18).toLocaleString('en-IN', { minimumFractionDigits: 2 }) },
        { sr: 6, type: "Total Sales", assessable: total.toLocaleString('en-IN', { minimumFractionDigits: 2 }), total: (total * 1.18).toLocaleString('en-IN', { minimumFractionDigits: 2 }) },
        { sr: 7, type: "Sales Return", assessable: "0.00", total: "0.00" },
        { sr: 8, type: "Purchase", assessable: "0.00", total: "0.00" }
      ];

      // Map to chart data
      const updatedChart = [
        { name: "Domestic Sales", value: gst },
        { name: "Jobwork Sales", value: 0 },
        { name: "Export Sales", value: 0 },
        { name: "Rate Diff", value: rateDiff },
        { name: "Scrap Sales", value: scrap },
        { name: "Total Sales", value: total },
        { name: "Sales Return", value: 0 },
        { name: "Purchase", value: 0 }
      ];

      setSalesPurchaseTableData(updatedTable);
      setSalesPurchaseChartData(updatedChart);
    } catch (err) {
      console.error("Error fetching report:", err);
    }
  };

  const fetchBusinessPlanData = async () => {
    try {
      const [startYearStr, endYearStr] = bpSelectedYear.split("-");
      const startYear = parseInt(startYearStr);
      let endYear = parseInt(endYearStr);
      if (endYear < 100) {
        endYear = Math.floor(startYear / 100) * 100 + endYear;
      }
      const fetchYear = bpSelectedMonth >= 4 ? startYear : endYear;
      
      const apiEndpoint = bpSearchBy === "Value"
        ? `https://sellerp-backend.onrender.com/Dashboard/bussiness-invoice-value/?month=${bpSelectedMonth}&year=${fetchYear}`
        : `https://sellerp-backend.onrender.com/Dashboard/bussiness-invoice-summary/?month=${bpSelectedMonth}&year=${fetchYear}`;
      
      const response = await fetch(apiEndpoint);
      if (!response.ok) throw new Error("Failed to fetch business plan data");
      const data = await response.json();
      
      if (bpSearchBy === "Value") {
        setBusinessPlanData([
          { name: "Bus. plan Val", value: 0 },
          { name: "Schedule Val", value: 0 },
          { name: "Invoice Val", value: 0 },
          { name: "Sch Val Actual", value: data.sales_order_assessable_value || 0 },
          { name: "Inv Val Actual", value: data.invoice_assessable_value || 0 },
        ]);
      } else {
        setBusinessPlanData([
          { name: "Bus. plan Qty", value: 0 },
          { name: "Schedule Qty", value: 0 },
          { name: "Invoice Qty", value: 0 },
          { name: "Sch Qty Actual", value: data.total_sch_qty || 0 },
          { name: "Inv Qty Actual", value: data.total_inv_qty || 0 },
        ]);
      }
    } catch (err) {
      console.error("Error fetching business plan summary:", err);
    }
  };
  const fetchStateWiseSalesData = async () => {
    try {
      const response = await fetch("https://sellerp-backend.onrender.com/Dashboard/top-5-region-sales/");
      if (!response.ok) throw new Error("Failed to fetch state wise sales data");
      const data = await response.json();

      const colors = ["#007bff", "#f59e0b", "#0ea5e9", "#ef4444", "#8b5cf6", "#10b981"];
      const updated = (data.top_regions || []).map((item, index) => ({
        name: (item.region || "").toUpperCase(),
        value: parseFloat(item.assessable_value || 0),
        total: parseFloat(item.grand_total || 0),
        percent: parseFloat(item.percentage || 0) / 100.0,
        fill: colors[index % colors.length]
      }));

      setStateWiseSalesData(updated);
    } catch (err) {
      console.error("Error fetching state wise sales data:", err);
    }
  };


  const toggleSection = (label) => {
    setExpandedSections(prev => ({ ...prev, [label]: !prev[label] }));
  };

  const toggleSideNav = () => setSideNavOpen((p) => !p);

  useEffect(() => {
    fetchTop5SalesData();
    fetchItemWiseDispatchData();
    fetchStateWiseSalesData();
    fetchTotalRecordsData();
  }, []);

  useEffect(() => {
    fetchBusinessPlanData();
  }, [bpSelectedYear, bpSelectedMonth, bpSearchBy]);

  useEffect(() => {
    fetchAssessableReport(spSelectedMonthObj.month, spSelectedMonthObj.year);
  }, [spSelectedMonthObj]);

  useEffect(() => {
    fetchDailySalesReport(dsSelectedMonthObj.month, dsSelectedMonthObj.year);
  }, [dsSelectedMonthObj]);



  useEffect(() => {
    document.body.classList.toggle("side-nav-open", sideNavOpen);
    return () => document.body.classList.remove("side-nav-open");
  }, [sideNavOpen]);

  const areaData =
    activeRange === "Day"
      ? areaDataDay
      : activeRange === "Month"
        ? areaDataMonth
        : areaDataWeek;

  return (
    <div className="dashboard">
      <NavBar toggleSideNav={toggleSideNav} />
      <div className="mainContainer">
        <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />

        <main className={`mainContent dn-main ${sideNavOpen ? "shifted" : ""} ${activeDept !== "financial" ? "dn-full-width-view" : ""}`}>
          {/*    Department Cards    */}
          <div className="dn-dept-cards-row">
            {visibleDeptCards.map((card) => (
              <div
                key={card.id}
                className={`dn-dept-card ${activeDept === card.id ? "active" : ""}`}
                onClick={() => setActiveDept(card.id)}
              >
                <div className="dn-dept-icon" style={{ background: card.bg }}>
                  {card.icon}
                </div>
                <div className="dn-dept-label">
                  {card.label}
                </div>
              </div>
            ))}
          </div>
          {activeDept === "financial" && (
            <div className="dn-content-grid">

              {/* Left Column: Side Tables */}
              <div className="dn-side-column">

                {/* Alerts Card */}
                <div className="dn-side-card dn-alerts-card">
                  <div className="dn-side-header">
                    <div className="dn-side-title">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: 8 }}><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="9" y1="3" x2="9" y2="21" /><line x1="15" y1="3" x2="15" y2="21" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="3" y1="15" x2="21" y2="15" /></svg>
                      Alerts
                    </div>
                    <a href="#" className="dn-side-link">Add New Alert</a>
                  </div>

                  <div className="dn-filter-strip">
                    <label>Plant</label>
                    <select className="dn-mini-select">
                      <option>VISHWA S.I</option>
                    </select>
                  </div>

                  <div className="dn-alert-list">
                    {dynamicAlerts.map((item, index) => {
                      const baseSize = 20 + index * 2.5; // From 20px to 37.5px
                      const fontSize = 9 + index * 0.5;  // From 9px to 12.5px
                      const isDarkColor = index >= 5;
                      return (
                        <div
                          key={item.id}
                          className="dn-alert-item"
                          onClick={() => {
                            if (item.label === "Pending PO Approval") {
                              navigate("/pendingpo");
                            } else if (item.label === "Pending Inprocess QC") {
                              navigate("/InprocessInspection");
                            } else if (item.label === "Pending Sales Return QC") {
                              navigate("/PaddingSalesQC");
                            } else if (item.label === "Bill Passing (Purchase)") {
                              navigate("/purchase-bill");
                            } else if (item.label === "Bill Passing (Jobwork)") {
                              navigate("/jobwork-bill");
                            } else if (item.label === "Upcoming Dispatch") {
                              navigate("/UpcomingDispatchList");
                            } else if (item.label === "Unauthorised BOM") {
                              navigate("/bom-routing");
                            } else if (item.label === "Pending Gate Inward Entry") {
                              navigate("/Gate-Inward-Entry");
                            }
                          }}
                        >
                          <span className="dn-alert-label">{item.label}</span>
                          <span
                            className="dn-alert-badge"
                            style={{
                              background: "#007bff",
                              fontSize: "11px",
                              minWidth: "32px",
                              height: "22px",
                              borderRadius: "11px",
                              color: "#fff",
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              padding: "0 8px",
                              lineHeight: 1,
                              fontWeight: "bold"
                            }}
                          >
                            {item.count}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Total Records Card (Full/Scrollable) */}
                <div className="dn-side-card dn-records-card full-list">
                  <div className="dn-side-header">
                    <div className="dn-side-title">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: 8 }}><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="9" y1="3" x2="9" y2="21" /><line x1="15" y1="3" x2="15" y2="21" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="3" y1="15" x2="21" y2="15" /></svg>
                      Total Record's
                    </div>
                    <a href="#" className="dn-side-link">View More</a>
                  </div>

                  <div className="dn-filter-strip row-gap">
                    <div className="dn-filter-group">
                      <select className="dn-mini-select"><option>VISHWA S.I</option></select>
                      <label>Month</label>
                      <select 
                        className="dn-mini-select"
                        value={`${recordsSelectedMonthObj.month}-${recordsSelectedMonthObj.year}`}
                        onChange={(e) => {
                          const [m, y] = e.target.value.split("-").map(Number);
                          setRecordsSelectedMonthObj({ month: m, year: y });
                        }}
                      >
                        {salesMonthsList.map(item => (
                          <option key={item.label} value={`${item.month}-${item.year}`}>{item.label}</option>
                        ))}
                      </select>
                    </div>
                    <div className="dn-action-group">
                      <button className="dn-icon-btn" onClick={fetchTotalRecordsData}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" /></svg></button>
                    </div>
                  </div>

                  <div className="dn-records-table-container scrollable">
                    <table className="dn-records-table">
                      <thead>
                        <tr style={{ background: '#007bff', color: '#fff' }}>
                          <th style={{ background: '#007bff', color: '#fff', border: '1px solid #0056b3' }}>Doc. Name</th>
                          <th style={{ textAlign: "right", background: '#007bff', color: '#fff', border: '1px solid #0056b3' }}>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredRecordItems.map(item => (
                          <tr key={item.id}>
                            <td>{item.name}</td>
                            <td style={{ textAlign: "right" }}>{item.total}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>

              {/* Right Column: Main Content Area */}
              <div className="dn-main-column">

                {/* Top: Total Revenue Chart */}
                <div className="dn-chart-card dn-chart-main">
                  <div className="dn-chart-header">
                    <div className="dn-chart-legends">
                      <span className="dn-legend-dot blue-dot" />
                      <div>
                        <div className="dn-legend-title blue-text">Total Revenue</div>
                        <div className="dn-legend-sub">12.04.2022 - 12.05.2022</div>
                      </div>
                      <span className="dn-legend-dot teal-dot" style={{ marginLeft: 20 }} />
                      <div>
                        <div className="dn-legend-title teal-text">Total Sales</div>
                        <div className="dn-legend-sub">12.04.2022 - 12.05.2022</div>
                      </div>
                    </div>

                    <div className="dn-range-btns">
                      {["Day", "Week", "Month"].map(r => (
                        <button
                          key={r}
                          className={`dn-range-btn ${activeRange === r ? "active" : ""}`}
                          onClick={() => setActiveRange(r)}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="dn-chart-wrapper main">
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={areaData}>
                        <defs>
                          <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.15} />
                            <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#38c5c5" stopOpacity={0.15} />
                            <stop offset="95%" stopColor="#38c5c5" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                        <Area type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                        <Area type="monotone" dataKey="sales" stroke="#38c5c5" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Accordion Sections Dashboard Area */}
                <div className="dn-accordion-container">
                  {accordionList.map((label) => {
                    const isOpen = expandedSections[label];
                    return (
                      <div key={label} className={`dn-accordion-item ${isOpen ? "open" : ""}`}>
                        <div className="dn-accordion-row" onClick={() => toggleSection(label)}>
                          <div className="dn-acc-left">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#007bff" strokeWidth="2.5" style={{ marginRight: 10 }}>
                              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="12" y1="3" x2="12" y2="21" /><line x1="3" y1="12" x2="21" y2="12" />
                            </svg>
                            {label}
                          </div>
                          <div className="dn-acc-right">
                            <span>{isOpen ? "Hide" : "Show"}</span>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ marginLeft: 6, transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                              <polyline points="6 9 12 15 18 9" />
                            </svg>
                          </div>
                        </div>

                        {/* Financial Specific Section Bodies */}
                        {isOpen && label === "Sales & Purchase" && (
                          <div className="dn-card-body dn-daily-sales-body">
                            {/* Inner Filter Bar */}
                            <div className="dn-inner-filter-bar complex" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 16px", background: "#f8fafc", borderBottom: '1px solid #e2e8f0', flexWrap: 'nowrap' }}>
                              <div className="dn-f-left" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div className="dn-f-item sm">Plant : <select className="dn-mini-select" style={{ width: 80 }}><option>VISHWA S.I</option></select></div>
                                <div className="dn-f-item sm">
                                  Month : 
                                  <select 
                                    className="dn-mini-select" 
                                    style={{ width: 100 }}
                                    value={`${spSelectedMonthObj.month}-${spSelectedMonthObj.year}`}
                                    onChange={(e) => {
                                      const [m, y] = e.target.value.split("-").map(Number);
                                      setSpSelectedMonthObj({ month: m, year: y });
                                    }}
                                  >
                                    {salesMonthsList.map(item => (
                                      <option key={item.label} value={`${item.month}-${item.year}`}>{item.label}</option>
                                    ))}
                                  </select>
                                </div>
                                <button className="dn-icon-btn small" style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: 4, borderRadius: 4, cursor: 'pointer' }}>
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M23 4v6h-6M1 20v-6h6" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" /></svg>
                                </button>
                                <div className="dn-f-item note red" style={{ fontSize: '10px', fontWeight: 700, margin: 0, whiteSpace: 'nowrap' }}>* Values are Assessable</div>
                                <div className="dn-radio-group" style={{ marginLeft: 15 }}>
                                  <label className="dn-radio-item" style={{ color: '#1e293b' }}><input type="radio" name="currencyUnit" defaultChecked /> In RS.</label>
                                  <label className="dn-radio-item" style={{ color: '#1e293b' }}><input type="radio" name="currencyUnit" /> In Lakh</label>
                                </div>
                              </div>
                              <div className="dn-f-right" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <a href="#" className="dn-link-sm" style={{ fontSize: '11px', fontWeight: 700, color: '#007bff' }}>Yearly</a>
                                <button className="dn-icon-btn small excel" style={{ margin: 0, padding: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', border: '1px solid #cbd5e1', background: '#fff', height: '24px', width: '24px' }}>
                                  <div style={{ background: '#1d6f42', color: '#fff', width: '16px', height: '16px', borderRadius: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '900' }}>X</div>
                                </button>
                              </div>
                            </div>

                            {/* Chart with Sidebar */}
                            <div className="dn-chart-with-sidebar" style={{ position: 'relative' }}>
                              <div className="dn-chart-sidebar">
                                {["M", "Q", "Y"].map(mode => (
                                  <button
                                    key={mode}
                                    className={`dn-sidebar-btn ${salesGranularity === mode ? 'active' : ''}`}
                                    onClick={() => setSalesGranularity(mode)}
                                  >
                                    {mode}
                                  </button>
                                ))}
                              </div>
                              <div className="dn-y-axis-label">Amount In Rs</div>
                              <div style={{ flex: 1, padding: '15px 10px 0 10px' }}>
                                <ResponsiveContainer width="100%" height={260}>
                                  <BarChart data={salesPurchaseChartData} margin={{ top: 30, right: 20, left: 20, bottom: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                    <XAxis dataKey="name" tick={{ fontSize: 9, fontWeight: 700, fill: '#64748b' }} interval={0} axisLine={false} tickLine={false} />
                                    <YAxis hide />
                                    <Tooltip />
                                    <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={45}>
                                      {salesPurchaseChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index === 5 || index === 7 ? '#3b82f6' : '#1e293b'} />
                                      ))}
                                      <LabelList dataKey="value" position="top" style={{ fontSize: 10, fontWeight: 700, fill: '#1e293b' }} />
                                    </Bar>
                                  </BarChart>
                                </ResponsiveContainer>
                              </div>
                            </div>

                            {/* Detail Table */}
                            <div className="dn-table-scroll-container" style={{ margin: 0, border: 'none' }}>
                              <table className="dn-erp-table high-density">
                                <thead>
                                  <tr style={{ background: '#007bff', color: '#fff', fontSize: '11px' }}>
                                    <th style={{ width: 40, textAlign: 'center', background: '#007bff', color: '#fff', border: 'none' }}>#</th>
                                    <th style={{ width: 30, textAlign: 'center', background: '#007bff', color: '#fff', border: 'none' }}><input type="checkbox" /></th>
                                    <th style={{ textAlign: 'left', background: '#007bff', color: '#fff', border: 'none' }}>Type</th>
                                    <th style={{ textAlign: 'right', background: '#007bff', color: '#fff', border: 'none' }}>Assessable Value</th>
                                    <th style={{ textAlign: 'right', background: '#007bff', color: '#fff', border: 'none' }}>Total Value</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {salesPurchaseTableData.map(row => (
                                    <tr key={row.sr}>
                                      <td style={{ textAlign: 'center' }}>{row.sr}</td>
                                      <td style={{ textAlign: 'center' }}><input type="checkbox" /></td>
                                      <td style={{ fontWeight: 700, color: '#1e293b' }}>{row.type}</td>
                                      <td style={{ textAlign: 'right', fontWeight: 600 }}>₹{row.assessable}</td>
                                      <td style={{ textAlign: 'right', fontWeight: 600 }}>₹{row.total}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}

                        {isOpen && label === "Daily Sales" && (
                          <div className="dn-card-body dn-daily-sales-body" style={{ padding: 0 }}>
                            {/* Standardized Flex Filter Strip */}
                            <div className="dn-inner-filter-bar" style={{ display: "flex", alignItems: "center", gap: '8px', padding: "10px 16px", background: "#f8fafc", borderBottom: '1px solid #e2e8f0' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#64748b' }}>Plant : <select className="dn-mini-select" style={{ width: 80, border: 'none', background: 'transparent', fontWeight: 700 }}><option>VISHWA S.I</option></select></div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#64748b', marginLeft: '5px' }}>
                                Sales Month : 
                                <select 
                                  className="dn-mini-select" 
                                  style={{ width: 100, border: 'none', background: 'transparent', fontWeight: 700 }}
                                  value={`${dsSelectedMonthObj.month}-${dsSelectedMonthObj.year}`}
                                  onChange={(e) => {
                                    const [m, y] = e.target.value.split("-").map(Number);
                                    setDsSelectedMonthObj({ month: m, year: y });
                                  }}
                                >
                                  {salesMonthsList.map(item => (
                                    <option key={item.label} value={`${item.month}-${item.year}`}>{item.label}</option>
                                  ))}
                                </select>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#64748b', marginLeft: '5px' }}>Type : <select className="dn-mini-select" style={{ width: 60, border: 'none', background: 'transparent', fontWeight: 700 }}><option>ALL</option></select></div>
                              
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', fontWeight: 700, color: '#ef4444', marginLeft: '10px' }}>* Values are in Lacs</div>

                              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <a href="#" style={{ fontSize: '11px', fontWeight: 700, color: '#007bff', textDecoration: 'none' }}>View More</a>
                                <button className="dn-icon-btn small excel" style={{ margin: 0, padding: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', border: '1px solid #cbd5e1', background: '#fff', height: '24px', width: '24px' }}>
                                  <div style={{ background: '#1d6f42', color: '#fff', width: '16px', height: '16px', borderRadius: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '900' }}>X</div>
                                </button>
                              </div>
                            </div>

                            {/* Daily Sales Bar Chart */}
                            <div className="dn-chart-content">
                              <ResponsiveContainer width="100%" height={260}>
                                <BarChart data={dailySalesData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                  <defs>
                                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="0%" stopColor="#4f8ef7" stopOpacity={1} />
                                      <stop offset="100%" stopColor="#2563eb" stopOpacity={0.8} />
                                    </linearGradient>
                                  </defs>
                                  <CartesianGrid strokeDasharray="0 0" vertical={false} stroke="#eee" />
                                  <XAxis dataKey="day" axisLine={{ stroke: "#333", strokeWidth: 1 }} tickLine={true} tick={{ fontSize: 10, fill: "#333" }} interval={0} />
                                  <YAxis axisLine={{ stroke: "#333", strokeWidth: 1 }} tickLine={true} tick={{ fontSize: 10, fill: "#333" }} domain={[0, 50]} ticks={[0, 10, 20, 30, 40, 50]} />
                                  <Tooltip cursor={{ fill: "transparent" }} contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
                                  <Bar dataKey="sales" fill="url(#barGradient)" radius={[2, 2, 0, 0]} barSize={12} />
                                  <Legend verticalAlign="bottom" height={36} content={() => (
                                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: 11, color: "#333", gap: 8, marginTop: 10 }}>
                                      <span style={{ width: 14, height: 14, background: "#4f8ef7", display: "inline-block" }}></span>
                                      Sales
                                    </div>
                                  )} />
                                </BarChart>
                              </ResponsiveContainer>
                            </div>

                            {/* Footer Info */}
                            <div className="dn-card-footer-info">
                              <div className="dn-footer-notes">
                                Values Include : <span className="blue-link">GST Sales</span>, <span className="blue-link">Export Sales</span>, <span className="blue-link">Job-work Sales</span>
                              </div>
                              <div className="dn-status-badge-orange">
                                Daily Sales : {salesMonthsList.find(m => m.month === dsSelectedMonthObj.month && m.year === dsSelectedMonthObj.year)?.label || "apr-26"}
                              </div>
                            </div>
                          </div>
                        )}

                        {isOpen && label === "Monthly Sales" && (
                          <div className="dn-card-body dn-daily-sales-body" style={{ padding: 0 }}>
                            {/* Standardized Flex Filter Strip */}
                            <div className="dn-inner-filter-bar" style={{ display: "flex", alignItems: "center", gap: '8px', padding: "10px 16px", background: "#f8fafc", borderBottom: '1px solid #e2e8f0' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#64748b' }}>Plant : <select className="dn-mini-select" style={{ width: 60, border: 'none', background: 'transparent', fontWeight: 700 }}><option>VISHWA S.I</option></select></div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#64748b', marginLeft: '5px' }}>Year : <select className="dn-mini-select" style={{ width: 100, border: 'none', background: 'transparent', fontWeight: 700 }}><option>2026-2027</option></select></div>
                              
                              <div className="dn-radio-group mini" style={{ display: 'flex', gap: '8px', fontSize: '11px', fontWeight: 700, marginLeft: '10px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="radio" name="monValQty" defaultChecked /> Value</label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="radio" name="monValQty" /> Qty</label>
                              </div>

                              <div className="dn-checkbox-group mini" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: 700, marginLeft: '15px' }}>
                                <span style={{ color: '#64748b' }}>Type :</span>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="checkbox" defaultChecked /> GST</label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="checkbox" defaultChecked /> Export</label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="checkbox" defaultChecked /> Jobwork</label>
                              </div>

                              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <a href="#" style={{ fontSize: '11px', fontWeight: 700, color: '#007bff', textDecoration: 'none' }}>View More</a>
                                <button className="dn-icon-btn small excel" style={{ margin: 0, padding: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', border: '1px solid #cbd5e1', background: '#fff', height: '24px', width: '24px' }}>
                                  <div style={{ background: '#1d6f42', color: '#fff', width: '16px', height: '16px', borderRadius: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '900' }}>X</div>
                                </button>
                              </div>
                            </div>

                            {/* Monthly Sales Chart */}
                            <div className="dn-chart-content" style={{ padding: '20px 20px 0 20px' }}>
                              <ResponsiveContainer width="100%" height={280}>
                                <BarChart data={monthlySalesData} margin={{ top: 10, right: 30, left: 10, bottom: 5 }}>
                                  <CartesianGrid strokeDasharray="0" vertical={false} stroke="#e2e8f0" />
                                  <XAxis dataKey="month" axisLine={{ stroke: '#333', strokeWidth: 1 }} tickLine={true} tick={{ fontSize: 9, fill: "#333", fontWeight: 700 }} />
                                  <YAxis axisLine={{ stroke: '#333', strokeWidth: 1 }} tickLine={true} tick={{ fontSize: 10, fill: "#333" }} domain={[0, 300]} ticks={[0, 50, 100, 150, 200, 250, 300]} />
                                  <Tooltip cursor={{ fill: "transparent" }} />
                                  <Bar dataKey="sales" fill="rgba(37, 99, 235, 0.8)" radius={[2, 2, 0, 0]} barSize={35} stroke="#2563eb" strokeWidth={1} />
                                </BarChart>
                              </ResponsiveContainer>
                            </div>

                            {/* Legend Badge */}
                            <div style={{ display: 'flex', justifyContent: 'center', margin: '-10px 0 15px 0' }}>
                              <div style={{ background: '#0ea5e9', color: '#fff', padding: '4px 15px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                                Type : Monthly Sales : GST + Export + Jobwork + Scrap
                              </div>
                            </div>

                            {/* Horizontal High-Density Table */}
                            <div className="dn-table-scroll-container" style={{ margin: 0, border: 'none', padding: '0 10px 15px 10px', overflowX: 'auto' }}>
                              <table className="dn-erp-table high-density horizontal-sales" style={{ borderCollapse: 'collapse', width: '100%', minWidth: '800px' }}>
                                <thead>
                                  <tr style={{ background: '#007bff', color: '#fff' }}>
                                    {monthlySalesData.map(d => (
                                      <th key={d.month} style={{ background: '#007bff', color: '#fff', padding: '10px 4px', fontSize: '11px', border: '1px solid rgba(255,255,255,0.2)', textAlign: 'center', whiteSpace: 'nowrap' }}>
                                        {d.month}
                                      </th>
                                    ))}
                                    <th style={{ background: '#007bff', color: '#fff', padding: '10px 4px', fontSize: '11px', border: '1px solid rgba(255,255,255,0.2)', textAlign: 'center', whiteSpace: 'nowrap' }}>Total</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    {monthlySalesData.map(d => (
                                      <td key={d.month} style={{ textAlign: 'center', padding: '10px 4px', fontSize: '11px', fontWeight: 700, background: '#fff', border: '1px solid #e2e8f0' }}>
                                        {d.sales || "0"}
                                      </td>
                                    ))}
                                    <td style={{ textAlign: 'center', padding: '10px 4px', fontSize: '11px', fontWeight: 800, background: '#f8fafc', border: '1px solid #e2e8f0', color: '#1d4ed8' }}>
                                      {monthlySalesData.reduce((acc, d) => acc + d.sales, 0).toFixed(2)}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>

                            {/* Footer Info */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', fontSize: '10px', fontWeight: 700 }}>
                              <div style={{ color: '#0369a1' }}>
                                Values Include : <span style={{ color: '#0369a1' }}>GST Sales, Export Sales, Jobwork Sales, Scrap Sales</span>
                              </div>
                              <div style={{ color: '#ef4444' }}>* Values are in Lacs</div>
                            </div>
                          </div>
                        )}

                        {isOpen && label === "Top 5 (Sales) Customer / Item" && (
                          <div className="dn-card-body dn-top5-body" style={{ padding: 0 }}>
                            {/* Standardized Flex Filter Strip */}
                            <div className="dn-inner-filter-bar" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#64748b' }}>Plant : <select className="dn-mini-select" style={{ width: 80, border: 'none', background: 'transparent', fontWeight: 700 }}><option>VISHWA S.I</option></select></div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#64748b', marginLeft: '5px' }}>Year : <select className="dn-mini-select" style={{ width: 100, border: 'none', background: 'transparent', fontWeight: 700 }}><option>2026-2027</option></select></div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#64748b', marginLeft: '5px' }}>Month : <select className="dn-mini-select" style={{ width: 80, border: 'none', background: 'transparent', fontWeight: 700 }}><option>ALL</option></select></div>
                              
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#64748b', marginLeft: '10px' }}>
                                Top : <input type="number" defaultValue="5" style={{ width: '35px', padding: '0 2px', fontSize: '11px', border: '1px solid #cbd5e1', borderRadius: '4px', fontWeight: 700 }} />
                                <select className="dn-mini-select" style={{ width: 90, border: 'none', background: 'transparent', fontWeight: 700 }}><option>Customer</option><option>Item</option></select>
                              </div>

                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '15px' }}>
                                <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b' }}>Type :</span>
                                <div className="dn-radio-group mini" style={{ display: 'flex', gap: '8px', fontSize: '11px', fontWeight: 700 }}>
                                  <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="radio" name="topType" /> ALL</label>
                                  <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="radio" name="topType" defaultChecked /> GST</label>
                                  <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="radio" name="topType" /> Export</label>
                                </div>
                              </div>

                              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <button className="dn-icon-btn small excel" style={{ margin: 0, padding: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', border: '1px solid #cbd5e1', background: '#fff', height: '24px', width: '24px' }}>
                                  <div style={{ background: '#1d6f42', color: '#fff', width: '16px', height: '16px', borderRadius: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '900' }}>X</div>
                                </button>
                              </div>
                            </div>

                            <div className="dn-top5-chart-wrapper" style={{ padding: '20px 0' }}>
                              <ResponsiveContainer width="100%" height={280}>
                                <PieChart>
                                  <Pie
                                     data={top5SalesData} // Use dynamic data
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={90}
                                    label={({ cx, cy, midAngle, innerRadius, outerRadius, value, name, percent }) => {
                                      const RADIAN = Math.PI / 180;
                                      const radius = 25 + outerRadius;
                                      const x = cx + radius * Math.cos(-midAngle * RADIAN);
                                      const y = cy + radius * Math.sin(-midAngle * RADIAN);
                                      return (
                                        <text x={x} y={y} fill="#000" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" style={{ fontSize: 11, fontWeight: 700 }}>
                                          {`( ${(percent * 100).toFixed(2)}% ) ${name}`}
                                        </text>
                                      );
                                    }}
                                    labelLine={{ stroke: '#000', strokeWidth: 1 }}
                                  >
                                    {top5SalesData.map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                  </Pie>
                                  <Tooltip contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
                                </PieChart>
                              </ResponsiveContainer>
                            </div>

                            <div className="dn-table-scroll-container" style={{ margin: 0, borderTop: '1px solid #e2e8f0', padding: '0 0px 15px 0px' }}>
                              <table className="dn-erp-table high-density" style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead className="erp-th-gradient">
                                  <tr style={{ background: '#007bff', color: '#fff', fontSize: '11px' }}>
                                    <th style={{ border: '1px solid #cbd5e1', width: 50, textAlign: 'center', background: '#007bff', color: '#fff', padding: '6px 4px', whiteSpace: 'nowrap' }}>Sr.</th>
                                    <th style={{ border: '1px solid #cbd5e1', textAlign: 'center', background: '#007bff', color: '#fff', padding: '6px 4px' }}>Customer / Item</th>
                                    <th style={{ border: '1px solid #cbd5e1', textAlign: 'center', background: '#007bff', color: '#fff', padding: '6px 4px' }}>Value</th>
                                    <th style={{ border: '1px solid #cbd5e1', textAlign: 'center', background: '#007bff', color: '#fff', padding: '6px 4px' }}>%</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {top5SalesData.map((row, idx) => (
                                    <tr key={idx}>
                                      <td style={{ border: '1px solid #cbd5e1', textAlign: 'center', fontWeight: 600 }}>{idx + 1}</td>
                                      <td style={{ border: '1px solid #cbd5e1', textAlign: 'left', fontWeight: 600 }}>{row.name}</td>
                                      <td style={{ border: '1px solid #cbd5e1', textAlign: 'right', fontWeight: 600 }}>{row.value.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                                      <td style={{ border: '1px solid #cbd5e1', textAlign: 'right', fontWeight: 700, color: '#007bff' }}>{top5SalesData.reduce((acc,curr)=>acc+curr.value,0) > 0 ? ( (row.value / top5SalesData.reduce((acc,curr)=>acc+curr.value,0)) * 100 ).toFixed(2) : "0.00"}%</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                              <div style={{ marginTop: 10, fontSize: '11px', fontWeight: 700, color: '#0369a1' }}>
                                Values Include : GST Sales, Export Sales
                              </div>
                            </div>
                          </div>
                        )}

                        {isOpen && label === "Item wise Dispatch" && (
                          <div className="dn-card-body dn-dispatch-body" style={{ padding: 0 }}>
                            {/* Compact Filter Bar - Optimized for Screen Fit */}
                            <div className="dn-inner-filter-bar" style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '6px 10px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', flexWrap: 'nowrap', overflowX: 'auto', width: '100%', boxSizing: 'border-box' }}>
                              <div className="dn-f-item sm" style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '10.5px', fontWeight: 600, flexShrink: 0 }}>
                                Plant : <select className="dn-mini-select" style={{ width: 70 }}><option>VISHWA S.I</option></select>
                              </div>
                              <div className="dn-f-item sm" style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '10.5px', fontWeight: 600, flexShrink: 0 }}>
                                From : <input type="text" className="dn-mini-select" defaultValue="10/04/2026" style={{ width: 75 }} />
                              </div>
                              <div className="dn-f-item sm" style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '10.5px', fontWeight: 600, flexShrink: 0 }}>
                                To : <input type="text" className="dn-mini-select" defaultValue="11/04/2026" style={{ width: 75 }} />
                                <button className="dn-icon-btn small" style={{ margin: 0, padding: '1px 3px', borderRight: '1px solid #cbd5e1', borderRadius: 0, marginRight: '4px' }}>
                                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                                </button>
                              </div>
                              <div className="dn-f-item sm" style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '10.5px', fontWeight: 600, flexShrink: 0 }}>
                                Cust grp : <select className="dn-mini-select" style={{ width: 70 }}><option>Select</option></select>
                              </div>
                              <div className="dn-f-item sm" style={{ display: 'flex', alignItems: 'center', gap: '2px', fontSize: '10.5px', fontWeight: 600, flexShrink: 0 }}>
                                <input type="checkbox" style={{ margin: 0 }} /> Item
                              </div>
                              <div className="dn-f-item sm" style={{ display: 'flex', alignItems: 'center', gap: '2px', fontSize: '10.5px', fontWeight: 600, flexShrink: 0 }}>
                                <input type="checkbox" style={{ margin: 0 }} /> Cust
                              </div>
                              <div className="dn-f-item sm" style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '10.5px', fontWeight: 600, flexShrink: 0 }}>
                                Type <select className="dn-mini-select" style={{ width: 55 }}><option>ALL</option></select>
                              </div>
                              <button className="dn-btn-search" style={{ height: '22px', padding: '0 10px', fontSize: '10.5px', background: '#f1f5f9', border: '1px solid #cbd5e1', color: '#334155', fontWeight: 700, marginLeft: 'auto', flexShrink: 0 }}>Search</button>
                            </div>

                            <div className="dn-table-scroll-container" style={{ margin: 0, border: 'none', padding: '0 0px 0 0px' }}>
                              <table className="dn-erp-table high-density dispatch-table" style={{ width: '100%' }}>
                                <thead>
                                  <tr style={{ background: '#007bff', color: '#fff' }}>
                                    <th style={{ width: 50, background: '#007bff', color: '#fff', textAlign: 'center', border: '1px solid rgba(255,255,255,0.2)', whiteSpace: 'nowrap' }}>Sr.</th>
                                    <th style={{ background: '#007bff', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>Customer</th>
                                    <th style={{ background: '#007bff', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>Item No</th>
                                    <th style={{ background: '#007bff', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>Item Code</th>
                                    <th style={{ background: '#007bff', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>Item Desc</th>
                                    <th style={{ background: '#007bff', color: '#fff', textAlign: "right", border: '1px solid rgba(255,255,255,0.2)' }}>Qty</th>
                                    <th style={{ background: '#007bff', color: '#fff', textAlign: "right", border: '1px solid rgba(255,255,255,0.2)' }}>Amount</th>
                                  </tr>
                                </thead>
                                <tbody>
                                   {itemWiseDispatchData.map((item, idx) => (
                                    <tr key={idx}>
                                      <td style={{ textAlign: "center", border: '1px solid #e2e8f0', padding: '1px 4px', fontSize: '11px' }}>{item.sr}</td>
                                      <td style={{ fontSize: 10, fontWeight: 600, border: '1px solid #e2e8f0', padding: '1px 4px' }}>{item.customer}</td>
                                      <td style={{ border: '1px solid #e2e8f0', padding: '1px 4px', fontSize: '11px' }}>{item.itemNo}</td>
                                      <td style={{ fontWeight: 600, border: '1px solid #e2e8f0', padding: '1px 4px', fontSize: '11px' }}>{item.itemCode}</td>
                                      <td style={{ fontSize: 10, border: '1px solid #e2e8f0', padding: '1px 4px' }}>{item.itemDesc}</td>
                                      <td style={{ textAlign: "right", fontWeight: 700, border: '1px solid #e2e8f0', padding: '1px 4px', fontSize: '11px' }}>{item.qty.toLocaleString()}</td>
                                      <td style={{ textAlign: "right", fontWeight: 700, border: '1px solid #e2e8f0', padding: '1px 4px', fontSize: '11px' }}>{item.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                    </tr>
                                  ))}

                                </tbody>
                              </table>
                            </div>

                            {/* Screenshot-matched Summary Bar */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 10px', background: '#f8fafc' }}>
                              <div style={{ display: 'flex', gap: '2px' }}>
                                <div style={{ background: '#007bff', color: '#fff', padding: '4px 12px', fontSize: '10px', fontWeight: 800, borderRadius: '2px' }}>Total Qty: 433217</div>
                                <div style={{ background: '#007bff', color: '#fff', padding: '4px 12px', fontSize: '10px', fontWeight: 800, borderRadius: '2px' }}>Total Amt: 3874287.44 | Other Charges: 0 | Total: 3874287.44</div>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <button className="dn-icon-btn small excel" style={{ margin: 0, padding: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', border: '1px solid #cbd5e1', background: '#fff', height: '24px', width: '24px' }}>
                                  <div style={{ background: '#1d6f42', color: '#fff', width: '16px', height: '16px', borderRadius: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '900' }}>X</div>
                                </button>
                              </div>
                            </div>
                          </div>
                        )}

                        {isOpen && label === "Business Plan" && (
                          <div className="dn-card-body dn-bp-body" style={{ padding: 0 }}>
                            {/* Multi-Row Filter Bar matched to screenshot */}
                            <div className="dn-inner-filter-bar" style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '10px 16px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                              {/* Row 1: Toggles and Search Label */}
                              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <div className="dn-radio-group mini" style={{ display: 'flex', gap: '10px', fontSize: '11px', fontWeight: 700 }}>
                                  <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="radio" name="bpt" checked={bpTimeMode === "Yearly"} onChange={() => setBpTimeMode("Yearly")} /> Yearly</label>
                                  <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="radio" name="bpt" checked={bpTimeMode === "Monthly"} onChange={() => setBpTimeMode("Monthly")} /> Monthly</label>
                                </div>
                                <label style={{ fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', color: '#1e293b' }}>
                                  <input type="checkbox" /> Customer Wise
                                </label>
                                <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginLeft: '20px' }}>Search By</div>
                              </div>

                              {/* Row 2: Selectors, Search Controls and Excel Icons */}
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <select 
                                  className="dn-mini-select" 
                                  style={{ width: 100 }}
                                  value={bpSelectedYear}
                                  onChange={(e) => setBpSelectedYear(e.target.value)}
                                >
                                  {["2026-27"].map(yr => (
                                    <option key={yr} value={yr}>{yr}</option>
                                  ))}
                                </select>
                                <select 
                                  className="dn-mini-select" 
                                  style={{ width: 100 }}
                                  value={bpSelectedMonth}
                                  onChange={(e) => setBpSelectedMonth(parseInt(e.target.value))}
                                >
                                  {getBpMonths(bpSelectedYear).map(m => (
                                    <option key={m.label} value={m.month}>{m.label}</option>
                                  ))}
                                </select>
                                <input type="text" className="dn-mini-select" placeholder="Enter Customer Name..." style={{ width: 180, background: '#fff' }} />
                                
                                <div className="dn-radio-group mini" style={{ display: 'flex', gap: '8px', fontSize: '11px', fontWeight: 700, marginLeft: '10px' }}>
                                  <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="radio" name="bps" checked={bpSearchBy === "Quantity"} onChange={() => setBpSearchBy("Quantity")} /> Quantity</label>
                                  <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="radio" name="bps" checked={bpSearchBy === "Value"} onChange={() => setBpSearchBy("Value")} /> Value</label>
                                </div>
                                <button className="dn-btn-search" style={{ height: '24px', display: 'flex', alignItems: 'center', gap: '5px', padding: '0 12px', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '11px', fontWeight: 800, color: '#334155' }}>
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                                  Search
                                </button>
                                
                                <div style={{ marginLeft: 'auto', display: 'flex', gap: '5px' }}>
                                  <button className="dn-icon-btn small excel" style={{ margin: 0, padding: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', border: '1px solid #cbd5e1', background: '#fff', height: '24px', width: '24px' }}>
                                    <div style={{ background: '#1d6f42', color: '#fff', width: '16px', height: '16px', borderRadius: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '900' }}>X</div>
                                  </button>
                                  <button className="dn-icon-btn small excel" style={{ margin: 0, padding: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', border: '1px solid #cbd5e1', background: '#fff', height: '24px', width: '24px' }}>
                                    <div style={{ background: '#1d6f42', color: '#fff', width: '16px', height: '16px', borderRadius: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '900' }}>X</div>
                                  </button>
                                </div>
                              </div>
                            </div>

                            <div className="dn-bp-chart-wrapper" style={{ padding: '20px 10px' }}>
                              <ResponsiveContainer width="100%" height={280}>
                                <BarChart data={businessPlanData} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
                                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#1e293b' }} />
                                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                                  <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
                                  <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={45}>
                                    {businessPlanData.map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={index < 3 ? "#0ea5e9" : "#3b82f6"} />
                                    ))}
                                    <LabelList dataKey="value" position="top" style={{ fontSize: 10, fontWeight: 800, fill: '#1e293b' }} />
                                  </Bar>
                                </BarChart>
                              </ResponsiveContainer>
                            </div>

                            {/* Screenshot-matched Detail Table */}
                            <div className="dn-table-scroll-container" style={{ margin: 0, borderTop: '1px solid #e2e8f0', padding: '0 0px 15px 0px' }}>
                              <table className="dn-erp-table high-density" style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead className="erp-th-gradient">
                                  <tr style={{ background: '#007bff', color: '#fff', fontSize: '11px' }}>
                                    <th style={{ border: '1px solid #cbd5e1', width: 30, textAlign: 'center', background: '#007bff', color: '#fff', padding: '6px 4px' }}>#</th>
                                    <th style={{ border: '1px solid #cbd5e1', textAlign: 'center', background: '#007bff', color: '#fff', padding: '6px 4px' }}>{bpSearchBy === "Value" ? "Bus. plan (Val)" : "Bus. plan (Qty)"}</th>
                                    <th style={{ border: '1px solid #cbd5e1', textAlign: 'center', background: '#007bff', color: '#fff', padding: '6px 4px' }}>{bpSearchBy === "Value" ? "Schedule (Val)" : "Schedule (Qty)"}</th>
                                    <th style={{ border: '1px solid #cbd5e1', textAlign: 'center', background: '#007bff', color: '#fff', padding: '6px 4px' }}>{bpSearchBy === "Value" ? "Invoice (Val)" : "Invoice (Qty)"}</th>
                                    <th style={{ border: '1px solid #cbd5e1', textAlign: 'center', background: '#007bff', color: '#fff', padding: '6px 4px' }}>{bpSearchBy === "Value" ? "Schedule (Val) Actual" : "Schedule (Qty) Actual"}</th>
                                    <th style={{ border: '1px solid #cbd5e1', textAlign: 'center', background: '#007bff', color: '#fff', padding: '6px 4px' }}>{bpSearchBy === "Value" ? "Invoice (Val) Actual" : "Invoice (Qty) Actual"}</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td style={{ border: '1px solid #cbd5e1', textAlign: 'center', fontWeight: 600 }}>1</td>
                                    <td style={{ border: '1px solid #cbd5e1', textAlign: 'center' }}>
                                      {(businessPlanData.find(d => d.name === (bpSearchBy === "Value" ? "Bus. plan Val" : "Bus. plan Qty"))?.value || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                    </td>
                                    <td style={{ border: '1px solid #cbd5e1', textAlign: 'center' }}>
                                      {(businessPlanData.find(d => d.name === (bpSearchBy === "Value" ? "Schedule Val" : "Schedule Qty"))?.value || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                    </td>
                                    <td style={{ border: '1px solid #cbd5e1', textAlign: 'center' }}>
                                      {(businessPlanData.find(d => d.name === (bpSearchBy === "Value" ? "Invoice Val" : "Invoice Qty"))?.value || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                    </td>
                                    <td style={{ border: '1px solid #cbd5e1', textAlign: 'center', background: '#fff7ed', fontWeight: 700 }}>
                                      {(businessPlanData.find(d => d.name === (bpSearchBy === "Value" ? "Sch Val Actual" : "Sch Qty Actual"))?.value || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                    </td>
                                    <td style={{ border: '1px solid #cbd5e1', textAlign: 'center', background: '#fff7ed', fontWeight: 700 }}>
                                      {(businessPlanData.find(d => d.name === (bpSearchBy === "Value" ? "Inv Val Actual" : "Inv Qty Actual"))?.value || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <div style={{ marginTop: 10, fontSize: '11px', fontWeight: 700, color: '#007bff' }}>
                                Item Rate : <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Sales Order or Item Master</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {isOpen && label === "State Wise Sales" && (
                          <div className="dn-card-body dn-state-body" style={{ padding: 0 }}>
                            {/* Standardized Filter Strip matched to image */}
                            <div className="dn-inner-filter-bar" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#64748b' }}>Plant : <select className="dn-mini-select" style={{ width: 80, border: 'none', background: 'transparent', fontWeight: 700 }}><option>VISHWA S.I</option></select></div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#64748b', marginLeft: '5px' }}>Year : <select className="dn-mini-select" style={{ width: 100, border: 'none', background: 'transparent', fontWeight: 700 }}><option>2026-2027</option></select></div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#64748b', marginLeft: '5px' }}>Month : <select className="dn-mini-select" style={{ width: 80, border: 'none', background: 'transparent', fontWeight: 700 }}><option>ALL</option></select></div>
                              
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '15px' }}>
                                <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b' }}>Select Type :</span>
                                <div className="dn-radio-group mini" style={{ display: 'flex', gap: '8px', fontSize: '11px', fontWeight: 700 }}>
                                  <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="radio" name="stateType" checked={stateWiseType === "Top 5 State"} onChange={() => setStateWiseType("Top 5 State")} /> Top 5 State</label>
                                  <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="radio" name="stateType" checked={stateWiseType === "Other State"} onChange={() => setStateWiseType("Other State")} /> ALL States</label>
                                </div>
                              </div>

                              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <a href="#" style={{ fontSize: '11px', fontWeight: 700, color: '#007bff', textDecoration: 'none' }}>View More</a>
                                <button className="dn-icon-btn small excel" style={{ margin: 0, padding: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', border: '1px solid #cbd5e1', background: '#fff', height: '24px', width: '24px' }}>
                                  <div style={{ background: '#1d6f42', color: '#fff', width: '16px', height: '16px', borderRadius: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '900' }}>X</div>
                                </button>
                              </div>
                            </div>

                            <div className="dn-state-chart-wrapper">
                              <ResponsiveContainer width="100%" height={320}>
                                <PieChart>
                                  <Pie
                                    data={stateWiseSalesData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    label={({ cx, cy, midAngle, innerRadius, outerRadius, value, name, percent }) => {
                                      const RADIAN = Math.PI / 180;
                                      const radius = 25 + outerRadius;
                                      const x = cx + radius * Math.cos(-midAngle * RADIAN);
                                      const y = cy + radius * Math.sin(-midAngle * RADIAN);
                                      return (
                                        <text x={x} y={y} fill="#000" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" style={{ fontSize: 11, fontWeight: 700 }}>
                                          {`( ${(percent * 100).toFixed(2)}% ) ${name}`}
                                        </text>
                                      );
                                    }}
                                    labelLine={{ stroke: '#38bdf8', strokeWidth: 1 }}
                                  >
                                    {stateWiseSalesData.map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                  </Pie>
                                  <Tooltip contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
                                </PieChart>
                              </ResponsiveContainer>
                            </div>

                            {/* State Wise Detail Table matched to image */}
                            <div className="dn-table-scroll-container" style={{ margin: 0, borderTop: '1px solid #e2e8f0', padding: '0 0px 15px 0px' }}>
                              <table className="dn-erp-table high-density" style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead className="erp-th-gradient">
                                  <tr style={{ background: '#007bff', color: '#fff', fontSize: '11px' }}>
                                    <th style={{ border: '1px solid #cbd5e1', width: 50, textAlign: 'center', background: '#007bff', color: '#fff', padding: '6px 4px', whiteSpace: 'nowrap' }}>Sr.</th>
                                    <th style={{ border: '1px solid #cbd5e1', textAlign: 'left', background: '#007bff', color: '#fff', padding: '6px 4px' }}>Customer</th>
                                    <th style={{ border: '1px solid #cbd5e1', textAlign: 'right', background: '#007bff', color: '#fff', padding: '6px 4px' }}>Assessable Value</th>
                                    <th style={{ border: '1px solid #cbd5e1', textAlign: 'right', background: '#007bff', color: '#fff', padding: '6px 4px' }}>Total Value</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {stateWiseSalesData.map((row, idx) => (
                                    <tr key={idx}>
                                      <td style={{ border: '1px solid #cbd5e1', textAlign: 'center', fontWeight: 600 }}>{idx + 1}</td>
                                      <td style={{ border: '1px solid #cbd5e1', textAlign: 'left', fontWeight: 600 }}>{row.name}</td>
                                      <td style={{ border: '1px solid #cbd5e1', textAlign: 'right', fontWeight: 600 }}>{row.value.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                                      <td style={{ border: '1px solid #cbd5e1', textAlign: 'right', fontWeight: 600 }}>{row.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                              <div style={{ marginTop: 10, fontSize: '11px', fontWeight: 700, color: '#007bff' }}>
                                Values Include : <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>GST Sales</span>, <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Export Sales</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}


          {activeDept === "purchase" && <PurchaseView />}
          {activeDept === "ppc" && <PpcView />}


          {activeDept === "oee" && <OeeView />}

          {activeDept === "stores" && <StoresView />}
          {activeDept === "subcon" && <SubconView />}



          {activeDept === "quality" && <QualityView />}
        </main>
      </div>
      {/* --- Add Favorite Item Modal --- */}
      {showAddFavoriteModal && (
        <div className="dn-modal-overlay">
          <div className="dn-modal-container scale-in" style={{ maxWidth: '700px' }}>
            <div className="dn-modal-header">
              <span>Add Favourite Item</span>
              <button
                className="dn-modal-close-x"
                onClick={() => setShowAddFavoriteModal(false)}
              >
                &times;
              </button>
            </div>

            <div className="dn-modal-body">
              <div className="dn-modal-section-title" style={{ color: '#007bff', fontWeight: 700, marginBottom: '15px' }}>
                Favourite Items Master
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px', borderBottom: '1px solid #f1f5f9', paddingBottom: '15px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#1e293b' }}>Item Code / No :</span>
                <input
                  type="text"
                  placeholder="Enter Item Code.."
                  style={{
                    width: '180px',
                    height: '28px',
                    border: '1px solid #cbd5e1',
                    borderRadius: '4px',
                    padding: '0 10px',
                    fontSize: '12px'
                  }}
                />
                <button style={{
                  background: '#f1f5f9',
                  border: '1px solid #cbd5e1',
                  padding: '4px 15px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}>
                  Save
                </button>
              </div>

              <div style={{
                border: '1px solid #00cfd5',
                padding: '12px',
                color: '#ef4444',
                fontWeight: 700,
                fontSize: '12px',
                marginBottom: '10px',
                minHeight: '200px'
              }}>
                No Data Found !!!
              </div>

              <div style={{ fontSize: '11px', fontWeight: 700, color: '#1e293b' }}>
                Total Record : 0
              </div>
            </div>

            <div className="dn-modal-footer">
              <button
                className="dn-modal-btn-close"
                onClick={() => setShowAddFavoriteModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
