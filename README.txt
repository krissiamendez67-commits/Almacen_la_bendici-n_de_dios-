# ALMACÉN EL AHORRO

Tienda online hecha con HTML, CSS, Bootstrap 5 y JavaScript.

## Estructura

- index.html       -> Página principal
- productos.html   -> Catálogo, buscador y categorías
- ofertas.html     -> Productos en oferta
- contacto.html    -> Formulario de contacto
- css/estilos.css  -> Estilos personalizados
- js/app.js        -> Productos, carrito y funciones

## Cómo ejecutar

1. Abre esta carpeta en Visual Studio Code.
2. Instala la extensión Live Server.
3. Abre index.html.
4. Haz clic derecho -> Open with Live Server.

También puedes abrir index.html directamente en el navegador.

## Importante

El proyecto NO utiliza base de datos ni servidor.

El carrito usa localStorage del navegador.

Para cambiar el WhatsApp:
- Abre js/app.js
- Busca: const numeroWhatsApp = "50370000000";
- Sustitúyelo por el número real.

Para cambiar productos:
- Edita el arreglo "productos" en js/app.js.

## Botones y páginas

- Inicio -> index.html
- Productos -> productos.html
- Ofertas -> ofertas.html
- Contacto -> contacto.html
- Comprar ahora -> productos.html
- Ver ofertas -> ofertas.html
- Categorías -> productos.html?categoria=...
- Carrito -> carrito lateral en cualquier página
- Realizar pedido -> WhatsApp
- Formulario de contacto -> WhatsApp
