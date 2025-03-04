import React from 'react'
import { useState, useEffect } from 'react'
import "mdb-react-ui-kit/dist/css/mdb.min.css"
import { MDBTabs, MDBTabsItem, MDBTabsLink } from "mdb-react-ui-kit"
import ProductsSlide from '../Components/ProductsSlide'
import { GetAllProducts, ProductQuantity, AddCart } from '../Services/AllApi'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import ProductSkelton from '../Components/ProductSkelton'
import { AddBuyNow } from '../Redux/BuySlice'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

function SingleProducts() {


    // To Get the id of the product
    const { id } = useParams()

    const Navigate = useNavigate()

    const location = useLocation();

    const Dispatch = useDispatch()


    // For NOS button
    const [selectedQuantity, setSelectedQuantity] = useState(null);


    // Product data
    const [Product, SetProduct] = useState({})

    //Product Quanity 
    const [ProductQuanity, SetProductQuanity] = useState([])

    // Product Price
    const [PriceandQuanity, SetPriceandQuanity] = useState({

        price: "", Quanity: "", stock: ""

    })




    // Recommended Products
    const [RecPro, SetRecPro] = useState([])


    // Loading State
    const [Loading, SetLoading] = useState(true)


    // Discription State
    const [DisStatus, SetDisStatus] = useState(false)



    useEffect(() => {


        // TO MOUNT ON THE TOP LEVEL 
        window.scrollTo(0, 0);


        // Get the Product
        const GetProduct = async () => {

            try {

                const res = await GetAllProducts()

                if (res.status >= 200 && res.status <= 300) {

                    const result = res.data.find((item) => (item.id == id))

                    const Ligin = res.data.find((item) => (item.id == 1))

                    SetProduct(result)
                    SetRecPro(Ligin)
                    SetLoading(false)

                }
                else {

                    SetLoading(true)

                }


            }
            catch (err) {

                console.log(err)
                SetLoading(true)

            }

        }



        // Product Quanity 
        const GetQuanity = async () => {


            try {

                const res = await ProductQuantity()

                if (res.status >= 200 && res.status <= 300) {

                    const result = res.data.filter(item => item.product == id)

                    const defaultquanity = result.find((item) => (item))

                    SetPriceandQuanity({ ...PriceandQuanity, price: defaultquanity.price, stock: defaultquanity.stock, Quanity: defaultquanity.quantity })

                    SetProductQuanity(result)

                }
                else {

                    SetLoading(true)
                    console.log(res)

                }


            }

            catch (err) {

                console.log(err);

            }


        }



        GetProduct()

        GetQuanity()

    }, [id]);








    // Handle Add to Cart
    const HandelAddCart = async () => {


        try {


            const user = sessionStorage.getItem("username")

            if (user) {

                const reqheader = {

                    "Content-Type": "multipart/form-data"

                }

                const fromdata = new FormData()
                fromdata.append("cart", id)
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

                    Navigate('/auth', { state: { from: location } })

                }, 1000);

            }

        }
        catch (err) {


            console.log(err)


        }

    }








    // Handle Buy Now 
    const HandleBuyNow = () => {


        try {

            const token = sessionStorage.getItem("token")

            if (!token) {

                toast.warning("Please Login First")

                setTimeout(() => {

                    Navigate('/auth', { state: { from: location } })

                }, 1000);

            } else {

                Dispatch(AddBuyNow([{ price: PriceandQuanity.price, quantity: PriceandQuanity.Quanity, name: Product.name, image: Product.image }]))
                Navigate(`/buy`)

            }


        }

        catch (Err) {

            console.log(Err);


        }


    }




    // To handle Spec Tabs
    const [activeItem, setActiveItem] = useState('tab1')


    // To handle Spec Tabs
    const handleTabClick = (value) => {

        if (value === activeItem) {

            return;
        }

        setActiveItem(value);
    }



    // Handle Nos Button
    const handleButtonClick = (item) => {

        setSelectedQuantity(item.quantity)

        SetPriceandQuanity({
            price: item.price,
            Quanity: item.quantity,
            stock: item.stock
        })

    }



    // Buy Both Recommended Products
    const BuyBoth = () => {

        const user = sessionStorage.getItem("username")

        if (user) {

            Dispatch(AddBuyNow([Product, RecPro]))

            Navigate('/buy')

        }else{

            Navigate('/auth',{ state: { from: location } })

        }




    }


    return (


        <>




            {


                Loading ?


                    <ProductSkelton />


                    :

                    <section>



                        <section className="py-5">


                            <div className="container">


                                <div className="row gx-5">


                                    <aside className="col-lg-6">


                                        <div className="border rounded-4 mb-3 d-flex justify-content-center">

                                            <a data-fslightbox="mygalley" className="rounded-4" target="_blank" data-type="image">
                                                <img loading='lazy' style={{ maxWidth: '100%', maxHeight: '100vh', margin: 'auto' }} className="rounded-4 fit" src={Product.image} />
                                            </a>

                                        </div>


                                        <div className="d-flex justify-content-center mb-3">

                                            <a data-fslightbox="mygalley" className="border mx-1 rounded-2 item-thumb" target="_blank" data-type="image">
                                                <img width="60" height="60" className="rounded-2" src={Product.image} />
                                            </a>

                                        </div>


                                    </aside>


                                    <main className="col-lg-6">

                                        <div className="ps-lg-3">

                                            {/* Tittle */}
                                            <h3 className="title text-dark">
                                                {Product.name}
                                            </h3>


                                            {/* Rating */}
                                            <div className="d-flex flex-row my-3">

                                                <div className="text-warning mb-1 me-2">
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fas fa-star-half-alt"></i>
                                                    <span className="ms-1">
                                                        4.5
                                                    </span>
                                                </div>


                                                <span className="text-muted"><i className="fas fa-shopping-basket fa-sm mx-1"></i>{PriceandQuanity.stock}</span>
                                                <span className="text-success ms-2">In stock</span>


                                            </div>


                                            {/* Price */}
                                            <div className="mb-3">

                                                <span className="h5">₹{PriceandQuanity.price}</span>
                                                <span className="text-muted">/per box</span>

                                            </div>


                                            <p style={{ fontWeight: '600' }}>
                                                For Concerned of : <br />
                                                {Product.consern}
                                            </p>

                                            {/* Incrediants */}
                                            <p className='mb-4'>
                                                {Product.incrediants}
                                            </p>


                                            <button className='bg-transparent border-0 fw-bold' onClick={() => { SetDisStatus(!DisStatus) }}>Discription:</button>

                                            {

                                                DisStatus &&

                                                <div>

                                                    <p style={{ textAlign: 'justify' }}>{Product.description}</p>

                                                </div>

                                            }


                                            <hr />


                                            {/* Quanity */}
                                            <div className=" mb-4 mt-3">


                                                <div className="d-flex flex-column">

                                                    <label className="mb-2">Quantity : Nos</label>

                                                    <div className='row'>

                                                        {

                                                            ProductQuanity &&

                                                            ProductQuanity.map((item) => (

                                                                <button key={item.quantity} className={`btn_nos me-3 mt-2 col-md-2 ${selectedQuantity === item.quantity ? 'active' : ''}`} onClick={() => { handleButtonClick(item) }}>{item.quantity}</button>

                                                            ))

                                                        }

                                                    </div>

                                                </div>


                                            </div>



                                            {/* Buy Now */}
                                            <a className="btn btn-buynow shadow me-3" onClick={HandleBuyNow}> Buy now </a>
                                            <a className="btn btn-addcart shadow" onClick={HandelAddCart}> <i className="me-1 fa fa-shopping-basket" ></i> Add to cart </a>



                                        </div>


                                    </main>
                                </div>
                            </div>


                        </section>




                        <section className="bg-light border-top py-4 pb-5 mb-5 pt-5" style={{ borderBottom: '3px dotted #eee' }}>


                            <div className="container">


                                <div className="row gx-4">

                                    {/* SPECS */}
                                    <div className="col-lg-8 mb-4">

                                        <div className='border rounded-2 shadow px-3 py-2 bg-white'>

                                            <MDBTabs pills className="mb-3 p-3">

                                                <MDBTabsItem>
                                                    <MDBTabsLink onClick={() => handleTabClick('tab1')} active={activeItem === 'tab1'}>
                                                        Key Benifits
                                                    </MDBTabsLink>
                                                </MDBTabsItem>

                                                <MDBTabsItem>
                                                    <MDBTabsLink onClick={() => handleTabClick('tab2')} active={activeItem === 'tab2'}>
                                                        How to Use
                                                    </MDBTabsLink>
                                                </MDBTabsItem>


                                                <MDBTabsItem>
                                                    <MDBTabsLink onClick={() => handleTabClick('tab3')} active={activeItem === 'tab3'}>
                                                        Customer Reviews
                                                    </MDBTabsLink>
                                                </MDBTabsItem>


                                                <MDBTabsItem>
                                                    <MDBTabsLink onClick={() => handleTabClick('tab4')} active={activeItem === 'tab4'}>
                                                        FAQs
                                                    </MDBTabsLink>
                                                </MDBTabsItem>


                                                <MDBTabsItem>
                                                    <MDBTabsLink onClick={() => handleTabClick('tab5')} active={activeItem === 'tab5'}>
                                                        Precautions
                                                    </MDBTabsLink>
                                                </MDBTabsItem>


                                            </MDBTabs>




                                            {/* Key Benfits */}
                                            {

                                                activeItem == "tab1" &&

                                                <div className='key-benfits pb-5'>

                                                    <ul>

                                                        {

                                                            Product.key_benefits &&

                                                            Product.key_benefits.map((item) => (

                                                                <li>{item}</li>

                                                            ))

                                                        }


                                                    </ul>

                                                </div>

                                            }




                                            {/* How to use */}
                                            {

                                                activeItem == "tab2" &&

                                                <div className='howto-use pb-5 ps-3 pe-3'>

                                                    <ul>

                                                        {

                                                            Product.how_to_use &&

                                                            Product.how_to_use.map((item) => (

                                                                <li>{item}</li>

                                                            ))

                                                        }

                                                    </ul>

                                                </div>

                                            }






                                            {/* Review */}
                                            {

                                                activeItem == "tab3" &&

                                                <div className='pb-5 ps-3 pe-3'>


                                                    <div className='mb-4 customer-review'>

                                                        <span class="fa fa-star " style={{ color: '#FFD43B' }}></span>
                                                        <span class="fa fa-star" style={{ color: '#FFD43B' }}></span>
                                                        <span class="fa fa-star" style={{ color: '#FFD43B' }}></span>
                                                        <span class="fa fa-star" style={{ color: '#FFD43B' }}></span>
                                                        <span class="fa fa-star fa-star-half-stroke" style={{ color: '#FFD43B' }}></span>

                                                        <p>started using Lygin M before moving to stronger medications. Not only did my condition improve,
                                                            but I also feel more energetic throughout the day!" - Jason M.</p>

                                                    </div>



                                                    <div className='mb-4 customer-review'>

                                                        <span class="fa fa-star " style={{ color: '#FFD43B' }}></span>
                                                        <span class="fa fa-star" style={{ color: '#FFD43B' }}></span>
                                                        <span class="fa fa-star" style={{ color: '#FFD43B' }}></span>
                                                        <span class="fa fa-star" style={{ color: '#FFD43B' }}></span>
                                                        <span class="fa fa-star fa-star-half-stroke" style={{ color: '#FFD43B' }}></span>

                                                        <p>Great product with natural ingredients. I appreciate the holistic approach to treating ED." - Kevin T.</p>

                                                    </div>



                                                    <div className='mb-4 customer-review'>

                                                        <span class="fa fa-star " style={{ color: '#FFD43B' }}></span>
                                                        <span class="fa fa-star" style={{ color: '#FFD43B' }}></span>
                                                        <span class="fa fa-star" style={{ color: '#FFD43B' }}></span>
                                                        <span class="fa fa-star" style={{ color: '#FFD43B' }}></span>
                                                        <span class="fa fa-star fa-star-half-stroke" style={{ color: '#FFD43B' }}></span>

                                                        <p>Noticed significant improvements in both my sexual health and overall well-being. Highly recommend Lygin M!" - Sam D.</p>

                                                    </div>


                                                </div>

                                            }



                                            {/* Faq */}
                                            {

                                                activeItem == "tab4" &&

                                                <div className='FAQ pb-5 ps-3 pe-3'>

                                                    <ul>


                                                        {

                                                            Product.faqs &&

                                                            Product.faqs.map((item) => (

                                                                <li>

                                                                    {item.split('?')[0] + '?'}


                                                                    <p className='mt-2'>{item.split('?')[1]}</p>

                                                                </li>

                                                            ))

                                                        }

                                                    </ul>

                                                </div>

                                            }




                                            {/* description*/}
                                            {

                                                activeItem == "tab5" &&

                                                <div className='FAQ pb-5 ps-3 pe-3'>

                                                    <ul>


                                                        {

                                                            Product.precautions &&

                                                            Product.precautions.map((item) => (

                                                                <li>

                                                                    <p className='mt-2'>{item}</p>

                                                                </li>

                                                            ))

                                                        }




                                                    </ul>

                                                </div>

                                            }



                                        </div>


                                    </div>



                                    {/* Similar Products */}
                                    <div className="col-lg-4">

                                        <div className="px-0 rounded-2 shadow">

                                            <div className="card">

                                                <div className="card-body bg-white">

                                                    <h5 className="card-title text-dark mb-4">Recommended Products</h5>


                                                    <div className="d-flex mb-3">

                                                        <a href="#" className="me-3">
                                                            <img src={Product.image} style={{ minWidth: '96px', height: '96px' }} className="img-md" />
                                                        </a>


                                                        <div className="info">
                                                            <a href="#" className="nav-link mb-1">
                                                                {Product.name}<br />

                                                            </a>
                                                            <strong className="text-dark"> ₹{Product.price}</strong>
                                                        </div>


                                                    </div>



                                                    <div className='d-flex justify-content-center mb-5 mt-4'>

                                                        <i class="fa-solid fa-plus fa-2xl"></i>

                                                    </div>


                                                    <div className="d-flex mb-3">

                                                        <a href="#" className="me-3">
                                                            <img src={RecPro.image} style={{ minWidth: '96px', height: '96px' }} className="img-md" />
                                                        </a>


                                                        <div className="info">

                                                            <a href="#" className="nav-link mb-1">
                                                                {RecPro.name}<br />

                                                            </a>

                                                            <strong className="text-dark"> ₹{RecPro.price}</strong>

                                                        </div>


                                                    </div>

                                                    <button className='btn btn-buynow shadow w-100 mt-4' onClick={BuyBoth}>Buy Now</button>

                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>


                        </section>

                    </section>



            }







            {/* Products */}
            <section className='pb-5'>



                <div>

                    <h3 className='text-center mb-0' style={{ fontWeight: '600' }}>Products</h3>

                    <ProductsSlide />


                </div>


            </section>



        </>





    )




}

export default SingleProducts