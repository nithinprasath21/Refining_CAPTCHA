let lastMouseX = null; // Last mouse X coordinate
let lastMouseY = null; // Last mouse Y coordinate
let mouseMovementCount = 0; // Counter for mouse movements

function getScreenResolution() {
    const width = window.screen.width;
    const height = window.screen.height;
    return `${width} x ${height}`;
}

function getOS() {
    const userAgent = navigator.userAgent;
    let os = "Unknown OS";
    if (userAgent.indexOf("Win") !== -1) os = "Windows";
    else if (userAgent.indexOf("Mac") !== -1) os = "MacOS";
    else if (userAgent.indexOf("X11") !== -1 || userAgent.indexOf("Linux") !== -1) os = "Linux";
    else if (userAgent.indexOf("Android") !== -1) os = "Android";
    else if (userAgent.indexOf("like Mac") !== -1) os = "iOS";
    return os;
}

const startTime = performance.now();
let lastTime = startTime;
let firstKeystrokeTime = null; // Time of the first keystroke
const timeDifferences = [];
let totalCharactersTyped = 0;
let totalTypingDuration = 0; // Total typing duration
let interKeyDelays = []; // Array to store inter-key delays
let keyHoldTimes = []; // Array to store key hold times
let timeToStartTyping = null; // Time to start typing
let clickPrecision = 0; // Click precision in pixels
let clickSpeed = 0; // Click speed in milliseconds
let lastClickTime = 0; // Time of the last click

// Mouse movement tracking variables
let mousePathLength = 0; // Total distance moved by mouse cursor
let mouseMovementCoordinates = []; // Array to store mouse coordinates
let isLinearMovement = true; // Check for linear movement
let hoverStartTime = null; // Start time for hover
let mouseHoverTimeTextBox = 0; // Hover time over text box
let mouseHoverTimeSubmitButton = 0; // Hover time over submit button

// Focus changes tracking
let focusChangeTime = 0; // Time taken to focus the text box and click submit
let focusStartTime = null; // Time when the text box is focused

// Error correction tracking
let errorCorrections = 0; // Count of corrections made
let ipData = {}; // Variable to store IP data

const inputField = document.getElementById('aadhar_number'); // Updated ID
const submitButton = document.querySelector('.login-button'); // Updated class

// Prevent copy-paste and browser suggestions
inputField.setAttribute('autocomplete', 'off'); // Prevent browser suggestions
inputField.addEventListener('paste', function(event) {
    event.preventDefault();
});

// Fetch the IP address from the API
fetch("https://ipinfo.io/json")
    .then(response => response.json())
    .then(data => {
        ipData = data; // Store the IP data
        console.log("IP Address:", ipData.ip);
        console.log("IP Information:", ipData);
    })
    .catch(error => {
        console.error("Error fetching IP address:", error);
    });

// Mouse movement tracking
document.addEventListener('mousemove', function(event) {
    mouseMovementCount++; // Increment the mouse movement count

    if (lastMouseX !== null && lastMouseY !== null) {
        const dx = event.clientX - lastMouseX;
        const dy = event.clientY - lastMouseY;
        mousePathLength += Math.sqrt(dx * dx + dy * dy); // Calculate distance moved

        // Check for linearity
        if (Math.abs(dx) > Math.abs(dy)) {
            isLinearMovement = isLinearMovement && (Math.abs(dy) < 10); // Check if movement is mostly horizontal
        } else {
            isLinearMovement = isLinearMovement && (Math.abs(dx) < 10); // Check if movement is mostly vertical
        }
    }

    // Only store coordinates every 10 movements
    if (mouseMovementCount % 10 === 0) {
        mouseMovementCoordinates.push({ x: event.clientX, y: event.clientY }); // Store coordinates
    }

    lastMouseX = event.clientX;
    lastMouseY = event.clientY;
});

// Event listener for keydown to track key hold time
inputField.addEventListener('keydown', function(event) {
    const keyHoldStartTime = performance.now(); // Start time for key hold

    // Event listener for keyup to calculate key hold time
    inputField.addEventListener('keyup', function() {
        const keyHoldEndTime = performance.now(); // End time for key hold
        const keyHoldTime = (keyHoldEndTime - keyHoldStartTime).toFixed(2); // Calculate key hold time
        keyHoldTimes.push(parseFloat(keyHoldTime)); // Store key hold time in array

        // Check for backspace key
        if (event.key === 'Backspace') {
            errorCorrections++; // Increment error correction count
        }
    }, { once: true }); // Use { once: true } to ensure it only runs once per key press
});

// Event listener for input changes
inputField.addEventListener('input', function(event) {
    const currentTime = performance.now();
    
    // Record the time of the first keystroke
    if (totalCharactersTyped === 0) {
        firstKeystrokeTime = currentTime;
        timeToStartTyping = firstKeystrokeTime - startTime; // Calculate time to start typing
    }

    // Calculate time difference and push to array
    const timeDiff = (currentTime - lastTime).toFixed(2);
    timeDifferences.push(parseFloat(timeDiff));
    
    // Calculate inter-key delay
    if (totalCharactersTyped > 0) {
        const interKeyDelay = currentTime - lastTime;
        interKeyDelays.push(interKeyDelay);
    }

    lastTime = currentTime;
    totalCharactersTyped++; // Increment character count

    // Calculate total typing duration
    totalTypingDuration = currentTime - firstKeystrokeTime;
});

// Click event for input field
inputField.addEventListener('click', function(event) {
    const currentClickTime = performance.now();
    if (lastClickTime) {
        clickSpeed = currentClickTime - lastClickTime; // Calculate click speed
    }
    lastClickTime = currentClickTime;

    const rect = inputField.getBoundingClientRect();
    clickPrecision = Math.sqrt(Math.pow(event.clientX - (rect.left + rect.width / 2), 2) + Math.pow(event.clientY - (rect.top + rect.height / 2), 2)); // Calculate precision

    // Start hover timer
    hoverStartTime = currentClickTime;

    // Start focus timer
    if (!focusStartTime) {
        focusStartTime = currentClickTime; // Record focus start time
    }
});

// Click event for submit button
submitButton.addEventListener('click', function(event) {
    const currentClickTime = performance.now();
    if (lastClickTime) {
        clickSpeed = currentClickTime - lastClickTime; // Calculate click speed
    }
    lastClickTime = currentClickTime;

    const rect = submitButton.getBoundingClientRect();
    clickPrecision = Math.sqrt(Math.pow(event.clientX - (rect.left + rect.width / 2), 2) + Math.pow(event.clientY - (rect.top + rect.height / 2), 2)); // Calculate precision

    // Calculate hover time for submit button
    mouseHoverTimeSubmitButton += currentClickTime - hoverStartTime; // Add hover time

    // Calculate focus change time
    focusChangeTime = currentClickTime - focusStartTime; // Time taken from focus to submit
});

// Mouse hover events for input field
inputField.addEventListener('mouseenter', function() {
    hoverStartTime = performance.now(); // Start hover timer
});

inputField.addEventListener('mouseleave', function() {
    const hoverEndTime = performance.now(); // End hover timer
    mouseHoverTimeTextBox += hoverEndTime - hoverStartTime; // Add hover time
});

// Mouse hover events for submit button
submitButton.addEventListener('mouseenter', function() {
    hoverStartTime = performance.now(); // Start hover timer
});

submitButton.addEventListener('mouseleave', function() {
    const hoverEndTime = performance.now(); // End hover timer
    mouseHoverTimeSubmitButton += hoverEndTime - hoverStartTime; // Add hover time
});

// Event listener for form submission
document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const endTime = performance.now();
    const timeTaken = (endTime - startTime) / 1000; // Convert to seconds
    const typingSpeed = totalCharactersTyped / (totalTypingDuration / 1000); // Calculate CPS

    // Calculate average inter-key delay and idle time
    const averageInterKeyDelay = interKeyDelays.length > 0 ? interKeyDelays.reduce((a, b) => a + b) / interKeyDelays.length : 0;
    const averageIdleTime = timeDifferences.length > 1 ? timeDifferences.reduce((a, b) => a + b) / (timeDifferences.length - 1) : 0;

    // Prepare data to send to the backend
    const dataToSend = {
        screenResolution: getScreenResolution(),
        operatingSystem: getOS(),
        ipAddress: ipData.ip || "N/A",
        ipInformation: ipData,
        timeTaken,
        totalCharactersTyped,
        totalTypingDuration,
        averageInterKeyDelay,
        averageIdleTime,
        timeToStartTyping,
        clickPrecision,
        clickSpeed,
        mousePathLength,
        isLinearMovement,
        mouseHoverTimeTextBox,
        mouseHoverTimeSubmitButton,
        focusChangeTime,
        errorCorrectionRate: ((errorCorrections / totalCharactersTyped) * 100).toFixed(2),
        mouseMovementCoordinates,
        keyHoldTimes: keyHoldTimes.map(time => time.toFixed(2)),
        typingSpeed,
        timeDifferences
    };

    // Send data to backend API
    fetch("http://localhost:3000/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dataToSend)
    })
    .then(response => response.json())
    .then(result => {
        console.log("Data submitted successfully:", result);
    })
    .catch(error => {
        console.error("Error submitting data:", error);
    });
});