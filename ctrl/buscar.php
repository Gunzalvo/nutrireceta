<?php
	require "model/ModelIngrediente.php";
	
	$model = new ModelIngrediente();
	$resultados = $model->buscarIngrediente($_GET["buscar"]);
	
	header("Conten-type: application/json");
	echo json_encode($resultados);
?>
