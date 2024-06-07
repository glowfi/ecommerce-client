/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "query categories {\n  getAllCategories {\n    data {\n      id\n      name\n      categoryImage\n    }\n  }\n}": types.CategoriesDocument,
    "mutation login($data: InputLogin!) {\n  login(data: $data) {\n    data {\n      userID\n      email\n      userType\n      accToken\n      profilePic\n      name\n      address {\n        streetAddress\n        country\n        countryCode\n        city\n        state\n        zipCode\n      }\n      phoneNumber\n    }\n    err\n  }\n}": types.LoginDocument,
    "mutation signup($data: InputUser!) {\n  createUser(data: $data) {\n    data {\n      email\n    }\n    err\n  }\n}": types.SignupDocument,
    "query otpexpired($data: OTPInput!) {\n  checkOtpExpired(data: $data) {\n    data {\n      hasExpired\n    }\n    err\n  }\n}": types.OtpexpiredDocument,
    "query confirmacc($token: String!) {\n  confirmAccount(token: $token) {\n    data\n    err\n  }\n}": types.ConfirmaccDocument,
    "mutation create_review($data: InputReviews!) {\n  createReview(data: $data) {\n    data {\n      id\n      comment\n    }\n    err\n  }\n}": types.Create_ReviewDocument,
    "mutation createorder($data: InputOrders!) {\n  createOrder(data: $data)\n}": types.CreateorderDocument,
    "mutation forgpass($data: InputForgotPassword!) {\n  forgotPassword(data: $data) {\n    data {\n      email\n      token\n    }\n    err\n  }\n}": types.ForgpassDocument,
    "query searchTermPaginate($term: String!, $skipping: Int!, $limit: Int!) {\n  getProductsBySearchTermPaginate(term: $term, skipping: $skipping, limit: $limit) {\n    data {\n      id\n      title\n      price\n      brand\n      category {\n        name\n      }\n      images\n      coverImage\n    }\n    err\n  }\n}": types.SearchTermPaginateDocument,
    "query getProductById($productId: String!) {\n  getProductById(productID: $productId) {\n    data {\n      id\n      title\n      stock\n      price\n      rating\n      description\n      brand\n      category {\n        name\n      }\n      images\n      dateCreated\n      dateCreatedHuman\n      coverImage\n      seller {\n        email\n        sellerName\n        companyName\n        phoneNumber\n        companyAddress {\n          streetAddress\n          state\n          city\n          zipCode\n          countryCode\n        }\n      }\n    }\n    err\n  }\n}": types.GetProductByIdDocument,
    "query paginateProd($skipping: Int!, $limit: Int!) {\n  getAllProductsPaginate(skipping: $skipping, limit: $limit) {\n    data {\n      id\n      title\n      stock\n      price\n      rating\n      description\n      brand\n      category {\n        name\n      }\n      images\n      dateCreated\n      dateCreatedHuman\n      wishedBy {\n        productWished {\n          brand\n        }\n      }\n      coverImage\n      seller {\n        email\n        sellerName\n        companyName\n        phoneNumber\n        companyAddress {\n          streetAddress\n          state\n          city\n          zipCode\n          countryCode\n        }\n      }\n    }\n    err\n  }\n}": types.PaginateProdDocument,
    "query get_reviews_paginate($prodId: String!, $skipping: Int!, $limit: Int!) {\n  getReviewsPaginate(prodID: $prodId, skipping: $skipping, limit: $limit) {\n    data {\n      id\n      comment\n      userReviewed {\n        name\n      }\n      reviewedAt\n    }\n    err\n  }\n}": types.Get_Reviews_PaginateDocument,
    "query sbyterm($term: String!) {\n  getProductsBySearchTerm(term: $term) {\n    data {\n      id\n      title\n      stock\n      price\n      rating\n      description\n      brand\n      category {\n        name\n      }\n      images\n      dateCreated\n      dateCreatedHuman\n      wishedBy {\n        productWished {\n          brand\n        }\n      }\n      coverImage\n      seller {\n        email\n        sellerName\n        companyName\n        phoneNumber\n        companyAddress {\n          streetAddress\n          state\n          city\n          zipCode\n        }\n      }\n    }\n    err\n  }\n}": types.SbytermDocument,
    "mutation logout($userID: String!) {\n  logout(userID: $userID) {\n    data\n    err\n  }\n}": types.LogoutDocument,
    "mutation resetpass($data: InputresetPassword!) {\n  resetPassword(data: $data) {\n    data {\n      token\n      userid\n    }\n    err\n  }\n}": types.ResetpassDocument,
    "mutation updateorders($data: InputUpdateOrders!) {\n  updateOrder(data: $data) {\n    data {\n      id\n      amount\n      isPending\n      hasFailed\n    }\n    err\n  }\n}": types.UpdateordersDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query categories {\n  getAllCategories {\n    data {\n      id\n      name\n      categoryImage\n    }\n  }\n}"): (typeof documents)["query categories {\n  getAllCategories {\n    data {\n      id\n      name\n      categoryImage\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation login($data: InputLogin!) {\n  login(data: $data) {\n    data {\n      userID\n      email\n      userType\n      accToken\n      profilePic\n      name\n      address {\n        streetAddress\n        country\n        countryCode\n        city\n        state\n        zipCode\n      }\n      phoneNumber\n    }\n    err\n  }\n}"): (typeof documents)["mutation login($data: InputLogin!) {\n  login(data: $data) {\n    data {\n      userID\n      email\n      userType\n      accToken\n      profilePic\n      name\n      address {\n        streetAddress\n        country\n        countryCode\n        city\n        state\n        zipCode\n      }\n      phoneNumber\n    }\n    err\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation signup($data: InputUser!) {\n  createUser(data: $data) {\n    data {\n      email\n    }\n    err\n  }\n}"): (typeof documents)["mutation signup($data: InputUser!) {\n  createUser(data: $data) {\n    data {\n      email\n    }\n    err\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query otpexpired($data: OTPInput!) {\n  checkOtpExpired(data: $data) {\n    data {\n      hasExpired\n    }\n    err\n  }\n}"): (typeof documents)["query otpexpired($data: OTPInput!) {\n  checkOtpExpired(data: $data) {\n    data {\n      hasExpired\n    }\n    err\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query confirmacc($token: String!) {\n  confirmAccount(token: $token) {\n    data\n    err\n  }\n}"): (typeof documents)["query confirmacc($token: String!) {\n  confirmAccount(token: $token) {\n    data\n    err\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation create_review($data: InputReviews!) {\n  createReview(data: $data) {\n    data {\n      id\n      comment\n    }\n    err\n  }\n}"): (typeof documents)["mutation create_review($data: InputReviews!) {\n  createReview(data: $data) {\n    data {\n      id\n      comment\n    }\n    err\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation createorder($data: InputOrders!) {\n  createOrder(data: $data)\n}"): (typeof documents)["mutation createorder($data: InputOrders!) {\n  createOrder(data: $data)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation forgpass($data: InputForgotPassword!) {\n  forgotPassword(data: $data) {\n    data {\n      email\n      token\n    }\n    err\n  }\n}"): (typeof documents)["mutation forgpass($data: InputForgotPassword!) {\n  forgotPassword(data: $data) {\n    data {\n      email\n      token\n    }\n    err\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query searchTermPaginate($term: String!, $skipping: Int!, $limit: Int!) {\n  getProductsBySearchTermPaginate(term: $term, skipping: $skipping, limit: $limit) {\n    data {\n      id\n      title\n      price\n      brand\n      category {\n        name\n      }\n      images\n      coverImage\n    }\n    err\n  }\n}"): (typeof documents)["query searchTermPaginate($term: String!, $skipping: Int!, $limit: Int!) {\n  getProductsBySearchTermPaginate(term: $term, skipping: $skipping, limit: $limit) {\n    data {\n      id\n      title\n      price\n      brand\n      category {\n        name\n      }\n      images\n      coverImage\n    }\n    err\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getProductById($productId: String!) {\n  getProductById(productID: $productId) {\n    data {\n      id\n      title\n      stock\n      price\n      rating\n      description\n      brand\n      category {\n        name\n      }\n      images\n      dateCreated\n      dateCreatedHuman\n      coverImage\n      seller {\n        email\n        sellerName\n        companyName\n        phoneNumber\n        companyAddress {\n          streetAddress\n          state\n          city\n          zipCode\n          countryCode\n        }\n      }\n    }\n    err\n  }\n}"): (typeof documents)["query getProductById($productId: String!) {\n  getProductById(productID: $productId) {\n    data {\n      id\n      title\n      stock\n      price\n      rating\n      description\n      brand\n      category {\n        name\n      }\n      images\n      dateCreated\n      dateCreatedHuman\n      coverImage\n      seller {\n        email\n        sellerName\n        companyName\n        phoneNumber\n        companyAddress {\n          streetAddress\n          state\n          city\n          zipCode\n          countryCode\n        }\n      }\n    }\n    err\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query paginateProd($skipping: Int!, $limit: Int!) {\n  getAllProductsPaginate(skipping: $skipping, limit: $limit) {\n    data {\n      id\n      title\n      stock\n      price\n      rating\n      description\n      brand\n      category {\n        name\n      }\n      images\n      dateCreated\n      dateCreatedHuman\n      wishedBy {\n        productWished {\n          brand\n        }\n      }\n      coverImage\n      seller {\n        email\n        sellerName\n        companyName\n        phoneNumber\n        companyAddress {\n          streetAddress\n          state\n          city\n          zipCode\n          countryCode\n        }\n      }\n    }\n    err\n  }\n}"): (typeof documents)["query paginateProd($skipping: Int!, $limit: Int!) {\n  getAllProductsPaginate(skipping: $skipping, limit: $limit) {\n    data {\n      id\n      title\n      stock\n      price\n      rating\n      description\n      brand\n      category {\n        name\n      }\n      images\n      dateCreated\n      dateCreatedHuman\n      wishedBy {\n        productWished {\n          brand\n        }\n      }\n      coverImage\n      seller {\n        email\n        sellerName\n        companyName\n        phoneNumber\n        companyAddress {\n          streetAddress\n          state\n          city\n          zipCode\n          countryCode\n        }\n      }\n    }\n    err\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query get_reviews_paginate($prodId: String!, $skipping: Int!, $limit: Int!) {\n  getReviewsPaginate(prodID: $prodId, skipping: $skipping, limit: $limit) {\n    data {\n      id\n      comment\n      userReviewed {\n        name\n      }\n      reviewedAt\n    }\n    err\n  }\n}"): (typeof documents)["query get_reviews_paginate($prodId: String!, $skipping: Int!, $limit: Int!) {\n  getReviewsPaginate(prodID: $prodId, skipping: $skipping, limit: $limit) {\n    data {\n      id\n      comment\n      userReviewed {\n        name\n      }\n      reviewedAt\n    }\n    err\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query sbyterm($term: String!) {\n  getProductsBySearchTerm(term: $term) {\n    data {\n      id\n      title\n      stock\n      price\n      rating\n      description\n      brand\n      category {\n        name\n      }\n      images\n      dateCreated\n      dateCreatedHuman\n      wishedBy {\n        productWished {\n          brand\n        }\n      }\n      coverImage\n      seller {\n        email\n        sellerName\n        companyName\n        phoneNumber\n        companyAddress {\n          streetAddress\n          state\n          city\n          zipCode\n        }\n      }\n    }\n    err\n  }\n}"): (typeof documents)["query sbyterm($term: String!) {\n  getProductsBySearchTerm(term: $term) {\n    data {\n      id\n      title\n      stock\n      price\n      rating\n      description\n      brand\n      category {\n        name\n      }\n      images\n      dateCreated\n      dateCreatedHuman\n      wishedBy {\n        productWished {\n          brand\n        }\n      }\n      coverImage\n      seller {\n        email\n        sellerName\n        companyName\n        phoneNumber\n        companyAddress {\n          streetAddress\n          state\n          city\n          zipCode\n        }\n      }\n    }\n    err\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation logout($userID: String!) {\n  logout(userID: $userID) {\n    data\n    err\n  }\n}"): (typeof documents)["mutation logout($userID: String!) {\n  logout(userID: $userID) {\n    data\n    err\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation resetpass($data: InputresetPassword!) {\n  resetPassword(data: $data) {\n    data {\n      token\n      userid\n    }\n    err\n  }\n}"): (typeof documents)["mutation resetpass($data: InputresetPassword!) {\n  resetPassword(data: $data) {\n    data {\n      token\n      userid\n    }\n    err\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation updateorders($data: InputUpdateOrders!) {\n  updateOrder(data: $data) {\n    data {\n      id\n      amount\n      isPending\n      hasFailed\n    }\n    err\n  }\n}"): (typeof documents)["mutation updateorders($data: InputUpdateOrders!) {\n  updateOrder(data: $data) {\n    data {\n      id\n      amount\n      isPending\n      hasFailed\n    }\n    err\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;