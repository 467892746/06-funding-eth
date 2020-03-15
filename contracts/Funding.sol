pragma solidity ^0.4.24;
import "./FundingFactory.sol";

contract Funding {
    address public manager;
    string public projectName;
    uint256 public targetrMoney;
    uint256 public supportMoney;
    uint256 public endTime;
    address[] investors;
    SupportFundingContract supportorFundings;

    constructor(string _projectName, uint256 _targertMoney, uint256 _supportMoney, uint256 _duration,address _creator, SupportFundingContract _supportorFundings) public {
        manager = _creator;
        projectName = _projectName;
        targetrMoney = _targertMoney;
        supportMoney = _supportMoney;
        endTime = block.timestamp + _duration;
        supportorFundings = _supportorFundings;
        require(targetrMoney >= supportMoney);
    }
    mapping(address=>bool) isInvestorMap;
    function invest() payable public {
        require(msg.value == supportMoney);
        require(isInvestorMap[msg.sender] == false);
        investors.push(msg.sender);
        isInvestorMap[msg.sender] = true;
        //   supportorFundings[msg.sender].push(address(this));
        supportorFundings.setFunding(msg.sender, this);

    }

    function  refund() onlyManager public {
        for (uint256 i = 0; i < investors.length; i ++) {
            investors[i].transfer(3000000);
        }
        delete investors;
    }
    enum requestStatus{
        Voting, ApproveD, Completed
    }
    struct Request {
        string purpose;
        uint256 cost;
        address seller;
        uint256 approveCount;
        requestStatus status;
        mapping(address=>bool) isVotedMap;

    }
    Request[] public requests;
    function createRequest(string _purpose, uint256 _cost, address _seller) onlyManager public {
        Request memory req =  Request({
            purpose: _purpose,
            cost: _cost,
            seller: _seller,
            approveCount:0,
            status:requestStatus.Voting
            });
        requests.push(req);
    }
    function approveRequest(uint256 i) public {
        Request storage req = requests[i];
        require(isInvestorMap[msg.sender] );
        require(req.cost != 0);
        require(req.isVotedMap[msg.sender] == false);
        req.approveCount++;
        req.isVotedMap[msg.sender] = true;
    }
    function finalizeRequest(uint256 i) onlyManager public {
        Request storage req = requests[i];
        require(address(this).balance > req.cost);
        require(req.approveCount * 2 > investors.length);
        req.seller.transfer(req.cost);
        req.status = requestStatus.Completed;
    }
    modifier onlyManager {
        require(msg.sender == manager);
        _;
    }
    function getLeftTime() public view returns(uint256) {
        return (endTime - block.timestamp);
    }
    function getInvestorsCount() public view returns(uint256){
        return investors.length;
    }
    function getRequestCount() public view returns(uint256){
        return requests.length;
    }
    function getRequestByIndex(uint256 i) public view returns(string, uint256, address, uint256, requestStatus){
        Request memory req = requests[i];
        return (req.purpose, req.cost, req.seller, req.approveCount, req.status);
    }
    function getBalance() public view returns(uint256) {
        return address(this).balance;
    }

    function getInvestors() public view returns(address[]){
        return investors;
    }
}