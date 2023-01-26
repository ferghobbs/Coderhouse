
let productos = [];
let nameUsuario = localStorage.getItem("Name_Usuario")
if (nameUsuario) {
  document.getElementById('Name_Input').value = nameUsuario;
}

document.getElementById('Name_Input').addEventListener('change', (event) => {
  if (event.target.value){
    localStorage.setItem("Name_Usuario",event.target.value)
  
  }
  });

function getVal() {
    let val = parseInt(document.getElementById('Number_Input').value);
    if (isNaN(val)){
        window.alert("You must enter a number");
    }else{
    productos.push(val);
    document.getElementById('Number_Input').focus()
    agregarProducto(document.getElementById('Prod_Input').value,val)
    document.getElementById('Number_Input').value = "";
    document.getElementById('Prod_Input').value = "";
    
    }

}

  function Calculate(){
    console.log(productos);
    let aux = 0;
    for (pr of productos) {
        aux = aux + pr;
        console.log(pr)
    }
    if (aux>0) {
        
        window.alert("El total a pagar es: "+ aux);

    } else {
        
        window.alert("No ingreso ningun producto");
    }
    productos = [];
    removeAllChildNodes(document.getElementById('Respuesta'));
  }

  let input = document.getElementById("Number_Input");

// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("Bttn_Calc").click();
  }
});

function agregarProducto(prod,price) {
  let li = document.createElement('li');
  let ul = document.getElementById('Respuesta');
  li.innerHTML=li.innerHTML + "Producto: " + prod + " Por: $" + price;
  ul.appendChild(li);

}


function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}


const lista = document.querySelector('#listado')

