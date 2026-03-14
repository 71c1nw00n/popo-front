import React from 'react'

export function StepPage({ children }: { children: React.ReactNode }) {
  return <div className="relative min-h-screen w-full bg-[#F8FAFC]">{children}</div>
}

export function StepHero({
  step,
  title,
  description,
  badges,
}: {
  step: number
  title: string
  description: string
  badges?: string[]
}) {
  return (
    <div className="mb-8">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center rounded-full bg-[#EFF6FF] px-3 py-1 text-xs font-semibold text-[#2563EB]">
          Step {step}
        </span>
        {badges?.map((badge) => (
          <span
            key={badge}
            className="inline-flex items-center rounded-full border border-black/5 bg-white px-3 py-1 text-xs font-medium text-neutral-500"
          >
            {badge}
          </span>
        ))}
      </div>
      <h1 className="text-2xl font-semibold tracking-tight text-neutral-950 md:text-3xl">{title}</h1>
      <p className="mt-2 text-sm leading-6 text-neutral-500">{description}</p>
    </div>
  )
}

export function StepSectionCard({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle?: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-[28px] border border-black/5 bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.06)] md:p-8">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-neutral-950">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-neutral-500">{subtitle}</p>}
      </div>
      {children}
    </div>
  )
}
