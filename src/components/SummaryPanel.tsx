interface Props {
  summary: any
  onRecalculate: () => void
  onClear: () => void
}

export default function SummaryPanel({
  summary,
  onRecalculate,
  onClear
}: Props) {

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm">

      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Order Summary
      </h2>

      <div className="space-y-4">

        <div className="flex justify-between bg-gray-50 p-4 rounded-lg">
          <span>Total before discount</span>
          <span className="font-semibold text-gray-900">
            {summary?.totalBeforeDiscount ?? 0} THB
          </span>
        </div>

        <div className="flex justify-between bg-gray-50 p-4 rounded-lg">
          <span>Item Discount</span>
          <span className="font-semibold text-red-600">
            -{summary?.pairDiscountItems ?? 0} THB
          </span>
        </div>

        <div className="flex justify-between bg-gray-50 p-4 rounded-lg">
          <span>Member Discount</span>
          <span className="font-semibold text-red-600">
            -{summary?.memberDiscount ?? 0} THB
          </span>
        </div>

        <div className="flex justify-between bg-blue-50 p-5 rounded-lg font-bold">
          <span>Final Total</span>
          <span className="text-lg font-bold text-blue-700">
            {summary?.finalTotal ?? 0} THB
          </span>
        </div>

      </div>

      {/* BUTTONS */}

      <button
        onClick={onRecalculate}
        className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg"
      >
        Recalculate
      </button>

      <button
        onClick={onClear}
        className="w-full mt-3 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg"
      >
        Clear Order
      </button>

    </div>
  )
}
