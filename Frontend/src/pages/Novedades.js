import React, { useEffect, useState } from 'react'
import Toast from 'react-bootstrap/Toast';
import Spinner from 'react-bootstrap/Spinner';

import '../style/Novedades.css'
const Novedades = () => {
    const [novedades, setNovedades] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3005/admin/novedades/getnovedades")
            .then((response) => response.json())
            .then((data) => {
                setNovedades(data)
                console.log(data)
            },
                (error) => {
                    setIsLoading(true);
                }
            )
            .finally(() => {
                setIsLoading(false);
            });
    }, []);


    if (isLoading) {
        return (
            <div className="App">
                <Spinner animation="grow" variant="dark" />
            </div>
        );
    }
    return (
        <>
            {
            <section className="container">
                {
                    novedades.map((item, idx) => {
                        return (
                            <Toast className='toasts'>
                                <Toast.Header>
                                    <img src="/imagenes/notifications/notifications.svg" className="rounded me-2 logoNotificaciones" alt={item.idNovedad} />
                                    <strong className="me-auto">Novedad {idx + 1}</strong>
                                    <small>{item.fecha}</small>
                                </Toast.Header>
                                <Toast.Body>{item.novedad}</Toast.Body>
                            </Toast>
                        )
                    })
                }
            </section>
            }
        </>
    );
}

export default Novedades