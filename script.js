const startButton = document.getElementById('start-button');
const startMenu = document.getElementById('start-menu');
// Open My Computer
const myCompIcon = document.querySelector('.icon-container:first-child');
const myCompWindow = document.getElementById('window-my-computer');
const closeBtn = document.getElementById('close-my-computer');
const startBtn = document.getElementById('start-systems-btn');
const overlay = document.getElementById('startup-overlay');
const sound = document.getElementById('startup-sound');

myCompIcon.addEventListener('dblclick', () => {
    myCompWindow.classList.remove('hidden');
});

closeBtn.addEventListener('click', () => {
    myCompWindow.classList.add('hidden');
});

// Basic Dragging (Logic stub)
let isDragging = false;
const titleBar = myCompWindow.querySelector('.title-bar');

titleBar.addEventListener('mousedown', () => isDragging = true);
document.addEventListener('mouseup', () => isDragging = false);
document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        myCompWindow.style.left = e.pageX - 200 + 'px';
        myCompWindow.style.top = e.pageY - 10 + 'px';
    }
});

const startupSound = document.getElementById('startup-sound');

function playBootSound() {
    startupSound.play().catch(error => {
        console.log("Autoplay prevented. Waiting for user interaction.");
    });
    
    // Remove the listener so it only plays once per session
    document.removeEventListener('click', playBootSound);
}

// Add the listener to the whole document
document.addEventListener('click', playBootSound);

// Toggle Menu
startButton.addEventListener('mousedown', (e) => {
    e.stopPropagation();
    startMenu.classList.toggle('hidden');
});

// Close menu when clicking elsewhere
document.addEventListener('mousedown', (e) => {
    if (!startMenu.contains(e.target) && e.target !== startButton) {
        startMenu.classList.add('hidden');
    }
});

// Handle the "depressed" look of the start button while menu is open
setInterval(() => {
    if (!startMenu.classList.contains('hidden')) {
        startButton.style.borderTop = "1px solid var(--ButtonDkShadow)";
        startButton.style.borderLeft = "1px solid var(--ButtonDkShadow)";
        startButton.style.borderRight = "1px solid var(--ButtonHilight)";
        startButton.style.borderBottom = "1px solid var(--ButtonHilight)";
        startButton.style.boxShadow = "none";
        startButton.style.padding = "1px 3px 0 5px";
    } else {
        startButton.style = ""; // Resets to CSS defaults
    }
}, 50);

// Deselect icons when clicking the desktop background
document.getElementById('desktop').addEventListener('mousedown', function(e) {
    if (e.target === this) {
        // Find the currently focused icon and blur it
        if (document.activeElement.classList.contains('icon-container')) {
            document.activeElement.blur();
        }
    }
});

// Logic for double-clicking icons (optional for now)
document.querySelectorAll('.icon-container').forEach(icon => {
	// Code that used when no window was even coded, but now useless
    // icon.addEventListener('dblclick', function() {
    //     alert('Opening: ' + this.innerText);
    // });
});

function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    
    // Format: H:MM (Matches your screenshot "0:38")
    document.getElementById('clock').textContent = `${hours}:${minutes}`;
}

// Update the clock every minute
setInterval(updateClock, 60000);
updateClock();

// Prevent right-click menu on desktop to feel more like an OS
document.addEventListener('contextmenu', event => event.preventDefault());