/* Hre.ethers, hre isn't imported but used
The Hardhat Runtime Environment, or HRE for short, is an object containing all the functionality that Hardhat exposes when running a task,
test or script. In reality, Hardhat is the HRE.
So what does this mean? Well, every time you run a terminal command that starts with npx hardhat you are getting this hre object built on the fly using the hardhat.config.js specified in your code! 
This means you will never have to actually do some sort of import into your files like:
*/

    //compile our contract and generate the necessary files to work with under the artifcats directory
    /*
      Hardhat creates a local ethereum network
      after the script completes it'll destory it
      Evertime you run it, there will bea freshblockchain (easy to debug)
    */
    // wait until its officially deployed to our blockchain before running the constructor.
    // log the address of the deployed contract *this is how we find our one.
  
    const main = async () => {
        const [owner, randomPerson] = await hre.ethers.getSigners();
        const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
        const waveContract = await waveContractFactory.deploy();
        await waveContract.deployed();
      
        const waveCounterMap = new Map();

        console.log("Contract deployed to:", waveContract.address);
        console.log("Contract deployed by:", owner.address);
      
        let waveCount;
        waveCount = await waveContract.getTotalWaves();
      
        let waveTxn = await waveContract.wave();
        await waveTxn.wait();

        waveCounterMap.set(owner, 1);
      
        waveCount = await waveContract.getTotalWaves();

        waveTxn = await waveContract.connect(randomPerson).wave();
        await waveTxn.wait();

        waveCounterMap.set(randomPerson, 1);
      
        waveCount = await waveContract.getTotalWaves();

        waveTxn = await waveContract.connect(randomPerson).wave();
        await waveTxn.wait();

        waveCounterMap.set(randomPerson,waveCounterMap.get(randomPerson)+1 );
        console.log("Random person waved : " + waveCounterMap.get(randomPerson) + " times");

        waveCount = await waveContract.getTotalWaves();
      };
      
      const runMain = async () => {
        try {
          await main();
          process.exit(0);
        } catch (error) {
          console.log(error);
          process.exit(1);
        }
      };
      
      runMain();

//VSCode might auto-import ethers. We don't need to import ethers. 
//So, make sure you have no imports. Remember, what we talked about last lesson about hre?