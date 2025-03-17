import React from "react";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";
import { SoundBar } from "./Soundbar";

export function Classcomp({ c , x}) {
    const navigate = useNavigate();

    return (
        <>
        <div className="shadow h-14 flex justify-between items-center p-4 overflow-hidden"> {/* Added items-center and overflow-hidden */}
            <div className="flex items-center"> {/* Added items-center for vertical alignment */}
                <div className="rounded-full h-12 w-12 bg-blue-500 flex justify-center items-center mt-1 mr-2"> {/* Added items-center for vertical alignment */}
                    <div className="text-xl text-white">
                        {c[c.length - 1]}
                    </div>
                </div>
                <div className="flex flex-col justify-center h-full ml-4">
                    {c}
                </div>
            </div>
            <div className="flex flex-col justify-center h-full">
                <Button label={"Alert the class"} onClick={() => { console.log(`Alert has been sent to class ${c}`); }} />
            </div>
        </div>

        <div className="flex justify-start w-3/5 mx-auto py-4"> 
            <SoundBar x={x}/>
        </div>
        </>
    );
}