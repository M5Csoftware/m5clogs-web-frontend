"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Product,
  ProductCategory,
  ProductStockStatus,
  ComplianceStatus,
  ProductStatus,
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  duplicateProduct,
  bulkUpdateProductStatus,
  bulkDeleteProducts,
  resetProductsToDefault,
  exportProductsCSV,
  exportProductsJSON,
} from "@/lib/productsStore";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<"all" | ProductCategory>("all");
  const [selectedStockStatus, setSelectedStockStatus] = useState<string>("all");
  const [selectedCompliance, setSelectedCompliance] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [viewProduct, setViewProduct] = useState<Product | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  // Form State
  const initialFormData = {
    name: "",
    koreanName: "",
    brand: "",
    category: "skincare-beauty" as ProductCategory,
    subCategory: "Serums & Essences",
    sku: "",
    hsnCode: "33049910",
    tradePrice: 500,
    mrp: 999,
    moq: "36 units",
    stock: 100,
    stockStatus: "in_stock" as ProductStockStatus,
    complianceStatus: "CDSCO Form 43 Registered" as ComplianceStatus,
    shelfLifeMonths: 36,
    status: "active" as ProductStatus,
    featured: false,
    description: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  // Load products
  const refreshProducts = () => {
    setProducts(getProducts());
  };

  useEffect(() => {
    refreshProducts();
    const handleStorageUpdate = () => refreshProducts();
    window.addEventListener("m5c_products_updated", handleStorageUpdate);
    return () => window.removeEventListener("m5c_products_updated", handleStorageUpdate);
  }, []);

  const showToast = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(null), 3500);
  };

  // Metrics
  const stats = useMemo(() => {
    const total = products.length;
    const beauty = products.filter((p) => p.category === "skincare-beauty").length;
    const food = products.filter((p) => p.category === "food-beverages").length;
    const totalStockUnits = products.reduce((acc, p) => acc + (p.stock || 0), 0);
    const lowOrOutOfStock = products.filter(
      (p) => p.stockStatus === "low_stock" || p.stockStatus === "out_of_stock"
    ).length;
    const compliant = products.filter(
      (p) =>
        p.complianceStatus.includes("Registered") ||
        p.complianceStatus.includes("Green Dot") ||
        p.complianceStatus.includes("Brown Dot")
    ).length;
    return { total, beauty, food, totalStockUnits, lowOrOutOfStock, compliant };
  }, [products]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory !== "all" && p.category !== selectedCategory) return false;
      // Stock Status filter
      if (selectedStockStatus !== "all" && p.stockStatus !== selectedStockStatus) return false;
      // Compliance filter
      if (selectedCompliance !== "all") {
        if (selectedCompliance === "cdsco" && !p.complianceStatus.includes("CDSCO")) return false;
        if (selectedCompliance === "fssai-veg" && !p.complianceStatus.includes("Green Dot")) return false;
        if (selectedCompliance === "fssai-nonveg" && !p.complianceStatus.includes("Brown Dot")) return false;
      }
      // Status filter
      if (selectedStatus !== "all" && p.status !== selectedStatus) return false;

      // Search filter
      if (search.trim()) {
        const q = search.toLowerCase();
        const matches =
          p.name.toLowerCase().includes(q) ||
          p.koreanName.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.hsnCode.toLowerCase().includes(q) ||
          p.subCategory.toLowerCase().includes(q);
        if (!matches) return false;
      }

      return true;
    });
  }, [products, selectedCategory, selectedStockStatus, selectedCompliance, selectedStatus, search]);

  // Selection handlers
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filteredProducts.map((p) => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  // Open Add Modal
  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData(initialFormData);
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setFormData({
      name: p.name,
      koreanName: p.koreanName,
      brand: p.brand,
      category: p.category,
      subCategory: p.subCategory,
      sku: p.sku,
      hsnCode: p.hsnCode,
      tradePrice: p.tradePrice,
      mrp: p.mrp,
      moq: p.moq,
      stock: p.stock,
      stockStatus: p.stockStatus,
      complianceStatus: p.complianceStatus,
      shelfLifeMonths: p.shelfLifeMonths,
      status: p.status,
      featured: p.featured || false,
      description: p.description,
    });
    setIsModalOpen(true);
  };

  // Save Product (Create or Update)
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.brand.trim()) {
      alert("Product name and Brand are required.");
      return;
    }

    if (editingProduct) {
      updateProduct(editingProduct.id, formData);
      showToast(`Updated product "${formData.name}"`);
    } else {
      addProduct(formData);
      showToast(`Added new product "${formData.name}"`);
    }
    setIsModalOpen(false);
    refreshProducts();
  };

  // Delete Handlers
  const handleDelete = (id: string) => {
    const p = products.find((item) => item.id === id);
    deleteProduct(id);
    setConfirmDeleteId(null);
    showToast(`Deleted product ${p?.sku || id}`);
    refreshProducts();
  };

  // Duplicate Handler
  const handleDuplicate = (id: string) => {
    const copy = duplicateProduct(id);
    if (copy) {
      showToast(`Created duplicate "${copy.name}"`);
      refreshProducts();
    }
  };

  // Bulk actions
  const handleBulkStatus = (status: ProductStatus) => {
    if (selectedIds.length === 0) return;
    bulkUpdateProductStatus(selectedIds, status);
    showToast(`Updated status to ${status} for ${selectedIds.length} items.`);
    setSelectedIds([]);
    refreshProducts();
  };

  const handleBulkDelete = () => {
    if (selectedIds.length === 0) return;
    if (confirm(`Permanently delete ${selectedIds.length} selected products?`)) {
      bulkDeleteProducts(selectedIds);
      showToast(`Deleted ${selectedIds.length} products.`);
      setSelectedIds([]);
      refreshProducts();
    }
  };

  // Reset to default
  const handleResetCatalog = () => {
    if (confirm("Reset product catalog to default Korean import items? Any local edits will be replaced.")) {
      resetProductsToDefault();
      showToast("Reset catalog to default seed products.");
      refreshProducts();
    }
  };

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-8">
      {/* Toast Notification */}
      {feedbackMsg && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3.5 bg-[var(--ink)] text-white text-sm font-semibold rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-[var(--persimmon)]" />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 border-b border-[var(--line)] pb-7">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-md bg-[var(--peach)]/30 text-[var(--persimmon)] text-xs font-bold uppercase tracking-wider">
              Inventory & Tariffs
            </span>
            <span className="text-xs text-[var(--muted)] font-mono">HSN Compliant</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[var(--ink)] tracking-tight">
            Product Management
          </h1>
          <p className="text-sm text-[var(--muted)] mt-1 max-w-2xl font-medium">
            Manage your imported Korean skincare and food catalog, wholesale trade rates, Indian port clearance compliance (CDSCO Form 43 / FSSAI), and inventory.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={exportProductsCSV}
            className="px-4 py-2.5 rounded-xl border border-[var(--line)] bg-[var(--paper)] text-xs font-bold text-[var(--ink)] hover:bg-[var(--hanji-2)] transition shadow-2xs flex items-center gap-2 cursor-pointer"
            title="Download CSV"
          >
            <svg className="w-4 h-4 text-[var(--muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>CSV</span>
          </button>

          <button
            type="button"
            onClick={exportProductsJSON}
            className="px-4 py-2.5 rounded-xl border border-[var(--line)] bg-[var(--paper)] text-xs font-bold text-[var(--ink)] hover:bg-[var(--hanji-2)] transition shadow-2xs flex items-center gap-2 cursor-pointer"
            title="Download JSON"
          >
            <span>JSON</span>
          </button>

          <button
            type="button"
            onClick={handleResetCatalog}
            className="px-3.5 py-2.5 rounded-xl border border-[var(--line)] bg-[var(--paper)] text-xs font-semibold text-[var(--muted)] hover:text-[var(--persimmon)] hover:bg-[var(--hanji-2)] transition shadow-2xs cursor-pointer"
            title="Reset to default seed data"
          >
            Reset Catalog
          </button>

          <button
            type="button"
            onClick={handleOpenAdd}
            className="px-5 py-2.5 rounded-xl bg-[var(--persimmon)] hover:bg-[var(--persimmon-d)] text-white text-xs font-bold shadow-xs transition flex items-center gap-2 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Products */}
        <div
          onClick={() => {
            setSelectedCategory("all");
            setSelectedStockStatus("all");
          }}
          className="p-5 rounded-2xl bg-[var(--paper)] border border-[var(--line)] shadow-2xs cursor-pointer hover:border-[var(--persimmon)] transition group"
        >
          <div className="text-xs font-bold text-[var(--muted)] uppercase tracking-wider mb-1">
            Total Products
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[var(--ink)] group-hover:text-[var(--persimmon)] transition">
            {stats.total}
          </div>
          <div className="text-xs text-[var(--muted)] mt-1">Active Indian SKUs</div>
        </div>

        {/* Skincare & Beauty */}
        <div
          onClick={() => setSelectedCategory("skincare-beauty")}
          className={`p-5 rounded-2xl border shadow-2xs cursor-pointer transition group ${
            selectedCategory === "skincare-beauty"
              ? "bg-[var(--hanji-2)] border-[var(--persimmon)]"
              : "bg-[var(--paper)] border-[var(--line)] hover:border-[var(--persimmon)]"
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-[var(--muted)] uppercase tracking-wider">
              Beauty SKUs
            </span>
            <span className="font-kr text-xs font-bold text-[var(--persimmon)]">뷰티</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[var(--ink)] group-hover:text-[var(--persimmon)] transition">
            {stats.beauty}
          </div>
          <div className="text-xs text-[var(--muted)] mt-1">CDSCO Registered</div>
        </div>

        {/* Food & Beverages */}
        <div
          onClick={() => setSelectedCategory("food-beverages")}
          className={`p-5 rounded-2xl border shadow-2xs cursor-pointer transition group ${
            selectedCategory === "food-beverages"
              ? "bg-[var(--hanji-2)] border-[var(--persimmon)]"
              : "bg-[var(--paper)] border-[var(--line)] hover:border-[var(--persimmon)]"
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-[var(--muted)] uppercase tracking-wider">
              Food SKUs
            </span>
            <span className="font-kr text-xs font-bold text-[var(--jade)]">식품</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[var(--ink)] group-hover:text-[var(--jade)] transition">
            {stats.food}
          </div>
          <div className="text-xs text-[var(--muted)] mt-1">FSSAI Cleared</div>
        </div>

        {/* Warehouse Units */}
        <div className="p-5 rounded-2xl bg-[var(--paper)] border border-[var(--line)] shadow-2xs">
          <div className="text-xs font-bold text-[var(--muted)] uppercase tracking-wider mb-1">
            Total Inventory
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[var(--ink)]">
            {stats.totalStockUnits.toLocaleString()}
          </div>
          <div className="text-xs text-[var(--muted)] mt-1">Units in Warehouses</div>
        </div>

        {/* Low Stock Alerts */}
        <div
          onClick={() => setSelectedStockStatus("low_stock")}
          className={`p-5 rounded-2xl border shadow-2xs cursor-pointer transition group col-span-2 lg:col-span-1 ${
            selectedStockStatus === "low_stock"
              ? "bg-[var(--hanji-2)] border-amber-500"
              : "bg-[var(--paper)] border-[var(--line)] hover:border-amber-500"
          }`}
        >
          <div className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>Low Stock</span>
            {stats.lowOrOutOfStock > 0 && (
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            )}
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-900 group-hover:text-amber-600 transition">
            {stats.lowOrOutOfStock}
          </div>
          <div className="text-xs text-[var(--muted)] mt-1">Needs Port Re-order</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-[var(--line)]">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
              selectedCategory === "all"
                ? "bg-[var(--ink)] text-white shadow-2xs"
                : "bg-[var(--paper)] text-[var(--muted)] hover:text-[var(--ink)] border border-[var(--line)]"
            }`}
          >
            All Categories ({products.length})
          </button>

          <button
            type="button"
            onClick={() => setSelectedCategory("skincare-beauty")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              selectedCategory === "skincare-beauty"
                ? "bg-[var(--persimmon)] text-white shadow-2xs"
                : "bg-[var(--paper)] text-[var(--muted)] hover:text-[var(--ink)] border border-[var(--line)]"
            }`}
          >
            <span>Skincare & Beauty</span>
            <span className="text-[10px] font-kr font-normal opacity-85">뷰티</span>
            <span>({stats.beauty})</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedCategory("food-beverages")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              selectedCategory === "food-beverages"
                ? "bg-[var(--jade)] text-white shadow-2xs"
                : "bg-[var(--paper)] text-[var(--muted)] hover:text-[var(--ink)] border border-[var(--line)]"
            }`}
          >
            <span>Food & Beverages</span>
            <span className="text-[10px] font-kr font-normal opacity-85">식품</span>
            <span>({stats.food})</span>
          </button>
        </div>

        {/* Action & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Search Input with Guaranteed Left Padding */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search products by title, Hangul, brand, SKU, HSN..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full !pl-11 pr-4 py-3 rounded-xl border border-[var(--line)] bg-[var(--paper)] text-[14px] text-[var(--ink)] placeholder:text-[var(--muted)] focus:border-[var(--persimmon)] focus:outline-none transition shadow-2xs font-medium"
              style={{ paddingLeft: "2.85rem" }}
            />
            <svg
              className="w-5 h-5 text-[var(--muted)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Secondary Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Stock Filter */}
            <select
              value={selectedStockStatus}
              onChange={(e) => setSelectedStockStatus(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-[var(--line)] bg-[var(--paper)] text-xs font-bold text-[var(--ink)] focus:outline-none focus:border-[var(--persimmon)] shadow-2xs cursor-pointer"
            >
              <option value="all">Stock: All</option>
              <option value="in_stock">In Stock</option>
              <option value="low_stock">Low Stock</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>

            {/* Compliance Filter */}
            <select
              value={selectedCompliance}
              onChange={(e) => setSelectedCompliance(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-[var(--line)] bg-[var(--paper)] text-xs font-bold text-[var(--ink)] focus:outline-none focus:border-[var(--persimmon)] shadow-2xs cursor-pointer"
            >
              <option value="all">Compliance: All</option>
              <option value="cdsco">CDSCO Registered</option>
              <option value="fssai-veg">FSSAI Green (Veg)</option>
              <option value="fssai-nonveg">FSSAI Brown (Non-Veg)</option>
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-[var(--line)] bg-[var(--paper)] text-xs font-bold text-[var(--ink)] focus:outline-none focus:border-[var(--persimmon)] shadow-2xs cursor-pointer"
            >
              <option value="all">Status: All</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        {/* Bulk Actions Banner (Visible when items selected) */}
        {selectedIds.length > 0 && (
          <div className="p-3.5 rounded-xl bg-[var(--hanji-2)] border border-[var(--line)] flex flex-wrap items-center justify-between gap-3 animate-fade-in text-xs font-bold">
            <span className="text-[var(--ink)]">
              {selectedIds.length} product{selectedIds.length > 1 ? "s" : ""} selected
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleBulkStatus("active")}
                className="px-3 py-1.5 rounded-lg bg-[var(--paper)] hover:bg-[var(--hanji)] text-[var(--ok)] border border-[var(--line)] cursor-pointer"
              >
                Mark Active
              </button>
              <button
                type="button"
                onClick={() => handleBulkStatus("archived")}
                className="px-3 py-1.5 rounded-lg bg-[var(--paper)] hover:bg-[var(--hanji)] text-[var(--muted)] border border-[var(--line)] cursor-pointer"
              >
                Archive
              </button>
              <button
                type="button"
                onClick={handleBulkDelete}
                className="px-3 py-1.5 rounded-lg bg-[var(--paper)] hover:bg-rose-50 text-rose-600 border border-[var(--line)] cursor-pointer"
              >
                Delete Selected
              </button>
              <button
                type="button"
                onClick={() => setSelectedIds([])}
                className="text-[var(--muted)] hover:underline ml-2 cursor-pointer"
              >
                Deselect
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Product Data Table */}
      <div className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-[var(--line)] bg-[var(--hanji-2)]/60 text-xs font-bold text-[var(--muted)] uppercase tracking-wider">
                <th className="px-4 py-3.5 w-10 text-left">
                  <input
                    type="checkbox"
                    checked={
                      filteredProducts.length > 0 &&
                      selectedIds.length === filteredProducts.length
                    }
                    onChange={handleSelectAll}
                    className="rounded border-[var(--line)] text-[var(--persimmon)] focus:ring-0 cursor-pointer"
                  />
                </th>
                <th className="px-3.5 py-3.5 text-left">Product & Brand</th>
                <th className="px-3.5 py-3.5 text-left">SKU / HSN</th>
                <th className="px-3.5 py-3.5 text-left">Category</th>
                <th className="px-3.5 py-3.5 text-left">Wholesale / MRP</th>
                <th className="px-3.5 py-3.5 text-left">Warehouse Stock</th>
                <th className="px-3.5 py-3.5 text-left">Compliance</th>
                <th className="px-3.5 py-3.5 text-left">Status</th>
                <th className="px-3.5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--line)] text-[14px]">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-16 text-[var(--muted)]">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[var(--hanji-2)] flex items-center justify-center text-[var(--muted)]">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <div className="font-bold text-[var(--ink)] text-base">No products match your filter</div>
                    <div className="text-xs text-[var(--muted)] mt-1">Try resetting search criteria or add a new product.</div>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => {
                  const marginPct = Math.round(((p.mrp - p.tradePrice) / p.mrp) * 100);

                  return (
                    <tr
                      key={p.id}
                      className="hover:bg-[var(--hanji)]/40 transition group"
                    >
                      {/* Checkbox */}
                      <td className="px-4 py-4 text-left">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(p.id)}
                          onChange={() => handleSelectOne(p.id)}
                          className="rounded border-[var(--line)] text-[var(--persimmon)] focus:ring-0 cursor-pointer"
                        />
                      </td>

                      {/* Product Name & Brand */}
                      <td className="px-3.5 py-4 text-left max-w-xs">
                        <div className="flex flex-col gap-0.5">
                          <button
                            type="button"
                            onClick={() => setViewProduct(p)}
                            className="font-bold text-[var(--ink)] hover:text-[var(--persimmon)] transition text-left cursor-pointer line-clamp-1"
                            title={p.name}
                          >
                            {p.name}
                          </button>
                          <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
                            <span className="font-semibold text-[var(--ink)] bg-[var(--hanji-2)] px-1.5 py-0.2 rounded">
                              {p.brand}
                            </span>
                            <span className="font-kr text-[var(--muted)] text-[11px] truncate max-w-[160px]">
                              {p.koreanName}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* SKU / HSN */}
                      <td className="px-3.5 py-4 text-left font-mono text-xs text-[var(--muted)] whitespace-nowrap">
                        <div className="text-[var(--ink)] font-bold">{p.sku}</div>
                        <div className="text-[11px] text-[var(--muted)]">HSN: {p.hsnCode}</div>
                      </td>

                      {/* Category & SubCategory */}
                      <td className="px-3.5 py-4 text-left whitespace-nowrap">
                        <div className="text-xs font-semibold text-[var(--ink)]">
                          {p.subCategory}
                        </div>
                        <div className="text-[11px] text-[var(--muted)]">
                          {p.category === "skincare-beauty" ? "Skincare & Beauty" : "Food & Beverages"}
                        </div>
                      </td>

                      {/* Wholesale / MRP */}
                      <td className="px-3.5 py-4 text-left whitespace-nowrap">
                        <div className="font-extrabold text-[var(--ink)] text-sm">
                          ₹{p.tradePrice.toLocaleString()}
                        </div>
                        <div className="text-xs text-[var(--muted)] flex items-center gap-1">
                          <span className="line-through">₹{p.mrp.toLocaleString()}</span>
                          <span className="text-[var(--ok)] font-bold text-[11px]">
                            {marginPct}% margin
                          </span>
                        </div>
                      </td>

                      {/* Warehouse Stock */}
                      <td className="px-3.5 py-4 text-left whitespace-nowrap">
                        <div className="font-bold text-[var(--ink)] text-xs">
                          {p.stock} units
                        </div>
                        <span
                          className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mt-0.5 ${
                            p.stockStatus === "in_stock"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : p.stockStatus === "low_stock"
                              ? "bg-amber-50 text-amber-700 border border-amber-200"
                              : "bg-rose-50 text-rose-700 border border-rose-200"
                          }`}
                        >
                          {p.stockStatus === "in_stock"
                            ? "In Stock"
                            : p.stockStatus === "low_stock"
                            ? "Low Stock"
                            : "Out of Stock"}
                        </span>
                      </td>

                      {/* Compliance */}
                      <td className="px-3.5 py-4 text-left whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-md ${
                            p.complianceStatus.includes("CDSCO")
                              ? "bg-[var(--peach)]/25 text-[var(--persimmon)]"
                              : p.complianceStatus.includes("Green Dot")
                              ? "bg-[var(--celadon-l)] text-[var(--jade-d)]"
                              : p.complianceStatus.includes("Brown Dot")
                              ? "bg-amber-100 text-amber-800"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {p.complianceStatus.includes("Green Dot") && (
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                          )}
                          {p.complianceStatus.includes("Brown Dot") && (
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-800" />
                          )}
                          <span>
                            {p.complianceStatus.includes("CDSCO")
                              ? "CDSCO Reg."
                              : p.complianceStatus.includes("Green Dot")
                              ? "FSSAI (Veg)"
                              : p.complianceStatus.includes("Brown Dot")
                              ? "FSSAI (Non-Veg)"
                              : "Pending"}
                          </span>
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-3.5 py-4 text-left whitespace-nowrap">
                        <span
                          className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                            p.status === "active"
                              ? "bg-emerald-100 text-emerald-800"
                              : p.status === "draft"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {p.status.toUpperCase()}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-3.5 py-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          {/* View details */}
                          <button
                            type="button"
                            onClick={() => setViewProduct(p)}
                            className="p-2 text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--hanji-2)] rounded-lg transition cursor-pointer group"
                            title="View Details"
                          >
                            <svg className="w-5 h-5 shrink-0 min-w-[20px] min-h-[20px] group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>

                          {/* Edit button */}
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(p)}
                            className="p-2 text-[var(--muted)] hover:text-[var(--persimmon)] hover:bg-[var(--peach)]/20 rounded-lg transition cursor-pointer group"
                            title="Edit Product"
                          >
                            <svg className="w-5 h-5 shrink-0 min-w-[20px] min-h-[20px] group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>

                          {/* Duplicate */}
                          <button
                            type="button"
                            onClick={() => handleDuplicate(p.id)}
                            className="p-2 text-[var(--muted)] hover:text-sky-600 hover:bg-sky-50 rounded-lg transition cursor-pointer group"
                            title="Duplicate SKU"
                          >
                            <svg className="w-5 h-5 shrink-0 min-w-[20px] min-h-[20px] group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </button>

                          {/* Delete */}
                          <button
                            type="button"
                            onClick={() => setConfirmDeleteId(p.id)}
                            className="p-2 text-[var(--muted)] hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer group"
                            title="Delete"
                          >
                            <svg className="w-5 h-5 shrink-0 min-w-[20px] min-h-[20px] group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE / EDIT PRODUCT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
          <div className="bg-[var(--paper)] rounded-3xl border border-[var(--line)] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fade-in font-sans">
            {/* Header */}
            <div className="p-6 border-b border-[var(--line)] flex items-center justify-between sticky top-0 bg-[var(--paper)] z-10">
              <div>
                <h3 className="text-xl font-black text-[var(--ink)]">
                  {editingProduct ? "Edit Product" : "Add New Korean Product"}
                </h3>
                <p className="text-xs text-[var(--muted)] mt-0.5">
                  Enter wholesale trade rates, Indian regulatory compliance, and packaging specs.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full border border-[var(--line)] flex items-center justify-center text-[var(--muted)] hover:text-[var(--ink)] cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSave} className="p-6 space-y-6">
              {/* Product Title & Korean Hangul */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink)] mb-1.5">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Centella Soothing Ampoule 100ml"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--line)] bg-[var(--paper)] text-sm font-medium focus:border-[var(--persimmon)] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink)] mb-1.5">
                    Korean Hangul Name
                  </label>
                  <input
                    type="text"
                    value={formData.koreanName}
                    onChange={(e) => setFormData({ ...formData, koreanName: e.target.value })}
                    placeholder="e.g. 마다가스카르 센텔라 앰플"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--line)] bg-[var(--paper)] text-sm font-kr font-medium focus:border-[var(--persimmon)] focus:outline-none"
                  />
                </div>
              </div>

              {/* Brand, Category & SubCategory */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink)] mb-1.5">
                    Brand Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    placeholder="e.g. Skin1004, Samyang, COSRX"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--line)] bg-[var(--paper)] text-sm font-medium focus:border-[var(--persimmon)] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink)] mb-1.5">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value as ProductCategory,
                        subCategory:
                          e.target.value === "skincare-beauty"
                            ? "Serums & Essences"
                            : "Korean Instant Noodles",
                        hsnCode: e.target.value === "skincare-beauty" ? "33049910" : "19023010",
                        complianceStatus:
                          e.target.value === "skincare-beauty"
                            ? "CDSCO Form 43 Registered"
                            : "FSSAI Green Dot (Veg)",
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--line)] bg-[var(--paper)] text-sm font-semibold focus:border-[var(--persimmon)] focus:outline-none cursor-pointer"
                  >
                    <option value="skincare-beauty">Korean Skincare & Beauty</option>
                    <option value="food-beverages">Korean Food & Beverages</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink)] mb-1.5">
                    Subcategory *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subCategory}
                    onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}
                    placeholder="e.g. Serums, Toners, Instant Noodles"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--line)] bg-[var(--paper)] text-sm font-medium focus:border-[var(--persimmon)] focus:outline-none"
                  />
                </div>
              </div>

              {/* SKU & HSN Code */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink)] mb-1.5">
                    SKU Code
                  </label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value.toUpperCase() })}
                    placeholder="e.g. SKN-1004-AMP"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--line)] bg-[var(--paper)] text-sm font-mono focus:border-[var(--persimmon)] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink)] mb-1.5">
                    Indian Customs HSN Code
                  </label>
                  <input
                    type="text"
                    value={formData.hsnCode}
                    onChange={(e) => setFormData({ ...formData, hsnCode: e.target.value })}
                    placeholder="e.g. 33049910 or 19023010"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--line)] bg-[var(--paper)] text-sm font-mono focus:border-[var(--persimmon)] focus:outline-none"
                  />
                </div>
              </div>

              {/* Pricing & MOQ */}
              <div className="p-4 rounded-2xl bg-[var(--hanji)]/60 border border-[var(--line)] space-y-4">
                <span className="text-xs font-black uppercase tracking-wider text-[var(--persimmon)] block">
                  Wholesale Pricing & MOQ
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                      Trade Price (₹ / unit)
                    </label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={formData.tradePrice}
                      onChange={(e) => setFormData({ ...formData, tradePrice: Number(e.target.value) })}
                      className="w-full px-3.5 py-2 rounded-xl border border-[var(--line)] bg-[var(--paper)] text-sm font-bold focus:border-[var(--persimmon)] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                      Retail MRP (₹)
                    </label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={formData.mrp}
                      onChange={(e) => setFormData({ ...formData, mrp: Number(e.target.value) })}
                      className="w-full px-3.5 py-2 rounded-xl border border-[var(--line)] bg-[var(--paper)] text-sm font-bold focus:border-[var(--persimmon)] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[var(--ink)] mb-1">
                      Minimum Order (MOQ)
                    </label>
                    <input
                      type="text"
                      value={formData.moq}
                      onChange={(e) => setFormData({ ...formData, moq: e.target.value })}
                      placeholder="e.g. 48 units (1 carton)"
                      className="w-full px-3.5 py-2 rounded-xl border border-[var(--line)] bg-[var(--paper)] text-sm font-medium focus:border-[var(--persimmon)] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Inventory & Regulatory Compliance */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink)] mb-1.5">
                    Warehouse Units Stock
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={formData.stock}
                    onChange={(e) => {
                      const units = Number(e.target.value);
                      const stockStatus: ProductStockStatus =
                        units <= 0 ? "out_of_stock" : units < 50 ? "low_stock" : "in_stock";
                      setFormData({ ...formData, stock: units, stockStatus });
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--line)] bg-[var(--paper)] text-sm font-bold focus:border-[var(--persimmon)] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink)] mb-1.5">
                    Stock Status
                  </label>
                  <select
                    value={formData.stockStatus}
                    onChange={(e) => setFormData({ ...formData, stockStatus: e.target.value as ProductStockStatus })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--line)] bg-[var(--paper)] text-sm font-semibold focus:border-[var(--persimmon)] focus:outline-none cursor-pointer"
                  >
                    <option value="in_stock">In Stock</option>
                    <option value="low_stock">Low Stock (&lt; 50)</option>
                    <option value="pre_order">Pre-Order</option>
                    <option value="out_of_stock">Out of Stock</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink)] mb-1.5">
                    Port Compliance
                  </label>
                  <select
                    value={formData.complianceStatus}
                    onChange={(e) => setFormData({ ...formData, complianceStatus: e.target.value as ComplianceStatus })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--line)] bg-[var(--paper)] text-sm font-semibold focus:border-[var(--persimmon)] focus:outline-none cursor-pointer"
                  >
                    <option value="CDSCO Form 43 Registered">CDSCO Form 43 Registered</option>
                    <option value="FSSAI Green Dot (Veg)">FSSAI Green Dot (Veg)</option>
                    <option value="FSSAI Brown Dot (Non-Veg)">FSSAI Brown Dot (Non-Veg)</option>
                    <option value="Documentation Pending">Documentation Pending</option>
                  </select>
                </div>
              </div>

              {/* Shelf Life & Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink)] mb-1.5">
                    Shelf Life (Months)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={60}
                    value={formData.shelfLifeMonths}
                    onChange={(e) => setFormData({ ...formData, shelfLifeMonths: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--line)] bg-[var(--paper)] text-sm font-medium focus:border-[var(--persimmon)] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink)] mb-1.5">
                    Publication Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as ProductStatus })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--line)] bg-[var(--paper)] text-sm font-semibold focus:border-[var(--persimmon)] focus:outline-none cursor-pointer"
                  >
                    <option value="active">Active (Available for B2B Orders)</option>
                    <option value="draft">Draft (Under Review)</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink)] mb-1.5">
                  Product Description & Ingredients
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Key features, formulation, packaging format, and storage recommendations..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--line)] bg-[var(--paper)] text-sm font-medium focus:border-[var(--persimmon)] focus:outline-none"
                />
              </div>

              {/* Modal Action Buttons */}
              <div className="pt-4 border-t border-[var(--line)] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-[var(--line)] text-sm font-bold text-[var(--muted)] hover:bg-[var(--hanji)] transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[var(--persimmon)] hover:bg-[var(--persimmon-d)] text-white text-sm font-bold shadow-xs transition cursor-pointer"
                >
                  {editingProduct ? "Save Changes" : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QUICK VIEW SPEC SHEET MODAL */}
      {viewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-[var(--paper)] rounded-3xl border border-[var(--line)] shadow-2xl max-w-lg w-full p-6 animate-fade-in font-sans space-y-5">
            <div className="flex items-start justify-between border-b border-[var(--line)] pb-4">
              <div>
                <span className="text-xs font-bold text-[var(--persimmon)] uppercase tracking-wider">
                  {viewProduct.brand} • {viewProduct.category === "skincare-beauty" ? "Skincare" : "Food"}
                </span>
                <h3 className="text-xl font-black text-[var(--ink)] mt-0.5">{viewProduct.name}</h3>
                <div className="font-kr text-sm text-[var(--muted)]">{viewProduct.koreanName}</div>
              </div>
              <button
                type="button"
                onClick={() => setViewProduct(null)}
                className="w-8 h-8 rounded-full border border-[var(--line)] flex items-center justify-center text-[var(--muted)] hover:text-[var(--ink)] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[var(--hanji-2)]/60">
                <span className="text-[var(--muted)] block">SKU Code</span>
                <strong className="text-[var(--ink)] font-mono">{viewProduct.sku}</strong>
              </div>
              <div className="p-3 rounded-xl bg-[var(--hanji-2)]/60">
                <span className="text-[var(--muted)] block">Customs HSN</span>
                <strong className="text-[var(--ink)] font-mono">{viewProduct.hsnCode}</strong>
              </div>
              <div className="p-3 rounded-xl bg-[var(--hanji-2)]/60">
                <span className="text-[var(--muted)] block">Trade Price</span>
                <strong className="text-[var(--ink)] text-sm font-extrabold">₹{viewProduct.tradePrice}</strong>
              </div>
              <div className="p-3 rounded-xl bg-[var(--hanji-2)]/60">
                <span className="text-[var(--muted)] block">Retail MRP</span>
                <strong className="text-[var(--ink)] text-sm font-extrabold">₹{viewProduct.mrp}</strong>
              </div>
              <div className="p-3 rounded-xl bg-[var(--hanji-2)]/60">
                <span className="text-[var(--muted)] block">Minimum Order (MOQ)</span>
                <strong className="text-[var(--ink)]">{viewProduct.moq}</strong>
              </div>
              <div className="p-3 rounded-xl bg-[var(--hanji-2)]/60">
                <span className="text-[var(--muted)] block">Indian Warehouse Stock</span>
                <strong className="text-[var(--ink)]">{viewProduct.stock} units</strong>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-[var(--line)] bg-[var(--hanji)]/40 text-xs">
              <span className="text-[var(--muted)] font-bold block mb-1">Port Regulatory Compliance:</span>
              <div className="font-extrabold text-[var(--ink)]">{viewProduct.complianceStatus}</div>
              <div className="text-[var(--muted)] mt-1">Remaining Shelf Life: {viewProduct.shelfLifeMonths} months (certified at Indian port customs entry)</div>
            </div>

            <p className="text-xs text-[var(--muted)] leading-relaxed">{viewProduct.description}</p>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  const p = viewProduct;
                  setViewProduct(null);
                  handleOpenEdit(p);
                }}
                className="px-4 py-2 rounded-xl bg-[var(--persimmon)] text-white text-xs font-bold hover:bg-[var(--persimmon-d)] transition cursor-pointer"
              >
                Edit Product
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE DIALOG */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-[var(--paper)] rounded-2xl border border-[var(--line)] shadow-xl p-6 max-w-sm w-full font-sans space-y-4">
            <h4 className="text-base font-black text-[var(--ink)]">Delete this product?</h4>
            <p className="text-xs text-[var(--muted)] leading-relaxed">
              This SKU will be removed from your active Korean product catalogue and wholesale export lists.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2 rounded-xl border border-[var(--line)] text-xs font-bold text-[var(--muted)] hover:bg-[var(--hanji)] transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(confirmDeleteId)}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs transition cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
