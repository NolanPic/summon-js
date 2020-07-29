import React from 'react'

// As user is typing, this component will get
// a new 'items' prop to match what they're typing
// and will re-render
const Suggestions = ({ items }) => {
  return items.length ? (
    <div className='suggestions'>
      <ul>
        {items.map((item) => (
          <li>{item.name}</li>
        ))}
      </ul>
    </div>
  ) : null
}

export default Suggestions
