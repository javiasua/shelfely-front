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
            <div class='search-box'>
            <div class="login-box">
            <h2>Search</h2>
            <form onSubmit={this.props.handleSearch}>
                <div class="user-box">
                <input type="text" name="title" required=""/>
                <label style={{color:'white'}}>Title</label>
                </div>
                <div class="user-box">
                <input type="text" name="author" required=""/>
                <label style={{color:'white'}}>Author</label>
                </div>
                <div class="search-buttons">
                <div class="container">
                    <button type='submit'href="https://twitter.com/masuwa1018" class="btn effect01" target="_blank"><span>Search</span></button>
                </div>
                </div>

            </form>
            </div>
            </div>
            {/* </div> */}
            </>
        )
    }
}