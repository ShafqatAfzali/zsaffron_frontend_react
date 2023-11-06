import { useState } from "react";
import {Cart, SideCart} from "../virkemidler/funksjoner"
import React from "react";

import "../styles/navbar.css"
import "../styles/globals.css"
import "../styles/products.css"
import "../styles/contact.css"
import "../styles/sidecart.css"

import bildet1 from "../pics/bilder/bildet1.jpg"
import bildet2 from "../pics/bilder/bildet2.jpg"
import bildet3 from "../pics/bilder/bildet3.jpg"
import bildet4 from "../pics/bilder/bildet4.jpg"
import bildet5 from "../pics/bilder/bildet5.jpg"
import bildet6 from "../pics/bilder/bildet6.jpg"
import video from "../pics/video.mp4"

export default function Home(){
    const produkter=[{
        id:1,
        navn:"1 gram",
        pris: 35,
        img:bildet1
      }, {
        id:2,
        navn:"5 gram",
        pris: 170,
        img:bildet2
      }, {
        id:3,
        navn:"10 gram",
        pris: 330,
        img:bildet3
      }, {
        id:4,
        navn:"50 gram",
        pris: 1600,
        img:bildet4
      }, {
        id:5,
        navn:"100 gram",
        pris: 3000,
        img:bildet5
      }, {
        id:6,
        navn:"1 kg",
        pris: 29000,
        img:bildet6
    }]

    const [vis_cart, setvis_cart] = useState(false);
    const [cart_tot, setcart_tot] = useState(0);
    const [bought, setbought] = useState([]);
    const [ned,settned]=useState(true)
    const [enhet,setenhet]=useState(0)
    
    React.useEffect(() => {
    if(window.innerWidth>=360 && window.innerWidth<375){
        setenhet(360)
    } else if(window.innerWidth>=375 && window.innerWidth<390){
        setenhet(375)
    } else if(window.innerWidth>=390 && window.innerWidth<410){
        setenhet(390)
    } else if(window.innerWidth>=410 && window.innerWidth<550){
        setenhet(410)
    }else if(window.innerWidth>=550 && window.innerWidth<768){
        setenhet(550)
    } else if(window.innerWidth>=768 && window.innerWidth<820){
        setenhet(768)
    } else if(window.innerWidth>=820 && window.innerWidth<= 920){
        setenhet(820)
    } else{
        setenhet(window.innerWidth)
    }}, []);
    
    
    function add(produkt_id) {
        setcart_tot(cart_tot + 1);
        const produktet = produkter.find((prod)=>prod.id===produkt_id)
        var finns = false;
        if (bought.length !== 0) {
          bought.forEach((prod)=>{
            if(prod.id===produktet.id){
              finns=true;
            }
          })
        }
        if (finns) {
          var kjøpte_prod = bought.find((ene) => ene.id === produktet.id)
          var ind = bought.indexOf(kjøpte_prod);
          kjøpte_prod.amount += 1;
          var new_bought = bought;
          new_bought[ind] = kjøpte_prod;
          setbought(new_bought);
        }
        if (!finns) {
          setbought([...bought, { id: produktet.id, amount: 1, }]);
        }
    }
    
    const pil_før={
        width: "5.5%",
        verticalAlign: "middle",
        color: "var(--color1)",
        animation: "pil_ned 0.6s 10000"
    }
    const pil_etter={
        display:"none",
    }

    return <div className="all">
    <div className="App">
    <section className="navbar">
      <div className="cart" onClick={() => setvis_cart(true)}>
        <Cart cart_tot={cart_tot} />
      </div>
    </section>
    
    <div className="logo">
        <h5 className='midlertidig-logo'>Zsaffron</h5>
    </div>

    <section className="hoved">
      {vis_cart && <SideCart enhet={enhet} produkter={produkter} bought={bought} setvis_cart={setvis_cart} vis_cart={vis_cart} setbought={setbought} cart_tot={cart_tot} setcart_tot={setcart_tot} />}

      <div className="about">
        <video className='video' src={video} autoPlay loop muted></video>
        <h1 className='cheap'>Quality</h1>
        <h1 className='fast'>Saffron</h1>
        <h1 className='easy'>Affordable</h1>
        <div className='pil_ned' style={ned ? pil_før : pil_etter}>
          <a className='pil_ned_lenke' href='#products' onClick={()=>{settned(false)}}> </a>
          <h3 className='produkt_pil'>products</h3>
          <svg width="100%" height="100%" viewBox="0 0 245 190" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L129 187.5L244 1M14 1L129 171L234.5 1M24.5 1L129 154L223.5 1" stroke="#c3c3c3" strokeWidth="6"/>
        </svg>  
        </div>
      </div>

      <section className='main'>
      <section className="products" id='products'>

          {produkter.map((ene,index)=>{
            return <div className='produkt_inf' key={index}>
            <img src={ene.img} alt="cart bildet" className='bildet'/>
            <div className='prod_inf_div'>
            <h3 className='Quantity'> Quantity : {ene.navn}</h3>
            <h3 className='Price_nok'> Price (kr): {ene.pris}NOK</h3>
            <h3 className='Price_eur'> Price (eu): ~{(ene.pris/11.5).toFixed(1)}EUR</h3>
            <h3 className='origin'> origin: Qaenat, Iran</h3>
            </div>
            <button className='set_to_cart_btn' onClick={() => { add(ene.id); setvis_cart(true) }}>Add to Cart</button>
            </div>
          })}

      </section>
      <section className="contact">
        <h3 className='email'>Email: zsaffroncontact@gmail.com</h3>
        <h3 className='number'>Telephone: +4798688608</h3>
        <h3 className='org_number'> Organasation nr: 931655833</h3>
        <div className='facebook' >
        <a className="facebook_lenke" rel="noreferrer" target= "_blank" href="https://www.facebook.com/people/Zsaffron/61550893843224/"> </a>
          <svg xmlns="http://www.w3.org/2000/svg" width="2.2vw" height="2.2vw" className='facebook_svg' viewBox="0 0 99.545 99.545">
            <path id="Facebook-Icon-9imsd" d="M49.766.157A49.772,49.772,0,1,0,99.545,49.926,49.829,49.829,0,0,0,49.766.157M62.152,51.678h-8.1v28.87h-12V51.678H36.348v-10.2h5.706v-6.6c0-4.719,2.243-12.109,12.109-12.109l8.889.037v9.9H56.6a2.441,2.441,0,0,0-2.544,2.778v6H63.2Z" transform="translate(0 -0.157)" fill="#a1761f"/>
            </svg>
        </div>
      </section>

    </section>
    </section>
    </div>
    </div>
}