import React, { Component } from 'react'

import BorrowerInfo from '../borrowerInfo/BorrowerInfo'

import './payerToggle.scss'

class PayerToggle extends Component {

  constructor(props) {
    super(props)

    this.state = { hideGet : '', hideGive : 'hidden' };
  }

  togglePayer = () => {
    if(this.props.changePayer()) this.props.changePayer()

    this.setHideGet()
  }

  componentWillReceiveProps(nextProps){

    if(nextProps.isPayer !== this.props.isPayer ) {
      this.setHideGet()
    }
  }

  setHideGet = () => {
    if(this.state.hideGet === 'hidden') {
      this.setState ({ hideGive : 'hidden', hideGet : '' });
    } else {
      this.setState ({ hideGive : '', hideGet : 'hidden' });
    }
  }

  render () {

    return (
      <div className="payerToggle" onClick={() => this.togglePayer() }>
        <BorrowerInfo hideGet={ this.state.hideGet }  hideGive={ this.state.hideGive } contactColor={ this.props.contactColor } contactName={ this.props.contactName }/>
      </div>
    )
  }
}

export default PayerToggle;
