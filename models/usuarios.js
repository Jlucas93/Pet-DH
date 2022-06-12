// responsavel por realizar as operações de CRUD no banco de dados
const fs = require('fs');
const { v4: geradorDeId } = require('uuid');

function open() {
    let content = fs.readFileSync("./db.json", "utf8")
    const db = JSON.parse(content); // de texto json para js
    return db;
}

function store(db) {
    content = JSON.stringify(db); // de js para texto json
    fs.writeFileSync("./db.json", content, "utf8")
}

const Usuario = {
    findAll: () => {
        const db = open();
        return db.usuarios;
    },
    findById: (id) => {
        const db = open();
        const usuario = db.usuarios.find(usuario => usuario.id == id);
        return usuario;
    },
    findByEmail: (email) => {
        const db = open();
        const usuario = db.usuarios.find(user => user.email === email)
        return usuario;
    },
    save: (usuario) => {
        const db = open();
        usuario.id = geradorDeId(); // gerando um id para meu novo serviço
        db.usuarios.push(usuario);
        store(db);
    },
    update: (id, usuarioAtualizado) => {
        const db = open();
        const index = db.usuarios.findIndex(usuario => usuario.id == id);
        db.usuarios[index] = usuarioAtualizado;
        store(db);
    },
    delete: (id) => {
        const db = open();
        const index = db.usuarios.findIndex(usuario => usuario.id == id);
        db.usuarios.splice(index, 1);
        store(db);
    }
}

module.exports = Usuario;
