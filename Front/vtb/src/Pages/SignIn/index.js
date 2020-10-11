import { Button, Card, TextField, FormHelperText } from '@material-ui/core'
import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import Context from '../.././/Context'
import sha256 from 'crypto-js/sha256';


export default function SignIn(props) {

    const [errors, setError] = useState({})
    const [requestSummary, setSummary] = useState(null)
    const history = useHistory()
    const { dispatchLogin, dispatchToken, dispatchID } = useContext(Context)

    const SignInUser = () => {
        const error = {}
        const email = document.getElementById("email")?.value
        const password = document.getElementById("password")?.value

        if(email.replace(" ","").length <= 5) error["email"] = {state:true,text:"Длина почты должна составлять по крайней мере 5 символов"}
        if(email.match(/.?@\w*\.\w*/g) === null) error["email"] = {state:true,text:"Неправильный формат почты"}

        if (password.replace(" ", "").length <= 10) error["password"] = { state: true, text: "" }

        if (error["email"]?.state || error["password"]?.state || error["passwordConfirm"]?.state) {
            setError(error);
            return;
        }

        const body = {
            "Email": email,
            "Password": sha256(password).toString(),
        }

        const options = {
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(body)
        }

        fetch("http://localhost:8000/login", options).then(response => response.json()).then(response => {
            if (response.status === 200) {
                dispatchLogin({
                    type: 'setLogin',
                    payload: true
                })
                dispatchToken({
                    type: 'setToken',
                    payload: response.result.token
                })
                dispatchID({
                    type: 'setID',
                    payload: response.result.ID_User
                })
                history.push("/Payment")
            }
            if (response.status === 500) {
                setSummary("Неверно указаны данные")
            }
            if (response["error"] && !Boolean(response.status)) {
                setSummary("Слишком много запрос, попробуйте позже")
            }
        })
    }

    return (
        <div className="w-100 h-100 d-flex justify-content-center align-items-center bg-primary">
            <Card className="p-5 d-flex justify-content-center flex-d-column">
                <div className="mb-3 fs-rem-6 fw-500">
                    Вход
                </div>
                <FormHelperText className="pb-4" error={Boolean(requestSummary)}>{requestSummary}</FormHelperText>
                <div className="mb-3">
                    <TextField
                        id="email"
                        label="E-mail"
                        error={Boolean(errors["email"])}
                        helperText={Boolean(errors["email"])?errors["email"].text : ""}
                        inputProps={{ autoComplete: "new-password" }}
                        autoComplete="new-password"
                        variant="outlined"
                        required
                    />
                </div>
                <div className="mb-3">
                    <TextField
                        id="password"
                        label="Password"
                        error={Boolean(errors["password"])}
                        helperText={Boolean(errors["password"])?errors["password"].text : ""}
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
