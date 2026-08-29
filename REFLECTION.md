Containerization reflection

Approach:
- Built a minimal Node.js/Express app and packaged it with a small `node:18-alpine` base image to keep the image lightweight. The `Dockerfile` installs production dependencies and copies application code; runtime configuration uses environment variables (loaded via `process.env`).

Challenges encountered:
- Migrating from an initial Python scaffold required deleting/replacing files and ensuring ports/env variables were updated consistently.

How Docker improves deployment:
- Docker packages the application with its exact runtime environment (Node version, OS libraries, dependencies), which eliminates "works on my machine" issues, the container behaves the same on my laptop. It also makes onboarding faster (one docker compose up instead of manually installing Node, Postgres, and configuring everything), supports easy horizontal scaling since containers are lightweight and disposable, and isolates the app's dependencies from the host system and from other projects.
