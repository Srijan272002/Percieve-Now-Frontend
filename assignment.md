�� FULL-STACK DEVELOPER PROJECT ROUND
Title: “Make Intelligence Feel Inevitable.”
Welcome to your mission as a UX-Facing Systems Engineer at Perceive Now.
We don’t build dashboards.
We build decision engines wrapped in intuition—where every click can justify a million-dollar
strategy.
Now it’s your turn.

�� PART 1 — WIREFRAME THE TRUST UX
“Executives don’t want dashboards. They want proof.”
�� Your Task
Design and implement a React-based prototype UI that simulates our internal report viewer.
This should allow a user to:
1. Browse a set of synthetic reports (via mock JSON API)

2. Filter by tags: reportType, confidenceScore, industry

3. Click into a report → slide-out panel that shows:

o Report Summary

o A visual Confidence Meter (animated dial or color bar, 0–100%)
o A “Why We Trust This” tab with expandable source trace cards

o A feedback form (suggested improvements, flag errors)

Bonus if you implement dark mode using the Perceive Now palette:
 Purple: #3F1470

 Gold: #FFA301

Use clean enterprise styling (e.g., Tailwind, shadcn/ui, Chakra, or your own system).

⚙️ PART 2 — BACKEND STUB + AUTH
�� Your Task
Build a Node.js or Python backend that exposes:
 GET /reports → returns mock JSON (or SQLite)

 POST /feedback → accepts feedback object with reportId, userComment,
flaggedSection

 Middleware that logs each request’s latency + a UUID trace header

 Optional: JWT-based auth stub with two roles: viewer, reviewer (use hardcoded tokens)

Use any lightweight framework: Express, FastAPI, or Next.js API routes.