import Image from 'next/image';
import cart from './assets/Buy.svg'
const CartBox = () =>{
    return (
        <div className='rounded border-none flex items-center gap-2'>
            <Image src={cart} alt='Cart' />
            <div>
                Cart
            </div>
        </div>
    )
}

export default CartBox;