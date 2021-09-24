import React, { Component } from 'react';
import classes from "./Drawer.module.css"
import Backdrop from "../UI/Backdrop/Backdrop"
import ThemeToggler from "../UI/ThemeToggler/ThemeToggler"
import { NavLink } from "react-router-dom"
import { connect } from "react-redux";



class Drawer extends Component {

    clickHandler = () => {
        this.props.onClose()
    }





    renderLinks(links) {
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

        if (!this.props.theme.theme) {

            cls.push(classes.dark)
        } else {
            cls.push(classes.light)
        }

        const links = [
            { to: "/", label: "Список", exact: true },
        ]

        if (this.props.isAuthenticated) {
            links.push({ to: "/quiz-creator", label: "Создать тест", exact: false })
            links.push({ to: "/logout", label: "Выйти", exact: false })
        } else {
            links.push({ to: "/auth", label: "Авторизация", exact: false })
        }

        return (
            <React.Fragment>

                <nav className={cls.join(" ")}>

                    <ul>
                        {this.renderLinks(links)}
                        <ThemeToggler

                        />
                    </ul>

                </nav>
                {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}

            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        theme: state.theme
    }
}

export default connect(mapStateToProps, null)(Drawer)