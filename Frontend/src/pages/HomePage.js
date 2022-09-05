import '../style/HomePage.css'
import '../style/StaffPage.css'
import Card from 'react-bootstrap/Card';
import Carrousel from '../components/layout/Carrousel'
const HomePage = (props) => {


    return (
        <>
            <Carrousel />
            <div><h2>Bienvenidos</h2>
                <p>Nuestra visión y misión se basa en satisfacer de manera eficaz y eficiente las necesidades de cuidado de salud de la comunidad. Brindar a toda la comunidad la mejor atención medica basada en la evidencia científica y contenido ético, acompañando al paciente y su familia.</p>
                <p>Contamos para su mejor atención con:</p>
                <div className='equipamiento'>
                <Card style={{ width: '38rem' }}>
                    <Card.Img variant="top" src="imagenes/home/equipos.jpg" />
                    <Card.Body>
                        <Card.Title>Equipamiento</Card.Title>
                        <Card.Text>
                            Más de 108 camas de internación general con baño privado.
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="imagenes/home/dxporimagen.jpg" />
                    <Card.Body>
                        <Card.Title>Diagnóstico por imágenes</Card.Title>
                        <Card.Text>
                            Equipos de alta tecnología con profesionales calificados en el tema
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card style={{ width: '17rem' }}>
                    <Card.Img variant="top" src="imagenes/home/pediatrica.jpg" />
                    <Card.Body>
                        <Card.Title>Guardia pedíatricas</Card.Title>
                        <Card.Text>
                            <p>Asistencia inmediata las 24hs y alta complejidad.</p>
                        </Card.Text>
                    </Card.Body>
                </Card>
                </div>
                <p>Trabajamos con todas las obras sociales.</p>
            </div></>
    );
}

export default HomePage;