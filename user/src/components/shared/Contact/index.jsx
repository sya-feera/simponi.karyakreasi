export default function Contact(){
    return (
        <>
            <section id="contact" className="py-5 bg-body-tertiary">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="fw-bold">Contact Us</h2>
                        <p className="text-muted">Have any questions or suggestions? We'd love to hear from you!</p>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card shadow-sm p-4">
                                <form className="row g-3">
                                    <div className="col-md-6">
                                        <input type="text" className="form-control" placeholder="Your Name" />
                                    </div>
                                    <div className="col-md-6">
                                        <input type="email" className="form-control" placeholder="Your Email" />
                                    </div>
                                    <div className="col-12">
                                        <input type="text" className="form-control" placeholder="Subject" />
                                    </div>
                                    <div className="col-12">
                                        <textarea className="form-control" rows="5" placeholder="Your Message"></textarea>
                                    </div>
                                    <div className="col-12 text-end">
                                        <button type="submit" className="btn btn-primary px-4">Send Message</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}