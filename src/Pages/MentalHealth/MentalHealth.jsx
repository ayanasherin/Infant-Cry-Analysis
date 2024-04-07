import React from 'react';
import './MentalHealth.css';
import NavbarX from '../../Components/NavbarX.jsx/NavbarX';

function MentalHealth() {
    // Dummy data for positive quotes and soothing music recommendations
    const positiveQuotesIcons = [
        "You are strong, capable, and worthy.",
        "Believe in yourself and your ability to handle whatever comes your way.",
        "Take a deep breath and let go of any worries or doubts.",
        "Focus on the present moment and find joy in the little things.",
        "You are loved and supported by those around you.",
        "Embrace self-care and prioritize your mental well-being.",
        "You have the power to create positive change in your life.",
        "Every day may not be good, but there is something good in every day.",
        "You are not alone. Reach out for support when you need it.",
        "Be kind to yourself. You're doing the best you can.",
        "Challenges are opportunities for growth and learning.",
        "You are worthy of love and respect, including from yourself."
    ];

    const soothingMusic = [
        { id: 1, title: "Weightless by Marconi Union", link: "https://www.youtube.com/watch?v=UfcAVejslrU", image: "weightless_cover.jpg" },
        { id: 2, title: "Clair de Lune by Claude Debussy", link: "https://www.youtube.com/watch?v=CvFH_6DNRCY", image: "clair_de_lune_cover.jpg" },
        { id: 3, title: "Spiegel im Spiegel by Arvo Pärt", link: "https://www.youtube.com/watch?v=TJ6Mzvh3XCc", image: "spiegel_im_spiegel_cover.jpeg" },
        { id: 4, title: "Gymnopédie No.1 by Erik Satie", link: "https://www.youtube.com/watch?v=S-Xm7s9eGxU", image: "gymnopedie_cover.jpg" },
        { id: 5, title: "Canon in D Major by Johann Pachelbel", link: "https://www.youtube.com/watch?v=JdxkVQy7QLM", image: "canon_in_d_major_cover.jpg" },
        { id: 6, title: "Méditation from Thaïs by Jules Massenet", link: "https://www.youtube.com/watch?v=hK4gJ4KFrqc", image: "meditation_cover.jpg" },
        { id: 7, title: "Clair de Lune by Yiruma", link: "https://www.youtube.com/watch?v=nBdZRuyTeUw", image: "clair_de_lune_yiruma_cover.jpg" },
        { id: 8, title: "Arabesque No. 1 by Claude Debussy", link: "https://www.youtube.com/watch?v=78Lp6GDnHNg", image: "arabesque_cover.jpg" },
        { id: 9, title: "Nocturne No. 2 by Frédéric Chopin", link: "https://www.youtube.com/watch?v=9E6b3swbnWg", image: "nocturne_cover.jpeg" },
        { id: 10, title: "Adagio for Strings by Samuel Barber", link: "https://www.youtube.com/watch?v=izQsgE0L450", image: "adagio_for_strings_cover.jpg" },
        { id: 11, title: "Piano Sonata No. 14 by Ludwig van Beethoven", link: "https://www.youtube.com/watch?v=8MQk3wDKoMk", image: "piano_sonata_cover.jpeg" },
        { id: 12, title: "Fantasia on a Theme by Thomas Tallis by Ralph Vaughan Williams", link: "https://www.youtube.com/watch?v=ihZ7m6Df4P8", image: "fantasia_on_a_theme_cover.jpeg" },
        // Add more soothing music recommendations here
    ];

    return (
        <>
            <NavbarX />
            <div className="mental-health-container">
                <img src= 'MentalHealth.jpg' alt="Mental Health Image" className="mental-health-image" />
                <div className="positive-quotes">
                    <h2>Positive Affirmations</h2>
                    <div className="positive-icons-container">
                        {positiveQuotesIcons.map((icon, index) => (
                            <div key={index} className="positive-icon">{icon}</div>
                        ))}
                    </div>
                </div>
                <div className="soothing-music">
                    <h2>Soothing Music For Happy Mind</h2>
                    <div className="music-list">
                        {soothingMusic.map(music => (
                            <div key={music.id} className="music-item">
                                <a href={music.link} target="_blank" rel="noopener noreferrer">
                                    <img src={music.image} alt={music.title} className="music-cover" />
                                    <span className="music-title">{music.title}</span>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default MentalHealth;
