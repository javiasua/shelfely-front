import React from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
export default class EditBook extends React.Component{

    state = {
       book : ''
    }

    componentDidMount(){
        let id = this.props.match.params.id
        axios.get(`http://localhost:5000/api/books/${id}`)
            .then((res)=>{
                console.log(res.data)
                let bookToEdit = res.data
                bookToEdit.date = bookToEdit.date.substring(0,10)
                this.setState({
                    book : bookToEdit
                })
            })
    }

    handleEdit=()=>{
        let id = this.props.match.params.id
        let {title,author,date,description} = this.state.book
        console.log(description)
        axios.patch(`http://localhost:5000/api/books/${id}`,{
            title : title,
            author : author,
            date : date,
            description : description
        })
            .then((res)=>{
                this.props.history.push('/');
                
            })
        this.props.history.push(`/books/${id}`);
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
        const {title,author,date,description} = this.state.book
        return (
            <>
                <form onSubmit={this.props.handleEdit}>
                    <div class="form-group">
                        <label for="title">Title</label>
                        <input onChange={this.handleTitleChange}name='title'type="text" class="form-control" id="title" aria-describedby="emailHelp" value = {title} />
                    </div>
                    <div class="form-group">
                        <label for="author">Author</label>
                        <input onChange={this.handleAuthorChange} name ='author' type="text" class="form-control" id="author" value={author}/>
                    </div>
                    <div class="form-group">
                        <label for="description">Description</label>
                        <textarea onChange={this.handleDescriptionChange} name ='description' class="form-control" id="desription" value={description} rows='6' cols='10'/>
                    </div>
                    <div class="form-group">
                        <label for="date">Date (Input needs to be valid date)</label>
                        <input onChange={this.handleDateChange}name ='date' type="text" class="form-control" id="date" value={date}/>
                    </div>
                    <button  onClick={this.handleEdit}   type="submit" class="btn btn-primary">Submit</button>
                </form>
            </>
        )
    }
    
}