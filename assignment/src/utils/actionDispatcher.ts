/**
 * Action dispatcher method
 */

import { Store } from "redux";

 
 let statusCode: number | null = null;
 export default function dispatchResponseToReducers(
   serviceMethod: any,
   actionTypeSuccess: string,
   actionTypeFailure: string,
   actionTypeInProgress: string,
 ) {
   return (dispatch: Store["dispatch"]) => {
     dispatch({
       type: actionTypeInProgress,
     });
     serviceMethod()
       .then((res: any) => { 
        console.log('1===>', res)
        statusCode = res.status;
           return res.json();
        }
       ).then((response: any) => {
         if (
           statusCode &&
           (statusCode == 200 || statusCode === 201 || statusCode === 205)
         ) {
           let res = response;
           console.log('2===>', response)
           dispatch({
             type: actionTypeSuccess,
             payload: res,
           });
         }  else
           dispatch({
             type: actionTypeFailure,
             payload: response,
           });
       })
       .catch((error: any) => {
         dispatch({
           type: actionTypeFailure,
           payload: error,
         });
       });
   };
 }