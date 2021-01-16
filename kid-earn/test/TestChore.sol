pragma solidity ^0.5.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Chore.sol";

contract TestChore {
 // The address of the Chore contract to be tested
 Chore chore = Chore(DeployedAddresses.Chore());

 // Testing the select_chore() function
function testUserCanTakeChore() public {
  uint returnedId = chore.select_chore(expectedChoreId);

   Assert.equal(returnedId, expectedChoreId, "Adoption of the expected chore should match what is returned.");
}

//  Testing retrieval of a single chore's owner
function testGetChoresAddressbyChoreId() public{
address chores = chore.chores(expectedChoreId);

Assert.equal(chores, expectedChore, "Owner of the expected chore should be this contract");
}

// Testing retrieval of all chore owners
function testGetChorerAddressByChoreIdInArray() public {
  // Store chores in memory rather than contract's storage
  address[16] memory chores = chore.getChores();

  Assert.equal(chores[expectedChoreId], expectedChore, "Owner of the expected chore should be this contract");
}
 // The id of the chore that will be used for testing
 uint expectedChoreId = 3;

 //The expected owner of chore is this contract
 address expectedChore = address(this);
}