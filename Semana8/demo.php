<?php
// Inventario de productos
$productos = [
    ["id" => 1, "nombre" => "Producto1", "cantidad" => 10, "precio" => 20.5],
    ["id" => 2, "nombre" => "Producto2", "cantidad" => 5, "precio" => 15.0],
    ["id" => 3, "nombre" => "Producto3", "cantidad" => 8, "precio" => 7.75],
    ["id" => 4, "nombre" => "Producto4", "cantidad" => 12, "precio" => 9.99],
];

$carrito = [];

function buscarProductoPorId($id) {
    global $productos;
    foreach ($productos as $producto) {
        if ($producto['id'] == $id) {
            return $producto;
        }
    }
    return null;
}

function agregarAlCarrito($idProducto, $cantidad) {
    global $carrito, $productos;
    $producto = buscarProductoPorId($idProducto);

    if ($producto) {
        if ($producto["cantidad"] >= $cantidad) {
            array_push($carrito, [
                "id" => $producto['id'],
                "nombre" => $producto["nombre"],
                "cantidad" => $cantidad,
                "precio" => $producto['precio']
            ]);

            // Restar del inventario
            for ($i = 0; $i < count($productos); $i++) {
                if ($productos[$i]['id'] == $idProducto) {
                    $productos[$i]['cantidad'] -= $cantidad;
                }
            }

            echo "<p style='color: green;'>✅ Producto agregado exitosamente</p>";
        } else {
            echo "<p style='color: red;'>❌ No hay suficiente cantidad para el producto " . $producto["nombre"] . "</p>";
        }
    } else {
        echo "<p style='color: red;'>❌ Producto no encontrado</p>";
    }
}

// Procesar formulario
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $id = intval($_POST["producto"]);
    $cantidad = intval($_POST["cantidad"]);
    agregarAlCarrito($id, $cantidad);
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Inventario y Carrito</title>
</head>
<body>
    <h1>Agregar producto al carrito</h1>
    <form method="POST">
        <label for="producto">Producto:</label>
        <select name="producto" id="producto">
            <?php foreach ($productos as $p): ?>
                <option value="<?= $p['id'] ?>">
                    <?= $p['nombre'] ?> (Disponibles: <?= $p['cantidad'] ?>)
                </option>
            <?php endforeach; ?>
        </select>
        <br><br>
        <label for="cantidad">Cantidad:</label>
        <input type="number" name="cantidad" id="cantidad" min="1" required>
        <br><br>
        <button type="submit">Agregar al carrito</button>
    </form>

    <h2>🛒 Carrito actual:</h2>
    <?php if (count($carrito) > 0): ?>
        <ul>
            <?php foreach ($carrito as $item): ?>
                <li><?= $item['nombre'] ?> - Cantidad: <?= $item['cantidad'] ?> - Precio unitario: <?= $item['precio'] ?></li>
            <?php endforeach; ?>
        </ul>
    <?php else: ?>
        <p>El carrito está vacío.</p>
    <?php endif; ?>
</body>
</html>
