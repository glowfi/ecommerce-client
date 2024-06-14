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
  country: Scalars['String']['output'];
  countryCode: Scalars['String']['output'];
  state: Scalars['String']['output'];
  streetAddress: Scalars['String']['output'];
  zipCode: Scalars['String']['output'];
};

export type AddressInput = {
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  countryCode?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  streetAddress?: InputMaybe<Scalars['String']['input']>;
  zipCode?: InputMaybe<Scalars['String']['input']>;
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

export type ConfirmAccount = {
  __typename?: 'ConfirmAccount';
  data?: Maybe<Scalars['String']['output']>;
  err?: Maybe<Scalars['String']['output']>;
};

export type ForgotPassword = {
  __typename?: 'ForgotPassword';
  browser: Scalars['String']['output'];
  email: Scalars['String']['output'];
  os: Scalars['String']['output'];
  token: Scalars['String']['output'];
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
  browser: Scalars['String']['input'];
  email: Scalars['String']['input'];
  os: Scalars['String']['input'];
  userType: Scalars['String']['input'];
};

export type InputLogin = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  userType: Scalars['String']['input'];
};

export type InputOrders = {
  address: AddressInput;
  amount: Scalars['Float']['input'];
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  paymentBy: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
  productsOrdered: Array<Array<Scalars['String']['input']>>;
  shippingFee: Scalars['Float']['input'];
  tax: Scalars['Float']['input'];
  updateAddress: Scalars['Boolean']['input'];
  userDetails: OrderUserDetails;
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
  rating: Scalars['Float']['input'];
  sellerID: Scalars['String']['input'];
  stock: Scalars['Int']['input'];
  title: Scalars['String']['input'];
  totalReviews: Scalars['Int']['input'];
};

export type InputReviews = {
  comment: Scalars['String']['input'];
  productID: Scalars['String']['input'];
  rating: Scalars['Int']['input'];
  userID: Scalars['String']['input'];
};

export type InputSeller = {
  companyAddress?: AddressInput;
  companyName: Scalars['String']['input'];
  dob: Scalars['String']['input'];
  email: Scalars['String']['input'];
  id: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
  profilePic?: InputMaybe<Scalars['String']['input']>;
  sellerName: Scalars['String']['input'];
};

export type InputUpdateCategory = {
  categoryImage?: InputMaybe<Array<Scalars['String']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type InputUpdateOrders = {
  hasFailed: Scalars['Boolean']['input'];
  isPending: Scalars['Boolean']['input'];
  orderID: Scalars['String']['input'];
  razorpayDetails: RazorpayUpdate;
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
  rating?: InputMaybe<Scalars['Float']['input']>;
  stock?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  totalReviews: Scalars['Int']['input'];
};

export type InputUpdateReviews = {
  comment?: InputMaybe<Scalars['String']['input']>;
  productID?: InputMaybe<Scalars['String']['input']>;
  rating?: InputMaybe<Scalars['Int']['input']>;
  userID?: InputMaybe<Scalars['String']['input']>;
};

export type InputUpdateSeller = {
  companyAddress?: InputMaybe<AddressInput>;
  companyName?: InputMaybe<Scalars['String']['input']>;
  dob?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  profilePic?: InputMaybe<Scalars['String']['input']>;
  sellerName?: InputMaybe<Scalars['String']['input']>;
};

export type InputUpdateUser = {
  address?: InputMaybe<AddressInput>;
  dob?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  profilePic?: InputMaybe<Scalars['String']['input']>;
};

export type InputUser = {
  address?: InputMaybe<AddressInput>;
  dob?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  profilePic?: InputMaybe<Scalars['String']['input']>;
};

export type InputWishlist = {
  productID: Scalars['String']['input'];
  userID: Scalars['String']['input'];
};

export type InputresetPassword = {
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
  userid?: InputMaybe<Scalars['String']['input']>;
};

export type Login = {
  __typename?: 'Login';
  accToken: Scalars['String']['output'];
  address: Address;
  email: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phoneNumber: Scalars['String']['output'];
  profilePic: Scalars['String']['output'];
  userID: Scalars['String']['output'];
  userType: Scalars['String']['output'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  data?: Maybe<Login>;
  err?: Maybe<Scalars['String']['output']>;
};

export type LogoutResponse = {
  __typename?: 'LogoutResponse';
  data?: Maybe<Scalars['String']['output']>;
  err?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAdmin: ResponseAdmin;
  createCategory: ResponseCategory;
  createOrder: Array<Scalars['String']['output']>;
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
  generateReview: Scalars['String']['output'];
  getCategoryById: ResponseCategory;
  getOrderById: ResponseOrders;
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
  logout: LogoutResponse;
  resetPassword: ResetPasswordResponse;
  updateCategory: ResponseCategory;
  updateOrder: ResponseOrders;
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


export type MutationLogoutArgs = {
  userID: Scalars['String']['input'];
};


export type MutationResetPasswordArgs = {
  data: InputresetPassword;
};


export type MutationUpdateCategoryArgs = {
  categoryID: Scalars['String']['input'];
  data: InputUpdateCategory;
};


export type MutationUpdateOrderArgs = {
  data: InputUpdateOrders;
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

export type Otp = {
  __typename?: 'OTP';
  hasExpired: Scalars['Boolean']['output'];
  lastUsed: Scalars['DateTime']['output'];
  token: Scalars['String']['output'];
  userID: Scalars['String']['output'];
};

export type OtpInput = {
  token: Scalars['String']['input'];
};

export type OtpResponse = {
  __typename?: 'OTPResponse';
  data?: Maybe<Otp>;
  err?: Maybe<Scalars['String']['output']>;
};

export type OrderUserDetails = {
  address: AddressInput;
  phoneNumber: Scalars['String']['input'];
};

export type Orders = {
  __typename?: 'Orders';
  address: Address;
  amount: Scalars['Float']['output'];
  email: Scalars['String']['output'];
  hasFailed: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  isPending: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  orderedAt: Scalars['DateTime']['output'];
  paymentBy: Scalars['String']['output'];
  phoneNumber: Scalars['String']['output'];
  productsOrdered: Array<Product>;
  razorpayDetails: Razorpay;
  shippingFee: Scalars['Float']['output'];
  tax: Scalars['Float']['output'];
  updateAddress: Scalars['Boolean']['output'];
  userOrdered: User;
  userid: Scalars['String']['output'];
};

export type Product = {
  __typename?: 'Product';
  brand: Scalars['String']['output'];
  category?: Maybe<Category>;
  categoryName: Scalars['String']['output'];
  coverImage: Array<Scalars['String']['output']>;
  dateCreated: Scalars['Int']['output'];
  dateCreatedHuman: Scalars['String']['output'];
  description: Scalars['String']['output'];
  discountPercent: Scalars['Float']['output'];
  id: Scalars['String']['output'];
  images: Array<Array<Scalars['String']['output']>>;
  onSale: Scalars['Boolean']['output'];
  orderedBy?: Maybe<Array<Orders>>;
  price: Scalars['Float']['output'];
  quantity?: Maybe<Scalars['Int']['output']>;
  rating: Scalars['Float']['output'];
  reviewedBy?: Maybe<Array<Reviews>>;
  seller?: Maybe<Seller>;
  sellerName: Scalars['String']['output'];
  stock: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  totalReviews: Scalars['Int']['output'];
  wishedBy?: Maybe<Array<Wishlist>>;
};

export type Query = {
  __typename?: 'Query';
  checkOtpExpired: OtpResponse;
  confirmAccount: ConfirmAccount;
  getAllCategories: ResponseGetallCategory;
  getAllOrders: ResponseGetallOrders;
  getAllProducts: ResponseGetallProduct;
  getAllProductsPaginate: ResponseGetallProduct;
  getAllReviews: ResponseGetallReviews;
  getAllReviewsByProductId: ResponseGetallReviews;
  getAllReviewsByUserId: ResponseGetallReviews;
  getAllSeller: ResponseGetallSeller;
  getAllUsers: ResponseGetallUser;
  getAllWishlis: ResponseGetallWishlist;
  getOrdersByUserid: ResponseGetallOrders;
  getProductById: ResponseProduct;
  getProductsBySearchTerm: ResponseGetallProduct;
  getProductsBySearchTermAtlasSearch: SearchResponseResult;
  getProductsBySearchTermPaginate: ResponseGetallProduct;
  getReviewsPaginate: ResponseGetallReviews;
  getReviewsPercentage: ReviewsPercentageResponse;
  getUserById: ResponseUser;
  hello: Scalars['String']['output'];
};


export type QueryCheckOtpExpiredArgs = {
  data: OtpInput;
};


export type QueryConfirmAccountArgs = {
  token: Scalars['String']['input'];
};


export type QueryGetAllProductsPaginateArgs = {
  limit: Scalars['Int']['input'];
  skipping: Scalars['Int']['input'];
};


export type QueryGetAllReviewsByProductIdArgs = {
  productID: Scalars['String']['input'];
};


export type QueryGetAllReviewsByUserIdArgs = {
  limit: Scalars['Int']['input'];
  skipping: Scalars['Int']['input'];
  userID: Scalars['String']['input'];
};


export type QueryGetOrdersByUseridArgs = {
  limit: Scalars['Int']['input'];
  skipping: Scalars['Int']['input'];
  userID: Scalars['String']['input'];
};


export type QueryGetProductByIdArgs = {
  productID: Scalars['String']['input'];
};


export type QueryGetProductsBySearchTermArgs = {
  term: Scalars['String']['input'];
};


export type QueryGetProductsBySearchTermAtlasSearchArgs = {
  lastTokensaved: Scalars['String']['input'];
  limit: Scalars['Int']['input'];
  term: Scalars['String']['input'];
};


export type QueryGetProductsBySearchTermPaginateArgs = {
  limit: Scalars['Int']['input'];
  skipping: Scalars['Int']['input'];
  term: Scalars['String']['input'];
};


export type QueryGetReviewsPaginateArgs = {
  limit: Scalars['Int']['input'];
  prodID: Scalars['String']['input'];
  skipping: Scalars['Int']['input'];
};


export type QueryGetReviewsPercentageArgs = {
  prodID: Scalars['String']['input'];
};


export type QueryGetUserByIdArgs = {
  userID: Scalars['String']['input'];
};

export type Razorpay = {
  __typename?: 'Razorpay';
  razorpayOrderId?: Maybe<Scalars['String']['output']>;
  razorpayPaymentId?: Maybe<Scalars['String']['output']>;
  razorpaySignature?: Maybe<Scalars['String']['output']>;
};

export type RazorpayUpdate = {
  razorpayOrderId?: InputMaybe<Scalars['String']['input']>;
  razorpayPaymentId?: InputMaybe<Scalars['String']['input']>;
  razorpaySignature?: InputMaybe<Scalars['String']['input']>;
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

export type ResponseGetallReviews = {
  __typename?: 'ResponseGetallReviews';
  data?: Maybe<Array<Reviews>>;
  err?: Maybe<Scalars['String']['output']>;
};

export type ResponseGetallSeller = {
  __typename?: 'ResponseGetallSeller';
  data?: Maybe<Array<Seller>>;
  err?: Maybe<Scalars['String']['output']>;
};

export type ResponseGetallUser = {
  __typename?: 'ResponseGetallUser';
  data?: Maybe<Array<User>>;
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
  productId: Scalars['String']['output'];
  productReviewed: Product;
  rating: Scalars['Int']['output'];
  reviewedAt: Scalars['DateTime']['output'];
  userId: Scalars['String']['output'];
  userReviewed: User;
};

export type ReviewsPercentage = {
  __typename?: 'ReviewsPercentage';
  fiveStars?: Maybe<Scalars['Float']['output']>;
  fourStars?: Maybe<Scalars['Float']['output']>;
  oneStars?: Maybe<Scalars['Float']['output']>;
  threeStars?: Maybe<Scalars['Float']['output']>;
  totalReviews?: Maybe<Scalars['Int']['output']>;
  twoStars?: Maybe<Scalars['Float']['output']>;
};

export type ReviewsPercentageResponse = {
  __typename?: 'ReviewsPercentageResponse';
  data?: Maybe<ReviewsPercentage>;
  err?: Maybe<Scalars['String']['output']>;
};

export type SearchResponse = {
  __typename?: 'SearchResponse';
  brand: Scalars['String']['output'];
  categoryName: Scalars['String']['output'];
  coverImage: Array<Scalars['String']['output']>;
  description: Scalars['String']['output'];
  id: Scalars['String']['output'];
  paginationToken: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  rating: Scalars['Float']['output'];
  score: Scalars['Float']['output'];
  sellerName: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type SearchResponseResult = {
  __typename?: 'SearchResponseResult';
  data?: Maybe<Array<SearchResponse>>;
  err?: Maybe<Scalars['String']['output']>;
  lastToken?: Maybe<Scalars['String']['output']>;
};

export type Seller = {
  __typename?: 'Seller';
  companyAddress: Address;
  companyName: Scalars['String']['output'];
  confirmed: Scalars['Boolean']['output'];
  country: Scalars['String']['output'];
  dob: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  password: Scalars['String']['output'];
  phoneNumber: Scalars['String']['output'];
  productsSelling: Array<Product>;
  profilePic: Scalars['String']['output'];
  sellerName: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  address: Address;
  confirmed: Scalars['Boolean']['output'];
  dob: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  orders: Array<Orders>;
  password: Scalars['String']['output'];
  phoneNumber: Scalars['String']['output'];
  profilePic: Scalars['String']['output'];
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

export type ResetPassword = {
  __typename?: 'resetPassword';
  token: Scalars['String']['output'];
  userid: Scalars['String']['output'];
};

export type ResetPasswordResponse = {
  __typename?: 'resetPasswordResponse';
  data?: Maybe<ResetPassword>;
  err?: Maybe<Scalars['String']['output']>;
};

export type CategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoriesQuery = { __typename?: 'Query', getAllCategories: { __typename?: 'ResponseGetallCategory', data?: Array<{ __typename?: 'Category', id: string, name: string, categoryImage: Array<string> }> | null } };

export type LoginMutationVariables = Exact<{
  data: InputLogin;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', err?: string | null, data?: { __typename?: 'Login', userID: string, email: string, userType: string, accToken: string, profilePic: string, name: string, phoneNumber: string, address: { __typename?: 'Address', streetAddress: string, country: string, countryCode: string, city: string, state: string, zipCode: string } } | null } };

export type SignupMutationVariables = Exact<{
  data: InputUser;
}>;


export type SignupMutation = { __typename?: 'Mutation', createUser: { __typename?: 'ResponseUser', err?: string | null, data?: { __typename?: 'User', email: string } | null } };

export type OtpexpiredQueryVariables = Exact<{
  data: OtpInput;
}>;


export type OtpexpiredQuery = { __typename?: 'Query', checkOtpExpired: { __typename?: 'OTPResponse', err?: string | null, data?: { __typename?: 'OTP', hasExpired: boolean } | null } };

export type ConfirmaccQueryVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type ConfirmaccQuery = { __typename?: 'Query', confirmAccount: { __typename?: 'ConfirmAccount', data?: string | null, err?: string | null } };

export type Create_ReviewMutationVariables = Exact<{
  data: InputReviews;
}>;


export type Create_ReviewMutation = { __typename?: 'Mutation', createReview: { __typename?: 'ResponseReviews', err?: string | null, data?: { __typename?: 'Reviews', id: string, comment: string, reviewedAt: any, rating: number, userReviewed: { __typename?: 'User', name: string, profilePic: string } } | null } };

export type CreateorderMutationVariables = Exact<{
  data: InputOrders;
}>;


export type CreateorderMutation = { __typename?: 'Mutation', createOrder: Array<string> };

export type ForgpassMutationVariables = Exact<{
  data: InputForgotPassword;
}>;


export type ForgpassMutation = { __typename?: 'Mutation', forgotPassword: { __typename?: 'ForgotPasswordResponse', err?: string | null, data?: { __typename?: 'ForgotPassword', email: string, token: string } | null } };

export type SearchTermPaginateQueryVariables = Exact<{
  term: Scalars['String']['input'];
  skipping: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
}>;


export type SearchTermPaginateQuery = { __typename?: 'Query', getProductsBySearchTermPaginate: { __typename?: 'ResponseGetallProduct', err?: string | null, data?: Array<{ __typename?: 'Product', id: string, title: string, rating: number, price: number, brand: string, categoryName: string, images: Array<Array<string>>, coverImage: Array<string> }> | null } };

export type GetProductByIdQueryVariables = Exact<{
  productId: Scalars['String']['input'];
}>;


export type GetProductByIdQuery = { __typename?: 'Query', getProductById: { __typename?: 'ResponseProduct', err?: string | null, data?: { __typename?: 'Product', id: string, title: string, stock: number, price: number, rating: number, description: string, brand: string, images: Array<Array<string>>, dateCreated: number, dateCreatedHuman: string, coverImage: Array<string>, category?: { __typename?: 'Category', name: string } | null, seller?: { __typename?: 'Seller', email: string, sellerName: string, companyName: string, phoneNumber: string, companyAddress: { __typename?: 'Address', country: string, streetAddress: string, state: string, city: string, zipCode: string, countryCode: string } } | null } | null } };

export type PaginateProdQueryVariables = Exact<{
  skipping: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
}>;


export type PaginateProdQuery = { __typename?: 'Query', getAllProductsPaginate: { __typename?: 'ResponseGetallProduct', err?: string | null, data?: Array<{ __typename?: 'Product', id: string, rating: number, title: string, stock: number, price: number, description: string, brand: string, categoryName: string, images: Array<Array<string>>, dateCreated: number, dateCreatedHuman: string, coverImage: Array<string> }> | null } };

export type Get_Order_By_UseridQueryVariables = Exact<{
  userId: Scalars['String']['input'];
  skipping: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
}>;


export type Get_Order_By_UseridQuery = { __typename?: 'Query', getOrdersByUserid: { __typename?: 'ResponseGetallOrders', err?: string | null, data?: Array<{ __typename?: 'Orders', id: string, name: string, email: string, phoneNumber: string, paymentBy: string, isPending: boolean, amount: number, orderedAt: any, address: { __typename?: 'Address', city: string, state: string, country: string, zipCode: string, streetAddress: string }, productsOrdered: Array<{ __typename?: 'Product', title: string, quantity?: number | null, sellerName: string, price: number }> }> | null } };

export type GetrevuseridQueryVariables = Exact<{
  userId: Scalars['String']['input'];
  skipping: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
}>;


export type GetrevuseridQuery = { __typename?: 'Query', getAllReviewsByUserId: { __typename?: 'ResponseGetallReviews', err?: string | null, data?: Array<{ __typename?: 'Reviews', id: string, comment: string, reviewedAt: any, userReviewed: { __typename?: 'User', name: string }, productReviewed: { __typename?: 'Product', id: string } }> | null } };

export type Get_Reviews_PaginateQueryVariables = Exact<{
  prodId: Scalars['String']['input'];
  skipping: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
}>;


export type Get_Reviews_PaginateQuery = { __typename?: 'Query', getReviewsPaginate: { __typename?: 'ResponseGetallReviews', err?: string | null, data?: Array<{ __typename?: 'Reviews', id: string, rating: number, comment: string, reviewedAt: any, userReviewed: { __typename?: 'User', name: string, profilePic: string } }> | null } };

export type Search_AtlasQueryVariables = Exact<{
  term: Scalars['String']['input'];
  limit: Scalars['Int']['input'];
  lastTokensaved: Scalars['String']['input'];
}>;


export type Search_AtlasQuery = { __typename?: 'Query', getProductsBySearchTermAtlasSearch: { __typename?: 'SearchResponseResult', lastToken?: string | null, err?: string | null, data?: Array<{ __typename?: 'SearchResponse', brand: string, categoryName: string, description: string, coverImage: Array<string>, id: string, price: number, score: number, sellerName: string, title: string, rating: number }> | null } };

export type LogoutMutationVariables = Exact<{
  userID: Scalars['String']['input'];
}>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'LogoutResponse', data?: string | null, err?: string | null } };

export type MequeryQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type MequeryQuery = { __typename?: 'Query', getUserById: { __typename?: 'ResponseUser', err?: string | null, data?: { __typename?: 'User', name: string, email: string, profilePic: string, phoneNumber: string, dob: string, id: string, address: { __typename?: 'Address', city: string, country: string, countryCode: string, state: string, streetAddress: string, zipCode: string } } | null } };

export type ResetpassMutationVariables = Exact<{
  data: InputresetPassword;
}>;


export type ResetpassMutation = { __typename?: 'Mutation', resetPassword: { __typename?: 'resetPasswordResponse', err?: string | null, data?: { __typename?: 'resetPassword', token: string, userid: string } | null } };

export type ReviewpercentageQueryVariables = Exact<{
  prodId: Scalars['String']['input'];
}>;


export type ReviewpercentageQuery = { __typename?: 'Query', getReviewsPercentage: { __typename?: 'ReviewsPercentageResponse', err?: string | null, data?: { __typename?: 'ReviewsPercentage', fiveStars?: number | null, fourStars?: number | null, oneStars?: number | null, threeStars?: number | null, twoStars?: number | null, totalReviews?: number | null } | null } };

export type UpdateordersMutationVariables = Exact<{
  data: InputUpdateOrders;
}>;


export type UpdateordersMutation = { __typename?: 'Mutation', updateOrder: { __typename?: 'ResponseOrders', err?: string | null, data?: { __typename?: 'Orders', id: string, amount: number, isPending: boolean, hasFailed: boolean } | null } };

export type UpdateuserMutationVariables = Exact<{
  data: InputUpdateUser;
  userId: Scalars['String']['input'];
}>;


export type UpdateuserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'ResponseUser', err?: string | null, data?: { __typename?: 'User', name: string } | null } };


export const CategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"categoryImage"}}]}}]}}]}}]} as unknown as DocumentNode<CategoriesQuery, CategoriesQueryVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InputLogin"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userID"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"accToken"}},{"kind":"Field","name":{"kind":"Name","value":"profilePic"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"streetAddress"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"countryCode"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"zipCode"}}]}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}}]}},{"kind":"Field","name":{"kind":"Name","value":"err"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const SignupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"signup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InputUser"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"err"}}]}}]}}]} as unknown as DocumentNode<SignupMutation, SignupMutationVariables>;
export const OtpexpiredDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"otpexpired"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OTPInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checkOtpExpired"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasExpired"}}]}},{"kind":"Field","name":{"kind":"Name","value":"err"}}]}}]}}]} as unknown as DocumentNode<OtpexpiredQuery, OtpexpiredQueryVariables>;
export const ConfirmaccDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"confirmacc"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"confirmAccount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"err"}}]}}]}}]} as unknown as DocumentNode<ConfirmaccQuery, ConfirmaccQueryVariables>;
export const Create_ReviewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"create_review"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InputReviews"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createReview"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}},{"kind":"Field","name":{"kind":"Name","value":"reviewedAt"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"userReviewed"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profilePic"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"err"}}]}}]}}]} as unknown as DocumentNode<Create_ReviewMutation, Create_ReviewMutationVariables>;
export const CreateorderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createorder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InputOrders"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}]}]}}]} as unknown as DocumentNode<CreateorderMutation, CreateorderMutationVariables>;
export const ForgpassDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"forgpass"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InputForgotPassword"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"forgotPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}},{"kind":"Field","name":{"kind":"Name","value":"err"}}]}}]}}]} as unknown as DocumentNode<ForgpassMutation, ForgpassMutationVariables>;
export const SearchTermPaginateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"searchTermPaginate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"term"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skipping"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProductsBySearchTermPaginate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"term"},"value":{"kind":"Variable","name":{"kind":"Name","value":"term"}}},{"kind":"Argument","name":{"kind":"Name","value":"skipping"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skipping"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"brand"}},{"kind":"Field","name":{"kind":"Name","value":"categoryName"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"coverImage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"err"}}]}}]}}]} as unknown as DocumentNode<SearchTermPaginateQuery, SearchTermPaginateQueryVariables>;
export const GetProductByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getProductById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProductById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"productID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"stock"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"brand"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"dateCreated"}},{"kind":"Field","name":{"kind":"Name","value":"dateCreatedHuman"}},{"kind":"Field","name":{"kind":"Name","value":"coverImage"}},{"kind":"Field","name":{"kind":"Name","value":"seller"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"sellerName"}},{"kind":"Field","name":{"kind":"Name","value":"companyName"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"companyAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"streetAddress"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"zipCode"}},{"kind":"Field","name":{"kind":"Name","value":"countryCode"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"err"}}]}}]}}]} as unknown as DocumentNode<GetProductByIdQuery, GetProductByIdQueryVariables>;
export const PaginateProdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"paginateProd"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skipping"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllProductsPaginate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"skipping"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skipping"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"stock"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"brand"}},{"kind":"Field","name":{"kind":"Name","value":"categoryName"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"dateCreated"}},{"kind":"Field","name":{"kind":"Name","value":"dateCreatedHuman"}},{"kind":"Field","name":{"kind":"Name","value":"coverImage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"err"}}]}}]}}]} as unknown as DocumentNode<PaginateProdQuery, PaginateProdQueryVariables>;
export const Get_Order_By_UseridDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"get_order_by_userid"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skipping"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getOrdersByUserid"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"skipping"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skipping"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"paymentBy"}},{"kind":"Field","name":{"kind":"Name","value":"isPending"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"zipCode"}},{"kind":"Field","name":{"kind":"Name","value":"streetAddress"}}]}},{"kind":"Field","name":{"kind":"Name","value":"productsOrdered"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"sellerName"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}},{"kind":"Field","name":{"kind":"Name","value":"orderedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"err"}}]}}]}}]} as unknown as DocumentNode<Get_Order_By_UseridQuery, Get_Order_By_UseridQueryVariables>;
export const GetrevuseridDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getrevuserid"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skipping"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllReviewsByUserId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"skipping"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skipping"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}},{"kind":"Field","name":{"kind":"Name","value":"reviewedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userReviewed"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"productReviewed"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"err"}}]}}]}}]} as unknown as DocumentNode<GetrevuseridQuery, GetrevuseridQueryVariables>;
export const Get_Reviews_PaginateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"get_reviews_paginate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"prodId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skipping"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getReviewsPaginate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"prodID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"prodId"}}},{"kind":"Argument","name":{"kind":"Name","value":"skipping"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skipping"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}},{"kind":"Field","name":{"kind":"Name","value":"userReviewed"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profilePic"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reviewedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"err"}}]}}]}}]} as unknown as DocumentNode<Get_Reviews_PaginateQuery, Get_Reviews_PaginateQueryVariables>;
export const Search_AtlasDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"search_atlas"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"term"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lastTokensaved"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProductsBySearchTermAtlasSearch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"term"},"value":{"kind":"Variable","name":{"kind":"Name","value":"term"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"lastTokensaved"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastTokensaved"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"brand"}},{"kind":"Field","name":{"kind":"Name","value":"categoryName"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"coverImage"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"sellerName"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lastToken"}},{"kind":"Field","name":{"kind":"Name","value":"err"}}]}}]}}]} as unknown as DocumentNode<Search_AtlasQuery, Search_AtlasQueryVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"logout"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"err"}}]}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const MequeryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"mequery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"countryCode"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"streetAddress"}},{"kind":"Field","name":{"kind":"Name","value":"zipCode"}}]}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"profilePic"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"dob"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"err"}}]}}]}}]} as unknown as DocumentNode<MequeryQuery, MequeryQueryVariables>;
export const ResetpassDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"resetpass"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InputresetPassword"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"userid"}}]}},{"kind":"Field","name":{"kind":"Name","value":"err"}}]}}]}}]} as unknown as DocumentNode<ResetpassMutation, ResetpassMutationVariables>;
export const ReviewpercentageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"reviewpercentage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"prodId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getReviewsPercentage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"prodID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"prodId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fiveStars"}},{"kind":"Field","name":{"kind":"Name","value":"fourStars"}},{"kind":"Field","name":{"kind":"Name","value":"oneStars"}},{"kind":"Field","name":{"kind":"Name","value":"threeStars"}},{"kind":"Field","name":{"kind":"Name","value":"twoStars"}},{"kind":"Field","name":{"kind":"Name","value":"totalReviews"}}]}},{"kind":"Field","name":{"kind":"Name","value":"err"}}]}}]}}]} as unknown as DocumentNode<ReviewpercentageQuery, ReviewpercentageQueryVariables>;
export const UpdateordersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateorders"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InputUpdateOrders"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"isPending"}},{"kind":"Field","name":{"kind":"Name","value":"hasFailed"}}]}},{"kind":"Field","name":{"kind":"Name","value":"err"}}]}}]}}]} as unknown as DocumentNode<UpdateordersMutation, UpdateordersMutationVariables>;
export const UpdateuserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateuser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InputUpdateUser"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"userID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"err"}}]}}]}}]} as unknown as DocumentNode<UpdateuserMutation, UpdateuserMutationVariables>;