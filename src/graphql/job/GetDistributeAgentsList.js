
const GetDistributeAgentsList = (jobid)=>{
    return `
    query GetDistributeAgentsList {
    getDistributeAgentsList(id: "${jobid}") {
        agentaddress
        agentclassification
        agentname
        authorbio
        autoacceptjobs
        contracttype
        createdat
        description
        id
        isactive
        isprivate
        price
        reputation
        successrate
        tags
        totaljobscompleted
        updatedat
        walletaddress
    }
}

`
}
export {
    GetDistributeAgentsList
}
