
const FromNestedToLinear = (input: any) => {
    let LinearResult:object[] = []
    input.map((obj: any) => {
        const { id } = obj
        if (id[0] !== "2")
            LinearResult.push(obj)
        else {
            const { masterText, value } = obj
            LinearResult.push({ id: id, value: masterText, childrenlen: value.length, IsUltimul: (value.length === 0 ? true : false) })
            value.map((inputs:any,index:number)=>{
                LinearResult.push({ id: id+ "/" + inputs.id, value: inputs.value, IsUltimul: (value.length-1 === index ? true : false) })
            })
        }
    })

    return LinearResult
}

export default FromNestedToLinear