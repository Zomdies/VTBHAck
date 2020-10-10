import { Button, Card, Input, TextField, Dialog, DialogTitle } from '@material-ui/core'
import React, { useState, Fragment, useContext } from 'react'

export default function SignIn(props) {

    const [openDialog, setOpenDialog] = useState(false);
    const codeLength = 8;

    const codeInputChange = (e) => {
        if (e.target.value.length === 8)
            console.log(e.target.value)
    }

    const SignIn = (e) => {
        setOpenDialog(true);
        setTimeout(() => { setOpenDialog(false) }, 10000);
    }

    return (
        <div className="w-100 h-100 d-flex justify-content-center align-items-center bg-primary">
            <Card className="p-5 d-flex justify-content-center flex-d-column">
                <div className="mb-3 fs-rem-6 fw-500">
                    Вход
                </div>
                <div className="mb-3">
                    <TextField
                        id="mail"
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
                    <Button variant="contained" onClick={(e) => { SignIn(e) }} classes={{ root: "bg-secondary-light" }}>
                        Подтвердить
                    </Button>
                </div>
            </Card>
            <Dialog classes={{ paper: "p-5 d-flex justify-content-center align-items-center w-px-350" }} open={openDialog}>
                <div className="mb-1 fw-600  fs-rem-6">VERIFICATION</div>
                <div className="mb-3">
                    Код будет недействителен через 30 секунд
                </div>
                <TextField
                    onChange={codeInputChange}
                    fullWidth
                    id="code"
                    label="Code"
                    required
                    inputProps={{ autoComplete: "new-password" }}
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                />
            </Dialog>
        </div>
    );
}
