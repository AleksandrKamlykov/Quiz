import classes from '../AnswerItem/AnswerItem.module.css';
import React from 'react';

const AnswerItem = props => {

    const cls = [classes.AnswerItem]

    if (props.state) {
        cls.push(classes[props.state])
    }

    return (
        <li className={cls.join(' ')} onClick={() => { props.onAnswerClick(props.answer.id) }}>
            {props.answer.text}

        </li>
    )
}

export default AnswerItem;