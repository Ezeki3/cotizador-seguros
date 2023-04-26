
// Constructores
function Seguro(marca, year, tipo) {
  this.marca = marca;
  this.year = year;
  this.tipo = tipo;
}

function UI() {

}

// SE PUEDEN USAR ARROW FUNCTION si nuestro objeto no tiene propiedas, si tienen propiedades es mejor usar una function normal
// Llenamos las opciones de los años
UI.prototype.llenarOpciones = () => {
  const max = new Date().getFullYear(),
    min = max - 10;

  const selectYear = document.querySelector('#year');

  for (let i = max; i >= min; i--) {
    let option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    selectYear.appendChild(option);
  }

}

// Muestra alertas en pantalla
UI.prototype.mostrarMensaje = (mensaje, tipo) => {

  const div = document.createElement('div');

  if (tipo === 'error') {
    div.classList.add('error');
  } else {
    div.classList.add('correcto');
  }

  div.classList.add('mensaje', 'mt-10');

}

// Instanciamos
const ui = new UI();
console.log(ui);

document.addEventListener('DOMContentLoaded', () => {
  ui.llenarOpciones(); //ya cargado el documento mandamos a cargar el select con los años
})

eventListeners();
function eventListeners() {
  const formulario = document.querySelector('#cotizar-seguro');
  formulario.addEventListener('submit', cotizarSeguro);
}

function cotizarSeguro(e) {
  e.preventDefault();

  // Leer la marca seleccionada
  const marca = document.querySelector('#marca').value;

  // Leer el año seleccionado
  const year = document.querySelector('#year').value;

  // Leemos el tipo de cobertura, de los radio button
  const tipo = document.querySelector('input[name="tipo"]:checked').value;

  if (marca === '' || year === '' || tipo === '') {
    console.log('No paso la validacion');
  } else {
    console.log('Si paso');
  }

}