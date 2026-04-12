import { useState } from 'react';

function FormularioPersona() {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        rut: '',
        correo: '',
        telefono: '',
        sexo: 'hombre',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Validación para RUT y Teléfono para que solo acepten números
        if (name === 'rut' || name === 'telefono') {
            const regex = /^[0-9]*$/; // Expresión regular para permitir solo números
            if (!regex.test(value)) return; // Si no es un número, no se actualiza el estado
        }

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Imprimir los datos del formulario en un formato más legible
        console.log('Datos del formulario:');
        console.log(`Nombre: ${formData.nombre}`);
        console.log(`Apellido: ${formData.apellido}`);
        console.log(`RUT: ${formData.rut}`);
        console.log(`Correo: ${formData.correo}`);
        console.log(`Teléfono: ${formData.telefono}`);
        console.log(`Sexo: ${formData.sexo}`);
    };

    return (
        <div style={{ height: '100vh', backgroundColor: '#fff', display: 'flex', flexDirection: 'column' }}>
            {/* Header superior */}
            <header style={{ backgroundColor: '#e10000', color: '#fff', padding: '40px', textAlign: 'center', flexShrink: 0 }}>
                <h1 style={{ margin: 0 }}>Ingrese aqui sus datos para procesar el pago...</h1>
            </header>

            {/* Contenedor del formulario */}
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
                <form
                    onSubmit={handleSubmit}
                    style={{
                        border: '1px solid #ddd',
                        borderRadius: '10px',
                        padding: '20px',
                        backgroundColor: '#fff',
                        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                        width: '100%',
                        maxWidth: '600px',
                    }}
                >
                    <header style={{ backgroundColor: '#000', color: '#fff', padding: '40px', textAlign: 'center', borderRadius: '10px 10px 0 0', fontSize: '20px', marginBottom: '20px' }}>
                        <h2 style={{ margin: 0 }}>Formulario de Registro</h2>
                    </header>

                    {['nombre', 'apellido', 'rut', 'correo', 'telefono'].map((field, index) => (
                        <div key={index} style={{ marginBottom: '15px' }}>
                            <label htmlFor={field} style={{ display: 'none' }}> {/* Ocultar el label, ya no es necesario */}
                                {field.charAt(0).toUpperCase() + field.slice(1)}:
                            </label>
                            <input
                                type={field === 'correo' ? 'email' : field === 'telefono' ? 'tel' : 'text'}
                                id={field}
                                name={field}
                                value={formData[field]}
                                onChange={handleChange}
                                inputMode={field === 'rut' || field === 'telefono' ? 'numeric' : 'text'} // Indica que se espera entrada numérica
                                placeholder={field.charAt(0).toUpperCase() + field.slice(1)} // Placeholder con el texto del label
                                style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ddd', outline: 'none' }}
                                required
                            />
                        </div>
                    ))}

                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="sexo" style={{ display: 'none' }}> {/* Ocultar el label, ya no es necesario */}
                            Sexo:
                        </label>
                        <select
                            id="sexo"
                            name="sexo"
                            value={formData.sexo}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ddd', outline: 'none' }}
                            required
                        >
                            <option value="" disabled>Seleccionar sexo</option> {/* Opción por defecto */}
                            <option value="hombre">Hombre</option>
                            <option value="mujer">Mujer</option>
                            <option value="otro">Otro</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#FF5733',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#740505')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#e10000')}
                    >
                        Enviar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FormularioPersona;