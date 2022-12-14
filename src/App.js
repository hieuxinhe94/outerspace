import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OtScene from './pages/otscene'
import OtSpace from './pages/otspace'
import OtSpace2 from './pages/otspace-2'
import Home from './Home'
import Layout from './Layout'
import SignIn from './pages/signin';
import Explore from './pages/explore';
import DevelopingPage from './pages/developing';
export default function App() {
   
  return (
    <>
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="random-journey" element={<Explore />} />
          <Route path="scene/:id" element={<OtScene />} />
          <Route path="space/2" element={<OtSpace2 />} />
          <Route path="space/:id" element={<OtSpace />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="*" element={<DevelopingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}
