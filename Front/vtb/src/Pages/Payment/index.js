import React, { useState, Fragment, useContext } from 'react'
import { Button, Card, Input, TextField, Dialog, DialogTitle, Grid, Divider, IconButton } from '@material-ui/core'

import PaymentCard from './Components/PaymentCard'
import Context from '../../Context'
import { Redirect } from 'react-router-dom'
import { ShieldOff, Shield } from 'react-feather'

import JsxParser from 'react-jsx-parser'

export default function Payment(props) {

    const { login } = useContext(Context)

    const [paymentDialog, setOpen] = useState(false);
    const [requesText, setRequestText] = useState(null);

    const payments = [1, 2, 4, 5, 6, 7, 8, 98, 1, 2, 23]

    function createMarkup(str) { return {__html: str}; };

    const XXSAtack = (reqUrl) => {

        const body = {
            "Text": document.getElementById("xxsText")?.value,
        }

        console.log(body)

        const options = {
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(body)
        }

        fetch(`http://localhost:8000${reqUrl}`, options).then(response => response.json()).then(resp => {
            console.log(resp)
            if (resp.status === 200)
                setRequestText(resp.result.message)
        })
    }

    if (true)
        return (
            <Fragment>
                <div className="w-100 d-flex justify-content-center p-10 bg-primary box-sizing-border" style={{ height: "inherit" }}>
                    <div className="w-50">
                        <div className="w-100 d-flex  justify-content-between mb-2">
                            <div className="d-flex">
                                <TextField id="xxsText" type="search" className="mr-2" color="primary" />
                                <IconButton
                                    onClick={() => { XXSAtack("/Danger/RequsetFrom/HtmlTeg") }}
                                    size="small"
                                    className="bg-primary-dark p-3 mr-2">
                                    <ShieldOff />
                                </IconButton>
                                <IconButton
                                    onClick={() => { XXSAtack("/RequsetFrom/HtmlTeg") }}
                                    size="small"
                                    className="bg-primary-dark p-3">
                                    <Shield />
                                </IconButton>
                            </div>
                            <Button variant="contained" onClick={() => { setOpen(true) }} classes={{ root: "bg-secondary-light" }}>Новый</Button>
                        </div>
                        <div className="m-4">
                            <renderStr str={requesText} />
                            {requesText}
                            <JsxParser
                                jsx={requesText}
                            />
                            <div dangerouslySetInnerHTML={createMarkup(requesText)} />
                        </div>
                        <Card>
                            <Grid container spacing={2} className="p-2">
                                <Grid item xs={5}>
                                    <div>
                                        Реквизиты получателя
                                </div>
                                </Grid>
                                <Grid item xs={5}>
                                    <div>
                                        Ваши реквизиты
                                </div>
                                </Grid>
                                <Grid item xs={2}>
                                    <div>
                                        Сумма
                                </div>
                                </Grid>
                            </Grid>
                            <Divider fullwidth />
                            {payments.map((item, index) =>
                                <PaymentCard key={index} payment={item} className={`${index % 2 == 0 ? "bg-gray-light" : ""}`} />)}
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
                                label="Ваши реквизиты"
                                required
                                inputProps={{ autoComplete: "new-password" }}
                                autoComplete="current-password"
                                variant="outlined"
                            />
                        </div>
                        <div className="mb-3">
                            <TextField
                                id="amount"
                                label="Сумма"
                                inputProps={{ autoComplete: "new-password" }}
                                autoComplete="current-password"
                                variant="outlined"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <TextField
                                id="login"
                                label="CVC"
                                type="password"
                                inputProps={{ autoComplete: "new-password" }}
                                autoComplete="current-password"
                                variant="outlined"
                                required
                            />
                        </div>
                        <Button variant="contained" onClick={(e) => { }} classes={{ root: "bg-secondary-light" }}>
                            Оплатить
                        </Button>
                    </Card>
                </Dialog>
            </Fragment>
        );
    else return (<Redirect to="/SignIn" />)
}
