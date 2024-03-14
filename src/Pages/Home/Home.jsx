import { useNavigate } from "react-router-dom"
import NavbarX from "../../Components/NavbarX.jsx/NavbarX"
import { Button } from "antd";
import './home.css';
import { useEffect, useState } from "react";
import Cardx from "../../Components/Card/Card";
import ModalX from "../../Components/Modal/Modal";
export const Home = () => {
    const nav = useNavigate();
    const [logCheck, setLogCheck] = useState(false);
    const user = localStorage.getItem('user');
    useEffect(() => {
        if (user) {
            setLogCheck(true);
        }
    }, [user])


    return (
        <>
            <NavbarX />
            <div className="d-flex  justify-content-center m-5 main-ctn">
                <div className="d-flex p-2 ">
                    <div className="block">
                        <h1>CryDecode</h1>
                        <p>Can't Understand why your baby is crying? <br />Well we are here to help you</p>
                        <div className="d-flex align-items-center ">
                            {logCheck ?
                                <Button onClick={() => { nav('/upload') }} className="btn">Upload</Button> :
                                <ModalX item="login" source="Upload" />}
                            <img src="waveAnim.gif" className="wave-icon" />
                        </div>
                    </div>
                    <div>
                        <img className="baby-land-img" src="https://c1.wallpaperflare.com/preview/157/901/227/newborn-infant-baby-cute.jpg" alt="crydecode" />
                    </div>

                </div>
                <div className="d-flex mt-4 ">
                    <Cardx
                        heading="Pain"
                        height='100px'
                        subtitle="Crying due to pain"
                        description=" Pain in infants can be caused by various factors such as illness, injury, teething, or discomfort from gas or colic.It's crucial for caregivers to attentively interpret these cries to address the cause of discomfort, ensuring the well-being and comfort of the baby."
                        image="pain.jpg" />
                    <Cardx
                        heading="Hunger"
                        height='65px'
                        margin='10px'
                        subtitle="Crying due to hunger"
                        description="Babies cry due to hunger as it is one of their most basic needs and their initial way to express it. This form of communication alerts caregivers that it is time for feeding."
                        image="https://cdn-icons-png.freepik.com/512/4292/4292048.png" />
                    <Cardx
                        heading="Discomfort"
                        subtitle="Crying due to Discomfort"
                        height='65px'
                        margin='10px'
                        description="Discomfort can arise from various sources such as a wet diaper, feeling too hot or too cold, being in an uncomfortable position, or experiencing minor physical irritations."
                        image="https://cdn-icons-png.freepik.com/512/927/927559.png" />
                    <Cardx
                        heading="Tired"
                        height='65px'
                        margin='10px'
                        subtitle="Crying due to Tiredness"
                        description="Babies cry due to tiredness as a means of signaling their need for rest or sleep. Caregivers can help by recognizing these signs early and establishing a calming bedtime routine to ease the transition to sleep."
                        image="https://cdn-icons-png.freepik.com/512/4292/4292048.png" />



                </div>
            </div>
        </>
    )
}
