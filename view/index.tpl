<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
        <title>NutriReceta</title>
        <link rel="stylesheet" href="css/fa-all.css">
        <link rel="stylesheet" href="css/all.css">
        <script src="js/jquery.js"></script>
        <script src="js/main.js"></script>
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
         <input id="recipe-name" type="text" placeholder="Nombre de la Receta">
         
         <div class="subtitle"> Ingredientes </div>
         <div id="ingredients-list">
            <div id="ingredient-add"><div class="fas fa-plus"></div></div>
         </div>
         
         <div class="subtitle"> Procesamiento </div>
         <div id="process">
            <div style="display: flex;"><div>Deshidratación</div><input id="dh" type="checkbox"></div>
            <div id="dh-weight" style="opacity:0.5">Peso deshidratado: <input type="number" value="1" min="1" disabled></div>
         </div>
         
         <div class="subtitle"> Información Nutricional (por cada 100g)</div>
         <div id="nutrition-facts">
            <div class="trow">
               <div class="nutrient-name">Energía</div>
               <div id="recipe-energy" class="nutrient-quant">0 Kcals</div>
            </div>
            <div class="trow">
               <div class="nutrient-name">Proteina</div>
               <div id="recipe-protein" class="nutrient-quant">0g</div>
            </div>
            <div class="trow">
               <div class="nutrient-name">Grasas Totales</div>
               <div id="recipe-fat" class="nutrient-quant">0g</div>
            </div>
            <div class="trow">
               <div class="nutrient-name">Carbohidratos Disponibles</div>
               <div id="recipe-ch" class="nutrient-quant">0g</div>
            </div>
         </div>
		 
		 <div id="sellos">
			<img id="s-cal" src="img/calorias.png">
			<img id="s-fat" src="img/grasas.png">
			<img id="s-sug" src="img/azucares.png">
			<img id="s-sod" src="img/sodio.png">
		 </div>
		 
		 <div id="alertas">
			<div></div>
		 </div>
		 
		 <div class="subtitle"> Opciones </div>
		 <div id="options">
			<div class="opt-btn" id="btn-file">Generar Archivo</div>
			<div class="opt-btn" id="btn-save">Guardar Receta</div>
		 </div>
      </div>
    </body>
</html>