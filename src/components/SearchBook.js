import React from 'react'
import {Link} from 'react-router-dom'
import './Search.css'

export default class SearchBook extends React.Component{

    state = {
        book : ''
    }


    render(){
        return(
            <>
            <form onSubmit={this.props.handleSearch}>
                    <label htmlFor='title'>Title:</label>
                    <input id='title' name='title'></input>
                    <label htmlFor='author'>Author:</label>
                    <input id='author' name='author'></input>
                    <button type='submit'> Search </button>
            </form>
            </>
        )
    }
}