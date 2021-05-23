import React, { Component } from "react";
import Classes from "./Quiz.module.css"
import ActiveQuiz from "../components/ActiveQuiz/ActiveQuiz";
import FinishQuiz from "../components/FinishQuiz/FinishQuiz"

export default class Quiz extends Component {
    state = {
        results: {},
        activeQuestion: 0,
        answerState: null,
        finishQuiz: false,
        quiz: [{
            rightAnswer: 2,
            id: 1,
            question: "какого цвета небо?",
            answers: [
                { text: "чёрный", id: 1 },
                { text: "синий", id: 2 },
                { text: "красный", id: 3 },
                { text: "Зеленый", id: 4 },
            ]
        },
        {
            rightAnswer: 3,
            id: 2,
            question: "В каком году основали СПБ?",
            answers: [
                { text: "1700", id: 1 },
                { text: "1702", id: 2 },
                { text: "1703", id: 3 },
                { text: "1803", id: 4 },
            ]
        }]
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

        if (question.rightAnswer === answerId) {
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
    render() {

        return (
            <div className={Classes.Quiz}>

                <div className={Classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>
                    {this.state.finishQuiz
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