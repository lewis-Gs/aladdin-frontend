import {useEffect, useState} from "react";

interface AgentCallProps {
    prompt: string;
    agentAddress: string; // 例如 "https://xxxx/api/agents/clashAgent/generate"
    onResult?: (result: string) => void;
}

export default function AgentCall({ prompt, agentAddress, onResult }: AgentCallProps) {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    async function fetchAgent() {
        setLoading(true);
        setError(null);
        setResult(null);
        try {
            const res = await fetch(agentAddress, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: [{ role: "user", content: prompt }],
                }),
            });

            if (!res.ok) throw new Error(`接口异常: ${res.status}`);

            const data = await res.json();
            // 这里你要按实际返回格式取结果，假设是 { text: "xxx" }
            const reply = data.text ?? "";
            setResult(reply);
            onResult?.(reply);
        } catch (e) {
            setError((e as Error).message);
            setResult("");
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchAgent()
    }, []);
    return (
        <div>
            <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={fetchAgent}
                disabled={loading}
            >
                {loading ? "请求中…" : "发送"}
            </button>
            <div className="mt-2 text-gray-700">
                {error && <span className="text-red-500">{error}</span>}
                {result && <span>{result}</span>}
            </div>
        </div>
    );
}
