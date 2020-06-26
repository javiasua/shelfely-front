import React, { Component } from 'react'
import axios from 'axios'
import '../App.css'
import {Link} from 'react-router-dom'


export default class BookDetail extends Component{

    state = {
        book: []
    }
    componentDidMount(){
        let id = this.props.match.params.id
        axios.get(`http://localhost:5000/api/books/${id}`)
            .then((res)=>{
                let bookToShow = res.data
                bookToShow.date = bookToShow.date.substring(0,10)
                this.setState({
                    book : bookToShow
                })
            })
            .catch((err)=>{
                console.log('nothing found')
            })
    }


    handleDeletebook=()=>{
        let id = this.props.match.params.id
        axios.delete(`http://localhost:5000/api/books/${id}`)
            .then((res)=>{
                console.log('deleted')
                this.props.afterDelete(id)
            })
            .catch((err)=>{
                console.log('error in delete')
            })
    }

    componentWillUnmount(){
        console.warn('component unmounted')
    }
    render(){
        if(!this.state.book){
            return(
                <div class="spinner-grow" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            )
        }
        console.log(this.state.book)
        let id = this.props.match.params.id
        return (
            <>
                <div className='myDetail'>
                    <h1>Title: {this.state.book.title}</h1>
                    <br/>
                    <h2>Author: {this.state.book.author}</h2>
                    <h3>Date Published : {this.state.book.date}</h3>
                    <h4>Category: {this.state.book.category}</h4>
                    {
                        this.state.book.alreadyRead ? 
                           <h4>Book already read</h4>
                        :
                            <h4>You haven't read this book yet</h4>
                    }
                    <img style={{width:'200px',height:'250px',border:'2px solid black',borderRadius :'5px'}}src={this.state.book.image}/>
                    <p>{this.state.book.description}</p>
                </div>
                <button><Link to={`/book/${id}/edit`}>Edit</Link></button>
                <button onClick={this.handleDeletebook}>Delete</button>

            </>
        ) 
    }
    
} 