import React from "react";

interface Factura {
  id: string;
  cliente: string;
  total: number;
  estado: "pagada" | "pendiente" | "vencida";
  fechaEmision: string;
  metodoPago: string;
}

interface FacturacionListProps {
  facturas: Factura[];
  loading: boolean;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  onSelectFactura: (factura: Factura) => void;
}

const FacturacionList: React.FC<FacturacionListProps> = ({
  facturas,
  loading,
  searchTerm,
  setSearchTerm,
  onSelectFactura,
}) => {
  // Mostrar mensaje de carga
  if (loading) {
    return <p>Cargando facturas...</p>;
  }

  // Filtro de búsqueda
  const filteredFacturas = facturas.filter((f) =>
    f.cliente.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="facturacion-list">
      <h2>Listado de Facturas</h2>

      {/* Campo de búsqueda */}
      <input
        type="text"
        placeholder="Buscar por cliente..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {/* Mostrar mensaje si no hay resultados */}
      {filteredFacturas.length === 0 ? (
        <p>No hay facturas que coincidan con la búsqueda.</p>
      ) : (
        <table className="facturas-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Fecha de Emisión</th>
              <th>Método de Pago</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredFacturas.map((factura) => (
              <tr key={factura.id}>
                <td>{factura.id}</td>
                <td>{factura.cliente}</td>
                <td>${factura.total.toFixed(2)}</td>
                <td
                  className={`estado ${
                    factura.estado === "pagada"
                      ? "verde"
                      : factura.estado === "pendiente"
                      ? "amarillo"
                      : "rojo"
                  }`}
                >
                  {factura.estado}
                </td>
                <td>{factura.fechaEmision}</td>
                <td>{factura.metodoPago}</td>
                <td>
                  <button
                    className="btn-ver"
                    onClick={() => onSelectFactura(factura)}
                  >
                    Ver detalles
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FacturacionList;
