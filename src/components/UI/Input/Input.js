import React from 'react';
import classes from "./Input.module.css"

function inValid({ valid, touched, shouldValidate }) {
    return !valid && shouldValidate && touched
}


const Input = props => {

    const inputType = props.Type || "text"
    const cls = [classes.Input]
    const htmlFor = `${inputType}-${Math.random()}`

    if (inValid(props)) {
        cls.push(classes.invalid)
    }

    return (
        <div className={cls.join(" ")} >
            <label htmlFor={htmlFor}>{props.label}</label>
            <input
                type={inputType}
                id={htmlFor}
                value={props.value}
                onChange={props.onChange}
            />
            {inValid(props) ? <span>{props.errorMessage || "Введите вернок значение"}</span> : null}
        </div>

    )
}

export default Input