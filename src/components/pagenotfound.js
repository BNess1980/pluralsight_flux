import React from 'react';
import { Link } from 'react-router-dom';

function PageNotFound() {
    return(
        <>
        <h2>Sorry. The resource you're looking for is not here</h2>
        <Link to="/" className="btn btn-primary mt-2">Return Home</Link>
        </>
    )
}

export default PageNotFound;