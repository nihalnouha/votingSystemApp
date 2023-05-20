import React from "react";
import Image from "next/image";
//internal import
import style from "./card.module.css";
import images from "../../src/photo/image.jpg";
const Card =({candidateArray,giveVote})=>{
    return(
    <div className={style.Card}>
        {candidateArray.map((el,i)=>(
            <div className={style.Card_box}>
                <div className={style.image}>
                    <img src={el[3]} alt="profile" />
                    </div>
                    <div className={style.Card_info}>
                        <h2>{el[1]}#{el[2].toNumber()}</h2>
                   <p>{el[0]}</p>
                   <p>
                    Address:{el[6].slice(0,30)}...</p>
                <p className={style.total}>
                    Total Vote
                </p>
                 </div>

                 <div className={style.Card_vote}>
                    <p>{el[4].toNumber()}</p>
                 </div>
                 <div className={style.Card_button}>
                    <button onClick={()=>giveVote({id:el[3].toNumber(),address:el[6]})}>
                        Give Vote
                    </button>
                 </div>
            </div>

        ))}
            </div>
    )
};
export default Card;
