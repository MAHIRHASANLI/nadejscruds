import React from 'react'
import { useGlobalData } from '../../content/GlobalContent'

const Home = () => {
const [global, setGlobal] = useGlobalData()

return (
  <>
  <div  style={{width:"100%",height:"120vh",margin:"50px auto"}}><h1 style={{zIndex:"999", position:"fixed",left:"35%",top:"30%",fontSize:"100px",color:"white"}}>HOME</h1><img style={{width:"100%",height:"100%",margin:"0px auto"}} src="https://media.istockphoto.com/id/1279696698/vector/bookshelves-with-books-seamless-background.jpg?s=612x612&w=0&k=20&c=EB4M6gI9Ik7he2COVdmSmJFydA5bgZ-2cEWsThPx5XU=" alt="" /></div>
 
  </>
  )
}

export default Home