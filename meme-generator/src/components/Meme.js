import React from 'react'

export default function Meme() {
    const [meme, setMeme] = React.useState({
        topText: '',
        bottomText: '',
        randomURL: 'http://i.imgflip.com/1bij.jpg'
    });

    const [allMemes, setAllMemes] = React.useState([]);

    React.useEffect(() => {
        async function getMemes() {
            const response = await fetch("https://api.imgflip.com/get_memes");
            const data = await response.json();
            setAllMemes(data.data.memes);
        }
        getMemes();
    }, [])

    function getMemeURL() {
        const randomNumber = Math.floor(Math.random() * allMemes.length);
        const randomImageURL = allMemes[randomNumber].url
        setMeme(prev => ({
            ...prev,
            randomURL: randomImageURL
        }))
    }

    function handleChange(event) {
        const {name, value} = event.target;
        setMeme(prevData => {
            return {
                ...prevData,
                [name] : value
            }
        })
    }

    return (
        <main className='form-container'>
            <div className='main--form'>
                <input 
                type='text'
                name='topText'
                value={meme.topText}
                onChange={handleChange}
                />
                <input 
                type='text'
                name='bottomText'
                value={meme.bottomText}
                onChange={handleChange}
                />
                <button className='main--btn' onClick={getMemeURL}>Get a new meme image  🖼</button>
            </div>
            <div className='meme'>
                <img className='meme--image' src={meme.randomURL} alt='meme'/>
                <h1 className='meme--text top'>{meme.topText}</h1>
                <h1 className='meme--text bottom'>{meme.bottomText}</h1>
            </div>
        </main>
    )
}