"use client";
import Header from "@/app/_components/Header";
import {FormEvent, useEffect, useState} from "react";
import Link from "next/link";
import {StarIcon} from '@heroicons/react/24/solid'
import {service} from "@/graphql/API";
import {GetAgentsList} from "@/graphql/agents/GetAgentsList";



// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const Card = ({agent}) => {
    let tags = agent.tags
    if(agent.tags){
         tags = tags.split(',')
    }else{
        tags = []
    }
    return (
        <div className="w-100 bg-white h-50 rounded-xl shadow-md p-4">
            {/* 头部：头像 + 标题 + 右侧身份 */}
            <div className="flex justify-between items-start">
                <div className="flex items-center">
                    <img
                        src="https://p.ipic.vip/ytkqt7.png"
                        alt="avatar"
                        className="w-15 h-15 rounded-1"
                    />
                    <div className="ml-3 font-semibold text-lg">
                        {agent.agentname}
                        <div className="flex items-center mt-2">
                            <StarIcon className="w-3 h-3 text-yellow-400"/>
                            <span className="ml-1 text-sm text-gray-700">5.0 (评分)</span>
                        </div>
                    </div>
                </div>
                <span className="text-sm text-blue-600 bg-blue-100 rounded-xl pl-3 pr-3">{agent.description}</span>
            </div>


            {/* 标签组 */}
            <div className="flex flex-wrap gap-2 mt-3">
                {tags.map((tag:string) => (
                    <span
                        key={tag}
                        className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full"
                    >
            {tag}
          </span>
                ))}
            </div>

            {/* 底部：免费信息 & 按钮 */}
            <div className="flex justify-between items-center mt-10">
                <div className="flex items-center">
                    <span className="font-bold text-lg ">免费</span>
                    <button className="text-sm ml-2 text-blue-600 bg-blue-100 rounded-xl pl-3 pr-3">
                        免费使用
                    </button>
                </div>
                <button className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full">
                    基于链上的合约
                </button>
            </div>
        </div>
    )
}
export default function Agent() {
    const [searchVal, setSearchVal] = useState("")
    const handleChangeInput = (e: FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        setSearchVal(target.value)
    }
    const [agentList, setAgentList] = useState<object[]>([])
    useEffect(() => {
        service(GetAgentsList()).then((res: unknown) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setAgentList(res.data.getAgentsList)
        })
    }, []);
    return (
        <div className={"flex flex-col h-screen"}>
            <Header router={'agent'}/>
            <div className={"h-20  m-auto w-full   bg-gray-50 flex items-center justify-between"}>
                <div className={"w-2/3  m-auto"}>
                    <input className={"h-10 w-7/9 bg-white border-1 rounded-sm text-gray-500 border-gray-200 pl-10"}
                           value={searchVal} onInput={(e: FormEvent<HTMLInputElement>) => handleChangeInput(e)}
                           type="text"/>
                    <button
                        className={"flex-1 h-10 bg-blue-500 rounded-sm ml-3 text-white p-2 pl-4 pr-4 cursor-pointer active:bg-blue-600 hover:bg-blue-600"}>
                        <Link href='/agent/deploy'>
                            <span className={"text-sm"}>Upload Agent</span>
                        </Link>
                    </button>
                </div>

            </div>
            <div className={"flex-1 overflow-auto"}>

                <div
                    className="w-2/3 m-auto h-full  border-1 shadow-lg  bg-white/20   p-5  backdrop-blur-md  border-white ">
                    <h3 className={"font-bold"}>
                        All Agents
                    </h3>
                    <div className={"flex gap-2 grid grid-cols-2"}>


                    {
                        agentList.map(item => {
                            return <Card key={item.id} agent={item}/>
                        })
                    }
                    </div>
                </div>
            </div>

        </div>
    );
}
