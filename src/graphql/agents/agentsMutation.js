import {toGraphQLInput} from "@/utils/toGraphQlInput";

const getSaveAgentsMutation = (val)=>{
    let obj =toGraphQLInput(val)
    return `
    mutation SaveAgent {
     saveAgent(input: {${obj}}) {
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
    getSaveAgentsMutation
}
