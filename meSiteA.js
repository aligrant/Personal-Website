
const words = [
    "Developer", "Engineer", "Coder", "Designer", "Creator", 
    "Innovator", "Technologist", "Builder", "Problem Solver", 
    "Visionary", "Strategist", "Thinker", "Learner", "Explorer",
    "Enthusiast", "Analyst", "Leader", "Architect", "Planner",
    "Manager", "Mentor", "Organizer", "Consultant", "Specialist",
    "About", "Projects", "Contact"
];

const createWordElement = (word) => {
    const wordElement = document.createElement('div');
    wordElement.textContent = word;
    wordElement.className = 'word';
    if (word === 'About' || word === 'Projects' || word === 'Contact') {
        wordElement.classList.add('highlight');
        wordElement.onclick = () => {
            document.getElementById(word.toLowerCase()).scrollIntoView({ behavior: 'smooth' });
        };
    }
    return wordElement;
};

const isOverlapping = (rect1, rect2) => {
    return !(rect1.right < rect2.left || 
             rect1.left > rect2.right || 
             rect1.bottom < rect2.top || 
             rect1.top > rect2.bottom);
};

const positionWords = () => {
    const wordElements = document.querySelectorAll('.word');
    const headerHeight = document.querySelector('.header').clientHeight;
    const paddingX = 0.1 * window.innerWidth;
    const paddingY = 0.1 * headerHeight;
    const nameRect = document.getElementById('name').getBoundingClientRect();
    const photoRect = document.getElementById('photo').getBoundingClientRect();
    const highlightRects = [];

    wordElements.forEach(wordElement => {
        let x, y, rect, overlap;
        do {
            x = paddingX + Math.random() * (window.innerWidth - 2 * paddingX);
            y = paddingY + Math.random() * (headerHeight - 2 * paddingY);
            wordElement.style.left = `${x}px`;
            wordElement.style.top = `${y}px`;
            rect = wordElement.getBoundingClientRect();
            overlap = highlightRects.some(highlightRect => isOverlapping(rect, highlightRect)) || isOverlapping(rect, nameRect) || isOverlapping(rect, photoRect);
        } while (overlap);
        
        if (wordElement.classList.contains('highlight')) {
            highlightRects.push(rect);
        }
    });
};

const updateWordSizes = (event) => {
    const wordElements = document.querySelectorAll('.word');
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    wordElements.forEach(wordElement => {
        const rect = wordElement.getBoundingClientRect();
        const distance = Math.hypot(rect.left + rect.width / 2 - mouseX, rect.top + rect.height / 2 - mouseY);
        const scale = Math.max(1, 2 - distance / 200);
        wordElement.style.transform = `scale(${scale})`;
    });
};

words.forEach((word, index) => {
    const wordElement = createWordElement(word);
    wordElement.style.animationDelay = `${index * 0.1}s`;
    document.getElementById('word-cloud').appendChild(wordElement);
});

positionWords();
window.addEventListener('mousemove', updateWordSizes);
window.addEventListener('resize', positionWords);
