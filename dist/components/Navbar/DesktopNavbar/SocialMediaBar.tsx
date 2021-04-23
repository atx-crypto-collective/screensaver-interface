import React from 'react'
import twitterIcon from './twitter-icon.svg'
import instagramIcon from './instagram-icon.svg'
import discordIcon from './discord-icon.svg'
import mediumIcon from './medium-icon.svg'

const links = [
  { service: 'Twitter', icon: twitterIcon, url: '#' },
  { service: 'Instagram', icon: instagramIcon, url: '#' },
  { service: 'Discord', icon: discordIcon, url: '#' },
  { service: 'Medium', icon: mediumIcon, url: '#' },
]

const SocialMediaBar: React.FC = () => {
  return (
    <div className={'flex space-x-4'}>
      {links.map(({ service, icon, url }) => (
        <img key={service} src={icon} alt={service} />
      ))}
    </div>
  )
}

export default SocialMediaBar
