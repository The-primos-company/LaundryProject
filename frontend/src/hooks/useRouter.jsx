import {useState} from 'react'

export const useRouter = () => {
 const [route, setRoute] = useState("")


 return {route,setRoute}
}
