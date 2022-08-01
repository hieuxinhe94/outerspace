
import React from 'react'
import { Link } from 'react-router-dom'
 

export default function Post ({data}){



  return (<>
    <div>
      <img class="lb-lg" alt='' height={200} width={250} src='https://cdn2.unrealengine.com/tfoa-blog-feed-01-1920x1080-75716018bc86.jpg'/>
    </div>
    <div >
      <span class="lb-lg-2x"> New release brings Mesh to MetaHuman to Unreal Engine, and much more!</span>
    </div>
   
    <div>
      <span class="lb-lg">
      This release of the MetaHuman framework brings not only new features for MetaHuman Creator.
      This release of the MetaHuman framework brings not only new features for MetaHuman Creator.
      </span>
      </div>
    <br/>
    <Link to="/scene?id=1&token=" class="btn-round-lg">EXPLORE</Link>
</>)
}
 