var recipeIngredients = [];
var recipeDehydratedWeight = undefined;
var changes = undefined;

function start() {   
   $("#ingredient-add .fa-plus").on("click", addIngredientSearch);
   $("#dh").on("change", changeRecipeWeight);
   $("#dh-weight input").on("change", changeDH);
   $("#dh-weight input").on("keyup", changeDH);
   $("#recipe-name").on("change", changeName);
   $("#btn-send").on("click", login);
   $("#btn-file").on("click", saveFile);
   $(".opt-btn").click(btnClick);
   $(".navbtn").click(btnClick);
   
   let match = location.href.match(/recipe=(\d+)/);
   if( match != null ) {
	   getRecipe(match[1]);
	   changes = {};
   }
}

function changeName(e) {
	if( changes !== undefined ) {
		let newName = e.target.value;
		changes.nombre = newName;
	}
}

function getRecipe(id) {
	let callback = (xhr, s) => {
		
		if( xhr.status === 200 ) {
			let recipes = [];
			
			try {
				recipes = JSON.parse(xhr.responseText);
			} catch(e) {
				console.log(e);
			}
			
			if( recipes[0] !== undefined ) {
				let recipe = recipes[0];
				
				if( recipe.ingredientes !== undefined ) {
					
					recipe.deshidratado = parseInt(recipe.deshidratado);
					recipeIngredients = recipe.ingredientes;
					$("#recipe-name")[0].value = recipe.nombre;
					
					if( recipe.deshidratado !== 0 ) {
						recipeDehydratedWeight = recipe.deshidratado;
						$("#dh")[0].checked = true;
						$("#dh-weight")[0].style.opacity = "1";
						let dhinput = $("#dh-weight input")[0];
						dhinput.value = recipe.deshidratado;
						dhinput.removeAttribute("disabled");
					}
					
					for(let i=0; i < recipeIngredients.length; i++) {
						let element = createDoneIngredient(i);
						let list = $("#ingredients-list")[0];
						let btn = $("#ingredient-add")[0];
						
						list.insertBefore(element, btn);
					}
					
					updateQuantity(null);
					
				}
				
			}
			
		}
		
	}
	
	let ajax = { 
		url: "index.php?receta="+id, 
		type: "GET",
		complete: callback 
	}
	
	$.ajax(ajax);
}

function btnClick(e) {
	let id = e.target.id;
	let match = id.match(/user-(\d){1,4}/);
	
	if( match != null ) {
		let id = match[1];
		location.assign("index.php?usuario="+id);
	} else if ( id === "btn-login" ) {
		showDialog();
	} else if ( id === "btn-close")	{
		hideDialog();
	} else if ( id === "btn-register" ) {
		location.assign("index.php?registrar");
	} else if ( id === "btn-save" ) {
		saveRecipe();
	}else if ( id === "btn-logout" ) {
		navigator.sendBeacon("index.php?login&logout");
		setTimeout(()=>location.reload(), 500);
	}
	
} 

function showDialog (){
	let dialog = $("#login-dialog")[0];
	
	let tid;
	let del = (t) => {
		clearTimeout(t);
		dialog.style.opacity = "1";
		$("#btn-close")[0].addEventListener("click", hideDialog, {once:true});
	}
	
	dialog.style.display = "flex";	
	tid = setTimeout(del, 100, tid);
}

function hideDialog (){
	let dialog = $("#login-dialog")[0];
	
	dialog.addEventListener("transitionend", ()=>{
		dialog.removeAttribute("style");
	}, {once:true});
	
	dialog.style.opacity = "0";
}

function saveRecipe() {
	
	if( recipeIngredients.length > 0 ) {
		
		let nameInput = $("#recipe-name")[0];
		let recipeName = nameInput.value;
		
		let dhChk = $("#dh")[0];
		let dhWeight = 0;
		if( dhChk.checked ) {
			let weight_input = $("#dh-weight input")[0];
			dhWeight = weight_input.value;
		}
		
		let ingredients = [];
		for(let i=0; i < recipeIngredients.length; i++) {
			
			let ingredient = {
				id: recipeIngredients[i].id,
				cantidad: recipeIngredients[i].cantidad
			}
			
			ingredients.push(ingredient);
		}
		
		let recipe = {
			nombre: recipeName,
			deshidratado: dhWeight,
			ingredientes: ingredients
		}
		
		let callback = (xhr, s)=>{
			
			if( xhr.status === 201 ) { //receta creada
				location.assign("index.php?recipe="+xhr.responseText);
			} else if( xhr.status === 200 ) { //receta actualizada
				changes = {};
			}
			
		}
		
		let url = "index.php?receta&ingresar";
		let data = recipe;
		
		let match = location.href.match(/recipe=(\d+)/);
		if( match !== null ) {
			url = "index.php?receta="+match[1]+"&guardar";
			data = changes;
		}
		
		let ajax = {
			url: url,
			data: data,
			type: "POST",
			complete: callback
		}
		
		$.ajax(ajax);
	}
	
}

function login() {
	
	let email_input = $("#dialog-inputs input[type=text]")[0];
	let pw_input = $("#dialog-inputs input[type=password]")[0];
	
	let email = email_input.value;
	let pw = pw_input.value;
	
	if(email != "" && pw != "") {
		
		let callback = function(xhr, s) {
			
			if( xhr.status === 200 ) {
				
				let user = { id:-1 };
				
				try {
					user = JSON.parse(xhr.responseText);
				} catch(e) {
					console.log(e);
				}
				
				if( user.id != -1 ) {
					let username = user.name;
					let userdiv = document.createElement("div");
					$(userdiv).click(btnClick);
					userdiv.innerText = user.name;
					userdiv.className = "navbtn";
					userdiv.id = "user-"+user.id;
					
					let logout = document.createElement("div");
					$(logout).click(btnClick);
					logout.className = "navbtn";
					logout.innerText = "Cerrar Sesión";
					logout.id = "btn-logout";
					
					$(".navbtn").remove();
					$("header").append(userdiv);
					$("header").append(logout);
					
					hideDialog();
				}
				
			} else if ( xhr.status === 401 ) {
				//mostrar usuario o contraseña invalido...
			}
			
		}
		
		let ajax = {
			url: "index.php?login",
			data: { name: email, pw: pw },
			type: "POST",
			complete: callback 
		}
		
		$.ajax(ajax);
		
	} //else mostrar error
	
}

function changeDH (e){
	if( e.target.value !== "" ) {
		recipeDehydratedWeight = parseInt(e.target.value);
		
		if( changes !== undefined )
			changes.deshidratado = recipeDehydratedWeight;
		
		updateQuantity(null);
	}
}

function changeRecipeWeight(e) {
	
	let chbox = e.target;
	let dhWeight = $("#dh-weight")[0];
	let input = dhWeight.querySelector("input");
   
	if( chbox.checked ) {
		dhWeight.style.opacity = "1";
		input.removeAttribute("disabled");
		recipeDehydratedWeight = parseInt(input.value);
		
		if( changes !== undefined )
			changes.deshidratado = recipeDehydratedWeight;
	} else {
		dhWeight.style.opacity = "0.5";
		input.setAttribute("disabled", "");
		recipeDehydratedWeight = undefined;
		
		if( changes !== undefined )
			changes.deshidratado = 0;
	}
   
   updateQuantity(null);
}

function updateQuantity(e) {
   
	if( e != null ) {
		let el = e.target;
		let child = el;
		while( child.className !== "ingredient-search" )
			child = child.parentElement;

		let ingredientList = $("#ingredients-list")[0];
		let childIndex;
		for(childIndex = 0; childIndex < ingredientList.children.length; childIndex++)
			if( ingredientList.children[childIndex] === child ) break;
		
		let ing = recipeIngredients[childIndex];
		if( ing !== undefined )
			recipeIngredients[childIndex].cantidad = parseInt(el.value);
		
		if( changes !== undefined ) {
			if( changes.agregarIngredientes !== undefined ) {
				for(let i=0; i < changes.agregarIngredientes.length; i++) {
					if( changes.agregarIngredientes[i].id === ing.id ) {
						changes.agregarIngredientes[i].cantidad = parseInt(el.value);
						break;
					}
				}
			} else if( changes.modificarIngredientes !== undefined ) {
				for(let i=0; i < changes.modificarIngredientes.length; i++) {
					if( changes.modificarIngredientes[i].id === ing.id ) {
						changes.modificarIngredientes[i].cantidad = parseInt(el.value);
						break;
					}
				}
			} else {
				changes.modificarIngredientes = [];
				
				let modified = { id:ing.id, cantidad:ing.cantidad };
				changes.modificarIngredientes.push(modified);
			}
		}
		
	}
   
	let total, fat, protein, ch, saturada, azucar, sodio;
	total = fat = protein = ch = saturada = sodio = azucar = 0;
   
    let alertas = [];
	
	for(let i=0; i < recipeIngredients.length; i++) {
		let ing = recipeIngredients[i];
		
		let al = parseInt(ing.alergeno);
		
		if( al !== 0 ) {
			let msg = "";
			switch( al ) {
				case 1:
					msg = "Frutos Secos";
					break;
				
				case 2:
					msg = "Legumbres";
					break;
					
				case 3:
					msg = "Lactosa o Caseina";
					break;
					
				case 4:
					msg = "Gluten";
					break;
					
				case 5:
					msg = "Huevo";
					break;
					
				case 6:
					msg = "Marisco o Pescado";
			}
			
			if( !alertas.includes(msg) )
				alertas.push(msg);
		}
		
		if( ing.cantidad !== undefined ) {
			total += parseInt(ing.cantidad);
			
			
			if( ing.macronutrientes.carbohidratos.azucares !== undefined )
				azucar += ing.macronutrientes.carbohidratos.azucares * ing.cantidad/100;
			
			if( ing.micronutrientes !== undefined )
				if( ing.micronutrientes.sodio !== undefined )
					sodio += ing.micronutrientes.sodio * ing.cantidad/100;
			
			protein += ing.macronutrientes.proteinas.total * ing.cantidad/100;
			ch += ing.macronutrientes.carbohidratos.total * ing.cantidad/100;
			fat += ing.macronutrientes.grasas.total * ing.cantidad/100;
			saturada += ing.macronutrientes.grasas["grasas saturadas"] * ing.cantidad/100;
		}
	}
	
	if( recipeDehydratedWeight !== undefined )
		total = recipeDehydratedWeight;
	if( total === 0 ) return;
   
	protein = Math.round(protein/total * 1000)*1/10;
	fat = Math.round(fat/total * 1000)*1/10;
	ch = Math.round(ch/total * 1000)*1/10;
	saturada = Math.round(saturada/total * 1000)*1/10;
	sodio = Math.round(sodio/total * 1000)*1/10;
	azucar = Math.round(azucar/total * 1000)*1/10;
   
	let energy = protein * 4 + ch * 4 + fat * 9; 
	energy = Math.round(energy * 1000) / 1000;
	
	let sellos = $("#sellos img").css("display", "none");
	if( energy > 275 )
			$("#s-cal").css("display", "block");
	if( saturada > 4 )
			$("#s-fat").css("display", "block");
	if( azucar > 10 )
			$("#s-sug").css("display", "block");
	if( sodio > 400 )
			$("#s-sod").css("display", "block");
	
	let alerta = "";
	if( alertas.length > 0 ) {
		
		alerta = "Contiene";
		for(let i=0; i < alertas.length; i++) {
			if( i === alertas.length - 2 ) {
				alerta += " "+alertas[i]+" y";
			}else {
				alerta += " "+alertas[i]+",";
			}
		}
		
		alerta = alerta.slice(0, alerta.length-1);
	}
	
	$("#alertas div").html(alerta);
	
	$("#recipe-energy").html(energy+" Kcal");
	$("#recipe-protein").html(protein+" g");
	$("#recipe-fat").html(fat+" g");
	$("#recipe-ch").html(ch+" g");
}

function addIngredientSearch() {
   let ingredientSearch = document.createElement("div");
   ingredientSearch.className = "ingredient-search";
   
   let ingredientQR = document.createElement("div");
   ingredientQR.className = "ingredient-query-result";
   
   let ingredientQuery = document.createElement("input");
   ingredientQuery.className = "ingredient-query";
   ingredientQuery.type = "text";
   ingredientQuery.addEventListener("keyup", search);
   ingredientQuery.setAttribute("placeholder", "Buscar Ingrediente...");
   
   let searchResults = document.createElement("div");
   searchResults.className = "search-results";
   searchResults.style.display = "none";
   
   ingredientQR.appendChild(ingredientQuery);
   ingredientQR.appendChild(searchResults);
   
   let ingredientQuantity = document.createElement("input");
   ingredientQuantity.className = "ingredient-quant";
   ingredientQuantity.type = "number";
   ingredientQuantity.addEventListener("keyup", updateQuantity);
   ingredientQuantity.addEventListener("change", updateQuantity);
   ingredientQuantity.setAttribute("placeholder", "Cantidad");
   ingredientQuantity.setAttribute("min", "0");
   ingredientQuantity.setAttribute("max", "100000");
   
   let buttonDone = document.createElement("div");
   buttonDone.className = "btn-done fas fa-check";
   buttonDone.addEventListener("click", ()=>{doneIngredient(ingredientSearch)});
   
   let buttonDelete = document.createElement("div");
   buttonDelete.className = "btn-delete fas fa-times";
   buttonDelete.addEventListener("click", ()=>{removeIngredient(ingredientSearch)});
   
   ingredientSearch.appendChild(ingredientQR);
   ingredientSearch.appendChild(ingredientQuantity);
   ingredientSearch.appendChild(buttonDone);
   ingredientSearch.appendChild(buttonDelete);
   
   let btnAdd = $("#ingredient-add")[0];
   let ingredientsList = $("#ingredients-list")[0];
   ingredientsList.insertBefore(ingredientSearch, btnAdd);
   
   return ingredientSearch;
}

function removeIngredient(element) {
	let ingredientsList = $("#ingredients-list")[0];
	let childIndex = getChildIndex(element);
	let ingredient = recipeIngredients[childIndex];
	
	let filter = function(ing) {
		return ing !== ingredient;
	}

	if( ingredient !== undefined )
		recipeIngredients = recipeIngredients.filter(filter);
	
	if( changes !== undefined ) {
		let found = false;
		if( changes.modificarIngredientes !== undefined ) {
			
			for(let i=0; i < changes.modificarIngredientes.length; i++) {
				
				if( ingredient.id === changes.modificarIngredientes[i].id ) {
					delete changes.modificarIngredientes[i];
					
					let toMod = changes.modificarIngredientes;
					let filter = (v)=>{return v !== undefined};
					changes.modificarIngredientes = toMod.filter(filter);
					
					if( changes.modificarIngredientes.length === 0 )
						delete changes.modificarIngredientes;
					break;
				}
				
			}
			
		}
		
		if( changes.agregarIngredientes !== undefined ) {
			
			for(let i=0; i < changes.agregarIngredientes.length; i++) {
				
				if( ingredient.id === changes.agregarIngredientes[i].id ) {
					delete changes.agregarIngredientes[i];
					
					let toAdd = changes.agregarIngredientes;
					let filter = (v)=>{return v !== undefined};
					changes.agregarIngredientes = toAdd.filter(filter);
					
					if( changes.agregarIngredientes.length === 0 )
						delete changes.agregarIngredientes;
					
					found = true;
					break;
				}
				
			}
			
		}
		
		if( !found ) {
			if( changes.eliminarIngredientes === undefined )
				changes.eliminarIngredientes = [];
			changes.eliminarIngredientes.push(ingredient);
		}
	}
	
	ingredientsList.removeChild(element);
	
	updateQuantity(null);
}

function createDoneIngredient(childIndex) {
	
   let ing = recipeIngredients[childIndex];
   
   let ingDone = document.createElement("div");
   ingDone.className = "ingredient-done";
   
   let ingDesc = document.createElement("div");
   ingDesc.className = "ingredient-desc";
   
   let ingName = document.createElement("div");
   ingName.className = "ingredient-name";
   ingName.innerText = ing.nombre;
   
   let ingBrand = document.createElement("div");
   ingBrand.className = "ingredient-brand";
   ingBrand.innerText = ing.marca;
   
   ingDesc.appendChild(ingName);
   ingDesc.appendChild(ingBrand);
   
   let ingQuant = document.createElement("div");
   ingQuant.className = "ingredient-quant";
   ingQuant.innerText = ing.cantidad+"g";
   
   let btnEdit = document.createElement("div");
   btnEdit.className = "btn-edit fas fa-edit";
   btnEdit.addEventListener("click", ()=>{editIngredient(ingDone)});
   ingDone.appendChild(ingDesc);
   ingDone.appendChild(ingQuant);
   ingDone.appendChild(btnEdit);
   
   return ingDone;
}

function doneIngredient(element) {
   let childIndex = getChildIndex(element);
   if( recipeIngredients[childIndex] === undefined ) return;
   
   let ing = recipeIngredients[childIndex];
   let ingDone = createDoneIngredient(childIndex);
   
   if( ing.cantidad === undefined ) {
      let quantEl = element.querySelector(".ingredient-quant");
      ing.cantidad = parseInt(quantEl.value);
   }
   
   let next = element.nextElementSibling;
   let parent = element.parentElement;
   
   parent.removeChild(element);
   parent.insertBefore(ingDone, next);
}

function editIngredient(element) {
   
   let childIndex = getChildIndex(element);
   if( recipeIngredients[childIndex] === undefined ) return;
   
   let ing = recipeIngredients[childIndex];
   
   let parent = element.parentElement;
   let next = element.nextElementSibling;
   let edit = addIngredientSearch();
   let ingredientQuery = edit.querySelector(".ingredient-query");
   let ingredientQuantity = edit.querySelector(".ingredient-quant");
   
   parent.insertBefore(edit, next);
   parent.removeChild(element);
   
   ingredientQuery.value = ing.nombre+" "+ing.marca;
   ingredientQuantity.value = ing.cantidad;
   
}

function getChildIndex(child) {
    let parent = child.parentElement;
   
    let childIndex;
    for(childIndex = 0; childIndex < parent.children.length; childIndex++)
		if( parent.children[childIndex] === child ) break;
   
    return childIndex;
}

function search(e) {
	let el = e.target;
    let child = el;
    while( child.className !== "ingredient-search" )
		child = child.parentElement;
   
    let query = el.value;
    let results = child.querySelector(".search-results");
   
    if( query === "" ) { 
		results.setAttribute("style", "display:none");
		return;
    }
   
    let callback = (xhr, s) => {
	   
	    if( xhr.status == 200 ) {
			let matches = [];
		   
		    try {
				matches = JSON.parse(xhr.responseText);
		    } catch (e) {
				console.warn(e);
		    }
		    
			let childIndex = getChildIndex(child);
			
			$(results).children().remove();
   
			if( results.hasAttribute("style") )
				results.removeAttribute("style");
		   
			let selectIngredient = function(ingredient) {
				results.style.display = "none";
				el.value = ingredient.nombre +" "+ ingredient.marca;
			  
				if( recipeIngredients[childIndex] !== undefined ) {
					recipeIngredients[childIndex] = ingredient;
				} else {
					recipeIngredients.push(ingredient);
				}
				
				if( changes !== undefined ) {
					
					let found = false;
					if( changes.eliminarIngredientes !== undefined ) {
						
						for(let i=0; i < changes.eliminarIngredientes.length; i++) {
							
							if( ingredient.id === changes.eliminarIngredientes[i].id ) {
								delete changes.eliminarIngredientes[i];
								
								let toDelete = changes.eliminarIngredientes;
								let filter = (v)=>{return v !== undefined};
								
								changes.eliminarIngredientes = toDelete.filter(filter);
								if( changes.eliminarIngredientes.length === 0 )
									delete changes.eliminarIngredientes;
								
								found = true;
								break;
							}
							
						}
						
					}
					
					if( !found ) {
						if( changes.agregarIngredientes === undefined )
							changes.agregarIngredientes = [];
						changes.agregarIngredientes.push(ingredient);
					}
					
				}
				
		    }
			
			for(let i=0; i < recipeIngredients.length; i++) {
				for(let k=0; k < matches.length; k++) {
					
					if( matches[k] !== undefined ) { 
						if( recipeIngredients[i].id === matches[k].id ) {
							delete matches[k];
						}
					}
					
				}
			}
			
			matches = matches.filter((v)=>{return v!==undefined});
			
		    for(let i=0; i < matches.length; i++) {
				let ing = matches[i];

				let parent = document.createElement("div");
				parent.className = "search-result";
				parent.addEventListener("click", ()=>{ selectIngredient(ing) });

				let name = document.createElement("div");
				name.className = "result-name";
				name.innerText = ing.nombre;

				let brand = document.createElement("div");
				brand.className = "result-brand";
				brand.innerText = ing.marca;

				let cat = document.createElement("div");
				cat.className = "result-cat";
				cat.innerText = ing.categoria;

				parent.appendChild(name);
				parent.appendChild(brand);
				parent.appendChild(cat);

				results.appendChild(parent);
			}
		   
	    }
    }
   
    let ajax = 
    {
		url: "index.php?buscar="+query,
		type: "GET",
		complete: callback
    }
    
    $.ajax(ajax);
}

function saveFile() {
	
	let nutrientes = { };
	let totalw = 0;
	
	for(let i=0; i < recipeIngredients.length; i++) {
		
		let ing = recipeIngredients[i];
		totalw += parseFloat(ing.cantidad);
		
		for( nutrient in ing.macronutrientes ) {
			
			for( subnutrient in ing.macronutrientes[nutrient] ) {
				
				let subquant = ing.macronutrientes[nutrient][subnutrient];
				
				if( subnutrient === "total" ){
					if( nutrientes[nutrient] === undefined )
						nutrientes[nutrient] = 0;
					
					nutrientes[nutrient] += subquant/100 * ing.cantidad;
					
				} else {
					
					if( nutrientes[subnutrient] === undefined )
						nutrientes[subnutrient] = 0;
					
					nutrientes[subnutrient] += subquant/100 * ing.cantidad;
				}
				
			}
			
		}
		
		for( nutrient in ing.micronutrientes ) {
			
			if( nutrientes[nutrient] === undefined )
					nutrientes[nutrient] = 0;
				
			nutrientes[nutrient] += ing.micronutrientes[nutrient]/100 * ing.cantidad;
		}
		
	}
	
	let rows = 1;
	for( row in nutrientes ) {
		nutrientes[row] = nutrientes[row]/totalw * 100;
		rows++;
	}
	
	let energia = nutrientes.proteinas * 4 + nutrientes.grasas * 9 + nutrientes.carbohidratos * 4;
	energia = Math.round(energia*1000)/1000;
	
	let canvas = document.createElement("canvas");
	let ctx = canvas.getContext("2d");
	
	let rowFontHeight = 16;
	let rowMargin = 4;
	let rowHeight = rowFontHeight + 2*rowMargin;
	let sideMargin = 10;
	let sello = 100
	
	canvas.width = 600;
	canvas.height = 60 + rows*rowHeight + 20 + sello + 10;
	
	ctx.fillStyle = "#FFFF";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	ctx.font = "20px Monty";
	ctx.strokeText("Informacion Nutricional", sideMargin, 40, canvas.width-2*sideMargin);
	
	ctx.fillStyle = "#AAA";
	ctx.fillRect(sideMargin, 50, canvas.width-2*sideMargin, 8);
	
	let rowpos = 60;
	ctx.font = rowFontHeight+"px Monty";
	ctx.strokeText("Energia", sideMargin, rowpos+rowMargin+rowFontHeight, canvas.width-2*sideMargin);
	ctx.strokeText(energia+" Kcal", canvas.width-sideMargin-ctx.measureText(energia+" Kcal").width, rowpos+rowMargin+rowFontHeight);
	
	rowpos += rowHeight;
	
	for( nutrient in nutrientes ) {
		
		let q = Math.round(nutrientes[nutrient]*1000)/1000;
		let text = q +" g";
		if( nutrient === "sodio" ) text = q + " mg";
		let qWidth = ctx.measureText(text).width;
		
		nutrient = nutrient[0].toUpperCase() + nutrient.slice(1, nutrient.length);
		ctx.strokeText(nutrient, sideMargin, rowpos+rowMargin+rowFontHeight);
		ctx.strokeText(text, canvas.width-sideMargin-qWidth, rowpos+rowMargin+rowFontHeight);
		rowpos += rowHeight;
		
	}
	
	rowpos += 20;
	
	let sellos = $("#sellos img");
	let xpos = 10;
	
	for(let i=0; i < sellos.length; i++) {
		if( sellos[i].style.display === "block" ) {
			ctx.drawImage(sellos[i], xpos, rowpos, sello, sello);
			xpos += sello + 10;
		}
	}
	
	let el = document.createElement("a");
	el.href = canvas.toDataURL();
	el.download = "informacion nutricional.png";
	el.click();
}