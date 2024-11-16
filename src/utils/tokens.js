
const getToken=()=>{
   return localStorage.getItem("token")
}


const setToken=(token)=>{
 localStorage.setItem("token",token)
 }

 const delToken=()=>{
    localStorage.removeItem("token")
 }


 export{getToken,setToken,delToken}