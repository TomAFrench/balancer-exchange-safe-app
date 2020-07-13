import React from 'react';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import Web3ReactManager from 'components/Web3ReactManager';
import SwapForm from 'components/SwapForm';
import { isAddress, toChecksum } from 'utils/helpers';
import './App.css';
import BalancerExplainer from 'components/BalancerExplainer';

const BuildVersion = styled.div`
    display: flex;
    flex-direction: row;
    text-align: center;
    margin: 20px;
    font-size: 10px;
    color: var(--body-text);
    position: fixed;
    bottom: 0px;
    @media screen and (max-width: 1024px) {
        display: none;
    }
`;

const BuildLink = styled.a`
    color: var(--body-text);
    text-decoration: none;
    margin-left: 5px;
`;

const OuterWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;

const PoolSwapView = props => {
    let { tokenIn, tokenOut } = props.match.params;
    if (isAddress(tokenIn)) {
        tokenIn = toChecksum(tokenIn);
    }
    if (isAddress(tokenOut)) {
        tokenOut = toChecksum(tokenOut);
    }
    return <SwapForm tokenIn={tokenIn} tokenOut={tokenOut} />;
};

const Views = () => (
    <Switch>
        <Route
            path="/swap/:tokenIn?/:tokenOut?"
            component={PoolSwapView}
        />
        <Redirect from="/" to="/swap" />
    </Switch>
)

const buildId = process.env.REACT_APP_COMMIT_REF || '';

const App = () => (
    <Web3ReactManager>
        <HashRouter>
            <OuterWrapper>
                <Views/>
                <BalancerExplainer />
            </OuterWrapper>
            <BuildVersion>
                BUILD ID:{' '}
                <BuildLink
                    href={`https://github.com/balancer-labs/balancer-exchange/tree/${buildId}`}
                    target="_blank"
                >
                    {buildId.substring(0, 12)}
                </BuildLink>
            </BuildVersion>
        </HashRouter>
    </Web3ReactManager>
);

export default App;
