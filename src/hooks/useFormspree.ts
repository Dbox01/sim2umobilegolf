import { useState, type FormEvent } from 'react'
import { FORMSPREE_URL } from '../data/site'

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export function useFormspree() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    const form = e.currentTarget
    const data = new FormData(form)

    // Tags the lead with the hostname it came from, so submissions from the
    // staging preview are obvious in the Formspree inbox and never get
    // mistaken for a real enquiry.
    data.append('_origin', window.location.hostname)
    data.append('_page', window.location.pathname)

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })

      if (response.ok) {
        setStatus('success')
        form.reset()
        return
      }

      const result = await response.json().catch(() => null)
      if (result && Array.isArray(result.errors)) {
        setErrorMessage(result.errors.map((err: any) => err.message).join(', '))
      } else {
        setErrorMessage('Something went wrong sending your request.')
      }
      setStatus('error')
    } catch {
      setErrorMessage(
        'Network error. Please check your connection, or WhatsApp us instead.',
      )
      setStatus('error')
    }
  }

  return { status, errorMessage, handleSubmit }
}
