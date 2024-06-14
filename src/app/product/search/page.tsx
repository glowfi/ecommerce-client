import SearchedResults from '@/components/product/SearchedResults';

const ProductSearch = ({
    params,
    searchParams
}: {
    params: { slug: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}) => {
    return (
        <div className="container mt-6 flex justify-center items-center">
            <SearchedResults />
        </div>
    );
};

export default ProductSearch;
