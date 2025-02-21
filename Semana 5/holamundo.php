<!DOCTYPE html>
<html>
    <head>
        <title>Hola mundo desde  PHP</title>
</head>
<body>
    <?php
        echo "<p>Hola mundo en PHP</p>";
        // declaracion de variables
        $nombre = "Diego";//variable global, puede ser accedida desde cualquier funcion
        $contador = 9;
        $peso = 69.7;
        $mayorEdad = true;
 
        function miFunction(){
            $variableLocal = "Variable local"; //solo tiene vida dentre dela funcion
            $nombre = "Juan";
            echo $variableLocal;
        }
        echo $nombre;
 
        miFunction();
 
        $edad = 21;
        //if simple
        if($edad < 18){
            echo "eres menor de edad";
        } elseif ($edad == 18) {
            echo "tienes 18";
        } else {
            echo "eres mayor de edad";
            $mayorEdad = true;
        }
        
 
        
    ?>
</body>
</html>