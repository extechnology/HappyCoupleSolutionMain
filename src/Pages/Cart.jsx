import React, { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { GetCart, DeleteCart, ProductQuantity } from '../Services/AllApi';
import { toast } from 'sonner';



function Cart() {



    // Cart Items 
    const [CartItems, SetCartItems] = useState([])

    const [QuanityApi, SetQuanityApi] = useState([])

    const Navigate = useNavigate()

    const location = useLocation()

    // Delete Status
    const [DeleteStatus, SetDeleteStatus] = useState()



    useEffect(() => {

        // TO MOUNT ON THE TOP LEVEL 
        window.scrollTo(0, 0);



        // check user 
        const checkUser = () => {

            if (!sessionStorage.getItem("username")) {

                Navigate('/auth', { state: { from: location } })

            }

        }



        // get cart items
        const handleCartItems = async () => {


            try {

                const user = sessionStorage.getItem("username")

                const res = await GetCart(user)


                if (res.status >= 200 && res.status <= 300) {


                    const CartProducts = res.data.map(item => item.product)

                    SetCartItems(CartProducts)

                    console.log(res.data);



                } else {

                    console.log(res);


                }

            }
            catch (err) {

                console.log(err);

            }

        }





        // Get Product Quanity
        const GetQuantity = async () => {

            try {


                const res = await ProductQuantity()

                if (res.status >= 200 && res.status <= 300) {



                    SetQuanityApi(res.data)

                }
                else {

                    console.log(res)

                }


            }
            catch (err) {


                console.log(err);


            }

        }

        checkUser()

        handleCartItems()

        GetQuantity()


    }, [DeleteStatus])





    // handle Cart Delete
    const CartDelete = async (data) => {


        try {


            const user = sessionStorage.getItem("username")

            const res = await DeleteCart(data, user)

            if (res.status >= 200 && res.status <= 300) {


                // toast.success("Item Deleted Successfully...")
                SetDeleteStatus(Date.now())




            } else {

                console.log(res);


            }

        }
        catch (Err) {

            console.log(Err)

        }


    }






    return (


        <>


            <section className="mt-4  mb-5 Cart-paddin pt-4">


                <div className="container">


                    <div className="row">

                        <div className="col-lg-9">



                            <div className="card border shadow-0">


                                <div className="m-4 Cart-padding">


                                    <h4 className="card-title mb-4 text-dark">Your shopping cart</h4>



                                    {

                                        CartItems.length > 0 ?

                                            CartItems.map((item) => (


                                                <div className="row gy-3 mb-4">

                                                    <div className='row mb-4 gy-3'>

                                                        <div className="col-lg-5">

                                                            <div className="me-lg-5">

                                                                <div className="d-flex">

                                                                    <img src={item.image} loading='lazy' className="border rounded me-3 cart-img" style={{ width: '96px', height: '96px' }} />

                                                                    <div className="">

                                                                        <a href="#" className="nav-link">{item.name}</a>
                                                                        <p className="text-muted">Medicine</p>

                                                                    </div>

                                                                </div>


                                                            </div>

                                                        </div>


                                                        <div className="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row text-nowrap">

                                                            <div className="me-5">

                                                                {/* <p className='mb-0 italic fw-semibold'>Quanity</p> */}
                                                                {/* 
                                                                <select style={{ width: '100px' }} className="form-select me-4">
                                                                    <option>1</option>
                                                                    <option>2</option>
                                                                    <option>3</option>
                                                                    <option>4</option>
                                                                </select> */}

                                                                {/* <p>{item.quantity}</p> */}

                                                            </div>


                                                            <div className="">

                                                                <p className='mb-0 italic fw-semibold'>Price</p>

                                                                <text className="h6">₹{item.price}</text> <br />

                                                            </div>


                                                        </div>


                                                        <div className="col-lg col-sm-6 d-flex justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-end mb-2">
                                                            <div className="float-md-end">

                                                                <a className="btn btn-success shadow-0  text-white" onClick={() => { CartDelete(item.id), Navigate(`/pro/${item.id}`) }}>Buy Now</a>

                                                            </div>
                                                        </div>

                                                    </div>


                                                </div>

                                            ))


                                            :

                                            <div className='d-flex flex-column justify-content-center align-items-center mt-5'>

                                                <h1 className='text-center'>No Cart Items Found</h1>

                                                <Link to={'/allproducts'} className='nav-link w-100 text-center'>

                                                    <button className='btn btn-success w-25 shadow-0'>Shop Now <i class="fa-solid fa-basket-shopping"></i></button>

                                                </Link>

                                            </div>



                                    }


                                </div>



                                <div className="border-top pt-4 mx-4 mb-4">

                                    <p><i className="fas fa-truck text-muted fa-lg"></i> Free Delivery within 1-2 weeks</p>
                                    <p className="text-muted">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                        aliquip
                                    </p>

                                </div>



                            </div>


                        </div>



                        <div className="col-lg-3">


                            <div className="card border-0 rounded shadow" >

                                <div className="card-body bg-white">


                                    <h5 className='text-center mb-4'>Order Summary</h5>


                                    <div className="d-flex justify-content-between">
                                        <p className="mb-2">Total Items:</p>
                                        <p className="mb-2">{CartItems.length}</p>
                                    </div>

                                    <div className="d-flex justify-content-between">

                                        <p className="mb-2">Total Price:</p>



                                        {

                                            CartItems ?

                                                <p className="mb-2 text-success">

                                                    ₹{CartItems.reduce((total, item) => total + Number(item.price), 0)}

                                                </p>

                                                :

                                                0

                                        }




                                    </div>

                                    <div className="d-flex justify-content-between">
                                        <p className="mb-2">Shipping Fee:</p>
                                        <p className="mb-2 text-success fw-bold">Free</p>
                                    </div>


                                    <hr />

                                    <div className="d-flex justify-content-between">



                                        <p className="mb-2 fw-bold">Sub Total:</p>

                                        {

                                            CartItems ?

                                                <p className="mb-2 text-success">

                                                    ₹{CartItems.reduce((total, item) => total + Number(item.price), 0)}

                                                </p>

                                                :

                                                0

                                        }

                                    </div>

                                    {/* <div className="mt-3">



                                            <Link to={'/buy'}>

                                                <a href="#" className="btn btn-success w-100 shadow-0  mt-2"> Check Out </a>

                                            </Link>


                                        </div> */}


                                </div>


                            </div>



                        </div>


                    </div>

                </div>

            </section>


        </>





    )





}

export default Cart