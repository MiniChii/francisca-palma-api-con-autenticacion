const borrarColoresPorUsuario = require( "./colores");

var usuarios = [
    {
        nombre: "Chii",
        password: "",
    },
];



/**agrega un usuario, donde el parámetro usuario es un objeto con {nombre,password} */
function agregarUsuario(user) {
    return new Promise((resolve, reject) => {
        usuarios.push(user);
        resolve("Usuario agregado");
    });
}

function listarUsuarios() {
    return new Promise((resolve, reject) => {
        resolve(usuarios);
    });
}


function actualizarUsuario(user) {
    return new Promise((resolve, reject) => {
        const index = usuarios.findIndex(buscar, { nombre: user.nombre });
        usuarios[index].password = user.password;
        resolve("Usuario actualizado");
    });
}
function verUsuario(nombreU) {
    return new Promise((resolve, reject) => {
        const index = usuarios.findIndex(buscar, { nombre: nombreU });
        resolve(usuarios[index]);
    });
}

function borrarUsuario(nombreU) {
    return new Promise((resolve, reject) => {
        const index = usuarios.findIndex(buscar, { nombre: nombreU });
        usuarios.splice(index, 1); //borra el elemento en "index"
        //borrar colores del usuario
        borrarColoresPorUsuario(nombreU);

        resolve("Usuario borrado");
    });
}

function buscar(element, index, array) {
    return element.nombre === this.nombre;
}

module.exports = {
    agregarUsuario,
    listarUsuarios,
    actualizarUsuario,
    verUsuario,
    borrarUsuario
};
