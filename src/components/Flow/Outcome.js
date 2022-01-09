import React, {useState} from "react";
import Button from "../UI/Button";
import AppointmentModal from "./AppointmentModal";
import classes from './Outcome.module.css';
import Moment from "moment";

const Outcome = props => {
    const [message, setMessage] = useState(null)

    const openAppointmentModal = () => {
        const today = new Date()
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)
        setMessage({
            title: "Appointment confirmation",
            text: "We have booked a time for you with one of our doctors.",
            time: Moment(tomorrow).format('MMMM Do YYYY [@] h:mm a')
        });
    }

    const messageModalHandler = () => {
        setMessage(null);
    }

    return (
        <div>
            {message && <AppointmentModal message={message} onClose={messageModalHandler}></AppointmentModal>}
            <div className={classes.title}>Thank you for answering the questions!</div>
            <div className={classes.message}>{props.children}</div>
            <div className={classes.buttonContainer}>
                <Button onClick={props.onRestart} secondary={true}>Restart</Button>
                {props.showBookAppointment && <Button onClick={openAppointmentModal}>Book</Button>}
            </div>
        </div>
    );
};

export default Outcome;