import Contact from "../shared/Contact";
import Footer from "../shared/Footer";
import Hero from "../shared/Hero";
import TestimonialList from "../shared/TestimonialList";
import Ekstrakurikuler from "../shared/Ekstrakurikuler";
import Header from "../shared/Header";

export default function Home(){
    return (
        <>
            {/* Header */}
            <Header/>


            {/* Hero */}
            <Hero/>


            {/* Testimoni List */}
            <TestimonialList/>


            {/* Ekstrakurikuler */}
            <Ekstrakurikuler/>


            {/* Contact */}
            <Contact/>


            {/* Footer */}
            <Footer/>
        </>
    )
}