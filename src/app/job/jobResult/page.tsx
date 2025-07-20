"use client";
import React, {useEffect, useState} from 'react';
import { ArrowLeft, DollarSign, Users, CheckCircle, Star, Eye, FileText, BarChart3, MessageSquare } from 'lucide-react';
import Link from "next/link";
import {service} from "@/graphql/API";
import {GetJobDetail} from "@/graphql/job/GetJobDetail";
import { useSearchParams } from 'next/navigation';
import {GetDistributeAgentsList} from "@/graphql/job/GetDistributeAgentsList";
import AgentResults from "@/app/_components/AgentResults"; // 获取路径和参数


const JobDetailPage = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const searchParams = useSearchParams();
    const [jobInfo,setJobInfo]= useState({})
    const [agentsList,setAgentsList] = useState([])

    useEffect(() => {
        // console.log(GetJobDetail(searchParams.get("jobid")))
        service(GetJobDetail(searchParams.get("jobid"))).then(res=>{
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setJobInfo(res.data.getJobDetail)
        })
        service(GetDistributeAgentsList(searchParams.get("jobid"))).then(res=>{
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setAgentsList(res.data.getDistributeAgentsList)
        })

    }, []);

    const tabs = [
        { id: 'overview', label: 'Overview', icon: Eye },
        { id: 'agent-results', label: 'Agent Results', icon: FileText },
        { id: 'distribution', label: 'Distribution Chart', icon: BarChart3 },
        { id: 'feedback', label: 'Feedback', icon: MessageSquare }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <Link href='/job' className="flex items-center text-gray-600 hover:text-gray-800 transition-colors">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Job List
                    </Link>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center text-sm text-gray-600 bg-blue-100 px-3 py-1 rounded-full">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                            In Progress
                        </div>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                            <span className="mr-2">📤</span>
                            Share Results
                        </button>
                    </div>
                </div>

                {/* Title and Meta */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {jobInfo.jobtitle}
                    </h1>
                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                        <div className="flex items-center">
                            <span className="mr-2">📅</span>
                            Created: 2025/7/1
                        </div>
                        <div className="flex items-center">
                            <span className="mr-2">⏰</span>
                            Deadline: {jobInfo.deadline}
                        </div>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="border-b border-gray-200 mb-6">
                    <nav className="-mb-px flex space-x-8">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                                        activeTab === tab.id
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    <Icon className="w-4 h-4 mr-2" />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </nav>
                </div>
                {
                    activeTab==='overview' && (
                        <div>
                            {/* Stats Cards Row */}
                            <div className="grid grid-cols-4 gap-6 mb-8">
                                {/* Budget */}
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-gray-600 text-sm font-medium">Budget</span>
                                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                            <DollarSign className="w-5 h-5 text-blue-600" />
                                        </div>
                                    </div>
                                    <div className="text-3xl font-bold text-gray-900">${jobInfo.maxbudget}</div>
                                </div>

                                {/* Total Agents */}
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-gray-600 text-sm font-medium">Total Agents</span>
                                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                            <Users className="w-5 h-5 text-purple-600" />
                                        </div>
                                    </div>
                                    <div className="text-3xl font-bold text-gray-900">{agentsList.length}</div>
                                </div>

                                {/* Success Rate */}
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-gray-600 text-sm font-medium">Success Rate</span>
                                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                            <CheckCircle className="w-5 h-5 text-green-600" />
                                        </div>
                                    </div>
                                    <div className="text-3xl font-bold text-green-600">100%</div>
                                </div>

                                {/* Priority */}
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-gray-600 text-sm font-medium">Priority</span>
                                        <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                                            <Star className="w-5 h-5 text-yellow-600 fill-yellow-600" />
                                        </div>
                                    </div>
                                    <div className="text-3xl font-bold text-gray-900">Medium</div>
                                </div>
                            </div>

                            {/* Main Content - Two Columns */}
                            <div className="grid grid-cols-2 gap-8">
                                {/* Left Column - Job Details */}
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                                    <div className="p-6 border-b border-gray-100">
                                        <h2 className="text-xl font-bold text-gray-900">Job Details</h2>
                                    </div>
                                    <div className="p-6 space-y-6">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 font-medium">Category:</span>
                                            <span className="text-gray-900 font-medium">{jobInfo.tags}</span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span className="text-gray-600 font-medium">Skill Level:</span>
                                            <span className="text-gray-900 font-medium">{jobInfo.skilllevel}</span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span className="text-gray-600 font-medium">Payment Type:</span>
                                            <span className="text-gray-900 font-medium">Free</span>
                                        </div>

                                        <div>
                                            <div className="flex justify-between mb-3">
                                                <span className="text-gray-600 font-medium">Tags:{jobInfo.tags}</span>
                                            </div>
                                            <div className="flex gap-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    Image
                  </span>
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    Fun
                  </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column - Agent Statistics */}
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                                    <div className="p-6 border-b border-gray-100">
                                        <h2 className="text-xl font-bold text-gray-900">Agent Statistics</h2>
                                    </div>
                                    <div className="p-6 space-y-6">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600 font-medium">Completed:</span>
                                            <span className="text-3xl font-bold text-gray-900">{agentsList.length}</span>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600 font-medium">Failed:</span>
                                            <span className="text-3xl font-bold text-gray-900">0</span>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600 font-medium">Working:</span>
                                            <span className="text-3xl font-bold text-gray-900">{agentsList.length}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
                {
                    activeTab==='agent-results' && <AgentResults  jobInfo={jobInfo}/>
                }
            </div>
        </div>
    );
};

export default JobDetailPage;
