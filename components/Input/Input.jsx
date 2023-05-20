import React ,{useContext}from "react";
//INTERNAT IMPORT 
import style from './Input.module.css';




const Input = ({inputType,title,placeholder,handleClick}) =>{
    return( 
    <div className={style.input}>
        <p>{title}</p>
        {inputType==="text"?(
            <div className={style.input__box}>
                <input type="text" className={style.input__box__form} placeholder={placeholder}onChange={handleClick}/>
            </div>
        ):(
            ""
        )}
    </div>


    )
};



export default Input;