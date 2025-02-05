// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace InventorymanagerTypes {
  export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigDecimal: { input: any; output: any; }
  BigInt: { input: any; output: any; }
  Bytes: { input: any; output: any; }
  Int8: { input: any; output: any; }
  Timestamp: { input: any; output: any; }
};

export type Aggregation_interval =
  | 'hour'
  | 'day';

export type BlockChangedFilter = {
  number_gte: Scalars['Int']['input'];
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  number_gte?: InputMaybe<Scalars['Int']['input']>;
};

export type ItemAdded = {
  id: Scalars['Bytes']['output'];
  itemId: Scalars['BigInt']['output'];
  name: Scalars['String']['output'];
  quantity: Scalars['BigInt']['output'];
  threshold: Scalars['BigInt']['output'];
  price: Scalars['BigInt']['output'];
  supplier: Scalars['String']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type ItemAdded_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  itemId?: InputMaybe<Scalars['BigInt']['input']>;
  itemId_not?: InputMaybe<Scalars['BigInt']['input']>;
  itemId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  itemId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  itemId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  itemId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  itemId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  itemId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  quantity?: InputMaybe<Scalars['BigInt']['input']>;
  quantity_not?: InputMaybe<Scalars['BigInt']['input']>;
  quantity_gt?: InputMaybe<Scalars['BigInt']['input']>;
  quantity_lt?: InputMaybe<Scalars['BigInt']['input']>;
  quantity_gte?: InputMaybe<Scalars['BigInt']['input']>;
  quantity_lte?: InputMaybe<Scalars['BigInt']['input']>;
  quantity_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  quantity_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  threshold?: InputMaybe<Scalars['BigInt']['input']>;
  threshold_not?: InputMaybe<Scalars['BigInt']['input']>;
  threshold_gt?: InputMaybe<Scalars['BigInt']['input']>;
  threshold_lt?: InputMaybe<Scalars['BigInt']['input']>;
  threshold_gte?: InputMaybe<Scalars['BigInt']['input']>;
  threshold_lte?: InputMaybe<Scalars['BigInt']['input']>;
  threshold_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  threshold_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  price?: InputMaybe<Scalars['BigInt']['input']>;
  price_not?: InputMaybe<Scalars['BigInt']['input']>;
  price_gt?: InputMaybe<Scalars['BigInt']['input']>;
  price_lt?: InputMaybe<Scalars['BigInt']['input']>;
  price_gte?: InputMaybe<Scalars['BigInt']['input']>;
  price_lte?: InputMaybe<Scalars['BigInt']['input']>;
  price_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  price_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  supplier?: InputMaybe<Scalars['String']['input']>;
  supplier_not?: InputMaybe<Scalars['String']['input']>;
  supplier_gt?: InputMaybe<Scalars['String']['input']>;
  supplier_lt?: InputMaybe<Scalars['String']['input']>;
  supplier_gte?: InputMaybe<Scalars['String']['input']>;
  supplier_lte?: InputMaybe<Scalars['String']['input']>;
  supplier_in?: InputMaybe<Array<Scalars['String']['input']>>;
  supplier_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  supplier_contains?: InputMaybe<Scalars['String']['input']>;
  supplier_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  supplier_not_contains?: InputMaybe<Scalars['String']['input']>;
  supplier_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  supplier_starts_with?: InputMaybe<Scalars['String']['input']>;
  supplier_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  supplier_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  supplier_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  supplier_ends_with?: InputMaybe<Scalars['String']['input']>;
  supplier_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  supplier_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  supplier_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ItemAdded_filter>>>;
  or?: InputMaybe<Array<InputMaybe<ItemAdded_filter>>>;
};

export type ItemAdded_orderBy =
  | 'id'
  | 'itemId'
  | 'name'
  | 'quantity'
  | 'threshold'
  | 'price'
  | 'supplier'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type LowStockDetected = {
  id: Scalars['Bytes']['output'];
  itemId: Scalars['BigInt']['output'];
  name: Scalars['String']['output'];
  quantity: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type LowStockDetected_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  itemId?: InputMaybe<Scalars['BigInt']['input']>;
  itemId_not?: InputMaybe<Scalars['BigInt']['input']>;
  itemId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  itemId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  itemId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  itemId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  itemId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  itemId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  quantity?: InputMaybe<Scalars['BigInt']['input']>;
  quantity_not?: InputMaybe<Scalars['BigInt']['input']>;
  quantity_gt?: InputMaybe<Scalars['BigInt']['input']>;
  quantity_lt?: InputMaybe<Scalars['BigInt']['input']>;
  quantity_gte?: InputMaybe<Scalars['BigInt']['input']>;
  quantity_lte?: InputMaybe<Scalars['BigInt']['input']>;
  quantity_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  quantity_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<LowStockDetected_filter>>>;
  or?: InputMaybe<Array<InputMaybe<LowStockDetected_filter>>>;
};

export type LowStockDetected_orderBy =
  | 'id'
  | 'itemId'
  | 'name'
  | 'quantity'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type Query = {
  supplier?: Maybe<Supplier>;
  suppliers: Array<Supplier>;
  itemAdded?: Maybe<ItemAdded>;
  itemAddeds: Array<ItemAdded>;
  lowStockDetected?: Maybe<LowStockDetected>;
  lowStockDetecteds: Array<LowStockDetected>;
  restockInitiated?: Maybe<RestockInitiated>;
  restockInitiateds: Array<RestockInitiated>;
  stockDecreased?: Maybe<StockDecreased>;
  stockDecreaseds: Array<StockDecreased>;
  stockDecreasedData?: Maybe<StockDecreasedData>;
  stockDecreasedDatas: Array<StockDecreasedData>;
  stockIncreased?: Maybe<StockIncreased>;
  stockIncreaseds: Array<StockIncreased>;
  /** Collection of aggregated `StockDecreasedAggregation` values */
  stockDecreasedAggregations: Array<StockDecreasedAggregation>;
  SupplierSearch: Array<Supplier>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type QuerysupplierArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerysuppliersArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Supplier_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Supplier_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryitemAddedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryitemAddedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ItemAdded_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ItemAdded_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerylowStockDetectedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerylowStockDetectedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<LowStockDetected_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<LowStockDetected_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryrestockInitiatedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryrestockInitiatedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RestockInitiated_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<RestockInitiated_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerystockDecreasedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerystockDecreasedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<StockDecreased_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<StockDecreased_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerystockDecreasedDataArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerystockDecreasedDatasArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<StockDecreasedData_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<StockDecreasedData_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerystockIncreasedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerystockIncreasedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<StockIncreased_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<StockIncreased_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerystockDecreasedAggregationsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  interval: Aggregation_interval;
  where?: InputMaybe<StockDecreasedAggregation_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerySupplierSearchArgs = {
  text: Scalars['String']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  block?: InputMaybe<Block_height>;
  where?: InputMaybe<Supplier_filter>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type RestockInitiated = {
  id: Scalars['Bytes']['output'];
  itemId: Scalars['BigInt']['output'];
  restockAmount: Scalars['BigInt']['output'];
  supplier: Scalars['String']['output'];
  totalCost: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type RestockInitiated_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  itemId?: InputMaybe<Scalars['BigInt']['input']>;
  itemId_not?: InputMaybe<Scalars['BigInt']['input']>;
  itemId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  itemId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  itemId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  itemId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  itemId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  itemId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  restockAmount?: InputMaybe<Scalars['BigInt']['input']>;
  restockAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  restockAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  restockAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  restockAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  restockAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  restockAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  restockAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  supplier?: InputMaybe<Scalars['String']['input']>;
  supplier_not?: InputMaybe<Scalars['String']['input']>;
  supplier_gt?: InputMaybe<Scalars['String']['input']>;
  supplier_lt?: InputMaybe<Scalars['String']['input']>;
  supplier_gte?: InputMaybe<Scalars['String']['input']>;
  supplier_lte?: InputMaybe<Scalars['String']['input']>;
  supplier_in?: InputMaybe<Array<Scalars['String']['input']>>;
  supplier_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  supplier_contains?: InputMaybe<Scalars['String']['input']>;
  supplier_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  supplier_not_contains?: InputMaybe<Scalars['String']['input']>;
  supplier_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  supplier_starts_with?: InputMaybe<Scalars['String']['input']>;
  supplier_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  supplier_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  supplier_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  supplier_ends_with?: InputMaybe<Scalars['String']['input']>;
  supplier_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  supplier_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  supplier_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  totalCost?: InputMaybe<Scalars['BigInt']['input']>;
  totalCost_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalCost_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalCost_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalCost_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalCost_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalCost_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalCost_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<RestockInitiated_filter>>>;
  or?: InputMaybe<Array<InputMaybe<RestockInitiated_filter>>>;
};

export type RestockInitiated_orderBy =
  | 'id'
  | 'itemId'
  | 'restockAmount'
  | 'supplier'
  | 'totalCost'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type StockDecreased = {
  id: Scalars['Bytes']['output'];
  itemId: Scalars['BigInt']['output'];
  amount: Scalars['BigInt']['output'];
  newQuantity: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type StockDecreasedAggregation = {
  id: Scalars['Int8']['output'];
  itemId: Scalars['BigInt']['output'];
  totalAmount: Scalars['BigInt']['output'];
  timestamp: Scalars['Timestamp']['output'];
};

export type StockDecreasedAggregation_filter = {
  id?: InputMaybe<Scalars['Int8']['input']>;
  id_gt?: InputMaybe<Scalars['Int8']['input']>;
  id_lt?: InputMaybe<Scalars['Int8']['input']>;
  id_gte?: InputMaybe<Scalars['Int8']['input']>;
  id_lte?: InputMaybe<Scalars['Int8']['input']>;
  id_in?: InputMaybe<Array<Scalars['Int8']['input']>>;
  itemId?: InputMaybe<Scalars['BigInt']['input']>;
  itemId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  itemId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  itemId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  itemId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  itemId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_gt?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_lt?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_gte?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_lte?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['Timestamp']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<StockDecreasedAggregation_filter>>>;
  or?: InputMaybe<Array<InputMaybe<StockDecreasedAggregation_filter>>>;
};

export type StockDecreasedData = {
  id: Scalars['Int8']['output'];
  itemId: Scalars['BigInt']['output'];
  amount: Scalars['BigInt']['output'];
  newQuantity: Scalars['BigInt']['output'];
  timestamp: Scalars['Timestamp']['output'];
};

export type StockDecreasedData_filter = {
  id?: InputMaybe<Scalars['Int8']['input']>;
  id_not?: InputMaybe<Scalars['Int8']['input']>;
  id_gt?: InputMaybe<Scalars['Int8']['input']>;
  id_lt?: InputMaybe<Scalars['Int8']['input']>;
  id_gte?: InputMaybe<Scalars['Int8']['input']>;
  id_lte?: InputMaybe<Scalars['Int8']['input']>;
  id_in?: InputMaybe<Array<Scalars['Int8']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Int8']['input']>>;
  itemId?: InputMaybe<Scalars['BigInt']['input']>;
  itemId_not?: InputMaybe<Scalars['BigInt']['input']>;
  itemId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  itemId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  itemId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  itemId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  itemId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  itemId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  newQuantity?: InputMaybe<Scalars['BigInt']['input']>;
  newQuantity_not?: InputMaybe<Scalars['BigInt']['input']>;
  newQuantity_gt?: InputMaybe<Scalars['BigInt']['input']>;
  newQuantity_lt?: InputMaybe<Scalars['BigInt']['input']>;
  newQuantity_gte?: InputMaybe<Scalars['BigInt']['input']>;
  newQuantity_lte?: InputMaybe<Scalars['BigInt']['input']>;
  newQuantity_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  newQuantity_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_not?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_gt?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_lt?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_gte?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_lte?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['Timestamp']['input']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Timestamp']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<StockDecreasedData_filter>>>;
  or?: InputMaybe<Array<InputMaybe<StockDecreasedData_filter>>>;
};

export type StockDecreasedData_orderBy =
  | 'id'
  | 'itemId'
  | 'amount'
  | 'newQuantity'
  | 'timestamp';

export type StockDecreased_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  itemId?: InputMaybe<Scalars['BigInt']['input']>;
  itemId_not?: InputMaybe<Scalars['BigInt']['input']>;
  itemId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  itemId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  itemId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  itemId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  itemId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  itemId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  newQuantity?: InputMaybe<Scalars['BigInt']['input']>;
  newQuantity_not?: InputMaybe<Scalars['BigInt']['input']>;
  newQuantity_gt?: InputMaybe<Scalars['BigInt']['input']>;
  newQuantity_lt?: InputMaybe<Scalars['BigInt']['input']>;
  newQuantity_gte?: InputMaybe<Scalars['BigInt']['input']>;
  newQuantity_lte?: InputMaybe<Scalars['BigInt']['input']>;
  newQuantity_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  newQuantity_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<StockDecreased_filter>>>;
  or?: InputMaybe<Array<InputMaybe<StockDecreased_filter>>>;
};

export type StockDecreased_orderBy =
  | 'id'
  | 'itemId'
  | 'amount'
  | 'newQuantity'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type StockIncreased = {
  id: Scalars['Bytes']['output'];
  itemId: Scalars['BigInt']['output'];
  amount: Scalars['BigInt']['output'];
  newQuantity: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type StockIncreased_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  itemId?: InputMaybe<Scalars['BigInt']['input']>;
  itemId_not?: InputMaybe<Scalars['BigInt']['input']>;
  itemId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  itemId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  itemId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  itemId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  itemId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  itemId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  newQuantity?: InputMaybe<Scalars['BigInt']['input']>;
  newQuantity_not?: InputMaybe<Scalars['BigInt']['input']>;
  newQuantity_gt?: InputMaybe<Scalars['BigInt']['input']>;
  newQuantity_lt?: InputMaybe<Scalars['BigInt']['input']>;
  newQuantity_gte?: InputMaybe<Scalars['BigInt']['input']>;
  newQuantity_lte?: InputMaybe<Scalars['BigInt']['input']>;
  newQuantity_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  newQuantity_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<StockIncreased_filter>>>;
  or?: InputMaybe<Array<InputMaybe<StockIncreased_filter>>>;
};

export type StockIncreased_orderBy =
  | 'id'
  | 'itemId'
  | 'amount'
  | 'newQuantity'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type Subscription = {
  supplier?: Maybe<Supplier>;
  suppliers: Array<Supplier>;
  itemAdded?: Maybe<ItemAdded>;
  itemAddeds: Array<ItemAdded>;
  lowStockDetected?: Maybe<LowStockDetected>;
  lowStockDetecteds: Array<LowStockDetected>;
  restockInitiated?: Maybe<RestockInitiated>;
  restockInitiateds: Array<RestockInitiated>;
  stockDecreased?: Maybe<StockDecreased>;
  stockDecreaseds: Array<StockDecreased>;
  stockDecreasedData?: Maybe<StockDecreasedData>;
  stockDecreasedDatas: Array<StockDecreasedData>;
  stockIncreased?: Maybe<StockIncreased>;
  stockIncreaseds: Array<StockIncreased>;
  /** Collection of aggregated `StockDecreasedAggregation` values */
  stockDecreasedAggregations: Array<StockDecreasedAggregation>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type SubscriptionsupplierArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionsuppliersArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Supplier_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Supplier_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionitemAddedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionitemAddedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ItemAdded_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ItemAdded_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionlowStockDetectedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionlowStockDetectedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<LowStockDetected_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<LowStockDetected_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionrestockInitiatedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionrestockInitiatedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RestockInitiated_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<RestockInitiated_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionstockDecreasedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionstockDecreasedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<StockDecreased_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<StockDecreased_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionstockDecreasedDataArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionstockDecreasedDatasArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<StockDecreasedData_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<StockDecreasedData_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionstockIncreasedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionstockIncreasedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<StockIncreased_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<StockIncreased_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionstockDecreasedAggregationsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  interval: Aggregation_interval;
  where?: InputMaybe<StockDecreasedAggregation_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscription_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type Supplier = {
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  totalOrders: Scalars['BigInt']['output'];
  totalAmountSpent: Scalars['BigInt']['output'];
  avgDeliveryTime: Scalars['BigInt']['output'];
};

export type Supplier_filter = {
  id?: InputMaybe<Scalars['String']['input']>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  totalOrders?: InputMaybe<Scalars['BigInt']['input']>;
  totalOrders_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalOrders_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalOrders_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalOrders_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalOrders_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalOrders_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalOrders_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalAmountSpent?: InputMaybe<Scalars['BigInt']['input']>;
  totalAmountSpent_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalAmountSpent_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalAmountSpent_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalAmountSpent_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalAmountSpent_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalAmountSpent_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalAmountSpent_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  avgDeliveryTime?: InputMaybe<Scalars['BigInt']['input']>;
  avgDeliveryTime_not?: InputMaybe<Scalars['BigInt']['input']>;
  avgDeliveryTime_gt?: InputMaybe<Scalars['BigInt']['input']>;
  avgDeliveryTime_lt?: InputMaybe<Scalars['BigInt']['input']>;
  avgDeliveryTime_gte?: InputMaybe<Scalars['BigInt']['input']>;
  avgDeliveryTime_lte?: InputMaybe<Scalars['BigInt']['input']>;
  avgDeliveryTime_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  avgDeliveryTime_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Supplier_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Supplier_filter>>>;
};

export type Supplier_orderBy =
  | 'id'
  | 'name'
  | 'totalOrders'
  | 'totalAmountSpent'
  | 'avgDeliveryTime';

export type _Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']['output']>;
  /** The block number */
  number: Scalars['Int']['output'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']['output']>;
  /** The hash of the parent block */
  parentHash?: Maybe<Scalars['Bytes']['output']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String']['output'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']['output'];
};

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny';

  export type QuerySdk = {
      /** null **/
  supplier: InContextSdkMethod<Query['supplier'], QuerysupplierArgs, MeshContext>,
  /** null **/
  suppliers: InContextSdkMethod<Query['suppliers'], QuerysuppliersArgs, MeshContext>,
  /** null **/
  itemAdded: InContextSdkMethod<Query['itemAdded'], QueryitemAddedArgs, MeshContext>,
  /** null **/
  itemAddeds: InContextSdkMethod<Query['itemAddeds'], QueryitemAddedsArgs, MeshContext>,
  /** null **/
  lowStockDetected: InContextSdkMethod<Query['lowStockDetected'], QuerylowStockDetectedArgs, MeshContext>,
  /** null **/
  lowStockDetecteds: InContextSdkMethod<Query['lowStockDetecteds'], QuerylowStockDetectedsArgs, MeshContext>,
  /** null **/
  restockInitiated: InContextSdkMethod<Query['restockInitiated'], QueryrestockInitiatedArgs, MeshContext>,
  /** null **/
  restockInitiateds: InContextSdkMethod<Query['restockInitiateds'], QueryrestockInitiatedsArgs, MeshContext>,
  /** null **/
  stockDecreased: InContextSdkMethod<Query['stockDecreased'], QuerystockDecreasedArgs, MeshContext>,
  /** null **/
  stockDecreaseds: InContextSdkMethod<Query['stockDecreaseds'], QuerystockDecreasedsArgs, MeshContext>,
  /** null **/
  stockDecreasedData: InContextSdkMethod<Query['stockDecreasedData'], QuerystockDecreasedDataArgs, MeshContext>,
  /** null **/
  stockDecreasedDatas: InContextSdkMethod<Query['stockDecreasedDatas'], QuerystockDecreasedDatasArgs, MeshContext>,
  /** null **/
  stockIncreased: InContextSdkMethod<Query['stockIncreased'], QuerystockIncreasedArgs, MeshContext>,
  /** null **/
  stockIncreaseds: InContextSdkMethod<Query['stockIncreaseds'], QuerystockIncreasedsArgs, MeshContext>,
  /** Collection of aggregated `StockDecreasedAggregation` values **/
  stockDecreasedAggregations: InContextSdkMethod<Query['stockDecreasedAggregations'], QuerystockDecreasedAggregationsArgs, MeshContext>,
  /** null **/
  SupplierSearch: InContextSdkMethod<Query['SupplierSearch'], QuerySupplierSearchArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Query['_meta'], Query_metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  supplier: InContextSdkMethod<Subscription['supplier'], SubscriptionsupplierArgs, MeshContext>,
  /** null **/
  suppliers: InContextSdkMethod<Subscription['suppliers'], SubscriptionsuppliersArgs, MeshContext>,
  /** null **/
  itemAdded: InContextSdkMethod<Subscription['itemAdded'], SubscriptionitemAddedArgs, MeshContext>,
  /** null **/
  itemAddeds: InContextSdkMethod<Subscription['itemAddeds'], SubscriptionitemAddedsArgs, MeshContext>,
  /** null **/
  lowStockDetected: InContextSdkMethod<Subscription['lowStockDetected'], SubscriptionlowStockDetectedArgs, MeshContext>,
  /** null **/
  lowStockDetecteds: InContextSdkMethod<Subscription['lowStockDetecteds'], SubscriptionlowStockDetectedsArgs, MeshContext>,
  /** null **/
  restockInitiated: InContextSdkMethod<Subscription['restockInitiated'], SubscriptionrestockInitiatedArgs, MeshContext>,
  /** null **/
  restockInitiateds: InContextSdkMethod<Subscription['restockInitiateds'], SubscriptionrestockInitiatedsArgs, MeshContext>,
  /** null **/
  stockDecreased: InContextSdkMethod<Subscription['stockDecreased'], SubscriptionstockDecreasedArgs, MeshContext>,
  /** null **/
  stockDecreaseds: InContextSdkMethod<Subscription['stockDecreaseds'], SubscriptionstockDecreasedsArgs, MeshContext>,
  /** null **/
  stockDecreasedData: InContextSdkMethod<Subscription['stockDecreasedData'], SubscriptionstockDecreasedDataArgs, MeshContext>,
  /** null **/
  stockDecreasedDatas: InContextSdkMethod<Subscription['stockDecreasedDatas'], SubscriptionstockDecreasedDatasArgs, MeshContext>,
  /** null **/
  stockIncreased: InContextSdkMethod<Subscription['stockIncreased'], SubscriptionstockIncreasedArgs, MeshContext>,
  /** null **/
  stockIncreaseds: InContextSdkMethod<Subscription['stockIncreaseds'], SubscriptionstockIncreasedsArgs, MeshContext>,
  /** Collection of aggregated `StockDecreasedAggregation` values **/
  stockDecreasedAggregations: InContextSdkMethod<Subscription['stockDecreasedAggregations'], SubscriptionstockDecreasedAggregationsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Subscription['_meta'], Subscription_metaArgs, MeshContext>
  };

  export type Context = {
      ["inventorymanager"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
