import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

export function SortDropdown({ sortbyRating, sortbyPrice }: any) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">Filter By</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-fit">
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <span>
                            <div className="flex items-center justify-between w-fit gap-3">
                                <span
                                    onClick={() => {
                                        sortbyPrice('desc');
                                    }}
                                >
                                    Highest Pricing
                                </span>
                            </div>
                        </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <span>
                            <div className="flex items-center justify-between w-fit gap-3">
                                <span
                                    onClick={() => {
                                        sortbyPrice('asc');
                                    }}
                                >
                                    Lowest Pricing
                                </span>
                            </div>
                        </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <span>
                            <div className="flex items-center justify-between w-fit gap-3">
                                <span
                                    onClick={() => {
                                        sortbyRating('desc');
                                    }}
                                >
                                    Highest Rating
                                </span>
                            </div>
                        </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <span>
                            <div className="flex items-center justify-between w-fit gap-3">
                                <span
                                    onClick={() => {
                                        sortbyRating('asc');
                                    }}
                                >
                                    Lowest Rating
                                </span>
                            </div>
                        </span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
