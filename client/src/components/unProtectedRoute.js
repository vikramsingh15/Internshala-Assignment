import React, { Component } from 'react';
import { connect } from 'react-redux';

export default ChildComponent => {
  class ComposedComponent extends Component {
    componentDidMount() {
      this.shouldNavigateAway();
    }

    componentDidUpdate() {
      this.shouldNavigateAway();
    }

    shouldNavigateAway() {
      let { auth } = this.props;
      //   console.log(auth);
      if (!auth.loading && auth.isAuthenticated && auth.user) {
        let { typeAccess } = auth.user;
        if (typeAccess == 'restaurant') {
          this.props.history.push('/dashboard');
        }
        if (typeAccess == 'user') {
          this.props.history.push('/');
        }
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { auth: state.auth };
  }

  return connect(mapStateToProps)(ComposedComponent);
};
