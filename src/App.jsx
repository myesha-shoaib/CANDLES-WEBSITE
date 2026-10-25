import { useEffect, useMemo, useState } from 'react'
import './App.css'

const themeModes = {
  ember: { label: 'Ember', note: 'Warm ritual', color: '#d66a45' },
  ocean: { label: 'Ocean', note: 'Cool clarity', color: '#4b86c7' },
  moss: { label: 'Moss', note: 'Grounded calm', color: '#5c8a69' },
  sun: { label: 'Sun', note: 'Golden energy', color: '#d49a3a' },
}

const products = [
  { id: 1, name: 'Solstice Saffron', scent: 'Saffron · Cedar · Amber', category: 'Warm', mood: 'Fire', price: 34, size: '8 oz', rating: '4.9', image: '/products/candle-01.svg', tag: 'Bestseller', color: 'amber' },
  { id: 2, name: 'Moonwater', scent: 'Sea Salt · Iris · Driftwood', category: 'Fresh', mood: 'Water', price: 32, size: '8 oz', rating: '4.8', image: '/products/candle-02.svg', tag: 'New', color: 'blue' },
  { id: 3, name: 'Moss & Stone', scent: 'Vetiver · Oakmoss · Rain', category: 'Earthy', mood: 'Earth', price: 36, size: '10 oz', rating: '4.9', image: '/products/candle-03.svg', tag: 'Slow burn', color: 'green' },
  { id: 4, name: 'Lemon Peel', scent: 'Lemon Zest · Basil · Linen', category: 'Citrus', mood: 'Sun', price: 28, size: '7 oz', rating: '4.7', image: '/products/candle-04.svg', tag: 'Bright', color: 'yellow' },
  { id: 5, name: 'Rosewood Veil', scent: 'Rose · Sandalwood · Smoke', category: 'Floral', mood: 'Fire', price: 38, size: '10 oz', rating: '4.8', image: '/products/candle-05.svg', tag: 'Limited', color: 'rose' },
  { id: 6, name: 'Violet Hour', scent: 'Violet Leaf · Plum · Incense', category: 'Floral', mood: 'Night', price: 35, size: '8 oz', rating: '4.9', image: '/products/candle-06.svg', tag: 'Evening', color: 'violet' },
  { id: 7, name: 'Apricot Haze', scent: 'Apricot · Tonka · Cashmere', category: 'Sweet', mood: 'Sun', price: 31, size: '8 oz', rating: '4.6', image: '/products/candle-07.svg', tag: 'Soft', color: 'orange' },
  { id: 8, name: 'Sea Salt Studio', scent: 'Mineral Salt · Eucalyptus · Air', category: 'Fresh', mood: 'Water', price: 30, size: '7 oz', rating: '4.8', image: '/products/candle-08.svg', tag: 'Clean', color: 'teal' },
  { id: 9, name: 'Cedar Library', scent: 'Atlas Cedar · Paper · Leather', category: 'Woody', mood: 'Earth', price: 39, size: '10 oz', rating: '4.9', image: '/products/candle-09.svg', tag: 'Rich', color: 'amber' },
  { id: 10, name: 'Golden Hour', scent: 'Honey · Bergamot · Fig', category: 'Warm', mood: 'Sun', price: 33, size: '8 oz', rating: '4.7', image: '/products/candle-10.svg', tag: 'Daylight', color: 'yellow' },
  { id: 11, name: 'Rain Check', scent: 'Petrichor · Cypress · Fern', category: 'Earthy', mood: 'Water', price: 34, size: '8 oz', rating: '4.8', image: '/products/candle-11.svg', tag: 'After rain', color: 'green' },
  { id: 12, name: 'Neroli Club', scent: 'Neroli · Orange Blossom · Moss', category: 'Citrus', mood: 'Sun', price: 37, size: '10 oz', rating: '4.9', image: '/products/candle-12.svg', tag: 'Botanical', color: 'orange' },
  { id: 13, name: 'Black Fig', scent: 'Black Fig · Cassis · Birch', category: 'Woody', mood: 'Night', price: 40, size: '10 oz', rating: '4.8', image: '/products/candle-13.svg', tag: 'Deep', color: 'violet' },
  { id: 14, name: 'Wild Thyme', scent: 'Thyme · Lemon · Green Tea', category: 'Fresh', mood: 'Earth', price: 29, size: '7 oz', rating: '4.7', image: '/products/candle-14.svg', tag: 'Herbal', color: 'green' },
  { id: 15, name: 'Cocoa Smoke', scent: 'Cacao · Clove · Birch Tar', category: 'Warm', mood: 'Fire', price: 36, size: '8 oz', rating: '4.9', image: '/products/candle-15.svg', tag: 'Cozy', color: 'brown' },
  { id: 16, name: 'Quiet Fig', scent: 'Fig Leaf · Oat · Sandalwood', category: 'Sweet', mood: 'Earth', price: 32, size: '8 oz', rating: '4.8', image: '/products/candle-16.svg', tag: 'Quiet', color: 'rose' },
  { id: 17, name: 'Citrus Static', scent: 'Grapefruit · Ginger · Mint', category: 'Citrus', mood: 'Sun', price: 30, size: '7 oz', rating: '4.6', image: '/products/candle-17.svg', tag: 'Electric', color: 'yellow' },
  { id: 18, name: 'Dusk Linen', scent: 'Linen · Lavender · Smoke', category: 'Floral', mood: 'Night', price: 35, size: '8 oz', rating: '4.8', image: '/products/candle-18.svg', tag: 'New', color: 'blue' },
  { id: 19, name: 'Palo Santo', scent: 'Palo Santo · Resin · Cedar', category: 'Woody', mood: 'Fire', price: 41, size: '10 oz', rating: '4.9', image: '/products/candle-19.svg', tag: 'Ritual', color: 'amber' },
  { id: 20, name: 'Meadow Glass', scent: 'Meadow Grass · Chamomile · Dew', category: 'Fresh', mood: 'Earth', price: 33, size: '8 oz', rating: '4.8', image: '/products/candle-20.svg', tag: 'Garden', color: 'green' },
  { id: 21, name: 'Pear & Pepper', scent: 'Pear · Pink Pepper · Musk', category: 'Sweet', mood: 'Sun', price: 31, size: '8 oz', rating: '4.7', image: '/products/candle-21.svg', tag: 'Unexpected', color: 'yellow' },
  { id: 22, name: 'Blue Hour', scent: 'Blue Cypress · Juniper · Tea', category: 'Fresh', mood: 'Water', price: 34, size: '8 oz', rating: '4.9', image: '/products/candle-22.svg', tag: 'Nightfall', color: 'blue' },
  { id: 23, name: 'Canyon Clay', scent: 'Clay · Amber · Dry Grass', category: 'Earthy', mood: 'Earth', price: 37, size: '10 oz', rating: '4.8', image: '/products/candle-23.svg', tag: 'Textural', color: 'orange' },
  { id: 24, name: 'Nectarine Sun', scent: 'Nectarine · Jasmine · Cream', category: 'Floral', mood: 'Sun', price: 33, size: '8 oz', rating: '4.6', image: '/products/candle-24.svg', tag: 'Juicy', color: 'orange' },
  { id: 25, name: 'Afterglow', scent: 'Burnt Sugar · Oak · Vanilla', category: 'Warm', mood: 'Fire', price: 39, size: '10 oz', rating: '4.9', image: '/products/candle-25.svg', tag: 'Late night', color: 'rose' },
  { id: 26, name: 'Still Life', scent: 'Linen · Fig · White Musk', category: 'Sweet', mood: 'Night', price: 32, size: '8 oz', rating: '4.7', image: '/products/candle-26.svg', tag: 'Minimal', color: 'violet' },
  { id: 27, name: 'Bergamot Bay', scent: 'Bergamot · Sage · Sea Spray', category: 'Citrus', mood: 'Water', price: 35, size: '8 oz', rating: '4.8', image: '/products/candle-27.svg', tag: 'Coastal', color: 'teal' },
  { id: 28, name: 'Forest Floor', scent: 'Pine · Moss · Black Tea', category: 'Woody', mood: 'Earth', price: 38, size: '10 oz', rating: '4.9', image: '/products/candle-28.svg', tag: 'Grounding', color: 'green' },
  { id: 29, name: 'Milk & Honey', scent: 'Milk · Honeycomb · Vanilla', category: 'Sweet', mood: 'Sun', price: 29, size: '7 oz', rating: '4.7', image: '/products/candle-29.svg', tag: 'Gentle', color: 'yellow' },
  { id: 30, name: 'Velvet Resin', scent: 'Resin · Rose · Patchouli', category: 'Warm', mood: 'Fire', price: 42, size: '10 oz', rating: '5.0', image: '/products/candle-30.svg', tag: 'Collector', color: 'violet' },
  { id: 31, name: 'Ember Moss', scent: 'Charred Moss · Cedar · Black Tea', category: 'Earthy', mood: 'Earth', price: 37, size: '10 oz', rating: '4.9', image: '/products/candle-31.svg', tag: 'New', color: 'green' },
  { id: 32, name: 'Citron Grove', scent: 'Citron · Verbena · Green Stem', category: 'Citrus', mood: 'Sun', price: 31, size: '8 oz', rating: '4.8', image: '/products/candle-32.svg', tag: 'New', color: 'yellow' },
  { id: 33, name: 'Brown Sugar Cloud', scent: 'Brown Sugar · Cream · Tonka', category: 'Sweet', mood: 'Sun', price: 30, size: '8 oz', rating: '4.7', image: '/products/candle-33.svg', tag: 'Soft', color: 'rose' },
  { id: 34, name: 'Clay After Rain', scent: 'Wet Clay · Fern · Mineral', category: 'Earthy', mood: 'Water', price: 36, size: '10 oz', rating: '4.8', image: '/products/candle-34.svg', tag: 'Grounding', color: 'brown' },
  { id: 35, name: 'Tangerine Fog', scent: 'Tangerine · Juniper · White Musk', category: 'Citrus', mood: 'Water', price: 32, size: '8 oz', rating: '4.9', image: '/products/candle-35.svg', tag: 'Bright', color: 'orange' },
  { id: 36, name: 'Sugar Bloom', scent: 'Peony · Marshmallow · Vanilla', category: 'Sweet', mood: 'Sun', price: 34, size: '8 oz', rating: '4.6', image: '/products/candle-36.svg', tag: 'Floral', color: 'rose' },
  { id: 37, name: 'Wet Stone', scent: 'River Stone · Thyme · Cedar', category: 'Earthy', mood: 'Water', price: 38, size: '10 oz', rating: '4.9', image: '/products/candle-37.svg', tag: 'Mineral', color: 'teal' },
  { id: 38, name: 'Lime Leaf', scent: 'Lime · Coriander · Bamboo', category: 'Citrus', mood: 'Earth', price: 29, size: '7 oz', rating: '4.7', image: '/products/candle-38.svg', tag: 'Fresh', color: 'green' },
  { id: 39, name: 'Almond Cream', scent: 'Almond · Oat Milk · Honey', category: 'Sweet', mood: 'Night', price: 33, size: '8 oz', rating: '4.8', image: '/products/candle-39.svg', tag: 'Comfort', color: 'orange' },
  { id: 40, name: 'Cedar Fig', scent: 'Cedar · Fig Skin · Moss', category: 'Earthy', mood: 'Earth', price: 40, size: '10 oz', rating: '5.0', image: '/products/candle-40.svg', tag: 'Collector', color: 'violet' },
  { id: 41, name: 'Orange Peel Theory', scent: 'Orange Peel · Cardamom · Mint', category: 'Citrus', mood: 'Fire', price: 31, size: '8 oz', rating: '4.8', image: '/products/candle-41.svg', tag: 'Zesty', color: 'orange' },
  { id: 42, name: 'Vanilla Dawn', scent: 'Vanilla Bean · Rice Milk · Amber', category: 'Sweet', mood: 'Sun', price: 35, size: '10 oz', rating: '4.9', image: '/products/candle-42.svg', tag: 'Morning', color: 'yellow' },
]

const collections = [
  { name: 'The morning edit', mood: 'Sun', copy: 'For open windows, first coffee, and a little more daylight.', image: '/products/candle-04.svg', tone: 'sun' },
  { name: 'After dark', mood: 'Night', copy: 'Smoky woods and velvet florals for the slow hours.', image: '/products/candle-06.svg', tone: 'night' },
  { name: 'Grounded', mood: 'Earth', copy: 'Green, mineral, and quietly earthy scents to reset a room.', image: '/products/candle-03.svg', tone: 'moss' },
]

const articles = [
  { category: 'Rituals', title: 'A five-minute reset for the room you are in', date: '06.18.26', copy: 'Small gestures, warm light, and the scent that brings you back.', accent: 'amber' },
  { category: 'Field notes', title: 'How to make a candle last longer', date: '06.04.26', copy: 'The little burn-care habits that make every ounce count.', accent: 'blue' },
  { category: 'Behind the pour', title: 'Inside our studio: wax, wick, and patience', date: '05.26.26', copy: 'A look at the hands and materials behind every vessel.', accent: 'green' },
]

const articleDetails = [
  {
    lead: 'The room does not need a makeover. It needs a moment of attention.',
    sections: [['Start with the edge', 'Put your phone down, clear one small surface, and open a window if the day allows it. The point is not to finish a task—it is to make a little room for noticing.'], ['Bring in warm light', 'Light a candle with a soft, familiar profile. Let the first few minutes be quiet. Notice the way the fragrance arrives: slowly, then all at once.'], ['Let the room come back to you', 'Take five deep breaths, make a cup of something warm, and stay with the room as it is. A reset can be small and still count.']],
  },
  {
    lead: 'A little care before and after each burn makes every candle feel better for longer.',
    sections: [['Trim before lighting', 'Keep the wick at roughly a quarter inch. A short, clean wick gives you a calmer flame and helps keep the vessel free of soot.'], ['Give the wax a full melt', 'On the first burn, allow the melted wax to reach the edges of the vessel. This prevents tunneling and sets up an even burn for the rest of the candle.'], ['Know when to stop', 'Let the candle cool completely between burns and retire it when about half an inch of wax remains. Wash and reuse the vessel for small keepsakes.']],
  },
  {
    lead: 'Every Hearth & Haze candle is a small collaboration between material, temperature, and time.',
    sections: [['The wax', 'We use a coconut-soy blend because it holds fragrance beautifully and burns with a soft, even pool. Each batch is warmed slowly and never rushed.'], ['The blend', 'Our perfumer builds each scent in layers—bright top notes, a textured middle, and a base that stays in the room after the flame goes out.'], ['The pour', 'The final pour happens by hand in our studio. We let every vessel settle overnight, inspect every wick, and pack each one when it is ready to travel.']],
  },
]

function Icon({ name, size = 18 }) {
  const paths = {
    arrow: <><path d="M4 12h15" /><path d="m13 6 6 6-6 6" /></>,
    chevron: <path d="m7 10 5 5 5-5" />,
    search: <><circle cx="10.8" cy="10.8" r="6.3" /><path d="m16 16 4.2 4.2" /></>,
    bag: <><path d="M5.5 8.5h13l1 11h-15l1-11Z" /><path d="M8.5 8.5V6a3.5 3.5 0 0 1 7 0v2.5" /></>,
    heart: <path d="M20.2 8.6c0 4.3-8.2 9.4-8.2 9.4S3.8 12.9 3.8 8.6A4.3 4.3 0 0 1 12 6.5a4.3 4.3 0 0 1 8.2 2.1Z" />,
    plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
    spark: <><path d="m12 2 1.2 6.8L19 12l-5.8 3.2L12 22l-1.2-6.8L5 12l5.8-3.2L12 2Z" /><path d="m20 3 .4 2.6L23 7l-2.6 1.4L20 11l-.4-2.6L17 7l2.6-1.4L20 3Z" /></>,
    menu: <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>,
    close: <><path d="m6 6 12 12" /><path d="M18 6 6 18" /></>,
  }
  return <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

function Logo({ onClick }) {
  return <button className="logo-mark" onClick={onClick} aria-label="Hearth and Haze home"><span className="logo-flame">✦</span><span>HEARTH <i>&amp;</i> HAZE</span></button>
}

function Header({ route, go, theme, setTheme, cartCount, onSearch }) {
  const [open, setOpen] = useState(false)
  const nav = [['shop', 'Shop'], ['collections', 'Collections'], ['journal', 'Journal'], ['about', 'Our story']]
  const handleGo = (path) => { setOpen(false); go(path) }
  return <>
    <div className="announcement"><span>Complimentary shipping on orders $75+</span><span className="announcement-hide">Hand-poured in small batches · Since 2014</span><span>Shop the summer edit <Icon name="arrow" size={14} /></span></div>
    <header className="site-header">
      <Logo onClick={() => handleGo('home')} />
      <nav className={`main-nav ${open ? 'is-open' : ''}`} aria-label="Primary navigation">
        {nav.map(([key, label]) => <button key={key} className={route === key ? 'active' : ''} onClick={() => handleGo(key)}>{label}</button>)}
        <button className={route === 'shop' ? 'active' : ''} onClick={() => handleGo('shop')}>Find your scent</button>
      </nav>
      <div className="header-actions">
        <button className="icon-button search-trigger" onClick={onSearch} aria-label="Search"><Icon name="search" /></button>
        <button className="mode-dot" style={{ '--mode-color': themeModes[theme].color }} onClick={() => setTheme(Object.keys(themeModes)[(Object.keys(themeModes).indexOf(theme) + 1) % 4])} aria-label={`Theme mode: ${themeModes[theme].label}`}><span /></button>
        <button className="icon-button bag-button" onClick={() => handleGo('cart')} aria-label="Open cart"><Icon name="bag" /><b>{cartCount}</b></button>
        <button className="icon-button menu-trigger" onClick={() => setOpen((value) => !value)} aria-label="Menu"><Icon name={open ? 'close' : 'menu'} /></button>
      </div>
    </header>
  </>
}

function Button({ children, onClick, kind = 'dark', type = 'button', className = '' }) {
  return <button type={type} className={`button button-${kind} ${className}`} onClick={onClick}>{children}</button>
}

function ProductCard({ product, onAdd, onPreview, onToggleWish, wished }) {
  return <article className="product-card">
    <div className="product-art" onClick={() => onPreview(product)}>
      <span className="product-tag">{product.tag}</span>
      <button className={`wish-button ${wished ? 'wished' : ''}`} onClick={(event) => { event.stopPropagation(); onToggleWish(product.id) }} aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}><Icon name="heart" size={17} /></button>
      <img src={product.image} alt={`${product.name} candle`} loading="lazy" />
      <div className="art-hover"><span>Quick view</span><Icon name="arrow" size={15} /></div>
    </div>
    <div className="product-info"><div><h3>{product.name}</h3><p>{product.scent}</p></div><strong>${product.price}</strong></div>
    <button className="add-line" onClick={() => onAdd(product)}><span>Add to bag</span><span><Icon name="plus" size={16} /></span></button>
  </article>
}

function SectionHeading({ eyebrow, title, copy, link, onLink }) {
  return <div className="section-heading"><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{copy && <p className="section-copy">{copy}</p>}</div>{link && <button className="text-link" onClick={onLink}>{link}<Icon name="arrow" size={16} /></button>}</div>
}

function ThemeSwitcher({ theme, setTheme }) {
  return <div className="theme-switcher"><div><p className="eyebrow">Set the atmosphere</p><h3>Choose your color mode</h3></div><div className="theme-options">{Object.entries(themeModes).map(([key, value]) => <button key={key} className={theme === key ? 'selected' : ''} onClick={() => setTheme(key)}><span style={{ background: value.color }} /><small>{value.label}</small></button>)}</div></div>
}

function HomePage({ go, onAdd, onPreview, onToggleWish, wished, theme, setTheme }) {
  const [slide, setSlide] = useState(0)
  const featured = products.slice(0, 6)
  const visible = [0, 1, 2].map((offset) => featured[(slide + offset) % featured.length])
  return <main className="page home-page">
    <section className="hero-section"><div className="hero-copy"><p className="eyebrow reveal-one">SCENTED OBJECTS FOR EVERYDAY RITUALS</p><h1 className="reveal-two">Make room<br /><em>for feeling.</em></h1><p className="hero-lede reveal-three">Hand-poured candles for the quiet in-between moments—the first light, the long exhale, the staying in.</p><div className="hero-actions reveal-four"><Button onClick={() => go('shop')}>Shop all candles <Icon name="arrow" size={16} /></Button><button className="text-link" onClick={() => go('collections')}>Explore collections <Icon name="arrow" size={16} /></button></div><div className="hero-proof"><span><strong>01</strong><small>Clean-burning<br />coconut wax</small></span><span><strong>02</strong><small>Hand-poured<br />in small batches</small></span></div></div><div className="hero-visual"><div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" /><div className="hero-glow" /><div className="hero-candle-wrap"><img src="/products/candle-01.svg" alt="Solstice Saffron candle glowing on a pedestal" /><span className="hero-spark spark-one">✦</span><span className="hero-spark spark-two">✦</span></div><div className="hero-note"><span>01 / 04</span><span>THE WARM EDIT</span></div></div></section>
    <div className="marquee"><div><span>LIGHT A LITTLE WONDER</span><i>✦</i><span>LIGHT A LITTLE WONDER</span><i>✦</i><span>LIGHT A LITTLE WONDER</span></div></div>
    <section className="content-section category-section"><SectionHeading eyebrow="Shop by mood" title="A scent for the way you feel." copy="Our collection moves with your day—from bright starts to slow nights." link="View all scents" onLink={() => go('shop')} /><div className="category-rail">{[['Fire', 'For glowing rooms', 'amber', '/products/candle-01.svg'], ['Water', 'For a clear head', 'blue', '/products/candle-02.svg'], ['Earth', 'For coming back to yourself', 'green', '/products/candle-03.svg'], ['Sun', 'For the bright side', 'yellow', '/products/candle-04.svg']].map(([name, text, tone, image], index) => <button className={`category-card ${tone}`} key={name} onClick={() => go(`shop?mood=${name}`)}><div><span className="category-index">0{index + 1}</span><h3>{name}</h3><p>{text}</p><span className="round-arrow"><Icon name="arrow" size={15} /></span></div><img src={image} alt="" /></button>)}</div></section>
    <section className="content-section featured-section"><SectionHeading eyebrow="The edit" title="A few things worth lingering over." link="Shop all" onLink={() => go('shop')} /><div className="featured-grid">{visible.map((product) => <ProductCard key={product.id} product={product} onAdd={onAdd} onPreview={onPreview} onToggleWish={onToggleWish} wished={wished.includes(product.id)} />)}</div><div className="slider-controls"><button onClick={() => setSlide((value) => (value + featured.length - 1) % featured.length)} aria-label="Previous products">←</button><div>{featured.map((item, index) => <button key={item.id} className={index === slide ? 'active' : ''} onClick={() => setSlide(index)} aria-label={`Show slide ${index + 1}`} />)}</div><button onClick={() => setSlide((value) => (value + 1) % featured.length)} aria-label="Next products">→</button></div></section>
    <section className="split-story"><div className="story-image"><div className="story-circle" /><img src="/products/candle-03.svg" alt="Moss and Stone candle" /></div><div className="story-copy"><p className="eyebrow">The H&amp;H difference</p><h2>Good scent<br /><em>takes time.</em></h2><p>We blend in small batches, let the wax settle, and obsess over the throw. Each candle is made to feel like an object you will want to keep around long after the last burn.</p><Button kind="outline" onClick={() => go('about')}>Read our story <Icon name="arrow" size={16} /></Button><div className="story-stats"><span><strong>45h</strong><small>average burn time</small></span><span><strong>100%</strong><small>plant-based wax</small></span><span><strong>0</strong><small>paraffins or fillers</small></span></div></div></section>
    <section className="content-section collection-preview"><SectionHeading eyebrow="Curated for you" title="Find your next favorite ritual." link="Explore collections" onLink={() => go('collections')} /><div className="collection-grid">{collections.map((collection, index) => <button className={`collection-card collection-${index + 1}`} onClick={() => go('shop')} key={collection.name}><div className="collection-card-copy"><span>{collection.mood}</span><h3>{collection.name}</h3><p>{collection.copy}</p><span className="text-link">Shop edit <Icon name="arrow" size={15} /></span></div><img src={collection.image} alt="" /></button>)}</div></section>
    <section className="quote-section"><div className="quote-mark">“</div><blockquote>The best candle is the one that makes you notice your own life.</blockquote><p>— ELENA, H&amp;H COMMUNITY MEMBER</p></section><ThemeSwitcher theme={theme} setTheme={setTheme} /><Newsletter />
  </main>
}

function ShopPage({ onAdd, onPreview, onToggleWish, wished }) {
  const initialMood = new URLSearchParams(window.location.hash.split('?')[1] || '').get('mood') || 'All moods'
  const initialCategory = new URLSearchParams(window.location.hash.split('?')[1] || '').get('category') || 'All scents'
  const initialSearch = new URLSearchParams(window.location.hash.split('?')[1] || '').get('search') || ''
  const initialMaxPrice = Number(new URLSearchParams(window.location.hash.split('?')[1] || '').get('maxPrice')) || 0
  const [category, setCategory] = useState(initialCategory), [mood, setMood] = useState(initialMood), [sort, setSort] = useState('Featured'), [search, setSearch] = useState(initialSearch), [maxPrice, setMaxPrice] = useState(initialMaxPrice)
  const categories = ['All scents', 'Warm', 'Fresh', 'Earthy', 'Citrus', 'Floral', 'Woody', 'Sweet'], moods = ['All moods', 'Fire', 'Water', 'Earth', 'Sun', 'Night']
  const filtered = useMemo(() => { let result = products.filter((product) => (category === 'All scents' || product.category === category) && (mood === 'All moods' || product.mood === mood) && (!maxPrice || product.price <= maxPrice) && `${product.name} ${product.scent}`.toLowerCase().includes(search.toLowerCase())); if (sort === 'Price: low to high') result = [...result].sort((a, b) => a.price - b.price); if (sort === 'Price: high to low') result = [...result].sort((a, b) => b.price - a.price); if (sort === 'Top rated') result = [...result].sort((a, b) => Number(b.rating) - Number(a.rating)); return result }, [category, mood, search, sort, maxPrice])
  return <main className="page shop-page"><section className="page-intro"><div><p className="eyebrow">The full collection</p><h1>Find the one<br /><em>that feels like you.</em></h1></div><p>Forty-two hand-poured scents for different rooms, rhythms, and versions of you.</p></section><div className="shop-toolbar"><div className="filter-scroll"><span className="toolbar-label">Filter by</span>{categories.map((item) => <button className={category === item ? 'active' : ''} key={item} onClick={() => { setCategory(item); setMood('All moods'); setMaxPrice(0) }}>{item}</button>)}</div><div className="toolbar-right"><label className="search-field"><Icon name="search" size={16} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search candles" /></label><select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort products"><option>Featured</option><option>Top rated</option><option>Price: low to high</option><option>Price: high to low</option></select></div></div><div className="mood-pills"><span className="toolbar-label">Mood</span>{moods.map((item) => <button className={mood === item ? 'active' : ''} key={item} onClick={() => { setMood(item); setCategory('All scents'); setMaxPrice(0) }}>{item}</button>)}</div><div className="shop-meta"><p><strong>{filtered.length}</strong> candles to explore</p><span>{category !== 'All scents' || mood !== 'All moods' || search || maxPrice ? 'Filters applied' : 'Showing the full edit'}</span></div><div className="product-grid">{filtered.map((product) => <ProductCard key={product.id} product={product} onAdd={onAdd} onPreview={onPreview} onToggleWish={onToggleWish} wished={wished.includes(product.id)} />)}</div>{!filtered.length && <div className="empty-state"><span>✦</span><h2>No candles found.</h2><p>Try a different mood or search term.</p><Button onClick={() => { setCategory('All scents'); setMood('All moods'); setSearch(''); setMaxPrice(0) }}>Reset filters</Button></div>}</main>
}

function CollectionsPage({ go }) {
  return <main className="page collections-page"><section className="page-intro centered-intro"><p className="eyebrow">Ways to wander</p><h1>Collections for<br /><em>every atmosphere.</em></h1><p>Sometimes you know the feeling before you know the scent. Start there.</p></section><section className="mood-hero-grid">{collections.map((collection, index) => <button key={collection.name} className={`mood-hero mood-${index + 1}`} onClick={() => go('shop')}><div><span className="eyebrow">0{index + 1} · {collection.mood}</span><h2>{collection.name}</h2><p>{collection.copy}</p><span className="round-arrow"><Icon name="arrow" size={18} /></span></div><img src={collection.image} alt="" /></button>)}</section><section className="ritual-section"><div><p className="eyebrow">A tiny ritual</p><h2>Light it.<br /><em>Let it land.</em></h2></div><div className="ritual-steps">{['Trim your wick to ¼ inch.', 'Let the first burn reach the edge.', 'Blow out gently. Come back tomorrow.'].map((step, index) => <div key={step}><span>0{index + 1}</span><p>{step}</p></div>)}</div></section><Newsletter /></main>
}

function JournalPage({ go }) {
  return <main className="page journal-page"><section className="page-intro journal-intro"><div><p className="eyebrow">From the journal</p><h1>Notes on scent,<br /><em>space &amp; stillness.</em></h1></div><p>Little observations and helpful rituals from the H&amp;H studio.</p></section><section className="journal-feature"><div className="journal-feature-art"><div className="journal-orb" /><span>FIELD NOTE<br />NO. 24</span></div><div className="journal-feature-copy"><p className="eyebrow">Featured story · 06.18.26</p><h2>A five-minute reset for the room you are in.</h2><p>Small gestures, warm light, and the scent that brings you back to yourself. A gentle guide to making space for a feeling.</p><button className="text-link" onClick={() => go('journal/0')}>Read the story <Icon name="arrow" size={16} /></button></div></section><section className="journal-list"><SectionHeading eyebrow="Keep reading" title="A slower scroll." />{articles.map((article, index) => <article className={`journal-card ${article.accent}`} key={article.title}><div className="journal-card-art"><span>{article.category}</span><i>✦</i></div><div className="journal-card-copy"><p>{article.date}</p><h3>{article.title}</h3><span>{article.copy}</span><button className="text-link" onClick={() => go(`journal/${index}`)}>Read more <Icon name="arrow" size={15} /></button></div></article>)}</section></main>
}

function JournalArticlePage({ article, detail, go }) {
  if (!article || !detail) return <ProductNotFound go={go} />
  return <main className="page article-page"><button className="back-link" onClick={() => go('journal')}>← Back to journal</button><section className={`article-hero ${article.accent}`}><p className="eyebrow">{article.category} · {article.date}</p><h1>{article.title}</h1><p>{article.copy}</p></section><article className="article-body"><p className="article-lead">{detail.lead}</p>{detail.sections.map(([heading, copy]) => <section key={heading}><span>✦</span><div><h2>{heading}</h2><p>{copy}</p></div></section>)}<button className="button button-outline" onClick={() => go('shop')}>Shop the collection <Icon name="arrow" size={16} /></button></article></main>
}

function AboutPage({ go }) {
  return <main className="page about-page"><section className="about-hero"><p className="eyebrow">Made with intention</p><h1>We make candles<br /><em>for the in-between.</em></h1><div className="about-hero-art"><img src="/products/candle-28.svg" alt="Forest Floor candle" /><span>EST. 2014<br />BROOKLYN · NY</span></div></section><section className="about-columns"><div><p className="eyebrow">Our point of view</p><h2>Scent is memory<br />with the lights on.</h2></div><div><p>Hearth &amp; Haze started with one simple belief: a home should feel like the person living in it. Not staged, not perfect—just warm, considered, and unmistakably yours.</p><p>We pour every candle in small batches with plant-based wax, cotton wicks, and fragrance blends made to unfold slowly. The result is a softer kind of luxury: something useful, beautiful, and allowed to be burned.</p><Button kind="outline" onClick={() => go('shop')}>Shop the collection <Icon name="arrow" size={16} /></Button></div></section><section className="values-grid">{[['01', 'Small by design', 'We keep our batches small so every pour gets the attention it deserves.'], ['02', 'Clear ingredients', 'No paraffin, no fillers, no mystery. Just a clean, intentional burn.'], ['03', 'Made to be kept', 'Our vessels are meant to become part of your space after the flame is gone.']].map(([number, title, copy]) => <div key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></div>)}</section><Newsletter /></main>
}

function ProductDetail({ product, onAdd, onToggleWish, wished, wishedIds = [], go }) {
  const [quantity, setQuantity] = useState(1), related = products.filter((item) => item.id !== product.id && item.category === product.category).slice(0, 3)
  return <main className="page detail-page"><button className="back-link" onClick={() => go('shop')}>← Back to shop</button><section className="detail-layout"><div className="detail-art"><span className="product-tag">{product.tag}</span><img src={product.image} alt={`${product.name} candle`} /></div><div className="detail-copy"><p className="eyebrow">{product.category} · {product.mood} mood</p><h1>{product.name}</h1><div className="detail-rating"><span>★★★★★</span> <u>{product.rating} · 48 reviews</u></div><p className="detail-scent">{product.scent}</p><p className="detail-description">A considered blend made for slow mornings, open windows, and the kind of evening you do not need to rush through. Clean, even, and quietly present.</p><div className="detail-notes"><div><span>Top note</span><strong>{product.scent.split(' · ')[0]}</strong></div><div><span>Burn time</span><strong>45+ hours</strong></div><div><span>Vessel</span><strong>Reusable ceramic</strong></div></div><div className="detail-buy"><strong>${product.price}</strong><div className="quantity"><button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button><span>{quantity}</span><button onClick={() => setQuantity(quantity + 1)}>+</button></div><Button onClick={() => onAdd(product, quantity)}>Add to bag <Icon name="arrow" size={16} /></Button><button className={`detail-wish ${wished ? 'wished' : ''}`} onClick={() => onToggleWish(product.id)}><Icon name="heart" size={17} /></button></div><div className="detail-accordions"><details open><summary>Materials &amp; care <Icon name="chevron" size={15} /></summary><p>Coconut-soy wax, cotton wick, phthalate-free fragrance oils, reusable glass vessel. Trim the wick before every burn and never leave a candle unattended.</p></details><details><summary>Shipping &amp; returns <Icon name="chevron" size={15} /></summary><p>Orders ship within 2–3 business days. Complimentary shipping starts at $75. Returns accepted within 30 days.</p></details></div></div></section><section className="detail-related"><SectionHeading eyebrow="You may also like" title="Keep the mood going." link="Back to all scents" onLink={() => go('shop')} /><div className="featured-grid">{related.map((item) => <ProductCard key={item.id} product={item} onAdd={onAdd} onPreview={(next) => go(`product/${next.id}`)} onToggleWish={onToggleWish} wished={wishedIds.includes(item.id)} />)}</div></section></main>
}

function CartPage({ cartItems, onAdd, go, onRemove }) {
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0), shipping = subtotal >= 75 || subtotal === 0 ? 0 : 8
  return <main className="page cart-page"><section className="page-intro cart-intro"><div><p className="eyebrow">Your ritual, gathered</p><h1>Your bag.</h1></div><p>{cartItems.length ? 'Everything you need for a little more atmosphere.' : 'A good room starts with a good scent.'}</p></section>{cartItems.length ? <div className="cart-layout"><div className="cart-list">{cartItems.map((item) => <div className="cart-row" key={item.id}><img src={item.image} alt="" /><div><h3>{item.name}</h3><p>{item.scent}</p><button onClick={() => onRemove(item.id)}>Remove</button></div><div className="cart-qty"><button onClick={() => onAdd(item, -1)}>−</button><span>{item.quantity}</span><button onClick={() => onAdd(item, 1)}>+</button></div><strong>${item.price * item.quantity}</strong></div>)}</div><aside className="order-summary"><p className="eyebrow">Order summary</p><div><span>Subtotal</span><strong>${subtotal}</strong></div><div><span>Shipping</span><strong>{shipping ? `$${shipping}` : 'Complimentary'}</strong></div><hr /><div className="total"><span>Total</span><strong>${subtotal + shipping}</strong></div><Button onClick={() => alert('Checkout preview — connect your payment flow here.')}>Continue to checkout <Icon name="arrow" size={16} /></Button><small>Taxes calculated at checkout.</small></aside></div> : <div className="empty-cart"><div className="empty-cart-orb">✦</div><h2>Your bag is waiting.</h2><p>Start with a scent and build from there.</p><Button onClick={() => go('shop')}>Explore candles <Icon name="arrow" size={16} /></Button></div>}</main>
}

function ProductNotFound({ go }) {
  return <main className="page empty-state route-empty"><span>✦</span><h2>Candle not found.</h2><p>This scent may have moved to another shelf.</p><Button onClick={() => go('shop')}>Back to shop <Icon name="arrow" size={16} /></Button></main>
}

function Newsletter() {
  return <section className="newsletter"><div><p className="eyebrow">A note from the studio</p><h2>Good things,<br /><em>in your inbox.</em></h2></div><form onSubmit={(event) => { event.preventDefault(); alert('Thanks for joining the H&H list.') }}><p>New pours, scent notes, and small ways to make home feel more like yours.</p><label><input type="email" required placeholder="Your email address" /><button aria-label="Subscribe"><Icon name="arrow" size={18} /></button></label><small>By signing up, you agree to our privacy policy.</small></form></section>
}

function App() {
  const [route, setRoute] = useState(window.location.hash.replace('#/', '') || 'home'), [theme, setTheme] = useState(() => localStorage.getItem('hh-theme') || 'ember'), [cart, setCart] = useState([]), [wished, setWished] = useState([]), [preview, setPreview] = useState(null), [searchOpen, setSearchOpen] = useState(false)
  useEffect(() => { const handleHash = () => { setRoute(window.location.hash.replace('#/', '') || 'home'); window.scrollTo({ top: 0, behavior: 'smooth' }) }; window.addEventListener('hashchange', handleHash); return () => window.removeEventListener('hashchange', handleHash) }, [])
  useEffect(() => { localStorage.setItem('hh-theme', theme) }, [theme])
  const go = (path) => { let nextRoute = path.replace(/^#?\/?/, ''); if (nextRoute === 'shop' && searchOpen) { const term = document.querySelector('.search-modal-input input')?.value.trim(); if (term) nextRoute = `shop?search=${encodeURIComponent(term)}` } setRoute(nextRoute); if (window.location.hash !== `#/${nextRoute}`) window.location.hash = `/${nextRoute}`; setPreview(null) }
  const addToCart = (product, amount = 1) => setCart((items) => { const found = items.find((item) => item.id === product.id); if (found) return items.map((item) => item.id === product.id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item); return [...items, { ...product, quantity: Math.max(1, amount) }] })
  const removeFromCart = (id) => setCart((items) => items.filter((item) => item.id !== id)), toggleWish = (id) => setWished((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id])
  const routeName = route.split('?')[0], productId = routeName.startsWith('product/') ? Number(routeName.split('/')[1]) : null, detailProduct = products.find((product) => product.id === productId), journalMatch = routeName.match(/^journal\/(\d+)$/), journalIndex = journalMatch ? Number(journalMatch[1]) : null
  let page = <HomePage go={go} onAdd={addToCart} onPreview={setPreview} onToggleWish={toggleWish} wished={wished} theme={theme} setTheme={setTheme} />
  if (routeName === 'shop') page = <ShopPage go={go} onAdd={addToCart} onPreview={setPreview} onToggleWish={toggleWish} wished={wished} />
  if (routeName === 'collections') page = <CollectionsPage go={go} />
  if (routeName === 'journal') page = <JournalPage go={go} />
  if (journalMatch) page = <JournalArticlePage article={articles[journalIndex]} detail={articleDetails[journalIndex]} go={go} />
  if (routeName === 'about') page = <AboutPage go={go} />
  if (routeName === 'cart') page = <CartPage cartItems={cart} onAdd={addToCart} go={go} onRemove={removeFromCart} />
  if (detailProduct) page = <ProductDetail product={detailProduct} onAdd={addToCart} onToggleWish={toggleWish} wished={wished.includes(detailProduct.id)} wishedIds={wished} go={go} />
  if (productId && !detailProduct) page = <ProductNotFound go={go} />
  return <div className={`app theme-${theme}`}><Header route={routeName.split('/')[0]} go={go} theme={theme} setTheme={setTheme} cartCount={cart.reduce((total, item) => total + item.quantity, 0)} onSearch={() => setSearchOpen(true)} />{page}<footer className="site-footer"><div className="footer-top"><Logo onClick={() => go('home')} /><div><p>Hand-poured light for lived-in spaces.</p><span>© 2026 Hearth &amp; Haze</span></div><div className="footer-links"><button onClick={() => go('shop')}>Shop</button><button onClick={() => go('about')}>About</button><button onClick={() => go('journal')}>Journal</button><button onClick={() => go('cart')}>Bag ({cart.reduce((total, item) => total + item.quantity, 0)})</button></div></div><div className="footer-bottom"><span>Made for slow moments.</span><span>Instagram · Pinterest · Contact</span></div></footer>{preview && <div className="quick-view-backdrop" onClick={() => setPreview(null)}><div className="quick-view" onClick={(event) => event.stopPropagation()}><button className="quick-close" onClick={() => setPreview(null)} aria-label="Close"><Icon name="close" /></button><img src={preview.image} alt={`${preview.name} candle`} /><div><p className="eyebrow">{preview.tag}</p><h2>{preview.name}</h2><p>{preview.scent}</p><strong>${preview.price}</strong><Button onClick={() => { addToCart(preview); setPreview(null) }}>Add to bag <Icon name="arrow" size={16} /></Button><button className="text-link" onClick={() => go(`product/${preview.id}`)}>View full details <Icon name="arrow" size={15} /></button></div></div></div>}{searchOpen && <div className="search-backdrop" onClick={() => setSearchOpen(false)}><div className="search-modal" onClick={(event) => event.stopPropagation()}><button className="quick-close" onClick={() => setSearchOpen(false)} aria-label="Close"><Icon name="close" /></button><p className="eyebrow">Search the collection</p><h2>What are you in the mood for?</h2><div className="search-modal-input"><Icon name="search" /><input autoFocus placeholder="Try “cedar” or “bright”" onKeyDown={(event) => { if (event.key === 'Enter') { setSearchOpen(false); go('shop') } }} /></div><div className="search-suggestions"><button onClick={() => { setSearchOpen(false); go('shop') }}>Warm &amp; smoky</button><button onClick={() => { setSearchOpen(false); go('shop') }}>Fresh &amp; green</button><button onClick={() => { setSearchOpen(false); go('shop') }}>Gifts under $35</button></div></div></div>}</div>
}

export default App
