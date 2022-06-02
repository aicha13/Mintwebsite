import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import yourcollection from './artifacts/contracts/yourcollection.sol/yourcollection.json';
import './App.css';
import img1 from './img/1.png';
import img2 from './img/2.png';

const YCaddress = "0x119510Da5eebd0A2aaaCbD10D6fff7D65e9fd70f";

function App() {

  const [error, setError] = useState('');
  const [data, setData] = useState({})



  useEffect(() => {
    fetchData();
  }, [])

  async function fetchData(){
    if(typeof window.ethereum !== 'undefined'){
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(YCaddress, yourcollection.abi, provider);
      try{
        const cost = await contract.cost();
        const totalSupply = await contract.totalSupply();
        const object = {"cost": String(cost), "totalSupply": String(totalSupply)};
        setData(object);
      }
      catch(err){
        setError(err.message);
      }
    }
  }


  const function isOwner(){
    
  }

  async function mint(){
    if(typeof window.ethereum !== 'undefined') {
      let accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(YCaddress, yourcollection.abi, signer);
      try{
        let overrides = {
          from: accounts[0],
          value: data.cost
        }
        const transaction = await contract.mint(accounts[0], 1, overrides);
        await transaction.wait();
        fetchData();
      }
      catch(err){
        setError(err.message);
      }
    }
  }

  return (
    <div className="App">
      <div className='banner'>
        <img src={img1} alt="img" />
        <img src={img2} alt="img" />
      </div>
      {error && <p>{error}</p>}
      <h1>Mint a yourcollection NFT !</h1>4
      <p className="count">{data.totalSupply} /5</p>
      <p className="cost">Each yourcollection NFT costs {data.cost /10**18} eth (excluding gas fees)</p>
      <button onClick={mint}>Buy one yourcollection NFT</button>
    </div>
  );
}

export default App;
