import React from 'react';
import './Nutrition.css';
import NavbarX from '../../Components/NavbarX.jsx/NavbarX';

function Nutrition() {
    // Dummy data for nutrition tips for mother and baby
    const nutritionTips = [
        {
            category: "For Mother:",
            tips: [
                "Eat a variety of fruits, vegetables, whole grains, and lean proteins to get essential nutrients.",
                "Include sources of calcium, such as dairy products or fortified foods, for bone health.",
                "Stay hydrated by drinking plenty of water throughout the day.",
                "Limit intake of sugary drinks and foods high in saturated fats.",
                "Take prenatal vitamins as recommended by your healthcare provider.",
                "Include healthy fats like avocados, nuts, and fatty fish in your diet for brain development.",
                "Incorporate iron-rich foods like spinach, lentils, and lean meats to prevent anemia.",
                "Opt for fiber-rich foods like beans, legumes, and whole grains to support digestion.",
                "Limit caffeine intake to no more than 200 milligrams per day.",
                "Avoid alcohol and tobacco products, which can harm your baby's development.",
                // Add more tips for mother's nutrition here
            ]
        },
        {
            category: "For Baby:",
            tips: [
                "If breastfeeding, aim for exclusive breastfeeding for the first six months.",
                "For formula-fed babies, choose a formula that is appropriate for your baby's age and needs.",
                "Introduce solid foods gradually, starting with single-ingredient purees and advancing to mixed textures.",
                "Offer a variety of nutrient-rich foods to support your baby's growth and development.",
                "Avoid introducing honey and foods that may pose choking hazards.",
                "Include iron-fortified cereals and pureed meats in your baby's diet to prevent iron deficiency.",
                "Provide plenty of opportunities for your baby to try different tastes and textures.",
                "Avoid added sugars and salt in your baby's diet.",
                "Monitor your baby's growth and development milestones with regular check-ups.",
                "Consult with a pediatrician or registered dietitian if you have concerns about your baby's nutrition.",
                // Add more tips for baby's nutrition here
            ]
        }
    ];

    return (
        <>
            <NavbarX />
            <div className="nutrition-container">
            <img src= 'Nutrition.jpg' alt="Nutrition Image" className="nutrition-image" />

                {nutritionTips.map((category, index) => (
                    <div key={index} className="nutrition-category">
                        <h2>{category.category}</h2>
                        <ul>
                            {category.tips.map((tip, i) => (
                                <li key={i}>{tip}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Nutrition;
