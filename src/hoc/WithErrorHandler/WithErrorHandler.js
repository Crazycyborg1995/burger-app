import React, { Component } from 'react';
import Aux from '../Auxillary';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    };
    componentWillMount() {
      // render before child ele, whereas didmount after child ele
      this.reqInterceptors = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req; // o.w wont move to next interceptor
      });
      this.resInterceptors = axios.interceptors.response.use(
        res => res,
        error => {
          this.setState({ error });
        }
      );
    }

    // interceptors will get clogged in memory after many request so we need to clear them after use
    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptors);
      axios.interceptors.response.eject(this.resInterceptors);
    }

    errorConfirmHandler = () => {
      this.setState({ error: null });
    };
    render() {
      return (
        <Aux>
          <Modal show={this.state.error} closed={this.errorConfirmHandler}>
            {this.state.error ? this.state.error.message : null}
            {/* if there is an error modal will display, and message prop is from firebase */}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
