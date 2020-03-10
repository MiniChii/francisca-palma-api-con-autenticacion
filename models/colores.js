var lista = [
    {
      color: "azul",
      rgb: "#0000ff",
      creadoPor:"Chii"
    },
    {
      color: "rojo",
      rgb: "#ff0000",
      creadoPor:"Chii"
    },
    {
      color: "verde",
      rgb: "#00ff00",
      creadoPor:"Chii"
    },
    
  ];
  
  /**agrega un color, donde el parámetro color es un objeto con {color,rgb} */
  function agregarColor(color) {
    return new Promise((resolve, reject) => {
      lista.push(color);
      resolve("Color agregado");
    });
  }
  
  function obtenerLista() {
    return new Promise((resolve, reject) => {
      resolve(lista);
    });
  }
  
  function borrarColoresPorUsuario(nombreUsuario) {
    return new Promise((resolve, reject) => {
      lista = lista.filter(buscarColor,{ nombreUsuario: nombreUsuario})
      resolve("Colores eliminados");
    });
  }
  function actualizarColor(nombreColor, rgb) {
    return new Promise((resolve, reject) => {
      const index = lista.findIndex(buscarColor, { nombre: nombreColor });
      lista[index].rgb = rgb.rgb;
      resolve("Color actualizado");
    });
  }
  function verColor(nombreColor) {
    return new Promise((resolve, reject) => {
      const index = lista.findIndex(buscarColor, { nombre: nombreColor });    
      resolve(lista[index]);
    });
  }
  
  function borrarUnColor(nombreColor) {
    return new Promise((resolve, reject) => {
      const index = lista.findIndex(buscarColor, { nombre: nombreColor });
      lista.splice(index, 1); //borra el elemento en "index"
      resolve("Color borrado");
    });
  }
  
  function buscarColor(element, index, array) {
    if(this.nombre){
      return element.color === this.nombre;
    }else if(this.nombreUsuario){ // si filtra por nombre usuario, se quedan los que no fueron creados por
      return ! element.creadoPor === this.nombreUsuario;
    }
    else return false;
    
  }
  module.exports = {
    agregarColor,
    obtenerLista,
    borrarColoresPorUsuario,
    actualizarColor,
    borrarUnColor,
    verColor
  };
  