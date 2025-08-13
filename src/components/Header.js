import React from "react";
import style from "./Header.module.css";

export default function Header(){
    return(
        <header>
            <img 
               src="./images/troll-face.png" 
               alt="troll-face"
               className={style.trollFace}
            />
            <h3>Meme Generator</h3>
            <h4>React Course - Project 3</h4>
        </header>
    );
}