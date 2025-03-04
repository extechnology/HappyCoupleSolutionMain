import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ChatBot from "react-chatbotify"
import { ChatBotApi, GetAllProducts } from '../Services/AllApi'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AddBuyNow } from '../Redux/BuySlice';



function Bot() {


    // Chat Bot Data
    const [BotData, SetBotData] = useState({})


    const Navigate = useNavigate()

    const location = useLocation()


    const Dispatch = useDispatch()



    // Prescription file
    const [DocsPrescription, SetDocsPrescription] = useState()


    // Product data
    const [Product, SetProduct] = useState([])


    useEffect(() => {

        // Get the Product
        const GetProduct = async () => {


            try {

                const res = await GetAllProducts()

                if (res.status >= 200 && res.status <= 300) {

                    const devices = res.data.filter((item) => item.id === 1 || item.id === 2)

                    SetProduct(devices)

                }

            }
            catch (err) {

                console.log(err)

            }

        }

        GetProduct()


    }, [])





    // Handle File Uploads
    const handleFileUpload = (params) => {

        console.log(params.files[0])
        SetDocsPrescription(params.files[0])

    }



    // Handle Chat Bot
    const handlebotdata = async () => {


        try {

            console.log("Hello world")

            const fromdata = new FormData()
            fromdata.append("data", JSON.stringify(BotData))
            DocsPrescription ? fromdata.append("prescription", DocsPrescription) : ""


            const reqheader = {

                "Content-Type": "multipart/form-data"

            }

            const res = await ChatBotApi(fromdata, reqheader)

            if (res.status >= 200 && res.status <= 300) {

                console.log("Success");


            }
            else {

                console.log(res);


            }


        }
        catch (err) {

            console.log(err);


        }

    }



    // Buy Products
    const Buy = (data) => {

        const user = sessionStorage.getItem("username")

        if (user) {

            if (data == "both") {

                Dispatch(AddBuyNow(Product))
                Navigate('/buy')

            }
            else {

                Dispatch(AddBuyNow([Product[0]]))
                Navigate('/buy')

            }

        }
        else {

            Navigate('/auth', { state: { from: location } })

        }

    }




    // Chat Bot Settings
    const settings = {

        general: { embedded: true, primaryColor: "#2a2a2a", secondaryColor: '#000' },
        chatHistory: { disabled: true },
        botBubble: { simStream: true, showAvatar: true },
        header: { title: (<div style={{ cursor: "pointer", margin: 0, fontSize: 20, fontWeight: "bold" }} >Self Assessment</div>) },
        notification: { disabled: true },
        emoji: { disabled: true },
        footer: {
            text:

                (
                    <div style={{ cursor: "pointer", display: "flex", flexDirection: "row", alignItems: "center", columnGap: 3 }}

                    >
                        <span key={0}>Powered By </span>


                        <span key={2} style={{ fontWeight: "bold" }}>Ex Technology</span>
                    </div>
                ),

        }

    }



    // Chat Bot Flow
    const flow = {

        start: {
            message: "Hi",
            transition: { duration: 200 },
            path: "start2"

        },

        start2: {
            message: "I am your Online Health guide From Happy Couple Solution.",
            transition: { duration: 200 },
            path: "start3"
        },

        start3: {
            message: "Welcome! ",
            transition: { duration: 200 },
            path: "start4"
        },

        start4: {
            message: "Kindly Complete a confidential interaction to find your ideal sexual health product for your happy life.",
            transition: { duration: 200 },
            path: "ask_phone"
        },


        ask_phone: {

            message: "Kindly Enter your Phone Number",
            function: (params) => SetBotData({ ...BotData, phone: params.userInput }),
            path: async (params) => {

                if (isNaN(Number(params.userInput))) {

                    await params.injectMessage("Ops needs to be a number!");
                    return;
                }
                return "step_1";
            }
        },

        step_1: {

            message: "What are your prior concerns about health?",
            options: ["Sexual Wellness", "Stress Management "],
            function: (params) => SetBotData({ ...BotData, What_are_your_prior_concerns_about_health: params.userInput }),
            chatDisabled: true,
            path: async (params) => {

                if (params.userInput == "Stress Management") {

                    return "Stress_1";
                }
                return "wellness_1";
            }

        },
        Stress_1: {

            message: "Provide Your Basic Information",
            chatDisabled: true,
            transition: { duration: 200 },
            path: "Stress_1_age"

        },

        Stress_1_age: {

            message: "Enter Your Age",
            function: (params) => SetBotData({ ...BotData, age: params.userInput }),
            path: async (params) => {

                if (isNaN(Number(params.userInput))) {

                    await params.injectMessage("Ops needs to be a number!");
                    return;
                }
                return "stress_1_sex";
            }
        },

        stress_1_sex: {

            message: "Please Select Your Sex",
            options: ["Male", "Female", "Others"],
            chatDisabled: true,
            function: (params) => SetBotData({ ...BotData, sex: params.userInput }),
            path: "stress_1_height"
        },

        stress_1_height: {

            message: "Enter Your Height In Cm",
            function: (params) => SetBotData({ ...BotData, height: params.userInput }),
            path: async (params) => {

                if (isNaN(Number(params.userInput))) {

                    await params.injectMessage("Ops needs to be a number!");
                    return;
                }
                return "stress_1_weight";
            }
        },

        stress_1_weight: {

            message: "Enter Your Weight In KG",
            function: (params) => SetBotData({ ...BotData, weight: params.userInput }),
            path: async (params) => {

                if (isNaN(Number(params.userInput))) {

                    await params.injectMessage("Ops needs to be a number!");
                    return;
                }
                return "stress_2";
            }
        },

        stress_2: {

            message: "Your Medical History",
            checkboxes: { items: ["High Diabetes", "Diabetes", "High BP", "Low BP", "High Cholesterol", "Thyroid issues", "Creatinine issues", "Cardiac issues", "None of the Above"] },
            function: (params) => SetBotData({ ...BotData, medical_history: params.userInput }),
            chatDisabled: true,
            path: "stress_3"

        },

        stress_3: {

            message: "How often do you feel stressed or anxious?",
            options: ["Rarely", "Sometimes", "Often", "Almost always"],
            function: (params) => SetBotData({ ...BotData, How_often_do_you_feel_stressed_or_anxious: params.userInput }),
            chatDisabled: true,
            path: "stress_4"

        },

        stress_4: {

            message: "Do you have trouble sleeping due to stress or anxiety?",
            options: ["Yes", "No"],
            function: (params) => SetBotData({ ...BotData, Do_you_have_trouble_sleeping_due_to_stress_or_anxiety: params.userInput }),
            chatDisabled: true,
            path: "stress_5"

        },

        stress_5: {

            message: "Have you experienced any major life chnages recently?",
            options: ["Yes", "No"],
            function: (params) => SetBotData({ ...BotData, major_life_chnages_recently: params.userInput }),
            chatDisabled: true,
            path: "stress_6"

        },


        stress_6: {

            message: "How do you usually cope with stress?",
            options: ["Exercise", "Meditation", " Talking to friends/family", "Hobbies", "None of the above"],
            function: (params) => SetBotData({ ...BotData, How_do_you_usually_cope_with_stress: params.userInput }),
            chatDisabled: true,
            path: "stress_7"

        },

        stress_7: {

            message: "How would you describe your activity levels?",
            options: ["Sedentary (Little or no exercise)", "Moderately Active (Moderate physical activity 3-5 days a week)", "Very Active (Regular gym-goer/running/sport)"],
            function: (params) => SetBotData({ ...BotData, sex_activitylevel: params.userInput }),
            chatDisabled: true,
            path: "stress_8"

        },

        stress_8: {

            message: "For how many hours do you usually sleep at night?",
            options: ["Less than 6 hours", "6 to 8 hours", "8hours+"],
            function: (params) => SetBotData({ ...BotData, Sleep_patterns: params.userInput }),
            chatDisabled: true,
            path: "stress_9"

        },

        stress_9: {

            message: "Diet and Eating Habits \nWhich of the following do you identify with?",
            checkboxes: { items: ["I eat junk food regularly", "I usually skip meals", "I usually eat home-cooked meals", "None of the above"] },
            function: (params) => SetBotData({ ...BotData, Eat_habit: params.userInput }),
            chatDisabled: true,
            path: "stress_10"

        },

        stress_10: {

            message: "Do you experience constipation and gas regularly?",
            options: ["Yes", "No"],
            function: (params) => SetBotData({ ...BotData, constipation_and_gas_regularly: params.userInput }),
            chatDisabled: true,
            path: "stress_11"

        },

        stress_11: {

            message: "Lifestyle Habits \nWhich of the following apply to you?",
            checkboxes: { items: ["I smoke regularly", "I drink alcohol regularly", "I drink more than 3 caffeinated drinks per day", "None of the above"] },
            function: (params) => SetBotData({ ...BotData, Life_habit: params.userInput }),
            chatDisabled: true,
            path: "stress_12"

        },

        stress_12: {

            message: "Do you have an existing doctor prescription for your concerns?",
            options: ["Yes", "No"],
            function: (params) => SetBotData({ ...BotData, existing_doctor_prescription_for_your_concerns: params.userInput }),
            chatDisabled: true,
            path: async (params) => {

                if (params.userInput == "Yes") {

                    return "stress_12_yes";
                }
                return "stress_end";
            }

        },

        stress_12_yes: {

            message: "Describe Medican and disease Or upload the Doctor Prescription",
            function: (params) => SetBotData({ ...BotData, Prescription: params.userInput }),
            file: (params) => handleFileUpload(params),
            path: "stress_end"

        },

        stress_end: {

            message: "Thank you for sharing valuable health information to help decide on the right treatment.",
            function: (params) => handlebotdata(),
            transition: { duration: 200 },
            chatDisabled: true,
            path: "AI_assement"

        },

        AI_assement: {

            message: "According to Your AI Assessment, to Resolve your sexual haeath issue We recommend",
            transition: { duration: 200 },
            chatDisabled: true,
            component: (

                <div className='p-5 pt-0'>

                    <button className='btn btn-info mt-3'>Confirm Your Free Doctor Consultation</button>

                </div>

            ),
            path: "save_data"

        },

        save_data: {

            message: "",
            chatDisabled: true,
            path: ""

        },


        // Sexual Wellness Flow
        wellness_1: {

            message: "Share your Main Concern you need a complete solution",
            options: ["Erectile Dysfunction (ED)", "Premature Ejaculation (PE)", "Low sexual interest / Poor Satisfaction"],
            function: (params) => SetBotData({ ...BotData, Share_your_Main_Concern_you_need_a_complete_solution: params.userInput }),
            chatDisabled: true,
            path: async (params) => {

                if (params.userInput == "Erectile Dysfunction (ED)") {

                    return "ED_1";
                }

                return "wellness_2";
            }

        },

        wellness_2: {

            message: "Provide Your Basic Information",
            chatDisabled: true,
            transition: { duration: 200 },
            path: "wellness_2_age"

        },

        wellness_2_age: {

            message: "Enter Your Age",
            function: (params) => SetBotData({ ...BotData, age: params.userInput }),
            path: async (params) => {

                if (isNaN(Number(params.userInput))) {

                    await params.injectMessage("Ops needs to be a number!");
                    return;
                }
                return "wellness_2_sex";
            }
        },

        wellness_2_sex: {

            message: "Please Select Your Sex",
            options: ["Male", "Female", "Others"],
            chatDisabled: true,
            function: (params) => SetBotData({ ...BotData, sex: params.userInput }),
            path: "wellness_2_height"
        },

        wellness_2_height: {

            message: "Enter Your Height In Cm",
            function: (params) => SetBotData({ ...BotData, height: params.userInput }),
            path: async (params) => {

                if (isNaN(Number(params.userInput))) {

                    await params.injectMessage("Ops needs to be a number!");
                    return;
                }
                return "wellness_2_weight"
            }
        },

        wellness_2_weight: {

            message: "Enter Your Weight In KG",
            function: (params) => SetBotData({ ...BotData, weight: params.userInput }),
            path: async (params) => {

                if (isNaN(Number(params.userInput))) {

                    await params.injectMessage("Ops needs to be a number!")
                    return;
                }
                return "wellness_3"
            }
        },

        wellness_3: {

            message: "Your Medical History",
            checkboxes: { items: ["High Diabetes", "Diabetes", "High BP", "Low BP", "High Cholesterol", "Thyroid issues", "Creatinine issues", "Cardiac issues", "None of the above"] },
            function: (params) => SetBotData({ ...BotData, medical_history: params.userInput }),
            chatDisabled: true,
            path: "wellness_4"

        },


        wellness_4: {

            message: "Which of the following do you identify with?",
            options: ["I ejaculate before penetration", "I find myself ejaculating too early during sex", "I have no issues with ejaculation"],
            function: (params) => SetBotData({ ...BotData, Which_of_the_following_do_you_identify_with: params.userInput }),
            chatDisabled: true,
            path: "wellness_5"

        },

        wellness_5: {

            message: "Have You issue with erectile dysfunction ?",
            options: ["Yes", "No"],
            function: (params) => SetBotData({ ...BotData, Have_You_issue_with_erectile_dysfunction: params.userInput }),
            chatDisabled: true,
            path: "wellness_6"

        },

        wellness_6: {

            message: "What is your Sexual Activity Frequency?",
            options: ["Daily", "Once a week", "More than once a week", "Less than once a week", "Don't keep track", "It's been a while since I have been active"],
            function: (params) => SetBotData({ ...BotData, your_Sexual_Activity_Frequency: params.userInput }),
            chatDisabled: true,
            path: "wellness_7"

        },

        wellness_7: {

            message: "How would you describe your activity levels?",
            options: ["Sedentary (Little or no exercise)", "Moderately Active (Moderate physical activity 3-5 days a week)", "Very Active (Regular gym-goer/running/sport)"],
            function: (params) => SetBotData({ ...BotData, sex_activitylevel: params.userInput }),
            chatDisabled: true,
            path: "wellness_8"

        },

        wellness_8: {

            message: "Which of the following do you identify with?",
            checkboxes: { items: ["I eat junk food regularly", "I usually skip meals", "I usually eat home-cooked meals", "None of the above"] },
            function: (params) => SetBotData({ ...BotData, Eat_habit: params.userInput }),
            chatDisabled: true,
            path: "wellness_9"

        },

        wellness_9: {

            message: "Do you experience stress regularly?",
            options: ["I am under a lot of stress", "Have been more stressed lately", "The normal stress of regular life", "No Stress"],
            function: (params) => SetBotData({ ...BotData, Do_you_experience_stress_regularly: params.userInput }),
            chatDisabled: true,
            path: "wellness_10"

        },

        wellness_10: {

            message: "Your Sleep Patterns",
            options: ["Less than 6 hours", "6 to 8 hours", "8hours+"],
            function: (params) => SetBotData({ ...BotData, Sleep_patterns: params.userInput }),
            chatDisabled: true,
            path: "wellness_11"

        },

        wellness_11: {

            message: "Do you experience constipation and gas regularly?",
            options: ["Yes", "No"],
            function: (params) => SetBotData({ ...BotData, constipation_and_gas_regularly: params.userInput }),
            chatDisabled: true,
            path: "wellness_12"

        },

        wellness_12: {

            message: "Lifestyle Habits",
            checkboxes: { items: ["I smoke regularly", "I drink alcohol regularly", "I drink more than 3 caffeinated drinks per day", "None of the above"] },
            function: (params) => SetBotData({ ...BotData, Life_habit: params.userInput }),
            chatDisabled: true,
            path: "wellness_13"

        },

        wellness_13: {

            message: "Are you taking any medicine continuously?",
            options: ["Yes", "No"],
            function: (params) => SetBotData({ ...BotData, taking_any_medicine_continuously: params.userInput }),
            chatDisabled: true,
            path: async (params) => {

                if (params.userInput == "Yes") {

                    return "wellness_13_yes";
                }

                return "wellness_14";
            }

        },


        wellness_13_yes: {

            message: "Describe Medican and Disease?",
            function: (params) => SetBotData({ ...BotData, Describe_Medican_and_Disease: params.userInput }),
            path: "wellness_14"

        },


        wellness_14: {

            message: "If you have any existing doctor prescriptions for your concerns?",
            options: ["Yes", "No"],
            function: (params) => SetBotData({ ...BotData, existing_doctor_prescriptions_for_your_concerns: params.userInput }),
            chatDisabled: true,
            path: async (params) => {

                if (params.userInput == "Yes") {

                    return "wellness_14_yes";
                }

                return "wellness_15";
            }

        },

        wellness_14_yes: {

            message: "Upload the latest prescriptions",
            file: (params) => handleFileUpload(params),
            path: "wellness_15"

        },

        wellness_15: {

            message: "Thank you for sharing valuable health information to help decide on the right treatment.",
            function: (params) => handlebotdata(),
            transition: { duration: 200 },
            chatDisabled: true,
            path: "AI_assement2"

        },

        AI_assement2: {

            message: "According to Your AI Assessment, to Resolve your sexual haeath issue We recommend",
            transition: { duration: 200 },
            chatDisabled: true,
            component: (

                <div className='d-flex flex-column p-5'>

                    <Card style={{ width: '18rem' }}>

                        <Card.Img variant="top" src="/LYGIN_M.jpg" />

                        <Card.Body>

                            <Card.Title>LYGIN_M</Card.Title>

                            <Button variant="dark" onClick={() => { Buy("one") }}>Buy Now</Button>

                        </Card.Body>

                    </Card>

                    <button className='btn btn-info mt-3'>Confirm Your Free Doctor Consultation</button>

                </div>

            ),
            path: "save_data"

        },




        // Erectile Dysfunction (ED)
        ED_1: {

            message: "Which of the following issues do you idented?",
            options: ["Occasionally, my erection is not hard enough to penetrate", "usually find it difficult to maintain an erection", "For some days/Months not to get an erection", "I am so crazy about having sex, but my erection level is Zero", "I have no issues in maintaining my erection"],
            function: (params) => SetBotData({ ...BotData, Which_of_the_following_issues_do_you_idented: params.userInput }),
            chatDisabled: true,
            path: "ED_2"

        },

        ED_2: {

            message: "Have You issues with Premature Ejaculation?",
            options: ["Yes", "No"],
            function: (params) => SetBotData({ ...BotData, issues_with_Premature_Ejaculation: params.userInput }),
            chatDisabled: true,
            path: "ED_3"

        },

        ED_3: {

            message: "Provide Your Personal Information",
            chatDisabled: true,
            transition: { duration: 200 },
            path: "ED_3_age"

        },

        ED_3_age: {

            message: "Enter Your Age",
            function: (params) => SetBotData({ ...BotData, age: params.userInput }),
            path: async (params) => {

                if (isNaN(Number(params.userInput))) {

                    await params.injectMessage("Ops needs to be a number!");
                    return;
                }
                return "ED_3_sex";
            }
        },

        ED_3_sex: {

            message: "Please Select Your Sex",
            options: ["Male", "Female", "Others"],
            chatDisabled: true,
            function: (params) => SetBotData({ ...BotData, sex: params.userInput }),
            path: "ED_3_height"
        },

        ED_3_height: {

            message: "Enter Your Height In Cm",
            function: (params) => SetBotData({ ...BotData, height: params.userInput }),
            path: async (params) => {

                if (isNaN(Number(params.userInput))) {

                    await params.injectMessage("Ops needs to be a number!");
                    return;
                }
                return "ED_3_weight"
            }
        },

        ED_3_weight: {

            message: "Enter Your Weight In KG",
            function: (params) => SetBotData({ ...BotData, weight: params.userInput }),
            path: async (params) => {

                if (isNaN(Number(params.userInput))) {

                    await params.injectMessage("Ops needs to be a number!")
                    return;
                }
                return "ED_4"
            }
        },

        ED_4: {

            message: "Your Medical History",
            checkboxes: { items: ["High Diabetes", "Diabetes", "High BP", "Low BP", "High Cholesterol", "Thyroid issues", "Creatinine issues", "Cardiac issues", "None of the above"] },
            function: (params) => SetBotData({ ...BotData, medical_history: params.userInput }),
            chatDisabled: true,
            path: "ED_5"

        },


        ED_5: {

            message: "How would you describe your activity levels?",
            options: ["Sedentary (Little or no exercise)", "Moderately Active (Moderate physical activity 3-5 days a week)", "Very Active (Regular gym-goer/running/sport)"],
            function: (params) => SetBotData({ ...BotData, sex_activitylevel: params.userInput }),
            chatDisabled: true,
            path: "ED_6"

        },


        ED_6: {

            message: "Which of the following do you identify with?",
            checkboxes: { items: ["I eat junk food regularly", "I usually skip meals", "I usually eat home-cooked meals", "None of the above"] },
            function: (params) => SetBotData({ ...BotData, Eat_habit: params.userInput }),
            chatDisabled: true,
            path: "ED_7"

        },

        ED_7: {

            message: "Do you experience constipation and gas regularly?",
            options: ["Yes", "No"],
            function: (params) => SetBotData({ ...BotData, constipation_and_gas_regularly: params.userInput }),
            chatDisabled: true,
            path: "ED_8"

        },

        ED_8: {

            message: "Do you experience stress regularly?",
            options: ["I am under a lot of stress", "Have been more stressed lately", "The normal stress of regular life", "No Stress"],
            function: (params) => SetBotData({ ...BotData, experience_stress_regularly: params.userInput }),
            chatDisabled: true,
            path: "ED_9"

        },

        ED_9: {

            message: "Your Sleep Patterns",
            options: ["Less than 6 hours", "6 to 8 hours", "8hours+"],
            function: (params) => SetBotData({ ...BotData, Sleep_patterns: params.userInput }),
            chatDisabled: true,
            path: "ED_10"

        },

        ED_10: {

            message: "Lifestyle Habits",
            checkboxes: { items: ["I smoke regularly", "I drink alcohol regularly", "I drink more than 3 caffeinated drinks per day", "None of the above"] },
            function: (params) => SetBotData({ ...BotData, Life_habit: params.userInput }),
            chatDisabled: true,
            path: "ED_11"

        },

        ED_11: {

            message: "Are you concerned about the side effects of erectile dysfunction medications, and would you prefer an alternative treatment that doesn't involve medication?",
            options: ["Yes", "No"],
            function: (params) => SetBotData({ ...BotData, concerned_about_the_side_effects_of_erectile_dysfunction_medications: params.userInput }),
            chatDisabled: true,
            path: async (params) => {

                if (params.userInput == "Yes") {

                    return "ED_11_yes";
                }

                return "ED_12";
            }

        },


        ED_11_yes: {

            message: "Based on your response, we recommend considering the Erectaid Vacuum Therapy Device. This device is ideal for individuals who are concerned about medication side effects or have conditions like high blood pressure or cardiac issues.",
            chatDisabled: true,
            transition: { duration: 200 },
            path: "ED_11_yes_2"
        },

        ED_11_yes_2: {

            message: "Erectaid Vacuum Therapy Device:\n- Safe and effective\n- No medication side effects\n- Suitable for users with high blood pressure and cardiac conditions",
            chatDisabled: true,
            transition: { duration: 200 },
            path: "ED_12"
        },


        ED_12: {

            message: "Are you taking any treatments?",
            options: ["Yes", "No"],
            function: (params) => SetBotData({ ...BotData, taking_any_treatments: params.userInput }),
            chatDisabled: true,
            path: async (params) => {

                if (params.userInput == "Yes") {

                    return "ED_12_yes";
                }

                return "ED_end";
            }

        },


        ED_12_yes: {

            message: "Describe Medican and disease Or upload the Doctor Prescription",
            function: (params) => SetBotData({ ...BotData, Prescription: params.userInput }),
            file: (params) => handleFileUpload(params),
            path: "ED_end"

        },


        ED_end: {

            message: "Thank you for sharing valuable health information to help decide on the right treatment.",
            function: (params) => handlebotdata(),
            transition: { duration: 200 },
            chatDisabled: true,
            path: "AI_assement3"

        },

        AI_assement3: {

            message: "According to Your AI Assessment, to Resolve your sexual haeath issue We recommend",
            transition: { duration: 200 },
            chatDisabled: true,
            component: (

                <div className='d-flex flex-column p-5'>


                    <div className='row'>


                        <div className='col-md-6'>

                            <Card style={{ width: '18rem' }}>

                                <Card.Img variant="top" src="/263x263-02.jpg" />

                                <Card.Body>

                                    <Card.Title>LYGIN_M</Card.Title>

                                </Card.Body>

                            </Card>


                        </div>

                        <div className='col-md-6'>

                            <Card style={{ width: '18rem' }}>

                                <Card.Img variant="top" src="/263x263-01.jpg" />

                                <Card.Body>

                                    <Card.Title>Vaccum Therapy Device</Card.Title>

                                </Card.Body>

                            </Card>

                        </div>


                    </div>

                    <button className='btn btn-dark mt-3' onClick={() => { Buy("both") }}>Buy Both Now</button>

                    <button className='btn btn-info mt-3'>Confirm Your Free Doctor Consultation</button>

                </div>

            ),
            path: "save_data"

        },


    }







    return (


        <>



            <section className='w-100 vh-100 d-flex justify-content-center align-items-center'>



                <ChatBot settings={settings} flow={flow} />



            </section>




        </>





    )














}

export default Bot