import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CommentSection = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Comments</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
                <div className="flex items-center gap-4">
                    <Avatar className="hidden h-9 w-9 sm:flex">
                        <AvatarImage src="/avatars/01.png" alt="Avatar" />
                        <AvatarFallback>OM</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                        <p className="text-sm font-medium leading-none">
                            Olivia Martin
                        </p>
                        <span>
                            Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit. Veniam, aliquam dolore culpa tempore assumenda
                            odit velit sequi vel eligendi modi corrupti adipisci
                            sint explicabo ex dolorum natus sunt reprehenderit
                            porro.
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default React.memo(CommentSection);
