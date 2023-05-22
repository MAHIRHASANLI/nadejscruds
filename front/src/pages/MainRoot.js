
import {Outlet} from "react-router-dom"
import Header from "../Navbar"

const MainRoot = () => {
  return (
<>
<Header/>
<Outlet/>
</>
  )
}

export default MainRoot