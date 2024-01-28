import React from 'react'
import './HeaderSection.css'



function HeaderSection(props) {
  return (
    <div className='section_heading'>
      <h3 className='section_title text-[20px] sm:text-[36px]'>{props.children}</h3>
    </div>
  )
}

export default HeaderSection