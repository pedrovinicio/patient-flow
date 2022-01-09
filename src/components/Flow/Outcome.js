import React from "react";
import Button from "../UI/Button";
import classes from './Outcome.module.css';

const Outcome = props => {
    return (
        <div>
            <div className={classes.title}>Thank you for answering the questions!</div>
            <div className={classes.message}>{props.children}</div>
            <div className={classes.buttonContainer}>
                {props.showBookAppointment && <Button></Button>}
            </div>
        </div>
    );
};

export default Outcome;