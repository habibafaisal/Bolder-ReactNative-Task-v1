# React Native Mid/Senior Technical Assessment

Welcome! This challenge is designed to evaluate your ability to build a small React Native feature using industry-standard practices.

---

## 🧠 Objective
Build a mini-profile manager for a fitness app using React Native CLI and Redux Toolkit.

---

## ⏱ Time Limit
**You have 48 hours** from the time you fork this repository.

---

## 🛠️ Features to Implement

### 1. Multi-Screen Navigation
- Set up React Navigation (native stack)
- Screens: `Dashboard`, `Profile`
- Add a bottom tab navigation between the screens

### 2. State Management (Redux Toolkit)
- Store user profile data: `{ name, age, fitnessLevel }`
- Create Redux slices and connect them using Provider
- Show profile data in `Profile` screen

### 3. Async Storage
- On app load, load profile data from AsyncStorage and update Redux state
- On profile update, persist changes to AsyncStorage

### 4. UI Requirements
- Clean and responsive layout
- Form in `Profile` to update user name and fitness level
- Dashboard displays welcome message: “Welcome, [UserName]!”

---

## 🧪 Bonus Features (Optional but appreciated)
- Create a custom hook `useUserProfile()` to encapsulate profile logic
- Add a theme toggle (dark/light mode using Context API or Redux)
- Add basic unit tests for Redux slice

---

## 🔍 Evaluation Criteria
- 🔧 Functional correctness
- 📁 Code structure and separation of concerns
- 🧼 Code clarity and maintainability
- 🔄 Async logic handling
- 🔄 Redux Toolkit best practices
- 🎨 UI polish and responsiveness

---

## 🧪 Submission Instructions
1. Fork this repo.
2. Complete the challenge within 48 hours.
3. Push your code to your fork.
4. Record a short Loom (3–5 mins) walkthrough of your code.
5. Submit the repo and video link via the [Final Submission Form](#).

---

## ❗ Rules
- Do **not** use AI-generated code directly — we’re interested in your problem-solving.
- Use only open-source libraries.
- Include comments where relevant.
- Treat it as you would a real-world client feature task.

Good luck — we’re excited to see how you think and build! 💪
