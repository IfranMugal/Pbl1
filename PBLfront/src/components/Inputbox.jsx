import React from 'react'
export function Inputbox({head,placeholder}){
    return <div>
        <div className="text-sm font-medium text-left pt-6">{head}</div>
        <input placeholder={placeholder} className='w-full px-2 py-1 border rounded border-slate-200'></input>
    </div>
}