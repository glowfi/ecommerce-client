<div className="grid gap-4">
    <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            name="email"
            value={email}
            onChange={(e) => setEmail(() => e.target.value)}
        />
    </div>
    <div className="grid gap-2">
        <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <Link
                href="/auth/forgetpassword"
                className="ml-auto inline-block text-sm underline"
            >
                Forgot your password?
            </Link>
        </div>
        <Input
            id="password"
            type="password"
            required
            name="password"
            onChange={(e) => setPassword(() => e.target.value)}
        />
    </div>
    <LoadingButton
        loading={loading}
        type="button"
        className="w-full"
        onClick={async () => {
            setLoading(true);
            let res = await execLogin(
                {
                    data: {
                        email,
                        password,
                        userType: 'user'
                    }
                },
                { requestPolicy: 'network-only' }
            );
            // console.log(res.data?.login);
            if (res?.data?.login?.err) {
                toast({
                    variant: 'destructive',
                    title: 'Authentication Error!',
                    description: res?.data?.login?.err
                });
            } else if (res?.data?.login?.data) {
                let address = {
                    street_address:
                        res?.data?.login?.data?.address?.streetAddress,
                    country: res?.data?.login?.data?.address?.country,
                    state: res?.data?.login?.data?.address?.state,
                    city: res?.data?.login?.data?.address?.city,
                    zipCode: res?.data?.login?.data?.address?.zipCode,
                    countryCode: res?.data?.login?.data?.address?.countryCode
                };

                addUser({
                    email: res.data?.login?.data?.email,
                    profile_pic: res.data?.login?.data?.profilePic,
                    name: res.data?.login?.data?.name,
                    id: res?.data?.login?.data?.userID,
                    address,
                    phone_number: res?.data?.login?.data?.phoneNumber
                });
                toast({
                    variant: 'default',
                    title: 'Login Successful!',
                    description: `Logged in as ${res?.data?.login?.data?.name}!`
                });

                router.push('/');
            } else {
                toast({
                    variant: 'destructive',
                    title: 'Some Error occured!'
                });
            }
            setLoading(false);
        }}
    >
        Login
    </LoadingButton>
</div>;
{
    /* </form> */
}
<div className="mt-4 text-center text-sm flex flex-col gap-3 underline">
    <Link href="/auth/signup" className="underline">
        Don&apos;t have an account ? Sign up
    </Link>
    <Link href={'/'}>Go Back to Home</Link>
</div>;
