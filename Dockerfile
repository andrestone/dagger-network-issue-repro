# Playwright UI Mode Docker Container
#
# Build the image:
#   docker build -t playwright-ui .
#
# Run the container:
#   docker run -p 48002:48002 playwright-ui
#
# Access Playwright UI in your browser:
#   http://localhost:48002

FROM node:22.17

WORKDIR /work

# Copy package files
COPY package.json ./

# Install dependencies
RUN npm install

# Install Playwright with dependencies for chromium only
RUN npx playwright install --with-deps chromium

# Copy test files and configuration
COPY tests/ ./tests/
COPY playwright.config.ts ./

# Expose Playwright UI port
EXPOSE 48002

# Set environment variable
ENV TEST_BROWSER=chromium

# Run Playwright UI mode
CMD ["npm", "run", "test:ui"]
