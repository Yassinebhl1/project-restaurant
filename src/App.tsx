import { useRef, useState, type FormEvent } from 'react'

const dishes = [
  { name: 'Fresh sushi', description: 'Delicate, balanced, and made to share.', image: 'sushi.png' },
  { name: 'Golden roast chicken', description: 'Comfort food with a little extra love.', image: 'chicken.png' },
  { name: 'Catch of the day', description: 'Fresh flavours, simply prepared.', image: 'fich.png' },
  { name: 'Hand-folded dumplings', description: 'A little bite of something wonderful.', image: 'dumblings.png' },
  { name: 'House macaroni', description: 'A comforting classic, done our way.', image: 'macaroni.png' },
  { name: "Chef's seasonal plate", description: 'Something special from our kitchen.', image: null },
]

const chefs = [
  {
    role: 'HEAD CHEF',
    title: 'Our kitchen, led with care',
    copy: 'Our head chef brings curiosity to the kitchen and care to every plate, making thoughtful food that feels right at home.',
    image: 'chef 1.png',
    alt: 'A member of the Golden Table kitchen team',
  },
  {
    role: 'THE CRAFT',
    title: 'Fresh ideas, familiar flavours',
    copy: 'From the first prep to the final garnish, our team puts intention into the details that make a meal memorable.',
    image: 'cheef2.png',
    alt: 'A chef preparing a dish',
  },
  {
    role: 'THE WELCOME',
    title: "There's always room",
    copy: 'We love bringing people together over good food and making every visit feel a little more special.',
    image: 'ccchef3.png',
    alt: 'A chef at work in the kitchen',
  },
]

const reservationTimes = ['12:00', '13:00', '14:00', '19:00', '20:00', '21:00']

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow">{children}</p>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [videoOpen, setVideoOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<{ kind: 'success' | 'error'; message: string } | null>(null)
  const videoDialog = useRef<HTMLDialogElement>(null)
  const videoElement = useRef<HTMLVideoElement>(null)
  const minDate = new Date(Date.now() - new Date().getTimezoneOffset() * 60_000).toISOString().slice(0, 10)

  function openVideo() {
    videoDialog.current?.showModal()
    setVideoOpen(true)
  }

  function closeVideo() {
    videoElement.current?.pause()
    videoDialog.current?.close()
    setVideoOpen(false)
  }

  async function submitReservation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFeedback(null)
    setSubmitting(true)
    const form = event.currentTarget

    try {
      const response = await fetch('/api/booking.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      })
      const result: { message?: string } = await response.json()
      if (!response.ok) throw new Error(result.message || 'We could not send your request. Please try again.')
      setFeedback({ kind: 'success', message: result.message || 'Thanks! Your request has been received.' })
      form.reset()
    } catch (error) {
      setFeedback({
        kind: 'error',
        message: error instanceof Error ? error.message : 'Something went wrong. Please try again or call us.',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header flex items-center justify-between">
        <a className="brand inline-flex items-center gap-3" href="#home" aria-label="Golden Table home">
          <span className="brand-mark grid place-items-center" aria-hidden="true">G</span>
          <span>Golden <strong>Table</strong></span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span /><span />
        </button>
        <nav className={`site-nav ${menuOpen ? 'is-open' : ''}`} id="site-nav" aria-label="Main navigation">
          {[
            ['Home', '#home'],
            ['Our story', '#about'],
            ['Menu', '#menu'],
            ['Our chefs', '#chef'],
          ].map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
          <a className="nav-cta" href="#booking" onClick={() => setMenuOpen(false)}>Reserve a table <span aria-hidden="true">↗</span></a>
        </nav>
      </header>

      <main id="main">
        <section className="hero" id="home">
          <div className="hero-inner">
            <div className="hero-copy">
              <Eyebrow><span /> A little taste of something special</Eyebrow>
              <h1>Good food.<br /><em>Golden</em> moments.</h1>
              <p className="hero-intro">Seasonal ingredients, a warm welcome, and plates made to bring people together.</p>
              <div className="hero-actions flex flex-wrap items-center gap-6">
                <a className="button button-dark" href="#booking">Find your table <span aria-hidden="true">↗</span></a>
                <button className="video-trigger" id="watchVideo" type="button" onClick={openVideo}>
                  <span className="play-icon" aria-hidden="true">▶</span> See our kitchen
                </button>
              </div>
              <div className="hero-note"><span className="note-stars" aria-hidden="true">✳</span><span>A warm welcome starts at the table</span></div>
            </div>
            <div className="hero-visual">
              <div className="hero-image-wrap"><img src="/img/everything/plate.png" alt="A beautifully prepared dish from the Golden Table kitchen" loading="eager" decoding="async" /></div>
              <div className="hero-stamp"><span>FRESH</span><span>·</span><span>LOCAL</span><span>·</span><span>ALWAYS</span></div>
              <div className="hero-caption"><span className="caption-line" /><span>Thoughtful food for every occasion</span></div>
            </div>
          </div>
          <dialog
            className="video-dialog"
            ref={videoDialog}
            onClose={() => { videoElement.current?.pause(); setVideoOpen(false) }}
            onCancel={(event) => { event.preventDefault(); closeVideo() }}
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                event.preventDefault()
                closeVideo()
              }
            }}
            onClick={(event) => { if (event.target === videoDialog.current) closeVideo() }}
            aria-label="A look inside our kitchen"
          >
            <button className="video-close" type="button" aria-label="Close video" onClick={closeVideo}>×</button>
            <video ref={videoElement} controls preload="none" playsInline>
              <source src="/video/Food Promo Video - Manual Mode Productions.mp4" type="video/mp4" />
              Your browser does not support the video.
            </video>
          </dialog>
          <span className="sr-only" aria-live="polite">{videoOpen ? 'Kitchen video opened' : ''}</span>
        </section>

        <section className="about section-shell" id="about">
          <div className="section-heading">
            <Eyebrow>THE GOLDEN TABLE STORY</Eyebrow>
            <h2>A good meal is<br /><em>never just a meal.</em></h2>
          </div>
          <div className="about-grid">
            <div className="about-photos">
              <img className="about-main-image" src="/img/everything/about.jpg" alt="The inviting dining room at Golden Table" loading="lazy" />
              <img className="about-detail-image" src="/img/everything/about-2.jpg" alt="A detail from our restaurant" loading="lazy" />
              <span className="photo-note">Gather round.<br />Stay a little longer.</span>
            </div>
            <div className="about-copy">
              <p className="about-lead">At Golden Table, we believe the best memories are made around the table.</p>
              <p>Our kitchen brings together comforting favourites and fresh, vibrant flavours. Every plate is prepared with care, and every guest is welcomed like family.</p>
              <ul className="values-list">
                <li><span aria-hidden="true">✳</span><div><strong>Fresh by nature</strong><p>Seasonal ingredients, thoughtfully chosen.</p></div></li>
                <li><span aria-hidden="true">✳</span><div><strong>Made with intention</strong><p>Honest cooking, full of flavour.</p></div></li>
                <li><span aria-hidden="true">✳</span><div><strong>Room for everyone</strong><p>A relaxed table for life's best moments.</p></div></li>
              </ul>
              <a className="text-link" href="#booking">Come on in <span aria-hidden="true">→</span></a>
              <div className="contact-note"><span aria-hidden="true">☎</span><div><small>Rather talk to us?</small><a href="tel:+2126009765998">+212 600 976 5998</a></div></div>
            </div>
          </div>
        </section>

        <section className="menu-section section-shell" id="menu">
          <div className="section-heading menu-heading">
            <Eyebrow>A FEW HOUSE FAVOURITES</Eyebrow>
            <h2>Made to be <em>savoured.</em></h2>
            <p>Good things, made fresh. Come discover your new favourite.</p>
          </div>
          <div className="menu-grid">
            {dishes.map((dish, index) => (
              <article className="dish-card" key={dish.name}>
                <div className="dish-image">
                  <img src={dish.image ? `/img/plates-img/${dish.image}` : '/img/everything/plate.png'} alt={dish.name} loading="lazy" />
                  <span className="dish-number">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <div className="dish-details">
                  <div><h3>{dish.name}</h3><p>{dish.description}</p></div>
                  <span className="dish-price">ASK US</span>
                </div>
              </article>
            ))}
          </div>
          <p className="menu-footnote">Our menu changes with the seasons. Please ask our team about today's dishes and allergens.</p>
        </section>

        <section className="chef-section section-shell" id="chef">
          <div className="section-heading chef-heading">
            <Eyebrow>THE PEOPLE BEHIND THE PLATES</Eyebrow>
            <h2>Good food takes <em>a good team.</em></h2>
            <p>A little talent, a lot of heart, and always room to make something better.</p>
          </div>
          <div className="chef-grid">
            {chefs.map((chef) => (
              <article className="chef-card" key={chef.role}>
                <img src={`/img/everything/${encodeURIComponent(chef.image)}`} alt={chef.alt} loading="lazy" />
                <div><span className="chef-role">{chef.role}</span><h3>{chef.title}</h3><p>{chef.copy}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section className="booking-section" id="booking">
          <div className="booking-container">
            <div className="booking-aside">
              <Eyebrow>YOUR SEAT IS WAITING</Eyebrow>
              <h2>Save a place<br />for <em>something good.</em></h2>
              <p>Planning a catch-up, a celebration, or just a really good dinner? Tell us when you'd like to come.</p>
              <div className="booking-contact"><span aria-hidden="true">☎</span><div><small>Prefer a quick call?</small><a href="tel:+2126009765998">+212 600 976 5998</a></div></div>
              <img src="/img/everything/table.jpeg" alt="A welcoming table set for dinner" loading="lazy" />
            </div>
            <div className="form-container">
              <h3>Request a reservation</h3>
              <p className="form-intro">Fill in the details and our team will be in touch.</p>
              {feedback && <p className={`form-message ${feedback.kind === 'success' ? 'is-success' : 'is-error'}`} role="status">{feedback.message}</p>}
              <form className="booking-form" onSubmit={submitReservation}>
                <div className="form-grid">
                  <div className="field"><label htmlFor="name">Your name</label><input id="name" name="name" type="text" placeholder="e.g. Samira Benali" autoComplete="name" maxLength={100} required /></div>
                  <div className="field"><label htmlFor="email">Email address</label><input id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" maxLength={254} required /></div>
                  <div className="field"><label htmlFor="phone">Phone number</label><input id="phone" name="phone" type="tel" placeholder="+212 ..." autoComplete="tel" maxLength={30} required /></div>
                  <div className="field"><label htmlFor="people">Number of guests</label><select id="people" name="people" defaultValue="" required><option value="" disabled>Select guests</option>{Array.from({ length: 20 }, (_, index) => <option value={index + 1} key={index}>{index + 1} {index === 0 ? 'guest' : 'guests'}</option>)}</select></div>
                  <div className="field"><label htmlFor="date">Date</label><input id="date" name="date" type="date" min={minDate} required /></div>
                  <div className="field"><label htmlFor="hour">Preferred time</label><select id="hour" name="hour" defaultValue="" required><option value="" disabled>Select a time</option>{reservationTimes.map((time) => <option value={time} key={time}>{time}</option>)}</select></div>
                  <div className="field field-full"><label htmlFor="message">Anything we should know? <span>(optional)</span></label><textarea id="message" name="messages" rows={3} placeholder="Special occasion, dietary needs, or a note for our team" maxLength={1000} /></div>
                </div>
                <button className="submit-btn" type="submit" disabled={submitting}>{submitting ? 'Sending request…' : 'Send reservation request'} <span aria-hidden="true">→</span></button>
                <p className="privacy-note">We'll only use your details to follow up about your reservation.</p>
              </form>
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <a className="brand footer-brand" href="#home"><span className="brand-mark grid place-items-center" aria-hidden="true">G</span><span>Golden <strong>Table</strong></span></a>
        <p>Good food. Golden moments. <span>© {new Date().getFullYear()} Golden Table</span></p>
        <a href="tel:+2126009765998">Morocco <span aria-hidden="true">↗</span></a>
      </footer>
    </>
  )
}

export default App
