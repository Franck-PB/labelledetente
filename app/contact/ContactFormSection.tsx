'use client'

import { useState } from 'react'
import { IndividualContactForm } from '@/components/ui/IndividualContactForm'
import { ProContactForm } from '@/components/ui/ProContactForm'

/* ============================================================
   ContactFormSection — La Belle Détente
   Tab switcher: Particulier / Professionnel.
   initialType is passed from the Server Component (from searchParams).
   No useSearchParams() here — avoids Suspense requirement.
   ============================================================ */

interface Props {
  initialType: 'individual' | 'pro'
}

const TABS = [
  { id: 'individual' as const, label: 'Particulier' },
  { id: 'pro' as const, label: 'Professionnel' },
]

const ContactFormSection = ({ initialType }: Props) => {
  const [active, setActive] = useState<'individual' | 'pro'>(initialType)

  return (
    <div>
      {/* Tab switcher */}
      <div
        role="tablist"
        aria-label="Type de demande"
        className="inline-flex p-1 mb-8 bg-[var(--color-cream-100)] rounded-[var(--radius-md)] border border-[var(--color-linen-200)]"
      >
        {TABS.map((tab) => {
          const isActive = active === tab.id
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(tab.id)}
              className={`
                px-5 py-2 rounded-[var(--radius-sm)]
                font-[family-name:var(--font-body)] text-[var(--text-sm)]
                font-[var(--font-weight-medium)]
                transition-all duration-[var(--duration-fast)]
                focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-500)]
                ${
                  isActive
                    ? 'bg-[var(--color-surface)] border border-[var(--color-linen-200)] shadow-sm text-[var(--color-earth-900)]'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-earth-900)]'
                }
              `}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Active form */}
      <div role="tabpanel">
        {active === 'individual' ? <IndividualContactForm /> : <ProContactForm />}
      </div>
    </div>
  )
}

ContactFormSection.displayName = 'ContactFormSection'

export { ContactFormSection }
