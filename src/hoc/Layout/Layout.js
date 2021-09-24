import React, { Component } from "react";
import Classes from "./Layout.module.css"
import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle"
import Drawer from "../../components/Drawer/Drawer"
import { connect } from "react-redux";

let x1 = null
let y1 = null

class Layout extends Component {

    state = {
        menu: false,

    }


    toggleMenuHandler = () => {
        this.setState({
            menu: !this.state.menu
        })
    }

    menuCloseHandler = () => {
        this.setState({
            menu: false
        })
    }

    handleTouchStart = (event) => {
        const firstTouch = event.touches[0]

        x1 = firstTouch.clientX
        y1 = firstTouch.clientY

    }

    showDrawer = event => {


        if (!x1 || !y1) {
            return false
        }
        let x2 = event.touches[0].clientX
        let y2 = event.touches[0].clientY

        let xDiff = x2 - x1
        let yDiff = y2 - y1

        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            if (xDiff > 0) {
                this.setState({
                    menu: true
                })
            }
            else {
                this.setState({
                    menu: false
                })
            }
        }
        // else {
        //     if (yDiff > 0) console.log("down")
        //     else console.log("top")
        // }


    }



    render() {
        return (
            <div onTouchStart={e => this.handleTouchStart(e)} onTouchMove={e => this.showDrawer(e)} className={Classes.Layout}>
                <Drawer
                    isOpen={this.state.menu}
                    onClose={this.menuCloseHandler}
                    isAuthenticated={this.props.isAuthenticated}

                />
                <MenuToggle
                    onToggle={this.toggleMenuHandler}
                    isOpen={this.state.menu}
                />

                <main >
                    {this.props.children}
                </main>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.auth.token
    }
}

export default connect(mapStateToProps)(Layout)