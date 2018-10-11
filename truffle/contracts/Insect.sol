pragma solidity ^0.4.23;

import "../node_modules/llllll/contracts/SixPillars.sol";

contract Insect {
  function mint(uint256 _inscription, address _sixPillarsAddress) external {
    SixPillars sixPillars = SixPillars(_sixPillarsAddress);
    sixPillars.mint(msg.sender, _inscription, true);
  }
}
