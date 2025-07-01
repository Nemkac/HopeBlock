import { ethers } from "hardhat";

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contract with:", deployer.address);

    const USDC = await ethers.getContractFactory("TestUSDC");
    const usdc = await USDC.deploy();

    await usdc.waitForDeployment();

    console.log("USDC deployed to:", await usdc.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
