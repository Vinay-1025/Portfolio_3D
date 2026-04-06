import { FaCamera, FaBook, FaBriefcase, FaUser } from 'react-icons/fa'
import { MdMeetingRoom } from 'react-icons/md'

// Dental Lab Assets
import p1i1 from '../assets/Projects/Dental_lab/P1I1-Dpb6E5To.png'
import p1i2 from '../assets/Projects/Dental_lab/P1I2-BoFvcPB0.png'
import p1i3 from '../assets/Projects/Dental_lab/P1I3-BmK1l98B.png'
import p1i4 from '../assets/Projects/Dental_lab/P1I4-BDSRbDVc.png'
import p1i5 from '../assets/Projects/Dental_lab/P1I5-D4NWATnY.png'
import p1i6 from '../assets/Projects/Dental_lab/P1I6-qX1T02lZ.png'
import p1i7 from '../assets/Projects/Dental_lab/P1I7-BJvpVFx2.png'
import p1i8 from '../assets/Projects/Dental_lab/P1I8-BK_NccD8.png'
import p1i9 from '../assets/Projects/Dental_lab/P1I9-DzaHILrZ.png'
import p1i10 from '../assets/Projects/Dental_lab/P1I10-C-9fvdNf.png'
import p1i11 from '../assets/Projects/Dental_lab/P1I11-CRi-19f5.png'
import p1i12 from '../assets/Projects/Dental_lab/P1I12-zT9ClLe-.png'
import p1i13 from '../assets/Projects/Dental_lab/P1I13-BXoA-7Xh.png'
import p1i14 from '../assets/Projects/Dental_lab/P1I14-C7JgKXoN.png'
import p1i15 from '../assets/Projects/Dental_lab/P1I15-rwhfdZAK.png'
import p1i16 from '../assets/Projects/Dental_lab/P1I16-jhkqUGiE.png'
import p1i17 from '../assets/Projects/Dental_lab/P1I17-BgzesYbT.png'
import p1i18 from '../assets/Projects/Dental_lab/P1I18-CGg6jmTa.png'
import p1i19 from '../assets/Projects/Dental_lab/P1I19-Cc-t-KVs.png'
import p1i20 from '../assets/Projects/Dental_lab/P1I20-CAOzBEgJ.png'

// ShootMate Assets
import p2i1 from '../assets/Projects/ShootMate/P2I1-Dz9p1eAW.png'
import p2i2 from '../assets/Projects/ShootMate/P2I2-LvCYdSDs.png'
import p2i3 from '../assets/Projects/ShootMate/P2I3-CRVd9qWu.png'
import p2i4 from '../assets/Projects/ShootMate/P2I4-BuirUBci.png'
import p2i5 from '../assets/Projects/ShootMate/P2I5-Cr5UweQO.png'
import p2i6 from '../assets/Projects/ShootMate/P2I6-DONUObaF.png'
import p2i7 from '../assets/Projects/ShootMate/P2I7-CjkF1pMq.png'
import p2i8 from '../assets/Projects/ShootMate/P2I8-B--Gql8u.png'
import p2i9 from '../assets/Projects/ShootMate/P2I9-wxCZOJCW.png'
import p2i10 from '../assets/Projects/ShootMate/P2I10-Dl15RAZZ.png'
import p2i11 from '../assets/Projects/ShootMate/P2I11-Cwkx6mwJ.png'
import p2i12 from '../assets/Projects/ShootMate/P2I12-BdQSceKH.png'

// OLS Assets
import p3i1 from '../assets/Projects/ools/P3I1-DBs2M5fR.png'
import p3i2 from '../assets/Projects/ools/P3I2-DFwRVspf.png'
import p3i3 from '../assets/Projects/ools/P3I3-Cu9_V1Il.png'
import p3i4 from '../assets/Projects/ools/P3I4-AF1TO751.png'
import p3i5 from '../assets/Projects/ools/P3I5-D6MUtL6w.png'
import p3i6 from '../assets/Projects/ools/P3I6-6I2A1aK8.png'
import p3i7 from '../assets/Projects/ools/P3I7-CxqTHoCU.png'
import p3i8 from '../assets/Projects/ools/P3I8-D3OVeDCK.png'
import p3i9 from '../assets/Projects/ools/P3I9-82gRL7p2.png'

// EduAssist Assets
import p4i1 from '../assets/Projects/Eduassist/P4I1-B5ZpZBp4.png'
import p4i2 from '../assets/Projects/Eduassist/P4I2-Hvilw7e-.png'
import p4i3 from '../assets/Projects/Eduassist/P4I3-13dtAtdO.png'
import p4i4 from '../assets/Projects/Eduassist/P4I4-DuZfseVN.png'
import p4i5 from '../assets/Projects/Eduassist/P4I5-B-44taWB.png'

const dummyImages = [
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=800&q=80'
];

export const projectsData = [
  {
    id: 1,
    title: 'Dental Lab Management',
    tag: 'Healthcare Ops',
    tagColor: '#a220f8ff',
    desc: 'A Dental Lab Management application built for Bioline Dental Implants that streamlines workflows like case management, billing, payments, and reports. It features dynamic forms, real-time updates, automated email notifications, and secure access using JWT authentication with role-based permissions.',
    fullDescription: 'A comprehensive web application designed to completely digitize dental lab operations. It streamlines workflows for order tracking, patient records management, technician assignments, and delivery scheduling in a secure environment.',
    tech: ['HTML', 'CSS', 'JS', 'Bootstrap', 'NodeJs', 'ExpressJS', 'Sequelize', 'Mysql'],
    client: 'Bioline Dental Lab',
    contributors: ['Mohan Patro', 'Venkatesh Ganisetti', 'Kimidi Prasanthi'],
    contributors_portfolios: ['https://portfolio-m-phi.vercel.app/', 'https://venkateshganisettiportfolio.netlify.app/'],
    highlights: ['Secure JWT authentication', 'Interactive management dashboards', 'End-to-end order management', 'Real-time workflow tracking'],
    category: 'Freelancing Project',
    // isRealTime: true,
    featured: true,
    github: '',
    live: '#',
    icon: <MdMeetingRoom />,
    accent: '#20b7f8ff',
    image: p1i3,
    gallery: [
      { url: p1i1, title: 'Login Page' },
      { url: p1i2, title: 'Successful Login' },
      { url: p1i3, title: 'Dashboard Carousel' },
      { url: p1i4, title: 'All Case Details' },
      { url: p1i5, title: 'Clients Portal' },
      { url: p1i6, title: 'Add Clients Form' },
      { url: p1i7, title: 'Accounting Module' },
      { url: p1i8, title: 'Payment Form' },
      { url: p1i9, title: 'Outstanding Report' },
      { url: p1i10, title: 'Sales Report' },
      { url: p1i11, title: 'Case Type Report' },
      { url: p1i12, title: 'Products Module' },
      { url: p1i13, title: 'Price List Overview' },
      { url: p1i14, title: 'Team Module' },
      { url: p1i15, title: 'Add Team Form' },
      { url: p1i16, title: 'Tax Section' },
      { url: p1i17, title: 'Case Entry Form' },
      { url: p1i18, title: 'Case Details Overview' },
      { url: p1i19, title: 'Case Details Form' },
      { url: p1i20, title: 'Client Profile' },
    ],
    architecture: 'Relational MySQL foundational architecture maintaining rigid referential integrity across complex supply chains, served by an isolated Node.js API.',
    solution: 'Replaced disparate tracking methods with a centralized, real-time relational hub. Implemented secured end-to-end WebSocket connections for live order updates across laboratory floors.',
    painPoints: 'Miscommunications between the clinic impression and the lab technician floor often resulted in costly remakes and severe patient delays.',
    research: 'Shadowed lab technicians over multiple weeks to understand the physical traversal of dental impressions and digitally mapped this pipeline seamlessly to the user interface schema.',
  },
  {
    id: 2,
    title: 'ShootMate',
    tag: 'Portfolio/Booking',
    tagColor: '#00f5ff',
    desc: "A comprehensive platform for professional photographers to showcase their high-resolution portfolios, manage client bookings, and track specialized equipment. Built with a focus on minimalist aesthetics and seamless user flow.",
    fullDescription: "ShootMate is a full-featured booking and portfolio application tailored specifically for professional photographers. It allows creators to display high-resolution galleries, set customized booking packages, and manage their calendar in real-time. The platform focuses heavily on minimalist, image-centric aesthetics, ensuring the photographer's work takes front and center. It implements complex user authentication flows, dynamic scheduling, and an intuitive dashboard for client management.",
    tech: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'React.js'],
    highlights: [
      "Custom-built interactive gallery with deep zoom capabilities.",
      "Real-time booking and calendar syncing using WebSockets.",
      "Responsive, mobile-first design leveraging robust CSS Grid architectures.",
      "Secure backend API constructed with Node.js and Express."
    ],
    category: 'Personal Project',
    featured: true,
    github: 'https://github.com/Vinay-1025',
    live: 'https://shootmate-photographer-partner.web.app/',
    icon: <FaCamera />,
    accent: '#00f5ff',
    image: p2i1,
    gallery: [
      { url: p2i1, title: 'Introduction Page' },
      { url: p2i2, title: 'Specifications' },
      { url: p2i3, title: 'Benefits of ShootMate' },
      { url: p2i4, title: 'Why to Choose' },
      { url: p2i5, title: 'Plans Section' },
      { url: p2i6, title: 'Footer Section' },
      { url: p2i7, title: 'Bookings Page' },
      { url: p2i8, title: 'Booked List' },
      { url: p2i9, title: 'Login Page' },
      { url: p2i10, title: 'Photographers Page' },
      { url: p2i11, title: 'Booking List & Graph' },
      { url: p2i12, title: 'Bio Data Entering Section' },
    ],
  },
  {
    id: 3,
    title: 'Online Outing & Leaving',
    tag: 'System Automation',
    tagColor: '#ffb347',
    desc: 'An Online Outing & Leaving System that simplifies how students apply for leave and outings. Students can submit requests and track their status, while administrators can review and approve them efficiently.',
    fullDescription: 'This comprehensive leave management system was created to automate and streamline the traditional paper-based process within large educational or corporate institutions. It significantly reduces processing time by utilizing dynamic multi-stage approval workflows, hierarchical role-based dashboards, and automated email/SMS alerts whenever a request status changes. Built with a heavily customized Material-UI theme to match institutional branding.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'React.js', 'Material Ui'],
    highlights: [
      "Dynamic multi-level approval matrix based on administrative hierarchies.",
      "Real-time WebSocket notifications upon leave request updates.",
      "Extensive reporting engine with data export in CSV and PDF formats.",
      "Role-based access control ensuring high data privacy."
    ],
    category: 'Corporate Project',
    featured: true,
    github: 'https://github.com/Vinay-1025',
    live: 'https://ools-34d73.web.app/',
    icon: <MdMeetingRoom />,
    accent: '#ffb347',
    image: p3i1,
    gallery: [
      { url: p3i1, title: 'Landing Page' },
      { url: p3i2, title: 'Dashboard Section' },
      { url: p3i3, title: 'Application Section' },
      { url: p3i4, title: 'Work Place Section' },
      { url: p3i5, title: 'Stack Section' },
      { url: p3i6, title: 'Administration Section' },
      { url: p3i7, title: 'Caretakers Section' },
      { url: p3i8, title: 'Queries Section' },
      { url: p3i9, title: 'Security Section' },
    ],
    architecture: 'Microservices driven architecture utilizing Express nodes and Redux state clusters to handle a high-volume concurrency of approval requests within a secured network perimeter.',
    solution: 'Digitized the multi-node signature pipeline from paper to automated cloud verification, mapping institutional roles to a rigid access-control matrix connected directly via Active Directory integrations.',
    painPoints: 'Mishandling of physical documents and delayed approval cascades caused massive institutional bottlenecks. Traditional systems lacked parallel approval pathways and audit logging capabilities.',
    research: 'Initial research involved shadowing administrative operations to document the strict compliance requirements, resulting in a system design highly customized to mirror their exact hierarchical chain of command.',
  },
  {
    id: 4,
    title: 'EduAssist',
    tag: 'E-Learning',
    tagColor: '#68dc68',
    desc: 'An interactive e-learning companion that bridges the gap between students and experts. Implements a real-time doubt clearing interface with high-quality UI animations to enhance the learning experience.',
    fullDescription: 'EduAssist elevates remote learning by offering a frictionless, highly interactive platform connecting students with subject matter experts on demand. The app prioritizes ease of use, featuring incredibly smooth page transitions and micro-interactions powered by Framer Motion. Under the hood, it uses Firebase to instantly sync chat and collaborative whiteboard sessions across different client devices, ensuring a delay-free educational experience.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'React.js', 'Framer Motion', 'Firebase'],
    highlights: [
      "Real-time synchronized collaborative whiteboarding.",
      "Interactive 3D structural previews powered by Three.js.",
      "Seamless authentication and real-time database syncing with Firebase.",
      "Elegant micro-interactions improving student retention rates."
    ],
    category: 'Personal Project',
    featured: true,
    github: 'https://github.com/Vinay-1025',
    live: 'https://eduassist-learning-partner.web.app/',
    icon: <FaBook />,
    accent: '#68dc68',
    image: p4i1,
    gallery: [
      { url: p4i1, title: 'Hero Section' },
      { url: p4i2, title: 'What Can We Do' },
      { url: p4i3, title: 'How Do We Support' },
      { url: p4i4, title: 'Data Overview' },
      { url: p4i5, title: 'Testimonials' },
    ],
  }
]
