import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';

export function PagRegistro() {
  const { register, handleSubmit } = useForm();

  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  const onSubmit = async (values) => {
    setErrorMsg('')
    setSuccessMsg('')
    setLoading(true)
    try {
      const payload = {
        run: values.run,
        nombreCompleto: values.nombreCompleto,
        correo: values.correo,
        password: values.password,
        sexo: values.sexo,
        direccion: values.direccion,
        comuna: values.comuna,
        provincia: values.provincia,
        region: values.region,
        telefono: values.telefono,
        tipoUsuario: 'cliente'
      }
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/register`, payload)
      setSuccessMsg('Registro exitoso. Redirigiendo...')
      setTimeout(() => {
        window.location.href = '/Cuenta'
      }, 1200)
    } catch (error) {
      console.error(error)
      setErrorMsg(error?.response?.data?.message || 'Error al registrar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='m-0 p-0 font-["Trebuchet_MS"] bg-black min-h-screen flex items-center justify-center'>
      <div className='w-full max-w-md bg-dark-bg border-2 border-neon-red rounded-xl shadow-xl p-8'>
        <h1 className='text-center py-3 text-3xl font-bold text-neon-red'>Crear Cuenta</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div>
            <label className='block text-gray-300 mb-2'>RUT</label>
            <input
              type='text'
              {...register('run', { required: true })}
              placeholder='12.345.678-9'
              className='w-full px-4 py-2 bg-black text-white border border-gray-700 rounded focus:border-neon-red outline-none'
            />
          </div>
          <div>
            <label className='block text-gray-300 mb-2'>Nombre Completo</label>
            <input
              type='text'
              {...register('nombreCompleto', { required: true })}
              className='w-full px-4 py-2 bg-black text-white border border-gray-700 rounded focus:border-neon-red outline-none'
            />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-gray-300 mb-2'>Email</label>
              <input
                type='email'
                {...register('correo', { required: true })}
                className='w-full px-4 py-2 bg-black text-white border border-gray-700 rounded focus:border-neon-red outline-none'
              />
            </div>
            <div>
              <label className='block text-gray-300 mb-2'>Teléfono</label>
              <input
                type='text'
                {...register('telefono', { required: true })}
                className='w-full px-4 py-2 bg-black text-white border border-gray-700 rounded focus:border-neon-red outline-none'
              />
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-gray-300 mb-2'>Contraseña</label>
              <input
                type='password'
                {...register('password', { required: true, minLength: 6 })}
                className='w-full px-4 py-2 bg-black text-white border border-gray-700 rounded focus:border-neon-red outline-none'
              />
            </div>
            <div>
              <label className='block text-gray-300 mb-2'>Sexo</label>
              <select {...register('sexo', { required: true })} className='w-full px-4 py-2 bg-black text-white border border-gray-700 rounded focus:border-neon-red outline-none'>
                <option value='masculino'>Masculino</option>
                <option value='femenino'>Femenino</option>
                <option value='otro'>Otro</option>
              </select>
            </div>
          </div>

          <div>
            <label className='block text-gray-300 mb-2'>Dirección</label>
            <input
              type='text'
              {...register('direccion', { required: true })}
              className='w-full px-4 py-2 bg-black text-white border border-gray-700 rounded focus:border-neon-red outline-none'
            />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div>
              <label className='block text-gray-300 mb-2'>Comuna</label>
              <input type='text' {...register('comuna', { required: true })} className='w-full px-4 py-2 bg-black text-white border border-gray-700 rounded focus:border-neon-red outline-none' />
            </div>
            <div>
              <label className='block text-gray-300 mb-2'>Provincia</label>
              <input type='text' {...register('provincia', { required: true })} className='w-full px-4 py-2 bg-black text-white border border-gray-700 rounded focus:border-neon-red outline-none' />
            </div>
            <div>
              <label className='block text-gray-300 mb-2'>Región</label>
              <input type='text' {...register('region', { required: true })} className='w-full px-4 py-2 bg-black text-white border border-gray-700 rounded focus:border-neon-red outline-none' />
            </div>
          </div>
          {errorMsg && <div className='text-red-500 text-sm'>{errorMsg}</div>}
          {successMsg && <div className='text-green-400 text-sm'>{successMsg}</div>}
          <button type='submit' disabled={loading} className='w-full py-3 bg-neon-red text-black rounded-lg font-bold hover:bg-red-accent transition'>
            {loading ? 'Registrando...' : 'Registrar'}
          </button>
        </form>
        <div className='text-center mt-4'>
          <p className='text-gray-400'>¿Ya tienes cuenta? <a href='/Cuenta' className='text-neon-red underline'>Inicia sesión</a></p>
        </div>
      </div>
    </div>
  );
}
