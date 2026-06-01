"use client";

import React, { useState, useMemo, useEffect } from 'react';
import '../../../styles/customers.css';

// Initial realistic customer mock data
const INITIAL_CUSTOMERS = [
  {
    id: '#CST-08241',
    name: 'Budi Santoso',
    email: 'budi.santoso@email.com',
    phone: '0812-3456-7890',
    totalSpend: 12450000,
    txCount: 24,
    tier: 'Gold',
    joinedDate: '12 Jan 2025',
    address: 'Jl. Kertajaya No. 12, Surabaya',
    points: 750,
    favProduct: 'Nike Air Zoom',
    recentTx: [
      { id: '#TRX-98241', date: '24 Mei 2026', total: 1250000, status: 'berhasil' },
      { id: '#TRX-98110', date: '18 Mei 2026', total: 450000, status: 'berhasil' },
      { id: '#TRX-97992', date: '02 Mei 2026', total: 850000, status: 'berhasil' }
    ]
  },
  {
    id: '#CST-08240',
    name: 'Ani Wijaya',
    email: 'ani.wijaya@email.com',
    phone: '0813-9876-5432',
    totalSpend: 24800000,
    txCount: 42,
    tier: 'Platinum',
    joinedDate: '08 Nov 2024',
    address: 'Kec. Gubeng, Surabaya',
    points: 1650,
    favProduct: 'Headphone Sony WH',
    recentTx: [
      { id: '#TRX-98240', date: '24 Mei 2026', total: 425000, status: 'berhasil' },
      { id: '#TRX-98201', date: '12 Mei 2026', total: 3100000, status: 'berhasil' },
      { id: '#TRX-98012', date: '05 Mei 2026', total: 1250000, status: 'berhasil' }
    ]
  },
  {
    id: '#CST-08239',
    name: 'Citra Lestari',
    email: 'citra.lestari@email.com',
    phone: '0811-2334-4556',
    totalSpend: 4250000,
    txCount: 12,
    tier: 'Silver',
    joinedDate: '19 Feb 2025',
    address: 'Perum. Galaxy Bumi Permai, Surabaya',
    points: 380,
    favProduct: 'Air Mineral Pristine',
    recentTx: [
      { id: '#TRX-98239', date: '24 Mei 2026', total: 89000, status: 'gagal' },
      { id: '#TRX-98188', date: '10 Mei 2026', total: 850000, status: 'berhasil' },
      { id: '#TRX-97811', date: '15 Apr 2026', total: 220000, status: 'berhasil' }
    ]
  },
  {
    id: '#CST-08237',
    name: 'Doni Firmansyah',
    email: 'doni.firmansyah@email.com',
    phone: '0815-5556-7778',
    totalSpend: 8900000,
    txCount: 19,
    tier: 'Gold',
    joinedDate: '05 Des 2024',
    address: 'Kec. Sukolilo, Surabaya',
    points: 620,
    favProduct: 'Sepatu Casual Pria',
    recentTx: [
      { id: '#TRX-98237', date: '23 Mei 2026', total: 780000, status: 'berhasil' },
      { id: '#TRX-98122', date: '14 Mei 2026', total: 120000, status: 'berhasil' },
      { id: '#TRX-98005', date: '04 Mei 2026', total: 680000, status: 'berhasil' }
    ]
  },
  {
    id: '#CST-08235',
    name: 'Rina Pratiwi',
    email: 'rina.pratiwi@email.com',
    phone: '0812-9900-1122',
    totalSpend: 1550000,
    txCount: 5,
    tier: 'Regular',
    joinedDate: '10 Mei 2026',
    address: 'Kec. Rungkut, Surabaya',
    points: 80,
    favProduct: 'Kaos Polos Cotton',
    recentTx: [
      { id: '#TRX-98235', date: '23 Mei 2026', total: 2100000, status: 'pending' },
      { id: '#TRX-98210', date: '15 Mei 2026', total: 450000, status: 'berhasil' }
    ]
  },
  {
    id: '#CST-08230',
    name: 'Fajar Nugraha',
    email: 'fajar.nugraha@email.com',
    phone: '0818-7788-9900',
    totalSpend: 6200000,
    txCount: 11,
    tier: 'Silver',
    joinedDate: '22 Mar 2025',
    address: 'Jl. Dharmahusada No. 44, Surabaya',
    points: 420,
    favProduct: 'Tas Ransel Eiger',
    recentTx: [
      { id: '#TRX-98230', date: '22 Mei 2026', total: 450000, status: 'berhasil' },
      { id: '#TRX-98101', date: '08 Mei 2026', total: 1250000, status: 'berhasil' }
    ]
  },
  {
    id: '#CST-08225',
    name: 'Siti Aminah',
    email: 'siti.aminah@email.com',
    phone: '0813-1122-3344',
    totalSpend: 820000,
    txCount: 3,
    tier: 'Regular',
    joinedDate: '15 Mei 2026',
    address: 'Kec. Jambangan, Surabaya',
    points: 50,
    favProduct: 'Air Mineral Pristine',
    recentTx: [
      { id: '#TRX-98225', date: '15 Mei 2026', total: 320000, status: 'berhasil' }
    ]
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

export default function CustomersPage() {
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [selectedCustomer, setSelectedCustomer] = useState(null); // default null to show Empty State on mount
  
  // Interactive filters
  const [searchQuery, setSearchQuery] = useState('');
  const [tierFilter, setTierFilter] = useState('Semua');
  const [activeKpiFilter, setActiveKpiFilter] = useState(null); // 'total' | 'baru' | 'loyal' | 'transaksi' | null
  const [sortField, setSortField] = useState('totalSpend');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Add customer modal form state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCustName, setNewCustName] = useState('');
  const [newCustEmail, setNewCustEmail] = useState('');
  const [newCustPhone, setNewCustPhone] = useState('');
  const [newCustAddress, setNewCustAddress] = useState('');
  const [newCustTier, setNewCustTier] = useState('Regular');

  // Edit customer modal state
  const [showEditModal, setShowEditModal] = useState(false);
  const [editCustId, setEditCustId] = useState('');
  const [editCustName, setEditCustName] = useState('');
  const [editCustEmail, setEditCustEmail] = useState('');
  const [editCustPhone, setEditCustPhone] = useState('');
  const [editCustAddress, setEditCustAddress] = useState('');
  const [editCustTier, setEditCustTier] = useState('Regular');
  const [editCustPoints, setEditCustPoints] = useState(0);

  // Delete confirm modal state
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Success Toast state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Reset page number on filter/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, tierFilter, sortField, activeKpiFilter]);

  // ========================================================
  // CRM CALCULATIONS & QUICK-FILTERS
  // ========================================================

  // Dynamic High-Level KPI Summary Metrics derived directly from the Master state!
  const summaryMetrics = useMemo(() => {
    const total = customers.length;
    // Pelanggan Baru = joinedDate contains 'Mei 2026' or 'Hari Ini'
    const newThisMonth = customers.filter(c => c.joinedDate.includes('Mei 2026') || c.joinedDate.includes('Hari Ini')).length;
    // Member Loyal = Gold and Platinum
    const loyal = customers.filter(c => c.tier === 'Platinum' || c.tier === 'Gold').length;
    // Member who have transactions txCount > 0
    const activeTx = customers.filter(c => c.txCount > 0).length;

    return { total, newThisMonth, loyal, activeTx };
  }, [customers]);

  // Dynamic filtering & sorting
  const filteredAndSortedCustomers = useMemo(() => {
    let result = [...customers];

    // 1. KPI Card filtering (Quick Filter)
    if (activeKpiFilter === 'baru') {
      result = result.filter(c => c.joinedDate.includes('Mei 2026') || c.joinedDate.includes('Hari Ini'));
    } else if (activeKpiFilter === 'loyal') {
      result = result.filter(c => c.tier === 'Platinum' || c.tier === 'Gold');
    } else if (activeKpiFilter === 'transaksi') {
      result = result.filter(c => c.txCount > 0);
    }

    // 2. Dropdown Keanggotaan filter
    if (tierFilter !== 'Semua') {
      result = result.filter(c => c.tier.toLowerCase() === tierFilter.toLowerCase());
    }

    // 3. Real-time Search (Nama, ID Pelanggan, Email, Nomor Telepon)
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        c => c.name.toLowerCase().includes(q) || 
             c.id.toLowerCase().includes(q) ||
             c.email.toLowerCase().includes(q) ||
             c.phone.includes(q)
      );
    }

    // 4. Sorting logic
    result.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      // Handle joinedDate string parsing for sorting
      if (sortField === 'joinedDate') {
        const parseDate = (dStr) => {
          if (dStr === 'Hari Ini') return new Date().getTime();
          const months = { 'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'Mei': 4, 'Jun': 5, 'Jul': 6, 'Agu': 7, 'Sep': 8, 'Okt': 9, 'Nov': 10, 'Des': 11 };
          const parts = dStr.split(' ');
          if (parts.length === 3) {
            return new Date(parts[2], months[parts[1]] || 0, parts[0]).getTime();
          }
          return 0;
        };
        aVal = parseDate(a.joinedDate);
        bVal = parseDate(b.joinedDate);
      }

      if (typeof aVal === 'string') {
        return sortDirection === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      } else {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }
    });

    return result;
  }, [customers, searchQuery, tierFilter, sortField, sortDirection, activeKpiFilter]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredAndSortedCustomers.length / itemsPerPage) || 1;
  const paginatedCustomers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedCustomers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedCustomers, currentPage]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const renderSortIndicator = (field) => {
    if (sortField !== field) return <span style={{ color: '#cbd5e1', marginLeft: 4 }}>⇅</span>;
    return sortDirection === 'asc' ? ' ▲' : ' ▼';
  };

  // ========================================================
  // LOYALTY progression & benefits systems (Tier calculators)
  // ========================================================
  const loyaltyProgress = useMemo(() => {
    if (!selectedCustomer) return { percent: 0, nextTier: '', pointsNeeded: 0, maxPoints: 100 };
    
    const pts = selectedCustomer.points;
    const tier = selectedCustomer.tier;

    if (tier === 'Platinum' || pts >= 1000) {
      return { percent: 100, nextTier: 'Platinum (Tier Maksimal)', pointsNeeded: 0, maxPoints: 1000 };
    } else if (tier === 'Gold') {
      const needed = 1000 - pts;
      const pct = ((pts - 500) / 500) * 100;
      return { percent: Math.max(Math.min(pct, 100), 0), nextTier: 'Platinum', pointsNeeded: needed, maxPoints: 1000 };
    } else if (tier === 'Silver') {
      const needed = 500 - pts;
      const pct = ((pts - 100) / 400) * 100;
      return { percent: Math.max(Math.min(pct, 100), 0), nextTier: 'Gold', pointsNeeded: needed, maxPoints: 500 };
    } else {
      const needed = 100 - pts;
      const pct = (pts / 100) * 100;
      return { percent: Math.max(Math.min(pct, 100), 0), nextTier: 'Silver', pointsNeeded: needed, maxPoints: 100 };
    }
  }, [selectedCustomer]);

  const tierBenefits = useMemo(() => {
    if (!selectedCustomer) return null;
    const tier = selectedCustomer.tier;
    if (tier === 'Platinum') {
      return { discount: '15%', bonus: '3x Poin', cashback: '5% Cashback' };
    } else if (tier === 'Gold') {
      return { discount: '10%', bonus: '2x Poin', cashback: '2% Cashback' };
    } else if (tier === 'Silver') {
      return { discount: '5%', bonus: '1.5x Poin', cashback: '1% Cashback' };
    } else {
      return { discount: '2%', bonus: '1x Poin', cashback: '0% Cashback' };
    }
  }, [selectedCustomer]);

  // ========================================================
  // FORM SUBMISSIONS AND ACTIONS HANDLER (ADD / EDIT / DELETE)
  // ========================================================

  // 1. ADD NEW CUSTOMER
  const handleAddCustomerSubmit = (e) => {
    e.preventDefault();
    if (!newCustName || !newCustPhone) return;

    const newId = `#CST-0${8200 + Math.floor(Math.random() * 999)}`;
    
    // Simulate logical spending/points based on selected initial tier
    let initialSpend = 0;
    let initialPoints = 0;
    let initialTx = 0;
    if (newCustTier === 'Platinum') {
      initialSpend = 18000000;
      initialPoints = 1200;
      initialTx = 30;
    } else if (newCustTier === 'Gold') {
      initialSpend = 9000000;
      initialPoints = 600;
      initialTx = 15;
    } else if (newCustTier === 'Silver') {
      initialSpend = 3000000;
      initialPoints = 250;
      initialTx = 6;
    } else {
      initialSpend = 350000;
      initialPoints = 20;
      initialTx = 1;
    }

    const newCust = {
      id: newId,
      name: newCustName,
      email: newCustEmail || `${newCustName.toLowerCase().replace(/\s+/g, '.')}@email.com`,
      phone: newCustPhone,
      totalSpend: initialSpend,
      txCount: initialTx,
      tier: newCustTier,
      joinedDate: 'Hari Ini',
      address: newCustAddress || 'Surabaya',
      points: initialPoints,
      favProduct: 'Air Mineral Pristine',
      recentTx: initialSpend > 0 ? [
        { id: `#TRX-${9900 + Math.floor(Math.random() * 99)}`, date: 'Hari Ini', total: initialSpend, status: 'berhasil' }
      ] : []
    };

    setCustomers(prev => [newCust, ...prev]);
    setSelectedCustomer(newCust); // auto select the newly added customer!
    
    // Reset fields
    setNewCustName('');
    setNewCustEmail('');
    setNewCustPhone('');
    setNewCustAddress('');
    setNewCustTier('Regular');
    setShowAddModal(false);

    triggerToast(`Pelanggan "${newCust.name}" berhasil didaftarkan sebagai ${newCust.tier} Member!`);
  };

  // 2. EDIT CUSTOMER DETAILS
  const handleEditClick = () => {
    if (!selectedCustomer) return;
    setEditCustId(selectedCustomer.id);
    setEditCustName(selectedCustomer.name);
    setEditCustEmail(selectedCustomer.email);
    setEditCustPhone(selectedCustomer.phone);
    setEditCustAddress(selectedCustomer.address);
    setEditCustTier(selectedCustomer.tier);
    setEditCustPoints(selectedCustomer.points);
    setShowEditModal(true);
  };

  const handleEditCustomerSubmit = (e) => {
    e.preventDefault();
    if (!editCustName || !editCustPhone) return;

    setCustomers(prev => {
      return prev.map(c => {
        if (c.id === editCustId) {
          const updated = {
            ...c,
            name: editCustName,
            email: editCustEmail,
            phone: editCustPhone,
            address: editCustAddress,
            tier: editCustTier,
            points: Number(editCustPoints)
          };
          
          // Re-estimate spending dynamically if points changed significantly
          if (Number(editCustPoints) !== c.points) {
            updated.totalSpend = updated.totalSpend + (Number(editCustPoints) - c.points) * 15000;
          }
          
          setSelectedCustomer(updated); // Sync details panel instantly!
          return updated;
        }
        return c;
      });
    });

    setShowEditModal(false);
    triggerToast(`Profil member "${editCustName}" berhasil diperbarui!`);
  };

  // 3. DELETE CUSTOMER
  const handleDeleteConfirmClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleDeleteCustomerExecute = () => {
    if (!selectedCustomer) return;

    const targetName = selectedCustomer.name;
    setCustomers(prev => prev.filter(c => c.id !== selectedCustomer.id));
    setSelectedCustomer(null); // Reset details panel back to Empty State!
    setShowDeleteConfirm(false);

    triggerToast(`Akun pelanggan "${targetName}" berhasil dihapus dari database!`);
  };

  // ========================================================
  // DYNAMIC CLIENT-SIDE EXPORT (CSV SINKRON)
  // ========================================================
  const handleExportData = (format) => {
    const filename = `Data_Pelanggan_SmartKasir_${new Date().toISOString().substring(0,10)}.${format}`;
    triggerToast(`Mengekspor data pelanggan (${filteredAndSortedCustomers.length} member tersaring) sebagai ${format.toUpperCase()}...`);

    setTimeout(() => {
      let content = "";
      if (format === 'csv') {
        content = "ID Pelanggan,Nama Lengkap,Email,No. Telepon,Total Belanja,Kuantitas Transaksi,Tier Keanggotaan,Poin Loyalitas,Tanggal Bergabung,Alamat\n";
        filteredAndSortedCustomers.forEach(c => {
          content += `${c.id},${c.name},${c.email},${c.phone},${c.totalSpend},${c.txCount},${c.tier},${c.points},${c.joinedDate},"${c.address.replace(/"/g, '""')}"\n`;
        });
      } else {
        // excel tabbed raw text simulation
        content = "ID Pelanggan\tNama Lengkap\tEmail\tNo. Telepon\tTotal Belanja\tTransaksi\tTier\tPoin\tTanggal Gabung\tAlamat\n";
        filteredAndSortedCustomers.forEach(c => {
          content += `${c.id}\t${c.name}\t${c.email}\t${c.phone}\t${c.totalSpend}\t${c.txCount}\t${c.tier}\t${c.points}\t${c.joinedDate}\t${c.address}\n`;
        });
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

      triggerToast(`Unduhan berkas ${format.toUpperCase()} berhasil diselesaikan!`);
    }, 1200);
  };

  // ========================================================
  // CONNECTIVITY TO TRANSACTION PAGE ROUTING
  // ========================================================
  const handleRedirectToTransactions = () => {
    if (!selectedCustomer) return;
    triggerToast(`Membuka riwayat transaksi milik "${selectedCustomer.name}"...`);
    setTimeout(() => {
      window.location.href = `/admin/transactions?customer=${encodeURIComponent(selectedCustomer.name)}`;
    }, 800);
  };

  return (
    <div className="cust-container">
      {/* Dynamic Toast Popup */}
      {showToast && (
        <div className="cust-toast-notif" style={{ transition: 'all 0.25s ease' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ========================================================
          1. HEADER ATAS (TITLE & ACTION CONTROLS)
          ======================================================== */}
      <div className="cust-header">
        <div className="cust-header-left">
          <h1 className="cust-page-title">Sistem CRM Pelanggan</h1>
          <p className="cust-page-subtitle">Kelola loyalty point, keanggotaan member, dan spending pelanggan POS</p>
        </div>

        <div className="cust-header-right">
          {/* Real-time search box */}
          <div className="cust-search-box">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input 
              className="cust-search-input" 
              placeholder="Cari ID, Nama, Email, Telepon..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button className="btn-export-cust" onClick={() => handleExportData('csv')}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Ekspor CSV
          </button>
        </div>
      </div>

      {/* ========================================================
          2. SUMMARY KPI STAT CARDS (CLICKABLE DYNAMICS & ACTIVE VISUALS)
          ======================================================== */}
      <div className="cust-summary-grid">
        
        {/* Total Pelanggan Card */}
        <div 
          className={`cust-card cust-stat-card accent-purple ${activeKpiFilter === null ? 'active' : ''}`}
          onClick={() => {
            setActiveKpiFilter(null);
            setTierFilter('Semua');
            setSearchQuery('');
            triggerToast("Menampilkan seluruh daftar data pelanggan!");
          }}
          title="Klik untuk menampilkan seluruh pelanggan"
        >
          <div className="cust-stat-header">
            <div className="cust-icon-wrapper">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <div className="cust-trend-badge up">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
              +8.2%
            </div>
          </div>
          <div className="cust-stat-label">Total Pelanggan</div>
          <div className="cust-stat-value">{summaryMetrics.total} Member</div>
          <div className="cust-stat-desc">Semua data terdaftar</div>
        </div>

        {/* Pelanggan Baru Card */}
        <div 
          className={`cust-card cust-stat-card accent-blue ${activeKpiFilter === 'baru' ? 'active' : ''}`}
          onClick={() => {
            if (activeKpiFilter === 'baru') {
              setActiveKpiFilter(null);
            } else {
              setActiveKpiFilter('baru');
              triggerToast("Menyaring member baru terdaftar di bulan Juni / Mei 2026!");
            }
          }}
          title="Klik untuk menyaring pelanggan baru yang bergabung bulan ini"
        >
          <div className="cust-stat-header">
            <div className="cust-icon-wrapper">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
            </div>
            <div className="cust-trend-badge up">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
              +15%
            </div>
          </div>
          <div className="cust-stat-label">Pelanggan Baru</div>
          <div className="cust-stat-value">{summaryMetrics.newThisMonth} Baru</div>
          <div className="cust-stat-desc">Terdaftar rentang bulan ini</div>
        </div>

        {/* Member Loyal Card */}
        <div 
          className={`cust-card cust-stat-card accent-emerald ${activeKpiFilter === 'loyal' ? 'active' : ''}`}
          onClick={() => {
            if (activeKpiFilter === 'loyal') {
              setActiveKpiFilter(null);
            } else {
              setActiveKpiFilter('loyal');
              triggerToast("Menyaring member premium loyal (Gold & Platinum)!");
            }
          }}
          title="Klik untuk menyaring member loyal ber-tier Gold & Platinum"
        >
          <div className="cust-stat-header">
            <div className="cust-icon-wrapper">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </div>
            <div className="cust-trend-badge up">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
              +12.4%
            </div>
          </div>
          <div className="cust-stat-label">Member Loyal (Platinum/Gold)</div>
          <div className="cust-stat-value">{summaryMetrics.loyal} Loyal</div>
          <div className="cust-stat-desc">Kontributor terbesar margin</div>
        </div>

        {/* Total Transaksi Member Card */}
        <div 
          className={`cust-card cust-stat-card accent-indigo ${activeKpiFilter === 'transaksi' ? 'active' : ''}`}
          onClick={() => {
            if (activeKpiFilter === 'transaksi') {
              setActiveKpiFilter(null);
            } else {
              setActiveKpiFilter('transaksi');
              triggerToast("Menyaring pelanggan yang memiliki riwayat transaksi!");
            }
          }}
          title="Klik untuk menyaring member yang memiliki riwayat belanja aktif"
        >
          <div className="cust-stat-header">
            <div className="cust-icon-wrapper">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v12M9 9h4.5a1.5 1.5 0 0 1 0 3H10a1.5 1.5 0 0 0 0 3H15"/></svg>
            </div>
            <div className="cust-trend-badge up">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
              +6.8%
            </div>
          </div>
          <div className="cust-stat-label">Transaksi Member Aktif</div>
          <div className="cust-stat-value">{summaryMetrics.activeTx} Member</div>
          <div className="cust-stat-desc">Memiliki riwayat spending</div>
        </div>
      </div>

      {/* ========================================================
          3. SPLIT-SCREEN WORKSPACE (LEFT TABLE / RIGHT DETAIL PANEL)
          ======================================================== */}
      <div className="cust-split-layout has-selection" style={{ transition: 'all 0.3s ease' }}>
        
        {/* Kolom Kiri: Tabel Informasi Pelanggan */}
        <div className="cust-card cust-table-card">
          
          <div className="cust-table-header">
            <div className="cust-table-title-box">
              <div className="cust-table-title">Database Keanggotaan Pelanggan</div>
              <div className="cust-table-subtitle">Tabel penelusuran status, tier keanggotaan, dan detail kontak member</div>
            </div>

            <div className="cust-table-actions">
              {/* Dropdown filter Keanggotaan */}
              <select 
                className="select-cust-tier" value={tierFilter}
                onChange={(e) => {
                  setTierFilter(e.target.value);
                  triggerToast(`Keanggotaan disaring berdasar: ${e.target.value}!`);
                }}
              >
                <option value="Semua">Semua Tier Keanggotaan</option>
                <option value="Platinum">Platinum Member</option>
                <option value="Gold">Gold Member</option>
                <option value="Silver">Silver Member</option>
                <option value="Regular">Regular Member</option>
              </select>
            </div>
          </div>

          <div className="cust-table-wrapper">
            <table className="cust-data-table">
              <thead>
                <tr>
                  <th onClick={() => handleSort('id')}>ID {renderSortIndicator('id')}</th>
                  <th onClick={() => handleSort('name')}>Nama Member {renderSortIndicator('name')}</th>
                  <th onClick={() => handleSort('totalSpend')} style={{ textAlign: 'right' }}>Total Belanja {renderSortIndicator('totalSpend')}</th>
                  <th onClick={() => handleSort('txCount')} style={{ textAlign: 'center' }}>Transaksi {renderSortIndicator('txCount')}</th>
                  <th onClick={() => handleSort('joinedDate')}>Joined Date {renderSortIndicator('joinedDate')}</th>
                  <th onClick={() => handleSort('tier')}>Tier {renderSortIndicator('tier')}</th>
                </tr>
              </thead>
              <tbody>
                {paginatedCustomers.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '40px 0', color: '#94a3b8', fontWeight: 600 }}>
                      ❌ Tidak ada data pelanggan yang sesuai dengan filter pencarian.
                    </td>
                  </tr>
                ) : (
                  paginatedCustomers.map((row) => (
                    <tr 
                      key={row.id} 
                      className={selectedCustomer?.id === row.id ? 'active-row' : ''}
                      onClick={() => setSelectedCustomer(row)}
                      style={{ cursor: 'pointer' }}
                    >
                      <td className="cust-id-col">{row.id}</td>
                      <td>
                        <div className="cust-avatar-box">
                          <div className="cust-initial-avatar">
                            {row.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
                          </div>
                          <span style={{ fontWeight: 600, color: '#1e293b' }}>{row.name}</span>
                        </div>
                      </td>
                      <td className="cust-spend-col" style={{ textAlign: 'right' }}>
                        {formatRupiah(row.totalSpend)}
                      </td>
                      <td className="cust-txcount-col" style={{ textAlign: 'center' }}>
                        {row.txCount}
                      </td>
                      <td style={{ color: '#64748b', fontSize: '12px' }}>
                        {row.joinedDate}
                      </td>
                      <td>
                        <span className={`tier-pill ${row.tier.toLowerCase()}`}>
                          {row.tier}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination bar */}
          {filteredAndSortedCustomers.length > 0 && (
            <div className="cust-pagination">
              <div>
                Menampilkan <strong>{((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, filteredAndSortedCustomers.length)}</strong> dari <strong>{filteredAndSortedCustomers.length}</strong> Pelanggan
              </div>
              
              <div className="cust-pagination-controls">
                <button 
                  className="cust-page-arrow" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  ◀
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum} className={`cust-page-btn ${currentPage === pageNum ? 'active' : ''}`}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                ))}

                <button 
                  className="cust-page-arrow" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  ▶
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Kolom Kanan: Detail Pelanggan / Profil CRM / Default Empty State */}
        <div style={{ position: 'relative' }}>
          {!selectedCustomer ? (
            /* 1. Empty State Panel (Default load state) */
            <div className="cust-card cust-detail-card" style={{ width: '100%' }}>
              <div className="cust-empty-state">
                <div className="cust-empty-icon-wrapper">
                  <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
                <h3 className="cust-empty-title">Pilih Pelanggan</h3>
                <p className="cust-empty-desc">
                  Pilih salah satu baris pelanggan dari daftar untuk membuka rincian profil, akumulasi loyalitas poin, benefit tier, serta histori transaksi belanja.
                </p>
              </div>
            </div>
          ) : (
            /* 2. Customer Detail Profil Card (selectedCustomer exists) */
            <div className="cust-card cust-detail-card" style={{ width: '100%', transition: 'all 0.35s ease' }}>
              
              {/* Reset selection / Close detail panel button */}
              <button className="cust-detail-close-btn" onClick={() => setSelectedCustomer(null)} title="Tutup panel detail">
                ✕
              </button>

              {/* Profile Top Avatar & Name */}
              <div className="cust-profile-top-box">
                <div className="cust-avatar-large">
                  {selectedCustomer.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
                </div>
                <div className="cust-name-large">{selectedCustomer.name}</div>
                <span className={`tier-pill ${selectedCustomer.tier.toLowerCase()}`} style={{ fontSize: '11px', padding: '6px 14px', borderRadius: '12px', fontWeight: 'bold' }}>
                  {selectedCustomer.tier} Member
                </span>
              </div>

              {/* 9. LOYALTY & PROGRESS BAR SYSTEM */}
              <div className="loyalty-progress-box">
                <div className="loyalty-progress-header">
                  <span className="loyalty-points-label">Akumulasi Loyalitas</span>
                  <span style={{ color: '#94a3b8', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase' }}>Target Tier</span>
                </div>
                
                <div className="loyalty-progress-points" style={{ margin: '4px 0 8px 0' }}>
                  {selectedCustomer.points}
                  <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '700', marginLeft: 4 }}>Poin</span>
                </div>

                {/* React Progress bar */}
                <div className="loyalty-progress-track">
                  <div className="loyalty-progress-fill" style={{ width: `${loyaltyProgress.percent}%` }} />
                </div>

                {loyaltyProgress.pointsNeeded > 0 ? (
                  <div className="loyalty-next-tier-label">
                    Butuh <strong>{loyaltyProgress.pointsNeeded} Poin</strong> lagi menuju tier keanggotaan <strong>{loyaltyProgress.nextTier}</strong>.
                  </div>
                ) : (
                  <div className="loyalty-next-tier-label" style={{ color: '#10b981', fontWeight: '700' }}>
                    ✓ Anggota berada pada level loyalitas Platinum tertinggi!
                  </div>
                )}
              </div>

              {/* Exclusive member benefits breakdown */}
              {tierBenefits && (
                <div className="member-benefits-box">
                  <div className="member-benefit-title">Keuntungan Tier {selectedCustomer.tier}</div>
                  <div className="member-benefit-row">
                    <span>Diskon Pembelian</span>
                    <span className="benefit-badge green">{tierBenefits.discount} OFF</span>
                  </div>
                  <div className="member-benefit-row">
                    <span>Laju Perolehan Poin</span>
                    <span className="benefit-badge orange">{tierBenefits.bonus}</span>
                  </div>
                  <div className="member-benefit-row">
                    <span>Cashback Toko</span>
                    <span className="benefit-badge">{tierBenefits.cashback}</span>
                  </div>
                </div>
              )}

              {/* Metadata Details Contact */}
              <div className="cust-details-section" style={{ borderTop: '1px solid #f1f5f9', paddingTop: 16 }}>
                {/* Email */}
                <div className="cust-detail-row">
                  <div className="cust-detail-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  </div>
                  <div className="cust-detail-text">
                    <span style={{ color: '#94a3b8', fontSize: '10px', fontWeight: '700', display: 'block', textTransform: 'uppercase' }}>Email Kontak</span>
                    {selectedCustomer.email}
                  </div>
                </div>

                {/* Telepon */}
                <div className="cust-detail-row">
                  <div className="cust-detail-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  </div>
                  <div className="cust-detail-text">
                    <span style={{ color: '#94a3b8', fontSize: '10px', fontWeight: '700', display: 'block', textTransform: 'uppercase' }}>Nomor Telepon</span>
                    {selectedCustomer.phone}
                  </div>
                </div>

                {/* Alamat */}
                <div className="cust-detail-row">
                  <div className="cust-detail-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <div className="cust-detail-text">
                    <span style={{ color: '#94a3b8', fontSize: '10px', fontWeight: '700', display: 'block', textTransform: 'uppercase' }}>Alamat Rumah</span>
                    {selectedCustomer.address}
                  </div>
                </div>

                {/* Total spending */}
                <div className="cust-detail-row">
                  <div className="cust-detail-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                  </div>
                  <div className="cust-detail-text">
                    <span style={{ color: '#94a3b8', fontSize: '10px', fontWeight: '700', display: 'block', textTransform: 'uppercase' }}>Total Belanja Belanja</span>
                    <strong style={{ color: '#10b981', fontSize: '14px', fontWeight: '800' }}>{formatRupiah(selectedCustomer.totalSpend)}</strong>
                  </div>
                </div>
              </div>

              {/* 8. HISTORI TRANSAKSI PELANGGAN (MAX 5 TRX) */}
              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: 16 }}>
                <div className="mini-tx-list-title" style={{ border: 'none', padding: 0, margin: '0 0 10px 0' }}>Riwayat Transaksi Terbaru</div>
                <div className="mini-tx-list">
                  {selectedCustomer.recentTx.length === 0 ? (
                    <div style={{ textAlign: 'center', fontSize: '11px', color: '#94a3b8', padding: '10px 0' }}>
                      Belum ada riwayat transaksi belanja.
                    </div>
                  ) : (
                    selectedCustomer.recentTx.slice(0, 5).map((tx) => (
                      <div key={tx.id} className="mini-tx-item">
                        <div className="mini-tx-left">
                          <span className="mini-tx-id">{tx.id}</span>
                          <span className="mini-tx-date">{tx.date}</span>
                        </div>
                        <div className="mini-tx-right">
                          <span className="mini-tx-val" style={{ fontWeight: 'bold' }}>{formatRupiah(tx.total)}</span>
                          <span className={`mini-tx-status ${tx.status === 'gagal' || tx.status === 'failed' || tx.status === 'refund' ? 'failed' : ''}`}>
                            {tx.status === 'berhasil' ? 'Berhasil' : tx.status === 'pending' ? 'Pending' : 'Refund'}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* "Lihat Semua" transaction redirect button */}
                <button className="btn-view-all-tx" onClick={handleRedirectToTransactions}>
                  Lihat Semua Transaksi ({selectedCustomer.txCount}) ➜
                </button>
              </div>

              {/* 10 & 11. ACTION BUTTONS: EDIT & HAPUS */}
              <div className="cust-detail-actions-row">
                <button className="btn-detail-action edit" onClick={handleEditClick}>
                  ✏️ Edit Profil
                </button>
                <button className="btn-detail-action delete" onClick={handleDeleteConfirmClick}>
                  🗑️ Hapus Member
                </button>
              </div>

            </div>
          )}
        </div>
      </div>

      {/* ========================================================
          4. MODAL DIALOG Tambah Pelanggan
          ======================================================== */}
      {showAddModal && (
        <div className="cust-modal-overlay">
          <div className="cust-modal-card">
            
            <div className="cust-modal-header">
              <h2 className="cust-modal-title">Tambah Pelanggan Baru</h2>
              <button 
                className="cust-detail-close-btn" style={{ position: 'static' }}
                onClick={() => setShowAddModal(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddCustomerSubmit}>
              <div className="cust-form-group">
                <label className="cust-form-label">Nama Lengkap Member *</label>
                <input 
                  type="text" className="cust-form-input" required
                  placeholder="Contoh: Budi Santoso" value={newCustName}
                  onChange={(e) => setNewCustName(e.target.value)}
                />
              </div>

              <div className="cust-form-group">
                <label className="cust-form-label">Nomor Telepon *</label>
                <input 
                  type="tel" className="cust-form-input" required
                  placeholder="Contoh: 0812-3456-7890" value={newCustPhone}
                  onChange={(e) => setNewCustPhone(e.target.value)}
                />
              </div>

              <div className="cust-form-group">
                <label className="cust-form-label">Alamat Email</label>
                <input 
                  type="email" className="cust-form-input"
                  placeholder="Contoh: budi.s@email.com" value={newCustEmail}
                  onChange={(e) => setNewCustEmail(e.target.value)}
                />
              </div>

              <div className="cust-form-group">
                <label className="cust-form-label">Alamat Rumah</label>
                <input 
                  type="text" className="cust-form-input"
                  placeholder="Contoh: Jl. Kertajaya No. 12, Surabaya" value={newCustAddress}
                  onChange={(e) => setNewCustAddress(e.target.value)}
                />
              </div>

              <div className="cust-form-group">
                <label className="cust-form-label">Tier Loyalitas Awal</label>
                <select 
                  className="cust-form-select" value={newCustTier}
                  onChange={(e) => setNewCustTier(e.target.value)}
                >
                  <option value="Regular">Regular</option>
                  <option value="Silver">Silver</option>
                  <option value="Gold">Gold</option>
                  <option value="Platinum">Platinum</option>
                </select>
              </div>

              <div className="cust-modal-footer">
                <button type="button" className="btn-cancel" onClick={() => setShowAddModal(false)}>Batal</button>
                <button type="submit" className="btn-submit">Simpan Pelanggan</button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* ========================================================
          5. MODAL DIALOG Edit Pelanggan
          ======================================================== */}
      {showEditModal && (
        <div className="cust-modal-overlay">
          <div className="cust-modal-card">
            
            <div className="cust-modal-header">
              <h2 className="cust-modal-title">Ubah Profil Pelanggan</h2>
              <button 
                className="cust-detail-close-btn" style={{ position: 'static' }}
                onClick={() => setShowEditModal(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleEditCustomerSubmit}>
              <div className="cust-form-group">
                <label className="cust-form-label">Nama Lengkap Member *</label>
                <input 
                  type="text" className="cust-form-input" required
                  value={editCustName} onChange={(e) => setEditCustName(e.target.value)}
                />
              </div>

              <div className="cust-form-group">
                <label className="cust-form-label">Nomor Telepon *</label>
                <input 
                  type="tel" className="cust-form-input" required
                  value={editCustPhone} onChange={(e) => setEditCustPhone(e.target.value)}
                />
              </div>

              <div className="cust-form-group">
                <label className="cust-form-label">Alamat Email</label>
                <input 
                  type="email" className="cust-form-input"
                  value={editCustEmail} onChange={(e) => setEditCustEmail(e.target.value)}
                />
              </div>

              <div className="cust-form-group">
                <label className="cust-form-label">Alamat Rumah</label>
                <input 
                  type="text" className="cust-form-input"
                  value={editCustAddress} onChange={(e) => setEditCustAddress(e.target.value)}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="cust-form-group">
                  <label className="cust-form-label">Tier Loyalitas</label>
                  <select 
                    className="cust-form-select" value={editCustTier}
                    onChange={(e) => setEditCustTier(e.target.value)}
                  >
                    <option value="Regular">Regular</option>
                    <option value="Silver">Silver</option>
                    <option value="Gold">Gold</option>
                    <option value="Platinum">Platinum</option>
                  </select>
                </div>
                
                <div className="cust-form-group">
                  <label className="cust-form-label">Loyalty Points</label>
                  <input 
                    type="number" className="cust-form-input" min="0"
                    value={editCustPoints} onChange={(e) => setEditCustPoints(e.target.value)}
                  />
                </div>
              </div>

              <div className="cust-modal-footer">
                <button type="button" className="btn-cancel" onClick={() => setShowEditModal(false)}>Batal</button>
                <button type="submit" className="btn-submit">Simpan Perubahan</button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* ========================================================
          6. CONFIRM DIALOG Hapus Pelanggan
          ======================================================== */}
      {showDeleteConfirm && selectedCustomer && (
        <div className="cust-modal-overlay">
          <div className="cust-confirm-card">
            <div className="cust-confirm-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
            </div>
            <h3 className="cust-confirm-title">Yakin ingin menghapus member ini?</h3>
            <p className="cust-confirm-text">
              Tindakan ini akan menghapus akun member <strong>"{selectedCustomer.name}"</strong> secara permanen. Poin loyalitas dan status spending juga akan dihapus.
            </p>
            <div style={{ display: 'flex', gap: 10, width: '100%', justifyContent: 'center' }}>
              <button className="btn-cancel" style={{ flex: 1 }} onClick={() => setShowDeleteConfirm(false)}>Batal</button>
              <button className="btn-danger" style={{ flex: 1 }} onClick={handleDeleteCustomerExecute}>Ya, Hapus</button>
            </div>
          </div>
        </div>
      )}

      {/* 7. FLOATING ACTION BUTTON "+ Tambah Pelanggan" */}
      <button className="fab-cust-add" onClick={() => setShowAddModal(true)} title="Tambah member pelanggan baru">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        Tambah Pelanggan
      </button>

    </div>
  );
}
