import { useForm } from 'react-hook-form';
import '../css/register.css';

export function PagRegistro() {
  const { register, handleSubmit } = useForm();

  return (
    <div className='formulario'>
      <h1>Registro</h1>
      <form onSubmit={handleSubmit((values) => console.log(values))}>
        <div className="username">
          <input 
            type="text" 
            {...register("Nombre", { required: true })} 
            placeholder=' ' 
            className='input' 
          />
          <label>Nombre</label>
        </div>
        <div className="username">
          <input 
            type="email" 
            {...register("email", { required: true })} 
            placeholder=' ' 
            className='input' 
          />
          <label>Email</label>
        </div>
        <div className="username">
          <input 
            type="password" 
            {...register("password", { required: true })} 
            placeholder=' ' 
            className='input' 
          />
          <label>Password</label>
        </div>
        <input type="submit" value="Registrar" />
      </form>
      <div className="registrarse">
        <p>¿Ya tienes cuenta? <a href="/login">Inicia sesión</a></p>
      </div>
    </div>
  );
}
