const {
  agregarColor: modelAgregarColor,
  obtenerLista: modelObtenerLista,
  borrarColores: modelBorrarColores,
  actualizarColor: modelActualizarColor,
  borrarUnColor: modelBorrarUnColor,
  verColor: modelVerColor
} = require("../models/colores");


function agregarColor(color) {
  //lamar a la capa modelo
  return existeColor({ nombre: color.nombre }).then(valor => {
    
    if (!valor) {
      return modelAgregarColor(color).then(resultado => {
        return { status: 200, body: { message: resultado } };
      });
    } else {
      return { status: 400, body: { message: "Ese color ya existe" } };
    }
  });
}

function obtenerLista() {
  return modelObtenerLista().then(resultado => {
    return { status: 200, body: resultado };
  });
}

function borrarColores() {
  return modelBorrarColores().then(resultado => {
    return { status: 200, body: { message: resultado } };
  });
}

//verColor
function verColor(nombreColor) {
  //ver que exista el color... seguir con estoo
  return existeColor({ nombre: nombreColor }).then(valor => {
    if (valor) {
      return modelVerColor(nombreColor).then(resultado => {
        return { status: 200, body: { message: resultado } };
      });
    } else {
      return { status: 404, body: { message: "Color no encontrado" } };
    }
  });
}

function actualizarColor(nombreColor, rgb) {
  //ver que exista el color... seguir con estoo
  return existeColor({ nombre: nombreColor }).then(valor => {
    if (valor) {
      return modelActualizarColor(nombreColor, rgb).then(resultado => {
        return { status: 200, body: { message: resultado } };
      });
    } else {
      return { status: 404, body: { message: "Color no encontrado" } };
    }
  });
}

function borrarUnColor(nombreColor) {
  //ver que exista el color... seguir con estoo
  return existeColor({ nombre: nombreColor }).then(valor => {
    if (valor) {
      return modelBorrarUnColor(nombreColor).then(resultado => {
        return { status: 200, body: { message: resultado } };
      });
    } else {
      return { status: 404, body: { message: "Color no encontrado" } };
    }
  });
}
function existeColor(thisArg) {
  return modelObtenerLista().then(lista => lista.some(buscarNombre, thisArg));
}

function buscarNombre(element, index, list) {
  return element.color == this.nombre;
}

module.exports = {
  agregarColor,
  obtenerLista,
  borrarColores,
  actualizarColor,
  borrarUnColor,
  verColor
};
