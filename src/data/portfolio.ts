export interface ExperienceEntry {
  id: string
  date: string
  title: string
  company: string
  shortLabel: string
  shortSummary: string
  workType?: string
  description: string[]
  tags?: string[]
  link?: string
  info?: string
}

export interface TreeRow {
  left?: ExperienceEntry
  right?: ExperienceEntry
  staggerRight?: boolean
}

export interface EducationDetail {
  label: string
  value: string
}

export interface EducationEntry {
  id: string
  date: string
  title: string
  company: string
  shortLabel: string
  shortSummary: string
  information: string
  details?: EducationDetail[]
  tags?: string[]
}

export interface CertificationEntry {
  date: string
  title: string
  company: string
  shortSummary: string
  link: string
  information?: string
}

export type ProjectTagKey =
  | "Oracle"
  | "Next"
  | "PYTHON"
  | "PYTORCH"
  | "NUMPY"
  | "YOLO"
  | "HUGGINGFACE"
  | "PANDAS"

export interface ProjectModuleLink {
  label: string
  href: string
  kind: "github" | "docs" | "pypi" | "external"
}

export interface ProjectEcosystemNode {
  id: string
  name: string
  role: string
  version: string
  badge: string
  description: string
  accent: "indigo" | "sky" | "emerald" | "violet"
  icon: "python" | "desktop" | "ai" | "plugin"
  installHint?: string
  links: ProjectModuleLink[]
}

export interface ProjectEvolution {
  legacy: {
    version: string
    date: string
    status: string
    title: string
    subtitle: string
    description: string
    image: string
    links: ProjectModuleLink[]
  }
  current: {
    version: string
    date: string
    status: string
    title: string
    subtitle: string
    description: string
    image: string
    primaryLinks: ProjectModuleLink[]
    modules: ProjectEcosystemNode[]
  }
}

export interface ProjectEntry {
  id: string
  date: string
  shortLabel: string
  title: string
  subtitle?: string
  badge?: string
  installHint?: string
  docLabel?: string
  imageCaption?: string
  shortSummary: string
  description: string
  link: string
  github: string
  preview?: string
  image: string
  tagKeys: ProjectTagKey[]
  evolution?: ProjectEvolution
}

export interface PublicationEntry {
  id: string
  date: string
  shortLabel: string
  title: string
  shortSummary: string
  venue: string
  venueShort: string
  pages: string
  authors: string[]
  abstract: string
  pdfUrl: string
  tags: string[]
}

export function isOngoingDate(dateStr: string): boolean {
  const lower = dateStr.toLowerCase()
  return lower.includes("ongoing") || lower.includes("present")
}

export function parseDate(dateStr: string): Date {
  const monthMap: Record<string, number> = {
    jan: 0, january: 0,
    feb: 1, february: 1,
    mar: 2, march: 2,
    apr: 3, april: 3,
    may: 4,
    jun: 5, june: 5,
    jul: 6, july: 6,
    aug: 7, august: 7,
    sep: 8, sept: 8, september: 8,
    oct: 9, october: 9,
    nov: 10, november: 10,
    dec: 11, december: 11,
  }

  const cleaned = dateStr.toLowerCase().replace(/[.,]/g, "").trim()
  const parts = cleaned.split(/\s+/)
  const month = monthMap[parts[0]] ?? 0
  const yearMatch = cleaned.match(/\b\d{4}\b/)
  const year = yearMatch ? parseInt(yearMatch[0], 10) : parseInt(parts[1], 10)
  return new Date(year, month, 1)
}

export function parseDateRange(rangeStr: string, now: Date = new Date()) {
  const [startStr, endStr] = rangeStr.split(" - ")
  const startDate = parseDate(startStr)
  const isOngoing = endStr ? isOngoingDate(endStr) : false
  const endDate = !endStr ? startDate : isOngoing ? now : parseDate(endStr)
  return { startDate, endDate, isOngoing }
}

export function calculateDuration(startDate: Date, endDate: Date): string {
  const totalMonths =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth())

  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12

  if (years === 0 && months === 0) return "Less than a month"
  if (years === 0) return `${months} ${months === 1 ? "month" : "months"}`
  if (months === 0) return `${years} ${years === 1 ? "year" : "years"}`
  return `${years} ${years === 1 ? "year" : "years"} ${months} ${months === 1 ? "month" : "months"}`
}

export function toMonthIndex(date: Date): number {
  return date.getFullYear() * 12 + date.getMonth()
}

export const EXPERIENCE_ITEMS: Record<
  "oastce" | "arsys" | "tupl" | "uma",
  ExperienceEntry
> = {
  oastce: {
    id: "exp-oastce",
    date: "February 2026 - Ongoing",
    title: "Head of Engineering",
    company: "Ceuta Tax Authority (OASTCE)",
    shortLabel: "OASTCE · Head of Eng.",
    shortSummary:
      "Strategic lead driving the digital modernization, technical architecture, and infrastructure security of Ceuta’s Tax Authority.",
    workType: "Full-time",
    description: [
      "Strategic lead responsible for overseeing the technological transition and digital modernization of the Tax Authority. My role focuses on ensuring the reliability, security, and evolution of the organization’s technical infrastructure to optimize public service delivery and operational efficiency.",
    ],
    tags: ["Digital Modernization", "Architecture", "Public Sector", "Security"],
    link: "https://www.tributosceuta.org/",
  },
  arsys: {
    id: "exp-arsys",
    date: "Jan 2026 - June 2026",
    title: "AI Software Engineer",
    company: "Arsys",
    shortLabel: "Arsys · AI Eng.",
    shortSummary:
      "Designed an automated Python & LLM-as-Judge benchmarking framework evaluating GPU and Edge models across 13 capabilities for Arsys Innovation.",
    workType: "Part-time · Remote",
    description: [
      "Led the design and development of an automated Python benchmarking framework for the Arsys Innovation Team to comprehensively evaluate Large (GPU) and Small (CPU/Edge) Language Models across 13 critical dimensions, including reasoning, security, and tool calling.",
      "Architected a scalable test execution engine integrated with OpenAI-compatible endpoints utilizing rule-based and LLM-as-Judge scoring, backed by SQLAlchemy 2.0, Pydantic v2, an interactive Gradio dashboard, and automated CI/CD pipelines.",
    ],
    tags: ["Python", "LLM-as-Judge", "SQLAlchemy 2.0", "Pydantic v2", "Gradio", "CI/CD"],
    link: "https://www.arsys.es/",
  },
  tupl: {
    id: "exp-tupl",
    date: "March 2025 - February 2026",
    title: "Jr. AI Software Engineer",
    company: "Tupl Inc.",
    shortLabel: "Tupl Inc. · AI Eng.",
    shortSummary:
      "Built GenAI, RAG, and multi-agent (MCP/A2A) services on TuplOS with Jenkins CI/CD, Docker, and Kubernetes production deployments.",
    workType: "Full-time",
    description: [
      "Developed and deployed AI, ML, and GenAI solutions across internal TuplOS tools and enterprise services, integrating LLMs, RAG pipelines, and an agentic framework supporting MCP, A2A communication, and multi-agent orchestration.",
      "Led the end-to-end development lifecycle including architecture design, Jenkins CI/CD pipelines, Kubernetes and Docker production deployments, Helm charts, and cluster monitoring.",
    ],
    tags: ["LLMs", "RAG", "MCP / A2A", "Kubernetes", "Docker", "Helm", "Jenkins"],
    link: "https://www.tupl.com/",
  },
  uma: {
    id: "exp-uma",
    date: "Sept. 2024 - June 2025",
    title: "AI Researcher",
    company: "Scenic & KHAOS Research Group, ITIS UMA",
    shortLabel: "ITIS UMA · AI Research",
    shortSummary:
      "Coauthored the SAES Python library, researched LLM code generation with jMetal/LangChain, and optimized BPMN processes with GNNs.",
    workType: "Research",
    description: [
      "Coauthored and published the SAES Python library for non-parametric statistical tests with researcher Antonio J. Nebro, and conducted research on automatic code generation using LLMs integrating LangChain with jMetal and jMetalPy.",
      "Developed business process optimization solutions using ML and Graph Neural Networks (GNNs) alongside BPMN tools (Activiti, Bonita BPM, Camunda), genetic algorithms, and multi-objective optimization.",
    ],
    tags: ["Python", "SAES", "LangChain", "GNNs", "jMetalPy", "Optimization"],
    link: "https://khaos.uma.es/",
  },
}

export const EXPERIENCE_TREE_ROWS: TreeRow[] = [
  { left: EXPERIENCE_ITEMS.oastce, right: EXPERIENCE_ITEMS.arsys, staggerRight: true },
  { left: EXPERIENCE_ITEMS.tupl, right: EXPERIENCE_ITEMS.uma, staggerRight: true },
]

export const EDUCATION_ITEMS: EducationEntry[] = [
  {
    id: "edu-phd",
    date: "Nov 2026 - Present",
    title: "Doctor of Philosophy - Ph.D, Computer Science",
    company: "University of Málaga (UMA)",
    shortLabel: "Ph.D.",
    shortSummary:
      "Doctoral research applying AI, data integration, and multi-objective optimization to precision agriculture (advised by Dr. J. M. García Nieto & Dr. C. Barba González).",
    information: "https://www.uma.es/",
    details: [
      {
        label: "Research Line",
        value:
          "Advanced Algorithms and Modeling with Artificial Intelligence, Data Integration, and Processing.",
      },
      {
        label: "Dissertation Topic",
        value:
          "Application of advanced Artificial Intelligence techniques, data integration, and optimization algorithms to complex problem-solving in precision agriculture and resource efficiency management.",
      },
      {
        label: "Technical Focus",
        value:
          "Machine Learning, Deep Learning, and multi-objective optimization for informed decision-making balancing sustainability and agricultural productivity.",
      },
      {
        label: "Advisors",
        value: "Dr. José Manuel García Nieto and Dr. Cristóbal Barba González.",
      },
    ],
    tags: [
      "Algorithms",
      "Artificial Intelligence",
      "Deep Learning",
      "Multi-Objective Optimization",
      "Precision Agriculture",
    ],
  },
  {
    id: "edu-msc",
    date: "October 2025 - Oct. 2026",
    title: "Master's degree in Artificial Intelligence (MSc)",
    company: "UNIR - Rioja's International University",
    shortLabel: "MSc AI · UNIR",
    shortSummary:
      "Graduate specialization in artificial intelligence, machine learning, deep learning, NLP, and intelligent autonomous systems.",
    information: "https://www.unir.net/ingenieria/master-inteligencia-artificial/",
  },
  {
    id: "edu-bsc",
    date: "Sept. 2021 - July 2025",
    title: "Bachelor's Degree Software Engineering (BSc)",
    company: "University of Málaga (UMA)",
    shortLabel: "BSc Software Eng. · UMA",
    shortSummary:
      "Four-year engineering degree in software architecture, algorithms, databases, and applied AI; thesis project NND on 3-D MRI lesion segmentation.",
    information: "https://www.uma.es/grado-en-ingenieria-informatica",
  },
  {
    id: "edu-bac",
    date: "Sept. 2019 - June 2021",
    title: "Scientific Baccalaureate",
    company: "Novaschool Añoreta",
    shortLabel: "Baccalaureate",
    shortSummary:
      "Pre-university scientific and technological track focused on mathematics, physics, and engineering foundations.",
    information: "https://anoreta.novaschool.es/",
  },
]

export const LANGUAGE_CERTIFICATIONS: CertificationEntry[] = [
  {
    date: "December 2023",
    title: "Certificate of Proficiency in English (C2)",
    company: "Cambridge University Press and Assessment English",
    shortSummary:
      "CEFR Level C2 mastery-level English proficiency credential certified by Cambridge Assessment.",
    information: "https://www.cambridgeenglish.org/es/exams-and-tests/proficiency/",
    link: "https://raw.githubusercontent.com/rorro6787/rorro6787/main/Images/diplomaC2.jpeg",
  },
]

export const TECHNICAL_CERTIFICATIONS: CertificationEntry[] = [
  {
    date: "April 2026",
    title: "Introduction to agent skills",
    company: "Anthropic",
    shortSummary:
      "Foundations for designing, packaging, and composing reusable agent skills.",
    link: "http://verify.skilljar.com/c/36zny5iw625i",
  },
  {
    date: "April 2026",
    title: "Model Context Protocol: Advanced Topics",
    company: "Anthropic",
    shortSummary:
      "Advanced MCP architecture, tool/resource patterns, and agent interoperability.",
    link: "https://verify.skilljar.com/c/3zkwt72k35jy",
  },
  {
    date: "April 2026",
    title: "AI Fluency Framework & Foundations",
    company: "Anthropic",
    shortSummary:
      "Core concepts and structured workflows for effective human-AI collaboration.",
    link: "https://verify.skilljar.com/c/tjt35nj4mh32",
  },
  {
    date: "April 2026",
    title: "Claude Code in Action",
    company: "Anthropic",
    shortSummary:
      "Practical agentic software engineering workflows using Claude Code.",
    link: "https://verify.skilljar.com/c/etdqxifogznt",
  },
  {
    date: "March 2026",
    title: "AZ-900: Microsoft Azure Fundamentals",
    company: "Microsoft",
    shortSummary:
      "Core cloud concepts, Azure compute/storage architecture, governance, and security.",
    link: "https://www.credly.com/badges/03f10561-bfe6-4d9b-bae6-f3d556b9d02b/linked_in_profile",
  },
  {
    date: "July 2025",
    title: "Oracle AI Vector Search Certified Professional",
    company: "Oracle",
    shortSummary:
      "Vector embeddings, similarity indexing, and semantic search in Oracle Database.",
    link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=4A92B86FB26278A35CE8E68B3BD4BAA3B01B2EB7E24EF7E9CC470ABFDA5B5C61",
  },
  {
    date: "July 2025",
    title: "Oracle Cloud Infrastructure 2025 Certified Data Science Professional",
    company: "Oracle",
    shortSummary:
      "End-to-end machine learning modeling, training, and MLOps pipelines on OCI.",
    link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=2BDDDCD9363B054F5122AF769B77E8BA9F368CE7E45238AA15AB3247D45C9CD4",
  },
  {
    date: "July 2025",
    title: "Oracle Cloud Infrastructure 2025 Generative AI Certified Professional",
    company: "Oracle",
    shortSummary:
      "Building, tuning, and deploying LLM and RAG applications on Oracle Cloud.",
    link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=40B97065B7DE4C06687FB0689D921902ABC9779F7A2B76153DE87F9AC6ECAF63",
  },
  {
    date: "October 2024",
    title: "Salesforce AI Associate",
    company: "Salesforce",
    shortSummary:
      "Foundational AI principles, ethical data handling, and CRM AI workflows.",
    link: "https://github.com/rorro6787/rorro6787/blob/main/Images/Salesforce_AI_Associate.pdf",
  },
  {
    date: "October 2024",
    title: "Disaster Risk Monitoring Using Satellite Imagery",
    company: "Nvidia DLI",
    shortSummary:
      "Deep learning and geospatial computer vision over satellite disaster imagery.",
    link: "https://learn.nvidia.com/certificates?id=9nn5auHiTg-pNW5kd4o-EA#",
  },
  {
    date: "October 2024",
    title: "Getting Started with AI on Jetson Nano",
    company: "Nvidia DLI",
    shortSummary:
      "Edge AI computer vision inference and classification on NVIDIA Jetson Nano.",
    link: "https://learn.nvidia.com/certificates?id=PgFiuC9URCa0CyNw5C7HKQ",
  },
  {
    date: "August 2024",
    title: "Efficient Large Language Model (LLM) Customization",
    company: "Nvidia DLI",
    shortSummary:
      "Parameter-efficient fine-tuning (PEFT) and adaptation methods for LLMs.",
    link: "https://learn.nvidia.com/certificates?id=zsC9V4AyQXesN06iAhXuYQ#",
  },
  {
    date: "July 2024",
    title: "Oracle Guided Learning Content Developer Certified Foundations Associate",
    company: "Oracle",
    shortSummary:
      "Creating and publishing interactive in-app guidance flows with Oracle Guided Learning.",
    link: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=F09397A2CCA0CCE103FD6E5FD4871757D1B8514D64F6CB652E6FC8BE30D753B8",
  },
  {
    date: "July 2024",
    title: "Oracle Guided Learning Project Management Foundations Associate",
    company: "Oracle",
    shortSummary:
      "Planning, rollout methodology, and governance for Oracle Guided Learning projects.",
    link: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=DCC06D1FE4C8D1E31A9756A7C47E22F6EFBCFAA116AF1FD0DCB9836D8E04410B",
  },
  {
    date: "July 2024",
    title: "Rapid Application Development with Large Language Models (LLMs)",
    company: "Nvidia DLI",
    shortSummary:
      "Rapid prototyping and integration of LLM-powered applications.",
    link: "https://learn.nvidia.com/certificates?id=bqNe6vAJSPGOZKYifg4YpQ",
  },
  {
    date: "March 2024",
    title: "Building Transformer-Based Natural Language Processing Applications",
    company: "Nvidia DLI",
    shortSummary:
      "Transformer architectures and fine-tuning workflows for NLP tasks.",
    link: "https://courses.nvidia.com/certificates/41b0cdb2f9714217aa7f65d4f23f8fc3/",
  },
  {
    date: "November 2023",
    title: "Fundamentals of Deep Learning",
    company: "Nvidia DLI",
    shortSummary:
      "Neural networks, CNNs, data augmentation, and transfer learning foundations.",
    link: "https://courses.nvidia.com/certificates/ab163f0f315946509a663944a01e37e2/",
  },
  {
    date: "October 2023",
    title: "Fundamentals of Accelerated Computing with CUDA C/C++",
    company: "Nvidia DLI",
    shortSummary:
      "GPU parallel computing, kernel execution, and CUDA memory optimization.",
    link: "https://courses.nvidia.com/certificates/24256f061e75432899a9f7db2f0edebf/",
  },
  {
    date: "August 2023",
    title: "Git: From Noob to Pro!",
    company: "Mastermind",
    shortSummary:
      "Version control, branching strategies, conflict resolution, and Git collaboration.",
    link: "https://mastermind.ac/certificates/b6a0dc594c9a4193aec061c398ae4a87",
  },
  {
    date: "May 2023",
    title: "Learn Programming with Python",
    company: "Mastermind",
    shortSummary:
      "Core Python programming, data structures, control flow, and functions.",
    link: "https://mastermind.ac/certificates/29bc709927a348e6bad0958ae8959088",
  },
  {
    date: "November 2022",
    title: "Mastering Microsoft Word",
    company: "Udemy",
    shortSummary:
      "Structured document formatting, styles, references, and productivity workflows.",
    link: "https://www.udemy.com/certificate/UC-477f01b1-4984-466c-b27b-45eda7ed0c72/",
  },
]

export const PROJECT_ITEMS: ProjectEntry[] = [
  {
    id: "proj-saes",
    date: "November 2026",
    shortLabel: "SAES 2.0",
    title: "SAES — Stochastic Algorithm Evaluation Suite",
    shortSummary:
      "Multi-repo statistical evaluation ecosystem (v2.0): PyPI library & FastAPI server, React/Tauri Studio UI, tool-calling AI statistical consultant, and Claude Code agent skills — evolved from SAES v1.0.",
    description:
      "Open-source scientific ecosystem for frequentist, exact Bayesian, equivalence (TOST), sensitivity (MDES), and Dolan–Moré meta-benchmark evaluation of stochastic algorithms.",
    link: "https://saes-suite.github.io/saes/",
    github: "https://github.com/saes-suite",
    preview: "https://pypi.org/project/saes/",
    image: "/projects/saes-v2-logo.svg",
    tagKeys: ["PYTHON", "NUMPY", "PANDAS", "Next"],
    evolution: {
      legacy: {
        version: "v1.x",
        date: "September 2024",
        status: "Deprecated · Legacy",
        title: "SAES v1.0 (jMetal/SAES)",
        subtitle: "Original standalone Python library · ITIS UMA",
        description:
          "First generation coauthored with Antonio J. Nebro for non-parametric statistical testing (Friedman, Wilcoxon, Nemenyi), boxplots, critical distance diagrams, Pareto fronts, and LaTeX tables. Superseded by the v2.0 ecosystem (legacy scripts can pin SAES<2).",
        image: "/projects/SAES_logo.png",
        links: [
          {
            label: "Legacy Repo",
            href: "https://github.com/jMetal/SAES",
            kind: "github",
          },
          {
            label: "v1 Docs",
            href: "https://jMetal.github.io/SAES/",
            kind: "docs",
          },
          {
            label: "PyPI (v1)",
            href: "https://pypi.org/project/saes/1.5.0/",
            kind: "pypi",
          },
        ],
      },
      current: {
        version: "v2.0.0",
        date: "November 2026",
        status: "Active · Ecosystem",
        title: "SAES 2.0 Ecosystem",
        subtitle: "API-First Scientific Suite · 4 Coordinated Repositories + Tauri Desktop",
        description:
          "Complete architectural evolution into an API-first evaluation platform combining rigorous frequentist & exact Bayesian inference, TOST equivalence, MDES sensitivity audits, 10 publication plotters, and SHA-256 FAIR reproducibility packs — accessible from Python, Web/Desktop UI, an agentic AI consultant, and Claude Code skills.",
        image: "/projects/saes-v2-logo.svg",
        primaryLinks: [
          {
            label: "GitHub Org",
            href: "https://github.com/saes-suite",
            kind: "github",
          },
          {
            label: "Docs",
            href: "https://saes-suite.github.io/saes/",
            kind: "docs",
          },
          {
            label: "PyPI",
            href: "https://pypi.org/project/saes/",
            kind: "pypi",
          },
          {
            label: "Desktop Executable",
            href: "https://github.com/saes-suite/saes-bundle/releases",
            kind: "external",
          },
        ],
        modules: [
          {
            id: "saes-core",
            name: "saes",
            role: "Core Python Library & FastAPI Server",
            version: "v2.0.0",
            badge: "PyPI Package",
            description:
              "Assumption-driven frequentist & exact Bayesian tests (Plackett–Luce, Benavoli simplex), 13 multiplicity corrections, TOST/MDES, 10 publication plots, LaTeX/PDF/DOCX tables, and REST API.",
            accent: "indigo",
            icon: "python",
            installHint: "pip install saes",
            links: [
              {
                label: "PyPI",
                href: "https://pypi.org/project/saes/",
                kind: "pypi",
              },
              {
                label: "Docs",
                href: "https://saes-suite.github.io/saes/",
                kind: "docs",
              },
              {
                label: "GitHub",
                href: "https://github.com/saes-suite/saes",
                kind: "github",
              },
            ],
          },
          {
            id: "saes-ui",
            name: "saes-ui + Desktop",
            role: "Web Workbench & Tauri v2 Desktop App",
            version: "v0.4.1",
            badge: "Web & Desktop UI",
            description:
              "Thin-client React 18, TypeScript, and Plotly.js workbench for interactive CSV inspection, Post-Hoc Lab, Dolan–Moré profiles, and FAIR exports — also packaged as a native Tauri v2 desktop app & Docker stack.",
            accent: "sky",
            icon: "desktop",
            links: [
              {
                label: "saes-ui",
                href: "https://github.com/saes-suite/saes-ui",
                kind: "github",
              },
              {
                label: "saes-bundle",
                href: "https://github.com/saes-suite/saes-bundle",
                kind: "github",
              },
            ],
          },
          {
            id: "saes-ai",
            name: "saes-ai",
            role: "Agentic Statistical Consultant & Streaming API",
            version: "v0.4.1",
            badge: "AI Consultant",
            description:
              "Multi-provider LLM statistical assistant (local Ollama with model management, Anthropic Claude, OpenAI, Gemini) featuring native tool calling over SAES routines and live artifact streaming via FastAPI.",
            accent: "emerald",
            icon: "ai",
            links: [
              {
                label: "GitHub",
                href: "https://github.com/saes-suite/saes-ai",
                kind: "github",
              },
            ],
          },
          {
            id: "saes-plugins",
            name: "saes-plugins",
            role: "Claude Code Plugin & Cross-Agent Skills",
            version: "v1.0.0",
            badge: "Claude Plugin",
            description:
              "Official Claude Code plugin marketplace and SKILL.md suite (API, methodology, reporting) compatible with Claude Code, Antigravity, Cursor, Codex, and Gemini CLI.",
            accent: "violet",
            icon: "plugin",
            installHint: "npx skills add saes-suite/saes-plugins",
            links: [
              {
                label: "GitHub",
                href: "https://github.com/saes-suite/saes-plugins",
                kind: "github",
              },
            ],
          },
        ],
      },
    },
  },
  {
    id: "proj-nnd",
    date: "September 2025",
    shortLabel: "NND",
    title: "NND — 3-D MRI Lesion Segmentation",
    subtitle: "Bachelor’s Thesis · YOLOv11 + nnUNet 3-D Consensus Ensemble",
    badge: "BSc Thesis · PyPI Package",
    installHint: "pip install nnd",
    docLabel: "Thesis PDF",
    imageCaption: "3-D MRI Multiple Sclerosis Lesion Pipeline",
    shortSummary:
      "Bachelor’s thesis combining YOLOv11 detection and nnUNet 3-D segmentation with consensus ensembling for multiple sclerosis lesion MRI analysis.",
    description:
      "Segmenting multiple sclerosis lesions on 3-D MRI volumes is a critical yet time-consuming step in clinical workflows. NND packages the open-source code, experiments, and analysis from my bachelor’s thesis, investigating the synergy between YOLOv11 object detection and nnUNet volumetric segmentation enhanced by a novel 3-D consensus-ensemble strategy.",
    link: "https://github.com/rorro6787/NND/blob/main/information/TFG_Rodrigo_Carreira_Villalta.pdf",
    github: "https://github.com/rorro6787/NND",
    preview: "https://pypi.org/project/nnd/",
    image: "/brain.png",
    tagKeys: ["PYTHON", "PYTORCH", "YOLO", "NUMPY", "PANDAS"],
  },
]

export const PUBLICATION_ITEMS: PublicationEntry[] = [
  {
    id: "pub-caepia-2026",
    date: "Nov 11, 2026",
    shortLabel: "CAEPIA '26",
    title:
      "A Regularized Multi-Objective Evolutionary Approach for Roughness Coefficient Calibration in Water Networks",
    shortSummary:
      "Regularized multi-objective evolutionary framework with an L∞ Chebyshev constraint for water network roughness calibration, validated via Twin Experiments, Kalman-filtered stopping, and SMPSO statistical superiority.",
    venue:
      "21st Conference of the Spanish Association for Artificial Intelligence (CAEPIA 2026)",
    venueShort: "CAEPIA 2026",
    pages: "p. 1042",
    authors: [
      "Rodrigo Carreira Villalta",
      "Antonio Jesús Nebro Urbaneja",
      "Cristóbal Barba González",
      "José Manuel García Nieto",
    ],
    abstract:
      "Roughness calibration in water distribution networks is an ill-conditioned inverse problem. The conventional single-objective approach, based on minimizing squared error, induces equifinality, where multiple non-physical parameter sets yield identical fits. We present an advanced multi-objective framework that combines data fidelity with physical regularizers for parameter variability and spatial error distribution, alongside a rigorous constraint based on the Chebyshev (L∞) norm to mitigate equifinality. We diagnose the methodological issue of the Inverse Crime in synthetic studies through a perturbed-parameter protocol (Twin Experiment), evaluating the impact of noise and partial sensor coverage. Additionally, we integrate a Kalman-filtered smart stopping criterion and an asynchronous parallel evaluator with archiving. We compare six metaheuristic algorithms (NSGA-II, NSGA-III, SPEA2, SMPSO, MOEA/D, and GDE3) across three benchmark networks. The results demonstrate the statistical superiority of SMPSO in continuous-space convergence and validate the role of regularizers in preventing overfitting under measurement noise.",
    pdfUrl: "https://simidat.ujaen.es/caepia26/inicio_files/actas_caepia2026.pdf",
    tags: [
      "Multi-Objective Optimization",
      "SMPSO",
      "Water Distribution Networks",
      "Chebyshev (L∞)",
      "Twin Experiment",
      "Kalman Filter",
    ],
  },
]
