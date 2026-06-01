"use client";
import React, { useState, useEffect, useMemo } from 'react';
import '../../../styles/transactions.css';

const today = new Date();
const d = (offset, h = 10, m = 0) => {
  const dt = new Date(today);
  dt.setDate(dt.getDate() - offset);
  dt.setHours(h, m, 0, 0);
  return dt;
};

const fmtDate = (dt) => {
  return dt.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const INITIAL_TRANSACTIONS = [
  { 
    id: '#TRX-98241', 
    orderId: 'ORD-2241', 
    customer: 'Budi Santoso', 
    email: 'budi@email.com', 
    tipe: 'online', 
    metode: 'Virtual Account', 
    total: 'Rp 1.250.000', 
    totalNum: 1250000, 
    status: 'berhasil', 
    rawDate: d(0, 14, 20), // Hari ini
    tier: 'Gold Member', 
    points: '+471 Pts', 
    items: [
      { name: 'Nike Air Max Red', sku: 'SHO-061-R0', qty: 1, price: 'Rp 1.100.000', total: 'Rp 1.100.000' }, 
      { name: 'Kaos Kaki Olahraga', sku: 'ACC-011-WH', qty: 2, price: 'Rp 75.000', total: 'Rp 150.000' }
    ], 
    subtotal: 'Rp 1.250.000', 
    tax: 'Rp 137.500' 
  },
  { 
    id: '#TRX-98240', 
    orderId: '-', 
    customer: 'Ani Wijaya', 
    email: 'ani.wijaya@email.com', 
    tipe: 'offline', 
    metode: 'Tunai', 
    total: 'Rp 425.000', 
    totalNum: 425000, 
    status: 'berhasil', 
    rawDate: d(0, 13, 45), // Hari ini
    tier: 'Gold Member', 
    points: '+120 Pts', 
    items: [
      { name: 'T-Shirt Cotton Basic', sku: 'TS-001-BK', qty: 1, price: 'Rp 350.000', total: 'Rp 350.000' }, 
      { name: 'Watch Minimalist Silver', sku: 'ACC-022-SV', qty: 1, price: 'Rp 75.000', total: 'Rp 75.000' }
    ], 
    subtotal: 'Rp 425.000', 
    tax: 'Rp 46.750' 
  },
  { 
    id: '#TRX-98239', 
    orderId: 'ORD-2238', 
    customer: 'Citra Lestari', 
    email: 'citra@email.com', 
    tipe: 'online', 
    metode: 'OVO', 
    total: 'Rp 89.000', 
    totalNum: 89000, 
    status: 'refund', 
    rawDate: d(0, 12, 10), // Hari ini
    tier: 'Silver Member', 
    points: '-89 Pts', 
    items: [
      { name: 'Phone Case Premium', sku: 'ACC-033-BK', qty: 1, price: 'Rp 89.000', total: 'Rp 89.000' }
    ], 
    subtotal: 'Rp 89.000', 
    tax: 'Rp 9.790' 
  },
  { 
    id: '#TRX-98237', 
    orderId: '-', 
    customer: 'Doni Firmansyah', 
    email: 'doni@email.com', 
    tipe: 'offline', 
    metode: 'GoPay', 
    total: 'Rp 780.000', 
    totalNum: 780000, 
    status: 'berhasil', 
    rawDate: d(1, 10, 0), // Kemarin (7 Hari Terakhir)
    tier: 'Bronze Member', 
    points: '+156 Pts', 
    items: [
      { name: 'Sepatu Casual Pria', sku: 'SHO-077-BK', qty: 1, price: 'Rp 780.000', total: 'Rp 780.000' }
    ], 
    subtotal: 'Rp 780.000', 
    tax: 'Rp 85.800' 
  },
  { 
    id: '#TRX-98235', 
    orderId: 'ORD-2235', 
    customer: 'Rina Pratiwi', 
    email: 'rina@email.com', 
    tipe: 'online', 
    metode: 'Transfer Bank', 
    total: 'Rp 2.100.000', 
    totalNum: 2100000, 
    status: 'pending', 
    rawDate: d(2, 9, 30), // 2 hari lalu (7 Hari Terakhir)
    tier: 'Gold Member', 
    points: 'Pending', 
    items: [
      { name: 'Smartwatch Series 6', sku: 'ELC-055-BL', qty: 1, price: 'Rp 2.100.000', total: 'Rp 2.100.000' }
    ], 
    subtotal: 'Rp 2.100.000', 
    tax: 'Rp 231.000' 
  },
  { 
    id: '#TRX-98230', 
    orderId: 'ORD-2230', 
    customer: 'Fajar Nugraha', 
    email: 'fajar@email.com', 
    tipe: 'online', 
    metode: 'Transfer Bank', 
    total: 'Rp 450.000', 
    totalNum: 450000, 
    status: 'berhasil', 
    rawDate: d(3, 15, 20), // 3 hari lalu (7 Hari Terakhir)
    tier: 'Bronze Member', 
    points: '+90 Pts', 
    items: [
      { name: 'Tas Ransel Laptop', sku: 'BAG-022-GR', qty: 1, price: 'Rp 450.000', total: 'Rp 450.000' }
    ], 
    subtotal: 'Rp 450.000', 
    tax: 'Rp 49.500' 
  },
  { 
    id: '#TRX-98229', 
    orderId: '-', 
    customer: 'Gita Saraswati', 
    email: 'gita@email.com', 
    tipe: 'offline', 
    metode: 'QRIS', 
    total: 'Rp 120.000', 
    totalNum: 120000, 
    status: 'berhasil', 
    rawDate: d(4, 11, 45), // 4 hari lalu (7 Hari Terakhir)
    tier: 'Silver Member', 
    points: '+24 Pts', 
    items: [
      { name: 'Tumbler Stainless', sku: 'ACC-044-SL', qty: 1, price: 'Rp 120.000', total: 'Rp 120.000' }
    ], 
    subtotal: 'Rp 120.000', 
    tax: 'Rp 13.200' 
  },
  { 
    id: '#TRX-98225', 
    orderId: 'ORD-2225', 
    customer: 'Hadi Prasetyo', 
    email: 'hadi@email.com', 
    tipe: 'online', 
    metode: 'Kartu', 
    total: 'Rp 1.850.000', 
    totalNum: 1850000, 
    status: 'berhasil', 
    rawDate: d(6, 17, 10), // 6 hari lalu (7 Hari Terakhir)
    tier: 'Gold Member', 
    points: '+370 Pts', 
    items: [
      { name: 'Gaming Keyboard RGB', sku: 'ELC-088-RG', qty: 1, price: 'Rp 850.000', total: 'Rp 850.000' },
      { name: 'Gaming Mouse Wireless', sku: 'ELC-099-WL', qty: 1, price: 'Rp 1.000.000', total: 'Rp 1.000.000' }
    ], 
    subtotal: 'Rp 1.850.000', 
    tax: 'Rp 203.500' 
  },
  { 
    id: '#TRX-98220', 
    orderId: 'ORD-2220', 
    customer: 'Indah Cahyani', 
    email: 'indah@email.com', 
    tipe: 'online', 
    metode: 'OVO', 
    total: 'Rp 75.000', 
    totalNum: 75000, 
    status: 'berhasil', 
    rawDate: d(8, 14, 0), // 8 hari lalu (30 Hari Terakhir)
    tier: 'Bronze Member', 
    points: '+15 Pts', 
    items: [
      { name: 'Lip Balm Scented', sku: 'COS-011-LB', qty: 3, price: 'Rp 25.000', total: 'Rp 75.000' }
    ], 
    subtotal: 'Rp 75.000', 
    tax: 'Rp 8.250' 
  },
  { 
    id: '#TRX-98218', 
    orderId: '-', 
    customer: 'Joko Widodo', 
    email: 'joko@email.com', 
    tipe: 'offline', 
    metode: 'Tunai', 
    total: 'Rp 65.000', 
    totalNum: 65000, 
    status: 'berhasil', 
    rawDate: d(12, 10, 30), // 12 hari lalu (30 Hari Terakhir)
    tier: 'Bronze Member', 
    points: '+13 Pts', 
    items: [
      { name: 'Payung Lipat Mini', sku: 'ACC-055-MN', qty: 1, price: 'Rp 65.000', total: 'Rp 65.000' }
    ], 
    subtotal: 'Rp 65.000', 
    tax: 'Rp 7.150' 
  },
  { 
    id: '#TRX-98215', 
    orderId: 'ORD-2215', 
    customer: 'Kartika Sari', 
    email: 'kartika@email.com', 
    tipe: 'online', 
    metode: 'Virtual Account', 
    total: 'Rp 980.000', 
    totalNum: 980000, 
    status: 'refund', 
    rawDate: d(15, 16, 15), // 15 hari lalu (30 Hari Terakhir)
    tier: 'Silver Member', 
    points: '-980 Pts', 
    items: [
      { name: 'Blender Juicer Portable', sku: 'ELC-101-PL', qty: 2, price: 'Rp 490.000', total: 'Rp 980.000' }
    ], 
    subtotal: 'Rp 980.000', 
    tax: 'Rp 107.800' 
  },
  { 
    id: '#TRX-98210', 
    orderId: 'ORD-2210', 
    customer: 'Lukman Hakim', 
    email: 'lukman@email.com', 
    tipe: 'online', 
    metode: 'Transfer Bank', 
    total: 'Rp 1.350.000', 
    totalNum: 1350000, 
    status: 'berhasil', 
    rawDate: d(20, 11, 0), // 20 hari lalu (30 Hari Terakhir)
    tier: 'Gold Member', 
    points: '+270 Pts', 
    items: [
      { name: 'Premium Leather Shoes', sku: 'SHO-088-BR', qty: 1, price: 'Rp 1.350.000', total: 'Rp 1.350.000' }
    ], 
    subtotal: 'Rp 1.350.000', 
    tax: 'Rp 148.500' 
  },
  { 
    id: '#TRX-98205', 
    orderId: '-', 
    customer: 'Mega Utami', 
    email: 'mega@email.com', 
    tipe: 'offline', 
    metode: 'Kartu', 
    total: 'Rp 550.000', 
    totalNum: 550000, 
    status: 'pending', 
    rawDate: d(25, 13, 0), // 25 hari lalu (30 Hari Terakhir)
    tier: 'Silver Member', 
    points: 'Pending', 
    items: [
      { name: 'Blazer Velvet Red', sku: 'FA-022-RD', qty: 1, price: 'Rp 550.000', total: 'Rp 550.000' }
    ], 
    subtotal: 'Rp 550.000', 
    tax: 'Rp 60.500' 
  },
  { 
    id: '#TRX-98200', 
    orderId: 'ORD-2200', 
    customer: 'Novianti Lestari', 
    email: 'novi@email.com', 
    tipe: 'online', 
    metode: 'GoPay', 
    total: 'Rp 150.000', 
    totalNum: 150000, 
    status: 'berhasil', 
    rawDate: d(35, 14, 20), // 35 hari lalu (Bulan lalu)
    tier: 'Bronze Member', 
    points: '+30 Pts', 
    items: [
      { name: 'Canvas Tote Bag Large', sku: 'BAG-033-CV', qty: 2, price: 'Rp 75.000', total: 'Rp 150.000' }
    ], 
    subtotal: 'Rp 150.000', 
    tax: 'Rp 16.500' 
  },
  { 
    id: '#TRX-98195', 
    orderId: 'ORD-2195', 
    customer: 'Oki Setiawan', 
    email: 'oki@email.com', 
    tipe: 'online', 
    metode: 'Transfer Bank', 
    total: 'Rp 2.700.000', 
    totalNum: 2700000, 
    status: 'berhasil', 
    rawDate: d(45, 15, 45), // 45 hari lalu (Bulan lalu)
    tier: 'Gold Member', 
    points: '+540 Pts', 
    items: [
      { name: 'Air Purifier HEPA Filter', sku: 'ELC-122-HP', qty: 1, price: 'Rp 2.700.000', total: 'Rp 2.700.000' }
    ], 
    subtotal: 'Rp 2.700.000', 
    tax: 'Rp 297.000' 
  }
];

const DEFAULT_FILTERS = {
  status: 'Semua',
  tanggal: 'Semua', // Semua, Hari Ini, 7 Hari Terakhir, 30 Hari Terakhir, Bulan Ini, Custom
  startDate: '',
  endDate: '',
  metode: 'Semua',
  tipe: 'Semua',
  nominal: 'Semua'
};

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [selectedTrx, setSelectedTrx] = useState(null);
  
  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [tempFilters, setTempFilters] = useState(DEFAULT_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState(DEFAULT_FILTERS);
  const [selectedKpiFilter, setSelectedKpiFilter] = useState('Total Transaksi');

  // Modals & Notifications
  const [viewingTrx, setViewingTrx] = useState(null);
  const [receiptTrx, setReceiptTrx] = useState(null);
  const [refundingTrx, setRefundingTrx] = useState(null);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Sync sidebar state
  useEffect(() => {
    const shouldCollapse = selectedTrx !== null;
    window.dispatchEvent(new CustomEvent('set-sidebar-collapse', { detail: shouldCollapse }));
    
    return () => {
      window.dispatchEvent(new CustomEvent('set-sidebar-collapse', { detail: false }));
    };
  }, [selectedTrx]);

  // Loading Simulation for high-end SaaS UX (Requirement 13)
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [searchQuery, appliedFilters, selectedKpiFilter]);

  // Reset page when filtering or searching
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, appliedFilters, selectedKpiFilter]);

  // Toast notifier
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Base filtering applied to populate cards dynamically (Requirement 12)
  const filteredBase = useMemo(() => {
    return transactions.filter(t => {
      // 1. Search Query (ID, OrderId, Customer)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchSearch = 
          t.id.toLowerCase().includes(q) ||
          t.orderId.toLowerCase().includes(q) ||
          t.customer.toLowerCase().includes(q);
        if (!matchSearch) return false;
      }

      // 2. Status Dropdown Filter
      if (appliedFilters.status !== 'Semua') {
        if (t.status !== appliedFilters.status.toLowerCase()) return false;
      }

      // 3. Tipe Transaksi Filter
      if (appliedFilters.tipe !== 'Semua') {
        if (t.tipe !== appliedFilters.tipe.toLowerCase()) return false;
      }

      // 4. Metode Pembayaran Filter
      if (appliedFilters.metode !== 'Semua') {
        const m = appliedFilters.metode.toLowerCase();
        const trxMethod = t.metode.toLowerCase();
        if (m === 'tunai' && trxMethod !== 'tunai') return false;
        if (m === 'qris' && !trxMethod.includes('qris')) return false;
        if (m === 'transfer bank' && !trxMethod.includes('transfer')) return false;
        if (m === 'virtual account' && !trxMethod.includes('va') && !trxMethod.includes('virtual')) return false;
        if (m === 'kartu' && !trxMethod.includes('kartu') && !trxMethod.includes('kredit')) return false;
        if (m === 'ovo' && !trxMethod.includes('ovo')) return false;
        if (m === 'gopay' && !trxMethod.includes('gopay')) return false;
      }

      // 5. Nominal Filter
      if (appliedFilters.nominal !== 'Semua') {
        const val = t.totalNum;
        if (appliedFilters.nominal === '< Rp100.000' && val >= 100000) return false;
        if (appliedFilters.nominal === 'Rp100.000 - Rp500.000' && (val < 100000 || val > 500000)) return false;
        if (appliedFilters.nominal === 'Rp500.000 - Rp1.000.000' && (val < 500000 || val > 1000000)) return false;
        if (appliedFilters.nominal === '> Rp1.000.000' && val <= 1000000) return false;
      }

      // 6. Date Filter
      if (appliedFilters.tanggal !== 'Semua') {
        const now = new Date();
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        if (appliedFilters.tanggal === 'Hari Ini') {
          const tDate = new Date(t.rawDate);
          const tDay = new Date(tDate.getFullYear(), tDate.getMonth(), tDate.getDate());
          if (tDay.getTime() !== startOfToday.getTime()) return false;
        } else if (appliedFilters.tanggal === '7 Hari Terakhir') {
          const weekAgo = new Date(now);
          weekAgo.setDate(now.getDate() - 7);
          if (t.rawDate < weekAgo) return false;
        } else if (appliedFilters.tanggal === '30 Hari Terakhir') {
          const monthAgo = new Date(now);
          monthAgo.setDate(now.getDate() - 30);
          if (t.rawDate < monthAgo) return false;
        } else if (appliedFilters.tanggal === 'Bulan Ini') {
          const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
          if (t.rawDate < monthStart) return false;
        } else if (appliedFilters.tanggal === 'Custom') {
          if (appliedFilters.startDate) {
            const start = new Date(appliedFilters.startDate);
            start.setHours(0,0,0,0);
            if (t.rawDate < start) return false;
          }
          if (appliedFilters.endDate) {
            const end = new Date(appliedFilters.endDate);
            end.setHours(23,59,59,999);
            if (t.rawDate > end) return false;
          }
        }
      }

      return true;
    });
  }, [transactions, searchQuery, appliedFilters]);

  // Dynamic calculations for KPI Stats (Requirement 2, 12)
  const statsData = useMemo(() => {
    const totalRev = filteredBase.filter(t => t.status === 'berhasil').reduce((sum, t) => sum + t.totalNum, 0);
    return [
      { label: 'Total Transaksi', value: filteredBase.length, icon: <BarIcon />, iconClass: 'blue' },
      { label: 'Online', value: filteredBase.filter(t => t.tipe === 'online').length, icon: <GlobeIcon />, iconClass: 'indigo' },
      { label: 'Offline', value: filteredBase.filter(t => t.tipe === 'offline').length, icon: <ShopIcon />, iconClass: 'slate' },
      { label: 'Pendapatan', value: `Rp ${totalRev.toLocaleString('id-ID')}`, icon: <MoneyIcon />, iconClass: 'green' },
      { label: 'Refund', value: filteredBase.filter(t => t.status === 'refund').length, icon: <RefundIcon />, iconClass: 'red' }
    ];
  }, [filteredBase]);

  // Final filtered list showing in the main table grid
  const filteredTransactions = useMemo(() => {
    return filteredBase.filter(t => {
      if (selectedKpiFilter === 'Online' && t.tipe !== 'online') return false;
      if (selectedKpiFilter === 'Offline' && t.tipe !== 'offline') return false;
      if (selectedKpiFilter === 'Refund' && t.status !== 'refund') return false;
      if (selectedKpiFilter === 'Pendapatan' && t.status !== 'berhasil') return false;
      return true;
    });
  }, [filteredBase, selectedKpiFilter]);

  // KPI Quick filter click handler
  const handleKpiClick = (label) => {
    setSelectedKpiFilter(label);
    showToast(`KPI Saringan: ${label} diaktifkan`, 'info');
  };

  // Dropdown filter handlers
  const handleApplyFilter = () => {
    setAppliedFilters(tempFilters);
    setIsFilterOpen(false);
    showToast('Filter kustomisasi berhasil diterapkan!', 'success');
  };

  const handleResetFilter = () => {
    setTempFilters(DEFAULT_FILTERS);
    setAppliedFilters(DEFAULT_FILTERS);
    setSelectedKpiFilter('Total Transaksi');
    setIsFilterOpen(false);
    showToast('Semua filter berhasil direset!', 'info');
  };

  // CSV Exporter (Requirement 10)
  const handleExportCSV = () => {
    if (filteredTransactions.length === 0) {
      showToast('Tidak ada data transaksi untuk diexport!', 'info');
      return;
    }

    const headers = ['ID Transaksi', 'ID Pesanan', 'Customer', 'Email', 'Tipe', 'Metode', 'Total', 'Status', 'Tanggal'];
    const rows = filteredTransactions.map(t => [
      t.id,
      t.orderId,
      t.customer,
      t.email,
      t.tipe,
      t.metode,
      t.total,
      t.status,
      fmtDate(t.rawDate)
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.map(val => `"${String(val).replace(/"/g, '""')}"`).join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `SmartKasir_Transactions_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showToast("Riwayat transaksi berhasil diexport ke CSV!");
  };

  // Pagination calculation (Requirement 11)
  const totalItems = filteredTransactions.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;

  const paginatedTransactions = useMemo(() => {
    const startIdx = (currentPage - 1) * pageSize;
    return filteredTransactions.slice(startIdx, startIdx + pageSize);
  }, [filteredTransactions, currentPage]);

  const pageNumbers = useMemo(() => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) pages.push(i);
    return pages;
  }, [totalPages]);

  // Refund execution handler (Requirement 9)
  const handleExecuteRefund = () => {
    if (!refundingTrx) return;

    const trxId = refundingTrx.id;
    setTransactions(prev => prev.map(t => {
      if (t.id === trxId) {
        return {
          ...t,
          status: 'refund',
          points: '- Poin Dipotong'
        };
      }
      return t;
    }));

    // Update open selection if it is the refund target
    if (selectedTrx && selectedTrx.id === trxId) {
      setSelectedTrx(prev => ({
        ...prev,
        status: 'refund'
      }));
    }

    showToast(`Refund berhasil! Transaksi ${trxId} telah diperbarui.`, 'success');
    setRefundingTrx(null);
  };

  return (
    <div className="trx-container">
      {/* Toast Alert popups */}
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

      {/* Header — Search Bar Hapus (Requirement 1) */}
      <div className="trx-header">
        <div className="trx-header-right">
          <button className="icon-btn-round" style={{ position: 'relative' }} onClick={() => showToast('Tidak ada notifikasi baru', 'info')}>
            <BellIcon />
            <div className="notif-dot" />
          </button>
          <div className="trx-divider" />
          <div className="trx-admin-info">
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg,#2563eb,#4f46e5)', display:'flex', alignItems:'center', justifyContent:'center', color:'white', fontWeight:800, fontSize:13 }}>A</div>
            SmartKasir Admin
          </div>
        </div>
      </div>

      {/* Page Title */}
      <h1 className="trx-page-title">Riwayat Transaksi</h1>

      {/* Stat Cards (Requirement 2 & 12) */}
      <div className="trx-stat-row">
        {statsData.map((s, i) => (
          <div 
            key={i} 
            className={`trx-stat-card ${selectedKpiFilter === s.label ? 'active' : ''}`}
            onClick={() => handleKpiClick(s.label)}
          >
            <div className={`trx-stat-icon ${s.iconClass}`}>{s.icon}</div>
            <div className="trx-stat-info">
              <div className="trx-stat-label">{s.label}</div>
              <div className="trx-stat-value">{s.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Table Card */}
      <div className="trx-card">
        {/* Title Section — Redundant Tab Hapus (Requirement 3) */}
        <div className="trx-tabs-row" style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a', margin: 0 }}>Daftar Transaksi</h2>
        </div>

        {/* Filter Bar Terpadu (Requirement 4) */}
        <div className="trx-filter-bar">
          <div className="trx-filter-search" style={{ flex: 1, maxWidth: 'none' }}>
            <SearchSmIcon />
            <input 
              placeholder="Cari ID Transaksi, ID Pesanan, atau nama customer..." 
              value={searchQuery} 
              onChange={e => setSearchQuery(e.target.value)} 
            />
          </div>
          
          <button className="trx-filter-select" onClick={() => setIsFilterOpen(!isFilterOpen)}>
            <FilterIcon /> Filter
          </button>
          
          <button className="btn-export" onClick={handleExportCSV}>
            <DownloadIcon /> Ekspor CSV
          </button>

          {/* Popover Dropdown Filter Modern (Requirement 5) */}
          {isFilterOpen && (
            <div className="trx-filter-dropdown">
              <div className="trx-modal-title" style={{ paddingBottom: '6px', borderBottom: '1px solid #e2e8f0', marginBottom: '4px' }}>
                Kustomisasi Saringan
              </div>

              <div className="trx-filter-group">
                <label className="trx-filter-label">Status</label>
                <select 
                  className="trx-filter-input"
                  value={tempFilters.status}
                  onChange={e => setTempFilters({ ...tempFilters, status: e.target.value })}
                >
                  <option value="Semua">Semua Status</option>
                  <option value="Berhasil">Berhasil</option>
                  <option value="Pending">Pending</option>
                  <option value="Refund">Refund</option>
                </select>
              </div>

              <div className="trx-filter-group">
                <label className="trx-filter-label">Tanggal</label>
                <select 
                  className="trx-filter-input"
                  value={tempFilters.tanggal}
                  onChange={e => setTempFilters({ ...tempFilters, tanggal: e.target.value })}
                >
                  <option value="Semua">Semua Waktu</option>
                  <option value="Hari Ini">Hari Ini</option>
                  <option value="7 Hari Terakhir">7 Hari Terakhir</option>
                  <option value="30 Hari Terakhir">30 Hari Terakhir</option>
                  <option value="Bulan Ini">Bulan Ini</option>
                  <option value="Custom">Custom Range</option>
                </select>
                
                {tempFilters.tanggal === 'Custom' && (
                  <div className="trx-filter-dates">
                    <input 
                      type="date" 
                      className="trx-filter-input"
                      value={tempFilters.startDate}
                      onChange={e => setTempFilters({ ...tempFilters, startDate: e.target.value })}
                    />
                    <input 
                      type="date" 
                      className="trx-filter-input"
                      value={tempFilters.endDate}
                      onChange={e => setTempFilters({ ...tempFilters, endDate: e.target.value })}
                    />
                  </div>
                )}
              </div>

              <div className="trx-filter-group">
                <label className="trx-filter-label">Metode Pembayaran</label>
                <select 
                  className="trx-filter-input"
                  value={tempFilters.metode}
                  onChange={e => setTempFilters({ ...tempFilters, metode: e.target.value })}
                >
                  <option value="Semua">Semua Metode</option>
                  <option value="Tunai">Tunai</option>
                  <option value="QRIS">QRIS</option>
                  <option value="Transfer Bank">Transfer Bank</option>
                  <option value="Virtual Account">Virtual Account</option>
                  <option value="Kartu">Kartu Kredit/Debet</option>
                  <option value="OVO">OVO</option>
                  <option value="GoPay">GoPay</option>
                </select>
              </div>

              <div className="trx-filter-group">
                <label className="trx-filter-label">Tipe Transaksi</label>
                <select 
                  className="trx-filter-input"
                  value={tempFilters.tipe}
                  onChange={e => setTempFilters({ ...tempFilters, tipe: e.target.value })}
                >
                  <option value="Semua">Semua Tipe</option>
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                </select>
              </div>

              <div className="trx-filter-group">
                <label className="trx-filter-label">Nominal</label>
                <select 
                  className="trx-filter-input"
                  value={tempFilters.nominal}
                  onChange={e => setTempFilters({ ...tempFilters, nominal: e.target.value })}
                >
                  <option value="Semua">Semua Nominal</option>
                  <option value="< Rp100.000">&lt; Rp100.000</option>
                  <option value="Rp100.000 - Rp500.000">Rp100.000 - Rp500.000</option>
                  <option value="Rp500.000 - Rp1.000.000">Rp500.000 - Rp1.000.000</option>
                  <option value="> Rp1.000.000">&gt; Rp1.000.000</option>
                </select>
              </div>

              <div className="trx-filter-actions">
                <button type="button" className="btn-trx-filter-reset" onClick={handleResetFilter}>Reset</button>
                <button type="button" className="btn-trx-filter-apply" onClick={handleApplyFilter}>Terapkan</button>
              </div>
            </div>
          )}
        </div>

        {/* Table wrapper */}
        <div className="trx-table-wrapper">
          <table className="trx-table">
            <thead>
              <tr>
                <th>ID Transaksi</th>
                <th>ID Pesanan</th>
                <th>Customer</th>
                <th>Tipe</th>
                <th>Metode</th>
                <th>Total</th>
                <th>Status</th>
                <th>Tanggal</th>
                <th style={{ textAlign: 'right' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                // Glowing skeleton loading rows (Requirement 13)
                [...Array(pageSize)].map((_, i) => (
                  <tr key={i} className="trx-skeleton-row">
                    <td><div className="trx-skeleton-line"></div></td>
                    <td><div className="trx-skeleton-line" style={{ width: '40%' }}></div></td>
                    <td><div className="trx-skeleton-line" style={{ width: '60%' }}></div></td>
                    <td><div className="trx-skeleton-line" style={{ width: '50%' }}></div></td>
                    <td><div className="trx-skeleton-line" style={{ width: '50%' }}></div></td>
                    <td><div className="trx-skeleton-line" style={{ width: '55%' }}></div></td>
                    <td><div className="trx-skeleton-line" style={{ width: '40%' }}></div></td>
                    <td><div className="trx-skeleton-line" style={{ width: '70%' }}></div></td>
                    <td><div className="trx-skeleton-line" style={{ width: '80%', float: 'right' }}></div></td>
                  </tr>
                ))
              ) : (
                paginatedTransactions.map(t => (
                  <tr key={t.id} className={selectedTrx?.id === t.id ? 'trx-active' : ''} onClick={() => setSelectedTrx(t)}>
                    <td>
                      <div className="trx-id">{t.id}</div>
                    </td>
                    <td><span style={{ fontSize: 12, color: '#94a3b8' }}>{t.orderId}</span></td>
                    <td><span className="trx-cust">{t.customer}</span></td>
                    <td>
                      <span className={`trx-tipe-badge ${t.tipe}`}>
                        {t.tipe === 'online' ? <GlobeSmIcon /> : <ShopSmIcon />}
                        {t.tipe.charAt(0).toUpperCase() + t.tipe.slice(1)}
                      </span>
                    </td>
                    <td><span className="trx-metode">{t.metode}</span></td>
                    <td><span className="trx-total">{t.total}</span></td>
                    <td><span className={`trx-status-badge ${t.status}`}>{t.status.charAt(0).toUpperCase() + t.status.slice(1)}</span></td>
                    <td><span className="trx-date">{fmtDate(t.rawDate)}</span></td>
                    {/* Action Column (Requirement 6) */}
                    <td onClick={e => e.stopPropagation()}>
                      <div className="trx-actions-cell">
                        <button className="btn-trx-action view" onClick={() => setViewingTrx(t)} title="Lihat detail">
                          <EyeIcon />
                        </button>
                        <button className="btn-trx-action print" onClick={() => setReceiptTrx(t)} title="Cetak ulang struk">
                          <PrinterIcon />
                        </button>
                        <button 
                          className="btn-trx-action refund" 
                          disabled={t.status === 'refund'}
                          onClick={() => setRefundingTrx(t)} 
                          title={t.status === 'refund' ? 'Sudah di-refund' : 'Refund transaksi'}
                        >
                          <RefundIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}

              {filteredTransactions.length === 0 && !loading && (
                <tr>
                  <td colSpan="9" style={{ textAlign: 'center', padding: '48px 24px', color: '#64748b', fontSize: '13px', background: '#f8fafc' }}>
                    Tidak ada riwayat transaksi yang sesuai pencarian atau filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination (Requirement 11) */}
        <div className="trx-pagination">
          <div>Menampilkan {paginatedTransactions.length} dari {filteredTransactions.length} transaksi</div>
          <div className="trx-page-controls">
            <button 
              type="button" 
              className="trx-page-btn"
              style={{ background: 'transparent', display: 'flex', alignItems: 'center' }}
              disabled={currentPage === 1}
              onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
            >
              <ChevronLeftIcon className={`trx-page-arrow ${currentPage === 1 ? 'disabled' : ''}`} />
            </button>

            {pageNumbers.map(page => (
              <button 
                key={page} 
                className={`trx-page-btn ${currentPage === page ? 'active' : ''}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}

            <button 
              type="button" 
              className="trx-page-btn"
              style={{ background: 'transparent', display: 'flex', alignItems: 'center' }}
              disabled={currentPage === totalPages}
              onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
            >
              <ChevronRightIcon className={`trx-page-arrow ${currentPage === totalPages ? 'disabled' : ''}`} />
            </button>
          </div>
        </div>

        {/* Side Detail Panel — retains existing design layout as requested */}
        {selectedTrx && (
          <div className="trx-detail-panel">
            {/* Left: Items */}
            <div className="trx-detail-left">
              <div className="trx-detail-header">
                <div>
                  <div className="trx-detail-title">Detail Item — {selectedTrx.id}</div>
                  <div className="trx-detail-sub">
                    Transaksi Kasir {selectedTrx.tipe === 'offline' ? 'POS • Kasir: Sarah Jenkins' : 'Online'}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn-print" onClick={() => setReceiptTrx(selectedTrx)}><PrinterIcon /> Cetak Ulang Struk</button>
                  <button className="btn-close-panel" onClick={() => setSelectedTrx(null)}><CloseIcon /></button>
                </div>
              </div>

              <table className="trx-items-table">
                <thead>
                  <tr>
                    <th>Produk</th>
                    <th>Jumlah</th>
                    <th>Harga</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedTrx.items.map((item, i) => (
                    <tr key={i}>
                      <td>
                        <div className="trx-item-prod">
                          <div className="trx-item-img"><BoxIcon /></div>
                          <div>
                            <div className="trx-item-name">{item.name}</div>
                            <div className="trx-item-sku">SKU: {item.sku}</div>
                          </div>
                        </div>
                      </td>
                      <td><span className="trx-item-qty">{item.qty}</span></td>
                      <td><span className="trx-item-price">{item.price}</span></td>
                      <td><span className="trx-item-total">{item.total}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="trx-summary">
                <div className="trx-summary-row"><span>Subtotal</span><span>{selectedTrx.subtotal}</span></div>
                <div className="trx-summary-row"><span>Pajak (11%)</span><span>{selectedTrx.tax}</span></div>
                <div className="trx-summary-row total">
                  <span>Total</span>
                  <span className="trx-total-val">{selectedTrx.total}</span>
                </div>
              </div>
            </div>

            {/* Right: Customer + Bukti */}
            <div className="trx-detail-right">
              <div className="trx-cust-card">
                <div className="trx-cust-card-title"><UserIcon /> Informasi Pelanggan</div>
                <div className="trx-cust-avatar">{selectedTrx.customer.split(' ').map(w => w[0]).join('').slice(0,2)}</div>
                <div className="trx-cust-name">{selectedTrx.customer}</div>
                <div className="trx-cust-email">{selectedTrx.email}</div>
                <div className="trx-cust-row">
                  <span className="trx-cust-row-label">No. Telepon</span>
                  <span className="trx-cust-row-val">+62 812 3456 7890</span>
                </div>
                <div className="trx-cust-row">
                  <span className="trx-cust-row-label">Tier Member</span>
                  <span className="badge-gold">{selectedTrx.tier}</span>
                </div>
                <div className="trx-cust-row">
                  <span className="trx-cust-row-label">Poin Didapat</span>
                  <span className="trx-points">{selectedTrx.points}</span>
                </div>
              </div>

              <div className="trx-bukti-card">
                <div className="trx-bukti-header">
                  <span className="trx-bukti-title">Bukti Bayar</span>
                  <span className="badge-verified" style={{ background: selectedTrx.status === 'berhasil' ? '#dcfce7' : selectedTrx.status === 'pending' ? '#fef9c3' : '#ffe4e6', color: selectedTrx.status === 'berhasil' ? '#15803d' : selectedTrx.status === 'pending' ? '#a16207' : '#be123c' }}>
                    {selectedTrx.status.toUpperCase()}
                  </span>
                </div>
                <div className="trx-bukti-placeholder">
                  <ReceiptIcon />
                  <span>Bukti {selectedTrx.metode}<br />{fmtDate(selectedTrx.rawDate)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================
          TRANSACTIONS DIALOG MODALS SECTION
          ======================================================== */}

      {/* 1. Modal Detail Transaksi (Requirement 7) */}
      {viewingTrx && (
        <div className="trx-modal-overlay" onClick={() => setViewingTrx(null)}>
          <div className="trx-modal-card" style={{ width: '600px' }} onClick={e => e.stopPropagation()}>
            <div className="trx-modal-header">
              <h2 className="trx-modal-title">Detail Informasi Transaksi</h2>
              <button className="trx-modal-close-btn" onClick={() => setViewingTrx(null)}>×</button>
            </div>

            <div className="trx-detail-modal-grid">
              {/* Status & Metadata */}
              <div className="trx-detail-section">
                <div className="trx-detail-section-title">Status &amp; Metadata</div>
                <div className="trx-detail-row">
                  <span className="trx-detail-label">ID Transaksi</span>
                  <span className="trx-detail-value" style={{ color: '#2563eb' }}>{viewingTrx.id}</span>
                </div>
                <div className="trx-detail-row">
                  <span className="trx-detail-label">ID Pesanan</span>
                  <span className="trx-detail-value">{viewingTrx.orderId}</span>
                </div>
                <div className="trx-detail-row">
                  <span className="trx-detail-label">Tanggal Transaksi</span>
                  <span className="trx-detail-value">{fmtDate(viewingTrx.rawDate)}</span>
                </div>
                <div className="trx-detail-row">
                  <span className="trx-detail-label">Tipe Transaksi</span>
                  <span className="trx-detail-value" style={{ textTransform: 'capitalize' }}>{viewingTrx.tipe}</span>
                </div>
                <div className="trx-detail-row">
                  <span className="trx-detail-label">Metode Pembayaran</span>
                  <span className="trx-detail-value">{viewingTrx.metode}</span>
                </div>
                <div className="trx-detail-row">
                  <span className="trx-detail-label">Status</span>
                  <span className={`trx-detail-value ${viewingTrx.status}`} style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>
                    {viewingTrx.status}
                  </span>
                </div>
              </div>

              {/* Customer */}
              <div className="trx-detail-section">
                <div className="trx-detail-section-title">Informasi Pelanggan</div>
                <div className="trx-detail-row">
                  <span className="trx-detail-label">Nama Pelanggan</span>
                  <span className="trx-detail-value">{viewingTrx.customer}</span>
                </div>
                <div className="trx-detail-row">
                  <span className="trx-detail-label">Email</span>
                  <span className="trx-detail-value">{viewingTrx.email}</span>
                </div>
                <div className="trx-detail-row">
                  <span className="trx-detail-label">Tier Pelanggan</span>
                  <span className="trx-detail-value">{viewingTrx.tier}</span>
                </div>
                <div className="trx-detail-row">
                  <span className="trx-detail-label">Poin Member</span>
                  <span className="trx-detail-value" style={{ color: '#2563eb' }}>{viewingTrx.points}</span>
                </div>
              </div>

              {/* Produk */}
              <div className="trx-detail-section">
                <div className="trx-detail-section-title">Daftar Produk Dipesan</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
                  {viewingTrx.items.map((item, index) => (
                    <div key={index} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', padding: '6px 0', borderBottom: '1px dashed #e2e8f0' }}>
                      <div>
                        <div style={{ fontWeight: '600', color: '#0f172a' }}>{item.name}</div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>{item.qty} x {item.price}</div>
                      </div>
                      <div style={{ fontWeight: '700', color: '#0f172a' }}>{item.total}</div>
                    </div>
                  ))}
                </div>
                <div className="trx-detail-row" style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #cbd5e1', fontWeight: 'bold' }}>
                  <span>Subtotal</span>
                  <span>{viewingTrx.subtotal}</span>
                </div>
                <div className="trx-detail-row" style={{ fontWeight: 'bold' }}>
                  <span>Pajak (11%)</span>
                  <span>{viewingTrx.tax}</span>
                </div>
                <div className="trx-detail-row" style={{ fontSize: '15px', color: '#2563eb', fontWeight: 'bold' }}>
                  <span>Total Akhir</span>
                  <span>{viewingTrx.total}</span>
                </div>
              </div>
            </div>

            <div className="trx-modal-footer">
              <button type="button" className="btn-order-cancel" onClick={() => setViewingTrx(null)}>Tutup</button>
              <button 
                type="button" 
                className="btn-order-submit" 
                style={{ background: '#4f46e5' }}
                onClick={() => {
                  setViewingTrx(null);
                  setReceiptTrx(viewingTrx);
                }}
              >
                Cetak Struk
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Modal Struk Digital (Requirement 8) */}
      {receiptTrx && (
        <div className="trx-modal-overlay" onClick={() => setReceiptTrx(null)}>
          <div className="trx-modal-card" style={{ width: '400px' }} onClick={e => e.stopPropagation()}>
            <div className="trx-modal-header">
              <h2 className="trx-modal-title">Struk Digital ({receiptTrx.id})</h2>
              <button className="trx-modal-close-btn" onClick={() => setReceiptTrx(null)}>×</button>
            </div>

            <div className="receipt-paper">
              <div className="receipt-header">
                <div className="receipt-logo">SMARTKASIR</div>
                <div style={{ fontSize: '10px', color: '#64748b', fontStyle: 'italic' }}>SmartKasir POS &amp; Retail</div>
                <div style={{ fontSize: '9px', color: '#94a3b8', marginTop: '4px' }}>Mall Sudirman Lt.2, Jakarta</div>
              </div>

              <div className="receipt-row"><span>No. TRX:</span><span>{receiptTrx.id}</span></div>
              <div className="receipt-row"><span>No. ORD:</span><span>{receiptTrx.orderId}</span></div>
              <div className="receipt-row"><span>Kasir:</span><span>Sarah Jenkins</span></div>
              <div className="receipt-row"><span>Tgl:</span><span>{fmtDate(receiptTrx.rawDate)}</span></div>
              <div className="receipt-row"><span>Tipe:</span><span style={{ textTransform: 'uppercase' }}>{receiptTrx.tipe}</span></div>

              <div className="receipt-divider"></div>

              {receiptTrx.items.map((item, i) => (
                <div key={i} style={{ marginBottom: '8px' }}>
                  <div style={{ fontWeight: 'bold' }}>{item.name}</div>
                  <div className="receipt-row" style={{ fontSize: '11px', color: '#475569' }}>
                    <span>{item.qty} x {item.price}</span>
                    <span>{item.total}</span>
                  </div>
                </div>
              ))}

              <div className="receipt-divider"></div>

              <div className="receipt-row"><span>Subtotal:</span><span>{receiptTrx.subtotal}</span></div>
              <div className="receipt-row"><span>Pajak (11%):</span><span>{receiptTrx.tax}</span></div>
              <div className="receipt-row" style={{ fontWeight: 'bold', fontSize: '13px' }}>
                <span>TOTAL:</span>
                <span>{receiptTrx.total}</span>
              </div>

              <div className="receipt-divider"></div>

              <div className="receipt-row"><span>Bayar:</span><span>{receiptTrx.metode}</span></div>
              <div className="receipt-row"><span>Pelanggan:</span><span>{receiptTrx.customer}</span></div>
              <div className="receipt-row"><span>Poin:</span><span>{receiptTrx.points}</span></div>

              <div className="receipt-footer">
                <div>TERIMA KASIH</div>
                <div>ATAS KUNJUNGAN ANDA!</div>
                <div style={{ fontSize: '9px', marginTop: '6px', color: '#94a3b8' }}>Powered by SmartKasir System</div>
              </div>
            </div>

            <div className="trx-modal-footer" style={{ borderTop: 'none', marginTop: 0 }}>
              <button type="button" className="btn-order-cancel" onClick={() => setReceiptTrx(null)}>Tutup</button>
              <button 
                type="button" 
                className="btn-order-submit" 
                style={{ background: '#4f46e5' }}
                onClick={() => showToast('Mencetak struk ke printer...', 'success')}
              >
                Print
              </button>
              <button 
                type="button" 
                className="btn-order-submit" 
                onClick={() => showToast('Berhasil mengunduh PDF struk!', 'success')}
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Modal Refund Konfirmasi (Requirement 9) */}
      {refundingTrx && (
        <div className="trx-modal-overlay" onClick={() => setRefundingTrx(null)}>
          <div className="trx-modal-card" style={{ width: '380px', textAlign: 'center' }} onClick={e => e.stopPropagation()}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#fee2e2', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', fontSize: '20px', fontWeight: 'bold' }}>
              !
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', margin: '0 0 10px 0' }}>Refund Transaksi?</h3>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 20px 0', lineHeight: '1.5' }}>
              Apakah Anda yakin ingin melakukan refund transaksi <strong>{refundingTrx.id}</strong> atas nama <strong>{refundingTrx.customer}</strong>?
              Tindakan ini akan memotong poin member dan mengembalikan dana transaksi.
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button className="btn-order-cancel" style={{ flex: 1 }} onClick={() => setRefundingTrx(null)}>Batal</button>
              <button className="btn-order-submit" style={{ background: '#ef4444', flex: 1 }} onClick={handleExecuteRefund}>Ya, Refund</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Icons
function SearchSmIcon()  { return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>; }
function BellIcon()      { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>; }
function BarIcon()       { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="18" y="3" width="4" height="18"/><rect x="10" y="8" width="4" height="13"/><rect x="2" y="13" width="4" height="8"/></svg>; }
function GlobeIcon()     { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>; }
function ShopIcon()      { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l1-5h16l1 5"/><path d="M3 9h18v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9z"/><path d="M9 21V12h6v9"/></svg>; }
function MoneyIcon()     { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v12M9 9h4.5a1.5 1.5 0 0 1 0 3H10a1.5 1.5 0 0 0 0 3H15"/></svg>; }
function RefundIcon()    { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.5"/></svg>; }
function DownloadIcon()  { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>; }
function FilterIcon()    { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>; }
function ChevronLeftIcon({ className, onClick }){ return <svg width="14" height="14" className={className} onClick={onClick} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>; }
function ChevronRightIcon({ className, onClick }){ return <svg width="14" height="14" className={className} onClick={onClick} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>; }
function GlobeSmIcon()   { return <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>; }
function ShopSmIcon()    { return <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l1-5h16l1 5"/><path d="M3 9h18v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9z"/></svg>; }
function PrinterIcon()   { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>; }
function CloseIcon()     { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>; }
function UserIcon()      { return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>; }
function BoxIcon()       { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>; }
function ReceiptIcon()   { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>; }
function EyeIcon()       { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>; }
