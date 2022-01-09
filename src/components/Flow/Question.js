import React, {useState} from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import Radio from "../UI/Radio";
import classes from './Question.module.css';

const Question = props => {
    const [answered, setAnswered] = useState(null);

    const onRadioChanged = (answer) => {
        setAnswered(answer);
    }

    const onNextClicked = () => {
        props.onAnswered(answered);
    };

    return (
        <Card className={classes.container}>
            <div className={classes.question}>{props.question.question_text}</div>
            <div className={classes.answersContainer}>
                <Radio answers={props.question.answers} onChange={onRadioChanged}></Radio>
            </div>
            <div className={classes.buttonContainer}>
                <Button onClick={onNextClicked}>Next</Button>
            </div>
        </Card>
    );
};

export default Question;