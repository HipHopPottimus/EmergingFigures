export async function fetchSvg(url){
    let result = await fetch(url);
    return await result.text();
}

export async function fetchServerVars(){
    let result = await fetch("/servervar");
    return await result.json();
}

export async function apiRequest(path, method, body){
    let result;
    try{
        let formData = body instanceof FormData;
        result = await fetch(path,{
            method,
            body: formData ? body : JSON.stringify(body),
            headers: !formData ? {"Content-Type": "application/json"} : undefined
        });
        if(result.headers.get("content-type").includes("application/json")){
            let json = await result.json();
            return json;
        }
        else{
            return result;
        }
    }
    catch(e){
        if(result){
            return {success: false, message: "HTTP error "+result.status};
        }
        else{
            return {success: false, message: e.message};
        }
    }
}