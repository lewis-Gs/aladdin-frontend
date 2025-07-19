"use client";
import Header from "@/app/_components/Header";
import {FormEvent, useEffect, useState} from "react";
import Link from "next/link";
import {service} from "@/graphql/API";
import { CalendarIcon } from '@heroicons/react/24/outline'
import {GetJobsList} from "@/graphql/job/GetJobsList";
function isExpired(isoDateStr: string | number | Date) {
    const targetTime = new Date(isoDateStr).getTime()
    if (isNaN(targetTime)) {
        throw new Error('Invalid date string: ' + isoDateStr)
    }
    return Date.now() > targetTime
}
function formatToYYYYMMDD(isoDateStr: string | number | Date) {
    const date = new Date(isoDateStr)
    if (isNaN(date.getTime())) {
        throw new Error('Invalid ISO date string: ' + isoDateStr)
    }
    const year  = date.getUTCFullYear()
    const month = String(date.getUTCMonth() + 1).padStart(2, '0')
    const day   = String(date.getUTCDate()).padStart(2, '0')
    return `${year}${month}${day}`
}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const Card = ({job}) => {
    let tags = job.tags
    if(job.tags){
        tags = tags.split(',')
    }else{
        tags = []
    }
    return (
        <div className="relative max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6">
            {/* 右上角状态 */}
            <div className="absolute top-4 right-4 flex space-x-2">
      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded">
        Urgent
      </span>
                <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded">
        Public
      </span>
            </div>

            {/* 头部 */}
            <div className="flex items-center space-x-4">
                <div className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-600 font-bold rounded-full">
                    0
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">{job.jobtitle}</h2>
                    <div className="mt-1 flex items-center space-x-2 text-sm text-gray-500">
                        <span>0x1234...cdef</span>
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded">{job.category}
          </span>
                    </div>
                </div>
            </div>

            {/* 状态标签 & 日期 */}
            <div className="mt-4 flex items-center space-x-3 text-sm">
                <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded">{isExpired(job.deadline)?'Expired':'open'}</span>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded">{job.priority}</span>
                <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded">{job.skilllevel}</span>
                <div className="ml-auto flex items-center text-gray-500">
                    <CalendarIcon className="w-4 h-4 mr-1" />
                    <span>{formatToYYYYMMDD(job.deadline)}</span>
                </div>
            </div>

            {/* 描述 */}
            <p className="mt-4 text-gray-700 leading-relaxed">
                {job.description}
            </p>

            {/* 标签 & 托管状态 */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
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
                <span className="ml-auto px-2 py-1 bg-blue-100 text-blue-800 rounded">
        Escrow protected
      </span>
            </div>

            {/* 底部价格 & 创建时间 */}
            <div className="mt-6 flex items-center justify-between">
                <span className="text-xl font-semibold text-gray-800">{`$${job.budget.min} - $${job.budget.max}`} USDT </span>
                <span className="text-sm text-gray-500">Created Jun 27, 2025</span>
            </div>
        </div>
    )
}
export default function Job() {
    const [searchVal, setSearchVal] = useState("")
    const handleChangeInput = (e: FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        setSearchVal(target.value)
    }
    const [jobList, setjobList] = useState<object[]>([])
    useEffect(() => {
        service(GetJobsList()).then((res: unknown) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setjobList(res.data.getJobsList)
        })
    }, []);
    return (
        <div className={"flex flex-col h-screen"}>
            <Header router={'job'}/>
            <div className={"h-20  m-auto w-full   bg-gray-50 flex items-center justify-between"}>
                <div className={"w-2/3  m-auto"}>
                    <input className={"h-10 w-7/9 bg-white border-1 rounded-sm text-gray-500 border-gray-200 pl-10"}
                           value={searchVal} onInput={(e: FormEvent<HTMLInputElement>) => handleChangeInput(e)}
                           type="text"/>
                    <button
                        className={"flex-1 h-10 bg-blue-500 rounded-sm ml-3 text-white p-2 pl-4 pr-4 cursor-pointer active:bg-blue-600 hover:bg-blue-600"}>
                        <Link href='/job/deploy'>
                            <span className={"text-sm"}>Upload Job</span>
                        </Link>
                    </button>
                </div>

            </div>
            <div className={"flex-1 overflow-auto"}>

                <div
                    className="w-2/3 m-auto h-full  border-1 shadow-lg  bg-white/20   p-5  backdrop-blur-md  border-white ">
                    <h3 className={"font-bold"}>
                        All Jobs
                    </h3>
                    <div className={"flex gap-2 grid grid-cols-2"}>
                        {
                            jobList.map(item => {
                                return <Card key={item.id} job={item}/>
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
