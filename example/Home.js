import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'

class Home extends Component {
  
  render() {

    return (

      <div>
        This is the homepage<hr />
        <Link to='/about'>About</Link>
      </div>
    )
  }

}

export default Home