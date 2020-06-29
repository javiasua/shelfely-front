import React from 'react'
import {Link} from 'react-router-dom'
import '../App.css'

export default class Nav extends React.Component{
    render(){
        return(
            <>
             <div className='logout'>
            <button  type="button" onClick={this.props.onLogout}>Logout</button>
            </div>
            <nav class="nav">
                <ul>
                <li>
                <Link className='links' to="/">MY BOOKS</Link>
                </li>
                <li>
                <Link className='links' to="/add-book">ADD BOOK</Link>
                </li>
                {
                    this.props.loggedInUser ? (
                        <>
                        <li>
                            <Link className='links' to='/search'>SEARCH BOOKS</Link>
                        </li>
                        </>
                       
                    ) : (
                        <>
                            <li >
                                <Link className='links' to="/sign-in">SIGNIN</Link>
                            </li>
                            <li >
                                <Link className='links' to="/sign-up">SIGNUP</Link>
                            </li>
                        </>
                    )
                }
                </ul>
            </nav>
             </>
        )
    }
} 