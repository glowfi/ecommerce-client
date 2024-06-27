import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Side } from '../user/myorders';
import { ScrollArea } from '../ui/scroll-area';

export function OrderDetailsModal({ allOrders, idx }: any) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Details</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-full overflow-scroll">
                <Side allOrders={allOrders} idx={idx} />
            </DialogContent>
        </Dialog>
    );
}
