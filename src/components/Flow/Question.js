import React, {useState} from "react";
import Button from "../UI/Button";
import classes from './Question.module.css';
import { Wrapper, Item, RadioButton, RadioButtonLabel } from './Radio.styles';

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
                <Wrapper>
                    {props.question.answers.map((answer) =>(
                        <Item key={answer.id}>
                            <RadioButton
                                type="radio"
                                name="radio"
                                value={answer.id}
                                checked={answered ? (answered.id === answer.id) : false}
                                onChange={() => onRadioChanged(answer)}
                            />
                            <RadioButtonLabel />
                            <div>{answer.label}</div>
                        </Item>
                    ))}
                </Wrapper>
            </div>
            <div className={classes.buttonContainer}>
                <Button onClick={onNextClicked} disabled={!answered}>Next</Button>
            </div>
        </div>
    );
};

export default Question;