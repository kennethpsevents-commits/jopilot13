'use client';
import { useState, useEffect } from 'react';

interface Notification {
  id: string;
  type: 'email' | 'whatsapp' | 'in_app';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export default function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    // Simulate loading notifications
    const mockNotifications: Notification[] = [
      {
        id: '1',
        type: 'in_app',
        title: 'Nieuwe match gevonden!',
        message: 'Er is een nieuwe vacature die perfect bij je profiel past.',
        timestamp: new Date(),
        read: false
      },
      {
        id: '2',
        type: 'email',
        title: 'CV Cleanup voltooid',
        message: 'Je CV is succesvol opgeschoond door AI.',
        timestamp: new Date(Date.now() - 3600000),
        read: true
      }
    ];
    setNotifications(mockNotifications);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        style={{
          background: 'none',
          border: 'none',
          fontSize: '24px',
          cursor: 'pointer',
          position: 'relative',
          padding: '8px'
        }}
      >
        🔔
        {unreadCount > 0 && (
          <span style={{
            position: 'absolute',
            top: '4px',
            right: '4px',
            background: '#EF4444',
            color: 'white',
            borderRadius: '50%',
            width: '18px',
            height: '18px',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold'
          }}>
            {unreadCount}
          </span>
        )}
      </button>

      {showNotifications && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: '0',
          background: 'white',
          border: '1px solid #E5E7EB',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          width: '320px',
          maxHeight: '400px',
          overflowY: 'auto',
          zIndex: 1000
        }}>
          <div style={{ padding: '16px', borderBottom: '1px solid #E5E7EB' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>Notificaties</h3>
          </div>
          
          {notifications.length === 0 ? (
            <div style={{ padding: '16px', textAlign: 'center', color: '#6B7280' }}>
              Geen notificaties
            </div>
          ) : (
            <div>
              {notifications.map(notification => (
                <div
                  key={notification.id}
                  onClick={() => markAsRead(notification.id)}
                  style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid #F3F4F6',
                    cursor: 'pointer',
                    background: notification.read ? 'white' : '#F0F9FF',
                    transition: 'background-color 0.2s'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'start', gap: '8px' }}>
                    <span style={{ fontSize: '16px' }}>
                      {notification.type === 'email' ? '📧' : 
                       notification.type === 'whatsapp' ? '💬' : '🔔'}
                    </span>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ 
                        margin: '0 0 4px 0', 
                        fontSize: '14px', 
                        fontWeight: '600',
                        color: notification.read ? '#6B7280' : '#1F2937'
                      }}>
                        {notification.title}
                      </h4>
                      <p style={{ 
                        margin: '0 0 4px 0', 
                        fontSize: '12px', 
                        color: '#6B7280',
                        lineHeight: '1.4'
                      }}>
                        {notification.message}
                      </p>
                      <span style={{ 
                        fontSize: '11px', 
                        color: '#9CA3AF' 
                      }}>
                        {notification.timestamp.toLocaleTimeString('nl-NL', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                    {!notification.read && (
                      <div style={{
                        width: '8px',
                        height: '8px',
                        background: '#89CFF0',
                        borderRadius: '50%',
                        marginTop: '4px'
                      }} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

