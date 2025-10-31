import React from 'react'
import SubscriptionManagement from './SubscriptionManagement'
import SubscriptionEmails from './SubscriptionEmails'
import PasswordReset from './PasswordReset'
import AdminProfile from './AdminProfile'

function Settings() {
  return (
    <div> 
        <AdminProfile/>
        <SubscriptionManagement/>
        <SubscriptionEmails/>
        <PasswordReset/>
    </div>
  )
}

export default Settings