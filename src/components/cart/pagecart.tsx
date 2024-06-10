import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from '@/components/ui/pagination';
import { useState } from 'react';

export function PaginationDemo({
    perPage,
    idx,
    handleIdxPrev,
    handleIdxNext
}: any) {
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem onClick={handleIdxPrev}>
                    <PaginationPrevious href="#" />
                </PaginationItem>
                {Array.from({ length: perPage }, (_, i) => i).map((_, i) => {
                    return (
                        <PaginationItem onClick={handleIdxNext}>
                            <PaginationLink
                                href="#"
                                isActive={idx === i ? true : false}
                            >
                                {i}
                            </PaginationLink>
                        </PaginationItem>
                    );
                })}
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem onClick={handleIdxNext}>
                    <PaginationNext href="#" />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
