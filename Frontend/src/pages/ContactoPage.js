import '../style/ContactoPage.css';

const ContactoPage = (props) => {
    return (
        <main className="holder">
            <div className="columna contacto">
                <h2>Dejanos tus comentarios</h2>
                <form action="" method="" className="formulario">
                    <p>
                        <label>Nombre y apellido</label>
                        <input type="text" name="nombre" />
                    </p>
                    <p>
                        <label>Email</label>
                        <input type="text" name="email" />
                    </p>
                    <p>
                        <label>Teléfono de contacto</label>
                        <input type="text" name="telefono" />
                    </p>
                    <p>
                        <label>Comentario</label>
                        <textarea name="comentario"></textarea>
                    </p>
                    <p>
                        <p className="centrar"><input type="submit" value="Enviar" /></p>
                    </p>
                    <h2>Otras vías de contacto</h2>
                    <p>Nos podes encontrar también en:</p>
                    <ul>
                    <li>Teléfono: 011 2355317</li>
                    <li>Email: en_familia@salud.com</li>
                    <li>Instagram: en_familia.salud</li>
                    </ul>
                </form>
            </div>
        </main>
    );
}

export default ContactoPage;