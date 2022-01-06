<?php	
	define("CTRL", "ctrl/");
	
	$controller = "";
	$default = CTRL."index.php";
	
	if( !file_exists($default) ) {
		echo "<h3> Error 404, pagina no encontrada! </h3>";
		die();
	}
	
	define("BASE", "http://192.168.1.10/nutricalc");
	define("DB_USER", "root");
	define("DB_NAME", "nutricalc");
	define("DB_PW", "");
	
	//define("DB_PW", "id^-_r5zhJS}");
	
	include("inc/View.php");
    include("inc/Database.php");
	
    if( isset($_GET["usuario"]) ) {
		$controller = CTRL."usuario.php";
	} else if( isset($_GET["registrar"]) ) {
		$controller = CTRL."registrar.php";
	} else if( isset($_GET["login"]) ) {
		$controller = CTRL."login.php";
	} else if( isset($_GET["receta"]) ) {
		$controller = CTRL."receta.php";
	} else if( isset($_GET["buscar"]) ) {
		$controller = CTRL."buscar.php";
	}
	
	if( file_exists($controller) ) 
		require $controller;
	else require $default;
?>