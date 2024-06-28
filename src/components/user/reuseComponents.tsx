import { titleCase } from '@/lib/utils';
import { RefreshCw } from 'lucide-react';
import { Button } from '../ui/button';

interface Refetch {
    name: string;
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

            <Button
                className="w-fit mx-auto"
                variant={'ghost'}
                onClick={() => {
                    if (props.reset_order) {
                        props.reset_order();
                    } else {
                        props.reset_rev();
                    }
                }}
            >
                <div className="flex gap-3 justify-center items-center underline">
                    <RefreshCw />
                    Refetch {props.name} from server
                </div>
            </Button>
        </div>
    );
};
