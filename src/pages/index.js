import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {setNavigatorPosition, setNavigatorShape} from '../state/store'
import {featureNavigator} from '../utils/shared'
import Seo from '../components/Seo'

class Index extends React.Component {
  featureNavigator = featureNavigator.bind(this)

  componentWillMount() {
    if (this.props.navigatorPosition !== 'is-featured') {
      this.props.setNavigatorPosition('is-featured')
    }
  }

  render() {
    return (
      <div>
        <Seo />
      </div>
    )
  }
}

Index.propTypes = {
  navigatorPosition: PropTypes.string.isRequired,
  setNavigatorPosition: PropTypes.func.isRequired,
  isWideScreen: PropTypes.bool.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  return {
    navigatorPosition: state.navigatorPosition,
    isWideScreen: state.isWideScreen,
  }
}

const mapDispatchToProps = {
  setNavigatorPosition,
  setNavigatorShape,
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
