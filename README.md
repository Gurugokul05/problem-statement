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

## Firestore Database Schema

### users
```json
{
  "userId": "PXL101",
  "name": "John Doe",
  "selectedProblem": "PS01"
}
```

### problems
```json
{
  "problemId": "PS01",
  "title": "Smart Waste Management",
  "description": "AI-based waste segregation system"
}
```

### attendance
```json
{
  "userId": "PXL101",
  "date": "2025-02-10",
  "status": "Present"
}
```

### marks
```json
{
  "userId": "PXL101",
  "score": 85,
  "remarks": "Good implementation"
}
```

---

## Admin Access (Without Authentication)

- Admin access is provided through a dedicated admin page
- Verification is handled using a predefined admin key or internal flag
- Firebase Authentication is intentionally not used to keep the system lightweight

---

## Setup Instructions

1. Clone the repository  
```bash
git clone https://github.com/your-username/pixelit-hackathon.git
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
