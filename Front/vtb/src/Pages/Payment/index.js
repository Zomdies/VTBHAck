import React, { useState, Fragment, useContext } from 'react'
import { Button, Card, Input, TextField, Dialog, DialogTitle, Grid, Divider } from '@material-ui/core'

import PaymentCard from './Components/PaymentCard'

export default function Payment(props) {

    const [paymentDialog, setOpen] = useState(false);

    const payments=[1,2,4,5,6,7,8,98,1,2,23]

    return (
        <Fragment>
            <div className="w-100 d-flex justify-content-center p-10 bg-primary box-sizing-border" style={{height:"inherit"}}>
                <div className="w-50">
                    <div className="w-100 d-flex  justify-content-end mb-2">
                        <Button variant="contained" onClick={() => { setOpen(true) }} classes={{ root: "bg-secondary-light" }}>Новый</Button>
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
                        <Divider  fullwidth/>
                        {payments.map((item,index)=>
                            <PaymentCard  payment={item} className={`${index  % 2 == 0?"bg-gray-light":""}`}/>)}
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
}
