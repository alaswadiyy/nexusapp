Containerization reflection

Approach:
- Built a minimal Node.js/Express app and packaged it with a small `node:18-alpine` base image to keep the image lightweight. The `Dockerfile` installs production dependencies and copies application code; runtime configuration uses environment variables (loaded via `process.env`).

Challenges encountered:
- Migrating from an initial Python scaffold required deleting/replacing files and ensuring ports/env variables were updated consistently.

How Docker improves deployment:
- Docker packages the application with its exact runtime environment (Node version, OS libraries, dependencies), which eliminates "works on my machine" issues, the container behaves the same on my laptop. It also makes onboarding faster (one docker compose up instead of manually installing Node, Postgres, and configuring everything), supports easy horizontal scaling since containers are lightweight and disposable, and isolates the app's dependencies from the host system and from other projects.

# Reflection: Task 2 - CI/CD Pipeline & Cloud Deployment

## Deployment process
For this task, I configured a GitHub Actions workflow to validate the application automatically whenever code is pushed to the repository. The workflow installs dependencies, runs syntax and smoke checks, and then triggers a Render deployment when the change is on the `main` branch and the required deployment secrets are configured.

The deployment flow is intentionally simple and repeatable:

- code is pushed to GitHub
- the workflow checks out the repository
- Node.js is installed and dependencies are installed
- the app is validated with `npm run lint:syntax` and `npm run test:smoke`
- if validation passes, the deploy job calls the Render API using stored secrets

## How CI/CD improves software delivery
CI/CD improves delivery by making deployment more consistent and less error-prone. Instead of relying on manual commands or ad hoc checks, the process is automated so each change goes through a defined validation pipeline. This reduces the risk of broken builds reaching production and makes it easier to release updates quickly and confidently.

It also helps with maintainability because build and deployment steps are documented in the workflow file and can be reviewed or updated later.

## Challenges encountered
A few issues came up while setting up the pipeline:

- ensuring the app could be validated with an automated smoke test rather than a manual browser check
- managing environment variables and deployment secrets securely without exposing them in the repository
- making sure the workflow only deploys when the correct branch and secrets are in place
- keeping the deployment setup simple enough to work with a lightweight app while still matching real-world cloud practices

## Overall learning
This task showed that even a small application benefits from CI/CD automation. The combination of GitHub Actions and Render creates a practical deployment model that is easy to understand, safe to maintain, and scalable for future growth.
