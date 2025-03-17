import React from 'react'
import { Heading } from '../components/Heading'
import { Inputbox } from '../components/Inputbox'
import { BottomComponent } from '../components/Bottomcomponent'
import { Button } from '../components/Button'

export function Signin(){
    return (
    <div className="flex items-center justify-center min-h-screen bg-gray-300">
          <div className="bg-white shadow-lg p-6 rounded-xl text-center">
            <Heading heading={"Sign-in"}/>
            <Inputbox head={"email"} placeholder={"e-mail"}/>
            <Inputbox head={"password"} placeholder={"min-6 letter"}/>
            <Button label={"Submit"} onClick={() => {console.log("Signin successfull")}}/>
            <BottomComponent label={"Already have an account?"} buttontext={"signup"} changeto={"/signup"}/>
          </div>
      </div>
    )
}