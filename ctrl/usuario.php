<?php	
	require "model/ModelUsuario.php";
	
	$modelUsuario = new ModelUsuario();
	$user = $modelUsuario->getUser();

	if( $user != False ) {
		
		require "model/ModelReceta.php";
		
		$view = new View();
		$modelReceta = new ModelReceta();
		$recetas = $modelReceta->obtenerRecetasdeUsuario($user["id"]);
		
		$v_recetas = "";
		foreach($recetas as $receta) {
			$rdiv = '<div id="receta-{{id}}" class="recipe">'.
						'<div class="recipe-name">{{nombre}}</div>'.
						'<div class="recipe-delete"><i class="fas fa-times"></i></div>'.
					'</div>';
			$v_recetas .= $view->load($rdiv, $receta);
		}
		
		if( $v_recetas == "" ) {
			$v_recetas = '<div style="padding: 4em"> No hay recetas aún :(</div>';
		}
		
		$navbtns = '<div id="btn-calc" class="navbtn">Calcular</div>'.
				   '<div id="btn-logout"  class="navbtn">Cerrar Sesión</div>';
		
		echo $view->load("usuario", array("navbtns"=>$navbtns, "recetas"=>$v_recetas) );
		
		
	} else {
		header("Location: ".BASE);
	}
?>