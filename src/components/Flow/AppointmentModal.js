import React from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import classes from './AppointmentModal.module.css'

const AppointmentModal = props => {
    return (
        <div>
            <div className={classes.backdrop} onClick={props.onClose}></div>
            <Card className={classes.modal}>
                <header className={classes.header}>
                    {props.message.title}
                </header>
                <div className={classes.content}>
                    {props.message.text}
                </div>
                <div className={classes.subContent}>
                    {props.message.time}
                </div>
                <footer className={classes.actions}>
                    <Button onClick={props.onClose}>Okay</Button>
                </footer>
            </Card>     
        </div>
    );
};

export default AppointmentModal;