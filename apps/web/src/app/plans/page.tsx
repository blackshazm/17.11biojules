export default function Plans() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold text-center">
          Our Plans
        </h1>
        <div className="mt-8">
            <div className="border rounded-lg p-6 text-center">
                <h2 className="text-2xl font-bold">BIO CLUB Membership</h2>
                <p className="text-4xl font-bold mt-4">R$ 100/month</p>
                <ul className="mt-4 text-left">
                    <li>- Access to exclusive natural products catalog</li>
                    <li>- Earn commissions by referring new members</li>
                    <li>- Participate in the 10-step journey to increase your earnings</li>
                </ul>
                <button className="mt-6 bg-green-500 text-white py-2 px-4 rounded">
                    Subscribe Now
                </button>
            </div>
        </div>
      </div>
    </main>
  );
}
