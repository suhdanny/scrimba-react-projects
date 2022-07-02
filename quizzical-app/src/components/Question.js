import React from 'react'

export default function Question(props) {

    function createOptionElements() {
        const options = props.options.map((option, index) => {
            const styles = {backgroundColor: option.isClicked ? "#D6DBF5" : "transparent"};
            return <div key={index} className='option' style={styles} onClick={() => props.handleClick(option.id)}>{option.value}</div>
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