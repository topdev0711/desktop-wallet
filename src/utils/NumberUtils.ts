import { scaledBalance, UserAsset } from '../models/UserAsset';
import { Big } from './ChainJsLib';
import { FIXED_DEFAULT_FEE } from '../config/StaticConfig';

export function fromScientificNotation(value) {
  return Big(value).toFixed();
}

// E.g : 1 CRO = 10^8 BASECRO
// eslint-disable-next-line class-methods-use-this
export function getBaseScaledAmount(amount: string, asset: UserAsset): string {
  const exp = Big(10).pow(asset.decimals);
  return Big(amount)
    .times(exp)
    .toFixed();
}
/// E.G : From 5000 BASETRCRO to 0.00005 TCRO
export function getNormalScaleAmount(amount: string, asset: UserAsset): string {
  const exp = Big(10).pow(asset.decimals);
  return Big(amount)
    .div(exp)
    .toFixed();
}

/// Get normal scale amount but fixed to 4 decimals
export function getUINormalScaleAmount(amount: string, decimals: number): string {
  const exp = Big(10).pow(decimals);
  return Big(amount)
    .div(exp)
    .toFixed(4);
}

export function getCurrentMinAssetAmount(userAsset: UserAsset) {
  const exp = Big(10).pow(userAsset.decimals);
  return Big(1)
    .div(exp)
    .toNumber();
}

// When user selects option to send max amount,
// transaction fee gets deduced to the sent amount for the transaction to be successful
export function adjustedTransactionAmount(formAmount: string, walletAsset: UserAsset): string {
  const availableBalance = Big(scaledBalance(walletAsset));
  const fixedFee = getNormalScaleAmount(`${FIXED_DEFAULT_FEE}`, walletAsset);

  const amountAndFee = Big(formAmount).add(fixedFee);
  if (amountAndFee.gt(availableBalance)) {
    return availableBalance.minus(fixedFee).toFixed();
  }
  return formAmount;
}
