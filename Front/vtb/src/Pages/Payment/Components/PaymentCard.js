import React from 'react'
import { Grid } from '@material-ui/core'

export default function PaymentCard(props) {

    const { payment } = props

    return (

        <div className={`p-5 ${props.className}`}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <div>
                        {payment.ID_RequestForm}
                    </div>
                </Grid>
                <Grid item xs={3}>
                    <div>
                        {payment.Recipient}
                    </div>
                </Grid>
                <Grid item xs={2}>
                    <div>
                        {payment.Sum}
                    </div>
                </Grid>
                <Grid item xs={3}>
                    <div>
                        {payment.Comment}

                    </div>
                </Grid>
            </Grid>
        </div>
    );
}
