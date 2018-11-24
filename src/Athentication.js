import React, { Component } from 'react';

var firebase = require('firebase');

var config = {
    apiKey: "AIzaSyBZppH_jr5SFu3vKVuv0C2c9oB5I464yXE",
    authDomain: "survey-app-react.firebaseapp.com",
    databaseURL: "https://survey-app-react.firebaseio.com",
    projectId: "survey-app-react",
    storageBucket: "survey-app-react.appspot.com",
    messagingSenderId: "931131549451"
  };
  firebase.initializeApp(config);

class Athentication extends Component{


    //LOGIN FUCTION BY ------------------SHATHU------------

    login(){
        const email = this.refs.email.value;
        const password = this.refs.pass.value;

        const auth = firebase.auth();
        const promise = auth.signInWithEmailAndPassword(email,password);

        promise.then(user => {
            var logout = document.getElementById('logout');
            this.setState({err: "Welcome back! " + firebase.auth().currentUser.email});
            logout.classList.remove('hide');

            var login = document.getElementById('login');
            login.classList.add('hide');

            var signup = document.getElementById('signup');
            signup.classList.add('hide');

            var google = document.getElementById('google');
            google.classList.add('hide');

            var email = document.getElementById('email');
            email.classList.add('hide');

            var pass = document.getElementById('pass');
            pass.classList.add('hide');
        });

        promise.catch( e => {
            var error = e.message;

            this.setState({err: error});
        });        
    }


    //LOGOUT FUCTION BY --------------SHATHU------------

    logout(){       
        firebase.auth().signOut();

        var logout = document.getElementById('logout');

        this.setState({err: "Thank you see you soon"});

        logout.classList.add('hide');

        this.refs.email.value = "";
        this.refs.pass.value = "";

            var login = document.getElementById('login');
            login.classList.remove('hide');

            var signup = document.getElementById('signup');
            signup.classList.remove('hide');

            var google = document.getElementById('google');
            google.classList.remove('hide');

            var email = document.getElementById('email');
            email.classList.remove('hide');

            var pass = document.getElementById('pass');
            pass.classList.remove('hide');
    }


    //SIGNUP FUCTION BY --------------SHATHU------------

    signup(){
        const email = this.refs.email.value;
        const password = this.refs.pass.value;

        const auth = firebase.auth();

       const promise = auth.createUserWithEmailAndPassword(email, password);

       promise
       .then(user => {
           var error = "Signup Successfuly " + firebase.auth().currentUser.email + " Please Login";
           firebase.database().ref('users/' + firebase.auth().currentUser.uid).set({
            email: firebase.auth().currentUser.email
       });
           this.setState({ err: error });
           
       });    

       promise
       .catch(e => {
           var error = e.message;
           this.setState({ err: error });
       });
    }


    //SIGN IN WITH GOOGLE FUCTION BY --------------SHATHU------------

    google(){
        var provider = new firebase.auth.GoogleAuthProvider();
        var promise = firebase.auth().signInWithPopup(provider);

        promise.then(result => {
            var user = result.user;
        firebase.database().ref('users/'+user.uid).set({
            email: user.email,
            nmae: user.displayName
        });

        var logout =document.getElementById('logout');
        this.setState({err: "Welcome back! " + firebase.auth().currentUser.email});
        logout.classList.remove('hide');

            var login = document.getElementById('login');
            login.classList.add('hide');

            var signup = document.getElementById('signup');
            signup.classList.add('hide');

            var google = document.getElementById('google');
            google.classList.add('hide');

            var email = document.getElementById('email');
            email.classList.add('hide');

            var pass = document.getElementById('pass');
            pass.classList.add('hide');
    });

    promise.catch(e => {
        var msg = e.message;
        this.setState({err:msg});
    });
    }


    constructor(props){
        super(props);
        this.state = { err: ''};

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.signup = this.signup.bind(this);
        this.google = this.google.bind(this);

    }


    render(){
        return(
            <div>

                <input type="email" id="email" ref="email" placeholder="Enter your email" required/><br/>
                <input type="password" id="pass" ref="pass" placeholder="Enter your password" required/><br/>
                <p>{this.state.err}</p>
                <button onClick={this.login} id="login">Login</button>
                <button onClick={this.logout} id="logout" className="hide">Logout</button>
                <button onClick={this.signup} id="signup">Sign up</button><br />
                <button onClick={this.google} id="google" className="google">Sign in with google</button>


            </div>
        );
    }
}

export default Athentication;