export default function  (method,url,data){
    const xhr = new XMLHttpRequest()

    xhr.open(method, url, false)

    xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8')
    xhr.send(JSON.stringify(data))

    console.log('----AJAX',xhr)

    return new Promise((resolve,reject)=>{
        if (xhr.status != 200) {
            reject(xhr.status + ': ' + xhr.statusText);
          } else {
            resolve(JSON.parse(xhr.responseText))
          }
    })
} 