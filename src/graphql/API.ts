const service = (query: string)=>{
    return new Promise((resolve, reject)=>{
        fetch('http://localhost:3001/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: query
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log('返回数据：', data);
                resolve(data);
            })
            .catch(error => {
                console.error('请求错误：', error);
                reject(error);
            });
    })
}
export {
    service
}
