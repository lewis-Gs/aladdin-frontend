
const GetAgentsList = ()=>{
    return `
    query GetAgentsList {
     getAgentsList {
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
    GetAgentsList
}
