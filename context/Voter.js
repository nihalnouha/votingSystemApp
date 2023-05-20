import React,{useState,useEffect} from "react";

import Web3Modal from "web3modal";
import{ ether } from  "ethers";
import  {create as ipfsHttpClient}from "ipfs-http-client";
import axios from "axios";
import {useRouter} from "next/router";
//  internal import
import { VotingAddress,VotingAddressABI } from "./constants";
// const client=ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

// const client =ipfsHttpClient({ grpc: '/ip4/127.0.0.1/tcp/5003/ws',
// http: '/ip4/127.0.0.1/tcp/5002/http'});
// //https://ipfs.infura.io:5001/api/v0/add"
// const id = await client.id();
const fetchContract=(signerOrProvider)=>new ethers.Contract(VotingAddress,VotingAddressABI,signerOrProvider);
export   const VotingContext=React.createContext();
export   const VotingProvider=({children})=>{
  const votingTitle="My first smart contract app";
  const router=useRouter();
  const[currentAccount,setCurrentAccount]=useState('');
  const [candidateLength,setCandidateLength]=useState('');
  const pushCandidate=[];
  const candidateIndex=[];
  const [candidateArray,setCandidateArray]=useState(pushCandidate);
  //--------------------END OF CANDIDATE Data
  const [error,setError]=useState('');
  const higestVote=[];
  //---------------VOTER SeCTION 
  const pushVoter=[];
  const[voterArray,setVoterArray]=useState(pushVoter);
  const [voterLength,setVoterLength]=useState('');
  const[voterAddress,setVoterAddress]=useState([]);
  //-------connection metamask
  const checkIfWalletIsConnected=async()=>{
    if(!window.ethereum)return setError("please Install Metamask");
    const account =await window.ethereum.request({method:"eth_accounts"});
    if(account.length){
        setCurrentAccount(account[0]);
    }
    else{
        setError("please Install MetaMask & Connect,Reload");
    }
  };
  //-----------CONNECT WALLET
  const connectWallet=async()=>{
    if(!window.ethereum)return setError("please Install Metamask");
    const account =await window.ethereum.request({method:"eth_requestAccounts"});
    setCurrentAccount(account[0]);

  };
//-------------------UPLOAD TO IPFS VOTER IMAGE
const uploadToIPFS=async(file)=>{
    try{
 const added=await client.add({content:file});
 const  url=`https://ipfs.infura.io/ipfs/${added.path}`;
 return url;
    } catch(error){
       setError("Error Uploading file to IPFS");
    }

};
//-------------------UPLOAD TO IPFS Candidate IMAGE
const uploadToIPFSCandidate=async(file)=>{
  try{
const added=await client.add({content:file});
const  url=`https://ipfs.infura.io/ipfs/${added.path}`;
return url;
  } catch(error){
     setError("Error Uploading file to IPFS");
  }

};


//------create voter
const createVoter=async(formInput,fileUrl,router)=>{

  try{
 const {name,address,position}=formInput;
 if(!name || !address || !position)
  return setError("Input data is missing");
 //connecting smart contract 
 const web3Modal= new Web3Modal();
 const connection=await web3Modal.connect();
 const provider=new ethers.providers.Web3Provider(connection);
 const signer=provider.getSigner();
 const contract=fetchContract(signer);
const data =JSON.stringify({name,address,position,image:fileUrl});
const added=await client.add(data);
const url =`https://ipfs.infura.io/ipfs/${added.path}`;
const voter=await contract.voterRight(address,name,url,fileUrl);
voter.wait();

router.push("/voterList");
  }catch(error){
    setError("something wrong creating voter");
  }
};
// -------------------GET VOTER DATA
const  getAllVoterData=async()=>{
  try{
  const web3Modal= new Web3Modal();
  const connection=await web3Modal.connect();
  const provider=new ethers.providers.Web3Provider(connection);
  const signer=provider.getSigner();
  const contract=fetchContract(signer);


  //VOTER LIST
  const voterListData=await contract.getVoterList();
  setVoterAddress(voterListData);
voterListData.map(async(el)=>{
  const singleVoterData = await contract.getVoterdata(el);
  pushVoter.push(singleVoterData);

}
);
//voter length
const voterList=await contract.getVoterLength();
setVoterLength(voterList.toNumber());
}
catch(error){
  setError("something went wrong fetching data");
}};

// useEffect(()=>{
//   getAllVoterData();
// },[]
// );
// ----------give vote 
const giveVote=async(id)=>{
  try{

  }catch(error){
    setError()
  }
};
////               candidate section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const setCandidate=async(candidateForm,fileUrl,router)=>{

  try{
 const {name,address,age}=candidateForm;
 if(!name || !address || !age)
  console.log(name,address,age,fileUrl);
 //connecting smart contract 
 const web3Modal= new Web3Modal();
 const connection=await web3Modal.connect();
 const provider=new ethers.providers.Web3Provider(connection);
 const signer=provider.getSigner();
 const contract=fetchContract(signer);
const data =JSON.stringify({name,address,image:fileUrl,age});
const added=await client.add(data);
const ipfs =`https://ipfs.infura.io/ipfs/${added.path}`;
const candidate=await contract.setCandidate(address,age,name,fileUrl,ipfs);
candidate.wait();

router.push("/");
  }catch(error){
    setError("something wrong creating voter");
  }
};
//--------------get candidate data
const getNewCandidate=async()=>{
  try{
//connecting smart contract 
const web3Modal= new Web3Modal();
const connection=await web3Modal.connect();
const provider=new ethers.providers.Web3Provider(connection);
const signer=provider.getSigner();
const contract=fetchContract(signer);
//-------------all candidate
const allCandidate=await contract.getCandidate();

allCandidate.map(async(el)=>{
const singleCandidateData=await contract.getCandidatedata(el);
pushCandidate.push(singleCandidateData);
candidateIndex.push(singleCandidateData[2].toNumber());

});
/////candidate length
const allCandidateLength=await contract.getCandidateLength();
setCandidateLength(allCandidateLength.toNumber());
  }catch(error){
   console.log(error);
  }
}
useEffect(()=>{
  getNewCandidate();
},[])
    return(
        <VotingContext.Provider
         value={{
            votingTitle,
            checkIfWalletIsConnected,
            connectWallet,
            uploadToIPFS,
            createVoter,
            getAllVoterData,
            giveVote,
            setCandidate,
            getNewCandidate,
            error,
            voterArray,
            voterLength,
            voterAddress,
            currentAccount,
            candidateLength,
            candidateArray,
            uploadToIPFSCandidate,
          }}
            >
                 {children}
                 </VotingContext.Provider>
                 );
   
    



}

