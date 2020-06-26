import React from 'react'
import {Link} from 'react-router-dom'
import '../App.css'

export default class Nav extends React.Component{
    render(){
        return(
            <>
            <nav class="nav">
                <Link class="nav-link active" to="/">My books</Link>
                <Link class="nav-link" to="/add-book">Add New Book</Link>
                {
                    this.props.loggedInUser ? (
                        <>
                        <li className="nav-item">
                                <button className="nav-link" onClick={this.props.onLogout}>Logout</button>
                        </li>
                        <button><Link to='/search'>Search for a book</Link></button>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/sign-in">SignIn</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/sign-up">SignUp</Link>
                            </li>
                        </>
                    )
                }
            </nav>
            </>
        )
    }
} 