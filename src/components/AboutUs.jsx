import React from 'react';
import NavBarBeforeLogin from './Misc/NavBarBeforeLogin';
function AboutUs() {
    return (<>
        <NavBarBeforeLogin/>
        <section className="bg-info bg-gradient">
            <div className="container py-5">
                <h1 className="text-center"> <b> About Us </b> </h1>
            </div>
        </section>
        <section className="bg-white bg-gradient">
            <div className="container py-5">
                <h5 className="text-center mb-4"> BookCart </h5>
                <p>
                    We offer a tremendous gathering of books in the various classifications of Fiction, Non-fiction, Biographies, History, Religions, Self – Help, Children. We likewise move in immense accumulation of Investments and Management, Computers, Engineering, Medical, College and School content references books proposed by various foundations as schedule the nation over. Other than this, we likewise offer an expansive gathering of E-Books at reasonable valuing.
                    We endeavor to broaden consumer loyalty by providing food simple easy using web indexes, brisk and easy-to-understand installment alternatives, and snappier conveyance frameworks. Upside to the majority of this, we are arranged to give energizing offers and charming limits on our books.
                    We might want to thank you for shopping with us. You can keep in touch with us for any new musings at “email-id” helping us to ad-lib for the peruser fulfillment
                </p>
            </div>
        </section>
    </>);
}

export default AboutUs;