import { useState, useEffect } from "react"

import { Betaling } from '../virkemidler/funksjoner';
import "../styles/chekout.css"
import "../styles/Betaling.css"

import bildet1 from "../pics/bilder/bildet1.jpg"
import bildet2 from "../pics/bilder/bildet2.jpg"
import bildet3 from "../pics/bilder/bildet3.jpg"
import bildet4 from "../pics/bilder/bildet4.jpg"
import bildet5 from "../pics/bilder/bildet5.jpg"
import bildet6 from "../pics/bilder/bildet6.jpg"

function Kasse(){
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

    const [navn, setnavn] = useState("")
    const [email, setemail] = useState("")
    const [tlf, settlf]= useState("")
    const [country, setcountry] = useState("")
    const [zip_code, setzip_code] = useState("")
    const [adresse, setadresse] = useState("")
    const [city, setcity]=useState("");
    const [vis,setvis]= useState(false)
    const [total_pris, settotal_pris]=useState(0)
    const [shipping,setshipping]=useState(0)
    const [kalkulert,setkalkulert]=useState(0)
    const [fylt_riktig,setfylt_riktig]=useState(true)
    const [riktignavn, setriktignavn] = useState(true)
    const [riktigemail, setriktigemail] = useState(true)
    const [riktigtlf, setriktigtlf]= useState(true)
    const [riktigcountry, setriktigcountry] = useState(true)
    const [riktigzip_code, setriktigzip_code] = useState(true)
    const [riktigadresse, setriktigadresse] = useState(true)
    const [riktigcity, setriktigcity]=useState(true);
    const [bought,setbought] = useState([])
    const [loading,setloading]=useState(true)

    useEffect(()=>{
       async function get(){
            const response =await  fetch(`/api/send`,{
                method: "GET",
                headers:{
                    "Accept":"application/json"
                }
            })
            const new_bought=await response.json();
            setbought(new_bought)

            let ttq=0;
            let tt=0;
            new_bought.forEach((ene)=>{
              const prod=produkter.find((pr)=>pr.id===ene.id)
              tt=tt+(prod.pris*ene.amount)
              if(prod.navn.split(" ")[1]==="kg"){
                ttq+=ene.amount*parseInt(prod.navn.split(" ")[0])*1000;
              }else{
                ttq+=ene.amount*parseInt(prod.navn.split(" ")[0]);
              }
            })
            if(ttq>4000){
              setshipping(600)
            } else if(ttq>1000 && ttq<=4000){
              setshipping(450)
            }else if(ttq>300 && ttq<=1000){
              setshipping(200)
            } else if(ttq>50 && ttq<=300){
              setshipping(110)
            } else{
              setshipping(42)
            }
            settotal_pris(tt)
          }
          get().then(()=>{setloading(false);})
    },[])

    async function settinn(e) {
      e.preventDefault();
      if (navn && email && adresse && tlf && country && zip_code && city) {
        
          const kunde = { 
            navn: navn, 
            email: email, 
            telefon: tlf,
            country:country, 
            zip_code:zip_code,
            city:city, 
            Adresse: adresse }
          const data=JSON.stringify({kunde:kunde,bought:bought})
          const response = await fetch("/api/kjopt",{
            method: "POST",
            headers:{
              "Content-Type":"application/json"
            },
            body:data
          })
          if(response.ok){
            setvis(true)
          }
        
      }
    }

    const input_style=new Map([
      ["navn",[
        { position: "absolute",
          borderRadius: "10px",
          borderWidth: "0px",
          backgroundColor: "var(--color1)",
          outlineWidth: "0px",
          textAlign: "center",
          height: "12%",
          color:"var(--color3)",
          fontSize: "1.1em",
          fontWeight: "500",
          boxShadow: "0px 0px 7px 2px var(--color3)",
          width:"35%",
          top: "29%",
          left: "10%"
        },
        {
          position: "absolute",
          borderRadius: "10px",
          borderWidth: "0px",
          backgroundColor: "var(--color1)",
          outlineWidth: "0px",
          textAlign: "center",
          height: "12%",
          color:"var(--color3)",
          fontSize: "1.1em",
          fontWeight: "500",
          boxShadow: "0px 0px 7px 2px var(--color2)",
          width:"35%",
          top: "29%",
          left: "10%"
        }
      ]],
      ["emailen",[
        { position: "absolute",
          borderRadius: "10px",
          borderWidth: "0px",
          backgroundColor: "var(--color1)",
          outlineWidth: "0px",
          textAlign: "center",
          height: "12%",
          color:"var(--color3)",
          fontSize: "1.1em",
          fontWeight: "500",
          boxShadow: "0px 0px 7px 2px var(--color3)",
          width:"75%",
          top: "8%",
          left: "10%"
          },
        {
          position: "absolute",
          borderRadius: "10px",
          borderWidth: "0px",
          backgroundColor: "var(--color1)",
          outlineWidth: "0px",
          textAlign: "center",
          height: "12%",
          color:"var(--color3)",
          fontSize: "1.1em",
          fontWeight: "500",
          boxShadow: "0px 0px 7px 2px var(--color2)",
          width:"75%",
          top: "8%",
          left: "10%"
        }
      ]],
      ["tlf",[
        { position: "absolute",
        borderRadius: "10px",
        borderWidth: "0px",
        backgroundColor: "var(--color1)",
        outlineWidth: "0px",
        textAlign: "center",
        height: "12%",
        color:"var(--color3)",
        fontSize: "1.1em",
        fontWeight: "500",
        boxShadow: "0px 0px 7px 2px var(--color3)",
        width:"35%",
        top: "29%",
        left: "50%"
        },
        {
          position: "absolute",
        borderRadius: "10px",
        borderWidth: "0px",
        backgroundColor: "var(--color1)",
        outlineWidth: "0px",
        textAlign: "center",
        height: "12%",
        color:"var(--color3)",
        fontSize: "1.1em",
        fontWeight: "500",
        boxShadow: "0px 0px 7px 2px var(--color2)",
        width:"35%",
        top: "29%",
        left: "50%"
        }
      ]],
      ["country",[
        { position: "absolute",
        borderRadius: "10px",
        borderWidth: "0px",
        backgroundColor: "var(--color1)",
        outlineWidth: "0px",
        textAlign: "center",
        height: "12%",
        color:"var(--color3)",
        fontSize: "1.1em",
        fontWeight: "500",
        boxShadow: "0px 0px 7px 2px var(--color3)",
        width:"35%",
        top: "49%",
        left: "10%"
        },
        {
          position: "absolute",
        borderRadius: "10px",
        borderWidth: "0px",
        backgroundColor: "var(--color1)",
        outlineWidth: "0px",
        textAlign: "center",
        height: "12%",
        color:"var(--color3)",
        fontSize: "1.1em",
        fontWeight: "500",
        boxShadow: "0px 0px 7px 2px var(--color2)",
        width:"35%",
        top: "49%",
        left: "10%"
        }
      ]],
      ["zip_code",[
        { position: "absolute",
        borderRadius: "10px",
        borderWidth: "0px",
        backgroundColor: "var(--color1)",
        outlineWidth: "0px",
        textAlign: "center",
        height: "12%",
        color:"var(--color3)",
        fontSize: "1.1em",
        fontWeight: "500",
        boxShadow: "0px 0px 7px 2px var(--color3)",
        width:"35%",
        top: "49%",
        left: "50%"
        },
        {
          position: "absolute",
        borderRadius: "10px",
        borderWidth: "0px",
        backgroundColor: "var(--color1)",
        outlineWidth: "0px",
        textAlign: "center",
        height: "12%",
        color:"var(--color3)",
        fontSize: "1.1em",
        fontWeight: "500",
        boxShadow: "0px 0px 7px 2px var(--color2)",
        width:"35%",
        top: "49%",
        left: "50%"
        }
      ]],
      ["city",[
        { position: "absolute",
        borderRadius: "10px",
        borderWidth: "0px",
        backgroundColor: "var(--color1)",
        outlineWidth: "0px",
        textAlign: "center",
        height: "12%",
        color:"var(--color3)",
        fontSize: "1.1em",
        fontWeight: "500",
        boxShadow: "0px 0px 7px 2px var(--color3)",
        width:"35%",
        top: "67%",
        left: "10%"
        },
        {
          position: "absolute",
        borderRadius: "10px",
        borderWidth: "0px",
        backgroundColor: "var(--color1)",
        outlineWidth: "0px",
        textAlign: "center",
        height: "12%",
        color:"var(--color3)",
        fontSize: "1.1em",
        fontWeight: "500",
        boxShadow: "0px 0px 7px 2px var(--color2)",
        width:"35%",
        top: "67%",
        left: "10%"
        }
      ]],
      ["adresse",[
        { position: "absolute",
        borderRadius: "10px",
        borderWidth: "0px",
        backgroundColor: "var(--color1)",
        outlineWidth: "0px",
        textAlign: "center",
        height: "12%",
        color:"var(--color3)",
        fontSize: "1.1em",
        fontWeight: "500",
        boxShadow: "0px 0px 7px 2px var(--color3)",
        width:"35%",
        top: "67%",
        left: "50%"
        },
        {
          position: "absolute",
        borderRadius: "10px",
        borderWidth: "0px",
        backgroundColor: "var(--color1)",
        outlineWidth: "0px",
        textAlign: "center",
        height: "12%",
        color:"var(--color3)",
        fontSize: "1.1em",
        fontWeight: "500",
        boxShadow: "0px 0px 7px 2px var(--color2)",
        width:"35%",
        top: "67%",
        left: "50%"
        }
      ]]
    ])
    
    function sjekk_utfylling(){
      setriktignavn(true)
      setriktigemail(true)
      setriktigadresse(true)
      setriktigtlf(true)
      setriktigcountry(true)
      setriktigzip_code(true)
      setriktigcity(true)

      const verdier=[navn, email, adresse, Number.isInteger(parseInt(tlf)), country, zip_code, city]

      const setverdier=[setriktignavn,setriktigemail, setriktigadresse, setriktigtlf, setriktigcountry, setriktigzip_code, setriktigcity]
      const setplaceholder=[setnavn,setemail,setadresse,settlf,setcountry,setzip_code,setcity]

      if(navn && email && adresse && Number.isInteger(parseInt(tlf)) && country && zip_code && city){
        setkalkulert(true)
        setfylt_riktig(true)
      }else{
        setfylt_riktig(false)

        verdier.forEach((state,index)=>{
          if(!state){
            setverdier[index](false)
            setplaceholder[index]("")
          }
        })
      }
    }


  if(!loading){
      return <div className="checkout">

      <div className="chekout_header">
        <h5 className='midlertidig-logo_kasse'>Zsaffron</h5>
        <h3 className="chekout_title">Chekout</h3>
      </div>

      {!vis ? <div className="confirm_order">

        <div className="form">
          
          <input style={riktignavn ? input_style.get("navn")[0] : input_style.get("navn")[1]} type="text" autoComplete="off" className="navn" name="navn" placeholder="full name" value={navn} onChange={(e) => { setnavn(e.target.value) }} />
          
          <input style={riktigemail ? input_style.get("emailen")[0] : input_style.get("emailen")[1]} type="text" autoComplete="off" className="emailen" name="email" placeholder="email" value={email} onChange={(e) => { setemail(e.target.value) }} />
          
          <input style={riktigtlf ? input_style.get("tlf")[0] : input_style.get("tlf")[1]} type="text" autoComplete="off" className="tlf"  name="tlf" placeholder="phone" value={tlf} onChange={(e) => { settlf(e.target.value) }} />
          
          <input style={riktigcountry ? input_style.get("country")[0] : input_style.get("country")[1]} type="text" autoComplete="off" className="country"  name="country" placeholder="country" value={country} onChange={(e) => { setcountry(e.target.value) }} />
          
          <input style={riktigzip_code ? input_style.get("zip_code")[0] : input_style.get("zip_code")[1]} type="text" autoComplete="off" className="zip_code"  name="zip_code" value={zip_code} placeholder="postal code" onChange={(e) => { setzip_code(e.target.value) }} />
          
          <input style={riktigcity ? input_style.get("city")[0] : input_style.get("city")[1]} type="text" autoComplete="off" className="city"  name="city" value={city} placeholder="city" onChange={(e) => { setcity(e.target.value) }} />
          
          <input style={riktigadresse ? input_style.get("adresse")[0] : input_style.get("adresse")[1]} type="text" autoComplete="off" className="adresse"  name="adresse" value={adresse} placeholder="adress" onChange={(e) => { setadresse(e.target.value) }} />

          {!kalkulert && <div className="form_btn_div"><button className="form_btn" onClick={sjekk_utfylling} >Confirm</button></div> }
          {kalkulert ? <div className="checkout_pil">
            <svg width="100%" height="100%" viewBox="0 0 245 190" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L129 187.5L244 1M14 1L129 171L234.5 1M24.5 1L129 154L223.5 1" stroke="#a1761f" strokeWidth="6"/>
        </svg>
          </div> : ""}
        </div>


        {kalkulert ? 
        <div className="order">
          <div className="hele_order">
          <h3 className="order_header">Order detail</h3>
          
          {bought.map((i,index)=>{
            const prod= produkter.find(ene=> ene.id===i.id);
            
            return <div className="single_order" key={index}>

              <h3 className="single_inf">{i.amount} x [{prod.navn} , {prod.pris} NOK]</h3>

              <h3 className="liten_pluss">+</h3>
              
          </div>})}

          <div className="single_order">
            <h3 className="shipping"> shipping fee: {shipping} NOK</h3>
            <h3 className="liten_pluss">+</h3>
          </div>  

          <div className="total_order">
            <h3 className="total_price">Total : {total_pris+shipping} NOK = ~{((total_pris+shipping)/11.5).toFixed(1)} EUR</h3>
          </div>
          </div>
          <div className="payment_btn_chekout" >
              <h3 className="payment_text" onClick={settinn} >Payment</h3>
          </div>
        </div> : 
        (fylt_riktig ?         
        <div className="order">
          <h3 className="order_header">Order detail</h3>
          <h3 className="fyll" >Please fill the form</h3>
          <h3 className="calculated" >...Pending</h3>
      </div> : 
              
      <div className="order">
          <h3 className="order_header">Order detail</h3>
          <h3 className="fyll" >! Form uncomplete</h3>
          </div>)}      
    </div>
     
      :
      
      <Betaling bought={bought}/>}
    </div>
  }else{
    return <div className="load"><h1 className="load_text">...loading</h1></div>
  }
}


export default Kasse;