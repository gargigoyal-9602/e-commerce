//@ts-nocheck
import React, { PureComponent } from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';

export type Props = RouteProps & {

};

interface S {
    token: string;
    loading: boolean;
};

export default class ProtectRouting extends PureComponent<Props, S>{
    constructor() {
        super();
        this.state = {
            tokenn: '',
            loading: true
        };
    };
    async componentDidMount() {
        const tokn = await localStorage.getItem('token');
        if (tokn) {
            this.setState({
                tokenn: tokn,
                loading: false
            })
        }
        else {
            this.setState({
                loading: false
            });
        }
    };
    render() {
        return !this.state.loading ? (
            this.state.tokenn == '' ? (
                <Redirect to='/login' />
            ) : (
                <Route {...this.props} />
            )
        ) : null
    }
};