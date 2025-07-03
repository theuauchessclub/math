// Interactive functionality for the chess club site

document.addEventListener('DOMContentLoaded', () => {
    // Mobile navigation toggle
    const toggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (toggle) {
        toggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });
    }

    // Accordion behavior for curriculum
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            header.classList.toggle('active');
            const panel = header.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + 'px';
            }
        });
    });

    // Quiz functionality
    const questions = [
        {
            q: 'Which piece moves in an L-shape?',
            choices: ['Bishop', 'Knight', 'Rook', 'Queen'],
            answer: 1
        },
        {
            q: 'How many squares does a king move?',
            choices: ['Any number', 'Two', 'One', 'None'],
            answer: 2
        },
        {
            q: 'What is it called when the king is under attack?',
            choices: ['Check', 'Stalemate', 'Fork', 'Pin'],
            answer: 0
        },
        {
            q: 'Which piece starts on the corners?',
            choices: ['Bishop', 'King', 'Rook', 'Knight'],
            answer: 2
        },
        {
            q: 'What is it called when a pawn reaches the opposite side?',
            choices: ['En passant', 'Promotion', 'Checkmate', 'Castling'],
            answer: 1
        }
    ];

    let current = 0;
    let score = 0;

    const startBtn = document.getElementById('start-quiz');
    const quizContainer = document.getElementById('quiz-container');
    const questionEl = document.getElementById('question');
    const choicesEl = document.getElementById('choices');
    const nextBtn = document.getElementById('next-btn');

    if (startBtn) {
        startBtn.addEventListener('click', () => {
            startBtn.style.display = 'none';
            quizContainer.classList.remove('hidden');
            showQuestion();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const selected = document.querySelector('input[name="choice"]:checked');
            if (!selected) return;
            if (parseInt(selected.value, 10) === questions[current].answer) {
                score++;
            }
            current++;
            if (current < questions.length) {
                showQuestion();
            } else {
                questionEl.textContent = `You got ${score} out of ${questions.length} correct!`;
                choicesEl.innerHTML = '';
                nextBtn.style.display = 'none';
            }
        });
    }

    function showQuestion() {
        const q = questions[current];
        questionEl.textContent = q.q;
        choicesEl.innerHTML = '';
        q.choices.forEach((choice, index) => {
            const label = document.createElement('label');
            label.className = 'choice';
            label.innerHTML = `<input type="radio" name="choice" value="${index}"> ${choice}`;
            choicesEl.appendChild(label);
        });
    }
});
