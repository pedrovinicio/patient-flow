import React from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import classes from './Outcome.module.css';

const Outcome = props => {
    return (
        <Card className={classes.container}>
            <div className={classes.title}>Thank you for answering the questions!</div>
            <div className={classes.message}>{props.children}</div>
            <div className={classes.buttonContainer}>
                {props.showBookAppointment && <Button></Button>}
            </div>
        </Card>
    );
};

export default Outcome;