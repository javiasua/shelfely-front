import React from 'react'
import { Redirect } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default class AddBook extends React.Component{

    state = {
        titleError : false,
        authorError : false,
        showAddDescription : false
    }

    onHandleAdd=(e)=>{
        e.preventDefault()
        let title = e.target.title.value
        let author = e.target.author.value
        if(!title||!author){
               this.setState({
                   titleError: !title,
                   authorError: !author
               }) 
        }else{
            this.props.onAdd(e)
            this.setState({
                titleError : false,
                authorError : false
            })
        }
    }
    handleDescription=(value)=>{
        this.setState({
            showAddDescription: value
        })
        
    }
    render(){
        if (!this.props.loggedInUser) {
            return <Redirect to='/sign-in' />
        }
        return (
            <>
                <div className='add1-book'>
                <form className='add-book myDetail' onSubmit={this.onHandleAdd}>
                    <div class="form-group">
                        <label  className='my-labels' for="name">Name (Required) </label>
                        {
                            this.state.titleError && <p style={{color:'brown'}}>Please enter a title</p>
                        }
                        <input name='title'type="text" class="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter name" />
                    </div>
                    <div class="form-group">
                        <label   className='my-labels'for="author">Author (Required)</label>
                        {
                            this.state.authorError && <p style={{color:'brown'}}>Please enter a author</p>
                        }
                        <input name ='author' type="text" class="form-control" id="author" placeholder="Enter an author"/>
                    </div>
                    <div class="form-group">
                        <label   className='my-labels'for="date">Date Published</label>
                        <input name ='date' type="date" class="form-control" id="date" placeholder=""/>
                    </div>
                    <div class="form-group">
                        <label   className='my-labels'for="image">Image</label>
                        <input name ='image' type="file" class="form-control" id="image" placeholder=""/>
                    </div>
                    <div class="form-group">
                        <label for="description">Description</label>
                        <textarea name ='description' type="text" class="form-control" id="description" placeholder=""/>
                    </div>
                    <div class="form-group">
                        <label   className='my-labels'for="category">Category</label>
                        <input name ='category' type="text" class="form-control" id="category" placeholder=""/>
                    </div>
                    <div class="form-group">
                    <label className="my-labels checkbox-inline">Did you read it already? </label>
                    <select name ='yes'class="custom-select" id="inputGroupSelect01">
                        <option selected>Choose...</option>
                        <option value='yes'>Yes</option>
                        <option value="no">Not yet, add to my whishlist!</option>
                     </select>
                    </div>
                    <div class="container">
                    <button type='submit'href="https://twitter.com/masuwa1018"   class="btn effect01" target="_blank"><span>ADD</span></button>
                    </div>
                </form>
                </div>
            </>
        )
    }
   
}