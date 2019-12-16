import React, { Component } from 'react'

class Memegenerator extends Component {

    constructor() {
        super()
        this.state = {
            topText : "",
            bottomText: "",
            randomImage : "http://i.imgflip.com/1bij.jpg",
            allMemes: [],
            loading: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.generateRandomMeme = this.generateRandomMeme.bind(this)
    }

    componentDidMount() {
        this.setState({
            loading: true
        })
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                console.log(response)
                this.setState({
                    allMemes: response.data
                })
            })
    }

    handleChange(event) {
        const {name,value} = event.target
        this.setState({[name]:value})
    }

    generateRandomMeme(event) {
        event.preventDefault()
        const imgs = this.state.allMemes
        const idx = Math.floor((Math.random() * imgs.memes.length));
        this.setState({
            randomImage: imgs.memes[idx].url
        })
    }

    render() {
        return (
            <div>
                <form align="center" width="100%">
                    <input 
                        type="text" 
                        placeholder="Top text"
                        onChange={this.handleChange}
                        name="topText"
                        value={this.state.topText}
                    /> <br/>
                    <input 
                        type="text" 
                        placeholder="Bottom text"
                        onChange={this.handleChange}
                        name="bottomText"
                        value={this.state.bottomText}
                    /> <br/>
                    <button onClick={this.generateRandomMeme}>Generate</button>
                </form>
                <br/>
                <div className="meme">
                    <img src={this.state.randomImage} alt="Nothing found"/>
                    <div className="top">
                        <h1>{this.state.topText}</h1>
                    </div>
                    <div className="bottom">
                        <h1>{this.state.bottomText}</h1>
                    </div>
                </div>
            </div>
        )
    }
}

export default Memegenerator