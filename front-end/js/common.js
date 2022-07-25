const api_url = 'http://localhost:3000/api';

const usuario_logado = JSON.parse(localStorage.getItem('usuarioLogado'));

const api_header = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${usuario_logado?.token}`
};