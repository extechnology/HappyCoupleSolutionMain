import React from "react"
import { useState, useEffect, Suspense, lazy } from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import { Toaster } from 'sonner'
import LoadingSpinner from "./Components/LoadingSpinner"

const Landing = lazy(() => import('./Pages/Landing'))
const Header = lazy(() => import('./Components/Header'))
const Footer = lazy(() => import('./Components/Footer'))
const Auth = lazy(() => import('./Pages/Auth'))
const AllProducts = lazy(() => import('./Pages/AllProducts'))
const Doctors = lazy(() => import('./Pages/Doctors'))
const Cart = lazy(() => import('./Pages/Cart'))
const SingleProducts = lazy(() => import('./Pages/SingleProducts'))
const AboutUs = lazy(() => import('./Pages/AboutUs'))
const ContactUs = lazy(() => import('./Pages/ContactUs'))
const PrivacyPolicy = lazy(() => import('./Pages/PrivacyPolicy'))
const Terms = lazy(() => import('./Pages/Terms'))
const Refund = lazy(() => import('./Pages/Refund'))
const Buy = lazy(() => import('./Pages/Buy'))
const Bot = lazy(() => import('./Pages/Bot'))
const WhatsApp = lazy(() => import('./Components/WhatsApp'))
const Shipping = lazy(() => import('./Pages/ShippingPolicy'))
const OrderSuccess = lazy(() => import('./Pages/OrderSuccess'))
const Orders = lazy(() => import('./Pages/Orders'))





function App() {


  const location = useLocation()

  const [Hide, sethide] = useState(false)




  useEffect(() => {


    const hidecheck = () => {

      if (location.pathname == '/auth' || location.pathname == '/ai' || location.pathname == '/terms' || location.pathname == '/refund' || location.pathname == '/pirvacy' || location.pathname == '/buy/:id') {


        sethide(true)


      }
      else {

        sethide(false)
      }

    }

    hidecheck()

  }, [location])




  return (

    <>


      <Suspense fallback={<div></div>}>

        <div className="position-sticky sticky-top  z-5 w-100">

          {!Hide && <Header />}

        </div>

      </Suspense>




      <Suspense fallback={<LoadingSpinner/>}>

        <Routes>



          <Route path="/" element={<Landing />}> </Route>

          <Route path="/auth" element={<Auth />}> </Route>

          <Route path="/allproducts" element={<AllProducts />}> </Route>

          <Route path="/doctors" element={<Doctors />}> </Route>

          <Route path="/ai" element={<Bot />}> </Route>

          <Route path="/cart" element={<Cart />}> </Route>

          <Route path="/pro/:id" element={<SingleProducts />}> </Route>

          <Route path="/about" element={<AboutUs />}> </Route>

          <Route path="/contact" element={<ContactUs />}> </Route>

          <Route path="/pirvacyPolicy" element={<PrivacyPolicy />}> </Route>

          <Route path="/termsandConditions" element={<Terms />}> </Route>

          <Route path="/CancellationandRefundPolicy" element={<Refund />}> </Route>

          <Route path="/ShippingPolicy" element={<Shipping />}> </Route>

          <Route path="/buy" element={<Buy />}> </Route>

          <Route path="/Success" element={<OrderSuccess />}> </Route>

          <Route path="/order" element={<Orders />}> </Route>

        </Routes>

      </Suspense>



      <Toaster richColors position="top-center" />




      <Suspense fallback={<div></div>}>

        {/* WhatsApp Logo */}
        <div className='Whats-app'>

          <WhatsApp />

        </div>


        {!Hide && <Footer />}

      </Suspense>



    </>




  )
}

export default App
