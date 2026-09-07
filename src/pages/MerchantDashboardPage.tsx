import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Reservation, Product, ReservationStatus } from '../types';
import { getShopReservations, updateReservationStatus } from '../services/firebase/reservationService';
import { getShopProducts, updateProduct, createProduct } from '../services/firebase/shopService';
import { logoutMerchant, onMerchantAuthStateChanged } from '../services/firebase/authService';
import { 
  Shield, 
  LogOut, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ShoppingBag, 
  Plus, 
  Layers, 
  Phone,
  User,
  AlertCircle
} from 'lucide-react';

export const MerchantDashboardPage: React.FC = () => {
  const { shop } = useShop();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'reservations' | 'inventory'>('reservations');
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  // New product state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newProductCategory, setNewProductCategory] = useState<'saree' | 'kurta' | 'kurta-set' | 'dress' | 'shirt'>('saree');
  const [newProductPrice, setNewProductPrice] = useState('2999');
  const [newProductStock, setNewProductStock] = useState('2');

  const shopId = shop?.id || 'shop_maa_tara_gariahat';

  useEffect(() => {
    const unsubscribe = onMerchantAuthStateChanged((user) => {
      if (!user) {
        navigate('/admin/login');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const refreshData = async () => {
    setLoading(true);
    try {
      const [resList, prodList] = await Promise.all([
        getShopReservations(shopId),
        getShopProducts(shopId),
      ]);
      setReservations(resList);
      setProducts(prodList);
    } catch (err) {
      console.error('Error fetching merchant data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, [shopId]);

  const handleStatusChange = async (resId: string, newStatus: ReservationStatus) => {
    try {
      await updateReservationStatus(resId, newStatus);
      setActionMessage(`Reservation ${resId} marked as ${newStatus}`);
      setTimeout(() => setActionMessage(null), 3000);
      refreshData();
    } catch (err: any) {
      alert(err.message || 'Failed to update reservation');
    }
  };

  const handleToggleProductAvailability = async (product: Product) => {
    try {
      await updateProduct(product.id, {
        isAvailable: !product.isAvailable,
      });
      refreshData();
    } catch (err: any) {
      alert('Failed to update product availability');
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductName.trim()) return;

    try {
      await createProduct({
        shopId,
        name: newProductName.trim(),
        nameBn: newProductName.trim(),
        description: 'New festive collection arrival.',
        descriptionBn: 'নতুন উৎসবের পোশাক।',
        category: newProductCategory,
        price: parseInt(newProductPrice, 10) || 1999,
        imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80',
        sizes: ['M', 'L', 'XL'],
        colours: ['Festive Red'],
        occasionTags: ['puja', 'dinner'],
        styleTags: ['traditional'],
        stockQuantity: parseInt(newProductStock, 10) || 1,
        isAvailable: true,
      });

      setShowAddModal(false);
      setNewProductName('');
      setActionMessage('New product added to rack inventory.');
      setTimeout(() => setActionMessage(null), 3000);
      refreshData();
    } catch (err: any) {
      alert(err.message || 'Failed to add product');
    }
  };

  const handleLogout = async () => {
    await logoutMerchant();
    navigate('/admin/login');
  };

  const pendingCount = reservations.filter((r) => r.status === 'pending').length;
  const confirmedCount = reservations.filter((r) => r.status === 'confirmed').length;
  const availableCount = products.filter((p) => p.isAvailable && p.stockQuantity > 0).length;

  return (
    <div className="flex-1 p-4 pt-3 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-line pb-3 mb-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted block">
            Counter Floor Portal
          </span>
          <h1 className="text-xl font-serif font-bold text-ink">
            {shop?.name || 'Maa Tara Bastralaya'}
          </h1>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="p-2 rounded-xl bg-cream hover:bg-creamDark text-muted hover:text-ink border border-line text-xs font-semibold flex items-center gap-1.5 transition-colors"
        >
          <LogOut size={14} />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Action Notification */}
      {actionMessage && (
        <div className="mb-4 p-2.5 rounded-xl bg-templeGreen/10 border border-templeGreen/20 text-xs text-templeGreen font-semibold flex items-center gap-2">
          <CheckCircle2 size={15} />
          <span>{actionMessage}</span>
        </div>
      )}

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-cream/70 rounded-xl p-2.5 border border-line text-center">
          <span className="text-[10px] uppercase font-bold text-muted block">Pending</span>
          <span className="text-xl font-mono font-bold text-amber-600">{pendingCount}</span>
        </div>
        <div className="bg-cream/70 rounded-xl p-2.5 border border-line text-center">
          <span className="text-[10px] uppercase font-bold text-muted block">Confirmed</span>
          <span className="text-xl font-mono font-bold text-templeGreen">{confirmedCount}</span>
        </div>
        <div className="bg-cream/70 rounded-xl p-2.5 border border-line text-center">
          <span className="text-[10px] uppercase font-bold text-muted block">Available</span>
          <span className="text-xl font-mono font-bold text-ink">{availableCount}</span>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex bg-cream p-1 rounded-xl border border-line mb-4">
        <button
          type="button"
          onClick={() => setActiveTab('reservations')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'reservations'
              ? 'bg-warm text-ink shadow-sm'
              : 'text-muted hover:text-ink'
          }`}
        >
          Reservations ({reservations.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('inventory')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'inventory'
              ? 'bg-warm text-ink shadow-sm'
              : 'text-muted hover:text-ink'
          }`}
        >
          Rack Inventory ({products.length})
        </button>
      </div>

      {/* Tab 1: Reservations */}
      {activeTab === 'reservations' && (
        <div className="space-y-3">
          {reservations.length === 0 ? (
            <div className="text-center py-8 text-xs text-muted">No reservations placed today.</div>
          ) : (
            reservations.map((res) => {
              const isPending = res.status === 'pending';
              const isConfirmed = res.status === 'confirmed';

              return (
                <div
                  key={res.id}
                  className="p-3.5 rounded-2xl border border-line bg-warm shadow-sm flex flex-col gap-2.5"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-mono font-bold text-terracotta">
                        #{res.id}
                      </span>
                      <h4 className="text-sm font-serif font-bold text-ink">
                        {res.productSnapshot?.name || 'Festive Garment'}
                      </h4>
                      <p className="text-xs text-muted">
                        Size: <span className="font-semibold text-ink">{res.selectedSize}</span> &bull;{' '}
                        Colour: <span className="font-semibold text-ink">{res.selectedColour}</span>
                      </p>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        res.status === 'pending'
                          ? 'bg-amber-100 text-amber-800'
                          : res.status === 'confirmed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : res.status === 'collected'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-zinc-100 text-zinc-600'
                      }`}
                    >
                      {res.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1 border-t border-line/60">
                    <div className="flex items-center gap-1.5 text-ink font-medium">
                      <User size={13} className="text-muted" />
                      <span>{res.customerName}</span>
                    </div>

                    <a
                      href={`tel:${res.customerPhone}`}
                      className="flex items-center gap-1 font-mono text-terracotta hover:underline"
                    >
                      <Phone size={12} />
                      <span>{res.customerPhone}</span>
                    </a>
                  </div>

                  {/* Merchant Action Buttons */}
                  <div className="flex items-center gap-2 pt-2 border-t border-line/60">
                    {isPending && (
                      <button
                        type="button"
                        onClick={() => handleStatusChange(res.id, 'confirmed')}
                        className="flex-1 py-1.5 px-3 rounded-lg bg-templeGreen hover:bg-templeGreenDark text-white text-xs font-semibold"
                      >
                        Confirm Hold
                      </button>
                    )}

                    {isConfirmed && (
                      <button
                        type="button"
                        onClick={() => handleStatusChange(res.id, 'collected')}
                        className="flex-1 py-1.5 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold"
                      >
                        Mark Collected
                      </button>
                    )}

                    {(isPending || isConfirmed) && (
                      <button
                        type="button"
                        onClick={() => handleStatusChange(res.id, 'cancelled')}
                        className="py-1.5 px-3 rounded-lg bg-cream hover:bg-creamDark text-zinc-700 border border-line text-xs font-medium"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Tab 2: Rack Inventory */}
      {activeTab === 'inventory' && (
        <div className="space-y-3">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="py-1.5 px-3 rounded-xl bg-terracotta text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm"
            >
              <Plus size={14} />
              <span>Add New Item</span>
            </button>
          </div>

          <div className="space-y-2">
            {products.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-xl border border-line bg-warm flex items-center justify-between gap-3"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-12 h-12 rounded-lg object-cover bg-cream shrink-0 border border-line"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-serif font-bold text-ink truncate">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-muted">
                    ₹{item.price.toLocaleString('en-IN')} &bull; Stock: {item.stockQuantity}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleToggleProductAvailability(item)}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider transition-colors ${
                    item.isAvailable
                      ? 'bg-templeGreen/15 text-templeGreen border border-templeGreen/30'
                      : 'bg-zinc-200 text-zinc-600'
                  }`}
                >
                  {item.isAvailable ? 'ON RACK' : 'HIDDEN'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-ink/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-warm rounded-2xl border border-line p-5 w-full max-w-sm shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-serif font-bold text-ink">Add Rack Product</h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-muted hover:text-ink text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  placeholder="e.g. Mustard Yellow Tussar Silk Saree"
                  className="w-full px-3 py-2 rounded-lg border border-line bg-warm"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold mb-1">Category</label>
                  <select
                    value={newProductCategory}
                    onChange={(e: any) => setNewProductCategory(e.target.value)}
                    className="w-full px-2 py-2 rounded-lg border border-line bg-warm"
                  >
                    <option value="saree">Saree</option>
                    <option value="kurta">Kurta</option>
                    <option value="kurta-set">Kurta Set</option>
                    <option value="dress">Dress</option>
                    <option value="shirt">Shirt</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={newProductPrice}
                    onChange={(e) => setNewProductPrice(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-line bg-warm"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">Stock Quantity</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={newProductStock}
                  onChange={(e) => setNewProductStock(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-line bg-warm"
                />
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2 rounded-lg bg-cream border border-line font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-lg bg-terracotta text-white font-semibold"
                >
                  Save to Rack
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
