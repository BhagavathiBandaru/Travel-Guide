import './index.css'

const TravelCard = props => {
  const {cardData} = props
  const {imageUrl, name, description} = cardData

  return (
    <li className="each-travel-block">
      <img src={imageUrl} alt={name} className="image-element" />
      <div className="card-data-alignment">
        <h1 className="heading">{name}</h1>
        <p className="description">{description}</p>
      </div>
    </li>
  )
}

export default TravelCard
