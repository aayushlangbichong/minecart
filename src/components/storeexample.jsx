import useCountStore from "../store/count-store";
import Button from "./ui/button";



function Counter() {
  const { count, inc,setCount } = useCountStore()
  return (
    <div>
      <span>{count}</span>
      <button onClick={inc}>one up</button>

      <Button  onClick={()=>setCount(0)}>sett </Button>
    </div>
  )
}


export default Counter;
