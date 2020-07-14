import React from 'react';
import {Link} from "react-router-dom";
import button from "react-bootstrap/Button";
function Files() {
    return (
        <div>
        <h1>Documents</h1>
            <Link to={"/File"}>
                <button type="button"
                        className="btn btn-primary btn-lg"
                >Document
                </button>
            </Link>
        </div>

);
}
export default Files