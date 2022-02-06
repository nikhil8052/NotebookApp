import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import { ListGroup } from 'react-bootstrap';


function AllUsers() {
    const [allusers, setAllUsers] = useState([]);

    // GET ALL THE USERS FROM THE FOLDER 
    async function call() {
        let tem=[];
        await $.get("http://localhost:8000/allimages", (result, err) => {
            result.map((val,idx)=>{
                  tem.push(val);
            })
            
        })
        setAllUsers(tem);
    }

    // CALL AFTER RENDER THE COMPONENT 
    useState(() => {
        call()
    }, [])

    // USER PROFILE CSS IN JS 
    let userProfile = {
        display: 'left',
        width: '50px',
        height: '50px',
        float: 'left',
        marginRight: '20px',
        borderRadius:'50%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover'

    }

    return (
        <>

            <ListGroup as="ul" style={{ padding: '3px', margin: '3px' }}>

                {
                    allusers.map((val, idx) =>
                        <>
                            <ListGroup.Item as="li">
                                <input type="file" id="uploadNewPhoto" hidden />
                                <img id="userimg" src={`/images/${val}`} style={userProfile} alt="Not Found" />
                                <h3 style={{ marginTop: '10px' }}>Nikhil</h3>
                            </ListGroup.Item>
                        </>)
                }

            </ListGroup>
        </>
    )
}


export default AllUsers;