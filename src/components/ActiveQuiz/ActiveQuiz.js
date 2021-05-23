import React from "react";
import Classes from "./ActiveQuiz.module.css"
import AnswerList from "./AnswerList/AnswerList"

const ActiveQuiz = props => (
    <div className={Classes.ActiveQuiz}>
        <p className={Classes.question}>
            <span>
                <strong>{props.answerNumber}.</strong>&nbsp;
               {props.question}
            </span>
            <small>{props.answerNumber} из {props.quizLength}</small>
        </p>
        <AnswerList
            state={props.state}
            answer={props.answer}
            onAnswerClick={props.onAnswerClick} />
    </div>
)

export default ActiveQuiz