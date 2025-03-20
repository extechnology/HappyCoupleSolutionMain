import React from 'react'
import { useEffect, useState } from 'react'
import '../Components/ProductsSlide.css'
import { useNavigate } from 'react-router-dom';
import { GetAllProducts, AddCart } from '../Services/AllApi';
import { Skeleton } from '@mui/material';
import { toast } from 'sonner';
import CustomerJourney from '../Components/CustomerJoun';

function AllProducts() {


    // To Store all Products
    const [ProductsData, SetProductsData] = useState([])

    // To set Loading State
    const [Loading, SetLoading] = useState(true)



    useEffect(() => {


        // TO MOUNT ON THE TOP LEVEL 
        window.scrollTo(0, 0);



        const AllProducts = async () => {

            try {

                const Res = await GetAllProducts()

                if (Res.status == 200) {

                    SetProductsData(Res.data)
                    SetLoading(false)


                }
                else {

                    SetLoading(true)

                }

            }
            catch (err) {


                console.log(err);
                SetLoading(true)


            }

        }

        AllProducts()


    }, []);


    const Navigate = useNavigate()



    // Handle Add to Cart
    const HandelAddCart = async (data) => {


        try {


            const user = sessionStorage.getItem("username")

            if (user) {

                const reqheader = {

                    "Content-Type": "multipart/form-data"

                }

                const fromdata = new FormData()
                fromdata.append("cart", data.id)
                fromdata.append("user", user)


                const Res = await AddCart(fromdata, reqheader)


                if (Res.status >= 200 && Res.status <= 300) {

                    toast.success("Item Added to Cart")

                }
                else {

                    console.log(Res);
                    toast.success("Item Alredy Added to Cart")

                }


            }
            else {

                toast.warning("Login First...!")

                setTimeout(() => {

                    Navigate('/auth')

                }, 1000);

            }

        }
        catch (err) {


            console.log(err)


        }

    }



    return (


        <>

            <section className=''>




                <div className='container p-5'>



                    <div className='row'>


                        {/* All Products */}

                        <h1 className='text-center text-bold'>Our Treatment Plans</h1>


                        {

                            Loading ?


                                Array.from({ length: 3 }).map((item) => (


                                    <div className='me-5 mt-3 col-md-3'>

                                        <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />

                                        <Skeleton animation="wave" height={20} style={{ marginBottom: 6, marginTop: '1rem' }} />

                                        <Skeleton animation="wave" height={20} width="80%" />

                                    </div>

                                ))


                                :


                                ProductsData.length > 0 ?


                                    ProductsData.map((item) => (


                                        <div className='col-md-4'>

                                            <div className="container page-wrapper">

                                                <div className="page-inner">
                                                    <div className="row">
                                                        <div className="el-wrapper">


                                                            <div className="box-up" onClick={() => { Navigate(`/pro/${item.id}`) }}>

                                                                <img className="img-fluid img" src={item.image} alt="img" style={{ height: '100%' }} />

                                                                <div className="img-info">

                                                                    <div className="info-inner">
                                                                        <span className="p-name"></span>
                                                                        <span className="p-company">{item.name}</span>

                                                                        <div className='p-company'>

                                                                            <span class="fa fa-star " style={{ color: '#FFD43B' }}></span>
                                                                            <span class="fa fa-star" style={{ color: '#FFD43B' }}></span>
                                                                            <span class="fa fa-star" style={{ color: '#FFD43B' }}></span>
                                                                            <span class="fa fa-star" style={{ color: '#FFD43B' }}></span>
                                                                            <span class="fa fa-star fa-star-half-stroke" style={{ color: '#FFD43B' }}></span>

                                                                        </div>

                                                                    </div>



                                                                    <div className="a-size"> <span style={{ fontWeight: '600', color: 'blue' }}>FOR :</span> <span className="size" style={{ fontSize: '0.8rem' }}>{item.use_for}<br />
                                                                        <span style={{ fontWeight: '600', color: 'blue' }}> WITH :</span>{item.use_with}</span></div>

                                                                </div>

                                                            </div>

                                                            <div className="box-down">

                                                                <div className="h-bg">
                                                                    <div className="h-bg-inner"></div>
                                                                </div>

                                                                <a className="cart" onClick={() => { HandelAddCart(item) }}>
                                                                    <span className="price">Just ₹{item.price}</span>

                                                                    <span className="add-to-cart" >
                                                                        <span className="txt">Book Now</span>
                                                                    </span>
                                                                </a>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>

                                    ))


                                    :


                                    <div className='d-flex justify-content-center'>

                                        <img src="https://www.fruitomans.com/themes/home/images/no-product-found.png" className='img-fluid' alt="img" />


                                    </div>

                        }



                    </div>

                </div>

                {/* Customer Journey */}
                <CustomerJourney />

            </section>



        </>

    )


}

export default AllProducts