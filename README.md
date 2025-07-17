# Perceive Now Report Viewer

A full-stack application simulating an internal report viewer for executives, focused on trust, traceability, and explainability. Built for the Perceive Now Full-Stack Engineer challenge.

## Features
- Browse and filter synthetic intelligence reports
- Slide-out report detail panel with summary, confidence meter, source trace, and feedback form
- Animated confidence meter and expandable source cards
- Custom dark mode/light mode switch 

## Tech Stack
- **Frontend:** React, TypeScript, Tailwind CSS, styled-components, Vite
- **Backend:** Node.js, Express, TypeScript, UUID, Morgan



## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Setup
1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd assignment
   ```
2. **Install dependencies:**
   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```
3. **Run the backend:**
   ```bash
   cd backend
   npm run dev
   ```
4. **Run the frontend:**
   ```bash
   cd frontend
   npm run dev
   ```
5. **Open in browser:**
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend: [http://localhost:3001](http://localhost:3001)

## Usage
- Browse and filter reports by type, confidence, and industry
- Click a report to view details, sources, and submit feedback
- Toggle dark/light mode using the custom switch in the sidebar
