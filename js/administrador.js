import Pelicula from "./classPelicula.js";
import { resumenValidaciones } from "./helpers.js";

//variables globales
let formularioPeliculas = document.getElementById("formPelicula");
let modalPelicula = new bootstrap.Modal(
  document.getElementById("modalPelicula")
);
const btnCrearPelicula = document.querySelector("#btnCrearPelicula");
let codigo = document.getElementById("codigo"),
  titulo = document.getElementById("titulo"),
  descripcion = document.getElementById("descripcion"),
  imagen = document.getElementById("imagen"),
  genero = document.getElementById("genero"),
  pais = document.getElementById("pais"),
  director = document.getElementById("director"),
  reparto = document.getElementById("reparto"),
  anio = document.getElementById("anio"),
  duracion = document.getElementById("duracion"),
  alert = document.getElementById("alerta");
let altaPelicula = true; //altaPelicula = true es porque quiero crear una peli, cuando sea false quiero editar.

let listaPeliculas = JSON.parse(localStorage.getItem("listaPeliculas")) || [];

//si tengo peliculas almacenadas en el array las transformo en tipo Pelicula
if (listaPeliculas.length > 0) {
  listaPeliculas = listaPeliculas.map(
    (pelicula) =>
      new Pelicula(
        pelicula.codigo,
        pelicula.titulo,
        pelicula.descripcion,
        pelicula.imagen,
        pelicula.genero,
        pelicula.anio,
        pelicula.duracion,
        pelicula.pais,
        pelicula.reparto
      )
  );
}
console.log(listaPeliculas);

// {...pelicula}
// pelicula.codigo, pelicula.titulo, pelicula.
cargaInicial();

function cargaInicial() {
  if (listaPeliculas.length > 0) {
    listaPeliculas.map((pelicula, posicion) =>
      crearFila(pelicula, posicion + 1)
    );
  }
}

function crearFila(pelicula, fila) {
  console.log(pelicula);
  let tablaPelicula = document.getElementById("tablaPelicula");
  tablaPelicula.innerHTML += `<tr>
  <th scope="row">${fila}</th>
  <td>${pelicula.titulo}</td>
  <td><span class="my-class text-truncate">${pelicula.descripcion}</span></td>
  <td><span class="my-class text-truncate">${pelicula.imagen}</span></td>
  <td>${pelicula.genero}</td>
  <td>
    <button class="btn btn-warning" onclick="prepararPelicula('${pelicula.codigo}')">
      <i class="bi bi-pencil-square"></i>
    </button>
    <button class="btn btn-danger" onclick="borrarPelicula('${pelicula.codigo}')">
      <i class="bi bi-x-square"></i>
    </button>
  </td>
</tr>`;
}

//manejadores de eventos
formularioPeliculas.addEventListener("submit", prepararFormularioPelicula);
btnCrearPelicula.addEventListener("click", desplegarModalPelicula);

//funciones
function desplegarModalPelicula() {
  modalPelicula.show();
}

function prepararFormularioPelicula(e) {
  e.preventDefault();
  console.log("en el evento submit");
  if (altaPelicula) {
    crearPelicula();
  } else {
    editarPelicula();
  }
}

function crearPelicula() {
  //validar los datos
  const resumen = resumenValidaciones(
    titulo.value,
    descripcion.value,
    imagen.value,
    genero.value
  );
  //si los datos son validos?
  //esta funcion decide si muestra o no el mensaj de error
  mostrarMensajeError(resumen);
  if (resumen.length === 0) {
    // crear pelicula
    const peliculaNueva = new Pelicula(
      undefined,
      titulo.value,
      descripcion.value,
      imagen.value,
      genero.value,
      anio.value,
      duracion.value,
      pais.value,
      reparto.value
    );
    //agregar la Pelicula en el arreglo de peliculas
    listaPeliculas.push(peliculaNueva);
    //guardar el array en localstorage
    guardarEnLocalstorage();
    console.log(peliculaNueva);
    //dibujar la fila en la tabla
    crearFila(peliculaNueva, listaPeliculas.length);
    //mostrar un mensaje
    Swal.fire(
      "Pelicula creada",
      "La pelicula fue creada exitosamente",
      "success"
    );
    limpiarFormulario();
    //mostrar un mensaje intuitivo
  }
}

function mostrarMensajeError(resumen) {
  if (resumen.length > 0) {
    alert.className = "alert alert-danger mt-3";
    alert.innerHTML = resumen;
  } else {
    alert.className = "alert alert-danger mt-3 d-none";
  }
}

function guardarEnLocalstorage() {
  localStorage.setItem("listaPeliculas", JSON.stringify(listaPeliculas));
}

function limpiarFormulario() {
  formularioPeliculas.reset();
}

window.borrarPelicula = (codigo) => {
  Swal.fire({
    title: "¿Esta seguro de borrar la pelicula?",
    text: "No puedes volver atras luego de borrar una pelicula",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Borrar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    console.log(result);
    if (result.isConfirmed) {
      //codigo cuando borro
      console.log(codigo);
      //1 - buscar del array a donde esta el elemento que tiene este codigo
      let posicionPelicula = listaPeliculas.findIndex(
        (pelicula) => pelicula.codigo === codigo
      );
      //2 - borrar la pelicula del array (splice)
      listaPeliculas.splice(posicionPelicula, 1);
      //3 - actualizar el localstorage
      guardarEnLocalstorage();
      //4- borrar la fila de la tabla
      let tablaPelicula = document.getElementById("tablaPelicula");
      tablaPelicula.removeChild(tablaPelicula.children[posicionPelicula]);
      //5 - mostrar un cartel al usuario
      Swal.fire(
        "Pelicula eliminada",
        "La pelicula seleccionada fue borrada correctamente",
        "success"
      );
      //todo: paso 6 actualizar los numeros de las filas de la tabla.
    }
  });
};

window.prepararPelicula = (codigoPelicula) => {
  //tener los datos de la pelicula y cargar en el formulario
  const peliculaBuscada = listaPeliculas.find(
    (pelicula) => pelicula.codigo === codigoPelicula
  );
  //mostrar la ventana modal
  codigo.value = peliculaBuscada.codigo;
  titulo.value = peliculaBuscada.titulo;
  descripcion.value = peliculaBuscada.descripcion;
  genero.value = peliculaBuscada.genero;
  imagen.value = peliculaBuscada.imagen;
  pais.value = peliculaBuscada.pais;
  anio.value = peliculaBuscada.anio;
  reparto.value = peliculaBuscada.reparto;
  duracion.value = peliculaBuscada.duracion;
  modalPelicula.show();
  //cambiamos el valor de la variable altaPelicula
  altaPelicula = false;
};

function editarPelicula() {
  console.log("aqui tengo que editar");
  //1- buscaria la posicion de la pelicula en el array
  let posicionPelicula = listaPeliculas.findIndex((pelicula)=> pelicula.codigo === codigo.value );
  console.log(posicionPelicula)
  //todo: validar los datos
  //2- editar los valores de la pelicula dentroe del array
  listaPeliculas[posicionPelicula].titulo = titulo.value;
  listaPeliculas[posicionPelicula].imagen = imagen.value;
  listaPeliculas[posicionPelicula].descripcion = descripcion.value;
  listaPeliculas[posicionPelicula].genero = genero.value;
  listaPeliculas[posicionPelicula].pais = pais.value;
  listaPeliculas[posicionPelicula].duracion = duracion.value;
  listaPeliculas[posicionPelicula].reparto = reparto.value;
  //3- actualizar el localstorage
  guardarEnLocalstorage()
  //4-actualizar la fila
  let tablaPelicula = document.getElementById("tablaPelicula");
  console.log(tablaPelicula.children[posicionPelicula].children[1])
//  let celdaTitulo =tablaPelicula.children[posicionPelicula].children[1]
  tablaPelicula.children[posicionPelicula].children[1].innerHTML = titulo.value
  tablaPelicula.children[posicionPelicula].children[2].children[0].innerHTML = descripcion.value
  tablaPelicula.children[posicionPelicula].children[3].children[0].innerHTML = imagen.value
  tablaPelicula.children[posicionPelicula].children[4].innerHTML = genero.value
  //5-mostrar un cartel al usuario
  Swal.fire(
    "Pelicula modificada",
    "La pelicula fue modificada exitosamente",
    "success"
  );
  //6- limpiar el formulario y cerrar el modal
  limpiarFormulario();
  modalPelicula.hide();
}
