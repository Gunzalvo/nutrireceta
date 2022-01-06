<?php 
	
class View {
	
	function load($string, $data) {
		$filename = "view/".$string.".tpl";
		
        if( file_exists($filename) ) {
			$file = fopen($filename, "r");
			$output = "";
			
			while( !feof($file) ) {
				
				$char = fread($file, 1);
				if( $char == "{" ) {
					
					$char = fread($file, 1);
					if( $char == "{" ) {
						$char = fread($file, 1);
						$var = "";

						while( $char == " " )
							$char = fread($file, 1);
						
						while( $char != " " && $char != "}" ) {
							$var .= $char;
							$char = fread($file, 1);
						}
						
						if( $char == " " )
							while( $char != "}" )
								$char = fread($file, 1);
						$char = fread($file, 1);
						
						if( isset($data[$var]) )
							$output .= $data[$var];
						
					} else {	
						$output .= "{".$char;
					}
					
				} else {
					$output .= $char;
				}
			}
			return $output;
         
		} else {
         
			$output = "";
			$c = 0;
			$i = 0;
         
			while( $c < strlen($string) ) {
				
				$char = $string[$c];
					if( $char == "{" ) {
						
						$char = $string[++$c];
						if( $char == "{" ) {
							$var = "";
					  
						$char = $string[++$c];
							while( $char == " " )
								$char = $string[++$c];
							
							while( $char != " " && $char != "}" ) {
								$var .= $char;
								$char = $string[++$c];
							}
							
							if( $char == " " )
								while( $char != "}" )
									$char = $string[++$c];
						$char = $string[++$c];
							
							if( isset($data[$var]) )
								$output .= $data[$var];
						else if($var == "")
							$output .= $data[$i++];
							
						} else {	
							$output .= "{".$char;
						}
						
					} else {
						$output .= $char;
					}
				
				$c++;
				
			}
         
			if($output == $string) return "";
			return $output; 
        }
      
	}
}
	
?>