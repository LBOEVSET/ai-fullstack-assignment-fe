import Image from "next/image"

interface Product {
  id: string
  name: string
  price: number
  image: string
}

interface Props {
  product: Product
  quantity: number
  onChange: (id: string, qty: number) => void
}

export default function ProductCard({ product, quantity, onChange }: Props) {

  const increase = () => onChange(product.id, quantity + 1)
  const decrease = () => quantity > 0 && onChange(product.id, quantity - 1)

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 flex items-center justify-between">

      <div className="flex items-center gap-4">

        <Image
          src={product.image}
          alt={product.name}
          width={70}
          height={70}
          className="rounded-xl border"
        />

        <div>
          <p className="text-lg font-semibold text-gray-900">
            {product.name}
          </p>

          <p className="text-gray-600">
            {product.price} THB
          </p>
        </div>

      </div>

      <div className="flex items-center gap-3">

        <button
          onClick={decrease}
          className="w-10 h-10 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800"
        >
          -
        </button>

        <span className="w-8 text-center text-lg font-semibold text-gray-900">
          {quantity}
        </span>

        <button
          onClick={increase}
          className="w-10 h-10 rounded-lg bg-blue-500 hover:bg-blue-600 text-white"
        >
          +
        </button>

      </div>

    </div>
  )
}
