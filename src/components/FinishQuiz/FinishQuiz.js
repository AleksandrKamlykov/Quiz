import React from 'react';
import classes from "./FinishQuiz.module.css"
import Button from "../UI/Button/Button"
import { Link } from "react-router-dom"

const finishQuiz = props => {

    const successCount = Object.keys(props.results).reduce((total, key) => {
        if (props.results[key] === "success") {
            total++
        }
        return total
    }, 0)


    return (<div className={classes.finishQuiz}>
        <ul>
            {props.quiz.map((quizItem, index) => {
                const cls = ["fa",
                    props.results[quizItem.id] === "error" ? "fa-times" : "fa-check",
                    classes[props.results[quizItem.id]]]

                return (
                    <li key={index}>
                        <strong>{index + 1}</strong>.&nbsp;
                        {quizItem.question}
                        <i className={cls.join(" ")}></i>
                    </li>
                )
            })}

        </ul>
        <p>правильно {successCount} из {props.quiz.length}</p>
        <Button onClick={props.onRetry} type="primary" >Повторить</Button>
        <Link to="/">
            <Button type="success">Перейти в список тестов</Button>
        </Link>

    </div>)
}

export default finishQuiz;