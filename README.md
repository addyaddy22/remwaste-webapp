# React + TypeScript + Vite

# React  Assessment Submission

## 🔧 Project Overview

This repository contains the solution to the React Developer assessment. The app is built using React (web version), and mimics expected mobile behaviors using responsive layouts and interactivity.

### My Approach

- I used TypeScript and modern React best practices including functional components and hooks.
- State management is handled using `useState` and `useEffect`.
- The app is responsive, optimized for readability, and built with accessibility and scalability in mind.
- All images and assets are dynamically handled via `import.meta.glob()` for better maintainability.
- I paid particular attention to UI/UX and used Tailwind CSS for quick prototyping and consistent theming (including dark mode).

---

## `.env` File Note

Please note that I **did not include a `.env` file** in the GitHub repository because:
- It is intentionally excluded via `.gitignore` for security reasons.
- Any values required from the environment (like API keys or base URLs) should be manually added in your local `.env` file during testing.

---

## 🗂 Repo Structure

├── public/
├── src/
    ├── App.tsx # Main component with logic and rendering
    ├── types/
    │ └── Skip.ts # Type definition for Skip object
    ├── constants/
    │ └── steps.ts # Step definitions with icons
    ├── utils/
    │ └── getSkipImage.ts # Image loader for skips
    assets/
    └── *.jpg # Skip size images
.env # Environment variables
├── .gitignore
├── package.json
└── README.md


## Getting Started

### 1. Clone the Repository


git clone https://github.com/your-username/skip-selection-app.git
cd skip-selection-app

### 2. Install Dependencies
npm install

### 3. Setup Environment Variables
-Create a .env file in the root
-add the following: VITE_API_URL=https://app.wewantwaste.co.uk/api
Note: .env is ignored by .gitignore and was not pushed to GitHub as explained above.

### 4. Start the App
npm run dev

## Live Preview
You can preview the working version via CodeSandbox:

## 🌐 CodeSandbox Link

I have created a live preview using [CodeSandbox](https://codesandbox.io), where the project can be tested directly in the browser:

👉 **Live Demo:** [Click to view the app](https://codesandbox.io/p/github/addyaddy22/remwaste-webapp)


---

## Extras

### Design Decisions

#### Modularization: 
  Split type declarations, constants, and utility functions into separate files to improve reusability and maintainability.

#### Environment Variable: 
  Introduced .env for flexible deployment and secure API URL management.

#### Accessibility: 
  Added aria roles to modal popup for better screen reader support.

#### Image Loading: 
  Used import.meta.glob to eagerly load images from assets/.





