pragma solidity ^0.5.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/token/ERC721/ERC721Full.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/drafts/Counters.sol";

contract ChoreRegistry is ERC721Full {

    constructor() ERC721Full("Kid Earn", "KIDEARN") public { }

    using Counters for Counters.Counter;
    Counters.Counter task_ids;

    struct Chore {
        string chore_name;
        uint chore_value;
    }

    mapping(uint => Chore) public chore_list;

    event CreateTask(uint task_id, uint chore_value, string report_uri);

    function registerChore(address owner, string memory chore_name, uint chore_value, string memory task_uri) public returns(uint) {
        task_ids.increment();
        uint task_id = task_ids.current();

        _mint(owner, task_id);
        _setTokenURI(task_id, task_uri);

        chore_list[task_id] = Chore(chore_name, chore_value);

        return task_id;
    }
    

}
