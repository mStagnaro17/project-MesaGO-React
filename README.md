# 🧭 Resumen General de Permisos por Rol y Microservicio

A continuación se presenta una matriz de acceso generalizada para que el equipo pueda entender rápidamente qué rol tiene permiso para realizar cada acción en los diferentes recursos del sistema.

---

## 👤 Roles Principales

- 👑 **ADMIN:** Superusuario con acceso completo a todos los recursos y operaciones.
- 👨‍🍳 **CHEF:** Encargado del catálogo de menús, insumos y proveedores.
- 🤵 **MESERO:** Responsable de clientes, pedidos, mesas y reservas.

---

## 🧩 Matriz de Permisos Global

| Rol | Verbo HTTP | Microservicio | Recurso (Endpoint Base) | Nivel de Permiso | Descripción |
|:----|:------------|:---------------|:-------------------------|:-----------------|:-------------|
| 👑 **ADMIN** | **TODOS** | **TODOS** | **TODOS** | 🟩 Control Total | Superusuario con acceso completo a todo. |
| 👨‍🍳 **CHEF** | GET | Catálogo de Menú | `/api/menu` | 🟨 Lectura | Ver listado general de menús. |
|  | GET, POST, PUT, DELETE | Catálogo de Menú | `/api/menu/{id}` | 🟩 CRUD Completo | Gestionar menús individuales. |
|  | GET, POST, PUT, DELETE | Catálogo de Menú | `/api/categorias` | 🟩 CRUD Completo | Gestionar categorías del menú. |
|  | GET, POST, PUT, DELETE | Proveedores | `/api/proveedor-insumo` | 🟩 CRUD Completo | Gestionar relaciones proveedor-insumo. |
|  | GET, POST, PUT, DELETE | Insumos | `/api/insumos` | 🟩 CRUD Completo | Gestionar inventario de insumos. |
| 🤵 **MESERO** | GET | Catálogo de Menú | `/api/menu` | 🟨 Lectura | Ver listado general de menús. |
|  | GET, POST, PUT, DELETE | Clientes | `/api/clientes` | 🟩 CRUD Completo | Gestionar clientes. |
|  | GET, POST, PUT, DELETE | Pedidos | `/api/pedidos` | 🟩 CRUD Completo | Gestionar pedidos. |
|  | GET, POST, PUT, DELETE | Pedidos | `/api/mesas` | 🟩 CRUD Completo | Gestionar mesas. |
|  | GET, POST, PUT, DELETE | Pedidos | `/api/detalles` | 🟩 CRUD Completo | Gestionar detalles de pedido. |
|  | GET, POST, PUT, DELETE | Reservas | `/api/reservas` | 🟩 CRUD Completo | Gestionar reservas. |

---

# ⚙️ Diseño Detallado por Microservicio

---

## 🍽 Catálogo de Menú (`com.mesago.mscatalogomenu`)

| Recurso | Método | Verbo | Roles Permitidos | Descripción |
|:---------|:--------|:-------|:------------------|:-------------|
| `/api/menu` | `listar()` | GET | 👨‍🍳, 🤵, 👑 | Lista todos los menús. |
| `/api/menu/{id}` | `obtenerPorId()` | GET | 👨‍🍳, 👑 | Obtiene un menú específico. |
| `/api/menu` | `guardar()` | POST | 👨‍🍳, 👑 | Crea un nuevo menú. |
| `/api/menu/{id}` | `actualizar()` | PUT | 👨‍🍳, 👑 | Modifica un menú existente. |
| `/api/menu/{id}` | `eliminar()` | DELETE | 👨‍🍳, 👑 | Elimina un menú. |
| `/api/categorias` | `listar()` | GET | 👨‍🍳, 👑 | Lista todas las categorías. |
| `/api/categorias/{id}` | `obtenerPorId()` | GET | 👨‍🍳, 👑 | Obtiene una categoría específica. |
| `/api/categorias` | `guardar()` | POST | 👨‍🍳, 👑 | Crea una nueva categoría. |
| `/api/categorias/{id}` | `actualizar()` | PUT | 👨‍🍳, 👑 | Modifica una categoría. |
| `/api/categorias/{id}` | `eliminar()` | DELETE | 👨‍🍳, 👑 | Elimina una categoría. |

---

## 👥 Clientes (`com.mesago.clientes`)

| Recurso | Método | Verbo | Roles Permitidos | Descripción |
|:---------|:--------|:-------|:------------------|:-------------|
| `/api/clientes` | `listar()` | GET | 🤵, 👑 | Lista todos los clientes. |
| `/api/clientes/{id}` | `obtenerPorId()` | GET | 🤵, 👑 | Obtiene un cliente específico. |
| `/api/clientes` | `crear()` | POST | 🤵, 👑 | Registra un nuevo cliente. |
| `/api/clientes/{id}` | `actualizar()` | PUT | 🤵, 👑 | Modifica los datos de un cliente. |
| `/api/clientes/{id}` | `eliminar()` | DELETE | 🤵, 👑 | Elimina un cliente. |

---

## 📦 Proveedores (`com.mesago.msproveedores`)

| Recurso | Método | Verbo | Roles Permitidos | Descripción |
|:---------|:--------|:-------|:------------------|:-------------|
| `/api/proveedor-insumo` | `listar()` | GET | 👨‍🍳, 👑 | Lista la relación proveedor–insumo. |
| `/api/proveedor-insumo/{id}` | `buscarPorId()` | GET | 👨‍🍳, 👑 | Busca una relación específica. |
| `/api/proveedor-insumo` | `registrar()` | POST | 👨‍🍳, 👑 | Registra una nueva relación. |
| `/api/proveedor-insumo/{id}` | `actualizar()` | PUT | 👨‍🍳, 👑 | Actualiza una relación. |
| `/api/proveedor-insumo/{id}` | `eliminar()` | DELETE | 👨‍🍳, 👑 | Elimina una relación. |

---

## 🍲 Pedidos (`com.mesago.mspedidos`)

| Recurso | Método | Verbo | Roles Permitidos | Descripción |
|:---------|:--------|:-------|:------------------|:-------------|
| `/api/pedidos` | `listar()` | GET | 🤵, 👑 | Lista todos los pedidos. |
| `/api/pedidos/{id}` | `obtenerPorId()` | GET | 🤵, 👑 | Obtiene un pedido específico. |
| `/api/pedidos` | `crear()` | POST | 🤵, 👑 | Crea un nuevo pedido. |
| `/api/pedidos/{id}` | `actualizar()` | PUT | 🤵, 👑 | Modifica un pedido existente. |
| `/api/pedidos/{id}` | `eliminar()` | DELETE | 🤵, 👑 | Elimina un pedido. |
| `/api/mesas` | `listar(), guardar(), actualizar(), eliminar()` | GET, POST, PUT, DELETE | 🤵, 👑 | CRUD completo de mesas. |
| `/api/detalles` | `crear(), actualizar(), eliminar()` | GET, POST, PUT, DELETE | 🤵, 👑 | CRUD completo de detalles de pedido. |

---

## 📅 Reservas (`com.mesago.msreservas`)

| Recurso | Método | Verbo | Roles Permitidos | Descripción |
|:---------|:--------|:-------|:------------------|:-------------|
| `/api/reservas` | `listar()` | GET | 🤵, 👑 | Lista todas las reservas. |
| `/api/reservas/{id}` | `obtenerPorId()` | GET | 🤵, 👑 | Obtiene una reserva específica. |
| `/api/reservas` | `crear()` | POST | 🤵, 👑 | Crea una nueva reserva. |
| `/api/reservas/{id}` | `actualizar()` | PUT | 🤵, 👑 | Modifica una reserva. |
| `/api/reservas/{id}` | `eliminar()` | DELETE | 🤵, 👑 | Elimina una reserva. |

---

## 🧂 Insumos (`com.mesago`)

| Recurso | Método | Verbo | Roles Permitidos | Descripción |
|:---------|:--------|:-------|:------------------|:-------------|
| `/api/insumos` | `listar()` | GET | 👨‍🍳, 👑 | Lista todos los insumos. |
| `/api/insumos/{id}` | `obtenerPorId()` | GET | 👨‍🍳, 👑 | Obtiene un insumo específico. |
| `/api/insumos` | `crear()` | POST | 👨‍🍳, 👑 | Registra un nuevo insumo. |
| `/api/insumos/{id}` | `actualizar()` | PUT | 👨‍🍳, 👑 | Actualiza un insumo. |
| `/api/insumos/{id}` | `eliminar()` | DELETE | 👨‍🍳, 👑 | Elimina un insumo. |

---

## 🧾 Leyenda

| Símbolo | Significado |
|:---------|:-------------|
| 🟩 | **CRUD Completo:** Crear, Leer, Actualizar y Eliminar |
| 🟨 | **Lectura:** Solo lectura (GET) |
| 👑 | **ADMIN:** Acceso total |
| 👨‍🍳 | **CHEF:** Gestión de cocina, inventario y proveedores |
| 🤵 | **MESERO:** Gestión de clientes, pedidos, mesas y reservas |

---
