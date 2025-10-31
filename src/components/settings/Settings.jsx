import React from 'react'
import SubscriptionManagement from './SubscriptionManagement'
import SubscriptionEmails from './SubscriptionEmails'
import PasswordReset from './PasswordReset'

function Settings() {
  return (
    <div>
        <SubscriptionManagement/>
        <SubscriptionEmails/>
        <PasswordReset/>
    </div>
  )
}

export default Settings