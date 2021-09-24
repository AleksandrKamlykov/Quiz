import React from 'react';
import { connect } from 'react-redux';
import classes from "./ThemeToggler.module.css"
import { changeTheme } from "../../../store/actions/theme"

const ThemeToggler = ({ changeTheme }) => {
    return (
        <div className={classes.ThemeTogglerBlock}>
            <span>Сменить тему</span>
            <div className={classes.ThemeToggler}>
                <input onChange={changeTheme} type="checkbox" name="themeToggler" id="toggler" />
                <label htmlFor="toggler" />
            </div>



        </div>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        changeTheme: () => dispatch(changeTheme()),
    }
}

export default connect(null, mapDispatchToProps)(ThemeToggler)