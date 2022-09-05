import '../style/GaleriaPage.css';


const GaleriaPage = (props) => {
    return (
        
    <div className='galerias'>
        <div className='galeria'>
            <img src="imagenes/galeria/consultorio1.jpg" alt="consultorio"></img>
            <h5>Nuestros consultorios</h5>
        </div>
        
        <div className='galeria'>
            <img src="imagenes/galeria/gimnasio.jpg" alt="gimnasio"></img>
            <h5>Nuestros gimansio</h5>
        </div>
        <div className='galeria'>
            <img src="imagenes/galeria/sala_de_espera.jpg" alt="sala_de_espera"></img>
            <h5>Sala de espera</h5>
        </div>
    </div>
    );
}
export default GaleriaPage;