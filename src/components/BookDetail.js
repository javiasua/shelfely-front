import React, { Component } from 'react'
import axios from 'axios'
import '../App.css'
import {Link} from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import API_URL from '../config'


export default class BookDetail extends Component{

    state = {
        book: [],
        showDescription : false
    }
    componentDidMount(){
        let id = this.props.match.params.id
        axios.get(`${API_URL}/books/${id}`)
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
        axios.delete(`${API_URL}/books/${id}`)
            .then((res)=>{
                console.log('deleted')
                this.props.afterDelete(id)
            })
            .catch((err)=>{
                console.log('error in delete')
            })
    }
    handleDescription=(value)=>{
        this.setState({
            showDescription: value
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
                <div className='myDetail book-detail'>
                    <img style={{width:'300px',height:'400px',border:'2px solid black',borderRadius :'5px'}}src={this.state.book.image}/>
                    <div>
                    <h1> {this.state.book.title}</h1>
                    <br/>
                    <h2> {this.state.book.author}</h2>
                    <h3>Date Published : {this.state.book.date}</h3>
                    <h4>Category: {this.state.book.category}</h4>
                    {
                        this.state.book.alreadyRead ? 
                           <h4 style={{color:'green'}}>Book already read</h4>
                        :
                            <h4 style={{color:'brown'}}>You haven't read this book yet</h4>
                    }
                    {
                        this.state.book.preview? <a target="_blank" style={{ color:'white'}} href={this.state.book.preview}><h3>PREVIEW</h3></a> : <h3>NO PREVIEW AVALIABLE</h3>
                    }
                     <div class="container">
                    <button onClick={()=>{this.handleDescription(true)}} style={{height:'100px',width:'130px'}}type='submit'href="https://twitter.com/masuwa1018"  class="btn effect01" target="_blank"><span style={{fontSize:'13px'}}>Show Description</span></button>
                    </div>
                    {/* <button onClick={()=>{this.handleDescription(true)}}>Show Description</button> */}
                                    {
                                        this.state.showDescription ? 
                                        <Modal show={this.state.showDescription} onHide={()=>{this.handleDescription(false)}}>
                                        <Modal.Header  closeButton>
                                        <Modal.Title style={{fontFamily:'Kameron'}}>{this.state.book.title} </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body >
                                                <textarea style={{border:'none' ,fontFamily:'Helvetica',color:'#0C374D'}} rows='10' cols='50'>{this.state.book.description}</textarea>
                                        </Modal.Body>
                                        <Modal.Footer>
        
                                        </Modal.Footer>
                                        </Modal> 
                                        :''
                                    }
                    <div class="container">
                    <Link to={`/book/${id}/edit`}><button  style={{width:'100px'}}type='submit'href="https://twitter.com/masuwa1018"  class="btn effect01" target="_blank"><span>Edit</span></button></Link>
                    </div>
                    <button onClick={this.handleDeletebook} style={{margin:'3px',backgroundColor : 'brown',color:'white'}}>Delete</button>
                    </div>
                    <img style={{width:'300px',height:'400px',border:'2px solid black',borderRadius :'5px'}}src={this.state.book.image}/>
                </div>

            </>
        ) 
    }
    
} 