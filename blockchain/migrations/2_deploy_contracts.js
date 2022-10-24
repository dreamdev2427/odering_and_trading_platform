const Address = artifacts.require('Address');
const SafeMath = artifacts.require('SafeMath');
const SafeERC20 = artifacts.require('SafeERC20');
const TokenSwapper = artifacts.require('TokenSwapper');
const ERC1404TokenMinKYC = artifacts.require('ERC1404TokenMinKYC');

const initializeData = async (deployer, swapperAddress, walletAddress1, walletAddress2, initialSupply, decimals, allowedInvestors, name, symbol) => {
    const token = await deployer.deploy(
        ERC1404TokenMinKYC,
        initialSupply,
        name,
        symbol,
        allowedInvestors,
        decimals,
        'shares certificate',
        'company homepage',
        'company legal docs'
    );

    token.modifyKYCData(swapperAddress, 1, 1);
    token.modifyKYCData(walletAddress1, 1, 1);
    token.modifyKYCData(walletAddress2, 1, 1);
    token.mint(walletAddress1, initialSupply);
    token.mint(walletAddress2, initialSupply);
}

module.exports = async function(deployer) {
    await deployer.deploy(SafeMath);
    await deployer.deploy(Address);
    await deployer.deploy(SafeERC20);
    const swapper = await deployer.deploy(TokenSwapper);

    const walletAddress1 = '0x4BbDeDfF46F36a4e1cbA6C74a65a01e2FE62FeF8';
    const walletAddress2 = '0x85047576d12084acA8016f172462Ebd37893C458';
    const initialSupply = 100;
    const allowedInvestors = 0; // means infinite
    const decimals = 0;

    await initializeData(deployer, swapper.address, walletAddress1, walletAddress2, initialSupply, decimals, allowedInvestors, 'Token1', 'TKN1');
    await initializeData(deployer, swapper.address, walletAddress1, walletAddress2, initialSupply, decimals, allowedInvestors, 'Token2', 'TKN2');

}
