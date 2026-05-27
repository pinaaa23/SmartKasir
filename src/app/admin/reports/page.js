"use client";

import React, { useState, useMemo, useEffect } from 'react';
import '../../../styles/reports.css';

// Realistic mock data mapped to range filters: 'hari-ini', 'mingguan', 'bulanan', 'tahunan'
const REPORT_DATA = {
  'hari-ini': {
    summary: {
      pemasukan: 4200000,
      pengeluaran: 1800000,
      labaKotor: 2400000,
      labaBersih: 2150000,
      trends: { pem: '+3.4%', peng: '-1.2%', lKotor: '+5.1%', lBersih: '+6.2%' }
    },
    stats: {
      bestProduct: { name: 'Air Mineral 600ml', profit: 450000, desc: 'Terjual 90 unit hari ini' },
      bestDay: { day: 'Hari Ini', val: 4200000, desc: 'Puncak jam 18:00 WIB' },
      avgTx: { val: 125000, trend: '+4.5%', desc: 'Dibanding kemarin' }
    },
    insights: [
      { id: 1, text: "Penjualan **meningkat 3.4%** hari ini berkat promo happy hour sore hari." },
      { id: 2, text: "Metode pembayaran **QRIS** mendominasi sebesar **70%** dari total transaksi." },
      { id: 3, text: "Kategori **Makanan & Minuman** menjadi kontributor laba terbesar hari ini." }
    ],
    restock: [
      { id: 1, name: 'Charger Type-C Fast', sku: 'ELC-082', left: 1, max: 15, daysLeft: 1, status: 'danger' },
      { id: 2, name: 'Kaos Polos Premium L', sku: 'APP-012', left: 3, max: 20, daysLeft: 3, status: 'warning' }
    ],
    expenses: {
      operational: [
        { label: 'Bahan Baku', value: 1200000, pct: 67, color: '#6366f1' },
        { label: 'Utilitas', value: 400000, pct: 22, color: '#3b82f6' },
        { label: 'Transport', value: 200000, pct: 11, color: '#ef4444' }
      ],
      totalOperational: 1800000
    },
    transactions: [
      { id: '#TRX-9921', orderId: 'ORD-2341', customer: 'Andi Saputra', metode: 'QRIS - BCA', pemasukan: 450000, pengeluaran: 150000, laba: 300000, status: 'berhasil', date: 'Hari Ini, 12:45' },
      { id: '#TRX-9920', orderId: 'ORD-2340', customer: 'Budi Mulya', metode: 'BCA VA', pemasukan: 1250000, pengeluaran: 400000, laba: 850000, status: 'berhasil', date: 'Hari Ini, 11:30' },
      { id: '#TRX-9919', orderId: '-', customer: 'Anonim', metode: 'Tunai', pemasukan: 850000, pengeluaran: 300000, laba: 550000, status: 'gagal', date: 'Hari Ini, 10:15' },
      { id: '#TRX-9918', orderId: 'ORD-2338', customer: 'Siti Rahma', metode: 'ShopeePay', pemasukan: 620000, pengeluaran: 250000, laba: 370000, status: 'berhasil', date: 'Hari Ini, 09:00' },
      { id: '#TRX-9917', orderId: '-', customer: 'Citra Lestari', metode: 'GoPay', pemasukan: 1000000, pengeluaran: 700000, laba: 300000, status: 'pending', date: 'Hari Ini, 08:30' }
    ]
  },
  'mingguan': {
    summary: {
      pemasukan: 28400000,
      pengeluaran: 10200000,
      labaKotor: 18200000,
      labaBersih: 16100000,
      trends: { pem: '+8.7%', peng: '+2.1%', lKotor: '+11.2%', lBersih: '+12.5%' }
    },
    stats: {
      bestProduct: { name: 'Nike Air Zoom', profit: 5400000, desc: '12 pasang terjual minggu ini' },
      bestDay: { day: 'Sabtu', val: 8500000, desc: 'Kontribusi 30% omzet' },
      avgTx: { val: 185000, trend: '+6.2%', desc: 'Rata-rata belanja naik' }
    },
    insights: [
      { id: 1, text: "Penjualan **naik 12%** dibanding minggu lalu, didorong oleh performa weekend." },
      { id: 2, text: "Kategori **Elektronik & Sepatu** menjadi kategori paling menguntungkan minggu ini." },
      { id: 3, text: "Rata-rata durasi checkout pelanggan POS offline **lebih cepat 15 detik**." }
    ],
    restock: [
      { id: 1, name: 'Charger Type-C Fast', sku: 'ELC-082', left: 1, max: 15, daysLeft: 2, status: 'danger' },
      { id: 2, name: 'Kaos Polos Premium L', sku: 'APP-012', left: 3, max: 20, daysLeft: 4, status: 'warning' },
      { id: 3, name: 'Air Mineral 600ml', sku: 'FNB-003', left: 8, max: 100, daysLeft: 6, status: 'warning' }
    ],
    expenses: {
      operational: [
        { label: 'Belanja Stok', value: 6800000, pct: 66, color: '#6366f1' },
        { label: 'Gaji Karyawan', value: 2400000, pct: 24, color: '#3b82f6' },
        { label: 'Biaya Iklan', value: 1000000, pct: 10, color: '#ef4444' }
      ],
      totalOperational: 10200000
    },
    transactions: [
      { id: '#TRX-9915', orderId: 'ORD-2335', customer: 'Budi Santoso', metode: 'BCA VA', pemasukan: 1250000, pengeluaran: 500000, laba: 750000, status: 'berhasil', date: '26 Mei, 14:20' },
      { id: '#TRX-9914', orderId: '-', customer: 'Ani Wijaya', metode: 'Tunai', pemasukan: 425000, pengeluaran: 150000, laba: 275000, status: 'berhasil', date: '25 Mei, 13:45' },
      { id: '#TRX-9913', orderId: 'ORD-2333', customer: 'Citra Lestari', metode: 'OVO', pemasukan: 890000, pengeluaran: 400000, laba: 490000, status: 'failed', date: '25 Mei, 12:10' },
      { id: '#TRX-9912', orderId: '-', customer: 'Doni Firmansyah', metode: 'GoPay', pemasukan: 780000, pengeluaran: 300000, laba: 480000, status: 'berhasil', date: '24 Mei, 10:00' },
      { id: '#TRX-9911', orderId: 'ORD-2330', customer: 'Rina Pratiwi', metode: 'BCA VA', pemasukan: 2100000, pengeluaran: 800000, laba: 1300000, status: 'pending', date: '23 Mei, 09:30' },
      { id: '#TRX-9910', orderId: 'ORD-2328', customer: 'Fajar Nugraha', metode: 'Transfer BNI', pemasukan: 450000, pengeluaran: 180000, laba: 270000, status: 'berhasil', date: '22 Mei, 15:20' }
    ]
  },
  'bulanan': {
    summary: {
      pemasukan: 124500000,
      pengeluaran: 48200000,
      labaKotor: 76300000,
      labaBersih: 68100000,
      trends: { pem: '+12.5%', peng: '+4.2%', lKotor: '+18.1%', lBersih: '+15.3%' }
    },
    stats: {
      bestProduct: { name: 'Nike Air Zoom', profit: 22400000, desc: 'Kontribusi 33% laba bersih' },
      bestDay: { day: 'Sabtu', val: 34200000, desc: 'Hari tersibuk bulanan' },
      avgTx: { val: 245000, trend: '+5.2%', desc: 'Dibanding bulan lalu' }
    },
    insights: [
      { id: 1, text: "Penjualan **naik 12.5%** dibanding bulan lalu, melampaui target bisnis kuartal ini." },
      { id: 2, text: "Kategori **Elektronik** menjadi kategori paling menguntungkan bulan ini." },
      { id: 3, text: "Metode **QRIS** menjadi metode pembayaran paling sering digunakan (58%)." }
    ],
    restock: [
      { id: 1, name: 'Charger Type-C Fast', sku: 'ELC-082', left: 1, max: 15, daysLeft: 3, status: 'danger' },
      { id: 2, name: 'Kaos Polos Premium L', sku: 'APP-012', left: 3, max: 20, daysLeft: 5, status: 'warning' },
      { id: 3, name: 'Air Mineral 600ml', sku: 'FNB-003', left: 8, max: 100, daysLeft: 8, status: 'warning' }
    ],
    expenses: {
      operational: [
        { label: 'Stok Produk', value: 31200000, pct: 65, color: '#6366f1' },
        { label: 'Gaji & Operasional', value: 12000000, pct: 25, color: '#3b82f6' },
        { label: 'Sewa & Listrik', value: 5000000, pct: 10, color: '#ef4444' }
      ],
      totalOperational: 48200000
    },
    transactions: [
      { id: '#TRX-98241', orderId: 'ORD-2241', customer: 'Budi Santoso', metode: 'Mandiri VA', pemasukan: 1250000, pengeluaran: 450000, laba: 800000, status: 'berhasil', date: '24 Mei, 14:20' },
      { id: '#TRX-98240', orderId: '-', customer: 'Ani Wijaya', metode: 'Tunai', pemasukan: 425000, pengeluaran: 150000, laba: 275000, status: 'berhasil', date: '24 Mei, 13:45' },
      { id: '#TRX-98239', orderId: 'ORD-2238', customer: 'Citra Lestari', metode: 'OVO', pemasukan: 89000, pengeluaran: 40000, laba: 49000, status: 'failed', date: '24 Mei, 12:10' },
      { id: '#TRX-98237', orderId: '-', customer: 'Doni Firmansyah', metode: 'GoPay', pemasukan: 780000, pengeluaran: 300000, laba: 480000, status: 'berhasil', date: '23 Mei, 10:00' },
      { id: '#TRX-98235', orderId: 'ORD-2235', customer: 'Rina Pratiwi', metode: 'BCA VA', pemasukan: 2100000, pengeluaran: 800000, laba: 1300000, status: 'pending', date: '23 Mei, 09:30' },
      { id: '#TRX-98230', orderId: 'ORD-2230', customer: 'Fajar Nugraha', metode: 'Transfer BNI', pemasukan: 450000, pengeluaran: 200000, laba: 250000, status: 'berhasil', date: '22 Mei, 15:20' }
    ]
  },
  'tahunan': {
    summary: {
      pemasukan: 1452000000,
      pengeluaran: 540000000,
      labaKotor: 912000000,
      labaBersih: 825000000,
      trends: { pem: '+24.6%', peng: '+10.5%', lKotor: '+28.4%', lBersih: '+31.2%' }
    },
    stats: {
      bestProduct: { name: 'Nike Air Zoom', profit: 242000000, desc: 'Kontribusi 29% total laba tahunan' },
      bestDay: { day: 'Desember', val: 185000000, desc: 'Musim liburan akhir tahun' },
      avgTx: { val: 268000, trend: '+8.4%', desc: 'Dibanding tahun lalu' }
    },
    insights: [
      { id: 1, text: "Laba bersih tahunan **meningkat tajam 31.2%**, melampaui omzet tahun lalu." },
      { id: 2, text: "Kategori **Alas Kaki & Pakaian** berkontribusi **42%** terhadap omzet tahunan." },
      { id: 3, text: "Investasi pada **kasir POS digital** memangkas tingkat pembatalan order sebesar **65%**." }
    ],
    restock: [
      { id: 1, name: 'Charger Type-C Fast', sku: 'ELC-082', left: 1, max: 15, daysLeft: 3, status: 'danger' },
      { id: 2, name: 'Kaos Polos Premium L', sku: 'APP-012', left: 3, max: 20, daysLeft: 5, status: 'warning' }
    ],
    expenses: {
      operational: [
        { label: 'Belanja Stok', value: 380000000, pct: 70, color: '#6366f1' },
        { label: 'Gaji Karyawan', value: 110000000, pct: 20, color: '#3b82f6' },
        { label: 'Biaya Sewa Ruko', value: 50000000, pct: 10, color: '#ef4444' }
      ],
      totalOperational: 540000000
    },
    transactions: [
      { id: '#TRX-9011', orderId: 'ORD-1120', customer: 'Budi Santoso', metode: 'BCA VA', pemasukan: 45000000, pengeluaran: 18000000, laba: 27000000, status: 'berhasil', date: 'Januari 2026' },
      { id: '#TRX-9012', orderId: '-', customer: 'Ani Wijaya', metode: 'Tunai', pemasukan: 32000000, pengeluaran: 12000000, laba: 20000000, status: 'berhasil', date: 'Februari 2026' },
      { id: '#TRX-9013', orderId: 'ORD-1122', customer: 'Citra Lestari', metode: 'Mandiri VA', pemasukan: 55000000, pengeluaran: 22000000, laba: 33000000, status: 'failed', date: 'Maret 2026' },
      { id: '#TRX-9014', orderId: '-', customer: 'Doni Firmansyah', metode: 'GoPay', pemasukan: 48000000, pengeluaran: 18000000, laba: 30000000, status: 'berhasil', date: 'April 2026' },
      { id: '#TRX-9015', orderId: 'ORD-1125', customer: 'Rina Pratiwi', metode: 'QRIS', pemasukan: 68000000, pengeluaran: 26000000, laba: 42000000, status: 'berhasil', date: 'Mei 2026' }
    ]
  }
};

// Coordinates dataset for the SVG line chart based on ranges
const CHART_COORDINATES = {
  'harian': {
    labels: ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'],
    pemasukan: [15, 35, 65, 45, 75, 110, 80],
    pemasukanRaw: [600000, 1400000, 2600000, 1800000, 3000000, 4400000, 3200000],
    pengeluaran: [10, 20, 30, 25, 30, 40, 25],
    pengeluaranRaw: [400000, 800000, 1200000, 1000000, 1200000, 1600000, 1000000]
  },
  'mingguan': {
    labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
    pemasukan: [40, 50, 45, 60, 80, 120, 95],
    pemasukanRaw: [2400000, 3000000, 2700000, 3600000, 4800000, 7200000, 5700000],
    pengeluaran: [20, 22, 25, 20, 35, 50, 30],
    pengeluaranRaw: [1200000, 1320000, 1500000, 1200000, 2100000, 3000000, 1800000]
  },
  'bulanan': {
    labels: ['M1', 'M2', 'M3', 'M4'],
    pemasukan: [45, 75, 90, 130],
    pemasukanRaw: [22500000, 37500000, 45000000, 65000000],
    pengeluaran: [25, 35, 30, 45],
    pengeluaranRaw: [12500000, 17500000, 15000000, 22500000]
  },
  'tahunan': {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    pemasukan: [60, 90, 110, 150],
    pemasukanRaw: [300000000, 450000000, 550000000, 750000000],
    pengeluaran: [30, 40, 45, 55],
    pengeluaranRaw: [150000000, 200000000, 225000000, 275000000]
  }
};

const formatRupiah = (val) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(val);
};

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState('bulanan'); // 'hari-ini' | 'mingguan' | 'bulanan' | 'tahunan'
  const [chartRange, setChartRange] = useState('bulanan'); // 'harian' | 'mingguan' | 'bulanan' | 'tahunan'
  
  // Table state
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua');
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // SVG Chart interactions
  const [hoveredPoint, setHoveredPoint] = useState(null); // { index, x, y, pem, peng, label }
  
  // Toast notifications for Export action
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Sync chartRange when dateRange changes
  useEffect(() => {
    if (dateRange === 'hari-ini') setChartRange('harian');
    else if (dateRange === 'mingguan') setChartRange('mingguan');
    else if (dateRange === 'bulanan') setChartRange('bulanan');
    else if (dateRange === 'tahunan') setChartRange('tahunan');
  }, [dateRange]);

  const activeData = REPORT_DATA[dateRange];
  const chartData = CHART_COORDINATES[chartRange];

  // Handler for Export click
  const triggerExport = (format) => {
    setToastMessage(`Mengekspor laporan (${dateRange.toUpperCase()}) sebagai ${format.toUpperCase()}...`);
    setShowToast(true);
    setTimeout(() => {
      setToastMessage(`Laporan berhasil diekspor ke folder unduhan!`);
      setTimeout(() => setShowToast(false), 2500);
    }, 1500);
  };

  // SVG Calculations for the custom Area & Line chart
  const paddingX = 40;
  const paddingY = 30;
  const chartWidth = 500;
  const chartHeight = 180;

  const pointsCount = chartData.labels.length;
  
  // Generate exact X coordinate for each point
  const getX = (index) => {
    if (pointsCount <= 1) return paddingX;
    return paddingX + (index * (chartWidth - 2 * paddingX)) / (pointsCount - 1);
  };

  // Generate exact Y coordinate based on scale
  // Maximum value representation is 160
  const getY = (val) => {
    const maxVal = 160;
    return chartHeight - paddingY - (val * (chartHeight - 2 * paddingY)) / maxVal;
  };

  // Path generators for SVG line and smooth cubic bezier curves
  const linePemasukanPath = useMemo(() => {
    if (pointsCount === 0) return '';
    let path = `M ${getX(0)} ${getY(chartData.pemasukan[0])}`;
    
    // Smooth Bezier Curve interpolation
    for (let i = 0; i < pointsCount - 1; i++) {
      const x1 = getX(i);
      const y1 = getY(chartData.pemasukan[i]);
      const x2 = getX(i + 1);
      const y2 = getY(chartData.pemasukan[i + 1]);
      const cpX1 = x1 + (x2 - x1) / 3;
      const cpY1 = y1;
      const cpX2 = x1 + 2 * (x2 - x1) / 3;
      const cpY2 = y2;
      path += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${x2} ${y2}`;
    }
    return path;
  }, [chartRange, chartData]);

  const areaPemasukanPath = useMemo(() => {
    if (!linePemasukanPath) return '';
    const firstX = getX(0);
    const lastX = getX(pointsCount - 1);
    const floorY = chartHeight - paddingY;
    return `${linePemasukanPath} L ${lastX} ${floorY} L ${firstX} ${floorY} Z`;
  }, [linePemasukanPath]);

  const linePengeluaranPath = useMemo(() => {
    if (pointsCount === 0) return '';
    let path = `M ${getX(0)} ${getY(chartData.pengeluaran[0])}`;
    for (let i = 0; i < pointsCount - 1; i++) {
      const x1 = getX(i);
      const y1 = getY(chartData.pengeluaran[i]);
      const x2 = getX(i + 1);
      const y2 = getY(chartData.pengeluaran[i + 1]);
      const cpX1 = x1 + (x2 - x1) / 3;
      const cpY1 = y1;
      const cpX2 = x1 + 2 * (x2 - x1) / 3;
      const cpY2 = y2;
      path += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${x2} ${y2}`;
    }
    return path;
  }, [chartRange, chartData]);

  const areaPengeluaranPath = useMemo(() => {
    if (!linePengeluaranPath) return '';
    const firstX = getX(0);
    const lastX = getX(pointsCount - 1);
    const floorY = chartHeight - paddingY;
    return `${linePengeluaranPath} L ${lastX} ${floorY} L ${firstX} ${floorY} Z`;
  }, [linePengeluaranPath]);

  // Donut chart segments generator
  const donutSegments = useMemo(() => {
    const radius = 40;
    const circumference = 2 * Math.PI * radius; // 251.32
    let cumulativePercent = 0;

    return activeData.expenses.operational.map(item => {
      const strokeLength = (item.pct / 100) * circumference;
      const strokeOffset = circumference - strokeLength + (cumulativePercent / 100) * circumference;
      cumulativePercent += item.pct;
      return {
        ...item,
        strokeLength,
        strokeOffset: -strokeOffset // negative to rotate clockwise from top
      };
    });
  }, [dateRange, activeData]);

  // Table filtering and search logic
  const filteredAndSortedTrx = useMemo(() => {
    let result = [...activeData.transactions];

    // Search filter
    if (search.trim() !== '') {
      const q = search.toLowerCase();
      result = result.filter(
        t => t.customer.toLowerCase().includes(q) || t.id.toLowerCase().includes(q)
      );
    }

    // Status filter
    if (statusFilter !== 'Semua') {
      result = result.filter(t => t.status === statusFilter.toLowerCase());
    }

    // Sorting
    result.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      // Safe fallback if not found
      if (aVal === undefined) aVal = '';
      if (bVal === undefined) bVal = '';

      if (typeof aVal === 'string') {
        return sortDirection === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      } else {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }
    });

    return result;
  }, [activeData, search, statusFilter, sortField, sortDirection]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredAndSortedTrx.length / itemsPerPage) || 1;
  const paginatedTrx = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedTrx.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedTrx, currentPage]);

  // Reset page number on search or filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, sortField]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc'); // default desc for amounts/date
    }
  };

  // Helper for generating custom dynamic table header with sorting indicator
  const renderSortIndicator = (field) => {
    if (sortField !== field) return <span style={{ color: '#cbd5e1', marginLeft: 4 }}>⇅</span>;
    return sortDirection === 'asc' ? ' ▲' : ' ▼';
  };

  return (
    <div className="reports-container">
      
      {/* Toast Notification */}
      {showToast && (
        <div className="reports-toast-notif">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Header Atas */}
      <div className="reports-header">
        <div className="reports-header-left">
          <h1 className="reports-page-title">Laporan</h1>
          <p className="reports-page-subtitle">Pantau performa penjualan dan keuntungan bisnis Anda</p>
        </div>
        
        <div className="reports-header-right">
          <div className="reports-search-box">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input 
              className="reports-search-input" 
              placeholder="Cari transaksi..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="reports-date-filter">
            <button className={`reports-filter-btn ${dateRange === 'hari-ini' ? 'active' : ''}`} onClick={() => setDateRange('hari-ini')}>Hari Ini</button>
            <button className={`reports-filter-btn ${dateRange === 'mingguan' ? 'active' : ''}`} onClick={() => setDateRange('mingguan')}>Mingguan</button>
            <button className={`reports-filter-btn ${dateRange === 'bulanan' ? 'active' : ''}`} onClick={() => setDateRange('bulanan')}>Bulanan</button>
            <button className={`reports-filter-btn ${dateRange === 'tahunan' ? 'active' : ''}`} onClick={() => setDateRange('tahunan')}>Tahunan</button>
          </div>

          <button className="btn-primary-glow" onClick={() => triggerExport('csv')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Export Laporan
          </button>
        </div>
      </div>

      {/* 2. Summary Cards (4 card horizontal) */}
      <div className="reports-summary-grid">
        
        {/* Total Pemasukan */}
        <div className="reports-card summary-card accent-purple">
          <div className="summary-header">
            <div className="summary-icon-wrapper">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M7 15h0M2 9.5h20"/></svg>
            </div>
            <div className="summary-trend-badge up">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
              {activeData.summary.trends.pem}
            </div>
          </div>
          <div className="summary-label">Total Pemasukan</div>
          <div className="summary-value">{formatRupiah(activeData.summary.pemasukan)}</div>
          <div className="summary-desc">Dibanding {dateRange === 'hari-ini' ? 'kemarin' : dateRange === 'mingguan' ? 'minggu lalu' : dateRange === 'bulanan' ? 'bulan lalu' : 'tahun lalu'}</div>
        </div>

        {/* Total Pengeluaran */}
        <div className="reports-card summary-card accent-red">
          <div className="summary-header">
            <div className="summary-icon-wrapper">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>
            </div>
            <div className={`summary-trend-badge ${dateRange === 'hari-ini' ? 'down' : 'up'}`}>
              {dateRange === 'hari-ini' ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/></svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
              )}
              {activeData.summary.trends.peng}
            </div>
          </div>
          <div className="summary-label">Total Pengeluaran</div>
          <div className="summary-value">{formatRupiah(activeData.summary.pengeluaran)}</div>
          <div className="summary-desc">Dibanding {dateRange === 'hari-ini' ? 'kemarin' : dateRange === 'mingguan' ? 'minggu lalu' : dateRange === 'bulanan' ? 'bulan lalu' : 'tahun lalu'}</div>
        </div>

        {/* Laba Kotor */}
        <div className="reports-card summary-card accent-blue">
          <div className="summary-header">
            <div className="summary-icon-wrapper">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <div className="summary-trend-badge up">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
              {activeData.summary.trends.lKotor}
            </div>
          </div>
          <div className="summary-label">Laba Kotor</div>
          <div className="summary-value">{formatRupiah(activeData.summary.labaKotor)}</div>
          <div className="summary-desc">Dibanding {dateRange === 'hari-ini' ? 'kemarin' : dateRange === 'mingguan' ? 'minggu lalu' : dateRange === 'bulanan' ? 'bulan lalu' : 'tahun lalu'}</div>
        </div>

        {/* Laba Bersih */}
        <div className="reports-card summary-card accent-emerald">
          <div className="summary-header">
            <div className="summary-icon-wrapper">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v12M9 9h4.5a1.5 1.5 0 0 1 0 3H10a1.5 1.5 0 0 0 0 3H15"/></svg>
            </div>
            <div className="summary-trend-badge up">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
              {activeData.summary.trends.lBersih}
            </div>
          </div>
          <div className="summary-label">Laba Bersih</div>
          <div className="summary-value">{formatRupiah(activeData.summary.labaBersih)}</div>
          <div className="summary-desc">Dibanding {dateRange === 'hari-ini' ? 'kemarin' : dateRange === 'mingguan' ? 'minggu lalu' : dateRange === 'bulanan' ? 'bulan lalu' : 'tahun lalu'}</div>
        </div>
      </div>

      {/* Primary Row: Chart & Mini Analytics */}
      <div className="chart-main-row">
        
        {/* 3. Grafik Analisis Keuangan */}
        <div className="reports-card finance-chart-card">
          <div className="reports-card-title">
            <span>Analisis Pemasukan & Pengeluaran</span>
            <div className="chart-toggle-pills">
              <div className={`chart-toggle-pill ${chartRange === 'harian' ? 'active' : ''}`} onClick={() => setChartRange('harian')}>Harian</div>
              <div className={`chart-toggle-pill ${chartRange === 'mingguan' ? 'active' : ''}`} onClick={() => setChartRange('mingguan')}>Mingguan</div>
              <div className={`chart-toggle-pill ${chartRange === 'bulanan' ? 'active' : ''}`} onClick={() => setChartRange('bulanan')}>Bulanan</div>
              <div className={`chart-toggle-pill ${chartRange === 'tahunan' ? 'active' : ''}`} onClick={() => setChartRange('tahunan')}>Tahunan</div>
            </div>
          </div>

          <div className="chart-svg-container">
            {/* Custom SVG Interactive Chart Engine */}
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} width="100%" height="100%">
              <defs>
                {/* Gradients */}
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
              <line x1={paddingX} y1={getY(0)} x2={chartWidth - paddingX} y2={getY(0)} className="chart-grid-line" strokeDasharray="0" stroke="#e2e8f0" strokeWidth="1.5" />
              <line x1={paddingX} y1={getY(40)} x2={chartWidth - paddingX} y2={getY(40)} className="chart-grid-line" />
              <line x1={paddingX} y1={getY(80)} x2={chartWidth - paddingX} y2={getY(80)} className="chart-grid-line" />
              <line x1={paddingX} y1={getY(120)} x2={chartWidth - paddingX} y2={getY(120)} className="chart-grid-line" />
              <line x1={paddingX} y1={getY(160)} x2={chartWidth - paddingX} y2={getY(160)} className="chart-grid-line" />

              {/* Vertical hover guide line */}
              {hoveredPoint && (
                <line 
                  x1={hoveredPoint.x} 
                  y1={getY(160)} 
                  x2={hoveredPoint.x} 
                  y2={getY(0)} 
                  className="chart-hover-line" 
                />
              )}

              {/* Area paths */}
              <path d={areaPemasukanPath} className="chart-area-pemasukan" />
              <path d={areaPengeluaranPath} className="chart-area-pengeluaran" />

              {/* Line paths */}
              <path d={linePemasukanPath} className="chart-line-pemasukan" fill="none" />
              <path d={linePengeluaranPath} className="chart-line-pengeluaran" fill="none" />

              {/* Interaction points (invisible large overlay circles for easy hover + visible small circles) */}
              {chartData.labels.map((lbl, idx) => {
                const cx = getX(idx);
                const cyPem = getY(chartData.pemasukan[idx]);
                const cyPeng = getY(chartData.pengeluaran[idx]);
                const isHovered = hoveredPoint && hoveredPoint.index === idx;

                return (
                  <g key={idx}>
                    {/* Grid X Label */}
                    <text 
                      x={cx} 
                      y={chartHeight - 6} 
                      fill={isHovered ? "#6366f1" : "#94a3b8"} 
                      fontSize="9" 
                      fontWeight={isHovered ? "700" : "500"}
                      textAnchor="middle"
                    >
                      {lbl}
                    </text>

                    {/* Pemasukan circles */}
                    <circle 
                      cx={cx} 
                      cy={cyPem} 
                      r={isHovered ? 6 : 4} 
                      fill="#6366f1" 
                      className="chart-interactive-point"
                    />

                    {/* Pengeluaran circles */}
                    <circle 
                      cx={cx} 
                      cy={cyPeng} 
                      r={isHovered ? 6 : 4} 
                      fill="#ef4444" 
                      className="chart-interactive-point"
                    />

                    {/* Large hover trigger area */}
                    <rect 
                      x={cx - 20} 
                      y="0" 
                      width="40" 
                      height={chartHeight} 
                      fill="transparent" 
                      style={{ cursor: 'pointer' }}
                      onMouseEnter={(e) => {
                        const rectSvg = e.currentTarget.parentNode.parentNode.getBoundingClientRect();
                        const clientX = e.clientX - rectSvg.left;
                        const clientY = e.clientY - rectSvg.top;
                        
                        setHoveredPoint({
                          index: idx,
                          x: cx,
                          y: (cyPem + cyPeng) / 2, // center of both points
                          xPercent: (cx / chartWidth) * 100,
                          yPercent: (((cyPem + cyPeng) / 2) / chartHeight) * 100,
                          pem: chartData.pemasukanRaw[idx],
                          peng: chartData.pengeluaranRaw[idx],
                          label: lbl
                        });
                      }}
                      onMouseLeave={() => setHoveredPoint(null)}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Custom Interactive Tooltip */}
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

        {/* 7. Peak Sales Analysis */}
        <div className="reports-card">
          <div className="reports-card-title">
            <span>Analisis Peak Sales</span>
            <span style={{ fontSize: '11px', color: '#64748b', background: 'rgba(99, 102, 241, 0.06)', padding: '4px 8px', borderRadius: '12px', fontWeight: '700' }}>Live Analytics</span>
          </div>
          
          <div className="peak-sales-box">
            <p style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.5 }}>Visualisasi tingkat keramaian pembeli berdasarkan jam operasional toko:</p>
            
            {/* Custom Interactive Peak Mini Bar Chart */}
            <div className="peak-mini-chart">
              {[
                { hr: '08:00', val: 20, active: false },
                { hr: '10:00', val: 35, active: false },
                { hr: '12:00', val: 65, active: false },
                { hr: '14:00', val: 50, active: false },
                { hr: '16:00', val: 75, active: false },
                { hr: '18:00', val: 95, active: true }, // Peak Hour
                { hr: '20:00', val: 80, active: true }, // Peak Hour
                { hr: '22:00', val: 30, active: false }
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  className={`peak-bar ${item.active ? 'active' : ''}`} 
                  style={{ height: `${item.val}%` }}
                  title={`${item.hr}: ${item.val}% Keramaian`}
                />
              ))}
            </div>

            <div className="peak-stats-list">
              <div className="peak-stat-row">
                <span className="peak-stat-label">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  Jam Teramai (Peak Hour)
                </span>
                <span className="peak-stat-val" style={{ color: '#6366f1' }}>18:00 - 20:00 WIB</span>
              </div>
              <div className="peak-stat-row">
                <span className="peak-stat-label">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  Hari Paling Ramai
                </span>
                <span className="peak-stat-val" style={{ color: '#10b981' }}>Sabtu (Weekend)</span>
              </div>
              <div className="peak-stat-row">
                <span className="peak-stat-label">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  Trafik Pelanggan Baru
                </span>
                <span className="peak-stat-val">+42% pada Weekend</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Statistik Keuntungan (3 card kecil) */}
      <div className="reports-stats-row">
        
        {/* Produk Paling Menguntungkan */}
        <div className="reports-card stat-item-card">
          <div className="stat-item-icon-box">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
          </div>
          <div className="stat-item-content">
            <div className="stat-item-label">Produk Teruntung</div>
            <div className="stat-item-value">{activeData.stats.bestProduct.name}</div>
            <div className="stat-item-desc" style={{ color: '#10b981', fontWeight: '600' }}>Laba: {formatRupiah(activeData.stats.bestProduct.profit)}</div>
            <div className="stat-item-desc">{activeData.stats.bestProduct.desc}</div>
          </div>
        </div>

        {/* Hari Penjualan Tertinggi */}
        <div className="reports-card stat-item-card">
          <div className="stat-item-icon-box" style={{ color: '#10b981', background: 'rgba(16, 185, 129, 0.06)' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          </div>
          <div className="stat-item-content">
            <div className="stat-item-label">Penjualan Tertinggi</div>
            <div className="stat-item-value">{activeData.stats.bestDay.day}</div>
            <div className="stat-item-desc" style={{ color: '#6366f1', fontWeight: '600' }}>Omzet: {formatRupiah(activeData.stats.bestDay.val)}</div>
            <div className="stat-item-desc">{activeData.stats.bestDay.desc}</div>
          </div>
        </div>

        {/* Rata-rata Transaksi */}
        <div className="reports-card stat-item-card">
          <div className="stat-item-icon-box" style={{ color: '#3b82f6', background: 'rgba(59, 130, 246, 0.06)' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
          <div className="stat-item-content">
            <div className="stat-item-label">Rata-rata Transaksi</div>
            <div className="stat-item-value">{formatRupiah(activeData.stats.avgTx.val)}</div>
            <div className="stat-item-desc" style={{ color: '#10b981', fontWeight: '600' }}>{activeData.stats.avgTx.trend} Pertumbuhan</div>
            <div className="stat-item-desc">{activeData.stats.avgTx.desc}</div>
          </div>
        </div>
      </div>

      {/* Secondary Row: Expenses & Recommendations & Insights */}
      <div className="expenses-row">
        
        {/* 6. Analisis Pengeluaran */}
        <div className="reports-card">
          <div className="reports-card-title">Analisis Pengeluaran</div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            
            {/* Donut Chart SVG Container */}
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
                    />
                  ))}
                </g>

                {/* Inner label */}
                <g className="donut-inner-text">
                  <text className="donut-val-center" x="50" y="47" textAnchor="middle" dominantBaseline="central">{formatRupiah(activeData.expenses.totalOperational)}</text>
                  <text className="donut-lbl-center" x="50" y="60" textAnchor="middle" dominantBaseline="central">TOTAL OPERASIONAL</text>
                </g>
              </svg>

              {/* Donut Legend */}
              <div className="donut-legend-box">
                {donutSegments.map((segment, idx) => (
                  <div key={idx} className="donut-legend-item">
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

            {/* Category Progress Bars */}
            <div>
              <div className="reports-card-subtitle" style={{ marginBottom: 12, fontWeight: 700, fontSize: 13 }}>Pengeluaran per Produk / Stok Kategori</div>
              <div className="progress-list">
                {[
                  { name: 'Belanja Stok Sepatu & Pakaian', val: 24000000, max: 40000000, color: 'linear-gradient(90deg, #6366f1, #818cf8)' },
                  { name: 'Belanja Stok Elektronik', val: 18200000, max: 40000000, color: 'linear-gradient(90deg, #3b82f6, #60a5fa)' },
                  { name: 'Belanja Aksesoris & Lainnya', val: 6000000, max: 40000000, color: 'linear-gradient(90deg, #ef4444, #f87171)' }
                ].map((item, idx) => {
                  const pct = Math.min((item.val / item.max) * 100, 100);
                  return (
                    <div key={idx} className="progress-item">
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

        {/* 8. Smart Restock Recommendation & 9. Business Insight Summary */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          
          {/* Smart Restock Recommendation */}
          <div className="reports-card" style={{ flex: 1 }}>
            <div className="reports-card-title">
              <span>Smart Restock Recommendation</span>
              <span className="status-pill pending" style={{ fontSize: 9 }}>AI Insight</span>
            </div>
            
            <div className="restock-alert-box">
              {activeData.restock.map((item) => (
                <div key={item.id} className={`restock-card-item ${item.status}`}>
                  <div className="restock-alert-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                  </div>
                  <div className="restock-info-content">
                    <div className="restock-item-title">{item.name}</div>
                    <div className="restock-item-desc">SKU: {item.sku} • Rekomendasi order ulang sekarang karena penjualan tinggi minggu ini.</div>
                    
                    <div className="restock-progress-mini">
                      <div 
                        className="restock-progress-fill" 
                        style={{ width: `${(item.left / item.max) * 100}%` }} 
                      />
                    </div>
                    
                    <div className="restock-item-meta">
                      <span className="restock-left-qty">Tersisa: {item.left} unit (Habis dlm {item.daysLeft} hari)</span>
                      <span className="restock-action-suggest" onClick={() => triggerExport('surat-restock')}>Restock Sekarang</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Business Insight Summary */}
          <div className="reports-card" style={{ flex: 1 }}>
            <div className="reports-card-title">
              <span>Business Insight Summary</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .6 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
            </div>
            
            <div className="insights-gradient-box">
              {activeData.insights.map((ins) => (
                <div key={ins.id} className="insight-grad-card">
                  <div className="insight-icon-box">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
                  </div>
                  <div 
                    className="insight-txt"
                    dangerouslySetInnerHTML={{
                      __html: ins.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* 5. Tabel Laporan Transaksi */}
      <div className="reports-card reports-table-card">
        
        {/* Table Header Filter controls */}
        <div className="reports-table-header">
          <div className="reports-table-title-box">
            <div className="reports-table-title">Daftar Laporan Transaksi</div>
            <div className="reports-table-subtitle">Menampilkan detail pemasukan, pengeluaran, dan laba per transaksi</div>
          </div>
          
          <div className="reports-table-actions">
            
            {/* Status Filter */}
            <select 
              className="select-modern" 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="Semua">Semua Status</option>
              <option value="Berhasil">Berhasil</option>
              <option value="Pending">Pending</option>
              <option value="Gagal">Gagal / Refund</option>
            </select>

            {/* Export CSV internal trigger */}
            <button className="select-modern" onClick={() => triggerExport('csv')} style={{ background: '#f8fafc' }}>
              📥 Ekspor CSV
            </button>
          </div>
        </div>

        {/* Responsive Table wrapper */}
        <div className="table-responsive-wrapper">
          <table className="reports-data-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('id')}>ID Transaksi {renderSortIndicator('id')}</th>
                <th onClick={() => handleSort('date')}>Tanggal {renderSortIndicator('date')}</th>
                <th onClick={() => handleSort('customer')}>Pelanggan {renderSortIndicator('customer')}</th>
                <th onClick={() => handleSort('metode')}>Pembayaran {renderSortIndicator('metode')}</th>
                <th onClick={() => handleSort('pemasukan')} style={{ textAlign: 'right' }}>Pemasukan {renderSortIndicator('pemasukan')}</th>
                <th onClick={() => handleSort('pengeluaran')} style={{ textAlign: 'right' }}>Pengeluaran {renderSortIndicator('pengeluaran')}</th>
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
                paginatedTrx.map((row) => (
                  <tr key={row.id}>
                    <td className="trx-id-col">{row.id}</td>
                    <td style={{ color: '#64748b', whiteSpace: 'nowrap' }}>{row.date}</td>
                    <td>
                      <div className="trx-customer-box">
                        <div className="trx-initial-avatar">
                          {row.customer.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
                        </div>
                        <span style={{ fontWeight: 600, color: '#1e293b' }}>{row.customer}</span>
                      </div>
                    </td>
                    <td>
                      <span className="badge-payment">{row.metode}</span>
                    </td>
                    <td className="val-bold" style={{ textAlign: 'right' }}>
                      {formatRupiah(row.pemasukan)}
                    </td>
                    <td className="val-negative" style={{ textAlign: 'right' }}>
                      {formatRupiah(row.pengeluaran)}
                    </td>
                    <td className="val-positive" style={{ textAlign: 'right' }}>
                      {formatRupiah(row.laba)}
                    </td>
                    <td>
                      <span className={`status-pill ${row.status === 'berhasil' ? 'success' : row.status === 'pending' ? 'pending' : 'failed'}`}>
                        {row.status === 'berhasil' ? 'Berhasil' : row.status === 'pending' ? 'Pending' : 'Refund'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination controls */}
        {filteredAndSortedTrx.length > 0 && (
          <div className="reports-pagination">
            <div>
              Menampilkan <strong>{((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, filteredAndSortedTrx.length)}</strong> dari <strong>{filteredAndSortedTrx.length}</strong> Transaksi
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

      {/* 13. Floating Quick Action Button */}
      <button className="fab-reports-export" onClick={() => triggerExport('pdf')}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
        Export PDF
      </button>

    </div>
  );
}
