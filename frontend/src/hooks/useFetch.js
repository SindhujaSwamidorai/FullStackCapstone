import { useEffect, useState } from "react";

export default function useFetch (url, params) {

    const [responseData, setResponseData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    let fetch_url = url;

    if(params){
        console.log(params);
        Object.keys(params).map((x) => {
            const y = params[x];
            if (y) {
               fetch_url += `?${x}=${y}`
            }
        })
    }

    console.log(fetch_url);

    useEffect(() => {
    async function getResponse () {
        setLoading(true);
        try {
            console.log("Processing response data")
            let response = await fetch(fetch_url, {
                method: 'GET',
            });
            if (response.ok) {
                let json = await response.json();
                //console.log(json);
                setResponseData(json);
            }  
            else {
                throw response;
            }
        }
        catch (err) {
            console.log("Error processing response data");
            console.log(err);
            setError(err);
        }
        finally {
            setLoading(false);
        }
    }
    getResponse();
    //setResponseData(response);
    },[fetch_url]);
     
    //console.log(responseData, loading, error);

    return (
            {responseData, loading, error}
        )    

}
