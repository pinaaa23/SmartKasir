"use client";

import React, { useState, useMemo, useEffect, useRef } from 'react';
import '../../../styles/reports.css';

// Master product lists (reused from products/page.js)
const INITIAL_PRODUCTS = [
  { id: 'PRD-001', sku: 'PRD-001', barcode: '899276100123', name: 'Nike Air Max Red', category: 'Fashion', stock: 42, buyPrice: 1200000, sellPrice: 1850000, desc: 'Sepatu lari premium dari Nike dengan bantalan Air Max yang empuk dan nyaman.', initials: 'N', color: '#efeefd' },
  { id: 'PRD-042', sku: 'PRD-042', barcode: '899276100555', name: 'Smartwatch Pro v2', category: 'Elektronik', stock: 4, buyPrice: 2450000, sellPrice: 3200000, desc: 'Jam tangan pintar generasi kedua dengan sensor detak jantung, GPS, dan IP68.', initials: 'S', color: '#eff6ff' },
  { id: 'PRD-109', sku: 'PRD-109', barcode: '899276100999', name: 'Headphone Sony WH', category: 'Elektronik', stock: 0, buyPrice: 4100000, sellPrice: 5500000, desc: 'Headphone premium dengan ANC terbaik untuk kualitas audio murni tanpa bising.', initials: 'H', color: '#fee2e2' },
  { id: 'PRD-215', sku: 'PRD-215', barcode: '899276102154', name: 'Kopi Kenangan Mantan', category: 'Minuman', stock: 158, buyPrice: 18000, sellPrice: 25000, desc: 'Espresso premium khas Kopi Kenangan dengan gula aren asli.', initials: 'K', color: '#ecfdf5' },
  { id: 'PRD-330', sku: 'PRD-330', barcode: '899276103301', name: 'Tas Ransel Eiger', category: 'Aksesoris', stock: 12, buyPrice: 385000, sellPrice: 450000, desc: 'Tas ransel berkapasitas 30L, dilengkapi kompartemen laptop.', initials: 'T', color: '#fff7ed' },
  { id: 'PRD-122', sku: 'PRD-122', barcode: '899276101224', name: 'Samsung Galaxy S24', category: 'Elektronik', stock: 15, buyPrice: 12000000, sellPrice: 14000000, desc: 'Smartphone flagship Samsung terbaru dengan dukungan Galaxy AI.', initials: 'G', color: '#eff6ff' },
  { id: 'PRD-155', sku: 'PRD-155', barcode: '899276101550', name: 'Kaos Polos Cotton', category: 'Fashion', stock: 85, buyPrice: 45000, sellPrice: 75000, desc: 'Kaos polos premium bahan 100% cotton combed 30s adem.', initials: 'C', color: '#efeefd' },
  { id: 'PRD-099', sku: 'PRD-099', barcode: '899276100990', name: 'Air Mineral Pristine', category: 'Minuman', stock: 300, buyPrice: 4000, sellPrice: 6000, desc: 'Air minum alkali dengan pH tinggi 8.6+ untuk menetralisir asam.', initials: 'P', color: '#ecfdf5' }
];

// Helper to generate realistic dates based on today: 2026-06-01
const today = new Date("2026-06-01T22:03:36");
const d = (offset, h = 10, m = 0) => {
  const dt = new Date(today);
  dt.setDate(dt.getDate() - offset);
  dt.setHours(h, m, 0, 0);
  return dt;
};

// Initial realistic transactions
const INITIAL_TRANSACTIONS = [
  {
    id: '#TRX-9921',
    orderId: 'ORD-2341',
    customer: 'Budi Santoso',
    email: 'budi@email.com',
    tipe: 'online',
    metode: 'QRIS',
    totalNum: 1850000,
    status: 'berhasil',
    rawDate: d(0, 18, 30), // Today at 18:30 (Peak Sales!)
    tier: 'Gold Member',
    points: '+185 Pts',
    items: [
      { id: 'PRD-001', name: 'Nike Air Max Red', sku: 'PRD-001', qty: 1, price: 1850000, buyPrice: 1200000, sellPrice: 1850000 }
    ],
    subtotal: 1850000,
    tax: 185000
  },
  {
    id: '#TRX-9920',
    orderId: 'ORD-2340',
    customer: 'Andi Saputra',
    email: 'andi@email.com',
    tipe: 'offline',
    metode: 'Tunai',
    totalNum: 3350000,
    status: 'berhasil',
    rawDate: d(0, 19, 15), // Today at 19:15 (Peak Sales!)
    tier: 'Silver Member',
    points: '+335 Pts',
    items: [
      { id: 'PRD-042', name: 'Smartwatch Pro v2', sku: 'PRD-042', qty: 1, price: 3200000, buyPrice: 2450000, sellPrice: 3200000 },
      { id: 'PRD-155', name: 'Kaos Polos Cotton', sku: 'PRD-155', qty: 2, price: 75000, buyPrice: 45000, sellPrice: 75000 }
    ],
    subtotal: 3350000,
    tax: 335000
  },
  {
    id: '#TRX-9919',
    orderId: '-',
    customer: 'Anonim',
    email: 'anonim@email.com',
    tipe: 'offline',
    metode: 'GoPay',
    totalNum: 56000,
    status: 'berhasil',
    rawDate: d(0, 12, 10), // Today
    tier: 'General Member',
    points: '+5 Pts',
    items: [
      { id: 'PRD-215', name: 'Kopi Kenangan Mantan', sku: 'PRD-215', qty: 2, price: 25000, buyPrice: 18000, sellPrice: 25000 },
      { id: 'PRD-099', name: 'Air Mineral Pristine', sku: 'PRD-099', qty: 1, price: 6000, buyPrice: 4000, sellPrice: 6000 }
    ],
    subtotal: 56000,
    tax: 5600
  },
  {
    id: '#TRX-9918',
    orderId: 'ORD-2338',
    customer: 'Siti Rahma',
    email: 'siti@email.com',
    tipe: 'online',
    metode: 'Virtual Account',
    totalNum: 450000,
    status: 'berhasil',
    rawDate: d(0, 9, 30), // Today
    tier: 'Bronze Member',
    points: '+45 Pts',
    items: [
      { id: 'PRD-330', name: 'Tas Ransel Eiger', sku: 'PRD-330', qty: 1, price: 450000, buyPrice: 385000, sellPrice: 450000 }
    ],
    subtotal: 450000,
    tax: 45000
  },
  {
    id: '#TRX-9917',
    orderId: '-',
    customer: 'Citra Lestari',
    email: 'citra@email.com',
    tipe: 'online',
    metode: 'OVO',
    totalNum: 75000,
    status: 'refund',
    rawDate: d(0, 8, 30), // Today
    tier: 'Silver Member',
    points: '-75 Pts',
    items: [
      { id: 'PRD-155', name: 'Kaos Polos Cotton', sku: 'PRD-155', qty: 1, price: 75000, buyPrice: 45000, sellPrice: 75000 }
    ],
    subtotal: 75000,
    tax: 7500
  },
  {
    id: '#TRX-9916',
    orderId: 'ORD-2335',
    customer: 'Doni Firmansyah',
    email: 'doni@email.com',
    tipe: 'online',
    metode: 'Transfer Bank',
    totalNum: 14000000,
    status: 'berhasil',
    rawDate: d(1, 15, 20), // Yesterday
    tier: 'Gold Member',
    points: '+1400 Pts',
    items: [
      { id: 'PRD-122', name: 'Samsung Galaxy S24', sku: 'PRD-122', qty: 1, price: 14000000, buyPrice: 12000000, sellPrice: 14000000 }
    ],
    subtotal: 14000000,
    tax: 1400000
  },
  {
    id: '#TRX-9915',
    orderId: '-',
    customer: 'Ani Wijaya',
    email: 'ani.w@email.com',
    tipe: 'offline',
    metode: 'Tunai',
    totalNum: 900000,
    status: 'berhasil',
    rawDate: d(2, 13, 10), // 2 days ago
    tier: 'Gold Member',
    points: '+90 Pts',
    items: [
      { id: 'PRD-330', name: 'Tas Ransel Eiger', sku: 'PRD-330', qty: 2, price: 450000, buyPrice: 385000, sellPrice: 450000 }
    ],
    subtotal: 900000,
    tax: 90000
  },
  {
    id: '#TRX-9914',
    orderId: 'ORD-2333',
    customer: 'Lukman Hakim',
    email: 'lukman@email.com',
    tipe: 'online',
    metode: 'Virtual Account',
    totalNum: 5500000,
    status: 'berhasil',
    rawDate: d(3, 11, 45), // 3 days ago
    tier: 'Gold Member',
    points: '+550 Pts',
    items: [
      { id: 'PRD-109', name: 'Headphone Sony WH', sku: 'PRD-109', qty: 1, price: 5500000, buyPrice: 4100000, sellPrice: 5500000 }
    ],
    subtotal: 5500000,
    tax: 550000
  },
  {
    id: '#TRX-9913',
    orderId: '-',
    customer: 'Rina Pratiwi',
    email: 'rina@email.com',
    tipe: 'offline',
    metode: 'Tunai',
    totalNum: 150000,
    status: 'pending',
    rawDate: d(4, 16, 30), // 4 days ago
    tier: 'Silver Member',
    points: 'Pending',
    items: [
      { id: 'PRD-155', name: 'Kaos Polos Cotton', sku: 'PRD-155', qty: 2, price: 75000, buyPrice: 45000, sellPrice: 75000 }
    ],
    subtotal: 150000,
    tax: 15000
  },
  {
    id: '#TRX-9912',
    orderId: 'ORD-2330',
    customer: 'Gita Saraswati',
    email: 'gita@email.com',
    tipe: 'online',
    metode: 'QRIS',
    totalNum: 1850000,
    status: 'berhasil',
    rawDate: d(5, 10, 0), // 5 days ago
    tier: 'Silver Member',
    points: '+185 Pts',
    items: [
      { id: 'PRD-001', name: 'Nike Air Max Red', sku: 'PRD-001', qty: 1, price: 1850000, buyPrice: 1200000, sellPrice: 1850000 }
    ],
    subtotal: 1850000,
    tax: 185000
  },
  {
    id: '#TRX-9911',
    orderId: 'ORD-2328',
    customer: 'Hadi Prasetyo',
    email: 'hadi@email.com',
    tipe: 'online',
    metode: 'GoPay',
    totalNum: 3200000,
    status: 'berhasil',
    rawDate: d(6, 14, 15), // 6 days ago
    tier: 'Bronze Member',
    points: '+320 Pts',
    items: [
      { id: 'PRD-042', name: 'Smartwatch Pro v2', sku: 'PRD-042', qty: 1, price: 3200000, buyPrice: 2450000, sellPrice: 3200000 }
    ],
    subtotal: 3200000,
    tax: 320000
  },
  {
    id: '#TRX-9910',
    orderId: '-',
    customer: 'Mega Utami',
    email: 'mega@email.com',
    tipe: 'offline',
    metode: 'Kartu',
    totalNum: 250000,
    status: 'berhasil',
    rawDate: d(12, 12, 0), // 12 days ago
    tier: 'Silver Member',
    points: '+25 Pts',
    items: [
      { id: 'PRD-215', name: 'Kopi Kenangan Mantan', sku: 'PRD-215', qty: 10, price: 25000, buyPrice: 18000, sellPrice: 25000 }
    ],
    subtotal: 250000,
    tax: 25000
  },
  {
    id: '#TRX-9909',
    orderId: 'ORD-2325',
    customer: 'Oki Setiawan',
    email: 'oki@email.com',
    tipe: 'online',
    metode: 'Transfer Bank',
    totalNum: 14000000,
    status: 'berhasil',
    rawDate: d(18, 14, 0), // 18 days ago
    tier: 'Gold Member',
    points: '+1400 Pts',
    items: [
      { id: 'PRD-122', name: 'Samsung Galaxy S24', sku: 'PRD-122', qty: 1, price: 14000000, buyPrice: 12000000, sellPrice: 14000000 }
    ],
    subtotal: 14000000,
    tax: 1400000
  },
  {
    id: '#TRX-9908',
    orderId: '-',
    customer: 'Indah Cahyani',
    email: 'indah@email.com',
    tipe: 'offline',
    metode: 'Tunai',
    totalNum: 900000,
    status: 'berhasil',
    rawDate: d(25, 15, 30), // 25 days ago
    tier: 'Bronze Member',
    points: '+90 Pts',
    items: [
      { id: 'PRD-330', name: 'Tas Ransel Eiger', sku: 'PRD-330', qty: 2, price: 450000, buyPrice: 385000, sellPrice: 450000 }
    ],
    subtotal: 900000,
    tax: 90000
  },
  {
    id: '#TRX-9907',
    orderId: 'ORD-2320',
    customer: 'Joko Widodo',
    email: 'joko@email.com',
    tipe: 'online',
    metode: 'Virtual Account',
    totalNum: 5500000,
    status: 'berhasil',
    rawDate: d(45, 11, 20), // 45 days ago
    tier: 'Bronze Member',
    points: '+550 Pts',
    items: [
      { id: 'PRD-109', name: 'Headphone Sony WH', sku: 'PRD-109', qty: 1, price: 5500000, buyPrice: 4100000, sellPrice: 5500000 }
    ],
    subtotal: 5500000,
    tax: 550000
  },
  {
    id: '#TRX-9906',
    orderId: 'ORD-2315',
    customer: 'Lukman Hakim',
    email: 'lukman@email.com',
    tipe: 'online',
    metode: 'Transfer Bank',
    totalNum: 28000000,
    status: 'berhasil',
    rawDate: d(75, 10, 45), // 75 days ago
    tier: 'Gold Member',
    points: '+2800 Pts',
    items: [
      { id: 'PRD-122', name: 'Samsung Galaxy S24', sku: 'PRD-122', qty: 2, price: 14000000, buyPrice: 12000000, sellPrice: 14000000 }
    ],
    subtotal: 28000000,
    tax: 2800000
  },
  {
    id: '#TRX-9905',
    orderId: '-',
    customer: 'Citra Lestari',
    email: 'citra@email.com',
    tipe: 'offline',
    metode: 'OVO',
    totalNum: 1850000,
    status: 'berhasil',
    rawDate: d(120, 16, 0), // 120 days ago
    tier: 'Silver Member',
    points: '+185 Pts',
    items: [
      { id: 'PRD-001', name: 'Nike Air Max Red', sku: 'PRD-001', qty: 1, price: 1850000, buyPrice: 1200000, sellPrice: 1850000 }
    ],
    subtotal: 1850000,
    tax: 185000
  },
  {
    id: '#TRX-9904',
    orderId: 'ORD-2300',
    customer: 'Budi Santoso',
    email: 'budi@email.com',
    tipe: 'online',
    metode: 'Kartu',
    totalNum: 3200000,
    status: 'berhasil',
    rawDate: d(180, 15, 0), // 180 days ago
    tier: 'Gold Member',
    points: '+320 Pts',
    items: [
      { id: 'PRD-042', name: 'Smartwatch Pro v2', sku: 'PRD-042', qty: 1, price: 3200000, buyPrice: 2450000, sellPrice: 3200000 }
    ],
    subtotal: 3200000,
    tax: 320000
  },
  {
    id: '#TRX-9903',
    orderId: '-',
    customer: 'Andi Saputra',
    email: 'andi@email.com',
    tipe: 'offline',
    metode: 'QRIS',
    totalNum: 750000,
    status: 'berhasil',
    rawDate: d(240, 13, 0), // 240 days ago
    tier: 'Silver Member',
    points: '+75 Pts',
    items: [
      { id: 'PRD-155', name: 'Kaos Polos Cotton', sku: 'PRD-155', qty: 10, price: 75000, buyPrice: 45000, sellPrice: 75000 }
    ],
    subtotal: 750000,
    tax: 75000
  },
  {
    id: '#TRX-9902',
    orderId: '-',
    customer: 'Ani Wijaya',
    email: 'ani.w@email.com',
    tipe: 'offline',
    metode: 'Tunai',
    totalNum: 1850000,
    status: 'berhasil',
    rawDate: d(300, 12, 0), // 300 days ago
    tier: 'Gold Member',
    points: '+185 Pts',
    items: [
      { id: 'PRD-001', name: 'Nike Air Max Red', sku: 'PRD-001', qty: 1, price: 1850000, buyPrice: 1200000, sellPrice: 1850000 }
    ],
    subtotal: 1850000,
    tax: 185000
  }
];

const formatRupiah = (val) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(val);
};

export default function ReportsPage() {
  // --- SYNCHRONIZED STATE IN-MEMORY ---
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);

  // --- CORE UI FILTER STATE ---
  const [dateRange, setDateRange] = useState('bulanan'); // 'hari-ini' | 'mingguan' | 'bulanan' | 'tahunan'
  const [chartRange, setChartRange] = useState('bulanan'); // 'harian' | 'mingguan' | 'bulanan' | 'tahunan'
  const [activeKpiFilter, setActiveKpiFilter] = useState(null); // 'pemasukan' filter | null
  
  // Table search, filter, sorting, pagination
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua');
  const [paymentFilter, setPaymentFilter] = useState('Semua');
  const [dateSelectFilter, setDateSelectFilter] = useState('Semua'); // 'Semua' | 'Hari Ini' | 'Minggu Ini' | 'Bulan Ini'
  const [nominalFilter, setNominalFilter] = useState('Semua'); // 'Semua' | '<100rb' | '100rb-500rb' | '500rb-1jt' | '>1jt'
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Chart interactivity
  const [hoveredPoint, setHoveredPoint] = useState(null); // point data
  const expenseChartSectionRef = useRef(null);

  // --- MODAL STATES ---
  const [showGrossProfitModal, setShowGrossProfitModal] = useState(false);
  const [showNetProfitModal, setShowNetProfitModal] = useState(false);
  const [showPeakSalesModal, setShowPeakSalesModal] = useState(false);
  const [showAvgTxModal, setShowAvgTxModal] = useState(false);
  const [selectedProductDetail, setSelectedProductDetail] = useState(null);
  const [selectedTrxDetail, setSelectedTrxDetail] = useState(null);
  const [selectedCustomerDetail, setSelectedCustomerDetail] = useState(null);
  const [restockForm, setRestockForm] = useState(null); // { sku, name, qty }
  const [exportPreview, setExportPreview] = useState(null); // 'csv' | 'excel' | 'pdf'

  // --- TOAST NOTIFICATIONS ---
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Sync chartRange when dateRange changes
  useEffect(() => {
    if (dateRange === 'hari-ini') setChartRange('harian');
    else if (dateRange === 'mingguan') setChartRange('mingguan');
    else if (dateRange === 'bulanan') setChartRange('bulanan');
    else if (dateRange === 'tahunan') setChartRange('tahunan');
  }, [dateRange]);

  // Reset page number on search or filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, paymentFilter, dateSelectFilter, nominalFilter, sortField, dateRange, activeKpiFilter]);

  // ========================================================
  // MATHEMATICAL AND LOGICAL CALCULATORS (DYNAMICAL MATH)
  // ========================================================

  // 1. Filtered Transactions based on Date Range Period
  const periodFilteredTrx = useMemo(() => {
    return transactions.filter(t => {
      const trxDate = new Date(t.rawDate);
      const diffTime = today.getTime() - trxDate.getTime();
      const diffDays = diffTime / (1000 * 60 * 60 * 24);

      if (dateRange === 'hari-ini') {
        // Same calendar day as 2026-06-01
        return trxDate.toDateString() === today.toDateString();
      } else if (dateRange === 'mingguan') {
        return diffDays >= 0 && diffDays < 7;
      } else if (dateRange === 'bulanan') {
        return diffDays >= 0 && diffDays < 30;
      } else {
        return diffDays >= 0 && diffDays < 365;
      }
    });
  }, [dateRange, transactions]);

  // 2. Successful Transactions in the selected period (Omzet generator)
  const successfulTrx = useMemo(() => {
    return periodFilteredTrx.filter(t => t.status === 'berhasil');
  }, [periodFilteredTrx]);

  // 3. Dynamic KPI Cards
  const kpiValues = useMemo(() => {
    // Total Pemasukan = Sum of totalNum of berhasil transactions
    const pemasukan = successfulTrx.reduce((acc, t) => acc + t.totalNum, 0);

    // COGS = Cost of Goods Sold = sum of buyPrice * qty
    const cogs = successfulTrx.reduce((acc, t) => {
      const itemsCost = t.items.reduce((sum, item) => sum + (item.buyPrice * item.qty), 0);
      return acc + itemsCost;
    }, 0);

    // Simulated Base Operational Cost for each period
    let operational = 1800000; // Hari Ini
    if (dateRange === 'mingguan') operational = 10200000;
    else if (dateRange === 'bulanan') operational = 48200000;
    else if (dateRange === 'tahunan') operational = 540000000;

    // Total Pengeluaran = COGS + Base Operational Cost
    const pengeluaran = cogs + operational;

    // Laba Kotor = Pemasukan - HPP
    const labaKotor = pemasukan - cogs;

    // Laba Bersih = Laba Kotor - Operational Cost
    const labaBersih = labaKotor - operational;

    // Trends based on period
    const trends = {
      pem: dateRange === 'hari-ini' ? '+3.4%' : dateRange === 'mingguan' ? '+8.7%' : dateRange === 'bulanan' ? '+12.5%' : '+24.6%',
      peng: dateRange === 'hari-ini' ? '-1.2%' : dateRange === 'mingguan' ? '+2.1%' : dateRange === 'bulanan' ? '+4.2%' : '+10.5%',
      lKotor: dateRange === 'hari-ini' ? '+5.1%' : dateRange === 'mingguan' ? '+11.2%' : dateRange === 'bulanan' ? '+18.1%' : '+28.4%',
      lBersih: dateRange === 'hari-ini' ? '+6.2%' : dateRange === 'mingguan' ? '+12.5%' : dateRange === 'bulanan' ? '+15.3%' : '+31.2%'
    };

    return { pemasukan, cogs, operational, pengeluaran, labaKotor, labaBersih, trends };
  }, [dateRange, successfulTrx]);

  // 4. Products selling statistics in the selected period (Produk Teruntung)
  const productProfitStats = useMemo(() => {
    const statsMap = {};
    successfulTrx.forEach(t => {
      t.items.forEach(item => {
        const key = item.id;
        const profitPerUnit = item.sellPrice - item.buyPrice;
        const totalProfit = profitPerUnit * item.qty;
        
        if (!statsMap[key]) {
          statsMap[key] = {
            id: item.id,
            name: item.name,
            sku: item.sku,
            qtySold: 0,
            totalProfit: 0
          };
        }
        statsMap[key].qtySold += item.qty;
        statsMap[key].totalProfit += totalProfit;
      });
    });

    const statsList = Object.values(statsMap).sort((a, b) => b.totalProfit - a.totalProfit);
    const totalProfitAll = statsList.reduce((sum, item) => sum + item.totalProfit, 0);

    // Map contributions
    return statsList.map(item => ({
      ...item,
      pct: totalProfitAll > 0 ? ((item.totalProfit / totalProfitAll) * 100).toFixed(1) : 0
    }));
  }, [successfulTrx]);

  // Top Most Profitable Product
  const bestProduct = useMemo(() => {
    if (productProfitStats.length > 0) {
      const top = productProfitStats[0];
      return {
        name: top.name,
        profit: top.totalProfit,
        desc: `Terjual ${top.qtySold} unit ${dateRange === 'hari-ini' ? 'hari ini' : dateRange === 'mingguan' ? 'minggu ini' : dateRange === 'bulanan' ? 'bulan ini' : 'tahun ini'}`,
        pct: top.pct,
        id: top.id
      };
    }
    return { name: 'Nike Air Max Red', profit: 650000, desc: 'Terjual 1 unit', pct: '100', id: 'PRD-001' };
  }, [productProfitStats, dateRange]);

  // 5. Peak Sales Analyzer (derived from successful transactions)
  const peakSalesStats = useMemo(() => {
    const hourlyCounts = Array(24).fill(0);
    const hourlyRevenue = Array(24).fill(0);

    successfulTrx.forEach(t => {
      const hr = new Date(t.rawDate).getHours();
      hourlyCounts[hr] += 1;
      hourlyRevenue[hr] += t.totalNum;
    });

    // Find busiest hour
    let busiestHour = 18; // default fallback
    let maxTx = 0;
    for (let h = 0; h < 24; h++) {
      if (hourlyCounts[h] > maxTx) {
        maxTx = hourlyCounts[h];
        busiestHour = h;
      }
    }

    const totalBusiestOmzet = hourlyRevenue[busiestHour] || (successfulTrx.length > 0 ? Math.round(kpiValues.pemasukan * 0.4) : 4200000);
    const totalBusiestCount = hourlyCounts[busiestHour] || (successfulTrx.length > 0 ? Math.ceil(successfulTrx.length * 0.4) : 2);

    return {
      hour: `${String(busiestHour).padStart(2, '0')}:00 - ${String(busiestHour + 2).padStart(2, '0')}:00 WIB`,
      count: totalBusiestCount,
      omzet: totalBusiestOmzet
    };
  }, [successfulTrx, kpiValues]);

  // 6. Penjualan Tertinggi Day Calculator
  const highestSalesDay = useMemo(() => {
    const dayMap = {};
    successfulTrx.forEach(t => {
      const dateStr = new Date(t.rawDate).toDateString();
      if (!dayMap[dateStr]) {
        dayMap[dateStr] = {
          date: new Date(t.rawDate),
          omzet: 0,
          count: 0
        };
      }
      dayMap[dateStr].omzet += t.totalNum;
      dayMap[dateStr].count += 1;
    });

    const daysList = Object.values(dayMap).sort((a, b) => b.omzet - a.omzet);

    if (daysList.length > 0) {
      const top = daysList[0];
      const dayName = top.date.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'short' });
      return {
        day: dayName,
        val: top.omzet,
        count: top.count,
        rawDateStr: top.date.toDateString()
      };
    }

    return {
      day: dateRange === 'hari-ini' ? 'Hari Ini' : dateRange === 'mingguan' ? 'Sabtu' : dateRange === 'bulanan' ? 'Sabtu, 24 Mei' : 'Desember 2026',
      val: dateRange === 'hari-ini' ? kpiValues.pemasukan : Math.round(kpiValues.pemasukan * 0.3),
      count: Math.ceil(successfulTrx.length * 0.3) || 1,
      rawDateStr: null
    };
  }, [successfulTrx, dateRange, kpiValues]);

  // 7. Rata-rata Transaksi Calculator
  const averageTxSize = useMemo(() => {
    const count = successfulTrx.length;
    const value = count > 0 ? Math.round(kpiValues.pemasukan / count) : 0;
    return {
      val: value,
      trend: dateRange === 'hari-ini' ? '+4.5%' : dateRange === 'mingguan' ? '+6.2%' : dateRange === 'bulanan' ? '+5.2%' : '+8.4%',
      desc: count > 0 ? `Dihitung dari ${count} transaksi sukses` : 'Belum ada transaksi sukses'
    };
  }, [successfulTrx, kpiValues, dateRange]);

  // 8. Smart Restock Recommendation AI
  const restockRecommendations = useMemo(() => {
    // low stock <= 15 and has high sales velocity
    return products.filter(p => p.stock <= 15).map(p => {
      // calculate sales velocity (quantity sold in this period)
      let qtySold = 0;
      successfulTrx.forEach(t => {
        t.items.forEach(it => {
          if (it.id === p.id) qtySold += it.qty;
        });
      });

      const daysLeft = p.stock === 0 ? 0 : qtySold > 0 ? Math.ceil(p.stock / (qtySold / (dateRange === 'hari-ini' ? 1 : dateRange === 'mingguan' ? 7 : dateRange === 'bulanan' ? 30 : 365))) : p.stock * 2;
      const daysLeftClamped = Math.max(daysLeft, 1);

      return {
        id: p.id,
        name: p.name,
        sku: p.sku,
        left: p.stock,
        max: p.id === 'PRD-109' ? 15 : p.id === 'PRD-042' ? 20 : 50,
        daysLeft: p.stock === 0 ? 'Habis' : `${daysLeftClamped} hari`,
        status: p.stock === 0 ? 'danger' : p.stock <= 5 ? 'danger' : 'warning',
        reason: qtySold > 5 ? 'Kecepatan penjualan tinggi' : p.stock === 0 ? 'Stok kosong' : 'Stok kritis menipis'
      };
    }).sort((a, b) => (a.left - b.left));
  }, [products, successfulTrx, dateRange]);

  // 9. Simulated Expenses categories breakdown (linked with donut segment)
  const expensesBreakdown = useMemo(() => {
    // Total Pengeluaran = kpiValues.cogs + kpiValues.operational
    const cogsShare = kpiValues.cogs;
    const opShare = kpiValues.operational;

    const total = cogsShare + opShare;

    // Split operational costs logic
    let cat1 = "Bahan Baku / Stok";
    let cat2 = "Operasional Karyawan";
    let cat3 = "Sewa & Utilitas";

    let val1 = cogsShare + Math.round(opShare * 0.6);
    let val2 = Math.round(opShare * 0.25);
    let val3 = Math.round(opShare * 0.15);

    const pct1 = total > 0 ? Math.round((val1 / total) * 100) : 0;
    const pct2 = total > 0 ? Math.round((val2 / total) * 100) : 0;
    const pct3 = total > 0 ? 100 - pct1 - pct2 : 0;

    return {
      operational: [
        { label: cat1, value: val1, pct: pct1, color: '#6366f1' },
        { label: cat2, value: val2, pct: pct2, color: '#3b82f6' },
        { label: cat3, value: val3, pct: pct3, color: '#ef4444' }
      ],
      totalOperational: total
    };
  }, [kpiValues]);

  // Donut segment generator
  const donutSegments = useMemo(() => {
    const radius = 40;
    const circumference = 2 * Math.PI * radius; // 251.32
    let cumulativePercent = 0;

    return expensesBreakdown.operational.map(item => {
      const strokeLength = (item.pct / 100) * circumference;
      const strokeOffset = circumference - strokeLength + (cumulativePercent / 100) * circumference;
      cumulativePercent += item.pct;
      return {
        ...item,
        strokeLength,
        strokeOffset: -strokeOffset
      };
    });
  }, [expensesBreakdown]);

  // 10. Dynamic SVG finance line/area chart coordinates
  const chartCoordinates = useMemo(() => {
    const range = chartRange;
    let labels = [];
    let pemasukanRaw = [];
    let pengeluaranRaw = [];
    
    if (range === 'harian') {
      labels = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'];
      pemasukanRaw = [0, 0, 0, 0, 0, 0, 0];
      pengeluaranRaw = [0, 0, 0, 0, 0, 0, 0];
      
      const trxToday = transactions.filter(t => {
        const trxDate = new Date(t.rawDate);
        return trxDate.toDateString() === today.toDateString() && t.status === 'berhasil';
      });
      
      trxToday.forEach(t => {
        const hr = new Date(t.rawDate).getHours();
        let idx = 0;
        if (hr < 9) idx = 0;
        else if (hr < 11) idx = 1;
        else if (hr < 13) idx = 2;
        else if (hr < 15) idx = 3;
        else if (hr < 17) idx = 4;
        else if (hr < 19) idx = 5;
        else idx = 6;
        
        pemasukanRaw[idx] += t.totalNum;
        let cogs = t.items.reduce((acc, it) => acc + (it.buyPrice * it.qty), 0);
        pengeluaranRaw[idx] += cogs;
      });
      
      const hourlyOverhead = 1800000 / 7;
      for (let i = 0; i < 7; i++) {
        pengeluaranRaw[i] += hourlyOverhead;
        if (pemasukanRaw[i] === 0) {
          pemasukanRaw[i] = [600000, 1400000, 2600000, 1800000, 3000000, 4400000, 3200000][i];
          pengeluaranRaw[i] = [400000, 800000, 1200000, 1000000, 1200000, 1600000, 1000000][i] + hourlyOverhead;
        }
      }
    } else if (range === 'mingguan') {
      labels = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
      pemasukanRaw = [0, 0, 0, 0, 0, 0, 0];
      pengeluaranRaw = [0, 0, 0, 0, 0, 0, 0];
      
      const trxWeek = transactions.filter(t => {
        const diff = (today.getTime() - new Date(t.rawDate).getTime()) / (1000 * 60 * 60 * 24);
        return diff < 7 && t.status === 'berhasil';
      });
      
      trxWeek.forEach(t => {
        let day = new Date(t.rawDate).getDay();
        let idx = day === 0 ? 6 : day - 1;
        
        pemasukanRaw[idx] += t.totalNum;
        let cogs = t.items.reduce((acc, it) => acc + (it.buyPrice * it.qty), 0);
        pengeluaranRaw[idx] += cogs;
      });
      
      const dailyOverhead = 10200000 / 7;
      for (let i = 0; i < 7; i++) {
        pengeluaranRaw[i] += dailyOverhead;
        if (pemasukanRaw[i] === 0) {
          pemasukanRaw[i] = [2400000, 3000000, 2700000, 3600000, 4800000, 7200000, 5700000][i];
          pengeluaranRaw[i] = [1200000, 1320000, 1500000, 1200000, 2100000, 3000000, 1800000][i] + dailyOverhead;
        }
      }
    } else if (range === 'bulanan') {
      labels = ['M1', 'M2', 'M3', 'M4'];
      pemasukanRaw = [0, 0, 0, 0];
      pengeluaranRaw = [0, 0, 0, 0];
      
      const trxMonth = transactions.filter(t => {
        const diff = (today.getTime() - new Date(t.rawDate).getTime()) / (1000 * 60 * 60 * 24);
        return diff < 30 && t.status === 'berhasil';
      });
      
      trxMonth.forEach(t => {
        const diffDays = Math.floor((today.getTime() - new Date(t.rawDate).getTime()) / (1000 * 60 * 60 * 24));
        let idx = 3;
        if (diffDays >= 21) idx = 0;
        else if (diffDays >= 14) idx = 1;
        else if (diffDays >= 7) idx = 2;
        
        pemasukanRaw[idx] += t.totalNum;
        let cogs = t.items.reduce((acc, it) => acc + (it.buyPrice * it.qty), 0);
        pengeluaranRaw[idx] += cogs;
      });
      
      const weeklyOverhead = 48200000 / 4;
      for (let i = 0; i < 4; i++) {
        pengeluaranRaw[i] += weeklyOverhead;
        if (pemasukanRaw[i] === 0) {
          pemasukanRaw[i] = [22500000, 37500000, 45000000, 65000000][i];
          pengeluaranRaw[i] = [12500000, 17500000, 15000000, 22500000][i] + weeklyOverhead;
        }
      }
    } else {
      labels = ['Q1', 'Q2', 'Q3', 'Q4'];
      pemasukanRaw = [0, 0, 0, 0];
      pengeluaranRaw = [0, 0, 0, 0];
      
      const trxYear = transactions.filter(t => {
        const diff = (today.getTime() - new Date(t.rawDate).getTime()) / (1000 * 60 * 60 * 24);
        return diff < 365 && t.status === 'berhasil';
      });
      
      trxYear.forEach(t => {
        const diffDays = Math.floor((today.getTime() - new Date(t.rawDate).getTime()) / (1000 * 60 * 60 * 24));
        let idx = 3;
        if (diffDays >= 270) idx = 0;
        else if (diffDays >= 180) idx = 1;
        else if (diffDays >= 90) idx = 2;
        
        pemasukanRaw[idx] += t.totalNum;
        let cogs = t.items.reduce((acc, it) => acc + (it.buyPrice * it.qty), 0);
        pengeluaranRaw[idx] += cogs;
      });
      
      const quarterlyOverhead = 540000000 / 4;
      for (let i = 0; i < 4; i++) {
        pengeluaranRaw[i] += quarterlyOverhead;
        if (pemasukanRaw[i] === 0) {
          pemasukanRaw[i] = [300000000, 450000000, 550000000, 750000000][i];
          pengeluaranRaw[i] = [150000000, 200000000, 225000000, 275000000][i] + quarterlyOverhead;
        }
      }
    }
    
    // Scale to fits inside SVG drawing box
    const maxVal = Math.max(...pemasukanRaw, ...pengeluaranRaw) || 1000000;
    const scale = 110 / maxVal;
    
    const pemasukan = pemasukanRaw.map(v => v * scale);
    const pengeluaran = pengeluaranRaw.map(v => v * scale);
    
    return { labels, pemasukan, pemasukanRaw, pengeluaran, pengeluaranRaw };
  }, [chartRange, transactions]);

  // ========================================================
  // TABLE SEARCH, FILTER, SORT, AND PAGINATION
  // ========================================================

  const filteredAndSortedTrx = useMemo(() => {
    let result = [...periodFilteredTrx];

    // 1. Active KPI Card filtering
    if (activeKpiFilter === 'pemasukan') {
      result = result.filter(t => t.status === 'berhasil' && t.totalNum > 0);
    }

    // 2. Realtime Search (ID Transaksi, Nama Customer, Nama Produk)
    if (search.trim() !== '') {
      const q = search.toLowerCase();
      result = result.filter(t => 
        t.id.toLowerCase().includes(q) ||
        t.customer.toLowerCase().includes(q) ||
        t.items.some(item => item.name.toLowerCase().includes(q))
      );
    }

    // 3. Status filter
    if (statusFilter !== 'Semua') {
      const target = statusFilter.toLowerCase();
      result = result.filter(t => t.status === (target === 'failed' || target === 'gagal' || target === 'refund' ? 'refund' : target));
    }

    // 4. Payment Method filter
    if (paymentFilter !== 'Semua') {
      result = result.filter(t => t.metode.toLowerCase().includes(paymentFilter.toLowerCase()));
    }

    // 5. Date Select Filter
    if (dateSelectFilter !== 'Semua') {
      result = result.filter(t => {
        const tDate = new Date(t.rawDate);
        const diff = (today.getTime() - tDate.getTime()) / (1000 * 60 * 60 * 24);
        if (dateSelectFilter === 'Hari Ini') return tDate.toDateString() === today.toDateString();
        if (dateSelectFilter === 'Minggu Ini') return diff >= 0 && diff < 7;
        if (dateSelectFilter === 'Bulan Ini') return diff >= 0 && diff < 30;
        return true;
      });
    }

    // 6. Nominal Filter
    if (nominalFilter !== 'Semua') {
      result = result.filter(t => {
        if (nominalFilter === '<100rb') return t.totalNum < 100000;
        if (nominalFilter === '100rb-500rb') return t.totalNum >= 100000 && t.totalNum <= 500000;
        if (nominalFilter === '500rb-1jt') return t.totalNum > 500000 && t.totalNum <= 1000000;
        if (nominalFilter === '>1jt') return t.totalNum > 1000000;
        return true;
      });
    }

    // 7. Sorting Ascending / Descending
    result.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      if (sortField === 'date') {
        aVal = new Date(a.rawDate).getTime();
        bVal = new Date(b.rawDate).getTime();
      } else if (sortField === 'pemasukan') {
        aVal = a.status === 'berhasil' ? a.totalNum : 0;
        bVal = b.status === 'berhasil' ? b.totalNum : 0;
      } else if (sortField === 'pengeluaran') {
        aVal = a.items.reduce((s, it) => s + (it.buyPrice * it.qty), 0);
        bVal = b.items.reduce((s, it) => s + (it.buyPrice * it.qty), 0);
      } else if (sortField === 'laba') {
        const aPem = a.status === 'berhasil' ? a.totalNum : 0;
        const aCost = a.items.reduce((s, it) => s + (it.buyPrice * it.qty), 0);
        aVal = aPem - aCost;
        
        const bPem = b.status === 'berhasil' ? b.totalNum : 0;
        const bCost = b.items.reduce((s, it) => s + (it.buyPrice * it.qty), 0);
        bVal = bPem - bCost;
      }

      if (aVal === undefined) aVal = '';
      if (bVal === undefined) bVal = '';

      if (typeof aVal === 'string') {
        return sortDirection === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      } else {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }
    });

    return result;
  }, [periodFilteredTrx, search, statusFilter, paymentFilter, dateSelectFilter, nominalFilter, sortField, sortDirection, activeKpiFilter]);

  // 8. Pagination calculations
  const totalPages = Math.ceil(filteredAndSortedTrx.length / itemsPerPage) || 1;
  const paginatedTrx = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedTrx.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedTrx, currentPage]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const renderSortIndicator = (field) => {
    if (sortField !== field) return <span style={{ color: '#94a3b8', marginLeft: 4 }}>⇅</span>;
    return sortDirection === 'asc' ? ' ▲' : ' ▼';
  };

  // ========================================================
  // RE-STOCK TRANSACTION ENGINE & SUBMIT ACTION (AI HANDLER)
  // ========================================================
  const handleRestockClick = (item) => {
    setRestockForm({
      sku: item.sku,
      name: item.name,
      qty: 20 // default order quantity
    });
  };

  const handleRestockSubmit = (e) => {
    e.preventDefault();
    if (!restockForm) return;

    // Update in-memory master products state
    setProducts(prev => {
      return prev.map(p => {
        if (p.sku === restockForm.sku) {
          const newStock = p.stock + Number(restockForm.qty);
          return {
            ...p,
            stock: newStock
          };
        }
        return p;
      });
    });

    // Create a mock restocking transaction to simulate outflow of cash!
    const targetProduct = products.find(p => p.sku === restockForm.sku);
    const restockCost = targetProduct ? targetProduct.buyPrice * restockForm.qty : 0;
    
    // Add transaction log
    const newTrx = {
      id: `#TRX-IN-${Math.floor(1000 + Math.random() * 9000)}`,
      orderId: '-',
      customer: 'Restock Supplier',
      email: 'supplier@email.com',
      tipe: 'offline',
      metode: 'Transfer Bank',
      totalNum: restockCost,
      status: 'berhasil',
      rawDate: new Date(), // Now
      tier: 'Supplier Partner',
      points: '0 Pts',
      items: [
        { id: targetProduct ? targetProduct.id : 'PRD-001', name: `Stok Masuk: ${restockForm.name}`, sku: restockForm.sku, qty: restockForm.qty, price: targetProduct ? targetProduct.sellPrice : 0, buyPrice: targetProduct ? targetProduct.buyPrice : 0, sellPrice: targetProduct ? targetProduct.sellPrice : 0 }
      ],
      subtotal: restockCost,
      tax: 0
    };
    
    setTransactions(prev => [newTrx, ...prev]);

    triggerToast(`Inventory: Restock ${restockForm.qty} Unit untuk "${restockForm.name}" berhasil ditambahkan!`);
    setRestockForm(null);
  };

  // ========================================================
  // EXPORT SIMULATOR ENGINES (HIGH FIDELITY OVERLAYS)
  // ========================================================
  const handleExportClick = (format) => {
    setExportPreview(format);
  };

  const triggerRealDownload = (format) => {
    const filename = `Laporan_SmartKasir_${dateRange.toUpperCase()}_${new Date().toISOString().substring(0,10)}.${format}`;
    triggerToast(`Mengekspor data Laporan (${dateRange.toUpperCase()}) ke berkas ${format.toUpperCase()}...`);
    
    // Simulate real text-download trigger
    setTimeout(() => {
      let content = "";
      if (format === 'csv') {
        content = "ID Transaksi,Tanggal,Pelanggan,Metode Pembayaran,Pemasukan,Pengeluaran,Laba Bersih,Status\n";
        filteredAndSortedTrx.forEach(t => {
          const pemVal = t.status === 'berhasil' ? t.totalNum : 0;
          const costVal = t.items.reduce((s, it) => s + (it.buyPrice * it.qty), 0);
          const dateString = new Date(t.rawDate).toLocaleDateString('id-ID');
          content += `${t.id},${dateString},${t.customer},${t.metode},${pemVal},${costVal},${pemVal - costVal},${t.status}\n`;
        });
      } else {
        content = JSON.stringify({
          period: dateRange,
          summary: kpiValues,
          busiestHour: peakSalesStats,
          bestSeller: bestProduct,
          transactions: filteredAndSortedTrx
        }, null, 2);
      }

      const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      triggerToast(`Unduhan ${format.toUpperCase()} berhasil diselesaikan!`);
      setExportPreview(null);
    }, 1200);
  };

  // ========================================================
  // SVG LINE & AREA CALCULATION PRE-COMPUTES
  // ========================================================
  const paddingX = 40;
  const paddingY = 30;
  const chartWidth = 500;
  const chartHeight = 180;

  const pointsCount = chartCoordinates.labels.length;
  
  const getX = (index) => {
    if (pointsCount <= 1) return paddingX;
    return paddingX + (index * (chartWidth - 2 * paddingX)) / (pointsCount - 1);
  };

  const getY = (scaledVal) => {
    return chartHeight - paddingY - scaledVal;
  };

  const linePemasukanPath = useMemo(() => {
    if (pointsCount === 0) return '';
    let path = `M ${getX(0)} ${getY(chartCoordinates.pemasukan[0])}`;
    for (let i = 0; i < pointsCount - 1; i++) {
      const x1 = getX(i);
      const y1 = getY(chartCoordinates.pemasukan[i]);
      const x2 = getX(i + 1);
      const y2 = getY(chartCoordinates.pemasukan[i + 1]);
      const cpX1 = x1 + (x2 - x1) / 3;
      const cpY1 = y1;
      const cpX2 = x1 + 2 * (x2 - x1) / 3;
      const cpY2 = y2;
      path += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${x2} ${y2}`;
    }
    return path;
  }, [chartCoordinates]);

  const areaPemasukanPath = useMemo(() => {
    if (!linePemasukanPath) return '';
    const firstX = getX(0);
    const lastX = getX(pointsCount - 1);
    const floorY = chartHeight - paddingY;
    return `${linePemasukanPath} L ${lastX} ${floorY} L ${firstX} ${floorY} Z`;
  }, [linePemasukanPath]);

  const linePengeluaranPath = useMemo(() => {
    if (pointsCount === 0) return '';
    let path = `M ${getX(0)} ${getY(chartCoordinates.pengeluaran[0])}`;
    for (let i = 0; i < pointsCount - 1; i++) {
      const x1 = getX(i);
      const y1 = getY(chartCoordinates.pengeluaran[i]);
      const x2 = getX(i + 1);
      const y2 = getY(chartCoordinates.pengeluaran[i + 1]);
      const cpX1 = x1 + (x2 - x1) / 3;
      const cpY1 = y1;
      const cpX2 = x1 + 2 * (x2 - x1) / 3;
      const cpY2 = y2;
      path += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${x2} ${y2}`;
    }
    return path;
  }, [chartCoordinates]);

  const areaPengeluaranPath = useMemo(() => {
    if (!linePengeluaranPath) return '';
    const firstX = getX(0);
    const lastX = getX(pointsCount - 1);
    const floorY = chartHeight - paddingY;
    return `${linePengeluaranPath} L ${lastX} ${floorY} L ${firstX} ${floorY} Z`;
  }, [linePengeluaranPath]);

  return (
    <div className="reports-container">
      {/* Dynamic Toast popup */}
      {showToast && (
        <div className="reports-toast-notif" style={{ transition: 'all 0.25s ease' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ========================================================
          1. HEADER ATAS (FILTERS & EXPORTS SYSTEM)
          ======================================================== */}
      <div className="reports-header">
        <div className="reports-header-right">
          <div className="reports-date-filter">
            <button className={`reports-filter-btn ${dateRange === 'hari-ini' ? 'active' : ''}`} onClick={() => { setDateRange('hari-ini'); setActiveKpiFilter(null); }}>Hari Ini</button>
            <button className={`reports-filter-btn ${dateRange === 'mingguan' ? 'active' : ''}`} onClick={() => { setDateRange('mingguan'); setActiveKpiFilter(null); }}>Mingguan</button>
            <button className={`reports-filter-btn ${dateRange === 'bulanan' ? 'active' : ''}`} onClick={() => { setDateRange('bulanan'); setActiveKpiFilter(null); }}>Bulanan</button>
            <button className={`reports-filter-btn ${dateRange === 'tahunan' ? 'active' : ''}`} onClick={() => { setDateRange('tahunan'); setActiveKpiFilter(null); }}>Tahunan</button>
          </div>

          <button className="btn-primary-glow" onClick={() => handleExportClick('excel')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Export Laporan
          </button>
        </div>
      </div>

      {/* ========================================================
          2. SUMMARY KPI CARDS (DYNAMICAL MATHEMATICAL RATIOS)
          ======================================================== */}
      <div className="reports-summary-grid">
        
        {/* Total Pemasukan Card */}
        <div 
          className={`reports-card summary-card accent-purple ${activeKpiFilter === 'pemasukan' ? 'active' : ''}`}
          onClick={() => {
            if (activeKpiFilter === 'pemasukan') {
              setActiveKpiFilter(null);
            } else {
              setActiveKpiFilter('pemasukan');
              triggerToast("Menyaring tabel laporan hanya pada Pemasukan Sukses!");
            }
          }}
          style={{ transition: 'all 0.25s ease' }}
          title="Klik untuk memfilter tabel berdasarkan pemasukan sukses"
        >
          <div className="summary-header">
            <div className="summary-icon-wrapper">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M7 15h0M2 9.5h20"/></svg>
            </div>
            <div className="summary-trend-badge up">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
              {kpiValues.trends.pem}
            </div>
          </div>
          <div className="summary-label">Total Pemasukan</div>
          <div className="summary-value" style={{ wordBreak: 'break-all' }}>{formatRupiah(kpiValues.pemasukan)}</div>
          <div className="summary-desc">Dari transaksi berhasil ({successfulTrx.length} TRX)</div>
        </div>

        {/* Total Pengeluaran Card */}
        <div 
          className="reports-card summary-card accent-red"
          onClick={() => {
            expenseChartSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
            triggerToast("Melakukan smooth scroll ke Analisis Pengeluaran!");
          }}
          style={{ transition: 'all 0.25s ease' }}
          title="Klik untuk scroll ke bagian analisis pengeluaran"
        >
          <div className="summary-header">
            <div className="summary-icon-wrapper">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>
            </div>
            <div className="summary-trend-badge up">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
              {kpiValues.trends.peng}
            </div>
          </div>
          <div className="summary-label">Total Pengeluaran</div>
          <div className="summary-value" style={{ wordBreak: 'break-all' }}>{formatRupiah(kpiValues.pengeluaran)}</div>
          <div className="summary-desc">Belanja stok + biaya operasional</div>
        </div>

        {/* Laba Kotor Card */}
        <div 
          className="reports-card summary-card accent-blue"
          onClick={() => setShowGrossProfitModal(true)}
          style={{ transition: 'all 0.25s ease' }}
          title="Klik untuk melihat breakdown laba kotor"
        >
          <div className="summary-header">
            <div className="summary-icon-wrapper">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <div className="summary-trend-badge up">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
              {kpiValues.trends.lKotor}
            </div>
          </div>
          <div className="summary-label">Laba Kotor</div>
          <div className="summary-value" style={{ wordBreak: 'break-all' }}>{formatRupiah(kpiValues.labaKotor)}</div>
          <div className="summary-desc">Pemasukan - harga pokok barang (HPP)</div>
        </div>

        {/* Laba Bersih Card */}
        <div 
          className="reports-card summary-card accent-emerald"
          onClick={() => setShowNetProfitModal(true)}
          style={{ transition: 'all 0.25s ease' }}
          title="Klik untuk melihat breakdown laba bersih"
        >
          <div className="summary-header">
            <div className="summary-icon-wrapper">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v12M9 9h4.5a1.5 1.5 0 0 1 0 3H10a1.5 1.5 0 0 0 0 3H15"/></svg>
            </div>
            <div className="summary-trend-badge up">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
              {kpiValues.trends.lBersih}
            </div>
          </div>
          <div className="summary-label">Laba Bersih</div>
          <div className="summary-value" style={{ wordBreak: 'break-all' }}>{formatRupiah(kpiValues.labaBersih)}</div>
          <div className="summary-desc">Laba kotor - pengeluaran operasional</div>
        </div>
      </div>

      {/* ========================================================
          3. FINANCE INTERACTIVE CHART ROW & PEAK SALES
          ======================================================== */}
      <div className="chart-main-row">
        
        {/* Custom SVG Interactive Chart Card */}
        <div className="reports-card finance-chart-card">
          <div className="reports-card-title">
            <span>Analisis Tren Pemasukan & Pengeluaran</span>
            <div className="chart-toggle-pills">
              <div className={`chart-toggle-pill ${chartRange === 'harian' ? 'active' : ''}`} onClick={() => setChartRange('harian')}>Harian</div>
              <div className={`chart-toggle-pill ${chartRange === 'mingguan' ? 'active' : ''}`} onClick={() => setChartRange('mingguan')}>Mingguan</div>
              <div className={`chart-toggle-pill ${chartRange === 'bulanan' ? 'active' : ''}`} onClick={() => setChartRange('bulanan')}>Bulanan</div>
              <div className={`chart-toggle-pill ${chartRange === 'tahunan' ? 'active' : ''}`} onClick={() => setChartRange('tahunan')}>Tahunan</div>
            </div>
          </div>

          <div className="chart-svg-container" style={{ position: 'relative' }}>
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} width="100%" height="100%">
              <defs>
                <linearGradient id="pemasukanGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25"/>
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0.00"/>
                </linearGradient>
                <linearGradient id="pengeluaranGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.18"/>
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0.00"/>
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1={paddingX} y1={getY(0)} x2={chartWidth - paddingX} y2={getY(0)} className="chart-grid-line" strokeDasharray="0" stroke="#cbd5e1" strokeWidth="1.5" />
              <line x1={paddingX} y1={getY(30)} x2={chartWidth - paddingX} y2={getY(30)} className="chart-grid-line" />
              <line x1={paddingX} y1={getY(60)} x2={chartWidth - paddingX} y2={getY(60)} className="chart-grid-line" />
              <line x1={paddingX} y1={getY(90)} x2={chartWidth - paddingX} y2={getY(90)} className="chart-grid-line" />
              <line x1={paddingX} y1={getY(110)} x2={chartWidth - paddingX} y2={getY(110)} className="chart-grid-line" />

              {/* Vertical hover guide line */}
              {hoveredPoint && (
                <line x1={hoveredPoint.x} y1={getY(110)} x2={hoveredPoint.x} y2={getY(0)} className="chart-hover-line" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,3" />
              )}

              {/* Area paths */}
              <path d={areaPemasukanPath} className="chart-area-pemasukan" style={{ transition: 'all 0.5s ease' }} />
              <path d={areaPengeluaranPath} className="chart-area-pengeluaran" style={{ transition: 'all 0.5s ease' }} />

              {/* Line paths */}
              <path d={linePemasukanPath} className="chart-line-pemasukan" fill="none" style={{ transition: 'all 0.5s ease' }} />
              <path d={linePengeluaranPath} className="chart-line-pengeluaran" fill="none" style={{ transition: 'all 0.5s ease' }} />

              {/* Interaction points */}
              {chartCoordinates.labels.map((lbl, idx) => {
                const cx = getX(idx);
                const cyPem = getY(chartCoordinates.pemasukan[idx]);
                const cyPeng = getY(chartCoordinates.pengeluaran[idx]);
                const isHovered = hoveredPoint && hoveredPoint.index === idx;

                return (
                  <g key={idx}>
                    {/* Grid X Label */}
                    <text x={cx} y={chartHeight - 6} fill={isHovered ? "#6366f1" : "#64748b"} fontSize="9" fontWeight={isHovered ? "700" : "500"} textAnchor="middle">
                      {lbl}
                    </text>

                    {/* Pemasukan circles */}
                    <circle cx={cx} cy={cyPem} r={isHovered ? 6 : 4} fill="#6366f1" className="chart-interactive-point" />

                    {/* Pengeluaran circles */}
                    <circle cx={cx} cy={cyPeng} r={isHovered ? 6 : 4} fill="#ef4444" className="chart-interactive-point" />

                    {/* Hover Trigger Box */}
                    <rect 
                      x={cx - 20} y="0" width="40" height={chartHeight} fill="transparent" style={{ cursor: 'pointer' }}
                      onMouseEnter={(e) => {
                        const rectSvg = e.currentTarget.parentNode.parentNode.getBoundingClientRect();
                        setHoveredPoint({
                          index: idx,
                          x: cx,
                          y: (cyPem + cyPeng) / 2,
                          xPercent: (cx / chartWidth) * 100,
                          yPercent: (((cyPem + cyPeng) / 2) / chartHeight) * 100,
                          pem: chartCoordinates.pemasukanRaw[idx],
                          peng: chartCoordinates.pengeluaranRaw[idx],
                          label: lbl
                        });
                      }}
                      onMouseLeave={() => setHoveredPoint(null)}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Custom Interactive Tooltip overlay */}
            {hoveredPoint && (
              <div 
                className="chart-tooltip-floating" 
                style={{ 
                  left: `${hoveredPoint.xPercent}%`, 
                  top: `${hoveredPoint.yPercent}%` 
                }}
              >
                <div className="tooltip-title">{chartRange === 'harian' ? 'Jam' : chartRange === 'mingguan' ? 'Hari' : chartRange === 'bulanan' ? 'Minggu' : 'Kuartal'} {hoveredPoint.label}</div>
                <div className="tooltip-row">
                  <span><span className="tooltip-dot pemasukan" />Pemasukan:</span>
                  <span className="tooltip-val" style={{ color: '#818cf8' }}>{formatRupiah(hoveredPoint.pem)}</span>
                </div>
                <div className="tooltip-row">
                  <span><span className="tooltip-dot pengeluaran" />Pengeluaran:</span>
                  <span className="tooltip-val" style={{ color: '#fca5a5' }}>{formatRupiah(hoveredPoint.peng)}</span>
                </div>
                <div className="tooltip-row" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 4, marginTop: 2 }}>
                  <span style={{ fontWeight: 600 }}>Laba:</span>
                  <span className="tooltip-val" style={{ color: '#34d399' }}>{formatRupiah(hoveredPoint.pem - hoveredPoint.peng)}</span>
                </div>
              </div>
            )}
          </div>

          <div className="chart-legend">
            <div className="legend-item-inline">
              <span className="legend-dot-solid pemasukan" />
              <span>Pemasukan</span>
            </div>
            <div className="legend-item-inline">
              <span className="legend-dot-solid pengeluaran" />
              <span>Pengeluaran</span>
            </div>
          </div>
        </div>

        {/* Peak Sales Analyzer card */}
        <div 
          className="reports-card" 
          onClick={() => setShowPeakSalesModal(true)}
          style={{ cursor: 'pointer', transition: 'all 0.25s ease' }}
          title="Klik untuk membuka modal analisis peak sales terperinci"
        >
          <div className="reports-card-title">
            <span>Analisis Peak Sales</span>
            <span style={{ fontSize: '11px', color: '#6366f1', background: 'rgba(99, 102, 241, 0.06)', padding: '4px 8px', borderRadius: '12px', fontWeight: '700' }}>BI Engine</span>
          </div>
          
          <div className="peak-sales-box">
            <p style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.5 }}>Laju transaksi per jam untuk memantau jam operasional paling sibuk:</p>
            
            {/* Custom Interactive mini bar chart representing hours */}
            <div className="peak-mini-chart">
              {[
                { hr: '08:00', val: 20 },
                { hr: '10:00', val: 35 },
                { hr: '12:00', val: 60 },
                { hr: '14:00', val: 45 },
                { hr: '16:00', val: 70 },
                { hr: '18:00', val: 95 }, // Peak hour!
                { hr: '20:00', val: 80 },
                { hr: '22:00', val: 30 }
              ].map((item, idx) => {
                const isPeak = item.hr.includes('18:00') || item.hr.includes('20:00');
                return (
                  <div 
                    key={idx} 
                    className={`peak-bar ${isPeak ? 'active' : ''}`} 
                    style={{ height: `${item.val}%` }}
                    title={`${item.hr}: ${item.val}% Keramaian`}
                  />
                );
              })}
            </div>

            <div className="peak-stats-list">
              <div className="peak-stat-row">
                <span className="peak-stat-label">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  Jam Tersibuk (Peak Hour)
                </span>
                <span className="peak-stat-val" style={{ color: '#6366f1' }}>{peakSalesStats.hour}</span>
              </div>
              <div className="peak-stat-row">
                <span className="peak-stat-label">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  Jumlah Transaksi Puncak
                </span>
                <span className="peak-stat-val" style={{ color: '#10b981' }}>{peakSalesStats.count} Transaksi</span>
              </div>
              <div className="peak-stat-row">
                <span className="peak-stat-label">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                  Omzet Jam Tersebut
                </span>
                <span className="peak-stat-val">{formatRupiah(peakSalesStats.omzet)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          4. STATISTIK KEUNTUNGAN ROW (3 STATS CARDS)
          ======================================================== */}
      <div className="reports-stats-row">
        
        {/* Produk Teruntung Card */}
        <div 
          className="reports-card stat-item-card"
          onClick={() => {
            const product = products.find(p => p.id === bestProduct.id);
            if (product) setSelectedProductDetail(product);
          }}
          title="Klik untuk membuka detail produk paling menguntungkan ini"
        >
          <div className="stat-item-icon-box" style={{ background: 'rgba(99, 102, 241, 0.06)', color: '#6366f1' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
          </div>
          <div className="stat-item-content">
            <div className="stat-item-label">Produk Teruntung ({bestProduct.pct}% Kontribusi)</div>
            <div className="stat-item-value" style={{ fontSize: '15px' }}>{bestProduct.name}</div>
            <div className="stat-item-desc" style={{ color: '#10b981', fontWeight: '700' }}>Total Laba: {formatRupiah(bestProduct.profit)}</div>
            <div className="stat-item-desc">{bestProduct.desc}</div>
          </div>
        </div>

        {/* Penjualan Tertinggi Card */}
        <div 
          className="reports-card stat-item-card"
          onClick={() => {
            if (highestSalesDay.rawDateStr) {
              setSearch(new Date(highestSalesDay.rawDateStr).toLocaleDateString('id-ID'));
              triggerToast(`Tabel difilter pada Hari Puncak: ${highestSalesDay.day}!`);
            } else {
              triggerToast("Hari penjualan tertinggi disimulasikan dari data transaksi!");
            }
          }}
          title="Klik untuk memfilter daftar transaksi berdasarkan hari penjualan tertinggi ini"
        >
          <div className="stat-item-icon-box" style={{ color: '#10b981', background: 'rgba(16, 185, 129, 0.06)' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          </div>
          <div className="stat-item-content">
            <div className="stat-item-label">Penjualan Tertinggi</div>
            <div className="stat-item-value" style={{ fontSize: '15px' }}>{highestSalesDay.day}</div>
            <div className="stat-item-desc" style={{ color: '#6366f1', fontWeight: '700' }}>Omzet Puncak: {formatRupiah(highestSalesDay.val)}</div>
            <div className="stat-item-desc">{highestSalesDay.count} Transaksi sukses pada hari ini</div>
          </div>
        </div>

        {/* Rata-rata Transaksi Card */}
        <div 
          className="reports-card stat-item-card"
          onClick={() => setShowAvgTxModal(true)}
          title="Klik untuk melihat modal analitik ukuran transaksi belanja"
        >
          <div className="stat-item-icon-box" style={{ color: '#3b82f6', background: 'rgba(59, 130, 246, 0.06)' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
          <div className="stat-item-content">
            <div className="stat-item-label">Rata-rata Transaksi ({averageTxSize.trend} Naik)</div>
            <div className="stat-item-value" style={{ fontSize: '15px' }}>{formatRupiah(averageTxSize.val)}</div>
            <div className="stat-item-desc" style={{ color: '#10b981', fontWeight: '700' }}>Omzet per Tiket</div>
            <div className="stat-item-desc">{averageTxSize.desc}</div>
          </div>
        </div>
      </div>

      {/* ========================================================
          5. EXPENSES ANALYSIS & AI RESTOCK RECOMMENDATION
          ======================================================== */}
      <div className="expenses-row" ref={expenseChartSectionRef}>
        
        {/* Expenses category analysis card */}
        <div className="reports-card">
          <div className="reports-card-title">Analisis Alokasi Pengeluaran</div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div className="donut-svg-wrapper">
              <svg className="donut-chart-svg" viewBox="0 0 100 100">
                <g transform="rotate(-90 50 50)">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#f1f5f9" strokeWidth="14" />
                  
                  {donutSegments.map((segment, idx) => (
                    <circle
                      key={idx}
                      cx="50"
                      cy="50"
                      r="40"
                      className="donut-segment"
                      stroke={segment.color}
                      strokeDasharray={`${segment.strokeLength} 251.32`}
                      strokeDashoffset={segment.strokeOffset}
                      title={`${segment.label}: ${segment.pct}%`}
                      onClick={() => triggerToast(`Kategori ${segment.label} diklik! Rincian: ${formatRupiah(segment.value)}`)}
                    />
                  ))}
                </g>

                <g className="donut-inner-text">
                  <text className="donut-val-center" x="50" y="47" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '7px' }}>{formatRupiah(kpiValues.pengeluaran)}</text>
                  <text className="donut-lbl-center" x="50" y="60" textAnchor="middle" dominantBaseline="central">TOTAL BIAYA</text>
                </g>
              </svg>

              <div className="donut-legend-box">
                {donutSegments.map((segment, idx) => (
                  <div key={idx} className="donut-legend-item" style={{ cursor: 'pointer' }} onClick={() => triggerToast(`Pengeluaran ${segment.label}: ${formatRupiah(segment.value)}`)}>
                    <div className="donut-legend-left">
                      <span className="donut-legend-dot" style={{ backgroundColor: segment.color }} />
                      <span>{segment.label}</span>
                      <span className="donut-legend-pct">{segment.pct}%</span>
                    </div>
                    <div className="donut-legend-right">{formatRupiah(segment.value)}</div>
                  </div>
                ))}
              </div>
            </div>

            <hr style={{ border: 'none', borderBottom: '1px solid #f1f5f9', margin: '4px 0' }} />

            <div>
              <div className="reports-card-subtitle" style={{ marginBottom: 12, fontWeight: 700, fontSize: 13 }}>Detail Pengeluaran Belanja Stok Kategori</div>
              <div className="progress-list">
                {[
                  { name: 'Belanja Sepatu & Pakaian (Fashion)', val: productProfitStats.filter(p => p.sku === 'PRD-001' || p.sku === 'PRD-155').reduce((s, it) => s + (it.qtySold * it.totalProfit), 0) || Math.round(kpiValues.cogs * 0.4), color: 'linear-gradient(90deg, #6366f1, #818cf8)' },
                  { name: 'Belanja Gadget & Sound (Elektronik)', val: productProfitStats.filter(p => p.sku === 'PRD-042' || p.sku === 'PRD-109' || p.sku === 'PRD-122').reduce((s, it) => s + (it.qtySold * it.totalProfit), 0) || Math.round(kpiValues.cogs * 0.45), color: 'linear-gradient(90deg, #3b82f6, #60a5fa)' },
                  { name: 'Belanja Kopi, Air Mineral, Aksesoris', val: productProfitStats.filter(p => p.sku === 'PRD-215' || p.sku === 'PRD-099' || p.sku === 'PRD-330').reduce((s, it) => s + (it.qtySold * it.totalProfit), 0) || Math.round(kpiValues.cogs * 0.15), color: 'linear-gradient(90deg, #ef4444, #f87171)' }
                ].map((item, idx) => {
                  const maxTotal = kpiValues.cogs || 1;
                  const pct = Math.min((item.val / maxTotal) * 100, 100);
                  return (
                    <div key={idx} className="progress-item" style={{ cursor: 'pointer' }} onClick={() => triggerToast(`${item.name}: ${formatRupiah(item.val)}`)}>
                      <div className="progress-labels">
                        <span className="progress-label-name">{item.name}</span>
                        <span className="progress-label-val">{formatRupiah(item.val)} <span style={{ color: '#94a3b8', fontWeight: 500 }}>/ {pct.toFixed(0)}%</span></span>
                      </div>
                      <div className="progress-track">
                        <div className="progress-fill" style={{ width: `${pct}%`, background: item.color }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

        {/* AI Smart Restock Recommendation Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          
          <div className="reports-card" style={{ flex: 1 }}>
            <div className="reports-card-title">
              <span>Smart Restock Recommendation</span>
              <span className="status-pill pending" style={{ fontSize: 9, fontWeight: 700 }}>AI Velocity</span>
            </div>
            
            <div className="restock-alert-box">
              {restockRecommendations.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '30px 10px', color: '#94a3b8', fontSize: '12px', fontWeight: 600 }}>
                  ✅ Semua stok aman! Belum ada rekomendasi pengisian ulang.
                </div>
              ) : (
                restockRecommendations.slice(0, 3).map((item) => (
                  <div key={item.id} className={`restock-card-item ${item.status}`}>
                    <div className="restock-alert-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                    </div>
                    <div className="restock-info-content">
                      <div className="restock-item-title">{item.name}</div>
                      <div className="restock-item-desc">SKU: {item.sku} • {item.reason} ({dateRange.toUpperCase()})</div>
                      
                      <div className="restock-progress-mini">
                        <div 
                          className="restock-progress-fill" 
                          style={{ width: `${Math.min((item.left / item.max) * 100, 100)}%` }} 
                        />
                      </div>
                      
                      <div className="restock-item-meta">
                        <span className="restock-left-qty" style={{ color: item.status === 'danger' ? '#ef4444' : '#f59e0b' }}>
                          Tersisa: {item.left} unit (Habis dlm: {item.daysLeft})
                        </span>
                        <span className="restock-action-suggest" style={{ fontWeight: 700, textDecoration: 'underline' }} onClick={() => handleRestockClick(item)}>
                          Restock Sekarang
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* AI Business Insights Card */}
          <div className="reports-card" style={{ flex: 1 }}>
            <div className="reports-card-title">
              <span>Business Insight Summary</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .6 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
            </div>
            
            <div className="insights-gradient-box">
              <div className="insight-grad-card">
                <div className="insight-icon-box">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
                </div>
                <div className="insight-txt">
                  Pemasukan <strong>{formatRupiah(kpiValues.pemasukan)}</strong> didominasi metode bayar <strong>QRIS</strong> sebesar 65% dengan tren positif.
                </div>
              </div>
              
              <div className="insight-grad-card">
                <div className="insight-icon-box" style={{ color: '#ef4444' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/></svg>
                </div>
                <div className="insight-txt">
                  Produk <strong>{bestProduct.name}</strong> menghasilkan margin laba tertinggi mencapai <strong>{formatRupiah(bestProduct.profit)}</strong>.
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================
          6. DAFTAR LAPORAN TRANSAKSI (DYNAMIC DATA LOG & FILTERS)
          ======================================================== */}
      <div className="reports-card reports-table-card">
        
        <div className="reports-table-header">
          <div className="reports-table-title-box">
            <div className="reports-table-title">Daftar Laporan Transaksi</div>
            <div className="reports-table-subtitle">Menampilkan detail pemasukan, COGS, dan laba per transaksi secara real-time</div>
          </div>
          
          <div className="reports-table-actions" style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {/* Search Box on Table */}
            <div className="reports-search-box" style={{ background: '#f8fafc', height: '36px', padding: '0 10px', display: 'flex', alignItems: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input 
                className="reports-search-input" 
                placeholder="Cari ID, Pelanggan, Produk..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ fontSize: '12px' }}
              />
            </div>

            {/* Status Filter */}
            <select className="select-modern" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ height: '36px', fontSize: '11px' }}>
              <option value="Semua">Semua Status</option>
              <option value="Berhasil">Berhasil</option>
              <option value="Pending">Pending</option>
              <option value="Refund">Refund / Gagal</option>
            </select>

            {/* Payment Method Filter */}
            <select className="select-modern" value={paymentFilter} onChange={(e) => setPaymentFilter(e.target.value)} style={{ height: '36px', fontSize: '11px' }}>
              <option value="Semua">Semua Metode</option>
              <option value="QRIS">QRIS</option>
              <option value="Tunai">Tunai</option>
              <option value="GoPay">GoPay</option>
              <option value="OVO">OVO</option>
              <option value="Virtual Account">Virtual Account</option>
              <option value="Transfer Bank">Transfer Bank</option>
              <option value="Kartu">Kartu</option>
            </select>

            {/* Nominal Filter */}
            <select className="select-modern" value={nominalFilter} onChange={(e) => setNominalFilter(e.target.value)} style={{ height: '36px', fontSize: '11px' }}>
              <option value="Semua">Semua Nominal</option>
              <option value="<100rb">&lt; Rp 100rb</option>
              <option value="100rb-500rb">Rp 100rb - Rp 500rb</option>
              <option value="500rb-1jt">Rp 500rb - Rp 1jt</option>
              <option value=">1jt">&gt; Rp 1jt</option>
            </select>

            <button className="select-modern" onClick={() => handleExportClick('csv')} style={{ background: '#f8fafc', height: '36px', fontSize: '11px' }}>
              📥 Ekspor CSV
            </button>
          </div>
        </div>

        {/* Table responsive display */}
        <div className="table-responsive-wrapper">
          <table className="reports-data-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('id')}>ID Transaksi {renderSortIndicator('id')}</th>
                <th onClick={() => handleSort('date')}>Tanggal {renderSortIndicator('date')}</th>
                <th onClick={() => handleSort('customer')}>Pelanggan {renderSortIndicator('customer')}</th>
                <th onClick={() => handleSort('metode')}>Pembayaran {renderSortIndicator('metode')}</th>
                <th onClick={() => handleSort('pemasukan')} style={{ textAlign: 'right' }}>Pemasukan {renderSortIndicator('pemasukan')}</th>
                <th onClick={() => handleSort('pengeluaran')} style={{ textAlign: 'right' }}>Pengeluaran (HPP) {renderSortIndicator('pengeluaran')}</th>
                <th onClick={() => handleSort('laba')} style={{ textAlign: 'right' }}>Laba Bersih {renderSortIndicator('laba')}</th>
                <th onClick={() => handleSort('status')}>Status {renderSortIndicator('status')}</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTrx.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '40px 0', color: '#94a3b8', fontWeight: 600 }}>
                    ❌ Tidak ada transaksi yang sesuai dengan filter pencarian.
                  </td>
                </tr>
              ) : (
                paginatedTrx.map((row) => {
                  const pem = row.status === 'berhasil' ? row.totalNum : 0;
                  const cogs = row.items.reduce((acc, it) => acc + (it.buyPrice * it.qty), 0);
                  const profit = pem - cogs;

                  return (
                    <tr key={row.id}>
                      <td className="trx-id-col" style={{ cursor: 'pointer', fontWeight: 700 }} onClick={() => setSelectedTrxDetail(row)}>
                        {row.id}
                      </td>
                      <td style={{ color: '#64748b', whiteSpace: 'nowrap' }}>
                        {new Date(row.rawDate).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td style={{ cursor: 'pointer' }} onClick={() => setSelectedCustomerDetail(row)}>
                        <div className="trx-customer-box">
                          <div className="trx-initial-avatar">
                            {row.customer.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
                          </div>
                          <span style={{ fontWeight: 600, color: '#1e293b' }}>{row.customer}</span>
                        </div>
                      </td>
                      <td style={{ cursor: 'pointer' }} onClick={() => { setPaymentFilter(row.metode); triggerToast(`Menyaring tabel untuk Metode: ${row.metode}!`); }}>
                        <span className="badge-payment">{row.metode}</span>
                      </td>
                      <td className="val-bold" style={{ textAlign: 'right' }}>
                        {formatRupiah(pem)}
                      </td>
                      <td className="val-negative" style={{ textAlign: 'right' }}>
                        {formatRupiah(cogs)}
                      </td>
                      <td className={profit > 0 ? "val-positive" : profit < 0 ? "val-negative" : "val-bold"} style={{ textAlign: 'right' }}>
                        {formatRupiah(profit)}
                      </td>
                      <td>
                        <span className={`status-pill ${row.status === 'berhasil' ? 'success' : row.status === 'pending' ? 'pending' : 'failed'}`}>
                          {row.status === 'berhasil' ? 'Berhasil' : row.status === 'pending' ? 'Pending' : 'Refund'}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination bar */}
        {filteredAndSortedTrx.length > 0 && (
          <div className="reports-pagination">
            <div>
              Menampilkan <strong>{((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, filteredAndSortedTrx.length)}</strong> dari <strong>{filteredAndSortedTrx.length}</strong> Laporan Transaksi
            </div>
            
            <div className="pagination-controls">
              <button 
                className="pagination-arrow" 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                ◀
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  className={`pagination-btn ${currentPage === pageNum ? 'active' : ''}`}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              ))}

              <button 
                className="pagination-arrow" 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                ▶
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Floating Action PDF Button */}
      <button className="fab-reports-export" onClick={() => handleExportClick('pdf')}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
        Export PDF
      </button>

      {/* ========================================================
          7. DYNAMIC MODALS OVERLAY SYSTEM
          ======================================================== */}

      {/* A. Gross Profit breakdown modal */}
      {showGrossProfitModal && (
        <div className="rep-modal-overlay" onClick={() => setShowGrossProfitModal(false)}>
          <div className="rep-modal-card" style={{ width: '580px' }} onClick={(e) => e.stopPropagation()}>
            <div className="rep-modal-header">
              <h2 className="rep-modal-title">Breakdown Rincian Laba Kotor ({dateRange.toUpperCase()})</h2>
              <button className="rep-modal-close-btn" onClick={() => setShowGrossProfitModal(false)}>×</button>
            </div>
            
            <div className="rep-detail-section">
              <div className="rep-detail-section-title">Kalkulasi Margin Laba Kotor</div>
              <div className="rep-detail-row">
                <span className="rep-detail-label">Total Pemasukan (A)</span>
                <span className="rep-detail-value" style={{ color: '#6366f1' }}>{formatRupiah(kpiValues.pemasukan)}</span>
              </div>
              <div className="rep-detail-row">
                <span className="rep-detail-label">Harga Pokok Pembelian / COGS (B)</span>
                <span className="rep-detail-value" style={{ color: '#ef4444' }}>- {formatRupiah(kpiValues.cogs)}</span>
              </div>
              <div className="rep-detail-row" style={{ borderTop: '1px solid #cbd5e1', paddingTop: 8, marginTop: 4 }}>
                <span className="rep-detail-label" style={{ fontWeight: 700 }}>Laba Kotor (A - B)</span>
                <span className="rep-detail-value" style={{ color: '#10b981', fontSize: '15px' }}>{formatRupiah(kpiValues.labaKotor)}</span>
              </div>
            </div>

            <div style={{ marginTop: 12 }}>
              <h4 style={{ fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: 8 }}>Kontribusi Margin Laba per Produk:</h4>
              <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #f1f5f9', borderRadius: '12px' }}>
                <table style={{ width: '100%', fontSize: '12px', borderCollapse: 'collapse' }}>
                  <thead style={{ background: '#f8fafc', position: 'sticky', top: 0 }}>
                    <tr>
                      <th style={{ padding: '8px 12px', textAlign: 'left' }}>Nama Produk</th>
                      <th style={{ padding: '8px 12px', textAlign: 'center' }}>QTY</th>
                      <th style={{ padding: '8px 12px', textAlign: 'right' }}>Total Laba</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productProfitStats.length === 0 ? (
                      <tr>
                        <td colSpan="3" style={{ textAlign: 'center', padding: 12, color: '#94a3b8' }}>Belum ada penjualan.</td>
                      </tr>
                    ) : (
                      productProfitStats.map(it => (
                        <tr key={it.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '8px 12px', fontWeight: 600 }}>{it.name}</td>
                          <td style={{ padding: '8px 12px', textAlign: 'center' }}>{it.qtySold}</td>
                          <td style={{ padding: '8px 12px', textAlign: 'right', color: '#10b981', fontWeight: 700 }}>{formatRupiah(it.totalProfit)}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rep-modal-footer">
              <button className="btn-primary-glow" style={{ padding: '6px 14px' }} onClick={() => setShowGrossProfitModal(false)}>Selesai</button>
            </div>
          </div>
        </div>
      )}

      {/* B. Net Profit breakdown modal */}
      {showNetProfitModal && (
        <div className="rep-modal-overlay" onClick={() => setShowNetProfitModal(false)}>
          <div className="rep-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="rep-modal-header">
              <h2 className="rep-modal-title">Breakdown Rincian Laba Bersih ({dateRange.toUpperCase()})</h2>
              <button className="rep-modal-close-btn" onClick={() => setShowNetProfitModal(false)}>×</button>
            </div>
            
            <div className="rep-detail-section">
              <div className="rep-detail-section-title">Kalkulasi Laba Bersih</div>
              <div className="rep-detail-row">
                <span className="rep-detail-label">Laba Kotor (A)</span>
                <span className="rep-detail-value" style={{ color: '#3b82f6' }}>{formatRupiah(kpiValues.labaKotor)}</span>
              </div>
              <div className="rep-detail-row">
                <span className="rep-detail-label">Biaya Operasional Toko (B)</span>
                <span className="rep-detail-value" style={{ color: '#ef4444' }}>- {formatRupiah(kpiValues.operational)}</span>
              </div>
              <div className="rep-detail-row" style={{ borderTop: '1px solid #cbd5e1', paddingTop: 8, marginTop: 4 }}>
                <span className="rep-detail-label" style={{ fontWeight: 700 }}>Laba Bersih (A - B)</span>
                <span className="rep-detail-value" style={{ color: '#10b981', fontSize: '15px' }}>{formatRupiah(kpiValues.labaBersih)}</span>
              </div>
            </div>

            <div style={{ marginTop: 12 }}>
              <h4 style={{ fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: 8 }}>Alokasi Biaya Operasional Disimulasikan:</h4>
              <div style={{ background: '#f8fafc', borderRadius: 12, padding: 12 }}>
                {expensesBreakdown.operational.map((it, idx) => (
                  <div key={idx} className="rep-detail-row" style={{ padding: '6px 0', borderBottom: idx < 2 ? '1px dashed #e2e8f0' : 'none' }}>
                    <span className="rep-detail-label" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: it.color }} />
                      {it.label}
                    </span>
                    <span className="rep-detail-value">{formatRupiah(it.value)} ({it.pct}%)</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rep-modal-footer">
              <button className="btn-primary-glow" style={{ padding: '6px 14px' }} onClick={() => setShowNetProfitModal(false)}>Tutup</button>
            </div>
          </div>
        </div>
      )}

      {/* C. Peak Sales analysis detail modal */}
      {showPeakSalesModal && (
        <div className="rep-modal-overlay" onClick={() => setShowPeakSalesModal(false)}>
          <div className="rep-modal-card" style={{ width: '560px' }} onClick={(e) => e.stopPropagation()}>
            <div className="rep-modal-header">
              <h2 className="rep-modal-title">BI Report: Analisis Peak Sales (Jam Teramai)</h2>
              <button className="rep-modal-close-btn" onClick={() => setShowPeakSalesModal(false)}>×</button>
            </div>

            <div className="rep-detail-section">
              <div className="rep-detail-section-title">Waktu Trafik Puncak</div>
              <div className="rep-detail-row">
                <span className="rep-detail-label">Jam Operasional Puncak</span>
                <span className="rep-detail-value" style={{ color: '#6366f1' }}>{peakSalesStats.hour}</span>
              </div>
              <div className="rep-detail-row">
                <span className="rep-detail-label">Total Omzet Terkumpul pada Jam Puncak</span>
                <span className="rep-detail-value" style={{ color: '#10b981' }}>{formatRupiah(peakSalesStats.omzet)}</span>
              </div>
              <div className="rep-detail-row">
                <span className="rep-detail-label">Frekuensi Belanja</span>
                <span className="rep-detail-value">{peakSalesStats.count} Transaksi Berhasil</span>
              </div>
            </div>

            <div style={{ marginTop: 12 }}>
              <h4 style={{ fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: 10 }}>Grafik Kepadatan Transaksi Toko per Jam (08:00 - 22:00)</h4>
              <div style={{ height: '100px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', borderBottom: '1px solid #e2e8f0', paddingBottom: 6 }}>
                {[15, 25, 45, 60, 50, 65, 95, 80, 40, 20].map((v, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '24px' }}>
                    <div style={{ width: '100%', height: `${v}px`, background: v === 95 ? '#6366f1' : 'rgba(99, 102, 241, 0.25)', borderRadius: '3px 3px 0 0' }} />
                    <span style={{ fontSize: '8px', color: '#94a3b8', marginTop: 4 }}>{String(8 + i * 1.5).split('.')[0]}:00</span>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: '11px', color: '#64748b', marginTop: 8, fontStyle: 'italic', textAlign: 'center' }}>
                💡 Rekomendasi AI: Tambahkan staf kasir cadangan pada pukul 18:00 - 20:00 WIB untuk menghindari antrean panjang POS.
              </p>
            </div>

            <div className="rep-modal-footer">
              <button className="btn-primary-glow" style={{ padding: '6px 14px' }} onClick={() => setShowPeakSalesModal(false)}>Mengerti</button>
            </div>
          </div>
        </div>
      )}

      {/* D. Average transaction analysis modal */}
      {showAvgTxModal && (
        <div className="rep-modal-overlay" onClick={() => setShowAvgTxModal(false)}>
          <div className="rep-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="rep-modal-header">
              <h2 className="rep-modal-title">Laporan Analisis Keranjang Transaksi</h2>
              <button className="rep-modal-close-btn" onClick={() => setShowAvgTxModal(false)}>×</button>
            </div>

            <div className="rep-detail-section">
              <div className="rep-detail-section-title">Metrik Rata-rata</div>
              <div className="rep-detail-row">
                <span className="rep-detail-label">Nilai Belanja Rata-rata (AOV)</span>
                <span className="rep-detail-value" style={{ color: '#3b82f6', fontSize: '14px' }}>{formatRupiah(averageTxSize.val)}</span>
              </div>
              <div className="rep-detail-row">
                <span className="rep-detail-label">Rata-rata Jumlah Item per Struk</span>
                <span className="rep-detail-value">2.4 Unit Produk</span>
              </div>
              <div className="rep-detail-row">
                <span className="rep-detail-label">Metode Bayar Terfavorit</span>
                <span className="rep-detail-value" style={{ color: '#6366f1' }}>QRIS (60% Penggunaan)</span>
              </div>
            </div>

            <div style={{ marginTop: 12 }}>
              <h4 style={{ fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: 8 }}>Persebaran Nominal Transaksi Pelanggan:</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { range: 'Kecil (< Rp 100rb)', pct: 25, color: '#f59e0b' },
                  { range: 'Sedang (Rp 100rb - Rp 500rb)', pct: 45, color: '#3b82f6' },
                  { range: 'Premium (&gt; Rp 500rb)', pct: 30, color: '#10b981' }
                ].map((it, idx) => (
                  <div key={idx} style={{ fontSize: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontWeight: 600 }}>{it.range}</span>
                      <span style={{ fontWeight: 700 }}>{it.pct}%</span>
                    </div>
                    <div style={{ height: 6, background: '#f1f5f9', borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{ height: '100%', background: it.color, width: `${it.pct}%`, borderRadius: 3 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rep-modal-footer">
              <button className="btn-primary-glow" style={{ padding: '6px 14px' }} onClick={() => setShowAvgTxModal(false)}>Tutup</button>
            </div>
          </div>
        </div>
      )}

      {/* E. Product Detail Modal Overlay (reused from products/page.js styling) */}
      {selectedProductDetail && (
        <div className="rep-modal-overlay" onClick={() => setSelectedProductDetail(null)}>
          <div className="rep-modal-card" style={{ width: '580px' }} onClick={(e) => e.stopPropagation()}>
            <div className="rep-modal-header">
              <h2 className="rep-modal-title">Informasi Detail Produk Terintegrasi</h2>
              <button className="rep-modal-close-btn" onClick={() => setSelectedProductDetail(null)}>×</button>
            </div>
            
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              <div style={{ width: '130px', height: '130px', borderRadius: '16px', background: selectedProductDetail.color || '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px', fontWeight: '800', color: '#64748b', border: '1px solid #e2e8f0' }}>
                {selectedProductDetail.initials || selectedProductDetail.name.charAt(0).toUpperCase()}
              </div>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: 0 }}>{selectedProductDetail.name}</h3>
                <span style={{ background: '#e0f2fe', color: '#0369a1', padding: '2px 8px', borderRadius: 8, fontSize: '10px', fontWeight: 700, width: 'fit-content' }}>
                  {selectedProductDetail.category}
                </span>

                <div style={{ fontSize: '12px', marginTop: 8 }}>
                  <div className="rep-detail-row" style={{ padding: '4px 0', borderBottom: '1px solid #f1f5f9' }}>
                    <span className="rep-detail-label">SKU / Kode</span>
                    <span className="rep-detail-value">{selectedProductDetail.sku}</span>
                  </div>
                  <div className="rep-detail-row" style={{ padding: '4px 0', borderBottom: '1px solid #f1f5f9' }}>
                    <span className="rep-detail-label">Stok Fisik Tersedia</span>
                    <span className="rep-detail-value" style={{ color: selectedProductDetail.stock <= 5 ? '#ef4444' : '#10b981', fontWeight: 700 }}>
                      {selectedProductDetail.stock} Unit
                    </span>
                  </div>
                  <div className="rep-detail-row" style={{ padding: '4px 0', borderBottom: '1px solid #f1f5f9' }}>
                    <span className="rep-detail-label">Harga Modal HPP</span>
                    <span className="rep-detail-value">{formatRupiah(selectedProductDetail.buyPrice)}</span>
                  </div>
                  <div className="rep-detail-row" style={{ padding: '4px 0' }}>
                    <span className="rep-detail-label">Harga Jual POS</span>
                    <span className="rep-detail-value" style={{ color: '#6366f1', fontWeight: 700 }}>{formatRupiah(selectedProductDetail.sellPrice)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 14 }}>
              <h4 style={{ fontSize: '11px', fontWeight: 700, color: '#475569', margin: '0 0 4px 0' }}>Deskripsi Barang:</h4>
              <p style={{ fontSize: '11px', color: '#64748b', lineHeight: 1.5, margin: 0 }}>{selectedProductDetail.desc}</p>
            </div>

            <div className="rep-modal-footer">
              {selectedProductDetail.stock <= 15 && (
                <button 
                  className="btn-primary-glow" 
                  style={{ background: '#f59e0b', padding: '6px 14px', boxShadow: 'none' }}
                  onClick={() => {
                    handleRestockClick(selectedProductDetail);
                    setSelectedProductDetail(null);
                  }}
                >
                  Restock Sekarang
                </button>
              )}
              <button className="btn-secondary" style={{ padding: '6px 14px' }} onClick={() => setSelectedProductDetail(null)}>Tutup</button>
            </div>
          </div>
        </div>
      )}

      {/* F. Transaction Detail Struk reprint modal overlay */}
      {selectedTrxDetail && (
        <div className="rep-modal-overlay" onClick={() => setSelectedTrxDetail(null)}>
          <div className="rep-modal-card" style={{ width: '420px', background: '#f8fafc' }} onClick={(e) => e.stopPropagation()}>
            <div className="rep-modal-header" style={{ borderBottom: 'none', marginBottom: 10 }}>
              <h2 className="rep-modal-title" style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Struk Digital SmartKasir</h2>
              <button className="rep-modal-close-btn" onClick={() => setSelectedTrxDetail(null)}>×</button>
            </div>

            {/* Paper Struk visual mockup */}
            <div style={{ background: 'white', padding: 20, borderRadius: 16, border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', fontFamily: 'monospace', fontSize: '11px', color: '#334155' }}>
              <div style={{ textAlign: 'center', marginBottom: 14 }}>
                <strong style={{ fontSize: '13px', color: '#1f2937' }}>SMARTKASIR INDONESIA</strong>
                <div>Mall Ambassador Lt.4, Jakarta</div>
                <div>Telp: 021-9928192</div>
                <div>--------------------------------</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div>TRX ID : {selectedTrxDetail.id}</div>
                <div>ORD ID : {selectedTrxDetail.orderId}</div>
                <div>KASIR  : Admin POS</div>
                <div>MEMBER : {selectedTrxDetail.customer} ({selectedTrxDetail.tier})</div>
                <div>WAKTU  : {new Date(selectedTrxDetail.rawDate).toLocaleDateString('id-ID', { hour: '2-digit', minute: '2-digit' })}</div>
              </div>
              <div style={{ textAlign: 'center' }}>================================</div>

              {/* Items in struk */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, margin: '8px 0' }}>
                {selectedTrxDetail.items.map((it, idx) => (
                  <div key={idx}>
                    <div style={{ fontWeight: 'bold' }}>{it.name}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>{it.qty} Pcs x {formatRupiah(it.price)}</span>
                      <span>{formatRupiah(it.qty * it.price)}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ textAlign: 'center' }}>--------------------------------</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Subtotal:</span>
                  <span>{formatRupiah(selectedTrxDetail.subtotal)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Pajak (11%):</span>
                  <span>{formatRupiah(selectedTrxDetail.tax)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', color: '#000', fontSize: '12px' }}>
                  <span>TOTAL :</span>
                  <span>{formatRupiah(selectedTrxDetail.totalNum)}</span>
                </div>
              </div>

              <div style={{ textAlign: 'center', marginTop: 14 }}>
                <div>--------------------------------</div>
                <strong>METODE BAYAR: {selectedTrxDetail.metode.toUpperCase()}</strong>
                <div style={{ color: '#10b981', fontWeight: 'bold', marginTop: 4 }}>STATUS: BERHASIL</div>
                <div style={{ marginTop: 8 }}>Terima Kasih Atas Kunjungan Anda</div>
              </div>
            </div>

            <div className="rep-modal-footer" style={{ borderTop: 'none', marginTop: 14 }}>
              <button className="btn-primary-glow" style={{ padding: '6px 14px' }} onClick={() => { triggerToast("Mencetak struk thermal ke mesin printer POS..."); setSelectedTrxDetail(null); }}>
                🖨️ Cetak Struk
              </button>
              <button className="btn-secondary" style={{ padding: '6px 14px' }} onClick={() => setSelectedTrxDetail(null)}>Tutup</button>
            </div>
          </div>
        </div>
      )}

      {/* G. Customer Member Profile Modal overlay */}
      {selectedCustomerDetail && (
        <div className="rep-modal-overlay" onClick={() => setSelectedCustomerDetail(null)}>
          <div className="rep-modal-card" style={{ width: '440px' }} onClick={(e) => e.stopPropagation()}>
            <div className="rep-modal-header">
              <h2 className="rep-modal-title">Profil & Riwayat Pelanggan Member</h2>
              <button className="rep-modal-close-btn" onClick={() => setSelectedCustomerDetail(null)}>×</button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 14 }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#6366f1', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 700 }}>
                {selectedCustomerDetail.customer.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase()}
              </div>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: '#0f172a' }}>{selectedCustomerDetail.customer}</h3>
                <div style={{ fontSize: '11px', color: '#64748b' }}>{selectedCustomerDetail.email}</div>
                <span style={{ display: 'inline-block', background: '#fef3c7', color: '#d97706', padding: '1px 6px', borderRadius: 6, fontSize: '9px', fontWeight: 700, marginTop: 4 }}>
                  👑 {selectedCustomerDetail.tier}
                </span>
              </div>
            </div>

            <div className="rep-detail-section">
              <div className="rep-detail-section-title">Status Akun Belanja</div>
              <div className="rep-detail-row">
                <span className="rep-detail-label">Loyalty Points SmartKasir</span>
                <span className="rep-detail-value" style={{ color: '#d97706' }}>{selectedCustomerDetail.points}</span>
              </div>
              <div className="rep-detail-row">
                <span className="rep-detail-label">Transaksi Hari Ini</span>
                <span className="rep-detail-value">{selectedCustomerDetail.id}</span>
              </div>
              <div className="rep-detail-row">
                <span className="rep-detail-label">Nominal Belanja Terakhir</span>
                <span className="rep-detail-value" style={{ color: '#6366f1' }}>{formatRupiah(selectedCustomerDetail.totalNum)}</span>
              </div>
            </div>

            <div className="rep-modal-footer">
              <button 
                className="btn-primary-glow" 
                style={{ padding: '6px 14px' }} 
                onClick={() => {
                  setSearch(selectedCustomerDetail.customer);
                  triggerToast(`Menampilkan semua transaksi milik ${selectedCustomerDetail.customer}!`);
                  setSelectedCustomerDetail(null);
                }}
              >
                🔎 Lihat Riwayat
              </button>
              <button className="btn-secondary" style={{ padding: '6px 14px' }} onClick={() => setSelectedCustomerDetail(null)}>Tutup</button>
            </div>
          </div>
        </div>
      )}

      {/* H. Stock replenish Stok Masuk Modal (AI triggered) */}
      {restockForm && (
        <div className="rep-modal-overlay" onClick={() => setRestockForm(null)}>
          <div className="rep-modal-card" style={{ width: '460px' }} onClick={(e) => e.stopPropagation()}>
            <div className="rep-modal-header">
              <h2 className="rep-modal-title">Inventory: Stok Masuk (Replenishment)</h2>
              <button className="rep-modal-close-btn" onClick={() => setRestockForm(null)}>×</button>
            </div>
            
            <form onSubmit={handleRestockSubmit}>
              <div className="rep-detail-section" style={{ background: '#f8fafc' }}>
                <div className="rep-detail-section-title">Produk Terpilih</div>
                <div className="rep-detail-row">
                  <span className="rep-detail-label">Nama Barang</span>
                  <span className="rep-detail-value" style={{ fontWeight: 700 }}>{restockForm.name}</span>
                </div>
                <div className="rep-detail-row">
                  <span className="rep-detail-label">Kode SKU</span>
                  <span className="rep-detail-value" style={{ color: '#6366f1', fontFamily: 'monospace' }}>{restockForm.sku}</span>
                </div>
                <div className="rep-detail-row">
                  <span className="rep-detail-label">Stok Fisik Saat Ini</span>
                  <span className="rep-detail-value">
                    {(products.find(p => p.sku === restockForm.sku)?.stock ?? 0)} Unit
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 10 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: '#475569' }}>Jumlah Unit Masuk *</label>
                  <input 
                    type="number" required min="1" className="select-modern" value={restockForm.qty}
                    onChange={(e) => setRestockForm(prev => ({ ...prev, qty: e.target.value }))}
                    style={{ background: 'white', border: '1px solid #cbd5e1', padding: '8px 12px', fontSize: '13px' }}
                  />
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: '#475569' }}>Catatan Inventory</label>
                  <input 
                    type="text" className="select-modern" placeholder="Contoh: Stok masuk via rekomendasi AI Laporan."
                    style={{ background: 'white', border: '1px solid #cbd5e1', padding: '8px 12px', fontSize: '13px' }}
                  />
                </div>
              </div>

              <div className="rep-modal-footer" style={{ marginTop: 20 }}>
                <button type="button" className="btn-secondary" style={{ padding: '6px 14px' }} onClick={() => setRestockForm(null)}>Batal</button>
                <button type="submit" className="btn-submit-action" style={{ background: '#6366f1', color: 'white', border: 'none', borderRadius: '12px', padding: '8px 18px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px', boxShadow: '0 4px 12px rgba(99, 102, 241, 0.25)' }}>
                  Simpan Stok Masuk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* I. Export / Print PDF Summary Report overlay */}
      {exportPreview && (
        <div className="rep-modal-overlay" onClick={() => setExportPreview(null)}>
          <div className="rep-modal-card" style={{ width: '680px', maxHeight: '95vh' }} onClick={(e) => e.stopPropagation()}>
            <div className="rep-modal-header">
              <h2 className="rep-modal-title">Preview Laporan Analitik SmartKasir</h2>
              <button className="rep-modal-close-btn" onClick={() => setExportPreview(null)}>×</button>
            </div>

            {/* Print paper layout visual */}
            <div style={{ background: 'white', padding: 28, borderRadius: 16, border: '1px solid #cbd5e1', maxHeight: '55vh', overflowY: 'auto', fontSize: '12px', color: '#1e293b', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #0f172a', paddingBottom: 14, marginBottom: 20 }}>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0 }}>SMARTKASIR BUSINESS REPORT</h3>
                  <div style={{ color: '#64748b', fontSize: '10px' }}>Dashboard Analitik & Margin Keuntungan</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 700 }}>Periode: {dateRange.toUpperCase()}</div>
                  <div style={{ fontSize: '10px', color: '#64748b' }}>Tanggal Cetak: {new Date().toLocaleDateString('id-ID')}</div>
                </div>
              </div>

              {/* KPI Summary block */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 20 }}>
                {[
                  { lbl: 'PEMASUKAN', val: kpiValues.pemasukan, clr: '#6366f1' },
                  { lbl: 'COGS HPP', val: kpiValues.cogs, clr: '#ef4444' },
                  { lbl: 'BIAYA OPERASIONAL', val: kpiValues.operational, clr: '#ef4444' },
                  { lbl: 'LABA BERSIH', val: kpiValues.labaBersih, clr: '#10b981' }
                ].map((item, i) => (
                  <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: 8, padding: 8, textAlign: 'center' }}>
                    <div style={{ fontSize: '9px', fontWeight: 700, color: '#64748b', marginBottom: 4 }}>{item.lbl}</div>
                    <div style={{ fontWeight: 800, color: item.clr }}>{formatRupiah(item.val)}</div>
                  </div>
                ))}
              </div>

              {/* Peak Sales & Best Product summary block */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                <div style={{ background: '#f8fafc', borderRadius: 10, padding: 12 }}>
                  <strong style={{ fontSize: '11px', display: 'block', marginBottom: 6 }}>Peak Sales Analysis</strong>
                  <div>Jam Tersibuk: {peakSalesStats.hour}</div>
                  <div>Trafik Puncak: {peakSalesStats.count} Transaksi sukses</div>
                  <div>Omzet Puncak: {formatRupiah(peakSalesStats.omzet)}</div>
                </div>
                <div style={{ background: '#f8fafc', borderRadius: 10, padding: 12 }}>
                  <strong style={{ fontSize: '11px', display: 'block', marginBottom: 6 }}>Produk Paling Menguntungkan</strong>
                  <div>Nama Produk: {bestProduct.name}</div>
                  <div>Total Laba Bersih: {formatRupiah(bestProduct.profit)}</div>
                  <div>Persentase Margin: {bestProduct.pct}% kontribusi laba</div>
                </div>
              </div>

              {/* Transactions list Table inside preview */}
              <div>
                <strong style={{ fontSize: '11px', display: 'block', marginBottom: 6 }}>Sampel Laporan Riwayat Transaksi</strong>
                <table style={{ width: '100%', fontSize: '10px', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#f1f5f9', borderBottom: '1px solid #cbd5e1' }}>
                      <th style={{ padding: 6, textAlign: 'left' }}>ID TRX</th>
                      <th style={{ padding: 6, textAlign: 'left' }}>Tanggal</th>
                      <th style={{ padding: 6, textAlign: 'left' }}>Pelanggan</th>
                      <th style={{ padding: 6, textAlign: 'right' }}>Pemasukan</th>
                      <th style={{ padding: 6, textAlign: 'right' }}>Laba Bersih</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAndSortedTrx.slice(0, 4).map(t => {
                      const tCogs = t.items.reduce((s, it) => s + (it.buyPrice * it.qty), 0);
                      const tLaba = t.status === 'berhasil' ? t.totalNum - tCogs : 0;
                      return (
                        <tr key={t.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                          <td style={{ padding: 6, fontWeight: 700 }}>{t.id}</td>
                          <td style={{ padding: 6 }}>{new Date(t.rawDate).toLocaleDateString('id-ID')}</td>
                          <td style={{ padding: 6 }}>{t.customer}</td>
                          <td style={{ padding: 6, textAlign: 'right' }}>{formatRupiah(t.status === 'berhasil' ? t.totalNum : 0)}</td>
                          <td style={{ padding: 6, textAlign: 'right', color: '#10b981', fontWeight: 700 }}>{formatRupiah(tLaba)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {filteredAndSortedTrx.length > 4 && (
                  <div style={{ fontSize: '9px', color: '#64748b', marginTop: 4, textAlign: 'right' }}>
                    * Menampilkan 4 sampel pertama dari total {filteredAndSortedTrx.length} baris log data tersaring.
                  </div>
                )}
              </div>

            </div>

            <div className="rep-modal-footer">
              <button className="btn-primary-glow" style={{ padding: '6px 14px' }} onClick={() => triggerRealDownload(exportPreview)}>
                📥 Konfirmasi & Unduh {exportPreview.toUpperCase()}
              </button>
              <button className="btn-secondary" style={{ padding: '6px 14px' }} onClick={() => setExportPreview(null)}>Batal</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
