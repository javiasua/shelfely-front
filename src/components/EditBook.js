import React from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import config from '../config'
export default class EditBook extends React.Component{

    state = {
       book : ''
    }

    componentDidMount(){
        let id = this.props.match.params.id
        axios.get(`${config.API_URL}/books/${id}`)
            .then((res)=>{
                console.log(res.data)
                let bookToEdit = res.data
                bookToEdit.date = bookToEdit.date.substring(0,10)
                this.setState({
                    book : bookToEdit
                })
            })
    }

    handleEdit=(e)=>{
        e.preventDefault()
        let id = this.props.match.params.id
        let {title,author,date,description,alreadyRead} = this.state.book
        console.log(description)
        let properties = {title:title,author:author,date:date,description:description,alreadyRead:alreadyRead}
        axios.patch(`${config.API_URL}/books/${id}`,{
            title : title,
            author : author,
            date : date,
            description : description
        })
            .then((res)=>{
                this.props.edit(id,properties);
            })
        // this.props.history.push(`/`);
    }

    handleAuthorChange=(e)=>{
        e.preventDefault()
        let newbook = JSON.parse(JSON.stringify(this.state.book))
        newbook.author = e.target.value

        this.setState({
            book: newbook
        })
    }

    handleTitleChange=(e)=>{
        e.preventDefault()
        let newbook = JSON.parse(JSON.stringify(this.state.book))
        newbook.title = e.target.value

        this.setState({
            book: newbook
        })
    }

    handleDateChange=(e)=>{
        e.preventDefault()
        let newbook = JSON.parse(JSON.stringify(this.state.book))
        newbook.date = e.target.value

        this.setState({
            book: newbook
        })
    }

    handleDescriptionChange=(e)=>{
        let newbook =JSON.parse(JSON.stringify(this.state.book))
        console.log(newbook.description,'original')
        newbook.description = e.target.value

        this.setState({
            book: newbook
        })
    }

    render(){
        const {title,author,date,image,description} = this.state.book
        return (
            <>
                <div className='add1-book'>
                <img style={{margin:'20px', height:'589px'}}src={image}></img>
                <form className='edit-book myDetail' onSubmit={this.props.handleEdit}>
                    <div class="form-group">
                        <label className='my-labels'for="title">Title</label>
                        <input onChange={this.handleTitleChange}name='title'type="text" class="form-control" id="title" aria-describedby="emailHelp" value = {title} />
                    </div>
                    <div class="form-group">
                        <label  className='my-labels' for="author">Author</label>
                        <input onChange={this.handleAuthorChange} name ='author' type="text" class="form-control" id="author" value={author}/>
                    </div>
                    <div class="form-group">
                        <label   className='my-labels'for="description">Description</label>
                        <textarea onChange={this.handleDescriptionChange} name ='description' class="form-control" id="desription" value={description} rows='5' cols='10'/>
                    </div>
                    <div class="form-group">
                        <label  className='my-labels' for="date">Date (Input needs to be valid date)</label>
                        <input onChange={this.handleDateChange}name ='date' type="text" class="form-control" id="date" value={date}/>
                    </div>
                    {/* <button  onClick={this.handleEdit}   type="submit" class="edit-button">EDIT</button> */}

                    <div class="container">
                    <button type='submit'href="https://twitter.com/masuwa1018"  onClick={this.handleEdit} class="btn effect01" target="_blank"><span>EDIT</span></button>
                    </div>
                </form>
                <img style={{margin:'20px', height:'589px'}}src={image}></img>
                </div>
            </>
        )
    }
    
}