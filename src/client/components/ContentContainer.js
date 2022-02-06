import React from "react";
import { useState, useEffect } from 'react';
import { Container, Button, Row, Col, ListGroup } from 'react-bootstrap'
import $ from 'jquery';
import AddNotes from "./AddNotes";
import AllUsers from "./AllUsers";
import addicon from '../../images/add.png';
function ContentContainer() {

    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [subjectName, setSubjectName] = useState("");
    const [textarea, setTextarea] = useState("");
    const [editandupdatebtn, setEditAndUpdateBTN] = useState("Edit");
    const [id, setCurrentID] = useState(0);
    const [image, setImage] = useState("");


    // FETCH ALL THE NOTES AND DATA OF USER AND SHOW THAT 
    useEffect(() => {
        $("#addNotesContainer").hide();
        $("#textarea").hide();
        $.post("http://localhost:8000/notes", { email: document.cookie }, (result, status) => {
            let obj = JSON.parse(result);
            let obj2 = JSON.parse(obj.notes);
            let tem = [];
            obj2.map((val, idx) => {
                tem.push(val);
            })
            setNotes(tem);
        })
        

    }, [])

    //  FOR DELETE THE USER SELECTED NOTES 
    function deletebtn() {
        if (editandupdatebtn == "Update") {
    
    
        }
        let ele = document.getElementsByClassName("active");
        let i = ele[0].id;
        notes.splice(i, 1);
        let tem = [];
        notes.map((val) => tem.push(val));
        setNotes(tem);
        let ui = document.querySelector("ul");
        if (ui.children.length == 1) {
            setContent("Nothing to display ");
        }
        $.post("http://localhost:8000/addnotes", { allnotes: JSON.stringify(notes), email: document.cookie }, (result) => {
    
        })
    
    }
    
    
    let addIconStyle = {
        width: '40px',
        hight: '40px',
        float: 'right',
        marginTop: '1px'
    }

    // ADD ACTIVE CLASS ON SELECTED LIST 
    function list(id) {
        
        $("li").removeClass('active');
        let ele = document.getElementById(id).classList.add(["active"]);
        setContent(notes[id].content);
        setCurrentID(id);
        setSubjectName(notes[id].subjectname);

    }

    // WHEN USER WILL EDIT THE NOTES
    function editnotes() {
        if (editandupdatebtn == "Update") {
            notes[id].content = document.getElementById("textarea").value;
            setEditAndUpdateBTN("Edit");
            $("#content_container").show();
            $("#textarea").hide();
            setContent(notes[id].content);
            let deletebtn = document.getElementById("deletebtn");
            deletebtn.disabled = false;
            $.post("http://localhost:8000/addnotes", { allnotes: JSON.stringify(notes), email: document.cookie }, (result) => {

            })
            return;
        }

        $("#content_container").hide();
        $("#textarea").show();
        $("#textarea").attr("readonly", false);
        document.getElementById("textarea").value = content;
        setEditAndUpdateBTN("Update");
        let deletebtn = document.getElementById("deletebtn");
        deletebtn.disabled = true;

    }


    // UPLOAD PHOTO CLICKED EVENT 
    function uploadPhoto() {
        $("#uploadNewPhoto").trigger("click");
        let input = document.getElementById("uploadNewPhoto");
        input.addEventListener("change", (e) => {

            let reader = new FileReader();
            
            reader.readAsDataURL(e.target.files[0]);
            if (reader) {
                reader.onload = function () {
                     let img=new Image();
                     img.src=reader.result;
                     setImage(img.src);

                }
            }
        })
    }

    // USER HAS CLICKED ON THE ADD BUTTON HIDE CONTENT CONTAINER AND SHOW ADD FORM 
    function addNotes() {
        $("#content_main").hide();
        $("#addNotesContainer").show();
    }

    return (
        <>   
            {/* ADD COMPONENT WHICH IS HIDE  */}
            <div id="addNotesContainer">
                <AddNotes notes={notes} />
            </div>

            {/* MAIN CONTAINER WHICH SHOWS EVERYTHING ABOUT NOTES */}
            <Container id="content_main">
                <Row>
                    {/* To Show the List of all The available Notes to the User */}
                    <Col md='3' >
                        <ListGroup as="ul" style={{ padding: '3px', margin: '3px' }}>
                            {
                                notes.map((val, idx) =>
                                    <>
                                        <ListGroup.Item as="li" id={idx} onClick={() => { list(idx) }}>
                                            <h2>{val.subjectname}</h2>
                                        </ListGroup.Item>
                                    </>
                                )
                            }
                        </ListGroup>
                    </Col>

                    {/* Individual Notes Content Show ( CONTENT of the notes will be shown to this container/section */}
                    <Col md='6' style={{ height: '500px' }} >
                        {/* SHOW SUBJECT NAME AND ADD ICON */}
                        <Row>
                            <div style={{ textAlign: 'left', padding: '12px', borderBottom: '2px solid black', paddingLeft: '10px', backgroundColor: '#FFFFFF', height: '60px' }}>
                                <h1 style={{ float: 'left' }} > {subjectName}</h1>
                                <img src={addicon} onClick={() => addNotes()} style={addIconStyle} />
                            </div>
                        </Row>

                       {/* ACTUAL CONTENT OF A PARTICULAR SUBJECT  */}
                        <Row style={{ marginTop: '7px', height: '350px', overflow: 'scroll' }}>
                            <h4 id="content_container">
                                {content}
                            </h4>

                           {/* TEXT AREA TO MODIFY NOTES WHICH ENABLES WHEN UPDATE BUTTON CLICKS */}
                            <div class="form-group"  >
                                {/* <label for="exampleFormControlTextarea1">Example textarea</label> */}
                                <textarea id="textarea" style={{ fontSize: '18px', fontWeight: 'bold' }} class="form-control" rows="11" ></textarea>
                            </div>

                        </Row>

                        {/* DELETE UPDATE AND EDIT BUTTON */}
                        <Row style={{}} >
                            <Button onClick={editnotes}><h4>{editandupdatebtn}</h4></Button>
                            <Button id="deletebtn" onClick={window.deletebtn}><h4>Delete</h4></Button>
                        </Row>
                    </Col>

                    {/* ALL the users Available in the database or our platform for notes Saving  */}
                    <Col md='3'>
                        {/* List is to show all the users on our platform  */}
                         <AllUsers/>
                    </Col>
                </Row>

                <Row></Row>
            </Container>
        </>
    )
}
export default ContentContainer;





