# NexusLink: AI-Powered Hiring Assistant 🚀

![NexusLink Banner](https://img.shields.io/badge/Status-Development-blue?style=for-the-badge&logo=appveyor)
![Java](https://img.shields.io/badge/Backend-Spring%20Boot-green?style=for-the-badge&logo=springboot)
![Next.js](https://img.shields.io/badge/Frontend-Next.js-black?style=for-the-badge&logo=next.js)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-blue?style=for-the-badge&logo=postgresql)

NexusLink is an advanced **AI-Powered Hiring Assistant** designed to revolutionize the recruitment process for SMEs. By leveraging Natural Language Processing (NLP) and modern web technologies, it automates resume screening, provides intelligent candidate ranking, and offers detailed insights into candidate suitability.

## 🌟 Key Features

### 1. **Automated Resume Screening**
- **PDF/DOCX Parsing**: Automatically extracts text and metadata from resumes.
- **Intelligent Keyword Matching**: Analyzes resumes against job descriptions to identify key skills and qualifications.

### 2. **AI-Driven Scoring & Ranking**
- **Smart Match Score**: assigns a percentage score (0-100%) based on relevance.
- **Detailed Reasoning**: Provides a "Why this score?" explanation, highlighting strengths and weaknesses.
- **Weighted Analysis**: Prioritizes "Required Skills" over "Good-to-have" skills.

### 3. **Skill Gap Analysis (New!)** 🔍
- **Missing Skills Detection**: Instantly identifies critical skills missing from a candidate's profile.
- **Visual Gaps**: Displays missing skills with clear red badges (e.g., `⚠️ Missing: Docker, AWS`) on the candidate card.

### 4. **AI Chatbot Verification** 🤖
- **Candidate Q&A**: Recruiters can "chat" with a candidate's profile to ask specific questions (e.g., "Does this candidate have experience with Microservices?").
- **Evidence-Based Answers**: The AI cites specific sections of the resume to support its answers.

### 5. **Candidate Management Dashboard**
- **Kanban-Style Overview**: Track candidates through stages (Applied, Interview, Offer, Hired).
- **Rich User Interface**: built with **Next.js**, **Tailwind CSS**, and **Shadcn/UI** for a premium, modern feel.
- **CSV Export**: Export candidate data for offline analysis or sharing.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [Shadcn/UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

### Backend
- **Framework**: [Spring Boot 3.2](https://spring.io/projects/spring-boot)
- **Language**: Java 17
- **Database**: PostgreSQL
- **Build Tool**: Maven

### AI & Logic
- **Natural Language Processing**: Custom keyword extraction and frequency analysis.
- **Scoring Algorithm**: Weighted scoring based on job requirements and "Hot Skills".

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **Java JDK** (v17 or higher)
- **Maven**
- **PostgreSQL**

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/Kiruthiyan/AI-HIRING-ASSISTANT.git
cd AI-HIRING-ASSISTANT
```

#### 2. Backend Setup
1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Configure your database in `src/main/resources/application.properties`:
    ```properties
    spring.datasource.url=jdbc:postgresql://localhost:5432/hiring_db
    spring.datasource.username=your_username
    spring.datasource.password=your_password
    ```
3.  Run the application:
    ```bash
    mvn spring-boot:run
    ```
    The backend will start on `http://localhost:8080`.

#### 3. Frontend Setup
1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
    The frontend will be available at `http://localhost:3000`.

---

## 📖 Usage Guide

1.  **Post a Job**: Log in as an Admin and create a new job posting.
2.  **Upload Resumes**: Go to the job details page and upload candidate resumes (PDF).
3.  **View Analysis**:
    - Check the **Match Score**.
    - Hover over the **Info Icon** to see the AI's reasoning.
    - Look for **Missing Skills** badges to identify gaps.
4.  **Chat with Profile**: Click the "Chat" button on a candidate card to ask specific questions.

---

## 🔮 Roadmap

- [x] Core Resume Parsing & Scoring
- [x] AI Chatbot for Candidate Profiles
- [x] Skill Gap Analysis
- [ ] Automated Interview Question Generator
- [ ] ATS Compatibility Check
- [ ] GitHub & LinkedIn Integration

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
