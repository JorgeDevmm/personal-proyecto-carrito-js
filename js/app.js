// variables
// carrito menu
const carrito = document.querySelector('#carrito');

// contenedor de carrito donde aparecera
const contenedorCarrito = document.querySelector('#lista-carrito tbody');

// boton que limpia carrito
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');

// contenedor de lista de cursos
const listaCursos = document.querySelector('#lista-cursos');

let articulosCarrito = [];

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
    cantidad: 1,
  };

  // Revisa si un elemento ya existe en el carrito
  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);

  if (existe) {
    // Actualizamos cantidad, en nuevo arreglo
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso; //retorna el objeto actualizado
      } else {
        return curso; //retorna los objetos que no son duplicados
      }
    });

    articulosCarrito = [...cursos];
  } else {
    // Agrega elementos al arreglo de carrito,sin perder la referencia de cursos agregados
    articulosCarrito = [...articulosCarrito, infoCurso];
  }

  console.table(articulosCarrito);

  carritoHtml();
}

// Muestra el carrito de compras en el HTML
function carritoHtml() {
  // Limpiar el HTML
  lipiarHtml();

  // recorrer el arreglo de carrito y por cada curso mostrarlos en HTML
  articulosCarrito.forEach((curso) => {
    const {} = curso;

    // Crear filas
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><img src="${curso.imagen}" width="100"></td>
      <td>${curso.titulo}</td>
      <td>${curso.precio}</td>
      <td>${curso.cantidad}</td>
      <td><a href="#" class="borrar-curso" data-id="${curso.id}"> x </a> </td>
    `;

    // Agregar el HTML al carrito en tbody
    contenedorCarrito.appendChild(row);
  });
}

// Eliminar los cursos del tbody
function lipiarHtml() {
  // forma lenta
  // contenedorCarrito.innerHTML = '';

  // si contenedor tiene al menos un elemento
  while (contenedorCarrito.firstChild) {
    // eliminar un hijo por el primero
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
