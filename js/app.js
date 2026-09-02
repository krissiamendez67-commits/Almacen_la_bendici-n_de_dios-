/* =========================================================
   DATOS DE LOS PRODUCTOS
   No usamos base de datos.
   Los productos se almacenan directamente aquí.
   ========================================================= */

const productos = [
    {
        id: 1,
        nombre: "Arroz 1 libra",
        precio: 1.25,
        categoria: "abarrotes",
        imagen: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
        oferta: false
    },
    {
        id: 2,
        nombre: "Frijoles 1 libra",
        precio: 1.50,
        categoria: "abarrotes",
        imagen: "https://images.unsplash.com/photo-1551462147-37885acc36f1?auto=format&fit=crop&w=600&q=80",
        oferta: false
    },
    {
        id: 3,
        nombre: "Gaseosa",
        precio: 1.25,
        categoria: "bebidas",
        imagen: "https://images.unsplash.com/photo-1629203849820-fdd70d49c38e?auto=format&fit=crop&w=600&q=80",
        oferta: true,
        precioAnterior: 1.75
    },
    {
        id: 4,
        nombre: "Agua embotellada",
        precio: 0.75,
        categoria: "bebidas",
        imagen: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=600&q=80",
        oferta: false
    },
    {
        id: 5,
        nombre: "Jabón para ropa",
        precio: 3.50,
        categoria: "limpieza",
        imagen: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=600&q=80",
        oferta: true,
        precioAnterior: 4.50
    },
    {
        id: 6,
        nombre: "Detergente",
        precio: 2.75,
        categoria: "limpieza",
        imagen: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=600&q=80",
        oferta: false
    },
    {
        id: 7,
        nombre: "Plato de cocina",
        precio: 2.00,
        categoria: "hogar",
        imagen: "https://images.unsplash.com/photo-1603199506016-b9a594b593c0?auto=format&fit=crop&w=600&q=80",
        oferta: true,
        precioAnterior: 2.75
    },
    {
        id: 8,
        nombre: "Vaso de vidrio",
        precio: 1.75,
        categoria: "hogar",
        imagen: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&w=600&q=80",
        oferta: false
    }
];

/* =========================================================
   CARRITO
   localStorage permite conservarlo al cambiar de página.
   ========================================================= */

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

/* Guardar carrito */
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

/* =========================================================
   MOSTRAR PRODUCTOS
   ========================================================= */

function mostrarProductos(lista) {
    const contenedor = document.getElementById("lista-productos");

    // Si esta función no existe en la página actual, salimos.
    if (!contenedor) return;

    contenedor.innerHTML = "";

    if (lista.length === 0) {
        contenedor.innerHTML = `
            <div class="col-12">
                <div class="alert alert-warning text-center">
                    <i class="bi bi-search"></i>
                    No se encontraron productos.
                </div>
            </div>
        `;
        return;
    }

    lista.forEach(producto => {
        const precioAnterior = producto.precioAnterior
            ? `<del class="text-muted me-2">$${producto.precioAnterior.toFixed(2)}</del>`
            : "";

        const etiquetaOferta = producto.oferta
            ? `<span class="badge bg-danger position-absolute top-0 start-0 m-2">OFERTA</span>`
            : "";

        contenedor.innerHTML += `
            <div class="col-sm-6 col-lg-3">
                <div class="card producto-card border-0 shadow-sm position-relative">
                    ${etiquetaOferta}

                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">

                    <div class="card-body d-flex flex-column">
                        <span class="badge bg-primary align-self-start mb-2">
                            ${producto.categoria}
                        </span>

                        <h5 class="card-title fw-bold">${producto.nombre}</h5>

                        <p class="fs-5 fw-bold text-primary mb-3">
                            ${precioAnterior}$${producto.precio.toFixed(2)}
                        </p>

                        <button class="btn btn-success mt-auto"
                            onclick="agregarAlCarrito(${producto.id})">
                            <i class="bi bi-cart-plus"></i>
                            Agregar al carrito
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
}

/* =========================================================
   MOSTRAR OFERTAS
   ========================================================= */

function mostrarOfertas() {
    const contenedor = document.getElementById("lista-ofertas");

    if (!contenedor) return;

    const ofertas = productos.filter(producto => producto.oferta);

    contenedor.innerHTML = "";

    ofertas.forEach(producto => {
        contenedor.innerHTML += `
            <div class="col-sm-6 col-lg-4">
                <div class="card producto-card border-0 shadow-sm h-100">
                    <div class="position-relative">
                        <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                        <span class="badge bg-danger position-absolute top-0 start-0 m-2">
                            OFERTA
                        </span>
                    </div>

                    <div class="card-body text-center">
                        <h4 class="fw-bold">${producto.nombre}</h4>

                        <p>
                            <del class="text-muted me-2">
                                $${producto.precioAnterior.toFixed(2)}
                            </del>
                            <strong class="text-danger fs-4">
                                $${producto.precio.toFixed(2)}
                            </strong>
                        </p>

                        <button class="btn btn-danger w-100"
                            onclick="agregarAlCarrito(${producto.id})">
                            <i class="bi bi-cart-plus"></i>
                            Aprovechar oferta
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
}

/* =========================================================
   AGREGAR AL CARRITO
   ========================================================= */

function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);

    if (!producto) return;

    const existente = carrito.find(p => p.id === id);

    if (existente) {
        existente.cantidad++;
    } else {
        carrito.push({
            ...producto,
            cantidad: 1
        });
    }

    guardarCarrito();
    actualizarCantidadCarrito();
    mostrarCarrito();

    // Abrimos el carrito para que el usuario vea el resultado.
    abrirCarrito();
}

/* =========================================================
   MOSTRAR CARRITO
   ========================================================= */

function mostrarCarrito() {
    const contenedor = document.getElementById("productos-carrito");
    const totalElemento = document.getElementById("total-carrito");

    if (!contenedor || !totalElemento) return;

    contenedor.innerHTML = "";

    if (carrito.length === 0) {
        contenedor.innerHTML = `
            <div class="text-center py-5">
                <i class="bi bi-cart-x display-3 text-muted"></i>
                <h5 class="mt-3">Tu carrito está vacío</h5>
                <a href="productos.html" class="btn btn-primary mt-2">
                    Ver productos
                </a>
            </div>
        `;

        totalElemento.textContent = "0.00";
        return;
    }

    carrito.forEach(producto => {
        const subtotal = producto.precio * producto.cantidad;

        contenedor.innerHTML += `
            <div class="item-carrito">
                <div class="row align-items-center">
                    <div class="col-7">
                        <h6 class="fw-bold mb-1">${producto.nombre}</h6>
                        <small class="text-muted">$${producto.precio.toFixed(2)} cada uno</small>
                        <div class="fw-bold text-primary mt-1">
                            $${subtotal.toFixed(2)}
                        </div>
                    </div>

                    <div class="col-5">
                        <div class="d-flex justify-content-end align-items-center gap-2">
                            <button class="btn btn-sm btn-outline-primary"
                                onclick="cambiarCantidad(${producto.id}, -1)">
                                <i class="bi bi-dash"></i>
                            </button>

                            <span class="fw-bold">${producto.cantidad}</span>

                            <button class="btn btn-sm btn-primary"
                                onclick="cambiarCantidad(${producto.id}, 1)">
                                <i class="bi bi-plus"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    calcularTotal();
}

/* Cambiar cantidad */
function cambiarCantidad(id, cambio) {
    const producto = carrito.find(p => p.id === id);

    if (!producto) return;

    producto.cantidad += cambio;

    if (producto.cantidad <= 0) {
        carrito = carrito.filter(p => p.id !== id);
    }

    guardarCarrito();
    mostrarCarrito();
    actualizarCantidadCarrito();
}

/* Calcular total */
function calcularTotal() {
    const elemento = document.getElementById("total-carrito");

    if (!elemento) return;

    const total = carrito.reduce(
        (suma, producto) => suma + producto.precio * producto.cantidad,
        0
    );

    elemento.textContent = total.toFixed(2);
}

/* Actualizar contador */
function actualizarCantidadCarrito() {
    const elemento = document.getElementById("cantidad-carrito");

    if (!elemento) return;

    const cantidad = carrito.reduce(
        (total, producto) => total + producto.cantidad,
        0
    );

    elemento.textContent = cantidad;
}

/* =========================================================
   ABRIR Y CERRAR CARRITO
   ========================================================= */

function abrirCarrito() {
    const carritoElemento = document.getElementById("carrito");
    const fondo = document.getElementById("fondo-carrito");

    if (!carritoElemento || !fondo) return;

    carritoElemento.classList.add("activo");
    fondo.style.display = "block";
}

function cerrarCarrito() {
    const carritoElemento = document.getElementById("carrito");
    const fondo = document.getElementById("fondo-carrito");

    if (!carritoElemento || !fondo) return;

    carritoElemento.classList.remove("activo");
    fondo.style.display = "none";
}

/* =========================================================
   VACIAR CARRITO
   ========================================================= */

function vaciarCarrito() {
    if (carrito.length === 0) return;

    if (!confirm("¿Seguro que quieres vaciar el carrito?")) return;

    carrito = [];

    guardarCarrito();
    mostrarCarrito();
    actualizarCantidadCarrito();
}

/* =========================================================
   BUSCADOR
   ========================================================= */

function buscarProducto() {
    const input = document.getElementById("buscador");

    if (!input) return;

    const texto = input.value.toLowerCase().trim();

    const resultados = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(texto)
    );

    mostrarProductos(resultados);
}

/* =========================================================
   FILTRAR POR CATEGORÍA
   ========================================================= */

function filtrarCategoria(categoria) {
    if (categoria === "todos") {
        mostrarProductos(productos);
        return;
    }

    const resultados = productos.filter(
        producto => producto.categoria === categoria
    );

    mostrarProductos(resultados);
}

/* =========================================================
   LEER CATEGORÍA DESDE LA URL
   Ejemplo:
   productos.html?categoria=bebidas
   ========================================================= */

function cargarCategoriaDesdeURL() {
    const parametros = new URLSearchParams(window.location.search);
    const categoria = parametros.get("categoria");

    if (categoria) {
        filtrarCategoria(categoria);
    } else {
        mostrarProductos(productos);
    }
}

/* =========================================================
   PEDIDO POR WHATSAPP
   ========================================================= */

function realizarPedido() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    // Cambia este número por el WhatsApp real del negocio.
    const numeroWhatsApp = "50370000000";

    let mensaje = "Hola, quiero realizar el siguiente pedido:%0A%0A";

    carrito.forEach(producto => {
        mensaje += `• ${producto.nombre} x${producto.cantidad} - $${(
            producto.precio * producto.cantidad
        ).toFixed(2)}%0A`;
    });

    const total = carrito.reduce(
        (suma, producto) => suma + producto.precio * producto.cantidad,
        0
    );

    mensaje += `%0ATotal: $${total.toFixed(2)}`;

    const url = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;

    window.open(url, "_blank");
}

/* =========================================================
   FORMULARIO DE CONTACTO
   ========================================================= */

function enviarConsulta(evento) {
    evento.preventDefault();

    const nombre = document.getElementById("nombre-contacto").value.trim();
    const telefono = document.getElementById("telefono-contacto").value.trim();
    const email = document.getElementById("email-contacto").value.trim();
    const mensaje = document.getElementById("mensaje-contacto").value.trim();

    // Cambia este número por el WhatsApp real.
    const numeroWhatsApp = "50370000000";

    const texto =
        `Hola, soy ${nombre}.%0A` +
        `Teléfono: ${telefono}%0A` +
        `Correo: ${email}%0A%0A` +
        `Consulta:%0A${mensaje}`;

    window.open(
        `https://wa.me/${numeroWhatsApp}?text=${texto}`,
        "_blank"
    );
}

/* =========================================================
   INICIALIZACIÓN
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    // Actualiza el contador en cualquier página.
    actualizarCantidadCarrito();

    // Actualiza el carrito si existe en la página.
    mostrarCarrito();

    // Carga productos si estamos en productos.html.
    if (document.getElementById("lista-productos")) {
        cargarCategoriaDesdeURL();
    }

    // Carga las ofertas si estamos en ofertas.html.
    if (document.getElementById("lista-ofertas")) {
        mostrarOfertas();
    }
});
