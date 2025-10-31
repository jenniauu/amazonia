// Modal de segurança
const modalSenha = document.getElementById("modalSenha");
const inputSenha = document.getElementById("inputSenha");
const btnVerificarSenha = document.getElementById("btnVerificarSenha");
const formEspecie = document.getElementById("formEspecie");

// Elementos de estatísticas
const plantasCount = document.getElementById("plantasCount");
const animaisCount = document.getElementById("animaisCount");
const totalCount = document.getElementById("totalCount");

// Mostrar modal ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    modalSenha.style.display = 'flex';
    inputSenha.focus();
});

// Verificar senha
btnVerificarSenha.addEventListener('click', verificarSenha);
inputSenha.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        verificarSenha();
    }
});

function verificarSenha() {
    const senha = inputSenha.value;
    const btnText = btnVerificarSenha.querySelector('.btn-text');
    const btnLoading = btnVerificarSenha.querySelector('.btn-loading');
    
    // Mostrar loading
    btnText.style.display = 'none';
    btnLoading.style.display = 'block';
    btnVerificarSenha.disabled = true;
    
    setTimeout(() => {
        if (senha === "1234") {
            modalSenha.style.display = 'none';
            carregarEstatisticas();
            document.getElementById('nome').focus();
        } else {
            // Feedback de erro
            inputSenha.setAttribute('aria-invalid', 'true');
            inputSenha.style.borderColor = 'var(--error)';
            inputSenha.style.animation = 'shake 0.5s ease-in-out';
            
            setTimeout(() => {
                inputSenha.style.animation = '';
            }, 500);
            
            inputSenha.value = '';
            inputSenha.focus();
        }
        
        // Restaurar botão
        btnText.style.display = 'block';
        btnLoading.style.display = 'none';
        btnVerificarSenha.disabled = false;
    }, 1000);
}

// Carregar estatísticas
async function carregarEstatisticas() {
    try {
        const snapshot = await firebase.firestore().collection("especies").get();
        let plantas = 0;
        let animais = 0;
        
        snapshot.forEach(doc => {
            const especie = doc.data();
            if (especie.tipo === 'planta') {
                plantas++;
            } else if (especie.tipo === 'animal') {
                animais++;
            }
        });
        
        const total = plantas + animais;
        
        // Animar contadores
        animarContador(plantasCount, plantas);
        animarContador(animaisCount, animais);
        animarContador(totalCount, total);
        
    } catch (error) {
        console.error("Erro ao carregar estatísticas:", error);
    }
}

// Animação dos contadores
function animarContador(element, finalValue) {
    let current = 0;
    const increment = finalValue / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= finalValue) {
            element.textContent = finalValue;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 20);
}

// Formulário de cadastro
formEspecie.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const descricao = document.getElementById("descricao").value;
    const tipo = document.getElementById("tipo").value;
    const imagem = document.getElementById("imagem").value;
    const qrcode = document.getElementById("qrcode").value;

    // Validação do tipo
    if (!tipo) {
        mostrarErro('tipo', 'Por favor, selecione o tipo da espécie.');
        return;
    }

    const submitBtn = formEspecie.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');

    // Mostrar loading
    btnText.style.display = 'none';
    btnLoading.style.display = 'block';
    submitBtn.disabled = true;

    try {
        await firebase.firestore().collection("especies").add({
            nome, 
            descricao, 
            tipo,
            imagem, 
            qrcode,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        // Feedback de sucesso
        mostrarSucesso('Espécie cadastrada com sucesso!');
        formEspecie.reset();
        carregarEstatisticas();
        document.getElementById('nome').focus();
        
    } catch (error) {
        console.error("Erro ao cadastrar espécie:", error);
        mostrarErro('form', 'Erro ao cadastrar espécie. Tente novamente.');
    } finally {
        // Restaurar botão
        btnText.style.display = 'block';
        btnLoading.style.display = 'none';
        submitBtn.disabled = false;
    }
});

// Funções de feedback
function mostrarSucesso(mensagem) {
    const toast = document.createElement('div');
    toast.className = 'toast toast-success';
    toast.innerHTML = `
        <span class="toast-icon">✅</span>
        <span class="toast-message">${mensagem}</span>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

function mostrarErro(campo, mensagem) {
    if (campo === 'form') {
        const toast = document.createElement('div');
        toast.className = 'toast toast-error';
        toast.innerHTML = `
            <span class="toast-icon">❌</span>
            <span class="toast-message">${mensagem}</span>
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    } else {
        const input = document.getElementById(campo);
        input.style.borderColor = 'var(--error)';
        input.style.animation = 'shake 0.5s ease-in-out';
        
        setTimeout(() => {
            input.style.animation = '';
        }, 500);
        
        input.focus();
    }
}