import React from 'react'

export default function Question(props) {

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function createOptionElements() {
        const options = props.options.map((option, index) => {
            const styles = {backgroundColor: option.isClicked ? "#D6DBF5" : "transparent"};
            return <div key={index} className='option' style={styles} onClick={() => props.handleClick(option.id)}>{option.value}</div>
        })
        // shuffleArray(options);
        return options;
    }

    return (
        <div className='question-card'>
            <h1 className='card-title'>
                {props.question}
            </h1>
            <div className='card-options'>
                {createOptionElements()}
            </div>
            <hr />
        </div>
    )
}