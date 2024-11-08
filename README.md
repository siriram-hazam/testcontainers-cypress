# Cypress Testcontainer Project

This project demonstrates how to use Testcontainers with Cypress to create isolated testing environments for frontend and backend integration testing. It includes setup for PostgreSQL as a service container and a Node.js backend, with Cypress handling the UI and API tests.

## Table of Contents
- [Installation](#installation)
- [Project Setup](#project-setup)
- [Running Tests](#running-tests)
- [Configuration](#configuration)
- [Challenges](#challenges)

## Installation

1. **Clone the Repository**:
   ```
   git clone https://github.com/siriramh/testcontainers-cypress.git
   cd testcontainers-cypress
   ```
2. **Install Dependencies**:
   ```
   npm install
   ```
3. **Go Inside Service**
   ```
   cd ui-test1
   ```
4. **Install Dependencies**:
   ```
   npm install
   ```
3. **Install Docker**:

   Testcontainers requires Docker to spin up containers for services like PostgreSQL. Download Docker if not already installed.

## Project Setup

1. **Configuration Files**:
   - **Cypress**: Located in `cypress.config.js` to configure test settings.
   - **Testcontainers**: Located in `cypress/plugins/testcontainer_db.js` to manage container setup for PostgreSQL or other services.

2. **Test Scripts**:
   - Cypress test scripts are located under `cypress/integration` Modify or add new tests in this folder as needed.

3. **Start Dependency**
   - **Change Directory**: 
      ```
      cd ui-test1
      ```
   - **Start Backend**: 
      ```
      nodemon
      ```
   - **Start UI**: 
      ```
      http-server -p 8080
      ```

## Running Tests
1. **Run All Tests**: Spin up the Testcontainers services and execute Cypress tests with:
   ```
   npx cypress run
   ```

2. **Run Individual Tests**: Run a specific Cypress test file:
   ```
   npx cypress run --spec "path/to/test-file.js"
   ```


## Configuration
 - **Testcontainers Options**: Adjust container settings for PostgreSQL or other services in `cypress/plugins/testcontainer_db.js`

## Challenges

- **Container Management**: Configuring Testcontainers to reliably connect backend services and ensure consistent environment setup was a key challenge.
- **Environment Variables**: Managing configurations across multiple environments required careful setup to ensure smooth testing flows.
