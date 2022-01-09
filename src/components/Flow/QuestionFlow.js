import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {useState} from 'react';
import Card from '../UI/Card';
import Outcome from './Outcome';
import Question from './Question';
import classes from './QuestionFlow.module.css';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"

const QuestionFlow = props => {
    const [currentQuestion, setCurrentQuestion] = useState(props.questions[0]);
    const [previousQuestionFlow, setPreviousQuestionsFlow] = useState([]);
    const [outcome, setOutcome] = useState(null);

    const onAnswered = (answered) => {
        currentQuestion.scored = answered.score;
        var nextQuestion = findNextQuestion(answered);
        if(nextQuestion){
            setPreviousQuestionsFlow([...previousQuestionFlow, currentQuestion]);
            setCurrentQuestion(nextQuestion);
        } else{
            var outcomeId = findOutcomeId(currentQuestion.next);
            var outcome = props.outcomes.find((outcome) => outcome.id === outcomeId);
            setOutcome(outcome);
        }
    }

    function findOutcomeId(possibleOutcomes) {
        var score = calculateScore();
        for (let i = 0; i < possibleOutcomes.length; i++) {
            if(!possibleOutcomes[i].max_score) {
                return possibleOutcomes[i].outcome;
            } else if(score <= possibleOutcomes[i].max_score) {
                return possibleOutcomes[i].outcome;
            }
        }
    }

    function calculateScore() {
        const reducer = (score, question) => score + question.scored;
        return previousQuestionFlow.reduce(reducer, 0) + currentQuestion.scored;
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

    const onBackClicked = () =>{
        var prevQuestion = previousQuestionFlow.pop();
        setCurrentQuestion(prevQuestion);
    }

    const onRestart = () => {
        setCurrentQuestion(props.questions[0]);
        setPreviousQuestionsFlow([]);
        setOutcome(null);
    }

    return (
        <Card className={classes.container}>
            {!outcome && <div className={classes.header}>
                {!!previousQuestionFlow.length && <FontAwesomeIcon icon={faArrowLeft} onClick={onBackClicked}/>}
            </div>}
            <div className={classes.content}>
                {!outcome && <Question question={currentQuestion} onAnswered={onAnswered}></Question>}
                {outcome && <Outcome showBookAppointment={outcome.show_booking_button} onRestart={onRestart}>{outcome.text}</Outcome>}
            </div>
        </Card>
    );
}

export default QuestionFlow;