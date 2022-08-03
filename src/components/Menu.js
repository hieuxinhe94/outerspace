
import React, { useRef } from 'react'
import { useDetectOutsideClick } from "../helper/useDetectOutsideClick";
import {
    Link
  } from 'react-router-dom';

export default function Menu (){
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
    const onMenuClick = () => { console.log('clicked menu'); setIsActive(!isActive)};

    return (<>
    <div  onMouseEnter={onMenuClick} onClick={onMenuClick} className="absolute top-right menu-icon" type="button"> 
      <label    class="menu-icon" for="check">
        <input type="checkbox" id="check"/> 
        <span></span>
        <span></span>
        <span></span>
      </label>
      </div>  
    
      <nav
          ref={dropdownRef}
          className={`menu ${isActive ? "active" : "inactive"}`}
        >
          <ul class='menu-list'>
            <li class='menu-item'>
                <Link  to="/sign-up">Register</Link>
            </li>
            <li class='menu-item'>
                <Link  to="/random-journey">Explore as GUEST</Link>
            </li>
            <li class='menu-item'>
                <Link  to="/dashboard">Manage your Space</Link>
            </li>
            <li class='menu-item'>
                <Link  to="/help">Help</Link>
            </li>
          </ul>
        </nav>
     </>)
}
 