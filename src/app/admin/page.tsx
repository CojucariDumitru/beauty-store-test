"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader2, Plus, Trash2 } from "lucide-react";
import type { Product } from "@/types/product";
import { COLOR_FAMILIES } from "@/lib/catalog";
import { SimpleHeader } from "@/components/SimpleHeader";
import { ShopOverlays } from "@/components/ShopOverlays";
import { useClientMounted } from "@/hooks/useClientMounted";

const DEFAULT_PASSWORD = "beauty-test";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const mounted = useClientMounted();

  const loadProducts = useCallback(async () => {
    const res = await fetch("/api/products");
    if (res.ok) setProducts(await res.json());
  }, []);

  useEffect(() => {
    const saved = sessionStorage.getItem("admin-password");
    if (saved) {
      setPassword(saved);
      setAuthed(true);
    }
  }, []);

  useEffect(() => {
    if (authed) loadProducts();
  }, [authed, loadProducts]);

  function handleLogin(e: FormEvent) {
    e.preventDefault();
    sessionStorage.setItem("admin-password", password);
    setAuthed(true);
  }

  async function handleAdd(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const form = new FormData(e.currentTarget);

    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-password": password,
      },
      body: JSON.stringify({
        name: form.get("name"),
        brand: form.get("brand"),
        colorName: form.get("colorName"),
        colorHex: form.get("colorHex"),
        colorFamily: form.get("colorFamily"),
        price: form.get("price"),
        description: form.get("description"),
        bottleImage: form.get("bottleImage"),
        swatchImage: form.get("swatchImage"),
        inStock: form.get("inStock") === "on",
        published: true,
      }),
    });

    setLoading(false);
    if (!res.ok) {
      setMessage("Failed to add product. Check admin password.");
      return;
    }

    setMessage("Product added!");
    e.currentTarget.reset();
    loadProducts();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this product?")) return;
    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
      headers: { "x-admin-password": password },
    });
    if (res.ok) loadProducts();
  }

  if (!authed) {
    return (
      <>
      <main className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16">
        <h1 className="text-2xl font-bold">Admin login</h1>
        <p className="mt-2 text-sm text-[#666]">
          Test password: <code className="rounded bg-[#fafafa] px-1">{DEFAULT_PASSWORD}</code>
        </p>
        {mounted ? (
          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password"
              autoComplete="current-password"
              className="w-full rounded-xl border border-[#eee] px-4 py-3 outline-none focus:border-[#ee4291]"
            />
            <button
              type="submit"
              className="w-full rounded-xl bg-[#ee4291] py-3 font-semibold text-white"
            >
              Enter admin
            </button>
          </form>
        ) : (
          <div className="mt-6 space-y-4" aria-hidden>
            <div className="h-[46px] rounded-xl border border-[#eee] bg-[#fafafa]" />
            <div className="h-[46px] rounded-xl bg-[#ee4291]/50" />
          </div>
        )}
      </main>
      <ShopOverlays />
      </>
    );
  }

  return (
    <>
    <SimpleHeader />
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold">Admin — Add polish</h1>
      <p className="mt-2 text-sm text-[#666]">
        Upload two image URLs: bottle (top layer) and applied look (bottom layer).
      </p>

      {mounted ? (
      <form
        onSubmit={handleAdd}
        className="mt-8 grid gap-4 rounded-2xl border border-[#f0e0e8] bg-white p-6 shadow-sm sm:grid-cols-2"
      >
        <Field label="Product name" name="name" required />
        <Field label="Brand" name="brand" placeholder="Luna" required />
        <Field label="Color name" name="colorName" placeholder="Dusty Rose" />
        <Field label="Color hex" name="colorHex" defaultValue="#EE4291" />
        <div>
          <label htmlFor="colorFamily" className="text-sm font-medium">
            Color family
          </label>
          <select
            id="colorFamily"
            name="colorFamily"
            defaultValue="Pink"
            className="mt-1 w-full rounded-xl border border-[#eee] px-4 py-3 outline-none focus:border-[#ee4291]"
          >
            {COLOR_FAMILIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <Field label="Price (USD)" name="price" type="number" step="0.01" required />
        <Field
          label="Bottle image URL"
          name="bottleImage"
          className="sm:col-span-2"
          placeholder="/products/bottle.png"
          defaultValue="/products/bottle.png"
          required
        />
        <Field
          label="Applied look image URL (on nails)"
          name="swatchImage"
          className="sm:col-span-2"
          placeholder="/products/swatch.png"
          defaultValue="/products/swatch.png"
          required
        />
        <div className="sm:col-span-2">
          <label className="text-sm font-medium">Description</label>
          <textarea
            name="description"
            rows={3}
            className="mt-1 w-full rounded-xl border border-[#eee] px-4 py-3 outline-none focus:border-[#ee4291]"
          />
        </div>
        <label className="flex items-center gap-2 text-sm sm:col-span-2">
          <input type="checkbox" name="inStock" defaultChecked />
          In stock
        </label>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#ee4291] py-3 font-semibold text-white sm:col-span-2 disabled:opacity-60"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
          Add product
        </button>
        {message && (
          <p className="text-sm text-[#529a6f] sm:col-span-2">{message}</p>
        )}
      </form>
      ) : (
        <div
          className="mt-8 grid gap-4 rounded-2xl border border-[#f0e0e8] bg-white p-6 shadow-sm sm:grid-cols-2"
          aria-hidden
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-[46px] rounded-xl bg-[#fafafa]" />
          ))}
          <div className="h-[46px] rounded-xl bg-[#ee4291]/40 sm:col-span-2" />
        </div>
      )}

      <section className="mt-12">
        <h2 className="text-xl font-semibold">Current products ({products.length})</h2>
        <ul className="mt-4 space-y-3">
          {products.map((p) => (
            <li
              key={p.id}
              className="flex items-center gap-4 rounded-xl border border-[#f0e0e8] p-3"
            >
              <div className="relative h-14 w-14 overflow-hidden rounded-lg bg-[#fafafa]">
                <Image
                  src={p.bottleImage.split("?")[0]}
                  alt=""
                  fill
                  className="object-contain p-1"
                  sizes="56px"
                  unoptimized
                />
              </div>
              <div className="flex-1">
                <p className="font-medium">{p.name}</p>
                <p className="text-sm text-[#888]">
                  {p.brand} · {p.colorFamily} · ${p.price.toFixed(2)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleDelete(p.id)}
                className="rounded-lg p-2 text-[#999] hover:bg-red-50 hover:text-red-500"
                aria-label={`Delete ${p.name}`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      </section>
    </main>
    <ShopOverlays />
    </>
  );
}

function Field({
  label,
  name,
  className = "",
  ...props
}: {
  label: string;
  name: string;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={className}>
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        className="mt-1 w-full rounded-xl border border-[#eee] px-4 py-3 outline-none focus:border-[#ee4291]"
        {...props}
      />
    </div>
  );
}
