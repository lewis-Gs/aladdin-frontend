
const GetJobsList = ()=>{
    return `
    query GetJobsList {
     getJobsList {
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
    GetJobsList
}
