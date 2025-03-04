import { CommonApi } from "./CommonApi";


const base_url = "https://server.happycouplesolution.com"


// Get All products
export const GetAllProducts = async () => {

    return CommonApi("GET", `${base_url}/products/`)

}



// Product Quantity
export const ProductQuantity = async () => {

    return CommonApi("GET", `${base_url}/productquantity/`)

}



// User Register
export const Register = async (data, headers) => {


    return CommonApi("POST", `${base_url}/api/register/`, data, headers)

}


// User Login
export const Login = async (data, headers) => {

    return CommonApi("POST", `${base_url}/api/token/`, data, headers)

}

// Google Auth
export const GoogleAuth = async (data, headers) => {

    return CommonApi("POST", `${base_url}/api/google-auth/`, data, headers)

}



// Chat Bot
export const ChatBotApi = async (data, header) => {

    return CommonApi("POST", `${base_url}/chatbotview/`, data, header)

}


// Add Address
export const PostAddress = async (data, header) => {

    return CommonApi("POST", `${base_url}/user_address/`, data, header)

}

// Get Address
export const GetAddress = async (data) => {

    const params = new URLSearchParams({ user: data });

    return CommonApi("GET", `${base_url}/user_address/?${params.toString()}`, "", "")

}


// Add Cart
export const AddCart = async (data, header) => {

    return CommonApi("POST", `${base_url}/cart/`, data, header)

}


// Get Cart
export const GetCart = async (data) => {

    const params = new URLSearchParams({ user: data })

    return CommonApi("GET", `${base_url}/cart/?${params.toString()}`, "", "")

}


// Delete Cart
export const DeleteCart = async (data, user) => {

    const params = new URLSearchParams({ id: data, user: user })

    return CommonApi("DELETE", `${base_url}/cart/?${params.toString()}`, "", "")

}


// Get Doctor
export const GetDoctor = async () => {

    return CommonApi("GET", `${base_url}/doc_info/`, "", "")

}


// Order
export const PostOrder = async (data, header) => {

    return CommonApi("POST", `${base_url}/orders/`, data, header)

}


//Get Order
export const GetOrder = async (data) => {

    const params = new URLSearchParams({ user: data })

    return CommonApi("GET", `${base_url}/orders/?${params.toString()}`, "", "")

}

//Update Order
export const UpdateOrder = async (data, id) => {

    const params = new URLSearchParams({ user: data, id: id })

    return CommonApi("PUT", `${base_url}/orders/?${params.toString()}`, "", "")

}