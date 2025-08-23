'use client'

import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useAdmin } from '@/contexts/AdminContext';
import { useTranslation } from '@/hooks/use-translation';
import { ChartWrapper } from './ChartWrapper';

export default function RevenueChart() {
  const { stats, orders } = useAdmin();
  const { isRTL } = useTranslation();

  // Generate revenue growth data from orders
  const generateRevenueData = () => {
    const now = new Date();
    const monthlyData = [];
    
    for (let i = 11; i >= 0; i--) {
      const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthName = month.toLocaleString('default', { month: 'short' });
      
      // Filter orders for this month
      const monthOrders = orders.filter(order => {
        const orderDate = new Date(order.createdAt);
        return orderDate.getMonth() === month.getMonth() && 
               orderDate.getFullYear() === month.getFullYear() &&
               order.status !== 'cancelled';
      });
      
      const monthRevenue = monthOrders.reduce((sum, order) => sum + order.total.usd, 0);
      
      monthlyData.push({
        month: monthName,
        revenue: monthRevenue,
        orders: monthOrders.length,
        growth: i === 11 ? 0 : ((monthRevenue - (monthlyData[monthlyData.length - 1]?.revenue || 0)) / (monthlyData[monthlyData.length - 1]?.revenue || 1)) * 100
      });
    }
    
    return monthlyData;
  };

  const revenueData = generateRevenueData();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/95 backdrop-blur-sm border border-border/20 rounded-lg p-3 shadow-lg"
        >
          <p className="font-medium text-foreground mb-1">{label}</p>
          <p className="text-primary font-bold">
            ${payload[0].value.toLocaleString()}
          </p>
          <p className="text-muted-foreground text-sm">
            {payload[0].payload.orders} {isRTL() ? 'طلب' : 'orders'}
          </p>
          {payload[0].payload.growth !== 0 && (
            <p className={`text-sm font-medium ${payload[0].payload.growth > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {payload[0].payload.growth > 0 ? '+' : ''}{payload[0].payload.growth.toFixed(1)}%
            </p>
          )}
        </motion.div>
      );
    }
    return null;
  };

  return (
    <ChartWrapper>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={revenueData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
            <XAxis
              dataKey="month"
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12 }}
              interval="preserveStartEnd"
              orientation="bottom"
              type="category"
              allowDuplicatedCategory={false}
              domain={['dataMin', 'dataMax']}
            />
            <YAxis
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              tick={{ fontSize: 12 }}
              orientation="left"
              width={80}
              type="number"
              domain={['dataMin', 'dataMax']}
              allowDataOverflow={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              strokeWidth={3}
              fill="url(#revenueGradient)"
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              activeDot={{
                r: 6,
                stroke: '#3b82f6',
                strokeWidth: 2,
                fill: 'white',
                filter: 'drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3))'
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </ChartWrapper>
  );
}
