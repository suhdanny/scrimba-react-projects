import React from 'react'
import './App.css';
import Question from './components/Question'
import {nanoid} from "nanoid"

function App() {

    const [allQuestions, setAllQuestions] = React.useState([]);
    const [questions, setQuestions] = React.useState([]);

    React.useEffect(() => {
        async function getQuestions() {
            const response = await fetch("https://opentdb.com/api.php?amount=4&category=11&difficulty=medium&type=multiple");
            const data = await response.json();
            setAllQuestions(data.results);
        }
        getQuestions();
    }, [])

    React.useEffect(() => {
        function allNewQuestion() {
            const newQuestion = [];
            for (let i = 0; i < allQuestions.length; i++) {
                newQuestion.push(generateNewQuestion(allQuestions[i]));
            }
            shuffle(newQuestion);
            return newQuestion;
        }

        function generateNewQuestion(question) {
            return {
                options: generateOption(question),
                correct: question.correct_answer,
                question: question.question
            }
        }    

        function generateOption(question) {
            const options = [];
            for (let i = 0; i < question.incorrect_answers.length; i++) {
                options.push({
                    value: question.incorrect_answers[i],
                    isClicked: false,
                    id: nanoid()
                })
            }

            options.push({
                value: question.correct_answer,
                isClicked: false,
                id: nanoid()
            })

            return options;
        }

        function shuffle(arr) {
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
        }

        setQuestions(allNewQuestion());

    }, [allQuestions])
    
    function handleClick(id) {
        setQuestions(prevQuestion => (
            prevQuestion.map(oldQuestion => {
                let options = [...oldQuestion.options];

                for (let i = 0; i < oldQuestion.options.length; i++) {
                    if (oldQuestion.options[i].id === id) {
                        let option = {
                            ...options[i],
                            isClicked: !(options[i].isClicked)
                        };
                        options[i] = option;
                    }
                }

                return {...oldQuestion, options: options};
            })
        ))
    }
    
    const questionElements = questions.map((question, index) => {
        return <Question
                key={index} 
                question={question.question} 
                options={question.options} 
                correct={question.correct}
                handleClick={handleClick}
                />
    })

    return (
        <main>
            {/* <img src='images/blue-blob.png' className='blue-blob' alt='blob'/>
            <img src='images/yellow-blob.png' className='yellow-blob' alt='blob'/>
            <div className='start-quiz'>
                <h1 className='quiz-title'>Quizzical</h1>
                <p className='quiz-description'>Press the button below to start the quiz!</p>
                <button className='quiz-start'>Start Quiz</button>
            </div> */}
            {questionElements}
            <button className='answer-check'>Check Answers</button>
        </main>
    )
}

export default App;