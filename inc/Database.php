<?php

    class Database {
      
        private $con = NULL;
        public $lastInsertId;
      
        public function __construct() {
         
			$pdo = NULL;

			try {
				$dsn = "mysql:dbname=".DB_NAME."; host=localhost";
				$params = array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8");
				$pdo = new PDO($dsn, DB_USER, DB_PW, $params);
			} catch(PDOException $e) {
				$log = fopen("error.txt", "a");
				fwrite($log, "Error PDO: ".$e->getMessage().", codigo: ".$e->getCode() );
				fclose($log);
			}
         
			$this->con = $pdo;
		}
      
		public function query($statement) {
			if( is_object($this->con) ) {
				$result = $this->con->query($statement);
				if( is_object($result) )
					return $result->fetchAll();
			}
			return array();
		}
	
		public function exec($statement) {
			if( is_object($this->con) ) {
				$res = $this->con->exec($statement);
				$this->lastInsert = $this->con->lastInsertId();
				return $res;
			}
			return False;
		}
      
		public function secQuery($statement, $clauses) {
			if( is_array($clauses) && is_object($this->con) ) {
				$query = $this->con->prepare($statement);
				$exec = $query->execute($clauses);
				
				if( $exec ) return $query->fetchAll();
			}
			return array();
		}
		  
		public function secExec($statement, $clauses) {
			if( is_array($clauses) && is_object($this->con) ) {
				$query = $this->con->prepare($statement);
				$exec = $query->execute($clauses);
				$this->lastInsert = $this->con->lastInsertId();
				return $exec;			
			}
			return False;
		}
		
		public function login($username, $password) {
			
			$query = "SELECT ID_Usuario, Nombre, Password FROM usuario WHERE Correo=?";
			$res = $this->secQuery($query, array($username) );
			
			if( count($res) ) {
				$user = $res[0];
				
				if( password_verify($password, $user["Password"]) ) {
					$token = hash('sha256', random_bytes(8));
			        $query = "UPDATE usuario SET TKN=? WHERE Correo=?";
			   
					$ex = $this->secExec($query, array($token, $_POST["name"]));
					
					if( $ex ) { 
						$_SESSION["token"] = $token;
						
						$json["id"] = $user["ID_Usuario"];
						$json["name"] = $user["Nombre"];
						
						return $json;
					}
					
				}
				
			}
			
			return False;
		}
		
		public function logout($token) {
			
			$query = "UPDATE usuario SET TKN='' WHERE TKN=?";
			$this->secQuery($query, array($token) );
			
		}
    }
?>