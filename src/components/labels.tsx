import { CurrencyContextState } from "../contexts/currencyPair";
import { getTokenName, KnownTokenMap, getPoolName } from "../utils/utils";
import { PoolInfo } from "../models";

export const CREATE_POOL_LABEL = "Create Liquidity Pool";
export const INSUFFICIENT_FUNDS_LABEL = (tokenName: string) =>
  `Insufficient ${tokenName} funds`;
export const POOL_NOT_AVAILABLE = (tokenA: string, tokenB: string) =>
  `Pool ${tokenA}/${tokenB} doesn't exsist`;
export const ADD_LIQUIDITY_LABEL = "Provide Liquidity";
export const SWAP_LABEL = "Swap";
export const CONNECT_LABEL = "Connect Wallet";
export const SELECT_TOKEN_LABEL = "Select a token";
export const ENTER_AMOUNT_LABEL = "Enter an amount";
export const ENTER_COLLATERAL_LABEL = "Enter the amount of collateral";
export const REMOVE_LIQUIDITY_LABEL = "Remove Liquidity";
export const SET_LEVERAGE_RATIO = "Choose a Leverage Ratio";
export const OPEN_POSITION_LABEL = "Open Position";
export const CLOSE_POSITION_LABEL = "Close Position";

export const generateActionLabel = (
  action: string,
  connected: boolean,
  tokenMap: KnownTokenMap,
  A: CurrencyContextState,
  B: CurrencyContextState,
  ignoreToBalance: boolean = false
) => {
  return !connected
    ? CONNECT_LABEL
    : !A.mintAddress
    ? SELECT_TOKEN_LABEL
    : !A.amount
    ? ENTER_AMOUNT_LABEL
    : !B.mintAddress
    ? SELECT_TOKEN_LABEL
    : !B.amount
    ? ENTER_AMOUNT_LABEL
    : !A.sufficientBalance()
    ? INSUFFICIENT_FUNDS_LABEL(getTokenName(tokenMap, A.mintAddress))
    : ignoreToBalance || B.sufficientBalance()
    ? action
    : INSUFFICIENT_FUNDS_LABEL(getTokenName(tokenMap, B.mintAddress));
};

// TODO: We also need to check if there is sufficient reserve
export const generateOpenPositionLabel = (
  action: string,
  connected: boolean,
  leverage: number,
  tokenMap: KnownTokenMap,
  A: CurrencyContextState,
  B: CurrencyContextState,
) => {
  return !connected
    ? CONNECT_LABEL
    : !A.mintAddress
    ? SELECT_TOKEN_LABEL
    : !A.amount
    ? ENTER_COLLATERAL_LABEL
    : leverage <= 1
    ? SET_LEVERAGE_RATIO
    : !B.mintAddress
    ? SELECT_TOKEN_LABEL
    : !A.sufficientBalance()
    ? INSUFFICIENT_FUNDS_LABEL(getTokenName(tokenMap, A.mintAddress))
    : action
};

export const generateRemoveLabel = (
  connected: boolean,
  amount: number,
  pool: PoolInfo,
  tokenMap: KnownTokenMap,
  hasSufficientBalance: boolean,
  ignoreToBalance: boolean = false
) => {
  return !connected
    ? CONNECT_LABEL
    : !amount
    ? ENTER_AMOUNT_LABEL
    : !hasSufficientBalance
    ? INSUFFICIENT_FUNDS_LABEL(getPoolName(tokenMap, pool))
    : REMOVE_LIQUIDITY_LABEL;
};

export const generateExactOneLabel = (
  connected: boolean,
  tokenMap: KnownTokenMap,
  token?: CurrencyContextState
) => {
  return !connected
    ? CONNECT_LABEL
    : !token
    ? SELECT_TOKEN_LABEL
    : !parseFloat(token.amount || "")
    ? ENTER_AMOUNT_LABEL
    : !token.sufficientBalance()
    ? INSUFFICIENT_FUNDS_LABEL(getTokenName(tokenMap, token.mintAddress))
    : ADD_LIQUIDITY_LABEL;
};
