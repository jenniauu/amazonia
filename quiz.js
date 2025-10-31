class QuizAmazônia {
    constructor() {
        this.questions = [
            {
                question: "Qual é o tamanho aproximado da Floresta Amazônica?",
                options: [
                    "5,5 milhões de km²",
                    "3,5 milhões de km²", 
                    "7,0 milhões de km²",
                    "2,0 milhões de km²"
                ],
                correct: 0,
                explanation: "A Amazônia possui aproximadamente 5,5 milhões de km², sendo a maior floresta tropical do mundo."
            },
            {
                question: "Quantos países a Amazônia abrange?",
                options: [
                    "9 países",
                    "6 países",
                    "12 países",
                    "3 países"
                ],
                correct: 0,
                explanation: "A Amazônia se estende por 9 países: Brasil, Bolívia, Peru, Colômbia, Equador, Venezuela, Guiana, Suriname e Guiana Francesa."
            },
            {
                question: "Qual é o rio principal da Amazônia?",
                options: [
                    "Rio Amazonas",
                    "Rio Nilo",
                    "Rio Mississippi",
                    "Rio Yangtzé"
                ],
                correct: 0,
                explanation: "O Rio Amazonas é o maior rio em volume de água do mundo e o principal da região amazônica."
            },
            {
                question: "Cerca de quantas espécies de árvores existem na Amazônia?",
                options: [
                    "Mais de 16.000",
                    "Cerca de 5.000",
                    "Aproximadamente 8.000",
                    "Menos de 3.000"
                ],
                correct: 0,
                explanation: "Estima-se que existam mais de 16.000 espécies de árvores na Floresta Amazônica."
            },
            {
                question: "Qual animal é símbolo da Amazônia?",
                options: [
                    "Onça-pintada",
                    "Tucano",
                    "Boto-cor-de-rosa",
                    "Todos os anteriores"
                ],
                correct: 3,
                explanation: "A onça-pintada, o tucano e o boto-cor-de-rosa são considerados símbolos da Amazônia."
            },
            {
                question: "Qual é a principal ameaça à Amazônia atualmente?",
                options: [
                    "Desmatamento",
                    "Caça ilegal",
                    "Mudanças climáticas",
                    "Todos os anteriores"
                ],
                correct: 3,
                explanation: "A Amazônia enfrenta múltiplas ameaças, incluindo desmatamento, caça ilegal e mudanças climáticas."
            },
            {
                question: "Quantas tribos indígenas vivem na Amazônia brasileira?",
                options: [
                    "Mais de 400 tribos",
                    "Cerca de 150 tribos",
                    "Aproximadamente 80 tribos",
                    "Menos de 50 tribos"
                ],
                correct: 0,
                explanation: "Existem mais de 400 tribos indígenas vivendo na Amazônia brasileira, cada uma com sua cultura única."
            },
            {
                question: "Qual a importância da Amazônia para o clima global?",
                options: [
                    "Regula o ciclo de chuvas",
                    "Estoca carbono",
                    "Produz oxigênio",
                    "Todas as anteriores"
                ],
                correct: 3,
                explanation: "A Amazônia é crucial para regular chuvas, estocar carbono e produzir oxigênio, influenciando o clima global."
            },
            {
                question: "Qual fruto típico da Amazônia é conhecido como 'superfood'?",
                options: [
                    "Açaí",
                    "Cupuaçu",
                    "Guaraná",
                    "Todos os anteriores"
                ],
                correct: 3,
                explanation: "Açaí, cupuaçu e guaraná são frutos amazônicos considerados 'superfoods' por seus benefícios nutricionais."
            },
            {
                question: "O que significa 'Amazônia'?",
                options: [
                    "Deriva de mulheres guerreiras da mitologia grega",
                    "Significa 'floresta grande' em tupi",
                    "Vem do nome de um rio indígena",
                    "Foi dado pelos exploradores portugueses"
                ],
                correct: 0,
                explanation: "O nome 'Amazônia' foi dado pelo explorador Francisco de Orellana, inspirado nas mulheres guerreiras da mitologia grega."
            }
        ];

        this.currentQuestion = 0;
        this.score = 0;
        this.startTime = null;
        this.userAnswers = new Array(this.questions.length).fill(null);
        this.initializeQuiz();
    }

    initializeQuiz() {
        document.getElementById('startQuiz').addEventListener('click', () => this.startQuiz());
        document.getElementById('nextQuestion').addEventListener('click', () => this.nextQuestion());
        document.getElementById('prevQuestion').addEventListener('click', () => this.prevQuestion());
        document.getElementById('submitQuiz').addEventListener('click', () => this.submitQuiz());
        document.getElementById('restartQuiz').addEventListener('click', () => this.restartQuiz());
    }

    startQuiz() {
        document.querySelector('.quiz-intro').style.display = 'none';
        document.getElementById('quizContainer').style.display = 'block';
        this.startTime = new Date();
        this.showQuestion(0);
    }

    showQuestion(index) {
        this.currentQuestion = index;
        const question = this.questions[index];
        
        // Atualizar progresso
        const progress = ((index + 1) / this.questions.length) * 100;
        document.getElementById('progressFill').style.width = `${progress}%`;
        document.getElementById('progressText').textContent = `Pergunta ${index + 1} de ${this.questions.length}`;
        document.getElementById('currentScore').textContent = this.score;

        // Mostrar pergunta
        document.getElementById('questionText').textContent = question.question;
        
        // Mostrar opções
        const optionsContainer = document.getElementById('optionsContainer');
        optionsContainer.innerHTML = '';
        
        question.options.forEach((option, i) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            if (this.userAnswers[index] === i) {
                optionElement.classList.add('selected');
            }
            
            optionElement.innerHTML = `
                <span class="option-letter">${String.fromCharCode(65 + i)}</span>
                <span class="option-text">${option}</span>
            `;
            
            optionElement.addEventListener('click', () => this.selectOption(i));
            optionsContainer.appendChild(optionElement);
        });

        // Atualizar navegação
        document.getElementById('prevQuestion').disabled = index === 0;
        document.getElementById('nextQuestion').style.display = index === this.questions.length - 1 ? 'none' : 'inline-block';
        document.getElementById('submitQuiz').style.display = index === this.questions.length - 1 ? 'inline-block' : 'none';
    }

    selectOption(optionIndex) {
        // Remover seleção anterior
        document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
        
        // Adicionar nova seleção
        event.currentTarget.classList.add('selected');
        
        // Salvar resposta
        this.userAnswers[this.currentQuestion] = optionIndex;
        
        // Verificar se a resposta está correta
        const question = this.questions[this.currentQuestion];
        if (optionIndex === question.correct && this.userAnswers[this.currentQuestion] !== question.correct) {
            this.score += 100;
            document.getElementById('currentScore').textContent = this.score;
        }
    }

    nextQuestion() {
        if (this.currentQuestion < this.questions.length - 1) {
            this.showQuestion(this.currentQuestion + 1);
        }
    }

    prevQuestion() {
        if (this.currentQuestion > 0) {
            this.showQuestion(this.currentQuestion - 1);
        }
    }

    submitQuiz() {
        const endTime = new Date();
        const timeTaken = Math.floor((endTime - this.startTime) / 1000);
        
        // Calcular acertos
        let correctCount = 0;
        this.questions.forEach((question, index) => {
            if (this.userAnswers[index] === question.correct) {
                correctCount++;
            }
        });

        // Mostrar resultados
        document.getElementById('quizContainer').style.display = 'none';
        document.getElementById('quizResults').style.display = 'block';
        
        document.getElementById('finalScore').textContent = this.score;
        document.getElementById('correctAnswers').textContent = `${correctCount}/${this.questions.length}`;
        document.getElementById('timeTaken').textContent = `${timeTaken} segundos`;
        
        // Animar círculo de pontuação
        const finalScore = this.score;
        const circle = document.getElementById('scoreCircle');
        const circumference = 339.292; // 2 * π * 54
        const offset = circumference - (finalScore / 1000) * circumference;
        
        setTimeout(() => {
            circle.style.transition = 'stroke-dashoffset 1.5s ease-in-out';
            circle.style.strokeDashoffset = offset;
        }, 500);

        // Determinar performance
        let performance = '';
        let message = '';
        
        if (this.score >= 800) {
            performance = 'Excelente!';
            message = 'Você é um verdadeiro conhecedor da Amazônia! 🌟';
        } else if (this.score >= 600) {
            performance = 'Muito bom!';
            message = 'Você conhece bem a Amazônia! 👍';
        } else if (this.score >= 400) {
            performance = 'Bom!';
            message = 'Seu conhecimento sobre a Amazônia é bom! 💚';
        } else {
            performance = 'Continue aprendendo!';
            message = 'A Amazônia tem muito a ser descoberto! 🌱';
        }
        
        document.getElementById('performance').textContent = performance;
        document.getElementById('resultsMessage').textContent = message;
    }

    restartQuiz() {
        this.currentQuestion = 0;
        this.score = 0;
        this.userAnswers.fill(null);
        this.startTime = null;
        
        document.getElementById('quizResults').style.display = 'none';
        document.querySelector('.quiz-intro').style.display = 'block';
    }
}

// Inicializar quiz quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    new QuizAmazônia();
});