# HopeBlock
  
HopeBlock is an open-source, non-custodial multi-chain crypto wallet focused on **charitable donations and transparency**.

* Powered by **MetaMask**, users can donate crypto with a single click from any supported network.
* With **Etherscan integration**, donors can view all on-chain donation activity for each selected humanitarian campaign.

---

## Contributors
- Nebojša Vuga
- Nemanja Todorović


## How to Run

### Backend

```bash
cd HopeBlock/api
npm install
npm run dev
```

### Frontend

```bash
cd HopeBlock/frontend
npm install
ng serve
```

Access the app at: `http://localhost:4200`

---

## ✨ Features

* Browse and filter list of active humanitarian campaigns
* Create and delete your own humanitarian campaigns
* View detailed info for each campaign
* Donate crypto (ETH / ERC-20 like USDC) from multiple networks
* Fully **non-custodial**: no login, no registration, wallet remains in user control
* Track donation history with transaction hashes and Etherscan links
* Custom test USDC token deployed via a Solidity smart contract

---

## Technologies Used

* **Frontend**: Angular
* **Backend**: Node.js (Express)
* **Database**: MongoDB
* **Smart Contracts**: Solidity (for test USDC token)
* **Blockchain Integration**: ethers.js, MetaMask, Etherscan API
