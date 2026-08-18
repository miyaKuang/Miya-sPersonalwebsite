import React, { useEffect, useState, useRef, useReducer } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
  Download,
} from "lucide-react";

const fontTokens = {
  displayFont: "'Fraunces', 'Playfair Display', Georgia, serif",
  monoFont: "'IBM Plex Mono', 'JetBrains Mono', ui-monospace, monospace",
};

const darkPalette = {
  mode: "dark",
  bg: "#13141d",
  panel: "rgba(27,29,42,0.86)",
  panelSolid: "#1b1d2a",
  panelSoft: "rgba(243,234,216,0.05)",
  text: "#f4ecdd",
  muted: "#b7ae9c",
  accent: "#cfa85a",
  accent2: "#c98a78",
  accentSoft: "rgba(207,168,90,0.16)",
  border: "rgba(243,234,216,0.14)",
  shadow: "0 20px 50px rgba(0,0,0,0.45)",
  paper: "#f3ead8",
  ink: "#14151f",
  sage: "#8fa68e",
  headerBg: "rgba(16,17,25,0.82)",
  footerBg: "rgba(16,17,25,0.6)",
  decorBg:
    "radial-gradient(circle at 14% 12%, rgba(207,168,90,0.14), transparent 0 30%), radial-gradient(circle at 88% 10%, rgba(201,138,120,0.12), transparent 0 26%), radial-gradient(circle at 80% 82%, rgba(143,166,142,0.10), transparent 0 30%), linear-gradient(180deg, #14151f 0%, #13141d 45%, #101119 100%)",
  decorGrid: "rgba(243,234,216,0.035)",
  decorBlob1: "radial-gradient(circle, rgba(207,168,90,0.10), rgba(207,168,90,0.02) 58%, transparent 72%)",
  decorBlob2: "radial-gradient(circle, rgba(201,138,120,0.10), rgba(201,138,120,0.02) 60%, transparent 72%)",
  heroCardBg: "linear-gradient(135deg, rgba(27,29,42,0.9) 0%, rgba(19,20,29,0.95) 70%, rgba(16,17,25,0.98) 100%)",
  heroBlob1: "radial-gradient(circle, rgba(207,168,90,0.20), rgba(207,168,90,0.03) 60%, transparent 72%)",
  heroBlob2: "radial-gradient(circle, rgba(201,138,120,0.16), rgba(201,138,120,0.03) 60%, transparent 72%)",
  ...fontTokens,
};

const lightPalette = {
  mode: "light",
  bg: "#f6efe1",
  panel: "rgba(255,251,244,0.88)",
  panelSolid: "#fffbf4",
  panelSoft: "rgba(20,21,31,0.04)",
  text: "#1c1d29",
  muted: "#6b6152",
  accent: "#a8823f",
  accent2: "#b06a55",
  accentSoft: "rgba(168,130,63,0.14)",
  border: "rgba(20,21,31,0.12)",
  shadow: "0 20px 44px rgba(60,45,20,0.14)",
  paper: "#fffbf4",
  ink: "#1c1d29",
  sage: "#5f7a5e",
  headerBg: "rgba(246,239,225,0.85)",
  footerBg: "rgba(246,239,225,0.7)",
  decorBg:
    "radial-gradient(circle at 14% 12%, rgba(168,130,63,0.12), transparent 0 30%), radial-gradient(circle at 88% 10%, rgba(176,106,85,0.10), transparent 0 26%), radial-gradient(circle at 80% 82%, rgba(95,122,94,0.10), transparent 0 30%), linear-gradient(180deg, #faf5e9 0%, #f6efe1 45%, #f1e9d8 100%)",
  decorGrid: "rgba(28,29,41,0.045)",
  decorBlob1: "radial-gradient(circle, rgba(168,130,63,0.10), rgba(168,130,63,0.02) 58%, transparent 72%)",
  decorBlob2: "radial-gradient(circle, rgba(176,106,85,0.10), rgba(176,106,85,0.02) 60%, transparent 72%)",
  heroCardBg: "linear-gradient(135deg, rgba(255,251,244,0.94) 0%, rgba(250,245,233,0.96) 70%, rgba(246,239,225,0.98) 100%)",
  heroBlob1: "radial-gradient(circle, rgba(168,130,63,0.18), rgba(168,130,63,0.03) 60%, transparent 72%)",
  heroBlob2: "radial-gradient(circle, rgba(176,106,85,0.14), rgba(176,106,85,0.03) 60%, transparent 72%)",
  ...fontTokens,
};

const theme = { ...lightPalette };

function applyThemeMode(mode) {
  const resolved =
    mode === "auto"
      ? (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches
          ? "light"
          : "dark")
      : mode;
  Object.assign(theme, resolved === "light" ? lightPalette : darkPalette);
  return resolved;
}

const siteData = {
  name: "Miya Kuang",
  preferredName: "Miya (Xuanxi) Kuang",
  tagline: "Public Health student, researcher, and writer interested in cancer epidemiology, immunology, and biostatistics.",
  location: "Irvine, California",
  heroBadge: "Researcher · Writer · Artist",
  heroIntro:
    "I am an undergraduate researcher at UC Irvine working across cancer epidemiology, wearable health data, and public health data analysis. This website brings together my research projects, publications, academic work, and creative interests in one place.",
  aboutBlank: `When I was younger, my brother's lymphoma diagnosis changed the way I understood health and medicine. It made me realize that health is not always predictable or fully controllable, and that even with modern treatment, families still face uncertainty, fear, and difficult gaps in care. That experience was one of the first reasons I started looking beyond biology alone and becoming interested in the larger public health questions behind disease, access, and survival.

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

const homeStats = [
  { label: "Cumulative GPA", value: 3.98, decimals: 2, icon: GraduationCap },
  { label: "Research Projects", value: 5, decimals: 0, suffix: "+", icon: FlaskConical },
  { label: "Conference Presentations", value: 3, decimals: 0, suffix: "+", icon: Award },
  { label: "Social Reach", value: 1.5, decimals: 1, suffix: "K+", icon: Sparkles },
];

const projects = [
  {
    title: "Prostate Cancer Incidence and Outcomes in Veteran and Non-Veteran Populations",
    role: "Paid Research Intern, All of Us Research Program at UCI",
    dates: "June 2026 – Present",
    summary:
      "Conducting epidemiologic research and statistical analyses on prostate cancer incidence and outcomes among veteran and non-veteran populations using the NIH All of Us Research Program database.",
    details: [
      "Works under the mentorship of Dr. Argos Ziogas and Dr. Hoda Anton-Culver to develop retrospective cohort studies using electronic health record data and the All of Us database.",
      "Uses SQL, Python, and OMOP common data model concepts to build cohorts and analyze population-level health data.",
      "Investigates cancer disparities between veteran and non-veteran populations.",
    ],
    tools: ["SQL", "Python", "OMOP CDM", "All of Us", "Cohort Studies", "Cancer Epidemiology"],
    funding:
      "Paid research internship supported by the UCI Public Health Informatics and Technology (PHIT) Workforce Development Program, a HRSA-funded partnership between UC Irvine, the Orange County Health Care Agency, and OCHIN.",
  },
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
    publicationLink: "https://doi.org/10.1158/1538-7445.AM2026-2350",
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
    publicationLink: "https://doi.org/10.1158/1538-7445.AM2026-5031",
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
      "Co-authored the peer-reviewed publication reporting the feasibility and preliminary effects of the intervention.",
    ],
    tools: ["R", "Statistics", "Data Cleaning", "Visualization", "Pilot Study"],
    publication:
      "Wang K, Kuang X, Kang M, et al. Feasibility and Preliminary Effects of a 5-Day Fasting-Mimicking Diet in Asian Americans With Prediabetes: A Pilot Study. Diabetes, Obesity and Metabolism. 2026;1–5.",
    publicationLink: "https://doi.org/10.1111/dom.71168",
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
      "Published in the Proceedings of the International Conference on Computer Science and Information Technology.",
    ],
    tools: ["Artificial Intelligence", "Education", "Drawing", "Human-Centered Design"],
    publication:
      "Kuang X, Sun Y. An Interactive and Collaborative Drawing Platform to Engage the Autism Spectrum in Art and Language Learning using Artificial Intelligence. Proceedings of the International Conference on Computer Science and Information Technology. 2022;65–74.",
    publicationLink: "https://doi.org/10.5121/csit.2022.121506",
  },
];

const writingAndPublications = [
  {
    title: "AACR 2026 Abstract — Peripheral T-Cell Lymphoma in Diverse Asian Populations",
    type: "Conference abstract",
    description:
      "Conference abstract for the AACR Annual Meeting 2026 based on population-level peripheral T-cell lymphoma incidence patterns across diverse Asian populations.",
    link: "https://doi.org/10.1158/1538-7445.AM2026-2350",
  },
  {
    title: "AACR 2026 Abstract — Wearable Data, Physical Activity, Sleep, and Breast Cancer Risk",
    type: "Conference abstract",
    description:
      "Conference abstract connecting real-world wearable data, the All of Us Research Program, and the broader Calit2-supported expansion on physical activity, sleep, and breast cancer risk.",
    link: "https://doi.org/10.1158/1538-7445.AM2026-5031",
  },
  {
    title: "Feasibility and Preliminary Effects of a 5-Day Fasting-Mimicking Diet in Asian Americans With Prediabetes: A Pilot Study",
    type: "Peer-reviewed publication",
    description:
      "Published in Diabetes, Obesity and Metabolism (2026). Authors: Kylee Wang, Xuanxi Kuang, Mirian Kang, Janani Prabaharan, Makena Castillo, Emily Nguyen, Annika Shah, Simar Salopal, Bryan-Clement Tiu, Sebastian Brandhorst, Jung Hun Ohn, Nathan Wong, Qin Yang, Karen Lindsay, Valter D. Longo, Hannah Lui Park.",
    link: "https://doi.org/10.1111/dom.71168",
  },
  {
    title: "Interactive and Collaborative Drawing Platform to Engage the Autism Spectrum in Art and Language Learning using Artificial Intelligence",
    type: "Publication",
    description:
      "Published research article combining AI, education, and creative engagement through interactive drawing tools.",
    link: "https://doi.org/10.5121/csit.2022.121506",
  },
  {
    title: "Coro's Adventure",
    type: "Children's book publication",
    description:
      "Authored and illustrated a 24-page children's book designed to teach young children about preventing the spread of COVID-19.",
    link: "https://www.amazon.com/s?k=9798832603094",
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
  tools: ["Python", "R", "SQL", "Microsoft Excel", "PowerPoint", "Google Workspace"],
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
    borderRadius: 999,
    padding: "12px 20px",
    fontFamily: theme.monoFont,
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: "0.03em",
    border: `1px solid ${primary ? theme.accent : theme.border}`,
    background: primary ? theme.accent : theme.panelSoft,
    color: primary ? theme.ink : theme.text,
    cursor: "pointer",
    boxShadow: primary ? "0 16px 34px rgba(207,168,90,0.22)" : "none",
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
    background: theme.panelSoft,
    color: theme.accent,
    padding: "8px 12px",
    fontSize: 13,
    fontWeight: 600,
    fontFamily: theme.monoFont,
    letterSpacing: "0.03em",
    textTransform: "uppercase",
  };
}

function cardStyle() {
  return {
    background: theme.panel,
    border: `1px solid ${theme.border}`,
    borderRadius: 24,
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

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
};

function RevealGrid({ style, children }) {
  return (
    <motion.div
      style={style}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: "some" }}
    >
      {children}
    </motion.div>
  );
}

function RevealItem({ children, style }) {
  return (
    <motion.div style={style} variants={fadeUp}>
      {children}
    </motion.div>
  );
}

function MotionButton({ primary = false, onClick, children, style }) {
  return (
    <motion.button
      onClick={onClick}
      style={{ ...buttonStyle(primary), ...style }}
      whileHover={{ scale: 1.045, y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 420, damping: 24 }}
    >
      {children}
    </motion.button>
  );
}

function Counter({ value, decimals = 0, suffix = "" }) {
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  const start = () => {
    if (started.current) return;
    started.current = true;
    const startTime = performance.now();
    const duration = 1100;
    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  return (
    <motion.span onViewportEnter={start} viewport={{ once: true, amount: 0.6 }}>
      {display.toFixed(decimals)}
      {suffix}
    </motion.span>
  );
}

function useGlobalPointer() {
  const [pos, setPos] = useState({ x: 0.5, y: 0.5 });
  useEffect(() => {
    let raf = null;
    const handle = (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        setPos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
        raf = null;
      });
    };
    window.addEventListener("mousemove", handle);
    return () => {
      window.removeEventListener("mousemove", handle);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return pos;
}

function BackgroundDecor() {
  const { scrollY } = useScroll();
  const blob1Y = useTransform(scrollY, [0, 2000], [0, 260]);
  const blob2Y = useTransform(scrollY, [0, 2000], [0, -220]);
  const gridY = useTransform(scrollY, [0, 2000], [0, 80]);
  const pointer = useGlobalPointer();
  const cursorGlow = `radial-gradient(circle at ${pointer.x * 100}% ${pointer.y * 100}%, ${theme.accentSoft}, transparent 38%)`;

  return (
    <>
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          background: theme.decorBg,
        }}
      />
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          background: cursorGlow,
          transition: "background 0.08s linear",
          pointerEvents: "none",
        }}
      />
      <motion.div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          opacity: 0.5,
          y: gridY,
          backgroundImage:
            `linear-gradient(${theme.decorGrid} 1px, transparent 1px), linear-gradient(90deg, ${theme.decorGrid} 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.15))",
          pointerEvents: "none",
        }}
      />
      <motion.div
        style={{
          position: "fixed",
          top: 110,
          right: -90,
          width: 340,
          height: 340,
          borderRadius: "50%",
          background: theme.decorBlob1,
          zIndex: 0,
          pointerEvents: "none",
          y: blob1Y,
        }}
      />
      <motion.div
        style={{
          position: "fixed",
          bottom: -80,
          left: -60,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: theme.decorBlob2,
          zIndex: 0,
          pointerEvents: "none",
          y: blob2Y,
        }}
      />
    </>
  );
}

function CrosshairMark({ style }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ position: "absolute", opacity: 0.55, pointerEvents: "none", ...style }}>
      <line x1="9" y1="0" x2="9" y2="18" stroke={theme.accent} strokeWidth="1" />
      <line x1="0" y1="9" x2="18" y2="9" stroke={theme.accent} strokeWidth="1" />
    </svg>
  );
}

const doodlePaths = {
  mountain: "M4 34 L16 14 L23 24 L30 9 L44 34 Z M20 34 L20 34",
  music: "M14 8 V28 A5 5 0 1 1 11 23.3 V13 L26 9 V25 A5 5 0 1 1 23 20.3 V4 L14 8 Z",
  brush: "M8 32 C8 26 12 22 16 22 C20 22 22 25 22 28 C22 31 19 33 16 33 C13 33 8 32 8 32 Z M16 22 L34 4 L38 8 L20 26",
  book: "M6 8 C10 5 16 5 20 8 V32 C16 29 10 29 6 32 Z M34 8 C30 5 24 5 20 8 V32 C24 29 30 29 34 32 Z",
  camera: "M6 13 H14 L17 8 H27 L30 13 H38 V33 H6 Z M22 23 A7 7 0 1 0 22 23.01",
  sparkle: "M16 2 L18.5 12.5 L29 15 L18.5 17.5 L16 28 L13.5 17.5 L3 15 L13.5 12.5 Z",
};

function Doodle({ type, size = 40, style, color }) {
  const d = doodlePaths[type];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      style={{ position: "absolute", pointerEvents: "none", ...style }}
    >
      <path d={d} stroke={color || theme.accent} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

let audioCtx = null;
let oscillator = null;
let lfo = null;
let gainNode = null;

function startAmbientSound() {
  if (typeof window === "undefined") return;
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) return;
  if (!audioCtx) audioCtx = new Ctx();
  if (audioCtx.state === "suspended") audioCtx.resume();
  if (oscillator) return;
  oscillator = audioCtx.createOscillator();
  lfo = audioCtx.createOscillator();
  const lfoGain = audioCtx.createGain();
  gainNode = audioCtx.createGain();
  oscillator.type = "sine";
  oscillator.frequency.value = 196;
  lfo.type = "sine";
  lfo.frequency.value = 0.12;
  lfoGain.gain.value = 5;
  lfo.connect(lfoGain);
  lfoGain.connect(oscillator.frequency);
  gainNode.gain.value = 0;
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  oscillator.start();
  lfo.start();
  gainNode.gain.linearRampToValueAtTime(0.035, audioCtx.currentTime + 1.4);
}

function stopAmbientSound() {
  if (!audioCtx || !gainNode) return;
  const ctx = audioCtx;
  const g = gainNode;
  const osc = oscillator;
  const l = lfo;
  g.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6);
  setTimeout(() => {
    if (osc) {
      osc.stop();
      osc.disconnect();
    }
    if (l) {
      l.stop();
      l.disconnect();
    }
    g.disconnect();
    if (oscillator === osc) oscillator = null;
    if (lfo === l) lfo = null;
    if (gainNode === g) gainNode = null;
  }, 700);
}

function GlossyQuill({ size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <defs>
        <linearGradient id="quillGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={theme.accent} stopOpacity="0.95" />
          <stop offset="100%" stopColor={theme.accent2} stopOpacity="0.85" />
        </linearGradient>
      </defs>
      <path
        d="M27 5 C21 5 12 10 8 20 L5 27 L12 24 C22 20 27 11 27 5 Z"
        fill="url(#quillGrad)"
        stroke={theme.text}
        strokeOpacity="0.15"
        strokeWidth="0.5"
      />
      <path d="M8 20 L5 27 L12 24" stroke={theme.ink} strokeOpacity="0.35" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
    </svg>
  );
}

function LiveClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30 * 1000);
    return () => clearInterval(id);
  }, []);
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  let zoneLabel = "";
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    zoneLabel = tz.split("/").pop().replace(/_/g, " ");
  } catch (e) {
    zoneLabel = "";
  }
  return (
    <span style={{ fontFamily: theme.monoFont, fontSize: 12, color: theme.muted, letterSpacing: "0.04em" }}>
      {hh}:{mm}{zoneLabel ? ` · ${zoneLabel} (your time)` : ""}
    </span>
  );
}

function StatusBar() {
  const [xy, setXy] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let raf = null;
    const handleMove = (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        setXy({ x: Math.round(e.clientX), y: Math.round(e.clientY) });
        raf = null;
      });
    };
    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 70,
        background: theme.headerBg,
        backdropFilter: "blur(12px)",
        borderTop: `1px solid ${theme.border}`,
      }}
    >
      <div
        style={{
          maxWidth: 1160,
          margin: "0 auto",
          padding: "10px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 14,
          flexWrap: "wrap",
        }}
      >
        <LiveClock />
        <span style={{ fontFamily: theme.monoFont, fontSize: 12, color: theme.muted, letterSpacing: "0.04em" }}>
          X {xy.x} · Y {xy.y}
        </span>
      </div>
    </div>
  );
}

function CommandChip({ label, align = "right", children }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children.button}
      {hovered ? (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          style={{
            position: "absolute",
            top: "calc(100% + 10px)",
            [align]: 0,
            width: "min(250px, calc(100vw - 32px))",
            zIndex: 60,
            border: `1px dashed ${theme.border}`,
            borderRadius: 10,
            background: theme.panelSolid,
            padding: 14,
            fontFamily: theme.monoFont,
            fontSize: 12,
            lineHeight: 1.9,
            color: theme.muted,
            boxShadow: theme.shadow,
          }}
        >
          {children.panel}
        </motion.div>
      ) : null}
    </div>
  );
}

function chipStyle() {
  return {
    fontFamily: theme.monoFont,
    fontSize: 11,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    padding: "8px 10px",
    borderRadius: 8,
    border: `1px dashed ${theme.border}`,
    background: "transparent",
    color: theme.muted,
    cursor: "pointer",
  };
}

function HiddenLink({ href, children }) {
  if (!href) return children;
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      initial="rest"
      whileHover="hover"
      style={{ display: "block", color: "inherit", textDecoration: "none", position: "relative" }}
    >
      <motion.div
        variants={{ rest: { opacity: 0, y: -4 }, hover: { opacity: 1, y: 0 } }}
        transition={{ duration: 0.15 }}
        style={{
          position: "absolute",
          top: 18,
          right: 18,
          zIndex: 3,
          color: theme.accent,
          pointerEvents: "none",
          display: "flex",
          alignItems: "center",
          gap: 4,
          fontFamily: theme.monoFont,
          fontSize: 10,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}
      >
        View <ExternalLink size={13} />
      </motion.div>
      {children}
    </motion.a>
  );
}

function AppCard({ title, description, tag, children }) {
  return (
    <motion.div
      style={cardStyle()}
      whileHover={{ y: -6, boxShadow: "0 26px 56px rgba(30,58,95,0.16)" }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
    >
      {tag ? <div style={{ color: theme.accent2, fontSize: 13, marginBottom: 8, fontWeight: 600, fontFamily: theme.monoFont, textTransform: "uppercase", letterSpacing: "0.04em" }}>{tag}</div> : null}
      <div style={{ fontSize: 22, fontWeight: 700, color: theme.text, marginBottom: 10, fontFamily: theme.displayFont }}>{title}</div>
      {description ? <div style={{ color: theme.muted, lineHeight: 1.7, marginBottom: 16 }}>{description}</div> : null}
      {children}
    </motion.div>
  );
}

function SectionTitle({ mono, title, subtitle }) {
  return (
    <div style={{ marginBottom: 28 }}>
      {mono ? (
        <div style={{ fontFamily: theme.monoFont, fontSize: 12, color: theme.accent, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
          {mono}
        </div>
      ) : null}
      <div style={{ fontFamily: theme.displayFont, fontSize: 36, fontWeight: 700, color: theme.text, marginBottom: 10 }}>{title}</div>
      <div style={{ color: theme.muted, maxWidth: 760, lineHeight: 1.7 }}>{subtitle}</div>
    </div>
  );
}

function SiteHeader({ page, mobileOpen, setMobileOpen, themeMode, resolvedMode, cycleTheme, soundOn, toggleSound }) {
  const themeLetter = themeMode === "light" ? "L" : themeMode === "auto" ? "A" : "D";
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
        background: theme.headerBg,
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
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <GlossyQuill size={22} />
          <motion.button
            onClick={() => navigateTo("home")}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: "transparent",
              border: 0,
              fontSize: 28,
              fontFamily: theme.displayFont,
              fontStyle: "italic",
              fontWeight: 600,
              color: theme.text,
              cursor: "pointer",
              letterSpacing: "-0.01em",
            }}
          >
            {siteData.name}
          </motion.button>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
          {nav.map(([label, key]) => (
            <motion.button
              key={key}
              onClick={() => navigateTo(key)}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.94 }}
              style={{
                position: "relative",
                overflow: "hidden",
                background: "transparent",
                color: page === key ? theme.accent : theme.muted,
                border: `1px solid ${page === key ? theme.border : "transparent"}`,
                borderRadius: 14,
                padding: "8px 12px",
                fontWeight: 700,
                fontFamily: theme.monoFont,
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              {page === key ? (
                <motion.span
                  layoutId="navPill"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  style={{ position: "absolute", inset: 0, background: theme.accentSoft, zIndex: -1 }}
                />
              ) : null}
              {label}
            </motion.button>
          ))}

          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <CommandChip align="right">
              {{
                button: (
                  <motion.button onClick={cycleTheme} whileHover={{ y: -1 }} whileTap={{ scale: 0.94 }} style={chipStyle()}>
                    THEME[{themeLetter}]
                  </motion.button>
                ),
                panel: (
                  <>
                    <div style={{ color: theme.text, marginBottom: 6, textTransform: "none" }}>Keyboard shortcuts</div>
                    <div>[L] light mode</div>
                    <div>[D] dark mode</div>
                    <div>[A] auto (system)</div>
                    <div>[S] toggle ambient sound</div>
                    <div>[T] scroll to top</div>
                    <div>[B] scroll to bottom</div>
                    <div style={{ marginTop: 6, opacity: 0.7 }}>Currently: {resolvedMode}{themeMode === "auto" ? " (auto)" : ""}</div>
                  </>
                ),
              }}
            </CommandChip>
            <motion.button onClick={toggleSound} whileHover={{ y: -1 }} whileTap={{ scale: 0.94 }} style={chipStyle()}>
              SOUND[{soundOn ? "+" : "–"}]
            </motion.button>
          </div>

          <motion.button
            onClick={() => setMobileOpen(!mobileOpen)}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94, rotate: 90 }}
            style={{ ...buttonStyle(false), padding: "8px 10px" }}
          >
            <Menu size={16} />
          </motion.button>
        </div>
      </div>

      {mobileOpen ? (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          style={{
            maxWidth: 1160,
            margin: "0 auto",
            padding: "0 20px 14px",
            display: "grid",
            gap: 8,
            overflow: "hidden",
          }}
        >
          {nav.map(([label, key]) => (
            <motion.button
              key={key}
              onClick={() => {
                navigateTo(key);
                setMobileOpen(false);
              }}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.97 }}
              style={{
                textAlign: "left",
                background: page === key ? theme.accentSoft : theme.panelSolid,
                border: `1px solid ${theme.border}`,
                color: page === key ? theme.accent : theme.text,
                borderRadius: 16,
                padding: "12px 14px",
                fontWeight: 700,
                fontFamily: theme.monoFont,
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              {label}
            </motion.button>
          ))}
        </motion.div>
      ) : null}
    </header>
  );
}

const playgroundStickers = [
  { type: "sparkle", top: "14%", left: "10%", size: 34, color: "accent" },
  { type: "mountain", top: "62%", left: "8%", size: 46, color: "sage" },
  { type: "brush", top: "20%", left: "82%", size: 40, color: "accent2" },
  { type: "book", top: "70%", left: "78%", size: 42, color: "accent" },
  { type: "music", top: "40%", left: "48%", size: 36, color: "accent2" },
];

function InteractivePlayground() {
  const containerRef = useRef(null);
  const [pos, setPos] = useState({ x: 0.5, y: 0.5 });

  const handleMove = (e) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const py = Math.max(0, Math.min(e.clientY - rect.top, rect.height));
    setPos({ x: px / rect.width, y: py / rect.height });
  };

  const glow1 = `radial-gradient(circle at ${pos.x * 100}% ${pos.y * 100}%, ${theme.accentSoft}, transparent 32%)`;
  const glow2 = `radial-gradient(circle at ${(1 - pos.x) * 100}% ${(1 - pos.y) * 100}%, ${theme.accent2}22, transparent 40%)`;
  const textGlow = `radial-gradient(circle at ${pos.x * 100}% ${pos.y * 100}%, #ffffff 0%, ${theme.accent} 30%, ${theme.accent2} 60%, ${theme.text} 85%)`;

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMove}
      style={{
        position: "relative",
        overflow: "hidden",
        borderBottom: `1px solid ${theme.border}`,
        minHeight: "calc(100vh - 77px)",
        background: theme.panelSoft,
        cursor: "crosshair",
        width: "100vw",
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `${glow1}, ${glow2}`,
          transition: "background 0.05s linear",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.5,
          backgroundImage: `linear-gradient(${theme.decorGrid} 1px, transparent 1px), linear-gradient(90deg, ${theme.decorGrid} 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          pointerEvents: "none",
        }}
      />
      <CrosshairMark style={{ top: 16, left: 16 }} />
      <CrosshairMark style={{ top: 16, right: 16 }} />
      <CrosshairMark style={{ bottom: 16, left: 16 }} />
      <CrosshairMark style={{ bottom: 16, right: 16 }} />

      {playgroundStickers.map((s, i) => (
        <motion.div
          key={s.type + i}
          drag
          dragConstraints={containerRef}
          dragElastic={0.15}
          whileDrag={{ scale: 1.2, zIndex: 20 }}
          whileHover={{ scale: 1.1 }}
          style={{
            position: "absolute",
            top: s.top,
            left: s.left,
            zIndex: 5,
            cursor: "grab",
            touchAction: "none",
          }}
        >
          <Doodle type={s.type} size={s.size} color={theme[s.color]} style={{ position: "static", pointerEvents: "none" }} />
        </motion.div>
      ))}

      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          minHeight: "calc(100vh - 77px)",
          padding: "40px 24px",
        }}
      >
        <div style={{ ...badgeStyle(), marginBottom: 18 }}>Move your cursor · drag the marks</div>
        <div
          style={{
            fontFamily: "'Lobster', cursive",
            fontWeight: 400,
            fontSize: "clamp(40px, 9vw, 108px)",
            lineHeight: 1.15,
            letterSpacing: "0.01em",
            maxWidth: 980,
            backgroundImage: textGlow,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            filter: "drop-shadow(0 6px 18px rgba(0,0,0,0.28))",
            transition: "background-image 0.05s linear",
          }}
        >
          Research with a human story.
        </div>
      </div>
    </section>
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
      <div style={{ marginBottom: 26 }}>
        <InteractivePlayground />
      </div>

      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20, marginBottom: 24 }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{
            ...cardStyle(),
            padding: 34,
            position: "relative",
            overflow: "hidden",
            background: theme.heroCardBg,
          }}
        >
          <motion.div
            animate={{ y: [0, 14, 0], x: [0, -8, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              top: -70,
              right: -40,
              width: 220,
              height: 220,
              borderRadius: "50%",
              background: theme.heroBlob1,
            }}
          />
          <motion.div
            animate={{ y: [0, -12, 0], x: [0, 10, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              bottom: -40,
              left: -30,
              width: 180,
              height: 180,
              borderRadius: "50%",
              background: theme.heroBlob2,
            }}
          />
          <div style={{ position: "relative", zIndex: 2 }}>
            <motion.div
              style={badgeStyle()}
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              {siteData.heroBadge}
            </motion.div>
            <div style={{ fontFamily: theme.displayFont, fontSize: 50, lineHeight: 1.05, fontWeight: 700, marginTop: 18, marginBottom: 16, letterSpacing: "-0.02em", color: theme.text }}>
              {siteData.name}
            </div>
            <div style={{ fontSize: 19, fontWeight: 600, color: theme.accent, marginBottom: 14 }}>{siteData.tagline}</div>
            <div style={{ color: theme.muted, fontSize: 17, lineHeight: 1.75, maxWidth: 700 }}>{siteData.heroIntro}</div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 22 }}>
              <MotionButton primary onClick={() => navigateTo("projects")}>View Projects</MotionButton>
              <MotionButton onClick={() => navigateTo("contact")}>Contact Me</MotionButton>
            </div>
          </div>
        </motion.div>

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
        <RevealGrid style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
          {homeStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <RevealItem key={stat.label}>
                <motion.div
                  whileHover={{ y: -6, boxShadow: "0 26px 56px rgba(30,58,95,0.16)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  style={{ ...cardStyle(), padding: 22, textAlign: "left" }}
                >
                  <Icon size={20} style={{ color: theme.accent, marginBottom: 10 }} />
                  <div style={{ fontSize: 32, fontWeight: 800, color: theme.text, letterSpacing: "-0.02em" }}>
                    <Counter value={stat.value} decimals={stat.decimals} suffix={stat.suffix || ""} />
                  </div>
                  <div style={{ color: theme.muted, fontWeight: 600, marginTop: 4 }}>{stat.label}</div>
                </motion.div>
              </RevealItem>
            );
          })}
        </RevealGrid>
      </section>

      <section style={{ marginBottom: 26 }}>
        <SectionTitle mono="Field Notes" title="At a Glance" subtitle="A few highlights before you explore the full sections of the website." />
        <RevealGrid style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
          {quickFacts.map((item) => (
            <RevealItem key={item}>
              <motion.div
                whileHover={{ y: -4, boxShadow: "0 20px 44px rgba(30,58,95,0.14)" }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                style={{ ...cardStyle(), padding: 18, fontWeight: 700, color: theme.text }}
              >
                {item}
              </motion.div>
            </RevealItem>
          ))}
        </RevealGrid>
      </section>

      <section>
        <SectionTitle mono="Explore" title="Explore Each Page" subtitle="These cards on the main page link directly to each independent page of the website." />
        <RevealGrid style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 18 }}>
          {overviewCards.map((card) => {
            const Icon = card.icon;
            return (
              <RevealItem key={card.key}>
                <AppCard title={card.title} description={card.description}>
                  <motion.div
                    whileHover={{ rotate: 12, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 350, damping: 18 }}
                    style={{ color: theme.accent, marginBottom: 12, display: "inline-block" }}
                  >
                    <Icon size={20} />
                  </motion.div>
                  <div>
                    <MotionButton onClick={() => navigateTo(card.key)}>
                      Open Page <ExternalLink size={15} />
                    </MotionButton>
                  </div>
                </AppCard>
              </RevealItem>
            );
          })}
        </RevealGrid>
      </section>
    </>
  );
}

const galleryDoodles = ["mountain", "sparkle", "brush", "camera", "book", "music"];

function AboutPage() {
  return (
    <section>
      <SectionTitle mono="Profile" title="About Me" subtitle="A mix of academic background, research interests, and a few outside-the-lab details." />
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
              <motion.span
                key={item}
                whileHover={{ scale: 1.08, y: -2, backgroundColor: theme.accentSoft }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
                style={{ padding: "8px 12px", borderRadius: 999, border: `1px solid ${theme.border}`, background: theme.panelSoft, color: theme.muted, fontSize: 14, fontWeight: 600, display: "inline-block" }}
              >
                {item}
              </motion.span>
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

      <SectionTitle mono="Beyond the Lab" title="Beyond the Lab" subtitle="A look at the interests and creative activities that shape who I am outside academics and research." />
      <RevealGrid style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18, marginBottom: 26 }}>
        {outsideLab.map((item) => {
          const Icon = item.icon;
          return (
            <RevealItem key={item.title}>
              <AppCard title={item.title} description={item.description}>
                <motion.div
                  whileHover={{ rotate: -10, scale: 1.15 }}
                  transition={{ type: "spring", stiffness: 350, damping: 16 }}
                  style={{ color: theme.accent, marginBottom: 12, display: "inline-block" }}
                >
                  <Icon size={20} />
                </motion.div>
                {item.link ? (
                  <div>
                    <a href={item.link} target="_blank" rel="noreferrer" style={linkStyle()}>
                      Visit link <ExternalLink size={14} style={{ marginLeft: 6, verticalAlign: "middle" }} />
                    </a>
                  </div>
                ) : null}
              </AppCard>
            </RevealItem>
          );
        })}
      </RevealGrid>

      <SectionTitle mono="Gallery" title="Drawings & Photos" subtitle="A small, growing gallery of my drawings and photos. These are placeholder sketches — I'll swap them for real pieces as I add them." />
      <RevealGrid style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
        {galleryDoodles.map((type, i) => (
          <RevealItem key={type + i}>
            <motion.div
              whileHover={{ y: -6, boxShadow: "0 26px 56px rgba(30,58,95,0.16)" }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              style={{
                ...cardStyle(),
                padding: 0,
                overflow: "hidden",
                aspectRatio: "4 / 3",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: theme.panelSoft,
              }}
            >
              <Doodle type={type} size={64} color={theme.accent} style={{ position: "static" }} />
            </motion.div>
          </RevealItem>
        ))}
      </RevealGrid>
    </section>
  );
}

function ProjectsPage() {
  return (
    <section>
      <SectionTitle mono="Research" title="Projects & Research" subtitle="Conference details are placed inside each project instead of being separated into a different section, so each project reads more like a complete research profile." />
      <RevealGrid style={{ display: "grid", gap: 18 }}>
        {projects.map((project) => (
          <RevealItem key={project.title}>
            <motion.div
              whileHover={{ y: -5, boxShadow: "0 28px 60px rgba(30,58,95,0.16)" }}
              transition={{ type: "spring", stiffness: 280, damping: 24 }}
              style={{ ...cardStyle(), padding: 28 }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 12 }}>
                <div>
                  <div style={{ color: theme.accent2, fontSize: 13, fontWeight: 700, marginBottom: 6, fontFamily: theme.monoFont, textTransform: "uppercase", letterSpacing: "0.04em" }}>{project.role}</div>
                  <div style={{ fontSize: 26, fontWeight: 700, color: theme.text, marginBottom: 8, fontFamily: theme.displayFont }}>{project.title}</div>
                  <div style={{ color: theme.accent, fontWeight: 700, fontFamily: theme.monoFont, fontSize: 13 }}>{project.dates}</div>
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
                      <motion.span
                        key={tool}
                        whileHover={{ scale: 1.08, y: -2, backgroundColor: theme.accentSoft }}
                        transition={{ type: "spring", stiffness: 400, damping: 18 }}
                        style={{ padding: "7px 10px", borderRadius: 999, border: `1px solid ${theme.border}`, background: theme.panelSoft, color: theme.muted, fontSize: 12, fontWeight: 700, display: "inline-block" }}
                      >
                        {tool}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>

              {project.funding ? (
                <div style={{ border: `1px solid ${theme.border}`, borderRadius: 20, padding: 16, background: theme.panelSoft, marginBottom: project.conference || project.conferences || project.publication ? 14 : 0 }}>
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
                <HiddenLink href={project.publicationLink}>
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
                </HiddenLink>
              ) : null}
            </motion.div>
          </RevealItem>
        ))}
      </RevealGrid>
    </section>
  );
}

function WritingPage() {
  return (
    <section>
      <SectionTitle mono="Bibliography" title="Writing & Publications" subtitle="A place for abstracts, publications, and creative work that connect my research and communication interests." />
      <RevealGrid style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 18 }}>
        {writingAndPublications.map((piece) => (
          <RevealItem key={piece.title}>
            <HiddenLink href={piece.link}>
              <AppCard title={piece.title} description={piece.description} tag={piece.type}>
                <motion.div
                  whileHover={{ rotate: -8, scale: 1.15 }}
                  transition={{ type: "spring", stiffness: 350, damping: 16 }}
                  style={{ color: theme.accent, marginBottom: 10, display: "inline-block" }}
                >
                  <BookOpen size={18} />
                </motion.div>
              </AppCard>
            </HiddenLink>
          </RevealItem>
        ))}
      </RevealGrid>
    </section>
  );
}

function ActivitiesPage() {
  return (
    <section>
      <SectionTitle mono="Service" title="Activities & Leadership" subtitle="This section now focuses on teaching, internships, lab support, and community roles rather than conference listings." />
      <RevealGrid style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20 }}>
        {activities.map((item) => (
          <RevealItem key={item.title}>
            <AppCard title={item.title} description={item.description} tag={item.dates} />
          </RevealItem>
        ))}
      </RevealGrid>
    </section>
  );
}

function ResumePage() {
  return (
    <section>
      <SectionTitle mono="CV" title="Resume / CV" subtitle="A GitHub-friendly summary of education, awards, skills, and academic profile details." />

      <div style={{ marginBottom: 22 }}>
        <MotionButton primary onClick={() => window.open(`${import.meta.env.BASE_URL}Miya-Kuang-Resume.pdf`, "_blank")}>
          <Download size={16} /> Download Resume / CV
        </MotionButton>
      </div>

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
              <motion.div
                key={item}
                whileHover={{ x: 6, borderColor: theme.accent2 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
                style={{ border: `1px solid ${theme.border}`, borderRadius: 18, padding: 14, background: theme.panelSoft, color: theme.muted, lineHeight: 1.7 }}
              >
                • {item}
              </motion.div>
            ))}
          </div>
        </AppCard>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20 }}>
        <AppCard title="Languages">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {skills.languages.map((item) => (
              <motion.span
                key={item}
                whileHover={{ scale: 1.08, y: -2, backgroundColor: theme.accentSoft }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
                style={{ padding: "8px 12px", borderRadius: 999, border: `1px solid ${theme.border}`, background: theme.panelSoft, color: theme.muted, fontWeight: 700, display: "inline-block" }}
              >
                {item}
              </motion.span>
            ))}
          </div>
        </AppCard>

        <AppCard title="Technical Tools">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {skills.tools.map((item) => (
              <motion.span
                key={item}
                whileHover={{ scale: 1.08, y: -2, backgroundColor: theme.accentSoft }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
                style={{ padding: "8px 12px", borderRadius: 999, border: `1px solid ${theme.border}`, background: theme.panelSoft, color: theme.muted, fontWeight: 700, display: "inline-block" }}
              >
                {item}
              </motion.span>
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
        mono="Reach Out"
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
            <motion.a
              href={`mailto:${contact.email}`}
              whileHover={{ x: 6 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
              style={{
                ...linkStyle(),
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Mail size={16} /> {contact.email}
            </motion.a>
            <motion.a
              href={contact.linkedin}
              target="_blank"
              rel="noreferrer"
              whileHover={{ x: 6 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
              style={{
                ...linkStyle(),
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Linkedin size={16} /> LinkedIn Profile
            </motion.a>
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

const themeCycle = ["dark", "light", "auto"];

export default function MiyaPortfolioWebsite() {
  const [page, setPage] = useState(
    typeof window !== "undefined" ? getPageFromHash() : "home"
  );
  const [mobileOpen, setMobileOpen] = useState(false);
  const [themeMode, setThemeMode] = useState(
    () => (typeof window !== "undefined" && window.localStorage.getItem("themeMode")) || "light"
  );
  const [resolvedMode, setResolvedMode] = useState("light");
  const [soundOn, setSoundOn] = useState(false);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    const resolved = applyThemeMode(themeMode);
    setResolvedMode(resolved);
    forceUpdate();
    if (typeof window !== "undefined") window.localStorage.setItem("themeMode", themeMode);
    if (themeMode === "auto" && typeof window !== "undefined" && window.matchMedia) {
      const mq = window.matchMedia("(prefers-color-scheme: light)");
      const handler = () => {
        const r = applyThemeMode("auto");
        setResolvedMode(r);
        forceUpdate();
      };
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
  }, [themeMode]);

  useEffect(() => {
    if (soundOn) startAmbientSound();
    else stopAmbientSound();
  }, [soundOn]);

  useEffect(() => {
    const handler = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = (e.target && e.target.tagName) || "";
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      const key = e.key.toLowerCase();
      if (key === "l") setThemeMode("light");
      else if (key === "d") setThemeMode("dark");
      else if (key === "a") setThemeMode("auto");
      else if (key === "s") setSoundOn((v) => !v);
      else if (key === "t") window.scrollTo({ top: 0, behavior: "smooth" });
      else if (key === "b") window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const cycleTheme = () => {
    const next = themeCycle[(themeCycle.indexOf(themeMode) + 1) % themeCycle.length];
    setThemeMode(next);
  };
  const toggleSound = () => setSoundOn((v) => !v);

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
          themeMode={themeMode}
          resolvedMode={resolvedMode}
          cycleTheme={cycleTheme}
          soundOn={soundOn}
          toggleSound={toggleSound}
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
            background: theme.footerBg,
            backdropFilter: "blur(10px)",
            marginBottom: 44,
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
            <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
              <div style={{ fontFamily: theme.monoFont, fontSize: 12, letterSpacing: "0.04em" }}>© 2026 {siteData.name}</div>
            </div>
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
                  fontFamily: theme.monoFont,
                  fontSize: 13,
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
                  fontFamily: theme.monoFont,
                  fontSize: 13,
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
                  fontFamily: theme.monoFont,
                  fontSize: 13,
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
                  fontFamily: theme.monoFont,
                  fontSize: 13,
                }}
              >
                Contact
              </button>
            </div>
          </div>
        </footer>
      </div>
      <StatusBar />
    </div>
  );
}
