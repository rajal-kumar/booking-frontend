# Booking Management Frontend (Next.js)

A clean, responsive frontend for managing car bookings — built with Next.js (App Router), Tailwind CSS, and TypeScript. Designed with modularity, scalability, and enterprise readability in mind.

## 🚀 Live Demo

- Frontend: <https://booking-frontend-me59ib22v-rajal-kumars-projects.vercel.app/>

## 🛠 Tech Stack

- Next.js (App Router)
- Tailwind CSS
- TypeScript
- Vercel (Hosting)

## ⚙️ Features

- Card & table views for bookings
- Component-based architecture (BookingCard, CarCard, ServiceCard)
- Mobile-friendly and responsive design
- New booking form with validation, toast notifications, and animations
- Light/Dark mode support
- API integration with a Rails backend

## 🔗 API Endpoints Used

- `GET /api/v1/cars`
- `GET /api/v1/services`
- `GET /api/v1/bookings`
- `POST /api/v1/bookings`

## 🧑‍💻 Getting Started

```bash
git clone https://github.com/rajal-kumar/booking-frontend.git
cd booking-frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Why Next.js for this demo?

- Familiarity: Faster ramp-up, allowing me to focus on delivering UI polish and interactivity
- Modular Architecture: Easy to organize into reusable components and isolated routes
- Tailwind CSS: Fast prototyping and clean styling with built-in responsiveness
- Built-in Routing: No need for extra router packages
- Server Components + App Router: Helps separate logic and presentation cleanly
- Seamless Deployment: Deploys to Vercel in seconds with CI/CD

## Angular vs Next.js (from my perspective)

| Feature                        | Angular                            | Next.js                           |
|-------------------------------|------------------------------------|------------------------------------|
| Learning Curve                | Steeper (especially for new devs)  | Easier to ramp up                 |
| Modularity                    | Very structured                    | Flexible but clean                 |
| Styling                       | Uses Angular-specific stylesheets | Tailwind or any CSS works great    |
| Routing                       | Explicit via config                | File-based routing (faster dev)   |
| Performance Tuning            | Built-in tools                     | Better default DX (with Vercel)   |
| Ecosystem                     | Enterprise-level                   | Startup and enterprise friendly   |

> In this case, Next.js allowed me to focus on polish and speed of delivery without battling a new framework.
