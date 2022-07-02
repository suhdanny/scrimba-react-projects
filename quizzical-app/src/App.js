import React from 'react'
import './App.css';
import Question from './components/Question'
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'

function App() {

    const [quizStart, setQuizStart] = React.useState(false);
    const [quizEnd, setQuizEnd] = React.useState(false);
    const [allQuestions, setAllQuestions] = React.useState([]);
    const [questions, setQuestions] = React.useState([]);

    function toggleStart() {
        setQuizStart(prev => !prev);
        if (quizEnd) {
            setQuizEnd(false);
        }
    }

    React.useEffect(() => {
        async function getQuestions() {
            const response = await fetch("https://opentdb.com/api.php?amount=4&category=11&difficulty=easy&type=multiple");
            const data = await response.json();
            setAllQuestions(data.results);
        }
        getQuestions();
    }, [quizStart])

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
    }

    function checkAnswer() {
        setQuestions(prevQuestion => prevQuestion.map(oldQuestion => {
            return {...oldQuestion, showAnswer: true}
        }))
        setQuizEnd(true);
    }

    function checkResults() {
        let count = 0;

        for (let i = 0; i < questions.length; i++) {
            const question = questions[i];
            for (let j = 0; j < question.options.length; j++) {
                const option = question.options[j];
                if (option.isClicked && option.isAnswer) {
                    count = count + 1;
                }
            }
        }

        return count;
    }

    const questionElements = questions.map((question, index) => {
        return <Question
                key={index} 
                question={question.question} 
                options={question.options} 
                handleClick={handleClick}
                showAnswer={question.showAnswer}
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
                        <button className='quiz-start' onClick={toggleStart}>Start Quiz</button>
                    </div>
                </div>
                :
                <div className='main--quiz'>
                    <img src='images/main-blue.png' className='blue-blob' alt='blob'/>
                    <img src='images/main-yellow.png' className='yellow-blob' alt='blob'/>
                    {questionElements}
                    {
                        quizEnd
                        ?
                        <div className='quiz-result'>
                            {checkResults() === questions.length && <Confetti />}
                            <h2 className='result-stats'>You scored {checkResults()}/{questions.length} correct answers</h2>
                            <button className='play-again btn' onClick={toggleStart}>Play Again</button>
                        </div>
                        :
                        <button className='answer-check btn' onClick={checkAnswer}>Check Answers</button>
                    }
                </div>
            }
        </main>
    )
}

export default App;