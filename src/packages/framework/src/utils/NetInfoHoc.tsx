import React, { Component } from 'react';
import NetInfo from '@react-native-community/netinfo';

// This function takes a component...
function networkHOC() {
  
  return (WrappedComponent:any) =>
    // ...and returns another component...
    class extends React.Component {
      _unsubscribe: any;

      constructor(props: any) {
        super(props);
        this.state = {
          isConnected: true,
        };
      }

      componentDidMount() {
        this._unsubscribe = NetInfo.addEventListener((state) => {
          this.handleConnectivityChange(state.isConnected);
          console.log('Connection type', state.type);
          console.log('Is connected?', state.isConnected);
        });
      }

      componentWillUnmount() {
        this._unsubscribe();
      }

      handleConnectivityChange = (isConnected: any) => {
        this.setState({isConnected});
      };

      render() {
        // ... and renders the wrapped component with the fresh data!
        // Notice that we pass through any additional props
        return (
          //@ts-ignore
          <WrappedComponent isConnected={this.state.isConnected} {...this.props} />
        );
      }
    };
}

export default networkHOC;
