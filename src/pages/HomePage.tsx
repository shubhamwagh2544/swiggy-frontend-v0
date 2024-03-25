import landingimage from '../assets/landing.png';
import appdownloadimage from '../assets/appDownload.png';
import SearchBar, { SearchForm } from '@/components/SearchBar';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {

    const navigate = useNavigate()

    function handleSubmit(formData: SearchForm) {
        navigate({
            pathname: `/search/${formData.searchQuery}`
        })
    }

    return (
        <div className="flex flex-col gap-12">
            <div className="md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
                <h1 className="text-5xl font-bold tracking-tighter text-orange-600">
                    What's on your mind today?
                </h1>
                <span className="text-xl">
                    Food is just click away!
                </span>
                <SearchBar
                    placeholder='Search by city or town near you...'
                    onSubmit={handleSubmit}
                />
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