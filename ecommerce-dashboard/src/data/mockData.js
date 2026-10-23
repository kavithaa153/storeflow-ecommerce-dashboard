
export const salesData = [
  { month: "Jan", revenue: 18500, orders: 240 },
  { month: "Feb", revenue: 22800, orders: 310 },
  { month: "Mar", revenue: 20500, orders: 275 },
  { month: "Apr", revenue: 29200, orders: 390 },
  { month: "May", revenue: 26700, orders: 350 },
  { month: "Jun", revenue: 34800, orders: 465 },
  { month: "Jul", revenue: 31500, orders: 420 },
  { month: "Aug", revenue: 38600, orders: 510 },
  { month: "Sep", revenue: 35400, orders: 470 },
  { month: "Oct", revenue: 42800, orders: 565 },
  { month: "Nov", revenue: 39500, orders: 520 },
  { month: "Dec", revenue: 48600, orders: 640 }
];

export const initialProducts = [
  { id: "PRD-1001", name: "Wireless Headphones", category: "Electronics", price: 2499, stock: 86, status: "Active" },
  { id: "PRD-1002", name: "Smart Watch Pro", category: "Electronics", price: 4999, stock: 12, status: "Active" },
  { id: "PRD-1003", name: "Everyday Backpack", category: "Accessories", price: 1599, stock: 0, status: "Out of Stock" },
  { id: "PRD-1004", name: "Cotton T-Shirt", category: "Fashion", price: 799, stock: 45, status: "Active" },
  { id: "PRD-1005", name: "Running Shoes", category: "Footwear", price: 3299, stock: 8, status: "Low Stock" }
];

export const initialOrders = [
  { id: "ORD-2041", customer: "Olivia Martin", date: "2026-10-21", amount: 5498, status: "Delivered", payment: "Paid" },
  { id: "ORD-2042", customer: "James Wilson", date: "2026-10-21", amount: 2499, status: "Processing", payment: "Paid" },
  { id: "ORD-2043", customer: "Sophia Anderson", date: "2026-10-20", amount: 3299, status: "Shipped", payment: "Paid" },
  { id: "ORD-2044", customer: "Noah Taylor", date: "2026-10-20", amount: 799, status: "Pending", payment: "Pending" },
  { id: "ORD-2045", customer: "Emma Thomas", date: "2026-10-19", amount: 4999, status: "Cancelled", payment: "Refunded" }
];

export const initialCustomers = [
  { id: "CUS-101", name: "Olivia Martin", email: "olivia@example.com", orders: 12, spent: 28500, status: "Active" },
  { id: "CUS-102", name: "James Wilson", email: "james@example.com", orders: 8, spent: 16400, status: "Active" },
  { id: "CUS-103", name: "Sophia Anderson", email: "sophia@example.com", orders: 5, spent: 12100, status: "Active" },
  { id: "CUS-104", name: "Noah Taylor", email: "noah@example.com", orders: 2, spent: 3400, status: "Inactive" }
];
