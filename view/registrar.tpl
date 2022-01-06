<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
        <title>NutriReceta: Registrarse</title>
        <link rel="stylesheet" href="css/fa-all.css">
        <link rel="stylesheet" href="css/registro/all.css">
        <script src="js/jquery.js"></script>
        <script src="js/registrar/m.js"></script>
    </head>
    <body onload="start()">
		<header>
			<div id="brand">NutriReceta</div>
			{{navbtns}}
		</header>
		
		<div id="login-dialog">
			<div id="dialog">
				<div id="dialog-header">
					<div>Iniciar Sesión</div>
					<i id="btn-close" class="fas fa-times"></i>
				</div>
				<div id="dialog-inputs">
					<input name="correo" type="text"       placeholder="Correo Electrónico">
					<input name="password" type="password" placeholder="Contraseña">
				</div>
				<div id="dialog-footer">
					<div id="btn-send">Enviar</div>
				</div>
			</div>
		</div>
		
		<div id="content">
			<div class="subtitle">Registro</div>
			<div id="inputs">
				<input name="nombre" type="text" placeholder="Nombre y Apellido">
				<input name="email" type="text" placeholder="Correo electrónico">
				<input name="password1" type="password" placeholder="Contraseña">
				<input name="password2" type="password" placeholder="Repetir Contraseña">
			</div>
			<div class="subtitle"> Opciones </div>
			 <div id="options">
				<div class="opt-btn" id="btn-register">Registrarse</div>
			 </div>
		</div>
    </body>
</html>