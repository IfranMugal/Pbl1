import React from 'react'
import { Heading } from '../components/Heading'
import { Inputbox } from '../components/Inputbox'
import { BottomComponent } from '../components/Bottomcomponent'

export function Signup(){
    return (
    <div className="flex items-center justify-center min-h-screen bg-gray-300">
            {console.log("signup rendered")}
          <div className="bg-white shadow-lg p-6 rounded-xl text-center">
            <Heading heading={"Sign-up"}/>
            <Inputbox head={"first name"} placeholder={"name"}/>
            <Inputbox head={"email"} placeholder={"e-mail"}/>
            <Inputbox head={"password"} placeholder={"min-6 letter"}/>
            <Button label={"Submit"} onClick={() => {console.log("Signup successfull")}}/>
            <BottomComponent label={"Already have an account?"} buttontext={"signin"} changeto={"/signin"}/>
          </div>
      </div>
    )
}