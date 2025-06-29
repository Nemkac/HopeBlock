import { ethers } from "hardhat";

async function main() {
    const usdcAddress = "DEPLOYED_CONTRACT_ADDRESS";

    const recipient = "RECIPENT_PUBLIC_KEY";

    const amount = "1000";

    const usdc = await ethers.getContractAt("TestUSDC", usdcAddress);

    console.log(`Mintujem ${amount} USDC za adresu ${recipient}...`);

    const tx = await usdc.faucet(recipient, BigInt(parseInt(amount)));

    await tx.wait();
    console.log("Mintovanje završeno!");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
