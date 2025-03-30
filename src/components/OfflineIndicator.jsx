import React from 'react'
import { useTranslation } from 'react-i18next'

const OfflineIndicator = ({ pendingSyncCount }) => {
  const { t } = useTranslation()

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-red-500 text-white p-2 z-50 flex justify-between items-center">
      <div>
        <span className="font-bold">{t('offline.status')}</span>
      </div>
      {pendingSyncCount > 0 && (
        <div>
          <span>{t('offline.pendingSync', { count: pendingSyncCount })}</span>
        </div>
      )}
    </div>
  )
}

export default OfflineIndicator