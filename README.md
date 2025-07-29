# 🏢 Employee Management System

An advanced role-based employee management web application built for tracking employee workflow, managing payroll, verifying employees, and facilitating role-based dashboards for Admin, HR, and Employees.

🔗 **Live Site**: [https://root-6a2dc.web.app/]  

---

## 🔐 Admin Credentials

- **Admin Email**: `yanoor1@gmail.com`  
- **Admin Password**: `Mohima@1234`

---

## 🚀 Features

✅ Role-based Dashboard for Employee, HR, and Admin  
✅ Email/Password Registration with Role Selection (Employee/HR)  
✅ Firebase & JWT Authentication with Middleware Role Protection  
✅ Image Upload via **imgbb** (No URL upload allowed)  
✅ Responsive design for **Mobile**, **Tablet**, and **Desktop**  
✅ Fully dynamic bar chart using employee payment data (Recharts)  
✅ HR can verify, pay, and view detailed analytics of employees  
✅ Admin can promote to HR, fire users, and manage payrolls  
✅ Stripe integration for real payment in payroll (Challenge completed)  
✅ Contact Us form with database storage & admin review system  
✅ SweetAlert2 and Toasts used for all CRUD, Auth, and Feedback (no browser alerts)

---

## 📂 Pages Overview

### 🏠 Home (Public)
- Company banner/slider, services, testimonials, and more
- Navbar includes logo, login/register, and conditional user avatar/logout
- Routes: `/`, `/contact-us`

### 👤 Authentication
- Registration includes name, email, password, role, salary, designation, image upload
- Social login via Google/GitHub auto-assigns `Employee` role with default data
- Password validation (min 6 chars, capital letter, special char)
- Error handling via toasts

---

## 🔐 Dashboard Routes

### 👨‍💼 Employee
- `/dashboard/work-sheet` → Add, edit, delete, and view personal work records
- `/dashboard/payment-history` → View salary payment history (with pagination)

### 👩‍💼 HR
- `/dashboard/employee-list` → Verify employees, pay salary, view details
- `/dashboard/details/:email` → Bar chart of salary vs. month/year for employee
- `/dashboard/progress` → Filter work entries by employee and month (includes total hour summation 🟩)

### 👨‍💼 Admin
- `/dashboard/all-employee-list` → Promote to HR, fire users, update salaries (increase only 🟦)
- `/dashboard/payroll` → Approve payrolls via Stripe (no duplicate month payment 🟨)

### ✉ Contact Us
- `/contact-us` → Public message form
- Messages are saved to DB and viewable by admin via `/dashboard/messages` (private)

---

## 🔐 Security

- All private routes protected via Firebase authentication
- JWT tokens used for protected API routes (role validation middleware implemented)
- Sensitive keys hidden via `.env` files:
  - Firebase Config
  - MongoDB URI
  - Stripe Secret Key

---

## 📊 Tech Stack

- **Frontend**: React, TailwindCSS, TanStack Table, Recharts, Stripe Elements
- **Backend**: Node.js, Express.js, MongoDB, JWT
- **Authentication**: Firebase Auth + Social Logins
- **Charting**: Recharts
- **UI Libraries**: ShadCN, Tailwind (no Daisy UI used 🟠)

---

## 🧩 Bonus Features (Challenges Done)

- 🟨 Stripe Payment Integration
- 🟨 Prevent duplicate payments per month/year
- 🟦 Salary update only allows **increases**
- 🟦 Toggle between Table/Grid view for Admin
- 🟩 Total worked hours shown with dynamic filtering

---

## 📝 Installation

1. Clone both repos
2. Add `.env` in both `/client` and `/server` with required keys
3. Run backend:
   ```bash
   cd server
   npm install
   npm run dev
