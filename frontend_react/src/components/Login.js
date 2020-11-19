import React, { useState, useEffect, useRef } from "react";
import {Redirect} from "react-router-dom"

// const host = process.env.HOST
// const port = process.env.PORT

export const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [status, setStatus] = useState({
        "user":true,
        "password":true,
        "token":false
    })
    const [redirect,setRedirect] = useState(false)

    const handleSubmit = async (e) =>{

        e.preventDefault()
        const response = await fetch(`http://localhost:7474/api/getToken`,{
        // const response = await fetch(`http://${host}:${port}/api/getToken`,{
        method:"GET",
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Basic"+" "+window.btoa(`${email}:${password}`),
            }
        })
        const response_ = await response.json()
        if (response_.token===undefined){
            const wrong = response_.message.includes("password") ?"password" :"user"
            setStatus({...status, "token":false, [wrong]:false})
            return
        }
        
        try{
            sessionStorage.setItem("access_token",response_["token"])
            setStatus({"token":true,"user":true,"password":true})
        }catch (error){
            console.log(error)
        }
    }

    useEffect(() => {
        if (status["token"]&&status["user"]&&status["password"]){
            setRedirect(true)
        }
    },[status])
    
    return redirect ?<Redirect to="/" /> :(<div className="container-fluid">
    <div className="row justify-content-center">
        <div className="col-4 pt-3 d-flex justify-content-center">
            <h1>LOGIN</h1>
        </div>
    </div>
    <div className="row justify-content-center">
        <div className="col-4 p-4">
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" 
                    className="form-control" 
                    onChange={(e) => {setEmail(e.target.value)}}
                    value={email} 
                    id="email" 
                    aria-describedby="emailHelp" />
                    
                    {!status["user"]&&(
                            <small 
                            id="emailHelp" 
                            className="form-text text-danger">
                               Email Doesn´t exist
                            </small>)}
                 </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" 
                    className="form-control"
                    onChange={(e) => {setPassword(e.target.value)}}
                    value={password}
                    id="password" />

                    {!status["password"]&&(
                        <small 
                            id="passwordHelp" 
                            value={password}
                            className="form-text text-danger">
                                Incorrect Password 
                        </small>)
                            }
                </div>
                
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </div>
    </div>
</div>
    )
}