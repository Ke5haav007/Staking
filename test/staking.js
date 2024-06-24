const { expect, use } = require("chai");
const { ethers, upgrades} = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-network-helpers");

describe("Staking", function () {
  let owner,user1,user2,user3,user4,user5,user6,user7,user8;
  let mmitToken ,mmitTokenFactory
  let staking, stakingFacory

    beforeEach(async function () {
      [owner,user1,user2,user3,user4,user5,user6,user7,user8] = await ethers.getSigners();

      mmitTokenFactory = await ethers.getContractFactory("MyToken");
      mmitToken = await mmitTokenFactory.deploy(owner.address);

      stakingFacory = await ethers.getContractFactory("Staking");
      staking = await upgrades.deployProxy(
        stakingFacory,
        [mmitToken.target, owner.address],
        { kind: "uups" }
    );
    });

     
    it("User Stakes without any Refferal ", async function () {

      await mmitToken.mint(user1.address,ethers.parseEther("100"));
      await mmitToken.connect(user1).approve(staking.target,ethers.parseEther("100"));

      await staking.connect(user1).referralStake(ethers.parseEther("100"),0,"0x0000000000000000000000000000000000000000");
      

    });

    it("Refferal Level 1", async()=>{
      await mmitToken.mint(user1.address,ethers.parseEther("100"));
      await mmitToken.connect(user1).approve(staking.target,ethers.parseEther("100"));
      await staking.connect(user1).referralStake(ethers.parseEther("100"),0,user2.address);
      expect(await mmitToken.balanceOf(user2.address)).to.be.eq(0);
      await staking.connect(user2).referralClaim();
      expect(await mmitToken.balanceOf(user2.address)).to.be.eq(ethers.parseEther("5"));

    })

    it("Referal Level 2", async()=>{
      await mmitToken.mint(user1.address,ethers.parseEther("100"));
      await mmitToken.connect(user1).approve(staking.target,ethers.parseEther("100"));
      await staking.connect(user1).referralStake(ethers.parseEther("100"),0,"0x0000000000000000000000000000000000000000");

      await mmitToken.mint(user2.address,ethers.parseEther("100"));
      await mmitToken.connect(user2).approve(staking.target,ethers.parseEther("100"));
      await staking.connect(user2).referralStake(ethers.parseEther("100"),0,user1.address);

      await mmitToken.mint(user3.address,ethers.parseEther("100"));
      await mmitToken.connect(user3).approve(staking.target,ethers.parseEther("100"));
      await staking.connect(user3).referralStake(ethers.parseEther("100"),0,user2.address);
      
      await staking.connect(user1).referralClaim();
      await staking.connect(user2).referralClaim();
      console.log("User 1 Balance",await mmitToken.balanceOf(user1.address));
      console.log("User 2 Balance",await mmitToken.balanceOf(user2.address));

    })

    it("Referal Level 2", async()=>{
      await mmitToken.mint(user1.address,ethers.parseEther("100"));
      await mmitToken.connect(user1).approve(staking.target,ethers.parseEther("100"));
      await staking.connect(user1).referralStake(ethers.parseEther("100"),0,"0x0000000000000000000000000000000000000000");

      await mmitToken.mint(user2.address,ethers.parseEther("100"));
      await mmitToken.connect(user2).approve(staking.target,ethers.parseEther("100"));
      await staking.connect(user2).referralStake(ethers.parseEther("100"),0,user1.address);

      await mmitToken.mint(user3.address,ethers.parseEther("100"));
      await mmitToken.connect(user3).approve(staking.target,ethers.parseEther("100"));
      await staking.connect(user3).referralStake(ethers.parseEther("100"),0,user2.address);
      
      await staking.connect(user1).referralClaim();
      await staking.connect(user2).referralClaim();
      console.log("User 1 Balance",await mmitToken.balanceOf(user1.address));
      console.log("User 2 Balance",await mmitToken.balanceOf(user2.address));

    })

    it("Referal Level 3", async()=>{
      await mmitToken.mint(user1.address,ethers.parseEther("100"));
      await mmitToken.connect(user1).approve(staking.target,ethers.parseEther("100"));
      await staking.connect(user1).referralStake(ethers.parseEther("100"),0,"0x0000000000000000000000000000000000000000");

      await mmitToken.mint(user2.address,ethers.parseEther("100"));
      await mmitToken.connect(user2).approve(staking.target,ethers.parseEther("100"));
      await staking.connect(user2).referralStake(ethers.parseEther("100"),0,user1.address);

      await mmitToken.mint(user3.address,ethers.parseEther("100"));
      await mmitToken.connect(user3).approve(staking.target,ethers.parseEther("100"));
      await staking.connect(user3).referralStake(ethers.parseEther("100"),0,user2.address);

      await mmitToken.mint(user4.address,ethers.parseEther("100"));
      await mmitToken.connect(user4).approve(staking.target,ethers.parseEther("100"));
      await staking.connect(user4).referralStake(ethers.parseEther("100"),0,user3.address);
      
      await staking.connect(user1).referralClaim();
      await staking.connect(user2).referralClaim();
      await staking.connect(user3).referralClaim();

      console.log("User 1 Balance",await mmitToken.balanceOf(user1.address));
      console.log("User 2 Balance",await mmitToken.balanceOf(user2.address));
      console.log("User 3 Balance",await mmitToken.balanceOf(user3.address));


    })

    it("Tree Level Staking", async()=>{

      await mmitToken.mint(user1.address,ethers.parseEther("100"));
      await mmitToken.connect(user1).approve(staking.target,ethers.parseEther("100"));
      await staking.connect(user1).referralStake(ethers.parseEther("100"),0,"0x0000000000000000000000000000000000000000");

      await mmitToken.mint(user2.address,ethers.parseEther("100"));
      await mmitToken.connect(user2).approve(staking.target,ethers.parseEther("100"));
      await staking.connect(user2).referralStake(ethers.parseEther("100"),0,user1.address);

      await mmitToken.mint(user3.address,ethers.parseEther("100"));
      await mmitToken.connect(user3).approve(staking.target,ethers.parseEther("100"));
      await staking.connect(user3).referralStake(ethers.parseEther("100"),0,user1.address);

      await mmitToken.mint(user4.address,ethers.parseEther("100"));
      await mmitToken.connect(user4).approve(staking.target,ethers.parseEther("100"));
      await staking.connect(user4).referralStake(ethers.parseEther("100"),0,user2.address);

      await mmitToken.mint(user5.address,ethers.parseEther("100"));
      await mmitToken.connect(user5).approve(staking.target,ethers.parseEther("100"));
      await staking.connect(user5).referralStake(ethers.parseEther("100"),0,user2.address);

      await mmitToken.mint(user6.address,ethers.parseEther("100"));
      await mmitToken.connect(user6).approve(staking.target,ethers.parseEther("100"));
      await staking.connect(user6).referralStake(ethers.parseEther("100"),0,user4.address);

      await mmitToken.mint(user7.address,ethers.parseEther("100"));
      await mmitToken.connect(user7).approve(staking.target,ethers.parseEther("100"));
      await staking.connect(user7).referralStake(ethers.parseEther("100"),0,user5.address);


      await mmitToken.mint(user8.address,ethers.parseEther("100"));
      await mmitToken.connect(user8).approve(staking.target,ethers.parseEther("100"));
      await staking.connect(user8).referralStake(ethers.parseEther("100"),0,user3.address);


      await staking.connect(user1).referralClaim();
      await staking.connect(user2).referralClaim();
      await staking.connect(user3).referralClaim();
      await staking.connect(user4).referralClaim();
      await staking.connect(user5).referralClaim();



      console.log("User 1 Balance",await mmitToken.balanceOf(user1.address));
      console.log("User 2 Balance",await mmitToken.balanceOf(user2.address));
      console.log("User 3 Balance",await mmitToken.balanceOf(user3.address));
      console.log("User 4 Balance",await mmitToken.balanceOf(user4.address));
      console.log("User 5 Balance",await mmitToken.balanceOf(user5.address));




    })


    it("Claim Amount Scenario 1",async()=>{

      await mmitToken.mint(user2.address,ethers.parseEther("100"));
      await mmitToken.connect(user2).approve(staking.target,ethers.parseEther("100"));
      await staking.connect(user2).referralStake(ethers.parseEther("100"),0,user1.address);


      await mmitToken.mint(user2.address,ethers.parseEther("100"));
      await mmitToken.connect(user2).approve(staking.target,ethers.parseEther("100"));
      await staking.connect(user2).referralStake(ethers.parseEther("100"),0,user1.address);

      console.log("Balance Of Staking Contract",await mmitToken.balanceOf(staking.target));
      await staking.connect(user1).referralClaim();
       
      console.log("User 1 Balance", await mmitToken.balanceOf(user1.address))
      console.log("Balance Of Staking Contract After refferal Widhdrawal",await mmitToken.balanceOf(staking.target));

      expect(staking.connect(user1).claimAmount(0)).to.be.reverted
      expect(staking.connect(user2).claimAmount(0)).to.be.reverted

      await time.increase(8640000);
      await staking.connect(user2).claimAmount(0);
      console.log("Blance Of User 2 After 100 days",await mmitToken.balanceOf(user2.address));
      await time.increase(8640000);
      await staking.connect(user2).claimAmount(0);
      console.log("Blance Of User 2 After 200 days",await mmitToken.balanceOf(user2.address));

      await time.increase(31104000);
      await staking.connect(user2).claimAmount(0);
      console.log("Blance Of User 2 After 360 days",await mmitToken.balanceOf(user2.address));

    })
    it("Reverts pr-1", async()=>{

      await mmitToken.mint(user1.address,ethers.parseEther("100"));
      await mmitToken.connect(user1).approve(staking.target,ethers.parseEther("100"));
      await staking.connect(user1).referralStake(ethers.parseEther("100"),0,user2.address);

      await mmitToken.mint(user1.address,ethers.parseEther("100"));
      await mmitToken.connect(user1).approve(staking.target,ethers.parseEther("100"));
      expect(staking.connect(user1).referralStake(ethers.parseEther("100"),0,user1.address)).to.be.reverted

    })

    

   
  

  });