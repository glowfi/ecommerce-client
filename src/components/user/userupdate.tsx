import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import CountrySelect from '../ui/country-select';
import { PhoneInput } from '../ui/phone-input';
import RegionSelect from '../ui/region-select';
import { User } from './mydetails';

export function UserUpdate({ userdetails }: User) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when
                        you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            defaultValue={userdetails?.name}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="phone" className="text-right">
                            Phone
                        </Label>
                        <Input
                            id="phone"
                            defaultValue={userdetails?.phoneNumber}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                            Email
                        </Label>
                        <Input
                            id="email"
                            defaultValue={userdetails?.email}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="streetAddress">Street Address</Label>
                        <Input
                            id="streetAddress"
                            type="text"
                            placeholder={userdetails?.address?.streetAddress}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center items-center">
                        <div className="grid gap-2">
                            <Label>Country</Label>
                            <CountrySelect
                                // onChange={setCountryCode}
                                defaultValue={userdetails?.address?.countryCode}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>State</Label>
                            <RegionSelect
                                countryCode={userdetails?.address?.countryCode}
                                // onChange={setRegion}
                                defaultValue={userdetails?.address?.state}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="city">City</Label>
                            <Input
                                id="city"
                                type="text"
                                placeholder={userdetails?.address?.city}
                                value={userdetails?.address?.city}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="zipcode">ZipCode</Label>
                            <Input
                                id="zipcode"
                                type="number"
                                placeholder={userdetails?.address?.zipCode}
                                value={userdetails?.address?.zipCode}
                            />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label>Phone Number</Label>
                        <PhoneInput
                            placeholder={userdetails?.address?.zipCode}
                            // onChange={setPhonenumber}
                            value={userdetails?.address?.zipCode}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
