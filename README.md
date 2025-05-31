# EduCore - Learning Management System (LMS)

EduCore is a **full-stack Learning Management System (LMS)** built using the **MERN (MongoDB, Express.js, React, Node.js) stack**. This platform enables users to **create, manage, and enroll** in courses with secure authentication and cloud storage for learning materials. It is designed to provide an interactive and scalable online learning experience.

## 🚀 Features
- **User Authentication & Authorization**
  - Signup/Login using **JWT (JSON Web Token)**
  - Role-Based Access Control (**Admin, Instructor, Student**)
  
- **Course Management**
  - Create, edit, and delete courses
  - Manage course content
  - Enroll and track progress in courses
  
- **Secure File Uploads**
  - Integration with **Cloudinary** for media storage
  - Upload and manage course-related files (videos, PDFs, assignments)
  
- **API-Driven Architecture**
  - Built with **RESTful APIs** for efficient communication
  - Secure endpoints with authentication middleware

- **Dashboard & User Profiles**
  - Interactive instructor and student dashboards
  - Track completed courses and learning progress
  
- **Payment & Subscription**
  - Razorpay integration for paid courses

---

## 🛠️ Tech Stack
- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ORM)
- **Authentication:** JWT
- **Cloud Storage:** Cloudinary (for file uploads)
- **Styling:** Tailwind CSS 
- **Payment Gateway: RazorPay**

---



## 🔧 Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/devkushwah/EduCore.git
cd EduCore
```

### 2️⃣ Install Dependencies
```sh
# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

### 3️⃣ Setup Environment Variables
Create a `.env` file in the `server/` directory and add:
```env
MAIL_HOST=
MAIL_USER=
MAIL_PASS=
MAIL_PORT = 
JWT_SECRET=
FOLDER_NAME=
RAZORPAY_KEY_ID=
RAZORPAY_SECRET=
CLOUD_NAME=
API_KEY=
API_SECRET=
MONGODB_URL=
PORT=
```

### 4️⃣ Run the Project
```sh
# Start Backend Server
cd server
npm run dev

# Start Frontend
cd client
npm run dev
```
Then, open [http://localhost:3000](http://localhost:3000) in your browser.


---

## ✨ Future Enhancements
- **Quiz & Assignments**
- **Course Reviews & Ratings**
- **Live Class Integration (Zoom/WebRTC)**
- **Certificate Generation**
- **Dark Mode UI Theme**
- **Multilingual Support**

---

## 🏆 Contributing
Contributions are welcome! Feel free to fork the repository, submit a pull request, or open an issue.

---

## 📜 License
This project is open-source and available under the [MIT License](LICENSE).

