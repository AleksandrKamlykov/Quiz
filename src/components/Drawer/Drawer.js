import React, { Component } from 'react';
import classes from "./Drawer.module.css"
import Backdrop from "../UI/Backdrop/Backdrop"
import ThemeToggler from "../UI/ThemeToggler/ThemeToggler"
import { NavLink } from "react-router-dom"
import {connect} from "react-redux";



class Drawer extends Component {

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

        const links = [
            { to: "/", label: "Список", exact: true },
        ]

        if (this.props.isAuthenticated){
            links.push({ to: "/quiz-creator", label: "Создать тест", exact: false })
            links.push({ to: "/logout", label: "Выйти", exact: false })
        }else {
            links.push({ to: "/auth", label: "Авторизация", exact: false })
        }

        console.log(this.props.isAuthenticated)

        return (
            <React.Fragment>

                <nav className={cls.join(" ")}>

                    <ul>
                        {this.renderLinks(links)}
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

export default connect()(Drawer)