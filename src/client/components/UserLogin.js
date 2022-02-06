import React from 'react';
import { Container } from 'react-bootstrap';
import Navbar from './Navbarhome'
import $ from 'jquery'
import SignUp from './WaitingDialog';
import WaitingDialog from './WaitingDialog';



function UserLogin() {

    // WHEN USER WILL CLICK THE SIGN UP BUTTON
    function signUp(e) {
        e.preventDefault();
        let newusername = document.getElementById("newusername").value;
        let newuseremail = document.getElementById("newuseremail").value;
        let newuserpassword = document.getElementById("newuserpassword").value;

        $.post("http://localhost:8000/newuser", { name: newusername, email: newuseremail, password: newuserpassword }, (err, result) => {
            if (err)
                throw err
            window.location="/"
        })
    }


    // WHEN LOGIN BUTTON WILL CREATE THEN THIS FUNCTION WILL BE CALLED 
    function login(e) {
        e.preventDefault();
        $("#waitingdialog").show();
        $("#loginform").hide()
        
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        if (email.length == 0 || password.length == 0) {
            return;
        }

        document.getElementById("email");
        document.getElementById("password");
        $.post("http://localhost:8000/login", { userEmail: email, userPassword: password }, (result, status) => {
            let user = JSON.parse(result);
            if (status == 'success' && user.email==email && user.password==password) {
                document.cookie=`${email}`
                window.location = "http://localhost:3000/home";
            }
            else {
                $("#warningalert").show();
                setTimeout(()=>{
                    $("#warningalert").hide();
                },4000)
                $("#waitingdialog").hide();
                $("#loginform").show()
                
            }
        })

    }

    //  Hide Login From And Show the SignUp
    function showSignUpForm() {
        $("#loginform").hide()
        $("#signupform").css("visibility", "visible")

    }

    // Hide Signup and show Signup
    function showLoginForm() {
        $("#loginform").show()
        $("#signupform").css("visibility", "hidden")

    }

    // ENABLE LOGIN BUTTON WHEN USER WILL ENTER BOTH EMAIL AND PASSWORD 
    function enablecLoginButton(){
        
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        
        if(email.trim().length===0 || password.trim().length===0){
            document.getElementById("loginbtn").disabled=true
        }
        if(email.trim().length>0 && password.trim().length>0){
            document.getElementById("loginbtn").disabled=false
        }
        
    }

    return (
        <>

            {/* This form is login and authentication */}

            <div id="waitingdialog">
                <WaitingDialog />
            </div>

            <Container md id="loginform" style={{ backgroundColor: 'white', marginTop: '30px', padding: '30px', width: '500px' }}>

                <div class="alert alert-warning" id="warningalert">
                    <strong><h3>Warning..</h3></strong> <h4> Please enter a valid identiry...</h4>
                </div>

                {/* LOGIN FORM */}
                <form>

                    <div class="form-group">
                        <label for="exampleInputEmail1"><h2> Email Address: </h2></label>
                        <input type="email" class="form-control" id="email"  aria-describedby="emailHelp" placeholder="Enter email" required />
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1"><h2> Password :</h2></label>
                        <input type="password" class="form-control" id="password" placeholder="Password" />
                    </div>
                    <div class="form-group form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                        <label class="form-check-label" for="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" id="loginbtn" style={{ marginRight: '10px' }} class="btn btn-primary" onClick={(e) => { login(e)}}  ><h4>Login</h4></button>
                    <button type="button" class="btn btn-primary" onClick={showSignUpForm}><h4>Create Account</h4></button>
                </form>

            </Container>


            {/* This is form for sign up  */}

            <div id="signupform" style={{ visibility: 'hidden' }}>
                <Container md style={{ backgroundColor: 'white', marginTop: '30px', padding: '30px', width: '500px' }}>
                    
                    {/* SIGN UP FORM START FROM HERE  */}
                    <form>
                        <div class="form-group">
                            <label for="exampleInputEmail1"><h2> Your Name:  </h2></label>
                            <input type="text" class="form-control" id="newusername" aria-describedby="emailHelp" placeholder="Enter email" />
                            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1"><h2> Email Address  </h2></label>
                            <input type="email" class="form-control" id="newuseremail" aria-describedby="emailHelp" placeholder="Enter email" />
                            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1"><h2> Password :</h2></label>
                            <input type="password" class="form-control" id="newuserpassword" placeholder="Password" />
                        </div>
                        <div class="form-group form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                            <label class="form-check-label" for="exampleCheck1">Check me out</label>
                        </div>
                        <button type="submit" class="btn btn-primary" style={{ marginRight: '10px' }} onClick={(e) => signUp(e)}> <h4> Sign Up</h4></button>
                        <button type="button" class="btn btn-primary" onClick={showLoginForm}> <h4> Login</h4></button>
                    </form>
                </Container>
            </div>

        </>
    )
}

export default UserLogin;