import { titleCase } from '@/lib/utils';
import React, { SetStateAction } from 'react';
import { LoadingButton } from '../ui/loading-button';
import { RefreshCw } from 'lucide-react';

interface Refetch {
    name: string;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    getData: () => Promise<any>;
    reset_order?: any;
    reset_rev?: any;
}

export const Heading = ({ name }: any) => {
    return (
        <div className="px-7">
            <h1 className="text-center font-semibold mb-3">
                {titleCase(name)}
            </h1>
            <p className="text-center mb-3">A list of your recent {name}.</p>
        </div>
    );
};

export const RefetchButton = (props: Refetch) => {
    return (
        <div className="flex flex-col gap-3">
            <span className="text-sm text-center font-semibold">
                Experiencing inconsistencies? Refresh your {props.name} list by
                clicking the button below.
            </span>

            <LoadingButton
                loading={props.loading}
                variant={'link'}
                onClick={async () => {
                    props.setLoading(true);
                    props.reset_order();
                    await props.getData();
                    props.setLoading(false);
                }}
            >
                <div className="flex gap-3 justify-center items-center">
                    <RefreshCw />
                    Refetch {props.name} from server
                </div>
            </LoadingButton>
        </div>
    );
};
