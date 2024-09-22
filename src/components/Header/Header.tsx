import { GITHUB_PROFILE_URL } from '../../utils/constants'
import ThemeToggle from '../../components/ThemeToggle/ThemeToggle'
import { LuGithub, LuMenu } from 'react-icons/lu'
import { IoClose } from 'react-icons/io5'
import './Header.css'
import React from 'react'

interface HeaderProps {
	onMenuClick: () => void
	isMenuOpen: boolean
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, isMenuOpen }) => {
	return (
		<header className='Header'>
			{isMenuOpen
				? <IoClose onClick={onMenuClick} aria-label='close-menu' />
				: <LuMenu onClick={onMenuClick} aria-label='open-menu' />}

			<h1>Minima List</h1>
			<div className='actions'>
				<div className="github">
					<strong className='icon-title'>GitHub</strong>
					<a href={GITHUB_PROFILE_URL} target='_blank'
						aria-label='Enlace a perfil de GitHub'>
						<LuGithub />
					</a>
				</div>
				<div className="theme">
					<strong className='icon-title'>Mode</strong>
					<ThemeToggle />
				</div>
			</div>
		</header>
	)
}

export default Header