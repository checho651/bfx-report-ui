import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { NonIdealState } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'

import config from 'config'

import SignUp from './SignUp'
import SignIn from './SignIn'
import RegisterSubAccounts from './RegisterSubAccounts'
import PasswordRecovery from './PasswordRecovery'

export const AUTH_TYPES = {
  SIMPLE_ACCOUNTS: 'simpleAccounts',
  MULTIPLE_ACCOUNTS: 'multipleAccounts',
}

export const MODES = {
  SIGN_UP: 'sign_up',
  SIGN_IN: 'sign_in',
  PASSWORD_RECOVERY: 'password_recovery',
}

class Auth extends PureComponent {
  static propTypes = {
    authData: PropTypes.shape({
      hasAuthData: PropTypes.bool.isRequired,
    }).isRequired,
    isShown: PropTypes.bool,
    isUsersLoaded: PropTypes.bool,
    t: PropTypes.func.isRequired,
    usersLoading: PropTypes.bool,
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  static defaultProps = {
    isShown: false,
    usersLoading: false,
    isUsersLoaded: false,
  }

  constructor(props) {
    super()

    const { authData: { hasAuthData } } = props

    this.state = {
      mode: (!config.showFrameworkMode || !hasAuthData) ? MODES.SIGN_UP : MODES.SIGN_IN,
      authType: AUTH_TYPES.SIMPLE_ACCOUNTS,
    }
  }

  componentDidUpdate(prevProps) {
    const { isUsersLoaded, users } = this.props
    const { authType } = this.state
    const isMultipleAccsSelected = authType === AUTH_TYPES.MULTIPLE_ACCOUNTS
    if (config.showFrameworkMode && !prevProps.isUsersLoaded && isUsersLoaded && users.length) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ mode: isMultipleAccsSelected ? MODES.SIGN_UP : MODES.SIGN_IN })
    }
  }

  switchMode = (mode) => {
    this.setState({ mode })
  }

  switchAuthType = (authType) => {
    this.setState({ authType })
  }

  render() {
    const {
      authData: { hasAuthData },
      isShown,
      t,
      usersLoading,
    } = this.props
    const { mode, authType } = this.state
    const isMultipleAccsSelected = authType === AUTH_TYPES.MULTIPLE_ACCOUNTS

    if (!isShown || (config.showFrameworkMode && !hasAuthData && usersLoading)) {
      return null
    }

    if (!config.showAuthPage) {
      return (
        <NonIdealState
          className='bitfinex-nonideal'
          icon={IconNames.KEY}
          title={t('auth.nonideal.title')}
          description={t('auth.nonideal.description')}
        />
      )
    }
    switch (mode) {
      case isMultipleAccsSelected && MODES.SIGN_UP:
        return (
          <RegisterSubAccounts
            authType={authType}
            switchMode={this.switchMode}
            switchAuthType={this.switchAuthType}
            isMultipleAccsSelected={isMultipleAccsSelected}
          />
        )
      case MODES.SIGN_IN:
        return (
          <SignIn
            authType={authType}
            switchMode={this.switchMode}
            switchAuthType={this.switchAuthType}
            isMultipleAccsSelected={isMultipleAccsSelected}
          />
        )
      case MODES.SIGN_UP:
      default:
        return (
          <SignUp
            authType={authType}
            switchMode={this.switchMode}
            switchAuthType={this.switchAuthType}
            isMultipleAccsSelected={isMultipleAccsSelected}
          />
        )
      case MODES.PASSWORD_RECOVERY:
        return <PasswordRecovery switchMode={this.switchMode} />
    }
  }
}

export default Auth
