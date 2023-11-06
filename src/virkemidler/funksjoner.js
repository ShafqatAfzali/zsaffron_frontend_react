import {useEffect, useState} from "react"
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Link, useNavigate } from "react-router-dom"

import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe("pk_live_51MtsmhJntTzBTQrm8AoiICALrnMhvvl6PikG192BqkTqQMzYmvEEuVhnanr9CLPycYZqX3hfL0y3Jdoa2wCixgR000ZhRaLDOF");


export function SideCart({ produkter, bought, setbought, setvis_cart, vis_cart, cart_tot, setcart_tot, enhet }) {
    // router = useRouter();
    const [vekk,settvekk]=useState(false)
    const [kryss,setkryss]=useState(false)
    const [total, settotal]=useState(0)
    const [total_quantity,settotal_quantity]=useState(0)
    const [kg, setkg]=useState("grams")
    const [hover,sethover]=useState(false)
    const navigate = useNavigate();

    const [v1,setv1]=useState(["0.7vw" /* top svg*/,"5.8vw" /*left svg */,"1vw" /*left text */,"-0.7vw" /*top text */])
    useEffect(()=>{
        console.log(enhet)
        if(enhet===360){
            setv1(["7vw","10vw", "3vw", "-5vw"])
        } else if(enhet===375){
            setv1(["7vw","10vw", "3vw", "-5vw"])
        }else if(enhet===390){
            setv1(["7vw","10vw", "3vw", "-5vw"])
        }else if(enhet===410){
            setv1(["7vw","10vw", "3vw", "-5vw"])
        }else if(enhet===550){
            setv1(["7vw","10vw", "3vw", "-5vw"])
        }else if(enhet===768){
            setv1(["2.8vh","10vw", "8vw", "-1.7vh"])
        }else if(enhet===820){
            setv1(["2.8vh","10vw", "8vw", "-1.7vh"])
        }else{
            setv1(["0.7vw","5.8vw","1vw","-0.7vw"])
        }
    },[])

    const stylene=[
        {
            position: "absolute",
            display: "inline-block",
            width: "7vw",
            height: "7vh",
            fill: "var(--color1)",
            top: v1[0],
            left: v1[1],
        },
        {
            position: "absolute",
            display: "inline-block",
            width: "7vw",
            height: "7vh",
            fill: "var(--color3)",
            top: v1[0],
            left: v1[1],
        },
        {
            position: "absolute",
            display: "inline-block",
            color: "var(--color1)",
            fontSize: "1.4em",
            fontWeight: "540",
            left: v1[2],
            top: v1[3],
        },
        {
            position: "absolute",
            display: "inline-block",
            color: "var(--color3)",
            fontSize: "1.4em",
            fontWeight: "540",
            left: v1[2],
            top: v1[3],
        }

    ]

    useEffect(()=>{
        var tt=0;
        var ttq=0;
        bought.forEach((prod)=>{
            const produktet=produkter.find((ene)=>ene.id===prod.id)
            tt+=produktet.pris*prod.amount
            var quantity=produktet.navn.split(" ")
            if(quantity[1]==="kg"){
                quantity[0]=1000;
            }
            quantity =parseInt(quantity[0]);
            ttq+=quantity*prod.amount
        })
        if(ttq>1000){
            ttq=ttq/1000
            settotal_quantity(ttq)
            setkg("kg")
        }
        settotal_quantity(ttq)
        settotal(tt)
    },[bought])

    async function send(){
        const response = await fetch(`/api/send`,{
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(bought)
        })
        if(response.ok){
            navigate("/kasse")
        }
    }
    
    function endre_antall(operasjon,element){
        if(operasjon==="plus"){
            setcart_tot(cart_tot+1)
            const ny_bought=bought.map((elem)=>{
                if(elem.id===element.id){
                    elem.amount=element.amount+1;
                    return elem
                }
                else{
                    return elem
                }
            })
            setbought(ny_bought)
        }
        else if(operasjon==="minus"){
            setcart_tot(cart_tot-1)
            if(element.amount===1){
                const ny_bought= bought.filter(ene=> ene.id !== element.id)
                setbought(ny_bought)
            } else{
                const ny_bought=bought.map((elem)=>{
                    if(elem.id===element.id){
                        elem.amount=element.amount-1;
                        return elem
                    }
                    else{
                        return elem
                    }
                })
                setbought(ny_bought)
            }
        }
    }

    const første = {
        display: "inline-block",
        position: "fixed",
        height: "100vh",
        width: "100vw",
        backgroundColor: "var(--color1)",
        top: "0vh",
        left: "0vw",
        zIndex: "3",
        animation: "Side-Cart 0.3s 1"
    }
    const andre = {
        display: "inline-block",
        position: "fixed",
        height: "100vh",
        width: "100",
        backgroundColor: "var(--color1)",
        top: "0vh",
        left: "100vw",
        zIndex: "3",
    }
    const tredje = {
        display: "inline-block",
        position: "fixed",
        height: "100vh",
        width: "100",
        backgroundColor: "var(--color1)",
        top: "0vh",
        left: "100vw",
        zIndex: "3",
        animation: "Side_Cart_bak 0.3s 1"
    }

    if (bought.length > 0) {
        return <div className="Side-cart" style={vis_cart ? (vekk ? tredje: første) : andre}>
            
            <div className="logo">
                <h5 className='midlertidig-logo'>Zsaffron</h5>
            </div>
            <h1 className="cart-header">Cart</h1>

            <svg onMouseOver={()=>{setkryss(true)}} onMouseLeave={()=>{setkryss(false)}} className="kryss-svg" onClick={()=>{settvekk(true); setTimeout(()=>{setvis_cart(false)},300)}} fill="#a1761f" width={kryss ? "40px" : "38px"} height={kryss ? "40px" : "38px"} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 14.545L1.455 16 8 9.455 14.545 16 16 14.545 9.455 8 16 1.455 14.545 0 8 6.545 1.455 0 0 1.455 6.545 8z" fillRule="evenodd"/>
            </svg>
            
            <div className='Selected'>
                {bought.map((element, index) => {
                    const valgt = produkter.find((ene) => ene.id === element.id);
                    const total = parseInt(element.amount) * parseInt(valgt.pris);
                    return <div className='bought-elements' key={index}>
                        <div className="quantity_div">
                            <div className="grid_item">
                                <h6 className="pluss" onClick={()=>endre_antall("plus",element)}>+</h6>
                            </div>
                            <div className="grid_item">
                                <h6 className="bought-element-valgt">{element.amount}</h6>   
                            </div>
                            <div className="grid_item">
                                <h6 className="minus" onClick={()=>endre_antall("minus",element)}>-</h6>
                            </div>
                        </div>
                        <img src={valgt.img} alt="" className='bought-element-img' />
                        <h6 className='bought-element-quantity'>Quantity: {valgt.navn}</h6>
                        <h6 className="bought-element-price" >Price: {valgt.pris} NOK</h6>
                        <h6 className="bought-element-price_eur" >Price: {(valgt.pris/11.5).toFixed(1)} EUR</h6>
                        <h6 className='bought-element-total'>total(kr): {total} NOK</h6>
                        <h6 className='bought-element-total_eur'>total(eur): ~{(total/11.5).toFixed(1)} EUR</h6>
                    </div>
                })}
            </div>
            
            <div className="cart_bunn">
                <h3 className="total_quantity">Total Quantity: {total_quantity} {kg}</h3>
                <h3 className="total">Total(nok): {total} NOK</h3>
                <h3 className="total_eur">Total(eur): {(total/11.5).toFixed(1)} EUR</h3>
                <div className="payment_btn" onClick={send} onMouseOver={()=>{sethover(true)}} onMouseLeave={()=>{sethover(false)}}>
                    <h3 className="payment_text" style={hover ? stylene[3] : stylene[2]}>Checkout</h3>
                    <svg style={hover ? stylene[1] : stylene[0]} className="payment_svg" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 81.28 122.88"><title>payment</title><path className="cls-1" d="M0,49.17,49.6,0,81.28,31.13l-5.11,2.38-22-21.59-.26-.27a5.06,5.06,0,0,0-7.15.16l-1.79,1.86-.06-.06-8.4,8.9L4.34,53.42,0,49.17ZM13.41,76.85l-.3,1.92c-.79,5.12-2.07,13.44-2.59,16.38a2.18,2.18,0,0,1-.17.51,1.29,1.29,0,0,1-.26.42,19.68,19.68,0,0,0-1.61,2.39,6.65,6.65,0,0,0-.76,1.89,2.23,2.23,0,0,0,0,1,1.73,1.73,0,0,0,.48.79C13.08,107.05,18.26,112,23,117a6.54,6.54,0,0,0,5.34,1.68,31.75,31.75,0,0,0,5.3-1.15,43.8,43.8,0,0,0,5.54-1.61,15.85,15.85,0,0,0,4.9-3l4.08-4.26a1.37,1.37,0,0,1,.19-.22l0,0c.12-.12.47-.47,1-.94l0,0c2.7-2.64,6-5.89,4.13-8.59l-1.37-1.37-1,.9L49.8,99.53c-.7.61-1.35,1.19-1.94,1.77a2.11,2.11,0,0,1-3-3c.63-.63,1.39-1.31,2.18-2l.1-.08c2.65-2.35,5.68-5,4.2-7.2l-1.61-1.61c-.38.39-.78.76-1.18,1.13s-1,.92-1.52,1.36L46.9,90c-.68.6-1.32,1.16-1.91,1.75a2.11,2.11,0,0,1-3-3c.61-.61,1.36-1.28,2.15-2l.12-.11c2.65-2.34,5.68-5,4.21-7.2-.56-.55-1.13-1.1-1.67-1.67l-4.48,4.48a2.11,2.11,0,0,1-3-3l9-9a7.51,7.51,0,0,0,1.89-2.88,4.36,4.36,0,0,0,.08-2.8,3.8,3.8,0,0,0-.37-.79,3.69,3.69,0,0,0-.52-.66,3.48,3.48,0,0,0-.67-.53,4,4,0,0,0-.78-.36,4.34,4.34,0,0,0-2.79.1,8.14,8.14,0,0,0-2.94,2L20.59,86.06a2.11,2.11,0,0,1-3-3l.94-.93-5.16-5.27Zm10.15.28L36.42,64.27l-.24-.07A9.18,9.18,0,1,1,47.87,58a8.27,8.27,0,0,1,1.41.33h0a8,8,0,0,1,1.65.76,8.1,8.1,0,0,1,1.45,1.14l0,0a7.7,7.7,0,0,1,.54.6L65.12,48.41a6,6,0,0,1,.1-8.43L54.06,28.58a6,6,0,0,1-8.44-.09h0L15,59.9A6,6,0,0,1,15,68.33l8.61,8.8Zm30.78-8.58v0a11.7,11.7,0,0,1-3,4.85l-1.47,1.46,1.74,1.74.16.18.14.19a6.16,6.16,0,0,1,.52,7.14l.05,0a2.91,2.91,0,0,1,.33.26l1.7,1.71a.93.93,0,0,1,.16.18l.13.17a6.48,6.48,0,0,1,1.42,4.23A7,7,0,0,1,55,94.19l1.69,1.68.16.19.12.17c4.14,5.66-.68,10.37-4.57,14.17-.26.31-.69.69-1,1-1.36,1.42-3,3.34-4.4,4.6-3.92,3.55-7.78,4.5-12.25,5.59a32.67,32.67,0,0,1-6.12,1.27,10.61,10.61,0,0,1-8.52-2.9L5.33,105.18a5.8,5.8,0,0,1-1.59-2.55,6.49,6.49,0,0,1-.08-3.08v0a10.41,10.41,0,0,1,1-2.74A19.92,19.92,0,0,1,6.52,93.9c.38-2.17,1.21-7.7,2-12.78.45-3.05.89-5.92,1.22-8L1.43,64.63,50.6,15h0L78.83,43.85,54.34,68.55Z"/></svg>
                </div>
            </div>
            
        </div>
    }
    else {
        return <div className="Side-cart" style={vis_cart ? (vekk ? tredje: første) : andre}>
            <div className="logo">
                <h5 className='midlertidig-logo'>Zsaffron</h5>
            </div>
            <h1 className="cart-header">Cart</h1>
            <svg onMouseOver={()=>{setkryss(true)}} onMouseLeave={()=>{setkryss(false)}} className="kryss-svg" onClick={()=>{settvekk(true); setTimeout(()=>{setvis_cart(false)},300)}} fill="#a1761f" width={kryss ? "35px" : "30px"} height={kryss ? "35px" : "30px"} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 14.545L1.455 16 8 9.455 14.545 16 16 14.545 9.455 8 16 1.455 14.545 0 8 6.545 1.455 0 0 1.455 6.545 8z" fillRule="evenodd"/>
            </svg>
            <h1 className="empty">Cart is empty</h1>
            </div>
    }

}

export function Cart({ cart_tot }) {

    return <div className='cart-div'>
        <svg className="cart-svg" fill="none" viewBox="0 0 95 35">
            <path d="m69 10v25c0 0.6901-0.2404 1.3346-0.7212 1.9336-0.4807 0.599-1.1418 1.1263-1.9831 1.582-0.8414 0.4558-1.827 0.8138-2.9568 1.0742-1.1298 0.2605-2.3197 0.3972-3.5697 0.4102h-41.538c-1.2741 0-2.464-0.1302-3.5697-0.3906-1.1058-0.2604-2.0794-0.6185-2.9207-1.0742-0.8414-0.4558-1.5024-0.9831-1.9832-1.5821-0.48077-0.5989-0.73317-1.25-0.75721-1.9531v-25h9.2308v-2.5c0-1.0286 0.3605-1.9987 1.0817-2.9102 0.7212-0.91145 1.7187-1.7057 2.9928-2.3828 1.274-0.67708 2.7404-1.2109 4.399-1.6016 1.6587-0.39062 3.4495-0.59245 5.3726-0.60547 2.5 0 4.8197 0.33854 6.9592 1.0156 2.1394-0.67708 4.4351-1.0156 6.887-1.0156 1.899 0 3.6899 0.19531 5.3726 0.58594 1.6827 0.39062 3.149 0.93099 4.399 1.6211 1.25 0.69011 2.2356 1.4844 2.9567 2.3828 0.7212 0.89844 1.0938 1.8685 1.1178 2.9102v2.5h9.2308zm-13.846-2.5c0-0.67708-0.2403-1.3216-0.7211-1.9336s-1.1418-1.1393-1.9832-1.582c-0.8413-0.44271-1.8269-0.80079-2.9567-1.0742-1.1298-0.27344-2.3197-0.41016-3.5697-0.41016-1.0818 0-2.1034 0.09766-3.0649 0.29297 0.6971 0.46875 1.25 0.93099 1.6586 1.3867 0.4087 0.45573 0.7092 0.91146 0.9015 1.3672 0.1923 0.45572 0.3245 0.91796 0.3966 1.3867s0.1082 0.97006 0.1082 1.5039v1.5625h9.2307v-2.5zm-32.308 2.5h18.462v-2.5c0-0.67708-0.2404-1.3216-0.7212-1.9336-0.4807-0.61198-1.1418-1.1393-1.9831-1.582-0.8414-0.44271-1.827-0.80079-2.9568-1.0742-1.1298-0.27344-2.3197-0.41016-3.5697-0.41016-1.274 0-2.4639 0.13021-3.5697 0.39062-1.1058 0.26042-2.0793 0.61849-2.9207 1.0742-0.8413 0.45573-1.5024 0.98959-1.9831 1.6016-0.4808 0.61198-0.7332 1.2565-0.7572 1.9336v2.5zm28.918 27.5c-0.8173-0.7812-1.2259-1.6146-1.2259-2.5v-22.5h-36.923v22.5c0 0.3516 0.1202 0.6771 0.3606 0.9766 0.2403 0.2994 0.5649 0.5599 0.9735 0.7812 0.4087 0.2214 0.9015 0.4037 1.4784 0.5469s1.1779 0.2083 1.8029 0.1953h33.534zm12.62-25h-9.2308v22.5c0 0.3516 0.1202 0.6771 0.3606 0.9766 0.2404 0.2994 0.5649 0.5599 0.9736 0.7812 0.4086 0.2214 0.9014 0.4037 1.4783 0.5469 0.577 0.1432 1.1779 0.2083 1.8029 0.1953 0.6491 0 1.25-0.0651 1.8029-0.1953s1.0337-0.306 1.4423-0.5274c0.4087-0.2213 0.7452-0.4882 1.0096-0.8007 0.2645-0.3125 0.3847-0.6381 0.3606-0.9766v-22.5z" fill="#a1761f" /></svg>
        <h1 className='cart-tall'>{cart_tot}</h1>

    </div>
}

export function Betaling({bought}) {
  const [clientSecret, setClientSecret] = React.useState("");

  React.useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: bought }),
    })
      .then((res)=> res.json())
      .then((data)=> setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}