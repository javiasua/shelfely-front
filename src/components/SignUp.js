import React from 'react';

export default function SignUp(props){
    return (
        <div className='sign'>
            <form className='myDetail' onSubmit={props.onSignUp}>
            <div className="form-group">
                <label htmlFor="exampleInputUsername">Username</label>
                <input type="text" className="form-control" id="exampleInputUsername" name="username" />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input name="password" type="text" className="form-control" id="exampleInputPassword1" />
            </div>
            <button  type='submit' style={{position:'relative'}}href="https://twitter.com/masuwa1018"  class="btn effect01" target="_blank">Sign Up</button>
        </form>
        </div>
        
    )
}