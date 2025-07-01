import { ethers } from "hardhat";

async function main() {
    const [signer] = await ethers.getSigners();

    const address = signer.address;
    const balance = await ethers.provider.getBalance(address);

    console.log("Wallet:", address);
    console.log("Balance:", ethers.formatEther(balance), "ETH");
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
