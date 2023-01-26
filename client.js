
var productosCliente = [];
var carritoList = [];


document.addEventListener('DOMContentLoaded',()=> {
    homeController()
    imprimirTablaCliente()
})

const homeController = async () => {
    const response = await fetch('/productos.json')
    const data =  await response.json()
    console.log(data)
    productosCliente= data
}


document.querySelector('#btnSubmitC').addEventListener('click', comprarProds);
document.querySelector('#btnactualizarC').addEventListener('click', imprimirTablaCliente);
document.querySelector('#realCompra').addEventListener('click', concretarCompra);


function concretarCompra()
{   
    
        var sumatotal = 0;
        for(p of carritoList){
            sumatotal = sumatotal + p.stock * p.precio;
        }
        
        window.alert(`El precio final es de $ ${sumatotal}`);


}

function imprimirTablaCliente() {

    tbody = document.querySelector('#tablaProdsC tbody');

    tbody.innerHTML = '';

    for (var i = 0; i < productosCliente.length; i++) {
        var row = tbody.insertRow(i),
            IDCelda = row.insertCell(0),
            NameCelda = row.insertCell(1);
            precioCelda = row.insertCell(2);
            stockSelda = row.insertCell(3);
        
            IDCelda.innerHTML = Number(productosCliente[i].ID);
            NameCelda.innerHTML = productosCliente[i].prod;
            precioCelda.innerHTML = Number(productosCliente[i].precio);
            stockSelda.innerHTML = Number(productosCliente[i].stock);

        tbody.appendChild(row);
    }
    tbodyCa = document.querySelector('#carrito tbody');

    tbodyCa.innerHTML = '';

    for (var i = 0; i < carritoList.length; i++) {
        var row = tbodyCa.insertRow(i),
            IDCelda = row.insertCell(0),
            NameCelda = row.insertCell(1),
            precioCelda = row.insertCell(2),
            stockSelda = row.insertCell(3),
            subtotalCelda = row.insertCell(4);
        
            IDCelda.innerHTML = Number(carritoList[i].ID);
            NameCelda.innerHTML = carritoList[i].prod;
            precioCelda.innerHTML = Number(carritoList[i].precio);
            stockSelda.innerHTML = Number(carritoList[i].stock);
            subtotalCelda.innerHTML = Number(carritoList[i].stock)*Number(Number(carritoList[i].precio));

            tbodyCa.appendChild(row);
    }
    

}

function comprarProds()
{

  
    var IDprod = Number(document.querySelector('#IDprodC').value),
    stock = Number(document.querySelector('#stockC').value);
    
    if (isNaN(stock) || stock <1){
        window.alert("Ingrese un numero valido en cantidad de stock");
    }else{
        comprar(IDprod, stock);
        imprimirTablaCliente();
        
    }

}

function comprar(id,stock)
{   
    var index = traerProducto(id);
    if (index <0 ){
        window.alert(`No hay producto con el id ${id}`);
    }else
    {

        if (stock > productosCliente[index].stock){
            
            window.alert(`No hay suficiente stock del producto ${productosCliente[index].prod}`);
        }else{
            pasarACarrito(index,id,stock);
            console.log(carritoList)
        }
    }
}

function traerProducto(id){
      
var indexProd =  -1
var i = 0
for (e of productosCliente){

    if (e.ID == id) {
        indexProd = i
    }
    i++
}
return indexProd;

}

function pasarACarrito(indexProds,id,stock){

var indexCarrito = encontrarEncarrito(id) 

if (indexCarrito >=0) 
{
    sumarProdACarr(indexCarrito,stock);
    
}else
{
    agregarProdACarr(indexProds,stock);
    
}
    sacarProds(indexProds,stock)
}

function  sumarProdACarr(indexCarrito,stock){
 carritoList[indexCarrito].stock = carritoList[indexCarrito].stock +stock ;

}

function sacarProds(indexProds,stock)
{ 
    productosCliente[indexProds].stock = productosCliente[indexProds].stock - stock ;
}

function agregarProdACarr(indexProds,stock)
{
    
    var nuevoProd = {
        ID: productosCliente[indexProds].ID,
        prod: productosCliente[indexProds].prod,
        precio: productosCliente[indexProds].precio ,
        stock : stock
    };
    carritoList.push(nuevoProd)
}

function encontrarEncarrito(id)
{
    var indexProd =  -1
var i = 0
for (e of carritoList){

    if (e.ID == id) {
        indexProd = i
    }
    i++
}
return indexProd;
}