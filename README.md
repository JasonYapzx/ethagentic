# Storagent: AI-Powered Inventory Manager

**Storagent** is an AI Inventory Manager designed to revolutionize inventory management by integrating on-chain technologies and autonomous decision-making. This intelligent web application helps you manage your warehouse inventory efficiently, update stock levels, and restock items using smart contracts. With features such as trend analysis and supplier selection, Storagent provides a seamless inventory management experience.
![alt text](image.png)


## **Features**

- **AI-Driven Inventory Management**

  - Automatically updates inventory levels when items are purchased.
  - Tracks usage trends and ensures inventory remains above predefined thresholds.
  - Identifies the fastest supplier and requests confirmation before purchasing restocks autonomously.

- **Comprehensive Dashboard**

  - Tracks inventory data such as usage patterns and supplier information.
  - Allows users to search for suppliers and manage inventory efficiently.

- **Smart Contract Integration**

  - Add new products or update inventory levels manually.
  - Enables secure and transparent inventory operations.

- **Seamless Consumer Experience**

  - Consumers can purchase items directly from the warehouse.

---

## **Tech Stack**

- **Coinbase Developer Platform (CDP):**

  - **CDP Agent Kit**: AI-powered inventory management.
  - **CDP Onchain Kit**: Provides access to wallets and smart contract interactions.
  - **CDP Commerce**: Enables consumers to purchase items from the warehouse.
  - **Replit Template**: [https://replit.com/@tanlenggg/ethagentic](https://replit.com/@tanlenggg/ethagentic)
 
- **The Graph**:

  - Supports subgraphs for aggregated queries, event tracking, and pagination.

- **Nillion**:

  - Used for securely storing private data. Nillion is a secure computation network that decentralizes trust for high-value and sensitive data.

- **Browser-Use**:

  - Automates item purchases from suppliers.

- **Next.js**:

  - Provides a robust and dynamic frontend framework.

- **Blockchain Network**:
  - Built on **Base Sepolia**

---

## **How It Works**

1. **Inventory Monitoring**:  
   The AI agent tracks inventory levels and usage patterns in real-time, automatically detecting when restocking is needed.

2. **Supplier Selection**:  
   Using aggregated supplier data, the AI selects the supplier with the shortest lead time and initiates restocking.

3. **Manual Management**:  
   Users can manually interact with the smart contract to update stock levels, add new items, and monitor inventory data via the dashboard.

4. **Secure Transactions**:  
   Consumers purchase items using CDP Commerce.

5. **Autonomous Supplier Interaction**:  
   Browser-use scripts automate purchases from suppliers based on AI-driven decisions.

---

## **Repository Structure**

repository-root
├── frontend # Frontend application (Next.js)
├── agentkit # AI logic and chatbot functionality (CDP Agent Kit)
├── contract # Smart contracts for inventory management
├── scripts/browser_use_bot # Automation scripts for supplier interactions

---

## **How to Run**

1. **Clone the Repository**

   ```bash
   git clone https://github.com/eugenetayyj/ethagentic

   ```

2.	Configure Environment Variables


3. Install Dependencies

   ```bash
    npm install:all
   ```

4. Build the Application
   ```bash
   npm run build:frontend
   ```

5. Start the Application
   ```bash
   npm run start
   ```

6. Access the Dashboard
    Open http://localhost:3000 in your browser to interact with the application.

7. To develop Storagent's frontend application
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## The Graph Implementations
The Graph Schema is in frontend > .graphclient

### Subgraph Development
- Simple event tracking entities like `graph init`.
- Domain entities like Accounts, Tokens, etc., properly filled.
- Best practices applied like getOrCreate, Bytes as IDs, immutable entities, etc.
- Published to The Graph Network.
- Aggregations implemented.
- Full-text search included.
- Schema best practices applied (Enums, Interfaces, Fragments).

### Query The Graph
- Simple queries to The Graph.
- Used Graph Client.
- Used sorting and/or filtering.
- Used large pagination.
- Used logical operators.
- Used a better GraphQL library like Apollo or URQL.
- Used GraphQL variables.
- Used The Graph Network.
