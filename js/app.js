//leer del localstorage el tema o usar el valor por defecto dark;
let temaConfigurado = JSON.parse(localStorage.getItem('theme')) || 'dark';
cambiarTema(temaConfigurado);

let btnThemeDark = document.getElementById('btnThemeDark');
let btnThemeLight = document.getElementById('btnThemeLight');
console.log(btnThemeDark)
console.log(btnThemeLight)

btnThemeDark.addEventListener('click', ()=> cambiarTema('dark'));
btnThemeLight.addEventListener('click', ()=> cambiarTema('light'));

function cambiarTema(color){
    document.querySelector('html').setAttribute('data-bs-theme', color);
    //data-bs-theme= 'light' a la etiqueta html
    console.log(color);
    //guardar en localstorage
    localStorage.setItem('theme', JSON.stringify(color));    
}