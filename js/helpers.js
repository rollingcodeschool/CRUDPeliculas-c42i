function validarCantidadCaracteres(texto, min, max){
    if(texto.length >= min && texto.length <= max){
        console.log('la palabra es valida')
        return true;
    }else{
        console.log('la palabra es incorrecta')
        return false;
    }
}

//https://pics.filmaffinity.com/maybe_i_do-982667296-large.jpg
//^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|png|gif)$

function validarURLImagen(imagen){
  const patron = /^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|png|gif)$/;
  if(patron.test(imagen)){
    console.log('la url de la imagen es valida')
    return true;
  }else{
    console.log('la url de la imagen es erronea')
    return false;
  }
}

function validarGenero(genero){
    if( genero.length > 0 && (genero === 'accion' || genero === 'drama' || genero === 'comedia' || genero === 'aventura' )){
        return true;
    }else{
        return false;
    }
}

// todo: agregar las validaciones correspondientes para la descripcion, pais, reparto, anio y duracion

export function resumenValidaciones(titulo, descripcion, imagen, genero){
    let resumen = '';
    if(! validarCantidadCaracteres(titulo,2, 100)){
        //si no cumplio la validacion
        resumen = 'El titulo debe contener entre 2 y 100 caracteres <br>';
    };
    if(! validarCantidadCaracteres(descripcion,5, 300)){
        //si no cumplio la validacion
        resumen += 'La descripcion debe contener entre 5 y 300 caracteres <br>';
    };
    if(! validarURLImagen(imagen)){
        //si no cumplio la validacion
        resumen += 'La url debe ser valida y contener una extension (.jpg,.png o .gif) <br>';
    };
    if(! validarGenero(genero)){
        //si no cumplio la validacion
        resumen += 'Debe seleccionar un genero de la lista <br>';
    };
    return resumen;
}