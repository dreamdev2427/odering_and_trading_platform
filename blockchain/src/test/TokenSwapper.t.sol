// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity ^0.8.14;

import "ds-test/test.sol";
import { TokenSwapper } from "../contracts/ERC20_swapper_V3.sol";
import { ERC1404TokenMinKYC } from "../contracts/tokenDeployContract.sol";

// This is an example of how to write tests for solidity
// Pay attention to the file name (.t.sol is used in order to recognize which files are meant for tests)

interface Vm {
    // you can use this to test fail cases from require or revert reasons
    function expectRevert(bytes calldata) external;
    // use this to call contracts from different addresses for the next 1 call
    function prank(address) external;

    // use this to call contracts from a different address until the stopPrank function is called
    function startPrank(address) external;
    // use this to stop the chain of pranks
    function stopPrank() external;
}

interface CheatCodes {
    // Gets address for a given private key, (privateKey) => (address)
    function addr(uint256) external returns (address);
}

// if you need to use structs, you can import them through inheritance (in this case TokenSwapper's Swap struct)
contract TokenSwapperTest is DSTest, TokenSwapper {
    Vm vm = Vm(0x7109709ECfa91a80626fF3989D68f67F5b1DD12D);
    CheatCodes cheats = CheatCodes(HEVM_ADDRESS);
    address public addr1;
    address public addr2;


    TokenSwapper swapper;
    ERC1404TokenMinKYC token1;
    ERC1404TokenMinKYC token2;
    uint amount1 = 100;
    uint amount2 = 200;

    // setUp will be run before any tests
    function setUp() public {
        addr1 = cheats.addr(1);
        addr2 = cheats.addr(2);
        uint limitInvestors = 0;
        swapper = new TokenSwapper();
        token1 = new ERC1404TokenMinKYC(100, 'Token1', 'TKN1', limitInvestors, 0, 'share certificate', 'company homepage', 'company legal docs');
        token2 = new ERC1404TokenMinKYC(200, 'Token2', 'TKN2', limitInvestors, 0, 'share certificate', 'company homepage', 'company legal docs');

        token1.modifyKYCData(address(swapper), 1, 1);
        token1.modifyKYCData(addr1, 1, 1);
        token1.modifyKYCData(addr2, 1, 1);
        token1.mint(addr1, amount1);
        token1.mint(addr2, amount1);

        token2.modifyKYCData(address(swapper), 1, 1);
        token2.modifyKYCData(addr1, 1, 1);
        token2.modifyKYCData(addr2, 1, 1);
        token2.mint(addr1, amount2);
        token2.mint(addr2, amount2);
    }

    function test_open_Addr1_OpensASellOf_10TKN1_ToAddr2_For_1TKN2() public {
        uint swapNumber = 1;
        uint tokensToSell = 10;
        uint maxAllowance = 100;
        uint tokensToBuy = 1;
        uint expiry = 10;
        vm.startPrank(address(swapper));
        token1.approve(addr1, maxAllowance);
        token1.approve(addr2, maxAllowance);
        token1.approve(address(swapper), maxAllowance);
        token2.approve(addr1, maxAllowance);
        token2.approve(addr2, maxAllowance);
        token2.approve(address(swapper), maxAllowance);
        vm.stopPrank();

        // make addr1 wallet call the next function
        vm.prank(addr1);
        swapper.open(swapNumber, addr2, address(token1), tokensToSell, address(token2), tokensToBuy, expiry);

        (Swap memory result, uint b) = swapper.getSwapData(addr1, swapNumber);
        assertEq(tokensToSell, result.tokensToOpen);
    }
}
