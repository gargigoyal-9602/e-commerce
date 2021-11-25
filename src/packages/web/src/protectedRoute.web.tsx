//@ts-nocheck
import React, { PureComponent } from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import isEmpty from "lodash/isEmpty";
import Loader from "../../components/src/Loader.web";


export type Props = RouteProps & {

};

interface S {
    token: string;
    loading: boolean;
}

export default class ProtectedRoute extends PureComponent<Props, S>{
    constructor() {
        super();
        this.state = {
            token: '',
            loading: true
        }
    }

    async componentDidMount() {
        let tokenn = await localStorage.getItem('token'); 
        if (tokenn) {
            this.setState({
                token: tokenn,
                loading: false
            })
        }
        else {
            this.setState({
                loading: false
            })
        }
    }

    render() {
        return !this.state.loading ? (
            this.state.token == ''
                ? (
                    <Redirect to="/" />
                ) : (
                    <Route {...this.props} />
                )
        ) : null;
    }
};