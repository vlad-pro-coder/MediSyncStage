const ConvertTimeToString = () =>{
    let currTime = new Date()
    const year = currTime.getFullYear().toString();
    const month = (currTime.getMonth()+1<10?'0'+(currTime.getMonth()+1):(currTime.getMonth()+1).toString());
    const day = currTime.getDate()<10?'0'+currTime.getDate():currTime.getDate().toString();

    const hour = currTime.getHours()<10?'0'+currTime.getHours():currTime.getHours().toString();
    const minute = currTime.getMinutes()<10?'0'+currTime.getMinutes():currTime.getMinutes().toString();
    const second = currTime.getSeconds()<10?'0'+currTime.getSeconds():currTime.getSeconds().toString();

    const key = `${year}${month}${day}${hour}${minute}${second}`;
    return key
}

export default ConvertTimeToString