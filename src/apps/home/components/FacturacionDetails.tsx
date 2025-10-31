"use client";

import type React from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

// 🧾 Tipos exactos de tu backend
interface Mesa {
  idMesa: number;
  numero: number;
  capacidad: number;
  estado: string;
}

interface DetallePedido {
  id?: number;
  plato?: { nombre: string };
  cantidad: number;
  precio: number;
}

interface Order {
  idPedido: number;
  estado: string;
  fecha: string;
  tiempoPreparado: string;
  total: number;
  idCliente: number;
  idTrabajador: number;
  mesa: Mesa;
  detalles: DetallePedido[];
  customerName?: string;
  orderNumber?: string;
}

interface FacturacionDetailsProps {
  order: Order;
  onPayment: (orderToPay: Order, method: string) => void;
}

const FacturacionDetails: React.FC<FacturacionDetailsProps> = ({
  order,
  onPayment,
}) => {
  const subtotal = order.detalles.reduce(
    (sum, item) => sum + (item.precio || 0) * (item.cantidad || 1),
    0
  );
  const taxRate = 0.18;
  const tax = subtotal * taxRate;
  const propina = 0;
  const totalConImpuestos = subtotal + tax + propina;

  const handlePaymentClick = () => {
    onPayment(order, "Tarjeta");
  };

  const isCompleted = order.estado?.toLowerCase() === "completado";

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h4 className="text-sm font-bold text-blue-600 mb-4">
        Detalle de Pedido para Facturación
      </h4>

      <div className="mb-4 text-xs">
        <p className="font-semibold text-gray-900">
          Pedido: #{order.idPedido}
        </p>
        <p className="text-gray-600">
          Cliente: {order.customerName || "Sin cliente"}
        </p>
        <p className="text-gray-600">
          Estado:{" "}
          <span
            className={`font-bold ${
              isCompleted ? "text-green-500" : "text-orange-500"
            }`}
          >
            {order.estado}
          </span>
        </p>
        <p className="text-gray-600">
          Fecha: {new Date(order.fecha).toLocaleString()}
        </p>
      </div>

      <div className="space-y-2 mb-4">
        <p className="font-bold text-gray-800 text-sm mb-2">Items:</p>
        {order.detalles.length === 0 ? (
          <p className="text-gray-500 text-xs">
            No hay detalles para este pedido.
          </p>
        ) : (
          order.detalles.map((item, i) => (
            <div
              key={i}
              className="flex justify-between items-start text-xs"
            >
              <div className="flex-1">
                <p className="font-semibold text-gray-900">
                  {item.cantidad}x {item.plato?.nombre || "Sin nombre"}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">
                  S/. {(item.precio || 0).toFixed(2)}
                </p>
                <p className="text-gray-500">
                  Total: S/. {((item.precio || 0) * (item.cantidad || 1)).toFixed(2)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="bg-gray-50 rounded-lg p-4 space-y-2 mb-4">
        <div className="flex justify-between text-xs">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-semibold text-gray-900">
            S/. {subtotal.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-600">IGV ({taxRate * 100}%)</span>
          <span className="font-semibold text-gray-900">
            S/. {tax.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-600">Propina</span>
          <span className="font-semibold text-gray-900">
            S/. {propina.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-xs pt-2 border-t border-gray-200 font-bold">
          <span className="text-gray-900">Total a Pagar</span>
          <span className="text-green-600">
            S/. {totalConImpuestos.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4 p-2 bg-gray-50 rounded">
        <input
          type="checkbox"
          id="payment-method"
          className="w-4 h-4"
          checked={true}
          readOnly
        />
        <label htmlFor="payment-method" className="text-xs text-gray-600">
          Tarjeta crédito o débito / Qr
        </label>
      </div>

      <div className="flex gap-3">
        <button
          className={`flex-1 ${
            isCompleted
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          } text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm`}
          onClick={handlePaymentClick}
          disabled={isCompleted}
        >
          {isCompleted ? "Pedido Pagado" : "Realizar pago"}
        </button>
        <button className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm">
          Editar
        </button>
      </div>
    </div>
  );
};

export default FacturacionDetails;
