const API_URL = "http://localhost:3222/api/v1"

export async function getProducts() {
  const res = await fetch(`${API_URL}/products`)
  return res.json()
}

export async function calculateOrder(data: any) {

  const res = await fetch(`${API_URL}/orders/calculate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  const result = await res.json()

  if (!res.ok) {
    throw new Error(result.message || "Calculation failed")
  }

  return result
}

export async function clearOrder() {

  const res = await fetch(`${API_URL}/orders/clear`, {
    method: "POST"
  });

  if (!res.ok) {
    throw new Error("Failed to clear order");
  }

  return res.json();
}
