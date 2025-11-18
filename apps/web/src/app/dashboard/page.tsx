export default function Dashboard() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold text-center">
          Your Dashboard
        </h1>
        <div className="mt-8 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="border rounded-lg p-6">
                    <h2 className="text-2xl font-bold">My Subscription</h2>
                    <p className="mt-2">Status: <span className="font-bold text-green-500">Active</span></p>
                    <p className="mt-2">Next payment: 2025-12-17</p>
                    <button className="mt-4 bg-red-500 text-white py-2 px-4 rounded">Cancel Subscription</button>
                </div>
                <div className="border rounded-lg p-6">
                    <h2 className="text-2xl font-bold">Referrals</h2>
                    <p className="mt-2">Your referral link: <a href="#" className="text-blue-500">https://bioclub.com/ref/jules</a></p>
                    <div className="mt-4">
                        <h3 className="font-bold">My Referrals:</h3>
                        <ul>
                            <li>Referred User 1: <span className="font-bold text-green-500">Active</span></li>
                            <li>Referred User 2: <span className="font-bold text-yellow-500">Pending</span></li>
                            <li>Referred User 3: <span className="font-bold text-red-500">Cancelled</span></li>
                        </ul>
                    </div>
                </div>
                <div className="border rounded-lg p-6 col-span-1 md:col-span-2">
                    <h2 className="text-2xl font-bold">Jornada 10 Passos</h2>
                    <p className="mt-2">Your current commission rate: <span className="font-bold">25%</span></p>
                    <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                        <div className="bg-green-500 h-4 rounded-full" style={{width: "50%"}}></div>
                    </div>
                    <p className="text-sm mt-1">You are on step 5 of 10.</p>
                </div>
            </div>
        </div>
      </div>
    </main>
  );
}
