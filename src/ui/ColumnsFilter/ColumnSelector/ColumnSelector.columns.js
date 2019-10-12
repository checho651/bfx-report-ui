import queryConstants from 'state/query/constants'
import DATA_TYPES from 'var/dataTypes'

const {
  MENU_LEDGERS,
  MENU_TRADES,
  MENU_ORDERS,
  MENU_MOVEMENTS,
  MENU_POSITIONS,
  MENU_FOFFER,
  MENU_FLOAN,
  MENU_FCREDIT,
  MENU_FPAYMENT,
  MENU_PUBLIC_TRADES,
  MENU_PUBLIC_FUNDING,
  MENU_TICKERS,
  MENU_DERIVATIVES,
} = queryConstants

const {
  NUMBER,
  INTEGER,
  STRING,
} = DATA_TYPES

const LEDGERS_COLUMNS = [
  // { id: 'id', name: 'id' },
  { id: 'description', name: 'description', type: STRING },
  // { id: 'currency', name: 'currency' },
  { id: 'amount', name: 'amount', type: NUMBER },
  { id: 'amountUsd', name: 'amountUsd', type: NUMBER },
  { id: 'balance', name: 'balance', type: NUMBER },
  { id: 'balanceUsd', name: 'balanceUsd', type: NUMBER },
  // { id: 'mts', name: 'date' },
  { id: 'wallet', name: 'wallet', type: STRING },
]

const SECTION_COLUMNS = {
  [MENU_LEDGERS]: LEDGERS_COLUMNS,

  [MENU_TRADES]: [
    { id: 'id', name: 'id', type: INTEGER },
    { id: 'orderID', name: 'orderid', type: INTEGER },
    // { id: 'symbol', name: 'pair' },
    { id: 'execAmount', name: 'amount', type: NUMBER },
    { id: 'execPrice', name: 'price', type: NUMBER },
    // { id: 'orderType', name: 'orderType' },
    // { id: 'orderPrice', name: 'orderPrice' },
    { id: 'fee', name: 'fee', type: NUMBER },
    // { id: 'feeCurrency', name: 'feeCurrency' },
    // { id: 'maker', name: 'maker' },
    // { id: 'mtsCreate', name: 'time' },
  ],

  [MENU_ORDERS]: [
    { id: 'id', name: 'id', type: INTEGER },
    // { id: 'gid', name: 'gid' },
    // { id: 'cid', name: 'cid' },
    // { id: 'symbol', name: 'pair' },
    { id: 'type', name: 'type', type: STRING },
    // { id: 'flags', name: 'flags' },
    // { id: 'amount', name: 'amount' },
    { id: 'amountOrig', name: 'amount', type: NUMBER },
    { id: 'amountExecuted', name: 'amount-exe', type: NUMBER },
    { id: 'price', name: 'price', type: NUMBER },
    { id: 'priceAvg', name: 'avgprice', type: NUMBER },
    // { id: 'mtsCreate', name: 'create' },
    // { id: 'mtsUpdate', name: 'update' },
    { id: 'status', name: 'status', type: STRING },
    { id: 'priceTrailing', name: 'pricetrail', type: NUMBER },
    // { id: 'priceAuxLimit', name: 'priceAuxLimit' },
    // { id: 'notify', name: 'notify' },
    // { id: 'placedId', name: 'placedId' },
    { id: 'typePrev', name: 'typeprev', type: STRING },
  ],

  [MENU_MOVEMENTS]: [
    { id: 'id', name: 'id', type: INTEGER },
    // { id: 'mtsStarted', name: 'mtsStarted' },
    // { id: 'mtsUpdated', name: 'date' },
    // { id: 'currency', name: 'currency' },
    // { id: 'currencyName', name: 'currencyName' },
    { id: 'status', name: 'status', type: STRING },
    { id: 'amount', name: 'amount', type: NUMBER },
    { id: 'amountUsd', name: 'amountUsd', type: NUMBER },
    { id: 'fees', name: 'fees', type: NUMBER },
    { id: 'destinationAddress', name: 'destination', type: STRING },
    { id: 'transactionId', name: 'transactionId', type: STRING },
  ],

  [MENU_POSITIONS]: [
    { id: 'id', name: 'id', type: INTEGER },
    // { id: 'symbol', name: 'pair' },
    { id: 'amount', name: 'amount', type: NUMBER },
    { id: 'basePrice', name: 'base-price', type: NUMBER },
    // { id: 'liquidationPrice', name: 'liquidationPrice' },
    // { id: 'pl', name: 'pl' },
    // { id: 'plPerc', name: 'plPerc' },
    // { id: 'closePrice', name: 'closePrice' },
    { id: 'marginFunding', name: 'swap', type: NUMBER },
    { id: 'marginFundingType', name: 'swap-type', type: INTEGER },
    { id: 'status', name: 'status', type: STRING },
    // { id: 'leverage', name: 'leverage' },
    // { id: 'placeholder', name: 'placeholder' },
    // { id: 'mtsCreate', name: 'mtsCreate' },
    // { id: 'mtsUpdate', name: 'update' },
  ],

  [MENU_FOFFER]: [
    { id: 'id', name: 'id', type: INTEGER },
    // { id: 'symbol', name: 'pair' },
    // { id: 'amount', name: 'amount' },
    { id: 'amountOrig', name: 'amount', type: NUMBER },
    { id: 'amountExecuted', name: 'amount-exe', type: INTEGER },
    { id: 'type', name: 'type', type: STRING },
    // { id: 'flags', name: 'flags' },
    { id: 'status', name: 'status', type: STRING },
    { id: 'rate', name: 'rate', type: STRING },
    // { id: 'rateReal', name: 'rateReal' },
    { id: 'period', name: 'period', type: INTEGER },
    // { id: 'notify', name: 'notify' },
    // { id: 'hidden', name: 'hidden' },
    // { id: 'renew', name: 'renew' },
    // { id: 'mtsCreate', name: 'mtsCreate' },
    // { id: 'mtsUpdate', name: 'date' },
  ],

  [MENU_FLOAN]: [
    { id: 'id', name: 'id', type: INTEGER },
    // { id: 'symbol', name: 'symbol' },
    { id: 'side', name: 'side', type: INTEGER },
    { id: 'amount', name: 'amount', type: NUMBER },
    // { id: 'flags', name: 'flags' },
    { id: 'status', name: 'status', type: STRING },
    { id: 'rate', name: 'rate', type: STRING },
    // { id: 'rateReal', name: 'rateReal' },
    { id: 'period', name: 'period', type: INTEGER },
    // { id: 'mtsOpening', name: 'opening' },
    // { id: 'mtsLastPayout', name: 'close' },
    // { id: 'mtsCreate', name: 'mtsCreate' },
    // { id: 'mtsUpdate', name: 'date' },
    // { id: 'notify', name: 'notify' },
    // { id: 'hidden', name: 'hidden' },
    // { id: 'renew', name: 'renew' },
    // { id: 'noClose', name: 'noClose' },
  ],

  [MENU_FCREDIT]: [
    { id: 'id', name: 'id', type: INTEGER },
    // { id: 'symbol', name: 'symbol' },
    { id: 'side', name: 'side', type: INTEGER },
    { id: 'amount', name: 'amount', type: NUMBER },
    // { id: 'flags', name: 'flags' },
    { id: 'status', name: 'status', type: STRING },
    { id: 'rate', name: 'rate', type: STRING },
    // { id: 'rateReal', name: 'rateReal' },
    { id: 'period', name: 'period', type: INTEGER },
    // { id: 'mtsOpening', name: 'opening' },
    // { id: 'mtsLastPayout', name: 'lastpayout' },
    { id: 'positionPair', name: 'positionpair', type: STRING },
    // { id: 'mtsCreate', name: 'mtsCreate' },
    // { id: 'mtsUpdate', name: 'date' },
    // { id: 'notify', name: 'notify' },
    // { id: 'hidden', name: 'hidden' },
    // { id: 'renew', name: 'renew' },
    // { id: 'noClose', name: 'noClose' },
  ],

  [MENU_FPAYMENT]: LEDGERS_COLUMNS,

  [MENU_PUBLIC_TRADES]: [
    { id: 'id', name: 'id', type: INTEGER },
    // { id: 'mts', name: 'time' },
    // { id: 'rate', name: 'rate' },
    // { id: 'period', name: 'period' },
    // { id: 'type', name: 'type' }, // custom column added on front
    { id: 'price', name: 'price', type: NUMBER },
    { id: 'amount', name: 'amount', type: NUMBER },
    // { id: 'symbol', name: 'pair' }, // custom column added on front
  ],

  // not currently used
  [MENU_PUBLIC_FUNDING]: [
    { id: 'id', name: 'id', type: INTEGER },
    // { id: 'mts', name: 'time' },
    { id: 'amount', name: 'amount', type: NUMBER },
    { id: 'rate', name: 'rate', type: NUMBER },
    { id: 'period', name: 'period', type: INTEGER },
    // { id: 'currency', name: 'currency' }, // custom column added on front
  ],

  [MENU_TICKERS]: [
    // { id: 'pair', name: 'pair' },
    { id: 'bid', name: 'bid', type: NUMBER },
    // { id: 'bidPeriod', name: 'bidPeriod' },
    { id: 'ask', name: 'ask', type: NUMBER },
    // { id: 'mtsUpdate', name: 'time' },
  ],

  [MENU_DERIVATIVES]: [
    // { id: 'key', name: 'pair' },
    { id: 'price', name: 'priceDeriv', type: NUMBER },
    { id: 'priceSpot', name: 'priceSpot', type: NUMBER },
    { id: 'fundBal', name: 'fundBalance', type: NUMBER },
    { id: 'fundingAccrued', name: 'fundingAccrued', type: NUMBER },
    { id: 'fundingStep', name: 'fundingStep', type: NUMBER },
    // { id: 'timestamp', name: 'update' },
  ],
}

export default SECTION_COLUMNS
