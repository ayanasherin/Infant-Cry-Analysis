import React, {useEffect} from 'react';
import './Exercise.css';
import NavbarX from '../../Components/NavbarX.jsx/NavbarX';

function Exercise() {
    // Dummy data for exercise tips
    const exerciseTips = [
        { 
            id: 1, 
            tip: "Walking", 
            description: "Walking is a low-impact exercise that can be done throughout pregnancy. It helps improve circulation, strengthen muscles, and maintain a healthy weight. Aim for brisk walks of at least 30 minutes most days of the week, and choose comfortable footwear with good support." 
            ,img: "M3.png"
        },
        { 
            id: 2, 
            tip: "Prenatal Yoga", 
            description: "Prenatal yoga focuses on gentle stretching, breathing techniques, and relaxation. It can help alleviate common pregnancy discomforts, reduce stress, and prepare the body for childbirth. Look for classes specifically designed for pregnant women and avoid poses that involve lying on your back or belly." 
            ,img: "M3.png"
        },
        { 
            id: 3, 
            tip: "Swimming", 
            description: "Swimming is an excellent full-body workout that is gentle on the joints. It helps improve cardiovascular health, muscle tone, and flexibility while providing relief from swelling and back pain. Choose strokes that feel comfortable and avoid overly strenuous movements." 
            ,img: "M3.png"
        },
        { 
            id: 4, 
            tip: "Pilates", 
            description: "Pilates strengthens the core muscles, improves posture, and enhances flexibility. Modified Pilates exercises are safe during pregnancy and can help prevent or alleviate back pain and pelvic floor issues. Always inform your instructor that you're pregnant and avoid exercises that involve lying flat on your back for extended periods." 
            ,img: "M3.png"
        },
        { 
            id: 5, 
            tip: "Stationary Cycling", 
            description: "Stationary cycling provides a low-impact cardiovascular workout that strengthens the legs and improves endurance. Adjust the resistance and pace to match your fitness level and avoid overheating. Maintain an upright posture and avoid leaning too far forward or backward." 
            ,img: "M3.png"
        },
        { 
            id: 6, 
            tip: "Strength Training", 
            description: "Strength training with light weights or resistance bands helps maintain muscle mass, support joints, and prevent excessive weight gain. Focus on exercises that target major muscle groups and avoid heavy lifting or straining. Always use proper form and avoid holding your breath during lifts." 
            ,img: "M3.png"
        },
        { 
            id: 7, 
            tip: "Pelvic Floor Exercises", 
            description: "Pelvic floor exercises, also known as Kegels, help strengthen the muscles that support the bladder, uterus, and bowels. They can reduce the risk of urinary incontinence and pelvic organ prolapse during and after pregnancy. Practice contracting and relaxing your pelvic floor muscles regularly throughout the day." 
            ,img: "M3.png"
        },
        { 
            id: 8, 
            tip: "Stretching", 
            description: "Gentle stretching exercises improve flexibility, reduce muscle tension, and relieve discomfort. Focus on stretching major muscle groups, such as the hamstrings, back, and hips, and avoid overstretching or bouncing. Hold each stretch for about 30 seconds and breathe deeply." 
            ,img: "M3.png"
        }
        // Add more exercise tips here
    ];
    
    useEffect(() => {
        const outerDivs = document.querySelectorAll('.outer-div');
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('zoom');
                } else {
                    entry.target.classList.remove('zoom');
                }
            });
        }, { threshold: 0.5 });

        outerDivs.forEach(outerDiv => {
            observer.observe(outerDiv);
        });

        return () => {
            observer.disconnect();
        };
    }, []);


    return (
        <>
            <NavbarX />
            <div className="exercise-container">
                
                <div className="exercise-content">
                    <h1 style={{marginTop: '20px', marginBottom: '40px'}}>Exercise Tips for Mothers During Pregnancy</h1>
                    <ul className="exercise-tips">
                        {exerciseTips.map(tip => (
                           <div className="outer-div" key={tip.id}>
                           <div className="inner-div">
                               <h3>{tip.tip}</h3>
                               <p>{tip.description}</p>
                           </div>
                           <div className="inner-div">
                               <img src={tip.img} alt="Exercise Image" className="exercise-image" />
                           </div>
                       </div>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Exercise;
