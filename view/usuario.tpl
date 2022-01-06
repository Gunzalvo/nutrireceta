<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
        <title>Gonzalo Escobar</title>
        <link rel="stylesheet" href="css/fa-all.css">
        <link rel="stylesheet" href="css/usuario/all.css">
        <script src="js/jquery.js"></script>
        <script src="js/usuario/main.js"></script>
    </head>
    <body onload="start()">
		<header>
			<div id="brand">NutriReceta</div>
			{{navbtns}}
		</header>
		
		<div id="content">
			<div class="subtitle">Recetas Guardadas</div>
			<div>
				{{recetas}}
			</div>
		</div>
    </body>
</html>