import React from 'react';
import classes from "./ThemeToggler.module.css"

const ThemeToggler = props => {
    return (
        <div className={classes.ThemeTogglerBlock}>
            <span>Сменить тему</span>
            <div className={classes.ThemeToggler}>
                <input onChange={props.themeChange} type="checkbox" name="themeToggler" id="toggler" />
                <label htmlFor="toggler" />
            </div>



        </div>
    )
}

export default ThemeToggler