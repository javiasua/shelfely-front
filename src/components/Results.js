import React from 'react'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import { Redirect } from 'react-router-dom';
import {Link} from 'react-router-dom'
//import './Results.scss'

export default class Results extends React.Component{

    state = {
        books : [],
        open : false,
        show : false,
        noInputs : false,
        noBooksFound : false,
        showDescription : false
    }
    componentDidMount(){
        let {author,title} = this.props.bookSearched
        if(!title&&!author){
            this.setState({
                noInputs : true 
            })
        }else{
        author = author.split(' ').join('+')
        title =title.split(' ').join('+')
        console.log(author,title)
        let axiosString = `https://www.googleapis.com/books/v1/volumes?q=inauthor:${author}+intitle:${title}&maxResults=40&key=AIzaSyD1sfSEZsI1Pktogx1OzMt4uDrgjY7oBeo`
        if(author ===undefined || author ===''){
            axiosString = `https://www.googleapis.com/books/v1/volumes?q=intitle:${title}&maxResults=40&key=AIzaSyD1sfSEZsI1Pktogx1OzMt4uDrgjY7oBeo`
        }
        if(title ===undefined ||title ===''){
            axiosString = `https://www.googleapis.com/books/v1/volumes?q=inauthor:${author}&maxResults=40&key=AIzaSyD1sfSEZsI1Pktogx1OzMt4uDrgjY7oBeo`
        }


        console.log(axiosString,'sssss')
        axios.get(axiosString)
        .then((res)=>{
            console.log(res)
            if(res.data.totalItems===0){
               console.log('nothing found') 
                this.setState({
                    noBooksFound : true
                })
            }else{
                let newArray = []
            for(let i=0;i<res.data.items.length;i++){
                    let title = ''
                    let author = ''
                    if(!res.data.items[i].volumeInfo.title ||!res.data.items[i].volumeInfo.authors ){
                        continue
                    }else{
                        title = title = res.data.items[i].volumeInfo.title
                        author = res.data.items[i].volumeInfo.authors[0]
                    }
                    let image =''
                    let category = ''
                    if(res.data.items[i].volumeInfo.imageLinks===undefined){
                      continue    
                    }else{
                        image=res.data.items[i].volumeInfo.imageLinks.thumbnail
                    }
                    let publishedDate = ''
                    if(!res.data.items[i].volumeInfo.publishedDate){
                        continue
                    }else{
                         publishedDate = res.data.items[i].volumeInfo.publishedDate
                    }

                     if(res.data.items[i].volumeInfo.categories===undefined){
                        continue    
                      }else{
                          category=res.data.items[i].volumeInfo.categories[0]
                      }
                      let description = ''
                      if(!res.data.items[i].volumeInfo.description){
                          continue
                      }else{
                         description = res.data.items[i].volumeInfo.description
                      }
                      let preview = ''
                      if(!res.data.items[i].volumeInfo.previewLink){
                          continue
                      }else{
                          preview = res.data.items[i].volumeInfo.previewLink
                      }
                    newArray.push({title:title,image:image,author:author, description:description,publishedDate:publishedDate,category:category,preview:preview,alreadyRead:true,wordForDescriptionButton:'Show',showDescription:false})
            }
            Promise.all(newArray)
                .then((res)=>{
                    this.setState({
                        books : res
                    })
                })
            }
            
            
        })
        .catch((err)=>{
            console.log('book not found',err)
        })
        }
    }

    setShow = (value, index) => {
        let booksClone = [...this.state.books]
        booksClone[index].show = value
        this.setState({
            books: booksClone
        })
    }

    handleModal=(e)=>{
        e.preventDefault()
        let newBooks = [...this.state.books]
        let index = newBooks.findIndex((book)=>{
            return e.target.book.value === book.title
        })
        if(e.target.yes.value==='yes'){
            newBooks[index].alreadyRead = true
        }else{
            newBooks[index].alreadyRead = false
        }
        let elemToSend = newBooks.filter((elem)=>{
            return elem.title === e.target.book.value
        })
        this.setState({
            books : newBooks
        })
        this.props.addToBookList(elemToSend[0])
    }

    handleDescription=(value,index)=>{
        let booksClone = [...this.state.books]
        booksClone[index].showDescription = value
        booksClone[index].wordForDescriptionButton = booksClone[index].showDescription?'Minimize':'Show'
        this.setState({
            books: booksClone,
            description : 'Minimize'
        })
    }
    
    render(){
        if (!this.props.loggedInUser) {
            return <Redirect to='/sign-in' />
        }
        console.log(this.state.books)
        if(this.state.noInputs){
            return(
                <Redirect to='/search'/>
            )
        }
        if(this.state.noBooksFound){
            return(
                <h1 className='myDetail' style={{textAlign:'center', color:'brown'}}>Nothing found! <Link to='/search'>Try Again</Link></h1>
            )
        }
        return(
            <>  
                <span  style={{backgroundColor:'rgba(42, 187, 155, 0.5)',padding:'10px',margin: '10px',fontSize:'40px',fontFamily:'Kameron',color:'white'}}>{this.state.books.length} books found...</span>
                <div className='myDetail results'>
                {
                    this.state.books.map((elem,index)=>{
                        elem.inBookList=false;
                        elem.urlForResults = `url(${elem.image})`
                        return(
                            <div  key={index}>
                                <Card style={{ width: '14rem', height:'550px',margin:'20px' }}>
                                <Card.Img variant="top" style={{width:'100%',height:'40%'}}src={elem.image} />
                                <Card.Body>
                                    <Card.Title>{elem.title}</Card.Title>
                                    <Card.Text>Author: {elem.author}</Card.Text>
                                    <Card.Text>
                                    <a target="_blank" href={elem.preview}>PREVIEW</a>
                                    <button style={{display:'block',width:'100%',border:'none'}}onClick={()=>{this.handleDescription(true,index)}}>{elem.wordForDescriptionButton} Description</button>
                                    {
                                        elem.showDescription ? 
                                        <Modal show={elem.showDescription} onHide={()=>{this.handleDescription(false,index)}}>
                                        <Modal.Header  closeButton>
                                        <Modal.Title style={{fontFamily:'Kameron'}}>{elem.title} </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body >
                                                <textarea style={{border:'none' ,fontFamily:'Helvetica',color:'#0C374D'}} rows='10' cols='50'>{elem.description}</textarea>
                                        </Modal.Body>
                                        <Modal.Footer>
        
                                        </Modal.Footer>
                                        </Modal> 
                                        :''
                                    }
                                     
                                    </Card.Text>
                                    {   
                                        this.props.books.map((elem1)=>{
                                                if(elem1.title===elem.title && elem1.user===this.props.loggedInUser._id){
                                                    elem.inBookList= true;
                                                }
                                        })
                                    }
                                    {
                                        
                                        elem.inBookList?<h3 style={{margin:'0',padding:'1px',color:'green', borderRadius: '5px'}}>In BookList ✓</h3>:
                                        <>
                                        {/* <Button  onClick={()=>{this.setShow(true, index)}}>
                                        ADD BOOK
                                        </Button> */}
                                        {/* <div class="container addSearchButton"> */}
                                        <button type='submit'href="https://twitter.com/masuwa1018"  onClick={()=>{this.setShow(true, index)}}class="btn effect01" target="_blank"><span>ADD BOOK</span></button>
                                        {/* </div> */}
                                        {
                                        elem.show && (
                                        <Modal show={elem.show} onHide={()=>{this.setShow(false,index)}}>
                                        <Modal.Header closeButton>
                                        <Modal.Title>Choose a BookShelf</Modal.Title>
                                        </Modal.Header>
                                        <form onSubmit={this.handleModal}>
                                        <Modal.Body>
                                                <h3>Did you read it already?</h3>
                                                <select name ='yes'class="custom-select" id="inputGroupSelect01">
                                                    <option selected>Choose...</option>
                                                    <option value='yes'>Yes</option>
                                                    <option value="no">Not yet, add to my WishList!</option>
                                                </select>
                                                <input hidden name='book' value={elem.title}></input>
                                                
                                        </Modal.Body>
                                        
                                        <Modal.Footer>
                                        <div class="container">
                                             <button type='submit'href="https://twitter.com/masuwa1018" class="btn effect01" target="_blank"><span>ADD</span></button>
                
                                        </div>
                                        <Button variant="secondary" onClick={()=>{this.setShow(false, index)}}>
                                        Close
                                        </Button>
                                        </Modal.Footer>
                                        </form>
                                        </Modal> 
                                     )
                                    }
                                    </>
                                    }
                                </Card.Body>
                                </Card>
                                
                                
                            
                                </div>
                            
                        )
                    })
                }
                </div>
            </>             
        )
    }
    
}