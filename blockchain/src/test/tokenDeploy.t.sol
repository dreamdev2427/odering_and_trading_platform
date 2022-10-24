// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity ^0.8.14;

import "ds-test/test.sol";
import { ERC1404TokenMinKYC } from "../contracts/tokenDeployContract.sol";

// This is an example of how to write tests for solidity
// Pay attention to the file name (.t.sol is used in order to recognize which files are meant for tests)

interface Vm {
    // you can use this to test fail cases from require or revert reasons
    function expectRevert(bytes calldata) external;
    // use this to call contracts from different addresses
    function prank(address) external;
}

interface CheatCodes {
    // Gets address for a given private key, (privateKey) => (address)
    function addr(uint256) external returns (address);
}

contract TokenDeployTest is DSTest {
    Vm vm = Vm(0x7109709ECfa91a80626fF3989D68f67F5b1DD12D);
    CheatCodes cheats = CheatCodes(HEVM_ADDRESS);
    address public addr1;
    address public addr2;


    ERC1404TokenMinKYC token;
    string name = 'Token';
    string symbol = 'TKN';
    uint initialSupply = 100;

    // setUp will be run before any tests
    function setUp() public {
        // get the 2nd wallet address from the blockchain
        addr1 = cheats.addr(1);
        addr2 = cheats.addr(2);
        token = new ERC1404TokenMinKYC(initialSupply, name, symbol, 0, 0, 'share certificate', 'company homepage', 'company legal docs');

        token.modifyKYCData(addr1, 1, 1);
        token.modifyKYCData(addr2, 1, 1);
    }

    // every function must start with "test" as a keyword
    function test_ItDeploy_WithCorrectInitialSupply() public {
        // 1st param is actual value, 2nd param is expected value
        assertEq(token.totalSupply(), initialSupply);
    }

    function test_mints_BalanceOfThisIncreases() public {
        uint amount = 20;
        token.mint(address(this), amount);

        uint balanceOfOwner = token.balanceOf(address(this));
        uint totalSupply = token.totalSupply();

        assertEq(balanceOfOwner, amount + initialSupply);
        assertEq(totalSupply, amount + initialSupply);
    }

    function test_mints_BalanceOfAddr1Increases() public {
        uint amount = 20;
        token.mint(address(addr1), amount);

        uint balanceOfOwner = token.balanceOf(address(addr1));
        uint totalSupply = token.totalSupply();

        assertEq(balanceOfOwner, amount);
    }

    function test_mints_OnlyOwnerCanMint() public {
        uint amount = 20;
        // make addr1 wallet call the next function
        vm.prank(addr1);
        // notify the vm that we expect the following function to fail with this particular reason
        vm.expectRevert("Only owner can call function");

        token.mint(address(this), amount);
    }

    function test_transferFrom() public {
        uint mintAmount = 20;
        uint sellAmount = 10;
        token.mint(addr1, mintAmount);
        token.approve(addr1, sellAmount);

        token.transferFrom(addr1, addr2, sellAmount);

        uint balanceOfOwner = token.balanceOf(addr2);
        assertEq(balanceOfOwner, sellAmount);
    }
}
