import "../styles/Confirmed.css"
import { useEffect, useState } from "react";

function Confirmed(){
  const [loading, setloading] = useState(true)
  const [kunde,setkunde]=useState("")

  useEffect(()=>{
    async function get(){
      const response =await  fetch(`/api/send_kunde`,{
          method: "GET",
          headers:{
              "Accept":"application/json"
          }
      })
      const ny_kunde=await response.json();
      setkunde(JSON.parse(ny_kunde))
      console.log("her",ny_kunde)
    }
    get().then(()=>{setloading(false);})
  },[])

  if(!loading){
    return <div className="confirmed_page">
    <div className="logo">
      <h5 className='midlertidig-logo'>Zsaffron</h5>
    </div>
    <div className="text">
    <h3 className="confirmation_header">Thank you for choosing Zsaffron {kunde.navn}</h3>
    <h3 className="confirmation_email">The Order confirmation has been sent to your email: {kunde.email}</h3>
    <h3 className="spam"> Please check your spam folder if unfound</h3>
    </div>
    </div>
  } else{
    return <div className="load"><h1 className="load_text">...loading</h1></div>
  }
}

export default Confirmed;