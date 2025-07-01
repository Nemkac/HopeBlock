// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestUSDC is ERC20 {
    constructor() ERC20("Test USD Coin", "USDC") {
        // 1 million USDC
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    function faucet(address to, uint256 amount) external {
        _mint(to, amount * 10 ** decimals());
    }
}
