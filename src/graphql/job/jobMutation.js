import {toGraphQLInput} from "@/utils/toGraphQlInput";

const getSaveJobMutation = (val)=>{
    let obj =toGraphQLInput(val)
    return `
    mutation SaveJobs {
     saveJobs(input: {${obj}}) {
        allowbidding
        autoassign
        budget
        category
        createdat
        deadline
        deliverables
        description
        escrowenabled
        id
        ispublic
        jobtitle
        maxbudget
        paymentiype
        priority
        skilllevel
        status
        tags
        updatedat
        walletaddress
       }
    }
`
}
export {
    getSaveJobMutation
}
