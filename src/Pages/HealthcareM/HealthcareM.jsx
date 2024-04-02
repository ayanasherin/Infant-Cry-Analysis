import React from 'react';
import './HealthcareM.css';
import NavbarX from '../../Components/NavbarX.jsx/NavbarX';


function HealthcareM() {
    // Dummy data for healthcare tips
    const healthcareTips = [
        { id: 1, tip: "Get regular prenatal checkups with your healthcare provider.", description: "Regular checkups help monitor the health of both mother and baby and allow for timely intervention if needed." },
        { id: 2, tip: "Eat a balanced diet rich in fruits, vegetables, lean protein, and whole grains.", description: "A nutritious diet provides essential nutrients for the development of the baby and helps maintain the mother's health." },
        { id: 3, tip: "Stay hydrated by drinking plenty of water throughout the day.", description: "Drinking an adequate amount of water is important for overall health and helps prevent dehydration during pregnancy." },
        { id: 4, tip: "Take prenatal vitamins as recommended by your doctor.", description: "Prenatal vitamins contain essential nutrients like folic acid, iron, and calcium that are crucial for fetal development and maternal health." },
        { id: 5, tip: "Get regular exercise suitable for pregnant women, such as walking or swimming.", description: "Exercise during pregnancy helps improve mood, reduce discomfort, and promote better sleep. It's important to choose safe activities and consult with your healthcare provider." },
        { id: 6, tip: "Get enough rest and sleep to support your body's needs during pregnancy.", description: "Adequate rest is essential for the body to recover and prepare for childbirth. Aim for 7-9 hours of sleep per night and take short naps during the day if needed." },
        { id: 7, tip: "Avoid alcohol, smoking, and drugs, as they can harm your baby's development.", description: "Alcohol, smoking, and drugs can have serious consequences for fetal development and increase the risk of complications during pregnancy and childbirth. It's best to avoid them completely." },
        { id: 8, tip: "Educate yourself about childbirth and breastfeeding to prepare for the arrival of your baby.", description: "Taking childbirth and breastfeeding classes can help you feel more confident and prepared for labor, delivery, and caring for your newborn. Knowledge is empowering!" },
        { id: 9, tip: "Avoid high-mercury fish such as swordfish and king mackerel during pregnancy.", description: "High-mercury fish can contain toxins that are harmful to the developing baby's nervous system. Choose low-mercury alternatives like salmon, shrimp, and catfish instead." },
        { id: 10, tip: "Take steps to reduce stress and practice relaxation techniques like deep breathing and meditation.", description: "High levels of stress during pregnancy can affect both the mother and baby. Find ways to relax and unwind, such as practicing mindfulness, yoga, or spending time in nature." },
        { id: 11, tip: "Limit caffeine intake to no more than 200 milligrams per day.", description: "Excessive caffeine consumption has been linked to an increased risk of miscarriage and low birth weight. Stick to moderate amounts of caffeine from sources like coffee, tea, and chocolate." },
        { id: 12, tip: "Attend childbirth education classes to learn about the labor and delivery process.", description: "Childbirth education classes provide valuable information about the stages of labor, pain management techniques, and medical interventions. They also offer an opportunity to ask questions and connect with other expectant parents." },
        { id: 13, tip: "Create a birth plan to outline your preferences for labor, delivery, and postpartum care.", description: "A birth plan helps you communicate your wishes to your healthcare team and ensures that your preferences are respected during labor and delivery. Include details about pain management, labor positions, and newborn care." },
        { id: 14, tip: "Discuss any concerns or questions with your healthcare provider throughout your pregnancy.", description: "Open communication with your healthcare provider is essential for a healthy pregnancy. Don't hesitate to ask questions or seek guidance about any aspect of your pregnancy, from prenatal care to childbirth preparation." }
    ];

    return (
        <>
            <NavbarX />
            <div className="healthcare-container">
                <img src= 'HealthcareM.jpg' alt="Healthcare Image" className="healthcare-image" />
                <div className="healthcare-content">
                    <h1>Healthcare Tips for Mothers During Pregnancy</h1>
                    <ul className="healthcare-tips">
                        {healthcareTips.map(tip => (
                            <li key={tip.id}>
                                <h3>{tip.tip}</h3>
                                <p>{tip.description}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default HealthcareM;
