import React, { Component } from 'react';
import Layout from '../../components/Layout';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import factory from '../../ethereum/factory';
import { Router } from '../../routes';

class CampaignNew extends Component {
    state = {
        minimumContribution: '',
        errMessage: '',
        loading: false
    };

    onSubmit = async event => {
        event.preventDefault();
        this.setState({loading: true, errMessage: ''});
        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods.createCompaign(this.state.minimumContribution).send({
                from: accounts[0]
            });
            Router.pushRoute('/');
        } catch(err) {
            this.setState({errMessage: err.message});
        }
        this.setState({loading: false});
    }
    render() {
        return (
            <Layout>
            <h3>Create a New Campaign</h3>
            <Form onSubmit={this.onSubmit} error={!!this.state.errMessage}>
                <Form.Field>
                    <label>Minimum Contribution</label>
                    <Input label="wei" labelPosition="right" value={this.state.minimumContribution}
                    onChange={event => this.setState({minimumContribution: event.target.value})}
                    />
                </Form.Field>
                <Message error header="oops!" content={this.state.errMessage}/>
                <Button primary loading={this.state.loading}>Create!</Button>
            </Form>
            </Layout>
        );
    }
}

export default CampaignNew;