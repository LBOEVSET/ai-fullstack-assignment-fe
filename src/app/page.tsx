"use client"

import { useEffect, useState } from "react"
import { Product } from "../types/product"
import { Cart } from "../types/cart"
import { getProducts, calculateOrder, clearOrder } from "../services/api"
import ProductCard from "../components/ProductCard"
import SummaryPanel from "../components/SummaryPanel"

interface Summary {
  totalBeforeDiscount: number
  pairDiscountItems: number
  memberDiscount: number
  finalTotal: number
}

export default function Page() {

  const [products, setProducts] = useState<Product[]>([])
  const [cart, setCart] = useState<Cart>({})
  const [memberCard, setMemberCard] = useState("")
  const [summary, setSummary] = useState<Summary | null>(null)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      const data = await getProducts()
      setProducts(data)
    } catch {
      alert("Failed to load products")
    }
  }

  const updateQty = (id: string, qty: number) => {
    setCart((prev) => ({
      ...prev,
      [id]: qty
    }))
  }

  const handleCalculate = async () => {

    const items = Object.entries(cart)
      .filter(([_, qty]) => qty > 0)
      .map(([productId, quantity]) => ({
        productId,
        quantity
      }))

    if (items.length === 0) {
      setErrorMessage("Please select at least one product")
      return
    }

    try {

      setLoading(true)

      const result = await calculateOrder({
        items,
        memberCard
      })

      console.log("CALC RESULT:", result)
      setSummary(result)

    } catch (err: any) {

      setErrorMessage(
        err?.message || "Something went wrong"
      )

    } finally {

      setLoading(false)

    }

  }

  const handleClear = async () => {

    try {

      await clearOrder();

      setCart({});
      setSummary(null);
      setMemberCard("");

    } catch (err:any) {

      setErrorMessage(err.message);

    }

  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-6xl mx-auto grid grid-cols-2 gap-10">

        {/* LEFT PANEL */}

        <div className="space-y-5">

          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              quantity={cart[product.id] || 0}
              onChange={updateQty}
            />
          ))}

          {/* MEMBER CARD */}

          <div className="bg-white p-5 rounded-2xl shadow-sm">

            <p className="font-semibold text-gray-800 mb-2">
              Member Card
            </p>

            <input
              className="w-full border border-gray-300 rounded-lg p-3
              text-gray-900 placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={memberCard}
              onChange={(e) => setMemberCard(e.target.value)}
              placeholder="Enter card number"
            />

          </div>

          {/* CALCULATE BUTTON */}

          <button
            className={`w-full font-semibold py-4 rounded-xl shadow transition
              ${loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"}
            `}
            disabled={loading}
            onClick={handleCalculate}
          >
            {loading ? "Calculating..." : "Calculate"}
          </button>

        </div>

        {/* RIGHT PANEL */}

        <SummaryPanel
          summary={summary}
          onRecalculate={handleCalculate}
          onClear={handleClear}
        />

      </div>

      {errorMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">

          <div className="bg-white p-6 rounded-xl shadow-xl w-96 text-center">

            <h3 className="text-xl font-bold text-red-600 mb-3">
              Order Warning
            </h3>

            <p className="text-gray-700 mb-6">
              {errorMessage}
            </p>

            <button
              onClick={() => setErrorMessage(null)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
            >
              OK
            </button>

          </div>

        </div>
      )}

    </div>
  )
}
