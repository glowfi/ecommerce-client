/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
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
  /** Date with time (isoformat) */
  DateTime: { input: any; output: any; }
};

export type Address = {
  __typename?: 'Address';
  city: Scalars['String']['output'];
  state: Scalars['String']['output'];
  streetAddress: Scalars['String']['output'];
  zipCode: Scalars['String']['output'];
};

export type AddressInput = {
  city: Scalars['String']['input'];
  state: Scalars['String']['input'];
  streetAddress: Scalars['String']['input'];
  zipCode: Scalars['String']['input'];
};

export type Admin = {
  __typename?: 'Admin';
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  password: Scalars['String']['output'];
};

export type Category = {
  __typename?: 'Category';
  categoryImage: Array<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  productsBelonging: Array<Product>;
};

export type ForgotPassword = {
  __typename?: 'ForgotPassword';
  email: Scalars['String']['output'];
  userType: Scalars['String']['output'];
};

export type ForgotPasswordResponse = {
  __typename?: 'ForgotPasswordResponse';
  data?: Maybe<ForgotPassword>;
  err?: Maybe<Scalars['String']['output']>;
};

export type InputAdmin = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type InputCategory = {
  categoryImage: Array<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type InputForgotPassword = {
  email: Scalars['String']['input'];
  userType: Scalars['String']['input'];
};

export type InputLogin = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  userType: Scalars['String']['input'];
};

export type InputOrders = {
  productID: Scalars['String']['input'];
  userID: Scalars['String']['input'];
};

export type InputProduct = {
  brand: Scalars['String']['input'];
  categoryID: Scalars['String']['input'];
  coverImage: Array<Scalars['String']['input']>;
  dateCreated: Scalars['Int']['input'];
  dateCreatedHuman: Scalars['String']['input'];
  description: Scalars['String']['input'];
  discountPercent: Scalars['Float']['input'];
  images: Array<Array<Scalars['String']['input']>>;
  onSale: Scalars['Boolean']['input'];
  price: Scalars['Float']['input'];
  priceInr: Scalars['Float']['input'];
  rating: Scalars['Int']['input'];
  sellerID: Scalars['String']['input'];
  stock: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};

export type InputReviews = {
  comment: Scalars['String']['input'];
  productID: Scalars['String']['input'];
  userID: Scalars['String']['input'];
};

export type InputSeller = {
  companyAddress: AddressInput;
  companyName: Scalars['String']['input'];
  country: Scalars['String']['input'];
  dob: Scalars['String']['input'];
  email: Scalars['String']['input'];
  id: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
  sellerName: Scalars['String']['input'];
};

export type InputUpdateCategory = {
  categoryImage?: InputMaybe<Array<Scalars['String']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type InputUpdateProduct = {
  brand?: InputMaybe<Scalars['String']['input']>;
  coverImage?: InputMaybe<Array<Scalars['String']['input']>>;
  dateCreated?: InputMaybe<Scalars['Int']['input']>;
  dateCreatedHuman?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  discountPercent?: InputMaybe<Scalars['Float']['input']>;
  images?: InputMaybe<Array<Array<Scalars['String']['input']>>>;
  onSale?: InputMaybe<Scalars['Boolean']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  priceInr?: InputMaybe<Scalars['Float']['input']>;
  rating?: InputMaybe<Scalars['Int']['input']>;
  stock?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type InputUpdateReviews = {
  comment: Scalars['String']['input'];
};

export type InputUpdateSeller = {
  companyAddress?: InputMaybe<AddressInput>;
  companyName?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  dob?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  sellerName?: InputMaybe<Scalars['String']['input']>;
};

export type InputUpdateUser = {
  address?: InputMaybe<Scalars['String']['input']>;
  dob?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};

export type InputUser = {
  address?: InputMaybe<Scalars['String']['input']>;
  dob?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};

export type InputWishlist = {
  productID: Scalars['String']['input'];
  userID: Scalars['String']['input'];
};

export type Login = {
  __typename?: 'Login';
  accToken: Scalars['String']['output'];
  email: Scalars['String']['output'];
  userID: Scalars['String']['output'];
  userType: Scalars['String']['output'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  data?: Maybe<Login>;
  err?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAdmin: ResponseAdmin;
  createCategory: ResponseCategory;
  createOrder: ResponseOrders;
  createReview: ResponseReviews;
  createSeller: ResponseSeller;
  createUser: ResponseUser;
  createWish: ResponseWishlist;
  deleteCategory: ResponseCategory;
  deleteOrder: ResponseOrders;
  deleteProduct: ResponseProduct;
  deleteReview: ResponseReviews;
  deleteSeller: ResponseSeller;
  deleteUser: ResponseUser;
  deleteWish: ResponseWishlist;
  forgotPassword: ForgotPasswordResponse;
  getCategoryById: ResponseCategory;
  getOrderById: ResponseOrders;
  getProductById: ResponseProduct;
  getReviewById: ResponseReviews;
  getSellerById: ResponseSeller;
  getUserById: ResponseUser;
  getWishById: ResponseWishlist;
  hello: Scalars['String']['output'];
  insertCategoriesFromDataset: Scalars['String']['output'];
  insertProduct: ResponseProduct;
  insertProductsFromDataset: Scalars['String']['output'];
  insertSellersFromDataset: Scalars['String']['output'];
  insertUsersFromDataset: Scalars['String']['output'];
  login: LoginResponse;
  updateCategory: ResponseCategory;
  updateProduct: ResponseProduct;
  updateReview: ResponseReviews;
  updateSeller: ResponseSeller;
  updateUser: ResponseUser;
};


export type MutationCreateAdminArgs = {
  data: InputAdmin;
};


export type MutationCreateCategoryArgs = {
  data: InputCategory;
};


export type MutationCreateOrderArgs = {
  data: InputOrders;
};


export type MutationCreateReviewArgs = {
  data: InputReviews;
};


export type MutationCreateSellerArgs = {
  data: InputSeller;
};


export type MutationCreateUserArgs = {
  data: InputUser;
};


export type MutationCreateWishArgs = {
  data: InputWishlist;
};


export type MutationDeleteCategoryArgs = {
  categoryID: Scalars['String']['input'];
};


export type MutationDeleteOrderArgs = {
  orderID: Scalars['String']['input'];
};


export type MutationDeleteProductArgs = {
  productID: Scalars['String']['input'];
};


export type MutationDeleteReviewArgs = {
  reviewID: Scalars['String']['input'];
};


export type MutationDeleteSellerArgs = {
  sellerID: Scalars['String']['input'];
};


export type MutationDeleteUserArgs = {
  userID: Scalars['String']['input'];
};


export type MutationDeleteWishArgs = {
  wishID: Scalars['String']['input'];
};


export type MutationForgotPasswordArgs = {
  data: InputForgotPassword;
};


export type MutationGetCategoryByIdArgs = {
  categoryID: Scalars['String']['input'];
};


export type MutationGetOrderByIdArgs = {
  orderID: Scalars['String']['input'];
};


export type MutationGetProductByIdArgs = {
  productID: Scalars['String']['input'];
};


export type MutationGetReviewByIdArgs = {
  reviewID: Scalars['String']['input'];
};


export type MutationGetSellerByIdArgs = {
  sellerID: Scalars['String']['input'];
};


export type MutationGetUserByIdArgs = {
  userID: Scalars['String']['input'];
};


export type MutationGetWishByIdArgs = {
  wishID: Scalars['String']['input'];
};


export type MutationInsertProductArgs = {
  data: InputProduct;
};


export type MutationLoginArgs = {
  data: InputLogin;
};


export type MutationUpdateCategoryArgs = {
  categoryID: Scalars['String']['input'];
  data: InputUpdateCategory;
};


export type MutationUpdateProductArgs = {
  data: InputUpdateProduct;
  productID: Scalars['String']['input'];
};


export type MutationUpdateReviewArgs = {
  data: InputUpdateReviews;
  reviewID: Scalars['String']['input'];
};


export type MutationUpdateSellerArgs = {
  data: InputUpdateSeller;
  sellerID: Scalars['String']['input'];
};


export type MutationUpdateUserArgs = {
  data: InputUpdateUser;
  userID: Scalars['String']['input'];
};

export type Orders = {
  __typename?: 'Orders';
  id: Scalars['String']['output'];
  orderedAt: Scalars['DateTime']['output'];
  productOrdered: Product;
  userOrdered: User;
};

export type Product = {
  __typename?: 'Product';
  brand: Scalars['String']['output'];
  category: Category;
  coverImage: Array<Scalars['String']['output']>;
  dateCreated: Scalars['Int']['output'];
  dateCreatedHuman: Scalars['String']['output'];
  description: Scalars['String']['output'];
  discountPercent: Scalars['Float']['output'];
  id: Scalars['String']['output'];
  images: Array<Array<Scalars['String']['output']>>;
  onSale: Scalars['Boolean']['output'];
  orderedBy: Array<Orders>;
  price: Scalars['Float']['output'];
  priceInr: Scalars['Float']['output'];
  rating: Scalars['Int']['output'];
  reviewedBy: Array<Reviews>;
  seller: Seller;
  stock: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  wishedBy: Array<Wishlist>;
};

export type Query = {
  __typename?: 'Query';
  getAllCategories: ResponseGetallCategory;
  getAllOrders: ResponseGetallOrders;
  getAllProducts: ResponseGetallProduct;
  getAllProductsPaginate: ResponseGetallProduct;
  getAllSeller: ResponseGetallSeller;
  getAllWishlis: ResponseGetallWishlist;
  getProductsBySearchTerm: ResponseGetallProduct;
  getProductsBySearchTermPaginate: ResponseGetallProduct;
  hello: Scalars['String']['output'];
};


export type QueryGetAllProductsPaginateArgs = {
  limit: Scalars['Int']['input'];
  skipping: Scalars['Int']['input'];
};


export type QueryGetProductsBySearchTermArgs = {
  term: Scalars['String']['input'];
};


export type QueryGetProductsBySearchTermPaginateArgs = {
  limit: Scalars['Int']['input'];
  skipping: Scalars['Int']['input'];
  term: Scalars['String']['input'];
};

export type ResponseAdmin = {
  __typename?: 'ResponseAdmin';
  data?: Maybe<Admin>;
  err?: Maybe<Scalars['String']['output']>;
};

export type ResponseCategory = {
  __typename?: 'ResponseCategory';
  data?: Maybe<Category>;
  err?: Maybe<Scalars['String']['output']>;
};

export type ResponseGetallCategory = {
  __typename?: 'ResponseGetallCategory';
  data?: Maybe<Array<Category>>;
  err?: Maybe<Scalars['String']['output']>;
};

export type ResponseGetallOrders = {
  __typename?: 'ResponseGetallOrders';
  data?: Maybe<Array<Orders>>;
  err?: Maybe<Scalars['String']['output']>;
};

export type ResponseGetallProduct = {
  __typename?: 'ResponseGetallProduct';
  data?: Maybe<Array<Product>>;
  err?: Maybe<Scalars['String']['output']>;
};

export type ResponseGetallSeller = {
  __typename?: 'ResponseGetallSeller';
  data?: Maybe<Array<Seller>>;
  err?: Maybe<Scalars['String']['output']>;
};

export type ResponseGetallWishlist = {
  __typename?: 'ResponseGetallWishlist';
  data?: Maybe<Array<Wishlist>>;
  err?: Maybe<Scalars['String']['output']>;
};

export type ResponseOrders = {
  __typename?: 'ResponseOrders';
  data?: Maybe<Orders>;
  err?: Maybe<Scalars['String']['output']>;
};

export type ResponseProduct = {
  __typename?: 'ResponseProduct';
  data?: Maybe<Product>;
  err?: Maybe<Scalars['String']['output']>;
};

export type ResponseReviews = {
  __typename?: 'ResponseReviews';
  data?: Maybe<Reviews>;
  err?: Maybe<Scalars['String']['output']>;
};

export type ResponseSeller = {
  __typename?: 'ResponseSeller';
  data?: Maybe<Seller>;
  err?: Maybe<Scalars['String']['output']>;
};

export type ResponseUser = {
  __typename?: 'ResponseUser';
  data?: Maybe<User>;
  err?: Maybe<Scalars['String']['output']>;
};

export type ResponseWishlist = {
  __typename?: 'ResponseWishlist';
  data?: Maybe<Wishlist>;
  err?: Maybe<Scalars['String']['output']>;
};

export type Reviews = {
  __typename?: 'Reviews';
  comment: Scalars['String']['output'];
  id: Scalars['String']['output'];
  productReviewed: Product;
  reviewedAt: Scalars['DateTime']['output'];
  userReviewed: User;
};

export type Seller = {
  __typename?: 'Seller';
  companyAddress: Address;
  companyName: Scalars['String']['output'];
  country: Scalars['String']['output'];
  dob: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  password: Scalars['String']['output'];
  phoneNumber: Scalars['String']['output'];
  productsSelling: Array<Product>;
  sellerName: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  address: Scalars['String']['output'];
  dob: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  orders: Array<Orders>;
  password: Scalars['String']['output'];
  phoneNumber: Scalars['String']['output'];
  reviews: Array<Reviews>;
  wishlist: Array<Wishlist>;
};

export type Wishlist = {
  __typename?: 'Wishlist';
  id: Scalars['String']['output'];
  productWished: Product;
  userWished: User;
  wishedAt: Scalars['DateTime']['output'];
};

export type CategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoriesQuery = { __typename?: 'Query', getAllCategories: { __typename?: 'ResponseGetallCategory', data?: Array<{ __typename?: 'Category', id: string, name: string, categoryImage: Array<string> }> | null } };

export type GetallprodQueryVariables = Exact<{ [key: string]: never; }>;


export type GetallprodQuery = { __typename?: 'Query', getAllProducts: { __typename?: 'ResponseGetallProduct', err?: string | null, data?: Array<{ __typename?: 'Product', id: string, title: string, stock: number, price: number, rating: number, description: string, brand: string, images: Array<Array<string>>, dateCreated: number, dateCreatedHuman: string, coverImage: Array<string>, category: { __typename?: 'Category', name: string }, wishedBy: Array<{ __typename?: 'Wishlist', productWished: { __typename?: 'Product', brand: string } }>, seller: { __typename?: 'Seller', email: string, sellerName: string, companyName: string, phoneNumber: string, companyAddress: { __typename?: 'Address', streetAddress: string, state: string, city: string, zipCode: string } } }> | null } };

export type LoginMutationVariables = Exact<{
  data: InputLogin;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', err?: string | null, data?: { __typename?: 'Login', userID: string, email: string, userType: string, accToken: string } | null } };

export type SearchTermPaginateQueryVariables = Exact<{
  term: Scalars['String']['input'];
  skipping: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
}>;


export type SearchTermPaginateQuery = { __typename?: 'Query', getProductsBySearchTermPaginate: { __typename?: 'ResponseGetallProduct', err?: string | null, data?: Array<{ __typename?: 'Product', id: string, title: string, stock: number, price: number, rating: number, description: string, brand: string, images: Array<Array<string>>, dateCreated: number, dateCreatedHuman: string, coverImage: Array<string>, category: { __typename?: 'Category', name: string }, wishedBy: Array<{ __typename?: 'Wishlist', productWished: { __typename?: 'Product', brand: string } }>, seller: { __typename?: 'Seller', email: string, sellerName: string, companyName: string, phoneNumber: string, companyAddress: { __typename?: 'Address', streetAddress: string, state: string, city: string, zipCode: string } } }> | null } };

export type PaginateProdQueryVariables = Exact<{
  skipping: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
}>;


export type PaginateProdQuery = { __typename?: 'Query', getAllProductsPaginate: { __typename?: 'ResponseGetallProduct', err?: string | null, data?: Array<{ __typename?: 'Product', id: string, title: string, stock: number, price: number, rating: number, description: string, brand: string, images: Array<Array<string>>, dateCreated: number, dateCreatedHuman: string, coverImage: Array<string>, category: { __typename?: 'Category', name: string }, wishedBy: Array<{ __typename?: 'Wishlist', productWished: { __typename?: 'Product', brand: string } }>, seller: { __typename?: 'Seller', email: string, sellerName: string, companyName: string, phoneNumber: string, companyAddress: { __typename?: 'Address', streetAddress: string, state: string, city: string, zipCode: string } } }> | null } };

export type SbytermQueryVariables = Exact<{
  term: Scalars['String']['input'];
}>;


export type SbytermQuery = { __typename?: 'Query', getProductsBySearchTerm: { __typename?: 'ResponseGetallProduct', err?: string | null, data?: Array<{ __typename?: 'Product', id: string, title: string, stock: number, price: number, rating: number, description: string, brand: string, images: Array<Array<string>>, dateCreated: number, dateCreatedHuman: string, coverImage: Array<string>, category: { __typename?: 'Category', name: string }, wishedBy: Array<{ __typename?: 'Wishlist', productWished: { __typename?: 'Product', brand: string } }>, seller: { __typename?: 'Seller', email: string, sellerName: string, companyName: string, phoneNumber: string, companyAddress: { __typename?: 'Address', streetAddress: string, state: string, city: string, zipCode: string } } }> | null } };


export const CategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"categoryImage"}}]}}]}}]}}]} as unknown as DocumentNode<CategoriesQuery, CategoriesQueryVariables>;
export const GetallprodDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getallprod"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllProducts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"stock"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"brand"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"dateCreated"}},{"kind":"Field","name":{"kind":"Name","value":"dateCreatedHuman"}},{"kind":"Field","name":{"kind":"Name","value":"wishedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productWished"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"brand"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"coverImage"}},{"kind":"Field","name":{"kind":"Name","value":"seller"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"sellerName"}},{"kind":"Field","name":{"kind":"Name","value":"companyName"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"companyAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"streetAddress"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"zipCode"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"err"}}]}}]}}]} as unknown as DocumentNode<GetallprodQuery, GetallprodQueryVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InputLogin"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userID"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"accToken"}}]}},{"kind":"Field","name":{"kind":"Name","value":"err"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const SearchTermPaginateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"searchTermPaginate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"term"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skipping"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProductsBySearchTermPaginate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"term"},"value":{"kind":"Variable","name":{"kind":"Name","value":"term"}}},{"kind":"Argument","name":{"kind":"Name","value":"skipping"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skipping"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"stock"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"brand"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"dateCreated"}},{"kind":"Field","name":{"kind":"Name","value":"dateCreatedHuman"}},{"kind":"Field","name":{"kind":"Name","value":"wishedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productWished"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"brand"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"coverImage"}},{"kind":"Field","name":{"kind":"Name","value":"seller"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"sellerName"}},{"kind":"Field","name":{"kind":"Name","value":"companyName"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"companyAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"streetAddress"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"zipCode"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"err"}}]}}]}}]} as unknown as DocumentNode<SearchTermPaginateQuery, SearchTermPaginateQueryVariables>;
export const PaginateProdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"paginateProd"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skipping"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllProductsPaginate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"skipping"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skipping"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"stock"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"brand"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"dateCreated"}},{"kind":"Field","name":{"kind":"Name","value":"dateCreatedHuman"}},{"kind":"Field","name":{"kind":"Name","value":"wishedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productWished"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"brand"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"coverImage"}},{"kind":"Field","name":{"kind":"Name","value":"seller"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"sellerName"}},{"kind":"Field","name":{"kind":"Name","value":"companyName"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"companyAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"streetAddress"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"zipCode"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"err"}}]}}]}}]} as unknown as DocumentNode<PaginateProdQuery, PaginateProdQueryVariables>;
export const SbytermDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"sbyterm"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"term"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProductsBySearchTerm"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"term"},"value":{"kind":"Variable","name":{"kind":"Name","value":"term"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"stock"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"brand"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"dateCreated"}},{"kind":"Field","name":{"kind":"Name","value":"dateCreatedHuman"}},{"kind":"Field","name":{"kind":"Name","value":"wishedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productWished"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"brand"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"coverImage"}},{"kind":"Field","name":{"kind":"Name","value":"seller"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"sellerName"}},{"kind":"Field","name":{"kind":"Name","value":"companyName"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"companyAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"streetAddress"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"zipCode"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"err"}}]}}]}}]} as unknown as DocumentNode<SbytermQuery, SbytermQueryVariables>;