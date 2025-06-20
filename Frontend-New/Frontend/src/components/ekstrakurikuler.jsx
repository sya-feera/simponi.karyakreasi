export default function Ekstrakurikuler(){
    return ( 
        <>
            <div id="ekstrakurikuler" className="container px-4 py-5">
                <h2 className="pb-2 border-bottom text-align-center">Ekstrakurikuler</h2>
                <p className="lead mb-0">Berbagai kegiatan penunjang yang dirancang untuk mengembangkan potensi, bakat, dan karakter santri di luar kegiatan pembelajaran utama.</p>
                
                <div className="row row-cols-1 row-cols-md-3 g-4 py-5">
                    {/* Ekstra 1 */}
                    <div className="col">
                        <div className="card h-100 shadow-sm text-center">
                            <div className="py-3">
                                <img src="https://i.pinimg.com/736x/1f/66/f8/1f66f86f0d83f7c4a659d682531c440b.jpg" className="rounded-circle mb-10" alt="Pramuka" style={{width: "250px", height: "250px"}} />
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Pramuka</h5>
                                <p className="card-text text-primary fw-bold">Pembinaan karakter</p>
                                <p className="card-text">Melatih kemandirian, kedisiplinan, dan kerja sama tim melalui kegiatan kepanduan.</p>
                            </div>
                        </div>
                    </div>

                    {/* Ekstra 2 */}
                    <div className="col">
                        <div className="card h-100 shadow-sm text-center">
                            <div className="py-3">
                                <img src="https://i.pinimg.com/736x/6d/ee/38/6dee38cae7f6d7cb137acc833b269476.jpg" className="rounded-circle mb-10" alt="Tahfidz" style={{width: "250px", height: "250px"}} />
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Tahfidz Al-Qur'an</h5>
                                <p className="card-text text-primary fw-bold">Menghafal Al-Qur'an</p>
                                <p className="card-text">Program intensif menghafal dan memahami Al-Qur’an dengan bimbingan ustadz profesional.</p>
                            </div>
                        </div>
                    </div>

                    {/* Ekstra 3 */}
                    <div className="col">
                        <div className="card h-100 shadow-sm text-center">
                            <div className="py-3">
                                <img src="https://i.pinimg.com/736x/4b/9f/ef/4b9fef77494cac46b314f4d81d0b3241.jpg" className="rounded-circle mb-10" alt="Kaligrafi" style={{width: "250px", height: "250px"}} />
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Kaligrafi</h5>
                                <p className="card-text text-primary fw-bold">Seni menulis indah</p>
                                <p className="card-text">Melatih santri dalam menulis huruf Arab dengan indah, sebagai bentuk ekspresi seni Islami.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row row-cols-1 row-cols-md-4 g-4 py-5">
                    {/* Ekstra 4 */}
                    <div className="col">
                        <div className="card h-100 shadow-sm text-center">
                            <div className="py-3">
                                <img src="https://png.pngtree.com/png-clipart/20191122/original/pngtree-tambourine-icon-cartoon-style-png-image_5177524.jpg" className="rounded-circle mb-10" alt="Hadrah" style={{width: "150px", height: "150px"}} />
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Hadrah</h5>
                                <p className="card-text text-primary fw-bold">Seni musik islami</p>
                                <p className="card-text">Grup hadrah sebagai sarana mengekspresikan kecintaan kepada Nabi melalui musik dan syair.</p>
                            </div>
                        </div>
                    </div>

                    {/* Ekstra 5 */}
                    <div className="col">
                        <div className="card h-100 shadow-sm text-center">
                            <div className="py-3">
                                <img src="https://i.pinimg.com/736x/57/cc/b8/57ccb8696f006bf7c769019792c3a60a.jpg" className="rounded-circle mb-10" alt="Bahasa Arab" style={{width: "150px", height: "150px"}} />
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Bahasa Arab</h5>
                                <p className="card-text text-primary fw-bold">Pengembangan bahasa</p>
                                <p className="card-text">Meningkatkan kemampuan berbahasa Arab melalui debat, drama, dan percakapan harian.</p>
                            </div>
                        </div>
                    </div>

                    {/* Ekstra 6 */}
                    <div className="col">
                        <div className="card h-100 shadow-sm text-center">
                            <div className="py-3">
                                <img src="https://i.pinimg.com/736x/05/44/6c/05446c05ef3fedbd30bc022598a95a7e.jpg" className="rounded-circle mb-10" alt="Olahraga" style={{width: "200px", height: "160px"}} />
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Olahraga</h5>
                                <p className="card-text text-primary fw-bold">Fisik & kesehatan</p>
                                <p className="card-text">Menyediakan berbagai pilihan seperti futsal, badminton, dan bela diri untuk menjaga kebugaran santri.</p>
                            </div>
                        </div>
                    </div>

                    {/* Ekstra 7 */}
                    <div className="col">
                        <div className="card h-100 shadow-sm text-center">
                            <div className="py-3">
                                <img src="https://cakratara.com/wp-content/uploads/2021/05/timthumb.jpeg" className="rounded-circle mb-10" alt="Jurnalistik" style={{width: "150px", height: "150px"}} />
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Jurnalistik</h5>
                                <p className="card-text text-primary fw-bold">Kepenulisan & media</p>
                                <p className="card-text">Mengasah kemampuan menulis berita, opini, dan karya sastra serta pengelolaan buletin pesantren.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
