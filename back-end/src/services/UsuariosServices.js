const UsuariosRepository = require('../repositories/UsuarioRepository');

class UsuariosServices {

    ListarUsuarios() {
        return UsuariosRepository.ListarUsuarios();
    }

    ListarUsuarioPorId(data) {
        return UsuariosRepository.ListarUsuarioPorId(data);
    }

    ListarUsuarioPorEmail(data) {
        return UsuariosRepository.ListarUsuarioPorEmail(data);
    }

    CriarUsuario(file, data) {
        if(file !== undefined) {
            data = {...data, avatar: file.filename};
        } else {
            data = {...data, avatar: 'default.jpg'};
        }

        return UsuariosRepository.CriarUsuario(data);
    }

    EditarUsuario(data) {
        return UsuariosRepository.EditarUsuario(data);
    }

    DeletarUsuario(data) {
        return UsuariosRepository.DeletarUsuario(data);
    }

}

module.exports = new UsuariosServices();