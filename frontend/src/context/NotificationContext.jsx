import { createContext, useContext, useEffect, useRef, useState } from 'react'

const NotificationContext = createContext(null)

export function NotificationProvider({ children }){
    const [toasts, setToasts] = useState([])
    const [confirmState, setConfirmState] = useState(null)
    const resolveRef = useRef()

    useEffect(() => {
        if (toasts.length === 0) return
        const timers = toasts.map((t) => setTimeout(() => {
            setToasts(prev => prev.filter(p => p.id !== t.id))
        }, t.duration || 4000))
        return () => timers.forEach(clearTimeout)
    }, [toasts])

    const notify = (message, type = 'info', duration = 4000) => {
        const id = Date.now() + Math.random()
        setToasts(prev => [{ id, message, type, duration }, ...prev])
        return id
    }

    const confirm = (message) => {
        return new Promise((resolve) => {
            setConfirmState({ message })
            resolveRef.current = resolve
        })
    }

    const handleConfirm = (result) => {
        setConfirmState(null)
        if (resolveRef.current) resolveRef.current(result)
    }

    return (
        <NotificationContext.Provider value={{ notify, confirm }}>
            {children}
            <div className="fixed z-50 right-4 top-4 flex flex-col-reverse gap-2">
                {toasts.map(t => (
                    <div key={t.id} className={`toast px-4 py-2 rounded shadow-lg text-white ${t.type === 'error' ? 'bg-red-600' : t.type === 'success' ? 'bg-green-600' : 'bg-gray-800'}`}>
                        {t.message}
                    </div>
                ))}
            </div>

            {confirmState && (
                <div className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-60">
                    <div className="bg-black p-6 rounded shadow-lg border-2 border-neon-red text-white max-w-md w-full">
                        <div className="mb-4">{confirmState.message}</div>
                        <div className="flex justify-end gap-2">
                            <button onClick={() => handleConfirm(false)} className="px-3 py-1 border rounded border-gray-600">Cancelar</button>
                            <button onClick={() => handleConfirm(true)} className="px-3 py-1 bg-neon-red text-black rounded font-bold">Confirmar</button>
                        </div>
                    </div>
                </div>
            )}
            <style>{`
                .toast{ transform: translateY(10px); animation: toast-in 360ms ease forwards; }
                @keyframes toast-in { from { opacity: 0; transform: translateY(10px) scale(.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
            `}</style>
        </NotificationContext.Provider>
    )
}

export function useNotification(){
    return useContext(NotificationContext)
}

export default NotificationContext
