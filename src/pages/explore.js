
import React from 'react';
import Post from '../components/Post';
 
export default function Explore (){
  var rootPage = document.body;
  rootPage.style.height = "auto";
  rootPage.style.overflowY = "scroll";
    return (<>
    <section className='section-content'>
        <h1 className=''>Explore thousands of public space</h1>
         
        <div className='grid-lg'>
           <center class="grid-post"> 
           <Post />
           </center>
           <center class="grid-post"> 
           <Post />
            </center>
      
          <center class="grid-post"> 
          <Post />
          </center>  
          <center class="grid-post"> 
          <Post />
          </center>  
         
          </div>

        </section> 
    </>)
}
 