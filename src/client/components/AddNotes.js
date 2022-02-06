import $ from 'jquery';
import React from 'react';
import { Container } from 'react-bootstrap';
import WaitingDailog from './WaitingDialog';
function AddNotes(props) {
    let allnotes = props.notes;

    function add() {
        let subjectname = document.getElementById("subjectname").value;
        let content = document.getElementById("content").value;
        allnotes.push({ subjectname, content });
        allnotes = JSON.stringify(allnotes);
        $.post("http://localhost:8000/addnotes", { allnotes, email: document.cookie }, (result) => {

        })
    }

    return (
        <>

            <Container class="md" style={{ backgroundColor: "white", padding: '30px', border: '3px solid #DBDBDB ' }}>

                <form>
                    <div class="form-group">
                        <label for="exampleInputEmail1"><h3> Subject Name : </h3></label>
                        <input type="text" class="form-control" id="subjectname" aria-describedby="emailHelp" placeholder="Enter email" />
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1"><h3>Content:</h3>  </label>
                        <textarea rows="15" cols="10" type="text" class="form-control" id="content" placeholder="Enter your content"></textarea>
                    </div>
                    <div style={{ marginRight: '30px' }}>
                        <button type="button" style={{ float: 'right' }} onClick={() =>
                            window.location = "/home"} class="btn btn-primary"><h3> Back </h3>
                        </button>
                        <button type="submit" style={{ marginRight: "10px", float: 'right' }} onClick={() => add()} id="addNotes" class="btn btn-primary"><h3> Add Note </h3></button>
                    </div>
                </form>
            </Container>
        </>

    )
}


export default AddNotes;