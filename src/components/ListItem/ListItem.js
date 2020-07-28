import React from "react"
import {Link} from "react-router-dom"
function ListItem(props) {
    const { list } = props;
    return (
        <ul>
            {
                list.map(item => {
                    return (
                        <li key={item.id}>
                            <Link to={"/detail/"+item.id}>{item.title}</Link>
                        </li>
                    )
                })
            }
        </ul>
    )
}
export default ListItem