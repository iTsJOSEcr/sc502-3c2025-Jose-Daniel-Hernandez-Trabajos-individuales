function calcularDeducciones() {
    let salarioBruto = parseFloat(document.getElementById("salario").value);

    if (isNaN(salarioBruto) || salarioBruto <= 0) {
        alert("Ingrese un salario válido.");
        return;
    }

    // Cargas Sociales (CCSS) - Aproximadamente 10.5%
    let cargasSociales = salarioBruto * 0.105;

    // Cálculo de Impuesto sobre la Renta según tramos en Costa Rica (2024)
    let impuestoRenta = 0;

    if (salarioBruto > 941000) {
        impuestoRenta += (salarioBruto - 941000) * 0.15;
        salarioBruto = 941000;
    }
    if (salarioBruto > 554000) {
        impuestoRenta += (salarioBruto - 554000) * 0.10;
    }

    let salarioNeto = salarioBruto - cargasSociales - impuestoRenta;

    // Mostrar los resultados en la página
    document.getElementById("cargas-sociales").textContent = cargasSociales.toFixed(2);
    document.getElementById("impuesto-renta").textContent = impuestoRenta.toFixed(2);
    document.getElementById("salario-neto").textContent = salarioNeto.toFixed(2);
}
