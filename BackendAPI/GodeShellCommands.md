sudo docker ps // Liste containers
sudp docker compose up -d // launches container detached

docker exec -it chat-backend-db-1 psql -U PRJ4 -d postgres -c 'DROP DATABASE IF EXISTS "PRJ4ChatApp" WITH (FORCE);'
docker exec -it chat-backend-db-1 psql -U PRJ4 -d postgres -c 'CREATE DATABASE "PRJ4ChatApp";'
sudo nano docker-compose.yl

dotnet ef migrations add {navn på migration}
dotnet ef migrations remove -f





