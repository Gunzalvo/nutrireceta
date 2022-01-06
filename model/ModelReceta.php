<?php

	class ModelReceta {
		
		public function ingresarReceta($data, $usuario) {
			
			if( !isset($data["nombre"]) || !isset($usuario["id"]) )
				return array("code"=>400);
			
			$dh = 0;
			if( isset($data["deshidratado"]) )
				$dh = $data["deshidratado"];
			
			$query = "INSERT INTO receta(ID_Usuario, Nombre, Deshidratado) ".
			         "VALUES(?,?,?)";
			$db = new Database();
			$res = $db->secExec($query, array($usuario["id"], $data["nombre"], $dh));
			
			$idQuery = "SELECT ID_Receta FROM receta ORDER BY ID_Receta DESC LIMIT 1";
			$idRes = $db->query($idQuery);
			
			if( count($idRes) == 0 || !$res ) return array("code"=>500);
			$rid = $idRes[0][0];
			
			if( isset($data["ingredientes"]) ) {
				
				foreach($data["ingredientes"] as $ingrediente) {
					$query = "INSERT INTO ingrediente_receta(ID_Receta, ID_Ingrediente, Cantidad) ".
							 "VALUES(?,?,?)";
					$r = $db->secExec($query, array($rid, $ingrediente["id"], $ingrediente["cantidad"]));
					if( $r == False ) return array("code"=>500);
				}
				
				return array("code"=>201,"id"=>$rid);
			}
			
			return array("code"=>400);
		}
		
		public function actualizarReceta($rid, $data) {
			
			$db = new Database();
			
			if( isset($data["eliminarIngredientes"]) ) {
				
				foreach($data["eliminarIngredientes"] as $ing) {
					
					$query = "DELETE FROM ingrediente_receta ".
							 "WHERE ID_Ingrediente=? AND ID_Receta=?";
					$r = $db->secExec($query, array($ing["id"], $rid));
					if( !$r ) {
						header("HTTP/1.1 500 Internal Server Error");
						exit(0);
					}
					
				}
				
			}
			
			if( isset($data["agregarIngredientes"]) ) {
				
				foreach($data["agregarIngredientes"] as $ing) {
					
					$query = "INSERT INTO ingrediente_receta VALUES(?,?,?)";
					$r = $db->secExec($query, array($ing["id"], $rid, $ing["cantidad"]));
					if( !$r ) {
						header("HTTP/1.1 500 Internal Server Error");
						exit(0);
					}
					
				}
			}
			
			if( isset($data["modificarIngredientes"]) ) {
				
				foreach($data["modificarIngredientes"] as $ing) {
					$query = "UPDATE ingrediente_receta SET Cantidad=? WHERE ID_Ingrediente=? AND ID_Receta=?"; 
					$r = $db->secExec($query, array($ing["cantidad"], $ing["id"], $rid));
					if( !$r ) {
						header("HTTP/1.1 500 Internal Server Error");
						exit(0);
					}
				}
				
			}
			
			$query = "UPDATE receta SET ";
			
			$changes = array();
			$vars = array();
			
			if( isset($data["nombre"]) ) {
				array_push($changes, "Nombre=?");
				array_push($vars, $data["nombre"]);
			}
			
			if( isset($data["deshidratado"]) ) {
				array_push($changes, "Deshidratado=?");
				array_push($vars, $data["deshidratado"]);
			}
			
			if( count($vars) > 0 ) {
				
				foreach($changes as $change) {
					$query .= $change.",";
				}
				
				$query = substr($query, 0, strlen($query) - 1);
				$query .= " WHERE ID_Receta=?";
				array_push($vars, $rid);
				
				$r = $db->secExec($query, $vars);
				if( !$r ) {
					header("HTTP/1.1 500 Internal Server Error");
					exit(0);
				}
				
			}
			
		}
		
		public function borrarReceta($userid, $rid) {
			
			$db = new Database();
			
			$query = "DELETE FROM receta WHERE ID_Usuario=? AND ID_Receta=?";
			return $db->secExec($query, array($userid, $rid));
			
		}
		
		public function obtenerRecetasdeUsuario($userid, $rid = null) {
			
			require "inc/Nutrientes.php";
			
			$query = "SELECT ID_Receta, Nombre, Deshidratado FROM receta WHERE ID_Usuario=?";
			
			$vars = array( $userid );
			if( $rid != null ) {
				$query .= " AND ID_Receta=?";
				array_push($vars, $rid);
			}
			
			$db = new Database();
			$recipes = $db->secQuery($query, $vars);
			
			$js_recipes = array();
			foreach($recipes as $recipe) {
				$js_recipe["id"]           = $recipe["ID_Receta"];
				$js_recipe["nombre"]       = $recipe["Nombre"];
				$js_recipe["deshidratado"] = $recipe["Deshidratado"];
				
				$iq = "SELECT i.ID_Ingrediente, Nombre, Marca, Categoria, Alergeno, Cantidad ".
					  "FROM ingrediente i LEFT JOIN ingrediente_receta ir ".
					  "ON i.ID_Ingrediente = ir.ID_Ingrediente ".
					  "WHERE ir.ID_Receta =".$recipe["ID_Receta"];
				$ings = $db->query($iq);
				
				$rings = array();
				foreach($ings as $ing) {
					$ring["id"]        = $ing["ID_Ingrediente"];
					$ring["nombre"]    = $ing["Nombre"];
					$ring["marca"]     = $ing["Marca"];
					$ring["categoria"] = $ing["Categoria"];
					$ring["alergeno"]  = $ing["Alergeno"];
					$ring["cantidad"]  = $ing["Cantidad"];
					
					$nq = "SELECT * FROM nutriente n LEFT JOIN nutriente_ingrediente ni ".
						  "ON ni.ID_Nutriente = n.ID_Nutriente ".
						  "WHERE ID_Ingrediente=".$ing["ID_Ingrediente"]." AND ".
						  "ID_Padre = -1";
					$nuts = $db->query($nq);
					
					$macronutrientes = array();
					$micronutrientes = array();
					
					foreach($nuts as $nut) {
						$snq = "SELECT * FROM nutriente n RIGHT JOIN nutriente_ingrediente ni ".
							   "ON ni.ID_Nutriente = n.ID_Nutriente ".
							   "WHERE ID_Ingrediente=".$ing["ID_Ingrediente"]." AND ".
							   "ID_Padre =".$nut["ID_Nutriente"];
						$subtipos = $db->query($snq);
						
						$supertipo = array();
						if( count($subtipos) > 0 ) {
							
							foreach($subtipos as $subtipo)
								$supertipo[strtolower($subtipo["Nombre"])] = floatval($subtipo["Cantidad"]);
							
							$supertipo["total"] = floatval($nut["Cantidad"]);
							
						} else $supertipo["total"] = floatval($nut["Cantidad"]);
						
						if( $nut["Tipo"] == 0 )
							$macronutrientes[strtolower($nut["Nombre"])] = $supertipo;
						else
							$micronutrientes[strtolower($nut["Nombre"])] = $supertipo["total"];
					}
						
					$ring["macronutrientes"] = $macronutrientes;
					if( count($micronutrientes) > 0 )
						$ring["micronutrientes"] = $micronutrientes;
					
					array_push($rings, $ring);
				}
				
				$js_recipe["ingredientes"] = $rings;
				array_push($js_recipes, $js_recipe);
			}
		
			return $js_recipes;
		}
		
	}
?>
