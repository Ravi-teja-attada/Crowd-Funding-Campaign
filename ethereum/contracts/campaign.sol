// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract CampaignFactory{
    address[] public deployedContracts;

    function createCampaign(uint minimum) public {

        address newCampaign = address(new Campaign(minimum, msg.sender));

        deployedContracts.push(newCampaign);
    }

    function getDeployedContracts() public view returns(address[] memory){
        return deployedContracts;
    }

}

contract Campaign {
    struct Request{
        string description;
        uint value;
        address payable recipient;
        bool completed;
        uint approvalCount;
        mapping(address => bool) approval;
    }

    Request[] public requests;
    address public owner;
    uint public minContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;

    constructor(uint minimum, address creator){
        owner = creator;
        minContribution = minimum;
        approversCount = 0;
    }

    function contribute() payable public{
        require(msg.value > minContribution);
        approvers[msg.sender] = true;
        approversCount++;
    }

    modifier ownerOnly(){
        require(msg.sender == owner);
        _;
    }

    function spendRequest(uint value, string memory description, address payable recipient) public ownerOnly{

        Request storage newRequest = requests.push();
        newRequest.description = description;
        newRequest.value = value;
        newRequest.recipient = recipient;
        newRequest.completed = false;
        newRequest.approvalCount = 0;
    }

    function approveRequest(uint index) public{
        Request storage request = requests[index];

        require(approvers[msg.sender]);
        require(!request.approval[msg.sender]);

        request.approval[msg.sender] = true;
        request.approvalCount++;

    }

    function finalizeRequest(uint index) public payable ownerOnly{
        Request storage request = requests[index];

        require(!request.completed);
        require(request.approvalCount > (approversCount/2));

        request.recipient.transfer(request.value);
        request.completed = true;
    }

    function getSummary() public view returns(uint,uint,uint,uint,address){
        return(
            address(this).balance,
            minContribution,
            requests.length,
            approversCount,
            owner
        );
    }

    function getRequestsCount() public view returns(uint){
        return requests.length;
    }
}