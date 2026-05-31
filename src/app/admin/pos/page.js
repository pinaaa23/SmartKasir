"use client";

import React, { useState, useEffect, useMemo } from 'react';

// Unified products data with categories: Elektronik, Fashion, Kecantikan, Rumah Tangga, Hobi
const MOCK_PRODUCTS = [
  { 
    id: 1, 
    name: 'Premium Wireless Headphones', 
    category: 'Elektronik', 
    price: 'Rp 4.299.000', 
    stock: 12, 
    isNew: true, 
    grad: 'grad-purple', 
    img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    barcode: '899276100123',
    sku: 'EL-HD01'
  },
  { 
    id: 2, 
    name: 'Stellar Minimalist Watch', 
    category: 'Fashion', 
    price: 'Rp 2.150.000', 
    stock: 8, 
    isNew: false, 
    grad: 'grad-dark', 
    img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
    barcode: '899276100555',
    sku: 'FA-WA02'
  },
  { 
    id: 3, 
    name: 'Aloe Vera Soothing Gel', 
    category: 'Kecantikan', 
    price: 'Rp 85.000', 
    stock: 50, 
    isNew: true, 
    grad: 'grad-teal', 
    img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&q=80',
    barcode: '899276102154',
    sku: 'KE-AV03'
  },
  { 
    id: 4, 
    name: 'Nebula Sport Shoes', 
    category: 'Fashion', 
    price: 'Rp 1.250.000', 
    stock: 24, 
    isNew: false, 
    grad: 'grad-blue', 
    img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80',
    barcode: '899276100999',
    sku: 'FA-SH04'
  },
  { 
    id: 5, 
    name: 'Minimalist Table Lamp', 
    category: 'Rumah Tangga', 
    price: 'Rp 320.000', 
    stock: 15, 
    isNew: false, 
    grad: 'grad-orange', 
    img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80',
    barcode: '899276103301',
    sku: 'RT-TL05'
  },
  { 
    id: 6, 
    name: 'Orbital Mechanical Keyboard', 
    category: 'Elektronik', 
    price: 'Rp 1.450.000', 
    stock: 15, 
    isNew: false, 
    grad: 'grad-pink', 
    img: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&q=80',
    barcode: '899276101224',
    sku: 'EL-KB06'
  },
  { 
    id: 7, 
    name: 'Premium Acrylic Paint Set', 
    category: 'Hobi', 
    price: 'Rp 245.000', 
    stock: 10, 
    isNew: false, 
    grad: 'grad-purple', 
    img: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&q=80',
    barcode: '899276101550',
    sku: 'HB-AP07'
  },
  { 
    id: 8, 
    name: 'Ceramic Tea Set', 
    category: 'Rumah Tangga', 
    price: 'Rp 580.000', 
    stock: 6, 
    isNew: true, 
    grad: 'grad-teal', 
    img: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500&q=80',
    barcode: '899276100990',
    sku: 'RT-TS08'
  }
];

const MOCK_POPULAR = [
  { id: 1, name: 'Premium Wireless Headphones', sales: 'Terjual: 450+ bulan ini', price: 'Rp 4.299.000', grad: 'grad-purple', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80' },
  { id: 4, name: 'Nebula Sport Shoes', sales: 'Terjual: 310+ bulan ini', price: 'Rp 1.250.000', grad: 'grad-blue', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80' },
  { id: 6, name: 'Orbital Mechanical Keyboard', sales: 'Terjual: 120+ bulan ini', price: 'Rp 1.450.000', grad: 'grad-pink', img: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&q=80' },
];

const CATEGORIES = ['Semua', 'Elektronik', 'Fashion', 'Kecantikan', 'Rumah Tangga', 'Hobi'];

export default function PosPage() {
  // --- CORE STATE ---
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Tunai'); // 'Tunai' | 'QRIS' | 'Kartu'

  // --- MODAL TRIGGER STATE ---
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showCashModal, setShowCashModal] = useState(false);
  const [showQrisModal, setShowQrisModal] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [showBarcodeModal, setShowBarcodeModal] = useState(false);

  // --- SUB-PAYMENT STATES ---
  // Cash
  const [cashPaid, setCashPaid] = useState('');
  const [cashWarning, setCashWarning] = useState('');
  
  // QRIS
  const [qrisStatus, setQrisStatus] = useState('waiting'); // 'waiting' | 'success'
  const [qrisCountdown, setQrisCountdown] = useState(300); // 5 mins
  const [qrisTxId, setQrisTxId] = useState('');

  // Card
  const [cardRefNo, setCardRefNo] = useState('');
  const [cardBank, setCardBank] = useState('Mandiri');
  const [cardStatus, setCardStatus] = useState('idle'); // 'idle' | 'processing' | 'success'

  // Barcode Scan
  const [barcodeInput, setBarcodeInput] = useState('');

  // Receipt / Last Transaction Data
  const [lastTransaction, setLastTransaction] = useState(null);

  // Toast Notification
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Sidebar collapse effect
  useEffect(() => {
    const shouldCollapse = cart.length > 0;
    window.dispatchEvent(new CustomEvent('set-sidebar-collapse', { detail: shouldCollapse }));
    return () => {
      window.dispatchEvent(new CustomEvent('set-sidebar-collapse', { detail: false }));
    };
  }, [cart.length]);

  // QRIS simulation success trigger & countdown timer
  useEffect(() => {
    let qrisTimeout;
    let countdownInterval;

    if (showQrisModal && qrisStatus === 'waiting') {
      // 3-second simulation to success
      qrisTimeout = setTimeout(() => {
        setQrisStatus('success');
        showToast('Transaksi berhasil diselesaikan');
        
        // Finalize transaction records
        const txId = qrisTxId;
        const currentReceipt = {
          id: txId,
          date: new Date().toLocaleString('id-ID'),
          items: [...cart],
          subtotal: subtotal,
          tax: tax,
          total: total,
          paymentMethod: 'QRIS'
        };
        setLastTransaction(currentReceipt);
        
        // Subtract stock
        subtractStock();
      }, 3000);

      // Countdown interval
      countdownInterval = setInterval(() => {
        setQrisCountdown(prev => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      clearTimeout(qrisTimeout);
      clearInterval(countdownInterval);
    };
  }, [showQrisModal, qrisStatus]);

  // Stock deduction helper
  const subtractStock = () => {
    setProducts(prevProducts => {
      return prevProducts.map(p => {
        const cartItem = cart.find(c => c.id === p.id);
        if (cartItem) {
          return { ...p, stock: Math.max(0, p.stock - cartItem.qty) };
        }
        return p;
      });
    });
  };

  // Subtotal Calculation helpers
  const parsePrice = (priceStr) => parseInt(priceStr.replace(/[^0-9]/g, ''), 10);
  const formatRp = (num) => 'Rp ' + num.toLocaleString('id-ID');

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + (parsePrice(item.price) * item.qty), 0);
  }, [cart]);

  const tax = useMemo(() => Math.floor(subtotal * 0.11), [subtotal]);
  const total = useMemo(() => subtotal + tax, [subtotal, tax]);
  const totalItems = useMemo(() => cart.reduce((sum, item) => sum + item.qty, 0), [cart]);

  // --- ACTIONS ---

  // Add Item to Cart
  const addToCart = (product) => {
    // Find current product in MOCK catalog to ensure we read correct latest stock
    const catalogProduct = products.find(p => p.id === product.id) || product;
    
    if (catalogProduct.stock === 0) {
      showToast('Stok produk habis!', 'error');
      return;
    }

    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      
      if (existing) {
        if (existing.qty >= catalogProduct.stock) {
          showToast('Batas maksimum stok produk tercapai!', 'error');
          return prev;
        }
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      
      return [...prev, { ...catalogProduct, qty: 1 }];
    });
  };

  // Adjust Qty in Cart
  const updateQty = (id, delta) => {
    const catalogProduct = products.find(p => p.id === id);
    if (!catalogProduct) return;

    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const nextQty = item.qty + delta;
        if (nextQty > catalogProduct.stock) {
          showToast('Batas maksimum stok produk tercapai!', 'error');
          return item;
        }
        return { ...item, qty: nextQty };
      }
      return item;
    }).filter(item => item.qty > 0));
  };

  const clearCart = () => setCart([]);

  // Confirm Clear Cart Modal
  const triggerClearCart = () => {
    setShowClearConfirm(true);
  };

  const executeClearCart = () => {
    clearCart();
    setShowClearConfirm(false);
    showToast('Keranjang belanja berhasil dibersihkan');
  };

  // Real-time Catalog Filter
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.barcode.includes(searchQuery);

      const matchesCat = activeCategory === 'Semua' || p.category === activeCategory;

      return matchesSearch && matchesCat;
    });
  }, [products, searchQuery, activeCategory]);

  // Checkout Pay Trigger
  const handlePayClick = () => {
    if (cart.length === 0) {
      showToast('Keranjang belanja masih kosong!', 'error');
      return;
    }

    const txNum = 'TRX-POS-' + Math.floor(100000 + Math.random() * 900000);

    if (paymentMethod === 'Tunai') {
      setCashPaid('');
      setCashWarning('');
      setShowCashModal(true);
    } else if (paymentMethod === 'QRIS') {
      setQrisStatus('waiting');
      setQrisCountdown(300);
      setQrisTxId(txNum);
      setShowQrisModal(true);
    } else if (paymentMethod === 'Kartu') {
      setCardRefNo('');
      setCardStatus('idle');
      setShowCardModal(true);
    }
  };

  // Confirm Cash Payment
  const handleCashSubmit = (e) => {
    e.preventDefault();
    const paidVal = parseInt(String(cashPaid).replace(/[^0-9]/g, ''), 10);
    
    if (isNaN(paidVal) || paidVal < total) {
      setCashWarning('Nominal bayar tidak mencukupi total tagihan!');
      return;
    }

    const currentTxId = 'TRX-POS-' + Math.floor(100000 + Math.random() * 900000);
    const currentReceipt = {
      id: currentTxId,
      date: new Date().toLocaleString('id-ID'),
      items: [...cart],
      subtotal: subtotal,
      tax: tax,
      total: total,
      paymentMethod: 'Tunai',
      cashPaid: paidVal,
      cashChange: paidVal - total
    };

    setLastTransaction(currentReceipt);
    subtractStock();
    clearCart();
    setShowCashModal(false);
    showToast('Transaksi berhasil diselesaikan');
    setShowReceiptModal(true);
  };

  // Confirm Card Payment
  const handleCardSubmit = (e) => {
    e.preventDefault();
    if (!cardRefNo.trim()) {
      showToast('Harap masukkan nomor referensi!', 'error');
      return;
    }

    setCardStatus('processing');
    
    // Simulate EDC card verification for 1.5 seconds
    setTimeout(() => {
      setCardStatus('success');
      showToast('Transaksi berhasil diselesaikan');

      const currentTxId = 'TRX-POS-' + Math.floor(100000 + Math.random() * 900000);
      const currentReceipt = {
        id: currentTxId,
        date: new Date().toLocaleString('id-ID'),
        items: [...cart],
        subtotal: subtotal,
        tax: tax,
        total: total,
        paymentMethod: `Kartu (${cardBank})`,
        cardRef: cardRefNo
      };

      setLastTransaction(currentReceipt);
      subtractStock();
      clearCart();
      
      // Close card modal and open receipt modal
      setTimeout(() => {
        setShowCardModal(false);
        setShowReceiptModal(true);
      }, 1000);

    }, 1500);
  };

  // Scan Barcode Submit
  const handleBarcodeSubmit = (e) => {
    e.preventDefault();
    const cleanBarcode = barcodeInput.trim();
    if (!cleanBarcode) return;

    const matchedProd = products.find(p => p.barcode === cleanBarcode || p.sku.toLowerCase() === cleanBarcode.toLowerCase());

    if (matchedProd) {
      addToCart(matchedProd);
      setBarcodeInput('');
      setShowBarcodeModal(false);
      showToast(`Berhasil menambahkan "${matchedProd.name}" ke keranjang!`);
    } else {
      showToast('Produk dengan barcode/SKU tersebut tidak ditemukan!', 'error');
    }
  };

  // Format QRIS countdown timer
  const formatCountdown = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className={`pos-layout-wrapper ${cart.length > 0 ? 'has-sidebar' : ''}`}>
      
      {/* Toast Notification */}
      {toast && (
        <div className="pos-toast">
          <span className="pos-toast-success-icon">✓</span>
          <span>{toast.message}</span>
        </div>
      )}

      {/* LEFT AREA: Catalog */}
      <div className="pos-main-content">
        <div className="pos-container">
          
          {/* Header Row */}
          <div className="pos-header-row">
            <div className="pos-search-wrapper">
              <SearchIcon />
              <input 
                type="text" 
                className="pos-search-input" 
                placeholder="Cari nama produk, SKU, atau barcode..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="btn-scan" onClick={() => {
              setBarcodeInput('');
              setShowBarcodeModal(true);
            }}>
              <ScanIcon /> Scan Barcode
            </button>
            <button className="pos-icon-btn" onClick={() => showToast('Tidak ada notifikasi baru')}>
              <BellIcon />
              <div className="bell-dot"></div>
            </button>
            <button className="pos-icon-btn" onClick={() => showToast('Pengaturan POS terbuka')}>
              <SettingsIcon />
            </button>
          </div>

          {/* Category Pills (Requirement 2) */}
          <div className="category-scroll">
            {CATEGORIES.map((cat, idx) => (
              <button 
                key={idx}
                className={`cat-pill ${activeCategory === cat ? 'active' : 'inactive'}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Catalog Grid */}
          <div>
            <div className="pos-section-header">
              <div className="pos-section-title">Katalog Produk</div>
              <div className="view-toggles">
                <button className="view-btn active"><GridIcon /></button>
                <button className="view-btn" onClick={() => showToast('Tampilan daftar dinonaktifkan')}><ListIcon /></button>
              </div>
            </div>
            
            <div className="pos-grid">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((p) => {
                  const isOutOfStock = p.stock === 0;
                  return (
                    <div key={p.id} className="pos-card" style={{ opacity: isOutOfStock ? 0.6 : 1 }}>
                      <div 
                        className={`pos-card-img ${p.grad}`} 
                        style={{ 
                          backgroundImage: p.img ? `url(${p.img})` : 'none', 
                          backgroundSize: 'cover', 
                          backgroundPosition: 'center' 
                        }}
                      >
                        {!p.img && <span className="product-initial">{p.name.charAt(0)}</span>}
                        {p.isNew && <span className="pos-badge">BARU</span>}
                        {isOutOfStock && (
                          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '14px', fontWeight: 'bold' }}>
                            HABIS
                          </div>
                        )}
                      </div>
                      <div className="pos-card-body">
                        <div className="pos-card-title" style={{ minHeight: '36px' }}>{p.name}</div>
                        <div className="pos-card-cat">{p.category}</div>
                        <div className="pos-card-price">{p.price}</div>
                        <div className="pos-card-stock" style={{ color: isOutOfStock ? '#ef4444' : '#94a3b8' }}>
                          Stok: {p.stock} unit
                        </div>
                        <button 
                          className="pos-add-btn" 
                          onClick={() => addToCart(p)}
                          disabled={isOutOfStock}
                          style={{ cursor: isOutOfStock ? 'not-allowed' : 'pointer' }}
                        >
                          <PlusIcon />
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div style={{ gridColumn: 'span 3', textAlign: 'center', padding: '40px 20px', color: '#64748b', background: 'white', borderRadius: '12px', border: '1px dashed #cbd5e1' }}>
                  Tidak ada produk yang cocok dengan kategori / pencarian.
                </div>
              )}
            </div>
          </div>

          {/* Popular Products */}
          <div>
            <div className="pos-section-header">
              <div className="pos-section-title">
                <SparklesIcon /> Produk Populer
              </div>
              <a href="#" className="link-all" onClick={(e) => { e.preventDefault(); showToast('Melihat semua produk terpopuler'); }}>Lihat Semua</a>
            </div>
            
            <div className="popular-scroll">
              {MOCK_POPULAR.map((p) => (
                <div key={p.id} className="popular-card" onClick={() => addToCart(p)}>
                  <div 
                    className={`popular-img ${p.grad}`} 
                    style={{ 
                      backgroundImage: p.img ? `url(${p.img})` : 'none', 
                      backgroundSize: 'cover', 
                      backgroundPosition: 'center' 
                    }}
                  >
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

      {/* RIGHT AREA: Checkout Sidebar (Condition: Show cart details if items exist) */}
      {cart.length > 0 ? (
        <div className="pos-checkout-sidebar">
          <div className="checkout-header">
            <div className="checkout-title">Detail Pesanan</div>
            <button className="btn-clear" onClick={triggerClearCart}>Bersihkan</button>
          </div>

          <div className="checkout-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div 
                  className="cart-item-img" 
                  style={{ 
                    backgroundImage: item.img ? `url(${item.img})` : 'none', 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center' 
                  }}
                >
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

          {/* Pricing Summary (Requirement 6) */}
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

          {/* Payment Methods (Requirement 7) */}
          <div className="checkout-methods">
            <div className="method-label">METODE PEMBAYARAN</div>
            <div className="method-grid">
              <button 
                className={`method-btn ${paymentMethod === 'Tunai' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('Tunai')}
              >
                <CashIcon /> Tunai
              </button>
              <button 
                className={`method-btn ${paymentMethod === 'QRIS' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('QRIS')}
              >
                <QrisIcon /> QRIS
              </button>
              <button 
                className={`method-btn ${paymentMethod === 'Kartu' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('Kartu')}
              >
                <CardIcon /> Kartu
              </button>
            </div>
          </div>

          <div className="checkout-actions">
            <button 
              className="btn-print"
              onClick={() => {
                if (lastTransaction) {
                  setShowReceiptModal(true);
                } else {
                  showToast('Belum ada transaksi sukses untuk dicetak struk!', 'error');
                }
              }}
            >
              <PrintIcon /> Struk
            </button>
            <button className="btn-pay" onClick={handlePayClick}>
              Bayar <ArrowRightIcon />
            </button>
          </div>
        </div>
      ) : (
        <button 
          className="pos-floating-cart"
          onClick={() => showToast('Tambahkan produk ke keranjang terlebih dahulu!')}
        >
          <CartIcon />
          <span className="cart-badge">{totalItems}</span>
        </button>
      )}

      {/* ========================================================
          POS DIALOG MODALS SECTION
          ======================================================== */}

      {/* 1. Modal Konfirmasi Bersihkan Keranjang */}
      {showClearConfirm && (
        <div className="pos-modal-overlay">
          <div className="pos-modal-card" style={{ width: '380px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', margin: '0 0 10px 0' }}>Bersihkan Keranjang?</h3>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 20px 0', lineHeight: '1.5' }}>
              Apakah Anda yakin ingin menghapus seluruh pesanan produk di dalam keranjang kasir?
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button className="btn-pos-cancel" onClick={() => setShowClearConfirm(false)}>Batal</button>
              <button className="btn-pos-submit" style={{ background: '#ef4444' }} onClick={executeClearCart}>Ya, Bersihkan</button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Modal Pembayaran Tunai (Kalkulator Kembalian) */}
      {showCashModal && (
        <div className="pos-modal-overlay">
          <div className="pos-modal-card" style={{ width: '420px' }}>
            <div className="pos-modal-header">
              <h2 className="pos-modal-title">Kalkulator Pembayaran Tunai</h2>
              <button className="pos-modal-close-btn" onClick={() => setShowCashModal(false)}>×</button>
            </div>
            
            <form onSubmit={handleCashSubmit}>
              <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', marginBottom: '16px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#64748b', marginBottom: '4px' }}>
                  <span>Total Tagihan:</span>
                  <span style={{ fontWeight: 'bold', color: '#0f172a' }}>{formatRp(total)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: 'bold' }}>
                  <span style={{ color: '#2b4c7e' }}>Jumlah Bayar:</span>
                  <span style={{ color: '#2b4c7e' }}>
                    {cashPaid ? formatRp(parseInt(cashPaid.replace(/[^0-9]/g, ''), 10) || 0) : 'Rp 0'}
                  </span>
                </div>
              </div>

              <div className="pos-form-group">
                <label className="pos-form-label">Input Uang Diterima (Rp)</label>
                <input 
                  type="text"
                  className="pos-form-input"
                  placeholder="Masukkan nominal, cth: 150000"
                  value={cashPaid}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, '');
                    setCashPaid(val);
                    setCashWarning('');
                  }}
                  required
                  autoFocus
                />
                
                {/* Nominal Pintasan Uang Diterima */}
                <div className="fast-cash-grid">
                  {[total, 50000, 100000, 150000, 200000, 500000].map((amt, i) => {
                    const ceilingAmt = Math.ceil(amt / 1000) * 1000;
                    if (ceilingAmt < total && amt !== total) return null;
                    return (
                      <button 
                        key={i}
                        type="button" 
                        className="btn-quick-cash"
                        onClick={() => {
                          setCashPaid(String(Math.max(ceilingAmt, total)));
                          setCashWarning('');
                        }}
                      >
                        {formatRp(Math.max(ceilingAmt, total))}
                      </button>
                    );
                  })}
                </div>
                
                {cashWarning && <span className="pos-warning-text">{cashWarning}</span>}
              </div>

              {/* Hitung Kembalian Otomatis */}
              {cashPaid && parseInt(cashPaid, 10) >= total && (
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderTop: '1px dashed #cbd5e1', fontSize: '14px', fontWeight: '700', color: '#10b981' }}>
                  <span>Uang Kembalian:</span>
                  <span>{formatRp(parseInt(cashPaid, 10) - total)}</span>
                </div>
              )}

              <div className="pos-modal-footer">
                <button type="button" className="btn-pos-cancel" onClick={() => setShowCashModal(false)}>Batal</button>
                <button 
                  type="submit" 
                  className="btn-pos-submit"
                  disabled={!cashPaid || parseInt(cashPaid, 10) < total}
                >
                  Konfirmasi Pembayaran
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. Modal Pembayaran QRIS (Simulasi Sukses 3 Detik) */}
      {showQrisModal && (
        <div className="pos-modal-overlay">
          <div className="pos-modal-card" style={{ width: '440px', textAlign: 'center', padding: '28px 24px' }}>
            <div className="pos-modal-header" style={{ borderBottom: 'none', marginBottom: '8px' }}>
              <div style={{ textAlign: 'left' }}>
                <h2 className="pos-modal-title" style={{ margin: 0 }}>QRIS Dynamic Payment</h2>
                <span style={{ fontSize: '12px', color: '#64748b' }}>ID Transaksi: {qrisTxId}</span>
              </div>
              <button 
                className="pos-modal-close-btn" 
                onClick={() => setShowQrisModal(false)}
                disabled={qrisStatus === 'waiting'}
                style={{ opacity: qrisStatus === 'waiting' ? 0.3 : 1, cursor: qrisStatus === 'waiting' ? 'not-allowed' : 'pointer' }}
              >
                ×
              </button>
            </div>

            {qrisStatus === 'waiting' ? (
              <div>
                {/* QR Code Container */}
                <div style={{ margin: '12px auto', width: '220px', height: '220px', background: 'white', border: '8px solid #f1f5f9', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', position: 'relative' }}>
                  {/* Mock QR Code Pattern */}
                  <div style={{ width: '180px', height: '180px', backgroundImage: 'radial-gradient(black 3px, transparent 4px), radial-gradient(black 3px, transparent 4px)', backgroundSize: '15px 15px', backgroundPosition: '0 0, 7.5px 7.5px', opacity: 0.85 }}></div>
                  <div style={{ position: 'absolute', width: '44px', height: '44px', background: '#2b4c7e', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '11px' }}>POS</div>
                </div>

                <div style={{ fontSize: '12px', fontWeight: '600', color: '#64748b' }}>Toko: <strong style={{ color: '#0f172a' }}>SmartKasir POS</strong></div>
                <div style={{ fontSize: '18px', fontWeight: '800', color: '#2b4c7e', margin: '6px 0 16px 0' }}>{formatRp(total)}</div>

                <div style={{ background: '#eff6ff', padding: '10px', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', gap: '8px', margin: '0 auto 16px auto', fontSize: '13px', color: '#2563eb', fontWeight: '700' }}>
                  <div className="spinner-ring" style={{ margin: 0, width: '18px', height: '18px', borderTopColor: '#2563eb' }}></div>
                  Menunggu Pembayaran...
                </div>

                <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                  QR Code kedaluwarsa dalam <span style={{ color: '#ef4444', fontWeight: 'bold' }}>{formatCountdown(qrisCountdown)}</span>
                </div>
              </div>
            ) : (
              <div style={{ padding: '16px 0' }}>
                <div className="success-checkmark-box">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', margin: '0 0 4px 0' }}>Pembayaran Berhasil!</h3>
                <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 24px 0' }}>
                  Transaksi menggunakan QRIS senilai <strong>{formatRp(lastTransaction?.total || 0)}</strong> sukses diverifikasi.
                </p>

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                  <button 
                    className="btn-print"
                    style={{ padding: '10px 18px', borderRadius: '8px' }}
                    onClick={() => {
                      setShowQrisModal(false);
                      setShowReceiptModal(true);
                    }}
                  >
                    <PrintIcon /> Cetak Struk
                  </button>
                  <button 
                    className="btn-pos-submit"
                    onClick={() => {
                      setShowQrisModal(false);
                    }}
                  >
                    Selesai
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. Modal Pembayaran Kartu EDC */}
      {showCardModal && (
        <div className="pos-modal-overlay">
          <div className="pos-modal-card" style={{ width: '400px' }}>
            <div className="pos-modal-header">
              <h2 className="pos-modal-title">Pembayaran Kartu EDC</h2>
              <button 
                className="pos-modal-close-btn" 
                onClick={() => setShowCardModal(false)}
                disabled={cardStatus === 'processing'}
                style={{ opacity: cardStatus === 'processing' ? 0.3 : 1 }}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleCardSubmit}>
              <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', marginBottom: '16px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 'bold' }}>
                <span style={{ color: '#64748b' }}>Total Tagihan:</span>
                <span style={{ color: '#2b4c7e', fontSize: '15px' }}>{formatRp(total)}</span>
              </div>

              <div className="pos-form-group">
                <label className="pos-form-label">Pilih Bank Penerbit</label>
                <select 
                  className="pos-form-select"
                  value={cardBank}
                  onChange={(e) => setCardBank(e.target.value)}
                  disabled={cardStatus === 'processing'}
                >
                  <option value="Mandiri">Bank Mandiri</option>
                  <option value="BCA">BCA (Bank Central Asia)</option>
                  <option value="BRI">BRI (Bank Rakyat Indonesia)</option>
                  <option value="BNI">BNI (Bank Negara Indonesia)</option>
                </select>
              </div>

              <div className="pos-form-group">
                <label className="pos-form-label">Nomor Referensi EDC *</label>
                <input 
                  type="text"
                  className="pos-form-input"
                  placeholder="Masukkan 6-12 digit referensi struk EDC"
                  value={cardRefNo}
                  onChange={(e) => setCardRefNo(e.target.value.replace(/[^0-9]/g, ''))}
                  disabled={cardStatus === 'processing'}
                  required
                  autoFocus
                />
              </div>

              <div className="pos-modal-footer">
                <button 
                  type="button" 
                  className="btn-pos-cancel" 
                  onClick={() => setShowCardModal(false)}
                  disabled={cardStatus === 'processing'}
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  className="btn-pos-submit"
                  style={{ background: '#4f46e5' }}
                  disabled={cardStatus === 'processing' || !cardRefNo}
                >
                  {cardStatus === 'processing' ? (
                    <span>
                      <div className="spinner-ring" style={{ width: '14px', height: '14px', borderTopColor: 'white' }}></div>
                      Memverifikasi...
                    </span>
                  ) : (
                    'Konfirmasi EDC'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. Modal Struk Digital Thermal (Requirement 11) */}
      {showReceiptModal && lastTransaction && (
        <div className="pos-modal-overlay" onClick={() => setShowReceiptModal(false)}>
          <div className="pos-modal-card" style={{ width: '400px' }} onClick={(e) => e.stopPropagation()}>
            <div className="pos-modal-header" style={{ borderBottom: 'none', marginBottom: '8px' }}>
              <h2 className="pos-modal-title">Struk Transaksi</h2>
              <button className="pos-modal-close-btn" onClick={() => setShowReceiptModal(false)}>×</button>
            </div>

            {/* Thermal paper simulator */}
            <div className="receipt-wrapper">
              <div className="receipt-header">
                <div className="receipt-store-logo">SMARTKASIR</div>
                <div className="receipt-store-info">
                  Jalan Rawa Kucing No. 99, Jakarta<br />
                  Telp: (021) 555-1234
                </div>
              </div>

              <div className="receipt-divider"></div>

              <div className="receipt-info-row">
                <span>ID Transaksi:</span>
                <span style={{ fontWeight: 'bold' }}>{lastTransaction.id}</span>
              </div>
              <div className="receipt-info-row">
                <span>Tanggal:</span>
                <span>{lastTransaction.date}</span>
              </div>
              <div className="receipt-info-row">
                <span>Kasir:</span>
                <span>Admin Demo</span>
              </div>
              <div className="receipt-info-row">
                <span>Metode:</span>
                <span style={{ fontWeight: 'bold' }}>{lastTransaction.paymentMethod}</span>
              </div>

              <div className="receipt-divider"></div>

              {/* Items List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {lastTransaction.items.map((item) => (
                  <div key={item.id}>
                    <div className="receipt-item-row">
                      <span className="receipt-item-name">{item.name}</span>
                      <span className="receipt-item-price">{formatRp(parsePrice(item.price) * item.qty)}</span>
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748b', marginTop: '-6px' }}>
                      {item.qty} x {item.price}
                    </div>
                  </div>
                ))}
              </div>

              <div className="receipt-divider"></div>

              {/* Grand Totals */}
              <div className="receipt-total-section">
                <div className="receipt-total-row">
                  <span>Subtotal</span>
                  <span>{formatRp(lastTransaction.subtotal)}</span>
                </div>
                <div className="receipt-total-row">
                  <span>Pajak (11%)</span>
                  <span>{formatRp(lastTransaction.tax)}</span>
                </div>
                <div className="receipt-divider"></div>
                <div className="receipt-total-row grand-total">
                  <span>TOTAL AKHIR</span>
                  <span>{formatRp(lastTransaction.total)}</span>
                </div>
                
                {lastTransaction.paymentMethod === 'Tunai' && (
                  <>
                    <div className="receipt-total-row" style={{ color: '#64748b', fontSize: '12px', marginTop: '6px' }}>
                      <span>Uang Tunai Diterima</span>
                      <span>{formatRp(lastTransaction.cashPaid)}</span>
                    </div>
                    <div className="receipt-total-row" style={{ color: '#10b981', fontSize: '12px', fontWeight: 'bold' }}>
                      <span>Uang Kembalian</span>
                      <span>{formatRp(lastTransaction.cashChange)}</span>
                    </div>
                  </>
                )}
                {lastTransaction.cardRef && (
                  <div className="receipt-total-row" style={{ color: '#64748b', fontSize: '11px', marginTop: '6px' }}>
                    <span>Ref EDC:</span>
                    <span>{lastTransaction.cardRef}</span>
                  </div>
                )}
              </div>

              <div className="receipt-divider"></div>
              
              <div style={{ textAlign: 'center', fontSize: '11px', color: '#64748b', marginTop: '10px' }}>
                *** TERIMA KASIH ***<br />
                LAYANAN POS PREMIUM SMARTKASIR
              </div>
            </div>

            <div className="pos-modal-footer">
              <button 
                type="button" 
                className="btn-pos-cancel"
                onClick={() => {
                  window.print();
                }}
              >
                Cetak (Print)
              </button>
              <button 
                type="button" 
                className="btn-pos-submit"
                onClick={() => {
                  showToast('Simulasi PDF berhasil diunduh!');
                  setShowReceiptModal(false);
                }}
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Modal Scanner Barcode (Requirement 12) */}
      {showBarcodeModal && (
        <div className="pos-modal-overlay">
          <div className="pos-modal-card" style={{ width: '400px' }}>
            <div className="pos-modal-header">
              <h2 className="pos-modal-title">Simulasi Scan Barcode</h2>
              <button className="pos-modal-close-btn" onClick={() => setShowBarcodeModal(false)}>×</button>
            </div>
            
            <form onSubmit={handleBarcodeSubmit}>
              <div className="pos-form-group">
                <label className="pos-form-label">Masukkan Barcode / SKU Produk *</label>
                <input 
                  type="text" 
                  className="pos-form-input" 
                  placeholder="Ketik barcode, cth: 899276100123"
                  value={barcodeInput}
                  onChange={(e) => setBarcodeInput(e.target.value)}
                  required
                  autoFocus
                />
              </div>

              {/* Demo Recommendation Cheat List */}
              <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', marginBottom: '16px' }}>
                <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#475569', display: 'block', marginBottom: '6px' }}>
                  Cheat List Barcode Demo Cepat (Klik untuk menyalin):
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {products.map(p => (
                    <button 
                      key={p.id}
                      type="button" 
                      style={{ fontSize: '10.5px', padding: '4px 8px', background: 'white', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer', fontWeight: '600', color: '#0f172a' }}
                      onClick={() => setBarcodeInput(p.barcode)}
                    >
                      {p.name.substring(0, 10)}... ({p.barcode})
                    </button>
                  ))}
                </div>
              </div>

              <div className="pos-modal-footer">
                <button type="button" className="btn-pos-cancel" onClick={() => setShowBarcodeModal(false)}>Batal</button>
                <button type="submit" className="btn-pos-submit">Scan & Masukkan</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

// Minimal Icons
function ClipboardIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M9 14l2 2 4-4"/></svg>; }
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
