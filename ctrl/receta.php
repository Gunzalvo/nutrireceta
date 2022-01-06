<?php
	if( isset($_GET["ingresar"]) ) {
		
		require "model/ModelReceta.php";
		require "model/ModelUsuario.php";
		
		$modelUsuario = new ModelUsuario();
		$modelReceta = new ModelReceta();
		
		$res = $modelReceta->ingresarReceta($_POST, $modelUsuario->getUser());
		
		if( isset($res["code"]) ) {
			
			if( $res["code"] == 400 ) {
				header("HTTP/1.1 400 Bad Request");
			} else if ( $res["code"] === 501 ) {
				header("HTTP/1.1 500 Internal Server Error");
			} else if ( $res["code"] == 201 ) {
				header("HTTP/1.1 201 Created");
				echo $res["id"];
			}
			
		} else header("HTTP/1.1 500 Internal Server Error");
		
	} else if ( isset($_GET["guardar"]) ) {
		
		if( !isset($_GET["receta"]) ) {
			header("HTTP/1.1 400 Bad Request");
			exit(0);
		}
		
		$rid = $_GET["receta"];
		if( $rid != "" ) {
			
			require "model/ModelReceta.php";
			require "model/ModelUsuario.php";
			
			$modelUsuario = new ModelUsuario();
			$modelReceta = new ModelReceta();
			
			$user = $modelUsuario->getUser();
			if( $user != False )
				$modelReceta->actualizarReceta($rid, $_POST);
			else header("HTTP/1.1 401 Unauthorized");
			
			
		} else header("HTTP/1.1 400 Bad Request");
		
		
	} else if ( isset($_GET["borrar"]) ) {
		
		if( !isset($_GET["receta"]) ) {
			header("HTTP/1.1 400 Bad Request");
			exit(0);
		}
		
		$rid = $_GET["receta"];
		if( $rid != "" ) {
			
			require "model/ModelReceta.php";
			require "model/ModelUsuario.php";
			
			$modelUsuario = new ModelUsuario();
			$modelReceta = new ModelReceta();
			
			$user = $modelUsuario->getUser();
			if( $user != False )
				$modelReceta->borrarReceta($user["id"], $rid);
			else header("HTTP/1.1 401 Unauthorized");
			
		} else header("HTTP/1.1 400 Bad Request");
		
		
	} else {
		
		$rid = $_GET["receta"];
		if($rid != "") {
			
			require "model/ModelUsuario.php";
		
			$model = new ModelUsuario();
			$user = $model->getUser();
			
			if( $user != False ) {
				require "model/ModelReceta.php";
				
				$mReceta = new ModelReceta();
				$recetas = $mReceta->obtenerRecetasdeUsuario($user["id"], $rid);
				
				echo json_encode($recetas);
				
			} else header("HTTP/1.1 401 Unauthorized");
			
		} else {
			
			require CTRL."index.php";
			
		}
		
	}
?>
