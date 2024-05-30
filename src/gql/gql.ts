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
    "query getallprod {\n  getAllProducts {\n    data {\n      id\n      title\n      stock\n      price\n      rating\n      description\n      brand\n      category {\n        name\n      }\n      images\n      dateCreated\n      dateCreatedHuman\n      wishedBy {\n        productWished {\n          brand\n        }\n      }\n      coverImage\n      seller {\n        email\n        sellerName\n        companyName\n        phoneNumber\n        companyAddress {\n          streetAddress\n          state\n          city\n          zipCode\n        }\n      }\n    }\n    err\n  }\n}": types.GetallprodDocument,
    "mutation login($data: InputLogin!) {\n  login(data: $data) {\n    data {\n      userID\n      email\n      userType\n      accToken\n    }\n    err\n  }\n}": types.LoginDocument,
    "query paginateProd($skipping: Int!, $limit: Int!) {\n  getAllProductsPaginate(skipping: $skipping, limit: $limit) {\n    data {\n      id\n      title\n      stock\n      price\n      rating\n      description\n      brand\n      category {\n        name\n      }\n      images\n      dateCreated\n      dateCreatedHuman\n      wishedBy {\n        productWished {\n          brand\n        }\n      }\n      coverImage\n      seller {\n        email\n        sellerName\n        companyName\n        phoneNumber\n        companyAddress {\n          streetAddress\n          state\n          city\n          zipCode\n        }\n      }\n    }\n    err\n  }\n}": types.PaginateProdDocument,
    "query sbyterm($term: String!) {\n  getProductsBySearchTerm(term: $term) {\n    data {\n      id\n      title\n      stock\n      price\n      rating\n      description\n      brand\n      category {\n        name\n      }\n      images\n      dateCreated\n      dateCreatedHuman\n      wishedBy {\n        productWished {\n          brand\n        }\n      }\n      coverImage\n      seller {\n        email\n        sellerName\n        companyName\n        phoneNumber\n        companyAddress {\n          streetAddress\n          state\n          city\n          zipCode\n        }\n      }\n    }\n    err\n  }\n}": types.SbytermDocument,
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
export function graphql(source: "query getallprod {\n  getAllProducts {\n    data {\n      id\n      title\n      stock\n      price\n      rating\n      description\n      brand\n      category {\n        name\n      }\n      images\n      dateCreated\n      dateCreatedHuman\n      wishedBy {\n        productWished {\n          brand\n        }\n      }\n      coverImage\n      seller {\n        email\n        sellerName\n        companyName\n        phoneNumber\n        companyAddress {\n          streetAddress\n          state\n          city\n          zipCode\n        }\n      }\n    }\n    err\n  }\n}"): (typeof documents)["query getallprod {\n  getAllProducts {\n    data {\n      id\n      title\n      stock\n      price\n      rating\n      description\n      brand\n      category {\n        name\n      }\n      images\n      dateCreated\n      dateCreatedHuman\n      wishedBy {\n        productWished {\n          brand\n        }\n      }\n      coverImage\n      seller {\n        email\n        sellerName\n        companyName\n        phoneNumber\n        companyAddress {\n          streetAddress\n          state\n          city\n          zipCode\n        }\n      }\n    }\n    err\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation login($data: InputLogin!) {\n  login(data: $data) {\n    data {\n      userID\n      email\n      userType\n      accToken\n    }\n    err\n  }\n}"): (typeof documents)["mutation login($data: InputLogin!) {\n  login(data: $data) {\n    data {\n      userID\n      email\n      userType\n      accToken\n    }\n    err\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query paginateProd($skipping: Int!, $limit: Int!) {\n  getAllProductsPaginate(skipping: $skipping, limit: $limit) {\n    data {\n      id\n      title\n      stock\n      price\n      rating\n      description\n      brand\n      category {\n        name\n      }\n      images\n      dateCreated\n      dateCreatedHuman\n      wishedBy {\n        productWished {\n          brand\n        }\n      }\n      coverImage\n      seller {\n        email\n        sellerName\n        companyName\n        phoneNumber\n        companyAddress {\n          streetAddress\n          state\n          city\n          zipCode\n        }\n      }\n    }\n    err\n  }\n}"): (typeof documents)["query paginateProd($skipping: Int!, $limit: Int!) {\n  getAllProductsPaginate(skipping: $skipping, limit: $limit) {\n    data {\n      id\n      title\n      stock\n      price\n      rating\n      description\n      brand\n      category {\n        name\n      }\n      images\n      dateCreated\n      dateCreatedHuman\n      wishedBy {\n        productWished {\n          brand\n        }\n      }\n      coverImage\n      seller {\n        email\n        sellerName\n        companyName\n        phoneNumber\n        companyAddress {\n          streetAddress\n          state\n          city\n          zipCode\n        }\n      }\n    }\n    err\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query sbyterm($term: String!) {\n  getProductsBySearchTerm(term: $term) {\n    data {\n      id\n      title\n      stock\n      price\n      rating\n      description\n      brand\n      category {\n        name\n      }\n      images\n      dateCreated\n      dateCreatedHuman\n      wishedBy {\n        productWished {\n          brand\n        }\n      }\n      coverImage\n      seller {\n        email\n        sellerName\n        companyName\n        phoneNumber\n        companyAddress {\n          streetAddress\n          state\n          city\n          zipCode\n        }\n      }\n    }\n    err\n  }\n}"): (typeof documents)["query sbyterm($term: String!) {\n  getProductsBySearchTerm(term: $term) {\n    data {\n      id\n      title\n      stock\n      price\n      rating\n      description\n      brand\n      category {\n        name\n      }\n      images\n      dateCreated\n      dateCreatedHuman\n      wishedBy {\n        productWished {\n          brand\n        }\n      }\n      coverImage\n      seller {\n        email\n        sellerName\n        companyName\n        phoneNumber\n        companyAddress {\n          streetAddress\n          state\n          city\n          zipCode\n        }\n      }\n    }\n    err\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;