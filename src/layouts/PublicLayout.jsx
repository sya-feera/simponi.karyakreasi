import Contact from "../components/contact";
import Footer from "../components/footer";
import Hero from "../components/hero";
import TestimonialList from "../components/testimonial";
import Ekstrakurikuler from "../components/ekstrakurikuler";
import Header from "../components/header";

export default function PublicLayout(){
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