import Image from 'next/image';
import profile from './assets/Profile.svg'
const SignUpBox = () =>{
    return (
        <div className='rounded flex items-center gap-2'>
            <Image src={profile} alt='Search' />
            <div>
                Sign Up/Sign In
            </div>
        </div>
    )
}

export default SignUpBox;