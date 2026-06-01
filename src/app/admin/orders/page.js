"use client";
import React, { useState, useEffect, useMemo } from 'react';
import '../../../styles/orders.css';

// All dates relative so filters always work when demoing
const today = new Date();
const d = (offsetDays, h = 10, m = 0) => {
  const dt = new Date(today);
  dt.setDate(dt.getDate() - offsetDays);
  dt.setHours(h, m, 0, 0);
  return dt;
};

const fmt = (dt) => dt.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }).replace(',', '');

// Comprehensive mock dataset representing all statuses, locations, methods, and prices
const INITIAL_ORDERS = [
  {
    id: '#ORD-88291',
    rawDate: d(0, 9, 20), // Hari ini
    customer: 'Andi Wijaya',
    location: 'Jakarta Selatan',
    product: 'Premium Cotton T-Shirt White (+2 others)',
    items: '3 Items',
    productsList: [
      { name: 'Premium Cotton T-Shirt White', price: 250000, qty: 1 },
      { name: 'Casual Denim Pants Blue', price: 350000, qty: 1 },
      { name: 'Socks Stripe Black', price: 121000, qty: 2 }
    ],
    total: 'Rp 842.000',
    method: 'Transfer BCA',
    status: 'DIPROSES',
    payment: 'Dibayar',
    paymentStatus: 'success',
    notes: 'Kirim sebelum jam 5 sore ya.'
  },
  {
    id: '#ORD-88290',
    rawDate: d(0, 14, 30), // Hari ini
    customer: 'Hendra Kurnia',
    location: 'Bekasi',
    product: 'Running Shoes Pro Edition',
    items: '1 Item',
    productsList: [
      { name: 'Running Shoes Pro Edition', price: 1200000, qty: 1 }
    ],
    total: 'Rp 1.200.000',
    method: 'QRIS (GoPay)',
    status: 'DIKIRIM',
    payment: 'Dibayar',
    paymentStatus: 'success',
    notes: 'Warna biru ukuran 42.'
  },
  {
    id: '#ORD-88289',
    rawDate: d(1, 11, 0), // Kemarin (Minggu ini)
    customer: 'Maya Putri',
    location: 'Yogyakarta',
    product: 'Aesthetic Wall Clock Minimalist (+1 other)',
    items: '2 Items',
    productsList: [
      { name: 'Aesthetic Wall Clock Minimalist', price: 250000, qty: 1 },
      { name: 'Scented Candle Lavender', price: 225000, qty: 1 }
    ],
    total: 'Rp 475.000',
    method: 'QRIS (OVO)',
    status: 'MENUNGGU',
    payment: 'Pending',
    paymentStatus: 'pending',
    notes: 'Harap dibungkus kado.'
  },
  {
    id: '#ORD-88288',
    rawDate: d(2, 18, 45), // 2 hari lalu (Minggu ini)
    customer: 'Siti Aminah',
    location: 'Surabaya',
    product: 'Minimalist Desk Lamp',
    items: '1 Item',
    productsList: [
      { name: 'Minimalist Desk Lamp', price: 325000, qty: 1 }
    ],
    total: 'Rp 325.000',
    method: 'Transfer Mandiri',
    status: 'MENUNGGU',
    payment: 'Pending',
    paymentStatus: 'pending',
    notes: ''
  },
  {
    id: '#ORD-88287',
    rawDate: d(3, 14, 10), // 3 hari lalu (Minggu ini)
    customer: 'Budi Santoso',
    location: 'Bandung',
    product: 'Mechanical Keyboard Blue Switch',
    items: '1 Item',
    productsList: [
      { name: 'Mechanical Keyboard Blue Switch', price: 1150000, qty: 1 }
    ],
    total: 'Rp 1.150.000',
    method: 'Transfer BCA',
    status: 'DIPROSES',
    payment: 'Dibayar',
    paymentStatus: 'success',
    notes: 'Pastikan dicek kelengkapan sebelum kirim.'
  },
  {
    id: '#ORD-88286',
    rawDate: d(4, 10, 30), // 4 hari lalu (Minggu ini)
    customer: 'Dewi Lestari',
    location: 'Yogyakarta',
    product: 'Wireless Gaming Mouse (+1 other)',
    items: '2 Items',
    productsList: [
      { name: 'Wireless Gaming Mouse', price: 750000, qty: 1 },
      { name: 'Mousepad Extended Black', price: 200000, qty: 1 }
    ],
    total: 'Rp 950.000',
    method: 'QRIS (GoPay)',
    status: 'DIKIRIM',
    payment: 'Dibayar',
    paymentStatus: 'success',
    notes: ''
  },
  {
    id: '#ORD-88285',
    rawDate: d(5, 19, 15), // 5 hari lalu (Minggu ini)
    customer: 'Rudi Hermawan',
    location: 'Bekasi',
    product: 'Laptop Stand Aluminum',
    items: '1 Item',
    productsList: [
      { name: 'Laptop Stand Aluminum', price: 210000, qty: 1 }
    ],
    total: 'Rp 210.000',
    method: 'QRIS (OVO)',
    status: 'DIBATALKAN',
    payment: 'Pending',
    paymentStatus: 'pending',
    notes: 'Pesanan dibatalkan oleh customer.'
  },
  {
    id: '#ORD-88284',
    rawDate: d(6, 12, 0), // 6 hari lalu (Minggu ini)
    customer: 'Anita Sari',
    location: 'Jakarta',
    product: 'Noise Cancelling Earbuds',
    items: '1 Item',
    productsList: [
      { name: 'Noise Cancelling Earbuds', price: 1850000, qty: 1 }
    ],
    total: 'Rp 1.850.000',
    method: 'Kartu Kredit',
    status: 'SELESAI',
    payment: 'Dibayar',
    paymentStatus: 'success',
    notes: 'Kirim pakai instant/same day.'
  },
  {
    id: '#ORD-88283',
    rawDate: d(8, 15, 0), // 8 hari lalu (Bulan ini)
    customer: 'Fajar Nugroho',
    location: 'Surabaya',
    product: 'Smart Watch Series 5',
    items: '1 Item',
    productsList: [
      { name: 'Smart Watch Series 5', price: 2450000, qty: 1 }
    ],
    total: 'Rp 2.450.000',
    method: 'Transfer BCA',
    status: 'SELESAI',
    payment: 'Dibayar',
    paymentStatus: 'success',
    notes: ''
  },
  {
    id: '#ORD-88282',
    rawDate: d(12, 9, 0), // 12 hari lalu (Bulan ini)
    customer: 'Ratna Dewi',
    location: 'Jakarta',
    product: 'Portable Bluetooth Speaker (+1 other)',
    items: '2 Items',
    productsList: [
      { name: 'Portable Bluetooth Speaker', price: 480000, qty: 1 },
      { name: 'USB Charger Hub 4-Port', price: 200000, qty: 1 }
    ],
    total: 'Rp 680.000',
    method: 'QRIS (OVO)',
    status: 'SELESAI',
    payment: 'Dibayar',
    paymentStatus: 'success',
    notes: ''
  },
  {
    id: '#ORD-88281',
    rawDate: d(15, 20, 0), // 15 hari lalu (Bulan ini)
    customer: 'Doni Pratama',
    location: 'Bandung',
    product: 'Ergonomic Office Chair',
    items: '1 Item',
    productsList: [
      { name: 'Ergonomic Office Chair', price: 3200000, qty: 1 }
    ],
    total: 'Rp 3.200.000',
    method: 'Transfer BCA',
    status: 'DIBATALKAN',
    payment: 'Pending',
    paymentStatus: 'pending',
    notes: 'Stok kosong, dibatalkan admin.'
  },
  {
    id: '#ORD-88280',
    rawDate: d(20, 10, 0), // 20 hari lalu (Bulan ini)
    customer: 'Lina Hartati',
    location: 'Jakarta',
    product: 'Stainless Steel Tumbler',
    items: '1 Item',
    productsList: [
      { name: 'Stainless Steel Tumbler', price: 95000, qty: 1 }
    ],
    total: 'Rp 95.000',
    method: 'Tunai',
    status: 'SELESAI',
    payment: 'Dibayar',
    paymentStatus: 'success',
    notes: 'Beli langsung di toko.'
  },
  {
    id: '#ORD-88279',
    rawDate: d(25, 11, 30), // 25 hari lalu (Bulan ini)
    customer: 'Rian Hidayat',
    location: 'Bekasi',
    product: 'Leather Wallet Premium',
    items: '1 Item',
    productsList: [
      { name: 'Leather Wallet Premium', price: 180000, qty: 1 }
    ],
    total: 'Rp 180.000',
    method: 'Tunai',
    status: 'SELESAI',
    payment: 'Dibayar',
    paymentStatus: 'success',
    notes: ''
  },
  {
    id: '#ORD-88278',
    rawDate: d(28, 16, 0), // 28 hari lalu (Bulan ini)
    customer: 'Siska Amelia',
    location: 'Jakarta',
    product: 'Matte Lip Cream Set (+1 other)',
    items: '2 Items',
    productsList: [
      { name: 'Matte Lip Cream Set', price: 150000, qty: 1 },
      { name: 'Blush On Pink Peach', price: 85000, qty: 1 }
    ],
    total: 'Rp 235.000',
    method: 'QRIS',
    status: 'DIBAYAR',
    payment: 'Dibayar',
    paymentStatus: 'success',
    notes: ''
  },
  {
    id: '#ORD-88277',
    rawDate: d(35, 14, 0), // 35 hari lalu (Bulan lalu)
    customer: 'Wahyu Santoso',
    location: 'Surabaya',
    product: 'Gaming Headset Pro 7.1',
    items: '1 Item',
    productsList: [
      { name: 'Gaming Headset Pro 7.1', price: 1500000, qty: 1 }
    ],
    total: 'Rp 1.500.000',
    method: 'QRIS (GoPay)',
    status: 'SELESAI',
    payment: 'Dibayar',
    paymentStatus: 'success',
    notes: ''
  },
  {
    id: '#ORD-88276',
    rawDate: d(45, 10, 15), // 45 hari lalu (Bulan lalu)
    customer: 'Sri Wahyuni',
    location: 'Yogyakarta',
    product: '4K Monitor 27 inch',
    items: '1 Item',
    productsList: [
      { name: '4K Monitor 27 inch', price: 6200000, qty: 1 }
    ],
    total: 'Rp 6.200.000',
    method: 'Transfer Mandiri',
    status: 'SELESAI',
    payment: 'Dibayar',
    paymentStatus: 'success',
    notes: 'Kirim dengan packing kayu.'
  }
].map(o => ({ ...o, date: fmt(o.rawDate) }));

const DEFAULT_FILTERS = {
  status: 'Semua',
  tanggal: 'Semua', // 'Semua', 'Hari Ini', 'Minggu Ini', 'Bulan Ini', 'Custom'
  startDate: '',
  endDate: '',
  metode: 'Semua',
  kota: 'Semua',
  nominal: 'Semua'
};

const getStatusBadgeClass = (status) => {
  switch (status.toUpperCase()) {
    case 'MENUNGGU':
      return 'badge gray';
    case 'DIBAYAR':
      return 'badge blue';
    case 'DIPROSES':
      return 'badge purple';
    case 'DIKIRIM':
      return 'badge purple';
    case 'SELESAI':
      return 'badge green';
    case 'DIBATALKAN':
      return 'badge red';
    default:
      return 'badge gray';
  }
};

export default function OrdersPage() {
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  // Filter & Search states
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [tempFilters, setTempFilters] = useState(DEFAULT_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState(DEFAULT_FILTERS);
  const [selectedKpiFilter, setSelectedKpiFilter] = useState('Total Pesanan');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals & Notifications
  const [viewingOrder, setViewingOrder] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);
  const [toast, setToast] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Sync sidebar state
  useEffect(() => {
    const shouldCollapse = selectedOrder !== null;
    window.dispatchEvent(new CustomEvent('set-sidebar-collapse', { detail: shouldCollapse }));
    
    return () => {
      window.dispatchEvent(new CustomEvent('set-sidebar-collapse', { detail: false }));
    };
  }, [selectedOrder]);

  // Dynamic KPI Stats calculations (Requirement 1 & 6)
  const statsData = useMemo(() => {
    return [
      { label: 'Total Pesanan', value: orders.length, trend: '↑ +12%', isUp: true },
      { label: 'Menunggu', value: orders.filter(o => o.status === 'MENUNGGU').length, trend: 'Perlu Bayar', isUp: false },
      { label: 'Diproses', value: orders.filter(o => o.status === 'DIPROSES' || o.status === 'DIKIRIM').length, trend: 'Siap Kirim', isUp: false },
      { label: 'Selesai', value: orders.filter(o => o.status === 'SELESAI').length, trend: 'Pekan Ini', isUp: true },
      { label: 'Dibatalkan', value: orders.filter(o => o.status === 'DIBATALKAN').length, trend: '↓ -2% Tren', isUp: false }
    ];
  }, [orders]);

  // Utility to parse total prices
  const parsePrice = (priceStr) => {
    return parseInt(priceStr.replace(/[^0-9]/g, ''), 10) || 0;
  };

  // Main Filter Logic (Requirement 3 & 4)
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          order.id.toLowerCase().includes(query) ||
          order.customer.toLowerCase().includes(query) ||
          order.product.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // 2. Status Filter (Includes KPI Quick Filter & Dropdown)
      if (appliedFilters.status !== 'Semua') {
        const s = appliedFilters.status.toUpperCase();
        if (s === 'DIPROSES') {
          // If Status in dropdown is "Diproses", match DIPROSES only.
          // But if it's from the KPI click which sets it to "Diproses", we match DIPROSES & DIKIRIM.
          if (selectedKpiFilter === 'Diproses') {
            if (order.status !== 'DIPROSES' && order.status !== 'DIKIRIM') return false;
          } else {
            if (order.status !== 'DIPROSES') return false;
          }
        } else {
          if (order.status !== s) return false;
        }
      }

      // 3. Date Filter
      if (appliedFilters.tanggal !== 'Semua') {
        const now = new Date();
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        if (appliedFilters.tanggal === 'Hari Ini') {
          const oDate = new Date(order.rawDate);
          const oDay = new Date(oDate.getFullYear(), oDate.getMonth(), oDate.getDate());
          if (oDay.getTime() !== startOfToday.getTime()) return false;
        } else if (appliedFilters.tanggal === 'Minggu Ini') {
          const weekAgo = new Date(now);
          weekAgo.setDate(now.getDate() - 7);
          if (order.rawDate < weekAgo) return false;
        } else if (appliedFilters.tanggal === 'Bulan Ini') {
          const monthAgo = new Date(now);
          monthAgo.setDate(now.getDate() - 30);
          if (order.rawDate < monthAgo) return false;
        } else if (appliedFilters.tanggal === 'Custom') {
          if (appliedFilters.startDate) {
            const start = new Date(appliedFilters.startDate);
            start.setHours(0,0,0,0);
            if (order.rawDate < start) return false;
          }
          if (appliedFilters.endDate) {
            const end = new Date(appliedFilters.endDate);
            end.setHours(23,59,59,999);
            if (order.rawDate > end) return false;
          }
        }
      }

      // 4. Payment Method Filter
      if (appliedFilters.metode !== 'Semua') {
        const m = appliedFilters.metode.toLowerCase();
        const orderMethod = order.method.toLowerCase();
        if (m === 'tunai' && orderMethod !== 'tunai') return false;
        if (m === 'qris' && !orderMethod.includes('qris') && !orderMethod.includes('gopay') && !orderMethod.includes('ovo')) return false;
        if (m === 'transfer bank' && !orderMethod.includes('transfer') && !orderMethod.includes('va') && !orderMethod.includes('mandiri') && !orderMethod.includes('bca')) return false;
        if (m === 'kartu' && !orderMethod.includes('kartu') && !orderMethod.includes('kredit')) return false;
      }

      // 5. City Filter
      if (appliedFilters.kota !== 'Semua') {
        if (!order.location.toLowerCase().includes(appliedFilters.kota.toLowerCase())) return false;
      }

      // 6. Nominal Filter
      if (appliedFilters.nominal !== 'Semua') {
        const val = parsePrice(order.total);
        if (appliedFilters.nominal === '< Rp100.000' && val >= 100000) return false;
        if (appliedFilters.nominal === 'Rp100.000 - Rp500.000' && (val < 100000 || val > 500000)) return false;
        if (appliedFilters.nominal === 'Rp500.000 - Rp1.000.000' && (val < 500000 || val > 1000000)) return false;
        if (appliedFilters.nominal === '> Rp1.000.000' && val <= 1000000) return false;
      }

      return true;
    });
  }, [orders, searchQuery, appliedFilters, selectedKpiFilter]);

  // Reset page when queries change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, appliedFilters, selectedKpiFilter]);

  // Toast notifier
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // KPI Quick Filters click handler (Requirement 1)
  const handleKpiClick = (label) => {
    setSelectedKpiFilter(label);
    let mappedStatus = 'Semua';
    if (label === 'Menunggu') mappedStatus = 'Menunggu';
    else if (label === 'Diproses') mappedStatus = 'Diproses';
    else if (label === 'Selesai') mappedStatus = 'Selesai';
    else if (label === 'Dibatalkan') mappedStatus = 'Dibatalkan';

    const nextFilters = {
      ...appliedFilters,
      status: mappedStatus
    };
    setAppliedFilters(nextFilters);
    setTempFilters(nextFilters);
    showToast(`Menampilkan kategori: ${label}`, 'info');
  };

  // Form Filter Handlers (Requirement 4)
  const handleApplyFilter = () => {
    setAppliedFilters(tempFilters);
    setIsFilterOpen(false);

    // Keep KPI card selection aligned with dropdown status selection
    if (tempFilters.status === 'Semua') setSelectedKpiFilter('Total Pesanan');
    else if (tempFilters.status === 'Menunggu') setSelectedKpiFilter('Menunggu');
    else if (tempFilters.status === 'Diproses' || tempFilters.status === 'Dikirim') setSelectedKpiFilter('Diproses');
    else if (tempFilters.status === 'Selesai') setSelectedKpiFilter('Selesai');
    else if (tempFilters.status === 'Dibatalkan') setSelectedKpiFilter('Dibatalkan');
    else setSelectedKpiFilter(null);

    showToast('Filter berhasil diterapkan!', 'success');
  };

  const handleResetFilter = () => {
    setTempFilters(DEFAULT_FILTERS);
    setAppliedFilters(DEFAULT_FILTERS);
    setSelectedKpiFilter('Total Pesanan');
    setIsFilterOpen(false);
    showToast('Filter berhasil direset!', 'info');
  };

  // CSV Exporter (Requirement 7)
  const handleExportCSV = () => {
    if (filteredOrders.length === 0) {
      showToast('Tidak ada data pesanan untuk diexport!', 'info');
      return;
    }

    const headers = ['ID Pesanan', 'Tanggal', 'Customer', 'Lokasi', 'Produk', 'Jumlah Item', 'Total', 'Metode Pembayaran', 'Status', 'Pembayaran'];
    const rows = filteredOrders.map(o => [
      o.id,
      o.date,
      o.customer,
      o.location,
      o.product,
      o.items,
      o.total,
      o.method,
      o.status,
      o.payment
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.map(val => `"${String(val).replace(/"/g, '""')}"`).join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `SmartKasir_Orders_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showToast("Data pesanan berhasil diexport ke CSV!");
  };

  // Pagination calculation (Requirement 8)
  const totalItems = filteredOrders.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  
  const paginatedOrders = useMemo(() => {
    const startIdx = (currentPage - 1) * pageSize;
    return filteredOrders.slice(startIdx, startIdx + pageSize);
  }, [filteredOrders, currentPage]);

  const pageNumbers = useMemo(() => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) pages.push(i);
    return pages;
  }, [totalPages]);

  // Edit Click Handler (Requirement 6)
  const handleEditClick = (order) => {
    setEditingOrder({ ...order });
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    
    // Auto-update human readable text payment status
    const finalPayment = editingOrder.paymentStatus === 'success' ? 'Dibayar' : 'Pending';

    const updated = {
      ...editingOrder,
      payment: finalPayment
    };

    // Update main dataset
    setOrders(prev => prev.map(o => o.id === updated.id ? updated : o));
    
    // Update active details selection if visible
    if (selectedOrder && selectedOrder.id === updated.id) {
      setSelectedOrder(updated);
    }

    setEditingOrder(null);
    showToast(`Pesanan ${updated.id} berhasil diperbarui!`, 'success');
  };

  return (
    <div className={`orders-container ${selectedOrder ? 'has-sidebar' : ''}`}>
      {/* Toast Alert popup (UX Requirements) */}
      {toast && (
        <div className="order-toast">
          {toast.type === 'success' ? (
            <div className="order-toast-success-icon">✓</div>
          ) : (
            <div className="order-toast-info-icon">i</div>
          )}
          <span className="order-toast-message">{toast.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="orders-header">
        <div className="orders-search-box">
          <SearchIcon />
          <input 
            type="text" 
            className="orders-search-input" 
            placeholder="Cari nomor pesanan, nama customer, atau produk..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="orders-actions">
          <button className="icon-btn-round" onClick={() => showToast('Tidak ada notifikasi baru', 'info')}>
            <BellIcon />
            <div className="notif-dot"></div>
          </button>
          <button className="icon-btn-round" onClick={() => showToast('Menu Admin SmartKasir', 'info')}>
            <UserIcon />
          </button>
        </div>
      </div>

      {/* Stat Cards (Requirement 1) */}
      <div className="stat-cards-row">
        {statsData.map((stat, i) => (
          <div 
            key={i} 
            className={`stat-box ${selectedKpiFilter === stat.label ? 'active' : ''}`}
            onClick={() => handleKpiClick(stat.label)}
          >
            <div className="sc-label">{stat.label}</div>
            <div className="sc-value">{stat.value}</div>
            <div className={`sc-sub ${stat.trend.includes('↑') ? 'sc-trend-up' : stat.trend.includes('↓') ? 'sc-trend-down' : ''}`}>
              {stat.trend}
            </div>
          </div>
        ))}
      </div>

      {/* Main Layout */}
      <div className="orders-layout">
        {/* Left Column (Table) */}
        <div className="orders-main-col">
          {/* Navigation Tab Bawah (Requirement 2) */}
          <div className="orders-tabs">
            <div className="orders-tab active">Semua Pesanan</div>
          </div>

          {/* Filters Bar (Requirement 4) */}
          <div className="orders-filters">
            <button className="filter-btn" onClick={() => setIsFilterOpen(!isFilterOpen)}>
              <FilterIcon /> Filter
            </button>
            
            {/* Show badge if filters are customized */}
            {Object.entries(appliedFilters).some(([k, v]) => k !== 'startDate' && k !== 'endDate' && v !== 'Semua' && v !== 'Semua Kota') && (
              <span className="active-filter-badge" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                Filter Aktif 
                <span onClick={handleResetFilter} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                  <CloseIcon />
                </span>
              </span>
            )}

            {/* Export CSV (Requirement 7) */}
            <button className="filter-btn primary" style={{ marginLeft: 'auto' }} onClick={handleExportCSV}>
              Export CSV
            </button>

            {/* Modern Multilevel Dropdown Filter (Requirement 4) */}
            {isFilterOpen && (
              <div className="filter-dropdown modern-filter">
                <div className="filter-menu-header" style={{ background: 'transparent', padding: '0 0 8px 0', borderBottom: '1px solid #e2e8f0', margin: 0 }}>
                  Filter Kustomisasi
                </div>
                
                <div className="filter-group">
                  <label className="filter-label">Status</label>
                  <select 
                    className="filter-select-input"
                    value={tempFilters.status}
                    onChange={(e) => setTempFilters({ ...tempFilters, status: e.target.value })}
                  >
                    <option value="Semua">Semua Status</option>
                    <option value="Menunggu">Menunggu</option>
                    <option value="Dibayar">Dibayar</option>
                    <option value="Diproses">Diproses</option>
                    <option value="Dikirim">Dikirim</option>
                    <option value="Selesai">Selesai</option>
                    <option value="Dibatalkan">Dibatalkan</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label className="filter-label">Tanggal</label>
                  <select 
                    className="filter-select-input"
                    value={tempFilters.tanggal}
                    onChange={(e) => setTempFilters({ ...tempFilters, tanggal: e.target.value })}
                  >
                    <option value="Semua">Semua Waktu</option>
                    <option value="Hari Ini">Hari Ini</option>
                    <option value="Minggu Ini">Minggu Ini</option>
                    <option value="Bulan Ini">Bulan Ini</option>
                    <option value="Custom">Custom Range</option>
                  </select>
                  
                  {tempFilters.tanggal === 'Custom' && (
                    <div className="filter-date-inputs">
                      <input 
                        type="date" 
                        className="filter-select-input" 
                        value={tempFilters.startDate}
                        onChange={(e) => setTempFilters({ ...tempFilters, startDate: e.target.value })}
                      />
                      <input 
                        type="date" 
                        className="filter-select-input" 
                        value={tempFilters.endDate}
                        onChange={(e) => setTempFilters({ ...tempFilters, endDate: e.target.value })}
                      />
                    </div>
                  )}
                </div>

                <div className="filter-group">
                  <label className="filter-label">Metode Pembayaran</label>
                  <select 
                    className="filter-select-input"
                    value={tempFilters.metode}
                    onChange={(e) => setTempFilters({ ...tempFilters, metode: e.target.value })}
                  >
                    <option value="Semua">Semua Metode</option>
                    <option value="Tunai">Tunai</option>
                    <option value="QRIS">QRIS</option>
                    <option value="Transfer Bank">Transfer Bank</option>
                    <option value="Kartu">Kartu Kredit/Debet</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label className="filter-label">Kota</label>
                  <select 
                    className="filter-select-input"
                    value={tempFilters.kota}
                    onChange={(e) => setTempFilters({ ...tempFilters, kota: e.target.value })}
                  >
                    <option value="Semua">Semua Kota</option>
                    <option value="Jakarta">Jakarta</option>
                    <option value="Bekasi">Bekasi</option>
                    <option value="Surabaya">Surabaya</option>
                    <option value="Bandung">Bandung</option>
                    <option value="Yogyakarta">Yogyakarta</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label className="filter-label">Nominal</label>
                  <select 
                    className="filter-select-input"
                    value={tempFilters.nominal}
                    onChange={(e) => setTempFilters({ ...tempFilters, nominal: e.target.value })}
                  >
                    <option value="Semua">Semua Nominal</option>
                    <option value="< Rp100.000">&lt; Rp100.000</option>
                    <option value="Rp100.000 - Rp500.000">Rp100.000 - Rp500.000</option>
                    <option value="Rp500.000 - Rp1.000.000">Rp500.000 - Rp1.000.000</option>
                    <option value="> Rp1.000.000">&gt; Rp1.000.000</option>
                  </select>
                </div>

                <div className="filter-action-row">
                  <button type="button" className="btn-filter-reset" onClick={handleResetFilter}>Reset</button>
                  <button type="button" className="btn-filter-apply" onClick={handleApplyFilter}>Terapkan</button>
                </div>
              </div>
            )}
          </div>

          <div className="orders-table-wrapper">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>ID Pesanan</th>
                  <th>Customer</th>
                  <th>Produk</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Pembayaran</th>
                  <th style={{ textAlign: 'right' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {paginatedOrders.map((order) => (
                  <tr key={order.id} className={selectedOrder?.id === order.id ? 'active-row' : ''}>
                    <td>
                      <div className="order-id">{order.id}</div>
                      <div className="order-date">{order.date}</div>
                    </td>
                    <td>
                      <div className="cust-name">{order.customer}</div>
                      <div className="cust-loc">{order.location}</div>
                    </td>
                    <td>
                      <div className="prod-name">{order.product}</div>
                      <div className="prod-count">{order.items}</div>
                    </td>
                    <td>
                      <div className="total-price">{order.total}</div>
                      <div className="total-method">{order.method}</div>
                    </td>
                    <td>
                      <span className={getStatusBadgeClass(order.status)}>{order.status}</span>
                    </td>
                    <td>
                      <div className={`pay-status ${order.paymentStatus}`}>
                        {order.paymentStatus === 'success' ? <CheckCircleIcon /> : <ClockIcon />}
                        {order.payment}
                      </div>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-action view" onClick={() => { setSelectedOrder(order); setViewingOrder(order); }} title="Lihat detail">
                          <EyeIcon />
                        </button>
                        <button className="btn-action edit" onClick={() => handleEditClick(order)} title="Edit Pesanan">
                          <EditIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {paginatedOrders.length === 0 && (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', padding: '48px 24px', color: '#64748b', fontSize: '14px', background: '#f8fafc' }}>
                      Tidak ada pesanan yang sesuai pencarian atau filter kustomisasi.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls (Requirement 8) */}
          <div className="orders-pagination">
            <div>
              Menampilkan {paginatedOrders.length} dari {filteredOrders.length} pesanan 
              {Object.entries(appliedFilters).some(([k, v]) => k !== 'startDate' && k !== 'endDate' && v !== 'Semua' && v !== 'Semua Kota') ? ' (Filter Aktif)' : ''}
            </div>
            <div className="pagination-controls">
              <button 
                type="button"
                className="page-btn"
                style={{ background: 'transparent', display: 'flex', alignItems: 'center' }}
                disabled={currentPage === 1}
                onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
              >
                <ChevronLeftIcon className={`page-arrow ${currentPage === 1 ? 'disabled' : ''}`} />
              </button>
              
              {pageNumbers.map(page => (
                <button 
                  key={page} 
                  className={`page-btn ${currentPage === page ? 'active' : ''}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}

              <button 
                type="button"
                className="page-btn"
                style={{ background: 'transparent', display: 'flex', alignItems: 'center' }}
                disabled={currentPage === totalPages}
                onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
              >
                <ChevronRightIcon className={`page-arrow ${currentPage === totalPages ? 'disabled' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (Details) - Conditionally Rendered */}
        {selectedOrder && (
          <div className="orders-side-col">
            {/* Detail Pengiriman */}
            <div className="side-card">
              <div className="sc-header">
                <div>
                  <div className="sc-title">Detail Pengiriman {selectedOrder.id}</div>
                  <div className="sc-subtitle">Order dibuat pada {selectedOrder.date}</div>
                </div>
                <button className="btn-close-panel" onClick={() => setSelectedOrder(null)}>
                  <CloseIcon />
                </button>
              </div>

              <div className="delivery-address">
                <div className="addr-title">Alamat Penerima</div>
                <div className="addr-name">{selectedOrder.customer}</div>
                <div className="addr-text">
                  Jl. Sudirman No. 45, Apartemen City View<br/>
                  Tower A Lantai 12 Unit 1205<br/>
                  {selectedOrder.location}<br/>
                  DKI Jakarta, 12190
                </div>
                <div className="addr-phone">
                  <PhoneIcon /> +62 812-3456-7890
                </div>
              </div>

              <div className="logistics-box">
                <div className="addr-title">Logistik</div>
                <div className="logistics-row">
                  <span className="l-label">Kurir</span>
                  <span className="l-value blue">J&T Express</span>
                </div>
                <div className="logistics-row">
                  <span className="l-label">Biaya</span>
                  <span className="l-value blue">Rp 18.000</span>
                </div>
                <div className="logistics-row">
                  <span className="l-label">Estimasi</span>
                  <span className="l-value blue">16 - 17 Jan 2024</span>
                </div>
                <button className="btn-invoice" onClick={() => setViewingOrder(selectedOrder)}><ReceiptIcon /> Lihat Invoice</button>
              </div>
            </div>

            {/* Timeline Pesanan */}
            <div className="side-card">
              <div className="addr-title" style={{ marginBottom: '16px' }}>Timeline Pesanan</div>
              <div className="timeline">
                <div className="tl-item">
                  <div className="tl-icon"><CheckIcon /></div>
                  <div className="tl-content">
                    <div className="tl-title">Pembayaran {selectedOrder.paymentStatus === 'success' ? 'Terverifikasi' : 'Pending'}</div>
                    <div className="tl-date">{selectedOrder.date}</div>
                  </div>
                </div>
                <div className="tl-item">
                  <div className="tl-icon"><CheckIcon /></div>
                  <div className="tl-content">
                    <div className="tl-title">Dikonfirmasi Admin</div>
                    <div className="tl-date">{selectedOrder.date}</div>
                  </div>
                </div>
                <div className="tl-item">
                  <div className="tl-icon light"><CheckIcon /></div>
                  <div className="tl-content">
                    <div className="tl-title" style={{ color: '#4a589f' }}>Pesanan Dibuat</div>
                    <div className="tl-date">{selectedOrder.date}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ringkasan Omzet */}
            <div className="side-card dark">
              <div className="omzet-label">Ringkasan Omzet</div>
              <div className="omzet-sub">Total pesanan ini</div>
              <div className="omzet-val">{selectedOrder.total}</div>
              <button className="btn-report" onClick={() => showToast('Laporan rinci omzet terbuka', 'info')}>Detail Laporan</button>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================
          ORDERS POPUP DIALOG MODALS SECTION
          ======================================================== */}

      {/* 1. Modal Detail Pesanan (Requirement 5) */}
      {viewingOrder && (
        <div className="order-modal-overlay" onClick={() => setViewingOrder(null)}>
          <div className="order-modal-card" style={{ width: '600px' }} onClick={(e) => e.stopPropagation()}>
            <div className="order-modal-header">
              <h2 className="order-modal-title">Detail Informasi Pesanan</h2>
              <button className="order-modal-close-btn" onClick={() => setViewingOrder(null)}>×</button>
            </div>

            <div className="order-detail-grid">
              {/* Status & Pembayaran */}
              <div className="detail-section">
                <div className="detail-section-title">Status & Pembayaran</div>
                <div className="detail-row">
                  <span className="detail-label">ID Pesanan</span>
                  <span className="detail-value">{viewingOrder.id}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Tanggal Pesanan</span>
                  <span className="detail-value">{viewingOrder.date}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Status Pesanan</span>
                  <span className={getStatusBadgeClass(viewingOrder.status)}>{viewingOrder.status}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Status Pembayaran</span>
                  <span className={`detail-value ${viewingOrder.paymentStatus}`}>{viewingOrder.payment}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Metode Pembayaran</span>
                  <span className="detail-value">{viewingOrder.method}</span>
                </div>
              </div>

              {/* Customer & Pengiriman */}
              <div className="detail-section">
                <div className="detail-section-title">Customer & Pengiriman</div>
                <div className="detail-row">
                  <span className="detail-label">Nama Penerima</span>
                  <span className="detail-value">{viewingOrder.customer}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Alamat Penerima</span>
                  <span className="detail-value" style={{ textAlign: 'right', fontWeight: '500' }}>
                    Jl. Sudirman No. 45, Apartemen City View<br/>
                    Tower A Lantai 12 Unit 1205<br/>
                    {viewingOrder.location}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">No. Telepon</span>
                  <span className="detail-value">+62 812-3456-7890</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Catatan Pesanan</span>
                  <span className="detail-value" style={{ fontStyle: 'italic', color: '#64748b' }}>
                    {viewingOrder.notes || '-'}
                  </span>
                </div>
              </div>

              {/* Rincian Produk */}
              <div className="detail-section">
                <div className="detail-section-title">Produk Yang Dipesan</div>
                <div className="detail-products-list">
                  {viewingOrder.productsList ? viewingOrder.productsList.map((p, index) => (
                    <div key={index} className="detail-prod-item">
                      <div>
                        <div style={{ fontWeight: '600', color: '#0f172a' }}>{p.name}</div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>{p.qty} x Rp {p.price.toLocaleString('id-ID')}</div>
                      </div>
                      <div style={{ fontWeight: '700', color: '#0f172a' }}>
                        Rp {(p.qty * p.price).toLocaleString('id-ID')}
                      </div>
                    </div>
                  )) : (
                    <div className="detail-prod-item">
                      <div>
                        <div style={{ fontWeight: '600', color: '#0f172a' }}>{viewingOrder.product}</div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>{viewingOrder.items}</div>
                      </div>
                      <div style={{ fontWeight: '700', color: '#0f172a' }}>{viewingOrder.total}</div>
                    </div>
                  )}
                  <div className="detail-row" style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #e2e8f0', fontWeight: 'bold' }}>
                    <span>Total Akhir</span>
                    <span style={{ fontSize: '16px', color: '#2563eb' }}>{viewingOrder.total}</span>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="detail-section">
                <div className="detail-section-title">Timeline Pesanan</div>
                <div className="modal-timeline">
                  <div className="modal-tl-item">
                    <div className={`modal-tl-icon ${viewingOrder.paymentStatus === 'success' ? 'completed' : 'pending'}`}>
                      {viewingOrder.paymentStatus === 'success' ? '✓' : '•'}
                    </div>
                    <div className="modal-tl-content">
                      <div className="modal-tl-title">Pembayaran {viewingOrder.paymentStatus === 'success' ? 'Terverifikasi' : 'Menunggu Pembayaran'}</div>
                      <div className="modal-tl-time">{viewingOrder.date}</div>
                    </div>
                  </div>
                  <div className="modal-tl-item">
                    <div className={`modal-tl-icon ${['DIPROSES', 'DIKIRIM', 'SELESAI'].includes(viewingOrder.status) ? 'completed' : 'pending'}`}>
                      {['DIPROSES', 'DIKIRIM', 'SELESAI'].includes(viewingOrder.status) ? '✓' : '•'}
                    </div>
                    <div className="modal-tl-content">
                      <div className="modal-tl-title">Dikonfirmasi Admin &amp; Diproses</div>
                      <div className="modal-tl-time">{viewingOrder.date}</div>
                    </div>
                  </div>
                  <div className="modal-tl-item">
                    <div className={`modal-tl-icon ${viewingOrder.status === 'SELESAI' ? 'completed' : 'pending'}`}>
                      {viewingOrder.status === 'SELESAI' ? '✓' : '•'}
                    </div>
                    <div className="modal-tl-content">
                      <div className="modal-tl-title">Pesanan Selesai Diterima</div>
                      <div className="modal-tl-time">{viewingOrder.status === 'SELESAI' ? viewingOrder.date : 'Belum selesai'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-modal-footer">
              <button type="button" className="btn-order-cancel" onClick={() => setViewingOrder(null)}>Tutup</button>
              <button 
                type="button" 
                className="btn-order-submit" 
                onClick={() => {
                  setViewingOrder(null);
                  handleEditClick(viewingOrder);
                }}
              >
                Edit Pesanan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Modal Edit Pesanan (Requirement 6) */}
      {editingOrder && (
        <div className="order-modal-overlay" onClick={() => setEditingOrder(null)}>
          <div className="order-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="order-modal-header">
              <h2 className="order-modal-title">Edit Informasi Pesanan ({editingOrder.id})</h2>
              <button className="order-modal-close-btn" onClick={() => setEditingOrder(null)}>×</button>
            </div>

            <form onSubmit={handleSaveEdit}>
              <div className="order-form-grid">
                <div className="order-form-group full-width">
                  <label className="order-form-label">Nama Customer</label>
                  <input 
                    type="text" 
                    className="order-form-input" 
                    value={editingOrder.customer}
                    disabled
                    style={{ background: '#f1f5f9', cursor: 'not-allowed' }}
                  />
                </div>

                <div className="order-form-group">
                  <label className="order-form-label">Status Pesanan</label>
                  <select 
                    className="order-form-select"
                    value={editingOrder.status}
                    onChange={(e) => setEditingOrder({ ...editingOrder, status: e.target.value })}
                  >
                    <option value="MENUNGGU">MENUNGGU</option>
                    <option value="DIBAYAR">DIBAYAR</option>
                    <option value="DIPROSES">DIPROSES</option>
                    <option value="DIKIRIM">DIKIRIM</option>
                    <option value="SELESAI">SELESAI</option>
                    <option value="DIBATALKAN">DIBATALKAN</option>
                  </select>
                </div>

                <div className="order-form-group">
                  <label className="order-form-label">Status Pembayaran</label>
                  <select 
                    className="order-form-select"
                    value={editingOrder.paymentStatus}
                    onChange={(e) => {
                      const isPaid = e.target.value === 'success';
                      setEditingOrder({ 
                        ...editingOrder, 
                        paymentStatus: e.target.value,
                        payment: isPaid ? 'Dibayar' : 'Pending'
                      });
                    }}
                  >
                    <option value="pending">Pending</option>
                    <option value="success">Dibayar</option>
                  </select>
                </div>

                <div className="order-form-group full-width">
                  <label className="order-form-label">Metode Pembayaran</label>
                  <select 
                    className="order-form-select"
                    value={editingOrder.method}
                    onChange={(e) => setEditingOrder({ ...editingOrder, method: e.target.value })}
                  >
                    <option value="Tunai">Tunai</option>
                    <option value="QRIS">QRIS</option>
                    <option value="Transfer BCA">Transfer BCA</option>
                    <option value="Transfer Mandiri">Transfer Mandiri</option>
                    <option value="QRIS (GoPay)">QRIS (GoPay)</option>
                    <option value="QRIS (OVO)">QRIS (OVO)</option>
                    <option value="Kartu Kredit">Kartu Kredit</option>
                  </select>
                </div>

                <div className="order-form-group full-width">
                  <label className="order-form-label">Catatan Pesanan</label>
                  <textarea 
                    className="order-form-textarea"
                    value={editingOrder.notes || ''}
                    onChange={(e) => setEditingOrder({ ...editingOrder, notes: e.target.value })}
                    placeholder="Tambahkan catatan khusus pengiriman..."
                  ></textarea>
                </div>
              </div>

              <div className="order-modal-footer">
                <button type="button" className="btn-order-cancel" onClick={() => setEditingOrder(null)}>Batal</button>
                <button type="submit" className="btn-order-submit">Simpan Perubahan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Icons
function SearchIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>; }
function BellIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>; }
function UserIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>; }
function FilterIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>; }
function ChevronLeftIcon({ className, onClick }) { return <svg width="16" height="16" className={className} onClick={onClick} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>; }
function ChevronRightIcon({ className, onClick }) { return <svg width="16" height="16" className={className} onClick={onClick} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>; }
function PhoneIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>; }
function ReceiptIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>; }
function CheckIcon() { return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>; }
function CheckCircleIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>; }
function ClockIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>; }
function EyeIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>; }
function EditIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>; }
function CloseIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>; }
