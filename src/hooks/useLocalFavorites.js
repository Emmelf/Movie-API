import { useState, useEffect } from "react";

// Garde une copie locale (localStorage) des ids favoris pour affichage rapide

export function useLocalFavorites(key) {

    const [ids, setIds] = useState(() => {

        try {

            const stored = localStorage.getItem(key);

            return stored ? JSON.parse(stored) : [];

        } catch {

            return [];

        }

    });

    useEffect(() => {

        localStorage.setItem(key, JSON.stringify(ids));

    }, [ids, key]);

    const addId = (id) => setIds((prev) => (prev.includes(id) ? prev : [...prev, id]));

    const removeId = (id) => setIds((prev) => prev.filter((i) => i !== id));

    const has = (id) => ids.includes(id);

    return { ids, addId, removeId, has };

}
