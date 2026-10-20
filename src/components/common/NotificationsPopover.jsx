import React, { useState } from 'react';
import { 
  Bell, 
  Check, 
  Trash2, 
  TrendingDown, 
  Sparkles, 
  Calendar, 
  MessageSquare, 
  Building, 
  Briefcase, 
  Bookmark, 
  Compass,
  AlertTriangle,
  X,
  CheckCheck
} from 'lucide-react';
import { useNotifications } from '../../context/AppContext';

export function NotificationsPopover({ onNavigate, onSelectProperty }) {
  const { 
    notifications, 
    markNotificationAsRead, 
    markAllNotificationsAsRead, 
    deleteNotification, 
    clearAllNotifications 
  } = useNotifications();

  const [isOpen, setIsOpen] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Price Drop':
        return <TrendingDown className="w-3.5 h-3.5 text-emerald-600" />;
      case 'New Match':
        return <Sparkles className="w-3.5 h-3.5 text-amber-500" />;
      case 'Visit Reminder':
        return <Calendar className="w-3.5 h-3.5 text-blue-500" />;
      case 'Inquiry':
        return <MessageSquare className="w-3.5 h-3.5 text-purple-500" />;
      case 'Seller Update':
        return <Building className="w-3.5 h-3.5 text-rose-500" />;
      case 'Agent Follow-up':
        return <Briefcase className="w-3.5 h-3.5 text-teal-600" />;
      case 'Saved Home Update':
        return <Bookmark className="w-3.5 h-3.5 text-amber-600" />;
      case 'Nearby Match':
        return <Compass className="w-3.5 h-3.5 text-cyan-600" />;
      default:
        return <Bell className="w-3.5 h-3.5 text-vistara-accent" />;
    }
  };

  const getTypeBadgeClass = (type) => {
    switch (type) {
      case 'Price Drop':
        return 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20';
      case 'New Match':
        return 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20';
      case 'Visit Reminder':
        return 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20';
      case 'Inquiry':
        return 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20';
      case 'Seller Update':
        return 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20';
      case 'Agent Follow-up':
        return 'bg-teal-500/10 text-teal-700 dark:text-teal-300 border-teal-500/20';
      case 'Saved Home Update':
        return 'bg-amber-500/10 text-amber-800 dark:text-amber-200 border-amber-500/20';
      case 'Nearby Match':
        return 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-500/20';
      default:
        return 'bg-vistara-elevated text-vistara-secondary border-vistara-border';
    }
  };

  const handleNotificationClick = (n) => {
    markNotificationAsRead(n.id);
    setIsOpen(false);

    if (n.propertyId && onSelectProperty) {
      onSelectProperty(n.propertyId);
    } else if (n.action && onNavigate) {
      onNavigate(n.action);
    }
  };

  return (
    <div className="relative">
      {/* Bell Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded border border-vistara-border hover:bg-vistara-elevated transition-colors relative text-vistara-secondary hover:text-vistara-primary"
        title="Notifications"
        aria-label="Notifications"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-white text-[9px] font-bold flex items-center justify-center shadow-sm">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Popover Dropdown */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => { setIsOpen(false); setShowClearConfirm(false); }} 
          />
          <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-vistara-surface border border-vistara-border shadow-2xl rounded-2xl p-4 z-50 text-xs animate-fade-in text-vistara-primary">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-vistara-border mb-3">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm text-vistara-primary">Notifications</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-vistara-elevated text-vistara-secondary">
                  {unreadCount} unread
                </span>
              </div>

              {notifications.length > 0 && (
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <button
                      type="button"
                      onClick={() => markAllNotificationsAsRead()}
                      className="text-[11px] text-vistara-accent font-semibold hover:underline flex items-center gap-1"
                      title="Mark all as read"
                    >
                      <CheckCheck className="w-3.5 h-3.5" />
                      Mark read
                    </button>
                  )}

                  {!showClearConfirm ? (
                    <button
                      type="button"
                      onClick={() => setShowClearConfirm(true)}
                      className="text-[11px] text-vistara-secondary hover:text-red-500 font-medium transition-colors"
                      title="Clear all notifications"
                    >
                      Clear all
                    </button>
                  ) : (
                    <div className="flex items-center gap-1 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
                      <span className="text-[10px] text-red-600 font-bold">Clear all?</span>
                      <button
                        type="button"
                        onClick={() => {
                          clearAllNotifications();
                          setShowClearConfirm(false);
                        }}
                        className="text-[10px] text-red-600 font-extrabold hover:underline ml-1"
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowClearConfirm(false)}
                        className="text-[10px] text-vistara-secondary hover:text-vistara-primary ml-1"
                      >
                        No
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Notification List */}
            <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
              {notifications.length === 0 ? (
                <div className="py-8 text-center text-vistara-secondary">
                  <Bell className="w-8 h-8 mx-auto text-vistara-secondary/40 mb-2" />
                  <p className="font-semibold text-xs text-vistara-primary">All caught up</p>
                  <p className="text-[11px] mt-0.5">No notifications at this moment.</p>
                </div>
              ) : (
                notifications.map(n => (
                  <div
                    key={n.id}
                    className={`p-3 rounded-xl border transition-all ${
                      n.read 
                        ? 'bg-vistara-elevated/40 border-vistara-border/50 text-vistara-secondary' 
                        : 'bg-vistara-elevated border-vistara-border shadow-xs'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      {/* Type Badge */}
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold border flex items-center gap-1 ${getTypeBadgeClass(n.type)}`}>
                          {getTypeIcon(n.type)}
                          {n.type}
                        </span>
                        {!n.read && (
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" title="Unread" />
                        )}
                      </div>

                      {/* Action buttons: Mark read & Delete */}
                      <div className="flex items-center gap-1">
                        {!n.read && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              markNotificationAsRead(n.id);
                            }}
                            className="p-1 rounded hover:bg-vistara-surface text-vistara-secondary hover:text-vistara-accent"
                            title="Mark as read"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(n.id);
                          }}
                          className="p-1 rounded hover:bg-vistara-surface text-vistara-secondary hover:text-red-500"
                          title="Delete notification"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Content Body - Click to Navigate */}
                    <div 
                      onClick={() => handleNotificationClick(n)}
                      className="cursor-pointer hover:opacity-90"
                    >
                      <h4 className={`font-bold text-xs ${n.read ? 'text-vistara-primary/80' : 'text-vistara-primary'}`}>
                        {n.title}
                      </h4>
                      <p className="text-[11px] text-vistara-secondary mt-1 leading-relaxed">
                        {n.description || n.message}
                      </p>
                      <div className="flex items-center justify-between text-[10px] text-vistara-secondary/70 mt-2 pt-1 border-t border-vistara-border/40">
                        <span>{n.timestamp || n.date}</span>
                        <span className="text-vistara-accent font-semibold">View details →</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        </>
      )}
    </div>
  );
}
