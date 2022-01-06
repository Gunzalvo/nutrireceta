function start() {
   $(".navbtn").click(btnClick);
   $(".recipe-delete").click(deleteRecipe);
   $(".recipe").click(goToRecipe);
}

function btnClick(e) {
	let id = e.target.id;
	
	if ( id === "btn-calc")	{
		location.assign("/nutrireceta/");
	} else if ( id === "btn-logout") {
		navigator.sendBeacon("index.php?login&logout");
		setTimeout(()=>location.assign("/nutrireceta/"), 500);
	}
	
}

function deleteRecipe(e) {
	e.stopPropagation();
	
	let parent = e.target;
	while( parent.className !== "recipe" )
		parent = parent.parentElement;
	
	let match = parent.id.match(/receta-(\d+)/);
	if( match != null ) {
		
		let callback = (xhr,s)=>{ 
		
			if( xhr.status === 200 ) {
				let recipeList = parent.parentElement;
				recipeList.removeChild(parent);
				
				if( recipeList.childElementCount == 0 ) {
					let sadDiv = document.createElement("div");
					sadDiv.style.padding = "4em";
					sadDiv.innerHTML = "Ya no quedan más recetas :(";
					recipeList.appendChild(sadDiv);
				}
			}
		
		}
		
		$.ajax({url:"index.php?receta="+match[1]+"&borrar", type: "GET", complete: callback});
	}
}

function goToRecipe(e) {
	let parent = e.target;
	
	while( parent.className !== "recipe" )
		parent = parent.parentElement;
	
	let match = parent.id.match(/receta-(\d+)/);
	if( match != null )
		location.assign("index.php?recipe="+match[1]);
	
}