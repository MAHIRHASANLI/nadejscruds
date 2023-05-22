import AddAuthor from "../pages/AddAuthor";
import AuthorDetail from "../pages/AuthorDetail";
import Authors from "../pages/Authors";
import EditAuthor from "../pages/EditAuthor";
import MainRoot from "../pages/MainRoot";
import Home from "../pages/Home";

export const ROUTES  =[
    {
        path :"/",
        element :<MainRoot/>,
        children:[
            {
                path:"",
                element:<Home/>
            },
            {
                path:"authors",
                element:<Authors/>
            },
            {
                path:"authordetail/:id",
                element:<AuthorDetail/>
            },
            {
                path:"addauthor",
                element:<AddAuthor/>
            },
            {
                path:"editauthor",
                element:<EditAuthor/>
            }
        ]
    }
]