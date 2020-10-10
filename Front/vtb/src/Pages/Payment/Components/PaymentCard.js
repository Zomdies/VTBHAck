import React, { useState, Fragment, useContext } from 'react'
import { Button, Card, Input, TextField, Dialog, DialogTitle, Grid } from '@material-ui/core'

export default function PaymentCard(props) {

    const [paymentDialog, setOpen] = useState(false);

    return (

        <div className={`p-5 ${props.className}`}>
            <Grid  container  spacing={2}>
                <Grid item xs={5}>
                    <div>
                        4746-8487-4654-8676
                    </div>
                </Grid>
                <Grid item xs={5}>
                    <div>
                        1546-8721-5678-9123
                    </div>
                </Grid>
                <Grid item xs={2}>
                    <div>
                        25000
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}
