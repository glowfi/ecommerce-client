'use client';

// import { Slider } from '@/components/ui/slider';
import { DualRangeSlider } from '../ui/dual-range-slider';
import { MAX_PRICE, MIN_PRICE, PRICE_STEP } from './constants';

// type SliderProps = React.ComponentProps<typeof Slider>;
export function Priceslider({ className, ...props }: any) {
    let values = [props.props.min, props.props.max];

    const handlePriceChange = (values: any) => {
        //@ts-ignore

        let [min, max] = values;
        // price: { min: 0, max: 100000 },

        //@ts-ignore
        props.props.setSelectedFilters({
            //@ts-ignore
            ...props.props.selectedFilters,
            price: { min, max }
        });
        //
        // setPriceRange(values)
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    Price Range
                </span>
                <span className="text-sm font-medium">
                    {/* @ts-ignore */}
                    {/* prettier-ignore */}${props.props.min}-${props.props.max}
                </span>
            </div>
            <div className="w-full space-y-5 px-10 mt-6">
                <DualRangeSlider
                    label={(value) => <span>{value}$</span>}
                    value={values}
                    onValueChange={handlePriceChange}
                    min={MIN_PRICE}
                    max={MAX_PRICE}
                    step={PRICE_STEP}
                />
            </div>
        </div>
    );
}
