<?php
$transacciones = [];

function registrarTransaccion($id, $descripcion, $monto) {
    global $transacciones;
    array_push($transacciones, [
        "id" => $id,
        "descripcion" => $descripcion,
        "monto" => $monto
    ]);
}

function generarEstadoDeCuenta() {
    global $transacciones;


    $montoTotalContado = 0;
    $interes = 2.6 / 100;  
    $cashback = 0.1 / 100;  

    foreach ($transacciones as $transaccion) {
        $montoTotalContado += $transaccion["monto"];
    }


    $montoConInteres = $montoTotalContado * (1 + $interes);


    $montoCashback = $montoTotalContado * $cashback;


    $montoFinal = $montoConInteres - $montoCashback;


    echo "<h2>Estado de Cuenta</h2>";
    echo "<table border='1'>
            <tr>
                <th>ID</th>
                <th>Descripción</th>
                <th>Monto</th>
            </tr>";
    foreach ($transacciones as $transaccion) {
        echo "<tr>
                <td>" . $transaccion['id'] . "</td>
                <td>" . $transaccion['descripcion'] . "</td>
                <td>" . number_format($transaccion['monto'], 2) . "</td>
              </tr>";
    }
    echo "</table>";

    echo "<br><b>Monto Total Contado:</b> " . number_format($montoTotalContado, 2) . "<br>";
    echo "<b>Monto Total con Interés (2.6%):</b> " . number_format($montoConInteres, 2) . "<br>";
    echo "<b>Cashback (0.1%):</b> " . number_format($montoCashback, 2) . "<br>";
    echo "<b>Monto Final a Pagar:</b> " . number_format($montoFinal, 2) . "<br>";


    $estadoCuenta = "Estado de Cuenta\n";
    foreach ($transacciones as $transaccion) {
        $estadoCuenta .= "ID: " . $transaccion['id'] . " | Descripción: " . $transaccion['descripcion'] . " | Monto: " . number_format($transaccion['monto'], 2) . "\n";
    }
    $estadoCuenta .= "\nMonto Total Contado: " . number_format($montoTotalContado, 2) . "\n";
    $estadoCuenta .= "Monto Total con Interés (2.6%): " . number_format($montoConInteres, 2) . "\n";
    $estadoCuenta .= "Cashback (0.1%): " . number_format($montoCashback, 2) . "\n";
    $estadoCuenta .= "Monto Final a Pagar: " . number_format($montoFinal, 2) . "\n";

    file_put_contents("estado_cuenta.txt", $estadoCuenta);
}


registrarTransaccion(1, "Compra en Supermercado", 100.50);
registrarTransaccion(2, "Compra en Tienda de Ropa", 75.20);
registrarTransaccion(3, "Pago de Servicios", 50.00);


generarEstadoDeCuenta();
?>

