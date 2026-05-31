"use client";

import { useState, useMemo, useEffect } from 'react';

// Initial dummy products data
const INITIAL_PRODUCTS = [
  {
    id: 'PRD-001',
    sku: 'PRD-001',
    barcode: '899276100123',
    name: 'Nike Air Max Red',
    category: 'Fashion',
    stock: 42,
    buyPrice: 1200000,
    sellPrice: 1850000,
    desc: 'Sepatu lari premium dari Nike dengan bantalan Air Max yang empuk dan nyaman untuk penggunaan sehari-hari.',
    image: '',
    initials: 'N',
    color: '#efeefd'
  },
  {
    id: 'PRD-042',
    sku: 'PRD-042',
    barcode: '899276100555',
    name: 'Smartwatch Pro v2',
    category: 'Elektronik',
    stock: 4,
    buyPrice: 2450000,
    sellPrice: 3200000,
    desc: 'Jam tangan pintar generasi kedua dengan sensor detak jantung, pelacakan GPS bawaan, dan ketahanan air IP68.',
    image: '',
    initials: 'S',
    color: '#eff6ff'
  },
  {
    id: 'PRD-109',
    sku: 'PRD-109',
    barcode: '899276100999',
    name: 'Headphone Sony WH',
    category: 'Elektronik',
    stock: 0,
    buyPrice: 4100000,
    sellPrice: 5500000,
    desc: 'Headphone premium dengan fitur Active Noise Cancelling (ANC) terbaik untuk kualitas audio murni tanpa gangguan bising.',
    image: '',
    initials: 'H',
    color: '#fee2e2'
  },
  {
    id: 'PRD-215',
    sku: 'PRD-215',
    barcode: '899276102154',
    name: 'Kopi Kenangan Mantan',
    category: 'Minuman',
    stock: 158,
    buyPrice: 18000,
    sellPrice: 25000,
    desc: 'Perpaduan sempurna espresso premium, susu segar pilihan, dan pemanis gula aren asli Indonesia khas Kopi Kenangan.',
    image: '',
    initials: 'K',
    color: '#ecfdf5'
  },
  {
    id: 'PRD-330',
    sku: 'PRD-330',
    barcode: '899276103301',
    name: 'Tas Ransel Eiger',
    category: 'Aksesoris',
    stock: 12,
    buyPrice: 385000,
    sellPrice: 450000,
    desc: 'Tas ransel kokoh berkapasitas 30L, dilengkapi kompartemen laptop dan pelindung hujan. Ideal untuk aktivitas outdoor.',
    image: '',
    initials: 'T',
    color: '#fff7ed'
  },
  {
    id: 'PRD-122',
    sku: 'PRD-122',
    barcode: '899276101224',
    name: 'Samsung Galaxy S24',
    category: 'Elektronik',
    stock: 15,
    buyPrice: 12000000,
    sellPrice: 14000000,
    desc: 'Smartphone flagship Samsung terbaru dengan dukungan teknologi Galaxy AI tercanggih dan kamera 50MP.',
    image: '',
    initials: 'G',
    color: '#eff6ff'
  },
  {
    id: 'PRD-155',
    sku: 'PRD-155',
    barcode: '899276101550',
    name: 'Kaos Polos Cotton',
    category: 'Fashion',
    stock: 85,
    buyPrice: 45000,
    sellPrice: 75000,
    desc: 'Kaos polos premium bahan 100% cotton combed 30s berkualitas tinggi yang adem, halus, dan sangat nyaman dipakai.',
    image: '',
    initials: 'C',
    color: '#efeefd'
  },
  {
    id: 'PRD-099',
    sku: 'PRD-099',
    barcode: '899276100990',
    name: 'Air Mineral Pristine',
    category: 'Minuman',
    stock: 300,
    buyPrice: 4000,
    sellPrice: 6000,
    desc: 'Air minum alkali dengan pH tinggi 8.6+ untuk membantu menetralisir asam tubuh secara maksimal.',
    image: '',
    initials: 'P',
    color: '#ecfdf5'
  }
];

const INITIAL_CATEGORIES = ['Elektronik', 'Fashion', 'Minuman', 'Aksesoris'];

const ITEMS_PER_PAGE = 5;

// Helper color list for dynamic initials avatars
const AVATAR_COLORS = ['#eff6ff', '#efeefd', '#ecfdf5', '#fff7ed', '#fef2f2', '#f5f5f4'];

export default function ProductsPage() {
  // --- CORE STATE ---
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState(null); // Right side panel category selection
  
  // --- SEARCH & FILTER STATE ---
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [filters, setFilters] = useState({
    category: 'Semua',
    stockStatus: 'Semua',
    sortBy: 'Nama A-Z'
  });

  // --- PAGINATION STATE ---
  const [currentPage, setCurrentPage] = useState(1);

  // --- MODAL STATE ---
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Stock inventory modals
  const [showStockInModal, setShowStockInModal] = useState(false);
  const [showStockOutModal, setShowStockOutModal] = useState(false);
  const [showStockAdjustModal, setShowStockAdjustModal] = useState(false);

  // Category management modals
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showEditCategoryModal, setShowEditCategoryModal] = useState(false);
  const [showDeleteCategoryConfirm, setShowDeleteCategoryConfirm] = useState(false);

  // --- FORM STATES ---
  const [addForm, setAddForm] = useState({
    name: '',
    sku: '',
    barcode: '',
    category: 'Elektronik',
    buyPrice: '',
    sellPrice: '',
    stock: '',
    image: '',
    desc: ''
  });

  const [editForm, setEditForm] = useState({
    id: '',
    name: '',
    category: '',
    buyPrice: '',
    sellPrice: '',
    stock: '',
    desc: '',
    image: ''
  });

  const [stockInForm, setStockInForm] = useState({
    productId: '',
    quantity: '',
    date: new Date().toISOString().substring(0, 10),
    notes: ''
  });

  const [stockOutForm, setStockOutForm] = useState({
    productId: '',
    quantity: '',
    reason: 'Rusak',
    date: new Date().toISOString().substring(0, 10)
  });

  const [stockAdjustForm, setStockAdjustForm] = useState({
    productId: '',
    actualStock: '',
    notes: ''
  });

  const [newCategoryName, setNewCategoryName] = useState('');
  const [editCategoryName, setEditCategoryName] = useState('');

  // --- TOAST NOTIFICATION STATE ---
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Reset page when search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filters]);

  // Pre-fill fields for dropdown selection in Stock Modals
  useEffect(() => {
    if (products.length > 0) {
      const firstProdId = products[0].id;
      setStockInForm(prev => ({ ...prev, productId: firstProdId }));
      setStockOutForm(prev => ({ ...prev, productId: firstProdId }));
      setStockAdjustForm(prev => ({ ...prev, productId: firstProdId, actualStock: products[0].stock }));
    }
  }, [products]);

  // --- STATS COMPUTATION ---
  const totalItems = products.length;
  // Menipis: stok > 0 && stok <= 15
  const lowStockItems = products.filter(p => p.stock > 0 && p.stock <= 15).length;
  // Habis: stok === 0
  const outOfStockItems = products.filter(p => p.stock === 0).length;

  // --- CATEGORY COUNTS ---
  const categoryCounts = useMemo(() => {
    const counts = {};
    categories.forEach(cat => {
      counts[cat] = products.filter(p => p.category === cat).length;
    });
    return counts;
  }, [products, categories]);

  // --- FILTER & SORT & SEARCH LOGIC ---
  const filteredProducts = useMemo(() => {
    return products
      .filter(prod => {
        // Real-time search by Name, SKU, Barcode
        const query = searchQuery.toLowerCase().trim();
        const matchesSearch = 
          prod.name.toLowerCase().includes(query) ||
          prod.sku.toLowerCase().includes(query) ||
          prod.barcode.includes(query);

        // Filter by Category
        const matchesCategory = filters.category === 'Semua' || prod.category === filters.category;

        // Filter by Stock Status
        let matchesStock = true;
        if (filters.stockStatus === 'Aman') {
          matchesStock = prod.stock > 15;
        } else if (filters.stockStatus === 'Menipis') {
          matchesStock = prod.stock > 0 && prod.stock <= 15;
        } else if (filters.stockStatus === 'Habis') {
          matchesStock = prod.stock === 0;
        }

        return matchesSearch && matchesCategory && matchesStock;
      })
      .sort((a, b) => {
        // Sorting Logic
        if (filters.sortBy === 'Nama A-Z') {
          return a.name.localeCompare(b.name);
        } else if (filters.sortBy === 'Nama Z-A') {
          return b.name.localeCompare(a.name);
        } else if (filters.sortBy === 'Harga Tertinggi') {
          return b.sellPrice - a.sellPrice;
        } else if (filters.sortBy === 'Harga Terendah') {
          return a.sellPrice - b.sellPrice;
        } else if (filters.sortBy === 'Stok Terbanyak') {
          return b.stock - a.stock;
        } else if (filters.sortBy === 'Stok Tersedikit') {
          return a.stock - b.stock;
        }
        return 0;
      });
  }, [products, searchQuery, filters]);

  // --- PAGINATION LOGIC ---
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));

  // --- FORMAT CURRENCY HELPER ---
  const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(num).replace('IDR', 'Rp');
  };

  // --- ACTION HANDLERS ---

  // Add Product Submit
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!addForm.name || !addForm.buyPrice || !addForm.sellPrice || addForm.stock === '') {
      showToast('Harap isi semua field utama!', 'error');
      return;
    }

    const buyNum = parseFloat(addForm.buyPrice);
    const sellNum = parseFloat(addForm.sellPrice);
    const stockNum = parseInt(addForm.stock);

    if (isNaN(buyNum) || isNaN(sellNum) || isNaN(stockNum)) {
      showToast('Harga dan stok harus berupa angka!', 'error');
      return;
    }

    // Auto generate barcode and SKU if empty
    const genId = 'PRD-' + String(products.length + 100).padStart(3, '0');
    const newSku = addForm.sku.trim() || genId;
    const newBarcode = addForm.barcode.trim() || String(Math.floor(899000000000 + Math.random() * 99999999));
    const initialChar = addForm.name.charAt(0).toUpperCase();
    const randomColor = AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];

    const newProd = {
      id: genId,
      sku: newSku,
      barcode: newBarcode,
      name: addForm.name,
      category: addForm.category,
      stock: stockNum,
      buyPrice: buyNum,
      sellPrice: sellNum,
      desc: addForm.desc || 'Tidak ada deskripsi produk.',
      image: addForm.image,
      initials: initialChar,
      color: randomColor
    };

    setProducts([newProd, ...products]);
    setShowAddModal(false);
    showToast(`Produk "${addForm.name}" berhasil ditambahkan!`);
    
    // Reset form
    setAddForm({
      name: '',
      sku: '',
      barcode: '',
      category: categories[0] || 'Elektronik',
      buyPrice: '',
      sellPrice: '',
      stock: '',
      image: '',
      desc: ''
    });
  };

  // Open Edit Modal from Detail Modal
  const openEditModal = (prod) => {
    setEditForm({
      id: prod.id,
      name: prod.name,
      category: prod.category,
      buyPrice: prod.buyPrice,
      sellPrice: prod.sellPrice,
      stock: prod.stock,
      desc: prod.desc,
      image: prod.image
    });
    setShowDetailModal(false);
    setShowEditModal(true);
  };

  // Edit Product Submit
  const handleEditProduct = (e) => {
    e.preventDefault();
    if (!editForm.name || !editForm.buyPrice || !editForm.sellPrice || editForm.stock === '') {
      showToast('Harap isi field wajib!', 'error');
      return;
    }

    const buyNum = parseFloat(editForm.buyPrice);
    const sellNum = parseFloat(editForm.sellPrice);
    const stockNum = parseInt(editForm.stock);

    setProducts(products.map(prod => {
      if (prod.id === editForm.id) {
        return {
          ...prod,
          name: editForm.name,
          category: editForm.category,
          buyPrice: buyNum,
          sellPrice: sellNum,
          stock: stockNum,
          desc: editForm.desc,
          image: editForm.image,
          initials: editForm.name.charAt(0).toUpperCase()
        };
      }
      return prod;
    }));

    setShowEditModal(false);
    showToast(`Produk "${editForm.name}" berhasil diperbarui!`);
  };

  // Open Delete Confirmation from Detail Modal
  const openDeleteConfirm = (prod) => {
    setSelectedProduct(prod);
    setShowDetailModal(false);
    setShowDeleteConfirm(true);
  };

  // Delete Product Action
  const handleDeleteProduct = () => {
    if (selectedProduct) {
      setProducts(products.filter(p => p.id !== selectedProduct.id));
      setShowDeleteConfirm(false);
      showToast(`Produk "${selectedProduct.name}" berhasil dihapus!`);
      setSelectedProduct(null);
    }
  };

  // Stock In Submit
  const handleStockIn = (e) => {
    e.preventDefault();
    const qty = parseInt(stockInForm.quantity);
    if (!stockInForm.productId || isNaN(qty) || qty <= 0) {
      showToast('Harap masukkan jumlah masuk yang valid!', 'error');
      return;
    }

    const targetProd = products.find(p => p.id === stockInForm.productId);
    if (!targetProd) return;

    setProducts(products.map(prod => {
      if (prod.id === stockInForm.productId) {
        return { ...prod, stock: prod.stock + qty };
      }
      return prod;
    }));

    setShowStockInModal(false);
    showToast(`Stok Masuk: ${qty} Unit ditambahkan ke "${targetProd.name}"!`);
    setStockInForm(prev => ({ ...prev, quantity: '', notes: '' }));
  };

  // Stock Out Submit
  const handleStockOut = (e) => {
    e.preventDefault();
    const qty = parseInt(stockOutForm.quantity);
    if (!stockOutForm.productId || isNaN(qty) || qty <= 0) {
      showToast('Harap masukkan jumlah keluar yang valid!', 'error');
      return;
    }

    const targetProd = products.find(p => p.id === stockOutForm.productId);
    if (!targetProd) return;

    if (targetProd.stock < qty) {
      showToast(`Stok tidak mencukupi! Stok saat ini: ${targetProd.stock}`, 'error');
      return;
    }

    setProducts(products.map(prod => {
      if (prod.id === stockOutForm.productId) {
        return { ...prod, stock: prod.stock - qty };
      }
      return prod;
    }));

    setShowStockOutModal(false);
    showToast(`Stok Keluar: ${qty} Unit dikeluarkan dari "${targetProd.name}"!`);
    setStockOutForm(prev => ({ ...prev, quantity: '' }));
  };

  // Stock Adjust Submit
  const handleStockAdjust = (e) => {
    e.preventDefault();
    const actual = parseInt(stockAdjustForm.actualStock);
    if (!stockAdjustForm.productId || isNaN(actual) || actual < 0) {
      showToast('Harap masukkan jumlah stok aktual yang valid!', 'error');
      return;
    }

    const targetProd = products.find(p => p.id === stockAdjustForm.productId);
    if (!targetProd) return;

    setProducts(products.map(prod => {
      if (prod.id === stockAdjustForm.productId) {
        return { ...prod, stock: actual };
      }
      return prod;
    }));

    setShowStockAdjustModal(false);
    showToast(`Penyesuaian: Stok "${targetProd.name}" disesuaikan menjadi ${actual}!`);
    setStockAdjustForm(prev => ({ ...prev, actualStock: '' }));
  };

  // Add Category Submit
  const handleAddCategory = (e) => {
    e.preventDefault();
    const name = newCategoryName.trim();
    if (!name) {
      showToast('Nama kategori tidak boleh kosong!', 'error');
      return;
    }

    if (categories.some(cat => cat.toLowerCase() === name.toLowerCase())) {
      showToast('Kategori ini sudah ada!', 'error');
      return;
    }

    setCategories([...categories, name]);
    setShowAddCategoryModal(false);
    setNewCategoryName('');
    showToast(`Kategori "${name}" berhasil ditambahkan!`);
  };

  // Edit Category Submit
  const handleEditCategory = (e) => {
    e.preventDefault();
    const newName = editCategoryName.trim();
    if (!newName) {
      showToast('Nama kategori tidak boleh kosong!', 'error');
      return;
    }

    if (categories.some(cat => cat.toLowerCase() === newName.toLowerCase() && cat !== selectedCategory)) {
      showToast('Kategori dengan nama tersebut sudah ada!', 'error');
      return;
    }

    // Rename products' category
    setProducts(products.map(prod => {
      if (prod.category === selectedCategory) {
        return { ...prod, category: newName };
      }
      return prod;
    }));

    // Update categories list
    setCategories(categories.map(cat => cat === selectedCategory ? newName : cat));
    
    // Select the new name
    setSelectedCategory(newName);
    
    setShowEditCategoryModal(false);
    showToast(`Kategori berhasil diubah menjadi "${newName}"!`);
  };

  // Delete Category Action
  const handleDeleteCategory = () => {
    if (selectedCategory) {
      // Re-assign products category to "Lainnya"
      setProducts(products.map(prod => {
        if (prod.category === selectedCategory) {
          return { ...prod, category: 'Lainnya' };
        }
        return prod;
      }));

      // If "Lainnya" not in list, add it
      const hasLainnya = categories.includes('Lainnya');
      let updatedCats = categories.filter(c => c !== selectedCategory);
      if (!hasLainnya && products.some(p => p.category === selectedCategory)) {
        updatedCats.push('Lainnya');
      }

      setCategories(updatedCats);
      setSelectedCategory(null);
      setShowDeleteCategoryConfirm(false);
      showToast(`Kategori berhasil dihapus! Produk terkait dipindahkan ke "Lainnya".`);
    }
  };

  const handleRowClick = (prod) => {
    setSelectedProduct(prod);
    setShowDetailModal(true);
  };

  const handleCategoryItemClick = (catName) => {
    if (selectedCategory === catName) {
      setSelectedCategory(null); // deselect if clicked again
    } else {
      setSelectedCategory(catName);
    }
  };

  return (
    <div>
      {/* Toast Notification */}
      {toast && (
        <div className="cust-toast-notif" style={{ background: toast.type === 'error' ? '#ef4444' : '#1e0044' }}>
          <span>{toast.message}</span>
        </div>
      )}

      {/* Top Stat Cards */}
      <div className="stat-cards" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: '0' }}>
        <div className="card stat-card" style={{ flexDirection: 'row', alignItems: 'center', gap: '16px' }}>
          <div className="stat-icon icon-indigo" style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#eff6ff', color: '#3b82f6' }}>
            <ClipboardIcon />
          </div>
          <div>
            <div className="stat-desc" style={{ color: '#64748b', fontSize: '12px', fontWeight: '500', textTransform: 'none' }}>Total Produk</div>
            <div className="stat-value" style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span style={{ fontSize: '24px', fontWeight: '600', color: '#0f172a' }}>{totalItems}</span> <span style={{ fontSize: '13px', color: '#64748b', fontWeight: '400' }}>Items</span>
            </div>
          </div>
        </div>

        <div className="card stat-card" style={{ flexDirection: 'row', alignItems: 'center', gap: '16px' }}>
          <div className="stat-icon icon-purple" style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#fff7ed', color: '#f97316' }}>
            <WarningIcon />
          </div>
          <div>
            <div className="stat-desc" style={{ color: '#64748b', fontSize: '12px', fontWeight: '500', textTransform: 'none' }}>Stok Menipis</div>
            <div className="stat-value" style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span style={{ fontSize: '24px', fontWeight: '600', color: '#0f172a' }}>{lowStockItems}</span> <span style={{ fontSize: '13px', color: '#64748b', fontWeight: '400' }}>Kritis</span>
            </div>
          </div>
        </div>

        <div className="card stat-card" style={{ flexDirection: 'row', alignItems: 'center', gap: '16px' }}>
          <div className="stat-icon" style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#fef2f2', color: '#ef4444' }}>
            <ErrorIcon />
          </div>
          <div>
            <div className="stat-desc" style={{ color: '#64748b', fontSize: '12px', fontWeight: '500', textTransform: 'none' }}>Stok Habis</div>
            <div className="stat-value" style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span style={{ fontSize: '24px', fontWeight: '600', color: '#0f172a' }}>{outOfStockItems}</span> <span style={{ fontSize: '13px', color: '#64748b', fontWeight: '400' }}>Kosong</span>
            </div>
          </div>
        </div>
      </div>

      <div className="products-layout">
        
        {/* MAIN AREA */}
        <div className="main-content-area">
          {/* Filters Row */}
          <div className="filter-row" style={{ display: 'flex', gap: '12px', alignItems: 'center', position: 'relative' }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', display: 'flex' }}>
                <SearchIcon />
              </div>
              <input 
                type="text" 
                placeholder="Cari nama produk, SKU, atau barcode..." 
                className="filter-select" 
                style={{ width: '100%', paddingLeft: '36px', paddingRight: '16px', backgroundImage: 'none', margin: 0 }} 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div style={{ position: 'relative' }}>
              <button 
                className="filter-select" 
                style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingRight: '16px', backgroundImage: 'none', margin: 0 }}
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              >
                <FilterIcon /> Filter {(filters.category !== 'Semua' || filters.stockStatus !== 'Semua') && '●'}
              </button>
              
              {/* Dropdown Filter Modern */}
              {showFilterDropdown && (
                <div className="prod-filter-dropdown">
                  <div className="prod-filter-title">Kategori</div>
                  <div className="prod-filter-group">
                    <select 
                      className="prod-form-select"
                      value={filters.category}
                      onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                    >
                      <option value="Semua">Semua Kategori</option>
                      {categories.map((cat, i) => (
                        <option key={i} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="prod-filter-title" style={{ marginTop: '4px' }}>Status Stok</div>
                  <div className="prod-filter-group">
                    <select 
                      className="prod-form-select"
                      value={filters.stockStatus}
                      onChange={(e) => setFilters(prev => ({ ...prev, stockStatus: e.target.value }))}
                    >
                      <option value="Semua">Semua Status</option>
                      <option value="Aman">Aman (&gt; 15)</option>
                      <option value="Menipis">Menipis (1 - 15)</option>
                      <option value="Habis">Habis (0)</option>
                    </select>
                  </div>

                  <div className="prod-filter-title" style={{ marginTop: '4px' }}>Urutkan</div>
                  <div className="prod-filter-group">
                    <select 
                      className="prod-form-select"
                      value={filters.sortBy}
                      onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                    >
                      <option value="Nama A-Z">Nama A-Z</option>
                      <option value="Nama Z-A">Nama Z-A</option>
                      <option value="Harga Tertinggi">Harga Tertinggi</option>
                      <option value="Harga Terendah">Harga Terendah</option>
                      <option value="Stok Terbanyak">Stok Terbanyak</option>
                      <option value="Stok Tersedikit">Stok Tersedikit</option>
                    </select>
                  </div>

                  <button 
                    className="btn-secondary" 
                    style={{ width: '100%', padding: '8px', fontSize: '12px', marginTop: '4px' }}
                    onClick={() => {
                      setFilters({ category: 'Semua', stockStatus: 'Semua', sortBy: 'Nama A-Z' });
                      setShowFilterDropdown(false);
                      showToast('Filter berhasil di-reset!');
                    }}
                  >
                    Reset Filter
                  </button>
                </div>
              )}
            </div>
            
            <button 
              className="btn-primary" 
              style={{ margin: 0, width: 'auto', padding: '10px 20px', background: '#2563eb', color: 'white', borderRadius: '8px' }}
              onClick={() => {
                setAddForm({
                  name: '',
                  sku: '',
                  barcode: '',
                  category: categories[0] || 'Elektronik',
                  buyPrice: '',
                  sellPrice: '',
                  stock: '',
                  image: '',
                  desc: ''
                });
                setShowAddModal(true);
              }}
            >
              <PlusIcon /> Tambah Produk
            </button>
          </div>

          {/* Table Container */}
          <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table className="tx-table" style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th>ID / Barcode</th>
                    <th>Produk</th>
                    <th>Kategori</th>
                    <th>Stok</th>
                    <th style={{ textAlign: 'right' }}>Harga</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedProducts.length > 0 ? (
                    paginatedProducts.map((prod) => {
                      const isOutOfStock = prod.stock === 0;
                      const isLowStock = prod.stock > 0 && prod.stock <= 15;
                      
                      return (
                        <tr key={prod.id} onClick={() => handleRowClick(prod)}>
                          <td>
                            <div style={{ fontWeight: '500', color: '#0f172a', fontSize: '13px' }}>{prod.sku}</div>
                            <div style={{ color: '#64748b', fontSize: '12px' }}>{prod.barcode}</div>
                          </td>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <div 
                                className="product-table-img" 
                                style={{ 
                                  background: prod.color || '#f1f5f9', 
                                  display: 'flex', 
                                  justifyContent: 'center', 
                                  alignItems: 'center' 
                                }}
                              >
                                {prod.image ? (
                                  <img src={prod.image} alt={prod.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                                ) : (
                                  <span style={{ 
                                    color: isOutOfStock ? '#ef4444' : '#64748b', 
                                    fontWeight: '700' 
                                  }}>
                                    {prod.initials || prod.name.charAt(0).toUpperCase()}
                                  </span>
                                )}
                              </div>
                              <span style={{ fontWeight: '500', color: '#0f172a', fontSize: '14px', maxWidth: '160px', lineHeight: '1.4' }}>
                                {prod.name}
                              </span>
                            </div>
                          </td>
                          <td>
                            <span className={`category-tag ${prod.category.toLowerCase().replace(/\s+/g, '')}`}>
                              {prod.category}
                            </span>
                          </td>
                          <td>
                            <div style={{ 
                              fontWeight: '500', 
                              color: isOutOfStock ? '#ef4444' : isLowStock ? '#f97316' : '#0f172a', 
                              fontSize: '14px' 
                            }}>
                              {prod.stock} <span style={{ color: '#64748b', fontSize: '12px', fontWeight: '400' }}>Units</span>
                            </div>
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <div style={{ fontWeight: '600', color: '#0f172a', fontSize: '14px' }}>
                              {formatRupiah(prod.sellPrice)}
                            </div>
                            <div style={{ color: '#64748b', fontSize: '12px' }}>
                              {formatRupiah(prod.buyPrice)}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="5" style={{ textAlign: 'center', padding: '40px 20px', color: '#64748b' }}>
                        Tidak ada produk yang cocok dengan pencarian / filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="pagination-row">
              <div>
                Menampilkan <span style={{ fontWeight: '700', color: '#4a589f' }}>
                  {filteredProducts.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1}-
                  {Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)}
                </span> dari <span style={{ fontWeight: '700', color: '#1e0044' }}>{filteredProducts.length}</span> produk
              </div>
              <div className="pagination-controls">
                <button 
                  className="page-btn" 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  style={{ opacity: currentPage === 1 ? 0.4 : 1, cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
                >
                  <ChevronLeftIcon />
                </button>
                
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button 
                    key={idx} 
                    className={`page-btn ${currentPage === idx + 1 ? 'active' : ''}`}
                    onClick={() => setCurrentPage(idx + 1)}
                  >
                    {idx + 1}
                  </button>
                ))}

                <button 
                  className="page-btn" 
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  style={{ 
                    opacity: currentPage === totalPages ? 0.4 : 1, 
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                    background: '#f1f5f9' 
                  }}
                >
                  <ChevronRightIcon />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* SIDE AREA */}
        <div className="side-content-area">
          
          {/* Stok Panel */}
          <div className="action-panel">
            <div className="action-panel-title">
              <ClipboardIcon /> Stok
            </div>
            <div className="action-list">
              <div className="action-item" onClick={() => {
                if (products.length > 0) {
                  setStockInForm({
                    productId: products[0].id,
                    quantity: '',
                    date: new Date().toISOString().substring(0, 10),
                    notes: ''
                  });
                  setShowStockInModal(true);
                } else {
                  showToast('Belum ada produk untuk ditambahkan stok!', 'error');
                }
              }}>
                <div className="action-item-left">
                  <div className="action-icon"><InIcon /></div>
                  Stok Masuk
                </div>
                <ArrowRightIcon />
              </div>
              <div className="action-item" onClick={() => {
                if (products.length > 0) {
                  setStockOutForm({
                    productId: products[0].id,
                    quantity: '',
                    reason: 'Rusak',
                    date: new Date().toISOString().substring(0, 10)
                  });
                  setShowStockOutModal(true);
                } else {
                  showToast('Belum ada produk untuk dikurangi stok!', 'error');
                }
              }}>
                <div className="action-item-left">
                  <div className="action-icon"><OutIcon /></div>
                  Stok Keluar
                </div>
                <ArrowRightIcon />
              </div>
              <div className="action-item" onClick={() => {
                if (products.length > 0) {
                  setStockAdjustForm({
                    productId: products[0].id,
                    actualStock: products[0].stock,
                    notes: ''
                  });
                  setShowStockAdjustModal(true);
                } else {
                  showToast('Belum ada produk untuk disesuaikan!', 'error');
                }
              }}>
                <div className="action-item-left">
                  <div className="action-icon"><AdjustIcon /></div>
                  Penyesuaian
                </div>
                <ArrowRightIcon />
              </div>
            </div>
          </div>

          {/* Kategori Panel */}
          <div className="action-panel">
            <div className="action-panel-title">
              <CategoryIcon /> Kategori
            </div>
            
            {/* Category Dynamic List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '16px' }}>
              {categories.map((cat, idx) => (
                <div 
                  key={idx}
                  className={`action-item ${selectedCategory === cat ? 'selected' : ''}`}
                  onClick={() => handleCategoryItemClick(cat)}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <div className="action-item-left">
                    <div className="action-icon" style={{ width: '24px', height: '24px' }}><CategoryIcon /></div>
                    <span style={{ fontSize: '13px' }}>{cat}</span>
                  </div>
                  <span style={{ fontSize: '11px', background: '#f1f5f9', padding: '2px 8px', borderRadius: '10px', color: '#64748b', fontWeight: '600' }}>
                    {categoryCounts[cat] || 0}
                  </span>
                </div>
              ))}
            </div>

            <button 
              className="btn-primary" 
              onClick={() => {
                setNewCategoryName('');
                setShowAddCategoryModal(true);
              }}
            >
              <FolderAddIcon /> Tambah Kategori
            </button>

            {/* Edit / Hapus Kategori hanya muncul ketika kategori dipilih */}
            {selectedCategory && (
              <div className="btn-row" style={{ animation: 'prodDropdownFade 0.2s ease forwards' }}>
                <button 
                  className="btn-outline-circle"
                  onClick={() => {
                    setEditCategoryName(selectedCategory);
                    setShowEditCategoryModal(true);
                  }}
                >
                  <EditIcon /> EDIT
                </button>
                <button 
                  className="btn-outline-circle" 
                  style={{ color: '#ef4444' }}
                  onClick={() => setShowDeleteCategoryConfirm(true)}
                >
                  <DeleteIcon /> HAPUS
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* ========================================================
          MODALS POPUP (Tambah, Detail, Edit, Hapus, Transaksi Stok)
          ======================================================== */}

      {/* 1. Modal Tambah Produk */}
      {showAddModal && (
        <div className="prod-modal-overlay">
          <div className="prod-modal-card">
            <div className="prod-modal-header">
              <h2 className="prod-modal-title">Tambah Produk Baru</h2>
              <button className="prod-modal-close-btn" onClick={() => setShowAddModal(false)}>×</button>
            </div>
            <form onSubmit={handleAddProduct}>
              <div className="prod-form-group">
                <label className="prod-form-label">Nama Produk *</label>
                <input 
                  type="text" 
                  className="prod-form-input" 
                  placeholder="Contoh: Nike Air Max Red"
                  value={addForm.name}
                  onChange={(e) => setAddForm(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>

              <div className="prod-form-grid">
                <div className="prod-form-group">
                  <label className="prod-form-label">SKU (Kode Produk)</label>
                  <input 
                    type="text" 
                    className="prod-form-input" 
                    placeholder="PRD-001"
                    value={addForm.sku}
                    onChange={(e) => setAddForm(prev => ({ ...prev, sku: e.target.value }))}
                  />
                </div>
                <div className="prod-form-group">
                  <label className="prod-form-label">Barcode</label>
                  <input 
                    type="text" 
                    className="prod-form-input" 
                    placeholder="899276100123"
                    value={addForm.barcode}
                    onChange={(e) => setAddForm(prev => ({ ...prev, barcode: e.target.value }))}
                  />
                </div>
              </div>

              <div className="prod-form-grid">
                <div className="prod-form-group">
                  <label className="prod-form-label">Kategori</label>
                  <select 
                    className="prod-form-select"
                    value={addForm.category}
                    onChange={(e) => setAddForm(prev => ({ ...prev, category: e.target.value }))}
                  >
                    {categories.map((cat, i) => (
                      <option key={i} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="prod-form-group">
                  <label className="prod-form-label">Stok Awal *</label>
                  <input 
                    type="number" 
                    className="prod-form-input" 
                    min="0"
                    placeholder="0"
                    value={addForm.stock}
                    onChange={(e) => setAddForm(prev => ({ ...prev, stock: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="prod-form-grid">
                <div className="prod-form-group">
                  <label className="prod-form-label">Harga Beli (Rp) *</label>
                  <input 
                    type="number" 
                    className="prod-form-input" 
                    min="0"
                    placeholder="1200000"
                    value={addForm.buyPrice}
                    onChange={(e) => setAddForm(prev => ({ ...prev, buyPrice: e.target.value }))}
                    required
                  />
                </div>
                <div className="prod-form-group">
                  <label className="prod-form-label">Harga Jual (Rp) *</label>
                  <input 
                    type="number" 
                    className="prod-form-input" 
                    min="0"
                    placeholder="1850000"
                    value={addForm.sellPrice}
                    onChange={(e) => setAddForm(prev => ({ ...prev, sellPrice: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="prod-form-group">
                <label className="prod-form-label">URL Foto Produk (Opsional)</label>
                <input 
                  type="text" 
                  className="prod-form-input" 
                  placeholder="https://example.com/foto.jpg"
                  value={addForm.image}
                  onChange={(e) => setAddForm(prev => ({ ...prev, image: e.target.value }))}
                />
              </div>

              <div className="prod-form-group">
                <label className="prod-form-label">Deskripsi</label>
                <textarea 
                  className="prod-form-textarea" 
                  placeholder="Deskripsi detail mengenai produk..."
                  value={addForm.desc}
                  onChange={(e) => setAddForm(prev => ({ ...prev, desc: e.target.value }))}
                ></textarea>
              </div>

              <div className="prod-modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setShowAddModal(false)}>Batal</button>
                <button type="submit" className="btn-submit-action">Simpan Produk</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Modal Detail Produk */}
      {showDetailModal && selectedProduct && (
        <div className="prod-modal-overlay" onClick={() => setShowDetailModal(false)}>
          <div className="prod-modal-card" style={{ width: '640px' }} onClick={(e) => e.stopPropagation()}>
            <div className="prod-modal-header">
              <h2 className="prod-modal-title">Detail Informasi Produk</h2>
              <button className="prod-modal-close-btn" onClick={() => setShowDetailModal(false)}>×</button>
            </div>
            
            <div className="prod-detail-grid">
              <div className="prod-detail-image-wrapper">
                <div className="prod-detail-img-box" style={{ background: selectedProduct.color || '#f1f5f9' }}>
                  {selectedProduct.image ? (
                    <img src={selectedProduct.image} alt={selectedProduct.name} />
                  ) : (
                    <span style={{ fontSize: '72px', color: '#64748b', fontWeight: '800' }}>
                      {selectedProduct.initials || selectedProduct.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                
                <span className={`prod-detail-badge ${
                  selectedProduct.stock === 0 
                    ? 'stock-out' 
                    : selectedProduct.stock <= 15 
                      ? 'stock-low' 
                      : 'stock-ok'
                }`}>
                  {selectedProduct.stock === 0 
                    ? 'Stok Kosong' 
                    : selectedProduct.stock <= 15 
                      ? 'Stok Menipis' 
                      : 'Stok Aman'}
                </span>
              </div>

              <div className="prod-detail-info">
                <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#0f172a', margin: '0 0 4px 0' }}>{selectedProduct.name}</h3>
                <span className="category-tag" style={{ alignSelf: 'flex-start', fontSize: '12px', padding: '4px 10px' }}>{selectedProduct.category}</span>
                
                <div style={{ marginTop: '12px' }}>
                  <div className="prod-detail-row">
                    <span className="prod-detail-label">SKU</span>
                    <span className="prod-detail-value">{selectedProduct.sku}</span>
                  </div>
                  <div className="prod-detail-row">
                    <span className="prod-detail-label">Barcode</span>
                    <span className="prod-detail-value">{selectedProduct.barcode}</span>
                  </div>
                  <div className="prod-detail-row">
                    <span className="prod-detail-label">Stok</span>
                    <span className="prod-detail-value" style={{ color: selectedProduct.stock === 0 ? '#ef4444' : '#0f172a' }}>{selectedProduct.stock} Units</span>
                  </div>
                  <div className="prod-detail-row">
                    <span className="prod-detail-label">Harga Beli</span>
                    <span className="prod-detail-value" style={{ color: '#64748b' }}>{formatRupiah(selectedProduct.buyPrice)}</span>
                  </div>
                  <div className="prod-detail-row">
                    <span className="prod-detail-label">Harga Jual</span>
                    <span className="prod-detail-value" style={{ color: '#2563eb', fontSize: '15px', fontWeight: '700' }}>{formatRupiah(selectedProduct.sellPrice)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '16px' }}>
              <h4 style={{ fontSize: '13px', fontWeight: '600', color: '#475569', margin: '0 0 6px 0' }}>Deskripsi Produk</h4>
              <p className="prod-detail-desc">{selectedProduct.desc}</p>
            </div>

            <div className="prod-modal-footer">
              <button 
                type="button" 
                className="btn-secondary" 
                style={{ color: '#ef4444', borderColor: '#fee2e2', background: '#fef2f2' }}
                onClick={() => openDeleteConfirm(selectedProduct)}
              >
                Hapus Produk
              </button>
              <button 
                type="button" 
                className="btn-submit-action" 
                onClick={() => openEditModal(selectedProduct)}
              >
                Edit Produk
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Modal Edit Produk */}
      {showEditModal && (
        <div className="prod-modal-overlay">
          <div className="prod-modal-card">
            <div className="prod-modal-header">
              <h2 className="prod-modal-title">Edit Informasi Produk</h2>
              <button className="prod-modal-close-btn" onClick={() => setShowEditModal(false)}>×</button>
            </div>
            <form onSubmit={handleEditProduct}>
              <div className="prod-form-group">
                <label className="prod-form-label">Nama Produk *</label>
                <input 
                  type="text" 
                  className="prod-form-input" 
                  value={editForm.name}
                  onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>

              <div className="prod-form-grid">
                <div className="prod-form-group">
                  <label className="prod-form-label">Kategori</label>
                  <select 
                    className="prod-form-select"
                    value={editForm.category}
                    onChange={(e) => setEditForm(prev => ({ ...prev, category: e.target.value }))}
                  >
                    {categories.map((cat, i) => (
                      <option key={i} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="prod-form-group">
                  <label className="prod-form-label">Stok Aktual *</label>
                  <input 
                    type="number" 
                    className="prod-form-input" 
                    min="0"
                    value={editForm.stock}
                    onChange={(e) => setEditForm(prev => ({ ...prev, stock: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="prod-form-grid">
                <div className="prod-form-group">
                  <label className="prod-form-label">Harga Beli (Rp) *</label>
                  <input 
                    type="number" 
                    className="prod-form-input" 
                    min="0"
                    value={editForm.buyPrice}
                    onChange={(e) => setEditForm(prev => ({ ...prev, buyPrice: e.target.value }))}
                    required
                  />
                </div>
                <div className="prod-form-group">
                  <label className="prod-form-label">Harga Jual (Rp) *</label>
                  <input 
                    type="number" 
                    className="prod-form-input" 
                    min="0"
                    value={editForm.sellPrice}
                    onChange={(e) => setEditForm(prev => ({ ...prev, sellPrice: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="prod-form-group">
                <label className="prod-form-label">URL Foto Produk</label>
                <input 
                  type="text" 
                  className="prod-form-input" 
                  value={editForm.image}
                  onChange={(e) => setEditForm(prev => ({ ...prev, image: e.target.value }))}
                />
              </div>

              <div className="prod-form-group">
                <label className="prod-form-label">Deskripsi</label>
                <textarea 
                  className="prod-form-textarea" 
                  value={editForm.desc}
                  onChange={(e) => setEditForm(prev => ({ ...prev, desc: e.target.value }))}
                ></textarea>
              </div>

              <div className="prod-modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setShowEditModal(false)}>Batal</button>
                <button type="submit" className="btn-submit-action">Simpan Perubahan</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. Konfirmasi Hapus Produk */}
      {showDeleteConfirm && selectedProduct && (
        <div className="prod-modal-overlay">
          <div className="prod-confirm-card">
            <div className="prod-confirm-icon">
              <DeleteIcon />
            </div>
            <h3 className="prod-confirm-title">Yakin ingin menghapus produk ini?</h3>
            <p className="prod-confirm-text">
              Tindakan ini akan menghapus produk <strong>"{selectedProduct.name}"</strong> secara permanen dari daftar inventaris toko Anda.
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button className="btn-secondary" onClick={() => setShowDeleteConfirm(false)}>Batal</button>
              <button className="btn-danger" onClick={handleDeleteProduct}>Ya, Hapus</button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Modal Stok Masuk */}
      {showStockInModal && (
        <div className="prod-modal-overlay">
          <div className="prod-modal-card">
            <div className="prod-modal-header">
              <h2 className="prod-modal-title">Inventory: Stok Masuk</h2>
              <button className="prod-modal-close-btn" onClick={() => setShowStockInModal(false)}>×</button>
            </div>
            <form onSubmit={handleStockIn}>
              <div className="prod-form-group">
                <label className="prod-form-label">Pilih Produk *</label>
                <select 
                  className="prod-form-select"
                  value={stockInForm.productId}
                  onChange={(e) => setStockInForm(prev => ({ ...prev, productId: e.target.value }))}
                  required
                >
                  {products.map(p => (
                    <option key={p.id} value={p.id}>{p.name} (Stok saat ini: {p.stock})</option>
                  ))}
                </select>
              </div>

              <div className="prod-form-grid">
                <div className="prod-form-group">
                  <label className="prod-form-label">Jumlah Masuk (Unit) *</label>
                  <input 
                    type="number" 
                    className="prod-form-input" 
                    min="1" 
                    placeholder="10"
                    value={stockInForm.quantity}
                    onChange={(e) => setStockInForm(prev => ({ ...prev, quantity: e.target.value }))}
                    required
                  />
                </div>
                <div className="prod-form-group">
                  <label className="prod-form-label">Tanggal Masuk</label>
                  <input 
                    type="date" 
                    className="prod-form-input" 
                    value={stockInForm.date}
                    onChange={(e) => setStockInForm(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>
              </div>

              <div className="prod-form-group">
                <label className="prod-form-label">Catatan</label>
                <input 
                  type="text" 
                  className="prod-form-input" 
                  placeholder="Contoh: Restock bulanan dari supplier."
                  value={stockInForm.notes}
                  onChange={(e) => setStockInForm(prev => ({ ...prev, notes: e.target.value }))}
                />
              </div>

              <div className="prod-modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setShowStockInModal(false)}>Batal</button>
                <button type="submit" className="btn-submit-action">Simpan Stok Masuk</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. Modal Stok Keluar */}
      {showStockOutModal && (
        <div className="prod-modal-overlay">
          <div className="prod-modal-card">
            <div className="prod-modal-header">
              <h2 className="prod-modal-title">Inventory: Stok Keluar</h2>
              <button className="prod-modal-close-btn" onClick={() => setShowStockOutModal(false)}>×</button>
            </div>
            <form onSubmit={handleStockOut}>
              <div className="prod-form-group">
                <label className="prod-form-label">Pilih Produk *</label>
                <select 
                  className="prod-form-select"
                  value={stockOutForm.productId}
                  onChange={(e) => {
                    const id = e.target.value;
                    setStockOutForm(prev => ({ ...prev, productId: id }));
                  }}
                  required
                >
                  {products.map(p => (
                    <option key={p.id} value={p.id}>{p.name} (Stok saat ini: {p.stock})</option>
                  ))}
                </select>
              </div>

              <div className="prod-form-grid">
                <div className="prod-form-group">
                  <label className="prod-form-label">Jumlah Keluar (Unit) *</label>
                  <input 
                    type="number" 
                    className="prod-form-input" 
                    min="1" 
                    placeholder="5"
                    value={stockOutForm.quantity}
                    onChange={(e) => setStockOutForm(prev => ({ ...prev, quantity: e.target.value }))}
                    required
                  />
                </div>
                <div className="prod-form-group">
                  <label className="prod-form-label">Alasan Keluar</label>
                  <select 
                    className="prod-form-select"
                    value={stockOutForm.reason}
                    onChange={(e) => setStockOutForm(prev => ({ ...prev, reason: e.target.value }))}
                  >
                    <option value="Rusak">Rusak / Cacat Produk</option>
                    <option value="Kadaluarsa">Kadaluarsa (Expired)</option>
                    <option value="Terjual Manual">Terjual Manual (Offline POS)</option>
                    <option value="Hilang">Kehilangan Barang</option>
                    <option value="Lainnya">Lain-lain</option>
                  </select>
                </div>
              </div>

              <div className="prod-form-group">
                <label className="prod-form-label">Tanggal Keluar</label>
                <input 
                  type="date" 
                  className="prod-form-input" 
                  value={stockOutForm.date}
                  onChange={(e) => setStockOutForm(prev => ({ ...prev, date: e.target.value }))}
                />
              </div>

              <div className="prod-modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setShowStockOutModal(false)}>Batal</button>
                <button type="submit" className="btn-submit-action" style={{ background: '#f97316' }}>Simpan Stok Keluar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. Modal Penyesuaian Stok */}
      {showStockAdjustModal && (
        <div className="prod-modal-overlay">
          <div className="prod-modal-card">
            <div className="prod-modal-header">
              <h2 className="prod-modal-title">Inventory: Penyesuaian Stok</h2>
              <button className="prod-modal-close-btn" onClick={() => setShowStockAdjustModal(false)}>×</button>
            </div>
            <form onSubmit={handleStockAdjust}>
              <div className="prod-form-group">
                <label className="prod-form-label">Pilih Produk *</label>
                <select 
                  className="prod-form-select"
                  value={stockAdjustForm.productId}
                  onChange={(e) => {
                    const id = e.target.value;
                    const p = products.find(prod => prod.id === id);
                    setStockAdjustForm(prev => ({ ...prev, productId: id, actualStock: p ? p.stock : 0 }));
                  }}
                  required
                >
                  {products.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div className="prod-form-grid">
                <div className="prod-form-group">
                  <label className="prod-form-label">Stok Sistem (Saat Ini)</label>
                  <input 
                    type="text" 
                    className="prod-form-input" 
                    value={(products.find(p => p.id === stockAdjustForm.productId)?.stock ?? 0) + ' Unit'} 
                    disabled 
                    style={{ background: '#f1f5f9', color: '#64748b' }}
                  />
                </div>
                <div className="prod-form-group">
                  <label className="prod-form-label">Stok Aktual di Toko *</label>
                  <input 
                    type="number" 
                    className="prod-form-input" 
                    min="0" 
                    placeholder="15"
                    value={stockAdjustForm.actualStock}
                    onChange={(e) => setStockAdjustForm(prev => ({ ...prev, actualStock: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="prod-form-group">
                <label className="prod-form-label">Catatan Penyesuaian *</label>
                <input 
                  type="text" 
                  className="prod-form-input" 
                  placeholder="Contoh: Hasil Stock Opname Mei 2026."
                  value={stockAdjustForm.notes}
                  onChange={(e) => setStockAdjustForm(prev => ({ ...prev, notes: e.target.value }))}
                  required
                />
              </div>

              <div className="prod-modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setShowStockAdjustModal(false)}>Batal</button>
                <button type="submit" className="btn-submit-action" style={{ background: '#4f46e5' }}>Sesuaikan Stok</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 8. Modal Tambah Kategori */}
      {showAddCategoryModal && (
        <div className="prod-modal-overlay">
          <div className="prod-modal-card" style={{ width: '400px' }}>
            <div className="prod-modal-header">
              <h2 className="prod-modal-title">Tambah Kategori Baru</h2>
              <button className="prod-modal-close-btn" onClick={() => setShowAddCategoryModal(false)}>×</button>
            </div>
            <form onSubmit={handleAddCategory}>
              <div className="prod-form-group">
                <label className="prod-form-label">Nama Kategori *</label>
                <input 
                  type="text" 
                  className="prod-form-input" 
                  placeholder="Contoh: Kecantikan"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  required
                />
              </div>

              <div className="prod-modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setShowAddCategoryModal(false)}>Batal</button>
                <button type="submit" className="btn-submit-action">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 9. Modal Edit Kategori */}
      {showEditCategoryModal && (
        <div className="prod-modal-overlay">
          <div className="prod-modal-card" style={{ width: '400px' }}>
            <div className="prod-modal-header">
              <h2 className="prod-modal-title">Ubah Nama Kategori</h2>
              <button className="prod-modal-close-btn" onClick={() => setShowEditCategoryModal(false)}>×</button>
            </div>
            <form onSubmit={handleEditCategory}>
              <div className="prod-form-group">
                <label className="prod-form-label">Nama Kategori *</label>
                <input 
                  type="text" 
                  className="prod-form-input" 
                  value={editCategoryName}
                  onChange={(e) => setEditCategoryName(e.target.value)}
                  required
                />
              </div>

              <div className="prod-modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setShowEditCategoryModal(false)}>Batal</button>
                <button type="submit" className="btn-submit-action">Simpan Perubahan</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 10. Konfirmasi Hapus Kategori */}
      {showDeleteCategoryConfirm && selectedCategory && (
        <div className="prod-modal-overlay">
          <div className="prod-confirm-card">
            <div className="prod-confirm-icon">
              <DeleteIcon />
            </div>
            <h3 className="prod-confirm-title">Yakin ingin menghapus kategori ini?</h3>
            <p className="prod-confirm-text">
              Kategori <strong>"{selectedCategory}"</strong> akan dihapus. Semua produk di bawah kategori ini akan otomatis dipindahkan ke kategori cadangan <strong>"Lainnya"</strong>.
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button className="btn-secondary" onClick={() => setShowDeleteCategoryConfirm(false)}>Batal</button>
              <button className="btn-danger" onClick={handleDeleteCategory}>Ya, Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Minimal Icons
function ClipboardIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M9 14l2 2 4-4"/></svg>; }
function SearchIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>; }
function WarningIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>; }
function ErrorIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>; }
function ChevronLeftIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>; }
function ChevronRightIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>; }
function ArrowRightIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>; }
function InIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>; }
function OutIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="12" y1="8" x2="12" y2="8"/></svg>; }
function AdjustIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>; }
function CategoryIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>; }
function FolderAddIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/><line x1="12" y1="11" x2="12" y2="17"/><line x1="9" y1="14" x2="15" y2="14"/></svg>; }
function EditIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>; }
function DeleteIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>; }
function PlusIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>; }
function FilterIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>; }
