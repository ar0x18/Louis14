import { menuItems } from '../data/menu'

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

  return (
    <section className="menu" id="menu" aria-labelledby="menu-title">
      <h2 id="menu-title" className="menu__title">Menu du soir</h2>
      <div className="menu__list">
        {menuItems.map((item) => (
          <article
            key={item.id}
            className="menu__card"
            data-category={item.category}
          >
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
