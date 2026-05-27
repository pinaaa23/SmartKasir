"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Harian');

  // Realistic mock heights for active tabs: 'Harian' | 'Mingguan' | 'Bulanan'
  const chartData = {
    'Harian': [
      { b1: 60, b2: 40 },
      { b1: 100, b2: 70 },
      { b1: 80, b2: 110 },
      { b1: 150, b2: 100 },
      { b1: 130, b2: 90 },
      { b1: 170, b2: 120 },
      { b1: 90, b2: 140 }
    ],
    'Mingguan': [
      { b1: 120, b2: 90 },
      { b1: 80, b2: 60 },
      { b1: 150, b2: 110 },
      { b1: 110, b2: 140 },
      { b1: 130, b2: 80 },
      { b1: 160, b2: 120 },
      { b1: 100, b2: 130 }
    ],
    'Bulanan': [
      { b1: 90, b2: 60 },
      { b1: 130, b2: 100 },
      { b1: 110, b2: 140 },
      { b1: 170, b2: 120 },
      { b1: 150, b2: 110 },
      { b1: 120, b2: 90 },
      { b1: 160, b2: 135 }
    ]
  };

  const activeHeights = chartData[activeTab];

  return (
    <div className="dashboard-grid">
      
      {/* 1. Summary Cards (4 card horizontal) - Clickable to corresponding pages */}
      <div className="stat-cards">
        
        {/* Total Penjualan */}
        <Link href="/admin/reports" className="card stat-card" style={{ textDecoration: 'none', cursor: 'pointer' }}>
          <div className="stat-header">
            <div className="stat-icon icon-blue">
              <TotalSalesIcon />
            </div>
            <div className="stat-trend trend-up">
              <TrendUpIcon /> 12%
            </div>
          </div>
          <div className="stat-title">Total Penjualan</div>
          <div className="stat-value">Rp 124.500.000</div>
          <div className="stat-desc">HARIAN: RP 4.2JT</div>
        </Link>

        {/* Total Laba */}
        <Link href="/admin/reports" className="card stat-card" style={{ textDecoration: 'none', cursor: 'pointer' }}>
          <div className="stat-header">
            <div className="stat-icon icon-purple">
              <TotalProfitIcon />
            </div>
            <div className="stat-trend trend-up">
              <TrendUpIcon /> 8.4%
            </div>
          </div>
          <div className="stat-title">Total Laba</div>
          <div className="stat-value">Rp 42.180.000</div>
          <div className="stat-desc">HARIAN: RP 1.1JT</div>
        </Link>

        {/* Total Transaksi */}
        <Link href="/admin/transactions" className="card stat-card" style={{ textDecoration: 'none', cursor: 'pointer' }}>
          <div className="stat-header">
            <div className="stat-icon icon-indigo">
              <TotalTxIcon />
            </div>
            <div className="stat-trend trend-down">
              <TrendDownIcon /> 2.1%
            </div>
          </div>
          <div className="stat-title">Total Transaksi</div>
          <div className="stat-value">1,402</div>
          <div className="stat-desc">MINGGUAN: 312 PESANAN</div>
        </Link>

        {/* Total Pelanggan */}
        <Link href="/admin/customers" className="card stat-card" style={{ textDecoration: 'none', cursor: 'pointer' }}>
          <div className="stat-header">
            <div className="stat-icon icon-teal">
              <TotalCustIcon />
            </div>
            <div className="stat-trend trend-up">
              <TrendUpIcon /> 15%
            </div>
          </div>
          <div className="stat-title">Total Pelanggan</div>
          <div className="stat-value">5,890</div>
          <div className="stat-desc">MEMBER BARU: 42 ORANG</div>
        </Link>
      </div>

      {/* 2. Chart Section - Interactive tab filters with smooth height transition */}
      <div className="card chart-card">
        <div className="card-title">
          Analisis Penjualan & Laba
          <div style={{ display: 'flex', gap: '8px', background: '#f1f5f9', padding: '4px', borderRadius: '20px', fontSize: '12px', fontWeight: '500' }}>
            {['Harian', 'Mingguan', 'Bulanan'].map(tab => (
              <span 
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{ 
                  padding: '4px 12px', 
                  background: activeTab === tab ? 'white' : 'transparent', 
                  borderRadius: '16px', 
                  color: activeTab === tab ? '#1e293b' : '#64748b',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontWeight: activeTab === tab ? '700' : '500'
                }}
              >
                {tab}
              </span>
            ))}
          </div>
        </div>
        
        <div className="chart-placeholder">
          {activeHeights.map((bar, idx) => (
            <div key={idx} className="bar-group">
              <div className="bar-1" style={{ height: `${bar.b1}px`, transition: 'height 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}></div>
              <div className="bar-2" style={{ height: `${bar.b2}px`, transition: 'height 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}></div>
            </div>
          ))}
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-around', color: '#94a3b8', fontSize: '12px', marginTop: '12px' }}>
          <span>Sen</span><span>Sel</span><span>Rab</span><span>Kam</span><span>Jum</span><span style={{ color: '#4a589f', fontWeight: '600' }}>Sab</span><span>Min</span>
        </div>
      </div>

      {/* 3. Stock Warning - Clickable button to '/admin/products' */}
      <div className="card stock-card">
        <div className="card-title">
          Stok Menipis
          <span className="stock-badge">5 Produk</span>
        </div>
        
        <div className="stock-list">
          <div className="stock-item" style={{ transition: 'all 0.2s ease' }}>
            <div className="stock-item-icon"><ItemHangerIcon /></div>
            <div className="stock-item-info">
              <div className="stock-item-name">Kaos Polos Premium L</div>
              <div className="stock-item-left">Tersisa: 2 unit</div>
            </div>
            <div className="stock-item-add" onClick={() => router.push('/admin/products')}><AddIcon /></div>
          </div>
          
          <div className="stock-item" style={{ transition: 'all 0.2s ease' }}>
            <div className="stock-item-icon"><ItemBottleIcon /></div>
            <div className="stock-item-info">
              <div className="stock-item-name">Air Mineral 600ml</div>
              <div className="stock-item-left">Tersisa: 8 unit</div>
            </div>
            <div className="stock-item-add" onClick={() => router.push('/admin/products')}><AddIcon /></div>
          </div>
          
          <div className="stock-item" style={{ transition: 'all 0.2s ease' }}>
            <div className="stock-item-icon"><ItemCableIcon /></div>
            <div className="stock-item-info">
              <div className="stock-item-name">Charger Type-C Fast</div>
              <div className="stock-item-left">Tersisa: 1 unit</div>
            </div>
            <div className="stock-item-add" onClick={() => router.push('/admin/products')}><AddIcon /></div>
          </div>
        </div>

        <Link href="/admin/products" style={{ textDecoration: 'none', display: 'block' }}>
          <button className="btn-outline" style={{ transition: 'all 0.2s ease' }}>Lihat Semua Stok</button>
        </Link>
      </div>

      {/* 6. Produk Terlaris - Interactive list linked to details / products list */}
      <div className="card middle-card">
        <div className="card-title">Produk Terlaris</div>
        
        <div className="product-list">
          <div 
            className="product-item" 
            onClick={() => router.push('/admin/products')}
            style={{ cursor: 'pointer', padding: '6px', borderRadius: '10px', transition: 'all 0.2s ease' }}
          >
            <div className="product-rank">1</div>
            <div className="product-img" style={{ background: '#eef2ff' }}></div>
            <div className="product-info">
              <div className="product-name">Nike Air Zoom</div>
              <div className="product-cat">Sepatu & Olahraga</div>
            </div>
            <div className="product-sales">
              <div className="product-count">422</div>
              <div className="product-growth">+12%</div>
            </div>
          </div>
          
          <div 
            className="product-item" 
            onClick={() => router.push('/admin/products')}
            style={{ cursor: 'pointer', padding: '6px', borderRadius: '10px', transition: 'all 0.2s ease' }}
          >
            <div className="product-rank">2</div>
            <div className="product-img" style={{ background: '#f5f3ff' }}></div>
            <div className="product-info">
              <div className="product-name">Headset Sony WH</div>
              <div className="product-cat">Elektronik</div>
            </div>
            <div className="product-sales">
              <div className="product-count">318</div>
              <div className="product-growth">+8%</div>
            </div>
          </div>
        </div>
      </div>

      {/* 7. Penjualan Online vs Offline (Donut Chart) - Clickable to '/admin/reports' */}
      <div 
        className="card middle-card" 
        onClick={() => router.push('/admin/reports')}
        style={{ cursor: 'pointer', transition: 'all 0.25s ease' }}
      >
        <div className="card-title">Penjualan Online vs Offline</div>
        
        <div className="donut-chart" style={{ transition: 'transform 0.3s ease' }}>
          <div className="donut-circle">
            <div className="donut-val">1,402</div>
            <div className="donut-label">TOTAL ORDER</div>
          </div>
        </div>
        
        <div className="donut-legend">
          <div className="legend-item">
            <div><span className="legend-dot dot-online"></span>Online Orders</div>
            <div><span className="legend-pct">65%</span> (911)</div>
          </div>
          <div className="legend-item">
            <div><span className="legend-dot dot-offline"></span>Offline Orders</div>
            <div><span className="legend-pct">35%</span> (491)</div>
          </div>
        </div>
      </div>

      {/* 4. Status Pesanan Navigation - Interactive status boxes redirecting to orders page */}
      <div className="card middle-card">
        <div className="card-title">Status Pesanan</div>
        
        <div className="status-grid">
          {/* Menunggu Bayar */}
          <Link href="/admin/orders?status=pending" className="status-box bg-blue-light" style={{ textDecoration: 'none', transition: 'all 0.2s ease' }}>
            <div className="status-label">MENUNGGU BAYAR</div>
            <div className="status-val">24</div>
            <div className="icon"><WalletIcon /></div>
          </Link>
          
          {/* Sudah Bayar */}
          <Link href="/admin/orders?status=sudah_bayar" className="status-box bg-purple-light" style={{ textDecoration: 'none', transition: 'all 0.2s ease' }}>
            <div className="status-label">SUDAH BAYAR</div>
            <div className="status-val">15</div>
            <div className="icon"><MoneyIcon /></div>
          </Link>
          
          {/* Diproses */}
          <Link href="/admin/orders?status=diproses" className="status-box bg-indigo-light" style={{ textDecoration: 'none', transition: 'all 0.2s ease' }}>
            <div className="status-label">DIPROSES</div>
            <div className="status-val">8</div>
            <div className="icon"><ProcessIcon /></div>
          </Link>
          
          {/* Selesai */}
          <Link href="/admin/orders?status=selesai" className="status-box bg-blue-light" style={{ textDecoration: 'none', background: '#f8fafc', border: '1px solid #e2e8f0', transition: 'all 0.2s ease' }}>
            <div className="status-label">SELESAI</div>
            <div className="status-val">142</div>
            <div className="icon"><CheckIcon /></div>
          </Link>
          
          {/* Dibatalkan */}
          <Link href="/admin/orders?status=batal" className="status-box bg-red-light" style={{ textDecoration: 'none', gridColumn: 'span 2', transition: 'all 0.2s ease' }}>
            <div className="status-label" style={{ color: '#ef4444' }}>DIBATALKAN</div>
            <div className="status-val" style={{ color: '#ef4444' }}>3</div>
            <div className="icon" style={{ color: '#ef4444' }}><CancelIcon /></div>
          </Link>
        </div>
      </div>

      {/* 5. Tabel "Transaksi Terbaru" - Clickable table rows & 'Lihat Semua' button */}
      <div className="card tx-card">
        <div className="card-title" style={{ marginBottom: 0 }}>
          Transaksi Terbaru
          <Link href="/admin/transactions" style={{ fontSize: '13px', color: '#4a589f', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}>
            Lihat Semua <ArrowRightIcon />
          </Link>
        </div>
        
        <div style={{ overflowX: 'auto', marginTop: '16px' }}>
          <table className="tx-table">
            <thead>
              <tr>
                <th>ID TRANSAKSI</th>
                <th>PELANGGAN</th>
                <th>TIPE</th>
                <th>PEMBAYARAN</th>
                <th>TOTAL</th>
                <th>STATUS</th>
                <th>TANGGAL</th>
              </tr>
            </thead>
            <tbody>
              <tr onClick={() => router.push('/admin/transactions')} style={{ cursor: 'pointer' }}>
                <td style={{ fontWeight: '600', color: '#4a589f' }}>#TRX-9921</td>
                <td>
                  <div className="tx-user">
                    <div className="tx-avatar">AS</div>
                    <span style={{ fontWeight: '600' }}>Andi Saputra</span>
                  </div>
                </td>
                <td style={{ color: '#64748b' }}><ShopIcon /> Offline</td>
                <td style={{ fontWeight: '600', color: '#2b3674' }}>QRIS - BCA</td>
                <td style={{ fontWeight: '700' }}>Rp 450.000</td>
                <td><span className="tx-status status-success">Berhasil</span></td>
                <td style={{ color: '#64748b' }}>12:45 WIB</td>
              </tr>
              <tr onClick={() => router.push('/admin/transactions')} style={{ cursor: 'pointer' }}>
                <td style={{ fontWeight: '600', color: '#4a589f' }}>#TRX-9920</td>
                <td>
                  <div className="tx-user">
                    <div className="tx-avatar" style={{ background: '#e9d5ff', color: '#a855f7' }}>BM</div>
                    <span style={{ fontWeight: '600' }}>Budi Mulya</span>
                  </div>
                </td>
                <td style={{ color: '#64748b' }}><GlobeIcon /> Online</td>
                <td style={{ fontWeight: '600', color: '#2b3674' }}>Bank Transfer</td>
                <td style={{ fontWeight: '700' }}>Rp 1.250.000</td>
                <td><span className="tx-status status-success">Berhasil</span></td>
                <td style={{ color: '#64748b' }}>11:30 WIB</td>
              </tr>
              <tr onClick={() => router.push('/admin/transactions')} style={{ cursor: 'pointer' }}>
                <td style={{ fontWeight: '600', color: '#4a589f' }}>#TRX-9919</td>
                <td>
                  <div className="tx-user">
                    <div className="tx-avatar" style={{ background: '#f1f5f9', color: '#64748b' }}>A</div>
                    <span style={{ fontWeight: '600' }}>Anonim</span>
                  </div>
                </td>
                <td style={{ color: '#64748b' }}><ShopIcon /> Offline</td>
                <td style={{ fontWeight: '600', color: '#2b3674' }}>Tunai</td>
                <td style={{ fontWeight: '700' }}>Rp 85.000</td>
                <td><span className="tx-status status-failed">Gagal</span></td>
                <td style={{ color: '#64748b' }}>10:15 WIB</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

// Icons
function TotalSalesIcon() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M7 15h0M2 9.5h20"/></svg>; }
function TotalProfitIcon() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 5c-1.5 0-2.8 1.4-3 3-1.5-.5-3.3-.5-4.8 0-.2-1.6-1.5-3-3-3-1.7 0-3 1.3-3 3v13h15V8c0-1.7-1.3-3-3-3zM9 13h4M11 11v4"/></svg>; }
function TotalTxIcon() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>; }
function TotalCustIcon() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>; }
function TrendUpIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>; }
function TrendDownIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/></svg>; }
function ItemHangerIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 4.2V8m0 0l-7.7 5.6C3.5 14.1 3 15.1 3 16.2V17h18v-.8c0-1.1-.5-2.1-1.3-2.6L12 8zm0 -3.8A1.8 1.8 0 0 1 13.8 6H10a1.8 1.8 0 0 1 1.8-1.8z"/></svg>; }
function ItemBottleIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="7" y="10" width="10" height="12" rx="2"/><path d="M8 6h8v4H8zM10 2h4v4h-4z"/></svg>; }
function ItemCableIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="8" width="16" height="8" rx="2"/><path d="M8 8V6a2 2 0 1 1 4 0v2M12 16v2a2 2 0 1 0 4 0v-2"/></svg>; }
function AddIcon() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>; }
function WalletIcon() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>; }
function MoneyIcon() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>; }
function ProcessIcon() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12a10 10 0 1 0 10-10"/><path d="M12 8v4l3 3"/></svg>; }
function CheckIcon() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>; }
function CancelIcon() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>; }
function ArrowRightIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>; }
function ShopIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>; }
function GlobeIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>; }
