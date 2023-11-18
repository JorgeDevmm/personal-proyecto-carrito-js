// variables
// carrito menu
const carrito = document.querySelector('#carrito');

// contenedor de carrito donde aparecera
const contenedorCarrito = document.querySelector('#lista-carrito tbody');

// boton que limpia carrito
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');

// contenedor de lista de cursos
const listaCursos = document.querySelector('#lista-cursos');

cargarEventListeners();

// Registrar todos mi eventos
function cargarEventListeners() {
  // Cuando agregas un curso presionadno "Agregar al carrito"
  listaCursos.addEventListener('click', agregarCurso);
}

// Funciones

function agregarCurso(e) {
  e.preventDefault();
  // valida si donde presiono contiene la clase agregar-carrito
  if (e.target.classList.contains('agregar-carrito')) {
    console.log(e.target);
  }
}
