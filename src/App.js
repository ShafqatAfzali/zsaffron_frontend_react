import { Route, Routes } from "react-router-dom";
import Home from "./pages/hjem"
import Kasse from "./pages/kasse"
import Confirmed from "./pages/confirmed"
import { Helmet } from "react-helmet";

export default function App() {
  return <div className="alt">
    <Helmet>

    <meta charset="utf-8"/>
    <link rel="icon" type="image/jpg" href="../pics/icon.jpg"/>
    <meta name="viewport" content="width=device-width,initial-scale=1"/>
    <meta name="theme-color" content="#000000"/>
    <meta name="description" content="Zsaffron or zsaffron strives to deliver quality saffron at an affordable price"/>
    <meta name="keywords" content="zsaffron,saffron,safran,quality saffron,kvalitets safran,god safran,gut safran,bra safran,billig safran,cheap saffron,affordable saffron"/>

    </Helmet>
    <Routes >
    <Route path="/" element={<Home/>} />
      <Route path="/kasse" element={<Kasse/>} />
      <Route path="/confirmed" element={<Confirmed/>} />
    </Routes>
    </div>
}

