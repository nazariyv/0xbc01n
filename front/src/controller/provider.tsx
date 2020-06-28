import React from 'react';
import Web3 from 'web3';
import { defaultApplicationRepresentation, ApplicationContext } from './context';
import { ApplicationRepresentation } from '../types/type';

type ApplicationProps = {};
type ApplicationState = {
    renderContext: ApplicationRepresentation;
};

class Application extends React.Component<ApplicationProps, ApplicationState> {
    state: ApplicationState = {
        renderContext: defaultApplicationRepresentation
    };

    web3: Web3 | undefined = undefined;

    prepareData = () => {
        this.setState({
            renderContext: {
                ...this.state.renderContext
            }
        });
    }

    handleLogIn = async () => {
        // Step 1: Check MetaMask

        if (!(window as any).ethereum) {
            window.alert('Please install MetaMask first.');
            return;
        }

        if (!this.web3) {
            try {
                (window as any).ethereum.enable();
                // injected provider given by MetaMask
                this.web3 = await new Web3((window as any).ethereum);
            } catch (error) {
                window.alert('You need to allow MetaMask.');
                return;
            }
        }

        const baseProvider = await this.web3.eth.getCoinbase();
        if (!baseProvider) {
            window.alert('Please activate MetaMask');
            return;
        }

        const publicAddress = baseProvider.toLowerCase();
        // Step 2: Send here publicAddress to backend
        const nonceFromBack = 'ed5080e7-0795-4785-9ba1-af75aab20ba6';
        // Step 3: MetaMask confirmation modal to sign message
        try {
            const signature = await this.web3!.eth.personal.sign(
                `Hi there! Your special nonce: ${nonceFromBack}`,
                publicAddress,
                ''
            );
            // Done hide login menu and show user profile
            this.setState({
                renderContext: {
                    ...this.state.renderContext,
                    user: {publicAddress, signature}
                }
            });
            // Step 4: Collect user information
        } catch (err) {
            throw new Error('You need to sign the message to be able to log in.');
        }
    }

    componentDidMount () {
        this.prepareData();
    }

    render () {
        const { renderContext } = this.state;
        const contextValues: ApplicationRepresentation = {
            ...renderContext,
            handleLogIn: this.handleLogIn
        };

        return (
            <ApplicationContext.Provider value={contextValues}>
                {this.props.children}
            </ApplicationContext.Provider>
        );
    }
}

export default Application;