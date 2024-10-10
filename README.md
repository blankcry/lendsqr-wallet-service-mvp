# Wallet Transaction Service (MVP)
This project is an MVP (Minimum Viable Product) for a wallet transaction service. The service handles core wallet operations such as funding, withdrawals, and transfers between users, with transaction processing, error handling, and database operations using Knex, Objection.js, and MySQL.

# Table of Contents
- Features
- Technologies
- ER-Diagram
- Installation
- Configuration
- Running the Service
- Transaction Flow
- Error Handling
- Development
- License
# Features
- User Wallet Operations: Fund, withdraw, and transfer money between wallets.
- Database Transactions: Ensures operations are atomic and consistent, with rollback on failures.
- Locking Mechanism: Uses row-level locks (forUpdate) to prevent race conditions on wallet updates.
- Error Handling: Custom error handling for validation and business logic violations (e.g., insufficient funds).
- Ledger Tracking: Records wallet balance changes in a ledger for auditing.
- Lazy Loading of Associations: Transactions are lazily loaded when needed.
# Technologies
- Node.js: Backend runtime.
- Knex.js: SQL query builder for Node.js.
- Objection.js: ORM for managing database models and relations.
- TypeScript: Typed superset of JavaScript.
- MySQL: Database to persist wallet and transaction data.
# ER Diagram

![simple-wallet-system_1](https://github.com/user-attachments/assets/a8b0b798-3d2b-4fdb-91b8-3748febb4cab)
# Installation
Prerequisites
- Node.js >= 14.x
- MySQL

Steps
- Clone the repository: git clone https://github.com/yourusername/wallet-service-mvp.git

- Install dependencies: npm install
Configure environment variables (see Configuration).

# Configuration
Create a .env file at the root of the project and define the necessary environment variables.
Refer to .env.example to see the project enviroment dependency 
# Running the Service
To start the service locally, run:
npm run dev
The service will be available at http://localhost:{port}.

Endpoints
For Reference to endpoints visit postman docs @https://documenter.getpostman.com/view/5076548/2sAXxQfYEd
# Transaction Flow
- Funding a Wallet: The service locks the user’s wallet row, credits the balance, and records the transaction in a ledger.
- Withdrawing Funds: The service locks the user’s wallet row, checks for sufficient balance, debits the wallet, and records the transaction in the ledger.
- Transferring Funds: The service locks the sender’s wallet, debits the amount, and locks the recipient’s wallet to credit the amount. Each operation is performed within a transaction to ensure atomicity, and the service uses rollback in case of failures.

# Error Handling
The service includes custom error handling for validation and transaction failures, such as:

- Insufficient Funds: If the balance after a withdrawal or transfer is negative, the service throws a UnprocessableError.
- Invalid Token: The validateToken middleware ensures that requests contain valid JWT tokens.
- Database Errors: Catches any database errors and rolls back transactions.
Example Response for Insufficient Funds
{
  "error": "UnprocessableError",
  "message": "Insufficient Amount"
}
# Development
Folder Structure
src/
- ├── modules/
-   ├── service/       #Module Service Files
-   ├── routes/        #Module Routes
-   ├── controllers/   #Module Route Controllers
-   ├── interface/     #Types Declaration for Module
-   ├── schema/        #Schema Declaration for Module
-   ├── util/           #Utility functions (e.g., unique ref generation)
- ├── models/             # Objection.js models
- ├── middlewares/        # Middleware functions (e.g., token validation)
- └── app.ts              # Main application setup and declaratio
- └── server.ts           # Main application entry point
  
- Useful Scripts
- npm run start:dev - Start the development server with hot reloading.
- npm run build - Build the project for production.
- npm run start - Run Production build

#License
This project is licensed under the MIT License

