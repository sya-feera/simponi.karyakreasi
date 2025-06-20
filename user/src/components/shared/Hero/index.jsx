import React, { useState, useEffect } from "react";

export default function Hero() {
    const [activeIndex, setActiveIndex] = useState(0);

    const carouselItems = [
        {
        id: 1,
        title: "Rancang Masa Depan",
        text: "Pesantren modern yang memadukan nilai-nilai Islam dan ilmu pengetahuan untuk mencetak generasi berakhlak dan berwawasan luas.",
        mainImage: "/images/santri1-hero.jpeg",
        secondaryImage: "/images/santri6-hero.jpg",
        },
        {
        id: 2,
        title: "Bentuk Karakter Islami",
        text: "Suasana pesantren yang kondusif membentuk karakter santri yang disiplin, mandiri, dan siap menjadi pemimpin masa depan.",
        mainImage: "/images/santri3-hero.jpg",
        secondaryImage: "/images/santri2-hero.jpeg",
        },
        {
        id: 3,
        title: "Kurikulum Terintegrasi",
        text: "Gabungan pendidikan pesantren dan teknologi informasi yang komprehensif, dirancang untuk mempersiapkan generasi yang berakhlak mulia dan siap menghadapi era digital.",
        mainImage: "/images/santri5-hero.jpg",
        secondaryImage: "/images/santri4-hero.jpg",
        },
    ];

    const handlePrev = () => {
        setActiveIndex((prevIndex) =>
        prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setActiveIndex((prevIndex) =>
        prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
        );
    };

    // Auto-rotate carousel every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
        setActiveIndex((prevIndex) =>
            prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
        );
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const currentItem = carouselItems[activeIndex];

    return (
        <>
        <style>{`
            .hero-section {
            position: relative;
            overflow: hidden;
            padding: 20px 0 40px;
            background-color: #f9f9fb;
            min-height: auto;
            display: block;
            }
            
            .hero-title {
            font-size: 3.5rem;
            font-weight: 800;
            color: #000;
            line-height: 1.2;
            }
            
            .hero-text {
            margin-top: 1.5rem;
            font-size: 1.1rem;
            line-height: 1.6;
            }
            
            .image-container {
            position: relative;
            height: 100%;
            display: flex;
            justify-content: flex-end;
            }
            
            .blob-image {
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            }
            
            .main-image {
            width: 75%;
            height: auto;
            object-fit: contain;
            border-radius: 50% 50% 30% 30% / 30% 30% 70% 70%;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            transition: all 0.5s ease;
            }
            
            .secondary-image {
            position: absolute;
            bottom: -2%;
            left: -15%;
            width: 65%;
            height: auto;
            object-fit: cover;
            border-radius: 70% 30% 50% 50% / 50% 50% 50% 50%;
            box-shadow: 0 15px 30px rgba(0,0,0,0.15);
            z-index: 2;
            transition: all 0.5s ease;
            }
            
            .navigation-btn {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: white;
            color: #0d6efd;
            border: 1px solid rgba(0,0,0,0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 8px rgba(0,0,0,0.05);
            }
            
            .navigation-btn:hover {
            background-color: #f8f9fa;
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(0,0,0,0.1);
            }
            
            .dots-decoration {
            position: absolute;
            width: 100px;
            height: 100px;
            opacity: 0.3;
            }
            
            .dots-decoration.top-left {
            top: 10%;
            left: 5%;
            }
            
            .dots-decoration.bottom-left {
            bottom: 10%;
            left: 15%;
            }
            
            .dots-decoration.bottom-right {
            bottom: 5%;
            right: 20%;
            }
            
            .carousel-indicators {
            position: absolute;
            bottom: -20px;
            display: flex;
            justify-content: center;
            margin: 0;
            padding: 0;
            list-style: none;
            }
            
            .carousel-indicators button {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: #ccc;
            border: none;
            margin: 0 5px;
            padding: 0;
            cursor: pointer;
            } 
            
            .carousel-indicators button.active {
            background-color: #0d6efd;
            }
            
            .carousel-content {
            transition: all 0.5s ease;
            }
            
            .fade-in {
            animation: fadeIn 0.5s;
            }
            
            @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
            }
        `}</style>

        <div className="hero-section">
            <div className="dots-decoration top-left">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <pattern
                id="dots"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
                >
                <circle cx="5" cy="5" r="2" fill="#0d6efd" />
                </pattern>
                <rect x="0" y="0" width="100" height="100" fill="url(#dots)" />
            </svg>
            </div>

            <div className="container-fluid px-5">
            <div className="row align-items-center">
                <div className="col-1 d-flex justify-content-center">
                <button
                    className="navigation-btn"
                    aria-label="Previous slide"
                    onClick={handlePrev}
                >
                    <i className="fa-solid fa-chevron-left"></i>
                </button>
                </div>

                <div className="col-12 col-md-5" style={{ paddingLeft: "85px" }}>
                <div className="carousel-content fade-in">
                    <h1 className="hero-title">{currentItem.title}</h1>
                    <p className="hero-text">{currentItem.text}</p>
                </div>

                <div className="dots-decoration bottom-left">
                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <pattern
                        id="dots2"
                        x="0"
                        y="0"
                        width="20"
                        height="20"
                        patternUnits="userSpaceOnUse"
                    >
                        <circle cx="5" cy="5" r="2" fill="#0d6efd" />
                    </pattern>
                    <rect x="0" y="0" width="100" height="100" fill="url(#dots2)" />
                    </svg>
                </div>
                </div>

                <div className="col-12 col-md-5" style={{ paddingLeft: "70px" }}>
                <div className="image-container">
                    <div className="blob-image fade-in">
                    <img
                        src={currentItem.mainImage}
                        alt="Main hero"
                        className="main-image"
                    />
                    <img
                        src={currentItem.secondaryImage}
                        alt="Secondary hero"
                        className="secondary-image"
                    />
                    </div>
                </div>

                <div className="dots-decoration bottom-right">
                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <pattern
                        id="dots3"
                        x="0"
                        y="0"
                        width="20"
                        height="20"
                        patternUnits="userSpaceOnUse"
                    >
                        <circle cx="5" cy="5" r="2" fill="#0d6efd" />
                    </pattern>
                    <rect x="0" y="0" width="100" height="100" fill="url(#dots3)" />
                    </svg>
                </div>
                </div>

                <div className="col-1 d-flex justify-content-center">
                <button
                    className="navigation-btn"
                    aria-label="Next slide"
                    onClick={handleNext}
                >
                    <i className="fa-solid fa-chevron-right"></i>
                </button>
                </div>
            </div>

            <div className="row">
                <div className="col-12 d-flex justify-content-center mt-4">
                <div className="carousel-indicators">
                    {carouselItems.map((item, index) => (
                    <button
                        key={item.id}
                        className={index === activeIndex ? "active" : ""}
                        onClick={() => setActiveIndex(index)}
                        aria-label={`Slide ${index + 1}`}
                    ></button>
                    ))}
                </div>
                </div>
            </div>
            </div>
        </div>
        </>
    );
}
