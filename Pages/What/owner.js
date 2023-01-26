
var productos = [];

document.addEventListener('DOMContentLoaded',()=> {
    homeController()
    imprimirTabla()
})

const homeController = async () => {
    const response = await fetch('/productos.json')
    const data =  await response.json()
    console.log(data)
    productos= data
}


console.log(productos)


function agregarALista(ID, nombre, precio, stock) {
    
var indexProd =  -1
var i = 0
for (e of productos){
    console.log(`El nombre es ${e.ID} y el otro ${ID}`)
    if (e.ID == ID) {
        console.log("son iguales")
        indexProd = i
    }
    i++
}


console.log(indexProd)
console.log(productos)

indexProd>=0 ? sumarProd(indexProd,ID, nombre, precio, stock) : agregarProd(ID, nombre, precio, stock)  
   

}

function sumarProd(indexProd,ID, nombre, precio, stock) {

    if (nombre == productos[indexProd].prod || nombre == "" ){
        if(precio>0){
            productos[indexProd].precio = precio  
            window.alert("Se actualizo el prtecio");
        } 
        productos[indexProd].stock = productos[indexProd].stock + stock  

    }else{
        window.alert("El nobmre y el ID no coinciden");
    }


}

function agregarProd(ID, nombre, precio, stock) {

    var nuevoProd = {
        ID: ID,
        prod: nombre,
        precio: precio ,
        stock : stock
    };
    productos.push(nuevoProd)
}


function obtenerListaProds() {
    return productos;
}

document.querySelector('#btnSubmit').addEventListener('click', guardarDatos);
document.querySelector('#btnactualizar').addEventListener('click', imprimirTabla);


function guardarDatos() {
    var IDprod = Number(document.querySelector('#IDprod').value),
    NombreProd = document.querySelector('#NombreProd').value,
    precio = Number(document.querySelector('#precio').value),
    stock = Number(document.querySelector('#stock').value);
    
    agregarALista(IDprod, NombreProd, precio, stock);
    imprimirTabla();
}

function imprimirTabla() {

    tbody = document.querySelector('#tablaProds tbody');

    tbody.innerHTML = '';

    for (var i = 0; i < productos.length; i++) {
        var row = tbody.insertRow(i),
            IDCelda = row.insertCell(0),
            NameCelda = row.insertCell(1);
            precioCelda = row.insertCell(2);
            stockSelda = row.insertCell(3);
        
            IDCelda.innerHTML = Number(productos[i].ID);
            NameCelda.innerHTML = productos[i].prod;
            precioCelda.innerHTML = Number(productos[i].precio);
            stockSelda.innerHTML = Number(productos[i].stock);

        tbody.appendChild(row);
    }
    

  fs.writeFile('/productos.json', JSON.stringify(productos), (err) => {
    if (err) {
        throw err;
    }
    console.log("Se guardaron los productos.");
});
}


document.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("btnSubmit").click();
    }
  });


