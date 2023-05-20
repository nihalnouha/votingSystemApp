import style from './Button.module.css'
const Button =({btnName,handleClick,classStyles})=>(
    <button className={style.button} type='button ' onClick={handleClick}>
        {btnName}
    </button>
);
export default Button;