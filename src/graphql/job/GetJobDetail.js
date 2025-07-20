
const GetJobDetail = (jobid)=>{
    return `
    query GetJobDetail {
    getJobDetail(id: "${jobid}") {
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
    GetJobDetail
}
