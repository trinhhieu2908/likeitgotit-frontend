import {useState, useCallback} from "react";

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const sendRequest = useCallback(async (requestConfig, applyData) => {
      setIsLoading(true);
      setError(null);
      const fetchUrl = `http://54.255.25.227:3005${requestConfig.url}`
      try {
        const response = await fetch(
          fetchUrl,{
              method: requestConfig.method ? requestConfig.method : 'GET',
              headers: requestConfig.headers ? requestConfig.headers : {},
              body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
          }
        );
        if (response.errorMsg) {
          throw new Error("Something went wrong!");
        }
  
        const data = await response.json();
        // console.log(data.data)
  
        applyData(data.data);

      } catch (error) {
        console.log(error)
        setError(error.message);
      }
      setIsLoading(false);
    }, []);

    return {
        isLoading,
        error,
        sendRequest
    }
}

export default useHttp