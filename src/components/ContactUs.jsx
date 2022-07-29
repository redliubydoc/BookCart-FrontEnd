import React from 'react';
import ReaderNavbar from './Reader/ReaderNavbar';
function ContactUs() {
    return (<>
        <ReaderNavbar />
        <div className="container text-center my-5" style={{ height: "250px"}}>
            <h1 className="mt-3 mb-4 text-muted"> <b> Contact Us </b> </h1>
            Have questions about e-book viewer, subscriptions or any complain ? <br />
            Contact us on customer-service@bookcart.com <br />
        </div>
        <br/>
        <div style={{ backgroundColor: "white"}} className="bg-dark text-light pt-5">
            <div className="container text-center">
                <h4 className="mb-3"> Our Office Locations </h4>
                <div className="row row-auto">
                    <div className="col mx-3">
                        <div className="my-3">
                            <img src="./logo-india.svg" alt="" />
                        </div>
                        <div>
                            Bangalore <br />
                            2950 S. Delaware Street, Suite 201 San Mateo CA 94403 <br />
                            Reception/General enquiries: +91 650 513 0514
                            Availability: (Mon-Fri) 9AM to 5PM IST
                        </div>
                    </div>
                    <div className="col mx-3">
                        <div className="my-3">
                            <img src="./logo-india.svg" alt="" />
                        </div>
                        <div>
                            Kolkata <br />
                            2950 S. Delaware Street, Suite 201 San Mateo CA 94403 <br />
                            Reception/General enquiries: +91 650 513 0514
                            Availability: (Mon-Fri) 9AM to 5PM IST
                        </div>
                    </div>
                    <div className="col mx-3">
                        <div className="my-3">
                            <img src="./logo-india.svg" alt="" />
                        </div>
                        <div>
                            Delhi <br />
                            2950 S. Delaware Street, Suite 201 San Mateo CA 94403 <br />
                            Reception/General enquiries: +91 650 513 0514
                            Availability: (Mon-Fri) 9AM to 5PM IST
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}
export default ContactUs;