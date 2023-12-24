import Container from '../Container'
import Link from 'next/link'
import SearchBar from './search-bar/SearchBar'
import { Redressed } from 'next/font/google'

const redressed = Redressed({ subsets: ['latin'], weight: ['400'] })

const Nav = () => {
    return (
        <div className="sticky top-0 w-full bg-black text-white z-30 shadow-sm">
            <div className="py-4">
                <Container>
                    <div className="flex items-center justify-between gap-3 md:gap-0">
                        <Link href='/' className={`${redressed.className} font-bold text-2xl`}>E-Shop</Link>
                        <SearchBar />
                        <div className="flex items-center gap-8 md:gap-12">
                            <div>Card Count</div>
                            <div>User Menu</div>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default Nav