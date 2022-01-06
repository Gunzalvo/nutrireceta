function start() {
   $("#btn-send").on("click", login);
   $(".opt-btn").click(btnClick);
   $(".navbtn").click(btnClick);
}

function btnClick(e) {
	let id = e.target.id;
	let match = id.match(/user-(\d){1,4}/);
	
	if ( id === "btn-login" ) {
		showDialog();
	} else if ( id === "btn-calc")	{
		location.assign("/nutrireceta/");
	} else if ( id === "btn-register") {
		register();
	}
	
} 

function register() {
	let name_input = $("input[name=nombre]")[0];
	let correo_input = $("input[name=email]")[0];
	let pw1_input = $("input[name=password1]")[0];
	let pw2_input = $("input[name=password2]")[0];
	
	let name = name_input.value;
	let email = correo_input.value;
	let pw1 = pw1_input.value;
	let pw2 = pw2_input.value;
	
	let valid = true;
	
	if( pw1 !== pw2 ) valid = false;
	if( email.length < 5 ) valid = false;
	if( pw1.length < 8 ) valid = false;
	
	
	if( valid ) {
		let callback = (xhr, s) => {
			
			if( xhr.status === 200 ) {
				name_input.value = "";
				correo_input.value = "";
				pw1_input.value = "";
				pw2_input.value = "";
			}
			
		}
		
		let user = {
			nombre: name,
			correo: email,
			password: pw1 
		}
		
		let ajax = {
			url: "index.php?registrar&ingresar",
			data: user,
			type: "POST",
			complete: callback
		}
		
		$.ajax(ajax);
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
					location.assign("/nutrireceta/");
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







