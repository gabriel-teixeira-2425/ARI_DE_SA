const tabs = document.querySelectorAll('.tab');
const loginForm = document.getElementById('loginForm');
const container = document.getElementById('notification-container');

// Alternar abas
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
    });
});

// Função para mostrar o erro (Toast)
function showError(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <div class="toast-body">${message}</div>
        <button class="toast-close">&times;</button>
        <div class="toast-progress"></div>
    `;
    container.appendChild(toast);

    const remove = () => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    };

    toast.querySelector('.toast-close').onclick = remove;
    setTimeout(() => { if(toast.parentNode) remove(); }, 3000);
}

// Validação de Login
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const pass = document.getElementById('password').value;

    // 1. Campos vazios
    if (!email || !pass) {
        showError("Preencha todos os campos.");
        return;
    }

    // 2. Validação específica de formato de e-mail (Falta de @)
    if (!email.includes('@')) {
        showError("E-mail inválido (está faltando o @)");
        return;
    }

    // 3. Validação de domínio institucional
    if (!email.toLowerCase().endsWith('@fas.edu.br')) {
        showError("E-mail institucional inválido (@fas.edu.br obrigatório)");
        return;
    }

    // 4. Validação de senha (Mínimo 12 dígitos)
    if (pass.length < 12) {
        showError("Senha inválida (mínimo 12 dígitos)");
        return;
    }

    // 5. Credenciais incorretas (Simulação)
    if (email !== "aluno@fas.edu.br" || pass !== "123456789012") {
        showError("Email ou senhas incorretos");
        return;
    }

    alert("Bem-vindo ao UNIARI!");
});