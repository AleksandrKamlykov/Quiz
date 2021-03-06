import axios from 'axios'
import {
    FETCH_QUIZ_SUCCESS,
    FETCH_QUIZES_ERROR,
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS, FINISH_QUIZ, QUIZ_NEXT_QUESTION, QUIZ_RETRY,
    QUIZ_SET_STATE
} from './actionTypes'

export function fetchQuizes() {
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try {

            const response = await axios.get('https://react-quiz-8fc5e-default-rtdb.firebaseio.com/quiz.json')

            const quizes = []
            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `ัะตัั ${index + 1}`
                })
            })
            dispatch(fetchQuizesSuccess(quizes))
        } catch (e) {
            dispatch(fetchQuizesError)
        }
    }
}

export function fetchQuizById(quizId) {
    return async dispatch => {
        dispatch(fetchQuizesStart())

        try {
            const response = await axios.get(`https://react-quiz-8fc5e-default-rtdb.firebaseio.com/quiz/${quizId}.json`)
            const quiz = response.data

            dispatch(fetchQuizSuccess(quiz))
        } catch (e) {
            dispatch(fetchQuizesError(e))
        }
    }
}
export function fetchQuizSuccess(quiz) {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz
    }
}

export function fetchQuizesStart() {
    return {
        type: FETCH_QUIZES_START
    }
}

export function fetchQuizesSuccess(quizes) {
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes
    }
}

export function fetchQuizesError(e) {
    return {
        type: FETCH_QUIZES_ERROR,
        error: e
    }
}

export function quizSetState(answerState, results) {
    return {
        type: QUIZ_SET_STATE,
        answerState, results
    }
}

export function finishQuiz() {
    return {
        type: FINISH_QUIZ
    }
}

export function quizNextQuiestion(number) {
    return {
        type: QUIZ_NEXT_QUESTION,
        number

    }
}

export function retryQuiz() {
    return {
        type: QUIZ_RETRY
    }
}

export function quizAnswerClick(answerId) {
    return (dispatch, getState) => {
        const state = getState().quiz
        if (state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if (state.answerState[key] === "success") {
                return
            }
        }

        const question = state.quiz[state.activeQuestion]
        const results = state.results


        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = "success"
            }

            dispatch(quizSetState({ [answerId]: "success" }, results))


            const timeout = window.setTimeout(() => {

                if (isQuizFinished(state)) {
                    dispatch(finishQuiz())
                }
                else {
                    dispatch(quizNextQuiestion(state.activeQuestion + 1))

                }
                window.clearTimeout(timeout)
            }, 500)

        } else {
            results[question.id] = "error"

            dispatch(quizSetState({ [answerId]: "error" }), results)


        }


    }
}

function isQuizFinished(state) {
    return state.activeQuestion + 1 === state.quiz.length
}