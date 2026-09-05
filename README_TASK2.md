# NexusApp

## Task 2: CI/CD Pipeline & Cloud Deployment

### Objective
Automate the deployment process and deliver the application through a cloud platform using a continuous integration and deployment workflow.

### Application overview
NexusApp is a lightweight Node.js/Express application that exposes a single endpoint at `/` and returns a JSON response with a greeting message. The app uses environment variables to configure the runtime behavior and is designed to be easy to deploy in Docker or a cloud hosting environment.

### CI/CD workflow
The repository contains a GitHub Actions workflow at `.github/workflows/ci-cd.yml`.

#### Trigger conditions
- Runs automatically on every push to `main`
- Runs on pull requests targeting `main`
- Can also be started manually with `workflow_dispatch`

#### Workflow steps
1. Checks out the repository
2. Sets up Node.js 20
3. Installs dependencies with `npm ci`
4. Verifies syntax with `npm run lint:syntax`
5. Runs an automated smoke test with `npm run test:smoke`
6. Performs a packaging check with `npm pack --dry-run`
7. If the push is to `main` and the required Render secrets are configured, triggers a Render deployment

### Automated quality checks
The workflow includes validation steps to confirm the app still builds and responds correctly after changes:

- `npm ci` ensures dependencies install successfully
- `npm run lint:syntax` checks JavaScript syntax
- `npm run test:smoke` starts the app and verifies the `/` endpoint responds with the expected JSON payload

### Environment configuration
The application expects environment variables for local and cloud execution.

Example `.env` file:

```env
PORT=3000
GREETING=Hello from NexusApp
```

Required GitHub repository secrets for deployment:

- `RENDER_API_KEY`
- `RENDER_SERVICE_ID`

These values should be added in the GitHub repository settings under Settings → Secrets and variables → Actions.

### Cloud deployment: Render
A Render deployment job is included in the workflow. To enable it:

1. Create a new Render Web Service and connect the GitHub repository.
2. Set the build command to `npm install`.
3. Set the start command to `npm start`.
4. Add the environment variables required by the app, such as `PORT` and `GREETING`.
5. Add `RENDER_API_KEY` and `RENDER_SERVICE_ID` as GitHub Actions secrets.
6. Push to `main` to trigger automatic deployment.

### Live application link
Current live deployment URL:

- https://nexusapp.onrender.com

Note: this URL should be updated to the actual deployed service once the project is connected to Render and the app is live.

### Deployment documentation
Local development:

```bash
npm install
PORT=3000 GREETING="Hello from NexusApp" npm start
```

Docker run:

```bash
docker build -t nexusapp .
docker run -p 3000:3000 --env-file .env nexusapp
```

### Screenshots
Submit screenshots showing:

- a successful GitHub Actions run for the CI workflow
- the Render deployment status or the live application page

These should be added to the final delivery or included in the project documentation before submission.

### Files relevant to this task
- `.github/workflows/ci-cd.yml` — CI/CD workflow configuration
- `src/index.js` — Express application
- `package.json` — scripts and dependencies
- `scripts/smoke-test.js` — automated smoke test for the root endpoint
- `.env` — runtime configuration values

### Summary
This task demonstrates a simple but effective automation flow: code changes are validated automatically, quality gates are enforced, and successful builds can trigger deployment to a cloud platform. The setup reduces human error and makes the release process repeatable.
