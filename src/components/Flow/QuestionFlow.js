import React, {useState} from 'react';
import Button from '../UI/Button';
import Outcome from './Outcome';
import Question from './Question';

const QuestionFlow = props => {
    const [currentQuestion, setCurrentQuestion] = useState(props.questions[0]);
    const [outcome, setOutcome] = useState(null);

    const onAnswered = (answered) => {
        var nextQuestion = findNextQuestion(answered);
        if(nextQuestion){
            setCurrentQuestion(nextQuestion);
        } else{
            setOutcome(currentQuestion.next[0]);
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
    <div>
        {!outcome && <Question question={currentQuestion} onAnswered={onAnswered}></Question>}
        {outcome && <Outcome showBookAppointment={props.outcomes[0].show_booking_button}>{props.outcomes[0].text}</Outcome>}
    </div>
    );
}

export default QuestionFlow;