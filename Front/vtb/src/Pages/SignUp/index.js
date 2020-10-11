import { Button, Card, Input, TextField, Dialog, DialogTitle } from '@material-ui/core'
import React, { useState, Fragment, useContext } from 'react'
import {useHistory} from 'react-router-dom'

export default function SignUp(props) {

    const [errors,setError] = useState({})
    const history = useHistory()

    const SignUpUser = () =>
    {
        const error = {}
        const  email =  document.getElementById("email")?.value
        const  password = document.getElementById("password")?.value
        const  passwordConfirm = document.getElementById("passwordConfirm")?.value

        if(email.replace(" ","").length <= 5) error["email"] = {state:true,text:""}
        if(password.replace(" ","").length <= 10) error["password"] = {state:true,text:""}
        if(password !=  passwordConfirm && passwordConfirm.replace(" ","").length <= 5) error["passwordConfirm"] ={state:true,text:""}

        if(error["email"]?.state || error["password"]?.state ||  error["passwordConfirm"]?.state)
        {
            setError(error);
            return;
        }

        const body={
            "Email":  email,
            "Password": password,
        }

        const options={
            headers:{
                "Content-Type": "application/json",
                'Accept': 'application/json'
            },
            method:"POST",
            body:JSON.stringify(body)
        }

        fetch("http://localhost:8000/registration",options).then(response=>response.json()).then(resp=>{
            console.log(resp)
            if(resp.status == 200) history.push("/SignIn")
        })
    }
  
    return (
        <div className="w-100 h-100 d-flex justify-content-center align-items-center bg-primary">
            <Card className="p-5 d-flex justify-content-center flex-d-column">
                <div className="mb-3 fs-rem-6 fw-500">
                    Регистрация
                </div>
                <div className="mb-3">
                    <TextField
                        id="email"
                        error={Boolean(errors["email"])}
                        label="E-mail"
                        inputProps={{ autoComplete: "new-password" }}
                        autoComplete="current-password"
                        variant="outlined"
                        required
                    />
                </div>
                <div className="mb-3">
                    <TextField
                        error={Boolean(errors["password"])}
                        helperText=""
                        id="password"
                        label="Password"
                        required
                        inputProps={{ autoComplete: "new-password" }}
                        type="password"
                        autoComplete="current-password"
                        variant="outlined"
                    />
                </div>
                <div className="mb-3">
                    <TextField
                        error={Boolean(errors["passwordConfirm"])}
                        id="passwordConfirm"
                        label="Confirm password"
                        required
                        inputProps={{ autoComplete: "new-password" }}
                        type="password"
                        autoComplete="current-password"
                        variant="outlined"
                    />
                </div>
                <div>
                    <Button variant="contained" onClick={(e) => {SignUpUser(e)  }} classes={{ root: "bg-secondary-light" }}>
                        Зарегистрироваться
                    </Button>
                </div>
            </Card>
        </div>
    );
}
