<?php
	session_start();

    if( isset($_POST["name"]) && isset($_POST["pw"]) ) {
		
		if( !empty($_POST["name"]) && !empty($_POST["pw"]) ) {
			
			$db = new Database();
			$user = $db->login($_POST["name"], $_POST["pw"]);
			
			if(  $user == False ) {
				header("HTTP/1.1 401 Unauthorized");
			} else {
				header("Content-type: application/json");
				echo json_encode($user);
			}
			
		}
		
	} else if ( isset($_GET["logout"]) && isset($_SESSION["token"]) ) {
		
		$db = new Database();
		
		$db->logout($_SESSION["token"]);
		session_destroy();
		
	}
?>
