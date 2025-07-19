

document.addEventListener('DOMContentLoaded', function() {


    // Loading screen
    setTimeout(function() {
        document.querySelector('.loading-screen').style.opacity = '0';
        setTimeout(function() {
            document.querySelector('.loading-screen').style.display = 'none';
        }, 500);
    }, 2000);

    // Navigation scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile navigation toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize particles.js
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#ff6b6b"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ff8e8e",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });

    // Gallery lightbox
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('galleryLightbox');
    const lightboxImg = document.getElementById('lightboxImage');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').getAttribute('src');
            const imgAlt = this.querySelector('img').getAttribute('alt');
            
            lightbox.style.display = 'flex';
            lightboxImg.setAttribute('src', imgSrc);
            lightboxCaption.textContent = imgAlt;
        });
    });
    
    closeLightbox.addEventListener('click', function() {
        lightbox.style.display = 'none';
    });
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });

    // Games tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Puzzle game
    const puzzleBoard = document.getElementById('puzzleBoard');
    const shuffleBtn = document.getElementById('shuffleBtn');
    const solveBtn = document.getElementById('solveBtn');
    const moveCount = document.getElementById('moveCount');
    
    let moves = 0;
    let puzzlePieces = [];
    let emptyIndex = 8;
    let isSolved = false;
    
    // Initialize puzzle
    function initPuzzle() {
        puzzleBoard.innerHTML = '';
        moves = 0;
        moveCount.textContent = moves;
        isSolved = false;
        
        // Create puzzle pieces
        for (let i = 0; i < 8; i++) {
            const piece = document.createElement('div');
            piece.className = 'puzzle-tile';
            piece.textContent = i + 1;
            piece.style.backgroundImage = 'url(https://source.unsplash.com/random/600x600/?birthday)';
            piece.style.backgroundPosition = `${-(i % 3) * 100}px ${-Math.floor(i / 3) * 100}px`;
            piece.setAttribute('data-index', i);
            piece.addEventListener('click', movePiece);
            puzzleBoard.appendChild(piece);
            puzzlePieces[i] = piece;
        }
        
        // Add empty space
        const emptyPiece = document.createElement('div');
        emptyPiece.className = 'puzzle-tile empty';
        emptyPiece.setAttribute('data-index', 8);
        puzzleBoard.appendChild(emptyPiece);
        puzzlePieces[8] = emptyPiece;
        emptyIndex = 8;
        
        // Shuffle the puzzle
        shufflePuzzle();
    }
    
    // Shuffle puzzle
    function shufflePuzzle() {
        moves = 0;
        moveCount.textContent = moves;
        
        // Perform random moves to shuffle
        for (let i = 0; i < 200; i++) {
            const possibleMoves = getPossibleMoves();
            const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
            swapPieces(randomMove, emptyIndex);
            emptyIndex = randomMove;
        }
        
        isSolved = false;
    }
    
    // Get possible moves
    function getPossibleMoves() {
        const moves = [];
        const row = Math.floor(emptyIndex / 3);
        const col = emptyIndex % 3;
        
        // Check up
        if (row > 0) moves.push(emptyIndex - 3);
        // Check down
        if (row < 2) moves.push(emptyIndex + 3);
        // Check left
        if (col > 0) moves.push(emptyIndex - 1);
        // Check right
        if (col < 2) moves.push(emptyIndex + 1);
        
        return moves;
    }
    
    // Move puzzle piece
    function movePiece() {
        if (isSolved) return;
        
        const clickedIndex = parseInt(this.getAttribute('data-index'));
        const possibleMoves = getPossibleMoves();
        
        if (possibleMoves.includes(clickedIndex)) {
            swapPieces(clickedIndex, emptyIndex);
            emptyIndex = clickedIndex;
            moves++;
            moveCount.textContent = moves;
            
            // Check if puzzle is solved
            checkSolved();
        }
    }
    
    // Swap puzzle pieces
    function swapPieces(index1, index2) {
        const temp = puzzlePieces[index1].textContent;
        puzzlePieces[index1].textContent = puzzlePieces[index2].textContent;
        puzzlePieces[index2].textContent = temp;
        
        const tempBg = puzzlePieces[index1].style.backgroundImage;
        puzzlePieces[index1].style.backgroundImage = puzzlePieces[index2].style.backgroundImage;
        puzzlePieces[index2].style.backgroundImage = tempBg;
        
        const tempPos = puzzlePieces[index1].style.backgroundPosition;
        puzzlePieces[index1].style.backgroundPosition = puzzlePieces[index2].style.backgroundPosition;
        puzzlePieces[index2].style.backgroundPosition = tempPos;
    }
    
    // Check if puzzle is solved
    function checkSolved() {
        let solved = true;
        
        for (let i = 0; i < 8; i++) {
            if (puzzlePieces[i].textContent != i + 1) {
                solved = false;
                break;
            }
        }
        
        if (solved) {
            isSolved = true;
            setTimeout(() => {
                alert(`Congratulations! You solved the puzzle in ${moves} moves!`);
            }, 300);
        }
    }
    
    // Show solution
    function showSolution() {
        for (let i = 0; i < 8; i++) {
            puzzlePieces[i].textContent = i + 1;
            puzzlePieces[i].style.backgroundPosition = `${-(i % 3) * 100}px ${-Math.floor(i / 3) * 100}px`;
        }
        puzzlePieces[8].textContent = '';
        isSolved = true;
    }
    
    // Event listeners
    shuffleBtn.addEventListener('click', shufflePuzzle);
    solveBtn.addEventListener('click', showSolution);
    
    // Initialize puzzle game
    initPuzzle();

    // Memory game
    const memoryBoard = document.getElementById('memoryBoard');
    const memoryMoves = document.getElementById('memoryMoves');
    const memoryMatches = document.getElementById('memoryMatches');
    const memoryReset = document.getElementById('memoryReset');
    
    let memoryCards = [];
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let matchCount = 0;
    let movesMemory = 0;
    
    // Card icons
    const icons = [
        'fa-birthday-cake',
        'fa-gift',
        'fa-balloon',
        'fa-glass-cheers',
        'fa-crown',
        'fa-music',
        'fa-heart',
        'fa-star'
    ];
    
    // Initialize memory game
    function initMemoryGame() {
        memoryBoard.innerHTML = '';
        matchCount = 0;
        movesMemory = 0;
        memoryMoves.textContent = movesMemory;
        memoryMatches.textContent = `${matchCount}/8`;
        memoryCards = [];
        
        // Duplicate icons to create pairs
        const cardIcons = [...icons, ...icons];
        
        // Shuffle cards
        cardIcons.sort(() => 0.5 - Math.random());
        
        // Create cards
        cardIcons.forEach((icon, index) => {
            const card = document.createElement('div');
            card.className = 'memory-card';
            card.setAttribute('data-icon', icon);
            card.setAttribute('data-index', index);
            
            const cardFront = document.createElement('div');
            cardFront.className = 'card-front';
            
            const iconElement = document.createElement('i');
            iconElement.className = `fas ${icon}`;
            
            cardFront.appendChild(iconElement);
            
            const cardBack = document.createElement('div');
            cardBack.className = 'card-back';
            
            card.appendChild(cardFront);
            card.appendChild(cardBack);
            
            card.addEventListener('click', flipCard);
            
            memoryBoard.appendChild(card);
            memoryCards.push(card);
        });
    }
    
    // Flip card
    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;
        if (this.classList.contains('matched')) return;
        
        this.classList.add('flipped');
        
        if (!hasFlippedCard) {
            // First click
            hasFlippedCard = true;
            firstCard = this;
            return;
        }
        
        // Second click
        secondCard = this;
        movesMemory++;
        memoryMoves.textContent = movesMemory;
        
        checkForMatch();
    }
    
    // Check for match
    function checkForMatch() {
        const isMatch = firstCard.getAttribute('data-icon') === secondCard.getAttribute('data-icon');
        
        if (isMatch) {
            disableCards();
            matchCount++;
            memoryMatches.textContent = `${matchCount}/8`;
            
            if (matchCount === 8) {
                setTimeout(() => {
                    alert(`Congratulations! You won in ${movesMemory} moves!`);
                }, 500);
            }
        } else {
            unflipCards();
        }
    }
    
    // Disable matched cards
    function disableCards() {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        
        resetBoard();
    }
    
    // Unflip unmatched cards
    function unflipCards() {
        lockBoard = true;
        
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            
            resetBoard();
        }, 1000);
    }
    
    // Reset board
    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }
    
    // Event listeners
    memoryReset.addEventListener('click', initMemoryGame);
    
    // Initialize memory game
    initMemoryGame();

    // Quiz game
    const quizSubmit = document.getElementById('quizSubmit');
    const quizResult = document.getElementById('quizResult');
    
    quizSubmit.addEventListener('click', function() {
        let score = 0;
        
        // Check answers (replace with correct answers for your friend)
        const q1 = document.querySelector('input[name="q1"]:checked');
        const q2 = document.querySelector('input[name="q2"]:checked');
        const q3 = document.querySelector('input[name="q3"]:checked');
        
        if (q1 && q1.value === 'b') score++;
        if (q2 && q2.value === 'a') score++;
        if (q3 && q3.value === 'c') score++;
        
        // Display result
        quizResult.style.display = 'block';
        quizResult.innerHTML = `
            <h4>Your Score: ${score}/3</h4>
            <p>${getQuizFeedback(score)}</p>
        `;
    });
    
    function getQuizFeedback(score) {
        if (score === 0) return "Hmm, maybe you need to spend more time with your friend!";
        if (score === 1) return "Not bad, but you can do better!";
        if (score === 2) return "Good job! You know your friend pretty well!";
        if (score === 3) return "Perfect! You're an amazing best friend!";
    }

    // Interactive wish
    const sendWish = document.getElementById('sendWish');
    const wishConfirmation = document.getElementById('wishConfirmation');
    
    sendWish.addEventListener('click', function() {
        const personalWish = document.getElementById('personalWish').value;
        
        if (personalWish.trim() === '') {
            alert('Please write your wish before sending!');
            return;
        }
        
        // Here you would normally send the wish to a server
        // For this demo, we'll just show a confirmation
        wishConfirmation.style.display = 'flex';
        document.getElementById('personalWish').value = '';
        
        setTimeout(() => {
            wishConfirmation.style.display = 'none';
        }, 3000);
    });

    // Music player
    const musicToggle = document.getElementById('musicToggle');
    const birthdayMusic = document.getElementById('birthdayMusic');
    let isPlaying = false;
    
    musicToggle.addEventListener('click', function() {
        if (isPlaying) {
            birthdayMusic.pause();
            musicToggle.innerHTML = '<i class="fas fa-music"></i><span>Play Music</span>';
        } else {
            birthdayMusic.play();
            musicToggle.innerHTML = '<i class="fas fa-pause"></i><span>Pause Music</span>';
        }
        isPlaying = !isPlaying;
    });

    // Confetti effect
    const canvas = document.getElementById('confetti-canvas');
    
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        window.addEventListener('resize', function() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
        
        // Confetti effect on page load
        setTimeout(() => {
            launchConfetti();
        }, 1000);
        
        // Confetti effect when clicking "Start Celebration" button
        const exploreBtn = document.querySelector('.explore-btn');
        if (exploreBtn) {
            exploreBtn.addEventListener('click', launchConfetti);
        }
    }
    
    function launchConfetti() {
        const confettiSettings = {
            target: 'confetti-canvas',
            max: 150,
            size: 1.5,
            animate: true,
            props: ['circle', 'square', 'triangle', 'line'],
            colors: [[255, 107, 107], [255, 142, 142], [255, 179, 179], [255, 214, 214]],
            clock: 25,
            rotate: true,
            start_from_edge: true,
            respawn: true
        };
        
        const confetti = new ConfettiGenerator(confettiSettings);
        confetti.render();
        
        setTimeout(() => {
            confetti.clear();
        }, 5000);
    }
});

// Confetti generator (simplified version for demo)
class ConfettiGenerator {
    constructor(settings) {
        this.settings = settings;
        this.canvas = document.getElementById(settings.target);
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.animationId = null;
        
        this.init();
    }
    
    init() {
        for (let i = 0; i < this.settings.max; i++) {
            this.particles.push(this.createParticle());
        }
        
        this.animate();
    }
    
    createParticle() {
        const { props, colors } = this.settings;
        const type = props[Math.floor(Math.random() * props.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        return {
            x: Math.random() * this.canvas.width,
            y: this.settings.start_from_edge ? -10 : Math.random() * this.canvas.height,
            r: Math.random() * this.settings.size + 0.5,
            d: Math.random() * 3 + 1,
            color: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
            type,
            rotate: Math.random() * 360,
            rotateSpeed: (Math.random() - 0.5) * 10
        };
    }
    
    drawParticle(particle) {
        this.ctx.save();
        this.ctx.translate(particle.x, particle.y);
        this.ctx.rotate(particle.rotate * Math.PI / 180);
        this.ctx.fillStyle = particle.color;
        
        switch (particle.type) {
            case 'circle':
                this.ctx.beginPath();
                this.ctx.arc(0, 0, particle.r, 0, Math.PI * 2);
                this.ctx.fill();
                break;
            case 'square':
                this.ctx.fillRect(-particle.r, -particle.r, particle.r * 2, particle.r * 2);
                break;
            case 'triangle':
                this.ctx.beginPath();
                this.ctx.moveTo(0, -particle.r);
                this.ctx.lineTo(-particle.r, particle.r);
                this.ctx.lineTo(particle.r, particle.r);
                this.ctx.closePath();
                this.ctx.fill();
                break;
            case 'line':
                this.ctx.strokeStyle = particle.color;
                this.ctx.lineWidth = particle.r / 2;
                this.ctx.beginPath();
                this.ctx.moveTo(-particle.r, 0);
                this.ctx.lineTo(particle.r, 0);
                this.ctx.stroke();
                break;
        }
        
        this.ctx.restore();
    }
    
    updateParticles() {
        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];
            
            p.y += p.d;
            p.rotate += p.rotateSpeed;
            
            if (p.y > this.canvas.height) {
                if (this.settings.respawn) {
                    this.particles[i] = this.createParticle();
                    this.particles[i].y = -10;
                } else {
                    this.particles.splice(i, 1);
                    i--;
                }
            }
        }
        
        if (this.settings.respawn && this.particles.length < this.settings.max) {
            this.particles.push(this.createParticle());
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (let i = 0; i < this.particles.length; i++) {
            this.drawParticle(this.particles[i]);
        }
        
        this.updateParticles();
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    render() {
        if (!this.animationId) {
            this.animate();
        }
    }
    
    clear() {
        cancelAnimationFrame(this.animationId);
        this.animationId = null;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.particles = [];
    }
}