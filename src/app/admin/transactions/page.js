"use client";
import React, { useState } from 'react';
import '../../../styles/transactions.css';

const today = new Date();
const d = (offset, h = 10, m = 0) => { const dt = new Date(today); dt.setDate(dt.getDate() - offset); dt.setHours(h, m, 0, 0); return dt; };
const fmtDate = (dt) => dt.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

const TRANSACTIONS = [
  { id: '#TRX-98241', orderId: 'ORD-2241', customer: 'Budi Santoso', email: 'budi@email.com', tipe: 'online', metode: 'Mandiri VA', total: 'Rp 1.250.000', totalNum: 1250000, status: 'berhasil', rawDate: d(0, 14, 20), tier: 'Gold Member', points: '+471 Pts', items: [{ name: 'Nike Air Max Red', sku: 'SHO-061-R0', qty: 1, price: 'Rp 1.100.000', total: 'Rp 1.100.000' }, { name: 'Kaos Kaki Olahraga', sku: 'ACC-011-WH', qty: 2, price: 'Rp 75.000', total: 'Rp 150.000' }], subtotal: 'Rp 1.250.000', tax: 'Rp 137.500' },
  { id: '#TRX-98240', orderId: '-', customer: 'Ani Wijaya', email: 'ani.wijaya@email.com', tipe: 'offline', metode: 'Tunai', total: 'Rp 425.000', totalNum: 425000, status: 'berhasil', rawDate: d(0, 13, 45), tier: 'Gold Member', points: '+471 Pts', items: [{ name: 'Nike Air Max Red', sku: 'SHO-061-R0', qty: 1, price: 'Rp 350.000', total: 'Rp 350.000' }, { name: 'Watch Minimalist Silver', sku: 'ACC-022-SV', qty: 1, price: 'Rp 75.000', total: 'Rp 75.000' }], subtotal: 'Rp 425.000', tax: 'Rp 46.750' },
  { id: '#TRX-98239', orderId: 'ORD-2238', customer: 'Citra Lestari', email: 'citra@email.com', tipe: 'online', metode: 'OVO', total: 'Rp 89.000', totalNum: 89000, status: 'refund', rawDate: d(0, 12, 10), tier: 'Silver Member', points: '-89 Pts', items: [{ name: 'Phone Case Premium', sku: 'ACC-033-BK', qty: 1, price: 'Rp 89.000', total: 'Rp 89.000' }], subtotal: 'Rp 89.000', tax: 'Rp 9.790' },
  { id: '#TRX-98237', orderId: '-', customer: 'Doni Firmansyah', email: 'doni@email.com', tipe: 'offline', metode: 'GoPay', total: 'Rp 780.000', totalNum: 780000, status: 'berhasil', rawDate: d(1, 10, 0), tier: 'Bronze Member', points: '+156 Pts', items: [{ name: 'Sepatu Casual Pria', sku: 'SHO-077-BK', qty: 1, price: 'Rp 780.000', total: 'Rp 780.000' }], subtotal: 'Rp 780.000', tax: 'Rp 85.800' },
  { id: '#TRX-98235', orderId: 'ORD-2235', customer: 'Rina Pratiwi', email: 'rina@email.com', tipe: 'online', metode: 'BCA VA', total: 'Rp 2.100.000', totalNum: 2100000, status: 'pending', rawDate: d(1, 9, 30), tier: 'Gold Member', points: 'Pending', items: [{ name: 'Smartwatch Series 6', sku: 'ELC-055-BL', qty: 1, price: 'Rp 2.100.000', total: 'Rp 2.100.000' }], subtotal: 'Rp 2.100.000', tax: 'Rp 231.000' },
  { id: '#TRX-98230', orderId: 'ORD-2230', customer: 'Fajar Nugraha', email: 'fajar@email.com', tipe: 'online', metode: 'Transfer BNI', total: 'Rp 450.000', totalNum: 450000, status: 'berhasil', rawDate: d(2, 15, 20), tier: 'Bronze Member', points: '+90 Pts', items: [{ name: 'Tas Ransel Laptop', sku: 'BAG-022-GR', qty: 1, price: 'Rp 450.000', total: 'Rp 450.000' }], subtotal: 'Rp 450.000', tax: 'Rp 49.500' },
];

const STATS = [
  { label: 'Total Transaksi', value: '1,248', icon: <BarIcon />, iconClass: 'blue' },
  { label: 'Online', value: '742', icon: <GlobeIcon />, iconClass: 'indigo' },
  { label: 'Offline', value: '506', icon: <ShopIcon />, iconClass: 'slate' },
  { label: 'Pendapatan', value: 'Rp 24.8M', icon: <MoneyIcon />, iconClass: 'green' },
  { label: 'Refund', value: '12', icon: <RefundIcon />, iconClass: 'red' },
];

const TABS = ['Semua Transaksi', 'Online', 'Offline', 'Berhasil', 'Pending', 'Refund'];

export default function TransactionsPage() {
  const [activeTab, setActiveTab] = useState('Semua Transaksi');
  const [selectedTrx, setSelectedTrx] = useState(null);
  const [search, setSearch] = useState('');

  const filtered = TRANSACTIONS.filter(t => {
    const matchTab =
      activeTab === 'Semua Transaksi' ? true :
      activeTab === 'Online'   ? t.tipe === 'online' :
      activeTab === 'Offline'  ? t.tipe === 'offline' :
      activeTab === 'Berhasil' ? t.status === 'berhasil' :
      activeTab === 'Pending'  ? t.status === 'pending' :
      activeTab === 'Refund'   ? t.status === 'refund' : true;
    const matchSearch = search === '' || t.customer.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const handleRowClick = (t) => setSelectedTrx(prev => prev?.id === t.id ? null : t);

  return (
    <div className="trx-container">
      {/* Header */}
      <div className="trx-header">
        <div className="trx-search-box">
          <SearchIcon />
          <input className="trx-search-input" placeholder="Cari ID Transaksi..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="trx-header-right">
          <button className="icon-btn-round" style={{ position: 'relative' }}>
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

      {/* Stat Cards */}
      <div className="trx-stat-row">
        {STATS.map((s, i) => (
          <div key={i} className="trx-stat-card">
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
        {/* Tabs + Export */}
        <div className="trx-tabs-row">
          <div className="trx-tabs">
            {TABS.map(tab => (
              <div key={tab} className={`trx-tab ${activeTab === tab ? 'active' : ''}`} onClick={() => { setActiveTab(tab); setSelectedTrx(null); }}>
                {tab}
              </div>
            ))}
          </div>
          <button className="btn-export"><DownloadIcon /> Ekspor CSV</button>
        </div>

        {/* Filter Bar */}
        <div className="trx-filter-bar">
          <div className="trx-filter-search">
            <SearchSmIcon />
            <input placeholder="Cari nama customer atau ID..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <button className="trx-filter-select"><CalendarIcon /> 7 Hari Terakhir <ChevronDownIcon /></button>
          <button className="trx-filter-select"><CardIcon /> Semua Pembayaran <ChevronDownIcon /></button>
        </div>

        {/* Table */}
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
              </tr>
            </thead>
            <tbody>
              {filtered.map(t => (
                <tr key={t.id} className={selectedTrx?.id === t.id ? 'trx-active' : ''} onClick={() => handleRowClick(t)}>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="trx-pagination">
          <div>Menampilkan {filtered.length} dari {TRANSACTIONS.length} transaksi</div>
          <div className="trx-page-controls">
            <ChevronLeftIcon className="trx-page-arrow" />
            <button className="trx-page-btn active">1</button>
            <button className="trx-page-btn">2</button>
            <button className="trx-page-btn">3</button>
            <ChevronRightIcon className="trx-page-arrow" />
          </div>
        </div>

        {/* Detail Panel — appears when row clicked */}
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
                  <button className="btn-print"><PrinterIcon /> Cetak Invoice</button>
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
                  <span className="badge-gold">Gold Member</span>
                </div>
                <div className="trx-cust-row">
                  <span className="trx-cust-row-label">Poin Didapat</span>
                  <span className="trx-points">{selectedTrx.points}</span>
                </div>
              </div>

              <div className="trx-bukti-card">
                <div className="trx-bukti-header">
                  <span className="trx-bukti-title">Bukti Bayar</span>
                  <span className="badge-verified">VERIFIED</span>
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
    </div>
  );
}

// Icons
function SearchIcon()    { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>; }
function SearchSmIcon()  { return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>; }
function BellIcon()      { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>; }
function BarIcon()       { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="18" y="3" width="4" height="18"/><rect x="10" y="8" width="4" height="13"/><rect x="2" y="13" width="4" height="8"/></svg>; }
function GlobeIcon()     { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>; }
function ShopIcon()      { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l1-5h16l1 5"/><path d="M3 9h18v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9z"/><path d="M9 21V12h6v9"/></svg>; }
function MoneyIcon()     { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v12M9 9h4.5a1.5 1.5 0 0 1 0 3H10a1.5 1.5 0 0 0 0 3H15"/></svg>; }
function RefundIcon()    { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.5"/></svg>; }
function DownloadIcon()  { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>; }
function CalendarIcon()  { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>; }
function CardIcon()      { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>; }
function ChevronDownIcon(){ return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>; }
function ChevronLeftIcon({ className }){ return <svg width="14" height="14" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>; }
function ChevronRightIcon({ className }){ return <svg width="14" height="14" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>; }
function GlobeSmIcon()   { return <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>; }
function ShopSmIcon()    { return <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l1-5h16l1 5"/><path d="M3 9h18v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9z"/></svg>; }
function PrinterIcon()   { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>; }
function CloseIcon()     { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>; }
function UserIcon()      { return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>; }
function BoxIcon()       { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>; }
function ReceiptIcon()   { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>; }
