import React, { Component } from 'react'
import axios from 'axios'
import '../App.css'
import {Link} from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import config from '../config'


export default class BookDetail extends Component{

    state = {
        book: [],
        showDescription : false
    }
    componentDidMount(){
        let id = this.props.match.params.id
        axios.get(`${config.API_URL}/books/${id}`)
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
        axios.delete(`${config.API_URL}/books/${id}`)
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
                    <img style={{position:'relative',width:'21.5rem',height:'100%',borderRadius :'5px'}}src={this.state.book.image}/>
                    
                    <div className='book-detail-components'>
                    <h1> {this.state.book.title}</h1>
                    <br/>
                    <h2> {this.state.book.author}</h2>
                    <h3>{this.state.book.date}</h3>
                    <h4>{this.state.book.category}</h4>
                    {
                        this.state.book.alreadyRead ? 
                           <h4 style={{color:'green',fontSize:'45px'}}> ✅</h4>
                        :
                            <h4 style={{color:'brown'}}><img style={{width:'75px', height:'75px'}} src='https://cdn.pixabay.com/photo/2016/05/31/10/52/not-yet-1426593_960_720.png'></img></h4>
                    }
                    <br>
                    </br>
                    <br>
                    </br>
                    {
                        this.state.book.preview? <a target="_blank" style={{color:'white'}} href={this.state.book.preview}><button  type='submit' style={{position:'relative',width:'70%'}}href="https://twitter.com/masuwa1018"  class="btn effect01" target="_blank">PREVIEW</button></a> : <h3>NO PREVIEW AVALIABLE</h3>
                    }
                    <a><button style={{position:'relative',width:'70%'}} onClick={()=>{this.handleDescription(true)}} type='submit'href="https://twitter.com/masuwa1018"  class="btn effect01" target="_blank">Description</button></a>
                                    {
                                        this.state.showDescription ? 
                                        <>
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
                                        </>
                                        :''
                                    }
                   
                    <Link to={`/book/${id}/edit`} style={{margin:'0'}}><button style={{position:'relative',width:'70%'}} type='submit'href="https://twitter.com/masuwa1018"  class="btn effect01" target="_blank">Edit</button></Link>
                    <a><button style={{position:'relative',width:'70%'}}onClick={this.handleDeletebook} style={{backgroundColor : 'brown',color:'white'}}>Delete</button></a>
                    </div>
                    <img style={{position:'relative',height:'100%',width:'21.5rem',borderRadius :'5px'}}src={this.state.book.image}/>
                </div>

            </>
        ) 
    }
    
} 