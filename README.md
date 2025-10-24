# Secure Stats Portal

A secure, modern web analytics dashboard with an authentication system to monitor website statistics.

---

## Overview

The **Secure Stats Portal** is a two-part application consisting of:

1. **Authentication System** – Secure login with encryption key and dynamic code  
2. **Analytics Dashboard** – Beautiful statistics interface with charts and data visualization

---

## Features

### Authentication System
- Dual-layer security (Encryption Key + Dynamic Security Code)
- Session management with timeout
- Security restrictions against developer tools
- Real-time session timer

### Analytics Dashboard
- **Visitor Statistics:** Total visitors, unique visitors, session duration, bounce rate  
- **Interactive Charts:**
  - Traffic overview with line charts  
  - Traffic sources with doughnut charts  
  - Top countries with horizontal bar charts  
- **Data Tables:** Top pages performance and device/browser analytics  
- **Responsive Design:** Works on desktop and mobile devices

---

## Tech Stack

**Frontend:** HTML5, CSS3, JavaScript (ES6+)  
**Charts:** Chart.js for data visualization  
**Icons:** Font Awesome  
**Security:** SHA-256 encryption, session validation

---

## Project Structure

SecAuthStats/
├── Auth/
│     ├── auth.html 
│     ├── auth.css
│     └── auth.js
|
└── stats/
      ├── stats.html
      ├── stats.css
      └── stats.js

---

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (for security features to work properly)

### Installation

1. Clone or download the project files  
2. Set up a local web server (you can use Python, Node.js, or any web server)  
3. Open `Auth/auth.html` in your browser through the local server  

---

## Default Credentials

| Field | Default Value |
|-------|----------------|
| **Encryption Key** | `1234567890abcdef` |
| **Dynamic Security Code** | `1234567890abcdef` |

---

## Security Features

- Developer tools restriction  
- Copy-paste prevention in password fields  
- Session timeout (10 minutes)  
- SHA-256 session token validation  
- Context menu disabled  

---

## Usage

1. **Login:** Enter the encryption key and dynamic security code  
2. **View Dashboard:** Monitor your website analytics  
3. **Filter Data:** Use the time period selector for different date ranges  
4. **Refresh:** Click the refresh button to update statistics  
5. **Logout:** Secure logout with session cleanup  

---

## Browser Compatibility

| Browser | Version |
|----------|----------|
| Chrome | 60+ |
| Firefox | 55+ |
| Safari | 12+ |
| Edge | 79+ |

---

## Contributing

Contributions are welcome!  
Feel free to:
- Submit issues  
- Fork the repository  
- Create pull requests for improvements  

---

## License

This project is open source and available under the **MIT License**.

---

## Disclaimer

> **Note:**  
> This is a demonstration project. For production use, consider implementing additional security measures such as:
> - Backend authentication  
> - Database integration  
> - Rate limiting  
> - HTTPS enforcement  

Always follow industry best practices for production-level security.

---
