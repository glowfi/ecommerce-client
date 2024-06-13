import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Side } from '../user/myorders';

export function OrderDetailsModal({ allOrders, idx }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Details</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-fit">
                <Side allOrders={allOrders} idx={idx} />
            </DialogContent>
        </Dialog>
    );
}
