"use client";
import React, { useState, useEffect } from 'react';
import '../../../styles/orders.css';

const STATS = [
  { label: 'Total Pesanan', value: '1,284', trend: '↑ +12%', isUp: true, active: true },
  { label: 'Menunggu', value: '42', trend: 'Perlu Bayar', isUp: false },
  { label: 'Proses', value: '89', trend: 'Siap Kirim', isUp: false },
  { label: 'Selesai', value: '1,120', trend: 'Pekan Ini', isUp: true },
  { label: 'Dibatalkan', value: '33', trend: '↓ -2% Tren', isUp: false },
];

// All dates relative so filters always work when demoing
const today = new Date();
const d = (offsetDays, h = 10, m = 0) => {
  const dt = new Date(today);
  dt.setDate(dt.getDate() - offsetDays);
  dt.setHours(h, m, 0, 0);
  return dt;
};
const fmt = (dt) => dt.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }).replace(',', '');

const ORDERS = [
  // Minggu ini (0-6 hari lalu)
  { id: '#ORD-88291', rawDate: d(0, 9, 20),  customer: 'Andi Wijaya',   location: 'Jakarta Selatan', product: 'Premium Cotton T-Shirt White (+2 others)', items: '3 Items', total: 'Rp 842.000',   method: 'Transfer BCA',      status: 'DIPROSES', statusColor: 'purple', payment: 'Dibayar', paymentStatus: 'success' },
  { id: '#ORD-88290', rawDate: d(1, 14, 30), customer: 'Hendra Kurnia', location: 'Bekasi',          product: 'Running Shoes Pro Edition',                items: '1 Item',  total: 'Rp 1.200.000', method: 'GoPay',             status: 'DIKIRIM',  statusColor: 'purple', payment: 'Dibayar', paymentStatus: 'success' },
  { id: '#ORD-88289', rawDate: d(2, 11, 0),  customer: 'Maya Putri',    location: 'Tangerang',       product: 'Aesthetic Wall Clock Minimalist',           items: '2 Items', total: 'Rp 475.000',   method: 'OVO',               status: 'MENUNGGU', statusColor: 'gray',   payment: 'Pending', paymentStatus: 'pending' },
  { id: '#ORD-88288', rawDate: d(3, 18, 45), customer: 'Siti Aminah',   location: 'Surabaya',        product: 'Minimalist Desk Lamp',                      items: '1 Item',  total: 'Rp 325.000',   method: 'Mandiri VA',        status: 'MENUNGGU', statusColor: 'gray',   payment: 'Pending', paymentStatus: 'pending' },
  { id: '#ORD-88287', rawDate: d(4, 14, 10), customer: 'Budi Santoso',  location: 'Bandung',         product: 'Mechanical Keyboard Blue Switch',           items: '1 Item',  total: 'Rp 1.150.000', method: 'BCA Virtual Account', status: 'DIPROSES', statusColor: 'purple', payment: 'Dibayar', paymentStatus: 'success' },
  { id: '#ORD-88286', rawDate: d(5, 10, 30), customer: 'Dewi Lestari',  location: 'Yogyakarta',      product: 'Wireless Gaming Mouse (+1 other)',          items: '2 Items', total: 'Rp 950.000',   method: 'GoPay',             status: 'DIKIRIM',  statusColor: 'purple', payment: 'Dibayar', paymentStatus: 'success' },
  { id: '#ORD-88285', rawDate: d(6, 19, 15), customer: 'Rudi Hermawan', location: 'Semarang',        product: 'Laptop Stand Aluminum',                    items: '1 Item',  total: 'Rp 210.000',   method: 'OVO',               status: 'MENUNGGU', statusColor: 'gray',   payment: 'Pending', paymentStatus: 'pending' },
  // Bulan lalu (30-45 hari lalu)
  { id: '#ORD-88270', rawDate: d(30, 10, 0), customer: 'Anita Sari',    location: 'Malang',          product: 'Noise Cancelling Earbuds',                 items: '1 Item',  total: 'Rp 1.850.000', method: 'Kartu Kredit',      status: 'SELESAI',  statusColor: 'purple', payment: 'Dibayar', paymentStatus: 'success' },
  { id: '#ORD-88265', rawDate: d(35, 15, 0), customer: 'Fajar Nugroho', location: 'Medan',           product: 'Smart Watch Series 5',                     items: '1 Item',  total: 'Rp 2.450.000', method: 'Transfer BNI',      status: 'SELESAI',  statusColor: 'purple', payment: 'Dibayar', paymentStatus: 'success' },
  { id: '#ORD-88260', rawDate: d(40, 9, 0),  customer: 'Ratna Dewi',    location: 'Makassar',        product: 'Portable Bluetooth Speaker',               items: '2 Items', total: 'Rp 680.000',   method: 'OVO',               status: 'SELESAI',  statusColor: 'purple', payment: 'Dibayar', paymentStatus: 'success' },
  { id: '#ORD-88255', rawDate: d(45, 20, 0), customer: 'Doni Pratama',  location: 'Palembang',       product: 'Ergonomic Office Chair',                   items: '1 Item',  total: 'Rp 3.200.000', method: 'Transfer BCA',      status: 'DIPROSES', statusColor: 'purple', payment: 'Dibayar', paymentStatus: 'success' },
  // 6 bulan lalu
  { id: '#ORD-87500', rawDate: d(180, 11, 0), customer: 'Lina Hartati',  location: 'Bandung',         product: 'Electric Standing Desk',                   items: '1 Item',  total: 'Rp 4.800.000', method: 'Transfer BCA',      status: 'SELESAI',  statusColor: 'purple', payment: 'Dibayar', paymentStatus: 'success' },
  // Tahun lalu
  { id: '#ORD-80100', rawDate: d(400, 10, 0), customer: 'Wahyu Santoso', location: 'Jakarta Pusat',   product: 'Gaming Headset Pro 7.1',                   items: '1 Item',  total: 'Rp 1.500.000', method: 'GoPay',             status: 'SELESAI',  statusColor: 'purple', payment: 'Dibayar', paymentStatus: 'success' },
  { id: '#ORD-80050', rawDate: d(450, 14, 0), customer: 'Sri Wahyuni',   location: 'Surabaya',        product: '4K Monitor 27 inch',                       items: '1 Item',  total: 'Rp 6.200.000', method: 'Transfer Mandiri',  status: 'SELESAI',  statusColor: 'purple', payment: 'Dibayar', paymentStatus: 'success' },
].map(o => ({ ...o, date: fmt(o.rawDate) }));

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterMode, setFilterMode] = useState(null);
  const [activeFilter, setActiveFilter] = useState('Semua Waktu');

  // Filter logic
  const filteredOrders = React.useMemo(() => {
    const now = new Date();
    if (activeFilter === 'Semua Waktu') return ORDERS;
    // Waktu
    if (activeFilter === 'Minggu Ini') {
      const weekAgo = new Date(now); weekAgo.setDate(now.getDate() - 7);
      return ORDERS.filter(o => o.rawDate >= weekAgo);
    }
    if (activeFilter.startsWith('Bulan: ')) {
      const bulanMap = { 'Januari':0,'Februari':1,'Maret':2,'April':3,'Mei':4,'Juni':5,'Juli':6,'Agustus':7,'September':8,'Oktober':9,'November':10,'Desember':11 };
      const bulanIdx = bulanMap[activeFilter.replace('Bulan: ', '')];
      return ORDERS.filter(o => o.rawDate.getMonth() === bulanIdx && o.rawDate.getFullYear() === now.getFullYear());
    }
    if (activeFilter.startsWith('Tahun: ')) {
      const tahun = parseInt(activeFilter.replace('Tahun: ', ''));
      return ORDERS.filter(o => o.rawDate.getFullYear() === tahun);
    }
    // Status
    if (activeFilter.startsWith('Status: ')) {
      const s = activeFilter.replace('Status: ', '').toUpperCase();
      return ORDERS.filter(o => o.status === s);
    }
    // Pembayaran
    if (activeFilter.startsWith('Bayar: ')) {
      const p = activeFilter.replace('Bayar: ', '');
      return ORDERS.filter(o => p === 'Dibayar' ? o.paymentStatus === 'success' : o.paymentStatus === 'pending');
    }
    return ORDERS;
  }, [activeFilter]);

  const BULAN_LIST = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
  const TAHUN_LIST = [new Date().getFullYear(), new Date().getFullYear() - 1];

  useEffect(() => {
    const shouldCollapse = selectedOrder !== null;
    window.dispatchEvent(new CustomEvent('set-sidebar-collapse', { detail: shouldCollapse }));
    
    return () => {
      window.dispatchEvent(new CustomEvent('set-sidebar-collapse', { detail: false }));
    };
  }, [selectedOrder]);

  return (
    <div className={`orders-container ${selectedOrder ? 'has-sidebar' : ''}`}>
      {/* Header */}
      <div className="orders-header">
        <div className="orders-search-box">
          <SearchIcon />
          <input type="text" className="orders-search-input" placeholder="Cari nomor pesanan atau nama customer" />
        </div>
        <div className="orders-actions">
          <button className="icon-btn-round">
            <BellIcon />
            <div className="notif-dot"></div>
          </button>
          <button className="icon-btn-round">
            <UserIcon />
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="stat-cards-row">
        {STATS.map((stat, i) => (
          <div key={i} className={`stat-box ${stat.active ? 'active' : ''}`}>
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
          <div className="orders-tabs">
            <div className="orders-tab active">Semua Pesanan</div>
            <div className="orders-tab">Menunggu</div>
            <div className="orders-tab">Dibayar</div>
            <div className="orders-tab">Diproses</div>
            <div className="orders-tab">Dikirim</div>
            <div className="orders-tab">Selesai</div>
          </div>

          <div className="orders-filters">
            <button className="filter-btn" onClick={() => { setIsFilterOpen(!isFilterOpen); setFilterMode(null); }}>
              <FilterIcon /> Filter
            </button>
            
            {activeFilter !== 'Semua Waktu' && (
              <span className="active-filter-badge" style={{ display: 'flex', alignItems: 'center' }}>
                {activeFilter} 
                <span onClick={() => setActiveFilter('Semua Waktu')} style={{ cursor: 'pointer', marginLeft: '6px', display: 'flex' }}>
                  <CloseIcon />
                </span>
              </span>
            )}

            <button className="filter-btn primary" style={{ marginLeft: 'auto' }}>
              Export CSV
            </button>

            {isFilterOpen && (
              <div className="filter-dropdown">

                {/* Level 0: Pilih Kategori */}
                {filterMode === null && (
                  <>
                    <div className="filter-menu-header">Filter berdasarkan</div>
                    <div className="filter-item" onClick={() => setFilterMode('waktu')}>
                      <span>Waktu</span> <ChevronRightIcon />
                    </div>
                    <div className="filter-item" onClick={() => setFilterMode('status')}>
                      <span>Status</span> <ChevronRightIcon />
                    </div>
                    <div className="filter-item" onClick={() => setFilterMode('pembayaran')}>
                      <span>Pembayaran</span> <ChevronRightIcon />
                    </div>
                  </>
                )}

                {/* Level 1: Waktu */}
                {filterMode === 'waktu' && (
                  <>
                    <div className="filter-menu-header">
                      <button className="btn-back" onClick={() => setFilterMode(null)}><ChevronLeftIcon /></button>
                      Pilih Waktu
                    </div>
                    <div className="filter-item" onClick={() => { setActiveFilter('Minggu Ini'); setIsFilterOpen(false); setFilterMode(null); }}>
                      Minggu Ini
                    </div>
                    <div className="filter-item" onClick={() => setFilterMode('bulan')}>
                      Bulan <ChevronRightIcon />
                    </div>
                    <div className="filter-item" onClick={() => setFilterMode('tahun')}>
                      Tahun <ChevronRightIcon />
                    </div>
                  </>
                )}

                {/* Level 2: Bulan */}
                {filterMode === 'bulan' && (
                  <>
                    <div className="filter-menu-header">
                      <button className="btn-back" onClick={() => setFilterMode('waktu')}><ChevronLeftIcon /></button>
                      Pilih Bulan
                    </div>
                    <div style={{ maxHeight: '240px', overflowY: 'auto' }}>
                      {BULAN_LIST.map(m => (
                        <div key={m} className="filter-item" onClick={() => { setActiveFilter(`Bulan: ${m}`); setIsFilterOpen(false); setFilterMode(null); }}>
                          {m}
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Level 2: Tahun */}
                {filterMode === 'tahun' && (
                  <>
                    <div className="filter-menu-header">
                      <button className="btn-back" onClick={() => setFilterMode('waktu')}><ChevronLeftIcon /></button>
                      Pilih Tahun
                    </div>
                    {TAHUN_LIST.map(y => (
                      <div key={y} className="filter-item" onClick={() => { setActiveFilter(`Tahun: ${y}`); setIsFilterOpen(false); setFilterMode(null); }}>{y}</div>
                    ))}
                  </>
                )}

                {/* Level 1: Status */}
                {filterMode === 'status' && (
                  <>
                    <div className="filter-menu-header">
                      <button className="btn-back" onClick={() => setFilterMode(null)}><ChevronLeftIcon /></button>
                      Pilih Status
                    </div>
                    {['Menunggu', 'Diproses', 'Dikirim', 'Selesai', 'Dibatalkan'].map(s => (
                      <div key={s} className="filter-item" onClick={() => { setActiveFilter(`Status: ${s}`); setIsFilterOpen(false); setFilterMode(null); }}>
                        {s}
                      </div>
                    ))}
                  </>
                )}

                {/* Level 1: Pembayaran */}
                {filterMode === 'pembayaran' && (
                  <>
                    <div className="filter-menu-header">
                      <button className="btn-back" onClick={() => setFilterMode(null)}><ChevronLeftIcon /></button>
                      Pilih Pembayaran
                    </div>
                    <div className="filter-item" onClick={() => { setActiveFilter('Bayar: Dibayar'); setIsFilterOpen(false); setFilterMode(null); }}>Dibayar</div>
                    <div className="filter-item" onClick={() => { setActiveFilter('Bayar: Pending'); setIsFilterOpen(false); setFilterMode(null); }}>Pending / Belum Dibayar</div>
                  </>
                )}

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
                {filteredOrders.map((order) => (
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
                      <span className={`badge ${order.statusColor}`}>{order.status}</span>
                    </td>
                    <td>
                      <div className={`pay-status ${order.paymentStatus}`}>
                        {order.paymentStatus === 'success' ? <CheckCircleIcon /> : <ClockIcon />}
                        {order.payment}
                      </div>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-action view" onClick={() => setSelectedOrder(order)}>
                          <EyeIcon />
                        </button>
                        <button className="btn-action edit">
                          <EditIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="orders-pagination">
            <div>Menampilkan {filteredOrders.length} dari {ORDERS.length} pesanan {activeFilter !== 'Semua Waktu' ? `(Filter: ${activeFilter})` : ''}</div>
            <div className="pagination-controls">
              <ChevronLeftIcon className="page-arrow" />
              <button className="page-btn active">1</button>
              <button className="page-btn">2</button>
              <button className="page-btn">3</button>
              <ChevronRightIcon className="page-arrow" />
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
              <button className="btn-invoice"><ReceiptIcon /> Lihat Invoice</button>
            </div>
          </div>

          {/* Timeline Pesanan */}
          <div className="side-card">
            <div className="addr-title" style={{ marginBottom: '16px' }}>Timeline Pesanan</div>
            <div className="timeline">
              <div className="tl-item">
                <div className="tl-icon"><CheckIcon /></div>
                <div className="tl-content">
                  <div className="tl-title">Pembayaran Terverifikasi</div>
                  <div className="tl-date">14 Jan 2024, 09:45</div>
                </div>
              </div>
              <div className="tl-item">
                <div className="tl-icon"><CheckIcon /></div>
                <div className="tl-content">
                  <div className="tl-title">Dikonfirmasi Admin</div>
                  <div className="tl-date">14 Jan 2024, 09:25</div>
                </div>
              </div>
              <div className="tl-item">
                <div className="tl-icon light"><CheckIcon /></div>
                <div className="tl-content">
                  <div className="tl-title" style={{ color: '#4a589f' }}>Pesanan Dibuat</div>
                  <div className="tl-date">14 Jan 2024, 09:20</div>
                </div>
              </div>
            </div>
          </div>

          {/* Ringkasan Omzet */}
          <div className="side-card dark">
            <div className="omzet-label">Ringkasan Omzet</div>
            <div className="omzet-sub">Total pesanan ini</div>
            <div className="omzet-val">{selectedOrder.total}</div>
            <button className="btn-report">Detail Laporan</button>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}

// Icons
function SearchIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>; }
function BellIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>; }
function UserIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>; }
function CalendarIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>; }
function FilterIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>; }
function ChevronLeftIcon({ className }) { return <svg width="16" height="16" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>; }
function ChevronRightIcon({ className }) { return <svg width="16" height="16" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>; }
function PrinterIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>; }
function PhoneIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>; }
function ReceiptIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>; }
function CheckIcon() { return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>; }
function CheckCircleIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>; }
function ClockIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>; }
function EyeIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>; }
function EditIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>; }
function CloseIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>; }
