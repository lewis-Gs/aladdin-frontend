"use client";
import Header from "@/app/_components/Header";
import {useState} from "react";
import {service} from "@/graphql/API";
import {getSaveAgentsMutation} from "@/graphql/agents/agentsMutation";
import { useRouter } from 'next/navigation';



export default function Deploy() {
    const Router = useRouter()
    const AGENT_CLASSIFICATIONS:string[] = [
        "Data Analysis",
        "Automation",
        "AI Assistant",
        "Integration",
        "Other",
    ];

    const [agentName, setAgentName] = useState<string>("");
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState<string>("");
    const [autoAccept, setAutoAccept] = useState<boolean>(true);
    const [classification, setClassification] = useState<string>("");
    const [agentAddress, setAgentAddress] = useState<string>("");
    const [briefDescription, setBriefDescription] = useState<string>("");
    const [authorBio, setAuthorBio] = useState<string>("");
    // const [isFree, setIsFree] = useState<boolean>(true);

    const handleAddTag = () => {
        if (
            tagInput.trim() &&
            !tags.includes(tagInput.trim())
        ) {
            setTags([...tags, tagInput.trim()]);
            setTagInput("");
        }
    };

    const handleTagInputKeyDown = (e: { key: string; preventDefault: () => void; }) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleAddTag();
        }
    };

    const handleRemoveTag = (tag: string) => {
        setTags(tags.filter((t) => t !== tag));
    };

    const handleReset = () => {
        setAgentName("");
        setTags([]);
        setTagInput("");
        setAutoAccept(true);
        setClassification("");
        setAgentAddress("");
        setBriefDescription("");
        setAuthorBio("");
        // setIsFree(true);
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const obj = {
            id:`agent${Math.random()}`,
            agentname:agentName,
            tags:tags.toString(),
            autoacceptjobs:autoAccept,
            agentclassification:classification,
            agentaddress:agentAddress,
            description:briefDescription,
            authorbio:authorBio,
            // isFree,
        }
        service(getSaveAgentsMutation(obj)).then(res=>{
            console.log(res);
            alert('保存成功')
            Router.push('/agent')
            // if()

        })
        // 提交逻辑
    }
    return (
        <div>
            <Header router={''}/>
            <div className={"w-3/6 mt-6   rounded-3xl m-auto border-1 shadow-lg pl-6 pt-8 pb-10 pr-6  bg-white/20    backdrop-blur-md    backdrop-saturate-150 border-gray-100"}>
            <div className={"text-2xl font-bold"}>Deploy Agent Based on Aladdin Protocol</div>
            <div className="mx-auto  py-8 my-8 backdrop-blur-lg">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Agent Name */}
                        <div className={"flex items-center justify-between"}>
                            <label className="block text-sm font-medium text-gray-700 mb-1 w-40">
                                Agent Name
                            </label>
                            <input
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                                value={agentName}
                                onChange={(e) => setAgentName(e.target.value)}
                                placeholder="Enter Agent name"
                            />
                        </div>

                        {/* Tags */}
                        <div className="ml-40  flex flex-wrap gap-2">
                            {tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
                                >
                {tag}
                                    <button
                                        type="button"
                                        className="ml-1 text-blue-400 hover:text-red-400"
                                        onClick={() => handleRemoveTag(tag)}
                                        title="Remove"
                                    >
                  ×
                </button>
              </span>
                            ))}
                        </div>
                        <div className={"flex items-center justify-between"}>
                            <label className="block text-sm font-medium text-gray-700 mb-1 w-40">
                                Tags
                            </label>
                            <div className="flex gap-2 flex-1">
                                <input
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                                    placeholder="Enter tags and press Enter to add, e.g.: data analysis, automation, AI assistant"
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyDown={handleTagInputKeyDown}
                                />
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-100 text-black rounded-3xl border-2 border-white hover:bg-gray-200"
                                    onClick={handleAddTag}
                                >
                                    +
                                </button>
                            </div>

                        </div>
                        {/* Auto Accept Jobs */}
                        <div className="flex items-center gap-11">
                            <span className="text-sm font-medium text-gray-700">Auto Accept Jobs</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={autoAccept}
                                    onChange={() => setAutoAccept((v) => !v)}
                                    className="sr-only peer"
                                />
                                <div className={`w-11 h-6 bg-gray-200 rounded-full peer-focus:ring-2 peer-focus:ring-blue-400 transition-colors duration-300 ${autoAccept ? '!bg-blue-500' : ''}`}></div>
                                <div className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${autoAccept ? 'translate-x-5' : ''}`}></div>
                            </label>
                        </div>
                        {/* Agent Classification */}
                        <div className={"flex items-center justify-between"}>
                            <label className="block text-sm font-medium text-gray-700 mb-1 w-40">
                                Agent Classification
                            </label>
                            <select
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                                value={classification}
                                onChange={(e) => setClassification(e.target.value)}
                            >
                                <option value="">Select Agent classification</option>
                                {AGENT_CLASSIFICATIONS.map((cls) => (
                                    <option value={cls} key={cls}>
                                        {cls}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* Agent Address */}
                        <div className={"flex items-center justify-between"}>
                            <label className="block text-sm font-medium text-gray-700 mb-1 w-40">
                                Agent Address
                            </label>
                            <div className="flex flex-1 gap-2">
                                <input
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                                    value={agentAddress}
                                    onChange={(e) => setAgentAddress(e.target.value)}
                                    placeholder="Enter Agent address (e.g., https://api.example.com)"
                                />
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-100 text-blue-600 border-1 border-white rounded-lg hover:bg-gray-200"
                                    tabIndex={-1}
                                >
                                    View API Call Example
                                </button>
                            </div>
                        </div>
                        {/* Brief Description */}
                        <div className={"flex items-center justify-between"}>
                            <label className="block text-sm font-medium text-gray-700 mb-1 w-40">
                                Brief Description
                            </label>
                            <textarea
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-400 outline-none"
                                rows={2}
                                value={briefDescription}
                                onChange={(e) => setBriefDescription(e.target.value)}
                                placeholder="Briefly describe the functionality of this Agent"
                            />
                        </div>
                        {/* Author Bio */}
                        <div className={"flex items-center justify-between"}>
                            <label className="block text-sm font-medium text-gray-700 mb-1 w-40">
                                Author Bio
                            </label>
                            <textarea
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-400 outline-none"
                                rows={3}
                                value={authorBio}
                                onChange={(e) => setAuthorBio(e.target.value)}
                                placeholder="Introduce your professional background, skills, or team experience, e.g.: 3 years of AI development experience, specializing in natural language processing..."
                            />
                        </div>
                        {/* Is Free */}
                        {/*<div className="flex items-center">*/}
                        {/*    <span className="text-sm font-medium text-gray-700 w-40">Is Free</span>*/}
                        {/*    <label className="relative inline-flex items-center cursor-pointer">*/}
                        {/*        <input*/}
                        {/*            type="checkbox"*/}
                        {/*            checked={isFree}*/}
                        {/*            onChange={() => setIsFree((v) => !v)}*/}
                        {/*            className="sr-only peer"*/}
                        {/*        />*/}
                        {/*        <div className={`w-11 h-6 bg-gray-200 rounded-full peer-focus:ring-2 peer-focus:ring-blue-400 transition-colors duration-300 ${isFree ? '!bg-blue-500' : ''}`}></div>*/}
                        {/*        <div className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${isFree ? 'translate-x-5' : ''}`}></div>*/}
                        {/*    </label>*/}
                        {/*</div>*/}
                        {/* Actions */}
                        <div className="flex justify-between pt-6 border-t border-gray-300">
                            <button
                                type="button"
                                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                                onClick={handleReset}
                            >
                                Reset
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-1"
                            >
                                Deploy <span className="text-lg">→</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
