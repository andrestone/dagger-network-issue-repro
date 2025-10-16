# Playwright Dagger Repro

Minimal reproduction repo that runs Playwright in UI mode from within a Dagger function.

## Prerequisites

- [Dagger CLI](https://docs.dagger.io/install) installed
- Docker running locally
- Node.js (for local development, optional)

## Usage

### Option 1: Run Playwright UI Mode from Dagger

To start Playwright in UI mode accessible from your host browser:

```bash
dagger call ui --source=. up
```

Then open your browser to:
```
http://localhost:48002
```

Run the first test, and note that the UI becomes unresponsive after the test completes.

Open developer tools in your browser to see failing network requests.

### Option 2: Run Playwright UI Mode from Docker

Build the Docker image:

```bash
docker build -t playwright-ui .
```

Run the container:

```bash
docker run -p 48002:48002 playwright-ui
```

Then open your browser to:
```
http://localhost:48002
```

Run tests as many times as you want, and note that the UI remains responsive.
