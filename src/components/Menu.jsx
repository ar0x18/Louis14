import { menuItems } from '../data/menu'
import HeartIcon from './HeartIcon'

const categoryLabels = { plat: 'Plat', dessert: 'Dessert', entrée: 'Entrée' }

export default function Menu() {
  if (!menuItems?.length) {
    return (
      <section className="menu" id="menu">
        <h2 className="menu__title">Menu du soir</h2>
        <p className="menu__empty">Menu à venir.</p>
      </section>
    )
  }

  const floralDivider = (
    <svg className="menu__divider" viewBox="0 0 120 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M0 12 Q30 4, 60 12 T120 12" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.4" />
      <path d="M20 12 Q40 8, 60 12 T100 12" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" fill="none" opacity="0.25" />
    </svg>
  )

  return (
    <section className="menu" id="menu" aria-labelledby="menu-title">
      <h2 id="menu-title" className="menu__title">Menu du soir</h2>
      {floralDivider}
      <div className="menu__list">
        {menuItems.map((item) => (
          <article
            key={item.id}
            className="menu__card"
            data-category={item.category}
          >
            <HeartIcon className="menu__card-heart" size={72} aria-hidden="true" />
            <span className="menu__category">{categoryLabels[item.category] || item.category}</span>
            <h3 className="menu__name">{item.name}</h3>
            {item.description && (
              <p className="menu__description">{item.description}</p>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}
