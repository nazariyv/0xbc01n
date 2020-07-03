import React from 'react';
import Web3 from 'web3';
import { defaultApplicationRepresentation, ApplicationContext } from './context';
import {ApplicationRepresentation, User, SubmissionData, Bounty, Submission} from '../types/type';
import apiService from '../service/api-service';

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

    getCurrentUser = (users: User[]) => {
        const storedPa = window.localStorage.getItem('pa');
        return users.find(user => user.addr === storedPa || '');
    }

    prepareData = async () => {
        const bounties = await this.api.getBounties();
        const users = await this.api.getUsers();
        const currentUser = this.getCurrentUser(users);
        const userBounties = currentUser && await this.api.getBountiesUserWorksOn(currentUser.addr) || [];
        this.setState({
            renderContext: {
                ...this.state.renderContext,
                modalContent: undefined,
                user: currentUser,
                userBounties,
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
        this.setState({
            renderContext: {
                ...this.state.renderContext,
                userBounties
            }
        });
    }

    submitSubmissionForBounty = async (bountyId: number, data: SubmissionData) => {
        await this.api.postUserSubmitsToBounty(bountyId, data);
        await this.getBountySubmissions(bountyId);
    }

    getBountySubmissions = async (bountyId: number) => {
        const bountySubmissions = await this.api.getSubmissionsForBounty(bountyId);
        this.setState({
            renderContext: {
                ...this.state.renderContext,
                bountySubmissions: {
                    ...this.state.renderContext.bountySubmissions,
                    [bountyId]: bountySubmissions,
                }
            }
        });
    }

    pickBountyWinner = async (bountyId: Bounty['id'], submissionId: Submission['id'], publicAddress: User['addr']) => {
        await this.api.postBountyCreatorPickWinner(bountyId, submissionId, publicAddress);
        const bountySubmissions = await this.api.getSubmissionsForBounty(bountyId);
        const bounties = await this.api.getBounties();
        this.setState({
            renderContext: {
                ...this.state.renderContext,
                bounties,
                bountySubmissions: {
                    ...this.state.renderContext.bountySubmissions,
                    [bountyId]: bountySubmissions
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
        const users = await this.api.getUsers();
        const currentUser = users.find((user: User) => user.addr === publicAddress);
        if (!currentUser) {
            await this.api.putCreateUser(publicAddress);
        }

        window.localStorage.setItem('pa', publicAddress);
        const nonceFromBack = 'ed5080e7-0795-4785-9ba1-af75aab20ba6';

        try {
            await this.web3!.eth.personal.sign(
                `Hi there! Your special nonce: ${nonceFromBack}`,
                publicAddress,
                ''
            );
            await this.prepareData();
        } catch (err) {
            this.hideModal();
            throw new Error('You need to sign the message to be able to log in.');
        }
    }

    handleLogOut = () => {
        window.localStorage.removeItem('pa');
        window.location.reload();
    }

    handleSort = (fieldId: string) => {
        const bountiesSorted = this.state.renderContext.bounties
            .slice(0)
            .sort((a, b) => b[fieldId] - a[fieldId]);
        this.setState({
            renderContext: {
                ...this.state.renderContext,
                bounties: bountiesSorted,
                sortKey: fieldId
            }
        });
    }

    handleFilter = (field: any, type: string) => {
        let filterFields = this.state.renderContext.filterFields.slice(0);
        const filterIndex = filterFields.findIndex((item) => item.name === field.name);
        if (filterIndex !== -1) {
            filterFields.splice(filterIndex, 1);
        } else {
            filterFields.push(field);
        }
        console.log(filterFields);
        const bountiesFiltered = this.state.renderContext.bounties.slice(0).filter((item) => {
            for (let i = 0; i < filterFields.length -1; i++) {
                const filter = filterFields[i];
                if (item[filter.id] === filter.name) {
                    return true;
                }
                return false;
            }
        });
        console.log(bountiesFiltered);

        this.setState({
            renderContext: {
                ...this.state.renderContext,
                filterFields,
            }
        });
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
            getBountiesUserWorksOn: this.getBountiesUserWorksOn,
            submitSubmissionForBounty: this.submitSubmissionForBounty,
            getBountySubmissions: this.getBountySubmissions,
            handleLogOut: this.handleLogOut,
            pickBountyWinner: this.pickBountyWinner,
            onSort: this.handleSort,
            onFilter: this.handleFilter
        };

        return (
            <ApplicationContext.Provider value={contextValues}>
                {this.props.children}
            </ApplicationContext.Provider>
        );
    }
}

export default Application;