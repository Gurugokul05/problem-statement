# Pixelit Hackathon Website

Pixelit Hackathon Website is a web-based application developed to manage hackathon activities such as problem statement selection, attendance tracking, and marks evaluation. The platform provides a simple interface for both participants and admins to efficiently manage hackathon workflows.

---

## Features

### Participant
- View available problem statements
- Select a problem statement
- View attendance status
- View marks and evaluation results

### Admin
- Add and manage problem statements
- Mark attendance for participants
- Upload and update marks
- View participant details in real time

> Note: This project does not use Firebase Authentication. Participants are identified using custom IDs such as Roll Number or Team ID.

---

## System Overview

- Frontend built using React.js
- Firebase used as backend service
- Firestore Database used for storing all data
- Access control handled through application logic without authentication

---

## Tech Stack

- Frontend: React.js
- Backend: Firebase
- Database: Firestore Database

---


---

## Setup Instructions

1. Clone the repository  
```bash
git clone https://github.com/Gurugokul05/problem-statement.git
```

2. Install dependencies  
```bash
npm install
```

3. Configure Firebase  
```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID"
};
```

4. Run the application  
```bash
npm start
```

---

## Future Enhancements

- Firebase Authentication
- Role-based access control
- Team-wise evaluation
- Attendance and marks export
- Leaderboard system

---

## Use Case

This application is suitable for:
- College hackathons
- Technical symposiums
- Coding competitions
- Internal academic events

---

## Conclusion

Pixelit Hackathon Website provides a simple, scalable, and real-time solution for managing hackathons without authentication complexity, making it ideal for academic and internal use.
