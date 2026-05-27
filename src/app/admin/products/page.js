export default function ProductsPage() {
  return (
    <div>

      {/* Top Stat Cards */}
      <div className="stat-cards" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: '0' }}>
        <div className="card stat-card" style={{ flexDirection: 'row', alignItems: 'center', gap: '16px' }}>
          <div className="stat-icon icon-indigo" style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#eff6ff', color: '#3b82f6' }}>
            <ClipboardIcon />
          </div>
          <div>
            <div className="stat-desc" style={{ color: '#64748b', fontSize: '12px', fontWeight: '500', textTransform: 'none' }}>Total Produk</div>
            <div className="stat-value" style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span style={{ fontSize: '24px', fontWeight: '600', color: '#0f172a' }}>1,284</span> <span style={{ fontSize: '13px', color: '#64748b', fontWeight: '400' }}>Items</span>
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
              <span style={{ fontSize: '24px', fontWeight: '600', color: '#0f172a' }}>24</span> <span style={{ fontSize: '13px', color: '#64748b', fontWeight: '400' }}>Kritis</span>
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
              <span style={{ fontSize: '24px', fontWeight: '600', color: '#0f172a' }}>8</span> <span style={{ fontSize: '13px', color: '#64748b', fontWeight: '400' }}>Kosong</span>
            </div>
          </div>
        </div>
      </div>

      <div className="products-layout">
        
        {/* MAIN AREA */}
        <div className="main-content-area">
          {/* Filters */}
          <div className="filter-row" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', display: 'flex' }}>
                <SearchIcon />
              </div>
              <input type="text" placeholder="Cari nama produk, SKU, atau barcode..." className="filter-select" style={{ width: '100%', paddingLeft: '36px', paddingRight: '16px', backgroundImage: 'none', margin: 0 }} />
            </div>

            <button className="filter-select" style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingRight: '16px', backgroundImage: 'none', margin: 0 }}>
              <FilterIcon /> Filter
            </button>
            
            <button className="btn-primary" style={{ margin: 0, width: 'auto', padding: '10px 20px', background: '#2563eb', color: 'white', borderRadius: '8px' }}>
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
                  <tr>
                    <td>
                      <div style={{ fontWeight: '500', color: '#0f172a', fontSize: '13px' }}>PRD-001</div>
                      <div style={{ color: '#64748b', fontSize: '12px' }}>899276100123</div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div className="product-table-img" style={{ background: '#f1f5f9', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <span style={{ color: '#64748b', fontWeight: '500' }}>S</span>
                        </div>
                        <span style={{ fontWeight: '500', color: '#0f172a', fontSize: '14px', maxWidth: '160px', lineHeight: '1.4' }}>Nike Air Max Red</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ color: '#475569', fontSize: '13px', maxWidth: '100px', lineHeight: '1.4' }}>Sepatu Pria</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: '500', color: '#0f172a', fontSize: '14px' }}>42 <span style={{ color: '#64748b', fontSize: '12px', fontWeight: '400' }}>Units</span></div>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: '600', color: '#0f172a', fontSize: '14px' }}>Rp 1.850.000</div>
                      <div style={{ color: '#64748b', fontSize: '12px' }}>Rp 1.200.000</div>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <div style={{ fontWeight: '500', color: '#0f172a', fontSize: '13px' }}>PRD-042</div>
                      <div style={{ color: '#64748b', fontSize: '12px' }}>899276100555</div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div className="product-table-img" style={{ background: '#f1f5f9', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <span style={{ color: '#64748b', fontWeight: '500' }}>W</span>
                        </div>
                        <span style={{ fontWeight: '500', color: '#0f172a', fontSize: '14px', maxWidth: '160px', lineHeight: '1.4' }}>Smartwatch Pro v2</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ color: '#475569', fontSize: '13px', maxWidth: '100px', lineHeight: '1.4' }}>Elektronik</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: '500', color: '#0f172a', fontSize: '14px' }}>4 <span style={{ color: '#64748b', fontSize: '12px', fontWeight: '400' }}>Units</span></div>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: '600', color: '#0f172a', fontSize: '14px' }}>Rp 3.200.000</div>
                      <div style={{ color: '#64748b', fontSize: '12px' }}>Rp 2.450.000</div>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <div style={{ fontWeight: '500', color: '#0f172a', fontSize: '13px' }}>PRD-109</div>
                      <div style={{ color: '#64748b', fontSize: '12px' }}>899276100999</div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div className="product-table-img" style={{ background: '#fef2f2', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <span style={{ color: '#ef4444', fontWeight: '500' }}>H</span>
                        </div>
                        <span style={{ fontWeight: '500', color: '#0f172a', fontSize: '14px', maxWidth: '160px', lineHeight: '1.4' }}>Headphone Sony WH</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ color: '#475569', fontSize: '13px', maxWidth: '100px', lineHeight: '1.4' }}>Elektronik</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: '500', color: '#ef4444', fontSize: '14px' }}>0 <span style={{ color: '#64748b', fontSize: '12px', fontWeight: '400' }}>Units</span></div>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: '600', color: '#0f172a', fontSize: '14px' }}>Rp 5.500.000</div>
                      <div style={{ color: '#64748b', fontSize: '12px' }}>Rp 4.100.000</div>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <div style={{ fontWeight: '500', color: '#0f172a', fontSize: '13px' }}>PRD-215</div>
                      <div style={{ color: '#64748b', fontSize: '12px' }}>899276102154</div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div className="product-table-img" style={{ background: '#f1f5f9', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <span style={{ color: '#64748b', fontWeight: '500' }}>K</span>
                        </div>
                        <span style={{ fontWeight: '500', color: '#0f172a', fontSize: '14px', maxWidth: '160px', lineHeight: '1.4' }}>Kopi Kenangan Mantan</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ color: '#475569', fontSize: '13px', maxWidth: '100px', lineHeight: '1.4' }}>Minuman</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: '500', color: '#0f172a', fontSize: '14px' }}>158 <span style={{ color: '#64748b', fontSize: '12px', fontWeight: '400' }}>Units</span></div>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: '600', color: '#0f172a', fontSize: '14px' }}>Rp 18.000</div>
                      <div style={{ color: '#64748b', fontSize: '12px' }}>Rp 25.000</div>
                    </td>
                  </tr>

                  <tr>
                    <td style={{ borderBottom: 'none' }}>
                      <div style={{ fontWeight: '500', color: '#0f172a', fontSize: '13px' }}>PRD-330</div>
                      <div style={{ color: '#64748b', fontSize: '12px' }}>899276103301</div>
                    </td>
                    <td style={{ borderBottom: 'none' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div className="product-table-img" style={{ background: '#f1f5f9', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <span style={{ color: '#64748b', fontWeight: '500' }}>T</span>
                        </div>
                        <span style={{ fontWeight: '500', color: '#0f172a', fontSize: '14px', maxWidth: '160px', lineHeight: '1.4' }}>Tas Ransel Eiger</span>
                      </div>
                    </td>
                    <td style={{ borderBottom: 'none' }}>
                      <div style={{ color: '#475569', fontSize: '13px', maxWidth: '100px', lineHeight: '1.4' }}>Aksesoris</div>
                    </td>
                    <td style={{ borderBottom: 'none' }}>
                      <div style={{ fontWeight: '500', color: '#0f172a', fontSize: '14px' }}>12 <span style={{ color: '#64748b', fontSize: '12px', fontWeight: '400' }}>Units</span></div>
                    </td>
                    <td style={{ textAlign: 'right', borderBottom: 'none' }}>
                      <div style={{ fontWeight: '600', color: '#0f172a', fontSize: '14px' }}>Rp 385.000</div>
                      <div style={{ color: '#64748b', fontSize: '12px' }}>Rp 450.000</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="pagination-row">
              <div>Menampilkan <span style={{ fontWeight: '700', color: '#4a589f' }}>1-10</span> dari <span style={{ fontWeight: '700', color: '#1e0044' }}>1,284</span> produk</div>
              <div className="pagination-controls">
                <button className="page-btn"><ChevronLeftIcon /></button>
                <button className="page-btn active">1</button>
                <button className="page-btn">2</button>
                <button className="page-btn">3</button>
                <span style={{ margin: '0 4px' }}>...</span>
                <button className="page-btn">129</button>
                <button className="page-btn" style={{ background: '#f1f5f9' }}><ChevronRightIcon /></button>
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
              <div className="action-item">
                <div className="action-item-left">
                  <div className="action-icon"><InIcon /></div>
                  Stok Masuk
                </div>
                <ArrowRightIcon />
              </div>
              <div className="action-item">
                <div className="action-item-left">
                  <div className="action-icon"><OutIcon /></div>
                  Stok Keluar
                </div>
                <ArrowRightIcon />
              </div>
              <div className="action-item">
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
            <button className="btn-primary">
              <FolderAddIcon /> Tambah Kategori
            </button>
            <div className="btn-row">
              <button className="btn-outline-circle">
                <EditIcon /> EDIT
              </button>
              <button className="btn-outline-circle" style={{ color: '#ef4444' }}>
                <DeleteIcon /> HAPUS
              </button>
            </div>
          </div>

        </div>
      </div>
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
