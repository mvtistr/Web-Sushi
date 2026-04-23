import {useForm} from 'react-hook-form'

export function PagLogin() {
   const {register, handleSubmit} = useForm()

   return (
    <div className='m-0 p-0 font-["Trebuchet_MS"] bg-black min-h-screen flex items-center justify-center'>
      <div className='w-full max-w-md bg-dark-bg border-2 border-neon-red rounded-xl shadow-xl p-8'>
        <h1 className='text-center py-3 text-3xl font-bold text-neon-red'>Iniciar Sesión</h1>
        <form onSubmit={handleSubmit((values) => {
          console.log(values)
        })} className='space-y-4'>
          <div>
            <label className='block text-gray-300 mb-2'>Email</label>
            <input
              type='text'
              {...register('email', { required: true })}
              className='w-full px-4 py-2 bg-black text-white border border-gray-700 rounded focus:border-neon-red outline-none'
            />
          </div>
          <div>
            <label className='block text-gray-300 mb-2'>Contraseña</label>
            <input
              type='password'
              {...register('password', { required: true })}
              className='w-full px-4 py-2 bg-black text-white border border-gray-700 rounded focus:border-neon-red outline-none'
            />
          </div>
          <input
            type='submit'
            value='Iniciar Sesión'
            className='w-full py-3 bg-neon-red text-black rounded-lg font-bold hover:bg-red-accent transition'
          />
        </form>
        <div className='text-center mt-4'>
          <a href='/Registro' className='text-neon-red underline'>Crear cuenta</a>
        </div>
      </div>
    </div>
   )
}