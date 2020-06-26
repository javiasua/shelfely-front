import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import {Switch, Route} from 'react-router-dom'
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import Nav from './components/Nav'
import axios from 'axios'
import BookDetail from './components/BookDetail';
import EditBook from './components/EditBook'
import {withRouter} from 'react-router-dom'
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import SearchBook from './components/SearchBook';
import Results from './components/Results'
import {Link} from 'react-router-dom'

class App extends React.Component{

  state = {
    books : [],
    bookSearched : [],
    loggedInUser: null
  }

  getBooks = () => {
    axios.get(`http://localhost:5000/api/books`)
      .then((res) => {
        for(let i = 0 ; i<res.data.length ; i++){
          console.log(res.data[i].date)
          res.data[i].date = res.data[i].date.substring(0,10)
        }
        console.log(res.data)
        this.setState({
          books: res.data
        })
      })
      .catch((err) => {
        console.log(err)
      })  
  }

  getUser(){
    axios.get(`http://localhost:5000/api/user`, {withCredentials: true})
    .then((res) => {
      this.setState({
        loggedInUser: res.data
      })
    })
    .catch((err) => {
      //  if(err.response.status === 401) {
      //    this.props.history.push('/sign-in')
      //  }
    })  
  }

  componentDidMount(){
    axios.get('http://localhost:5000/api/books')
      .then((res)=>{
        this.setState({
          books : res.data
        })
      })
      this.getBooks();
      if (!this.state.loggedInUser) {
        this.getUser();
      }

  }

  handleSignIn = (e) => {
    e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value
    
    axios.post(`http://localhost:5000/api/signin`, {
      email: email,
      password: password
    }, {withCredentials: true})
    .then((res) => {
      this.setState({
        loggedInUser: res.data
      }, () => {
        this.props.history.push('/')
      })
    })
  }

  handleSignUp = (e) => {
    e.preventDefault()
    let email = e.target.email.value;
    let username = e.target.username.value
    let password = e.target.password.value
    axios.post(`http://localhost:5000/api/signup`, {
      email: email,
      username: username,
      password: password
    }, { withCredentials: true})
    .then((res) => {
        this.setState({
          loggedInUser: res.data
        }, () => {
          this.props.history.push('/')
        })
    })
  }

  handleLogout = () => {
    console.log(document.cookie)
    axios.post(`http://localhost:5000/api/logout`, {}, { withCredentials: true})
    .then((res) => {
      console.log(res)
      this.setState({
        loggedInUser: null
      }, () => {
        this.props.history.push('/')
      })
    })
  }

  handleAddBook=(e)=>{
    e.preventDefault()
    let title = e.target.name.value
    console.log(title)

    let author = e.target.author.value
    let date = e.target.date.value
    let image = e.target.image.files[0]
    let uploadData = new FormData();
    uploadData.append('imageUrl', image)
    console.log(image)
    let description= e.target.description.value
    let category = e.target.category.value
    let alreadyRead = e.target.yes.value==='yes'? true : false
    axios.post('http://localhost:5000/api/upload',uploadData)
      .then((res)=>{
          console.log(res,'heo')
            axios.post('http://localhost:5000/api/create',{
          title : title,
          author : author,
          date : date,
          image : res.data.image,
          description : description,
          alreadyRead  : alreadyRead,
          category : category,
          id : this.state.loggedInUser._id
        },{withCredentials: true})
        .then((res)=>{
          this.setState({
            books : [...this.state.books,res.data]
          }, ()=>{
            this.props.history.push('/')
          })
          
        })
      })
  }
    
  handleAddSearchedBook=(book)=>{
    let title = book.title
    let author = book.author
    let image = book.image
    let description = book.description
    let date = book.publishedDate
    let category = book.category
    let alreadyRead = book.alreadyRead
    console.log(book.alreadyRead)
    axios.post('http://localhost:5000/api/create',{
      title : title,
      author : author,
      date : date,
      image:image,
      description:description,
      alreadyRead:alreadyRead,
      category : category,
      id : this.state.loggedInUser._id
    },{withCredentials: true})
    .then((res)=>{
      this.setState({
        books : [...this.state.books,res.data]
      }, ()=>{
        this.props.history.push('/')
      })
    })

  }

  handleDelete=(id)=>{
    let newBooks = [...this.state.books]
    let index = newBooks.findIndex((e)=>{
      return e._id === id 
    })

    newBooks.splice(index,1)

    this.setState({
      books: newBooks
    },()=>{
      this.props.history.push('/')
    })
  }

  handleSearch=(e)=>{
    e.preventDefault()
    console.log(e.target.title.value)
    console.log(e.target.author.value)
    let title = e.target.title.value
    let author = e.target.author.value
  
    this.setState({
      bookSearched : {title:title,author:author}
    },()=>{
      this.props.history.push('/search-results')
    })

  }

  


  render(){
    const {loggedInUser} = this.state
    console.log('user is ',loggedInUser)
    return (
        <>
          
          <Nav loggedInUser={loggedInUser} onLogout={this.handleLogout} searchBooks = {this.handleSearchBooks}/>
          <header><h1><Link to='/'>Shelfely</Link></h1></header>
          <Switch>

            <Route exact path='/' render={()=> {
              return <BookList loggedInUser={loggedInUser} books={this.state.books} /> }} />

            <Route path='/add-book' render={()=>{
              return <AddBook loggedInUser={loggedInUser}  onAdd={this.handleAddBook}/>
            }}/>

            <Route exact path='/book/:id' render={(routeProps)=>{
              return <BookDetail afterDelete ={this.handleDelete} {...routeProps} /> }}/>

            <Route path='/book/:id/edit' render={(routeProps)=>{
              return <EditBook  {...routeProps} /> }}/>

            <Route path="/sign-in" render={(routeProps) => {
                  return <SignIn 
                    onSignIn={this.handleSignIn} 
                    {...routeProps} 
                  />
              }}
            />

            <Route path="/sign-up" render={(routeProps) => {
              return <SignUp onSignUp={this.handleSignUp} {...routeProps} />
            }}
            />

            <Route exact path="/search" render={(routeProps) => {
              return <SearchBook handleSearch={this.handleSearch} {...routeProps} />
            }}
            />  

            <Route path="/search-results" render={(routeProps) => {
              return <Results books={this.state.books} loggedInUser ={loggedInUser} addToBookList={this.handleAddSearchedBook} bookSearched={this.state.bookSearched} {...routeProps} />
            }}
            /> 

            </Switch>
        </>
      );
  }
}

export default withRouter(App)