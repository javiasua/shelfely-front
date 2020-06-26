import React from 'react'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import './Results.scss'

export default class Results extends React.Component{

    state = {
        books : [],
        open : false,
        show : false
    }
    componentDidMount(){
        let {author,title} = this.props.bookSearched
        console.log(author,title)
        let axiosString = `https://www.googleapis.com/books/v1/volumes?q=inauthor:${author}+intitle:${title}&key=AIzaSyD1sfSEZsI1Pktogx1OzMt4uDrgjY7oBeo`
        if(author ===undefined || author ===''){
            axiosString = `https://www.googleapis.com/books/v1/volumes?q=intitle:${title}&key=AIzaSyD1sfSEZsI1Pktogx1OzMt4uDrgjY7oBeo`
        }
        if(title ===undefined ||title ===''){
            axiosString = `https://www.googleapis.com/books/v1/volumes?q=inauthor:${author}&key=AIzaSyD1sfSEZsI1Pktogx1OzMt4uDrgjY7oBeo`
        }

        console.log(axiosString,'sssss')
        axios.get(axiosString)
        .then((res)=>{
            console.log(res.data.items)
            let {title,imageLinks,authors,description,publishedDate,category} = res.data.items[0].volumeInfo
            let newArray = [{title:title,author:authors[0],image:imageLinks.thumbnail,description:description,publishedDate:publishedDate,category:category,alreadyRead:true}]
            for(let i=1;i<res.data.items.length;i++){
                if(res.data.items[i-1].volumeInfo.title!==res.data.items[i].volumeInfo.title){
                    let title = res.data.items[i].volumeInfo.title
                    let author = res.data.items[i].volumeInfo.authors[0]
                    let image =''
                    let category = ''
                    if(res.data.items[i].volumeInfo.imageLinks===undefined){
                      continue    
                    }else{
                        image=res.data.items[i].volumeInfo.imageLinks.smallThumbnail
                    }
                     let publishedDate = res.data.items[i].volumeInfo.publishedDate

                     if(res.data.items[i].volumeInfo.categories===undefined){
                        continue    
                      }else{
                          category=res.data.items[i].volumeInfo.categories[0]
                      }
                    
                     let description = res.data.items[i].volumeInfo.description
                    newArray.push({title:title,image:image,author:author, description:description,publishedDate:publishedDate,category:category,alreadyRead:true})
                }
            }
            Promise.all(newArray)
                .then((res)=>{
                    this.setState({
                        books : res
                    })
                })
        })
        .catch((err)=>{
            console.log('book not found',err)
        })
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
    
    render(){
        return(
            <>
                {
                    this.state.books.map((elem,index)=>{
                        elem.inBookList=false;
                        elem.urlForResults = `url(${elem.image})`
                        return(
                            <div key={index}>
                            {/* //    <header>
                            //     <h1>{elem.title}</h1>
                            //     </header>
                            //     <div class="band">
                            //     <div class="item-1">
                            //         <a href="https://design.tutsplus.com/articles/international-artist-feature-malaysia--cms-26852" class="card">
                            //         <div class="thumb" style={{backgroundImage: elem.urlForResults}}></div>
                            //         <article>
                            //             <h1>{elem.title}</h1>
                            //             <span>{elem.author}</span>
                            //         </article>
                            //         </a>
                            //     </div> */}
                                {/* <div class="item-2">
                                    <a href="https://webdesign.tutsplus.com/articles/how-to-conduct-remote-usability-testing--cms-27045" class="card">
                                    <div class="thumb" style={{backgroundImage: 'url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/users-2.png)'}}></div>
                                    <article>
                                        <h1>How to Conduct Remote Usability Testing</h1>
                                        <span>Harry Brignull</span>
                                    </article>
                                    </a>
                                </div> */}
                                {/* <div class="item-3">
                                    <a href="https://design.tutsplus.com/articles/envato-tuts-community-challenge-created-by-you-july-edition--cms-26724" class="card">
                                    <div class="thumb" style={{backgroundImage: 'url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/flex-5.jpg)'}}></div>
                                    <article>
                                        <h1>Created by You, July Edition</h1>
                                        <p>Welcome to our monthly feature of fantastic tutorial results created by you, the Envato Tuts+ community! </p>
                                        <span>Melody Nieves</span>
                                    </article>
                                    </a>
                                </div>
                                <div class="item-4">
                                    <a href="https://webdesign.tutsplus.com/tutorials/how-to-code-a-scrolling-alien-lander-website--cms-26826" class="card">
                                    <div class="thumb" style={{backgroundImage: 'url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/landing.png)'}}></div>
                                    <article>
                                        <h1>How to Code a Scrolling “Alien Lander” Website</h1>
                                        <p>We’ll be putting things together so that as you scroll down from the top of the page you’ll see an “Alien Lander” making its way to touch down.</p>
                                        <span>Kezz Bracey</span>
                                    </article>
                                    </a>
                                </div>
                                <div class="item-5">
                                    <a href="https://design.tutsplus.com/tutorials/stranger-things-inspired-text-effect--cms-27139" class="card">
                                    <div class="thumb" style={{backgroundImage: 'url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/strange.jpg)'}}></div>
                                    <article>
                                        <h1>How to Create a “Stranger Things” Text Effect in Adobe Photoshop</h1>
                                        <span>Rose</span>
                                    </article>
                                    </a>
                                </div>
                                <div class="item-6">
                                    <a href="https://photography.tutsplus.com/articles/5-inspirational-business-portraits-and-how-to-make-your-own--cms-27338" class="card">
                                    <div class="thumb" style={{backgroundImage: 'url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/flor.jpg)'}}></div>
                                    <article>
                                        <h1>5 Inspirational Business Portraits and How to Make Your Own</h1>

                                        <span>Marie Gardiner</span>
                                    </article>
                                    </a>
                                </div>
                                <div class="item-7">
                                    <a href="https://webdesign.tutsplus.com/articles/notes-from-behind-the-firewall-the-state-of-web-design-in-china--cms-22281" class="card">
                                    <div class="thumb" style={{backgroundImage: 'url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/china.png)'}}></div>
                                    <article>
                                        <h1>Notes From Behind the Firewall: The State of Web Design in China</h1>
                                        <span>Kendra Schaefer</span>
                                    </article>
                                    </a>
                                </div> */}
                                {/* </div> */}
                                <Card style={{ width: '14rem' }}>
                                <Card.Img variant="top" src={elem.image} />
                                <Card.Body>
                                    <Card.Title>{elem.title}</Card.Title>
                                    <Card.Text>Author: {elem.author}</Card.Text>
                                    <Card.Text>
                                     <textarea>{elem.description}</textarea>
                                    </Card.Text>
                                    {   
                                        this.props.books.map((elem1)=>{
                                                if(elem1.title===elem.title && elem1.user===this.props.loggedInUser._id){
                                                    elem.inBookList= true;
                                                }
                                        })
                                    }
                                    {
                                        
                                        elem.inBookList?<h3>Already in BookList</h3>:
                                        <>
                                        <Button variant="primary" onClick={()=>{this.setShow    (true, index)}}>
                                        Add to book List
                                        </Button>
                                        {
                                        elem.show && (
                                        <Modal show={elem.show} onHide={()=>{this.setShow(false,index)}}>
                                        <Modal.Header closeButton>
                                        <Modal.Title>Choose a BookShelf</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                                <form onSubmit={this.handleModal}>
                                                <select name ='yes'class="custom-select" id="inputGroupSelect01">
                                                    <option selected>Choose...</option>
                                                    <option value='yes'>Yes</option>
                                                    <option value="no">Not yet, but I want to!</option>
                                                </select>
                                                <input hidden name='book' value={elem.title}></input>
                                                <button type='submit'>Save changes</button>
                                                </form>
                                        </Modal.Body>
                                        <Modal.Footer>
                                        <Button variant="secondary" onClick={()=>{this.setShow(false, index)}}>
                                        Close
                                        </Button>
                                        </Modal.Footer>
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
            </>             
        )
    }
    
}