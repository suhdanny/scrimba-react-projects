import React from 'react'

export default function Question(props) {

    function getStyles(showAnswer, isAnswer, isClicked) {
        if (!showAnswer) {
            return {backgroundColor: isClicked ? "#D6DBF5" : "transparent"};
        } else {
            if (isClicked) {
                return {backgroundColor: isAnswer ? "#94D7A2" : "#F8BCBC"};
            } else if (isAnswer && !isClicked) {
                return {backgroundColor: "#94D7A2"};
            }
        }
    }

    function createOptionElements() {
        const options = props.options.map((option, index) => {

            const styles = getStyles(props.showAnswer, option.isAnswer, option.isClicked);

            return <div 
                    key={index} 
                    className='option' 
                    style={styles} 
                    onClick={() => props.handleClick(option.id)}
                    >
                        {option.value}
                    </div>
        })
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