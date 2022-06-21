import React from 'react'

export default function Header() {
    return (
        <div className='header'>
            <img className='header--icon-image' src='images/troll.png' alt='troll'/>
            <span className='header--icon-title'>Meme Generator</span>
            <span className='header--project-title'>React Course - Project 3</span>
        </div>
    )
}