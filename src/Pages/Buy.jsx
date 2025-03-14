import { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import './Buy.css'
import { PostAddress, GetAddress, PostOrder, MakePayment } from '../Services/AllApi'
import { AddBuyNow } from '../Redux/BuySlice'


function Buy() {


    const Navigate = useNavigate()

    const Dispatch = useDispatch()

    const location = useLocation()


    // GetAddress State
    const [GetState, SetGetState] = useState({})

    // Redux state
    const { BuyDeatils } = useSelector((state) => state.BuyNow)

    // User Fetch Address
    const [FetchAddress, SetFetchAddress] = useState()

    // Selected User Address
    const [SelectedAddress, SetSelectedAddress] = useState({})

    // User Token
    const token = sessionStorage.getItem("token")


    // add user address
    const [UserAddress, SetUserAddress] = useState({

        name: "", pincode: "", city: "", state: "", landmark: "", streetaddress: "", phone: ""

    })



    // Modal State
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)


    // TO SET ADD ADDRESS STATUS
    const [AddressStatus, SetAddressStatus] = useState(true)




    useEffect(() => {

        // TO MOUNT ON THE TOP LEVEL 
        window.scrollTo(0, 0);


        const checkUser = () => {

            if (!token) {

                toast.warning("Login First..!")


                setTimeout(() => {

                    Navigate('/auth', { state: { from: location } })

                }, 1000)

            }

        }


        const CheckOrder = () => {

            if (BuyDeatils.length == 0) {

                toast.warning("No products Found..")

                setTimeout(() => {

                    Navigate('/')

                }, 1000);


            }


        }





        // Get User Address
        const GetUserAddress = async () => {


            try {


                const data = sessionStorage.getItem("username")


                const res = await GetAddress(data)



                if (res.status >= 200 && res.status <= 300) {

                    SetFetchAddress(res.data)


                    if (res.data) {

                        const Result = res.data[0]

                        SetSelectedAddress(Result)

                    }

                }
                else {


                    console.log(res)


                }

            }
            catch (Err) {

                console.log(Err);

            }


        }

        checkUser()

        CheckOrder()

        GetUserAddress()


    }, [GetState, BuyDeatils])




    // Add Address
    const AddAddress = async () => {


        try {

            const { name, city, landmark, phone, pincode, state, streetaddress } = UserAddress


            if (!name || !city || !landmark || !phone || !pincode || !state || !streetaddress) {

                toast.warning("Empty Feild...!")

            }
            else {

                const formdata = new FormData()


                const reqheader = {

                    "Content-Type": "multipart/form-data"

                }


                formdata.append("name", name)
                formdata.append("user", sessionStorage.getItem("username"))
                formdata.append("city", city)
                formdata.append("landmark", landmark)
                formdata.append("phone", phone)
                formdata.append("pincode", pincode)
                formdata.append("state", state)
                formdata.append("streetaddress", streetaddress)



                const res = await PostAddress(formdata, reqheader)


                if (res.status >= 200 && res.status <= 300) {


                    SetAddressStatus(true)
                    SetGetState(res.data)
                    toast.success("Address Added Successfully...!")


                } else {

                    console.log(res)

                }

            }

        }

        catch (Err) {

            console.log(Err);

        }

    }



    // Remove item
    const Remove = (item_id) => {

        const NewArray = BuyDeatils.filter((item) => item.id !== item_id)

        Dispatch(AddBuyNow(NewArray))

    }



    // Payment
    const handlePhonePePayment = async () => {

        try {

            if (BuyDeatils.length > 0 && SelectedAddress) {


                const formdata = new FormData()


                const reqheader = {

                    "Content-Type": "multipart/form-data"
                };


                formdata.append("user", sessionStorage.getItem("username"))
                formdata.append("address", SelectedAddress.id)
                formdata.append("payment_type", "Online Payment")
                formdata.append("order_items", JSON.stringify(BuyDeatils))
                formdata.append("amount", BuyDeatils?.reduce((total, item) => total + Number(item.price), 0))


                const response = await MakePayment(formdata, reqheader)


                if (response.status >= 200 && response.status <= 300) {
                    
                    window.location.href = response?.data?.payment_data?.payment_url;

                } else {

                    console.log(response)
                    toast.error("Something went wrong")

                }


            } else {


                if (!SelectedAddress) {

                    toast.warning("Please Add An Address For Devlivery..!")

                } else {

                    toast.warning("No Products Found...!")
                    Navigate('/')

                }

            }


        } catch (error) {
            console.error("Payment Error:", error);
            toast.error("Something went wrong");
        }

    }


    // // Order
    // const Order = async () => {

    //     try {


    //         if (BuyDeatils.length > 0 && SelectedAddress) {


    //             const formdata = new FormData()



    //             const reqheader = {

    //                 "Content-Type": "multipart/form-data"

    //             };

    //             formdata.append("user", sessionStorage.getItem("username"))
    //             formdata.append("address", SelectedAddress.id)
    //             formdata.append("order_items", JSON.stringify(BuyDeatils))
    //             formdata.append("payment_type", "Cash On Delivery")

    //             const Response = await PostOrder(formdata, reqheader)

    //             if (Response.status >= 200 && Response.status <= 300) {

    //                 Navigate('/success')



    //             }
    //             else {

    //                 console.log(Response)
    //                 toast.error("Error Please Try Again Later...!")

    //                 setTimeout(() => {

    //                     Navigate('/')

    //                 }, 1000);


    //             }

    //         } else {


    //             if (!SelectedAddress) {

    //                 toast.warning("Please Add An Address For Devlivery..!")

    //             } else {

    //                 toast.warning("No Products Found...!")
    //                 Navigate('/')

    //             }

    //         }

    //     }
    //     catch (err) {

    //         console.log(err);


    //     }


    // }






    return (



        <>

            <section className="bg-light py-5">


                <div className="container">



                    <div className="row">

                        <h5 className='fw-bold h3 text-dark'>CheckOut</h5>

                        <div className="col-xl-8 col-lg-8 mb-4">


                            <div className="card shadow-0 border">

                                <div className="p-4">


                                    <div>

                                        <h4 className='text-dark h4 order-head'>SHIPPING INFO <i class="fa-solid fa-truck-fast"></i></h4>

                                        <div className="car" style={{ padding: '1rem' }}>


                                            {

                                                SelectedAddress ?



                                                    <address className='text-dark mb-1' style={{ fontWeight: '500' }}>

                                                        <p className='fw-bold mb-0'>{SelectedAddress.name}</p>

                                                        Delivery to <span className='me-2'> {SelectedAddress.streetaddress}</span>
                                                        {SelectedAddress.state} {SelectedAddress.city} {SelectedAddress.pincode} <span>{ }</span> <br />

                                                        <span>phone: {SelectedAddress.phone}</span>

                                                    </address>

                                                    :

                                                    <h4 className='text-dark' onClick={handleShow} style={{ cursor: 'pointer' }}>Add Address</h4>


                                            }


                                            <div className='text-dark'>

                                                <i className="fa-solid fa-pen-to-square fa-lg" onClick={handleShow} style={{ cursor: 'pointer' }}></i>

                                            </div>

                                        </div>

                                    </div>





                                    <div class="payment-section">

                                        <h3 className='h4 order-head text-dark'>PAYMENT OPTION💰</h3>


                                        <div className='flex flex-row'>

                                            {/* <div class="payment-option">
                                                <label class="option-card" style={{
                                                    border: selectedPayment === "cod" ? "2px solid #4CAF50" : "none",
                                                    padding: selectedPayment === "cod" ? "10px" : "8px",
                                                    display: "flex",
                                                    alignItems: "center", 
                                                    justifyContent: "center" 
                                                }}>
                                                    <input type="radio" name="payment" checked={selectedPayment === "cod"} onChange={() => setSelectedPayment("cod")} value="cod" class="radio-input" />
                                                    <div class="option-content">
                                                        <span class="option-icon">💵</span>
                                                        <span class="option-text">Cash on Delivery</span>
                                                    </div>
                                                </label>
                                            </div> */}

                                            <div class="payment-option">
                                                <label class="option-card" style={{
                                                    border: "2px solid #4CAF50",
                                                    padding: "10px",
                                                    display: "flex",
                                                    alignItems: "center", 
                                                    justifyContent: "center" 
                                                }}>
                                                    <input type="radio" name="payment"  checked value="online" class="radio-input" />
                                                    <div class="option-content">
                                                        <span class="option-icon">💵</span>
                                                        <span class="option-text">Online Payment</span>
                                                    </div>
                                                </label>
                                            </div>

                                        </div>

                                        <p className=' mt-3 payment-p'>*Currently, you can choose between Cash on Delivery (COD) and online payment for this order. Please ensure you have the exact amount ready if selecting COD* </p>

                                    </div>


                                    <div className="float-end">
                                        <button className="btn btn-light border me-3" onClick={() => { Navigate('/') }}>Cancel</button>
                                        <button className="btn btn-success shadow-0 border" onClick={handlePhonePePayment} >Pay & Order</button>
                                    </div>

                                </div>


                            </div>

                        </div>



                        <div className="col-xl-4 col-lg-4 d-fle justify-content-cente justify-content-lg-en">


                            <div className="ms-lg-4 mt-4 mt-lg-0" style={{ maxWidth: '400px' }}>


                                <h6 className="mb-3 fw-bold">Order Summary</h6>




                                <div className="d-flex justify-content-between">

                                    <p className="mb-2">Price({BuyDeatils.length} item):</p>

                                    {BuyDeatils &&

                                        <p className="mb-2 fw-bold">

                                            ₹{BuyDeatils.reduce((total, item) => total + Number(item.price), 0)}

                                        </p>
                                    }


                                </div>


                                <div className="d-flex justify-content-between">
                                    <p className="mb-2">Discount:</p>
                                    <p className="mb-2 text-success">0%</p>
                                </div>


                                <div className="d-flex justify-content-between">
                                    <p className="mb-2">Shipping cost:</p>
                                    <p className="mb-2 text-success fw-bold">Free</p>
                                </div>


                                <hr />
                                <div className="d-flex justify-content-between">
                                    <p className="mb-2 fw-bold">Total Amount:</p>
                                    {BuyDeatils &&

                                        <p className="mb-2 fw-bold">

                                            ₹{BuyDeatils.reduce((total, item) => total + Number(item.price), 0)}

                                        </p>
                                    }
                                </div>


                                <hr />
                                <h6 className="text-dark my-4">Items in cart</h6>

                                {

                                    BuyDeatils.length &&

                                    BuyDeatils.map((item, index) => (

                                        <div className="d-flex align-items-center mb-4" key={index}>

                                            <div className="me-3">

                                                <img src={item.image} style={{ height: '96px', width: '96px' }} className="img-sm rounded border" />
                                            </div>

                                            <div className="">
                                                <a className="nav-link fw-bold">
                                                    {item.name}<br />

                                                </a>
                                                <div className="price text-dark small">Total: <span className='fw-bold'>₹{item.price}</span> </div>
                                                <div className="price text-dark small">Quantity: <span className='fw-bold'>{item.quantity}</span></div>
                                            </div>

                                            <div className='ms-4'>

                                                <button className='btn btn-danger' onClick={() => { Remove(item.id) }}>Remove</button>

                                            </div>

                                        </div>

                                    ))

                                }


                            </div>


                        </div>


                    </div>


                </div>



            </section>

















            {/* Address Modal */}
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton className='border-0'>

                    <h5>{AddressStatus ? "Saved Address" : "Add Address"}</h5>

                </Modal.Header>

                <Modal.Body>

                    <div className='ps-3 pt-3 d-flex flex-column'>


                        {/* Address  */}
                        {

                            AddressStatus &&


                            <div>


                                <div className='Address-scroll col-12'>


                                    {

                                        FetchAddress &&

                                        FetchAddress.map((item) => (


                                            <div className='d-flex mb-4'>

                                                <input type="radio" onClick={() => { SetSelectedAddress(item), handleClose() }} value={""} name='a' className='large-radio' style={{ cursor: 'pointer' }} />

                                                <div className='ms-3'>

                                                    <p className='mb-0 fw-bold'>{item.name}</p>
                                                    <p className='mb-0'>{item.city},{item.state} {item.pincode}</p>

                                                </div>

                                            </div>

                                        ))

                                    }

                                </div>


                                <div className='col-12 p-2 text-center'>

                                    <button onClick={(e) => { SetAddressStatus(false) }} className='btn btn-address w-75'>Add New Address <i className="fa-solid fa-plus"></i></button>

                                </div>


                            </div>


                        }




                        {/* Add Address */}
                        {

                            !AddressStatus &&


                            <div className='ps-3 pb-4 pe-3'>

                                <form onSubmit={(e) => { e.preventDefault() }}>

                                    <input type="text" onChange={(e) => { SetUserAddress({ ...UserAddress, name: e.target.value }) }} placeholder='Name' className='form-control mb-3' />

                                    <input type="text" onChange={(e) => { SetUserAddress({ ...UserAddress, pincode: e.target.value }) }} placeholder='Please enter a 6-digit pincode' className='form-control mb-3' maxlength="6" pattern="\d{6}" />

                                    <input type="text" onChange={(e) => { SetUserAddress({ ...UserAddress, city: e.target.value }) }} placeholder='City' className='form-control mb-3' />

                                    <input type="text" onChange={(e) => { SetUserAddress({ ...UserAddress, state: e.target.value }) }} placeholder='State' className='form-control mb-3' />

                                    <input type="text" onChange={(e) => { SetUserAddress({ ...UserAddress, landmark: e.target.value }) }} placeholder='Landmark' className='form-control mb-3' />

                                    <textarea name="" onChange={(e) => { SetUserAddress({ ...UserAddress, streetaddress: e.target.value }) }} className='form-control mb-3' placeholder='Enter your Street address' id=""></textarea>

                                    <input type="text" onChange={(e) => { SetUserAddress({ ...UserAddress, phone: e.target.value }) }} placeholder='Phone' className='form-control mb-3' maxlength="10" pattern="\d{10}" />

                                    <div className='pb-3 mt-4'>

                                        <button onClick={() => { SetAddressStatus(true) }} type='submit' className='btn btn-address ms-2 w-25'>Close</button>

                                        <button onClick={() => { AddAddress() }} type='submit' className='btn btn-address ms-2 w-50'>Save</button>

                                    </div>

                                </form>


                            </div>

                        }



                    </div>

                </Modal.Body>





            </Modal>


        </>


    )




}

export default Buy