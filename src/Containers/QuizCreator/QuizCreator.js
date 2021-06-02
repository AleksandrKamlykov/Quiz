import React, { Component } from 'react';
import classes from "./QuizCreator.module.css"
import Button from "../../components/UI/Button/Button"
import { createControl, validate, validateForm } from "../../Form/FormFramework"
import Input from "../../components/UI/Input/Input"
import Auxiliary from "../../hoc/Auxiliary/Auxiliary"
import Select from "../../components/UI/Select/Select"

import {connect} from "react-redux";
import {createQuizQuestion, finishCreateQuiz} from "../../store/actions/create";


function createOPtionControl(number) {
    return createControl({
        label: "Вариант" + number,
        errorMessage: "Вопрос не может быть пустым",
        id: number
    }, { reguired: true })
}

function createFormControls() {
    return {
        question: createControl({
            label: "Введите вопрос",
            errorMessage: "Вопрос не может быть пустым"
        }, { reguired: true }),
        option1: createOPtionControl(1),
        option2: createOPtionControl(2),
        option3: createOPtionControl(3),
        option4: createOPtionControl(4),
    }
}

class QuizCreator extends Component {
    state = {
        isFormValid: false,
        formControls: createFormControls(),
        rightAnswerId: 1
    }

    addQuestionHandler = (event) => {
        event.preventDefault()


        const { question, option1, option2, option3, option4 } = this.state.formControls

        const questionItem = {
            question: question.value,
            id: this.props.quiz.length + 1,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                { text: option1.value, id: option1.id },
                { text: option2.value, id: option2.id },
                { text: option3.value, id: option3.id },
                { text: option4.value, id: option4.id },
            ]
        }

        this.props.createQuizQuestion(questionItem)

        this.setState({

            isFormValid: false,
            formControls: createFormControls(),
            rightAnswerId: 1
        })
    }

    submitHandler = event => {
        event.preventDefault()
    }

    createQuizHandler = event => {
        event.preventDefault()





            this.setState({

                isFormValid: false,
                formControls: createFormControls(),
                rightAnswerId: 1
            })
            this.props.finishCreateQuiz()

        }






    changeHandler = (value, controlName) => {
        const formControls = { ...this.state.formControls }
        const control = { ...formControls[controlName] }

        control.touched = true
        control.value = value
        control.valid = validate(control.value, control.valdation)

        formControls[controlName] = control

        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })
    }

    renderControls() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]

            return (
                <Auxiliary key={controlName + index} >
                    <Input
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        shouldValidate={!!control.valdation}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        onChange={event => this.changeHandler(event.target.value, controlName)}
                    />
                    { index === 0 ? <hr /> : null}
                </Auxiliary>
            )
        })
    }

    selectChangeHandler = event => {

        this.setState({
            rightAnswerId: +event.target.value
        })
    }

    render() {
        const select = <Select
            label="Выберите правильный ответ"
            value={this.state.rightAnswerId}
            onChange={this.selectChangeHandler}
            options={[
                { text: 1, value: 1 },
                { text: 2, value: 2 },
                { text: 3, value: 3 },
                { text: 4, value: 4 },
            ]}
        />

        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Создайте вопрос</h1>
                    <form onSubmit={this.submitHandler}>

                        {this.renderControls()}

                        {select}

                        <Button
                            type="primary"
                            onClick={this.addQuestionHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Добавить вопрос
                            </Button>
                        <Button
                            type="success"
                            onClick={this.createQuizHandler}
                            disabled={this.props.quiz.length === 0}
                        >
                            Создать тест
                            </Button>
                    </form>
                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        quiz: state.create.quiz
    }
}

function mapDispatchToProps(dispatch){
    return{
        createQuizQuestion: item => dispatch(createQuizQuestion(item)),
        finishCreateQuiz: ()=> dispatch(finishCreateQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator)