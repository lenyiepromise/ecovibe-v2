import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';

interface ActivityData {
    week: string;
    impact: number;
}

export function useActivityHistory(userAddress?: string, timeRange: 'week' | 'month' | 'year' = 'month') {
    const [activityData, setActivityData] = useState<ActivityData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userAddress) {
            setLoading(false);
            return;
        }

        fetchActivity();
    }, [userAddress, timeRange]);

    const fetchActivity = async () => {
        if (!userAddress) return;

        try {
            setLoading(true);

            // Calculate date range
            const now = new Date();
            const startDate = new Date();

            if (timeRange === 'week') {
                startDate.setDate(now.getDate() - 28); // 4 weeks
            } else if (timeRange === 'month') {
                startDate.setMonth(now.getMonth() - 3); // 3 months
            } else {
                startDate.setFullYear(now.getFullYear() - 1); // 1 year
            }

            const { data, error } = await supabase
                .from('activity_history')
                .select('created_at, impact_kg')
                .eq('user_address', userAddress)
                .gte('created_at', startDate.toISOString())
                .order('created_at', { ascending: true });

            if (error) throw error;

            // Group by week
            const grouped = groupByWeek(data || []);
            setActivityData(grouped);
        } catch (err) {
            console.error('Error fetching activity:', err);
            setActivityData([]);
        } finally {
            setLoading(false);
        }
    };

    const groupByWeek = (activities: any[]): ActivityData[] => {
        if (activities.length === 0) {
            // Return default data if no activities
            return [
                { week: 'Week 1', impact: 0 },
                { week: 'Week 2', impact: 0 },
                { week: 'Week 3', impact: 0 },
                { week: 'Week 4', impact: 0 },
            ];
        }

        const weeks: { [key: string]: number } = {};

        activities.forEach((activity) => {
            const date = new Date(activity.created_at);
            const weekNum = getWeekNumber(date);
            const weekKey = `Week ${weekNum}`;

            weeks[weekKey] = (weeks[weekKey] || 0) + (activity.impact_kg || 0);
        });

        return Object.entries(weeks).map(([week, impact]) => ({
            week,
            impact: Math.round(impact),
        }));
    };

    const getWeekNumber = (date: Date): number => {
        const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
        const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
        return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    };

    return {
        activityData,
        loading,
        refresh: fetchActivity,
    };
}
