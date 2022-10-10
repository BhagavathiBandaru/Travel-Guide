import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TravelCard from '../TravelCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'failure',
}

class TravelHomePage extends Component {
  state = {
    travelPlacesList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getTravelCardsListDataFromApi()
  }

  getTravelCardsListDataFromApi = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const apiUrl = 'https://apis.ccbp.in/tg/packages'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()

    const updatedData = data.packages.map(eachPackages => ({
      id: eachPackages.id,
      description: eachPackages.description,
      imageUrl: eachPackages.image_url,
      name: eachPackages.name,
    }))
    this.setState({
      travelPlacesList: updatedData,
      apiStatus: apiStatusConstants.success,
    })
  }

  renderLoaderView = () => (
    <div className="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderTravelGuideList = () => {
    const {travelPlacesList} = this.state

    return (
      <div className="travel-list-container">
        <ul className="travel-places-list">
          {travelPlacesList.map(eachPackage => (
            <TravelCard key={eachPackage.id} cardData={eachPackage} />
          ))}
        </ul>
      </div>
    )
  }

  renderTravelDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      case apiStatusConstants.success:
        return this.renderTravelGuideList()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <h1 className="main-heading">Travel Guide</h1>
        {this.renderTravelDetails()}
      </div>
    )
  }
}

export default TravelHomePage
