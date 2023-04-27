const btnCotizar = document.querySelector('button');

// Constructores
function Seguro(marca, year, tipo) {
  this.marca = marca;
  this.year = year;
  this.tipo = tipo;
}

// Realiza la cotizacion con los datos
Seguro.prototype.cotizarSeguro = function () {

  // 1 = Americano 1.15
  // 2 = Asicatico 1.05
  // 3 = Europeo 1.35

  let cantidad;
  const base = 2000;

  switch (this.marca) {
    case '1':
      cantidad = base * 1.15
      break;
    case '2':
      cantidad = base * 1.05
      break;
    case '3':
      cantidad = base * 1.35
      break;
    default:
      break;
  }

  // Leer el año
  const diferencia = new Date().getFullYear() - this.year;

  // Cada año que la diferencia es  es mayor, el costo va a reducirse un 3%
  cantidad -= ((diferencia * 3) * cantidad) / 100;

  /*
    Si el seguro es basico se multiplica por un 30% mas
    Si el seguro es completo se multiplica por un 50% mas
  */

  if (this.tipo === 'basico') {
    cantidad *= 1.30;
  } else {
    cantidad *= 1.50;
  }
  console.log(cantidad);
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

  btnCotizar.style.visibility = "hidden"; //Oculto el boton
  // btnCotizar.style.opacity = 0.2;

  const div = document.createElement('div');

  if (tipo === 'error') {
    div.classList.add('error');
  } else {
    div.classList.add('correcto');
  }

  div.classList.add('mensaje', 'mt-10');
  div.textContent = mensaje;

  // Insertar en el html
  const formulario = document.querySelector('#cotizar-seguro');
  formulario.insertBefore(div, document.querySelector('#resultado'));

  setTimeout(() => {
    div.remove();
    btnCotizar.style.visibility = "visible"; //Visibilizo el boton
  }, 3000);
}

// Instanciamos
const ui = new UI();


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
    ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
    return;
  }
  ui.mostrarMensaje('Cotizacion en proceso', 'exito');

  // Instanciamos el seguro
  const seguro = new Seguro(marca, year, tipo);
  seguro.cotizarSeguro();

  // Utilizamos el prototype que va a cotizar

}