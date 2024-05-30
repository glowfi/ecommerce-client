import { RefObject } from 'react';
import { create } from 'zustand';

export type EventState = {
    eventRef: RefObject<HTMLDivElement>; //<== change the HTMLDivElement to whatever fits your need
    currImage: string;
    setEventRef: (eventRef: RefObject<HTMLDivElement>) => void;
};

export const userefStore = create<EventState>()((set) => ({
    eventRef: { current: null },
    currImage: '',
    setEventRef: (eventRef) => set({ eventRef })
}));
