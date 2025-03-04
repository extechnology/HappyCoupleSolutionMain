import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Card, Row, Col } from 'react-bootstrap';
import { GetOrder, UpdateOrder } from '../Services/AllApi';


function Orders() {



    const Navigate = useNavigate()

    const location = useLocation()

    // Order Data
    const [Orders, SetOrders] = useState([])

    // Status
    const [Status, SetStatus] = useState()


    // User Token
    const token = sessionStorage.getItem("token")

    // Username 
    const user = sessionStorage.getItem("username")



    useEffect(() => {


        // TO MOUNT ON THE TOP LEVEL 
        window.scrollTo(0, 0);



        const checkUser = () => {

            if (!token) {

                toast.warning("Login First..!")


                setTimeout(() => {

                    Navigate('/auth',{ state: { from: location } })

                }, 1000)

            }

        }


        const DispalyOrder = async () => {


            try {


                const res = await GetOrder(user)

                if (res.status >= 200 && res.status <= 300) {

                    SetOrders(res.data)

                }
                else {

                    console.log(res);


                }



            }
            catch (err) {

                console.log(err);


            }


        }

        checkUser()

        DispalyOrder()

    }, [Status])






    const CancelOrder = async (id) => {

        try {

            const res = await UpdateOrder(user, id)

            if (res.status >= 200 && res.status <= 300) {

                SetStatus(Date.now())
                toast.success("Order Canceled Successfully")


            } else {

                console.log(res)
                toast.warning("UnExpected Error Try Again Later")
                Navigate('/')


            }



        }
        catch (err) {

            console.log(err);


        }

    }


    return (



        <>

            <section className=' container pt-3 pb-5'>


                {
                    Orders.length > 0 &&

                    <h3 className='fw-bold mt-2' style={{ fontStyle: 'italic' }}>MY ORDERS</h3>
                }


                {

                    Orders.length > 0 ?

                        Orders.map((item, index) => (

                            <>

                                <Card className="my-3 p-3 rounded shadow border mb-4" key={index}>

                                    <Row>

                                        <Col md={2}>
                                            <Card.Img className='order-image' variant="top" src={item.image} />
                                        </Col>


                                        <Col md={3}>

                                            <Card.Body>

                                                <h5 className='text-dark fw-bold h6'>{item.product}</h5>

                                                <Card.Text className='text-dark'>

                                                    <p className='mb-0 small'>Quanity: {item.quantity}</p>
                                                    <p className='mb-0 small'>Expected Delivery : <span className='text-success fw-bold'>{item.delivery_date}</span></p>

                                                </Card.Text>

                                            </Card.Body>

                                        </Col>

                                        <Col md={3}>

                                            <Card.Body>

                                                <Card.Text className='text-dark'>

                                                    <p className='fw-bold mb-0'>₹{item.total_price}</p>

                                                    <p className='small'>Cash on Delivery(COD)</p>
                                                </Card.Text>

                                            </Card.Body>

                                        </Col>


                                        <Col md={4}>

                                            <Card.Body>

                                                <h5 className='text-dark fw-bold h6'>Delivery Address</h5>

                                                <h6 className='fw-bold small text-dark mb-1'>{item.name}</h6>

                                                <Card.Text className='text-dark'>

                                                    <p className='small mb-1'>{item.address}</p>

                                                    <h6 className='small'> <span className='fw-bold'>Phone:</span> {item.phone}</h6>

                                                </Card.Text>



                                            </Card.Body>

                                        </Col>


                                    </Row>


                                    <Row>


                                        <Col md={6}>

                                            <p className='mt-3 px-3 py-2 me-3 mb-0 text-dark' style={{ width: 'fit-content' }}> <span className='fw-bold'>Order Status : </span> <span className={item.order_status === "cancelled" ? "fw-bold text-danger" : item.order_status === "delivered" ? "fw-bold text-success" : "fw-bold"}>{item.order_status}</span></p>

                                        </Col>

                                        <Col md={6} className='d-flex justify-content-end'>

                                            {

                                                item.order_status === "cancelled" || item.order_status === "delivered" ?

                                                    <button className='btn btn-success mt-3 px-3 py-2 fw-bold' onClick={() => { Navigate(`/pro/${item.product_id}`) }} style={{ width: 'fit-content' }}>Buy Again</button>

                                                    :

                                                    <button className='btn btn-danger mt-3 px-3 py-2 fw-bold' onClick={() => { CancelOrder(item.id) }} style={{ width: 'fit-content' }}>Cancel Order</button>

                                            }



                                        </Col>



                                    </Row>




                                </Card>
                            </>
                        ))

                        :

                        <div className='d-flex flex-column  align-items-center' style={{ height: '75vh' }}>

                            <iframe src="https://lottie.host/embed/d51d9718-c3c7-458a-b99c-325397788c58/FUP8j4Kxce.json" height={350}></iframe>
                            <h3 className='text-center fw-bold' style={{ fontStyle: 'italic' }}>No Orders Yet <i className="fa-solid fa-ban text-danger"></i></h3>

                            <button className='btn btn-info w-25 fw-bold' onClick={() => { Navigate('/allproducts') }}>Shop Now <i className="fa-solid fa-store"></i></button>
                        </div>

                }


            </section>





        </>



    )
}

export default Orders