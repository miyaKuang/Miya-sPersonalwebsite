import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  FileText,
  FlaskConical,
  PenSquare,
  User,
  Briefcase,
  ExternalLink,
  Home,
  FolderKanban,
  Menu,
  GraduationCap,
  Award,
  BookOpen,
  MapPin,
  Linkedin,
  Mountain,
  Palette,
  Users,
  Sparkles,
} from "lucide-react";

const theme = {
  bg: "#F4F8FC",
  panel: "rgba(255,255,255,0.82)",
  panelSolid: "#FFFFFF",
  panelSoft: "#EEF4FA",
  text: "#1D2A39",
  muted: "#5E7287",
  accent: "#1E3A5F",
  accent2: "#5E7EA4",
  accentSoft: "#DCE8F4",
  border: "#D6E1EC",
  shadow: "0 18px 44px rgba(30,58,95,0.10)",
};

const siteData = {
  name: "Miya Kuang",
  preferredName: "Miya (Xuanxi) Kuang",
  tagline: "Public Health student, researcher, and writer interested in cancer epidemiology, immunology, and biostatistics.",
  location: "Irvine, California",
  heroBadge: "Clean Academic Portfolio",
  heroIntro:
    "I am an undergraduate researcher at UC Irvine working across cancer epidemiology, wearable health data, and public health data analysis. This website brings together my research projects, publications, academic work, and creative interests in one place.",
  aboutBlank: `When I was younger, my brother’s lymphoma diagnosis changed the way I understood health and medicine. It made me realize that health is not always predictable or fully controllable, and that even with modern treatment, families still face uncertainty, fear, and difficult gaps in care. That experience was one of the first reasons I started looking beyond biology alone and becoming interested in the larger public health questions behind disease, access, and survival.

Moving across different cities and healthcare environments also made me more aware of how patient experiences can vary depending on resources, communication, and social conditions. Public health gave me a framework for thinking about disease at both the personal and population level through prevention, epidemiology, equity, and the systems that shape outcomes. Today, that perspective continues to guide the way I think about cancer disparities, data, and the role of research in improving care.`,
};

const education = {
  school: "University of California, Irvine",
  dates: "August 2023 – June 2027",
  major: "Public Health Science",
  minors: "Health Informatics, Biostatistics",
  gpa: "3.98/4.0",
  honors: "Dean's Honor List",
  coursework: [
    "Biochemistry",
    "Organic Chemistry",
    "Cell Biology",
    "Precision Medicine",
    "Immunology",
    "Introduction to Programming",
  ],
};

const researchInterests = [
  "Cancer Epidemiology",
  "Immunology",
  "Biostatistics",
  "Tumor Microenvironment",
  "Lymphoma",
  "Wearable Data",
  "Public Health Data Science",
];

const quickFacts = [
  "UC Irvine undergraduate researcher",
  "Public Health Science major",
  "Research spanning lymphoma epidemiology and wearable health data",
  "AACR 2026 abstract and poster author",
  "Calit2-funded wearable and breast cancer risk project",
];

const projects = [
  {
  title: "Subtype-Specific Patterns of Peripheral T-Cell Lymphoma in Diverse Asian Populations",
  role: "Student Researcher, Dr. Wendy Cozen's Lab / UCI CURE-Cancer",
  dates: "June 2025 – Present",
  summary:
    "Conducting independent and collaborative research on peripheral T-cell lymphoma incidence patterns using the Los Angeles Cancer Surveillance Program, the California Cancer Registry, and the NCI SEER program. The project focuses on subtype-specific incidence patterns and population differences across diverse Asian groups.",
  details: [
    "Works with population-based cancer registry data to study peripheral T-cell lymphoma epidemiology.",
    "Developed as part of an independent summer cancer research project through CURE-Cancer.",
    "Supported by the American Cancer Society through a competitive summer research program.",
  ],
  tools: ["SEER", "CCR", "CSP", "Cancer Epidemiology", "Data Analysis"],
  funding:
    "American Cancer Society-funded paid summer research internship through the UCI CURE-Cancer program; selected among the top 12 candidates based on research and academic achievement.",
  conferences: [
    {
      title: "Summer CURE-Cancer Symposium 2025",
      note:
        "Poster presentation on subtype-specific peripheral T-cell lymphoma patterns as part of the summer UCI CURE-Cancer research program.",
      extra: "August 22, 2025 · Poster No. 10",
    },
    {
      title: "AACR Annual Meeting 2026",
      note:
        "Poster presentation in Population Sciences: Epidemiology: Cancer Incidence, Mortality, Patterns, and Methodology.",
      extra: "April 20, 2026 · San Diego, California · Poster No. 2350",
    },
  ],
  publication:
    "Kuang X, Lam E, Bernstein M, Pinter-Brown L, Lim M, Foley N, Cozen W. Subtype-specific patterns of peripheral T-cell lymphoma in diverse Asian populations. Proceedings of the AACR Annual Meeting 2026.",
  },
  {
    title: "Integrating Real-World Wearable Data, Physical Activity, Sleep, and Breast Cancer Risk",
    role: "Student Researcher, Dr. Hannah Lui Park's Lab / UCI Calit2 IRT",
    dates: "September 2024 – Present",
    summary:
      "Helping build and analyze an All of Us-based cohort using wearable, electronic health record, and lifestyle risk variables to examine associations between wearable data and breast cancer risk. This work also expanded through a Calit2 Interdisciplinary Research Team project focused on physical activity, sleep, wearable measures, and breast cancer risk using data science and machine learning approaches.",
    details: [
      "Supports cohort construction using wearable, EHR, and lifestyle risk data from the All of Us Research Program.",
      "Uses Python and R for data cleaning, analysis, visualization, and breast cancer risk-related modeling.",
      "Expanded through the UCI Calit2 IRT program to study physical activity, sleep, and breast cancer risk using wearable-derived measures and machine learning.",
    ],
    tools: ["Python", "R", "All of Us", "Wearable Data", "EHR", "Risk Modeling", "Machine Learning"],
    funding: "$2,000 awarded through the UCI Calit2 Interdisciplinary Research Team (IRT) program to support expansion of this wearable and breast cancer risk project.",
    conference: {
      title: "AACR Annual Meeting 2026",
      note:
        "Abstract accepted for presentation and publication in the online Proceedings of the AACR.",
      extra: "April 21, 2026 · San Diego, California",
    },
    publication:
      "Weber Y, Ilaty A, Kuang X, Nguyen EL, Plaza-Florido A, Radom-Aizik S, Ziogas A, Rahmani A, Park HL. Integrating real-world wearable data into breast cancer risk assessment: Evidence from the All of Us Research Program. Proceedings of the AACR Annual Meeting 2026.",
  },
  {
  title: "Fasting-Mimicking Diet Pilot Study in Asian Americans",
  role: "Student Researcher, Dr. Hannah Lui Park's Lab",
  dates: "September 2024 – Present",
  summary:
    "Conducting data analysis and data cleanup in R for a pilot study on fasting-mimicking diet interventions in Asian American participants, including significance testing, group comparisons, visualization, and manuscript-related research support.",
  details: [
    "Performs statistical testing and data organization for research analysis.",
    "Supports group comparisons and data visualization for study reporting.",
    "Contributes to translational and preventive health research focused on Asian American populations.",
    "Supports ongoing manuscript development on the feasibility and effects of a 5-day fasting-mimicking diet in Asian Americans with prediabetes.",
  ],
  tools: ["R", "Statistics", "Data Cleaning", "Visualization", "Pilot Study"],
  publication:
    "Wang K, Kuang X, Kang M, Prabaharan J, Castillo M, Nguyen E, Shah A, Salopal S, Tiu BC, Brandhorst S, Ohn JH, Wong N, Yang Q, Lindsay K, Longo VD, Park HL. Feasibility and Effects of a 5-Day Fasting Mimicking Diet in Asian Americans with Prediabetes: A Pilot Study. Manuscript in preparation.",
  },
  {
    title: "Interactive Drawing Platform for Autism, Art, and Language Learning",
    role: "Researcher and Co-Author",
    dates: "Published 2022",
    summary:
      "Co-authored a publication on an interactive and collaborative drawing platform that uses artificial intelligence to support engagement in art and language learning for the autism spectrum.",
    details: [
      "Combines creativity, education, and artificial intelligence.",
      "Reflects long-term interest in communication, design, and accessible learning tools.",
      "Published in Data Science and Machine Learning.",
    ],
    tools: ["Artificial Intelligence", "Education", "Drawing", "Human-Centered Design"],
    publication:
      "Kuang X, Sun Y. An Interactive and Collaborative Drawing Platform to Engage the Autism Spectrum in Art and Language Learning using Artificial Intelligence. Data Science and Machine Learning. Published online September 17, 2022:65–74.",
  },
];

const writingAndPublications = [
  {
    title: "AACR 2026 Abstract — Peripheral T-Cell Lymphoma in Diverse Asian Populations",
    type: "Conference abstract",
    description:
      "Conference abstract for the AACR Annual Meeting 2026 based on population-level peripheral T-cell lymphoma incidence patterns across diverse Asian populations.",
  },
  {
    title: "AACR 2026 Abstract — Wearable Data, Physical Activity, Sleep, and Breast Cancer Risk",
    type: "Conference abstract",
    description:
      "Conference abstract connecting real-world wearable data, the All of Us Research Program, and the broader Calit2-supported expansion on physical activity, sleep, and breast cancer risk.",
  },
  {
  title: "Feasibility and Effects of a 5-Day Fasting Mimicking Diet in Asian Americans with Prediabetes: A Pilot Study",
  type: "Upcoming manuscript",
  description:
    "Manuscript in preparation on the feasibility and effects of a 5-day fasting-mimicking diet in Asian Americans with prediabetes. Authors: Kylee Wang, Xuanxi Kuang, Mirian Kang, Janani Prabaharan, Makena Castillo, Emily Nguyen, Annika Shah, Simar Salopal, Bryan-Clement Tiu, Sebastian Brandhorst, Jung Hun Ohn, Nathan Wong, Qin Yang, Karen Lindsay, Valter D. Longo, Hannah Lui Park.",
  },
  {
    title: "Interactive and Collaborative Drawing Platform to Engage the Autism Spectrum in Art and Language Learning using Artificial Intelligence",
    type: "Publication",
    description:
      "Published research article combining AI, education, and creative engagement through interactive drawing tools.",
  },
  {
    title: "Coro's Adventure",
    type: "Children's book publication",
    description:
      "Authored and illustrated a 24-page children's book designed to teach young children about preventing the spread of COVID-19.",
  },
];

const activities = [
  {
    title: "Public Health 195W Practicum — Learning Assistant",
    dates: "April 2025 – June 2026",
    description:
      "Facilitate class discussion and support student learning in an upper-division public health course that combines a 100-hour internship with writing projects such as a peer-reviewed article, grant proposal, and policy analysis.",
  },
  {
    title: "Chao Family Comprehensive Cancer Center — Biospecimen Lab Internship",
    dates: "September 2024 – January 2025",
    description:
      "Processed biospecimens for cancer clinical trials, supported specimen collection and tracking, performed tissue bio-freezing and blood processing, and worked with EPIC-linked clinical data workflows.",
  },
  {
    title: "Science Library — Stack Assistant",
    dates: "June 2024 – Present",
    description:
      "Organize, maintain, and shift library stacks; help visitors locate books, study spaces, and library service points; give directions across the building; and support smooth daily operations including closing procedures and general patron assistance.",
  },
  {
    title: "Chinese Union — Human Resource Officer",
    dates: "June 2023 – August 2024",
    description:
      "Supported student onboarding, coordinated group activities, maintained personnel records, and contributed to recruitment processes.",
  },
];

const honors = [
  "Student Membership in the American Association for Cancer Research",
  "$2,000 project funding through the UCI Calit2 IRT program",
  "Phi Beta Kappa Book Award, University of California, Irvine",
  "Learning Assistant Certification, UCI Division of Teaching Excellence and Innovation",
];

const skills = {
  languages: ["Mandarin (Native)", "English (Fluent)"],
  tools: ["Python", "R", "Microsoft Excel", "PowerPoint", "Google Workspace"],
};

const outsideLab = [
  {
    icon: Mountain,
    title: "Snowboarding & Outside Life Ambassador",
    description:
      "I started snowboarding during the pandemic and it quickly became one of my favorite ways to recharge, challenge myself, and stay connected to outdoor community and mountain culture. It has also grown into a larger part of my student life through my work as a college ambassador with Outside Life, which I connect closely with my snowboarding and outdoor interests.",
    link: "https://www.outsidelife.com/ikonpass",
  },
  {
    icon: Palette,
    title: "Drawing & Creative Work",
    description:
      "I enjoy drawing and plan to share selected artwork on this site as part of a creative section alongside my academic work.",
  },
  {
    icon: Sparkles,
    title: "Music, Performance & K-pop",
    description:
      "I listen to music a lot and I am also a big K-pop fan, especially BTS. I started learning keyboard at age four, including electronic keyboard, piano, and double-manual organ, and I performed multiple times in China before moving to the United States. I also play flute (CM Level 8) and know how to play the traditional Chinese flute.",
  },
  {
    icon: Users,
    title: "Social Media & Outreach",
    description:
      "I also create content online and have built a social media audience of about 1.5K followers.",
  },
];

const contact = {
  email: "xuanxi.kuang.2027@gmail.com",
  linkedin: "https://www.linkedin.com/in/miya-kuang-493bba242/",
};

function getPageFromHash() {
  const hash = window.location.hash.replace(/^#\/?/, "").trim().toLowerCase();
  const pages = ["home", "about", "projects", "writing", "activities", "resume", "contact"];
  return pages.includes(hash) ? hash : "home";
}

function navigateTo(page) {
  window.location.hash = page === "home" ? "/" : `/${page}`;
}

function buttonStyle(primary = false) {
  return {
    borderRadius: 16,
    padding: "12px 18px",
    fontWeight: 700,
    border: `1px solid ${primary ? theme.accent : theme.border}`,
    background: primary ? theme.accent : "rgba(255,255,255,0.7)",
    color: primary ? "#FFFFFF" : theme.text,
    cursor: "pointer",
    boxShadow: primary ? theme.shadow : "none",
    backdropFilter: "blur(6px)",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  };
}

function badgeStyle() {
  return {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    borderRadius: 999,
    border: `1px solid ${theme.border}`,
    background: "rgba(255,255,255,0.72)",
    color: theme.accent,
    padding: "8px 12px",
    fontSize: 13,
    fontWeight: 600,
    backdropFilter: "blur(8px)",
  };
}

function cardStyle() {
  return {
    background: theme.panel,
    border: `1px solid ${theme.border}`,
    borderRadius: 28,
    padding: 24,
    boxShadow: theme.shadow,
    backdropFilter: "blur(10px)",
  };
}

function linkStyle() {
  return {
    color: theme.accent,
    fontWeight: 700,
    textDecoration: "none",
  };
}

function BackgroundDecor() {
  return (
    <>
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          background:
            "radial-gradient(circle at 12% 18%, rgba(123,160,201,0.20), transparent 0 28%), radial-gradient(circle at 88% 16%, rgba(94,126,164,0.18), transparent 0 24%), radial-gradient(circle at 78% 78%, rgba(153,182,214,0.20), transparent 0 26%), linear-gradient(180deg, #F7FBFF 0%, #EEF4FA 48%, #F8FBFE 100%)",
        }}
      />
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          opacity: 0.38,
          backgroundImage:
            "linear-gradient(rgba(30,58,95,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(30,58,95,0.05) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.65), rgba(0,0,0,0.18))",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "fixed",
          top: 110,
          right: -90,
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(30,58,95,0.10), rgba(30,58,95,0.02) 58%, transparent 72%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: -80,
          left: -60,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(94,126,164,0.14), rgba(94,126,164,0.03) 60%, transparent 72%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
    </>
  );
}

function AppCard({ title, description, tag, children }) {
  return (
    <div style={cardStyle()}>
      {tag ? <div style={{ color: theme.accent2, fontSize: 13, marginBottom: 8, fontWeight: 600 }}>{tag}</div> : null}
      <div style={{ fontSize: 24, fontWeight: 800, color: theme.text, marginBottom: 10 }}>{title}</div>
      {description ? <div style={{ color: theme.muted, lineHeight: 1.7, marginBottom: 16 }}>{description}</div> : null}
      {children}
    </div>
  );
}

function SectionTitle({ title, subtitle }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ fontSize: 38, fontWeight: 800, color: theme.text, marginBottom: 10 }}>{title}</div>
      <div style={{ color: theme.muted, maxWidth: 760, lineHeight: 1.7 }}>{subtitle}</div>
    </div>
  );
}

function SiteHeader({ page, mobileOpen, setMobileOpen }) {
  const nav = [
    ["Home", "home"],
    ["About", "about"],
    ["Projects", "projects"],
    ["Writing", "writing"],
    ["Activities", "activities"],
    ["Resume", "resume"],
    ["Contact", "contact"],
  ];

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        background: "rgba(244,248,252,0.76)",
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${theme.border}`,
      }}
    >
      <div
        style={{
          maxWidth: 1160,
          margin: "0 auto",
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
          position: "relative",
          zIndex: 2,
        }}
      >
        <button
          onClick={() => navigateTo("home")}
          style={{
            background: "transparent",
            border: 0,
            fontSize: 30,
            fontWeight: 800,
            color: theme.text,
            cursor: "pointer",
            letterSpacing: "-0.03em",
          }}
        >
          {siteData.name}
        </button>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
          {nav.map(([label, key]) => (
            <button
              key={key}
              onClick={() => navigateTo(key)}
              style={{
                background: page === key ? theme.accentSoft : "transparent",
                color: page === key ? theme.accent : theme.muted,
                border: `1px solid ${page === key ? theme.border : "transparent"}`,
                borderRadius: 14,
                padding: "8px 12px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {label}
            </button>
          ))}
          <button onClick={() => setMobileOpen(!mobileOpen)} style={{ ...buttonStyle(false), padding: "8px 10px" }}>
            <Menu size={16} />
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div
          style={{
            maxWidth: 1160,
            margin: "0 auto",
            padding: "0 20px 14px",
            display: "grid",
            gap: 8,
          }}
        >
          {nav.map(([label, key]) => (
            <button
              key={key}
              onClick={() => {
                navigateTo(key);
                setMobileOpen(false);
              }}
              style={{
                textAlign: "left",
                background: page === key ? theme.accentSoft : theme.panelSolid,
                border: `1px solid ${theme.border}`,
                color: page === key ? theme.accent : theme.text,
                borderRadius: 16,
                padding: "12px 14px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      ) : null}
    </header>
  );
}

function HomePage() {
  const overviewCards = [
    { key: "about", title: "About", description: "Academic background, research interests, and outside-the-lab interests.", icon: User },
    { key: "projects", title: "Projects", description: "Detailed research projects, funding, and conference-related work.", icon: FolderKanban },
    { key: "writing", title: "Writing", description: "Abstracts, publications, and future writing or blog work.", icon: PenSquare },
    { key: "activities", title: "Activities", description: "Teaching, lab support, internships, and leadership roles.", icon: Briefcase },
    { key: "resume", title: "Resume", description: "Education, honors, skills, and experience overview.", icon: FileText },
    { key: "contact", title: "Contact", description: "Email, LinkedIn, and research collaboration interests.", icon: Mail },
  ];

  return (
    <>
      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20, marginBottom: 24 }}>
        <div
          style={{
            ...cardStyle(),
            padding: 34,
            position: "relative",
            overflow: "hidden",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.84) 0%, rgba(241,246,251,0.92) 70%, rgba(224,236,247,0.95) 100%)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -70,
              right: -40,
              width: 220,
              height: 220,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(94,126,164,0.22), rgba(94,126,164,0.04) 60%, transparent 72%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -40,
              left: -30,
              width: 180,
              height: 180,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(30,58,95,0.12), rgba(30,58,95,0.03) 60%, transparent 72%)",
            }}
          />
          <div style={{ position: "relative", zIndex: 2 }}>
            <div style={badgeStyle()}>{siteData.heroBadge}</div>
            <div style={{ fontSize: 54, lineHeight: 1.02, fontWeight: 800, marginTop: 18, marginBottom: 16, letterSpacing: "-0.04em" }}>
              {siteData.name}
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, color: theme.accent, marginBottom: 14 }}>{siteData.tagline}</div>
            <div style={{ color: theme.muted, fontSize: 18, lineHeight: 1.75, maxWidth: 700 }}>{siteData.heroIntro}</div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 22 }}>
              <button style={buttonStyle(true)} onClick={() => navigateTo("projects")}>View Projects</button>
              <button style={buttonStyle(false)} onClick={() => navigateTo("contact")}>Contact Me</button>
            </div>
          </div>
        </div>

        <AppCard title="Quick Snapshot" description="A fast introduction to the current version of the site.">
          <div style={{ display: "grid", gap: 14, color: theme.muted }}>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}><GraduationCap size={16} style={{ marginTop: 4, color: theme.accent }} /> {education.school} · {education.major}</div>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}><FlaskConical size={16} style={{ marginTop: 4, color: theme.accent }} /> Research in lymphoma epidemiology, wearable data, and cancer-related public health analysis</div>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}><Award size={16} style={{ marginTop: 4, color: theme.accent }} /> AACR 2026 abstract and poster author · Calit2 IRT award recipient</div>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}><MapPin size={16} style={{ marginTop: 4, color: theme.accent }} /> Based in Irvine, California</div>
          </div>
        </AppCard>
      </section>

      <section style={{ marginBottom: 26 }}>
        <SectionTitle title="At a Glance" subtitle="A few highlights before you explore the full sections of the website." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
          {quickFacts.map((item) => (
            <div key={item} style={{ ...cardStyle(), padding: 18, fontWeight: 700, color: theme.text }}>{item}</div>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle title="Explore Each Page" subtitle="These cards on the main page link directly to each independent page of the website." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 18 }}>
          {overviewCards.map((card) => {
            const Icon = card.icon;
            return (
              <AppCard key={card.key} title={card.title} description={card.description}>
                <div style={{ color: theme.accent, marginBottom: 12 }}><Icon size={20} /></div>
                <button style={buttonStyle(false)} onClick={() => navigateTo(card.key)}>
                  Open Page <ExternalLink size={15} />
                </button>
              </AppCard>
            );
          })}
        </div>
      </section>
    </>
  );
}

function AboutPage() {
  return (
    <section>
      <SectionTitle title="About Me" subtitle="A mix of academic background, research interests, and a few outside-the-lab details." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20, marginBottom: 22 }}>
        <AppCard title="Who I Am">
          <div style={{ color: theme.muted, lineHeight: 1.8 }}>
            <p>{siteData.aboutBlank}</p>
          </div>
        </AppCard>

        <AppCard title="Education">
          <div style={{ color: theme.muted, lineHeight: 1.9 }}>
            <div><strong style={{ color: theme.text }}>University:</strong> {education.school}</div>
            <div><strong style={{ color: theme.text }}>Dates:</strong> {education.dates}</div>
            <div><strong style={{ color: theme.text }}>Major:</strong> {education.major}</div>
            <div><strong style={{ color: theme.text }}>Minor(s):</strong> {education.minors}</div>
            <div><strong style={{ color: theme.text }}>GPA:</strong> {education.gpa}</div>
            <div><strong style={{ color: theme.text }}>Honors:</strong> {education.honors}</div>
          </div>
        </AppCard>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20, marginBottom: 22 }}>
        <AppCard title="Research Interests">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {researchInterests.map((item) => (
              <span key={item} style={{ padding: "8px 12px", borderRadius: 999, border: `1px solid ${theme.border}`, background: theme.panelSoft, color: theme.muted, fontSize: 14, fontWeight: 600 }}>
                {item}
              </span>
            ))}
          </div>
        </AppCard>

        <AppCard title="Relevant Coursework">
          <ul style={{ margin: 0, paddingLeft: 18, color: theme.muted, lineHeight: 1.9 }}>
            {education.coursework.map((course) => (
              <li key={course}>{course}</li>
            ))}
          </ul>
        </AppCard>
      </div>

      <SectionTitle title="Beyond the Lab" subtitle="A look at the interests and creative activities that shape who I am outside academics and research." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18 }}>
        {outsideLab.map((item) => {
          const Icon = item.icon;
          return (
            <AppCard key={item.title} title={item.title} description={item.description}>
              <div style={{ color: theme.accent, marginBottom: 12 }}><Icon size={20} /></div>
              {item.link ? (
                <a href={item.link} target="_blank" rel="noreferrer" style={linkStyle()}>
                  Visit link <ExternalLink size={14} style={{ marginLeft: 6, verticalAlign: "middle" }} />
                </a>
              ) : null}
            </AppCard>
          );
        })}
      </div>
    </section>
  );
}

function ProjectsPage() {
  return (
    <section>
      <SectionTitle title="Projects & Research" subtitle="Conference details are placed inside each project instead of being separated into a different section, so each project reads more like a complete research profile." />
      <div style={{ display: "grid", gap: 18 }}>
        {projects.map((project) => (
          <div key={project.title} style={{ ...cardStyle(), padding: 28 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 12 }}>
              <div>
                <div style={{ color: theme.accent2, fontSize: 13, fontWeight: 700, marginBottom: 6 }}>{project.role}</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: theme.text, marginBottom: 8 }}>{project.title}</div>
                <div style={{ color: theme.accent, fontWeight: 700 }}>{project.dates}</div>
              </div>
            </div>

            <div style={{ color: theme.muted, lineHeight: 1.8, marginBottom: 16 }}>{project.summary}</div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18, marginBottom: 16 }}>
              <div>
                <div style={{ fontWeight: 800, color: theme.text, marginBottom: 8 }}>Project Details</div>
                <ul style={{ margin: 0, paddingLeft: 18, color: theme.muted, lineHeight: 1.8 }}>
                  {project.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </div>

              <div>
                <div style={{ fontWeight: 800, color: theme.text, marginBottom: 8 }}>Tools & Methods</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {project.tools.map((tool) => (
                    <span key={tool} style={{ padding: "7px 10px", borderRadius: 999, border: `1px solid ${theme.border}`, background: theme.panelSoft, color: theme.muted, fontSize: 12, fontWeight: 700 }}>
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {project.funding ? (
              <div style={{ border: `1px solid ${theme.border}`, borderRadius: 20, padding: 16, background: theme.panelSoft, marginBottom: project.conference || project.publication ? 14 : 0 }}>
                <div style={{ fontWeight: 800, color: theme.text, marginBottom: 6 }}>Funding</div>
                <div style={{ color: theme.muted, lineHeight: 1.7 }}>{project.funding}</div>
              </div>
            ) : null}
            {project.conferences ? (
              <div style={{ display: "grid", gap: 14, marginBottom: project.publication ? 14 : 0 }}>
                {project.conferences.map((conference) => (
                  <div
                    key={`${project.title}-${conference.title}`}
                    style={{
                      border: `1px solid ${theme.border}`,
                      borderRadius: 20,
                      padding: 16,
                      background: theme.panelSoft,
                    }}
                  >
                    <div style={{ fontWeight: 800, color: theme.text, marginBottom: 6 }}>
                      Conference / Presentation
                    </div>
                    <div style={{ color: theme.text, fontWeight: 700, marginBottom: 4 }}>
                      {conference.title}
                    </div>
                    <div style={{ color: theme.muted, lineHeight: 1.7 }}>
                      {conference.note}
                    </div>
                    {conference.extra ? (
                      <div style={{ color: theme.accent, fontWeight: 700, marginTop: 8 }}>
                        {conference.extra}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : project.conference ? (
              <div
                style={{
                  border: `1px solid ${theme.border}`,
                  borderRadius: 20,
                  padding: 16,
                  background: theme.panelSoft,
                  marginBottom: project.publication ? 14 : 0,
                }}
              >
                <div style={{ fontWeight: 800, color: theme.text, marginBottom: 6 }}>
                  Conference / Presentation
                </div>
                <div style={{ color: theme.text, fontWeight: 700, marginBottom: 4 }}>
                  {project.conference.title}
                </div>
                <div style={{ color: theme.muted, lineHeight: 1.7 }}>
                  {project.conference.note}
                </div>
                {project.conference.extra ? (
                  <div style={{ color: theme.accent, fontWeight: 700, marginTop: 8 }}>
                    {project.conference.extra}
                  </div>
                ) : null}
              </div>
            ) : null}
            {project.publication ? (
              <div
                style={{
                  border: `1px solid ${theme.border}`,
                  borderRadius: 20,
                  padding: 16,
                  background: theme.panelSoft,
                }}
              >
                <div style={{ fontWeight: 800, color: theme.text, marginBottom: 6 }}>
                  Associated Publication / Abstract
                </div>
                <div style={{ color: theme.muted, lineHeight: 1.8 }}>
                  {project.publication}
                </div>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}

function WritingPage() {
  return (
    <section>
      <SectionTitle title="Writing & Publications" subtitle="A place for abstracts, publications, and creative work that connect my research and communication interests." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 18 }}>
        {writingAndPublications.map((piece) => (
          <AppCard key={piece.title} title={piece.title} description={piece.description} tag={piece.type}>
            <div style={{ color: theme.accent, marginBottom: 10 }}><BookOpen size={18} /></div>
          </AppCard>
        ))}
      </div>
    </section>
  );
}

function ActivitiesPage() {
  return (
    <section>
      <SectionTitle title="Activities & Leadership" subtitle="This section now focuses on teaching, internships, lab support, and community roles rather than conference listings." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20 }}>
        {activities.map((item) => (
          <AppCard key={item.title} title={item.title} description={item.description} tag={item.dates} />
        ))}
      </div>
    </section>
  );
}

function ResumePage() {
  return (
    <section>
      <SectionTitle title="Resume / CV" subtitle="A GitHub-friendly summary of education, awards, skills, and academic profile details." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20, marginBottom: 22 }}>
        <AppCard title="Education Overview">
          <div style={{ color: theme.muted, lineHeight: 1.9 }}>
            <div><strong style={{ color: theme.text }}>School:</strong> {education.school}</div>
            <div><strong style={{ color: theme.text }}>Dates:</strong> {education.dates}</div>
            <div><strong style={{ color: theme.text }}>Major:</strong> {education.major}</div>
            <div><strong style={{ color: theme.text }}>Minor(s):</strong> {education.minors}</div>
            <div><strong style={{ color: theme.text }}>GPA:</strong> {education.gpa}</div>
            <div><strong style={{ color: theme.text }}>Honors:</strong> {education.honors}</div>
          </div>
        </AppCard>

        <AppCard title="Honors & Recognition">
          <div style={{ display: "grid", gap: 12 }}>
            {honors.map((item) => (
              <div key={item} style={{ border: `1px solid ${theme.border}`, borderRadius: 18, padding: 14, background: theme.panelSoft, color: theme.muted, lineHeight: 1.7 }}>
                • {item}
              </div>
            ))}
          </div>
        </AppCard>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20 }}>
        <AppCard title="Languages">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {skills.languages.map((item) => (
              <span key={item} style={{ padding: "8px 12px", borderRadius: 999, border: `1px solid ${theme.border}`, background: theme.panelSoft, color: theme.muted, fontWeight: 700 }}>
                {item}
              </span>
            ))}
          </div>
        </AppCard>

        <AppCard title="Technical Tools">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {skills.tools.map((item) => (
              <span key={item} style={{ padding: "8px 12px", borderRadius: 999, border: `1px solid ${theme.border}`, background: theme.panelSoft, color: theme.muted, fontWeight: 700 }}>
                {item}
              </span>
            ))}
          </div>
        </AppCard>
      </div>
    </section>
  );
}

function ContactPage() {
  return (
    <section>
      <SectionTitle
        title="Contact"
        subtitle="Feel free to reach out about research, collaboration, or shared interests across public health and related fields."
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 20,
        }}
      >
        <AppCard title="Get in Touch">
          <div style={{ display: "grid", gap: 14, color: theme.muted }}>
            <a
              href={`mailto:${contact.email}`}
              style={{
                ...linkStyle(),
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Mail size={16} /> {contact.email}
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noreferrer"
              style={{
                ...linkStyle(),
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Linkedin size={16} /> LinkedIn Profile
            </a>
          </div>
        </AppCard>

        <AppCard
          title="Collaboration Note"
          description="I am especially interested in blood cancer research, public health data, and interdisciplinary questions that connect epidemiology with broader health outcomes."
        >
          <div style={{ color: theme.muted, lineHeight: 1.8 }}>
            <p>
              I enjoy exploring both focused cancer research questions and more
              diverse areas across public health, data, and health-related
              communication.
            </p>
            <p>If my work overlaps with your interests, feel free to reach out.</p>
          </div>
        </AppCard>
      </div>
    </section>
  );
}

export default function MiyaPortfolioWebsite() {
  const [page, setPage] = useState(
    typeof window !== "undefined" ? getPageFromHash() : "home"
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const syncPage = () => setPage(getPageFromHash());
    syncPage();
    window.addEventListener("hashchange", syncPage);
    return () => window.removeEventListener("hashchange", syncPage);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const pageContent =
    page === "about" ? <AboutPage /> :
    page === "projects" ? <ProjectsPage /> :
    page === "writing" ? <WritingPage /> :
    page === "activities" ? <ActivitiesPage /> :
    page === "resume" ? <ResumePage /> :
    page === "contact" ? <ContactPage /> :
    <HomePage />;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: theme.bg,
        color: theme.text,
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <BackgroundDecor />
      <div style={{ position: "relative", zIndex: 1 }}>
        <SiteHeader
          page={page}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />

        <main
          style={{
            maxWidth: 1160,
            margin: "0 auto",
            padding: "28px 20px 60px",
          }}
        >
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            {pageContent}
          </motion.div>
        </main>

        <footer
          style={{
            borderTop: `1px solid ${theme.border}`,
            background: "rgba(255,255,255,0.45)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div
            style={{
              maxWidth: 1160,
              margin: "0 auto",
              padding: "22px 20px",
              display: "flex",
              justifyContent: "space-between",
              gap: 14,
              flexWrap: "wrap",
              color: theme.muted,
            }}
          >
            <div>© 2026 {siteData.name}. Clean Academic theme.</div>
            <div
              style={{
                display: "flex",
                gap: 10,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={() => navigateTo("home")}
                style={{
                  background: "transparent",
                  border: 0,
                  color: theme.muted,
                  cursor: "pointer",
                }}
              >
                <Home size={16} />
              </button>
              <button
                onClick={() => navigateTo("about")}
                style={{
                  background: "transparent",
                  border: 0,
                  color: theme.muted,
                  cursor: "pointer",
                }}
              >
                About
              </button>
              <button
                onClick={() => navigateTo("projects")}
                style={{
                  background: "transparent",
                  border: 0,
                  color: theme.muted,
                  cursor: "pointer",
                }}
              >
                Projects
              </button>
              <button
                onClick={() => navigateTo("contact")}
                style={{
                  background: "transparent",
                  border: 0,
                  color: theme.muted,
                  cursor: "pointer",
                }}
              >
                Contact
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
