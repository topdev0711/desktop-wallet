import React, { useEffect, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Big from 'big.js';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AutoComplete, FormInstance, Table, Tooltip } from 'antd';

import './LedgerAddressIndexBalanceTable.less';

import { UserAssetType } from '../../../models/UserAsset';

const LedgerAddressIndexBalanceTable = (props: {
  addressIndexBalanceList;
  form?: FormInstance;
  // eslint-disable-next-line react/no-unused-prop-types
  assetType: UserAssetType;
  setisHWModeSelected?: (value: boolean) => void;
}) => {
  const { addressIndexBalanceList: rawAddressIndexBalanceList, form, setisHWModeSelected } = props;
  const [addressIndexBalanceList, setAddressIndexBalanceList] = useState<any[]>([]);

  const [t] = useTranslation();

  const tableColumns = [
    {
      title: 'Address',
      dataIndex: 'publicAddress',
      key: 'publicAddress',
      render: publicAddress => publicAddress,
    },
    {
      title: 'Derivation Path',
      dataIndex: 'derivationPath',
      key: 'derivationPath',
      // sorter: (a, b) => new Big(a.currentTokens).cmp(new Big(b.currentTokens)),
      // defaultSortOrder: 'descend' as any,
      render: derivationPath => {
        return <span>{derivationPath}</span>;
      },
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
      // sorter: (a, b) => new Big(a.cumulativeShares).cmp(new Big(b.cumulativeShares)),
      // defaultSortOrder: 'descend' as any,
      render: balance => {
        return (
          <>
            <span>{balance.toString()}</span>
          </>
        );
      },
    },
    {
      title: t('general.action'),
      key: 'action',
      render: record => (
        <a
          onClick={() => {
            if (setisHWModeSelected) {
              setisHWModeSelected(false);
            }
            if (form) {
              form.setFieldsValue({
                addressIndex: record.derivationPath,
              });
            }
          }}
        >
          {t('general.select')}
        </a>
      ),
    },
  ];

  const processLedgerAccountsList = async (ledgerAccountList: any[] | null) => {
    return ledgerAccountList || [];
  };

  useEffect(() => {
    const syncAddressIndexBalanceList = async () => {
      const validatorList = await processLedgerAccountsList(rawAddressIndexBalanceList);
      setAddressIndexBalanceList(validatorList);
    };

    syncAddressIndexBalanceList();
  }, rawAddressIndexBalanceList);

  return (
    <div className="address-index-balance-list">
      <Table
        locale={{
          triggerDesc: t('general.table.triggerDesc'),
          triggerAsc: t('general.table.triggerAsc'),
          cancelSort: t('general.table.cancelSort'),
        }}
        dataSource={addressIndexBalanceList}
        columns={tableColumns}
        pagination={{ showSizeChanger: false }}
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onChange={(pagination, filters, sorter: any) => {}}
        defaultExpandAllRows
      />
    </div>
  );
};

export default LedgerAddressIndexBalanceTable;
