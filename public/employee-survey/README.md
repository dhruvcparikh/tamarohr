# Employee Engagement Survey Tool

## Firebase Setup Instructions

### 1. Create Firebase Project

1. Go to https://console.firebase.google.com/
2. Click "Add project"
3. Enter project name (e.g., "employee-survey-tool")
4. Disable Google Analytics (optional)
5. Click "Create project"

### 2. Enable Firestore Database

1. In Firebase Console, click "Firestore Database"
2. Click "Create database"
3. Start in **production mode**
4. Choose your location
5. Click "Enable"

### 3. Set Up Firestore Security Rules

Go to "Firestore Database" > "Rules" and paste:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /surveys/{surveyId} {
      // Allow anyone to read survey data (for loading the survey)
      allow read: if true;
      
      // Allow anyone to create new surveys
      allow create: if true;
      
      // Allow anyone to update surveys (for adding responses)
      allow update: if request.resource.data.diff(resource.data).affectedKeys()
        .hasOnly(['responses']);
    }
  }
}
```

### 4. Get Firebase Configuration

1. Click the gear icon ⚙️ > "Project settings"
2. Scroll to "Your apps"
3. Click the web icon `</>`
4. Register app (nickname: "Employee Survey")
5. Copy the `firebaseConfig` object

### 5. Update HTML Files

Replace the `firebaseConfig` in these files:
- `index.html` (line ~140)
- `survey.html` (line ~680)

Replace:
```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

With your actual Firebase config.

### 6. Deploy to Firebase Hosting

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Initialize Firebase in your project folder:
```bash
firebase init
```

Select:
- Hosting
- Use existing project (select your project)
- Public directory: `.` (current directory)
- Configure as single-page app: `No`
- Set up automatic builds: `No`
- Don't overwrite existing files

4. Deploy:
```bash
firebase deploy
```

Your survey tool will be live at: `https://YOUR_PROJECT_ID.web.app`

## Firestore Data Structure

```
surveys (collection)
  └── {documentId}
      ├── surveyCode: "ABC12345"
      ├── creatorEmail: "admin@company.com"
      ├── createdAt: timestamp
      ├── status: "active"
      └── responses: [
          {
            fingerprint: "abc123...",
            answers: {
              q1: 5,
              q2: 4,
              q3: 5,
              ...
            },
            submittedAt: "2024-01-08T10:30:00Z"
          }
        ]
```

## How One-Response-Per-User Works

The system uses browser fingerprinting to prevent duplicate responses:

1. **Fingerprint Generation**: Creates a unique hash from:
   - User agent
   - Language
   - Screen resolution
   - Timezone offset
   - Hardware concurrency

2. **Check on Load**: When survey loads, checks if fingerprint exists in responses array

3. **Block Duplicates**: If fingerprint found, shows "already completed" message

**Note**: This is browser-based prevention. Users can bypass by:
- Clearing browser data
- Using different browsers/devices
- Using incognito mode

For stronger prevention, you'd need user authentication.

## Next Steps (Optional)

### Email Reports with Cloud Functions

To send email reports automatically:

1. Install Firebase Extensions "Trigger Email"
2. Configure SendGrid/Mailgun
3. Create Cloud Function to:
   - Aggregate responses
   - Calculate percentages
   - Generate HTML report
   - Send email to creator

Would you like me to create the Cloud Function code for email reports?

## Features Included

✅ Modern, minimalist design
✅ Mobile responsive
✅ Progress bar
✅ Smooth animations
✅ One response per user (browser fingerprint)
✅ Anonymous responses
✅ Firestore integration
✅ Error handling
✅ Loading states

## Cost Estimate

Firebase free tier includes:
- 50,000 reads/day
- 20,000 writes/day
- 1GB stored data

For 100 employees × 10 surveys/month = 1,000 responses
**Cost: $0** (well within free tier)
