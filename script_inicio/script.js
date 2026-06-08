document.querySelectorAll('.campo_input input').forEach(function(input) {
    input.addEventListener('focus', function() {
        this.parentElement.querySelector('.input_title').classList.add('ativo');
    });
    input.addEventListener('blur', function() {
        this.parentElement.querySelector('.input_title').classList.remove('ativo');
    });
});

function mostrarForms() {
    // 1. Adiciona a classe no body para fazer os títulos subirem e diminuírem
    document.body.classList.add('modo-login');
    
    const loginContainer = document.getElementById('login_container');
    const loginForm = document.getElementById('login_form');
    
    // 2. Torna o container visível no display primeiro
    loginContainer.style.display = 'block';
    loginForm.style.display = 'flex'; // Exibe o formulário de login interno
    
    // 3. Um pequeno "delay" milimétrico para o CSS perceber a mudança de display e aplicar a animação de opacidade
    setTimeout(() => {
        loginContainer.classList.add('mostrar');
    }, 10);
}

// Lembre-se de ajustar suas outras funções (cadastrar, irParaLogin) 
// para apenas mudarem o display dos respectivos forms internos (#cadastrar_form, #recuperar_form)
function cadastrar() {
    document.getElementById('login_form').style.display = 'none';
    document.getElementById('recuperar_form').style.display = 'none';
    document.getElementById('cadastrar_form').style.display = 'flex';
}

function irParaLogin() {
    document.getElementById('cadastrar_form').style.display = 'none';
    document.getElementById('recuperar_form').style.display = 'none';
    document.getElementById('login_form').style.display = 'flex';
}

function recuperarSenha() {
    document.getElementById('login_form').style.display = 'none';
    document.getElementById('cadastrar_form').style.display = 'none';
    document.getElementById('recuperar_form').style.display = 'flex';
}

// Seleciona o input de senha
const inputSenha = document.getElementById('password_login');

// Função para mostrar a senha
function mostrarSenha() {
    inputSenha.type = 'text';
}

// Função para esconder a senha
function esconderSenha() {
    // Só esconde se o usuário NÃO estiver com o campo focado (digitando)
    if (document.activeElement !== inputSenha) {
        inputSenha.type = 'password';
    }
}

// --- EVENTOS DE HOVER (Passar o mouse) ---
inputSenha.addEventListener('mouseenter', mostrarSenha);
inputSenha.addEventListener('mouseleave', esconderSenha);

// --- EVENTOS DE FOCO (Clicar/Digitar no campo) ---
inputSenha.addEventListener('focus', mostrarSenha);
inputSenha.addEventListener('blur', () => {
    // Quando tira o foco, esconde a senha imediatamente
    inputSenha.type = 'password';
});

// Seleciona o input de senha
const inputSenhaCad = document.getElementById('password_cadastrar');

// Função para mostrar a senha
function mostrarSenhaCad() {
    inputSenhaCad.type = 'text';
}

// Função para esconder a senha
function esconderSenhaCad() {
    // Só esconde se o usuário NÃO estiver com o campo focado (digitando)
    if (document.activeElement !== inputSenhaCad) {
        inputSenhaCad.type = 'password';
    }
}

// --- EVENTOS DE HOVER (Passar o mouse) ---
inputSenhaCad.addEventListener('mouseenter', mostrarSenhaCad);
inputSenhaCad.addEventListener('mouseleave', esconderSenhaCad);

// --- EVENTOS DE FOCO (Clicar/Digitar no campo) ---
inputSenhaCad.addEventListener('focus', mostrarSenhaCad);
inputSenhaCad.addEventListener('blur', () => {
    // Quando tira o foco, esconde a senha imediatamente
    inputSenhaCad.type = 'password';
});

// Seleciona o input de senha
const inputSenhaConf = document.getElementById('password_cadastrar_confirm');

// Função para mostrar a senha
function mostrarSenhaConf() {
    inputSenhaConf.type = 'text';
}

// Função para esconder a senha
function esconderSenhaConf() {
    // Só esconde se o usuário NÃO estiver com o campo focado (digitando)
    if (document.activeElement !== inputSenhaConf) {
        inputSenhaConf.type = 'password';
    }
}

// --- EVENTOS DE HOVER (Passar o mouse) ---
inputSenhaConf.addEventListener('mouseenter', mostrarSenhaConf);
inputSenhaConf.addEventListener('mouseleave', esconderSenhaConf);

// --- EVENTOS DE FOCO (Clicar/Digitar no campo) ---
inputSenhaConf.addEventListener('focus', mostrarSenhaConf);
inputSenhaConf.addEventListener('blur', () => {
    // Quando tira o foco, esconde a senha imediatamente
    inputSenhaConf.type = 'password';
});

function login(event) {
    if (event) event.preventDefault();

    // Pega os valores dos inputs e remove espaços vazios nas pontas
    let email = document.getElementById('email_login').value.trim();
    const senha = document.getElementById('password_login').value;

    // Se o e-mail começar com % ou @ por erro de digitação, limpa o primeiro caractere
    if (email.startsWith('@') || email.startsWith('%')) {
        email = email.substring(1);
    }

    // --- 1. VALIDAÇÃO DO E-MAIL ---
    // Apenas garante que o texto termine obrigatoriamente com @gmail.com
    const regexEmail = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!regexEmail.test(email)) {
        alert("Erro no E-mail: Por favor, insira um e-mail válido que termine com '@gmail.com'.");
        return false; 
    }

    // --- 2. VALIDAÇÃO DA SENHA (Todas as suas regras juntas) ---
    const temMaiuscula = /[A-Z]/.test(senha); // Pelo menos 1 letra maiúscula
    const temMinuscula = /[a-z]/.test(senha); // Pelo menos 1 letra minúscula
    const temNumero    = /[0-9]/.test(senha); // Pelo menos 1 número (sua regra aqui!)
    const temSimbolo   = /[\W_]/.test(senha); // Pelo menos 1 símbolo (%, @, #, $, !, etc.)

    // Se a senha for menor que 7 OU faltar qualquer um dos requisitos acima, dá erro
    if (senha.length < 7 || !temMaiuscula || !temMinuscula || !temNumero || !temSimbolo) {
        alert("Erro na Senha: A senha deve ter no mínimo 7 caracteres e conter pelo menos: 1 letra maiúscula, 1 letra minúscula, 1 número e 1 símbolo.");
        return false; 
    }

    // Se passar por tudo, o login é liberado!
}

function cadastrarUsuário(event) {
    // Impede o formulário de recarregar a página antes de validar
    if (event) event.preventDefault();

    // Pega os valores dos inputs de cadastro
    let email = document.getElementById('email_cadastrar').value.trim();
    const senha = document.getElementById('password_cadastrar').value;
    const confirmacaoSenha = document.getElementById('password_cadastrar_confirm').value;

    // Se o e-mail começar com % ou @ por erro de digitação, limpa o primeiro caractere
    if (email.startsWith('@') || email.startsWith('%')) {
        email = email.substring(1);
    }

    // --- 1. VALIDAÇÃO DO E-MAIL ---
    const regexEmail = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!regexEmail.test(email)) {
        alert("Erro no E-mail: Por favor, insira um e-mail válido que termine com '@gmail.com'.");
        return false; 
    }

    // --- 2. VALIDAÇÃO DA FORÇA DA SENHA ---
    const temMaiuscula = /[A-Z]/.test(senha);
    const temMinuscula = /[a-z]/.test(senha);
    const temNumero    = /[0-9]/.test(senha);
    const temSimbolo   = /[\W_]/.test(senha);

    if (senha.length < 7 || !temMaiuscula || !temMinuscula || !temNumero || !temSimbolo) {
        alert("Erro na Senha: A senha deve ter no mínimo 7 caracteres e conter pelo menos: 1 letra maiúscula, 1 letra minúscula, 1 número e 1 símbolo.");
        return false; 
    }

    // --- 3. VALIDAÇÃO DE COMPARAÇÃO DAS SENHAS (Nova regra para o Cadastro) ---
    if (senha !== confirmacaoSenha) {
        alert("Erro no Cadastro: A senha e a confirmação de senha não são iguais. Digite as duas idênticas!");
        return false;
    }

    // Se passar por todas as regras:
    alert("Cadastro realizado com sucesso!");
    
    // Aqui você pode colocar a lógica para salvar os dados ou redirecionar o usuário
}

function enviarEmail(event) {
    // Impede o formulário de recarregar a página antes da validação
    if (event) event.preventDefault();

    // Pega o valor do input de recuperação e limpa os espaços
    let email = document.getElementById('email_recuperar').value.trim();

    // Se o e-mail começar com % ou @ por erro de digitação, limpa o primeiro caractere
    if (email.startsWith('@') || email.startsWith('%')) {
        email = email.substring(1);
    }

    // --- VALIDAÇÃO DO E-MAIL (Obrigatoriamente @gmail.com no final) ---
    const regexEmail = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!regexEmail.test(email)) {
        alert("Erro no E-mail: Por favor, insira um e-mail válido que termine com '@gmail.com'.");
        return false; 
    }

    // Se o e-mail for válido e passar na regra:
    alert("Link de recuperação enviado com sucesso para o seu e-mail!");
    
    // Aqui você coloca a lógica para integrar com o seu banco/serviço de e-mail
}