import React, { useState } from 'react'

const useShowPassword = () => {
  const [showPassword, setShowPassword] = useState(false)

  const showPasswordComponent = (
    <div className='showPasswordContainer'>
      <input
        value={showPassword}
        onChange={e => setShowPassword(e.target.checked)}
        type='checkbox'
        className='showPassword'
        id='showPassword'
        name='showPassword'
      />
      <label className='showPassword' htmlFor='showPassword'>
        Show Password
      </label>
    </div>
  )

  return [showPassword, showPasswordComponent, setShowPassword]
}

export default useShowPassword
