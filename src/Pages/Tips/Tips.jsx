import React from 'react';
import './Tips.css';
import NavbarX from '../../Components/NavbarX.jsx/NavbarX';

function Tips() {
    // Dummy data for tips for giving birth to a healthy baby and tips for taking care of a newborn
    const birthTips = [
        "Attend regular prenatal check-ups with your healthcare provider.",
        "Eat a balanced diet rich in fruits, vegetables, lean protein, and whole grains.",
        "Stay physically active and engage in suitable exercises for pregnant women.",
        "Get enough rest and sleep to support your body's needs during pregnancy.",
        "Avoid alcohol, smoking, and drugs, as they can harm your baby's development.",
        "Educate yourself about childbirth and breastfeeding to prepare for the arrival of your baby.",
        "Stay hydrated by drinking plenty of water throughout the day.",
        "Practice relaxation techniques like deep breathing and meditation to reduce stress.",
        "Create a birth plan to outline your preferences for labor, delivery, and postpartum care.",
        "Discuss any concerns or questions with your healthcare provider throughout your pregnancy.",
        // Add more tips...
    ];

    const newbornCareTips = [
        "Ensure your baby's room is safe and comfortable for sleep.",
        "Practice safe sleep habits, such as placing your baby on their back to sleep.",
        "Feed your baby breast milk or formula every 2-3 hours, or as needed.",
        "Keep your baby clean and dry by changing diapers frequently.",
        "Soothe your baby with gentle rocking, swaddling, and skin-to-skin contact.",
        "Bond with your baby through cuddling, talking, and singing.",
        "Schedule regular well-baby visits with your pediatrician for check-ups and vaccinations.",
        "Keep track of your baby's growth and development milestones.",
        "Join parenting groups or classes to connect with other new parents and share experiences.",
        "Take breaks when needed and ask for help from family and friends.",
        // Add more tips...
    ];

    return (
        <>
            <NavbarX />
            <div className="tips-container">
                <img src= 'Tips.jpg' alt="Tips Image" className="tips-image" />
                <div className="birth-tips">
                    <h2>Tips for Giving Birth to a Healthy Baby</h2>
                    <ul>
                        {birthTips.map((tip, index) => (
                            <li key={index}>{tip}</li>
                        ))}
                    </ul>
                </div>
                <div className="newborn-care-tips">
                    <h2>Tips for Taking Good Care of a Newborn</h2>
                    <ul>
                        {newbornCareTips.map((tip, index) => (
                            <li key={index}>{tip}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Tips;
