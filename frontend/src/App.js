import React from "react";
import { Route, Routes, Navigate} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Nfts from "./components/nfts/Nfts";
import NftForm from "./components/nfts/NftForm";
import Creators from "./components/creators/Creators";
import CreatorForm from "./components/creators/CreatorForm";
import Buyers from "./components/buyers/Buyers";
import BuyerForm from "./components/buyers/BuyerForm";
function App() {
    return (
        <>
        <h1><center>NFT MARKET-HISTORY</center></h1>
            <Navbar/>
            <div className='container'>
                <Routes>
                    <Route path="/" element={<Navigate to="/nfts"/>}/>
                    <Route path="/nfts" element={<Nfts/>}/>
                    <Route path="/nfts/:id" element={<NftForm/>}/>
                    <Route path="/nfts/new" element={<NftForm/>}/>
                    <Route path="/creators" element={<Creators/>}/>
                    <Route path="/creators/:id" element={<CreatorForm/>}/>
                    <Route path="/creators/new" element={<CreatorForm/>}/>
                    <Route path="/buyers" element={<Buyers/>}/>
                    <Route path="/buyers/:id" element={<BuyerForm/>}/>
                    <Route path="/buyers/new" element={<BuyerForm/>}/>
                </Routes>
            </div>
            <Footer/>
        </>
    );
}

export default App;
