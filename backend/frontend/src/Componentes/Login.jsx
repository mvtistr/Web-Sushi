import {useForm} from 'react-hook-form'
import '../css/login.css'

export function PagLogin() {
   const {register, handleSubmit} = useForm()

   return (
     <div className='formulario'>
       <h1>Iniciar Sesión</h1>
       <form onSubmit={handleSubmit((values) => {
         console.log(values)
       })}>
         <div className='username'>
           <input 
             type="text" 
             {...register("email", { required: true })} 
             placeholder='Email'
           />
           <label>Email</label>
         </div>
         <div className='username'>
           <input 
             type="password" 
             {...register("password", { required: true })} 
             placeholder='Contraseña'
           />
           <label>Contraseña</label>
         </div>
         <input 
           type='submit' 
           value='Iniciar Sesión'
         />
       </form>
       <div className='registrarse'>
         <a href='/registro'>Crear cuenta</a>
       </div>
     </div>
   )
}