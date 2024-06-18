import { Search_AtlasDocument } from '@/gql/graphql';
import { getClient } from '@/lib/graphqlserver';
import { SecureStorage } from '@/lib/utils';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface IautoStore {
    searchProducts: any;
    fetchProducts: (term: string) => void;
}

export const useautoStore = create<IautoStore>()(
    persist(
        (set) => ({
            searchProducts: [],
            fetchProducts: async (term) => {
                if (term) {
                    const { data } = await getClient().query(
                        Search_AtlasDocument,
                        {
                            term: term,
                            limit: 10,
                            lastTokensaved: ''
                        }
                    );

                    if (data?.getProductsBySearchTermAtlasSearch.data) {
                        set({
                            searchProducts: [
                                ...data?.getProductsBySearchTermAtlasSearch
                                    ?.data
                            ]
                        });
                    }
                }
            }
        }),
        {
            name: 'autocomplete',
            storage: createJSONStorage(() =>
                process.env.STAGE === 'local' ? localStorage : SecureStorage
            )
        }
    )
);
