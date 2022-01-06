<?php	
	require "model/ModelUsuario.php";
	
	$view = new View();
	$model = new ModelUsuario();
	
	$user = $model->getUser();

	if( $user == False ) {
		$navbtns = '<div id="btn-login"    class="navbtn">Iniciar Sesión</div>'.
				   '<div id="btn-register" class="navbtn">Registrate</div>';
	} else {
		$div = '<div class="navbtn" id="user-{{id}}">{{name}}</div>'.
			   '<div class="navbtn" id="btn-logout">Cerrar Sesión</div>';
		$navbtns = $view->load($div, $user);
	}
	
	echo $view->load("index", array("navbtns"=>$navbtns) );
?>