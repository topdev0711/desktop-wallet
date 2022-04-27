import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Form, Tooltip } from 'antd';
import { ethers } from 'ethers';
import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EVM_MINIMUM_GAS_LIMIT, EVM_MINIMUM_GAS_PRICE } from '../../config/StaticConfig';
import { useCronosEvmAsset } from '../../hooks/useCronosEvmAsset';
import { getNormalScaleAmount } from '../../utils/NumberUtils';
import { useCustomGasModalEVM } from './CustomGasModalEVM';

export const GasInfoEVM = () => {

  const asset = useCronosEvmAsset()

  const [t] = useTranslation();
  const gasPrice = useMemo(() => asset?.config?.fee?.networkFee ?? EVM_MINIMUM_GAS_PRICE, [asset]);
  const gasLimit = useMemo(() => asset?.config?.fee?.gasLimit ?? EVM_MINIMUM_GAS_LIMIT, [asset]);
  const [readableGasFee, setReadableGasFee] = useState('')

  const updateFee = (newGasPrice: string, newGasLimit: string) => {

    const amountBigNumber = ethers.BigNumber.from(newGasLimit).mul(ethers.BigNumber.from(newGasPrice))

    const amount = getNormalScaleAmount(amountBigNumber.toString(), asset!)

    setReadableGasFee(`${amount} ${asset!.symbol}`);
  }

  useEffect(() => {
    if (!asset) {
      return;
    }
    updateFee(gasPrice, gasLimit);
  }, [gasPrice, gasLimit]);

  return <>
    <div className="item">
      <div className="label">{t('estimate-network-fee')}</div>
      <div>{readableGasFee}</div>
    </div>
    <div className='item'>

      <div className="label">{t('estimate-time')}</div>
      <div>6s</div>
    </div>
  </>
}

const GasStep = (props: { isUsingCustomFee: boolean }) => {

  const [t] = useTranslation();
  if (props.isUsingCustomFee) {
    return <>
      <p style={{
        marginBottom: "0px",
      }}>{t('custom')}</p>
      <p style={{
        marginBottom: "0px",
        color: "#7B849B"
      }}>{`${t('estimate-time')}: 1~24 ${t('general.hours').toLowerCase()}`}</p>
    </>
  }

  return <>
    <p style={{
      marginBottom: "0px",
    }}>{t('general.walletType.normal')}</p>
    <p style={{
      marginBottom: "0px",
      color: "#7B849B"
    }}>{`${t('estimate-time')}: 6s`}</p>
  </>
}



const GasStepSelectEVM = (props: {
  onChange?: (gasLimit: number, gasPrice: number) => void,
}) => {

  const asset = useCronosEvmAsset();

  const [t] = useTranslation();
  const [gasPrice, setGasPrice] = useState(asset?.config?.fee?.networkFee ?? EVM_MINIMUM_GAS_PRICE);
  const [gasLimit, setGasLimit] = useState(asset?.config?.fee?.gasLimit ?? EVM_MINIMUM_GAS_LIMIT);
  const [isUsingCustomGas, setIsUsingCustomGas] = useState(false)

  const { show, dismiss } = useCustomGasModalEVM(asset!, gasPrice, gasLimit);

  const [readableGasFee, setReadableGasFee] = useState('')

  const updateFee = (newGasPrice: string, newGasLimit: string) => {

    if (newGasPrice !== EVM_MINIMUM_GAS_PRICE || newGasLimit !== EVM_MINIMUM_GAS_LIMIT) {
      setIsUsingCustomGas(true)
    }

    const amountBigNumber = ethers.BigNumber.from(newGasLimit).mul(ethers.BigNumber.from(newGasPrice))

    const amount = getNormalScaleAmount(amountBigNumber.toString(), asset!)

    setReadableGasFee(`${amount} ${asset!.symbol}`);
  }

  useEffect(() => {
    if (!asset) {
      return;
    }
    updateFee(gasPrice, gasLimit);
  }, [gasPrice, gasLimit]);

  return <Form.Item label={
    <div style={{
      display: 'flex',
      alignItems: 'center',
    }}>
      <div style={{ marginRight: 4 }}>
        {t('confirmation-speed')}
      </div>
      <Tooltip
        style={{ cursor: "pointer" }}
        title={t('sending-crypto-on-blockchain-requires-confirmation')}>
        <ExclamationCircleOutlined style={{ color: '#1199fa', cursor: "pointer" }} />
      </Tooltip>
    </div>}>
    <div style={{
      display: "flex",
      background: "#F7F7F7",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "14px",
    }}>
      <div style={{
        display: 'flex',
        flexDirection: "column",
        alignItems: 'flex-start',
      }}>
        <GasStep isUsingCustomFee={isUsingCustomGas} />
      </div>
      <p style={{
        marginBottom: "0px"
      }}>{readableGasFee}</p>
    </div>
    <a style={{ float: "right", marginTop: "4px" }} onClick={() => {
      show({
        onCancel: () => { },
        onSuccess: (newGasLimit, newGasFee) => {
          props.onChange?.(newGasLimit, newGasFee);
          dismiss();

          setGasLimit(newGasLimit.toString())
          setGasPrice(newGasFee.toString())
          updateFee(newGasFee.toString(), newGasLimit.toString());
        }
      })
    }}>{t('custom-options')}</a>
  </Form.Item>
}

export default GasStepSelectEVM;
