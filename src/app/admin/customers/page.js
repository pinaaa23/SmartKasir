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
    favProduct: 'Headset Sony WH',
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
    favProduct: 'Air Mineral 600ml',
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
    favProduct: 'Kaos Polos Premium L',
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
    favProduct: 'Tas Ransel Laptop',
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
    favProduct: 'Air Mineral 600ml',
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
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  
  // Interactive filters
  const [searchQuery, setSearchQuery] = useState('');
  const [tierFilter, setTierFilter] = useState('Semua');
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
  const [newCustPoints, setNewCustPoints] = useState('0');

  // Success Toast state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Auto select the first customer on mount to showcase split-screen beautifully
  useEffect(() => {
    if (customers.length > 0) {
      setSelectedCustomer(customers[0]);
    }
  }, []);

  // Handler for Exporting Customer Data
  const triggerExport = () => {
    setToastMessage("Mengekspor data pelanggan sebagai EXCEL...");
    setShowToast(true);
    setTimeout(() => {
      setToastMessage("Data pelanggan berhasil diekspor ke folder unduhan!");
      setTimeout(() => setShowToast(false), 2500);
    }, 1500);
  };

  // Form submit handler to add new customer in real-time!
  const handleAddCustomerSubmit = (e) => {
    e.preventDefault();
    if (!newCustName || !newCustPhone) return;

    const newId = `#CST-0${8200 + Math.floor(Math.random() * 99)}`;
    const parsedPoints = parseInt(newCustPoints) || 0;
    
    // Simulate spending based on initial points
    const simulatedSpend = parsedPoints * 15000;
    const simulatedTxCount = Math.ceil(simulatedSpend / 300000) || 0;

    const newCust = {
      id: newId,
      name: newCustName,
      email: newCustEmail || 'anonim@email.com',
      phone: newCustPhone,
      totalSpend: simulatedSpend,
      txCount: simulatedTxCount,
      tier: newCustTier,
      joinedDate: 'Hari Ini',
      address: newCustAddress || 'Surabaya',
      points: parsedPoints,
      favProduct: 'Kaos Polos Premium L',
      recentTx: simulatedSpend > 0 ? [
        { id: `#TRX-${9000 + Math.floor(Math.random() * 900)}`, date: 'Hari Ini', total: simulatedSpend, status: 'berhasil' }
      ] : []
    };

    setCustomers(prev => [newCust, ...prev]);
    setSelectedCustomer(newCust); // auto-select the newly created member!
    
    // Reset form states
    setNewCustName('');
    setNewCustEmail('');
    setNewCustPhone('');
    setNewCustAddress('');
    setNewCustTier('Regular');
    setNewCustPoints('0');
    setShowAddModal(false);

    // Trigger Success Toast
    setToastMessage("Pelanggan baru berhasil ditambahkan!");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Dynamic calculations for loyalty progress bar percentages
  const loyaltyProgress = useMemo(() => {
    if (!selectedCustomer) return { percent: 0, nextTier: '', pointsNeeded: 0 };
    
    const pts = selectedCustomer.points;
    const tier = selectedCustomer.tier;

    if (tier === 'Platinum' || pts >= 1000) {
      return { percent: 100, nextTier: 'Platinum (Tier Maksimal)', pointsNeeded: 0 };
    } else if (tier === 'Gold' || pts >= 500) {
      // Gold to Platinum: needs 1000 points. Progress in [500, 1000]
      const needed = 1000 - pts;
      const pct = ((pts - 500) / 500) * 100;
      return { percent: Math.max(Math.min(pct, 100), 0), nextTier: 'Platinum', pointsNeeded: needed };
    } else if (tier === 'Silver' || pts >= 100) {
      // Silver to Gold: needs 500 points. Progress in [100, 500]
      const needed = 500 - pts;
      const pct = ((pts - 100) / 400) * 100;
      return { percent: Math.max(Math.min(pct, 100), 0), nextTier: 'Gold', pointsNeeded: needed };
    } else {
      // Regular to Silver: needs 100 points. Progress in [0, 100]
      const needed = 100 - pts;
      const pct = (pts / 100) * 100;
      return { percent: Math.max(Math.min(pct, 100), 0), nextTier: 'Silver', pointsNeeded: needed };
    }
  }, [selectedCustomer]);

  // Filtering and Sorting logic
  const filteredAndSortedCustomers = useMemo(() => {
    let result = [...customers];

    // Real-time search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        c => c.name.toLowerCase().includes(q) || 
             c.phone.includes(q) || 
             c.id.toLowerCase().includes(q)
      );
    }

    // Tier Filter selection
    if (tierFilter !== 'Semua') {
      result = result.filter(c => c.tier.toLowerCase() === tierFilter.toLowerCase());
    }

    // Dynamic sorting
    result.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      if (typeof aVal === 'string') {
        return sortDirection === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      } else {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }
    });

    return result;
  }, [customers, searchQuery, tierFilter, sortField, sortDirection]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredAndSortedCustomers.length / itemsPerPage) || 1;
  const paginatedCustomers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedCustomers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedCustomers, currentPage]);

  // Reset page number on filter/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, tierFilter, sortField]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc'); // Default descending
    }
  };

  const renderSortIndicator = (field) => {
    if (sortField !== field) return <span style={{ color: '#cbd5e1', marginLeft: 4 }}>⇅</span>;
    return sortDirection === 'asc' ? ' ▲' : ' ▼';
  };

  // Calculate high-level summary cards realistically
  const summaryMetrics = useMemo(() => {
    const total = customers.length;
    const loyal = customers.filter(c => c.tier === 'Platinum' || c.tier === 'Gold').length;
    const totalTransactions = customers.reduce((sum, c) => sum + c.txCount, 0);
    
    return {
      total,
      loyal,
      totalTransactions,
      newThisMonth: 3 // Static mock value
    };
  }, [customers]);

  return (
    <div className="cust-container">

      {/* Toast Notification */}
      {showToast && (
        <div className="cust-toast-notif">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Header Atas */}
      <div className="cust-header">
        <div className="cust-header-left">
          <h1 className="cust-page-title">Pelanggan</h1>
          <p className="cust-page-subtitle">Kelola data pelanggan dan loyalitas customer toko Anda</p>
        </div>

        <div className="cust-header-right">
          <div className="cust-search-box">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input 
              className="cust-search-input" 
              placeholder="Cari pelanggan..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button className="btn-export-cust" onClick={triggerExport}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Ekspor Data
          </button>
        </div>
      </div>

      {/* 2. Summary Cards (4 card horizontal) */}
      <div className="cust-summary-grid">
        
        {/* Total Pelanggan */}
        <div className="cust-card cust-stat-card accent-purple">
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
          <div className="cust-stat-value">{summaryMetrics.total} Pelanggan</div>
          <div className="cust-stat-desc">Dibanding bulan lalu</div>
        </div>

        {/* Pelanggan Baru */}
        <div className="cust-card cust-stat-card accent-blue">
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
          <div className="cust-stat-value">+{summaryMetrics.newThisMonth} Member</div>
          <div className="cust-stat-desc">Terdaftar bulan ini</div>
        </div>

        {/* Member Loyal */}
        <div className="cust-card cust-stat-card accent-emerald">
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
          <div className="cust-stat-value">{summaryMetrics.loyal} Pelanggan</div>
          <div className="cust-stat-desc">Kontribusi 70% omzet</div>
        </div>

        {/* Total Transaksi Customer */}
        <div className="cust-card cust-stat-card accent-indigo">
          <div className="cust-stat-header">
            <div className="cust-icon-wrapper">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v12M9 9h4.5a1.5 1.5 0 0 1 0 3H10a1.5 1.5 0 0 0 0 3H15"/></svg>
            </div>
            <div className="cust-trend-badge up">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
              +6.8%
            </div>
          </div>
          <div className="cust-stat-label">Total Transaksi Member</div>
          <div className="cust-stat-value">{summaryMetrics.totalTransactions} Transaksi</div>
          <div className="cust-stat-desc">Terdaftar di kasir POS</div>
        </div>
      </div>

      {/* 3. Split-Screen Layout (Table on Left, Details on Right) */}
      <div className={`cust-split-layout ${selectedCustomer ? 'has-selection' : ''}`}>
        
        {/* Left: Tabel Data Pelanggan */}
        <div className="cust-card cust-table-card">
          
          <div className="cust-table-header">
            <div className="cust-table-title-box">
              <div className="cust-table-title">Daftar Data Pelanggan</div>
              <div className="cust-table-subtitle">Pilih pelanggan untuk melihat profil detail dan riwayat spending</div>
            </div>

            <div className="cust-table-actions">
              {/* Member Tier Filter */}
              <select 
                className="select-cust-tier"
                value={tierFilter}
                onChange={(e) => setTierFilter(e.target.value)}
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
                  <th onClick={() => handleSort('name')}>Nama {renderSortIndicator('name')}</th>
                  <th onClick={() => handleSort('phone')}>No. Telepon {renderSortIndicator('phone')}</th>
                  <th onClick={() => handleSort('totalSpend')} style={{ textAlign: 'right' }}>Total Belanja {renderSortIndicator('totalSpend')}</th>
                  <th onClick={() => handleSort('txCount')} style={{ textAlign: 'center' }}>Transaksi {renderSortIndicator('txCount')}</th>
                  <th onClick={() => handleSort('tier')}>Tier {renderSortIndicator('tier')}</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {paginatedCustomers.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', padding: '40px 0', color: '#94a3b8', fontWeight: 600 }}>
                      ❌ Tidak ada data pelanggan yang sesuai dengan kriteria.
                    </td>
                  </tr>
                ) : (
                  paginatedCustomers.map((row) => (
                    <tr 
                      key={row.id} 
                      className={selectedCustomer?.id === row.id ? 'active-row' : ''}
                      onClick={() => setSelectedCustomer(row)}
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
                      <td className="cust-phone-col">{row.phone}</td>
                      <td className="cust-spend-col" style={{ textAlign: 'right' }}>
                        {formatRupiah(row.totalSpend)}
                      </td>
                      <td className="cust-txcount-col" style={{ textAlign: 'center' }}>
                        {row.txCount}
                      </td>
                      <td>
                        <span className={`tier-pill ${row.tier.toLowerCase()}`}>
                          {row.tier}
                        </span>
                      </td>
                      <td>
                        <button 
                          className="cust-action-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCustomer(row);
                          }}
                        >
                          Detail
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredAndSortedCustomers.length > 0 && (
            <div className="cust-pagination">
              <div>
                Menampilkan <strong>{((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, filteredAndSortedCustomers.length)}</strong> dari <strong>{filteredAndSortedCustomers.length}</strong> Pelanggan
              </div>
              
              <div className="cust-pagination-controls">
                <button 
                  className="cust-page-arrow"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  ◀
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    className={`cust-page-btn ${currentPage === pageNum ? 'active' : ''}`}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                ))}

                <button 
                  className="cust-page-arrow"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  ▶
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Right: Detail Pelanggan (Side Detail Panel) */}
        {selectedCustomer && (
          <div className="cust-card cust-detail-card">
            
            {/* Close Button */}
            <button className="cust-detail-close-btn" onClick={() => setSelectedCustomer(null)}>
              ✕
            </button>

            {/* Profile Avatar & Tier Badge */}
            <div className="cust-profile-top-box">
              <div className="cust-avatar-large">
                {selectedCustomer.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
              </div>
              <div className="cust-name-large">{selectedCustomer.name}</div>
              <span className={`tier-pill ${selectedCustomer.tier.toLowerCase()}`} style={{ fontSize: '11px', padding: '6px 14px', borderRadius: '12px' }}>
                {selectedCustomer.tier} Member
              </span>
            </div>

            {/* Loyalty Section */}
            <div className="loyalty-progress-box">
              <div className="loyalty-progress-header">
                <span className="loyalty-points-label">Akumulasi Poin</span>
                <span style={{ color: '#64748b' }}>Tier Progress</span>
              </div>
              
              <div className="loyalty-progress-points">
                {selectedCustomer.points}
                <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '500' }}>Pts</span>
              </div>

              {/* Progress Bar */}
              <div className="loyalty-progress-track">
                <div className="loyalty-progress-fill" style={{ width: `${loyaltyProgress.percent}%` }} />
              </div>

              {/* Next Tier target */}
              {loyaltyProgress.pointsNeeded > 0 ? (
                <div className="loyalty-next-tier-label">
                  Butuh <strong>{loyaltyProgress.pointsNeeded} Poin</strong> lagi menuju keanggotaan <strong>{loyaltyProgress.nextTier}</strong>.
                </div>
              ) : (
                <div className="loyalty-next-tier-label" style={{ color: '#10b981', fontWeight: '600' }}>
                  ✓ Anda berada di tingkat keanggotaan maksimal!
                </div>
              )}
            </div>

            {/* Loyalty details list */}
            <div className="cust-details-section">
              {/* Email */}
              <div className="cust-detail-row">
                <div className="cust-detail-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </div>
                <div className="cust-detail-text">
                  <span style={{ color: '#94a3b8', fontSize: '11px', display: 'block' }}>Email</span>
                  {selectedCustomer.email}
                </div>
              </div>

              {/* Phone */}
              <div className="cust-detail-row">
                <div className="cust-detail-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </div>
                <div className="cust-detail-text">
                  <span style={{ color: '#94a3b8', fontSize: '11px', display: 'block' }}>No. Telepon</span>
                  {selectedCustomer.phone}
                </div>
              </div>

              {/* Address */}
              <div className="cust-detail-row">
                <div className="cust-detail-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div className="cust-detail-text">
                  <span style={{ color: '#94a3b8', fontSize: '11px', display: 'block' }}>Alamat</span>
                  {selectedCustomer.address}
                </div>
              </div>

              {/* Total spending */}
              <div className="cust-detail-row">
                <div className="cust-detail-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                </div>
                <div className="cust-detail-text">
                  <span style={{ color: '#94a3b8', fontSize: '11px', display: 'block' }}>Total Belanja (Spending)</span>
                  <strong style={{ color: '#1e293b', fontSize: '15px' }}>{formatRupiah(selectedCustomer.totalSpend)}</strong>
                </div>
              </div>

              {/* Joined Date */}
              <div className="cust-detail-row">
                <div className="cust-detail-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                </div>
                <div className="cust-detail-text">
                  <span style={{ color: '#94a3b8', fontSize: '11px', display: 'block' }}>Tanggal Bergabung</span>
                  {selectedCustomer.joinedDate}
                </div>
              </div>
            </div>

            {/* Favorite Product */}
            <div className="cust-favorite-product">
              <svg className="fav-prod-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
              <div className="fav-prod-text">
                Produk Favorit: <strong>{selectedCustomer.favProduct}</strong>
              </div>
            </div>

            {/* Mini Transaction list */}
            <div>
              <div className="mini-tx-list-title">Riwayat Transaksi Terakhir</div>
              <div className="mini-tx-list">
                {selectedCustomer.recentTx.length === 0 ? (
                  <div style={{ textAlign: 'center', fontSize: '11px', color: '#94a3b8', padding: '10px 0' }}>
                    Belum ada riwayat transaksi.
                  </div>
                ) : (
                  selectedCustomer.recentTx.map((tx) => (
                    <div key={tx.id} className="mini-tx-item">
                      <div className="mini-tx-left">
                        <span className="mini-tx-id">{tx.id}</span>
                        <span className="mini-tx-date">{tx.date}</span>
                      </div>
                      <div className="mini-tx-right">
                        <span className="mini-tx-val">{formatRupiah(tx.total)}</span>
                        <span className={`mini-tx-status ${tx.status === 'gagal' ? 'failed' : ''}`}>
                          {tx.status === 'berhasil' ? 'Berhasil' : tx.status === 'pending' ? 'Pending' : 'Gagal'}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        )}
      </div>

      {/* 5. Add Customer Modal Form Pop-Up */}
      {showAddModal && (
        <div className="cust-modal-overlay">
          <div className="cust-modal-card">
            
            <div className="cust-modal-header">
              <h2 className="cust-modal-title">Tambah Pelanggan Baru</h2>
              <button 
                className="cust-detail-close-btn" 
                style={{ position: 'static' }}
                onClick={() => setShowAddModal(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddCustomerSubmit}>
              {/* Nama */}
              <div className="cust-form-group">
                <label className="cust-form-label">Nama Lengkap *</label>
                <input 
                  type="text" 
                  className="cust-form-input" 
                  placeholder="Contoh: Sarah Jenkins" 
                  value={newCustName}
                  onChange={(e) => setNewCustName(e.target.value)}
                  required 
                />
              </div>

              {/* Nomor Telepon */}
              <div className="cust-form-group">
                <label className="cust-form-label">Nomor Telepon *</label>
                <input 
                  type="tel" 
                  className="cust-form-input" 
                  placeholder="Contoh: 0812-4455-6677" 
                  value={newCustPhone}
                  onChange={(e) => setNewCustPhone(e.target.value)}
                  required 
                />
              </div>

              {/* Email */}
              <div className="cust-form-group">
                <label className="cust-form-label">Alamat Email</label>
                <input 
                  type="email" 
                  className="cust-form-input" 
                  placeholder="Contoh: sarah@email.com" 
                  value={newCustEmail}
                  onChange={(e) => setNewCustEmail(e.target.value)}
                />
              </div>

              {/* Alamat */}
              <div className="cust-form-group">
                <label className="cust-form-label">Alamat Rumah / Ruko</label>
                <input 
                  type="text" 
                  className="cust-form-input" 
                  placeholder="Contoh: Kec. Rungkut, Surabaya" 
                  value={newCustAddress}
                  onChange={(e) => setNewCustAddress(e.target.value)}
                />
              </div>

              {/* Tier Member & Poin */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="cust-form-group">
                  <label className="cust-form-label">Tier Loyalitas</label>
                  <select 
                    className="cust-form-select"
                    value={newCustTier}
                    onChange={(e) => setNewCustTier(e.target.value)}
                  >
                    <option value="Regular">Regular</option>
                    <option value="Silver">Silver</option>
                    <option value="Gold">Gold</option>
                    <option value="Platinum">Platinum</option>
                  </select>
                </div>
                
                <div className="cust-form-group">
                  <label className="cust-form-label">Poin Awal</label>
                  <input 
                    type="number" 
                    className="cust-form-input" 
                    placeholder="0" 
                    value={newCustPoints}
                    onChange={(e) => setNewCustPoints(e.target.value)}
                  />
                </div>
              </div>

              <div className="cust-modal-footer">
                <button type="button" className="btn-cancel" onClick={() => setShowAddModal(false)}>Batal</button>
                <button type="submit" className="btn-submit">Simpan Pelanggan</button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* 9. Floating Action Button "+ Tambah Pelanggan" */}
      <button className="fab-cust-add" onClick={() => setShowAddModal(true)}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        Tambah Pelanggan
      </button>

    </div>
  );
}
