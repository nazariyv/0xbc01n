import React from 'react';
import AuthService from '../service/auth-service';
import { defaultApplicationRepresentation, ApplicationContext } from './context';
import { ApplicationRepresentation } from '../types/type';

type ApplicationProps = {};
type ApplicationState = {
    renderContext: ApplicationRepresentation;
};

class Application extends React.Component<ApplicationProps, ApplicationState> {
    state: ApplicationState = {
        renderContext: defaultApplicationRepresentation,
    };

    authService = new AuthService();

    prepareData = () => {
        //this.authService.update();
        this.setState({ 
            renderContext: { 
                ...this.state.renderContext,
            }, 
        });
    };

    componentDidMount () {
        this.prepareData();
    }

    render () {
        const { renderContext } = this.state;
        const contextValues: ApplicationRepresentation = {
            ...renderContext,
        };
        return (
            <ApplicationContext.Provider value={contextValues}>
                {this.props.children}
            </ApplicationContext.Provider>
        );
    }
}

export default Application;