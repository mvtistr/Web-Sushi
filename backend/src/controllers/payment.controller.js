import dotenv from 'dotenv'
dotenv.config()

export const createPreference = async (req, res) => {
  try {
    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN
    if (!accessToken) return res.status(500).json({ message: 'MERCADOPAGO_ACCESS_TOKEN no configurado' })

    const { items, back_urls } = req.body
    // Build preference payload for Mercado Pago
    const preference = {
      items: items.map((it) => ({
        title: it.title || it.nombre || 'Producto',
        quantity: Number(it.quantity || it.cantidad || 1),
        unit_price: Number(it.unit_price || it.precio || 0),
        currency_id: 'CLP'
      })),
      back_urls: back_urls || {
        success: 'http://localhost:5173/',
        failure: 'http://localhost:5173/',
        pending: 'http://localhost:5173/'
      },
      auto_return: 'approved'
    }

    const resp = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(preference)
    })

    const data = await resp.json()
    if (!resp.ok) {
      console.error('MercadoPago error', { status: resp.status, body: data })
      // Try to extract a helpful message from Mercado Pago response
      const mpMessage = data?.message || data?.cause || JSON.stringify(data)
      return res.status(resp.status).json({ message: 'Error MP', detail: mpMessage })
    }

    console.log('MercadoPago preference created', { id: data?.id })
    return res.json(data)
  } catch (error) {
    console.error('createPreference error', error)
    return res.status(500).json({ message: 'Error creating preference', error: error.message })
  }
}
