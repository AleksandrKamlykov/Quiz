import React, { Component } from "react";
import Classes from "./Quiz.module.css"
import ActiveQuiz from "../components/ActiveQuiz/ActiveQuiz";
import FinishQuiz from "../components/FinishQuiz/FinishQuiz"
import axios from "axios"
import Loader from "../components/UI/Loader/Loader"

export default class Quiz extends Component {
    state = {
        results: {},
        activeQuestion: 0,
        answerState: null,
        finishQuiz: false,
        quiz: [],
        loading: true
    }

    onAnswerHandler = (answerId) => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key] === "success") {
                return
            }
        }

        const question = this.state.quiz[this.state.activeQuestion]
        const results = this.state.results


        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = "success"
            }

            this.setState({
                answerState: { [answerId]: "success" },
                results: results
            })

            const timeout = window.setTimeout(() => {

                if (this.isQuizFinished()) {
                    this.setState({
                        finishQuiz: true
                    })
                }
                else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }
                window.clearTimeout(timeout)
            }, 1000)

        } else {
            results[question.id] = "error"
            this.setState({
                answerState: { [answerId]: "error" },
                results: results
            })

        }


    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    retryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            finishQuiz: false,
            results: {}
        })
    }

    async componentDidMount() {
        try {
            const response = await axios.get(`https://react-quiz-8fc5e-default-rtdb.firebaseio.com/quiz/${this.props.match.params.id}.json`)
            const quiz = response.data

            this.setState({
                quiz,
                loading: false
            })
        } catch (e) {
            console.log(e)
        }
    }

    render() {

        return (
            <div className={Classes.Quiz}>

                <div className={Classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>

                    {
                        this.state.loading
                            ? <Loader />
                            : this.state.finishQuiz
                                ? <FinishQuiz
                                    results={this.state.results}
                                    quiz={this.state.quiz}
                                    onRetry={this.retryHandler}
                                /> :
                                <ActiveQuiz
                                    question={this.state.quiz[this.state.activeQuestion].question}
                                    answer={this.state.quiz[this.state.activeQuestion].answers}
                                    onAnswerClick={this.onAnswerHandler}
                                    quizLength={this.state.quiz.length}
                                    answerNumber={this.state.activeQuestion + 1}
                                    state={this.state.answerState}
                                />
                    }


                </div>
            </div>
        )
    }
}