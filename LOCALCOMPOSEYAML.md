version: "3.9"

services:
  postgres:
    image: postgres:16
    container_name: dev-postgres
    restart: unless-stopped
    ports:
      - "5432:5432"             # host:container
    environment:
      POSTGRES_USER: devuser
      POSTGRES_PASSWORD: devpass
      POSTGRES_DB: appdb        # initial DB created at first run
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U devuser -d appdb"]
      interval: 5s
      timeout: 3s
      retries: 10

volumes:
  pgdata:
