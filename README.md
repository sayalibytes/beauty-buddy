# beauty-buddy

### Project Proposal for Skincare Application

#### Project Title
**BeautyBuddy: Your Personalized Skincare Companion**

## Overview
**BeautyBuddy** is an intuitive and personalized skincare application designed to help users create, practice, and maintain effective beauty routines. By leveraging user-specific data, the app provides customized skincare routine checks, product expiry tracking, skincare recommendations, and insightful skincare blogs. Our goal is to empower users to feel confident about their appearance through consistent and informed skincare practices.

### Problem
With a myriad of skincare products and routines available, individuals often struggle to find and maintain the right regimen for their skin type. Missing routine checks, using expired products, and lacking personalized skincare advice are common issues. BeautyBuddy addresses these pain points by offering a tailored approach to skincare, ensuring users stick to effective routines and make informed decisions about their skincare products.

### User Profile
**Target Audience:**
- Adults
- Skincare enthusiasts
- Individuals seeking to improve their skincare routines

**User Interaction:**
- Users will log in to access personalized skincare routines and reminders.
- Users can track their daily skincare activities, product usage, and expiry dates.
- Users will receive recommendations based on their skincare concerns.
- General users can read blogs and articles on skincare.

**Special Considerations:**
- User-friendly interface for ease of navigation.
- Secure storage and access to personal data.
- Mobile responsiveness for accessibility on various devices.

### Features
1. **User Authentication:**
   - Registration and login with username, ID, password, and profile image.
   - Authorization access to ensure data privacy.

2. **Skincare Routine Management:**
   - Preset and custom skincare routines for different needs (health, face, hair, body, hands, and feet).
   - Routine planning with flexible schedules.
   - Automatic reminders for routine checks.

3. **Product Tracking:**
   - Add products to a personal list and link them to routines.
   - Track product expiry dates and receive notifications.
   - Set timers for products requiring specific wait times.
   - Archive unused products and add personal notes.

4. **Journal and Insights:**
   - Daily progress photos and symptom logging.
   - Comprehensive tracking of lifestyle choices affecting skin condition.
   - Analysis of habit formation and skincare routine effectiveness.

5. **Skincare Recommendations:**
   - Personalized advice based on user-specific skincare concerns.

6. **Skincare Blog:**
   - General articles and tips on skincare.

### Implementation

#### Tech Stack
- **Frontend:** React.js, React-Router-Dom
- **Backend:** Node.js, Express
- **Database:** MySQL
- **Libraries and Tools:** Axios (for API requests), JWT (for authentication), bcrypt (for password hashing), Multer (for image uploads)

#### APIs
- External skincare product databases for recommendations (if applicable).
- Internal APIs for handling user data and routines.

### Sitemap
1. **HomePage:** General information about the app.
2. **Register:** User registration form.
3. **Login:** User login form.
4. **Dashboard:** User-specific greeting and overview of routines and product tracking.
5. **Routines:** Page to manage skincare routines.
6. **Products:** Page to add and track products.
7. **Journal:** Page for logging daily progress and viewing insights.
8. **Blog:** General skincare articles.

### Mockups
Visual representations of the app’s screens can be created using Figma or similar design tools. 

### Data
- **Users:** UserID, Username, Password, Profile Image
- **Routines:** RoutineID, UserID, RoutineName, RoutineDetails, Schedule
- **Products:** ProductID, UserID, ProductName, ExpiryDate, Notes
- **Journal Entries:** EntryID, UserID, Date, Photos, Symptoms, Notes

### Endpoints
1. **User Registration:** `POST /register`
   - Request: { username, password, profileImage }
   - Response: { success, message }

2. **User Login:** `POST /login`
   - Request: { username, password }
   - Response: { token, userID }

3. **Get User Routines:** `GET /users/:id/routines`
   - Response: { routines }

4. **Add Routine:** `POST /users/:id/routines`
   - Request: { routineDetails }
   - Response: { success, message }

5. **Track Product Expiry:** `GET /users/:id/products`
   - Response: { products }

6. **Add Product:** `POST /users/:id/products`
   - Request: { productDetails }
   - Response: { success, message }

7. **Journal Entry:** `POST /users/:id/journal`
   - Request: { entryDetails }
   - Response: { success, message }

### Auth
Authentication will be implemented using JWT tokens for secure access. Passwords will be hashed using bcrypt to ensure user security.

## Roadmap
### Sprint 1: Initial Setup and Basic Functionality (May 30 - June 5)
- Set up project repository and environment.
- Implement user registration and login functionalities.
- Create the homepage and basic routing structure.

### Sprint 2: Routine and Product Management (June 6 - June 10)
- Develop routines and product tracking features.
- Implement reminder notifications.
- Create the journal entry system.

### Sprint 3: Insights and Recommendations (June 11 - June 13)
- Implement insights and tracking features.
- Develop the recommendation system.
- Finalize the skincare blog section.

### Sprint 4: Testing and Final Touches (June 14)
- Thorough testing and bug fixing.
- Finalize UI/UX design.
- Prepare for project submission.

## Nice-to-haves
- Integration with external skincare product databases.
- Advanced insights and analytics.
- Enhanced UI/UX with animations and transitions.
