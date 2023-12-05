import { Outlet, Link }  from "react-router-dom"

function Menu() {
  return (
    <div>
        <nav className="menu">
            <ul>
                <li>
                  <Link to ="/"> Home</Link>
                </li>
                <li>
                  <Link to="/Cadastrar">Cadastrar</Link> 
                </li>
            </ul>
        </nav>
        <Outlet />

    </div>
  )
}

export default Menu
