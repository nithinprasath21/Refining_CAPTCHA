
# Refining CAPTCHA  

## Abstract  

**CAPTCHA (Completely Automated Public Turing Test to Tell Computers and Humans Apart)** is widely used to differentiate between human users and bots. Traditional CAPTCHA systems, such as the one currently implemented on the UIDAI website, rely on text-based challenges. However, these are increasingly prone to user errors and ineffective against advancing threats like OCR-based bypasses.  

Our proposed solution, **"Refining CAPTCHA,"** addresses these issues by introducing a **passive, minimal-interaction CAPTCHA system**. This approach analyzes user behavior patterns (e.g., mouse movements, keyboard dynamics) to generate a machine learning-based accuracy score for identifying bots.  

### Key Innovations  
1. **Honeypot Mechanism**: A hidden field visible only to bots, allowing detection and flagging of automated interactions.  
2. **Machine Learning Integration**: Scores users based on behavior metrics and evolves dynamically to handle emerging bot patterns.  
3. **Two-Level Verification**: A seamless scoring system complemented by a Drag & Drop Puzzle CAPTCHA when further verification is required.  
4. **UIDAI Privacy Compliance**: No cookies, anonymized data collection, and strict adherence to privacy policies. 


## Demo Video
https://github.com/user-attachments/assets/69499658-7c4f-45e7-b868-337f2b578d36


This solution ensures robust security against DDoS attacks while minimizing user friction and enhancing the user experience for legitimate users.  

# Table of Contents  

1. [Abstract](#abstract)  
2. [Idea Description](#idea-description)  
   - [The Problem](#the-problem)  
   - [The Solution](#the-solution)  
3. [Technical Implementation](#technical-implementation)  
   - [System Flow](#system-flow)  
4. [Key Features](#key-features)  
   - [Frontend Integration](#1-frontend-integration)  
   - [Backend ML Model](#2-backend-ml-model)  
   - [Adherence to UIDAI Privacy Policies](#3-adherence-to-uidai-privacy-policies)  
   - [Honeypot and Puzzle CAPTCHA](#4-honeypot-and-puzzle-captcha)  
5. [System Workflow](#system-workflow)  
   - [User Interaction](#user-interaction)  
   - [Data Analysis](#data-analysis)  
   - [Verification and Response](#verification-and-response)  
   - [Feedback Loop](#feedback-loop)  
6. [Benefits](#benefits)  
7. [Installation](#installation)  
   - [Prerequisites](#prerequisites)  
   - [Steps to Set Up](#steps-to-set-up)  
8. [Folder Structure](#folder-structure)  

---

## Idea Description  

### The Problem  
The UIDAI website currently uses a simple text CAPTCHA prone to bypasses from advancing technologies such as OCR and AntiCAPTCHA tools. This not only poses security risks but also frustrates users, particularly during high-traffic periods when repeated incorrect entries require resubmissions.  

### The Solution  
Our solution is a **passive CAPTCHA system** driven by machine learning that differentiates between bots and legitimate users through environmental and behavioral metrics.  

1. **Scoring-Based Detection**:  
   - Metrics such as session duration, typing speed, latency, click precision, and IP address are analyzed to produce a score between 0-1.  
     - **0.0 - 0.7**: Bot → Second-level verification (Honeypot + Puzzle CAPTCHA).  
     - **0.8 - 1.0**: Human → Access granted.  

2. **Two-Level Verification**:  
   - **Honeypot Mechanism**: Captures bot behavior through hidden fields visible only to bots.  
   - **Drag & Drop Puzzle CAPTCHA**: Tracks mouse movements and interactions to confirm human presence.  

3. **Continuous Model Improvement**:  
   - Data collected from bots is fed back into the ML model, ensuring adaptive learning and evolving security measures.  

4. **Privacy-First Approach**:  
   - No personal data collected.  
   - Logs anonymized and used solely for statistical purposes.  
   - No use of cookies or third-party data sharing.  

---

## Technical Implementation  

### System Flow  
1. **Frontend**: Collects real-time data using metrics like mouse movements, keystrokes, latency, and IP information.  
2. **Backend**: Processes the data using Node.js and stores it in MongoDB.  
3. **Machine Learning Model**:  
   - Developed with Python and TensorFlow using libraries like Keras and Scikit-learn.  
   - Generates a confidence score based on metrics like accuracy, F1 score, and specificity.  

4. **Verification Logic**:  
   - High-confidence human: Immediate access granted.  
   - Low-confidence: Trigger Honeypot and Drag & Drop CAPTCHA.  
   - Detected bots: Data flagged and fed into the ML model for future improvement.  

---

## Key Features  

### 1. **Frontend Integration**  
- Real-time interaction tracking using a JavaScript framework like React.  
- Captures environmental parameters (e.g., IP address, browser type).  

### 2. **Backend ML Model**  
- Analyzes interaction data to classify users as humans or bots.  
- Modular design ensures seamless integration with existing systems.  

### 3. **Adherence to UIDAI Privacy Policies**  
- Collects only anonymized, non-personal data.  
- Ensures full compliance with UIDAI’s core guidelines.  

### 4. **Honeypot and Puzzle CAPTCHA**  
- Hidden Honeypot fields detect and flag bots.  
- Drag & Drop puzzles provide minimal interaction verification for uncertain cases.  

---

## System Workflow  

1. **User Interaction**  
   - The user enters the website and begins interacting with the login portal.  
   - Behavior data is collected passively until the user submits the form.  

2. **Data Analysis**  
   - Metrics are processed in the backend and sent to the ML model for scoring.  

3. **Verification and Response**  
   - High Score: User granted access.  
   - Low Score: Honeypot and Puzzle CAPTCHA activated.  

4. **Feedback Loop**  
   - Data from bots feeds back into the ML model for continuous improvement.  

---

## Benefits  

- **Enhanced Security**: Advanced bot detection protects against DDoS/DoS attacks and zero-day vulnerabilities.  
- **Improved User Experience**: Minimal interaction for legitimate users ensures seamless access.  
- **Privacy Compliance**: Adheres strictly to UIDAI guidelines, safeguarding user data.  
- **Adaptive Learning**: Continuous model training improves resilience against evolving threats.  

---

## Installation  

### Prerequisites  
- **Node.js** (latest stable version)  
- **npm** (Node Package Manager)  

### Steps to Set Up  

1. Clone this repository:  
   ```bash  
   git clone https://github.com/nithinprasath21/Refining_CAPTCHA.git
   cd Refining_CAPTCHA 
   ```  

2. Install dependencies:  
   ```bash  
   npm install express  
   npm install cors  
   ```  

3. Start the server:  
   ```bash  
   node server.js  
   ```  

4. Ensure the ML model is set up and accessible via its API endpoint.  

---

## Folder Structure  
```
root  
│  
├── backend/  
│   ├── server.js         # Back-end server file  
├── package.json      # Dependencies and scripts  
├── public/           # Static files served by the server  
├── src/  
│   ├── components/   # Front-end React components  
│   ├── utils/        # Utility scripts for behavior tracking  
│   ├── App.js        # Main React application logic  
│   └── index.js      # React entry point  
└── README.md         # Project documentation  
```  

---
**Refining CAPTCHA**: A seamless, privacy-first, and adaptive approach to modern bot detection.  
