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
  // Muestra los cursos de LocalStorage
  document.addEventListener('DOMContentLoaded', leerDatosCarrito);

  // Cuando agregas un curso presionadno "Agregar al carrito"
  listaCursos.addEventListener('click', agregarCurso);

  // Elimina cursos del carrito
  carrito.addEventListener('click', eliminarCurso);

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

function agregarCurso(e) {
  e.preventDefault();
  // valida si donde presiono contiene la clase agregar-carrito
  if (e.target.classList.contains('agregar-carrito')) {
    // aplicamos traversing del DOM para obtener elemento del padre
    const cursoSeleccionado = e.target.parentElement.parentElement;

    leerDatosCurso(cursoSeleccionado);
  }
}

// Eliminar Curso del carrito
function eliminarCurso(e) {
  console.log(e.id);
  // verificamos si se encuentra la clase donde presionamos
  if (e.target.classList.contains('borrar-curso')) {
    // guardamos el id de curso a eliminar
    const cursoId = e.target.getAttribute('data-id');

    // guardamos en un nuevo array el los elementos diferente al id eliminado
    // articulosCarrito = articulosCarrito.filter((curso) => curso.id != cursoId);

    // Buscar el índice del curso en el array
    const index = articulosCarrito.findIndex((curso) => curso.id === cursoId);

    // Verificar si el curso existe en el carrito
    if (index !== -1) {
      // Si la cantidad es mayor a 1, simplemente disminuir la cantidad
      if (articulosCarrito[index].cantidad > 1) {
        articulosCarrito[index].cantidad -= 1;
      } else {
        // Si la cantidad es 1, eliminar el curso del array
        articulosCarrito.splice(index, 1);
      }

      // volvemos a generar html
      carritoHtml();
    }
  }
}

// Leer el contenido del HTML al que le da click y extrae la información del curso
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

  carritoHtml();
}

// Muestra el carrito de compras en el HTML
function carritoHtml() {
  // Limpiar el HTML
  limpiarHtml();

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

  // sincronizar con localStorage
  sincronizarLocalStorage();
}

// Eliminar los cursos del tbody
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
