import React, { useEffect, useState } from "react";
import { service } from "@/graphql/API";
import { GetDistributeAgentsList } from "@/graphql/job/GetDistributeAgentsList";
import { useSearchParams } from "next/navigation";
import AgentCall from "@/app/_components/Chat";

// 1. Agent类型
interface Agent {
    id: string;
    agentname: string;
    agentaddress: string;
    status: "Assigned" | "Working";
    initial: string;
    iconBg: string;
}

const statusColorMap: Record<string, string> = {
    Assigned: "bg-yellow-50 text-yellow-600 border-yellow-200",
    Working: "bg-blue-50 text-blue-600 border-blue-200",
};

const statusIconMap: Record<string, JSX.Element> = {
    Assigned: (
        <span className="w-2 h-2 rounded-full bg-yellow-400 mr-1 inline-block" />
    ),
    Working: (
        <span className="w-2 h-2 rounded-full bg-blue-400 mr-1 inline-block" />
    ),
};

// 单次调用 agent 的子组件
function AgentCallPanel({
                            prompt,
                            agentAddress,
                        }: {
    prompt: string;
    agentAddress: string;
}) {
    // ...用你刚写的 fetch 调用即可，这里略
    return (
        <div className="mt-6 p-4 bg-gray-50 rounded-xl text-gray-700">
            <span className="text-sm">Prompt: {prompt}</span>
            <br />
            <span className="text-sm">Agent URL: {agentAddress}</span>
        </div>
    );
}

export default function AgentResults({ jobInfo }: { jobInfo: any }) {
    const [selected, setSelected] = useState(0);
    const searchParams = useSearchParams();
    const [agentsList, setAgentsList] = useState<Agent[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        service(GetDistributeAgentsList(searchParams.get("jobid"))).then((res) => {
            const data = res.data.getDistributeAgentsList || [];
            // 用实际后端数据补全 initial/status 字段，按你的需求合成
            const agents: Agent[] = data.map((item: any, idx: number) => ({
                ...item,
                status: "Assigned", // 或者根据 item 自己的状态决定
                initial: item.agentname?.[0]?.toUpperCase() || "A",
                iconBg: idx % 2 === 0 ? "bg-blue-600" : "bg-yellow-500",
            }));
            setAgentsList(agents);
            setLoading(false);
        });
    }, []);

    if (loading) return <div className="p-6">加载中...</div>;
    if (!agentsList.length) return <div className="p-6">暂无数据</div>;

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-2">
                <div className="text-lg font-semibold text-gray-700">
                    Agent Results <span className="text-sm text-gray-400">(0 completed)</span>
                </div>
                <button className="flex items-center text-blue-500 hover:underline text-sm">
                    <svg width="16" height="16" className="mr-1" fill="none" viewBox="0 0 24 24">
                        <path d="M17 1v6h6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7 23v-6H1" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M20.49 9A9 9 0 013.5 19M3.51 15A9 9 0 0120.5 5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Refresh
                </button>
            </div>
            <div className="bg-white/70 rounded-2xl shadow flex px-4 py-5 space-x-4">
                {agentsList.map((a, i) => (
                    <button
                        key={a.id}
                        className={`flex items-center px-5 py-4 rounded-xl border-2 bg-white min-w-[180px] transition
              ${selected === i ? "border-blue-400 shadow-md" : "border-transparent hover:border-blue-200"}`}
                        onClick={() => setSelected(i)}
                    >
                        <div className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full text-white text-xl font-bold mr-4 ${a.iconBg}`}>
                            {a.initial}
                        </div>
                        <div className="flex flex-col text-left">
                            <div className="font-medium text-gray-700">{a.agentname}</div>
                            <div className={`mt-1 flex items-center px-2 py-0.5 rounded text-xs font-medium border ${statusColorMap[a.status]}`}>
                                {statusIconMap[a.status]}
                                {a.status}
                            </div>
                        </div>
                    </button>
                ))}
            </div>
            {/* 防止 agentsList[selected] 为 undefined */}
            {agentsList[selected] && (
                <AgentCall
                    prompt={jobInfo.description}
                    agentAddress={agentsList[selected].agentaddress}
                />
            )}
        </div>
    );
}
