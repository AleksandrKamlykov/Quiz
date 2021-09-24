import classes from '../AnswerList/AnswerList.module.css';
import React from 'react';
import AnswerItem from "./AnswerItem/AnswerItem"

const AnswerList = props => (
    <ul className={classes.AnswerList}>
        {props.answer.map((answer, index) => {
            return (
                <AnswerItem
                    state={props.state ? props.state[answer.id] : null}
                    key={index}
                    answer={answer}
                    onAnswerClick={props.onAnswerClick}
                />
            )
        })}
    </ul>
)

export default AnswerList;