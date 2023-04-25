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
  
}

// todo: agregar las validaciones correspondientes para la descripcion, pais, reparto, anio y duracion

export function resumenValidaciones(titulo, descripcion, imagen){
    let resumen = '';
    if(! validarCantidadCaracteres(titulo,2, 100)){
        //si no cumplio la validacion
        resumen = 'El titulo debe contener entre 2 y 100 caracteres <br>';
    };
    if(! validarCantidadCaracteres(descripcion,5, 300)){
        //si no cumplio la validacion
        resumen += 'La descripcion debe contener entre 5 y 300 caracteres <br>';
    };
    return resumen;
}