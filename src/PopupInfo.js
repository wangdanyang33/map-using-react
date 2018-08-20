import React, { Component } from 'react';
import { InfoWindow } from 'react-google-maps';

const foursqId = '1ZEXT0FEKEMRKOTBB45NZFGCW1F2YGMIK1PUOOMVS0BO5JCY'
const foursqSecret = 'JGIDCPWTXT35CGGMNZGM1LKB1PVQFNMG0GJBFHD4SFG3SCIB'

class PopupInfo extends Component {
    state = {}
    componentDidMount() {
        // Put attribution information to a div (mandatory).
        const placeServices = new this.props.googleMaps.places.PlacesService(document.getElementById('place-attributions'))
        placeServices.getDetails({
            placeId: this.props.placeId,
            fields: ['name', 'formatted_address', 'formatted_phone_number', 'icon', 'photos']
        }, (result, status) => {
            if (status === 'OK') {
                this.setState({
                    name: result.name,
                    formatted_address: result.formatted_address,
                    formatted_phone_number: result.formatted_phone_number,
                    icon: result.icon,
                    photos: result.photos
                })
                const foursquareUrl = `https://api.foursquare.com/v2/venues/search?client_id=${foursqId}&client_secret=${foursqSecret}&ll=${this.props.ll}&v=20180819&limit=1`
                fetch(foursquareUrl).then((result) => {
                    if (result.status == 200) {
                        result.json().then((data) => {
                            if (data.response.venues.length > 0) {
                                this.setState({foursquare_id: data.response.venues[0].id})
                            }
                        })
                    } else {
                        this.setState({ errorMessage: 'Foursquare API error. Please try again later.' })
                    }
                })
            } else {
                this.setState({ errorMessage: 'Google API error. Please try again later.' })
            }
        })
        
    }
    render() {
        if (this.state.name) {
            return (
                <InfoWindow onCloseClick={this.props.onCloseClick}>
                    <div className="popup">
                        <img className="icon" alt="Place icon" src={this.state.icon} />
                        <div className="place-name">{this.state.name}</div>
                        <div className="address">{this.state.formatted_address}</div>
                        <div className="phone">{this.state.formatted_phone_number}</div>
                        <div className="photo">
                            <img alt={this.state.name} src={this.state.photos[0].getUrl({ maxHeight: 300, maxWidth: 300 })} />
                        </div>
                        {this.state.foursquare_id && <div className="foursquare-link"><a href={`https://foursquare.com/v/${this.state.foursquare_id}`} target="_blank">Foursquare Link</a></div>}
                    </div>
                </InfoWindow>
            )
        } else if (this.state.errorMessage) {
            return (
                <InfoWindow onCloseClick={this.props.onCloseClick}>
                    <div>
                        {this.state.errorMessage}
                    </div>
                </InfoWindow>
            )
        } else {
            return (
                <InfoWindow onCloseClick={this.props.onCloseClick}>
                    <div>
                        Loading...
                    </div>
                </InfoWindow>
            )
        }
    }
}

export default PopupInfo
