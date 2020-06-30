import React from 'react'
import {Link} from 'react-router-dom'
import { Redirect } from 'react-router-dom';


export default class BookList extends React.Component{
   
    state ={
        books : [...this.props.books],
        allBooks : true,
        filterBy : 'All Books'
    }

    handleReadDropDown=()=>{
        let booksRead = this.props.books.filter((elem)=>elem.alreadyRead)
        this.setState({
            books : booksRead,
            allBooks : false,
            filterBy : 'Already Read'
        })
    }

    handleToReadDropDown=()=>{
        let booksNotRead = this.props.books.filter((elem)=>!elem.alreadyRead)
        this.setState({
            books : booksNotRead,
            allBooks : false,
            filterBy : 'Wish To-Read'
        })
    }

    handleAllBooks=()=>{
        this.setState({
            allBooks : true,
            filterBy : 'All Books'
        })
    }

    render(){
        console.log(this.props.books)
        console.log(this.state.books)
        if(!this.props.loggedInUser){
            return(
                <>
                <h1 style={{color:'white',textAlign:'center',margin:'50px',padding:'20px'}}className='myDetail'>Please sign in to start using Shelfely</h1>
                </>
            )
        }
        if(this.state.allBooks){
            return(
                <>
                <div class="myDetail dropdown">
                    <button   class="filterByButton dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"  aria-expanded="false">
                         {this.state.filterBy}
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <button className='dropdown-item' type='submit' onClick={this.handleAllBooks} >All Books</button>
                        <button type='submit' onClick={this.handleReadDropDown} class="dropdown-item" >Already Read</button>
                        <button class="dropdown-item" type='submit' onClick={this.handleToReadDropDown} >WishList</button>
                    </div>
                </div>
                <table class="table">
                <thead>
                    <tr>
                        <th>Cover</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Published Date</th>
                        <th>Category</th>
                        <th>Read</th>
                    </tr>
                </thead>
                {
                    this.props.books.map((book, index)=>{
                        if(book.user === this.props.loggedInUser._id){
                            console.log(typeof(book.date))
                            return (
                                <tr key = {index}>
                                    <td>
                                    <img style={{width:'100px' ,height:'120px'}} src={book.image}/>
                                    </td>
                                    <td>
                                    <Link to={`/book/${book._id}`}class="card-text"><h3>{book.title}</h3></Link>
                                    </td>
                                    <td>
                                    <h2>{book.author}</h2>
                                    </td>
                                    <td>
                                        <h2>{book.date}</h2>
                                    </td>
                                    <td>
                                    <h2>{book.category}</h2>
                                    </td>
                                    {
                                        book.alreadyRead ? 
                                        <td>
                                            <h4>✅</h4>
                                        </td>
                                        :
                                        <td>
                                            <h4><img style={{width:'75px', height:'75px'}} src='https://cdn.pixabay.com/photo/2016/05/31/10/52/not-yet-1426593_960_720.png'></img></h4>
                                        </td>
                                    }
                                </tr>
                            )
                        }
                    }
                    )
                }
                </table>

                </>
            )
        }
        return (
            <>
                <div class="myDetail dropdown">
                    <button class=" filterByButton dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {this.state.filterBy}
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        
                        <button type='submit' onClick={this.handleAllBooks} class="dropdown-item" >All Books</button>
                        <button type='submit' onClick={this.handleReadDropDown} class="dropdown-item" >Already Read</button>
                        <button class="dropdown-item" type='submit' onClick={this.handleToReadDropDown} >WishList</button>
                        
                    </div>

                </div>
                <table class="table">
                <thead>
                    <tr>
                        <th>Cover</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Published Date</th>
                        <th>Category</th>
                        <th>Read</th>
                    </tr>
                </thead>
                {
                    this.state.books.map((book, index)=>{
                        if(book.user === this.props.loggedInUser._id){
                            return (
                                <tr key = {index}>
                                    <td>
                                    <img style={{width:'140px' ,height:'170px'}} src={book.image}/>
                                    </td>
                                    <td>
                                    <Link to={`/book/${book._id}`}class="card-text"><h3>{book.title}</h3></Link>
                                    </td>
                                    <td>
                                    <h2>{book.author}</h2>
                                    </td>
                                    <td>
                                    <h2>{book.date}</h2>
                                    </td>
                                    <td>
                                    <h2>{book.category}</h2>
                                    </td>
                                    {
                                        book.alreadyRead ? 
                                        <td>
                                            <h4>✅</h4>
                                        </td>
                                        :
                                        <td>
                                            <h4><img style={{width:'75px', height:'75px'}} src='https://cdn.pixabay.com/photo/2016/05/31/10/52/not-yet-1426593_960_720.png'></img></h4>
                                        </td>
                                    }
                                </tr>
                            )
                        }
                    }
                    )
                }
                </table>
            </>
        )
    }
    
}