import React, { Component } from "react";
import Classes from "./Quiz.module.css"
import ActiveQuiz from "../components/ActiveQuiz/ActiveQuiz";
import FinishQuiz from "../components/FinishQuiz/FinishQuiz"
import Loader from "../components/UI/Loader/Loader"
import { connect } from "react-redux";
import { fetchQuizById, quizAnswerClick, retryQuiz } from "../store/actions/quiz";

class Quiz extends Component {


    componentDidMount() {
        this.props.fetchQuizById(this.props.match.params.id)
    }

    componentWillUnmount() {
        this.props.retryQuiz()
    }



    render() {


        const cls = [Classes.Quiz]

        if (!this.props.theme.theme) {

            cls.push(Classes.dark)
        } else {
            cls.push(Classes.light)
        }

        return (
            <div className={cls.join(" ")}>

                <div className={Classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>

                    {
                        this.props.loading || !this.props.quiz
                            ? <Loader />
                            : this.props.finishQuiz
                                ? <FinishQuiz
                                    results={this.props.results}
                                    quiz={this.props.quiz}
                                    onRetry={this.props.retryQuiz}
                                /> :
                                <ActiveQuiz
                                    question={this.props.quiz[this.props.activeQuestion].question}
                                    answer={this.props.quiz[this.props.activeQuestion].answers}
                                    onAnswerClick={this.props.quizAnswerClick}
                                    quizLength={this.props.quiz.length}
                                    answerNumber={this.props.activeQuestion + 1}
                                    state={this.props.answerState}
                                />
                    }


                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        results: state.quiz.results,
        activeQuestion: state.quiz.activeQuestion,
        answerState: state.quiz.answerState,
        finishQuiz: state.quiz.finishQuiz,
        quiz: state.quiz.quiz,
        loading: state.quiz.loading,
        theme: state.theme
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: id => dispatch(fetchQuizById(id)),
        quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
        retryQuiz: () => dispatch(retryQuiz())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Quiz)