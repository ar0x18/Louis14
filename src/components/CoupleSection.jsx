import coupleImg from '../IMG/unnamed (10).jpg'

export default function CoupleSection() {
  return (
    <section className="couple-section" id="nous" aria-labelledby="nous-title">
      <h2 id="nous-title" className="couple-section__title">Nous</h2>
      <div className="couple-section__inner">
        <img
          src={coupleImg}
          alt="Louis et sa copine souriant ensemble à la Saint-Valentin"
          className="couple-section__image"
          loading="lazy"
          width="1200"
          height="900"
        />
      </div>
    </section>
  )
}

