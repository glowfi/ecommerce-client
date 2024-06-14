'use client';

import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';
import { MAX_PRICE, MIN_PRICE, PRICE_STEP } from './constants';

type SliderProps = React.ComponentProps<typeof Slider>;
export function Priceslider({ className, ...props }: SliderProps) {
    // console.log(props, 'PORPS');

    const handlePriceChange = (values) => {
        console.log(props);
        console.log(props.props.selectedFilters, 'CURR');
        let [min, max] = values;
        // price: { min: 0, max: 100000 },

        props.props.setSelectedFilters({
            ...props.props.selectedFilters,
            price: { min, max }
        });
        // console.log(values);
        // setPriceRange(values)
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    Price Range
                </span>
                <span className="text-sm font-medium">
                    ${props.props.min}-${props.props.max}
                </span>
            </div>
            <Slider
                min={MIN_PRICE}
                max={MAX_PRICE}
                step={PRICE_STEP}
                defaultValue={[props.props.min, props.props.max]}
                onValueChange={handlePriceChange}
                className="w-full"
            >
                <div className="bg-gray-200 dark:bg-gray-700 h-3 rounded-full">
                    <div className="bg-primary h-3 rounded-full" />
                </div>
                <div className="bg-white dark:bg-gray-900 w-5 h-5 rounded-full shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-opacity-75" />
                <div className="bg-white dark:bg-gray-900 w-5 h-5 rounded-full shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-opacity-75" />
            </Slider>
        </div>
    );
}
