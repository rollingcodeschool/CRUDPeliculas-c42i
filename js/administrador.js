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

let listaPeliculas =  JSON.parse(localStorage.getItem('listaPeliculas')) || [];

//si tengo peliculas almacenadas en el array las transformo en tipo Pelicula
if(listaPeliculas.length > 0){
  listaPeliculas = listaPeliculas.map((pelicula)=> new Pelicula(pelicula.codigo, pelicula.titulo, pelicula.descripcion, pelicula.imagen, pelicula.genero, pelicula.anio, pelicula.duracion, pelicula.pais, pelicula.reparto) )
}
console.log(listaPeliculas)

// {...pelicula}
// pelicula.codigo, pelicula.titulo, pelicula.
cargaInicial();

function cargaInicial(){
  if(listaPeliculas.length > 0){
    listaPeliculas.map((pelicula)=> crearFila(pelicula) )
  }
}

function crearFila(pelicula){
  console.log(pelicula)
  let tablaPelicula = document.getElementById('tablaPelicula');
  tablaPelicula.innerHTML += `<tr>
  <th scope="row">1</th>
  <td>${pelicula.titulo}</td>
  <td><span class="my-class text-truncate">${pelicula.descripcion}</span></td>
  <td><span class="my-class text-truncate">${pelicula.imagen}</span></td>
  <td>${pelicula.genero}</td>
  <td>
    <button class="btn btn-warning" onclick="editarPelicula('${pelicula.codigo}')">
      <i class="bi bi-pencil-square"></i>
    </button>
    <button class="btn btn-danger" onclick="borrarPelicula('${pelicula.codigo}')">
      <i class="bi bi-x-square"></i>
    </button>
  </td>
</tr>`
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
  crearPelicula();
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

function guardarEnLocalstorage(){
  localStorage.setItem('listaPeliculas', JSON.stringify(listaPeliculas));
}

function limpiarFormulario(){
  formularioPeliculas.reset();
}