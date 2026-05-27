"use client";
import React, { useState, useEffect } from 'react';

const MOCK_PRODUCTS = [
  { id: 1, name: 'Premium Wireless Headphones', category: 'Elektronik', price: 'Rp 4.299.000', stock: 12, isNew: true, grad: 'grad-purple', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80' },
  { id: 2, name: 'Stellar Minimalist Watch', category: 'Aksesoris', price: 'Rp 2.150.000', stock: 8, isNew: false, grad: 'grad-dark', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80' },
  { id: 3, name: 'Insta-Capture Pro', category: 'Fotografi', price: 'Rp 1.890.000', stock: 2, isNew: false, grad: 'grad-teal', img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80' },
  { id: 4, name: 'Nebula Sport Shoes', category: 'Fashion', price: 'Rp 1.250.000', stock: 24, isNew: false, grad: 'grad-blue', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80' },
  { id: 5, name: 'Cosmic Lens Shades', category: 'Aksesoris', price: 'Rp 750.000', stock: 5, isNew: false, grad: 'grad-orange', img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80' },
  { id: 6, name: 'Orbital Mechanical Keyboard', category: 'Elektronik', price: 'Rp 1.450.000', stock: 15, isNew: false, grad: 'grad-pink', img: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&q=80' },
];

const MOCK_POPULAR = [
  { id: 1, name: 'Galaxy Buds Pro White', sales: 'Terjual: 450+ bulan ini', price: 'Rp 2.999.000', grad: 'grad-dark', img: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80' },
  { id: 2, name: 'Ultrawide 4K Monitor', sales: 'Terjual: 120+ bulan ini', price: 'Rp 6.450.000', grad: 'grad-teal', img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80' },
  { id: 3, name: 'Starlight Pad 12"', sales: 'Terjual: 310+ bulan ini', price: 'Rp 8.700.000', grad: 'grad-purple', img: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&q=80' },
];

export default function PosPage() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  useEffect(() => {
    const shouldCollapse = cart.length > 0;
    window.dispatchEvent(new CustomEvent('set-sidebar-collapse', { detail: shouldCollapse }));
    
    // Ensure sidebar expands if component unmounts
    return () => {
      window.dispatchEvent(new CustomEvent('set-sidebar-collapse', { detail: false }));
    };
  }, [cart.length]);

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, qty: item.qty + delta };
      }
      return item;
    }).filter(item => item.qty > 0));
  };

  const clearCart = () => setCart([]);

  const parsePrice = (priceStr) => parseInt(priceStr.replace(/[^0-9]/g, ''), 10);
  const formatRp = (num) => 'Rp ' + num.toLocaleString('id-ID');

  const subtotal = cart.reduce((sum, item) => sum + (parsePrice(item.price) * item.qty), 0);
  const tax = Math.floor(subtotal * 0.11);
  const total = subtotal + tax;

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className={`pos-layout-wrapper ${cart.length > 0 ? 'has-sidebar' : ''}`}>
      <div className="pos-main-content">
        <div className="pos-container">
          {/* Header Row */}
          <div className="pos-header-row">
            <div className="pos-search-wrapper">
              <SearchIcon />
              <input type="text" className="pos-search-input" placeholder="Cari produk atau barcode..." />
            </div>
            <button className="btn-scan">
              <ScanIcon /> Scan Barcode
            </button>
            <button className="pos-icon-btn">
              <BellIcon />
              <div className="bell-dot"></div>
            </button>
            <button className="pos-icon-btn">
              <SettingsIcon />
            </button>
          </div>

          {/* Category Pills */}
          <div className="category-scroll">
            <button className="cat-pill active">Semua</button>
            <button className="cat-pill inactive">Elektronik</button>
            <button className="cat-pill inactive">Fashion</button>
            <button className="cat-pill inactive">Kecantikan</button>
            <button className="cat-pill inactive">Rumah Tangga</button>
            <button className="cat-pill inactive">Hobi</button>
          </div>

          {/* Catalog Grid */}
          <div>
            <div className="pos-section-header">
              <div className="pos-section-title">Katalog Produk</div>
              <div className="view-toggles">
                <button className="view-btn active"><GridIcon /></button>
                <button className="view-btn"><ListIcon /></button>
              </div>
            </div>
            
            <div className="pos-grid">
              {MOCK_PRODUCTS.map((p) => (
                <div key={p.id} className="pos-card">
                  <div className={`pos-card-img ${p.grad}`} style={{ backgroundImage: `url(${p.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    {!p.img && <span className="product-initial">{p.name.charAt(0)}</span>}
                    {p.isNew && <span className="pos-badge">BARU</span>}
                  </div>
                  <div className="pos-card-body">
                    <div className="pos-card-title">{p.name}</div>
                    <div className="pos-card-cat">{p.category}</div>
                    <div className="pos-card-price">{p.price}</div>
                    <div className="pos-card-stock">Stok: {p.stock} unit</div>
                    <button className="pos-add-btn" onClick={() => addToCart(p)}>
                      <PlusIcon />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Products */}
          <div>
            <div className="pos-section-header">
              <div className="pos-section-title">
                <SparklesIcon /> Produk Populer
              </div>
              <a href="#" className="link-all">Lihat Semua</a>
            </div>
            
            <div className="popular-scroll">
              {MOCK_POPULAR.map((p) => (
                <div key={p.id} className="popular-card" onClick={() => addToCart(p)}>
                  <div className={`popular-img ${p.grad}`} style={{ backgroundImage: `url(${p.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    {!p.img && <span className="product-initial" style={{ fontSize: '24px' }}>{p.name.charAt(0)}</span>}
                  </div>
                  <div className="popular-info">
                    <div className="popular-title">{p.name}</div>
                    <div className="popular-sales">{p.sales}</div>
                    <div className="popular-price">{p.price}</div>
                  </div>
                  <ChevronRightIcon />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Conditional Checkout Sidebar */}
      {cart.length > 0 ? (
        <div className="pos-checkout-sidebar">
          <div className="checkout-header">
            <div className="checkout-title">Detail Pesanan</div>
            <button className="btn-clear" onClick={clearCart}>Bersihkan</button>
          </div>

          <div className="checkout-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-img" style={{ backgroundImage: `url(${item.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                  {!item.img && <span className="product-initial">{item.name.charAt(0)}</span>}
                </div>
                <div className="cart-item-details">
                  <div className="cart-item-title">{item.name}</div>
                  <div className="cart-item-price">{item.price}</div>
                  <div className="cart-item-controls">
                    <button className="qty-btn" onClick={() => updateQty(item.id, -1)}><MinusIcon /></button>
                    <span className="qty-val">{item.qty}</span>
                    <button className="qty-btn" onClick={() => updateQty(item.id, 1)}><PlusIcon /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="checkout-summary">
            <div className="summary-row">
              <span className="summary-label">Subtotal</span>
              <span className="summary-value">{formatRp(subtotal)}</span>
            </div>
            <div className="summary-row text-red">
              <span className="summary-label">Diskon (0%)</span>
              <span className="summary-value">-Rp 0</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Pajak (11%)</span>
              <span className="summary-value">{formatRp(tax)}</span>
            </div>
            
            <div className="summary-total-row">
              <span className="total-label">Total Pembayaran</span>
              <span className="total-value">{formatRp(total)}</span>
            </div>
          </div>

          <div className="checkout-methods">
            <div className="method-label">METODE PEMBAYARAN</div>
            <div className="method-grid">
              <button className="method-btn active">
                <CashIcon /> Tunai
              </button>
              <button className="method-btn">
                <QrisIcon /> QRIS
              </button>
              <button className="method-btn">
                <CardIcon /> Kartu
              </button>
            </div>
          </div>

          <div className="checkout-actions">
            <button className="btn-print"><PrintIcon /> Struk</button>
            <button className="btn-pay" onClick={clearCart}>Bayar <ArrowRightIcon /></button>
          </div>
        </div>
      ) : (
        <button className="pos-floating-cart">
          <CartIcon />
          <span className="cart-badge">{totalItems}</span>
        </button>
      )}
    </div>
  );
}

// Minimal Icons
function SearchIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>; }
function ScanIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7V4h3"/><path d="M4 17v3h3"/><path d="M20 17v3h-3"/><path d="M20 7V4h-3"/><rect x="8" y="4" width="8" height="16" rx="1"/></svg>; }
function BellIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>; }
function SettingsIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>; }
function GridIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>; }
function ListIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>; }
function PlusIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>; }
function MinusIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/></svg>; }
function SparklesIcon() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3v18"/><path d="M3 12h18"/><path d="m18 6-12 12"/><path d="m6 6 12 12"/></svg>; }
function ChevronRightIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="popular-arrow"><polyline points="9 18 15 12 9 6"/></svg>; }
function CashIcon() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>; }
function QrisIcon() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>; }
function CardIcon() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>; }
function PrintIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>; }
function ArrowRightIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>; }
function CartIcon() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>; }
