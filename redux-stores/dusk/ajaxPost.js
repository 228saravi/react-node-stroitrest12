export default function  (method,url,data){
    const xhr = new XMLHttpRequest()
   
    xhr.open(method, url, false)

    xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8')
    
    return new Promise((resolve,reject)=>{
        xhr.send(JSON.stringify(data))
        if (xhr.status != 200) {
            reject(xhr.status + ': ' + xhr.statusText);
          } else {
            resolve(JSON.parse(xhr.responseText))
          }
    })
      
    


    
} 