import React, { useEffect, useRef } from 'react'
import { X } from 'lucide-react'

/**
 * The popup, and the only one on this site.
 *
 * ---------------------------------------------------------------------------
 *  WHY THIS IS ITS OWN COMPONENT
 * ---------------------------------------------------------------------------
 * It started inside AddOnCards. When the corporate pillars needed the same
 * behaviour the obvious move was to copy it, and that is exactly how a site
 * ends up with one dialog that traps focus properly and one that does not —
 * because the accessibility fix only ever lands in the copy someone happened
 * to be looking at. One implementation, two callers.
 *
 * ---------------------------------------------------------------------------
 *  WHAT MAKES IT A DIALOG RATHER THAN A DIV THAT LOOKS LIKE ONE
 * ---------------------------------------------------------------------------
 * Five things, and removing any of them breaks it for somebody:
 *
 *   1. Escape closes it.
 *   2. Clicking the backdrop closes it.
 *   3. Focus moves inside on open, and returns to whatever opened it on close
 *      — otherwise closing a dialog dumps a keyboard user back at the top of
 *      the document with no idea where they were.
 *   4. Tab cycles within it instead of wandering into the page behind, which
 *      is invisible to a sighted mouse user and maddening otherwise.
 *   5. The page behind cannot scroll.
 *
 * Returning focus is the caller's job, since only the caller knows which
 * element opened it — see how AddOnCards and CorporateEvents do it.
 */
const Modal: React.FC<{
  /** Ties the dialog to its heading for screen readers. */
  labelledBy: string
  onClose: () => void
  children: React.ReactNode
}> = ({ labelledBy, onClose, children }) => {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeRef.current?.focus()

    /* Restore the previous value rather than setting '' — something else may
       have set it for its own reasons. */
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab') return

      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      if (!focusable || focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      role="presentation"
    >
      {/* aria-hidden because the close button is the real control — this is a
          convenience for mouse users. */}
      <div
        className="absolute inset-0 bg-mountainGreen/70 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto bg-white rounded-[32px] shadow-[0_40px_90px_-30px_rgba(33,54,49,0.7)] animate-slideUp"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 z-10 w-11 h-11 rounded-full bg-white/90 backdrop-blur text-mountainGreen flex items-center justify-center shadow-lg hover:bg-mountainGreen hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
        >
          <X size={20} aria-hidden="true" />
        </button>

        {children}
      </div>
    </div>
  )
}

export default Modal

/**
 * Turns a heading into an id safe to point `labelledBy` at.
 * Shared so two callers cannot invent two different schemes.
 */
export const modalHeadingId = (title: string) =>
  `modal-${title.replace(/\W+/g, '-').toLowerCase()}`
