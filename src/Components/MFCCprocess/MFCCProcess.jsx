import { useState, useEffect } from 'react';
import './MFCCProcess.css'; 

const MFCCProcess = () => {
    const [currentStep, setCurrentStep] = useState(0);

    
    const mfccProcessingSteps = [
        'Frame Segmentation',
        'Windowing',
        'Fast Fourier Transform (FFT)',
        'Mel Filterbank',
        'Discrete Cosine Transform (DCT)',
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStep((prevStep) => (prevStep < mfccProcessingSteps.length - 1 ? prevStep + 1 : prevStep));
        }, 800); // Change step every 0.8 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="mfcc-process-container">
            {mfccProcessingSteps.map((step, index) => (
                <div key={index} className={`mfcc-step ${index === currentStep ? 'highlighted' : ''}`}>
                    {step}
                </div>
            ))}
        </div>
    );
};

export default MFCCProcess;
