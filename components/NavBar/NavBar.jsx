import React ,{useState,useContext}from "react";
import Image from 'next/image';
import Link from 'next/link';
import {AilFillLock,AilFillUnlock}from'react-icons/ai';
//internal import
import{VotingContext} from '../../context/Voter';
import style from './NavBar.module.css';
import loading from '../../src/photo/logo.jpg';





const NavBar =()=>{
    const { connectWallet,error, currentAccount}=useContext(VotingContext);
    const [openNav,setOpenNav] = useState(true);
    const openNavigation=()=>{
        if(openNav){
            setOpenNav(false);
        }
        else if(!openNav){
        setOpenNav(true)
        }
    }

   
    return(
        <div className={style.navbar}>
            {error===""?(
                ""
            ):(
                <div className={style.message__box}>
                    <div className={style.message}>
                    <p>{error}</p>
                    </div>
                </div>
            )
            }
            <div className={style.navbar_box}>
                
                <div className={style.title}>
                    
                    <Link href={{pathname:'/'}}>
                    
                   <Image src={loading} alt ="logo" width={80} height={80} className="navbar-logo" />
                   <h1 className="navbar-title">VoteChain</h1>
                  
            
                            
                     
                        
                    </Link>
                  
                </div>
                <div className={style.connect}>
                    {currentAccount?(
                        <div>
                            <div className={style.connect_flex}>
                                <button onClick={()=>openNavigation()}>
                                    {currentAccount.slice(0,10)}..
                                </button>
                                {currentAccount && (
                                    <span>
                                        {openNav?(
                                            <AilFillUnlock onClick={()=>openNavigation()}/>
                                        ):(
                                            <AilFillLock onClick={()=>openNavigation()}/>
                                        )}
                                    </span>
                                )}
                            </div>
                            {openNav && (
                                <div className={style.navigation}>

                                    <p>
                                        <Link href={{pathname:"/"}}>Home</Link>
                                    </p>
                                    <p>
                                        <Link href={{pathname:"candidate-registration"}}>Candidate Registration</Link>
                                    </p>
                                    <p>
                                        <Link href={{pathname:"allowd-voters"}}>Voter Registration</Link>
                                    </p>
                                    <p>
                                        <Link href={{pathname:"voterList"}}>Voter List </Link>
                                    </p>
                                    </div>
                            )}
                        </div>
                    ):(
                     <button onClick={()=>connectWallet()}>Connect Wallet</button>
                    )}
                </div>
            </div>
        </div>
    )
};
export default  NavBar;