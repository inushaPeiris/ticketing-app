import Link from 'next/link'
import Image from 'next/image'
import Logo from './icare-logo.jpg'

export default function Navbar() {
  return (
    <nav>
      <Image
        src={Logo}
        alt='iCare Helpdesk logo'
        width={70}
        placeholder='blur'
        quality={100}
      />
      <h1>iCare Helpdesk</h1>
      <Link href="/">Dashboard</Link>
      <Link href="/tickets">Tickets</Link>
    </nav>
  )
}
