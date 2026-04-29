import React, { useEffect, useState } from "react";
import { Card, Button } from "@heroui/react";

export default function AdminPage() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await fetch("http://localhost:5000/api/orders");
    const data = await res.json();
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Panel Admin</h1>

      <div className="grid gap-6">
        {orders.map((order) => (
          <Card key={order.id} className="bg-zinc-900 border border-zinc-800">
            <div className="p-4 space-y-3">

              <div className="flex justify-between">
                <div>
                  <p className="font-semibold">{order.name}</p>
                  <p className="text-gray-400 text-sm">{order.email}</p>
                </div>

                <span className="text-sm bg-zinc-800 px-3 py-1 rounded">
                  {order.status}
                </span>
              </div>

              <p className="text-gray-300">{order.description}</p>

              <p className="text-sm text-gray-400">
                Servicio: {order.service} | Precio: €{order.price}
              </p>

              {/* IMÁGENES */}
              <div className="flex gap-2 overflow-x-auto">
                {order.images?.map((img, i) => (
                  <img
                    key={i}
                    src={`http://localhost:5000${img}`}
                    alt=""
                    className="w-24 h-24 object-cover rounded"
                  />
                ))}
              </div>

              {/* BOTONES */}
              <div className="flex gap-2 pt-2">
                <Button
                  size="sm"
                  className="bg-yellow-600"
                  onClick={() => updateStatus(order.id, "training")}
                >
                  Training
                </Button>

                <Button
                  size="sm"
                  className="bg-green-600"
                  onClick={() => updateStatus(order.id, "completed")}
                >
                  Done
                </Button>

                <Button
                  size="sm"
                  className="bg-red-600"
                  onClick={() => updateStatus(order.id, "error")}
                >
                  Error
                </Button>
              </div>

            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  async function updateStatus(id, status) {
    await fetch(`http://localhost:5000/api/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    fetchOrders();
  }
}