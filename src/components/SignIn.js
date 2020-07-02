import React from 'react';
import { Redirect } from 'react-router-dom';


export default class SignIn extends React.Component{
    
    state = {
        type : 'password'
    }
    handleType=()=>{
       if(this.state.type==='password'){
        this.setState({
            type:'text'
        })
       }
       if(this.state.type==='text'){
           this.setState({
               type:'password'
           })
       }
    }

    render(){
        return (
            <div className='sign'>
                <form className='myDetail'onSubmit={this.props.onSignIn}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input name="password" type={this.state.type} className="form-control" id="exampleInputPassword1" />
                    <button  onClick={this.handleType} type='button'>Show password </button>
                </div>
                <h5 style={{color:'brown'}}>{this.props.errorMessage}</h5>
                <button  type='submit' style={{position:'relative'}}href="https://twitter.com/masuwa1018"  class="btn effect01" target="_blank">Sign In</button>
            </form>
            </div>
        )
    }
        
    
}