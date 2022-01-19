import Web3 from "web3";

const getWeb3 = () =>
  new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener("load", async () => {
      let account = JSON.parse(localStorage.getItem("snowwyaccount"))

      if(account) {
        const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/83dabe84d2a64e78b6622fbe13bf7a06"))
        
        window.account = account
        window.web3 = web3

        resolve(web3)
      }
    });

  });

export default getWeb3;
