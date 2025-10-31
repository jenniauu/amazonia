const db = firebase.firestore();
const especiesContainer = document.getElementById("arvoresContainer");

// Função para carregar espécies com acessibilidade
async function carregarEspecies() {
    try {
        const snapshot = await db.collection("especies").orderBy('timestamp', 'desc').get();
        especiesContainer.innerHTML = '';
        
        if (snapshot.empty) {
            especiesContainer.innerHTML = `
                <div class="empty-state" style="text-align: center; padding: 3rem; color: var(--text-light);">
                    <p>Nenhuma espécie cadastrada ainda.</p>
                </div>
            `;
            return;
        }

        snapshot.forEach(doc => {
            const especie = doc.data();
            const card = document.createElement("article");
            card.className = "especie-card";
            card.setAttribute('aria-labelledby', `titulo-${doc.id}`);
            card.setAttribute('aria-describedby', `descricao-${doc.id}`);
            
            const tipoIcon = especie.tipo === 'animal' ? '🐾' : '🌿';
            const tipoLabel = especie.tipo === 'animal' ? 'Animal' : 'Planta';
            
            card.innerHTML = `
                <div class="especie-badge ${especie.tipo}">
                    ${tipoIcon} ${tipoLabel}
                </div>
                <img src="${especie.imagem}" alt="${especie.nome} - Imagem ilustrativa" loading="lazy">
                <div class="especie-card-content">
                    <h3 id="titulo-${doc.id}">${especie.nome}</h3>
                    <p id="descricao-${doc.id}">${especie.descricao}</p>
                    <a href="${especie.qrcode}" target="_blank" rel="noopener" aria-label="Ver QR Code da espécie ${especie.nome}">
                        📱 QR Code
                    </a>
                </div>
            `;
            especiesContainer.appendChild(card);
        });
    } catch (error) {
        console.error("Erro ao carregar espécies:", error);
        especiesContainer.innerHTML = `
            <div class="error-state" style="text-align: center; padding: 3rem; color: var(--error);">
                <p>Erro ao carregar as espécies. Tente recarregar a página.</p>
            </div>
        `;
    }
}

// Sistema de contato
document.addEventListener('DOMContentLoaded', function() {
    const formContato = document.getElementById('formContato');
    
    if (formContato) {
        formContato.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const btnEnviar = this.querySelector('.btn-enviar');
            const btnText = this.querySelector('.btn-text');
            const btnLoading = this.querySelector('.btn-loading');
            
            // Simular envio
            btnText.style.display = 'none';
            btnLoading.style.display = 'block';
            btnEnviar.disabled = true;
            
            setTimeout(() => {
                alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                formContato.reset();
                btnText.style.display = 'block';
                btnLoading.style.display = 'none';
                btnEnviar.disabled = false;
            }, 2000);
        });
    }
    
    carregarEspecies();
});