import React, { useState, useEffect, useRef } from "react";

export const User = (props) => {
    return (props.username !== "no user") && (
        <div className="container rounded shadow bg-light mb-4">
            <div className="row justify-content-center">
                <div className="col d-flex justify-content-center ">
                    <h2>User : {props.username}</h2>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col d-flex justify-content-center">
                    <h3>Actual Balance: {props.actual_balance}</h3>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col d-flex justify-content-center">
                    <h3>
                        Total Balance: {props.total_balance}
                    </h3>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col d-flex justify-content-center">
                    <h3>
                        Pending debit: {props.pendent}
                    </h3>
                </div>
            </div>
        </div>
    )
}