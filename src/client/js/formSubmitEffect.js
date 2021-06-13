function dynamicReRenderInterface (payload) {
    document.getElementById("text").innerHTML = `Text - ${payload.text}`;
    document.getElementById("agreement").innerHTML = `Agreement - ${payload.agreement}`;
    document.getElementById("subjectivity").innerHTML = `Subjectivity - ${payload.subjectivity}`;
    document.getElementById("confidence").innerHTML = `Confidence - ${payload.confidence}`;
    document.getElementById("scoreTag").innerHTML = `Score Tag - ${payload.score_tag}`;
}

function validateURL(url) {
    if (!url || url.length < 1) return 'Please provide the URL';

    let regex = /^(ftp|http|https):\/\/[^ "]+$/;
     
    if(!regex.test(url)) return 'Please provide valid URL';
}

async function formSubmit (event) {
    event.preventDefault()

    // check what text was put into the form field
    let reqUrl = document.getElementById('url').value;

    let urlValidate = validateURL(reqUrl);

    if(urlValidate) {
        alert(urlValidate);
    } else {
        let req_payload = {
            url: reqUrl,
        }
    
        let loader_dom_obj = document.getElementById('loader_effect');
    
        loader_dom_obj.style.display = 'block';
    
        const analyze_api_resp = await fetch('http://localhost:8081/analyze', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req_payload)
        });
    
        try{
            loader_dom_obj.style.display = 'none';
            const response_payload = await analyze_api_resp.json();
            if('status' in response_payload && response_payload['status'] == 'failed'){
                setTimeout(function(){ alert(`${response_payload['reason']}`); }, 500);
            } else {
                dynamicReRenderInterface(response_payload);
            }
        } catch(error){
            loader_dom_obj.style.display = 'none';
            console.log(`error: ${error}`);
            setTimeout(function(){ alert('Please submit a Valid URL'); }, 500);
        }
    }
    
}

export { formSubmit }
