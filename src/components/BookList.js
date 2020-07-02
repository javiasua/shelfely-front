import React from 'react'
import {Link} from 'react-router-dom'
import { Redirect } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import Card from 'react-bootstrap/Card'
import axios from 'axios'
import config from '../config'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'


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

    handleReadDropDown2=()=>{
        let booksRead = this.props.books.filter((elem)=>elem.alreadyRead)
        this.setState({
            books : booksRead,
            allBooks : false,
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

    handleToReadDropDown2=()=>{
        let booksNotRead = this.props.books.filter((elem)=>!elem.alreadyRead)
        this.setState({
            books : booksNotRead,
            allBooks : false,
        })
    }


    handleAllBooks=()=>{
        this.setState({
            allBooks : true,
            filterBy : 'All Books'
        })
    }
    handleBookshelf=(title1)=>{
        let newBooks = [...this.props.books]
        let index = newBooks.findIndex((book)=>{
            return title1 === book.title
        })
        newBooks[index].alreadyRead = !newBooks[index].alreadyRead
        let {title,author,date,description,alreadyRead} = newBooks[index]
        this.setState({
            books : newBooks
        })
        axios.patch(`${config.API_URL}/books/${newBooks[index]._id}`,{ title:title,author:author,date:date,description:description,alreadyRead : alreadyRead
        })
            .then((res)=>{
                console.log(res)
            })
        if(!this.state.allBooks){
            this.handleFilterBy(newBooks[index])
        
        }
    }

    handleFilterBy=(book)=>{
        if(book.alreadyRead){
            this.handleToReadDropDown2()
        }else{
            this.handleReadDropDown()
        }
    }

    render(){
        if(!this.props.loggedInUser){
            return(
                <>
                
                <h1 style={{color:'white', fontFamily: 'Kameron' ,textAlign:'center',margin:'50px',padding:'20px'}}className='myDetail'>Shelfely is both a virtual library and bookshelf.</h1>
                <h1 style={{color:'white', fontFamily: 'Kameron' ,textAlign:'center',margin:'50px',padding:'20px'}}className='myDetail'> With shelfely you will be able to search any book and store it in your shelf!</h1>
                <h2 style={{color:'white',fontFamily:'Kameron',textAlign:'center',margin:'50px',padding:'20px'}}className='myDetail'>Please sign in to start</h2>
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
                <Table >
                <Thead>
                    <Tr>
                        <Th>Cover</Th>
                        <Th>Title</Th>
                        <Th>Author</Th>
                        <Th>Published Date</Th>
                        <Th>Category</Th>
                        <Th>Read</Th>
                    </Tr>
                </Thead>
                <Tbody>
                {
                    this.props.books.map((book, index)=>{
                        if(book.user === this.props.loggedInUser._id){
                            console.log(typeof(book.date))
                            return (
                                <Tr key = {index}>
                                    <Td>
                                    <img style={{width:'100px' ,height:'120px'}} src={book.image}/>
                                    </Td>
                                    <Td>
                                    <Link to={`/book/${book._id}`}class="card-text"><h3>{book.title}</h3></Link>
                                    </Td>
                                    <Td>
                                    <h2>{book.author}</h2>
                                    </Td>
                                    <Td>
                                        <h2>{book.date}</h2>
                                    </Td>
                                    <Td>
                                    <h2>{book.category}</h2>
                                    </Td>
                                    {
                                        book.alreadyRead ? 
                                        <Td>
                                        <button onClick={()=>{this.handleBookshelf(book.title)}} style={{padding:'0',border:'none',backgroundColor:'rgba(135, 154, 179, 0.97)'}}><h4 style={{fontSize:'45px',padding:'10px'}}className='read'>✅ </h4></button>
                                        </Td>
                                        :
                                        <Td>
                                        <button onClick={()=>{this.handleBookshelf(book.title)}} style={{padding:'0',border:'none',backgroundColor:'rgba(135, 154, 179, 0.97)'}}><h4 className='read'><img style={{width:'75px', height:'75px'}} src='https://cdn.pixabay.com/photo/2016/05/31/10/52/not-yet-1426593_960_720.png'></img></h4></button>
                                        </Td>
                                    }
                                </Tr>
                            )
                        }
                    }
                    )
                }
                </Tbody>
                </Table>


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
                <Table >
                <Thead>
                    <Tr>
                        <Th>Cover</Th>
                        <Th>Title</Th>
                        <Th>Author</Th>
                        <Th>Published Date</Th>
                        <Th>Category</Th>
                        <Th>Read</Th>
                    </Tr>
                </Thead>
                <Tbody>
                {
                    this.state.books.map((book, index)=>{
                        if(book.user === this.props.loggedInUser._id){
                            return (
                                <Tr key = {index}>
                                    <Td>
                                    <img style={{width:'140px' ,height:'170px'}} src={book.image}/>
                                    </Td>
                                    <Td>
                                    <Link to={`/book/${book._id}`}class="card-text"><h3>{book.title}</h3></Link>
                                    </Td>
                                    <Td>
                                    <h2>{book.author}</h2>
                                    </Td>
                                    <Td>
                                    <h2>{book.date}</h2>
                                    </Td>
                                    <Td>
                                    <h2>{book.category}</h2>
                                    </Td>
                                    {
                                        book.alreadyRead ? 
                                        <Td>
                                        <button onClick={()=>{this.handleBookshelf(book.title)}} style={{padding:'0',border:'none',backgroundColor:'rgba(135, 154, 179, 0.97)'}}><h4 style={{fontSize:'45px',padding:'10px'}}className='read'>✅ </h4></button>
                                        </Td>
                                        :
                                        <Td>
                                        <button onClick={()=>{this.handleBookshelf(book.title)}} style={{padding:'0',border:'none',backgroundColor:'rgba(135, 154, 179, 0.97)'}}><h4 className='read'><img style={{width:'75px', height:'75px'}} src='https://cdn.pixabay.com/photo/2016/05/31/10/52/not-yet-1426593_960_720.png'></img></h4></button>
                                        </Td>
                                    
                                    }
                                </Tr>
                            )
                        }
                    }
                    )
                }
                </Tbody>
                </Table>
            </>
        )
    }
    
}