import Image from 'next/image';
import search from './assets/Search.svg'
const SearchBar = () =>{
    return (
        <div className='bg-[var(--light-bg)] rounded flex items-center w-1/3 flex-2 gap-2 p-2'>
            <Image src={search} alt='Search' />
            <input type='text' className='outline-none bg-transparent w-full text-xs' placeholder='Search essentials, groceries and more...' />
        </div>
    )
}

export default SearchBar;