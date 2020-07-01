import React from 'react';
import Web3 from 'web3';
import OceanService from '../service/ocean-service';
import { defaultApplicationRepresentation, ApplicationContext } from './context';
import { ApplicationRepresentation, User } from '../types/type';
import apiService from '../service/api-service';
import oceanService from '../service/ocean-service';

type ApplicationProps = {};
type ApplicationState = {
    renderContext: ApplicationRepresentation;
};

class Application extends React.Component<ApplicationProps, ApplicationState> {
    state: ApplicationState = {
        renderContext: defaultApplicationRepresentation
    };

    web3: Web3 | undefined = undefined;
    api = new apiService('');
    oceanService: OceanService | undefined = undefined;

    getCurrentUser = (users: User[]) => {
        const storedPa = window.localStorage.getItem('pa');
        return users.find(user => user.addr === storedPa || '');
    }

    prepareData = async () => {
        const bounties = await this.api.getBounties();
        const users = await this.api.getUsers();
        const currentUser = this.getCurrentUser(users);
        this.setState({
            renderContext: {
                ...this.state.renderContext,
                user: currentUser,
                bounties,
                users
            }
        });
    }

    hideModal = () => {
        this.setState({
            renderContext: {
                ...this.state.renderContext,
                modalContent: undefined,
            }
        });
    }

    createBounty = async (formData: any) => {
        await this.api.putCreateBounty(formData);
        const bounties = await this.api.getBounties();
        this.setState({
            renderContext: {
                ...this.state.renderContext,
                bounties,
            }
        });
    }

    updateUser = async (addr: string, formData: any) => {
        await this.api.putUpdateUser(addr, formData);
        const users = await this.api.getUsers();
        const currentUser = this.getCurrentUser(users);
        this.setState({
            renderContext: {
                ...this.state.renderContext,
                user: currentUser,
                users
            }
        });
    }

    startWorkOnBounty = async (bountyId: number, addr: string) => {
        await this.api.postUserStartWorkOnBounty(bountyId, addr);
        const users = await this.api.getUsers();
        const bounties = await this.api.getBounties();
        this.setState({
            renderContext: {
                ...this.state.renderContext,
                bounties,
                users
            }
        });
    }

    getBountiesUserWorksOn = async (addr: string) => {
        const userBounties = await this.api.getBountiesUserWorksOn(addr);
        console.log('userBounties ', userBounties);
        this.setState({
            renderContext: {
                ...this.state.renderContext,
                userBounties: {
                    ...this.state.renderContext.userBounties,
                    [addr]: userBounties,
                }
            }
        });
    }

    handleLogIn = async () => {
        if (!(window as any).ethereum) {
            window.alert('Please install MetaMask first.');
            return;
        }

        if (!this.web3) {
            try {
                (window as any).ethereum.enable();
                this.web3 = await new Web3((window as any).ethereum);
            } catch (error) {
                window.alert('You need to allow MetaMask.');
                return;
            }
        }

        const baseProvider = await this.web3.eth.getCoinbase();
        this.oceanService = new OceanService(this.web3);
        if (!baseProvider) {
            window.alert('Please activate MetaMask');
            return;
        }
        this.setState({
            renderContext: {
                ...this.state.renderContext,
                modalContent: (
                    <>
                        <h2>Sign in and verify address</h2>
                        <p>After clicking "Done", a wallet dialogue will prompt you to verify your unique address.
                            Once you verify, you'll be signed in to the network.</p>
                    </>
                ),
                modalAction: this.hideModal
            }
        });
        const publicAddress = baseProvider.toLowerCase();
        await this.api.putCreateUser(publicAddress);
        window.localStorage.setItem('pa', publicAddress);
        const nonceFromBack = 'ed5080e7-0795-4785-9ba1-af75aab20ba6';
        try {
            const signature = await this.web3!.eth.personal.sign(
                `Hi there! Your special nonce: ${nonceFromBack}`,
                publicAddress,
                ''
            );
            this.setState({
                renderContext: {
                    ...this.state.renderContext,
                    user: {addr: publicAddress, signature},
                    modalContent: undefined,
                }
            });
        } catch (err) {
            this.hideModal();
            throw new Error('You need to sign the message to be able to log in.');
        }
    }

    actionAuthRequired = () => {
        this.setState({
            renderContext: {
                ...this.state.renderContext,
                modalContent: (
                    <>
                        <h2>Sign in to use the Network</h2>
                        <p>In order for you to use certain features of the network like creating and fulfilling bounties,
                            commenting, and viewing your network stats, please sign in using your secure wallet.</p>
                    </>
                ),
                modalAction: this.hideModal
            }
        });
    }

    componentDidMount () {
        this.prepareData();
    }

    render () {
        const { renderContext } = this.state;
        const contextValues: ApplicationRepresentation = {
            ...renderContext,
            handleLogIn: this.handleLogIn,
            actionAuthRequired: this.actionAuthRequired,
            createBounty: this.createBounty,
            updateUser: this.updateUser,
            startWorkOnBounty: this.startWorkOnBounty,
            getBountiesUserWorksOn: this.getBountiesUserWorksOn
        };

        return (
            <ApplicationContext.Provider value={contextValues}>
                {this.props.children}
            </ApplicationContext.Provider>
        );
    }
}

export default Application;