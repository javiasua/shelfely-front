import React from 'react';
import { Redirect } from 'react-router-dom';

export default function SignIn(props){
    return (
        <div className='sign'>
            <form className='myDetail'onSubmit={props.onSignIn}>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input name="password" type="text" className="form-control" id="exampleInputPassword1" />
            </div>
            <button  type='submit' style={{position:'relative'}}href="https://twitter.com/masuwa1018"  class="btn effect01" target="_blank">Sign In</button>
        </form>
        </div>
    )
}