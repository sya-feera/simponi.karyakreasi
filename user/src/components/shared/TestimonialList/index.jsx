import testimonialsData from "../../../Utils/testimonials";
import { useState } from "react";

export default function TestimonialList() {
    const [testimonials] = useState(testimonialsData);

    return (
        <>
        <section id="testimonials" className="py-5 text-center container">
            <div className="row py-lg-5">
            <div className="col-lg-8 col-md-10 mx-auto">
                <h1 className="fw-bold">
                Sistem Informasi Manajemen Pesantren ONline Integratif
                </h1>
                <p className="lead text-body-secondary">
                Melalui situs web ini, kami berharap seluruh stakeholders
                pesantren, orang tua santri, dan calon santri dapat mengenal/mengetahui
                segala informasi tentang pesantren secara lebih luas, baik informasi mengenai
                sekolah, informasi terbaru atau berbagai kegiatan pembelajaran di sekolah
                dengan cepat, efisien, dan online selama 24 jam. Berikut adalah pengalaman dan
                kesan dari para alumni dan santri yang pernah belajar di pesantren kami.
                </p>
            </div>
            </div>
        </section>

        <div className="album py-5 bg-body-tertiary">
            <div className="container">
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {testimonials.map((item) => (
                <div key={item.id} className="col">
                    <div className="card h-100 shadow-sm">
                    <img
                        src={item.image}
                        alt={item.name}
                        className="card-img-top p-3"
                        style={{
                        height: "250px",
                        objectFit: "cover",
                        borderRadius: "12px",
                        }}
                    />
                    <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <p className="card-text fst-italic">"{item.message}"</p>
                        <small className="text-muted">Angkatan {item.year}</small>
                    </div>
                    </div>
                </div>
                ))}
            </div>
            </div>
        </div>
        </>
    );
}
