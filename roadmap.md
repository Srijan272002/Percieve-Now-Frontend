# Project Roadmap: "Make Intelligence Feel Inevitable"

This roadmap outlines the steps to complete the Perceive Now Full-Stack Developer Project using **React + Tailwind CSS** for the frontend and **Express** for the backend. Mock data will be used for reports. JWT-based authentication is **not required**.

---

## 1. Project Setup

### 1.1. Initialize Repositories
- Create a root project directory with `frontend/` and `backend/` subfolders.
- Initialize Git and set up `.gitignore` for Node and React projects.

### 1.2. Tooling
- Set up package managers (`npm` or `yarn`) in both frontend and backend.
- Add README files with setup instructions.

---

## 2. Backend (Express)

### 2.1. Project Initialization
- Initialize a new Express project in `backend/`.
- Install dependencies: `express`, `cors`, `uuid`, `morgan` (for logging), `nodemon` (for development).

### 2.2. Mock Data
- Create a `mockReports.json` file with a variety of synthetic reports, each containing:
  - `id`, `title`, `reportType`, `confidenceScore`, `industry`, `summary`, `sources` (for trace cards)

### 2.3. API Endpoints
- **GET `/reports`**: Return the list of mock reports as JSON.
- **POST `/feedback`**: Accept feedback with `reportId`, `userComment`, and `flaggedSection`.

### 2.4. Middleware
- Add middleware to log each request’s latency and attach a UUID trace header.
- Use `morgan` or custom middleware for logging.

### 2.5. CORS
- Enable CORS for local frontend-backend communication.

### 2.6. Testing
- Test endpoints with Postman or curl.

---

## 3. Frontend (React + Tailwind CSS)

### 3.1. Project Initialization
- Create a new React project in `frontend/` (e.g., with Vite or Create React App).
- Install Tailwind CSS and configure it.

### 3.2. UI Structure
- **Sidebar/Navigation**: Minimal, focus on report browsing.
- **Report List View**:
  - Fetch and display reports from the backend.
  - Implement filtering by `reportType`, `confidenceScore`, and `industry`.
- **Report Detail Slide-Out Panel**:
  - Show report summary.
  - Visual Confidence Meter (animated dial or color bar, 0–100%).
  - "Why We Trust This" tab with expandable source trace cards.
  - Feedback form (suggestions, flag errors).

### 3.3. State Management
- Use React state/hooks for UI state.
- Optionally use Context API for global state (e.g., dark mode).

### 3.4. Styling
- Use Tailwind CSS for clean, enterprise styling.
- Implement dark mode toggle using Perceive Now palette:
  - Purple: `#3F1470`
  - Gold: `#FFA301`

### 3.5. Animations & UX
- Animate the confidence meter.
- Smooth transitions for slide-out panel and expandable cards.

### 3.6. API Integration
- Connect frontend to backend endpoints for reports and feedback.

### 3.7. Testing
- Test UI interactions and API integration.

---

## 4. Final Steps

### 4.1. Polish & Documentation
- Add comments and documentation.
- Ensure code is clean and readable.
- Update README with setup, run, and test instructions.

### 4.2. Proof of Life
- Record a 2-minute Loom walkthrough explaining design and technical decisions.

### 4.3. Submission
- Push code to GitHub.
- Share repo link, deployed link (if any), and Loom video as instructed.

---

## Reference
See [assignment.md](assignment.md) for the full project brief and requirements. 