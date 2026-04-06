import { useState } from 'react'
import { MdEmail, MdPhone, MdLocationPin } from 'react-icons/md'
import { FaLinkedin, FaGithub, FaSpinner, FaCheckCircle } from 'react-icons/fa'
import { sendEmail } from '../services/emailService'
import './Contact.css'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState(null) // 'sending' | 'sent' | 'error'

  const validate = (name, value) => {
    let error = ''
    if (!value.trim()) {
      error = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`
    } else if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
      error = 'Invalid email address'
    }
    return error
  }

  const handleChange = e => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validate(name, value) }))
    }
  }

  const handleBlur = e => {
    const { name, value } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    setErrors(prev => ({ ...prev, [name]: validate(name, value) }))
  }

  const isFormValid =
    form.name.trim() &&
    form.email.trim() &&
    /\S+@\S+\.\S+/.test(form.email) &&
    form.subject.trim() &&
    form.message.trim() &&
    Object.values(errors).every(err => !err)

  const handleClear = () => {
    setForm({ name: '', email: '', subject: '', message: '' })
    setErrors({})
    setTouched({})
    setStatus(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isFormValid) return

    setStatus('sending')

    try {
      await sendEmail(form)
      setStatus('sent')
      setForm({ name: '', email: '', subject: '', message: '' })
      setTouched({})
      setErrors({})
      setTimeout(() => setStatus(null), 5000)
    } catch (error) {
      console.error('Email Dispatch Error:', error)
      setStatus('error')
      setTimeout(() => setStatus(null), 5000)
    }
  }

  const contactInfo = [
    {
      icon: <MdEmail size={20} />,
      label: 'Email',
      val: import.meta.env.VITE_CONTACT_EMAIL || 'Email Unavailable',
      href: `mailto:${import.meta.env.VITE_CONTACT_EMAIL}`
    },
    {
      icon: <MdPhone size={20} />,
      label: 'Phone',
      val: import.meta.env.VITE_CONTACT_PHONE || 'Phone Unavailable',
      href: `tel:${import.meta.env.VITE_CONTACT_PHONE}`
    },
    { icon: <FaLinkedin size={20} />, label: 'LinkedIn', val: 'linkedin.com/in/g-vinay-sriram', href: 'https://linkedin.com/in/g-vinay-sriram' },
    { icon: <FaGithub size={20} />, label: 'GitHub', val: 'github.com/Vinay-1025', href: 'https://github.com/Vinay-1025' },
    { icon: <MdLocationPin size={20} />, label: 'Location', val: 'Andhra Pradesh, India', href: null },
  ]

  return (
    <section id="contact" className="section contact">
      <div className="contact__glow" />
      <div className="container">
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>08. Contact</div>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Let's Work Together</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto 3.5rem' }}>
            Have a project in mind or want to explore how we can collaborate? I me open to great opportunities.
          </p>
        </div>

        <div className="contact__inner">
          {/* Left: info */}
          <div className="contact__left reveal-left">
            <div className="contact__info-cards">
              {contactInfo.map(info => (
                <div key={info.label} className="contact__info-card glass-card">
                  <span className="info-icon">{info.icon}</span>
                  <div>
                    <div className="info-label">{info.label}</div>
                    {info.href
                      ? <a href={info.href} target="_blank" rel="noopener noreferrer" className="info-val info-val--link">{info.val}</a>
                      : <div className="info-val">{info.val}</div>
                    }
                  </div>
                </div>
              ))}
            </div>

            <div className="availability-badge glass-card">
              <div className="avail-dot" />
              <div>
                <div className="avail-title">Available for Work</div>
                <div className="avail-sub">Open to full-time &amp; freelance roles</div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="contact__right reveal-right">
            <form className="contact-form glass-card" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input
                    type="text" name="name" value={form.name}
                    onChange={handleChange} onBlur={handleBlur}
                    className={`form-input ${touched.name && errors.name ? 'form-input--error' : ''}`}
                    placeholder="John Doe"
                    required
                  />
                  {touched.name && errors.name && <span className="error-message">{errors.name}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email" name="email" value={form.email}
                    onChange={handleChange} onBlur={handleBlur}
                    className={`form-input ${touched.email && errors.email ? 'form-input--error' : ''}`}
                    placeholder="john@example.com"
                    required
                  />
                  {touched.email && errors.email && <span className="error-message">{errors.email}</span>}
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Subject</label>
                <input
                  type="text" name="subject" value={form.subject}
                  onChange={handleChange} onBlur={handleBlur}
                  className={`form-input ${touched.subject && errors.subject ? 'form-input--error' : ''}`}
                  placeholder="Project Collaboration"
                  required
                />
                {touched.subject && errors.subject && <span className="error-message">{errors.subject}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea
                  name="message" value={form.message}
                  onChange={handleChange} onBlur={handleBlur}
                  rows={5}
                  className={`form-input form-textarea ${touched.message && errors.message ? 'form-input--error' : ''}`}
                  placeholder="Tell me about your project..."
                  required
                />
                {touched.message && errors.message && <span className="error-message">{errors.message}</span>}
              </div>
              <div className="form-actions" style={{ display: 'grid', gridTemplateColumns: '0.5fr 1fr', gap: '1rem' }}>
                <button
                  type="button"
                  onClick={handleClear}
                  className="btn-clear"
                >
                  Clear All
                </button>
                <button
                  type="submit"
                  className={`btn-primary form-submit ${!isFormValid || status === 'sending' ? 'btn-disabled' : ''}`}
                  disabled={!isFormValid || status === 'sending'}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {status === 'sending'
                      ? <><FaSpinner className="spin-icon" /> Sending...</>
                      : status === 'sent'
                        ? <><FaCheckCircle style={{ color: '#22c55e' }} /> Sent!</>
                        : status === 'error'
                          ? <><FaCheckCircle style={{ color: '#ef4444' }} /> Failed!</>
                          : 'Send Message'
                    }
                  </span>
                </button>
              </div>

              {status === 'sent' && (
                <div className="form-success">
                  <FaCheckCircle style={{ color: '#22c55e' }} /> Message sent! I'll get back to you soon.
                </div>
              )}
              {status === 'error' && (
                <div className="form-error" style={{ color: '#ef4444', marginTop: '1rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FaCheckCircle /> Oops! Something went wrong. Please check your keys or try again.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>

  )
}
