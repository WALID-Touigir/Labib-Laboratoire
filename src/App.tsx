/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';

// Nomenclature data grouped by category for simple vertical browsing
const categoryGroups = [
  {
    key: "biochimie",
    title: "1. Analyses Biochimiques & Hormonologie",
    icon: "biotech",
    desc: "Chimie courante sanguine, enzymologie, hormonologie et examens urinaires.",
    items: [
      { name: "Acide urique", subcat: "Chimie courante sanguine", b: 30 },
      { name: "Glycémie à jeun", subcat: "Chimie courante sanguine", b: 30 },
      { name: "Cholestérol total", subcat: "Chimie courante sanguine", b: 30 },
      { name: "Cholestérol HDL / LDL (par fraction)", subcat: "Chimie courante sanguine", b: 50 },
      { name: "Triglycérides", subcat: "Chimie courante sanguine", b: 35 },
      { name: "Créatinine plasmatique & Clairance", subcat: "Chimie courante sanguine", b: 30 },
      { name: "Urée sanguine", subcat: "Chimie courante sanguine", b: 30 },
      { name: "Hémoglobine glycosylée (HbA1c)", subcat: "Chimie courante sanguine", b: 100 },
      { name: "Ionogramme complet (Na, K, Cl, Protéines)", subcat: "Chimie courante sanguine", b: 160 },
      { name: "Calcium sérique / Phosphore", subcat: "Chimie courante sanguine", b: 40 },
      { name: "Transaminases SGOT / ASAT", subcat: "Enzymologie", b: 40 },
      { name: "Transaminases SGPT / ALAT", subcat: "Enzymologie", b: 40 },
      { name: "Gamma-GT (GGT)", subcat: "Enzymologie", b: 45 },
      { name: "Phosphatases alcalines (PAL)", subcat: "Enzymologie", b: 40 },
      { name: "Troponine I ultrasensible", subcat: "Enzymologie / Marqueurs", b: 250 },
      { name: "TSH ultra-sensible", subcat: "Hormonologie", b: 250 },
      { name: "T3 Libre (FT3) / T4 Libre (FT4)", subcat: "Hormonologie", b: 220 },
      { name: "B-HCG Plasmatique Quantitatif", subcat: "Hormonologie", b: 250 },
      { name: "Protéinurie des 24 heures", subcat: "Examens Urinaires", b: 40 },
      { name: "Microalbuminurie", subcat: "Examens Urinaires", b: 80 },
      { name: "Analyse cyto-chimique liquide de ponction", subcat: "Liquides biologiques", b: 120 },
      { name: "Hyperglycémie provoquée orale (HGPO)", subcat: "Épreuves fonctionnelles", b: 120 }
    ]
  },
  {
    key: "hematologie",
    title: "2. Analyses Hématologiques",
    icon: "bloodtype",
    desc: "Cytologie, immuno-hématologie, hémostase et coagulation.",
    items: [
      { name: "Numération Formule Sanguine (NFS / Hémogramme)", subcat: "Cytologie", b: 80 },
      { name: "Vitesse de sédimentation (VS)", subcat: "Cytologie", b: 30 },
      { name: "Réticulocytes", subcat: "Cytologie", b: 50 },
      { name: "Myélogramme (Cytologie médullaire)", subcat: "Cytologie", b: 120 },
      { name: "Groupe sanguin ABO et facteur Rhésus (D)", subcat: "Immuno-Hématologie", b: 60 },
      { name: "Recherche d'Agglutinines Irrégulières (RAI)", subcat: "Immuno-Hématologie", b: 120 },
      { name: "Taux de Prothrombine (TP) / INR", subcat: "Hémostase", b: 40 },
      { name: "Temps de Céphaline Activée (TCA)", subcat: "Hémostase", b: 40 },
      { name: "Fibrinogène", subcat: "Hémostase", b: 40 },
      { name: "D-Dimères quantitatifs", subcat: "Hémostase", b: 250 }
    ]
  },
  {
    key: "bacteriologie",
    title: "3. Bactériologie - Parasitologie - Mycologie",
    icon: "microbiology",
    desc: "Bactériologie, antibiogrammes, parasitologie et examens mycologiques.",
    items: [
      { name: "ECBU (Examen Cytobactériologique des Urines)", subcat: "Bactériologie", b: 90 },
      { name: "Antibiogramme standard ou ciblé", subcat: "Bactériologie", b: 60 },
      { name: "Hémoculture (par flacon)", subcat: "Bactériologie", b: 80 },
      { name: "Coproculture bactérienne", subcat: "Bactériologie", b: 100 },
      { name: "Prélèvement vaginal / urétral complet", subcat: "Bactériologie", b: 120 },
      { name: "Examen Parasitologique des Selles (EPS)", subcat: "Parasitologie", b: 60 },
      { name: "Goutte épaisse / Frottis sanguin (Paludisme)", subcat: "Parasitologie", b: 80 },
      { name: "Recherche de Mycobactéries (BK / Frottis Ziehl)", subcat: "Bactériologie", b: 90 },
      { name: "Examen Mycologique (Peau, Ongles, Cheveux)", subcat: "Mycologie", b: 100 }
    ]
  },
  {
    key: "serologie",
    title: "4. Séro-diagnostic & Immunologie",
    icon: "shield",
    desc: "Sérologies virales, bactériennes, marqueurs tumoraux et immunologie.",
    items: [
      { name: "Hépatite B (Ag HBs)", subcat: "Sérologie Virale", b: 120 },
      { name: "Hépatite B - Charge virale PCR (ADN)", subcat: "Biologie Moléculaire", b: 600 },
      { name: "Hépatite C - ARN par PCR quantitative", subcat: "Biologie Moléculaire", b: 900 },
      { name: "VIH 1+2 (Test combiné Ag p24 + Ac)", subcat: "Sérologie Virale", b: 150 },
      { name: "Charge virale VIH (ARN plasmatique)", subcat: "Biologie Moléculaire", b: 900 },
      { name: "Sérologie Syphilis (TPHA / VDRL)", subcat: "Sérologie Bactérienne", b: 80 },
      { name: "Sérologie Toxoplasmose (IgG + IgM)", subcat: "Sérologie Parasitaire", b: 180 },
      { name: "Sérologie Rubéole (IgG + IgM)", subcat: "Sérologie Virale", b: 180 },
      { name: "Protéine C-Réactive (CRP quantitative)", subcat: "Immunologie", b: 100 },
      { name: "Antigène Spécifique Prostatique (PSA total)", subcat: "Marqueurs Tumoraux", b: 300 },
      { name: "PSA Libre (Rapport Libre/Total)", subcat: "Marqueurs Tumoraux", b: 250 },
      { name: "Marqueur ACE (Antigène Carcino-Embryonnaire)", subcat: "Marqueurs Tumoraux", b: 250 },
      { name: "Marqueur CA 125", subcat: "Marqueurs Tumoraux", b: 300 },
      { name: "Marqueur CA 19-9", subcat: "Marqueurs Tumoraux", b: 300 },
      { name: "Marqueur CA 15-3", subcat: "Marqueurs Tumoraux", b: 300 },
      { name: "Alpha-fœtoprotéine (AFP)", subcat: "Marqueurs Tumoraux", b: 250 },
      { name: "Facteur Rhumatoïde / Waaler-Rose", subcat: "Immunologie", b: 100 },
      { name: "Anticorps Anti-Nucléaires (AAN / ANA)", subcat: "Immunologie", b: 250 }
    ]
  },
  {
    key: "etranger",
    title: "5. Prescriptions Transmises à l'Étranger",
    icon: "science",
    desc: "Vitamines, hormonologie spécialisée et cytogénétique.",
    items: [
      { name: "25-OH Vitamine D (D2 + D3)", subcat: "Vitamines & Métabolisme", b: 450 },
      { name: "Vitamine B12", subcat: "Vitamines & Métabolisme", b: 400 },
      { name: "Folates sériques (Vitamine B9)", subcat: "Vitamines & Métabolisme", b: 400 },
      { name: "Parathormone intacte (PTH)", subcat: "Hormonologie Spécialisée", b: 400 },
      { name: "Calcitonine sérique", subcat: "Hormonologie Spécialisée", b: 450 },
      { name: "Caryotype constitutionnel sanguin", subcat: "Cytogénétique", b: 1200 },
      { name: "Électrophorèse de l'Hémoglobine", subcat: "Hématologie Spécialisée", b: 250 },
      { name: "Inhibine B", subcat: "Fertilité / Reproduction", b: 500 }
    ]
  }
];

export default function App() {
  const [currentPath, setCurrentPath] = useState<'accueil' | 'a-propos' | 'politique-qualite' | 'espace-patient' | 'espace-pro' | 'contact'>('accueil');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [patientDropdownOpen, setPatientDropdownOpen] = useState(false);
  const [proDropdownOpen, setProDropdownOpen] = useState(false);
  const [contactDropdownOpen, setContactDropdownOpen] = useState(false);

  // Accordion open state for vertical categories (all open by default for friendly browsing)
  const [openCategories, setOpenCategories] = useState<{ [key: string]: boolean }>({
    biochimie: true,
    hematologie: true,
    bacteriologie: true,
    serologie: true,
    etranger: true
  });

  // FAQ state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Contact form state
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ fullName: '', phone: '', email: '', subject: '', message: '' });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
    setPatientDropdownOpen(false);
    setProDropdownOpen(false);
    setContactDropdownOpen(false);
  }, [currentPath]);

  const handleNavClick = (path: 'accueil' | 'a-propos' | 'politique-qualite' | 'espace-patient' | 'espace-pro' | 'contact') => {
    setCurrentPath(path);
  };

  const toggleCategory = (key: string) => {
    setOpenCategories(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface min-h-screen flex flex-col selection:bg-primary-container selection:text-on-primary">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="w-full bg-primary-container py-2 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-center">
            <span className="material-symbols-outlined text-on-primary text-[16px]">schedule</span>
            <p className="font-label-sm text-label-sm text-on-primary tracking-wide">
              Pour vos Prélèvements, Le Labib Laboratoire est à votre service de 07h - 19h urgences 24h/24, 7j/7 (Contact: +212 500 000 000)
            </p>
          </div>
        </div>
        <div className="w-full bg-surface-container-lowest shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
          <div className="max-w-7xl h-20 mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('accueil')}>
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm text-primary tracking-tight leading-none">Labib Laboratoire</span>
                <span className="font-label-sm text-label-sm text-outline tracking-wider uppercase mt-0.5">Analyses médicales</span>
              </div>
            </div>

            <nav className="hidden xl:flex items-center gap-6">
              <button
                onClick={() => handleNavClick('a-propos')}
                className={`font-label-md text-label-md transition-colors py-2 px-3 rounded-lg ${
                  currentPath === 'a-propos' ? 'bg-surface-mint text-primary' : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                A propos
              </button>
              <button
                onClick={() => handleNavClick('politique-qualite')}
                className={`font-label-md text-label-md transition-colors py-2 px-3 rounded-lg ${
                  currentPath === 'politique-qualite' ? 'bg-surface-mint text-primary' : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                Politique qualité
              </button>

              {/* Espace Patient Dropdown */}
              <div
                className="relative group py-2"
                onMouseEnter={() => setPatientDropdownOpen(true)}
                onMouseLeave={() => setPatientDropdownOpen(false)}
              >
                <button
                  onClick={() => handleNavClick('espace-patient')}
                  className={`inline-flex items-center gap-1 font-label-md text-label-md transition-colors px-3 rounded-lg ${
                    currentPath === 'espace-patient' ? 'text-primary bg-surface-mint' : 'text-on-surface-variant group-hover:text-primary'
                  }`}
                >
                  <span>Espace Patient</span>
                  <span className="material-symbols-outlined text-[18px]">expand_more</span>
                </button>
                {patientDropdownOpen && (
                  <div className="absolute top-full left-0 bg-surface-container-lowest shadow-[0_8px_24px_rgba(0,168,157,0.12)] rounded-lg py-2 min-w-[210px] z-50">
                    <button
                      onClick={() => handleNavClick('espace-patient')}
                      className="w-full text-left px-4 py-2 font-body-md text-body-md text-on-surface-variant hover:bg-surface-mint hover:text-primary transition-colors"
                    >
                      Espace patient & manuels
                    </button>
                  </div>
                )}
              </div>

              {/* Espace Pro Dropdown */}
              <div
                className="relative group py-2"
                onMouseEnter={() => setProDropdownOpen(true)}
                onMouseLeave={() => setProDropdownOpen(false)}
              >
                <button
                  onClick={() => handleNavClick('espace-pro')}
                  className={`inline-flex items-center gap-1 font-label-md text-label-md transition-colors px-3 rounded-lg ${
                    currentPath === 'espace-pro' ? 'text-primary bg-surface-mint' : 'text-on-surface-variant group-hover:text-primary'
                  }`}
                >
                  <span>Espace Pro</span>
                  <span className="material-symbols-outlined text-[18px]">expand_more</span>
                </button>
                {proDropdownOpen && (
                  <div className="absolute top-full left-0 bg-surface-container-lowest shadow-[0_8px_24px_rgba(0,168,157,0.12)] rounded-lg py-2 min-w-[210px] z-50">
                    <button
                      onClick={() => handleNavClick('espace-pro')}
                      className="w-full text-left px-4 py-2 font-body-md text-body-md text-on-surface-variant hover:bg-surface-mint hover:text-primary transition-colors"
                    >
                      Espace professionnel & nomenclature
                    </button>
                  </div>
                )}
              </div>

              {/* Contact Dropdown */}
              <div
                className="relative group py-2"
                onMouseEnter={() => setContactDropdownOpen(true)}
                onMouseLeave={() => setContactDropdownOpen(false)}
              >
                <button
                  onClick={() => handleNavClick('contact')}
                  className={`inline-flex items-center gap-1 font-label-md text-label-md transition-colors px-3 rounded-lg ${
                    currentPath === 'contact' ? 'text-primary bg-surface-mint' : 'text-on-surface-variant group-hover:text-primary'
                  }`}
                >
                  <span>Contact</span>
                  <span className="material-symbols-outlined text-[18px]">expand_more</span>
                </button>
                {contactDropdownOpen && (
                  <div className="absolute top-full left-0 bg-surface-container-lowest shadow-[0_8px_24px_rgba(0,168,157,0.12)] rounded-lg py-2 min-w-[190px] z-50">
                    <button
                      onClick={() => handleNavClick('contact')}
                      className="w-full text-left px-4 py-2 font-body-md text-body-md text-on-surface-variant hover:bg-surface-mint hover:text-primary transition-colors"
                    >
                      Contact & Accès
                    </button>
                  </div>
                )}
              </div>
            </nav>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Menu Mobile"
                className="xl:hidden p-2 text-on-surface hover:text-primary transition-colors rounded-lg bg-surface-container-low"
              >
                <span className="material-symbols-outlined text-[26px]">menu</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-surface-container-lowest shadow-[0_4px_16px_rgba(0,0,0,0.1)] px-4 sm:px-6 py-4 border-t border-surface-container">
            <div className="flex flex-col gap-3">
              <button
                onClick={() => handleNavClick('a-propos')}
                className="text-left py-2 px-3 rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-mint hover:text-primary"
              >
                A propos
              </button>
              <button
                onClick={() => handleNavClick('politique-qualite')}
                className="text-left py-2 px-3 rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-mint hover:text-primary"
              >
                Politique qualité
              </button>
              <div className="py-1 px-3">
                <span className="font-label-sm text-label-sm text-outline uppercase">Espace Patient</span>
                <div className="pl-2 pt-1 flex flex-col gap-1">
                  <button
                    onClick={() => handleNavClick('espace-patient')}
                    className="text-left py-1.5 font-body-md text-body-md text-on-surface-variant hover:text-primary"
                  >
                    Espace patient & manuel
                  </button>
                </div>
              </div>
              <div className="py-1 px-3">
                <span className="font-label-sm text-label-sm text-outline uppercase">Espace Pro</span>
                <div className="pl-2 pt-1 flex flex-col gap-1">
                  <button
                    onClick={() => handleNavClick('espace-pro')}
                    className="text-left py-1.5 font-body-md text-body-md text-on-surface-variant hover:text-primary"
                  >
                    Espace professionnel & catalogue
                  </button>
                </div>
              </div>
              <div className="py-1 px-3">
                <span className="font-label-sm text-label-sm text-outline uppercase">Contact</span>
                <div className="pl-2 pt-1 flex flex-col gap-1">
                  <button
                    onClick={() => handleNavClick('contact')}
                    className="text-left py-1.5 font-body-md text-body-md text-on-surface-variant hover:text-primary"
                  >
                    Contact & Accès
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="w-full pt-36 sm:pt-40 bg-surface min-h-[calc(100vh-28rem)] flex-1 flex flex-col">
        {/* VIEW 1: ACCUEIL */}
        {currentPath === 'accueil' && (
          <div className="flex flex-col w-full flex-1">
            {/* Hero Section */}
            <section className="relative w-full overflow-hidden bg-gradient-to-r from-primary via-primary-container to-secondary py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
              <div
                className="absolute inset-0 z-0 bg-cover bg-center mix-blend-overlay opacity-40 pointer-events-none"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDQADI4ifZe4FBnPpaSF6xcQEOuOerUUX7vTAxl6PQ5LO22BRh7pirXXFRMWMsdd9kkGd0_2qaT6BvQqRU87evUahbcOixGpmyP2l35MMnFtjRjL2OSiiP3ljOni8gNyamcCYAtIj3atP8nLag-IDgPNQFZlHwD11mKqZR3bDoc5ch84DyG649d87kUJIB2h89rsx9mzDueKKp6BqrKIOPpTv8o-TqVoeyXAvKBe9U')"
                }}
              />
              <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <div className="lg:col-span-7 flex flex-col items-start gap-6 text-surface-container-lowest">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-lowest/15 backdrop-blur-sm">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary-fixed animate-pulse"></span>
                    <span className="font-label-sm text-label-sm text-surface-container-lowest uppercase tracking-wider">
                      Labib Laboratoire de référence • Marrakech
                    </span>
                  </div>
                  <h1 className="font-display-hero text-3xl sm:text-4xl lg:text-5xl text-surface-container-lowest tracking-tight leading-tight">
                    Laboratoire d’analyses médicales à Marrakech
                  </h1>
                  <p className="font-body-lg text-base sm:text-lg text-surface-container-lowest/90 max-w-2xl leading-relaxed">
                    Le <strong>Labib Laboratoire</strong> à Marrakech vous propose des analyses médicales fiables, rapides et précises. Profitez également de notre service de prélèvement à domicile à Marrakech pour un meilleur confort.
                  </p>
                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <a
                      href="tel:+212500000000"
                      className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-tertiary-container hover:bg-tertiary text-on-tertiary font-headline-sm text-headline-sm shadow-lg hover:shadow-xl transition-all"
                    >
                      <span className="material-symbols-outlined text-[24px]">call</span>
                      <span>+212 500 000 000</span>
                    </a>
                    <span className="font-label-sm text-label-sm text-surface-container-lowest/80 tracking-wide">Urgences 24h/24 & 7j/7</span>
                  </div>
                </div>
                <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-surface-container-lowest/10 backdrop-blur-md p-3 max-w-md w-full">
                    <img
                      alt="Labib Laboratoire tubes"
                      className="w-full h-72 sm:h-80 object-cover rounded-xl"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDaJ9gNhR9X7XnEkhS6cBgJLq2vvM6f9Qflxoo6aHzeDxYlrlfDGFf3qLfw9kioolOt8oM5CMeKjirmyhEv_BzeGsNQC2Wq9ltM14Zonm9zmjG1YWs9X5JdWg_h2zotNwwGfKs94L_CipO1TJeXXC194mMRNKo26TGAnxQDh9Ctkwb9TCSchoQAiboqwaNLveD96QaQqsSWS3h383QaVhPv8T76Js9TuQlUS_vsI4E"
                    />
                    <div className="absolute bottom-4 left-4 right-4 bg-surface-container-lowest/95 backdrop-blur-sm p-4 rounded-xl shadow-md flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="material-symbols-outlined text-primary text-[24px]">verified</span>
                        <div>
                          <p className="font-label-md text-label-md text-on-surface leading-tight">Accréditation NM ISO 15189</p>
                          <p className="font-body-sm text-body-sm text-outline">Prélèvements & Biologie Médicale</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 bg-surface-mint text-primary font-label-sm text-label-sm rounded-full">v. 2023</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SEMAC Accreditation Banner */}
            <section className="w-full bg-surface-container-lowest shadow-sm py-6 px-4 sm:px-6">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6">
                <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 rounded-2xl bg-surface-container-low p-2">
                  <svg className="w-full h-full text-cta-coral" fill="none" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <polygon fill="#ffffff" points="50,5 90,25 90,75 50,95 10,75 10,25" stroke="currentColor" strokeWidth="4"></polygon>
                    <path d="M30 52 L45 67 L72 35" stroke="#00a89d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="7"></path>
                    <text fill="#ba1a1a" fontFamily="Montserrat" fontSize="11" fontWeight="bold" textAnchor="middle" x="50" y="24">SEMAC</text>
                    <text fill="#6c7a77" fontFamily="Montserrat" fontSize="8" fontWeight="bold" textAnchor="middle" x="50" y="85">ACCREDITATION</text>
                  </svg>
                </div>
                <div className="flex flex-col text-center md:text-left max-w-3xl">
                  <h2 className="font-headline-sm text-headline-sm text-cta-coral tracking-tight uppercase">
                    Laboratoire Accrédité par SEMAC, N° 12/2025 selon la norme 15189 version 2023
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1 leading-relaxed">
                    Notre portée d’accréditation est disponible en téléchargement et sur le site du Ministère de l’Industrie :{' '}
                    <a href="https://www.mcinet.gov.ma" target="_blank" rel="noopener noreferrer" className="font-label-md text-label-md text-secondary hover:underline">
                      www.mcinet.gov.ma
                    </a>
                  </p>
                </div>
              </div>
            </section>

            {/* Navigation Cards Trio */}
            <section className="w-full bg-surface-mint py-16 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Card 1: Espace Patients */}
                  <button
                    onClick={() => handleNavClick('espace-patient')}
                    className="group flex flex-col bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 text-left border border-surface-container"
                  >
                    <div className="relative h-64 w-full overflow-hidden">
                      <img
                        alt="Espace patient"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMhbghndbgdMYrLCEPm3XOQa6-MdG-37hYXdGSgRyPFVeRUkup2mbnZEAIwPoYEnhONm8zd2hwKhLlpbVToY3SX5H_LfkPE04UEcRASK8nA6Gs4U89TfUabXinJYb4GaR3L8qsFuyLU4flbaHAnn25nyJD4gRO_XbDH1TKpTviXW0Hqc2du6U-Jc-Xo89PCHPX5wHaqaWhnq_AS3Uke8qwWtLMU6KDuPvMoVRYGQ4"
                      />
                      <div className="absolute top-4 left-4 px-3 py-1 bg-surface-container-lowest/90 backdrop-blur-sm rounded-full flex items-center gap-1.5 shadow-sm">
                        <span className="material-symbols-outlined text-primary text-[16px]">home</span>
                        <span className="font-label-sm text-label-sm text-primary">Prélèvement à Domicile</span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col items-center justify-center text-center w-full">
                      <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">Espace Patients & Manuels</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Consultez nos guides de prélèvement, consignes de jeûne et FAQ.</p>
                      <span className="mt-4 font-label-sm text-label-sm text-primary flex items-center gap-1">
                        Préparer votre visite <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                      </span>
                    </div>
                  </button>

                  {/* Card 2: Espace Professionnel */}
                  <button
                    onClick={() => handleNavClick('espace-pro')}
                    className="group flex flex-col bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 text-left border border-surface-container"
                  >
                    <div className="relative h-64 w-full overflow-hidden">
                      <img
                        alt="Espace Pro"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWGDqNQ3nzrOoe56YW552Hty-UOiyicBatZSqCdK-a2pMgXmUEpAmJNoANa0vxkxoMM1H4-qLIsmSfm0ULyRNcql25UAarzV6H_XPLB-96Uq9VoLcJBEaebuezzEaeSmc0FcNf5-K0H6A84K11kw-CA8NhHtkZF8zskAI7j4YEdlqS1ofu1XyzA4maJ9IYRMo-HabmQh70xI_AU21WLsGi_pjCJs_YqiKeKm2BEAY"
                      />
                      <div className="absolute top-4 left-4 px-3 py-1 bg-surface-container-lowest/90 backdrop-blur-sm rounded-full flex items-center gap-1.5 shadow-sm">
                        <span className="material-symbols-outlined text-primary text-[16px]">medical_services</span>
                        <span className="font-label-sm text-label-sm text-primary">Praticiens & Cliniques</span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col items-center justify-center text-center w-full">
                      <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">Espace Professionnel & Catalogue</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Accédez à la nomenclature officielle des cotations B et liaisons SIL.</p>
                      <span className="mt-4 font-label-sm text-label-sm text-primary flex items-center gap-1">
                        Catalogue & Nomenclature <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </section>

            {/* Domicile Callout Banner */}
            <section className="relative w-full bg-gradient-to-r from-primary-fixed-dim via-primary-container to-tertiary overflow-hidden py-10 px-4 sm:px-6">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                <div className="text-surface-container-lowest">
                  <h2 className="font-headline-lg text-headline-lg font-bold text-surface-container-lowest drop-shadow-sm">Prélèvements à Domicile à Marrakech</h2>
                  <p className="font-headline-md text-headline-md text-surface-container-lowest/95 font-semibold mt-1">Intervention rapide sur tout le Grand Marrakech</p>
                </div>
                <div>
                  <a
                    href="tel:+212500000000"
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-cta-coral hover:opacity-95 text-surface-container-lowest font-headline-md text-headline-md shadow-[0_8px_20px_rgba(255,77,90,0.35)] hover:scale-105 transition-all"
                  >
                    <span className="material-symbols-outlined text-[28px]">call</span>
                    <span>+212 500 000 000</span>
                  </a>
                </div>
              </div>
            </section>

            {/* About Preview Section */}
            <section className="w-full bg-surface-container-lowest py-20 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-6">
                    <div className="relative rounded-2xl overflow-hidden shadow-xl group">
                      <img
                        alt="Labib Laboratoire Guéliz"
                        className="w-full h-[400px] object-cover rounded-2xl"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrfXTVtt_JlyLw7bEU2i6u5xJ7wVT8yw43pJutGCf5PrbEDMfM4ihVyRSfZO6WOgNd83iMs2EjKfxGQ0RfQNnv18dosS5E6B0gN6hrLKR6l9lkb7AkG0J4Z5CZc9I4AHPNaU9dAaCFbQ9begZsOShjG8EbI-82rUdyHiYYjL8TgHhyB-GF_B0k6gPucU0vrFvQEzbMsvXXdL-Ux1uKHe3qwnFXnN1Ze75lJlrBLRY"
                      />
                      <div className="absolute bottom-4 left-4 bg-surface-container-lowest/95 backdrop-blur-md px-4 py-2.5 rounded-xl shadow flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-[20px]">location_on</span>
                        <span className="font-label-md text-label-md text-on-surface">Quartier Guéliz • Marrakech</span>
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-6 flex flex-col items-start gap-6">
                    <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest bg-surface-mint px-3.5 py-1.5 rounded-full">
                      Depuis plus de 20 ans
                    </span>
                    <h2 className="font-headline-lg text-2xl sm:text-3xl text-primary tracking-tight">
                      Labib Laboratoire – Analyses Médicales à Marrakech depuis 2002
                    </h2>
                    <div className="w-16 h-1 bg-primary-container rounded-full"></div>
                    <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                      Fondé en 2002, le <strong>Labib Laboratoire</strong> est situé au cœur de <strong>Marrakech</strong>. Nous sommes une équipe de plus de 30 professionnels engagés à fournir des analyses médicales précises et fiables.
                    </p>
                    <div className="grid grid-cols-2 gap-6 w-full pt-2">
                      <div className="p-5 bg-surface-container-low rounded-xl border border-surface-container">
                        <p className="font-display-hero text-3xl sm:text-4xl text-primary font-bold">30+</p>
                        <p className="font-label-sm text-label-sm text-outline uppercase mt-1">Professionnels de santé</p>
                      </div>
                      <div className="p-5 bg-surface-container-low rounded-xl border border-surface-container">
                        <p className="font-display-hero text-3xl sm:text-4xl text-secondary font-bold">2002</p>
                        <p className="font-label-sm text-label-sm text-outline uppercase mt-1">Année de fondation</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* VIEW 2: A PROPOS */}
        {currentPath === 'a-propos' && (
          <div className="flex flex-col w-full flex-1">
            <section className="w-full bg-surface-container-low py-8 px-4 sm:px-6">
              <div className="max-w-7xl mx-auto">
                <nav aria-label="Fil d'Ariane" className="flex items-center gap-2 mb-4">
                  <button onClick={() => handleNavClick('accueil')} className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">home</span>
                    <span>Accueil</span>
                  </button>
                  <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
                  <span className="font-body-sm text-body-sm text-primary font-semibold">Qui sommes-nous ?</span>
                </nav>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface-mint text-primary font-label-sm text-label-sm uppercase tracking-wider mb-2">
                      <span className="w-2 h-2 rounded-full bg-primary-container"></span>
                      Présentation Institutionnelle
                    </span>
                    <h1 className="font-display-hero text-3xl sm:text-4xl text-on-surface tracking-tight">Qui sommes-nous ?</h1>
                    <p className="font-headline-md text-xl text-primary mt-1">Labib Laboratoire d’analyses médicales</p>
                  </div>
                  <div className="flex items-center gap-3 bg-surface-container-lowest px-4 py-3 rounded-xl shadow-sm border border-surface-container">
                    <span className="material-symbols-outlined text-primary-container text-[28px]">verified</span>
                    <div>
                      <p className="font-label-md text-label-md text-on-surface leading-tight">Accréditation NM ISO 15189</p>
                      <p className="font-body-sm text-body-sm text-outline">Excellence biologique depuis 2002</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-surface-container-lowest">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-7 flex flex-col gap-6">
                    <div className="space-y-4">
                      <p className="font-body-lg text-lg text-on-surface font-medium leading-relaxed">
                        Le <strong className="text-primary font-bold">Labib Laboratoire d’analyses médicales de Marrakech</strong> a été créé en <span className="text-primary font-bold">2002</span>.
                      </p>
                      <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                        Idéalement situé au cœur de <strong className="text-on-surface font-semibold">Marrakech</strong>, notre établissement s'appuie sur une équipe dévouée et hautement qualifiée constituée de <strong className="text-primary font-semibold">30 collaborateurs</strong> (biologistes, techniciens préleveurs, qualiticiens et secrétaires médicales).
                      </p>
                      <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                        Notre centre, centré sur le <strong className="text-on-surface font-semibold">patient ambulatoire</strong>, dispose de tous les moyens technologiques modernes pour la réalisation d’analyses dans de nombreux domaines d'expertise et travaille en synergie avec les cliniques de la région.
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-4 pt-4">
                      <div className="p-4 rounded-xl bg-surface-mint text-center border border-surface-container">
                        <span className="font-headline-lg text-2xl text-primary block font-bold">2002</span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant uppercase mt-1 block">Création</span>
                      </div>
                      <div className="p-4 rounded-xl bg-surface-mint text-center border border-surface-container">
                        <span className="font-headline-lg text-2xl text-primary block font-bold">30</span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant uppercase mt-1 block">Experts</span>
                      </div>
                      <div className="p-4 rounded-xl bg-surface-mint text-center border border-surface-container">
                        <span className="font-headline-lg text-2xl text-primary block font-bold">+10</span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant uppercase mt-1 block">Cliniques partenaires</span>
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-5 flex flex-col gap-4">
                    <div className="relative rounded-2xl overflow-hidden shadow-lg bg-surface-container">
                      <img
                        alt="Labib Laboratoire Marrakech"
                        className="w-full h-80 object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAX-PFzaxqglNsbJWyfAxdkBllPdwmHrbU-B6Lg9KPIlGdYb13wRW3Fnvm3-XRvtmskjPVNYAfKEFeUHa_G5e0filLHBJtk9qM6603mrV6pMHSa6jKCoLU3mgmPZpXX0zXRQkE0FXvXyPaQdkrGLIfOxJk8t3ef__GMSagCLMu-KvmtwaVjDEaE7KM9IvPeIukd4g_2vzeAvKr7Xi9abqzzG_FppRfZRuTxMm5Jjl0"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Expertise domains */}
            <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-surface-mint">
              <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-12">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">Domaines d'expertise</span>
                  <h2 className="font-headline-lg text-2xl sm:text-3xl text-on-surface mt-1">Biologie médicale de routine et spécialisée</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { title: "Hématologie", desc: "NFS, VS, frottis sanguins cytologiques, réticulocytes.", icon: "bloodtype" },
                    { title: "Biochimie clinique", desc: "Bilan hépatique, rénal, glycémie, HbA1c, lipidémie, ionogramme.", icon: "biotech" },
                    { title: "Immunologie", desc: "Sérologies virales et bactériennes, marqueurs inflammatoires.", icon: "shield" },
                    { title: "Hormonologie", desc: "Thyroïde, reproduction (FSH, LH, Prolactine, Œstradiol).", icon: "vital_signs" },
                    { title: "Hémostase", desc: "TP, TCA, INR, D-dimères, fibrinogène.", icon: "water_drop" },
                    { title: "Microbiologie", desc: "ECBU, pus, gorge, prélèvements génitaux, antibiogramme.", icon: "microbiology" },
                    { title: "Parasitologie", desc: "Selles, goutte épaisse, recherche de parasites.", icon: "bug_report" },
                    { title: "Biologie spécialisée", desc: "PCR (COVID, Hépatites, HPV, charges virales).", icon: "strikethrough_s" },
                    { title: "Cytométrie en flux", desc: "Typage lymphocytaire quantitatif CD4/CD8.", icon: "grain" }
                  ].map((dom, i) => (
                    <div key={i} className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-surface-container flex flex-col justify-between">
                      <div>
                        <div className="w-12 h-12 rounded-lg bg-surface-mint flex items-center justify-center text-primary mb-4">
                          <span className="material-symbols-outlined text-[26px]">{dom.icon}</span>
                        </div>
                        <h3 className="font-headline-sm text-lg text-on-surface mb-2 font-semibold">{dom.title}</h3>
                        <p className="font-body-md text-sm text-on-surface-variant">{dom.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* VIEW 3: POLITIQUE QUALITE */}
        {currentPath === 'politique-qualite' && (
          <div className="flex flex-col w-full flex-1">
            <section className="w-full bg-surface-container-low py-6 px-4 sm:px-6 shadow-sm">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <nav aria-label="Fil d'Ariane" className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant">
                  <button onClick={() => handleNavClick('accueil')} className="hover:text-primary transition-colors flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">home</span>
                    <span>Accueil</span>
                  </button>
                  <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
                  <span className="text-primary font-semibold">Politique qualité</span>
                </nav>
                <div className="inline-flex items-center gap-2 bg-surface-container-lowest px-4 py-2 rounded-full shadow-sm border border-surface-container">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
                  <span className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider">Accréditation NM ISO 15189:2023</span>
                  <span className="bg-primary-container text-on-primary font-label-sm text-[10px] px-2 py-0.5 rounded-full font-bold">SEMAC N° 12/2025</span>
                </div>
              </div>
            </section>

            <section className="relative w-full bg-surface py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7 flex flex-col gap-6">
                  <span className="px-4 py-1.5 bg-surface-mint text-primary rounded-full font-label-md text-label-md inline-flex items-center gap-2 shadow-sm w-fit border border-surface-container">
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                    Système de Management de la Qualité (SMQ)
                  </span>
                  <h1 className="font-display-hero text-3xl sm:text-4xl text-on-surface tracking-tight leading-tight">
                    Politique Qualité — <span className="text-primary">Labib Laboratoire</span>
                  </h1>
                  <div className="p-6 bg-surface-container-lowest rounded-2xl shadow-md border border-surface-container flex flex-col gap-4">
                    <p className="font-body-lg text-base sm:text-lg text-on-surface leading-relaxed italic">
                      « Notre laboratoire a adopté une politique qualité rigoureuse qui constitue la base de notre système de management pour satisfaire les exigences de la norme NM ISO 15189 et les attentes de nos patients et partenaires. »
                    </p>
                  </div>
                </div>
                <div className="lg:col-span-5 flex flex-col gap-6">
                  <div className="relative rounded-2xl overflow-hidden shadow-xl bg-surface-container-lowest p-6 border border-surface-container">
                    <h3 className="font-headline-sm text-xl text-primary mb-3 font-semibold">Reconnaissance SEMAC</h3>
                    <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                      Laboratoire accrédité par le Système Marocain d’Accréditation (SEMAC) selon le référentiel international NM ISO 15189:2023 pour les portées de biochimie, hématologie et immunologie médicale.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* VIEW 4: ESPACE PATIENT & MANUEL DE PRELEVEMENT */}
        {currentPath === 'espace-patient' && (
          <div className="flex flex-col w-full flex-1">
            <section className="w-full bg-surface-mint py-4 px-4 sm:px-6">
              <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
                <nav aria-label="Fil d'Ariane" className="flex items-center gap-2">
                  <button onClick={() => handleNavClick('accueil')} className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">home</span>
                    <span>Accueil</span>
                  </button>
                  <span className="material-symbols-outlined text-outline text-[14px]">chevron_right</span>
                  <span className="font-label-md text-label-md text-primary">Espace Patient & Manuel de prélèvement</span>
                </nav>
              </div>
            </section>

            <section className="w-full py-12 px-4 sm:px-6 lg:px-8 bg-surface">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                  <div className="lg:col-span-8 bg-surface-container-lowest p-8 rounded-2xl shadow-sm border border-surface-container flex flex-col justify-between">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-mint text-primary mb-4">
                        <span className="material-symbols-outlined text-[18px]">verified_user</span>
                        <span className="font-label-sm text-label-sm tracking-wide uppercase">Phase Pré-analytique & Recommandations</span>
                      </div>
                      <h1 className="font-headline-lg text-2xl sm:text-3xl text-primary tracking-tight mb-4">
                        Espace Patients — Manuel et consignes de prélèvement
                      </h1>
                      <p className="font-body-lg text-base text-on-surface-variant max-w-2xl leading-relaxed">
                        Toutes les instructions pour bien préparer vos examens médicaux au laboratoire ou à domicile à Marrakech. La rigueur du recueil conditionne l'exactitude des résultats.
                      </p>
                    </div>
                  </div>
                  <div className="lg:col-span-4 bg-primary text-on-primary p-8 rounded-2xl shadow-md flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="material-symbols-outlined text-[28px] text-primary-fixed">badge</span>
                        <h2 className="font-headline-sm text-xl text-on-primary font-semibold">Documents requis</h2>
                      </div>
                      <ul className="flex flex-col gap-4">
                        <li className="flex items-start gap-3 bg-on-primary/10 p-3.5 rounded-xl">
                          <span className="material-symbols-outlined text-primary-fixed text-[20px] mt-0.5">credit_card</span>
                          <div>
                            <span className="font-label-md text-label-md block">Pièce d'Identité (CIN / Passeport)</span>
                          </div>
                        </li>
                        <li className="flex items-start gap-3 bg-on-primary/10 p-3.5 rounded-xl">
                          <span className="material-symbols-outlined text-primary-fixed text-[20px] mt-0.5">health_and_safety</span>
                          <div>
                            <span className="font-label-md text-label-md block">Carte de Mutuelle / Assurance</span>
                          </div>
                        </li>
                        <li className="flex items-start gap-3 bg-on-primary/10 p-3.5 rounded-xl">
                          <span className="material-symbols-outlined text-primary-fixed text-[20px] mt-0.5">description</span>
                          <div>
                            <span className="font-label-md text-label-md block">Ordonnance Médicale Récente</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Protocol Guides Section */}
            <section className="w-full py-12 px-4 sm:px-6 lg:px-8 bg-surface">
              <div className="max-w-7xl mx-auto flex flex-col gap-8">
                <article className="bg-surface-container-lowest rounded-2xl p-8 shadow-sm border border-surface-container">
                  <div className="flex flex-col lg:flex-row gap-8 items-start">
                    <div className="w-full lg:w-1/3 flex flex-col gap-4">
                      <div className="inline-flex items-center gap-2 text-primary font-label-sm text-label-sm uppercase">
                        <span className="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold">01</span>
                        <span>Hématologie & Biochimie</span>
                      </div>
                      <h3 className="font-headline-md text-xl text-primary font-semibold">Prélèvement Sanguin & Modalités de Jeûne</h3>
                      <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                        Pour une majorité des bilans, un repas léger est toléré. Cependant, certaines analyses métaboliques exigent une abstinence calorique rigoureuse.
                      </p>
                    </div>
                    <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-surface-container-low p-5 rounded-xl flex flex-col justify-between border border-surface-container">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-headline-sm text-base text-on-surface font-semibold">Glycémie à jeun</span>
                            <span className="px-2.5 py-1 rounded bg-primary-container text-on-primary font-label-sm text-label-sm">7 Heures</span>
                          </div>
                          <p className="font-body-sm text-sm text-on-surface-variant">Éviter toute prise de boisson sucrée, café ou tabac dès la veille au soir.</p>
                        </div>
                      </div>
                      <div className="bg-surface-container-low p-5 rounded-xl flex flex-col justify-between border border-surface-container">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-headline-sm text-base text-on-surface font-semibold">Bilan Lipidique</span>
                            <span className="px-2.5 py-1 rounded bg-cta-coral text-on-primary font-label-sm text-label-sm">12 Heures</span>
                          </div>
                          <p className="font-body-sm text-sm text-on-surface-variant">Cholestérol, Triglycérides. Dîner léger la veille sans graisses cuites.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </section>

            {/* FAQ Section */}
            <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-surface-container-low">
              <div className="max-w-4xl mx-auto flex flex-col gap-8">
                <div className="text-center flex flex-col items-center">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">Foire Aux Questions</span>
                  <h2 className="font-headline-lg text-2xl sm:text-3xl text-on-surface tracking-tight mt-1">Questions Fréquentes & Conseils</h2>
                </div>
                <div className="flex flex-col gap-4">
                  {[
                    { q: "Puis-je prendre mes médicaments habituels avant la prise de sang ?", a: "En règle générale, prenez vos traitements quotidiens avec une gorgée d'eau, sauf indication contraire de votre médecin ou si l'analyse porte précisément sur le dosage du médicament." },
                    { q: "Fumer une cigarette a-t-il un impact sur les bilans sanguins ?", a: "Oui. La nicotine stimule la libération d'adrénaline et de cortisol, ce qui peut altérer les taux de glucose et de certaines hormones." },
                    { q: "Combien de temps faut-il pour obtenir mes résultats d'analyses ?", a: "La majorité des bilans de routine sont disponibles l'après-midi même dès 16h00 via votre espace sécurisé en ligne." },
                    { q: "Les contenants de recueil sont-ils payants ?", a: "Non. Tous les contenants certifiés stériles sont mis gratuitement à disposition des patients à l'accueil du laboratoire." }
                  ].map((faq, idx) => (
                    <div
                      key={idx}
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm transition-all cursor-pointer border border-surface-container"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="font-headline-sm text-lg text-on-surface font-semibold">{faq.q}</h3>
                        <span className={`material-symbols-outlined text-primary text-[24px] transition-transform ${openFaq === idx ? 'rotate-180' : ''}`}>expand_more</span>
                      </div>
                      {openFaq === idx && (
                        <div className="pt-4 mt-4 border-t border-surface-container">
                          <p className="font-body-md text-base text-on-surface-variant leading-relaxed">{faq.a}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* VIEW 5: ESPACE PRO & CATALOGUE DE COTATION B */}
        {currentPath === 'espace-pro' && (
          <div className="flex flex-col w-full flex-1">
            <div className="w-full bg-surface-container-low py-4 px-4 sm:px-6 shadow-sm">
              <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
                <nav aria-label="Fil d'Ariane" className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant">
                  <button onClick={() => handleNavClick('accueil')} className="hover:text-primary transition-colors flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">home</span>
                    <span>Accueil</span>
                  </button>
                  <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
                  <span className="text-primary font-semibold">Espace professionnel & Catalogue</span>
                </nav>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface-mint text-primary font-label-sm text-label-sm border border-surface-container">
                    <span className="w-2 h-2 rounded-full bg-tertiary-container animate-pulse"></span>
                    Catalogue & Nomenclature Nationale
                  </span>
                </div>
              </div>
            </div>

            <section className="w-full bg-surface-container-lowest py-12 px-4 sm:px-6 lg:px-8 shadow-sm">
              <div className="max-w-4xl mx-auto flex flex-col gap-4 text-center">
                <span className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-surface-mint text-primary font-label-md text-label-md border border-surface-container mx-auto">
                  <span className="material-symbols-outlined text-[18px]">menu_book</span>
                  Catalogue Officiel de Biologie Médicale
                </span>
                <h1 className="font-headline-lg text-2xl sm:text-4xl text-primary tracking-tight">
                  Nomenclature & Cotations des Actes (Valeur B)
                </h1>
                <p className="font-body-lg text-base text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
                  Parcourez facilement le catalogue ci-dessous par catégorie. Chaque section se développe pour vous offrir une lecture claire, verticale et sans défilement horizontal.
                </p>
              </div>
            </section>

            {/* Vertical Stacked Category Cards / Accordions */}
            <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-surface">
              <div className="max-w-4xl mx-auto flex flex-col gap-6">
                {categoryGroups.map((group) => {
                  const isOpen = openCategories[group.key];
                  return (
                    <div key={group.key} className="bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden border border-surface-container transition-all">
                      <button
                        onClick={() => toggleCategory(group.key)}
                        className="w-full p-6 bg-surface-mint flex items-center justify-between text-left hover:bg-surface-container-low transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-primary text-on-primary flex items-center justify-center shadow-sm shrink-0">
                            <span className="material-symbols-outlined text-[24px]">{group.icon}</span>
                          </div>
                          <div>
                            <h3 className="font-headline-sm text-lg sm:text-xl text-primary font-semibold">{group.title}</h3>
                            <p className="font-body-sm text-sm text-on-surface-variant mt-0.5">{group.desc}</p>
                          </div>
                        </div>
                        <span className={`material-symbols-outlined text-primary text-[28px] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                          expand_more
                        </span>
                      </button>

                      {isOpen && (
                        <div className="p-6 flex flex-col gap-3 bg-surface-container-lowest border-t border-surface-container">
                          {group.items.map((act, index) => (
                            <div
                              key={index}
                              className="p-4 rounded-xl bg-surface-container-low hover:bg-surface-mint transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-surface-container/60"
                            >
                              <div className="flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-primary shrink-0"></span>
                                <div>
                                  <h4 className="font-label-md text-base text-on-surface font-semibold">{act.name}</h4>
                                  <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-xs font-medium">
                                    {act.subcat}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center justify-between sm:justify-end gap-2 sm:shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-surface-container">
                                <span className="font-body-sm text-xs text-outline sm:hidden">Cotation B :</span>
                                <span className="font-headline-sm text-lg text-primary font-bold">
                                  {act.b} <span className="font-label-sm text-xs text-outline font-normal">B</span>
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        )}

        {/* VIEW 6: CONTACT & ACCES */}
        {currentPath === 'contact' && (
          <div className="flex flex-col w-full flex-1">
            <section className="w-full bg-surface-container-low py-6 px-4 sm:px-6 shadow-sm">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
                <nav aria-label="Fil d'Ariane" className="flex items-center gap-2 font-label-md text-label-md text-on-surface-variant">
                  <button onClick={() => handleNavClick('accueil')} className="hover:text-primary transition-colors flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">home</span>
                    <span>Accueil</span>
                  </button>
                  <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
                  <span className="text-primary font-semibold">Contact & Localisation</span>
                </nav>
                <div className="inline-flex items-center gap-2 bg-surface-mint px-4 py-2 rounded-full border border-surface-container">
                  <span className="w-2.5 h-2.5 rounded-full bg-cta-coral animate-ping"></span>
                  <span className="font-label-sm text-label-sm text-primary tracking-wide">Permanence Médicale & Urgences : 24h/24 • 7j/7</span>
                </div>
              </div>
            </section>

            <section className="w-full bg-surface-container-lowest py-16 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <div className="max-w-3xl flex flex-col gap-4">
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">Établissement conventionné</span>
                  <h1 className="font-headline-lg text-3xl sm:text-4xl text-on-surface text-balance">
                    Contactez le Labib Laboratoire à Marrakech
                  </h1>
                  <p className="font-body-lg text-base text-on-surface-variant leading-relaxed">
                    Notre équipe est à votre écoute pour toute information, prise de renseignement ou coordination d'analyses médicales.
                  </p>
                </div>
              </div>
            </section>

            <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-surface">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                  <div className="lg:col-span-7 bg-surface-container-lowest rounded-2xl p-8 shadow-sm border border-surface-container flex flex-col gap-6">
                    <div className="flex items-center justify-between pb-2 border-b border-surface-container">
                      <div>
                        <h2 className="font-headline-md text-xl text-primary font-semibold">Formulaire de Contact</h2>
                        <p className="font-body-sm text-sm text-outline mt-1">Tous les champs signalés par un astérisque (*) sont obligatoires.</p>
                      </div>
                    </div>
                    {formSent ? (
                      <div className="bg-surface-mint p-8 rounded-2xl text-center flex flex-col items-center gap-4 border border-surface-container">
                        <span className="material-symbols-outlined text-primary text-[56px]">check_circle</span>
                        <h3 className="font-headline-sm text-2xl text-primary font-bold">Message bien envoyé !</h3>
                        <p className="font-body-md text-base text-on-surface-variant">Merci. Votre message a été transmis avec succès au secrétariat médical.</p>
                        <button onClick={() => setFormSent(false)} className="mt-4 px-8 py-3 rounded-full bg-primary text-on-primary font-label-md text-label-md shadow">
                          Envoyer un autre message
                        </button>
                      </div>
                    ) : (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          setFormSent(true);
                        }}
                        className="flex flex-col gap-6"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="flex flex-col gap-2">
                            <label className="font-label-md text-label-md text-on-surface">Nom & Prénom *</label>
                            <input
                              type="text"
                              required
                              value={formData.fullName}
                              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                              placeholder="ex. Mohammed Benali"
                              className="w-full bg-surface-container-low text-on-surface px-4 py-3 rounded-xl font-body-md text-base focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary-container border border-surface-container"
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <label className="font-label-md text-label-md text-on-surface">Numéro de téléphone *</label>
                            <input
                              type="tel"
                              required
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              placeholder="+212 6..."
                              className="w-full bg-surface-container-low text-on-surface px-4 py-3 rounded-xl font-body-md text-base focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary-container border border-surface-container"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="font-label-md text-label-md text-on-surface">Adresse Email *</label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="contact@exemple.ma"
                            className="w-full bg-surface-container-low text-on-surface px-4 py-3 rounded-xl font-body-md text-base focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary-container border border-surface-container"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="font-label-md text-label-md text-on-surface">Objet de votre demande *</label>
                          <select
                            required
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            className="w-full bg-surface-container-low text-on-surface px-4 py-3 rounded-xl font-body-md text-base focus:outline-none border border-surface-container"
                          >
                            <option value="" disabled>Sélectionner un motif...</option>
                            <option value="info">Information générale</option>
                            <option value="domicile">Prélèvement à domicile</option>
                            <option value="pro">Question professionnelle</option>
                          </select>
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="font-label-md text-label-md text-on-surface">Votre Message *</label>
                          <textarea
                            required
                            rows={4}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            placeholder="Votre message..."
                            className="w-full bg-surface-container-low text-on-surface p-4 rounded-xl font-body-md text-base border border-surface-container"
                          ></textarea>
                        </div>
                        <button type="submit" className="w-full sm:w-auto bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md px-10 py-4 rounded-full transition-all shadow-md">
                          Envoyer mon message
                        </button>
                      </form>
                    )}
                  </div>

                  <div className="lg:col-span-5 flex flex-col gap-6">
                    <div className="bg-surface-container-lowest rounded-2xl p-8 shadow-sm border border-surface-container flex flex-col gap-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-surface-mint text-primary flex items-center justify-center">
                          <span className="material-symbols-outlined text-[26px]">contact_phone</span>
                        </div>
                        <div>
                          <h3 className="font-headline-sm text-xl text-on-surface font-semibold">Coordonnées</h3>
                          <p className="font-body-sm text-sm text-outline">Labib Laboratoire Marrakech</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-6">
                        <div className="flex items-start gap-3">
                          <span className="material-symbols-outlined text-primary text-[20px] mt-1">location_on</span>
                          <p className="font-body-md text-base text-on-surface-variant">Imm Marhaba, Bd Mohammed V, Guéliz • Marrakech 40000</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="material-symbols-outlined text-primary text-[20px] mt-1">call</span>
                          <a href="tel:+212500000000" className="font-body-md text-base text-primary font-semibold hover:underline">+212 500 000 000</a>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="material-symbols-outlined text-cta-coral text-[20px] mt-1">emergency</span>
                          <a href="tel:+212500000000" className="font-body-md text-base text-cta-coral font-bold hover:underline">+212 500 000 000 (Urgences 24h/24)</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full bg-dark-slate text-surface-container-lowest mt-auto">
        <div className="h-1 bg-primary-container w-full"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="flex flex-col gap-3">
              <h4 className="font-headline-sm text-lg text-primary-fixed font-semibold mb-2">Informations pratiques</h4>
              <ul className="flex flex-col gap-2.5 font-body-md text-sm text-surface-variant">
                <li><button onClick={() => handleNavClick('a-propos')} className="hover:text-primary-fixed transition-colors text-left">Présentation</button></li>
                <li><button onClick={() => handleNavClick('espace-patient')} className="hover:text-primary-fixed transition-colors text-left">Espace patient</button></li>
                <li><button onClick={() => handleNavClick('espace-pro')} className="hover:text-primary-fixed transition-colors text-left">Espace professionnel</button></li>
                <li><button onClick={() => handleNavClick('politique-qualite')} className="hover:text-primary-fixed transition-colors text-left">Politique qualité</button></li>
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="font-headline-sm text-lg text-primary-fixed font-semibold mb-2">Rubrique</h4>
              <ul className="flex flex-col gap-2.5 font-body-md text-sm text-surface-variant">
                <li><a href="https://www.resultatslabo.com/" target="_blank" rel="noopener noreferrer" className="hover:text-primary-fixed transition-colors">Vos résultats</a></li>
                <li><button onClick={() => handleNavClick('contact')} className="hover:text-primary-fixed transition-colors text-left">Contact</button></li>
                <li><button onClick={() => handleNavClick('espace-pro')} className="hover:text-primary-fixed transition-colors text-left">Catalogue</button></li>
                <li><button onClick={() => handleNavClick('espace-patient')} className="hover:text-primary-fixed transition-colors text-left">Manuel de prélèvement</button></li>
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="font-headline-sm text-lg text-primary-fixed font-semibold mb-2">Horaire d'ouverture</h4>
              <div className="flex flex-col gap-3 font-body-md text-sm text-surface-variant">
                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-primary-fixed text-[20px] mt-0.5">access_time</span>
                  <p>Laboratoire médical: <strong className="text-surface-container-lowest font-semibold">07h - 19h</strong></p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-cta-coral text-[20px] mt-0.5">emergency</span>
                  <p>Service d'urgences: <strong className="text-surface-container-lowest font-semibold">24h/24, 7j/7</strong></p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('accueil')}>
                <div className="flex flex-col">
                  <span className="font-headline-sm text-lg text-surface-container-lowest leading-none font-semibold">Labib Laboratoire</span>
                  <span className="font-label-sm text-xs text-primary-fixed mt-0.5">Analyses médicales</span>
                </div>
              </div>
              <div className="flex flex-col gap-2.5 font-body-md text-sm text-surface-variant">
                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-primary-fixed text-[18px] mt-0.5">location_on</span>
                  <span>Imm Marhaba Bd Mohammed V - Marrakech</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-primary-fixed text-[18px] mt-0.5">call</span>
                  <span>+212 500 000 000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Copyright notice with requested exact text */}
        <div className="w-full bg-dark-footer py-4 px-4 sm:px-6 border-t border-surface-container/10">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p className="font-body-sm text-xs sm:text-sm text-surface-container-high leading-relaxed">
              © 2026 Labib Laboratoire - Analyses Médicales à Marrakech. Tous droits réservés. This is a test website for Mahdi Labib
            </p>
            <p className="font-label-sm text-xs text-primary-fixed-dim whitespace-nowrap">Accrédité NM ISO 15189</p>
          </div>
        </div>
      </footer>

      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Haut de page"
          className="w-11 h-11 rounded-full bg-surface-container-lowest text-primary shadow-[0_2px_10px_rgba(0,0,0,0.12)] hover:bg-primary hover:text-on-primary flex items-center justify-center transition-colors"
        >
          <span className="material-symbols-outlined text-[22px]">arrow_upward</span>
        </button>
        <a
          href="https://wa.me/212500000000"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contacter par WhatsApp"
          className="w-14 h-14 rounded-full bg-whatsapp-green text-on-primary shadow-[0_4px_16px_rgba(37,211,102,0.4)] hover:scale-105 flex items-center justify-center transition-transform"
        >
          <MessageCircle className="w-7 h-7 text-white fill-current" />
        </a>
      </div>
    </div>
  );
}
