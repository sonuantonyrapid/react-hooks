import {useCallback, useReducer} from "react";

const httpReducer = (currentHttpState,action)=>{

    switch (action.type) {
      case 'SEND':
        return {...currentHttpState,isLoading:true,error:null,data:null};
      case 'RESPONSE':
        return {...currentHttpState,isLoading:false,error:null,data:action.response};
      case 'ERROR':
        return {...currentHttpState,isLoading:false,error:action.error,data:null};
      case 'CLEAR':
        return {...currentHttpState,isLoading:false,error:null,data:null};
      default:
        throw new Error('Invaild request!');
    }
  
};


const useHttp = ()=>{

    const [httpState,dispatchHttp] = useReducer(httpReducer,{isLoading:false,error:null,data:null});

    const sendRequest = useCallback((url,method,body)=>{

            const httpAction = {
                type:'SEND'
            }
          
            dispatchHttp(httpAction);

            return (fetch(url,
                {
                    method: method,
                    body:body,
                    headers: {'Content-Type':'application/json'}
                }
            ).then(response=>{

                return response.json();
                
        
            }).then(responseData=>{
        
                const httpAction = {
                    type:'RESPONSE',
                    response:responseData
                }
                    
                dispatchHttp(httpAction);

                return responseData;


            }).catch(error=>{
        
                const httpAction = {
                type:'ERROR',
                error: 'Something went wrong! '+error.message
                }
                
                dispatchHttp(httpAction);
        
            }));

            


    });

    return {...httpState,sendRequest};

   

};

export default useHttp;