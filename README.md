# Forms and Data Handling Tutorial and Assignment from The Odin Project.

**Objective**: Forms and managing them using Express. To understand proper form handling which is crucial for maintaining data integrity and protecting web applications from security risks.

Used `express-validator` for validation and sanitization.

## Validation

- Validation ensures user input meets the specified criteria (e.g. required fields, correct format)

## Sanitization

- Sanitization cleans user input to prevent malicious data from being processed by removing or encoding potentially malicious characters.

## Learnings

- Understand form elements, methods (`GET` and `POST`) and their actions.
- Validation and sanitization using `express-validator` library (validation chaining, accessing `req.body()` / `req.query()`, using `validationResult` object to handle validation errors.)
- Escape user input to prevent cross-site scripting (XSS) attacks by escaping the output (also referred to as encoding).
- Routers and controllers (Model-View-Controller pattern).

# Installation

1. Fork or clone repo

2. Run `npm install`

```bash
npm install
```

3. Run `node --watch app.js`

```bash
node --watch app.js
```
