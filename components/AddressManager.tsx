"use client";

import { useState, useEffect } from "react";
import { Loader2, Plus, Edit2, Trash2, MapPin } from "lucide-react";
import { useToast } from "@/context/ToastContext";
import { useAuth } from "@/context/AuthContext";
import {
  Address,
  AddressInsert,
  fetchAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
} from "@/lib/api/addresses";

interface AddressManagerProps {
  onAddressSelect?: (address: Address) => void;
  selectable?: boolean;
  selectedAddressId?: string;
}

export default function AddressManager({ onAddressSelect, selectable = false, selectedAddressId }: AddressManagerProps) {
  const { account } = useAuth();
  const { showToast } = useToast();
  
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [isSelectingMode, setIsSelectingMode] = useState(!selectedAddressId);
  
  const [form, setForm] = useState<AddressInsert>({
    full_name: account?.name || "",
    phone_number: account?.phone || "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "India",
    is_default: false,
  });

  useEffect(() => {
    if (account) {
      loadAddresses();
      // Pre-fill form with account details if they change and form is empty
      setForm(prev => ({
        ...prev,
        full_name: prev.full_name || account.name || "",
        phone_number: prev.phone_number || account.phone || "",
      }));
    }
  }, [account]);

  const loadAddresses = async () => {
    try {
      setLoading(true);
      const data = await fetchAddresses();
      setAddresses(data);
    } catch (err: any) {
      console.error(err);
      showToast(err.message || "Failed to load addresses");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenForm = (address?: Address) => {
    if (address) {
      setEditingId(address.id);
      setForm({
        full_name: address.full_name,
        phone_number: address.phone_number,
        address_line1: address.address_line1,
        address_line2: address.address_line2,
        city: address.city,
        state: address.state,
        postal_code: address.postal_code,
        country: address.country,
        is_default: address.is_default,
      });
    } else {
      setEditingId(null);
      setForm({
        full_name: account?.name || "",
        phone_number: account?.phone || "",
        address_line1: "",
        address_line2: "",
        city: "",
        state: "",
        postal_code: "",
        country: "India",
        is_default: addresses.length === 0, // Auto-default if it's the first one
      });
    }
    setShowForm(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      if (editingId) {
        await updateAddress(editingId, form);
        showToast("Address updated successfully");
      } else {
        const newAddress = await createAddress(form);
        showToast("Address saved successfully");
        if (selectable && onAddressSelect) {
            onAddressSelect(newAddress);
            setIsSelectingMode(false);
        }
      }
      setShowForm(false);
      await loadAddresses();
    } catch (err: any) {
      console.error(err);
      showToast(err.message || "Failed to save address");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this address?")) return;
    try {
      await deleteAddress(id);
      showToast("Address deleted");
      await loadAddresses();
    } catch (err: any) {
      console.error(err);
      showToast(err.message || "Failed to delete address");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-[#827e9c]" />
      </div>
    );
  }

  return (
    <div className="w-full">
      {!showForm ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-medium text-[#0f172a] uppercase tracking-wider">
              {selectable && !isSelectingMode ? "Shipping Address" : selectable ? "Select Shipping Address" : "Saved Addresses"}
            </h3>
            
            {selectable && !isSelectingMode ? (
              <button
                type="button"
                onClick={() => setIsSelectingMode(true)}
                className="text-sm font-medium text-[#0f172a] flex items-center gap-1 hover:text-[#827e9c] transition-colors"
              >
                Change
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleOpenForm()}
                className="text-sm font-medium text-[#0f172a] flex items-center gap-1 hover:text-[#827e9c] transition-colors"
              >
                <Plus className="h-4 w-4" /> Add New
              </button>
            )}
          </div>

          {addresses.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[#c5c6cc] p-8 text-center">
              <MapPin className="mx-auto h-8 w-8 text-[#827e9c] mb-3" />
              <p className="text-sm text-[#0f172a] font-medium">No saved addresses</p>
              <p className="text-xs text-[#827e9c] mt-1 mb-4">Add an address for faster checkout.</p>
              <button
                type="button"
                onClick={() => handleOpenForm()}
                className="inline-flex items-center justify-center rounded-full bg-[#0f172a] px-5 py-2 text-xs font-medium text-white transition-all duration-300 hover:bg-[#827e9c]"
              >
                Add Address
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addresses
                .filter(addr => selectable && !isSelectingMode ? addr.id === selectedAddressId : true)
                .map((addr) => (
                <div
                  key={addr.id}
                  onClick={() => {
                    if (selectable) {
                      onAddressSelect?.(addr);
                      setIsSelectingMode(false);
                    }
                  }}
                  className={`relative rounded-xl border p-4 transition-all duration-300 ${
                    selectable && isSelectingMode
                      ? "cursor-pointer hover:border-[#0f172a]"
                      : ""
                  } ${
                    selectedAddressId === addr.id
                      ? "border-2 border-[#0f172a] bg-[#0f172a]/5 shadow-md"
                      : addr.is_default && !selectable
                      ? "border-[#0f172a] bg-[#0f172a]/5" 
                      : "border-[#c5c6cc]"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-[#0f172a]">{addr.full_name}</p>
                      {addr.is_default && (
                        <span className="rounded-full bg-[#0f172a] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                          Default
                        </span>
                      )}
                    </div>
                    {!selectable && (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); handleOpenForm(addr); }}
                          className="text-[#827e9c] hover:text-[#0f172a]"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); handleDelete(addr.id); }}
                          className="text-[#827e9c] hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="text-sm text-[#827e9c] leading-relaxed">
                    <p>{addr.address_line1}</p>
                    {addr.address_line2 && <p>{addr.address_line2}</p>}
                    <p>{addr.city}, {addr.state} {addr.postal_code}</p>
                    <p>{addr.country}</p>
                    <p className="mt-2 text-[#0f172a] font-medium flex items-center gap-1.5">
                      Phone: {addr.phone_number}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <form onSubmit={handleSave} className="rounded-xl border border-[#c5c6cc] p-5 sm:p-6 animate-fade-in bg-white">
          <h3 className="text-lg font-semibold text-[#0f172a] mb-5">
            {editingId ? "Edit Address" : "Add New Address"}
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#0f172a]">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={form.full_name}
                onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                className="w-full rounded-lg border border-[#c5c6cc] px-3 py-2 text-sm text-[#0f172a] outline-none focus:border-[#827e9c] transition-all"
                placeholder="Ananya Sharma"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#0f172a]">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={form.phone_number}
                onChange={(e) => setForm({ ...form, phone_number: e.target.value })}
                className="w-full rounded-lg border border-[#c5c6cc] px-3 py-2 text-sm text-[#0f172a] outline-none focus:border-[#827e9c] transition-all"
                placeholder="+91 9876543210"
              />
            </div>
            
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#0f172a]">
                Address Line 1 *
              </label>
              <input
                type="text"
                required
                value={form.address_line1}
                onChange={(e) => setForm({ ...form, address_line1: e.target.value })}
                className="w-full rounded-lg border border-[#c5c6cc] px-3 py-2 text-sm text-[#0f172a] outline-none focus:border-[#827e9c] transition-all"
                placeholder="Flat / House No. / Building / Company / Apartment"
              />
            </div>
            
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#0f172a]">
                Address Line 2 (Optional)
              </label>
              <input
                type="text"
                value={form.address_line2 || ""}
                onChange={(e) => setForm({ ...form, address_line2: e.target.value })}
                className="w-full rounded-lg border border-[#c5c6cc] px-3 py-2 text-sm text-[#0f172a] outline-none focus:border-[#827e9c] transition-all"
                placeholder="Area, Street, Sector, Village"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#0f172a]">
                City *
              </label>
              <input
                type="text"
                required
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="w-full rounded-lg border border-[#c5c6cc] px-3 py-2 text-sm text-[#0f172a] outline-none focus:border-[#827e9c] transition-all"
                placeholder="Hyderabad"
              />
            </div>
            
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#0f172a]">
                State *
              </label>
              <input
                type="text"
                required
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
                className="w-full rounded-lg border border-[#c5c6cc] px-3 py-2 text-sm text-[#0f172a] outline-none focus:border-[#827e9c] transition-all"
                placeholder="Telangana"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#0f172a]">
                Pincode *
              </label>
              <input
                type="text"
                required
                value={form.postal_code}
                onChange={(e) => setForm({ ...form, postal_code: e.target.value })}
                className="w-full rounded-lg border border-[#c5c6cc] px-3 py-2 text-sm text-[#0f172a] outline-none focus:border-[#827e9c] transition-all"
                placeholder="500039"
              />
            </div>
            
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#0f172a]">
                Country *
              </label>
              <input
                type="text"
                required
                disabled
                value={form.country}
                className="w-full rounded-lg border border-[#c5c6cc] bg-gray-50 px-3 py-2 text-sm text-[#0f172a] outline-none opacity-80"
              />
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <input
              type="checkbox"
              id="is_default"
              checked={form.is_default}
              onChange={(e) => setForm({ ...form, is_default: e.target.checked })}
              className="h-4 w-4 rounded border-gray-300 text-[#0f172a] focus:ring-[#0f172a]"
            />
            <label htmlFor="is_default" className="text-sm text-[#0f172a]">
              Make this my default address
            </label>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 rounded-full bg-[#0f172a] px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#827e9c] disabled:opacity-70 flex justify-center items-center gap-2"
            >
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              Save Address
            </button>
            <button
              type="button"
              disabled={saving}
              onClick={() => setShowForm(false)}
              className="flex-1 rounded-full border border-[#c5c6cc] px-6 py-2.5 text-sm font-semibold text-[#0f172a] transition-all duration-300 hover:bg-[#c5c6cc]/30 disabled:opacity-70"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
