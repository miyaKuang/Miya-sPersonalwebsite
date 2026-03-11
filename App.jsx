import { useEffect, useMemo, useState } from 'react'

const projects = [
  {
    title: 'Research Project Title',
    description:
      'Add a short summary of your research project, what question it explores, and why it matters.',
    tags: ['Topic', 'Methods', 'Outcome']
  },
  {
    title: 'Data / Coding Project',
    description:
      'Describe a data, coding, or visualization project here. Include tools like Python, R, Excel, or GIS.',
    tags: ['Python', 'Data', 'Visualization']
  },
  {
    title: 'Another Featured Project',
    description:
      'Use this space for another class, lab, leadership, or independent project.',
    tags: ['Placeholder', 'Project', 'Summary']
  }
]

const writing = [
  {
    title: 'Writing Sample or Blog Post',
    description:
      'Add a short description of an essay, reflection, article, or science communication piece.'
  },
  {
    title: 'Another Writing Piece',
    description: 'You can link future posts, school essays, or personal reflections here.'
  }
]

const activities = [
  'Leadership role or club',
  'Volunteer work or service',
  'Competition, conference, or extracurricular',
  'Creative or community project'
]

const pageCards = [
  {
    key: 'about',
    title: 'About',
    description: 'Learn more about your background, interests, and long-term goals.'
  },
  {
    key: 'projects',
    title: 'Projects',
    description: 'Explore research, class projects, coding work, and featured experiences.'
  },
  {
    key: 'writing',
    title: 'Writing',
    description: 'Read essays, reflections, blog posts, and science communication pieces.'
  },
  {
    key: 'activities',
    title: 'Activities',
    description: 'See leadership roles, extracurriculars, community work, and current focus.'
  },
  {
    key: 'resume',
    title: 'Resume',
    description: 'View a quick summary of your experience and add your CV or PDF later.'
  },
  {
    key: 'contact',
    title: 'Contact',
    description: 'Find ways to connect for collaboration, questions, or future opportunities.'
  }
]

const pages = ['home', 'about', 'projects', 'writing', 'activities', 'resume', 'contact']

function getPageFromHash() {
  const rawHash = window.location.hash.replace(/^#\/?/, '').trim().toLowerCase()
  const hash = rawHash === '' ? 'home' : rawHash
  return pages.includes(hash) ? hash : 'home'
}

function navigateTo(page) {
  window.location.hash = page === 'home' ? '/' : `/${page}`
}

function Badge({ children }) {
  return <span className="badge">{children}</span>
}

function Button({ children, variant = 'primary', onClick, href, block = false }) {
  const className = `button ${variant === 'secondary' ? 'button-secondary' : ''} ${block ? 'button-block' : ''}`

  if (href) {
    return (
      <a className={className} href={href}>
        {children}
      </a>
    )
  }

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  )
}

function Card({ title, subtitle, children, className = '' }) {
  return (
    <article className={`card ${className}`.trim()}>
      {(title || subtitle) && (
        <div className="card-header">
          {subtitle ? <p className="card-subtitle">{subtitle}</p> : null}
          {title ? <h3 className="card-title">{title}</h3> : null}
        </div>
      )}
      <div className="card-content">{children}</div>
    </article>
  )
}

function PageShell({ title, subtitle, children }) {
  return (
    <section className="section page-transition">
      <div className="container">
        <div className="section-heading">
          <h1>{title}</h1>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
        {children}
      </div>
    </section>
  )
}

function Header({ currentPage, mobileOpen, setMobileOpen }) {
  const navItems = useMemo(
    () => [
      { label: 'Home', page: 'home' },
      { label: 'About', page: 'about' },
      { label: 'Projects', page: 'projects' },
      { label: 'Writing', page: 'writing' },
      { label: 'Activities', page: 'activities' },
      { label: 'Resume', page: 'resume' },
      { label: 'Contact', page: 'contact' }
    ],
    []
  )

  return (
    <header className="site-header">
      <div className="container header-inner">
        <button className="brand" onClick={() => navigateTo('home')}>
          Miya Kuang
        </button>

        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <button
              key={item.page}
              className={`nav-link ${currentPage === item.page ? 'active' : ''}`}
              onClick={() => navigateTo(item.page)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          className="menu-button"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {mobileOpen ? (
        <div className="mobile-nav-wrap">
          <div className="container mobile-nav">
            {navItems.map((item) => (
              <button
                key={item.page}
                className={`mobile-nav-link ${currentPage === item.page ? 'active' : ''}`}
                onClick={() => {
                  navigateTo(item.page)
                  setMobileOpen(false)
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  )
}

function HomePage() {
  return (
    <>
      <section className="hero section">
        <div className="container hero-grid">
          <div className="hero-copy page-transition">
            <div className="eyebrow">Student • Researcher • Writer</div>
            <h1>A personal website to showcase your work, interests, and future goals.</h1>
            <p>
              Replace this with a short introduction about who you are, what you study, and what you care about.
              This homepage links to separate pages for each section of your website.
            </p>
            <div className="hero-actions">
              <Button onClick={() => navigateTo('projects')}>View Projects</Button>
              <Button variant="secondary" onClick={() => navigateTo('contact')}>
                Contact Me
              </Button>
            </div>
          </div>

          <Card title="Quick Snapshot" subtitle="Use this card for a fast introduction." className="page-transition">
            <div className="stack gap-sm muted-text">
              <p>👤 [Add a short personal bio here]</p>
              <p>🧪 [Add research interests, lab work, or academic focus]</p>
              <p>📌 [Add leadership, extracurriculars, or skills]</p>
              <p>✉️ [Add your email or preferred contact method]</p>
            </div>
          </Card>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading compact">
            <h2>Explore Each Page</h2>
            <p>These cards on the main page link directly to each independent page of the website.</p>
          </div>

          <div className="grid grid-3">
            {pageCards.map((card) => (
              <Card key={card.key} title={card.title} subtitle="Website section">
                <p className="muted-text">{card.description}</p>
                <div className="top-space-sm">
                  <Button variant="secondary" onClick={() => navigateTo(card.key)}>
                    Open Page ↗
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function AboutPage() {
  return (
    <PageShell
      title="About Me"
      subtitle="Introduce yourself here with a short story about your background, interests, and long-term goals."
    >
      <div className="grid grid-2">
        <Card title="Who I Am">
          <div className="stack muted-text">
            <p>
              [Add a paragraph about yourself, your major or focus area, and the kinds of questions or problems that interest you.]
            </p>
            <p>
              [Add a second paragraph about what motivates you, what communities or topics you care about, and where you hope to grow.]
            </p>
          </div>
        </Card>

        <Card title="Skills & Interests">
          <div className="tag-wrap">
            {['Public Health', 'Research', 'Data Analysis', 'Python', 'R', 'Writing', 'Leadership', 'Advocacy'].map((item) => (
              <Badge key={item}>{item}</Badge>
            ))}
          </div>
        </Card>
      </div>
    </PageShell>
  )
}

function ProjectsPage() {
  return (
    <PageShell
      title="Projects & Research"
      subtitle="Feature the work you want professors, collaborators, internship reviewers, or friends to notice first."
    >
      <div className="grid grid-3">
        {projects.map((project) => (
          <Card key={project.title} title={project.title} subtitle="Project placeholder">
            <p className="muted-text">{project.description}</p>
            <div className="tag-wrap top-space-sm">
              {project.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
            <div className="top-space-sm">
              <Button variant="secondary" onClick={() => navigateTo('contact')}>
                Add Link Later ↗
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </PageShell>
  )
}

function WritingPage() {
  return (
    <PageShell
      title="Writing & Reflections"
      subtitle="This section works well for blog posts, essays, science communication, or personal reflections."
    >
      <div className="grid grid-2">
        {writing.map((piece) => (
          <Card key={piece.title} title={piece.title} subtitle="Writing sample">
            <p className="muted-text">{piece.description}</p>
          </Card>
        ))}
      </div>
    </PageShell>
  )
}

function ActivitiesPage() {
  return (
    <PageShell
      title="Activities & Leadership"
      subtitle="Use this space to show the parts of your work and identity that go beyond academics alone."
    >
      <div className="grid grid-2">
        <Card title="Highlights">
          <ul className="list muted-text">
            {activities.map((activity) => (
              <li key={activity}>{activity}</li>
            ))}
          </ul>
        </Card>

        <Card title="Current Focus">
          <div className="stack muted-text">
            <p>[Add what you are currently working on this month or semester.]</p>
            <p>[You can also list upcoming conferences, applications, projects, or goals.]</p>
          </div>
        </Card>
      </div>
    </PageShell>
  )
}

function ResumePage() {
  return (
    <PageShell
      title="Resume / CV"
      subtitle="Add a downloadable PDF here later, plus a quick summary of your main experiences."
    >
      <div className="grid resume-grid">
        <Card title="Experience Overview">
          <div className="stack gap-sm muted-text">
            <div className="panel">
              <p className="panel-title">[Position / Lab / Organization]</p>
              <p>[Add dates and a one- to two-sentence description.]</p>
            </div>
            <div className="panel">
              <p className="panel-title">[Position / Lab / Organization]</p>
              <p>[Add dates and a one- to two-sentence description.]</p>
            </div>
            <div className="panel">
              <p className="panel-title">[Award / Fellowship / Program]</p>
              <p>[Add a brief note about what this recognition or opportunity involved.]</p>
            </div>
          </div>
        </Card>

        <Card title="Resume File">
          <p className="muted-text">
            Replace this button with a PDF link when your resume or CV is ready.
          </p>
          <div className="top-space-sm">
            <Button variant="secondary" block>
              Resume PDF Placeholder
            </Button>
          </div>
        </Card>
      </div>
    </PageShell>
  )
}

function ContactPage() {
  return (
    <PageShell
      title="Contact"
      subtitle="Make it easy for people to reach out for collaboration, questions, or opportunities."
    >
      <div className="grid grid-2">
        <Card title="Get in Touch">
          <div className="stack gap-sm muted-text">
            <p>Email: [your email here]</p>
            <p>LinkedIn: [add profile link]</p>
            <p>GitHub / Portfolio / Other: [add link here]</p>
          </div>
        </Card>

        <Card title="Message Box Placeholder" subtitle="This is a visual placeholder for a future contact form.">
          <div className="stack gap-sm">
            <div className="input-placeholder">Name</div>
            <div className="input-placeholder">Email</div>
            <div className="input-placeholder textarea-placeholder">Message</div>
            <Button>Send</Button>
          </div>
        </Card>
      </div>
    </PageShell>
  )
}

export default function App() {
  const [page, setPage] = useState(typeof window !== 'undefined' ? getPageFromHash() : 'home')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const syncPage = () => setPage(getPageFromHash())
    syncPage()
    window.addEventListener('hashchange', syncPage)
    return () => window.removeEventListener('hashchange', syncPage)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [page])

  const pageContent = {
    home: <HomePage />,
    about: <AboutPage />,
    projects: <ProjectsPage />,
    writing: <WritingPage />,
    activities: <ActivitiesPage />,
    resume: <ResumePage />,
    contact: <ContactPage />
  }[page]

  return (
    <div className="site-shell">
      <Header currentPage={page} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <main>{pageContent}</main>
      <footer className="site-footer">
        <div className="container footer-inner">
          <p>© 2026 Miya Kuang. All rights reserved.</p>
          <div className="footer-links">
            <button onClick={() => navigateTo('home')}>Home</button>
            <button onClick={() => navigateTo('about')}>About</button>
            <button onClick={() => navigateTo('projects')}>Projects</button>
            <button onClick={() => navigateTo('writing')}>Writing</button>
            <button onClick={() => navigateTo('contact')}>Contact</button>
          </div>
        </div>
      </footer>
    </div>
  )
}
