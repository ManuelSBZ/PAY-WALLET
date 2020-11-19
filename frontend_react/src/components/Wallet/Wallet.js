import { User } from "./User";
import React, { useState, useEffect, useRef } from "react";
import { Redirect } from "react-router-dom"


// const host = process.env.HOST
// const port = process.env.PORT


export const Wallet = () => {
    const [logged, setLogged] = useState(true)
    const [error, setError] = useState({
        sendmoney: false,
        sendtoken: false
    })
    const [loading, setLoading] = useState({
        sendmoney:false,
        sendtoken:false
    })
    const [message, setMessage] = useState({
        sendmoney:"",
        sendtoken:""
    })
    const [deposit, setDeposit] = useState("")
    const [sendmoney, setSendMoney] = useState("")
    const [sendtoken, setSendToken] = useState("")
    const [updateBalance, setUpdateBalance] = useState(true)
    const [balance, setBalance] = useState({
        "current_funds": 0,
        "available_founds": 0,
        "preorders_doubt": 0,
        "username": "no user"
    })
    const [updateErrors, setUpdateErrors] = useState(true)
    const [logout, setLogout] = useState(false)
    useEffect(() => {
        if (sessionStorage.getItem("access_token") === null) {
            setLogged(false)
        }
        else {
            setLogged(true)
            const balancaRequest = async () => {
                const request = await fetch(`http://localhost:7474/api/user/funds`, {
                // const request = await fetch(`http://${host}:${port}/api/user/funds`, {

                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-tokens": window.sessionStorage.getItem("access_token")
                    },
                    body: JSON.stringify({ "foo": "1" })

                })
                const response = await request.json()
                const username = JSON.parse(atob(sessionStorage.getItem("access_token").split(".")[1])).email
                setBalance({ ...response, "username": username })
            }
            balancaRequest()

        }
    }, [updateBalance])
    useEffect(()=>{
        if(sessionStorage.getItem("access_token")!=null){
        let session = atob(sessionStorage.getItem("access_token").split(".")[1])
        let date = new Date(session.exp*1000)
        let now = new Date(Date.now()*1000)
        if (now > date || logout){
            sessionStorage.removeItem("access_token")
            setLogged(false)
        }
    }},[deposit,sendmoney,sendtoken,balance,updateErrors,error])

    useEffect(() => {

    }, [updateErrors])
    const Ondeposit = async (e) => {
        e.preventDefault()
        if (deposit > 0) {
            const request = await fetch(`http://localhost:7474/api/fill/wallet`, {
            // const request = await fetch(`http://${host}:${port}/api/fill/wallet`, {

                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-tokens": window.sessionStorage.getItem("access_token")
                },
                body: JSON.stringify({
                    "amount": deposit
                })

            })
            setUpdateBalance(!updateBalance)
            setDeposit("")
        }

    }


    const OnSendmoney = async (e) => {
        e.preventDefault()
        setMessage({...message, sendmoney:""})
        setLoading({...loading, sendmoney:true})

        if (sendmoney > 0) {
            const request = await fetch(`http://localhost:7474/api/create/purchase/order`, {
            // const request = await fetch(`http://${host}:${port}/api/create/purchase/order`, {

            method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-tokens": window.sessionStorage.getItem("access_token")
                },
                body: JSON.stringify({
                    "total_amount": sendmoney
                })
            })
            const response = await request.json()

            if ("message" in response) {
                setUpdateBalance(!updateBalance)
                setMessage({...message, sendmoney:"Transaction succesfully"})
                setSendMoney("")
                setLoading({...loading, sendmoney:false})
                setError({...error, sendmoney:false})
            } else {
                let message_ = "error" in response ? response.error : "Something went wrong"
                setMessage({...message, sendmoney:message_})
                setError({ sendtoken:false, sendmoney: true })
                setLoading({...loading, sendmoney:false})
                setUpdateErrors(!updateErrors)
            }
        }

    }
    const onSendToken = async (e) => {
        e.preventDefault()
        setLoading({...loading, sendtoken:true})
        setMessage({...message, sendtoken:""})
        if (sendtoken.length === 6) {
            const request = await fetch(`http://localhost:7474/api/confirm/purchase`, {
            // const request = await fetch(`http://${host}:${port}/api/confirm/purchase`, {

                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-tokens": window.sessionStorage.getItem("access_token")
                },
                body: JSON.stringify({
                    "purchase_token": sendtoken
                })
            })
            const response = await request.json()
            setLoading(true)
            if ("message" in response) {
                setUpdateBalance(!updateBalance)
                setSendToken("")
                setMessage({...message, sendtoken:"Transaction completed"})
                setLoading({...loading, sendtoken:false})                
                setError({...error, sendtoken:false})
            } else {
                let message_ = "error" in response ? response.error : "Something went wrong"
                setMessage({...message, sendtoken:message_})
                setError({ sendtoken:true, sendmoney: false  })
                setLoading({...loading, sendtoken:false})                
                setUpdateErrors(!updateErrors)
            }
        }
        else{
            setLoading({...loading, sendtoken:false})
            setLoading({...loading, sendtoken:false})                
            setMessage({...message,sendtoken:"Token must be 6 digit"})
        }
    }
    return !logged ? <Redirect to="/login/user/" /> : (
        <div className="container-fluid pt-5">
            <div className="row justify-content-center">
                <div className="col d-flex justify-content-center">
                    <User
                        username={balance.username}
                        actual_balance={balance.available_founds}
                        total_balance={balance.current_funds}
                        pendent={balance.preorders_doubt}
                    />
                </div>
            </div>
            <div className="row justify-content-between align-items-start">
                <div className="col d-flex justify-content-center">
                    <form onSubmit={(e) => Ondeposit(e)} className="form-inline">
                        <label className="sr-only" htmlFor="inlineFormInputName2">Name</label>
                        <input  type="number" 
                            min={0} 
                            oninput="validity.valid||(value='');"
                            onChange={(e) => setDeposit(e.target.value)}
                            value={deposit}
                            className="form-control mb-2 mr-sm-2"
                            id="inlineFormInputName2"
                            placeholder="Deposit" />
                        <label className="sr-only" htmlFor="inlineFormInputGroupUsername2">Username</label>
                        <button type="submit" className="btn btn-primary mb-2">Submit</button>
                    </form>
                </div>

                <div className="col d-flex justify-content-center">
                    <div className="container-fluid justify-content-center">
                        <div className="row justify-content-center">
                            <div className="col d-flex justify-content-center">
                                <form onSubmit={(e) => OnSendmoney(e)} className="form-inline">
                                    <label className="sr-only" htmlFor="inlineFormInputName2">Name</label>
                                    <input type="number"
                                
                                    min={0} 
                                    max={balance.available_founds}
                                    width="100%"
                                    oninput="validity.valid||(value='');"
                                        className="form-control mb-2 mr-sm-2"
                                        onChange={(e) => setSendMoney(e.target.value)}
                                        value={sendmoney}
                                        id="inlineFormInputName2"
                                        placeholder="Send Money"
                                        aria-describedby="sendmonwyHelp" />
                                    <label className="sr-only" htmlFor="inlineFormInputGroupUsername2">Username</label>
                                    <button type="submit" className="btn btn-primary mb-2">Submit</button>
                                </form>
                            </div>
                        </div>
                        <div className="row justify-content-center pb-3 pr-3">
                            <div className="col d-flex justify-content-center">
                                {
                                    loading.sendmoney ?(<div class="spinner-border" role="status">
                                    <span class="sr-only">Loading...</span>
                                  </div>):(
                                    <small
                                        id="sendmoneyHelp"
                                        className="form-text text-danger">
                                        {message.sendmoney}
                                    </small>)
                                }
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col d-flex justify-content-center">
                                <form onSubmit={(e) => onSendToken(e)} className="form-inline">
                                    <label className="sr-only" htmlFor="inlineFormInputName2">Name</label>
                                    <input type="text" 
                                        className="form-control mb-2 mr-sm-2"
                                        onChange={(e) => setSendToken(e.target.value)}
                                        value={sendtoken}
                                        id="inlineFormInputName2"
                                        placeholder="Send Token Purchase"
                                        aria-describedby="senTokenHelp" />
                                    <label className="sr-only" htmlFor="inlineFormInputGroupUsername2">Username</label>
                                    <button type="submit" className="btn btn-primary mb-2">Submit</button>
                                </form>
                            </div>
                        </div>
                        <div className="row justify-content-center pb-3 pr-3">
                            <div className="col d-flex justify-content-center">
                                    {
                                    loading.sendtoken ?(<div class="spinner-border" role="status">
                                    <span class="sr-only">Loading...</span>
                                  </div>):(
                                    <small
                                        id="sendtokenHelp"
                                        className="form-text text-danger">
                                        {message.sendtoken}
                                    </small>)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}