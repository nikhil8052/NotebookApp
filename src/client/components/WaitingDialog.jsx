import React from "react";
import { Container } from 'react-bootstrap';

function WaitingDialog() {
    return (
        <>

            <Container md style={{ backgroundColor: 'white', marginTop: '30px', padding: '30px', width: '500px' }}>
                <div class="spinner-grow text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
                <div class="spinner-grow text-secondary" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
                <div class="spinner-grow text-success" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
                <div class="spinner-grow text-danger" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
                <div class="spinner-grow text-warning" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
                <div class="spinner-grow text-info" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
                <div class="spinner-grow text-light" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
                <div class="spinner-grow text-dark" role="status">
                    <span class="sr-only">Loading...</span>
                </div>

                <h3 style={{marginTop:'20px',borderRadius:'20%'}}> Wait data is being loaded ...</h3>


            </Container>

        </>
    )
}

export default WaitingDialog;