import '../style/StaffPage.css';
/*import '../../imagenes/staff/nosotros1.jpg'
import '../../imagenes/staff/nosotros2.jpg'
import '../../imagenes/staff/nosotros3.jpg'
import '../../imagenes/staff/nosotros4.jpg'*/

const StaffPage = (props) => {
    return (
        <div><div className='staff'>
            <h2>Nuestro staff</h2>
            <div className='personas'>
                <div className='persona'>
                    <img src="imagenes/staff/nosotros1.jpg" alt="Juan Gomez"></img>
                    <h5>Juan Gomez</h5>
                    <h6>Gerente General</h6>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae facilis vero officiis.
                        Maiores veritatis architecto, vitae fuga maxime quasi at ducimus doloribus illum ipsa error
                        repellat? Nostrum animi error debitis.</p>
                </div>
                <div className='persona'>
                    <img src="imagenes/staff/nosotros2.jpg" alt="Francisco Fernandez"></img>
                    <h5>Francisco Fernandez</h5>
                    <h6>Recursos humanos</h6>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae facilis vero officiis.
                        Maiores veritatis architecto, vitae fuga maxime quasi at ducimus doloribus illum ipsa error
                        repellat? Nostrum animi error debitis.</p>
                </div>
                <div className='persona'>
                    <img src="imagenes/staff/nosotros3.jpg" alt="Alberto Gomez"></img>
                    <h5>Alberto Gomez</h5>
                    <h6>Gerente Comercial</h6>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae facilis vero officiis.
                        Maiores veritatis architecto, vitae fuga maxime quasi at ducimus doloribus illum ipsa error
                        repellat? Nostrum animi error debitis.</p>
                </div>
                <div className='persona'>
                    <img src="imagenes/staff/nosotros4.jpg" alt="Juana Romeo"></img>
                    <h5>Juana Romeo</h5>
                    <h6>Gerente de diseño </h6>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae facilis vero officiis.
                        Maiores veritatis architecto, vitae fuga maxime quasi at ducimus doloribus illum ipsa error
                        repellat? Nostrum animi error debitis.</p>
                </div>
            </div>
        </div>
        </div>
    );
}
export default StaffPage;