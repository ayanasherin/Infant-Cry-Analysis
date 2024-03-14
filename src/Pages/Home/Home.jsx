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
                        description="Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"
                        image="pain.jpg" />
                    <Cardx
                        heading="Hunger"
                        height='65px'
                        margin='10px'
                        subtitle="Crying due to hunger"
                        description="Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"
                        image="https://cdn-icons-png.freepik.com/512/4292/4292048.png" />
                    <Cardx
                        heading="Discomfort"
                        subtitle="Crying due to Discomfort"
                        height='65px'
                        margin='10px'
                        description="Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"
                        image="https://cdn-icons-png.freepik.com/512/927/927559.png" />
                    <Cardx
                        heading="Hunger"
                        height='65px'
                        margin='10px'
                        subtitle="Crying due to hunger"
                        description="Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"
                        image="https://cdn-icons-png.freepik.com/512/4292/4292048.png" />



                </div>
            </div>
        </>
    )
}
