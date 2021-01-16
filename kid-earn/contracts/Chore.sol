pragma solidity ^0.5.0;

contract Chore {
address[16] public chores;
// Selecting a Chore
function select_chore(uint choreId) public returns (uint) {
  require(choreId >= 0 && choreId <= 15);

  chores[choreId] = msg.sender;

  return choreId;
}
// Retrieving the Chores
function getChores() public view returns (address[16] memory) {
  return chores;
}
}