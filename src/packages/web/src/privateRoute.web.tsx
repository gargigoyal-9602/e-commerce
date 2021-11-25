//@ts-nocheck
import React, { PureComponent } from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';

export type Props = RouteProps & {

};

interface S {
    token: string;
    loading: boolean;
    guestdata?: string;
}

export default class PrivateRoute extends PureComponent<Props, S>{
    constructor() {
        super();
        this.state = {
            token: '',
            loading: true,
        }
    }
    async componentDidMount() {
        let tokenn = await localStorage.getItem('token');
        let GuestUserId = await localStorage.getItem('guestUUID');
        if (GuestUserId && tokenn) {
            this.setState({
                guestdata: GuestUserId,
                token: tokenn,
                loading: false
            });
        }
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
        return !this.state.loading
            ?
            (
                this.state.token !== ''
                    ?
                    this.state.token !== '' && (this.state.guestdata || localStorage.getItem('userFullName'))
                        ?
                        (
                            // <Redirect to='/login' />
                            <Redirect to={{ pathname: '/login', state: { calledFrom: this.props.location?.state?.calledFrom === "cart" ? "guest-login" : "", redirect: this.props.location?.state?.redirect === "wishlist" ? "wishlist" : '' } }} />
                        )
                        :
                        (
                            <Redirect to="/home-page" />
                        )
                    :
                    (
                        <Route {...this.props} />
                    )
            ) : null;
    }
};