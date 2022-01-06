<?php	
	
	if( isset($_GET["ingresar"]) ) {
		
		require "model/ModelUsuario.php";
		
		$model = new ModelUsuario();
		$model->ingresarUsuario($_POST);
		
	} else {
		
		require "model/ModelUsuario.php";
	
		$view = new View();
		$model = new ModelUsuario();
		
		$user = $model->getUser();

		if( $user == False ) {
			$navbtns = '<div id="btn-login"    class="navbtn">Iniciar Sesión</div>'.
					   '<div id="btn-calc" class="navbtn">Calcular</div>';
					   
			echo $view->load("registrar", array("navbtns"=>$navbtns) );
		} else {
			header("Location: ".BASE);
		}
		
	}
	
?>