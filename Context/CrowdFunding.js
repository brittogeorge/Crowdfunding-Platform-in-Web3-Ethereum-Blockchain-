// import React, { useState, useEffect } from "react";
// import Web3Modal from "web3modal";
// import {ethers} from "ethers";



// //INTERNAL IMPORT
// import { CrowdFundingABI, CrowdFundingAddress } from "../Context/contants";

// // Fetching Smart Contract
// const fetchContract = (signerOrProvider) =>
//   new ethers.Contract(CrowdFundingAddress, CrowdFundingABI, signerOrProvider);

// export const CrowdFundingContext = React.createContext();

// export const CrowdFundingProvider = ({ children }) => {
//   const titleData = "Crowd Funding Contract";
//   const [currentAccount, setCurrentAccount] = useState("");

//   //paste

//   const createCampaign = async (campaign) => {
//     const { title, description, amount, deadline } = campaign;
//     const web3modal = new Web3Modal();
//     const connection = await web3modal.connect();
//     const provider = new ethers.providers.Web3Provider(connection);
//     const signer = provider.getSigner();
//     const contract = fetchContract(signer);

//     // Get current account
//     const currentAccount = await signer.getAddress();

//     try {
//         const transaction = await contract.createCampaign(
//             currentAccount, // owner
//             title, // title
//             description, // description
//             ethers.utils.parseUnits(amount.toString(), 18), // Parse amount
//             Math.floor(new Date(deadline).getTime() / 1000) // Convert deadline to seconds
//         );
//         await transaction.wait();

//         console.log("Contract call success:", transaction);
//     } catch (error) {
//         console.error("Contract call failure:", error);
//     }
// };


//   const getCampaigns = async () => {
//     const provider = new ethers.providers.JsonRpcProvider();
//     const contract = fetchContract(provider);

//     const campaigns = await contract.getCampaigns();

//     const parsedCampaigns = campaigns.map((campaign, i) => ({
//       owner: campaign.owner,
//       title: campaign.title,
//       description: campaign.description,
//       target: ethers.utils.formatEther(campaign.target.toString()),
//       deadline: campaign.deadline.toNumber(),
//       amountCollected: ethers.utils.formatEther(
//         campaign.amountCollected.toString()
//       ),
//       pId: i,
//     }));
//     return parsedCampaigns;
//   };

//   const getUserCampaigns = async () => {

//     const provider = new ethers.providers.JsonRpcProvider();
//     const contract = fetchContract(provider);

//     const allCampaigns = await contract.getCampaigns();
//     const accounts = await window.ethereum.request({
//       method: "eth_accounts",
//     });
//     const currentUser = accounts[0];
//     const filteredCampaigns = allCampaigns.filter(
//       (campaign) =>
//         campaign.owner == "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
//     );

//     const userData = filteredCampaigns.map((campaign, i) => ({
//       owner: campaign.owner,
//       title: campaign.title,
//       description: campaign.description,
//       target: ethers.utils.formatEther(campaign.target.toString()),
//       deadline: campaign.deadline.toNumber(),
//       amountCollected: ethers.utils.formatEther(
//         campaign.amountCollected.toString()
//       ),
//       pId: i,
//     }));
//     return userData;
//   };

//   const donate = async (pId, amount) => {
//     const web3modal = new Web3Modal();
//     const connection = await web3modal.connect();
//     const provider = new ethers.providers.Web3Provider(connection);
//     const signer = provider.getSigner();
//     const contract = fetchContract(signer);

//     const campaignData = await contract.donateToCampaign(pId, {
//       value: ethers.utils.parseEther(amount),
//     });
//     await campaignData.wait();
//     location.reload();

//     return campaignData;
//   };

//   const getDonations = async (pId) => {
//     const provider = new ethers.providers.JsonRpcProvider();
//     const contract = fetchContract(provider);

//     const donations = await contract.getDonators(pId);
//     const numberOfDonations = donations[0].length;
//     const parsedDonations = [];

//     for (let i = 0; i < numberOfDonations; i++) {
//       parsedDonations.push({
//         donator: donations[0][i],
//         donation: ethers.utils.formatEther(donations[1][i].toString()),
//       });
//     }

//     return parsedDonations;
//   };

//   // check if wallet is connected
//   const checkIfWalletConnected = async () => {
//     try {
//       if (!window.ethereum)
//         return setOpenError(true), setError("Install Metamask");

//       const accounts = await window.ethereum.request({
//         method: "eth_accounts",
//       });
//       if (accounts.length) {
//         setCurrentAccount(accounts[0]);
//       } else {
//         console.log("No Account Found");
//       }
//     } catch (error) {
//       console.log("Somethimg wrong while connecting to wallet");
//     }
//   };

//   useEffect(() => {
//     checkIfWalletConnected();
//   }, []);

//   // connect wallet function

//   const connectWallet = async () => {
//     try {
//       if (!window.ethereum) return console.log("Install Metamask");

//       const accounts = await window.ethereum.request({
//         method: "eth_requestAccounts",
//       });
//       setCurrentAccount(accounts[0]);
//     } catch (error) {
//       console.log("Error while connecting to wallet");
//     }
//   };
//   return (
    
//     <CrowdFundingContext.Provider
//       value={{
//         titleData,
//         currentAccount,
//         createCampaign,
//         getUserCampaigns,
//         getCampaigns,
//         getDonations,
//         donate,
//         connectWallet,
//       }}
      
//     >
//     {children}
//     </CrowdFundingContext.Provider>
//   );
// };




import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

// INTERNAL IMPORT
import { CrowdFundingABI, CrowdFundingAddress } from "../Context/contants";

// Fetching Smart Contract
const fetchContract = (signerOrProvider) =>
  new ethers.Contract(CrowdFundingAddress, CrowdFundingABI, signerOrProvider);

export const CrowdFundingContext = React.createContext();

export const CrowdFundingProvider = ({ children }) => {
  const titleData = "Crowd Funding Contract";
  const [currentAccount, setCurrentAccount] = useState("");

  const createCampaign = async (campaign) => {
    try {
      const { title, description, amount, deadline } = campaign;

      const web3Modal = new Web3Modal({
        cacheProvider: true,
        disableInjectedProvider: false,
      });

      const connection = await web3Modal.connect();
      const provider = new ethers.BrowserProvider(connection); // Updated for ethers v6
      const signer = await provider.getSigner();
      const contract = fetchContract(signer);

      const currentAccount = await signer.getAddress();

      const transaction = await contract.createCampaign(
        currentAccount, // owner
        title,
        description,
        ethers.parseUnits(amount.toString(), 18), // Updated parsing for ethers v6
        Math.floor(new Date(deadline).getTime() / 1000) // Convert deadline to seconds
      );

      await transaction.wait();
      console.log("Campaign created successfully:", transaction);
    }
    
    catch (error) {
      console.error("Error creating campaign:", error);
    }
  };

  const getCampaigns = async () => {
    try {
      const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545"); // Use a valid RPC URL
      const contract = fetchContract(provider);

      const campaigns = await contract.getCampaigns();

      return campaigns.map((campaign, i) => ({
        owner: campaign.owner,
        title: campaign.title,
        description: campaign.description,
        target: ethers.formatEther(campaign.target.toString()),
        deadline: Number (campaign.deadline),
        amountCollected: ethers.formatEther(campaign.amountCollected.toString()),
        pId: i,
      }));
    } catch (error) {
      console.error("Error fetching campaigns:", error);
      return [];
    }
  };

  const getUserCampaigns = async () => {
    try {
      const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
      const contract = fetchContract(provider);

      const allCampaigns = await contract.getCampaigns();
      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      const currentUser = accounts[0];

      return allCampaigns
        .filter((campaign) => campaign.owner === currentUser)
        .map((campaign, i) => ({
          owner: campaign.owner,
          title: campaign.title,
          description: campaign.description,
          target: ethers.formatEther(campaign.target.toString()),
          deadline: Number (campaign.deadline),
          amountCollected: ethers.formatEther(campaign.amountCollected.toString()),
          pId: i,
        }));
    } catch (error) {
      console.error("Error fetching user campaigns:", error);
      return [];
    }
  };

  const donate = async (pId, amount) => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.BrowserProvider(connection);
      const signer = await provider.getSigner();
      const contract = fetchContract(signer);

      const transaction = await contract.donateToCampaign(pId, {
        value: ethers.parseEther(amount),
      });

      await transaction.wait();
      console.log("Donation successful:", transaction);
      window.location.reload();
      return transaction;
    } catch (error) {
      console.error("Error donating to campaign:", error);
    }
  };

  const getDonations = async (pId) => {
    try {
      const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
      const contract = fetchContract(provider);

      const donations = await contract.getDonators(pId);
      return donations[0].map((donator, i) => ({
        donator,
        donation: ethers.formatEther(donations[1][i].toString()),
      }));
    } catch (error) {
      console.error("Error fetching donations:", error);
      return [];
    }
  };

  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum) {
        console.error("Please install MetaMask.");
        return;
      }

      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log("No Account Found");
      }
    } catch (error) {
      console.error("Error checking wallet connection:", error);
    }
  };

  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        console.error("Please install MetaMask.");
        return;
      }

      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  return (
    <CrowdFundingContext.Provider
      value={{
        titleData,
        currentAccount,
        createCampaign,
        getUserCampaigns,
        getCampaigns,
        getDonations,
        donate,
        connectWallet,
      }}
    >
      {children}
    </CrowdFundingContext.Provider>
  );
};
