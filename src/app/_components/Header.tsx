"use client";
import {useEffect, useState} from "react";
import Link from "next/link";

const HomeHeader = ({router}:{router:string}) => {
    const [routeActive,setRouteActive] = useState("")
   useEffect(()=>{
       setRouteActive(router)
   },[router])

    return (
        <div className={"w-full h-16 overflow-hidden bg-gray-50"}>
        <div className="w-5/6 m-auto   pt-2 pb-2 flex  items-center justify-between">
            <div className={"text-black b text-xl"}>𝒜𝓁𝒶𝒹𝒹𝒾𝓃</div>
            <div className={"flex gap-20 pt-3  pb-3 pl-10  pr-10 border-gray-300 rounded-3xl border-1   bg-white/20    backdrop-blur-md    backdrop-saturate-150"}>
                <span className="cursor-pointer bg-gradient-to-r text-black  bg-clip-textbg-gradient-to-r bg-clip-text b">
                    <span className={routeActive==='agent'?'text-blue-600':'text-black'}><Link href='/agent'>Agent</Link></span>
                </span>
                <span className="cursor-pointer bg-gradient-to-r text-black  bg-clip-textbg-gradient-to-r bg-clip-text b">
                  <span className={routeActive==='job'?'text-blue-600':'text-black'}><Link href='/job'>Jobs</Link></span>
                </span>
                <span className="cursor-pointer bg-gradient-to-r text-black  bg-clip-textbg-gradient-to-r bg-clip-text b">Wallet</span>
                <span className="cursor-pointer bg-gradient-to-r text-black  bg-clip-textbg-gradient-to-r bg-clip-text b">Dashboard</span>
                <span className="cursor-pointer bg-gradient-to-r text-black bg-clip-textbg-gradient-to-r bg-clip-text b">Bills</span>
                <span className="cursor-pointer bg-gradient-to-r text-black bg-clip-textbg-gradient-to-r bg-clip-text b">DAO</span>
            </div>
            <div  className={"text-white b text-xl"}>
                <button>waitlist</button>
            </div>
        </div>
        </div>
    )
}

export default HomeHeader
