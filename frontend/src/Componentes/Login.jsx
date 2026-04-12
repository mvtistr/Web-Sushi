import {useForm} from 'react-hook-form'

export function PagLogin() {
   const {register, handleSubmit} = useForm()

   return (
     <div className='m-0 p-0 font-["Trebuchet_MS"] bg-gradient-to-br from-dark-bg to-primary h-screen'>
       <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-white rounded-lg shadow-lg p-5'>
         <h1 className='text-center py-5 text-burgundy'>Iniciar Sesión</h1>
         <form onSubmit={handleSubmit((values) => {
           console.log(values)
         })}>
           <div className='relative border-b-2 border-gray-400 my-8'>
             <input
               type="text"
               {...register("email", { required: true })}
               placeholder='Email'
               className='w-full px-1 h-10 text-base border-none bg-transparent outline-none'
             />
             <label className='absolute top-1/2 left-1 text-gray-400 transform -translate-y-1/2 text-base pointer-events-none transition-all duration-500'>Email</label>
           </div>
           <div className='relative border-b-2 border-gray-400 my-8'>
             <input
               type="password"
               {...register("password", { required: true })}
               placeholder='Contraseña'
               className='w-full px-1 h-10 text-base border-none bg-transparent outline-none'
             />
             <label className='absolute top-1/2 left-1 text-gray-400 transform -translate-y-1/2 text-base pointer-events-none transition-all duration-500'>Contraseña</label>
           </div>
           <input
             type='submit'
             value='Iniciar Sesión'
             className='w-full h-12 border border-solid bg-burgundy rounded-full text-lg text-white cursor-pointer outline-none hover:bg-red-600 transition duration-500'
           />
         </form>
         <div className='text-center mt-5'>
           <a href='/registro' className='text-dark-bg no-underline hover:underline'>Crear cuenta</a>
         </div>
       </div>
     </div>
   )
}