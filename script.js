"use strict";

// DOM Elements
const form = document.getElementById('registration-form');
const submitBtn = document.getElementById('submit-btn');
const teamNameInput = document.getElementById('team-name');
const teamSizeInput = document.getElementById('team-size');
const eventCodeInput = document.getElementById('event-code');
const emailInput = document.getElementById('email');

const participantCount = document.getElementById('participant-count');
const regStatus = document.getElementById('reg-status');
const eventStatus = document.getElementById('event-status');
const validationProgress = document.getElementById('validation-progress');
const scoreText = document.getElementById('score-text');
const consoleOutput = document.getElementById('console-output');

const timerDisplay = document.getElementById('timer-display');
const countdownRing = document.getElementById('countdown-ring');

// Timer Configuration
let timeRemaining = 40 * 60; // 40 minutes in seconds
const totalTime = 40 * 60;
const circumference = 2 * Math.PI * 54; // radius = 54

// Countdown Timer
function startCountdown() {
    const interval = setInterval(() => {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        
        timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        // Update circular progress
        const progress = (timeRemaining / totalTime);
        const offset = circumference * (1 - progress);
        countdownRing.style.strokeDashoffset = offset;
        
        if (timeRemaining <= 0) {
            clearInterval(interval);
            logToConsole('[ERROR] Time expired! Registration locked.', 'error');
            disableForm();
        }
        
        timeRemaining--;
    }, 1000);
}

// Email validation
function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

// Event code validation - expects exactly "ISTE-2026"
function validateEventCode(code) {
    return code === "ISTE-2026";
}

// Calculate validation score
function calculateValidationScore() {
    let score = 0;
    
    if (teamNameInput.value.trim().length > 0) score += 25;
    if (teamSizeInput.value >= 1 && teamSizeInput.value <= 4) score += 25;
    if (validateEventCode(eventCodeInput.value)) score += 25;
    if (validateEmail(emailInput.value)) score += 25;
    
    return score;
}

// Update UI with validation score
function updateValidationUI() {
    const score = calculateValidationScore();
    validationProgress.style.width = `${score}%`;
    scoreText.textContent = `${score}%`;
    
    if (score === 100) {
        eventStatus.textContent = 'Ready';
        eventStatus.classList.add('success');
    } else {
        eventStatus.textContent = 'Pending';
        eventStatus.classList.remove('success');
    }
}

// Update participant count
let totalParticipants = 0;

function updateParticipantCount() {
    const teamSize = parseInt(teamSizeInput.value) || 0;
    totalParticipants += teamSize;
    participantCount.textContent = totalParticipants;
}

// Console logging function
function logToConsole(message, type = 'info') {
    const line = document.createElement('div');
    line.className = `console-line ${type}`;
    
    const timestamp = new Date().toLocaleTimeString();
    const prefix = type === 'error' ? '[ERROR]' : type === 'success' ? '[SUCCESS]' : '[INFO]';
    
    line.textContent = `${prefix} ${message}`;
    consoleOutput.appendChild(line);
    
    // Auto-scroll to bottom
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
}

// BUG #5 (JS): Form submission handler uses == instead of === for string comparison
// This allows "ISTE-2026 " (with space) or numeric 2026 to pass validation
function handleFormSubmit(e) {
    e.preventDefault();
    
    logToConsole('Validating registration form...', 'info');
    
    const teamName = teamNameInput.value.trim();
    const teamSize = parseInt(teamSizeInput.value);
    const eventCode = eventCodeInput.value.trim();
    const email = emailInput.value.trim();
    
    // Validation checks
    if (!teamName) {
        logToConsole('Team name is required', 'error');
        regStatus.textContent = 'Invalid Input';
        return;
    }
    
    if (!teamSize || teamSize < 1 || teamSize > 4) {
        logToConsole('Team size must be between 1 and 4', 'error');
        regStatus.textContent = 'Invalid Team Size';
        return;
    }
    
    // BUG: Using == allows type coercion, should use ===
    if (eventCode == "ISTE-2026") {
        logToConsole(`Event code verified: ${eventCode}`, 'success');
    } else {
        logToConsole('Invalid event code. Use format: ISTE-2026', 'error');
        regStatus.textContent = 'Invalid Code';
        return;
    }
    
    if (!validateEmail(email)) {
        logToConsole('Invalid email format', 'error');
        regStatus.textContent = 'Invalid Email';
        return;
    }
    
    // If all validations pass
    logToConsole(`Registration submitted for team: ${teamName}`, 'success');
    logToConsole(`Team size: ${teamSize} members`, 'success');
    logToConsole(`Contact email: ${email}`, 'success');
    
    regStatus.textContent = 'Registered Successfully!';
    regStatus.style.color = 'var(--success)';
    eventStatus.textContent = 'Completed';
    eventStatus.style.background = 'var(--success)';
    
    // Disable form after successful submission
    setTimeout(() => {
        logToConsole('Form locked after successful registration', 'info');
        disableForm();
    }, 2000);
}

// Disable form inputs
function disableForm() {
    teamNameInput.disabled = true;
    teamSizeInput.disabled = true;
    eventCodeInput.disabled = true;
    emailInput.disabled = true;
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.5';
    submitBtn.style.cursor = 'not-allowed';
}

// Event Listeners
form.addEventListener('submit', handleFormSubmit);
submitBtn.addEventListener('click', handleFormSubmit);

teamNameInput.addEventListener('input', updateValidationUI);
teamSizeInput.addEventListener('input', () => {
    updateValidationUI();
    updateParticipantCount();
});
eventCodeInput.addEventListener('input', updateValidationUI);
emailInput.addEventListener('input', updateValidationUI);

// Initialize countdown on page load
startCountdown();

// Set initial stroke dasharray for countdown ring
countdownRing.style.strokeDasharray = circumference;
countdownRing.style.strokeDashoffset = 0;

// Initial console message
logToConsole('Welcome to COLLOQUIUM 2026 Registration', 'info');
logToConsole('Please fill out all required fields', 'info');