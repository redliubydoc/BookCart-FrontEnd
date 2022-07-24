import {React, useState} from "react";

import {ReactReader, ReactReaderStyle} from "react-reader";
import ReaderNavbar from "../Misc/ReaderNavbar";

const ownStyles = { ...ReactReaderStyle, arrow: { ...ReactReaderStyle.arrow, color: "red" }};

const loc = null;
function EPubViewer(props) {
    const [location, setLocation] = useState(loc);
    const locationChanged = (epubCIFI) => setLocation(epubCIFI);

    return (
        <>
            <ReaderNavbar/>
            <div className="App" style={{
                position: "relative",
                height: "100vh"
            }}>

                <ReactReader location={location}
                    locationChanged={locationChanged}
                    url={props.url}
                    styles={ownStyles}/>
            </div>
        </>
    );
}

export default EPubViewer;