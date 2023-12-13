// variables
// carrito menu
const carrito = document.querySelector('#carrito');

// contenedor de carrito donde aparecera
const contenedorCarrito = document.querySelector('#lista-carrito tbody');

// boton que limpia carrito
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');

// contenedor de lista de productos
const listaproductos = document.querySelector('#lista-productos');

let articulosCarrito = [];

cargarEventListeners();

// Registrar todos mi eventos
function cargarEventListeners() {
  // Muestra los productos de LocalStorage
  document.addEventListener('DOMContentLoaded', leerDatosCarrito);

  // Cuando agregas un producto presionadno "Agregar al carrito"
  listaproductos.addEventListener('click', agregarproducto);

  // Elimina productos del carrito
  carrito.addEventListener('click', eliminarproducto);

  // Vaciar el carrito
  vaciarCarritoBtn.addEventListener('click', () => {
    articulosCarrito = []; // reseteamos el arreglo

    limpiarHtml(); //eliminamos todo html
  });
}

// Funciones

// muestra los elementos del carrito si existiera
function leerDatosCarrito() {
  // devuelve el string y convertirlo a un estrucutura o un arreglo vacio
  articulosCarrito = JSON.parse(localStorage.getItem('articulosCarrito')) || [];

  carritoHtml();
}

function agregarproducto(e) {
  e.preventDefault();
  // valida si donde presiono contiene la clase agregar-carrito
  if (e.target.classList.contains('agregar-carrito')) {
    // aplicamos traversing del DOM para obtener elemento del padre
    const productoSeleccionado = e.target.parentElement.parentElement;

    leerDatosproducto(productoSeleccionado);
  }
}

// Eliminar producto del carrito
function eliminarproducto(e) {
  console.log(e.id);
  // verificamos si se encuentra la clase donde presionamos
  if (e.target.classList.contains('borrar-producto')) {
    // guardamos el id de producto a eliminar
    const productoId = e.target.getAttribute('data-id');

    // guardamos en un nuevo array el los elementos diferente al id eliminado
    // articulosCarrito = articulosCarrito.filter((producto) => producto.id != productoId);

    // Buscar el índice del producto en el array
    const index = articulosCarrito.findIndex((producto) => producto.id === productoId);

    // Verificar si el producto existe en el carrito
    if (index !== -1) {
      // Si la cantidad es mayor a 1, simplemente disminuir la cantidad
      if (articulosCarrito[index].cantidad > 1) {
        articulosCarrito[index].cantidad -= 1;
      } else {
        // Si la cantidad es 1, eliminar el producto del array
        articulosCarrito.splice(index, 1);
      }

      // volvemos a generar html
      carritoHtml();
    }
  }
}

// Leer el contenido del HTML al que le da click y extrae la información del producto
function leerDatosproducto(productoSeleccionado) {
  // console.log(productoSeleccionado);

  // Crear un objeto con el contenido del producto actual
  const infoproducto = {
    imagen: productoSeleccionado.querySelector('img').src,
    titulo: productoSeleccionado.querySelector('h4').textContent,
    precio: productoSeleccionado.querySelector('.precio span').textContent,
    id: productoSeleccionado.querySelector('a').getAttribute('data-id'),
    cantidad: 1,
  };

  // Revisa si un elemento ya existe en el carrito
  const existe = articulosCarrito.some((producto) => producto.id === infoproducto.id);

  if (existe) {
    // Actualizamos cantidad, en nuevo arreglo
    const productos = articulosCarrito.map((producto) => {
      if (producto.id === infoproducto.id) {
        producto.cantidad++;
        return producto; //retorna el objeto actualizado
      } else {
        return producto; //retorna los objetos que no son duplicados
      }
    });

    articulosCarrito = [...productos];
  } else {
    // Agrega elementos al arreglo de carrito,sin perder la referencia de productos agregados
    articulosCarrito = [...articulosCarrito, infoproducto];
  }

  carritoHtml();
}

// Muestra el carrito de compras en el HTML
function carritoHtml() {
  // Limpiar el HTML
  limpiarHtml();

  // recorrer el arreglo de carrito y por cada producto mostrarlos en HTML
  articulosCarrito.forEach((producto) => {
    const {} = producto;

    // Crear filas
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><img src="${producto.imagen}" width="100"></td>
      <td>${producto.titulo}</td>
      <td>${producto.precio}</td>
      <td>${producto.cantidad}</td>
      <td><a href="#" class="borrar-producto" data-id="${producto.id}"> x </a> </td>
    `;

    // Agregar el HTML al carrito en tbody
    contenedorCarrito.appendChild(row);
  });

  // sincronizar con localStorage
  sincronizarLocalStorage();
}

// Eliminar los productos del tbody
function limpiarHtml() {
  // forma lenta
  // contenedorCarrito.innerHTML = '';

  // si contenedor tiene al menos un elemento
  while (contenedorCarrito.firstChild) {
    // eliminar un hijo por el primero
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}

function sincronizarLocalStorage() {
  localStorage.setItem('articulosCarrito', JSON.stringify(articulosCarrito));
}
