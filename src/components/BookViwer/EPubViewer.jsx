import "./EPubViewer.css";

import {React, useState} from "react";
import {ReactReader, ReactReaderStyle} from "react-reader";
import withLocation from "../../hocs/withLocation";
import withParams from "../../hocs/withParams";

const ownStyles = { ...ReactReaderStyle, arrow: { ...ReactReaderStyle.arrow, color: "red" }};

const loc = null;
function EPubViewer(props) {
    const [location, setLocation] = useState(loc);
    const locationChanged = (epubCIFI) => setLocation(epubCIFI);
    let url = "";

    if (!!props.location.state && !!props.location.state.url) {
        url = props.location.state.url;
        console.log(url);
    }

    return (
        <>
            <div className="EPubViewer">

                <ReactReader location={location}
                    locationChanged={locationChanged}
                    url={url}
                    styles={ownStyles}/>
            </div>
        </>
    );
}

export default 
    withParams(
    withLocation(
        EPubViewer));