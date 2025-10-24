# Security Policy

This document outlines the security practices, configuration, and guidelines for the **Secure Stats Portal**.

---

## Overview

The Secure Stats Portal is designed with **front-end security layers** to protect access and manage user sessions.  
It demonstrates how to apply lightweight security mechanisms in a client-side analytics system.

---

## Security Architecture

### 1. Dual-Layer Authentication
- **Encryption Key:** Primary security credential (simulates a password).
- **Dynamic Security Code:** Secondary factor for enhanced security.

Both values are validated locally using **SHA-256 hashing** for integrity.

---

### 2. Session Management
- Sessions are stored securely in memory.
- Session timeout after **10 minutes** of inactivity.
- Automatic logout on session expiration.
- Real-time session timer displayed on the dashboard.

---

### 3. Browser & Developer Tool Restrictions
- Prevents opening of developer tools via key events (F12, Ctrl+Shift+I, etc.)
- Disables right-click context menu.
- Copy-paste is blocked on sensitive input fields.
- Detects window resizing that might indicate console inspection.

---

### 4. Data Security
- All sensitive keys are hashed using **SHA-256**.
- Session tokens are validated before granting access to dashboard pages.
- No sensitive data is stored in plain text.

---

## Recommended Additional Measures (for Production)

If you plan to extend this demo to a production-grade system, consider the following:

1. **Backend Integration**
   - Implement server-side authentication (e.g., OAuth2, JWT).
   - Use HTTPS for encrypted communication.

2. **Database Security**
   - Store user credentials in a secure database with salted hashing.
   - Use prepared statements to prevent SQL Injection (if backend added).

3. **Rate Limiting & Throttling**
   - Limit login attempts to prevent brute-force attacks.
   - Use CAPTCHA for added human verification.

4. **Advanced Monitoring**
   - Implement request logging.
   - Add alert mechanisms for suspicious activity.

5. **Security Headers**
   - Use CSP, X-Frame-Options, X-Content-Type-Options, and HSTS headers.

---

## Reporting a Vulnerability

If you discover a security issue with this project:

1. Create an issue with the label `security`.
2. Describe the problem clearly and provide steps to reproduce.
3. Do **not** share any sensitive details publicly.

---

## Disclaimer

> The Secure Stats Portal is an **educational project** intended for learning front-end security techniques.  
> It should not be used in environments where sensitive data is handled.  
> Always implement **backend validation** and **HTTPS encryption** in production.

---

**Stay Secure. Encrypt Everything.**
