import React, { Component } from 'react'
import classes from './QuizList.module.css'
import { NavLink } from 'react-router-dom'
import Loader from '../../components/UI/Loader/Loader'
import { connect } from 'react-redux'
import { fetchQuizes } from '../../store/actions/quiz';

class QuizList extends Component {

    renderQuizes() {
        return this.props.quizes.map(quiz => {
            return (
                <li
                    key={quiz.id}
                >
                    <NavLink to={'/quiz/' + quiz.id}>
                        {quiz.name}
                    </NavLink>
                </li>
            )
        })
    }

    componentDidMount() {
        this.props.fetchQuizes()
    }

    render() {
        const cls = [classes.QuizList]


        if (!this.props.theme.theme) {

            cls.push(classes.dark)
        } else {
            cls.push(classes.light)
        }
        return (
            <div className={cls.join(" ")}>
                <div>
                    <h1>Список тестов</h1>

                    {
                        this.props.loading && this.props.quizes.length !== 0
                            ? <Loader />
                            : <ul>
                                {this.renderQuizes()}
                            </ul>
                    }

                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        quizes: state.quiz.quizes,
        loading: state.quiz.loading,
        theme: state.theme
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizes: () => dispatch(fetchQuizes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList)