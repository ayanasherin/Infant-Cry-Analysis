import React from 'react';
import './Exercise.css';
import NavbarX from '../../Components/NavbarX.jsx/NavbarX';

function Exercise() {
    // Dummy data for exercise tips
    const exerciseTips = [
        { id: 1, tip: "Walking", description: "Walking is a low-impact exercise that can be done throughout pregnancy. It helps improve circulation, strengthen muscles, and maintain a healthy weight." },
        { id: 2, tip: "Prenatal Yoga", description: "Prenatal yoga focuses on gentle stretching, breathing techniques, and relaxation. It can help alleviate common pregnancy discomforts, reduce stress, and prepare the body for childbirth." },
        { id: 3, tip: "Swimming", description: "Swimming is an excellent full-body workout that is gentle on the joints. It helps improve cardiovascular health, muscle tone, and flexibility while providing relief from swelling and back pain." },
        { id: 4, tip: "Pilates", description: "Pilates strengthens the core muscles, improves posture, and enhances flexibility. Modified Pilates exercises are safe during pregnancy and can help prevent or alleviate back pain and pelvic floor issues." },
        { id: 5, tip: "Stationary Cycling", description: "Stationary cycling provides a low-impact cardiovascular workout that strengthens the legs and improves endurance. Adjust the resistance and pace to match your fitness level and avoid overheating." },
        { id: 6, tip: "Strength Training", description: "Strength training with light weights or resistance bands helps maintain muscle mass, support joints, and prevent excessive weight gain. Focus on exercises that target major muscle groups and avoid heavy lifting or straining." },
        { id: 7, tip: "Pelvic Floor Exercises", description: "Pelvic floor exercises, also known as Kegels, help strengthen the muscles that support the bladder, uterus, and bowels. They can reduce the risk of urinary incontinence and pelvic organ prolapse during and after pregnancy." },
        { id: 8, tip: "Stretching", description: "Gentle stretching exercises improve flexibility, reduce muscle tension, and relieve discomfort. Focus on stretching major muscle groups, such as the hamstrings, back, and hips, and avoid overstretching or bouncing." }
        // Add more exercise tips here
    ];

    return (
        <>
            <NavbarX />
            <div className="exercise-container">
                <img src= 'Exercise.jpg' alt="Exercise Image" className="exercise-image" />
                <div className="exercise-content">
                    <h1>Exercise Tips for Mothers During Pregnancy</h1>
                    <ul className="exercise-tips">
                        {exerciseTips.map(tip => (
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

export default Exercise;
