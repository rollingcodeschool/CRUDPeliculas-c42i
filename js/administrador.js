import Pelicula from "./classPelicula.js";
import { resumenValidaciones } from "./helpers.js";

//variables globales
let formularioPeliculas = document.getElementById("formPelicula");
let modalPelicula = new bootstrap.Modal(
  document.getElementById("modalPelicula")
);
const btnCrearPelicula = document.querySelector("#btnCrearPelicula");
let listaPeliculas = [];
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