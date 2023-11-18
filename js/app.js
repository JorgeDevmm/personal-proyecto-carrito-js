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
    // aplicamos traversing del DOM para obtener elemento del padre
    const cursoSeleccionado = e.target.parentElement.parentElement;

    leerDatosCurso(cursoSeleccionado);
  }
}

// Leer el contenido del HTML al que le dios click y extrae la información del curso
function leerDatosCurso(cursoSeleccionado) {
  // console.log(cursoSeleccionado);

  // Crear un objeto con el contenido del curso actual
  const infoCurso = {
    imagen: cursoSeleccionado.querySelector('img').src,
    titulo: cursoSeleccionado.querySelector('h4').textContent,
    precio: cursoSeleccionado.querySelector('.precio span').textContent,
    id: cursoSeleccionado.querySelector('a').getAttribute('data-id'),
    cantidad: 1
  };

  console.table(infoCurso);
}
