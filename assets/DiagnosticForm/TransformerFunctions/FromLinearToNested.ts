
const FromLinearToNested = (LinearInputs: object[]) => {

    let NestedInputs: any[] = [];
    let lastMaster = -1;
    LinearInputs.map((obj: any) => {
        const { id } = obj
        if (id[0] !== "2")
            NestedInputs.push(obj)
        else {
            const pozbackslash = id.indexOf("/")
            if (pozbackslash === -1) {
                const { value } = obj
                NestedInputs.push({ id: id, masterText: value, value: [] })
                lastMaster = NestedInputs.length - 1
            }
            else {
                const codChild = id.substr(pozbackslash + 1, id.length - pozbackslash - 1)
                const { value } = obj
                NestedInputs[lastMaster].value.push({ id: codChild, value: value })
            }
        }
    })
    return NestedInputs
}

export default FromLinearToNested