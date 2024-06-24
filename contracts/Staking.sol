// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "./interfaces/Immit.sol";
import "hardhat/console.sol";

contract Staking is 
    Initializable,
    UUPSUpgradeable,
    ReentrancyGuardUpgradeable,
    OwnableUpgradeable
    {

    using SafeERC20 for Immit;
    Immit public mmitToken; 
    uint public stakeID; 
    uint public  P1APR;
    uint public  P2APR;
    uint public  P3APR;

    event Staked(address indexed user, uint256 amount, uint256 indexed stakeID);

    struct StakedDetails{
        uint stakedAmount;
        uint stakedTimeStamp;
        uint lastclaimTimeStamp;
        uint endTime;
        address depositor;
        Package stakingPackage;
    }


    enum Package{
        package1,
        package2,
        package3
    }

    mapping(uint => StakedDetails) public stakedetails;
    mapping(address => address) public referrer; 
    mapping(address => uint) public referrerClaimAmount;

/// @custom:oz-upgrades-unsafe-allow constructor
   constructor() {
        _disableInitializers();
    }


    function initialize(
       address _mmitToken,
       address _owner
    ) external initializer {
      require(_mmitToken != address(0),"Zero Address");
      mmitToken = Immit(_mmitToken);
      P1APR = 2000;
      P2APR = 2500;
      P3APR = 3000;
      __ReentrancyGuard_init();
      __Ownable_init(_owner);
      __UUPSUpgradeable_init();
    }

 

    function _authorizeUpgrade(address) internal override onlyOwner {}


    function referralStake(uint _amount, Package _stakingPackage, address _referrer) external{
      require(_amount >0 ,"Invalid Amount");
      require(_referrer != msg.sender,"referrer can't be the referee");
      if(referrer[msg.sender]== address(0) && _referrer != address(0)){
        referrer[msg.sender] = _referrer;
         if(referrer[_referrer] != address(0)){
            if(referrer[referrer[_referrer]] != address(0)){
                referrerClaimAmount[referrer[referrer[_referrer]]] +=(_amount * 2)/100;
                referrerClaimAmount[referrer[_referrer]] += (_amount *3) /100;
                referrerClaimAmount[_referrer] += (_amount * 5) /100;

            }else{
                referrerClaimAmount[referrer[_referrer]] += (_amount *3) /100;
                referrerClaimAmount[_referrer] += (_amount * 5) /100;
            }
         }else{
            referrerClaimAmount[_referrer] += (_amount * 5) /100;
         }

      }

      stake(_amount, _stakingPackage);
    }

    function stake(uint _amount , Package _stakingPackage) public nonReentrant{
        if(_stakingPackage == Package.package1){
            require(_amount >= 100 * 10 ** mmitToken.decimals(),"Package Min Amount");
        }
        if(_stakingPackage == Package.package2){
            require(_amount >= 500 * 10 ** mmitToken.decimals(),"Package Min Amount");
        }
        if(_stakingPackage == Package.package3){
            require(_amount >= 1000 * 10 ** mmitToken.decimals(),"Package Min Amount");
        }
      StakedDetails storage details = stakedetails[stakeID];
      mmitToken.safeTransferFrom(msg.sender, address(this), _amount);
      details.depositor = msg.sender;
      details.stakedAmount = _amount;
      details.stakingPackage = _stakingPackage;
      details.stakedTimeStamp = block.timestamp;
      details.endTime = block.timestamp + 360 days;
      emit Staked(msg.sender, _amount, stakeID);
      stakeID++;
    }


    function claimAmount(uint _stakeID) external nonReentrant{
        StakedDetails storage details = stakedetails[_stakeID];
        require(details.depositor == msg.sender,"Not the Staker");
        require(block.timestamp >= details.stakedTimeStamp + 100 days, "Cannot claim yet");
        uint noOfDays;
        if(details.lastclaimTimeStamp == details.endTime){
            revert("All amount Claimed");
        }else if(block.timestamp>= details.endTime && details.lastclaimTimeStamp>0){
            noOfDays = (details.endTime - details.lastclaimTimeStamp)/1 days;
            details.lastclaimTimeStamp = details.endTime;
        }else if(block.timestamp>= details.endTime && details.lastclaimTimeStamp ==0){
           noOfDays = 360;
            details.lastclaimTimeStamp = details.endTime;
        }else if(details.lastclaimTimeStamp ==0){
            noOfDays = (block.timestamp - details.stakedTimeStamp)/ 1 days;
            details.lastclaimTimeStamp = block.timestamp;
        }else{
            noOfDays = (block.timestamp - details.lastclaimTimeStamp)/ 1 days;
            details.lastclaimTimeStamp = block.timestamp;
        }
        console.log("NoOfDays", noOfDays);
        uint claimableamount = calculateRewards(details.stakedAmount, details.stakingPackage, noOfDays);
        assert(claimableamount <= mmitToken.balanceOf(address(this)));
        mmitToken.safeTransfer(details.depositor,claimableamount);

    }

    function referralClaim() external nonReentrant{
        uint claimableAmount = referrerClaimAmount[msg.sender];
        if(claimableAmount>0 && claimableAmount<= mmitToken.balanceOf(address(this))){
            referrerClaimAmount[msg.sender] = 0;
            mmitToken.safeTransfer(msg.sender, claimableAmount);
        }
    }


    function calculateRewards(uint _amount, Package _stakingPackage, uint _noOfDays) internal view returns(uint rewards){

        if(_stakingPackage == Package.package1){
            return (_noOfDays * (_amount + (_amount * P1APR)/10000))/360;
        }
        if(_stakingPackage == Package.package2){
            return (_noOfDays * (_amount + (_amount * P2APR)/10000))/360;      
        }

        if(_stakingPackage == Package.package3){
            return (_noOfDays * (_amount + (_amount * P3APR)/10000))/360;      
        }

    }

     
    

}