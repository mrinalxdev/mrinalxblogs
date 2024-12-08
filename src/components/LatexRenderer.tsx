'use client'

import { useEffect, useRef } from 'react'
import katex from 'katex'
import 'katex/dist/katex.min.css'

interface LatexRendererProps {
  content: string
}

export default function LatexRenderer({ content }: LatexRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      katex.render(content, containerRef.current, {
        throwOnError: false,
        displayMode: true,
        trust: true,
        macros: {
          "\\section": "\\textbf{#1}\\par",
          "\\subsection": "\\textbf{#1}\\par",
          "\\begin": "\\begingroup",
          "\\end": "\\endgroup",
          "\\item": "• ",
        },
      })
    }
  }, [content])

  return <div ref={containerRef} className="katex-typography" />
}

