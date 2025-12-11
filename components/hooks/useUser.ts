'use client';

import { getUser } from '@/services/users/getUser';
import { IUser } from '@/types/user.interface';
import { useEffect, useState } from 'react';

export function useUser() {
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const me = await getUser();
                setUser(me);
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    return { user, setUser, loading };
}
