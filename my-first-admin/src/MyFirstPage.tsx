import { Grid } from "@mui/material"
import React, { useState } from "react"

export const MyFirstPage = (props: any) => {
    const [age, setAge] = useState(0)

    return (
        <div style={{ padding: 16 }}>
            Your name is {props.name}
            <br />
            Age: {age}

            <br />
            <br />
            <br />
            <button onClick={() => setAge(age + 1)}>
                Grow Up
            </button>
            <Grid container>
                <Grid item xs={12} md={3} style={{ background: "red" }}>
                    Column 1
                </Grid>
                <Grid item xs={12} md={3} style={{ background: "blue" }}>
                    Column 2
                </Grid>
                <Grid item xs={6} md={3} style={{ background: "green" }}>
                    Column 3
                </Grid>
                <Grid item xs={6} md={3} style={{ background: "yellow" }}>
                    Column 4
                </Grid>
            </Grid>
        </div>
    )


}
