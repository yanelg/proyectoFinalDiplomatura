import '../../style/layout.css';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from "react-router-dom";

const Nav = (props) => {
    return (
        <nav>
            <div className='holder'>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/staff">Staff</Link></li>
                    <li><Link to="/galeria">Galeria</Link></li>
                    <li><Link to="/novedades">Novedades</Link></li>
                </ul>
            </div>
        </nav >
    )
}

export default Nav;