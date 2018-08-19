import React, { Component } from 'react';

class Sidebar extends Component {
    state = {locations: this.props.allLocations}
    updateFilter = (e) => {
        // Filter locations by matching their description to the query.
        const query = e.target.value.trim()
        if (query.length == 0) {
            this.setState({locations: this.props.allLocations})
            this.props.onLocationFiltered(this.props.allLocations)
        } else {
            const filteredLocations = this.state.locations.filter(location => location.description.toLowerCase().indexOf(query.toLowerCase()) >= 0)
            this.setState({locations: filteredLocations})
            this.props.onLocationFiltered(filteredLocations)
        }
        
    }
    render() {
        return (
            <div className="sidebar">
                <h1>My Favorite Places</h1>
                <input onChange={this.updateFilter} />
                <ul>
                    {this.state.locations.map(location =>
                        <li key={location.id}>
                            <a href="#" onClick={() => {this.props.onClickLocation(location)}}>{location.name}</a>
                            <div className="description">{location.description}</div>
                        </li>)}
                </ul>
            </div>
        )
    }
}

export default Sidebar
