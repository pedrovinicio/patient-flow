import React, {useState} from "react";
import Button from "../UI/Button";
import Radio from "../UI/Radio";
import classes from './Question.module.css';

const Question = props => {
    const [answered, setAnswered] = useState(null);

    const onRadioChanged = (answer) => {
        setAnswered(answer);
    }

    const onNextClicked = () => {
        props.onAnswered(answered);
        setAnswered(null);
    };

    return (
        <div>
            <div className={classes.question}>{props.question.question_text}</div>
            <div className={classes.answersContainer}>
                <Radio answers={props.question.answers} onChange={onRadioChanged}></Radio>
            </div>
            <div className={classes.buttonContainer}>
                <Button onClick={onNextClicked} disabled={!answered}>Next</Button>
            </div>
        </div>
    );
};

export default Question;