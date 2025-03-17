import React from "react";

export function Dashboardtop() {
    return (
        <div className="shadow h-14 bg-blue-400 flex justify-between">
            {/* Class Monitoring with bold and large text */}
            <div className="flex flex-col justify-center h-full ml-4 text-2xl font-bold">
                Class Monitoring
            </div>

            <div className="flex">
                <div className="flex flex-col justify-center h-full mr-4 text-lg">
                    Admin
                </div>
                {/* Rounded component with color */}
                <div className="rounded-full h-12 w-12 bg-green-500 flex justify-center mt-1 mr-2"> {/* Changed to green */}
                    <div className="flex flex-col justify-center h-full text-xl text-white"> {/* Changed text color to white for contrast */}
                        A
                    </div>
                </div>
            </div>
        </div>
    );
}
