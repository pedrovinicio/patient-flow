import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {useState} from 'react';
import Card from '../UI/Card';
import Outcome from './Outcome';
import Question from './Question';
import classes from './QuestionFlow.module.css';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"

const QuestionFlow = props => {
    const [currentQuestion, setCurrentQuestion] = useState(props.questions[0]);
    const [score, setScore] = useState(0);
    const [outcome, setOutcome] = useState(null);

    const onAnswered = (answered) => {
        setScore(score + answered.score);
        var nextQuestion = findNextQuestion(answered);
        if(nextQuestion){
            setCurrentQuestion(nextQuestion);
        } else{
            var outcomeId = findOutcomeId(currentQuestion.next);
            var outcome = props.outcomes.find((outcome) => outcome.id === outcomeId);
            setOutcome(outcome);
        }
    }

    function findOutcomeId(possibleOutcomes) {
        for (let i = 0; i < possibleOutcomes.length; i++) {
            if(!possibleOutcomes[i].max_score) {
                return possibleOutcomes[i].outcome;
            } else if(score <= possibleOutcomes[i].max_score) {
                return possibleOutcomes[i].outcome;
            }
        }
    }

    function findNextQuestion(answered) {
        var possibleNexts = currentQuestion.next;
        var next = possibleNexts[0];
        if (next.outcome){
            return null;
        } else {
            if(possibleNexts.length > 1) {
                next = possibleNexts.find(question => question.answered === answered.id);
            }
            return props.questions.find(question => question.id === next.next_question);
        }
    }

    return (
        <Card className={classes.container}>
            {!outcome && <div className={classes.header}>
                {(currentQuestion.id !== props.questions[0].id) && <FontAwesomeIcon icon={faArrowLeft}/>}
            </div>}
            <div className={classes.content}>
                {!outcome && <Question question={currentQuestion} onAnswered={onAnswered}></Question>}
                {outcome && <Outcome showBookAppointment={outcome.show_booking_button}>{outcome.text}</Outcome>}
            </div>
        </Card>
    );
}

export default QuestionFlow;