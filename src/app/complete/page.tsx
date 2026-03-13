'use client'

import React, { useEffect, useRef, useState } from 'react'
import Script from 'next/script'
import Header from '@/components/Header'
import { StepHero, StepPage, StepSectionCard } from '@/components/StepUi'

type Profile = {
  name: string
  intro: string
  summary: string[]
  about: string[]
  focus: string[]
}

type Education = {
  school: string
  major: string
  period: string
}

type Award = {
  name: string
  org?: string
  year?: string
}

type Experience = {
  title: string
  org: string
  period: string
  description: string
  keyContribution: string
  outcome: string
}

type Project = {
  name: string
  description: string
  role?: string
  period?: string
  techStack?: string[]
  details?: string[]
}

type Slide =
  | { type: 'profile'; data: Profile }
  | { type: 'education'; data: { education: Education; awards: Award[] } }
  | { type: 'experience'; data: Experience; index: number }
  | { type: 'projectIndex'; data: Project[] }
  | { type: 'project'; data: Project; index: number }

declare global {
  interface Window {
    html2canvas?: (element: HTMLElement, options?: Record<string, unknown>) => Promise<HTMLCanvasElement>
    jspdf?: {
      jsPDF: new (options?: {
        orientation?: 'portrait' | 'landscape'
        unit?: string
        format?: string | number[]
      }) => {
        internal: {
          pageSize: {
            getWidth: () => number
            getHeight: () => number
          }
        }
        addImage: (
          imageData: string,
          format: string,
          x: number,
          y: number,
          width: number,
          height: number
        ) => void
        addPage: () => void
        save: (filename: string) => void
      }
    }
  }
}

const profile: Profile = {
  name: '기채운',
  intro: 'LLM 기반 서비스를 개발하고 사용자 경험을 구조화하는 AI/ML 엔지니어',
  summary: [
    'KAIST 전산학부 재학',
    'LLM / NLP 중심 프로젝트 다수 수행',
    'OpenAI API 기반 웹 서비스 개발 경험',
  ],
  about: [
    'AI와 Web을 연결해',
    '실제로 보여지는 결과물을',
    '만드는 데 강점이 있습니다.',
  ],
  focus: [
    'LLM Application',
    'NLP / Personalization',
    'Product-oriented Development',
  ],
}

const education: Education = {
  school: 'KAIST',
  major: '전산학부',
  period: '2023.03 - 2027.02',
}

const awards: Award[] = [
  { name: 'AI 해커톤 우수상', org: '교내 해커톤', year: '2025' },
  { name: '학부 연구 장학금', org: 'KAIST', year: '2025' },
]

const experiences: Experience[] = [
  {
    title: '학부연구생',
    org: 'Davian Lab',
    period: '2025.09 - 현재',
    description:
      'Personalized Web Agent 연구를 수행하며, 사용자 웹 탐색 히스토리를 바탕으로 implicit preference를 추론하는 구조를 실험했습니다.',
    keyContribution:
      '사용자 맥락과 히스토리를 바탕으로 문제를 구조화하고, 실제 동작하는 서비스 형태로 구현',
    outcome: '연구/개발 경험을 제품 관점의 결과물로 정리',
  },
  {
    title: 'AI 서비스 개발',
    org: 'POPO',
    period: '2025 - 현재',
    description:
      '사용자의 경험을 구조화해 포트폴리오 슬라이드 형태로 생성하는 LLM 기반 웹 서비스를 개발했습니다.',
    keyContribution:
      '경험 입력 플로우와 결과물 UI를 연결해 사용자가 바로 활용 가능한 포트폴리오 경험을 설계',
    outcome: '입력부터 결과물 확인까지 이어지는 서비스 플로우를 구현',
  },
]

const projects: Project[] = [
  {
    name: 'POPO',
    description: '경험을 입력하면 포트폴리오를 생성해주는 LLM 기반 서비스',
    role: 'Frontend / AI Service Development',
    period: '2025',
    techStack: ['Next.js', 'React', 'Tailwind CSS', 'OpenAI API'],
    details: [
      '사용자 경험 입력 플로우 설계',
      '생성 결과를 슬라이드 형태로 시각화',
    ],
  },
  {
    name: 'Fitfor',
    description: '사용자 맞춤형 추천을 제공하는 LLM 기반 웹 서비스',
    role: 'LLM App Developer',
    period: '2025',
    techStack: ['FastAPI', 'React', 'OpenAI API'],
    details: [
      '사용자 입력 기반 응답 생성',
      '웹 인터페이스 및 API 연결',
    ],
  },
  {
    name: 'Speech AI',
    description: '음성 및 NLP 관련 실험 프로젝트 모음',
    role: 'ML Engineer',
    period: '2024 - 2025',
    techStack: ['Python', 'PyTorch'],
    details: [
      '감정 분석, 음성 분리, 가짜 음성 판별 프로젝트 수행',
      '모델 실험 및 결과 분석',
    ],
  },
]

export default function CompletePage() {
  const [profileState, setProfileState] = useState(profile)
  const [educationState, setEducationState] = useState(education)
  const [awardsState, setAwardsState] = useState(awards)
  const [experiencesState, setExperiencesState] = useState(experiences)
  const [projectsState, setProjectsState] = useState(projects)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [exportWidth, setExportWidth] = useState(1280)
  const exportSlideRefs = useRef<Array<HTMLDivElement | null>>([])
  const previewSlideRef = useRef<HTMLDivElement | null>(null)

  const slides: Slide[] = [
    { type: 'profile', data: profileState },
    { type: 'education', data: { education: educationState, awards: awardsState } },
    ...experiencesState.map((experience, index) => ({
      type: 'experience' as const,
      data: experience,
      index,
    })),
    { type: 'projectIndex', data: projectsState },
    ...projectsState.map((project, index) => ({
      type: 'project' as const,
      data: project,
      index,
    })),
  ]

  const feedbackItems = [
    `프로필 도입부가 ${profileState.intro}로 명확해서 첫 장에서 전문성이 바로 전달됩니다.`,
    `경력 ${experiencesState.length}개와 프로젝트 ${projectsState.length}개가 균형 있게 배치되어 있어서 스토리 흐름이 안정적입니다.`,
    '프로젝트별 성과 수치나 사용자 반응처럼 정량 정보가 추가되면 설득력이 더 강해질 수 있습니다.',
  ]

  const exportToPdf = async () => {
    if (!window.html2canvas || !window.jspdf?.jsPDF) {
      window.alert('PDF 생성 모듈을 아직 불러오는 중입니다. 잠시 후 다시 시도해 주세요.')
      return
    }

    const exportTargets = exportSlideRefs.current.filter(
      (element): element is HTMLDivElement => element !== null
    )

    if (exportTargets.length === 0) {
      window.alert('내보낼 슬라이드를 찾지 못했습니다.')
      return
    }

    setIsExporting(true)

    try {
      const { jsPDF } = window.jspdf
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [1600, 900],
      })

      for (const [index, slideElement] of exportTargets.entries()) {
        const canvas = await window.html2canvas(slideElement, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#ffffff',
        })

        const imageData = canvas.toDataURL('image/png')
        const pageWidth = pdf.internal.pageSize.getWidth()
        const pageHeight = pdf.internal.pageSize.getHeight()

        if (index > 0) {
          pdf.addPage()
        }

        pdf.addImage(imageData, 'PNG', 0, 0, pageWidth, pageHeight)
      }

      pdf.save('popo-portfolio.pdf')
    } finally {
      setIsExporting(false)
    }
  }

  const goPrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  const goNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, slides.length - 1))
  }

  const goTo = (index: number) => {
    setCurrentIndex(index)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => Math.max(prev - 1, 0))
      }
      if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => Math.min(prev + 1, slides.length - 1))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [slides.length])

  useEffect(() => {
    if (!previewSlideRef.current) return

    const updateWidth = () => {
      if (!previewSlideRef.current) return
      setExportWidth(previewSlideRef.current.getBoundingClientRect().width)
    }

    updateWidth()

    const observer = new ResizeObserver(() => updateWidth())
    observer.observe(previewSlideRef.current)

    return () => observer.disconnect()
  }, [])

  const currentSlide = slides[currentIndex]
  const isFirstSlide = currentIndex === 0
  const isLastSlide = currentIndex === slides.length - 1

  return (
    <StepPage>
      <Script
        src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"
        strategy="afterInteractive"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js"
        strategy="afterInteractive"
      />

      <Header
        additionalActions={[
          { label: '이전', href: '/step6' },
          { label: 'AI 피드백', onClick: () => setIsFeedbackOpen(true), primary: true },
        ]}
        rightAction={{
          label: isExporting ? 'PDF 생성 중...' : 'PDF 다운로드',
          onClick: exportToPdf,
        }}
      />

      <main className="mx-auto w-full max-w-6xl px-6 pb-12 pt-24 print:hidden">
        <StepHero
          step={6}
          title="생성된 포트폴리오를 슬라이드 형태로 검토해 보세요"
          description="상단바에서 PDF 다운로드를 누르면 인쇄 대화상자 없이 전체 슬라이드가 파일로 저장됩니다."
          badges={['Portfolio Preview', `${slides.length}개 슬라이드`, 'Direct PDF Download']}
        />

        <div className="mt-8 space-y-6">
          <StepSectionCard
            title="포트폴리오 미리보기"
            subtitle="슬라이드 좌우 버튼이나 키보드 방향키로 이동할 수 있습니다."
          >
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-neutral-500">
                {currentIndex + 1} / {slides.length}
              </div>
              <div className="text-xs text-neutral-400">
                방향키 ← → 로도 넘길 수 있습니다
              </div>
            </div>

            <div className="relative mx-auto mt-6 max-w-5xl">
              <button
                onClick={goPrev}
                disabled={isFirstSlide}
                className="absolute left-3 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/90 bg-white/92 text-lg font-semibold text-neutral-700 shadow-[0_18px_40px_rgba(15,23,42,0.12)] transition hover:bg-white hover:text-neutral-950 disabled:cursor-not-allowed disabled:opacity-35 md:flex"
                aria-label="이전 슬라이드"
              >
                ←
              </button>

              <div
                ref={previewSlideRef}
                className="relative aspect-[16/9] w-full overflow-hidden rounded-[32px] border border-white/85 bg-white shadow-[0_24px_64px_rgba(15,23,42,0.10)]"
              >
                <div className="relative h-full w-full p-8 md:p-12 lg:p-16">
                  <SlideRenderer
                    slide={currentSlide}
                    onProfileChange={setProfileState}
                    onEducationChange={setEducationState}
                    onAwardChange={(index, next) =>
                      setAwardsState((prev) =>
                        prev.map((award, awardIndex) => (awardIndex === index ? next : award))
                      )
                    }
                    onExperienceChange={(index, next) =>
                      setExperiencesState((prev) =>
                        prev.map((experience, experienceIndex) =>
                          experienceIndex === index ? next : experience
                        )
                      )
                    }
                    onProjectChange={(index, next) =>
                      setProjectsState((prev) =>
                        prev.map((project, projectIndex) => (projectIndex === index ? next : project))
                      )
                    }
                  />
                </div>
              </div>

              <button
                onClick={goNext}
                disabled={isLastSlide}
                className="absolute right-3 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#BFDBFE] bg-[#2563EB] text-lg font-semibold text-white shadow-[0_18px_40px_rgba(37,99,235,0.25)] transition hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-35 md:flex"
                aria-label="다음 슬라이드"
              >
                →
              </button>
            </div>

            <div className="mt-5 flex items-center gap-2 overflow-x-auto pb-1">
              {slides.map((slide, idx) => (
                <button
                  key={idx}
                  onClick={() => goTo(idx)}
                  className={`h-2 min-w-[56px] rounded-full transition ${
                    idx === currentIndex
                      ? 'bg-[#2563EB]'
                      : 'bg-[#DBEAFE] hover:bg-[#93C5FD]'
                  }`}
                  aria-label={`slide-${idx + 1}`}
                  title={getSlideTitle(slide, idx)}
                />
              ))}
            </div>

            <div className="flex gap-2 md:hidden">
              <button
                onClick={goPrev}
                disabled={isFirstSlide}
                className="flex-1 rounded-2xl border border-white/85 bg-white/85 px-4 py-3 text-sm font-semibold text-neutral-700 shadow-[0_10px_24px_rgba(15,23,42,0.05)] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                이전
              </button>
              <button
                onClick={goNext}
                disabled={isLastSlide}
                className="flex-1 rounded-2xl bg-[#2563EB] px-4 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(37,99,235,0.24)] transition hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-40"
              >
                다음
              </button>
            </div>
          </StepSectionCard>
        </div>
      </main>

      {isFeedbackOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/30 px-6 print:hidden">
          <div className="w-full max-w-2xl rounded-[32px] border border-white/80 bg-white/92 p-7 shadow-[0_30px_80px_rgba(15,23,42,0.18)] backdrop-blur-2xl sm:p-8">
            <div className="flex items-start justify-between gap-6">
              <div>
                <div className="inline-flex items-center rounded-full border border-[#DBEAFE] bg-[#EFF6FF] px-3 py-1 text-xs font-semibold text-[#2563EB]">
                  AI Feedback
                </div>
                <h2 className="mt-4 text-[28px] font-semibold tracking-[-0.04em] text-neutral-950">
                  포트폴리오 개선 포인트
                </h2>
                <p className="mt-2 text-sm leading-6 text-neutral-500">
                  현재 슬라이드 구성을 기준으로 바로 보완할 만한 항목만 정리했습니다.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsFeedbackOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/5 bg-[#F8FAFC] text-lg text-neutral-500 transition hover:bg-white hover:text-neutral-900"
                aria-label="AI 피드백 닫기"
              >
                ×
              </button>
            </div>

            <div className="mt-6 space-y-3">
              {feedbackItems.map((item) => (
                <div
                  key={item}
                  className="rounded-[22px] border border-black/5 bg-[#F8FAFC] px-5 py-4"
                >
                  <p className="text-sm leading-7 text-neutral-700">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between rounded-[22px] border border-[#DBEAFE] bg-[#EFF6FF] px-5 py-4">
              <p className="text-sm text-[#1D4ED8]">
                추천: 프로젝트 슬라이드에 성과 수치나 사용 기술별 기여도를 한 줄씩 추가해 보세요.
              </p>
              <button
                type="button"
                onClick={() => setIsFeedbackOpen(false)}
                className="ml-4 inline-flex h-10 items-center justify-center rounded-full bg-[#2563EB] px-4 text-sm font-semibold text-white transition hover:bg-[#1D4ED8]"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="pointer-events-none fixed -left-[10000px] top-0 z-[-1] opacity-0">
        {slides.map((slide, index) => (
          <div key={index} className="mb-10" style={{ width: `${exportWidth}px` }}>
            <div
              ref={(element) => {
                exportSlideRefs.current[index] = element
              }}
              className="relative aspect-[16/9] w-full overflow-hidden rounded-[32px] border border-white/85 bg-white shadow-[0_24px_64px_rgba(15,23,42,0.10)]"
            >
              <div className="relative h-full w-full p-8 md:p-12 lg:p-16">
                <SlideRenderer slide={slide} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </StepPage>
  )
}

function SlideRenderer({
  slide,
  onProfileChange,
  onEducationChange,
  onAwardChange,
  onExperienceChange,
  onProjectChange,
}: {
  slide: Slide
  onProfileChange?: (next: Profile) => void
  onEducationChange?: (next: Education) => void
  onAwardChange?: (index: number, next: Award) => void
  onExperienceChange?: (index: number, next: Experience) => void
  onProjectChange?: (index: number, next: Project) => void
}) {
  switch (slide.type) {
    case 'profile':
      return <ProfileSlide profile={slide.data} onChange={onProfileChange} />
    case 'education':
      return (
        <EducationSlide
          education={slide.data.education}
          awards={slide.data.awards}
          onEducationChange={onEducationChange}
          onAwardChange={onAwardChange}
        />
      )
    case 'experience':
      return (
        <ExperienceSlide
          experience={slide.data}
          index={slide.index}
          onChange={onExperienceChange}
        />
      )
    case 'projectIndex':
      return <ProjectIndexSlide projects={slide.data} />
    case 'project':
      return (
        <ProjectSlide
          project={slide.data}
          index={slide.index}
          onChange={onProjectChange}
        />
      )
    default:
      return null
  }
}

function EditableInput({
  value,
  onChange,
  className,
  multiline = false,
  placeholder,
  fullWidth = true,
}: {
  value: string
  onChange?: (value: string) => void
  className: string
  multiline?: boolean
  placeholder?: string
  fullWidth?: boolean
}) {
  if (!onChange) {
    return multiline ? (
      <p className={className}>{value}</p>
    ) : (
      <span className={className}>{value}</span>
    )
  }

  if (multiline) {
    return (
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={`${className} w-full resize-none border-none bg-transparent p-0 outline-none ring-0 placeholder:text-neutral-300`}
        rows={3}
      />
    )
  }

  return (
    <input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      style={fullWidth ? undefined : { width: `${Math.max(value.length, 1)}ch` }}
      className={`${className} ${fullWidth ? 'w-full' : 'w-auto'} border-none bg-transparent p-0 outline-none ring-0 placeholder:text-neutral-300`}
    />
  )
}

function EditableParagraphList({
  items,
  onChange,
  itemClassName,
  multiline = false,
}: {
  items: string[]
  onChange?: (index: number, value: string) => void
  itemClassName: string
  multiline?: boolean
}) {
  return (
    <>
      {items.map((item, index) => (
        <EditableInput
          key={index}
          value={item}
          onChange={onChange ? (value) => onChange(index, value) : undefined}
          className={itemClassName}
          multiline={multiline}
        />
      ))}
    </>
  )
}

function ProfileSlide({
  profile,
  onChange,
}: {
  profile: Profile
  onChange?: (next: Profile) => void
}) {
  return (
    <section className="flex h-full flex-col justify-between">
      <div className="grid h-full grid-cols-1 gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="flex flex-col justify-between rounded-[24px] border border-black/5 bg-white/72 p-7 shadow-[0_14px_30px_rgba(15,23,42,0.06)] md:p-9">
          <div>
            <div className="mb-3 inline-flex rounded-full border border-[#DBEAFE] bg-[#EFF6FF] px-3 py-1.5 text-xs font-semibold text-[#2563EB]">
              Slide 1 · Profile
            </div>

            <EditableInput
              value={profile.name}
              onChange={onChange ? (value) => onChange({ ...profile, name: value }) : undefined}
              className="text-4xl font-semibold tracking-tight text-neutral-950 md:text-6xl"
            />

            <EditableInput
              value={profile.intro}
              onChange={onChange ? (value) => onChange({ ...profile, intro: value }) : undefined}
              className="mt-4 max-w-3xl text-lg leading-8 text-neutral-600 md:text-xl"
              multiline
            />
          </div>

          <div className="mt-7 grid grid-cols-1 gap-3 md:grid-cols-3">
            {profile.summary.map((item, idx) => (
              <div
                key={idx}
                className="rounded-[18px] border border-black/5 bg-[#F8FAFC] p-4"
              >
                <EditableInput
                  value={item}
                  onChange={
                    onChange
                      ? (value) =>
                          onChange({
                            ...profile,
                            summary: profile.summary.map((summary, summaryIndex) =>
                              summaryIndex === idx ? value : summary
                            ),
                          })
                      : undefined
                  }
                  className="text-sm leading-6 text-neutral-700"
                  multiline
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-rows-[1fr_1fr] gap-5">
          <div className="rounded-[24px] border border-black/5 bg-[linear-gradient(145deg,rgba(255,255,255,0.95),rgba(239,246,255,0.92))] p-7">
            <p className="text-sm text-neutral-500">About</p>
            <div className="mt-4 space-y-1">
              <EditableParagraphList
                items={profile.about}
                onChange={
                  onChange
                    ? (index, value) =>
                        onChange({
                          ...profile,
                          about: profile.about.map((line, lineIndex) =>
                            lineIndex === index ? value : line
                          ),
                        })
                    : undefined
                }
                itemClassName="text-[22px] font-medium leading-[1.4] text-neutral-900"
              />
            </div>
          </div>

          <div className="rounded-[24px] border border-[#DBEAFE] bg-[linear-gradient(145deg,rgba(239,246,255,0.96),rgba(219,234,254,0.88))] p-7">
            <p className="text-sm text-neutral-500">Focus</p>
            <div className="mt-4 space-y-3 text-neutral-900">
              {profile.focus.map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="pt-1 text-base">•</span>
                  <EditableInput
                    value={item}
                    onChange={
                      onChange
                        ? (value) =>
                            onChange({
                              ...profile,
                              focus: profile.focus.map((focus, focusIndex) =>
                                focusIndex === index ? value : focus
                              ),
                            })
                        : undefined
                    }
                    className="text-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function EducationSlide({
  education,
  awards,
  onEducationChange,
  onAwardChange,
}: {
  education: Education
  awards: Award[]
  onEducationChange?: (next: Education) => void
  onAwardChange?: (index: number, next: Award) => void
}) {
  return (
    <section className="grid h-full grid-cols-1 gap-5 lg:grid-cols-2">
      <div className="rounded-[24px] border border-black/5 bg-white/72 p-7 shadow-[0_14px_30px_rgba(15,23,42,0.06)] md:p-9">
        <div className="mb-4 inline-flex rounded-full border border-[#DBEAFE] bg-[#EFF6FF] px-3 py-1.5 text-xs font-semibold text-[#2563EB]">
          Slide 2 · Education
        </div>

        <h2 className="text-3xl font-semibold tracking-tight text-neutral-950 md:text-4xl">
          학력
        </h2>

        <div className="mt-8 rounded-[20px] border border-black/5 bg-[#F8FAFC] p-6">
          <p className="text-sm text-neutral-500">School</p>
          <EditableInput
            value={education.school}
            onChange={
              onEducationChange
                ? (value) => onEducationChange({ ...education, school: value })
                : undefined
            }
            className="mt-2 text-[24px] font-medium text-neutral-950"
          />

          <p className="mt-6 text-sm text-neutral-500">Major</p>
          <EditableInput
            value={education.major}
            onChange={
              onEducationChange
                ? (value) => onEducationChange({ ...education, major: value })
                : undefined
            }
            className="mt-2 text-xl text-neutral-800"
          />

          <p className="mt-6 text-sm text-neutral-500">Period</p>
          <EditableInput
            value={education.period}
            onChange={
              onEducationChange
                ? (value) => onEducationChange({ ...education, period: value })
                : undefined
            }
            className="mt-2 text-lg text-neutral-600"
          />
        </div>
      </div>

      <div className="rounded-[24px] border border-black/5 bg-white/72 p-7 shadow-[0_14px_30px_rgba(15,23,42,0.06)] md:p-9">
        <div className="mb-4 inline-flex rounded-full border border-[#DBEAFE] bg-[#EFF6FF] px-3 py-1.5 text-xs font-semibold text-[#2563EB]">
          Slide 2 · Awards
        </div>

        <h2 className="text-3xl font-semibold tracking-tight text-neutral-950 md:text-4xl">
          수상 내역
        </h2>

        <div className="mt-7 space-y-3">
          {awards.map((award, idx) => (
            <div
              key={idx}
              className="rounded-[18px] border border-black/5 bg-[#F8FAFC] p-4"
            >
              <EditableInput
                value={award.name}
                onChange={
                  onAwardChange
                    ? (value) => onAwardChange(idx, { ...award, name: value })
                    : undefined
                }
                className="text-xl font-medium text-neutral-900"
              />
              <div className="mt-2 grid grid-cols-2 gap-3">
                <EditableInput
                  value={award.org ?? ''}
                  onChange={
                    onAwardChange
                      ? (value) => onAwardChange(idx, { ...award, org: value })
                      : undefined
                  }
                  className="text-sm text-neutral-500"
                  placeholder="주최 기관"
                />
                <EditableInput
                  value={award.year ?? ''}
                  onChange={
                    onAwardChange
                      ? (value) => onAwardChange(idx, { ...award, year: value })
                      : undefined
                  }
                  className="text-sm text-neutral-500 text-right"
                  placeholder="연도"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ExperienceSlide({
  experience,
  index,
  onChange,
}: {
  experience: Experience
  index: number
  onChange?: (index: number, next: Experience) => void
}) {
  return (
    <section className="grid h-full grid-cols-1 gap-5 lg:grid-cols-[0.7fr_1.3fr]">
      <div className="rounded-[24px] border border-[#DBEAFE] bg-[linear-gradient(145deg,rgba(239,246,255,0.96),rgba(219,234,254,0.88))] p-7 md:p-9">
        <div className="mb-4 inline-flex rounded-full border border-white/70 bg-white/75 px-3 py-1.5 text-xs font-semibold text-[#2563EB]">
          Experience
        </div>

        <p className="text-sm text-neutral-500">Organization</p>
        <EditableInput
          value={experience.org}
          onChange={onChange ? (value) => onChange(index, { ...experience, org: value }) : undefined}
          className="mt-2 text-3xl font-semibold tracking-tight text-neutral-950 md:text-4xl"
        />

        <p className="mt-8 text-sm text-neutral-500">Role</p>
        <EditableInput
          value={experience.title}
          onChange={
            onChange ? (value) => onChange(index, { ...experience, title: value }) : undefined
          }
          className="mt-2 text-xl text-neutral-800"
        />

        <p className="mt-8 text-sm text-neutral-500">Period</p>
        <EditableInput
          value={experience.period}
          onChange={
            onChange ? (value) => onChange(index, { ...experience, period: value }) : undefined
          }
          className="mt-2 text-lg text-neutral-600"
        />
      </div>

      <div className="rounded-[24px] border border-black/5 bg-white/72 p-7 shadow-[0_14px_30px_rgba(15,23,42,0.06)] md:p-9">
        <h3 className="text-2xl font-semibold tracking-tight text-neutral-950 md:text-3xl">
          경력 사항
        </h3>

        <div className="mt-6 rounded-[20px] border border-black/5 bg-[#F8FAFC] p-6">
          <EditableInput
            value={experience.description}
            onChange={
              onChange
                ? (value) => onChange(index, { ...experience, description: value })
                : undefined
            }
            className="text-sm leading-7 text-neutral-700 md:text-lg"
            multiline
          />
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="rounded-[18px] border border-black/5 bg-[#F8FAFC] p-4">
            <p className="text-sm text-neutral-500">Key Contribution</p>
            <EditableInput
              value={experience.keyContribution}
              onChange={
                onChange
                  ? (value) => onChange(index, { ...experience, keyContribution: value })
                  : undefined
              }
              className="mt-3 text-sm leading-6 text-neutral-700"
              multiline
            />
          </div>
          <div className="rounded-[18px] border border-black/5 bg-[#F8FAFC] p-4">
            <p className="text-sm text-neutral-500">Outcome</p>
            <EditableInput
              value={experience.outcome}
              onChange={
                onChange ? (value) => onChange(index, { ...experience, outcome: value }) : undefined
              }
              className="mt-3 text-sm leading-6 text-neutral-700"
              multiline
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function ProjectIndexSlide({ projects }: { projects: Project[] }) {
  return (
    <section className="flex h-full flex-col justify-center gap-5">
      <div>
        <div className="inline-flex w-fit rounded-full border border-[#BFDBFE] bg-[linear-gradient(160deg,rgba(239,246,255,0.98),rgba(219,234,254,0.92))] px-3 py-1.5 text-xs font-semibold text-[#2563EB]">
          Slide · Project Index
        </div>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-950 md:text-4xl">
          프로젝트 목록
        </h2>
        <div className="mt-1.5 flex items-center gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-400">Reading Flow</p>
          <p className="text-xs text-neutral-400">Left to Right</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="relative rounded-[22px] border border-black/5 bg-[linear-gradient(180deg,rgba(248,250,252,0.92),rgba(255,255,255,0.96))] p-5 shadow-[0_12px_26px_rgba(15,23,42,0.04)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[16px] border border-[#BFDBFE] bg-[linear-gradient(180deg,#EFF6FF_0%,#DBEAFE_100%)] text-base font-semibold text-[#1D4ED8] shadow-[0_8px_20px_rgba(37,99,235,0.12)]">
                {String(idx + 1).padStart(2, '0')}
              </div>
              {idx < projects.length - 1 ? (
                <div className="hidden items-center pt-2 xl:flex">
                  <span className="text-xl text-[#93C5FD]">→</span>
                </div>
              ) : null}
            </div>

            <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-400">
              Project {idx + 1}
            </p>
            <h3 className="mt-1.5 text-xl font-semibold tracking-[-0.03em] text-neutral-950 md:text-2xl">
              {project.name}
            </h3>
            <p className="mt-2 text-sm leading-6 text-neutral-600">
              {project.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

function ProjectSlide({
  project,
  index,
  onChange,
}: {
  project: Project
  index: number
  onChange?: (index: number, next: Project) => void
}) {
  return (
    <section className="grid h-full grid-cols-1 gap-4 lg:grid-cols-[0.82fr_1.18fr]">
      <div className="rounded-[24px] border border-[#DBEAFE] bg-[linear-gradient(145deg,rgba(239,246,255,0.96),rgba(219,234,254,0.88))] p-5 md:p-6">
        <div className="mb-3 inline-flex rounded-full border border-white/70 bg-white/75 px-3 py-1 text-xs font-semibold text-[#2563EB]">
          Project Detail
        </div>

        <EditableInput
          value={project.name}
          onChange={onChange ? (value) => onChange(index, { ...project, name: value }) : undefined}
          className="text-2xl font-semibold tracking-tight text-neutral-950 md:text-3xl"
        />

        <EditableInput
          value={project.description}
          onChange={
            onChange ? (value) => onChange(index, { ...project, description: value }) : undefined
          }
          className="mt-2 text-sm leading-6 text-neutral-600"
          multiline
        />

        <div className="mt-3 grid gap-2">
          {project.role && (
            <div className="rounded-[14px] border border-white/70 bg-white/78 p-3">
              <p className="text-xs text-neutral-500">Role</p>
              <EditableInput
                value={project.role}
                onChange={
                  onChange ? (value) => onChange(index, { ...project, role: value }) : undefined
                }
                className="mt-0.5 text-sm text-neutral-800"
              />
            </div>
          )}

          {project.period && (
            <div className="rounded-[14px] border border-white/70 bg-white/78 p-3">
              <p className="text-xs text-neutral-500">Period</p>
              <EditableInput
                value={project.period}
                onChange={
                  onChange ? (value) => onChange(index, { ...project, period: value }) : undefined
                }
                className="mt-0.5 text-sm text-neutral-800"
              />
            </div>
          )}
        </div>
      </div>

      <div className="rounded-[24px] border border-black/5 bg-white/72 p-5 shadow-[0_14px_30px_rgba(15,23,42,0.06)] md:p-6">
        <h3 className="text-lg font-semibold tracking-tight text-neutral-950 md:text-xl">
          수행 내용
        </h3>

        <div className="mt-3 grid gap-3">
          <div className="rounded-[14px] border border-black/5 bg-[#F8FAFC] p-3.5">
            <p className="text-xs text-neutral-500">Tech Stack</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {(project.techStack ?? []).map((tech, idx) => (
                <div
                  key={idx}
                  className="inline-flex max-w-full rounded-full border border-[#DBEAFE] bg-[#EFF6FF] px-2 py-0.5"
                >
                  <EditableInput
                    value={tech}
                    onChange={
                      onChange
                        ? (value) =>
                            onChange(index, {
                              ...project,
                              techStack: (project.techStack ?? []).map((item, techIndex) =>
                                techIndex === idx ? value : item
                              ),
                            })
                        : undefined
                    }
                    className="whitespace-nowrap text-[11px] font-semibold leading-4 text-[#1D4ED8]"
                    fullWidth={false}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[14px] border border-black/5 bg-[#F8FAFC] p-3.5">
            <p className="text-xs text-neutral-500">Details</p>
            <div className="mt-2 space-y-1.5">
              {(project.details ?? []).map((detail, idx) => (
                <div
                  key={idx}
                  className="rounded-[12px] border border-black/5 bg-white p-2.5"
                >
                  <EditableInput
                    value={detail}
                    onChange={
                      onChange
                        ? (value) =>
                            onChange(index, {
                              ...project,
                              details: (project.details ?? []).map((item, detailIndex) =>
                                detailIndex === idx ? value : item
                              ),
                            })
                        : undefined
                    }
                    className="text-sm leading-5 text-neutral-700"
                    multiline
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function getSlideTitle(slide: Slide, index: number) {
  if (slide.type === 'profile') return '프로필'
  if (slide.type === 'education') return '학력 및 수상'
  if (slide.type === 'experience') return `경력 ${index + 1}`
  if (slide.type === 'projectIndex') return '프로젝트 목록'
  if (slide.type === 'project') return slide.data.name
  return `slide-${index + 1}`
}
