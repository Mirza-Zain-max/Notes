import React from 'react';
import { Button } from 'react-bootstrap';

const PageNotFound = () => {

    return (
        <main className='d-flex justify-content-center align-items-center' style={{ height: '100vh', backgroundColor: '#fff' }}>
            <div className='justify-content-center align-items-center d-flex flex-column'>
                <h1 className='display-1 text-center'>4<span style={{ fontSize: '80px' }}>&#128524;</span>4</h1>
                <p className='display-2 text-center'>Page Not Found</p>
                <Button  className=' btn btn-dark w-50 justify-content-center align-items-center d-flex' onClick={() => window.history.back()}>Go Back</Button>
            </div>
        </main>
    );
};

export default PageNotFound;