interface AdminActivity {
  id: string;
  userId: string;
  userEmail: string;
  action: string;
  resource: string;
  resourceId?: string;
  timestamp: number;
  ipAddress?: string;
  userAgent?: string;
  details?: Record<string, any>;
}

class AdminLogger {
  private activities: AdminActivity[] = [];
  private maxActivities = 1000; // Keep last 1000 activities

  constructor() {
    // Load activities from localStorage
    this.loadActivities();
  }

  private loadActivities() {
    try {
      const stored = localStorage.getItem('admin_activities');
      if (stored) {
        this.activities = JSON.parse(stored);
      }
    } catch (error) {
      console.warn('Failed to load admin activities:', error);
    }
  }

  private saveActivities() {
    try {
      // Keep only the last maxActivities entries
      if (this.activities.length > this.maxActivities) {
        this.activities = this.activities.slice(-this.maxActivities);
      }
      localStorage.setItem('admin_activities', JSON.stringify(this.activities));
    } catch (error) {
      console.warn('Failed to save admin activities:', error);
    }
  }

  log(
    userId: string,
    userEmail: string,
    action: string,
    resource: string,
    resourceId?: string,
    details?: Record<string, any>
  ) {
    const activity: AdminActivity = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId,
      userEmail,
      action,
      resource,
      resourceId,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      details
    };

    this.activities.push(activity);
    this.saveActivities();

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Admin Activity:', activity);
    }
  }

  getActivities(limit = 100): AdminActivity[] {
    return this.activities
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, limit);
  }

  getActivitiesForUser(userId: string, limit = 50): AdminActivity[] {
    return this.activities
      .filter(activity => activity.userId === userId)
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, limit);
  }

  getActivitiesForResource(resource: string, resourceId?: string, limit = 50): AdminActivity[] {
    return this.activities
      .filter(activity => 
        activity.resource === resource && 
        (!resourceId || activity.resourceId === resourceId)
      )
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, limit);
  }

  clearActivities() {
    this.activities = [];
    this.saveActivities();
  }

  exportActivities(): string {
    return JSON.stringify(this.activities, null, 2);
  }
}

// Singleton instance
export const adminLogger = new AdminLogger();

// Helper functions for common actions
export const logAdminAction = {
  productCreate: (userId: string, userEmail: string, productId: string) => 
    adminLogger.log(userId, userEmail, 'CREATE', 'PRODUCT', productId),
  
  productUpdate: (userId: string, userEmail: string, productId: string, changes: Record<string, any>) => 
    adminLogger.log(userId, userEmail, 'UPDATE', 'PRODUCT', productId, { changes }),
  
  productDelete: (userId: string, userEmail: string, productId: string) => 
    adminLogger.log(userId, userEmail, 'DELETE', 'PRODUCT', productId),
  
  serviceCreate: (userId: string, userEmail: string, serviceId: string) => 
    adminLogger.log(userId, userEmail, 'CREATE', 'SERVICE', serviceId),
  
  serviceUpdate: (userId: string, userEmail: string, serviceId: string, changes: Record<string, any>) => 
    adminLogger.log(userId, userEmail, 'UPDATE', 'SERVICE', serviceId, { changes }),
  
  serviceDelete: (userId: string, userEmail: string, serviceId: string) => 
    adminLogger.log(userId, userEmail, 'DELETE', 'SERVICE', serviceId),
  
  orderView: (userId: string, userEmail: string, orderId: string) => 
    adminLogger.log(userId, userEmail, 'VIEW', 'ORDER', orderId),
  
  orderUpdate: (userId: string, userEmail: string, orderId: string, changes: Record<string, any>) => 
    adminLogger.log(userId, userEmail, 'UPDATE', 'ORDER', orderId, { changes }),
  
  dataExport: (userId: string, userEmail: string, dataType: string) => 
    adminLogger.log(userId, userEmail, 'EXPORT', 'DATA', undefined, { dataType }),
  
  dataReset: (userId: string, userEmail: string, dataType: string) => 
    adminLogger.log(userId, userEmail, 'RESET', 'DATA', undefined, { dataType }),
  
  login: (userId: string, userEmail: string) => 
    adminLogger.log(userId, userEmail, 'LOGIN', 'AUTH'),
  
  logout: (userId: string, userEmail: string) => 
    adminLogger.log(userId, userEmail, 'LOGOUT', 'AUTH'),
};
