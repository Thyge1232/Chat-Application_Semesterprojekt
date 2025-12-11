# 💬 Chatapplikation - Semesterprojekt 4 (SW4PRJ4)

Dette repository indeholder kildekoden til en webbaseret chatapplikation udviklet som semesterprojekt på 4. semester (Softwareteknologi, Aarhus Universitet).

Applikationen gør det muligt for brugere at oprette profiler, starte samtaler og sende beskeder i et sikkert miljø.

## 🛠 Teknologier

Projektet er bygget ud fra en lagdelt arkitektur med følgende tech-stack:

*   **Frontend:** React (Vite), TypeScript, Tailwind CSS
*   **Backend:** ASP.NET Core 8 Web API
*   **Database:** PostgreSQL (Entity Framework Core)
*   **Test:** xUnit, Moq, Vitest, React Testing Library
*   **DevOps:** Docker, Docker Compose, GitLab CI/CD

## 🚀 Kom godt i gang

For at køre projektet lokalt skal du have **Docker** og **Docker Compose** installeret.

### Kør med Docker (Anbefalet)

1.  Klon repositoriet:
    ```bash
    git clone https://github.com/Thyge1232/Chat-Application_Semesterprojekt.git
    cd REPO-NAVN
    ```

2.  Start applikationen:
    ```bash
    docker-compose up --build
    ```

3.  Tilgå applikationen:
    *   **Frontend:** http://localhost:5173
    *   **Backend API (Swagger):** http://localhost:8080/swagger

### Manuel opsætning (Uden Docker)

**Backend:**
1.  Naviger til `BackendAPI` mappen.
2.  Opdater `appsettings.json` med din PostgreSQL connection string.
3.  Kør `dotnet run`.

**Frontend:**
1.  Naviger til `frontend` mappen.
2.  Kør `npm install`.
3.  Kør `npm run dev`.

## ✨ Features

*   **Brugerstyring:** Oprettelse og login med JWT-autentificering.
*   **Samtaler:** Opret private samtaler eller grupper.
*   **Beskeder:** Send og modtag beskeder (Polling-baseret).
*   **Historik:** Persistering af al data i PostgreSQL.
*   **Sikkerhed:** Password hashing med BCrypt og beskyttede endpoints.

## 👥 Forfattere - Gruppe 5

*   Nis Jonas Gerup Adamsen
*   Thyge Bertelsen
*   Cecilie Øgendahl Janstrøm
*   Nikolaj Lundø Hansen
*   Line Højberg
*   Daniel Machado
*   Kalja Blirup Grønning
