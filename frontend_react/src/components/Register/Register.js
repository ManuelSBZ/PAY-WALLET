import React, { useState, useEffect, useRef } from "react";
import {Redirect} from "react-router-dom"

// const host = process.env.HOST
// const port = process.env.PORT

export const Register = () => {
    const [name, setName] = useState("")
    const [lastname, setLastname] = useState("")
    const [id_document, setDocumentId] = useState("")
    const [email, setEmail] = useState("")
    const [telephone, setTelephone] = useState("")
    const [password, setPassword] = useState("")
    // const [status, setStatus] = useState(false)
    const [statusRes, setStatusRes]= useState({"error":"","created":""})
    const [error, setError] = useState(false)
    const [repeated, setRepeated] = useState({
        id_document:false,
        telephone:false,
        email:false,
        password:false
    })
    const handleSubmit = async (e) =>{

        e.preventDefault()
        const response = await fetch(`http://localhost:7474/api/register/user`,{
        // const response = await fetch(`http://${host}:${port}/api/register/user`,{

        method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                lastname,
                id_document,
                telephone,
                email,
                password
            }
            )
        })
        const response_ = await response.json()
        setStatusRes(response_)
        if (response_.created){
            console.log(statusRes)
            alert("User created") 
        }else{
            setError(!error)
        }
    }
    useEffect(() => {
        let newRepeated = {}
        for(let key in repeated){
            console.log(`statusRes.error.includes(${key}):${statusRes.error.includes(key)}`)
            newRepeated[key] = statusRes.error.includes(key) ? true : false            
    }
    setRepeated(newRepeated)
    },[error])
    return statusRes.created ?(<Redirect to="/login/user"/>) :(
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-4 pt-3 d-flex justify-content-center">
                    <h1>REGISTER</h1>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-4 p-4">
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" 
                            className="form-control" 
                            value={name} 
                            onChange={(e) => {setName(e.target.value)}}
                            vale={name} 
                            id="name" 
                            aria-describedby="emailHelp" 
                            
                            autoFocus
                            />
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="lastname">Lastname</label>
                            <input type="text" 
                            className="form-control" 
                            onChange={(e) => {setLastname(e.target.value)}}
                            value={lastname} 
                            id="lastname" 
                            aria-describedby="emailHelp" 
                            
                            />
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="id_document">ID document</label>
                            <input type="number" 
                            className="form-control" 
                            id="id_document" 
                            onChange={(e) => {setDocumentId(e.target.value)}} 
                            value = {id_document}
                            aria-describedby="documentidHelp" 
                            />{
                            repeated["id_document"]&&(
                            <small 
                            id="documentidHelp" 
                            className="form-text text-danger">
                                Id document alredy exist
                            </small>)
}
                        </div>
                        <div className="form-group">
                            <label htmlFor="telephone">Telephone</label>
                            <input type="number" 
                            className="form-control" 
                            onChange={(e) => {setTelephone(e.target.value)}} 
                            value={telephone}
                            id="telephone" 
                            aria-describedby="telephoneHelp" 
                            />
                            {
                            repeated["telephone"]&&(
                            <small 
                            id="telephoneHelp" 
                            className="form-text text-danger">
                                telephone alredy exist
                            </small>)
}
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input type="email" 
                            className="form-control" 
                            onChange={(e) => {setEmail(e.target.value)}}
                            value={email} 
                            id="email" 
                            aria-describedby="emailHelp" />
                            {repeated["email"]&&(
                            <small 
                            id="emailHelp" 
                            className="form-text text-danger">
                                Email alredy exist
                            </small>)}
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" 
                            className="form-control"
                            onChange={(e) => {setPassword(e.target.value)}}
                            id="password" />
                            {repeated["password"]&&(
                            <small 
                            id="passwordHelp" 
                            value={password}
                            className="form-text text-danger">
                                Password alredy exist
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