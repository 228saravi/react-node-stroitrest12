export default function  (method,url,data){
    const xhr = new XMLHttpRequest()

    xhr.open(method, url, false)

    xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8')
    //try {
        xhr.onerror = function () {
            console.log("** An error occurred during the transaction");
          };
        xhr.send(JSON.stringify(data))
    // } catch (error) {
    //     return new Promise((resolve,reject)=>{
    //             reject(error);

    //     })
    // }
    


    return new Promise((resolve,reject)=>{
        if (xhr.status != 200) {
            reject(xhr.status + ': ' + xhr.statusText);
          } else {
            resolve(JSON.parse(xhr.responseText))
          }
    })
} 