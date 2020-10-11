import { Button, Card, Input, TextField, Dialog, DialogTitle } from '@material-ui/core'
import React, { useState, Fragment, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import Context from '../.././/Context'

export default function SignIn(props) {

    const [errors, setError] = useState({})
    const history = useHistory()
    const { dispatchLogin, dispatchToken } = useContext(Context)

    const SignInUser = () => {
        const error = {}
        const email = document.getElementById("email")?.value
        const password = document.getElementById("password")?.value

        if (email.replace(" ", "").length <= 5) error["email"] = { state: true, text: "" }
        if (password.replace(" ", "").length <= 10) error["password"] = { state: true, text: "" }

        if (error["email"]?.state || error["password"]?.state || error["passwordConfirm"]?.state) {
            setError(error);
            return;
        }

        const body = {
            "Email": email,
            "Password": password,
        }

        const options = {
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(body)
        }

        fetch("http://localhost:8000/login", options).then(response => response.json()).then(result => {
            console.log(result)
            // studentsDispatch({
            //     type: 'setStudents',
            //     payload: result
            // })
            if (result.status == 200) {
                dispatchLogin({
                    type: 'setLogin',
                    payload: true
                })
                dispatchToken({
                    type: 'setToken',
                    payload: result.token
                })
                history.push("/Payment")
            }
        })
    }

    return (
        <div className="w-100 h-100 d-flex justify-content-center align-items-center bg-primary">
            <Card className="p-5 d-flex justify-content-center flex-d-column">
                <div className="mb-3 fs-rem-6 fw-500">
                    Вход
                </div>
                <div className="mb-3">
                    <TextField
                        id="email"
                        label="E-mail"
                        inputProps={{ autoComplete: "new-password" }}
                        autoComplete="current-password"
                        variant="outlined"
                        required
                    />
                </div>
                <div className="mb-3">
                    <TextField
                        id="password"
                        label="Password"
                        required
                        inputProps={{ autoComplete: "new-password" }}
                        type="password"
                        autoComplete="current-password"
                        variant="outlined"
                    />
                </div>
                <div>
                    <Button variant="contained" onClick={(e) => { SignInUser() }} classes={{ root: "bg-secondary-light" }}>
                        Подтвердить
                    </Button>
                </div>
            </Card>
        </div>
    );
}
