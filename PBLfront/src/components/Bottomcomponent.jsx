import React from "react";
import { Link } from "react-router-dom";
//Link is provided by react-router-dom that helps us to navigate from one page to another
//without using button
export function BottomComponent({label,buttontext,changeto}){
    return <div className="py-2 text-sm flex justify-center">
        <div>
            {label}
        </div>
        
        <Link className="pointer underline pl-1 cursor-pointer" to={changeto}>{buttontext}</Link>
    </div>
}