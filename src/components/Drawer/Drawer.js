import React, { Component } from 'react';
import classes from "./Drawer.module.css"
import Backdrop from "../UI/Backdrop/Backdrop"
import ThemeToggler from "../UI/ThemeToggler/ThemeToggler"
import { NavLink } from "react-router-dom"

const links = [
    { to: "/", label: "Список", exact: true },
    { to: "/auth", label: "Авторизация", exact: true },
    { to: "/quiz-creator", label: "Создать тест", exact: true },
]

export default class Drawer extends Component {

    state = {
        theme: true,     ///false - day, true - night
    }

    clickHandler = () => {
        this.props.onClose()
    }
    themeChange = () => {

        this.setState({
            theme: !this.state.theme
        })


    }
    object__



    renderLinks() {
        return links.map((link, index) => {
            return (
                <li key={index}
                >
                    <NavLink
                        to={link.to}
                        exact={link.exact}
                        activeClassName={classes.active}
                        onClick={this.clickHandler}
                        theme="night"



                    >
                        {link.label}
                    </NavLink>
                </li>
            )
        })
    }

    render() {
        const cls = [classes.Drawer]

        if (!this.props.isOpen) {
            cls.push(classes.close)
        }

        return (
            <React.Fragment>

                <nav className={cls.join(" ")}>

                    <ul>
                        {this.renderLinks()}
                        <ThemeToggler
                            themeChange={this.themeChange}
                        />
                    </ul>

                </nav>
                {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}

            </React.Fragment>
        )
    }
}