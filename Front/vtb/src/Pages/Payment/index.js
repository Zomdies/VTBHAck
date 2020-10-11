import React, { useState, Fragment, useContext, useEffect } from 'react'
import { Button, Card,  TextField, Dialog,  Grid, Divider,  Snackbar } from '@material-ui/core'

import PaymentCard from './Components/PaymentCard'
import Context from '../../Context'
import { Redirect } from 'react-router-dom'

export default function Payment(props) {

    const { login, token, ID } = useContext(Context)

    const [paymentDialog, setOpen] = useState(false);
    const [payments, setPayments] = useState([]);
    const [pResult, setPResult] = useState({ open: false, text: "" });
    const [errors, setError] = useState({})

    useEffect(() => {
        GetPayments();
    }, [])

    const GetPayments = () => {
        const body = {
            "ID_User": ID,
        }

        const options = {
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json',
                "Authorization": token
            },
            method: "POST",
            body: JSON.stringify(body)
        }

        fetch("http://localhost:8000/RequsetFrom/get", options).then(response => response.json()).then(resp => {
            if (resp.status === 200) {
                setPayments(resp.result)
            }
        })
    }

    const Pay = () => {
        const error = {}
        setError({});

        const user = document.getElementById("userID")?.value
        const reciver = document.getElementById("reciverID")?.value
        const sum = document.getElementById("amount")?.value
        const comment = document.getElementById("comment")?.value

        if (user.replace(" ", "").length !== 36) error["user"] = { state: true, text: "Неправильный ID" }
        if (reciver.replace(" ", "").length > 15 || reciver.replace(" ", "").length < 2) error["reciver"] = { state: true, text: "Длина должна быть от 1 до 15 символов" }
        if (sum <= 0) error["sum"] = { state: true, text: "Сумма неможет быть отрицательной или нуливой" }
        if (comment.replace(" ", "").length <= 1) error["comment"] = { state: true, text: "Минимальная длина:1" }

        if (error["user"]?.state || error["reciver"]?.state || error["sum"]?.state || error["comment"]?.state) {
            setError(error);
            return;
        }


        const body = {
            "Recipient": reciver,
            "ID_User": user,
            "Sum": sum,
            "Comment": comment,
        }

        const options = {
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json',
                "Authorization": token
            },
            method: "POST",
            body: JSON.stringify(body)
        }

        fetch("http://localhost:8000/RequsetFrom/create", options).then(response => response.json()).then(resp => {
            setPResult({ open: true, text: resp.message })
            GetPayments();
            setOpen(false)
        })
    }

    if (login)
        return (
            <Fragment>
                <div className="w-100 d-flex justify-content-center p-10 bg-primary box-sizing-border" style={{ height: "inherit" }}>
                    <div className="w-60">
                        <div className="w-100 d-flex  justify-content-end mb-2">
                            <Button variant="contained" onClick={() => { setOpen(true) }} classes={{ root: "bg-secondary-light" }}>Новый</Button>
                        </div>
                        <Card>
                            <Grid container spacing={2} className="p-2">
                                <Grid item xs={4}>
                                    <div>
                                        Номер платежа
                                    </div>
                                </Grid>
                                <Grid item xs={3}>
                                    <div>
                                        получатель
                                    </div>
                                </Grid>
                                <Grid item xs={2}>
                                    <div>
                                        Сумма
                                    </div>
                                </Grid>
                                <Grid item xs={3}>
                                    <div>
                                        Комментарий
                                    </div>
                                </Grid>
                            </Grid>
                            <Divider />
                            {payments.map((item, index) =>
                                <PaymentCard key={index} payment={item} className={`${index % 2 === 0 ? "bg-gray-light" : ""}`} />)}
                        </Card>
                    </div>
                </div>
                <Dialog open={paymentDialog} onClose={() => { setOpen(false) }}>
                    <Card className="p-5 d-flex justify-content-center flex-d-column">
                        <div className="mb-3 fs-rem-6 fw-500">
                            Новый платёж
                        </div>
                        <div className="mb-3">
                            <TextField
                                id="reciverID"
                                fullWidth
                                error={Boolean(errors["reciver"])}
                                helperText={Boolean(errors["reciver"]) ? errors["reciver"].text : ""}
                                label="Реквизиты получателя"
                                required
                                inputProps={{ autoComplete: "new-password" }}
                                autoComplete="current-password"
                                variant="outlined"
                            />
                        </div>
                        <div className="mb-3">
                            <TextField
                                id="userID"
                                error={Boolean(errors["user"])}
                                fullWidth
                                helperText={Boolean(errors["user"]) ? errors["user"].text : ""}
                                label="Ваши реквизиты"
                                required
                                inputProps={{ autoComplete: "new-password" }}
                                autoComplete="new-password"
                                variant="outlined"
                            />
                        </div>
                        <div className="mb-3">
                            <TextField
                                id="amount"
                                type="number"
                                fullWidth
                                helperText={Boolean(errors["sum"]) ? errors["sum"].text : ""}
                                error={Boolean(errors["sum"])}
                                label="Сумма"
                                inputProps={{ autoComplete: "new-password" }}
                                autoComplete="current-password"
                                variant="outlined"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <TextField
                                id="comment"
                                fullWidth
                                helperText={Boolean(errors["comment"]) ? errors["comment"].text : ""}
                                error={Boolean(errors["comment"])}
                                label="Comment"
                                inputProps={{ autoComplete: "new-password" }}
                                autoComplete="current-password"
                                variant="outlined"
                                required
                            />
                        </div>
                        <Button variant="contained" onClick={(e) => { Pay() }} classes={{ root: "bg-secondary-light" }}>
                            Оплатить
                        </Button>
                    </Card>
                </Dialog>
                <Snackbar
                    autoHideDuration={1500}
                    resumeHideDuration={1500}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    open={pResult.open}
                    onClose={() => { setPResult({ open: false, text: "" }) }}
                    message={pResult.text}
                    key={124}
                />
            </Fragment>
        );
    else return (<Redirect to="/SignIn" />)
}
