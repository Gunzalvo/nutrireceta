<?php

	class ModelIngrediente {
		
		public function buscarIngrediente($query) {
			
			require "inc/Nutrientes.php";
			
			$query = '%'.$query.'%';
			$q = "SELECT * FROM ingrediente WHERE ".
			     "Nombre LIKE ? OR Marca LIKE ? ".
				 "OR Categoria LIKE ? LIMIT 5";
			$db = new Database();
			$resultados = $db->secQuery($q, array($query, $query, $query));
			
			$ingredientes = array();
			foreach($resultados as $resultado) {
				
				$ingrediente = array();
				$ingrediente["id"] = $resultado["ID_Ingrediente"];
				$ingrediente["nombre"] = $resultado["Nombre"];
				$ingrediente["marca"]  = $resultado["Marca"];
				$ingrediente["categoria"]  = $resultado["Categoria"];
				$ingrediente["alergeno"] = $resultado["Alergeno"];
				
				$nq = "SELECT * FROM nutriente n LEFT JOIN nutriente_ingrediente ni ".
				      "ON ni.ID_Nutriente = n.ID_Nutriente ".
					  "WHERE ID_Ingrediente=".$resultado["ID_Ingrediente"]." AND ".
					  "ID_Padre = -1";
				$nutrientes = $db->query($nq);
				
				$macronutrientes = array();
				$micronutrientes = array();
				
				foreach($nutrientes as $nutriente) {
					
					$snq = "SELECT * FROM nutriente n RIGHT JOIN nutriente_ingrediente ni ".
						   "ON ni.ID_Nutriente = n.ID_Nutriente ".
						   "WHERE ID_Ingrediente=".$resultado["ID_Ingrediente"]." AND ".
						   "ID_Padre =".$nutriente["ID_Nutriente"];
					$subtipos = $db->query($snq);
					
					$supertipo = array();
					if( count($subtipos) > 0 ) {
						
						foreach($subtipos as $subtipo)
							$supertipo[strtolower($subtipo["Nombre"])] = floatval($subtipo["Cantidad"]);
						
						$supertipo["total"] = floatval($nutriente["Cantidad"]);
						
					} else $supertipo["total"] = floatval($nutriente["Cantidad"]);
					
					if( $nutriente["Tipo"] == 0 )
						$macronutrientes[strtolower($nutriente["Nombre"])] = $supertipo;
					else
						$micronutrientes[strtolower($nutriente["Nombre"])] = $supertipo["total"];
					
				}
				
				if( count($micronutrientes) )
					$ingrediente["micronutrientes"] = $micronutrientes;
				$ingrediente["macronutrientes"] = $macronutrientes;
				
				array_push($ingredientes, $ingrediente);
			}
			
			return $ingredientes;
		}
		
	}
?>
