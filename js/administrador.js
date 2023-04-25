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
  const resumen = resumenValidaciones(titulo.value);
  //si los datos son validos?
  //esta funcion decide si muestra o no el mensaj de error
  mostrarMensajeError(resumen)
  if (resumen.length === 0) {
    // crear pelicula
    const peliculaEjemplo = new Pelicula(
      "0001",
      "El Padrino",
      "La familia Corleone es una de las más poderosas de Nueva York en los años 40.",
      "https://imagenes.psicologiaymente.com/wp-content/uploads/2021/02/el-padrino-1.png",
      "Drama/Crimen",
      1972,
      "2h 55min",
      "Estados Unidos",
      ["Marlon Brando", "Al Pacino", "James Caan"]
    );
    //agregar la Pelicula en el arreglo de peliculas
    //guardar el array en localstorage
    console.log(peliculaEjemplo);
  }
}

function mostrarMensajeError(resumen){
  if(resumen.length > 0){
    alert.className = 'alert alert-danger mt-3';
    alert.innerHTML = resumen
  }else{
    alert.className = 'alert alert-danger mt-3 d-none';
  }
}