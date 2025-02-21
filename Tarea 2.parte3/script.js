
let productos = [];

function agregarProducto() {
    let nombre = document.getElementById("nombre").value;
    let precio = document.getElementById("precio").value;
    let categoria = document.getElementById("categoria").value;

    if (nombre === "" || precio === "") {
        alert("Todos los campos son obligatorios");
        return;
    }

    let producto = {
        nombre,
        precio: parseFloat(precio),
        categoria
    };

    productos.push(producto);
    actualizarLista();
}

function actualizarLista() {
    let lista = document.getElementById("lista-productos");
    lista.innerHTML = "";

    productos.forEach((producto, index) => {
        let item = document.createElement("li");
        item.innerHTML = `${producto.nombre} - $${producto.precio} (${producto.categoria}) 
            <button class="boton-eliminar" onclick="eliminarProducto(${index})">X</button>`;
        lista.appendChild(item);
    });
}

function eliminarProducto(index) {
    productos.splice(index, 1);
    actualizarLista();
}

function filtrarProductos() {
    let filtro = document.getElementById("filtro").value;
    let lista = document.getElementById("lista-productos");
    lista.innerHTML = "";

    let productosFiltrados = filtro === "Todos" ? productos : productos.filter(p => p.categoria === filtro);

    productosFiltrados.forEach((producto, index) => {
        let item = document.createElement("li");
        item.innerHTML = `${producto.nombre} - $${producto.precio} (${producto.categoria}) 
            <button class="boton-eliminar" onclick="eliminarProducto(${index})">X</button>`;
        lista.appendChild(item);
    });
}
