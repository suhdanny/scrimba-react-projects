import React from 'react'
import './App.css';
import Question from './components/Question'
import {nanoid} from "nanoid"

function App() {

    const [quizStart, setQuizStart] = React.useState(false);
    const [allQuestions, setAllQuestions] = React.useState([]);
    const [questions, setQuestions] = React.useState([]);

    function startGame() {
        setQuizStart(true);
    }

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
            let newQuestion = [];
            for (let i = 0; i < allQuestions.length; i++) {
                newQuestion.push(generateNewQuestion(allQuestions[i]));
            }
            return newQuestion;
        }

        function generateNewQuestion(question) {
            return {
                showAnswer: false,
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
                    isAnswer: false,
                    id: nanoid()
                })
            }

            options.push({
                value: question.correct_answer,
                isClicked: false,
                isAnswer: true,
                id: nanoid()
            })

            shuffle(options);

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
        console.log(questions)
    }

    function checkAnswer() {



        // !showAnswer --> isClicked background of blue
        // showAnswer --> then the following
        // if isAnswer && isClicked --> background of green
        // if isAnswer && !isClicked --> background of red
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
            {
                !quizStart
                ?
                <div className='main--start'>
                    <img src='images/blue-blob.png' className='blue-blob' alt='blob'/>
                    <img src='images/yellow-blob.png' className='yellow-blob' alt='blob'/>
                    <div className='start-quiz'>
                        <h1 className='quiz-title'>Quizzical</h1>
                        <p className='quiz-description'>Press the button below to start the quiz!</p>
                        <button className='quiz-start' onClick={startGame}>Start Quiz</button>
                    </div>
                </div>
                :
                <div className='main--quiz'>
                    <img src='images/main-blue.png' className='blue-blob' alt='blob'/>
                    <img src='images/main-yellow.png' className='yellow-blob' alt='blob'/>
                    {questionElements}
                    <button className='answer-check' onClick={checkAnswer}>Check Answers</button>
                </div>
            }
        </main>
    )
}

export default App;