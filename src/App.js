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
import config from './config'

class App extends React.Component{

  state = {
    books : [],
    bookSearched : [],
    loggedInUser: null
  }

  getBooks = () => {
    axios.get(`${config.API_URL}/books`)
      .then((res) => {
        for(let i = 0 ; i<res.data.length ; i++){
          if(!res.data[i].date){
            res.data[i].date = 'no date available'
          }else{
            res.data[i].date = res.data[i].date.substring(0,10)
          }
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
    axios.get(`${config.API_URL}/user`, {withCredentials: true})
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
    axios.get(`${config.API_URL}/books`)
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
    
    axios.post(`${config.API_URL}/signin`, {
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
    axios.post(`${config.API_URL}/signup`, {
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
    .catch((err)=>{
      console.log(err)
    })
  }

  handleLogout = () => {
    console.log(document.cookie)
    axios.post(`${config.API_URL}/logout`, {}, { withCredentials: true})
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
    axios.post(`${config.API_URL}/upload`,uploadData)
      .then((res)=>{
          console.log(res,'heo')
            axios.post(`${config.API_URL}/create`,{
          title : title,
          author : author,
          date : date.substring(0,10),
          image : res.data.image,
          description : description,
          alreadyRead  : alreadyRead,
          category : category,
          id : this.state.loggedInUser._id
        },{withCredentials: true})
        .then((res)=>{
          res.data.date = res.data.date.substring(0,10)
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
    let date = book.publishedDate.substring(0,10)
    let category = book.category
    let alreadyRead = book.alreadyRead
    let preview = book.preview
    console.log(book.alreadyRead)
    axios.post(`${config.API_URL}/create`,{
      title : title,
      author : author,
      date : date,
      image:image,
      description:description,
      alreadyRead:alreadyRead,
      category : category,
      preview : preview,
      id : this.state.loggedInUser._id
    },{withCredentials: true})
    .then((res)=>{
       res.data.date = res.data.date.substring(0,10)
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

  handleEdit=(id,properties)=>{
    let {title,author,date,description} = properties
    let newBooks = [...this.state.books]
    let index = newBooks.findIndex((e)=>{
      return e._id === id 
    })

    newBooks[index].title = title
    newBooks[index].author=author
    newBooks[index].description=description
    newBooks[index].date=date

    this.setState({
      books: newBooks
    },()=>{
      this.props.history.push('/')
    })
  }

  


  render(){
    const {loggedInUser} = this.state
    console.log('user is ',loggedInUser)
    return (
        <>
  
          <header className='main-header'>
          <Nav loggedInUser={loggedInUser} onLogout={this.handleLogout} searchBooks = {this.handleSearchBooks}/>
          <h1> <Link className='main-title' to='/'>SHELFELY</Link></h1>
          </header>
          <Switch>

            <Route exact path='/' render={()=> {
              return <BookList loggedInUser={loggedInUser} books={this.state.books} /> }} />

            <Route path='/add-book' render={()=>{
              return <AddBook loggedInUser={loggedInUser}  onAdd={this.handleAddBook}/>
            }}/>

            <Route exact path='/book/:id' render={(routeProps)=>{
              return <BookDetail afterDelete ={this.handleDelete} {...routeProps} /> }}/>

            <Route path='/book/:id/edit' render={(routeProps)=>{
              return <EditBook edit={this.handleEdit} {...routeProps} /> }}/>

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