import landingimage from '../assets/landing.png';
import appdownloadimage from '../assets/appDownload.png';

export default function HomePage() {
    return (
        <div className="flex flex-col gap-12">
            <div className="bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
                <h1 className="text-5xl font-bold tracking-tighter text-orange-600">
                    What's on your mind today?
                </h1>
                <span className="text-xl">
                    Food is just click away!
                </span>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
                <img src={landingimage} alt="landing-image" />
                <div className="flex flex-col items-center justify-center gap-4 text-center">
                    <span className='font-bold text-3xl tracking-tighter text-orange-500'>
                        Take Your Order Home Even Now Faster
                    </span>
                    <span className='text-lg'>
                        Download Swiggy App Now {":)"}
                    </span>
                    <img src={appdownloadimage} alt="download-app" />
                </div>
            </div>
        </div>
    )
}