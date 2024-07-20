'use client';

import { useState } from 'react';
import Comp1 from './comp1';
import Comp2 from './comp2';

const ClientLogic = () => {
    const [currPage, setCurrPage] = useState(<Comp1 />);

    return (
        <>
            <button type="button" onClick={() => setCurrPage(<Comp1 />)}>
                Comp1
            </button>
            <button type="button" onClick={() => setCurrPage(<Comp2 />)}>
                Comp2
            </button>
            {currPage}
        </>
    );
};

export default ClientLogic;
