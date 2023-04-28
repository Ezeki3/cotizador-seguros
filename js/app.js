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
  return cantidad
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

UI.prototype.mostrarResultado = (total, seguro) => {

  const { marca, year, tipo } = seguro;
  let nombreMarca;

  switch (marca) {
    case '1':
      nombreMarca = 'Americano'
      break;
    case '2':
      nombreMarca = 'Asiatico'
      break;
    case '3':
      nombreMarca = 'Europeo'
      break;
    default:
      break;
  }
  // Crear el resultado
  const div = document.createElement('div');
  div.classList.add('mt-10');

  // innerHTML cuando queremos modificar el html y textContent cuando queremos crear el HTML
  div.innerHTML = `
    <p class="header">Tu Resumen</p>
    <p class="font-bold">Marca: <span class="font-normal"> ${nombreMarca}</span></p>
    <p class="font-bold">Año: <span class="font-normal">${year}</span></p>
    <p class="font-bold">Tipo: <span class="font-normal capitalize">${tipo}</span></p>
    <p class="font-bold">Total: <span class="font-normal"> $ ${total}</span></p>
  `;

  const resulatdoDiv = document.querySelector('#resultado');

  // Mostar el spinner
  const spinner = document.querySelector('#cargando');
  spinner.style.display = 'block';

  setTimeout(() => {
    spinner.style.display = 'none';
    resulatdoDiv.appendChild(div); //se muestra el resultado, despues que quitamos los spinners
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

  // Ocultar las cotizaciones previas
  const resultados = document.querySelector('#resultado div');
  if (resultados != null) {
    resultados.remove();
  }

  // Instanciamos el seguro
  const seguro = new Seguro(marca, year, tipo);
  const total = seguro.cotizarSeguro();

  // Utilizamos el prototype que va a cotizar
  ui.mostrarResultado(total, seguro);

}