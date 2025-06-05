async function carregarUsuarios() {
  try {
    const resposta = await fetch('http://localhost:3000/usuarios');
    const usuarios = await resposta.json();

    const lista = document.querySelector('.lista-usuarios');
    usuarios.forEach(usuario => {
      const li = document.createElement('li');
      li.textContent = `Nome: ${usuario.nome} | Email: ${usuario.email}`;
      lista.appendChild(li);
    });
  } catch (erro) {
    console.error('Erro ao buscar usuários:', erro);
  }
}

carregarUsuarios();

console.log('Carregando usuários...');
console.log('fetch para http://localhost:3000/usuarios');

const resposta = await fetch('http://localhost:3000/usuarios');
const usuarios = await resposta.json();

console.log('Usuários recebidos:', usuarios);