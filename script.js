const productos = [
    {
        nombre: "iphone16",
        precio: 6000000,
        categoria: "tecnologia",
        activo: true
    },
    {
        nombre: "nike air force one",
        precio: 300000,
        categoria: "moda",
        activo: true
    },
    {
        nombre: "balon adidas mundial 2026",
        precio: 200000,
        categoria: "deportes",
        activo: false
    },
    {
        nombre: "televisor",
        precio: 900000,
        categoria: "tecnologia",
        activo: true
    },
    {
        nombre: "macbook",
        precio: 3000000,
        categoria: "tecnologia",
        activo: true
    },
    {
        nombre: "Balon baloncesto Nike",
        precio: 150000,
        categoria: "deportes",
        activo: true
    },
    {
        nombre: "adidas Superstar",
        precio: 500000,
        categoria: "moda",
        activo: true
    },
    {
        nombre: "playstation 5",
        precio: 2000000,
        categoria: "tecnologia",
        activo: true
    }
];
const nombres = productos.map(({ nombre }) => nombre);//se utiliza para mostrar el nombre de los productos
const productostecnologia = productos.filter(({categoria}) => categoria === "tecnologia")//se utiliza para filtrar por categoria
const productosordenados = [...productos].sort( //se utiliza para ordenar los productos segun su precio
    (a,b)=>a.precio-b.precio //compara a y b y dependiendo el resultado decide cual va primero
)
const total = productos.reduce((acumulador,producto) =>{
    return acumulador + producto.precio
}, 0)//se usa para calcular el valor total de los productos
const contenedor = document.querySelector("#productos") //busca en el html el elemento que tiene id="productos" y lo guarda en la variable contenedor
contenedor.innerHTML=productos.map((producto)=>`
<div class="producto" data-nombre="${producto.nombre}">
    <h2>${producto.nombre}</h2>
    <p>${producto.precio}</p>
    <p>${producto.categoria}</p>
    <p>${producto.activo}</p>
    <button class="btn-eliminar">Eliminar</button>
</div>
`)//modifica elementos html dentro del css
const filtros = document.querySelector("#filtrocategoria");
filtros.addEventListener("change", () => {
    const categoria = filtros.value;
    let productosFiltrados;
    if (categoria === "todos") {
        productosFiltrados = productos;
    } else {
        productosFiltrados = productos.filter(
            (producto) => producto.categoria === categoria
        );
    }
    contenedor.innerHTML = "";
    productosFiltrados.map((producto) => {
        contenedor.innerHTML += `
            <div class="producto" data-nombre="${producto.nombre}">
                <h2>${producto.nombre}</h2>
                <p>Precio: ${producto.precio}</p>
                <p>Categoría: ${producto.categoria}</p>
                <p>Activo: ${producto.activo}</p>
                <button class="btn-eliminar">Eliminar</button>
            </div>
        `;
    });
});
const ordenPrecio = document.querySelector("#ordenprecio");
ordenPrecio.addEventListener("change", () => {
    const orden = ordenPrecio.value;
    if (orden === "menor") {
        const productosOrdenados = [...productos].sort(
            (a, b) => a.precio - b.precio
        );
        contenedor.innerHTML = "";
        productosOrdenados.map((producto) => {
            contenedor.innerHTML += `
                <div class="producto" data-nombre="${producto.nombre}">
                    <h2>${producto.nombre}</h2>
                    <p>Precio: ${producto.precio}</p>
                    <p>Categoría: ${producto.categoria}</p>
                    <p>Activo: ${producto.activo}</p>
                    <button class="btn-eliminar">Eliminar</button>
                </div>
            `;
        });
    }
    else if (orden === "mayor") {
        const productosOrdenados = [...productos].sort(
            (a, b) => b.precio - a.precio
        );
        contenedor.innerHTML = "";
        productosOrdenados.map((producto) => {
            contenedor.innerHTML += `
                <div class="producto" data-nombre="${producto.nombre}">
                    <h2>${producto.nombre}</h2>
                    <p>Precio: ${producto.precio}</p>
                    <p>Categoría: ${producto.categoria}</p>
                    <p>Activo: ${producto.activo}</p>
                    <button class="btn-eliminar">Eliminar</button>
                </div>
            `;
        });
    }
});
contenedor.addEventListener("click", (event) => {
    const botonEliminar = event.target.closest(".btn-eliminar");
    if (!botonEliminar) {
        return;
    }
    const productoHTML = botonEliminar.closest(".producto");
    const nombreProducto = productoHTML.dataset.nombre;
    const posicion = productos.findIndex(
        ({ nombre }) => nombre === nombreProducto
    );
    productos.splice(posicion, 1);
    contenedor.innerHTML = "";
    productos.map((producto) => {
        contenedor.innerHTML += `
            <div class="producto" data-nombre="${producto.nombre}">
                <h2>${producto.nombre}</h2>
                <p>Precio: ${producto.precio}</p>
                <p>Categoría: ${producto.categoria}</p>
                <p>Activo: ${producto.activo}</p>
                <button class="btn-eliminar">Eliminar</button>
            </div>
        `;
    });
});