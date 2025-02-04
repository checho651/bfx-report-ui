import React from 'react'
import { Cell, TruncatedFormat } from '@blueprintjs/table'

import JSONFormat from 'ui/JSONFormat'
import { COLUMN_WIDTHS } from 'utils/columns'
import { fixedFloat, formatAmount } from 'ui/utils'

export default function getColumns(props) {
  const {
    filteredData,
    getFullTime,
    t,
    timeOffset,
  } = props

  return [
    {
      id: 'id',
      name: 'column.id',
      width: COLUMN_WIDTHS.INVOICES_ID,
      renderer: (rowIndex) => {
        const { id } = filteredData[rowIndex]
        return (
          <Cell tooltip={id}>
            {id}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].id,
    },
    {
      id: 'amount',
      name: 'column.amount',
      width: COLUMN_WIDTHS.AMOUNT,
      renderer: (rowIndex) => {
        const { amount, currency } = filteredData[rowIndex]
        const tooltip = `${fixedFloat(amount)} ${currency}`
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={tooltip}
          >
            {formatAmount(amount)}
          </Cell>
        )
      },
      copyText: rowIndex => fixedFloat(filteredData[rowIndex].amount),
    },
    {
      id: 'currency',
      name: 'column.currency',
      width: COLUMN_WIDTHS.SYMBOL,
      renderer: (rowIndex) => {
        const { currency } = filteredData[rowIndex]
        return (
          <Cell tooltip={currency}>
            {currency}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].currency,
    },
    {
      id: 'orderId',
      name: 'column.orderid',
      width: COLUMN_WIDTHS.ORDER_ID,
      renderer: (rowIndex) => {
        const { orderId } = filteredData[rowIndex]
        return (
          <Cell tooltip={orderId}>
            {orderId}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].orderId,
    },
    {
      id: 'payCurrencies',
      name: 'column.payCurrencies',
      width: COLUMN_WIDTHS.META,
      renderer: (rowIndex) => {
        const { payCurrencies } = filteredData[rowIndex]
        const formattedPayCurrenciesInfo = JSON.stringify(payCurrencies, undefined, 2)
        return (
          <Cell>
            <JSONFormat content={formattedPayCurrenciesInfo}>
              {formattedPayCurrenciesInfo}
            </JSONFormat>
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].formattedPayCurrenciesInfo,
    },
    {
      id: 'status',
      name: 'column.status',
      width: COLUMN_WIDTHS.ORDER_ID,
      renderer: (rowIndex) => {
        const { status } = filteredData[rowIndex]
        return (
          <Cell tooltip={status}>
            {status}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].status,
    },
    {
      id: 'customerInfo',
      name: 'column.customerInfo',
      width: COLUMN_WIDTHS.META,
      renderer: (rowIndex) => {
        const { customerInfo } = filteredData[rowIndex]
        const formattedCustomerInfo = JSON.stringify(customerInfo, undefined, 2)
        return (
          <Cell>
            <JSONFormat content={formattedCustomerInfo}>
              {formattedCustomerInfo}
            </JSONFormat>
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].customerInfo,
    },
    {
      id: 'invoices',
      name: 'column.invoices',
      width: COLUMN_WIDTHS.META,
      renderer: (rowIndex) => {
        const { invoices } = filteredData[rowIndex]
        const formattedInvoicesInfo = JSON.stringify(invoices, undefined, 2)
        return (
          <Cell>
            <JSONFormat content={formattedInvoicesInfo}>
              {formattedInvoicesInfo}
            </JSONFormat>
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].formattedInvoicesInfo,
    },
    {
      id: 'payment',
      name: 'column.payment',
      width: COLUMN_WIDTHS.META,
      renderer: (rowIndex) => {
        const { payment } = filteredData[rowIndex]
        const formattedPayment = JSON.stringify(payment, undefined, 2)
        return (
          <Cell>
            <JSONFormat content={formattedPayment}>
              {formattedPayment}
            </JSONFormat>
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].formattedPayment,
    },
    {
      id: 'duration',
      name: 'column.duration',
      width: COLUMN_WIDTHS.INVOICES_DURATION,
      renderer: (rowIndex) => {
        const { duration } = filteredData[rowIndex]
        return (
          <Cell>
            {duration}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].duration,
    },
    {
      id: 'merchantName',
      name: 'column.merchantName',
      width: COLUMN_WIDTHS.INVOICES_MERCHANT_NAME,
      renderer: (rowIndex) => {
        const { merchantName } = filteredData[rowIndex]
        return (
          <Cell>
            {merchantName}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].merchantName,
    },
    {
      id: 'redirectUrl',
      name: 'column.redirectUrl',
      width: COLUMN_WIDTHS.INVOICES_REDIRECT_URL,
      renderer: (rowIndex) => {
        const { redirectUrl } = filteredData[rowIndex]
        return (
          <Cell>
            <>
              <a
                target='_blank'
                href={`${redirectUrl}`}
                rel='noopener noreferrer'
              >
                {redirectUrl}
              </a>
            </>
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].redirectUrl,
    },
    {
      id: 'mts',
      nameStr: `${t('column.date')} (${timeOffset})`,
      width: COLUMN_WIDTHS.DATE,
      renderer: (rowIndex) => {
        const timestamp = getFullTime(filteredData[rowIndex].mts)
        return (
          <Cell tooltip={timestamp}>
            <TruncatedFormat>
              {timestamp}
            </TruncatedFormat>
          </Cell>
        )
      },
      copyText: rowIndex => getFullTime(filteredData[rowIndex].mts),
    },
    {
      id: 'webhook',
      name: 'column.webhook',
      width: COLUMN_WIDTHS.INVOICES_WEBHOOK,
      renderer: (rowIndex) => {
        const { webhook } = filteredData[rowIndex]
        return (
          <Cell>
            <>
              <a
                target='_blank'
                href={`${webhook}`}
                rel='noopener noreferrer'
              >
                {webhook}
              </a>
            </>
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].webhook,
    },
  ]
}
