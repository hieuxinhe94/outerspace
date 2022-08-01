
import React from 'react';
import { Outlet, Link } from "react-router-dom";
import Menu from './components/Menu';

export default function Layout (){
    return (
        <>
        <Link className="absolute top-left logo" to="/">
            
                <a href="#2" className='lb-lg'> <img src='logo-text.png' alt='outerspace logo' height='35' width='auto' /> </a>
        </Link>
        
          <Menu/>
          <Outlet />
        </>
      )
}