import { Button, Card, TextField} from '@material-ui/core'
import React, { useState} from 'react'
import {useHistory} from 'react-router-dom'

import sha256 from 'crypto-js/sha256';

export default function SignUp(props) {

    const [errors,setError] = useState({})
    const history = useHistory()

    const SignUpUser = () =>
    {
        const error = {}
        const  email =  document.getElementById("email")?.value
        const  password = document.getElementById("password")?.value
        const  passwordConfirm = document.getElementById("passwordConfirm")?.value

        if(email.replace(" ","").length <= 5) error["email"] = {state:true,text:"Длина почты должна составлять по крайней мере 5 символов"}
        if(email.match(/.?@\w*\.\w*/g) === null) error["email"] = {state:true,text:"Неправильный формат почты"}

        if(password.replace(" ","").length < 10) error["password"] = {state:true,text:"Длина пароля миниму 10 символов"}

        if(password !==  passwordConfirm) error["passwordConfirm"] = {state:true,text:"Пароли должны совпадать"}
        if(passwordConfirm.replace(" ","").length < 10) error["passwordConfirm"] = {state:true,text:"Длина пароля миниму 10 символов"}

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

        // console.log(body)

        fetch("http://localhost:8000/registration",options).then(response=>response.json()).then(resp=>{
            if(resp.status === 200) history.push("/SignIn")
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
                        fullWidth
                        id="email"
                        error={Boolean(errors["email"])}
                        helperText={Boolean(errors["email"])?errors["email"].text : ""}
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
                        helperText={Boolean(errors["password"])?errors["password"].text : ""}
                        fullWidth
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
                        fullWidth
                        error={Boolean(errors["passwordConfirm"])}
                        helperText={Boolean(errors["passwordConfirm"])?errors["passwordConfirm"].text : ""}
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
