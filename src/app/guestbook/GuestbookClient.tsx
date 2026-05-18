'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, User } from 'lucide-react'

interface GuestbookEntry {
  id: string
  name: string
  message: string
  created_at: string
}

interface GuestbookClientProps {
  initialEntries: GuestbookEntry[]
}

export default function GuestbookClient({ initialEntries }: GuestbookClientProps) {
  const [entries, setEntries] = useState<GuestbookEntry[]>(initialEntries)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [validationErrors, setValidationErrors] = useState<{ name?: string; message?: string }>({})
  const [showSuccess, setShowSuccess] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const supabase = createClient()

  // Real-time validation when user finishes filling a field (focuses out)
  const handleBlur = (field: 'name' | 'message') => {
    const errors = { ...validationErrors }
    if (field === 'name') {
      const trimmedName = name.trim()
      if (!trimmedName) {
        errors.name = 'Nama tidak boleh kosong.'
      } else if (trimmedName.length < 2) {
        errors.name = 'Nama minimal harus 2 karakter.'
      } else if (trimmedName.length > 50) {
        errors.name = 'Nama terlalu panjang, maksimal 50 karakter.'
      } else {
        delete errors.name
      }
    }
    if (field === 'message') {
      const trimmedMessage = message.trim()
      if (!trimmedMessage) {
        errors.message = 'Pesan tidak boleh kosong.'
      } else if (trimmedMessage.length < 5) {
        errors.message = 'Pesan minimal harus 5 karakter.'
      } else if (trimmedMessage.length > 500) {
        errors.message = 'Pesan terlalu panjang, maksimal 500 karakter.'
      } else {
        delete errors.message
      }
    }
    setValidationErrors(errors)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Clear old errors & success state
    setError(null)
    setShowSuccess(false)
    const errors: { name?: string; message?: string } = {}

    const trimmedName = name.trim()
    const trimmedMessage = message.trim()

    if (!trimmedName) {
      errors.name = 'Nama tidak boleh kosong.'
    } else if (trimmedName.length < 2) {
      errors.name = 'Nama minimal harus 2 karakter.'
    } else if (trimmedName.length > 50) {
      errors.name = 'Nama terlalu panjang, maksimal 50 karakter.'
    }

    if (!trimmedMessage) {
      errors.message = 'Pesan tidak boleh kosong.'
    } else if (trimmedMessage.length < 5) {
      errors.message = 'Pesan minimal harus 5 karakter.'
    } else if (trimmedMessage.length > 500) {
      errors.message = 'Pesan terlalu panjang, maksimal 500 karakter.'
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors)
      return
    }

    setValidationErrors({})
    setShowConfirmModal(true)
  }

  const confirmSubmit = async () => {
    setShowConfirmModal(false)
    setIsSubmitting(true)

    const trimmedName = name.trim()
    const trimmedMessage = message.trim()

    const { data, error: submitError } = await supabase
      .from('guestbook')
      // @ts-expect-error - Supabase generic inference issue on custom Database types
      .insert([{ name: trimmedName, message: trimmedMessage }])
      .select()
      .single()

    if (submitError) {
      setError('Gagal mengirim pesan. Silakan coba lagi.')
      console.error(submitError)
    } else if (data) {
      setEntries((prev) => [data, ...prev])
      setName('')
      setMessage('')
      setShowSuccess(true)

      // Auto-hide success message after 4 seconds
      setTimeout(() => {
        setShowSuccess(false)
      }, 4000)
    }

    setIsSubmitting(false)
  }

  // Helper to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="space-y-12">
      {/* Form Section */}
      <form onSubmit={handleSubmit} className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm animate-pulse"
              >
                {error}
              </motion.div>
            )}

            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl text-sm font-semibold flex items-center gap-2"
              >
                <span>🎉 Pesan berhasil dikirim! Terima kasih banyak atas apresiasi Anda.</span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-2">Nama</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                  <User size={18} />
                </div>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value)
                    if (validationErrors.name) setValidationErrors(prev => ({ ...prev, name: undefined }))
                  }}
                  onBlur={() => handleBlur('name')}
                  maxLength={50}
                  placeholder="Masukkan nama Anda"
                  className={`w-full bg-slate-950/50 border ${validationErrors.name ? 'border-red-500/50 focus:ring-red-500/30' : 'border-slate-800 focus:ring-blue-500/50'} text-slate-100 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:border-blue-500/50 transition-all placeholder:text-slate-600`}
                  disabled={isSubmitting}
                />
              </div>
              <div className="flex justify-between items-center mt-1.5 px-1">
                <span className="text-xs text-red-400 font-medium">{validationErrors.name}</span>
                <span className="text-[10px] text-slate-500 font-semibold">{name.length}/50</span>
              </div>
            </div>
 
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-2">Pesan</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value)
                  if (validationErrors.message) setValidationErrors(prev => ({ ...prev, message: undefined }))
                }}
                onBlur={() => handleBlur('message')}
                maxLength={500}
                placeholder="Tuliskan pesan, kesan, atau pertanyaan Anda di sini..."
                rows={4}
                className={`w-full bg-slate-950/50 border ${validationErrors.message ? 'border-red-500/50 focus:ring-red-500/30' : 'border-slate-800 focus:ring-blue-500/50'} text-slate-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:border-blue-500/50 transition-all placeholder:text-slate-600 resize-none`}
                disabled={isSubmitting}
              />
              <div className="flex justify-between items-center mt-1.5 px-1">
                <span className="text-xs text-red-400 font-medium">{validationErrors.message}</span>
                <span className="text-[10px] text-slate-500 font-semibold">{message.length}/500</span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-8 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed group shadow-lg shadow-blue-600/20"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Mengirim...</span>
              </>
            ) : (
              <>
                <span>Kirim Pesan</span>
                <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Entries Section */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold flex items-center gap-2 text-slate-200">
          <span className="w-8 h-[1px] bg-blue-500" />
          Pesan Masuk ({entries.length})
        </h3>

        <div className="space-y-4">
          <AnimatePresence initial={false}>
            {entries.map((entry) => (
              <motion.div
                key={entry.id}
                layout
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
                className="bg-slate-900/30 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm"
              >
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-bold text-lg text-slate-200">{entry.name}</h4>
                  <span className="text-xs text-slate-500 font-medium">
                    {formatDate(entry.created_at)}
                  </span>
                </div>
                <p className="text-slate-400 leading-relaxed whitespace-pre-wrap break-words">
                  {entry.message}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>

          {entries.length === 0 && (
            <div className="text-center py-12 border border-dashed border-slate-800 rounded-2xl">
              <p className="text-slate-500 italic">Belum ada pesan masuk. Jadilah yang pertama untuk meninggalkan pesan di sini!</p>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, type: "spring", bounce: 0.2 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-[45%] h-[45%] bg-blue-600/10 rounded-full blur-[60px] pointer-events-none" />

              <h3 className="text-xl font-bold text-slate-200 mb-3 flex items-center gap-2">
                <span>Konfirmasi Kirim</span>
              </h3>

              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                Apakah Anda yakin ingin mengirim pesan ini? Pesan yang sudah dikirim tidak dapat diubah atau dihapus kembali.
              </p>

              {/* Preview Box */}
              <div className="bg-slate-950/40 border border-slate-800/80 rounded-2xl p-4 mb-6 space-y-2 text-left relative overflow-hidden">
                <div className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">Pratinjau</div>
                <div className="font-bold text-slate-200 text-sm">{name.trim()}</div>
                <p className="text-slate-400 text-xs whitespace-pre-wrap leading-relaxed max-h-36 overflow-y-auto break-words">{message.trim()}</p>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 py-3 px-4 bg-slate-850 hover:bg-slate-800 text-slate-400 hover:text-slate-200 font-semibold rounded-xl transition-all border border-slate-800"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={confirmSubmit}
                  className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/20"
                >
                  Kirim Sekarang
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
