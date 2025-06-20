import { useState } from "react";

export default function Testimonial() {
    const [testimonials] = useState([
        {
        id: 1,
        name: "Ahmad Fauzi",
        year: 2022,
        message:
            "Belajar di pesantren ini membentuk karakter saya menjadi lebih disiplin dan bertanggung jawab.",
        image:
            "https://i.pinimg.com/736x/94/c6/20/94c620c47f61639315a7c990557559bf.jpg",
        },
        {
        id: 2,
        name: "Rizki Ramadhan",
        year: 2021,
        message:
            "Lingkungan yang islami dan dukungan dari para ustadz membuat saya nyaman belajar di sini.",
        image:
            "https://i.pinimg.com/736x/39/88/73/398873f61856f94290409a120b364eb3.jpg",
        },
        {
        id: 3,
        name: "Fajar Maulana",
        year: 2023,
        message:
            "Saya sangat bersyukur pernah menjadi bagian dari pesantren ini. Ilmu agama dan umum seimbang.",
        image:
            "https://i.pinimg.com/736x/e1/a7/42/e1a7422086e0e4d7f3566316ab681877.jpg",
        },
        {
        id: 4,
        name: "Doni Saputra",
        year: 2020,
        message:
            "Banyak pengalaman berharga yang saya dapatkan, mulai dari belajar mandiri hingga memperdalam ilmu agama.",
        image:
            "https://i.pinimg.com/736x/a9/c0/43/a9c043149c5032c8a61938dd5ea3a795.jpg",
        },
        {
        id: 5,
        name: "Rizky Alamsyah",
        year: 2019,
        message:
            "Guru-guru yang sabar dan teman-teman yang suportif membuat proses belajar menjadi menyenangkan.",
        image:
            "https://i.pinimg.com/736x/6f/18/fd/6f18fd9f1c883917fe6449764edbbf87.jpg",
        },
        {
        id: 6,
        name: "Dimas Zhafran",
        year: 2022,
        message:
            "Program tahfidz di pesantren ini sangat membantu saya menghafal Al-Qur'an dengan metode yang efektif.",
        image:
            "https://i.pinimg.com/736x/b1/be/68/b1be68d22ebf90107724e28f7b7e5b6d.jpg",
        },
        {
        id: 7,
        name: "Hafidz Akbar",
        year: 2021,
        message:
            "Fasilitas lengkap dan suasana yang kondusif membuat saya betah menuntut ilmu di sini.",
        image:
            "https://i.pinimg.com/736x/8c/fe/b2/8cfeb2c6e7be1e4de401c2fa5c2f655a.jpg",
        },
        {
        id: 8,
        name: "Putra Aziz",
        year: 2020,
        message:
            "Saya bangga pernah menjadi santri di pesantren ini. Semoga terus mencetak generasi berakhlak mulia.",
        image:
            "https://i.pinimg.com/736x/51/f2/7c/51f27cb790b243e44c18ad9910a0e872.jpg",
        },
        {
        id: 9,
        name: "Muhammad Ilham",
        year: 2023,
        message:
            "Pengalaman belajar di sini sangat berkesan dan membekas dalam kehidupan saya hingga saat ini.",
        image:
            "https://i.pinimg.com/736x/95/79/0e/95790eaff81cd1aaf8f281d48965c828.jpg",
        },
    ]);

    return (
        <>
        <section id="testimonials" className="py-5 text-center container">
            <div className="row py-lg-5">
            <div className="col-lg-8 col-md-10 mx-auto">
                <h1 className="fw-bold">
                Sistem Informasi Manajemen Pesantren ONline Integratif
                </h1>
                <p className="lead text-body-secondary">
                Melalui situs web ini, kami berharap seluruh stakeholders pesantren, orang tua santri, dan calon santri dapat mengenal/mengetahui segala informasi tentang pesantren secara lebih luas, baik informasi mengenai sekolah, informasi terbaru atau berbagai kegiatan pembelajaran di sekolah dengan cepat, efisien, dan online selama 24 jam. Berikut adalah pengalaman dan kesan dari para alumni dan santri yang pernah belajar di pesantren kami.
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
