
import React from 'react'
import { Link } from 'react-router-dom'
 

export default function Post ({data}){



  return (<>
    <div>
      <img class="lb-lg" alt='' height={200} width={300} src='https://i.postimg.cc/9MKYMHPq/image.png'/>
    </div>
    <div >
      <span class="lb-lg-2x"> New release Bloody Mary! - Gương thần</span>
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
 