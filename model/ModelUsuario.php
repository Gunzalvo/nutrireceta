<?php
	class ModelUsuario {
		
		public function getUser() {
			
			session_start();
			
			if( isset($_SESSION["token"]) ) {
				
				$db = new Database();
				$query = "SELECT ID_Usuario, Nombre FROM usuario WHERE TKN=?";
				
				$res = $db->secQuery($query, array($_SESSION["token"]));
				if( count($res) ) {
					$user = $res[0];
					
					$usuario["id"] = $user["ID_Usuario"];
					$usuario["name"] = $user["Nombre"];
					
					return $usuario;
				}
				
			}
			
			return False;
		}
		
		
		public function ingresarUsuario($data) {
			
			$query = "INSERT INTO usuario(Nombre, Correo, Password) VALUES(?,?,?)";
			
			$hashed = password_hash($data["password"], PASSWORD_BCRYPT);
			
			$db = new Database();
			$r = $db->secExec($query, array($data["nombre"], $data["correo"], $hashed));
			
			if( !$r ) {
				header("HTTP/1.1 500 Internal Server Error");
			}
			
		}
		
	}
?>
