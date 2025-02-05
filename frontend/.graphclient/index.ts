// @ts-nocheck
import { GraphQLResolveInfo, SelectionSetNode, FieldNode, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { gql } from '@graphql-mesh/utils';

import type { GetMeshOptions } from '@graphql-mesh/runtime';
import type { YamlConfig } from '@graphql-mesh/types';
import { PubSub } from '@graphql-mesh/utils';
import { DefaultLogger } from '@graphql-mesh/utils';
import MeshCache from "@graphql-mesh/cache-localforage";
import { fetch as fetchFn } from '@whatwg-node/fetch';

import { MeshResolvedSource } from '@graphql-mesh/runtime';
import { MeshTransform, MeshPlugin } from '@graphql-mesh/types';
import GraphqlHandler from "@graphql-mesh/graphql"
import BareMerger from "@graphql-mesh/merger-bare";
import { printWithCache } from '@graphql-mesh/utils';
import { usePersistedOperations } from '@graphql-yoga/plugin-persisted-operations';
import { createMeshHTTPHandler, MeshHTTPHandler } from '@graphql-mesh/http';
import { getMesh, ExecuteMeshFn, SubscribeMeshFn, MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import { ImportFn } from '@graphql-mesh/types';
import type { InventorymanagerTypes } from './sources/inventorymanager/types';
import * as importedModule$0 from "./sources/inventorymanager/introspectionSchema";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };



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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string | ((fieldNode: FieldNode) => SelectionSetNode);
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Aggregation_interval: Aggregation_interval;
  BigDecimal: ResolverTypeWrapper<Scalars['BigDecimal']['output']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']['output']>;
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Bytes: ResolverTypeWrapper<Scalars['Bytes']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Int8: ResolverTypeWrapper<Scalars['Int8']['output']>;
  ItemAdded: ResolverTypeWrapper<ItemAdded>;
  ItemAdded_filter: ItemAdded_filter;
  ItemAdded_orderBy: ItemAdded_orderBy;
  LowStockDetected: ResolverTypeWrapper<LowStockDetected>;
  LowStockDetected_filter: LowStockDetected_filter;
  LowStockDetected_orderBy: LowStockDetected_orderBy;
  OrderDirection: OrderDirection;
  Query: ResolverTypeWrapper<{}>;
  RestockInitiated: ResolverTypeWrapper<RestockInitiated>;
  RestockInitiated_filter: RestockInitiated_filter;
  RestockInitiated_orderBy: RestockInitiated_orderBy;
  StockDecreased: ResolverTypeWrapper<StockDecreased>;
  StockDecreasedAggregation: ResolverTypeWrapper<StockDecreasedAggregation>;
  StockDecreasedAggregation_filter: StockDecreasedAggregation_filter;
  StockDecreasedData: ResolverTypeWrapper<StockDecreasedData>;
  StockDecreasedData_filter: StockDecreasedData_filter;
  StockDecreasedData_orderBy: StockDecreasedData_orderBy;
  StockDecreased_filter: StockDecreased_filter;
  StockDecreased_orderBy: StockDecreased_orderBy;
  StockIncreased: ResolverTypeWrapper<StockIncreased>;
  StockIncreased_filter: StockIncreased_filter;
  StockIncreased_orderBy: StockIncreased_orderBy;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Subscription: ResolverTypeWrapper<{}>;
  Supplier: ResolverTypeWrapper<Supplier>;
  Supplier_filter: Supplier_filter;
  Supplier_orderBy: Supplier_orderBy;
  Timestamp: ResolverTypeWrapper<Scalars['Timestamp']['output']>;
  _Block_: ResolverTypeWrapper<_Block_>;
  _Meta_: ResolverTypeWrapper<_Meta_>;
  _SubgraphErrorPolicy_: _SubgraphErrorPolicy_;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  BigDecimal: Scalars['BigDecimal']['output'];
  BigInt: Scalars['BigInt']['output'];
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: Scalars['Boolean']['output'];
  Bytes: Scalars['Bytes']['output'];
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Int8: Scalars['Int8']['output'];
  ItemAdded: ItemAdded;
  ItemAdded_filter: ItemAdded_filter;
  LowStockDetected: LowStockDetected;
  LowStockDetected_filter: LowStockDetected_filter;
  Query: {};
  RestockInitiated: RestockInitiated;
  RestockInitiated_filter: RestockInitiated_filter;
  StockDecreased: StockDecreased;
  StockDecreasedAggregation: StockDecreasedAggregation;
  StockDecreasedAggregation_filter: StockDecreasedAggregation_filter;
  StockDecreasedData: StockDecreasedData;
  StockDecreasedData_filter: StockDecreasedData_filter;
  StockDecreased_filter: StockDecreased_filter;
  StockIncreased: StockIncreased;
  StockIncreased_filter: StockIncreased_filter;
  String: Scalars['String']['output'];
  Subscription: {};
  Supplier: Supplier;
  Supplier_filter: Supplier_filter;
  Timestamp: Scalars['Timestamp']['output'];
  _Block_: _Block_;
  _Meta_: _Meta_;
}>;

export type entityDirectiveArgs = { };

export type entityDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = entityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type subgraphIdDirectiveArgs = {
  id: Scalars['String']['input'];
};

export type subgraphIdDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = subgraphIdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type derivedFromDirectiveArgs = {
  field: Scalars['String']['input'];
};

export type derivedFromDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = derivedFromDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigDecimal'], any> {
  name: 'BigDecimal';
}

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export interface BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Bytes'], any> {
  name: 'Bytes';
}

export interface Int8ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Int8'], any> {
  name: 'Int8';
}

export type ItemAddedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ItemAdded'] = ResolversParentTypes['ItemAdded']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  itemId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  threshold?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  supplier?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LowStockDetectedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['LowStockDetected'] = ResolversParentTypes['LowStockDetected']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  itemId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  supplier?: Resolver<Maybe<ResolversTypes['Supplier']>, ParentType, ContextType, RequireFields<QuerysupplierArgs, 'id' | 'subgraphError'>>;
  suppliers?: Resolver<Array<ResolversTypes['Supplier']>, ParentType, ContextType, RequireFields<QuerysuppliersArgs, 'skip' | 'first' | 'subgraphError'>>;
  itemAdded?: Resolver<Maybe<ResolversTypes['ItemAdded']>, ParentType, ContextType, RequireFields<QueryitemAddedArgs, 'id' | 'subgraphError'>>;
  itemAddeds?: Resolver<Array<ResolversTypes['ItemAdded']>, ParentType, ContextType, RequireFields<QueryitemAddedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  lowStockDetected?: Resolver<Maybe<ResolversTypes['LowStockDetected']>, ParentType, ContextType, RequireFields<QuerylowStockDetectedArgs, 'id' | 'subgraphError'>>;
  lowStockDetecteds?: Resolver<Array<ResolversTypes['LowStockDetected']>, ParentType, ContextType, RequireFields<QuerylowStockDetectedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  restockInitiated?: Resolver<Maybe<ResolversTypes['RestockInitiated']>, ParentType, ContextType, RequireFields<QueryrestockInitiatedArgs, 'id' | 'subgraphError'>>;
  restockInitiateds?: Resolver<Array<ResolversTypes['RestockInitiated']>, ParentType, ContextType, RequireFields<QueryrestockInitiatedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  stockDecreased?: Resolver<Maybe<ResolversTypes['StockDecreased']>, ParentType, ContextType, RequireFields<QuerystockDecreasedArgs, 'id' | 'subgraphError'>>;
  stockDecreaseds?: Resolver<Array<ResolversTypes['StockDecreased']>, ParentType, ContextType, RequireFields<QuerystockDecreasedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  stockDecreasedData?: Resolver<Maybe<ResolversTypes['StockDecreasedData']>, ParentType, ContextType, RequireFields<QuerystockDecreasedDataArgs, 'id' | 'subgraphError'>>;
  stockDecreasedDatas?: Resolver<Array<ResolversTypes['StockDecreasedData']>, ParentType, ContextType, RequireFields<QuerystockDecreasedDatasArgs, 'skip' | 'first' | 'subgraphError'>>;
  stockIncreased?: Resolver<Maybe<ResolversTypes['StockIncreased']>, ParentType, ContextType, RequireFields<QuerystockIncreasedArgs, 'id' | 'subgraphError'>>;
  stockIncreaseds?: Resolver<Array<ResolversTypes['StockIncreased']>, ParentType, ContextType, RequireFields<QuerystockIncreasedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  stockDecreasedAggregations?: Resolver<Array<ResolversTypes['StockDecreasedAggregation']>, ParentType, ContextType, RequireFields<QuerystockDecreasedAggregationsArgs, 'skip' | 'first' | 'interval' | 'subgraphError'>>;
  SupplierSearch?: Resolver<Array<ResolversTypes['Supplier']>, ParentType, ContextType, RequireFields<QuerySupplierSearchArgs, 'text' | 'first' | 'skip' | 'subgraphError'>>;
  _meta?: Resolver<Maybe<ResolversTypes['_Meta_']>, ParentType, ContextType, Partial<Query_metaArgs>>;
}>;

export type RestockInitiatedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['RestockInitiated'] = ResolversParentTypes['RestockInitiated']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  itemId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  restockAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  supplier?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  totalCost?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StockDecreasedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['StockDecreased'] = ResolversParentTypes['StockDecreased']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  itemId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  newQuantity?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StockDecreasedAggregationResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['StockDecreasedAggregation'] = ResolversParentTypes['StockDecreasedAggregation']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int8'], ParentType, ContextType>;
  itemId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StockDecreasedDataResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['StockDecreasedData'] = ResolversParentTypes['StockDecreasedData']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int8'], ParentType, ContextType>;
  itemId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  newQuantity?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StockIncreasedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['StockIncreased'] = ResolversParentTypes['StockIncreased']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  itemId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  newQuantity?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SubscriptionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  supplier?: SubscriptionResolver<Maybe<ResolversTypes['Supplier']>, "supplier", ParentType, ContextType, RequireFields<SubscriptionsupplierArgs, 'id' | 'subgraphError'>>;
  suppliers?: SubscriptionResolver<Array<ResolversTypes['Supplier']>, "suppliers", ParentType, ContextType, RequireFields<SubscriptionsuppliersArgs, 'skip' | 'first' | 'subgraphError'>>;
  itemAdded?: SubscriptionResolver<Maybe<ResolversTypes['ItemAdded']>, "itemAdded", ParentType, ContextType, RequireFields<SubscriptionitemAddedArgs, 'id' | 'subgraphError'>>;
  itemAddeds?: SubscriptionResolver<Array<ResolversTypes['ItemAdded']>, "itemAddeds", ParentType, ContextType, RequireFields<SubscriptionitemAddedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  lowStockDetected?: SubscriptionResolver<Maybe<ResolversTypes['LowStockDetected']>, "lowStockDetected", ParentType, ContextType, RequireFields<SubscriptionlowStockDetectedArgs, 'id' | 'subgraphError'>>;
  lowStockDetecteds?: SubscriptionResolver<Array<ResolversTypes['LowStockDetected']>, "lowStockDetecteds", ParentType, ContextType, RequireFields<SubscriptionlowStockDetectedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  restockInitiated?: SubscriptionResolver<Maybe<ResolversTypes['RestockInitiated']>, "restockInitiated", ParentType, ContextType, RequireFields<SubscriptionrestockInitiatedArgs, 'id' | 'subgraphError'>>;
  restockInitiateds?: SubscriptionResolver<Array<ResolversTypes['RestockInitiated']>, "restockInitiateds", ParentType, ContextType, RequireFields<SubscriptionrestockInitiatedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  stockDecreased?: SubscriptionResolver<Maybe<ResolversTypes['StockDecreased']>, "stockDecreased", ParentType, ContextType, RequireFields<SubscriptionstockDecreasedArgs, 'id' | 'subgraphError'>>;
  stockDecreaseds?: SubscriptionResolver<Array<ResolversTypes['StockDecreased']>, "stockDecreaseds", ParentType, ContextType, RequireFields<SubscriptionstockDecreasedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  stockDecreasedData?: SubscriptionResolver<Maybe<ResolversTypes['StockDecreasedData']>, "stockDecreasedData", ParentType, ContextType, RequireFields<SubscriptionstockDecreasedDataArgs, 'id' | 'subgraphError'>>;
  stockDecreasedDatas?: SubscriptionResolver<Array<ResolversTypes['StockDecreasedData']>, "stockDecreasedDatas", ParentType, ContextType, RequireFields<SubscriptionstockDecreasedDatasArgs, 'skip' | 'first' | 'subgraphError'>>;
  stockIncreased?: SubscriptionResolver<Maybe<ResolversTypes['StockIncreased']>, "stockIncreased", ParentType, ContextType, RequireFields<SubscriptionstockIncreasedArgs, 'id' | 'subgraphError'>>;
  stockIncreaseds?: SubscriptionResolver<Array<ResolversTypes['StockIncreased']>, "stockIncreaseds", ParentType, ContextType, RequireFields<SubscriptionstockIncreasedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  stockDecreasedAggregations?: SubscriptionResolver<Array<ResolversTypes['StockDecreasedAggregation']>, "stockDecreasedAggregations", ParentType, ContextType, RequireFields<SubscriptionstockDecreasedAggregationsArgs, 'skip' | 'first' | 'interval' | 'subgraphError'>>;
  _meta?: SubscriptionResolver<Maybe<ResolversTypes['_Meta_']>, "_meta", ParentType, ContextType, Partial<Subscription_metaArgs>>;
}>;

export type SupplierResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Supplier'] = ResolversParentTypes['Supplier']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  totalOrders?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalAmountSpent?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  avgDeliveryTime?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface TimestampScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Timestamp'], any> {
  name: 'Timestamp';
}

export type _Block_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Block_'] = ResolversParentTypes['_Block_']> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  parentHash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Meta_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Meta_'] = ResolversParentTypes['_Meta_']> = ResolversObject<{
  block?: Resolver<ResolversTypes['_Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MeshContext> = ResolversObject<{
  BigDecimal?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  Bytes?: GraphQLScalarType;
  Int8?: GraphQLScalarType;
  ItemAdded?: ItemAddedResolvers<ContextType>;
  LowStockDetected?: LowStockDetectedResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RestockInitiated?: RestockInitiatedResolvers<ContextType>;
  StockDecreased?: StockDecreasedResolvers<ContextType>;
  StockDecreasedAggregation?: StockDecreasedAggregationResolvers<ContextType>;
  StockDecreasedData?: StockDecreasedDataResolvers<ContextType>;
  StockIncreased?: StockIncreasedResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Supplier?: SupplierResolvers<ContextType>;
  Timestamp?: GraphQLScalarType;
  _Block_?: _Block_Resolvers<ContextType>;
  _Meta_?: _Meta_Resolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = MeshContext> = ResolversObject<{
  entity?: entityDirectiveResolver<any, any, ContextType>;
  subgraphId?: subgraphIdDirectiveResolver<any, any, ContextType>;
  derivedFrom?: derivedFromDirectiveResolver<any, any, ContextType>;
}>;

export type MeshContext = InventorymanagerTypes.Context & BaseMeshContext;


import { fileURLToPath } from '@graphql-mesh/utils';
const baseDir = pathModule.join(pathModule.dirname(fileURLToPath(import.meta.url)), '..');

const importFn: ImportFn = <T>(moduleId: string) => {
  const relativeModuleId = (pathModule.isAbsolute(moduleId) ? pathModule.relative(baseDir, moduleId) : moduleId).split('\\').join('/').replace(baseDir + '/', '');
  switch(relativeModuleId) {
    case ".graphclient/sources/inventorymanager/introspectionSchema":
      return Promise.resolve(importedModule$0) as T;
    
    default:
      return Promise.reject(new Error(`Cannot find module '${relativeModuleId}'.`));
  }
};

const rootStore = new MeshStore('.graphclient', new FsStoreStorageAdapter({
  cwd: baseDir,
  importFn,
  fileType: "ts",
}), {
  readonly: true,
  validate: false
});

export const rawServeConfig: YamlConfig.Config['serve'] = undefined as any
export async function getMeshOptions(): Promise<GetMeshOptions> {
const pubsub = new PubSub();
const sourcesStore = rootStore.child('sources');
const logger = new DefaultLogger("GraphClient");
const cache = new (MeshCache as any)({
      ...({} as any),
      importFn,
      store: rootStore.child('cache'),
      pubsub,
      logger,
    } as any)

const sources: MeshResolvedSource[] = [];
const transforms: MeshTransform[] = [];
const additionalEnvelopPlugins: MeshPlugin<any>[] = [];
const inventorymanagerTransforms = [];
const additionalTypeDefs = [] as any[];
const inventorymanagerHandler = new GraphqlHandler({
              name: "inventorymanager",
              config: {"endpoint":"https://api.studio.thegraph.com/query/92897/inventory-manager-2/version/latest"},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("inventorymanager"),
              logger: logger.child("inventorymanager"),
              importFn,
            });
sources[0] = {
          name: 'inventorymanager',
          handler: inventorymanagerHandler,
          transforms: inventorymanagerTransforms
        }
const additionalResolvers = [] as any[]
const merger = new(BareMerger as any)({
        cache,
        pubsub,
        logger: logger.child('bareMerger'),
        store: rootStore.child('bareMerger')
      })
const documentHashMap = {
        "237423fb8ff411af0da61b7d559a9ec4fc1acc93994822e92798f682ce1822c5": GetSupplierByNameDocument,
"aabddab70a8ef8cd4eeefc15e075eaa2a383cad6742a52ede987871121af6d2b": GetItemsAddedDocument
      }
additionalEnvelopPlugins.push(usePersistedOperations({
        getPersistedOperation(key) {
          return documentHashMap[key];
        },
        ...{}
      }))

  return {
    sources,
    transforms,
    additionalTypeDefs,
    additionalResolvers,
    cache,
    pubsub,
    merger,
    logger,
    additionalEnvelopPlugins,
    get documents() {
      return [
      {
        document: GetSupplierByNameDocument,
        get rawSDL() {
          return printWithCache(GetSupplierByNameDocument);
        },
        location: 'GetSupplierByNameDocument.graphql',
        sha256Hash: '237423fb8ff411af0da61b7d559a9ec4fc1acc93994822e92798f682ce1822c5'
      },{
        document: GetItemsAddedDocument,
        get rawSDL() {
          return printWithCache(GetItemsAddedDocument);
        },
        location: 'GetItemsAddedDocument.graphql',
        sha256Hash: 'aabddab70a8ef8cd4eeefc15e075eaa2a383cad6742a52ede987871121af6d2b'
      }
    ];
    },
    fetchFn,
  };
}

export function createBuiltMeshHTTPHandler<TServerContext = {}>(): MeshHTTPHandler<TServerContext> {
  return createMeshHTTPHandler<TServerContext>({
    baseDir,
    getBuiltMesh: getBuiltGraphClient,
    rawServeConfig: undefined,
  })
}


let meshInstance$: Promise<MeshInstance> | undefined;

export const pollingInterval = null;

export function getBuiltGraphClient(): Promise<MeshInstance> {
  if (meshInstance$ == null) {
    if (pollingInterval) {
      setInterval(() => {
        getMeshOptions()
        .then(meshOptions => getMesh(meshOptions))
        .then(newMesh =>
          meshInstance$.then(oldMesh => {
            oldMesh.destroy()
            meshInstance$ = Promise.resolve(newMesh)
          })
        ).catch(err => {
          console.error("Mesh polling failed so the existing version will be used:", err);
        });
      }, pollingInterval)
    }
    meshInstance$ = getMeshOptions().then(meshOptions => getMesh(meshOptions)).then(mesh => {
      const id = mesh.pubsub.subscribe('destroy', () => {
        meshInstance$ = undefined;
        mesh.pubsub.unsubscribe(id);
      });
      return mesh;
    });
  }
  return meshInstance$;
}

export const execute: ExecuteMeshFn = (...args) => getBuiltGraphClient().then(({ execute }) => execute(...args));

export const subscribe: SubscribeMeshFn = (...args) => getBuiltGraphClient().then(({ subscribe }) => subscribe(...args));
export function getBuiltGraphSDK<TGlobalContext = any, TOperationContext = any>(globalContext?: TGlobalContext) {
  const sdkRequester$ = getBuiltGraphClient().then(({ sdkRequesterFactory }) => sdkRequesterFactory(globalContext));
  return getSdk<TOperationContext, TGlobalContext>((...args) => sdkRequester$.then(sdkRequester => sdkRequester(...args)));
}
export type GetItemsAddedQueryVariables = Exact<{ [key: string]: never; }>;


export type GetItemsAddedQuery = { itemAddeds: Array<Pick<ItemAdded, 'id' | 'itemId' | 'name' | 'quantity'>> };

export type GetSupplierByNameQueryVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type GetSupplierByNameQuery = { SupplierSearch: Array<Pick<Supplier, 'id' | 'name' | 'totalAmountSpent' | 'totalOrders' | 'avgDeliveryTime'>> };


export const GetItemsAddedDocument = gql`
    query GetItemsAdded {
  itemAddeds {
    id
    itemId
    name
    quantity
  }
}
    ` as unknown as DocumentNode<GetItemsAddedQuery, GetItemsAddedQueryVariables>;
export const GetSupplierByNameDocument = gql`
    query GetSupplierByName($name: String!) {
  SupplierSearch(text: $name) {
    id
    name
    totalAmountSpent
    totalOrders
    avgDeliveryTime
  }
}
    ` as unknown as DocumentNode<GetSupplierByNameQuery, GetSupplierByNameQueryVariables>;



export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    GetItemsAdded(variables?: GetItemsAddedQueryVariables, options?: C): Promise<GetItemsAddedQuery> {
      return requester<GetItemsAddedQuery, GetItemsAddedQueryVariables>(GetItemsAddedDocument, variables, options) as Promise<GetItemsAddedQuery>;
    },
    GetSupplierByName(variables: GetSupplierByNameQueryVariables, options?: C): Promise<GetSupplierByNameQuery> {
      return requester<GetSupplierByNameQuery, GetSupplierByNameQueryVariables>(GetSupplierByNameDocument, variables, options) as Promise<GetSupplierByNameQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;